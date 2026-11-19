"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Shield, FileText, CheckCircle, ExternalLink, Filter } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";
import EnquiryModal from "@/components/forms/EnquiryModal";

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDealType, setSelectedDealType] = useState<string>("All");
  const [activeListingRef, setActiveListingRef] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Technology", "Healthcare", "Manufacturing", "Logistics", "Retail & Consumer", "Professional Services"];
  const dealTypes = ["All", "Full Acquisition", "Majority Stake", "Strategic Investment"];

  const filtered = DEMO_OPPORTUNITIES.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchDeal = selectedDealType === "All" || item.dealType === selectedDealType;
    return matchCat && matchDeal;
  });

  const handleOpenNDA = (refCode: string) => {
    setActiveListingRef(refCode);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="TRANSACTION PIPELINE"
        title="Curated Acquisition Opportunities."
        subtitle="Exclusive commercial opportunities curated for strategic acquirers, institutional investors, and family offices. Information Memorandums released under bilateral NDA."
        breadcrumbs={[{ label: "Transactions", href: "/opportunities" }, { label: "Opportunities" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demonstration Disclaimer Bar */}
          <div className="mb-10 p-4 rounded-lg bg-navy-900 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-ivory-100/80">
              <Shield className="w-5 h-5 text-gold-400 shrink-0" />
              <span>
                <strong>Demonstration Architecture:</strong> The transaction dossiers below are
                anonymized demonstration records showcasing the platform&apos;s data schema and
                confidentiality protocols. Live opportunities are disclosed strictly upon NDA execution.
              </span>
            </div>
            <span className="font-mono text-gold-400 font-semibold uppercase shrink-0">
              [Confidential Deal Room]
            </span>
          </div>

          {/* Filter Bar */}
          <div className="bg-navy-900 border border-white/10 rounded-xl p-5 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <Filter className="w-3.5 h-3.5 text-gold-400" />
                <span>Filter by Sector</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded transition-all ${
                      selectedCategory === cat
                        ? "bg-gold-500 text-navy-950 font-semibold"
                        : "bg-navy-950 text-ivory-100/70 hover:text-white border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Deal Structure
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dealTypes.map((deal) => (
                  <button
                    key={deal}
                    onClick={() => setSelectedDealType(deal)}
                    className={`text-xs px-3 py-1.5 rounded transition-all ${
                      selectedDealType === deal
                        ? "bg-gold-500 text-navy-950 font-semibold"
                        : "bg-navy-950 text-ivory-100/70 hover:text-white border border-white/5"
                    }`}
                  >
                    {deal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
            <span>
              Showing <strong className="text-white">{filtered.length}</strong> opportunities
            </span>
            <span>All inquiries verified through bilateral Non-Disclosure</span>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((opp) => (
              <div
                key={opp.id}
                className="bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-gold-500/5"
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
                    <span className="font-mono text-gold-400 font-semibold tracking-wider">
                      REF: {opp.referenceCode}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-navy-950 text-[10px] uppercase tracking-wider text-ivory-100/70 border border-white/10">
                      <Lock className="w-3 h-3 text-gold-400" />
                      <span>{opp.confidentialityLevel}</span>
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-gold-400/90 font-medium block mb-1">
                    {opp.industry} &bull; {opp.dealType}
                  </span>

                  <h3 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors mb-3 leading-snug">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-ivory-100/70 leading-relaxed mb-6">
                    {opp.summary}
                  </p>

                  {/* Financial Metrics Strip */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-navy-950 border border-white/5 mb-6 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block">Revenue Bracket</span>
                      <span className="font-mono font-medium text-white text-xs">{opp.revenueRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block">Indicative Value</span>
                      <span className="font-mono font-medium text-gold-400 text-xs">{opp.investmentSize}</span>
                    </div>
                    {opp.ebitdaMargin && (
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <span className="text-[10px] uppercase text-slate-400 block">EBITDA Profile</span>
                        <span className="text-xs text-ivory-100 font-medium">{opp.ebitdaMargin}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights Bullet points */}
                  <ul className="space-y-1.5 text-[11px] text-ivory-100/80 mb-6">
                    {opp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="text-xs uppercase tracking-wider text-ivory-100 hover:text-gold-300 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Full Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => handleOpenNDA(opp.referenceCode)}
                    className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-semibold px-3.5 py-2 rounded uppercase tracking-wider transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Request NDA</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flow="buy-business"
        prefilledListingRef={activeListingRef}
        title={`Confidential NDA Request: ${activeListingRef}`}
      />
    </>
  );
}
