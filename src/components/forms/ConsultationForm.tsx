"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Shield, ArrowRight, Loader2 } from "lucide-react";
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
  { id: "sell-business", label: "Sell Business" },
  { id: "buy-business", label: "Acquire" },
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

const inputClass =
  "w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 transition-colors aria-[invalid=true]:border-red-400";
const labelClass = "block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium";

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
      <div className={`bg-navy-900 border border-gold-500/30 p-8 rounded-lg text-center ${className}`} role="status">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-gold-400" aria-hidden="true" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">{FLOW_LABELS[flowType]}</span>
        <h3 ref={successRef} tabIndex={-1} className="text-2xl md:text-3xl font-serif text-white mt-2 mb-3 focus:outline-none">
          Your Enquiry Has Been Received
        </h3>
        <p className="text-ivory-100/80 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you. Your enquiry has been saved securely and a member of our team will review it. Please keep the
          reference below for any follow-up.
        </p>

        <div className="bg-navy-950 border border-white/10 rounded-md p-4 max-w-sm mx-auto mb-6">
          <span className="text-xs text-slate-300 block mb-1">Enquiry Reference</span>
          <span className="text-lg font-mono font-bold text-gold-400 tracking-wider">{successReference}</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
          <Shield className="w-4 h-4 text-gold-400" aria-hidden="true" />
          <span>Information you share is handled confidentially under our privacy notice.</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData(emptyForm());
            startedAtRef.current = Date.now();
            setStatus("idle");
          }}
          className="mt-8 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 underline underline-offset-4"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-navy-900 border border-white/10 p-6 md:p-10 rounded-lg relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />
          <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">Confidential Consultation</span>
        </div>
        <h3 id={id("title")} className="text-2xl md:text-3xl font-serif text-white">
          Begin a Discreet Conversation
        </h3>
        <p id={id("flow-hint")} className="text-sm text-ivory-100/70 mt-1">
          Select your primary requirement below to connect with the appropriate practice partner.
        </p>

        <div
          role="group"
          aria-label="Enquiry type"
          aria-describedby={id("flow-hint")}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 mt-6 bg-navy-950 p-1.5 rounded-lg border border-white/10"
        >
          {FLOW_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={flowType === tab.id}
              disabled={isSubmitting}
              onClick={() => setFlowType(tab.id)}
              className={`py-2 px-3 text-xs font-medium rounded transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 ${
                flowType === tab.id
                  ? "bg-gold-500 text-navy-950 shadow-sm font-semibold"
                  : "text-ivory-100/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <div
          ref={errorRef}
          id={id("form-error")}
          role="alert"
          tabIndex={-1}
          className="mb-6 p-4 rounded-md bg-red-950/40 border border-red-500/30 flex items-start gap-3 focus:outline-none"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-100">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby={id("title")} aria-busy={isSubmitting}>
        <fieldset disabled={isSubmitting} className="space-y-5 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor={id("fullName")} className={labelClass}>
                Full Name <span className="text-gold-400" aria-hidden="true">*</span>
              </label>
              <input
                id={id("fullName")}
                type="text"
                name="fullName"
                required
                autoComplete="name"
                minLength={FIELD_LIMITS.fullName.min}
                maxLength={FIELD_LIMITS.fullName.max}
                placeholder="e.g. Tariq Al-Mansoor"
                value={formData.fullName}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("fullName")}
              />
            </div>

            <div>
              <label htmlFor={id("email")} className={labelClass}>
                Corporate / Direct Email <span className="text-gold-400" aria-hidden="true">*</span>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor={id("phone")} className={labelClass}>
                Direct Phone Number <span className="text-gold-400" aria-hidden="true">*</span>
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
                Company Name / Family Office
              </label>
              <input
                id={id("companyName")}
                type="text"
                name="companyName"
                autoComplete="organization"
                maxLength={FIELD_LIMITS.companyName.max}
                placeholder="e.g. Al-Mansoor Holdings"
                value={formData.companyName}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("companyName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor={id("role")} className={labelClass}>
                Your Role
              </label>
              <input
                id={id("role")}
                type="text"
                name="role"
                autoComplete="organization-title"
                maxLength={FIELD_LIMITS.role.max}
                placeholder="e.g. Founder, CFO, Investment Director"
                value={formData.role}
                onChange={handleInputChange}
                className={inputClass}
                {...invalid("role")}
              />
            </div>
          </div>

          {flowType === "sell-business" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
              <div>
                <label htmlFor={id("estimatedRevenue")} className={labelClass}>
                  Annual Turnover / Revenue Range
                </label>
                <select id={id("estimatedRevenue")} name="estimatedRevenue" value={formData.estimatedRevenue} onChange={handleInputChange} className={inputClass} {...invalid("estimatedRevenue")}>
                  <option value="">Select Revenue Bracket</option>
                  {SELL_REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("timeline")} className={labelClass}>
                  Target Exit Horizon
                </label>
                <select id={id("timeline")} name="timeline" value={formData.timeline} onChange={handleInputChange} className={inputClass} {...invalid("timeline")}>
                  <option value="">Target Timeline</option>
                  {SELL_TIMELINE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {flowType === "buy-business" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
              <div>
                <label htmlFor={id("investmentBudget")} className={labelClass}>
                  Acquisition Investment Budget
                </label>
                <select id={id("investmentBudget")} name="investmentBudget" value={formData.investmentBudget} onChange={handleInputChange} className={inputClass} {...invalid("investmentBudget")}>
                  <option value="">Select Budget Bracket</option>
                  {BUY_BUDGET_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("targetListingRef")} className={labelClass}>
                  Target Listing Reference (If Applicable)
                </label>
                <input
                  id={id("targetListingRef")}
                  type="text"
                  name="targetListingRef"
                  maxLength={FIELD_LIMITS.targetListingRef.max}
                  placeholder="e.g. GV-TECH-8402"
                  value={formData.targetListingRef}
                  onChange={handleInputChange}
                  className={inputClass}
                  {...invalid("targetListingRef")}
                />
              </div>
            </div>
          )}

          {flowType === "valuation" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
              <div>
                <label htmlFor={id("interestArea")} className={labelClass}>
                  Primary Purpose of Valuation
                </label>
                <select id={id("interestArea")} name="interestArea" value={formData.interestArea} onChange={handleInputChange} className={inputClass} {...invalid("interestArea")}>
                  <option value="">Select Valuation Context</option>
                  {VALUATION_PURPOSE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("estimatedRevenue")} className={labelClass}>
                  Approximate Current Revenue
                </label>
                <select id={id("estimatedRevenue")} name="estimatedRevenue" value={formData.estimatedRevenue} onChange={handleInputChange} className={inputClass} {...invalid("estimatedRevenue")}>
                  <option value="">Select Bracket</option>
                  {VALUATION_REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {flowType === "advisory" && (
            <div className="pt-2 border-t border-white/10">
              <label htmlFor={id("interestArea")} className={labelClass}>
                Advisory Mandate Focus
              </label>
              <select id={id("interestArea")} name="interestArea" value={formData.interestArea} onChange={handleInputChange} className={inputClass} {...invalid("interestArea")}>
                <option value="">Select Mandate Requirement</option>
                {ADVISORY_FOCUS_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor={id("message")} className={labelClass}>
              Confidential Context & Strategic Objectives
            </label>
            <textarea
              id={id("message")}
              name="message"
              rows={compact ? 3 : 4}
              maxLength={FIELD_LIMITS.message.max}
              aria-describedby={id("message-hint")}
              placeholder="Outline the key parameters of your business or mandate."
              value={formData.message}
              onChange={handleInputChange}
              className={`${inputClass} resize-none`}
              {...invalid("message")}
            />
            <p id={id("message-hint")} className="mt-1.5 text-xs text-slate-300">
              Please do not include account numbers, passwords or detailed financial statements. These are exchanged
              only after an NDA. {formData.message.length}/{FIELD_LIMITS.message.max}
            </p>
          </div>

          {/* Honeypot: hidden from people and assistive technology, tempting for bots. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={id("websiteUrl")}>Leave this field empty</label>
            <input type="text" id={id("websiteUrl")} name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={id("privacyConsent")}
                name="privacyConsent"
                required
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-navy-950 text-gold-500 focus:ring-gold-500"
                {...invalid("privacyConsent")}
              />
              <label htmlFor={id("privacyConsent")} className="text-xs text-ivory-100/80 leading-relaxed">
                I have read the{" "}
                <Link href="/privacy-policy" className="text-gold-400 underline underline-offset-2 hover:text-gold-300" target="_blank" rel="noopener">
                  privacy notice
                </Link>{" "}
                (version {PRIVACY_NOTICE_VERSION}) and agree that Global Ventures may store and use these details to respond
                to my enquiry. <span className="text-gold-400" aria-hidden="true">*</span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={id("ndaAcknowledged")}
                name="ndaAcknowledged"
                checked={formData.ndaAcknowledged}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-navy-950 text-gold-500 focus:ring-gold-500"
              />
              <label htmlFor={id("ndaAcknowledged")} className="text-xs text-ivory-100/75 leading-relaxed">
                Optional: I understand that a formal Non-Disclosure Agreement (NDA) will be put in place before any
                proprietary or non-public financial records are exchanged.
              </label>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              aria-disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-widest transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-gold-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Submitting securely…</span>
                </>
              ) : (
                <>
                  <span>Request Private Consultation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
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
