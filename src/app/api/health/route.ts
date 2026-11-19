import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Database reachability check for Preview deployments only.
 * Returns 404 in Production so it cannot be used to burn database operations.
 */
export async function GET() {
  if (process.env.VERCEL_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const { rows } = await getPool().query<{ migrations: number }>(
      "SELECT count(*)::int AS migrations FROM schema_migrations"
    );
    return NextResponse.json(
      { database: "ok", migrationsApplied: rows[0]?.migrations ?? 0, pooled: Boolean(process.env.DATABASE_URL_POOLED) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[health] database check failed", { code: (err as { code?: string }).code ?? "unknown" });
    return NextResponse.json({ database: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
