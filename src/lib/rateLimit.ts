import "server-only";
import { createHmac, createHash } from "node:crypto";
import type { Pool, PoolClient } from "pg";

/**
 * Shared fixed-window rate limiter backed by Postgres.
 *
 * Every serverless instance sees the same counters, unlike an in-memory map.
 * Keys are HMAC digests, so raw IP addresses and email addresses are never
 * written to the database.
 */
export interface RateLimitRule {
  name: string;
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

function hashingKey(): string {
  const explicit = process.env.RATE_LIMIT_SECRET;
  if (explicit) return explicit;
  // Fall back to a key derived from the server-only connection string, so the
  // digests cannot be reversed by someone who only sees the table.
  const seed = process.env.DATABASE_URL || process.env.DATABASE_URL_POOLED || "gv-local-dev";
  return createHash("sha256").update(`gv-rate-limit:${seed}`).digest("hex");
}

export function bucketKey(ruleName: string, identifier: string): string {
  return createHmac("sha256", hashingKey()).update(`${ruleName}:${identifier}`).digest("hex");
}

export async function consumeRateLimit(
  db: Pool | PoolClient,
  rule: RateLimitRule,
  identifier: string,
  now: Date = new Date()
): Promise<RateLimitResult> {
  const windowMs = rule.windowSeconds * 1000;
  const windowStart = new Date(Math.floor(now.getTime() / windowMs) * windowMs);
  const key = bucketKey(rule.name, identifier);

  const { rows } = await db.query<{ hits: number }>(
    `INSERT INTO enquiry_rate_limits (bucket_key, window_start, hits)
     VALUES ($1, $2, 1)
     ON CONFLICT (bucket_key, window_start)
     DO UPDATE SET hits = enquiry_rate_limits.hits + 1
     RETURNING hits`,
    [key, windowStart]
  );

  const hits = rows[0]?.hits ?? 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((windowStart.getTime() + windowMs - now.getTime()) / 1000));
  return { allowed: hits <= rule.limit, retryAfterSeconds };
}

/** Deletes expired windows. Called occasionally, outside any transaction. */
export async function pruneRateLimits(pool: Pool): Promise<void> {
  await pool.query("DELETE FROM enquiry_rate_limits WHERE window_start < now() - interval '1 day'");
}
