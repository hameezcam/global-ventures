"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ADVISORY_FOCUS_OPTIONS,
  BUY_BUDGET_OPTIONS,
  FLOW_LABELS,
  FIELD_LIMITS,
  PRIVACY_NOTICE_VERSION,
  SELL_REVENUE_OPTIONS,
  SELL_TIMELINE_OPTIONS,
  VALUATION_PURPOSE_OPTIONS,
  VALUATION_REVENUE_OPTIONS,
  type FlowType,
} from "@/lib/enquiry/schema";

interface ConsultationFormProps {
  initialFlow?: FlowType;
  prefilledListingRef?: string;
  onSuccess?: (referenceCode: string) => void;
  className?: string;
  compact?: boolean;
}

const FLOW_TABS: { id: FlowType; label: string }[] = [
  { id: "general", label: "General" },
  { id: "sell-business", label: "Selling" },
  { id: "buy-business", label: "Buying" },
  { id: "valuation", label: "Valuation" },
  { id: "advisory", label: "Advisory" },
];

/** Fields each flow submits; everything else is left out of the request. */
const FLOW_FIELDS: Record<FlowType, (keyof FormState)[]> = {
  general: [],
  "sell-business": ["estimatedRevenue", "timeline"],
  "buy-business": ["investmentBudget", "targetListingRef"],
  valuation: ["interestArea", "estimatedRevenue"],
  advisory: ["interestArea"],
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  role: string;
  interestArea: string;
  estimatedRevenue: string;
  investmentBudget: string;
  timeline: string;
  targetListingRef: string;
  message: string;
  ndaAcknowledged: boolean;
  privacyConsent: boolean;
  websiteUrl: string;
}

const emptyForm = (listingRef = ""): FormState => ({
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  role: "",
  interestArea: "",
  estimatedRevenue: "",
  investmentBudget: "",
  timeline: "",
  targetListingRef: listingRef,
  message: "",
  ndaAcknowledged: false,
  privacyConsent: false,
  websiteUrl: "",
});

/** Idempotency key for one submission attempt (secure contexts only: HTTPS or localhost). */
function newKey(): string {
  return crypto.randomUUID();
}

const inputClass = "f-input";
const labelClass = "f-label";

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialFlow = "general",
  prefilledListingRef = "",
  onSuccess,
  className = "",
  compact = false,
}) => {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [flowType, setFlowType] = useState<FlowType>(initialFlow);
  const [formData, setFormData] = useState<FormState>(() => emptyForm(prefilledListingRef));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState("");

  const submittingRef = useRef(false);
  const idempotencyKeyRef = useRef<string>("");
  const startedAtRef = useRef<number>(0);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // A retry of the exact same enquiry reuses its key (so the server can
  // de-duplicate it); any edit makes it a new enquiry with a new key.
  useEffect(() => {
    idempotencyKeyRef.current = newKey();
  }, [formData, flowType]);

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: next }));
    if (errorField === name) setErrorField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return; // guards against double clicks before re-render
    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");
    setErrorField(null);

    const payload: Record<string, unknown> = {
      flowType,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      role: formData.role,
      message: formData.message,
      ndaAcknowledged: formData.ndaAcknowledged,
      privacyConsent: formData.privacyConsent,
      privacyConsentVersion: PRIVACY_NOTICE_VERSION,
      websiteUrl: formData.websiteUrl,
      formElapsedMs: Date.now() - startedAtRef.current,
    };
    for (const field of FLOW_FIELDS[flowType]) payload[field] = formData[field];

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKeyRef.current },
        body: JSON.stringify(payload),
      });
      const isJson = (res.headers.get("content-type") ?? "").includes("application/json");
      const data = isJson ? await res.json().catch(() => null) : null;

      if (!res.ok || !data?.success || typeof data.referenceCode !== "string") {
        setErrorField(typeof data?.field === "string" ? data.field : null);
        throw new Error(
          data?.error ??
            (res.status >= 500
              ? "Our enquiry service is temporarily unavailable. Your enquiry was not saved. Please try again shortly."
              : "We could not submit your enquiry. Please check the form and try again.")
        );
      }

      setSuccessReference(data.referenceCode);
      setStatus("success");
      onSuccess?.(data.referenceCode);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof TypeError
          ? "We could not reach our server. Please check your connection and try again. Your details are still in the form."
          : err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again."
      );
    } finally {
      submittingRef.current = false;
    }
  };

  const invalid = (name: string) => (errorField === name ? { "aria-invalid": true as const, "aria-describedby": id("form-error") } : {});
  const isSubmitting = status === "submitting";

  if (status === "success") {
    return (
      <div className={`f-ok ${className}`} role="status">
        <p className="kicker">{FLOW_LABELS[flowType]}</p>
        <h3 ref={successRef} tabIndex={-1}>
          Your enquiry has been received.
        </h3>
        <p className="muted">
          Thank you. Your enquiry has been saved securely and a member of our team will review it. Please keep the
          reference below for any follow-up.
        </p>
        <div className="f-ref">
          <span>Enquiry reference</span>
          <b>{successReference}</b>
        </div>
        <p className="f-hint">Information you share is handled confidentially under our privacy notice.</p>
        <button
          type="button"
          className="tlink"
          style={{ justifySelf: "start" }}
          onClick={() => {
            setFormData(emptyForm());
            startedAtRef.current = Date.now();
            setStatus("idle");
          }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const req = (
    <span className="req" aria-hidden="true">
      *
    </span>
  );

  return (
    <div className={`f-wrap ${className}`}>
      <div className="f-head">
        <h3 id={id("title")}>Begin a confidential conversation.</h3>
        <p id={id("flow-hint")} className="muted">
          Choose what you would like to discuss, so your enquiry reaches the right adviser.
        </p>
        <div role="group" aria-label="Enquiry type" aria-describedby={id("flow-hint")} className="f-tabs">
          {FLOW_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={flowType === tab.id}
              disabled={isSubmitting}
              onClick={() => setFlowType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <div ref={errorRef} id={id("form-error")} role="alert" tabIndex={-1} className="f-alert">
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="f-stack" aria-labelledby={id("title")} aria-busy={isSubmitting}>
        <fieldset disabled={isSubmitting} className="f-stack">
          <div className="f-grid">
            <div>
              <label htmlFor={id("fullName")} className={labelClass}>
                Full name {req}
              </label>
              <input
                id={id("fullName")}
                type="text"
                name="fullName"
                required
                autoComplete="name"
                minLength={FIELD_LIMITS.fullName.min}
                maxLength={FIELD_LIMITS.fullName.max}
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("fullName")}
              />
            </div>

            <div>
              <label htmlFor={id("email")} className={labelClass}>
                Email {req}
              </label>
              <input
                id={id("email")}
                type="email"
                name="email"
                required
                autoComplete="email"
                maxLength={FIELD_LIMITS.email.max}
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("email")}
              />
            </div>

            <div>
              <label htmlFor={id("phone")} className={labelClass}>
                Phone {req}
              </label>
              <input
                id={id("phone")}
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                maxLength={FIELD_LIMITS.phone.max}
                placeholder="+971 50 000 0000"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("phone")}
              />
            </div>

            <div>
              <label htmlFor={id("companyName")} className={labelClass}>
                Company
              </label>
              <input
                id={id("companyName")}
                type="text"
                name="companyName"
                autoComplete="organization"
                maxLength={FIELD_LIMITS.companyName.max}
                placeholder="Company or family office"
                value={formData.companyName}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("companyName")}
              />
            </div>

            <div className="full">
              <label htmlFor={id("role")} className={labelClass}>
                Your role
              </label>
              <input
                id={id("role")}
                type="text"
                name="role"
                autoComplete="organization-title"
                maxLength={FIELD_LIMITS.role.max}
                placeholder="For example founder, CFO or investment director"
                value={formData.role}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("role")}
              />
            </div>
          </div>

          {flowType === "sell-business" && (
            <div className="f-grid f-flow">
              <div>
                <label htmlFor={id("estimatedRevenue")} className={labelClass}>
                  Annual revenue
                </label>
                <select id={id("estimatedRevenue")} name="estimatedRevenue" value={formData.estimatedRevenue} onChange={handleInputChange} className={inputClass} {...invalid("estimatedRevenue")}>
                  <option value="">Select a range</option>
                  {SELL_REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("timeline")} className={labelClass}>
                  When would you like to sell?
                </label>
                <select id={id("timeline")} name="timeline" value={formData.timeline} onChange={handleInputChange} className={inputClass} {...invalid("timeline")}>
                  <option value="">Select a timeline</option>
                  {SELL_TIMELINE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {flowType === "buy-business" && (
            <div className="f-grid f-flow">
              <div>
                <label htmlFor={id("investmentBudget")} className={labelClass}>
                  Acquisition budget
                </label>
                <select id={id("investmentBudget")} name="investmentBudget" value={formData.investmentBudget} onChange={handleInputChange} className={inputClass} {...invalid("investmentBudget")}>
                  <option value="">Select a range</option>
                  {BUY_BUDGET_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("targetListingRef")} className={labelClass}>
                  Opportunity reference, if any
                </label>
                <input
                  id={id("targetListingRef")}
                  type="text"
                  name="targetListingRef"
                  maxLength={FIELD_LIMITS.targetListingRef.max}
                  placeholder="For example GV-TECH-8402"
                  value={formData.targetListingRef}
                  onChange={handleInputChange}
                  className={inputClass}
                  {...invalid("targetListingRef")}
                />
              </div>
            </div>
          )}

          {flowType === "valuation" && (
            <div className="f-grid f-flow">
              <div>
                <label htmlFor={id("interestArea")} className={labelClass}>
                  Purpose of the valuation
                </label>
                <select id={id("interestArea")} name="interestArea" value={formData.interestArea} onChange={handleInputChange} className={inputClass} {...invalid("interestArea")}>
                  <option value="">Select a purpose</option>
                  {VALUATION_PURPOSE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("estimatedRevenue")} className={labelClass}>
                  Approximate annual revenue
                </label>
                <select id={id("estimatedRevenue")} name="estimatedRevenue" value={formData.estimatedRevenue} onChange={handleInputChange} className={inputClass} {...invalid("estimatedRevenue")}>
                  <option value="">Select a range</option>
                  {VALUATION_REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {flowType === "advisory" && (
            <div className="f-flow">
              <label htmlFor={id("interestArea")} className={labelClass}>
                What do you need advice on?
              </label>
              <select id={id("interestArea")} name="interestArea" value={formData.interestArea} onChange={handleInputChange} className={inputClass} {...invalid("interestArea")}>
                <option value="">Select an area</option>
                {ADVISORY_FOCUS_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor={id("message")} className={labelClass}>
              About your situation
            </label>
            <textarea
              id={id("message")}
              name="message"
              rows={compact ? 3 : 4}
              maxLength={FIELD_LIMITS.message.max}
              aria-describedby={id("message-hint")}
              placeholder="A few lines on the business and what you would like to achieve."
              value={formData.message}
              onChange={handleInputChange}
              className={inputClass}
              {...invalid("message")}
            />
            <p id={id("message-hint")} className="f-hint">
              Please do not include account numbers, passwords or detailed financial statements. These are exchanged
              only after an NDA. {formData.message.length}/{FIELD_LIMITS.message.max}
            </p>
          </div>

          {/* Honeypot: hidden from people and assistive technology, tempting for bots. */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor={id("websiteUrl")}>Leave this field empty</label>
            <input type="text" id={id("websiteUrl")} name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="f-stack" style={{ gap: 16 }}>
            <div className="f-check">
              <input
                type="checkbox"
                id={id("privacyConsent")}
                name="privacyConsent"
                required
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                {...invalid("privacyConsent")}
              />
              <label htmlFor={id("privacyConsent")}>
                I have read the{" "}
                <Link href="/privacy-policy" target="_blank" rel="noopener">
                  privacy notice
                </Link>{" "}
                (version {PRIVACY_NOTICE_VERSION}) and agree that Global Venture may store and use these details to respond
                to my enquiry. {req}
              </label>
            </div>

            <div className="f-check">
              <input
                type="checkbox"
                id={id("ndaAcknowledged")}
                name="ndaAcknowledged"
                checked={formData.ndaAcknowledged}
                onChange={handleInputChange}
              />
              <label htmlFor={id("ndaAcknowledged")}>
                Optional: I understand that a non-disclosure agreement will be put in place before any non-public
                financial information is exchanged.
              </label>
            </div>
          </div>

          <div>
            <button type="submit" aria-disabled={isSubmitting} className="cta solid">
              {isSubmitting ? "Submitting securely…" : "Send enquiry"}
              <span className="ln" aria-hidden="true" />
            </button>
            <p className="sr-only" aria-live="polite">
              {isSubmitting ? "Submitting your enquiry" : ""}
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ConsultationForm;
