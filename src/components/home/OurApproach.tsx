import React from "react";
import { Search, Calculator, Target, Zap } from "lucide-react";

export const OurApproach: React.FC = () => {
  const stages = [
    {
      number: "01",
      title: "Discover",
      subtitle: "Mandate Diagnostics & Alignment",
      icon: Search,
      description:
        "Comprehensive diagnostic assessment of the business fundamentals, shareholder expectations, governance structure, and strategic alternatives. We clarify exact capital needs or exit parameters before entering market.",
      deliverable: "Strategic Diagnostic & Engagement Charter",
    },
    {
      number: "02",
      title: "Evaluate",
      subtitle: "Empirical Valuation & Diligence",
      icon: Calculator,
      description:
        "Quantitative modeling using multi-paradigm DCF, trading comps, and precedent transaction multiples. We perform rigorous Quality of Earnings (QoE) normalizations and balance sheet stress-testing.",
      deliverable: "Defensible IVSC-Compliant Valuation & Financial Model",
    },
    {
      number: "03",
      title: "Strategize",
      subtitle: "Positioning & Market Preparation",
      icon: Target,
      description:
        "Drafting institutional documentation including Confidential Information Memorandums (CIM), blind teasers, and financial presentation decks. Preparation of Virtual Data Rooms (VDR) and buyer universes.",
      deliverable: "Confidential Teaser, CIM & Curated Buyer Matrix",
    },
    {
      number: "04",
      title: "Execute",
      subtitle: "Tactical Closing & Value Realization",
      icon: Zap,
      description:
        "Orchestrating competitive bidding dynamics, evaluating Heads of Terms / LOIs, coordinating confirmatory due diligence, and guiding SPA financial mechanisms through to closing and escrow release.",
      deliverable: "Definitive Agreement Closing & Transaction Completion",
    },
  ];

  return (
    <section className="py-24 bg-navy-900 text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400 block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            A Disciplined Approach to Meaningful Outcomes.
          </h2>
          <p className="text-ivory-100/70 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Every mandate follows an institutional four-stage execution lifecycle designed to protect
            confidentiality, de-risk negotiations, and capture maximum enterprise value.
          </p>
        </div>

        {/* Timeline Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Subtle Horizontal Connecting Line across desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-gold-500/20 via-gold-500/50 to-gold-500/20 -z-0" />

          {stages.map((stage) => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.number}
                className="relative z-10 bg-navy-950 border border-white/10 hover:border-gold-500/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-gold-400/60 group-hover:text-gold-400 transition-colors">
                      {stage.number}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                    {stage.subtitle}
                  </span>
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-ivory-100/70 leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Key Deliverable Strip */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
                    Phase Outcome
                  </span>
                  <span className="text-[11px] font-medium text-ivory-100 block">
                    {stage.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
