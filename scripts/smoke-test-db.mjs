#!/usr/bin/env node
/**
 * TEMPORARY one-off check for the shared Preview/Production database.
 * Inserts one clearly fake enquiry, reads it back, deletes it, and confirms
 * the delete. Prints only the reference code and pass/fail, never data or
 * connection details. Runs only in Vercel Preview builds.
 */
import pg from "pg";
import { randomBytes, randomUUID } from "node:crypto";

if (process.env.VERCEL_ENV !== "preview") {
  console.log("[smoke] skipped (not a Vercel preview build)");
  process.exit(0);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10_000 });
const ref = `GV-GEN-${randomBytes(5).toString("hex").toUpperCase()}`;

try {
  await client.connect();
  const { rows } = await client.query(
    `INSERT INTO enquiries (reference_code, idempotency_key, request_hash, flow_type, full_name, email, phone,
       message, privacy_consent_version, privacy_consent_timestamp)
     VALUES ($1, $2, $3, 'general', 'Preview Smoke Test', 'smoke-test@example.invalid', '+000 000 0000',
       'Automated connectivity check. Not a real enquiry.', 'smoke-test', now())
     RETURNING id`,
    [ref, randomUUID(), "0".repeat(64)]
  );
  const id = rows[0].id;
  const read = await client.query("SELECT reference_code FROM enquiries WHERE id = $1", [id]);
  if (read.rows[0]?.reference_code !== ref) throw new Error("read-back mismatch");
  const del = await client.query("DELETE FROM enquiries WHERE id = $1 AND email = 'smoke-test@example.invalid'", [id]);
  const left = await client.query("SELECT count(*)::int AS n FROM enquiries WHERE email = 'smoke-test@example.invalid'");
  console.log(`[smoke] insert ${ref}: ok; read-back: ok; deleted: ${del.rowCount}; smoke rows remaining: ${left.rows[0].n}`);
  if (del.rowCount !== 1 || left.rows[0].n !== 0) process.exitCode = 1;
} catch (err) {
  console.error(`[smoke] failed: ${err?.code ?? ""} ${err?.message ?? err}`.trim());
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
