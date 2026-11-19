import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const CorporateIntro: React.FC = () => {
  return (
    <section className="py-24 bg-ivory-100 text-navy-900 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with Editorial Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Global Ventures Executive Advisory Environment"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-navy-950/80 backdrop-blur-md rounded border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  Core Guiding Principle
                </span>
                <p className="font-serif italic text-base leading-snug">
                  &ldquo;Clarity in Finance. Confidence in Every Transaction.&rdquo;
                </p>
              </div>
            </div>

            {/* Accent Border Box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-500/40 rounded-lg -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-500 block">
                ABOUT GLOBAL VENTURES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-navy-900 leading-tight">
                Insight That Creates <br />
                <span className="italic font-normal text-gold-600 font-serif">Value.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Global Ventures was established to serve a pivotal purpose: providing mid-market
              enterprises, private shareholders, and discerning investors with the institutional
              financial acumen typically reserved for major global investment banks.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In an increasingly complex macroeconomic and regulatory environment, corporate decisions
              demand more than standardized templates. We bring multi-disciplinary precision to every
              mandate—combining advanced valuation methodologies, forensic transaction diligence, and
              tactical deal brokerage to unlock enterprise value and secure optimal transaction outcomes.
            </p>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">Independent &amp; Objective</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Unbiased advisory free from underwriting conflicts and institutional misalignments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">Discreet Intermediation</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Rigid confidentiality protocols shielding company reputations and commercial secrets.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-xs uppercase tracking-wider sm:tracking-widest font-semibold px-6 py-3.5 rounded transition-colors text-center"
              >
                <span>Read Corporate Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/team"
                className="text-xs uppercase tracking-wider sm:tracking-widest font-semibold text-slate-700 hover:text-navy-900 border-b border-slate-400 pb-0.5 transition-colors"
              >
                Practice Leadership &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateIntro;
