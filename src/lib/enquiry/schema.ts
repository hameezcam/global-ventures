/**
 * Enquiry field definitions and server-side validation.
 *
 * This module is shared by the browser form (for option lists) and the API
 * route (for validation). It must stay free of imports and Node-only APIs so it
 * can run in both places and be loaded directly by the Node test runner.
 */

export const FLOW_TYPES = ["general", "sell-business", "buy-business", "valuation", "advisory"] as const;
export type FlowType = (typeof FLOW_TYPES)[number];

/** Bump this whenever the privacy policy text changes materially. */
export const PRIVACY_NOTICE_VERSION = "2026-11-19";

export const FLOW_LABELS: Record<FlowType, string> = {
  general: "General Consultation",
  "sell-business": "Sell a Business",
  "buy-business": "Buy a Business",
  valuation: "Business Valuation",
  advisory: "Financial Advisory",
};

export const SELL_REVENUE_OPTIONS = [
  "Under AED 10M",
  "AED 10M - AED 30M",
  "AED 30M - AED 75M",
  "AED 75M - AED 150M",
  "Over AED 150M",
] as const;

export const SELL_TIMELINE_OPTIONS = [
  "Immediate (0 - 6 months)",
  "Medium-term (6 - 18 months)",
  "Long-term exit readiness (18+ months)",
] as const;

export const BUY_BUDGET_OPTIONS = [
  "AED 10M - AED 25M",
  "AED 25M - AED 60M",
  "AED 60M - AED 150M",
  "Over AED 150M",
] as const;

export const VALUATION_PURPOSE_OPTIONS = [
  "Potential M&A / Shareholder Exit",
  "Partner Buyout or Admission",
  "Financial Reporting & Tax Compliance",
  "Commercial Dispute or Litigation",
  "Strategic Board Benchmarking",
] as const;

export const VALUATION_REVENUE_OPTIONS = ["Under AED 20M", "AED 20M - AED 80M", "Over AED 80M"] as const;

export const ADVISORY_FOCUS_OPTIONS = [
  "Debt Advisory & Restructuring",
  "Growth Capital Sourcing",
  "Financial Due Diligence / QoE",
  "Corporate Reorganization & Joint Venture",
] as const;

export const FIELD_LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { min: 6, max: 30 },
  companyName: { max: 120 },
  role: { max: 80 },
  targetListingRef: { max: 50 },
  message: { max: 2000 },
} as const;

/** Minimum time a person plausibly needs to fill the form (bot heuristic). */
export const MIN_FORM_FILL_MS = 2000;

export interface EnquiryInput {
  flowType: FlowType;
  fullName: string;
  email: string;
  phone: string;
  companyName: string | null;
  role: string | null;
  interestArea: string | null;
  estimatedRevenue: string | null;
  investmentBudget: string | null;
  timeline: string | null;
  targetListingRef: string | null;
  message: string | null;
  ndaAcknowledged: boolean;
  privacyConsentVersion: string;
}

export type ValidationResult =
  | { ok: true; data: EnquiryInput }
  | { ok: false; error: string; field?: string; reason: "invalid" | "bot" };

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^\+?[0-9 ()./-]{6,30}$/;
const LISTING_REF_REGEX = /^[A-Z0-9][A-Z0-9-]{1,49}$/;
// C0/C1 control characters other than tab, newline and carriage return.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
const SINGLE_LINE_CONTROL = /[\u0000-\u001F\u007F-\u009F]/g;

const ALLOWED_KEYS = new Set([
  "flowType",
  "fullName",
  "email",
  "phone",
  "companyName",
  "role",
  "interestArea",
  "estimatedRevenue",
  "investmentBudget",
  "timeline",
  "targetListingRef",
  "message",
  "ndaAcknowledged",
  "privacyConsent",
  "privacyConsentVersion",
  "websiteUrl",
  "formElapsedMs",
]);

function fail(error: string, field?: string): ValidationResult {
  return { ok: false, error, field, reason: "invalid" };
}

function singleLine(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") return "\u0000invalid";
  return value.replace(SINGLE_LINE_CONTROL, " ").replace(/\s+/g, " ").trim();
}

function optionalText(value: unknown, field: string, max: number): string | null | ValidationResult {
  const text = singleLine(value);
  if (text === undefined || text === "") return null;
  if (text === "\u0000invalid") return fail(`Invalid value for ${field}.`, field);
  if (text.length > max) return fail(`${field} must be ${max} characters or fewer.`, field);
  return text;
}

function optionalChoice(value: unknown, field: string, options: readonly string[]): string | null | ValidationResult {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || !options.includes(value)) {
    return fail(`Please choose a valid option for ${field}.`, field);
  }
  return value;
}

function isFailure(v: unknown): v is ValidationResult {
  return typeof v === "object" && v !== null && "ok" in v;
}

/**
 * Validates and normalises an untrusted request body.
 * Fields that do not belong to the selected flow are discarded, so the database
 * only ever holds what that flow actually asks for.
 */
export function validateEnquiry(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return fail("Invalid request payload.");
  }
  const body = raw as Record<string, unknown>;

  for (const key of Object.keys(body)) {
    if (!ALLOWED_KEYS.has(key)) return fail("Unexpected field in request.", key);
  }

  // Bot heuristics: hidden honeypot field and an implausibly fast submission.
  if (typeof body.websiteUrl === "string" && body.websiteUrl.trim() !== "") {
    return { ok: false, error: "Submission rejected.", reason: "bot" };
  }
  if (
    typeof body.formElapsedMs !== "number" ||
    !Number.isFinite(body.formElapsedMs) ||
    body.formElapsedMs < MIN_FORM_FILL_MS
  ) {
    return { ok: false, error: "Submission rejected. Please take a moment to review the form and try again.", reason: "bot" };
  }

  if (typeof body.flowType !== "string" || !(FLOW_TYPES as readonly string[]).includes(body.flowType)) {
    return fail("Unknown enquiry type.", "flowType");
  }
  const flowType = body.flowType as FlowType;

  const fullName = singleLine(body.fullName) ?? "";
  if (fullName === "\u0000invalid" || fullName.length < FIELD_LIMITS.fullName.min || fullName.length > FIELD_LIMITS.fullName.max) {
    return fail("Please provide your full name (2 to 100 characters).", "fullName");
  }

  const emailRaw = singleLine(body.email) ?? "";
  const email = emailRaw.toLowerCase();
  if (emailRaw === "\u0000invalid" || email.length > FIELD_LIMITS.email.max || !EMAIL_REGEX.test(email)) {
    return fail("Please provide a valid email address.", "email");
  }

  const phone = singleLine(body.phone) ?? "";
  const phoneDigits = phone.replace(/\D/g, "").length;
  if (phone === "\u0000invalid" || !PHONE_REGEX.test(phone) || phoneDigits < 6 || phoneDigits > 15) {
    return fail("Please provide a valid phone number, including the country code.", "phone");
  }

  const companyName = optionalText(body.companyName, "companyName", FIELD_LIMITS.companyName.max);
  if (isFailure(companyName)) return companyName;
  const role = optionalText(body.role, "role", FIELD_LIMITS.role.max);
  if (isFailure(role)) return role;

  let message: string | null = null;
  if (body.message !== undefined && body.message !== null) {
    if (typeof body.message !== "string") return fail("Invalid message.", "message");
    const cleaned = body.message.replace(CONTROL_CHARS, "").replace(/\r\n?/g, "\n").trim();
    if (cleaned.length > FIELD_LIMITS.message.max) {
      return fail("Your message must be 2,000 characters or fewer.", "message");
    }
    message = cleaned === "" ? null : cleaned;
  }

  if (body.ndaAcknowledged !== undefined && typeof body.ndaAcknowledged !== "boolean") {
    return fail("Invalid confidentiality acknowledgement.", "ndaAcknowledged");
  }
  const ndaAcknowledged = body.ndaAcknowledged === true;

  if (body.privacyConsent !== true) {
    return fail("Please confirm you have read the privacy notice.", "privacyConsent");
  }
  if (body.privacyConsentVersion !== PRIVACY_NOTICE_VERSION) {
    return fail("The privacy notice has been updated. Please reload the page and review it again.", "privacyConsentVersion");
  }

  // Flow-specific fields. Anything not listed for the flow is dropped.
  let interestArea: string | null | ValidationResult = null;
  let estimatedRevenue: string | null | ValidationResult = null;
  let investmentBudget: string | null | ValidationResult = null;
  let timeline: string | null | ValidationResult = null;
  let targetListingRef: string | null | ValidationResult = null;

  switch (flowType) {
    case "sell-business":
      estimatedRevenue = optionalChoice(body.estimatedRevenue, "estimatedRevenue", SELL_REVENUE_OPTIONS);
      timeline = optionalChoice(body.timeline, "timeline", SELL_TIMELINE_OPTIONS);
      break;
    case "buy-business": {
      investmentBudget = optionalChoice(body.investmentBudget, "investmentBudget", BUY_BUDGET_OPTIONS);
      const ref = optionalText(body.targetListingRef, "targetListingRef", FIELD_LIMITS.targetListingRef.max);
      if (typeof ref === "string") {
        const upper = ref.toUpperCase();
        targetListingRef = LISTING_REF_REGEX.test(upper)
          ? upper
          : fail("Listing references use letters, numbers and hyphens only.", "targetListingRef");
      } else {
        targetListingRef = ref;
      }
      break;
    }
    case "valuation":
      interestArea = optionalChoice(body.interestArea, "interestArea", VALUATION_PURPOSE_OPTIONS);
      estimatedRevenue = optionalChoice(body.estimatedRevenue, "estimatedRevenue", VALUATION_REVENUE_OPTIONS);
      break;
    case "advisory":
      interestArea = optionalChoice(body.interestArea, "interestArea", ADVISORY_FOCUS_OPTIONS);
      break;
    case "general":
      break;
  }

  for (const v of [interestArea, estimatedRevenue, investmentBudget, timeline, targetListingRef]) {
    if (isFailure(v)) return v;
  }

  return {
    ok: true,
    data: {
      flowType,
      fullName,
      email,
      phone,
      companyName: companyName as string | null,
      role: role as string | null,
      interestArea: interestArea as string | null,
      estimatedRevenue: estimatedRevenue as string | null,
      investmentBudget: investmentBudget as string | null,
      timeline: timeline as string | null,
      targetListingRef: targetListingRef as string | null,
      message,
      ndaAcknowledged,
      privacyConsentVersion: PRIVACY_NOTICE_VERSION,
    },
  };
}
