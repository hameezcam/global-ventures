#!/usr/bin/env node
/**
 * Applies SQL files in db/migrations in filename order, once each.
 *
 * - Uses the direct (non-pooled) DATABASE_URL, because advisory locks and
 *   multi-statement transactions need a real session.
 * - Each file runs in its own transaction and is recorded in schema_migrations
 *   with a SHA-256 checksum; an edited, already-applied file aborts the run.
 * - Never prints the connection string or query parameters.
 */
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "db", "migrations");
const LOCK_ID = 74_210_001; // arbitrary, stable advisory-lock id for this app

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("[migrate] DATABASE_URL is not set; refusing to run.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, connectionTimeoutMillis: 10_000 });

async function main() {
  await client.connect();
  await client.query("SELECT pg_advisory_lock($1)", [LOCK_ID]);
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name        text PRIMARY KEY,
        checksum    char(64) NOT NULL,
        applied_at  timestamptz NOT NULL DEFAULT now()
      )`);

    const applied = new Map(
      (await client.query("SELECT name, checksum FROM schema_migrations")).rows.map((r) => [r.name, r.checksum])
    );
    const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql")).sort();

    let count = 0;
    for (const file of files) {
      const sql = await readFile(path.join(MIGRATIONS_DIR, file), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      if (applied.has(file)) {
        if (applied.get(file) !== checksum) {
          throw new Error(`Migration ${file} was edited after it was applied. Add a new migration instead.`);
        }
        continue;
      }
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)", [file, checksum]);
        await client.query("COMMIT");
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
      console.log(`[migrate] applied ${file}`);
      count++;
    }
    console.log(`[migrate] done (${count} applied, ${files.length - count} already up to date)`);
  } finally {
    await client.query("SELECT pg_advisory_unlock($1)", [LOCK_ID]).catch(() => {});
  }
}

main()
  .catch((err) => {
    // Print only safe error metadata, never connection details.
    console.error(`[migrate] failed: ${err?.code ?? ""} ${err?.message ?? err}`.trim());
    process.exitCode = 1;
  })
  .finally(() => client.end().catch(() => {}));
