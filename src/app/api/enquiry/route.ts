import { NextRequest, NextResponse } from "next/server";
import { getPool, isConnectivityError } from "@/lib/db";
import { consumeRateLimit, pruneRateLimits, type RateLimitRule } from "@/lib/rateLimit";
import { findPriorSubmission, insertEnquiry, withSubmissionLock, type SaveResult } from "@/lib/enquiryService";
import { validateEnquiry } from "@/lib/enquiry/schema";
import {
  BodyTooLargeError,
  clientIp,
  isAllowedOrigin,
  isJsonContentType,
  parseIdempotencyKey,
  readBodyWithLimit,
} from "@/lib/http/requestGuards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const IP_RULE: RateLimitRule = { name: "enquiry-ip", limit: 5, windowSeconds: 600 };
const EMAIL_RULE: RateLimitRule = { name: "enquiry-email", limit: 3, windowSeconds: 3600 };

const NO_STORE = { "Cache-Control": "no-store" };

function errorResponse(status: number, error: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) {
  return NextResponse.json({ success: false, error, ...extra }, { status, headers: { ...NO_STORE, ...headers } });
}

/** Logs only a category and a Postgres error code, never request data or credentials. */
function logFailure(stage: string, err: unknown) {
  const e = err as { code?: string; name?: string } | null;
  console.error("[enquiry] failure", { stage, code: e?.code ?? e?.name ?? "unknown" });
}

function saveResultResponse(result: SaveResult) {
  if (result.kind === "conflict") {
    return errorResponse(409, "This submission key was already used for a different enquiry. Please reload the form.");
  }
  // Only non-personal fields are echoed back.
  return NextResponse.json(
    {
      success: true,
      referenceCode: result.referenceCode,
      flowType: result.flowType,
      receivedAt: result.createdAt.toISOString(),
      duplicate: result.kind === "duplicate",
    },
    { status: result.kind === "created" ? 201 : 200, headers: NO_STORE }
  );
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return errorResponse(403, "Requests must come from the Global Ventures website.");
  }
  if (!isJsonContentType(request)) {
    return errorResponse(415, "Content-Type must be application/json.");
  }
  const idempotencyKey = parseIdempotencyKey(request);
  if (!idempotencyKey) {
    return errorResponse(400, "Missing or invalid Idempotency-Key header.");
  }

  let raw: unknown;
  try {
    const text = await readBodyWithLimit(request, MAX_BODY_BYTES);
    raw = JSON.parse(text);
  } catch (err) {
    if (err instanceof BodyTooLargeError) return errorResponse(413, "Request is too large.");
    return errorResponse(400, "Malformed JSON payload.");
  }

  const validation = validateEnquiry(raw);
  if (!validation.ok) {
    return errorResponse(validation.reason === "bot" ? 400 : 422, validation.error, validation.field ? { field: validation.field } : {});
  }
  const input = validation.data;

  try {
    const pool = getPool();
    const ip = clientIp(request);

    const outcome = await withSubmissionLock(pool, idempotencyKey, async (client) => {
      // A retry of a saved enquiry gets its original reference back and does
      // not consume rate-limit budget.
      const prior = await findPriorSubmission(client, input, idempotencyKey);
      if (prior) return prior;

      for (const [rule, id] of [
        [IP_RULE, ip],
        [EMAIL_RULE, input.email],
      ] as const) {
        const limit = await consumeRateLimit(client, rule, id);
        if (!limit.allowed) return { kind: "rate-limited" as const, retryAfterSeconds: limit.retryAfterSeconds };
      }
      return insertEnquiry(client, input, idempotencyKey);
    });
    // The transaction has committed by this point.

    if (Math.random() < 0.02) pruneRateLimits(pool).catch(() => {});

    if (outcome.kind === "rate-limited") {
      return errorResponse(
        429,
        "Too many enquiries in a short time. Please try again later or contact our office directly.",
        {},
        { "Retry-After": String(outcome.retryAfterSeconds) }
      );
    }
    return saveResultResponse(outcome);
  } catch (err) {
    logFailure("persist", err);
    if (isConnectivityError(err)) {
      return errorResponse(503, "Our enquiry service is temporarily unavailable. Your enquiry was not saved. Please try again shortly.", {}, { "Retry-After": "30" });
    }
    return errorResponse(500, "Your enquiry could not be saved because of an unexpected error. Please try again or contact our office directly.");
  }
}

export function GET() {
  return errorResponse(405, "Method not allowed.", {}, { Allow: "POST" });
}
