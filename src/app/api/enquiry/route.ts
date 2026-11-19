import { NextRequest, NextResponse } from "next/server";
import { EnquiryPayload } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryPayload = await request.json();

    const {
      fullName,
      email,
      phone,
      flowType,
      targetListingRef,
    } = body;

    // Strict validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid corporate or personal email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact telephone number." },
        { status: 400 }
      );
    }

    const validFlows = ["general", "sell-business", "buy-business", "valuation", "advisory"];
    const verifiedFlow = validFlows.includes(flowType) ? flowType : "general";

    // Generate reference code
    const timestamp = Date.now().toString().slice(-6);
    const flowPrefix =
      verifiedFlow === "sell-business"
        ? "SELL"
        : verifiedFlow === "buy-business"
        ? "BUY"
        : verifiedFlow === "valuation"
        ? "VAL"
        : verifiedFlow === "advisory"
        ? "ADV"
        : "GEN";

    const inquiryReference = `GV-${flowPrefix}-${timestamp}`;

    return NextResponse.json(
      {
        success: true,
        referenceId: inquiryReference,
        flowType: verifiedFlow,
        message:
          "Your confidential consultation request has been registered under reference " +
          inquiryReference +
          ". A senior advisory director will review your details discreetly.",
        targetListingRef: targetListingRef || null,
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your consultation request.",
      },
      { status: 500 }
    );
  }
}
