import "server-only";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

/**
 * Shared Postgres pool for route handlers.
 *
 * Runtime traffic uses the pooled connection string when the integration
 * provides one, otherwise the direct one. Credentials are read only on the
 * server and are never logged.
 */
declare global {
  var __gvPgPool: Pool | undefined;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("Database connection is not configured.");
    this.name = "DatabaseNotConfiguredError";
  }
}

export function getPool(): Pool {
  if (globalThis.__gvPgPool) return globalThis.__gvPgPool;

  const connectionString = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;
  if (!connectionString) throw new DatabaseNotConfiguredError();

  const pool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    // statement_timeout is set per transaction (SET LOCAL) instead of as a
    // startup parameter, because connection poolers may reject it.
    query_timeout: 6_000,
    application_name: "global-ventures-web",
  });
  // An idle client error must not crash the function; the pool replaces it.
  pool.on("error", (err) => {
    console.error("[db] idle client error", { code: (err as { code?: string }).code ?? "unknown" });
  });
  // Lets Vercel close idle connections before an instance is suspended.
  attachDatabasePool(pool);

  globalThis.__gvPgPool = pool;
  return pool;
}

/** Postgres error codes that mean "the database is unavailable", not "bad input". */
export function isConnectivityError(err: unknown): boolean {
  if (err instanceof DatabaseNotConfiguredError) return true;
  const code = (err as { code?: string } | null)?.code ?? "";
  return (
    ["ECONNREFUSED", "ECONNRESET", "ENOTFOUND", "ETIMEDOUT", "EAI_AGAIN", "57P01", "57P03", "53300", "08000", "08001", "08003", "08004", "08006", "28P01", "28000", "3D000"].includes(code) ||
    /timeout|terminated|Connection/i.test((err as Error)?.message ?? "")
  );
}

/** Error summary that is safe to log: no connection strings, no row data. */
export function safeErrorInfo(err: unknown): Record<string, string> {
  const e = (err ?? {}) as { code?: string; name?: string; message?: string };
  const message = String(e.message ?? "")
    .replace(/[a-z+]+:\/\/[^\s]+/gi, "<url>")
    .slice(0, 160);
  return { code: e.code ?? "none", name: e.name ?? "Error", message };
}
