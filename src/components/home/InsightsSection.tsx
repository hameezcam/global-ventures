import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { INSIGHT_ARTICLES } from "@/data/insights";

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-24 bg-navy-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400">
                EDITORIAL &amp; THOUGHT LEADERSHIP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Perspectives That Drive Better Decisions.
            </h2>
            <p className="text-ivory-100/70 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Executive intelligence on enterprise valuation dynamics, exit engineering, and
              evolving cross-border transaction structures across the GCC.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHT_ARTICLES.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/5"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-52 w-full overflow-hidden">
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
                  {article.isDraft && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-navy-950/80 backdrop-blur-md border border-white/20 text-slate-400 text-[9px] uppercase font-mono px-2 py-0.5 rounded">
                        Editorial Draft
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span>{article.publishedDate}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      <span>{article.readingTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-ivory-100/70 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 pt-4 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
