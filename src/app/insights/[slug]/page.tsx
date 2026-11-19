import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INSIGHT_ARTICLES } from "@/data/insights";
import { showDraftInsights, visibleInsights } from "@/lib/insights";
import { ConsultSection } from "@/components/nocturne/client";
import { Photo, PageHero } from "@/components/nocturne/ui";

export async function generateStaticParams() {
  return INSIGHT_ARTICLES.map((article) => ({ slug: article.slug }));
}

const find = (slug: string) => {
  const a = INSIGHT_ARTICLES.find((x) => x.slug === slug);
  return a && (!a.isDraft || showDraftInsights()) ? a : undefined;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = find(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
    robots: article.isDraft ? { index: false, follow: false } : undefined,
    openGraph: { title: article.title, description: article.summary, images: [{ url: article.coverImage }] },
  };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = find(slug);
  if (!article) notFound();
  const more = visibleInsights().filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <PageHero
        kicker={article.category}
        title={article.title}
        lede={article.summary}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: article.category }]}
      >
        <span className="muted">
          {article.isDraft ? "Draft · " : ""}
          {article.readingTime} · {article.author.name}
        </span>
      </PageHero>

      <div className="wrap">
        <Photo className="ph rv" src={article.coverImage.replace("w=1200", "w=2000")} sizes="100vw" style={{ aspectRatio: "21 / 9" }} />
      </div>

      <section className="sec ivory" style={{ marginTop: "clamp(-120px, -8vw, -60px)", paddingTop: "calc(var(--sec) + 60px)" }}>
        <div className="wrap split">
          <aside className="sticky">
            {article.isDraft && (
              <p className="draft" style={{ display: "inline-block", marginBottom: 20 }}>
                Draft · hidden on the live site
              </p>
            )}
            <p className="kicker">Key points</p>
            <ol className="dash" style={{ marginTop: 20 }}>
              {article.keyTakeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </aside>
          <article className="prose">
            {article.content.map((section) => (
              <React.Fragment key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </React.Fragment>
            ))}
            <p className="aside muted" style={{ marginTop: 48 }}>
              {article.author.name} · {article.author.role}. General information only, not financial advice.
            </p>
          </article>
        </div>
      </section>

      {more.length > 0 && (
        <section className="sec" aria-labelledby="more-h">
          <div className="wrap">
            <p className="kicker">Read next</p>
            <h2 id="more-h" className="sr-only">
              More insights
            </h2>
            <ul className="index simple" style={{ marginTop: 32 }}>
              {more.map((a) => (
                <li key={a.slug}>
                  <Link className="index-row" href={`/insights/${a.slug}`}>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ConsultSection />
    </>
  );
}
