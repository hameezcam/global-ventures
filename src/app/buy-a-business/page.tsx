import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";

export const metadata: Metadata = {
  title: "Acquire a Business | Buy-Side Advisory",
  description:
    "Institutional buy-side advisory, off-market deal origination, financial due diligence, and transaction negotiation for investors and corporate acquirers.",
};

export default function BuyABusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="BUY-SIDE ADVISORY"
        title="Deploy Capital into High-Performing Operating Assets."
        subtitle="We originate off-market acquisition opportunities, conduct rigorous due diligence, and negotiate accretive transaction terms for discerning buyers."
        breadcrumbs={[{ label: "Buy a Business" }]}
      />

      {/* Main Framework */}
      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  PROPRIETARY ORIGINATION
                </span>
                <h2 className="text-3xl font-serif text-white">
                  Strategic Acquisition Execution Designed for Capital Allocators
                </h2>
                <p className="text-sm sm:text-base text-ivory-100/80 leading-relaxed font-light">
                  Public marketplaces showcase only a tiny fraction of available companies,
                  frequently with adverse selection. Global Ventures acts as a confidential buy-side
                  scout, unlocking direct bilateral access to founders and profitable enterprises
                  that are not publicly advertised for sale.
                </p>
              </div>

              {/* 5-Phase Buy-Side Lifecycle */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white">
                  The Buy-Side Advisory Lifecycle
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      step: "01",
                      title: "Acquisition Thesis & Filter Formulation",
                      desc: "Defining target EBITDA brackets, commercial moats, management retention requirements, and target geographical parameters.",
                    },
                    {
                      step: "02",
                      title: "Proprietary Off-Market Deal Sourcing",
                      desc: "Discreet direct outreach to owners and shareholders using confidential executive intermediaries.",
                    },
                    {
                      step: "03",
                      title: "Valuation & Synergy Modeling",
                      desc: "DCF modeling and transaction comps to establish disciplined valuation ceilings and deal structures.",
                    },
                    {
                      step: "04",
                      title: "Confirmatory Financial Due Diligence",
                      desc: "Quality of Earnings (QoE) scrutiny, tax exposure reviews, and working capital peg verification.",
                    },
                    {
                      step: "05",
                      title: "Definitive Agreement & Closing",
                      desc: "Negotiating SPA indemnities, earn-outs, escrow structures, and seamless ownership migration.",
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

              {/* Preview of confidential listings */}
              <div className="p-6 rounded-xl bg-navy-900 border border-gold-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    Live Pipeline Teaser
                  </span>
                  <Link
                    href="/opportunities"
                    className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>View All Opportunities</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <p className="text-xs text-ivory-100/70 mb-4">
                  Explore our demonstration portfolio of confidential transaction opportunities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEMO_OPPORTUNITIES.slice(0, 2).map((opp) => (
                    <div key={opp.id} className="p-3 rounded bg-navy-950 border border-white/10 text-xs">
                      <span className="font-mono text-gold-400 text-[10px] block">
                        REF: {opp.referenceCode}
                      </span>
                      <h5 className="font-semibold text-white mt-1 line-clamp-1">{opp.title}</h5>
                      <span className="text-slate-400 text-[11px] block mt-1">{opp.investmentSize}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form: Buy-side Mandate Request */}
            <div className="lg:col-span-5">
              <ConsultationForm
                initialFlow="buy-business"
                className="shadow-2xl sticky top-28"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
