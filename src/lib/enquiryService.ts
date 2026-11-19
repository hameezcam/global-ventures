import fs from "fs";
import path from "path";
import crypto from "crypto";
import { EnquiryPayload } from "@/types";

export interface StoredEnquiry extends EnquiryPayload {
  referenceId: string;
  ipAddress: string;
  userAgent?: string;
  createdAt: string;
  status: "received" | "dispatched" | "archived";
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedData?: EnquiryPayload;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,20}$/;

export function validateEnquiryInput(rawBody: unknown): ValidationResult {
  if (!rawBody || typeof rawBody !== "object") {
    return { isValid: false, error: "Invalid request payload format." };
  }

  const data = rawBody as Record<string, unknown>;

  // Anti-bot Honeypot check
  if (data.websiteUrl && typeof data.websiteUrl === "string" && data.websiteUrl.trim().length > 0) {
    return { isValid: false, error: "Submission rejected." };
  }

  // Full Name
  const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
  if (!fullName || fullName.length < 2 || fullName.length > 100) {
    return { isValid: false, error: "Please provide a valid full name (2–100 characters)." };
  }

  // Email
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email) || email.length > 120) {
    return { isValid: false, error: "Please provide a valid corporate or professional email address." };
  }

  // Phone
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  if (!phone || !PHONE_REGEX.test(phone) || phone.length < 6 || phone.length > 30) {
    return { isValid: false, error: "Please provide a valid telephone number with country code." };
  }

  // Flow Type
  const validFlows = ["general", "sell-business", "buy-business", "valuation", "advisory"];
  const flowType = (typeof data.flowType === "string" && validFlows.includes(data.flowType)
    ? data.flowType
    : "general") as EnquiryPayload["flowType"];

  // Optional fields with length sanitization
  const companyName = typeof data.companyName === "string" ? data.companyName.trim().slice(0, 120) : undefined;
  const role = typeof data.role === "string" ? data.role.trim().slice(0, 80) : undefined;
  const interestArea = typeof data.interestArea === "string" ? data.interestArea.trim().slice(0, 100) : undefined;
  const estimatedRevenue = typeof data.estimatedRevenue === "string" ? data.estimatedRevenue.trim().slice(0, 80) : undefined;
  const timeline = typeof data.timeline === "string" ? data.timeline.trim().slice(0, 80) : undefined;
  const targetListingRef = typeof data.targetListingRef === "string" ? data.targetListingRef.trim().slice(0, 50) : undefined;
  const message = typeof data.message === "string" ? data.message.trim().slice(0, 2000) : "";
  const ndaAcknowledged = Boolean(data.ndaAcknowledged);

  return {
    isValid: true,
    sanitizedData: {
      flowType,
      fullName,
      email,
      phone,
      companyName,
      role,
      interestArea,
      estimatedRevenue,
      timeline,
      targetListingRef,
      message,
      ndaAcknowledged,
    },
  };
}

export function generateCryptographicReference(flowType: EnquiryPayload["flowType"]): string {
  const prefixMap: Record<string, string> = {
    "sell-business": "SELL",
    "buy-business": "BUY",
    valuation: "VAL",
    advisory: "ADV",
    general: "GEN",
  };
  const prefix = prefixMap[flowType] || "GEN";
  // Unpredictable 8-character cryptographic random token
  const randomSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `GV-${prefix}-${randomSuffix}`;
}

export async function persistEnquiryLocally(
  enquiry: StoredEnquiry
): Promise<{ success: boolean; error?: string }> {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "enquiries.jsonl");

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const line = JSON.stringify(enquiry) + "\n";
    await fs.promises.appendFile(filePath, line, { encoding: "utf8" });

    return { success: true };
  } catch (err) {
    console.error("[Enquiry Storage Failure]:", err);
    return {
      success: false,
      error: "Critical: Internal storage failure. Inquiry could not be persisted.",
    };
  }
}
