"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Lock, Shield, CheckCircle2, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import EnquiryModal from "@/components/forms/EnquiryModal";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const opp = DEMO_OPPORTUNITIES.find((o) => o.id === id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!opp) {
    return (
      <div className="py-32 text-center text-white">
        <h2 className="text-2xl font-serif mb-4">Listing Not Found</h2>
        <Link href="/opportunities" className="text-gold-400 text-xs uppercase tracking-widest">
          &larr; Return to Opportunities
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`CONFIDENTIAL DOSSIER • REF: ${opp.referenceCode}`}
        title={opp.title}
        subtitle={`${opp.industry} • ${opp.dealType} • ${opp.location}`}
        breadcrumbs={[
          { label: "Transactions", href: "/opportunities" },
          { label: "Opportunities", href: "/opportunities" },
          { label: opp.referenceCode },
        ]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Opportunities Pipeline</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Executive Overview */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  EXECUTIVE PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Commercial Thesis &amp; Asset Characteristics
                </h2>
                <p className="text-base text-ivory-100/80 leading-relaxed font-light">
                  {opp.summary}
                </p>
              </div>

              {/* Investment Highlights */}
              <div className="p-8 rounded-xl bg-navy-900 border border-white/10 space-y-4">
                <h3 className="text-xl font-serif text-white">
                  Key Investment &amp; Operational Highlights
                </h3>
                <ul className="space-y-3">
                  {opp.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-ivory-100/90 leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diligence Protocol */}
              <div className="p-8 rounded-xl bg-navy-900 border border-gold-500/30 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  <h3 className="text-lg font-serif text-white">
                    Information Release &amp; VDR Access Protocol
                  </h3>
                </div>
                <p className="text-xs text-ivory-100/70 leading-relaxed">
                  In accordance with seller instructions, detailed commercial contracts, customer
                  concentration schedules, audited financial statements, and operational facilities
                  tours require an executed bilateral Non-Disclosure Agreement (NDA) and proof of
                  financial capability.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Execute NDA for Virtual Data Room</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Financial Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-navy-900 border border-white/10 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Mandate Reference
                  </span>
                  <span className="font-mono text-xs font-bold text-gold-400">
                    {opp.referenceCode}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Indicative Valuation</span>
                    <span className="text-lg font-serif font-bold text-white block mt-0.5">
                      {opp.investmentSize}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Historical Revenue</span>
                    <span className="text-sm font-mono text-ivory-100 block mt-0.5">
                      {opp.revenueRange}
                    </span>
                  </div>

                  {opp.ebitdaMargin && (
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block">Normalized Margin</span>
                      <span className="text-sm font-medium text-gold-400 block mt-0.5">
                        {opp.ebitdaMargin}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Deal Structure</span>
                    <span className="text-xs font-medium text-ivory-100 block mt-0.5">
                      {opp.dealType}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Geographic HQ</span>
                    <span className="text-xs font-medium text-ivory-100 block mt-0.5">
                      {opp.location}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-colors"
                  >
                    <span>Request Confidential Teaser</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="p-4 rounded-lg bg-navy-950 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Strictly confidential intermediary listing. Demonstration record created for
                  institutional framework testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flow="buy-business"
        prefilledListingRef={opp.referenceCode}
        title={`Confidential NDA: ${opp.referenceCode}`}
      />
    </>
  );
}
