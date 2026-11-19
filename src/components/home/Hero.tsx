"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Award, Landmark, Lock } from "lucide-react";
import EnquiryModal from "@/components/forms/EnquiryModal";

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-navy-950">
        {/* Architectural Background Image with dark luxury gradient overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transform motion-safe:animate-fade-in"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85')",
          }}
          aria-hidden="true"
        />

        {/* Sophisticated Multi-stop Radial & Linear Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/80 to-navy-950" />
        <div className="absolute inset-0 bg-navy-radial pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/[0.02] pointer-events-none hidden lg:block" />
        <div className="absolute inset-y-0 right-1/4 w-px bg-white/[0.02] pointer-events-none hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/30 text-gold-400 text-xs uppercase tracking-[0.22em] font-medium mb-8 shadow-lg shadow-black/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span>Financial Advisory &bull; Business Transactions &bull; Valuations</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.08] mb-6">
            Where Capital Meets <br />
            <span className="italic font-normal text-gold-gradient font-serif">
              Opportunity.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ivory-100/80 font-sans font-light leading-relaxed mb-10">
            Strategic financial advisory and transaction expertise for businesses, investors and
            entrepreneurs navigating their next defining opportunity.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
            <Link
              href="#expertise"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25"
            >
              <span>Explore Our Expertise</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-navy-900/80 hover:bg-navy-800 text-ivory-100 border border-white/20 hover:border-gold-500/50 font-medium px-8 py-4 rounded text-xs uppercase tracking-widest transition-all duration-200 backdrop-blur-sm"
            >
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>Request a Private Consultation</span>
            </button>
          </div>

          {/* Credibility Pillars (No fake stats, strictly verified advisory standards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/10 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/40 border border-white/5">
              <Shield className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Bilateral Confidentiality
                </h2>
                <p className="text-[11px] text-ivory-100/60 mt-0.5">
                  Strict non-disclosure protocols safeguarding proprietary enterprise data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/40 border border-white/5">
              <Landmark className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                  IVSC Empirical Rigor
                </h2>
                <p className="text-[11px] text-ivory-100/60 mt-0.5">
                  Institutional multi-model valuations benchmarked against international standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-900/40 border border-white/5">
              <Award className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Senior Partner Advisory
                </h2>
                <p className="text-[11px] text-ivory-100/60 mt-0.5">
                  Direct mandate stewardship by seasoned corporate finance directors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
