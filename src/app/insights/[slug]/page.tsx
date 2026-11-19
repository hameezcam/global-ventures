import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, User } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { INSIGHT_ARTICLES } from "@/data/insights";
import ContactCTA from "@/components/home/ContactCTA";

export async function generateStaticParams() {
  return INSIGHT_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHT_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = INSIGHT_ARTICLES.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`EDITORIAL INSIGHT • ${article.category.toUpperCase()}`}
        title={article.title}
        subtitle={article.summary}
        breadcrumbs={[
          { label: "Insights", href: "/insights" },
          { label: article.title },
        ]}
      />

      <article className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights Archive</span>
            </Link>
          </div>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold-400" />
                <span className="text-white font-medium">{article.author.name}</span>
                <span className="text-slate-500">({article.author.role})</span>
              </div>
              <span>&bull;</span>
              <span>{article.publishedDate}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{article.readingTime}</span>
              </span>
            </div>
            {article.isDraft && (
              <span className="px-2.5 py-0.5 rounded bg-navy-900 border border-white/20 text-slate-400 font-mono text-[10px] uppercase">
                Draft / Editorial Demo
              </span>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/10">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Key Executive Takeaways Box */}
          <div className="p-8 rounded-xl bg-navy-900 border border-gold-500/40 mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-3">
              Executive Takeaways
            </span>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ivory-100/90 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Content */}
          <div className="space-y-10 text-base sm:text-lg text-ivory-100/80 leading-relaxed font-light">
            {article.content.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight pt-4">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Author Byline Box */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-navy-900 p-6 rounded-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                Published By
              </span>
              <h4 className="font-serif text-lg text-white font-bold">{article.author.name}</h4>
              <p className="text-xs text-gold-400">{article.author.role}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-colors"
            >
              <span>Consult On This Topic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}
