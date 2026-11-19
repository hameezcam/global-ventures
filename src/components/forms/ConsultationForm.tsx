"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Shield, ArrowRight, Loader2 } from "lucide-react";
import { EnquiryPayload } from "@/types";

interface ConsultationFormProps {
  initialFlow?: "general" | "sell-business" | "buy-business" | "valuation" | "advisory";
  prefilledListingRef?: string;
  onSuccess?: (referenceId: string) => void;
  className?: string;
  compact?: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialFlow = "general",
  prefilledListingRef = "",
  onSuccess,
  className = "",
  compact = false,
}) => {
  const [flowType, setFlowType] = useState<EnquiryPayload["flowType"]>(initialFlow);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    role: "",
    interestArea: "",
    estimatedRevenue: "",
    timeline: "",
    targetListingRef: prefilledListingRef,
    message: "",
    ndaAcknowledged: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successReference, setSuccessReference] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, flowType }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setStatus("success");
      setSuccessReference(data.referenceId);
      if (onSuccess) {
        onSuccess(data.referenceId);
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className={`bg-navy-900 border border-gold-500/30 p-8 rounded-lg text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-gold-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">
          Confidential Mandate Initiated
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-white mt-2 mb-3">
          Your Request Has Been Securely Registered
        </h3>
        <p className="text-ivory-100/80 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you for entrusting Global Ventures with your strategic mandate. Your consultation has
          been logged with our senior advisory team.
        </p>

        <div className="bg-navy-950 border border-white/10 rounded-md p-4 max-w-sm mx-auto mb-6">
          <span className="text-xs text-slate-400 block mb-1">Confidential Reference Code</span>
          <span className="text-lg font-mono font-bold text-gold-400 tracking-wider">
            {successReference}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-gold-400" />
          <span>Strict non-disclosure protocols apply to all submitted information.</span>
        </div>

        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              companyName: "",
              role: "",
              interestArea: "",
              estimatedRevenue: "",
              timeline: "",
              targetListingRef: "",
              message: "",
              ndaAcknowledged: true,
            });
          }}
          className="mt-8 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 underline underline-offset-4"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-navy-900 border border-white/10 p-6 md:p-10 rounded-lg relative overflow-hidden ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Flow Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-gold-400" />
          <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">
            Confidential Consultation
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-white">
          Begin a Discreet Conversation
        </h3>
        <p className="text-sm text-ivory-100/70 mt-1">
          Select your primary requirement below to connect with the appropriate practice partner.
        </p>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 mt-6 bg-navy-950 p-1.5 rounded-lg border border-white/10">
          {[
            { id: "general", label: "General" },
            { id: "sell-business", label: "Sell Business" },
            { id: "buy-business", label: "Acquire" },
            { id: "valuation", label: "Valuation" },
            { id: "advisory", label: "Advisory" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFlowType(tab.id as EnquiryPayload["flowType"])}
              className={`py-2 px-3 text-xs font-medium rounded transition-all text-center ${
                flowType === tab.id
                  ? "bg-gold-500 text-navy-950 shadow-sm font-semibold"
                  : "text-ivory-100/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 rounded-md bg-red-950/40 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-200">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
              Full Name <span className="text-gold-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Tariq Al-Mansoor"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
              Corporate / Direct Email <span className="text-gold-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
              Direct Phone Number <span className="text-gold-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
              Company Name / Family Office
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="e.g. Al-Mansoor Holdings"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Contextual Fields depending on flow */}
        {flowType === "sell-business" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Annual Turnover / Revenue Range
              </label>
              <select
                name="estimatedRevenue"
                value={formData.estimatedRevenue}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="">Select Revenue Bracket</option>
                <option value="Under AED 10M">Under AED 10M</option>
                <option value="AED 10M - AED 30M">AED 10M - AED 30M</option>
                <option value="AED 30M - AED 75M">AED 30M - AED 75M</option>
                <option value="AED 75M - AED 150M">AED 75M - AED 150M</option>
                <option value="Over AED 150M">Over AED 150M</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Target Exit Horizon
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="">Target Timeline</option>
                <option value="Immediate (0 - 6 months)">Immediate (0 - 6 months)</option>
                <option value="Medium-term (6 - 18 months)">Medium-term (6 - 18 months)</option>
                <option value="Long-term exit readiness (18+ months)">Long-term exit readiness (18+ months)</option>
              </select>
            </div>
          </div>
        )}

        {flowType === "buy-business" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Acquisition Investment Capital
              </label>
              <select
                name="estimatedRevenue"
                value={formData.estimatedRevenue}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="">Allocated Capital Bracket</option>
                <option value="AED 10M - AED 25M">AED 10M - AED 25M</option>
                <option value="AED 25M - AED 60M">AED 25M - AED 60M</option>
                <option value="AED 60M - AED 150M">AED 60M - AED 150M</option>
                <option value="Over AED 150M">Over AED 150M</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Target Listing Reference (If Applicable)
              </label>
              <input
                type="text"
                name="targetListingRef"
                placeholder="e.g. GV-TECH-8402"
                value={formData.targetListingRef}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {flowType === "valuation" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Primary Purpose of Valuation
              </label>
              <select
                name="interestArea"
                value={formData.interestArea}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="">Select Valuation Context</option>
                <option value="Potential M&A / Shareholder Exit">Potential M&A / Shareholder Exit</option>
                <option value="Partner Buyout or Admission">Partner Buyout or Admission</option>
                <option value="Financial Reporting & Tax Compliance">Financial Reporting & Tax Compliance</option>
                <option value="Commercial Dispute or Litigation">Commercial Dispute or Litigation</option>
                <option value="Strategic Board Benchmarking">Strategic Board Benchmarking</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                Approximate Current Revenue
              </label>
              <select
                name="estimatedRevenue"
                value={formData.estimatedRevenue}
                onChange={handleInputChange}
                className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="">Select Bracket</option>
                <option value="Under AED 20M">Under AED 20M</option>
                <option value="AED 20M - AED 80M">AED 20M - AED 80M</option>
                <option value="Over AED 80M">Over AED 80M</option>
              </select>
            </div>
          </div>
        )}

        {flowType === "advisory" && (
          <div className="pt-2 border-t border-white/10">
            <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
              Advisory Mandate Focus
            </label>
            <select
              name="interestArea"
              value={formData.interestArea}
              onChange={handleInputChange}
              className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option value="">Select Mandate Requirement</option>
              <option value="Debt Advisory & Restructuring">Debt Advisory & Restructuring</option>
              <option value="Growth Capital Sourcing">Growth Capital Sourcing</option>
              <option value="Financial Due Diligence / QoE">Financial Due Diligence / QoE</option>
              <option value="Corporate Reorganization & Joint Venture">Corporate Reorganization & Joint Venture</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
            Confidential Context & Strategic Objectives
          </label>
          <textarea
            name="message"
            rows={compact ? 3 : 4}
            placeholder="Please outline the key parameters of your business or mandate. All communications remain strictly confidential under customary non-disclosure principles."
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-navy-950/90 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* NDA and Confidentiality Consent */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="ndaAcknowledged"
            name="ndaAcknowledged"
            checked={formData.ndaAcknowledged}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-navy-950 text-gold-500 focus:ring-gold-500"
          />
          <label htmlFor="ndaAcknowledged" className="text-xs text-ivory-100/70 leading-relaxed">
            I understand that Global Ventures operates under strict bilateral non-disclosure
            protocols. Information submitted will only be evaluated by senior practice directors.
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-widest transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-gold-500/10"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Securely...</span>
              </>
            ) : (
              <>
                <span>Request Private Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
