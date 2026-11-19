import test, { describe, it } from "node:test";
import assert from "node:assert";

// Simple re-implementation or direct import test for validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,20}$/;

function validateEnquiryInput(rawBody) {
  if (!rawBody || typeof rawBody !== "object") {
    return { isValid: false, error: "Invalid request payload format." };
  }
  const data = rawBody;

  // Anti-bot Honeypot check
  if (data.websiteUrl && typeof data.websiteUrl === "string" && data.websiteUrl.trim().length > 0) {
    return { isValid: false, error: "Submission rejected." };
  }

  const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
  if (!fullName || fullName.length < 2 || fullName.length > 100) {
    return { isValid: false, error: "Please provide a valid full name (2–100 characters)." };
  }

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email) || email.length > 120) {
    return { isValid: false, error: "Please provide a valid corporate or professional email address." };
  }

  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  if (!phone || !PHONE_REGEX.test(phone) || phone.length < 6 || phone.length > 30) {
    return { isValid: false, error: "Please provide a valid telephone number with country code." };
  }

  return { isValid: true, sanitized: { fullName, email, phone } };
}

describe("Enquiry Input Validation & Anti-Abuse", () => {
  it("should accept valid corporate submission", () => {
    const res = validateEnquiryInput({
      fullName: "Rashid Al-Maktoum",
      email: "rashid@holding.ae",
      phone: "+971501234567",
      flowType: "sell-business",
      message: "Exploring strategic divestiture.",
    });
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.sanitized.fullName, "Rashid Al-Maktoum");
    assert.strictEqual(res.sanitized.email, "rashid@holding.ae");
  });

  it("should reject submissions triggered by bots filling honeypot", () => {
    const res = validateEnquiryInput({
      fullName: "Spam Bot",
      email: "bot@spam.com",
      phone: "+1234567890",
      websiteUrl: "http://spamlink.com", // honeypot filled
    });
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(res.error, "Submission rejected.");
  });

  it("should reject invalid email formats", () => {
    const res = validateEnquiryInput({
      fullName: "Tariq Al-Mansoor",
      email: "invalid-email-address",
      phone: "+971501234567",
    });
    assert.strictEqual(res.isValid, false);
    assert.match(res.error, /valid corporate or professional email/);
  });

  it("should reject missing or single-character names", () => {
    const res = validateEnquiryInput({
      fullName: "A",
      email: "a@domain.com",
      phone: "+971501234567",
    });
    assert.strictEqual(res.isValid, false);
    assert.match(res.error, /full name \(2–100 characters\)/);
  });

  it("should reject invalid phone numbers", () => {
    const res = validateEnquiryInput({
      fullName: "Tariq Al-Mansoor",
      email: "tariq@domain.com",
      phone: "123", // too short
    });
    assert.strictEqual(res.isValid, false);
    assert.match(res.error, /valid telephone number/);
  });
});
