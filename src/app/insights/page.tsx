import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { visibleInsights } from "@/lib/insights";
import { ConsultSection } from "@/components/nocturne/client";
import { Photo, PageHero } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Insights",
  description: "Perspectives on valuation, selling, acquiring and financing private companies.",
};

const LAYOUT = ["s1", "s2", "s3"];

export default function InsightsPage() {
  const articles = visibleInsights();
  const hasDrafts = articles.some((a) => a.isDraft);

  return (
    <>
      <PageHero
        kicker="Insights"
        title={
          <>
            Perspectives on <em>value and timing.</em>
          </>
        }
        lede="Notes for owners, boards and investors on what drives value, how to prepare for a transaction, and when to act."
        crumbs={[{ label: "Insights" }]}
      />

      <section className="sec" style={{ paddingTop: 0 }} aria-label="Articles">
        <div className="wrap">
          {hasDrafts && (
            <div className="notice rv">
              <b>Preview only</b>
              <span>Draft articles are shown here for review and are hidden on the live site.</span>
            </div>
          )}
          {articles.length > 0 ? (
            <div className="j-grid">
              {articles.map((a, i) => (
                <Link key={a.slug} className={`story ${LAYOUT[i % 3]} rv`} href={`/insights/${a.slug}`}>
                  <Photo src={a.coverImage.replace("w=1200", "w=1600")} sizes="(max-width: 900px) 100vw, 60vw" />
                  <div>
                    <p className="meta">
                      <span>{a.category}</span>
                      <span>{a.readingTime}</span>
                      {a.isDraft && <span className="draft">Draft</span>}
                    </p>
                    <h3>{a.title}</h3>
                    <p className="muted" style={{ marginTop: 12 }}>
                      {a.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty rv">
              <h3>Our first articles are being prepared.</h3>
              <p className="muted">
                In the meantime, we are glad to discuss any question about valuation, a sale or an acquisition
                directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <ConsultSection />
    </>
  );
}
