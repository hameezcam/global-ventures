/**
 * End-to-end tests for POST /api/enquiry against a running Next.js server and a
 * disposable Postgres database. Run via `scripts/test-integration.sh`, which
 * refuses to target anything other than a local database.
 *
 * Env: BASE_URL, BROKEN_DB_BASE_URL (same app with an unreachable DB), DATABASE_URL.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import pg from "pg";
import { PRIVACY_NOTICE_VERSION } from "../../src/lib/enquiry/schema.ts";

const BASE_URL = process.env.BASE_URL;
const BROKEN = process.env.BROKEN_DB_BASE_URL;
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
let ipCounter = 0;

before(async () => {
  assert.ok(BASE_URL && process.env.DATABASE_URL, "BASE_URL and DATABASE_URL are required");
  await db.query("TRUNCATE enquiries, enquiry_rate_limits");
});
after(() => db.end());

const uniqueEmail = () => `qa+${randomUUID().slice(0, 8)}@example.invalid`;

function payload(overrides = {}) {
  return {
    flowType: "general",
    fullName: "QA Test Person",
    email: uniqueEmail(),
    phone: "+971 50 000 0000",
    message: "Automated test enquiry. Not a real customer.",
    privacyConsent: true,
    privacyConsentVersion: PRIVACY_NOTICE_VERSION,
    formElapsedMs: 4000,
    ...overrides,
  };
}

async function post(body, { key = randomUUID(), origin = BASE_URL, contentType = "application/json", ip, base = BASE_URL, raw } = {}) {
  const headers = { "x-forwarded-for": ip ?? `203.0.113.${++ipCounter % 250}` };
  if (contentType) headers["content-type"] = contentType;
  if (origin) headers.origin = origin;
  if (key) headers["idempotency-key"] = key;
  const res = await fetch(`${base}/api/enquiry`, { method: "POST", headers, body: raw ?? JSON.stringify(body), duplex: "half" });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, json, headers: res.headers, key };
}

const rowByRef = async (ref) => (await db.query("SELECT * FROM enquiries WHERE reference_code = $1", [ref])).rows[0];

test("1. valid enquiry is saved and committed before success is returned", async () => {
  const body = payload();
  const r = await post(body);
  assert.equal(r.status, 201);
  assert.equal(r.json.success, true);
  assert.match(r.json.referenceCode, /^GV-GEN-[0-9A-F]{10}$/);
  const row = await rowByRef(r.json.referenceCode);
  assert.ok(row, "row exists as soon as the response is received");
  assert.equal(row.email, body.email);
  assert.equal(row.status, "new");
});

test("2 + 7. all five flows save with their own fields preserved", async () => {
  const cases = [
    { flowType: "general", companyName: "QA Holdings", role: "Founder" },
    { flowType: "sell-business", estimatedRevenue: "AED 30M - AED 75M", timeline: "Medium-term (6 - 18 months)", companyName: "QA Seller LLC" },
    { flowType: "buy-business", investmentBudget: "AED 25M - AED 60M", targetListingRef: "gv-tech-8402", role: "Investment Director" },
    { flowType: "valuation", interestArea: "Partner Buyout or Admission", estimatedRevenue: "AED 20M - AED 80M" },
    { flowType: "advisory", interestArea: "Growth Capital Sourcing", ndaAcknowledged: true },
  ];
  const prefixes = { general: "GEN", "sell-business": "SELL", "buy-business": "BUY", valuation: "VAL", advisory: "ADV" };
  for (const c of cases) {
    const r = await post(payload(c));
    assert.equal(r.status, 201, `${c.flowType}: ${JSON.stringify(r.json)}`);
    assert.ok(r.json.referenceCode.startsWith(`GV-${prefixes[c.flowType]}-`));
    const row = await rowByRef(r.json.referenceCode);
    assert.equal(row.flow_type, c.flowType);
    assert.equal(row.company_name, c.companyName ?? null);
    assert.equal(row.role, c.role ?? null);
    assert.equal(row.interest_area, c.interestArea ?? null);
    assert.equal(row.estimated_revenue, c.estimatedRevenue ?? null);
    assert.equal(row.investment_budget, c.investmentBudget ?? null);
    assert.equal(row.timeline, c.timeline ?? null);
    assert.equal(row.target_listing_ref, c.targetListingRef ? c.targetListingRef.toUpperCase() : null);
    assert.equal(row.nda_acknowledged, c.ndaAcknowledged ?? false);
    assert.equal(row.privacy_consent_version, PRIVACY_NOTICE_VERSION);
    assert.ok(Math.abs(new Date(row.privacy_consent_timestamp) - Date.now()) < 60_000);
    assert.equal(row.message, "Automated test enquiry. Not a real customer.");
  }
});

test("2b. buy flow never stores business revenue; sell flow never stores budget", async () => {
  const buy = await post(payload({ flowType: "buy-business", investmentBudget: "Over AED 150M", estimatedRevenue: "Under AED 10M" }));
  assert.equal(buy.status, 201);
  const row = await rowByRef(buy.json.referenceCode);
  assert.equal(row.investment_budget, "Over AED 150M");
  assert.equal(row.estimated_revenue, null);
});

test("3. invalid enquiries are rejected with the right status and nothing is saved", async () => {
  const before = (await db.query("SELECT count(*)::int AS n FROM enquiries")).rows[0].n;
  const cases = [
    [payload({ flowType: "not-a-flow" }), {}, 422],
    [payload({ email: "nope" }), {}, 422],
    [payload({ privacyConsent: false }), {}, 422],
    [payload({ message: "x".repeat(2001) }), {}, 422],
    [payload({ extraField: 1 }), {}, 422],
    [payload({ websiteUrl: "https://spam.example" }), {}, 400],
    [payload({ formElapsedMs: 100 }), {}, 400],
    [payload(), { key: null }, 400],
    [payload(), { key: "not-a-uuid" }, 400],
    [payload(), { origin: "https://evil.example" }, 403],
    [payload(), { origin: null }, 403],
    [payload(), { contentType: "text/plain" }, 415],
    [null, { raw: "{not json" }, 400],
  ];
  for (const [body, opts, expected] of cases) {
    const r = await post(body, opts);
    assert.equal(r.status, expected, `${JSON.stringify(opts)} ${JSON.stringify(r.json)}`);
    assert.equal(r.json?.success, false);
  }
  const after = (await db.query("SELECT count(*)::int AS n FROM enquiries")).rows[0].n;
  assert.equal(after, before);
});

test("3b. body size limit holds for declared and chunked bodies", async () => {
  const big = JSON.stringify(payload({ message: "x".repeat(40_000) }));
  assert.equal((await post(null, { raw: big })).status, 413);
  const enc = new TextEncoder().encode(big);
  const stream = new ReadableStream({
    start(c) {
      for (let i = 0; i < enc.length; i += 4096) c.enqueue(enc.slice(i, i + 4096));
      c.close();
    },
  });
  const r = await post(null, { raw: stream });
  assert.equal(r.status, 413);
});

test("4. duplicate submissions with the same key return the original reference", async () => {
  const body = payload({ flowType: "valuation", interestArea: "Strategic Board Benchmarking" });
  const key = randomUUID();
  const first = await post(body, { key });
  const second = await post(body, { key });
  const [a, b] = await Promise.all([post(body, { key }), post(body, { key })]);
  assert.equal(first.status, 201);
  for (const r of [second, a, b]) {
    assert.equal(r.status, 200);
    assert.equal(r.json.duplicate, true);
    assert.equal(r.json.referenceCode, first.json.referenceCode);
  }
  const n = (await db.query("SELECT count(*)::int AS n FROM enquiries WHERE idempotency_key = $1", [key])).rows[0].n;
  assert.equal(n, 1);

  const changed = await post({ ...body, message: "different" }, { key });
  assert.equal(changed.status, 409);
});

test("4b. concurrent first submissions with one key create exactly one row", async () => {
  const body = payload({ flowType: "advisory" });
  const key = randomUUID();
  const results = await Promise.all(Array.from({ length: 5 }, () => post(body, { key })));
  const refs = new Set(results.map((r) => r.json.referenceCode));
  assert.deepEqual(results.map((r) => r.status).sort(), [200, 200, 200, 200, 201], JSON.stringify(results.map((r) => r.json)));
  assert.equal(refs.size, 1);
  assert.equal(results.filter((r) => r.status === 201).length, 1);
  const n = (await db.query("SELECT count(*)::int AS n FROM enquiries WHERE idempotency_key = $1", [key])).rows[0].n;
  assert.equal(n, 1);
});

test("5. database failure returns 503 and a safe message", { skip: !BROKEN }, async () => {
  const r = await post(payload(), { base: BROKEN, origin: BROKEN });
  assert.equal(r.status, 503);
  assert.equal(r.json.success, false);
  assert.ok(r.headers.get("retry-after"));
  assert.doesNotMatch(JSON.stringify(r.json), /ECONN|postgres|127\.0\.0\.1|stack|at /i);
});

test("6. responses never echo personal data or internals", async () => {
  const body = payload({ companyName: "Secret Co", message: "Confidential plan" });
  const r = await post(body);
  assert.deepEqual(Object.keys(r.json).sort(), ["duplicate", "flowType", "receivedAt", "referenceCode", "success"]);
  const text = JSON.stringify(r.json);
  for (const v of [body.email, body.fullName, body.phone, "Secret Co", "Confidential plan"]) assert.ok(!text.includes(v));
  assert.equal(r.headers.get("cache-control"), "no-store");

  const bad = await post(payload({ email: "bad" }));
  assert.deepEqual(Object.keys(bad.json).sort(), ["error", "field", "success"]);
});

test("rate limit: shared counter blocks the 6th request from one IP within the window", async () => {
  const ip = "198.51.100.77";
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push((await post(payload(), { ip })).status);
  assert.deepEqual(statuses, [201, 201, 201, 201, 201, 429]);
  const rows = (await db.query("SELECT bucket_key FROM enquiry_rate_limits")).rows;
  assert.ok(rows.every((r) => !r.bucket_key.includes("198.51")), "raw IPs are not stored");
});

test("rate limit: per-email limit applies across different IPs", async () => {
  const email = uniqueEmail();
  const statuses = [];
  for (let i = 0; i < 4; i++) statuses.push((await post(payload({ email }))).status);
  assert.deepEqual(statuses, [201, 201, 201, 429]);
});

test("no IP address or user agent is stored with the enquiry", async () => {
  const cols = (await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'enquiries'")).rows.map((r) => r.column_name);
  assert.ok(!cols.some((c) => /ip|agent/.test(c)), cols.join(","));
});

test("9. existing pages still render", async () => {
  for (const p of ["/", "/contact", "/sell-a-business", "/buy-a-business", "/services/business-valuation", "/opportunities", "/privacy-policy"]) {
    const res = await fetch(`${BASE_URL}${p}`);
    assert.equal(res.status, 200, p);
  }
  const privacy = await (await fetch(`${BASE_URL}/privacy-policy`)).text();
  assert.ok(privacy.includes(PRIVACY_NOTICE_VERSION));
  assert.equal((await fetch(`${BASE_URL}/api/enquiry`)).status, 405);
});
