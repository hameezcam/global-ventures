import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  validateEnquiryInput,
  generateCryptographicReference,
  persistEnquiryLocally,
  StoredEnquiry,
} from "@/lib/enquiryService";

const MAX_PAYLOAD_BYTES = 32 * 1024; // 32KB payload size cap

export async function POST(request: NextRequest) {
  try {
    // 1. Payload size check
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds allowable size limit (32KB)." },
        { status: 413 }
      );
    }

    // 2. IP Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000); // 5 requests per 10 mins
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many consultation requests. Please try again in ${rateLimit.resetInSeconds} seconds or contact our advisory desk directly.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSeconds.toString(),
          },
        }
      );
    }

    // 3. Parse JSON safely
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload." },
        { status: 400 }
      );
    }

    // 4. Input validation and field preservation
    const validation = validateEnquiryInput(rawBody);
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        { success: false, error: validation.error || "Validation failed." },
        { status: 400 }
      );
    }

    const sanitized = validation.sanitizedData;

    // 5. Generate unpredictable, collision-resistant reference token
    const referenceId = generateCryptographicReference(sanitized.flowType);

    // 6. Build the durable stored enquiry object
    const storedRecord: StoredEnquiry = {
      ...sanitized,
      referenceId,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || undefined,
      createdAt: new Date().toISOString(),
      status: "received",
    };

    // 7. Durably persist to local append-only storage
    const storageResult = await persistEnquiryLocally(storedRecord);
    if (!storageResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Our secure storage service is temporarily unavailable. Your mandate could not be recorded. Please reach our advisory directors directly.",
        },
        { status: 503 }
      );
    }

    // 8. Return truthful confirmation with verified reference token
    return NextResponse.json(
      {
        success: true,
        referenceId,
        flowType: sanitized.flowType,
        message:
          `Your confidential inquiry has been durably registered under reference ${referenceId}. ` +
          `A senior practice director will review the submission subject to bilateral non-disclosure protocols.`,
        targetListingRef: sanitized.targetListingRef || null,
        receivedAt: storedRecord.createdAt,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Enquiry Handler Exception]:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected system error occurred. Please contact our advisory office directly.",
      },
      { status: 500 }
    );
  }
}
