import "server-only";
import { createHash, randomBytes } from "node:crypto";
import type { Pool, PoolClient } from "pg";

type Db = Pool | PoolClient;
import type { EnquiryInput, FlowType } from "@/lib/enquiry/schema";

const REFERENCE_PREFIX: Record<FlowType, string> = {
  general: "GEN",
  "sell-business": "SELL",
  "buy-business": "BUY",
  valuation: "VAL",
  advisory: "ADV",
};

/** e.g. GV-SELL-3F9A0C12BE (40 random bits; uniqueness is enforced by the database). */
export function generateReferenceCode(flowType: FlowType): string {
  return `GV-${REFERENCE_PREFIX[flowType]}-${randomBytes(5).toString("hex").toUpperCase()}`;
}

/** Stable fingerprint of the validated enquiry, used to detect idempotency-key reuse. */
export function requestHash(input: EnquiryInput): string {
  const ordered = Object.keys(input)
    .sort()
    .map((k) => [k, input[k as keyof EnquiryInput]]);
  return createHash("sha256").update(JSON.stringify(ordered)).digest("hex");
}

export type SaveResult =
  | { kind: "created"; referenceCode: string; flowType: FlowType; createdAt: Date }
  | { kind: "duplicate"; referenceCode: string; flowType: FlowType; createdAt: Date }
  | { kind: "conflict" };

interface Row {
  reference_code: string;
  flow_type: FlowType;
  created_at: Date;
  request_hash: string;
}

/**
 * Looks up an earlier submission with the same idempotency key, so a retried
 * request gets its original reference without consuming rate-limit budget.
 */
export async function findPriorSubmission(db: Db, input: EnquiryInput, idempotencyKey: string): Promise<SaveResult | null> {
  const { rows } = await db.query<Row>(
    "SELECT reference_code, flow_type, created_at, request_hash FROM enquiries WHERE idempotency_key = $1",
    [idempotencyKey]
  );
  const row = rows[0];
  if (!row) return null;
  if (row.request_hash !== requestHash(input)) return { kind: "conflict" };
  return { kind: "duplicate", referenceCode: row.reference_code, flowType: row.flow_type, createdAt: row.created_at };
}

/**
 * Inserts an enquiry once per idempotency key. Must be called inside a
 * transaction on `client`; the caller commits before reporting success.
 */
export async function insertEnquiry(client: PoolClient, input: EnquiryInput, idempotencyKey: string): Promise<SaveResult> {
  const hash = requestHash(input);

  for (let attempt = 0; attempt < 3; attempt++) {
    const referenceCode = generateReferenceCode(input.flowType);
    await client.query("SAVEPOINT insert_enquiry");
    try {
      const { rows } = await client.query<Row>(
        `INSERT INTO enquiries (
           reference_code, idempotency_key, request_hash, flow_type,
           full_name, email, phone, company_name, role,
           interest_area, estimated_revenue, investment_budget, timeline, target_listing_ref,
           message, privacy_consent_version, privacy_consent_timestamp, nda_acknowledged
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, now(), $17)
         ON CONFLICT (idempotency_key) DO NOTHING
         RETURNING reference_code, flow_type, created_at, request_hash`,
        [
          referenceCode,
          idempotencyKey,
          hash,
          input.flowType,
          input.fullName,
          input.email,
          input.phone,
          input.companyName,
          input.role,
          input.interestArea,
          input.estimatedRevenue,
          input.investmentBudget,
          input.timeline,
          input.targetListingRef,
          input.message,
          input.privacyConsentVersion,
          input.ndaAcknowledged,
        ]
      );

      await client.query("RELEASE SAVEPOINT insert_enquiry");
      if (rows[0]) {
        return { kind: "created", referenceCode: rows[0].reference_code, flowType: rows[0].flow_type, createdAt: rows[0].created_at };
      }

      // Same idempotency key seen before: replay the original result if the
      // payload matches, otherwise refuse.
      return (await findPriorSubmission(client, input, idempotencyKey)) ?? { kind: "conflict" };
    } catch (err) {
      await client.query("ROLLBACK TO SAVEPOINT insert_enquiry");
      const e = err as { code?: string; constraint?: string };
      if (e.code === "23505" && e.constraint === "enquiries_reference_code_key") continue; // regenerate
      throw err;
    }
  }
  throw new Error("Could not allocate a unique reference code.");
}

/**
 * Runs `fn` in a transaction that holds an advisory lock on the idempotency
 * key, so concurrent retries of one submission are processed one at a time.
 * Resolves only after COMMIT succeeds.
 */
export async function withSubmissionLock<T>(pool: Pool, idempotencyKey: string, fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  let broken = false;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 0))", [idempotencyKey]);
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {
      broken = true;
    });
    throw err;
  } finally {
    client.release(broken);
  }
}
