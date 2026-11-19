import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Shield, Target, Compass, Award, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "About Global Ventures",
  description:
    "Learn about Global Ventures: an elite corporate finance and business transaction advisory firm advising mid-market enterprises and international investors.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT US"
        title="Institutional Financial Acumen. Uncompromising Discretion."
        subtitle="Global Ventures bridges the gap between mid-market commercial enterprise and institutional corporate finance rigor."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Main Narrative Section */}
      <section className="py-20 bg-ivory-100 text-navy-900 border-b border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-navy-900 leading-tight">
                Where Strategic Clarity Unlocks True Enterprise Worth.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                In major global money centers, high-stakes M&amp;A transactions and capital
                restructurings benefit from sophisticated multi-disciplinary teams. Yet, mid-market
                enterprises and private shareholders are too frequently forced to rely on fragmented
                brokers or generalist accounting firms.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Global Ventures was established to rectify this imbalance. We provide private
                enterprises, family offices, and cross-border strategic acquirers with the highest
                tier of corporate finance advisory, defensible valuations, and confidential deal
                execution.
              </p>
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <blockquote className="font-serif italic text-base text-navy-900 leading-snug">
                  &ldquo;A transaction is not merely a legal closing; it is the culmination of years
                  of enterprise creation. It demands absolute precision, empirical defensibility,
                  and quiet confidence.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Global Ventures Corporate Office Architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our 4 Core Pillars */}
      <section className="py-24 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400 block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              The Standard of Our Practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-navy-900 border border-white/10 rounded-xl p-6">
              <Shield className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">Rigid Discretion</h3>
              <p className="text-xs text-ivory-100/70 leading-relaxed">
                Confidentiality is our primary asset. We maintain strict bilateral NDAs and blind
                marketing protocols to insulate client business value from market speculation.
              </p>
            </div>

            <div className="bg-navy-900 border border-white/10 rounded-xl p-6">
              <Compass className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">Empirical Rigor</h3>
              <p className="text-xs text-ivory-100/70 leading-relaxed">
                We reject anecdotal multiples. Our valuations and transaction terms are benchmarked
                against empirical data, discounted cash flows, and normalized balance sheets.
              </p>
            </div>

            <div className="bg-navy-900 border border-white/10 rounded-xl p-6">
              <Target className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">Aligned Interests</h3>
              <p className="text-xs text-ivory-100/70 leading-relaxed">
                As independent advisors, our focus remains on long-term enterprise value and closing
                certainty rather than volume-driven intermediary churn.
              </p>
            </div>

            <div className="bg-navy-900 border border-white/10 rounded-xl p-6">
              <Award className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">Partner-Led Execution</h3>
              <p className="text-xs text-ivory-100/70 leading-relaxed">
                Every mandate is directly steered by senior corporate finance directors, ensuring
                unwavering institutional oversight from discovery through completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Prompt */}
      <section className="py-16 bg-navy-900 text-white border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-serif text-white mb-3">
            Steered by Experienced Corporate Financiers
          </h3>
          <p className="text-xs sm:text-sm text-ivory-100/70 max-w-xl mx-auto mb-6">
            Review the background and specialized practice focus of our senior advisory partners.
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors"
          >
            <span>Meet Practice Leadership</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
