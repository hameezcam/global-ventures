import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, ArrowRight, Shield } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { INSIGHT_ARTICLES } from "@/data/insights";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Insights & Perspectives | Corporate Finance Intelligence",
  description:
    "Executive analysis and research on business valuation, sell-side exit readiness, and cross-border M&A trends in the UAE and GCC.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="EXECUTIVE INTELLIGENCE"
        title="Perspectives That Drive Better Decisions."
        subtitle="In-depth analysis of enterprise valuation methodologies, M&A market readiness, and evolving corporate finance structures across the GCC."
        breadcrumbs={[{ label: "Insights" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Draft Editorial Disclaimer */}
          <div className="mb-10 p-4 rounded-lg bg-navy-900 border border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold-400" />
              <span>
                Sample editorial publications and market perspectives prepared for review and
                demonstration.
              </span>
            </div>
            <span className="font-mono text-gold-400 text-[10px] uppercase font-semibold hidden sm:inline">
              [Editorial Archive]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHT_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/5"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-[10px] uppercase font-semibold px-2.5 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{article.publishedDate}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-400" />
                        <span>{article.readingTime}</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors mb-3 leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-ivory-100/70 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 pt-4 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Full Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
