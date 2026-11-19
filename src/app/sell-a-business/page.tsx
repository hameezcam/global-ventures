import React from "react";
import { Metadata } from "next";
import { Lock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ConsultationForm from "@/components/forms/ConsultationForm";
import ValuationCalculator from "@/components/shared/ValuationCalculator";

export const metadata: Metadata = {
  title: "Sell Your Business | Confidential Sell-Side M&A Advisory",
  description:
    "Confidential sell-side representation, exit readiness, business valuation defense, and buyer screening for private enterprise shareholders.",
};

export default function SellABusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="SELL-SIDE ADVISORY"
        title="Maximize Enterprise Value. Preserve Confidentiality."
        subtitle="We guide business owners through their defining exit—from pre-sale EBITDA normalization and confidential marketing to competitive buyer auction dynamics."
        breadcrumbs={[{ label: "Sell a Business" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  MAXIMIZING SHAREHOLDER RETURN
                </span>
                <h2 className="text-3xl font-serif text-white">
                  Why Institutional Sell-Side Representation Commands a Multiple Premium
                </h2>
                <p className="text-sm sm:text-base text-ivory-100/80 leading-relaxed font-light">
                  Selling a business without structured preparation invites aggressive buyer discounts,
                  prolonged due diligence, and deal fatigue. Global Ventures positions your company as
                  an institutional asset class, orchestrating competitive interest while protecting
                  your trade secrets.
                </p>
              </div>

              {/* 5-Phase Sell-Side Execution */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white">The 5-Stage Exit Architecture</h3>
                <div className="space-y-3">
                  {[
                    {
                      step: "01",
                      title: "Exit Readiness & Normalization",
                      desc: "Recasting profit and loss statements to establish defensible normalized EBITDA and eliminating key-person dependency risks.",
                    },
                    {
                      step: "02",
                      title: "Empirical Valuation & Pricing Defense",
                      desc: "Multi-methodology IVSC valuation setting a defensible enterprise baseline for negotiation.",
                    },
                    {
                      step: "03",
                      title: "Confidential Blind Marketing",
                      desc: "Distributing anonymized teasers strictly to vetted buyers under pre-approved bilateral NDAs.",
                    },
                    {
                      step: "04",
                      title: "Auction Dynamics & Term Sheet Competition",
                      desc: "Soliciting multiple competing Letters of Intent (LOI) to maximize pricing and favorable indemnity terms.",
                    },
                    {
                      step: "05",
                      title: "VDR Management & SPA Execution",
                      desc: "Steering confirmatory diligence smoothly through closing, escrow distribution, and transitional governance.",
                    },
                  ].map((phase) => (
                    <div
                      key={phase.step}
                      className="p-4 rounded-lg bg-navy-900 border border-white/10 flex items-start gap-4"
                    >
                      <span className="font-serif font-bold text-lg text-gold-400">
                        {phase.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{phase.title}</h4>
                        <p className="text-xs text-ivory-100/70 mt-0.5 leading-relaxed">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-navy-900 border border-gold-500/30 flex items-start gap-4">
                <Lock className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Public Exposure</h4>
                  <p className="text-xs text-ivory-100/70 mt-1 leading-relaxed">
                    Your employees, suppliers, customers, and competitors will never know your
                    business is contemplating an exit until definitive agreements are executed.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form: Sell-Side Mandate */}
            <div className="lg:col-span-5">
              <ConsultationForm
                initialFlow="sell-business"
                className="shadow-2xl sticky top-28"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Valuation Calculator for Owners */}
      <section className="py-20 bg-navy-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              PRE-SALE BENCHMARKING
            </span>
            <h3 className="text-3xl font-serif text-white">
              Explore Your Business Valuation Multiple
            </h3>
          </div>
          <ValuationCalculator />
        </div>
      </section>
    </>
  );
}
