"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Shield, ArrowRight, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";
import EnquiryModal from "@/components/forms/EnquiryModal";

export const TransactionShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeListingRef, setActiveListingRef] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Technology", "Healthcare", "Manufacturing", "Logistics", "Retail & Consumer"];

  const filteredOpportunities =
    selectedCategory === "All"
      ? DEMO_OPPORTUNITIES
      : DEMO_OPPORTUNITIES.filter((item) => item.category === selectedCategory);

  const handleOpenNDA = (refCode: string) => {
    setActiveListingRef(refCode);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-navy-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400">
                  TRANSACTION BROKERAGE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
                Opportunities Built on Strategic Value.
              </h2>
              <p className="text-ivory-100/70 text-sm sm:text-base mt-2 max-w-2xl font-light">
                Anonymized acquisition opportunities curated for institutional investors, strategic
                operators, and family offices. Full Information Memorandums require an executed bilateral NDA.
              </p>
            </div>

            {/* Clear Demonstration Content Badge as mandated */}
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono">
                <Shield className="w-3.5 h-3.5" />
                <span>Demonstration Portfolio &bull; Confidential Listings</span>
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-500 text-navy-950 font-semibold shadow-md"
                    : "bg-navy-900 text-ivory-100/70 hover:text-white hover:bg-navy-800 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-gold-500/5"
              >
                <div>
                  {/* Top Badges */}
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

                  <p className="text-xs text-ivory-100/70 leading-relaxed mb-6 line-clamp-2">
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
                        <span className="text-[10px] uppercase text-slate-400 block">Margin Profile</span>
                        <span className="text-xs text-ivory-100 font-medium">{opp.ebitdaMargin}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights Bullet points */}
                  <ul className="space-y-1.5 text-[11px] text-ivory-100/80 mb-6">
                    {opp.highlights.slice(0, 2).map((h, i) => (
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
                    <span>View Dossier</span>
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

          {/* Bottom Callout & Directory Link */}
          <div className="mt-14 p-6 rounded-xl bg-navy-900/90 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-lg text-white">
                Require a Discreet Custom Acquisition Mandate?
              </h4>
              <p className="text-xs text-ivory-100/70 max-w-xl">
                We originate off-market opportunities tailored to specific enterprise criteria,
                accretive synergies, and capital structures across the UAE and GCC.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 bg-navy-950 hover:bg-navy-800 text-gold-400 border border-gold-500/40 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded whitespace-nowrap transition-colors"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
};

export default TransactionShowcase;
