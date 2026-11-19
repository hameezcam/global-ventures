"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Mail } from "lucide-react";
import EnquiryModal from "@/components/forms/EnquiryModal";

export const ContactCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-24 bg-navy-950 text-white overflow-hidden border-t border-gold-500/20">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-navy-800/40 via-gold-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Hairline Grid Accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs uppercase tracking-[0.2em] font-medium mb-6">
            <Lock className="w-3 h-3 text-gold-400" />
            <span>CONFIDENTIAL ENGAGEMENT</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-6">
            The Future of Your Business <br />
            <span className="italic font-normal text-gold-gradient font-serif">
              Deserves the Right Advice.
            </span>
          </h2>

          {/* Supporting Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-ivory-100/80 font-sans font-light leading-relaxed mb-10">
            Begin a confidential conversation about your financial strategy, acquisition
            objectives or business exit. Our senior directors evaluate every mandate with absolute
            discretion.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded text-xs uppercase tracking-widest transition-all duration-200 shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-ivory-100 border border-white/20 hover:border-gold-500/50 font-medium px-8 py-4 rounded text-xs uppercase tracking-widest transition-colors"
            >
              <Mail className="w-4 h-4 text-gold-400" />
              <span>Full Contact Directory</span>
            </Link>
          </div>

          {/* Confidentiality Footer Note */}
          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Strict non-disclosure agreements precede all detailed commercial exchanges.</span>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ContactCTA;
