// Unit tests for the real validation module (Node 22+ strips the TypeScript types).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateEnquiry,
  PRIVACY_NOTICE_VERSION,
  FLOW_TYPES,
  BUY_BUDGET_OPTIONS,
  SELL_REVENUE_OPTIONS,
} from "../src/lib/enquiry/schema.ts";

const base = () => ({
  flowType: "general",
  fullName: "Test Person",
  email: "Test.Person@Example.com",
  phone: "+971 50 000 0000",
  message: "Hello",
  privacyConsent: true,
  privacyConsentVersion: PRIVACY_NOTICE_VERSION,
  formElapsedMs: 5000,
});

test("accepts a valid general enquiry and normalises email", () => {
  const r = validateEnquiry(base());
  assert.equal(r.ok, true);
  assert.equal(r.data.email, "test.person@example.com");
  assert.equal(r.data.ndaAcknowledged, false);
  assert.equal(r.data.privacyConsentVersion, PRIVACY_NOTICE_VERSION);
});

test("rejects unknown flow types instead of defaulting to general", () => {
  const r = validateEnquiry({ ...base(), flowType: "crypto" });
  assert.equal(r.ok, false);
  assert.equal(r.field, "flowType");
});

test("requires privacy consent and the current notice version", () => {
  assert.equal(validateEnquiry({ ...base(), privacyConsent: false }).field, "privacyConsent");
  assert.equal(validateEnquiry({ ...base(), privacyConsentVersion: "2020-01-01" }).field, "privacyConsentVersion");
});

test("rejects honeypot and too-fast submissions as bots", () => {
  assert.equal(validateEnquiry({ ...base(), websiteUrl: "http://spam" }).reason, "bot");
  assert.equal(validateEnquiry({ ...base(), formElapsedMs: 300 }).reason, "bot");
  assert.equal(validateEnquiry({ ...base(), formElapsedMs: undefined }).reason, "bot");
});

test("rejects unexpected keys and wrong types", () => {
  assert.equal(validateEnquiry({ ...base(), isAdmin: true }).ok, false);
  assert.equal(validateEnquiry({ ...base(), fullName: ["x"] }).ok, false);
  assert.equal(validateEnquiry({ ...base(), ndaAcknowledged: "yes" }).ok, false);
  assert.equal(validateEnquiry([]).ok, false);
  assert.equal(validateEnquiry(null).ok, false);
});

test("enforces length limits rather than silently truncating", () => {
  assert.equal(validateEnquiry({ ...base(), message: "x".repeat(2001) }).field, "message");
  assert.equal(validateEnquiry({ ...base(), fullName: "x".repeat(101) }).field, "fullName");
  assert.equal(validateEnquiry({ ...base(), companyName: "x".repeat(121) }).field, "companyName");
  assert.equal(validateEnquiry({ ...base(), message: "x".repeat(2000) }).ok, true);
});

test("validates email and phone formats", () => {
  assert.equal(validateEnquiry({ ...base(), email: "not-an-email" }).field, "email");
  assert.equal(validateEnquiry({ ...base(), phone: "abc" }).field, "phone");
  assert.equal(validateEnquiry({ ...base(), phone: "+1 (415) 555-0100" }).ok, true);
});

test("keeps business revenue and acquisition budget separate", () => {
  const buy = validateEnquiry({ ...base(), flowType: "buy-business", investmentBudget: BUY_BUDGET_OPTIONS[0], estimatedRevenue: SELL_REVENUE_OPTIONS[0] });
  assert.equal(buy.ok, true);
  assert.equal(buy.data.investmentBudget, BUY_BUDGET_OPTIONS[0]);
  assert.equal(buy.data.estimatedRevenue, null, "revenue is dropped from the buy flow");

  const sell = validateEnquiry({ ...base(), flowType: "sell-business", estimatedRevenue: SELL_REVENUE_OPTIONS[1], investmentBudget: BUY_BUDGET_OPTIONS[0] });
  assert.equal(sell.ok, true);
  assert.equal(sell.data.estimatedRevenue, SELL_REVENUE_OPTIONS[1]);
  assert.equal(sell.data.investmentBudget, null, "budget is dropped from the sell flow");
});

test("rejects select values that are not offered for the flow", () => {
  assert.equal(validateEnquiry({ ...base(), flowType: "sell-business", estimatedRevenue: "Under AED 20M" }).field, "estimatedRevenue");
  assert.equal(validateEnquiry({ ...base(), flowType: "advisory", interestArea: "<script>" }).field, "interestArea");
});

test("normalises and validates listing references", () => {
  const ok = validateEnquiry({ ...base(), flowType: "buy-business", targetListingRef: "gv-tech-8402" });
  assert.equal(ok.data.targetListingRef, "GV-TECH-8402");
  assert.equal(validateEnquiry({ ...base(), flowType: "buy-business", targetListingRef: "'; DROP TABLE" }).field, "targetListingRef");
});

test("strips control characters from single-line fields", () => {
  const r = validateEnquiry({ ...base(), fullName: "Test\u0000 Person\n" });
  assert.equal(r.data.fullName, "Test Person");
});

test("all five flows validate", () => {
  for (const flowType of FLOW_TYPES) assert.equal(validateEnquiry({ ...base(), flowType }).ok, true, flowType);
});
