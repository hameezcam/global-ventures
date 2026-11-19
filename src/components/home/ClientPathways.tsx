import React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck, Search, Building2 } from "lucide-react";

export const ClientPathways: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 border-y border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400 block mb-2">
            STRATEGIC PATHWAYS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Your Ambitions. Our Strategic Focus.
          </h2>
          <p className="text-ivory-100/70 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Whether preparing for a defining exit, deploying institutional capital into profitable
            operating assets, or restructuring complex balance sheets, we provide dedicated advisory
            architectures.
          </p>
        </div>

        {/* 3 Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pathway 1: Business Owners */}
          <div className="bg-navy-950 border border-white/10 hover:border-gold-500/40 rounded-xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
                For Founders &amp; Shareholders
              </span>
              <h3 className="text-2xl font-serif text-white group-hover:text-gold-300 transition-colors">
                Sell or Transform Your Business
              </h3>
              <p className="text-xs sm:text-sm text-ivory-100/70 leading-relaxed">
                Maximize the terminal value of your enterprise through disciplined exit preparation,
                defensible valuation benchmarking, and confidential sell-side matchmaking with
                qualified strategic and financial acquirers.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-ivory-100/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Pre-sale valuation &amp; EBITDA normalization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Confidential blind teasers &amp; buyer screening</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Negotiation of Heads of Terms &amp; SPAs</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <Link
                href="/sell-a-business"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded transition-colors"
              >
                <span>Initiate Confidential Exit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pathway 2: Investors & Buyers */}
          <div className="bg-navy-950 border border-white/10 hover:border-gold-500/40 rounded-xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
                For Investors, Family Offices &amp; PE
              </span>
              <h3 className="text-2xl font-serif text-white group-hover:text-gold-300 transition-colors">
                Discover Acquisition Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-ivory-100/70 leading-relaxed">
                Access curated, pre-screened commercial opportunities across high-performing sectors.
                We execute proprietary buy-side search mandates, financial due diligence, and deal
                structuring.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-ivory-100/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Proprietary off-market target origination</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Quality of Earnings (QoE) diligence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Synergy valuation &amp; capital structuring</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <Link
                href="/opportunities"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 border border-gold-500/40 hover:border-gold-500 text-gold-300 font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded transition-colors"
              >
                <span>View Acquisition Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pathway 3: Corporate Clients */}
          <div className="bg-navy-950 border border-white/10 hover:border-gold-500/40 rounded-xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
                For Corporate Leadership &amp; Boards
              </span>
              <h3 className="text-2xl font-serif text-white group-hover:text-gold-300 transition-colors">
                Navigate Complex Financial Decisions
              </h3>
              <p className="text-xs sm:text-sm text-ivory-100/70 leading-relaxed">
                Strategic counsel on debt restructuring, refinancing, capital structure optimization,
                independent fairness opinions, and cross-border expansion feasibility studies.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-ivory-100/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Senior debt &amp; mezzanine refinancing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Independent fairness opinions &amp; valuations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Corporate carve-out &amp; JV structuring</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <Link
                href="/services/corporate-finance"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 border border-white/20 hover:border-gold-500/40 text-ivory-100 font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded transition-colors"
              >
                <span>Consult Corporate Advisory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPathways;
