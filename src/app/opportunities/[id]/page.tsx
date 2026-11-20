import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";
import { ConsultButton, ConsultSection } from "@/components/nocturne/client";
import { Line, PageHero } from "@/components/nocturne/ui";

export function generateStaticParams() {
  return DEMO_OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const opp = DEMO_OPPORTUNITIES.find((o) => o.id === id);
  return {
    title: opp ? `${opp.title} (example)` : "Opportunity",
    description: opp?.summary,
    // Example layouts are not real listings and should not be indexed.
    robots: { index: false, follow: true },
  };
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opp = DEMO_OPPORTUNITIES.find((o) => o.id === id);
  if (!opp) notFound();
  const name = opp.title.replace(/^Example:\s*/, "");

  return (
    <>
      <PageHero
        kicker={`Example layout · ${opp.referenceCode}`}
        title={name.charAt(0).toUpperCase() + name.slice(1)}
        lede={opp.summary}
        crumbs={[{ label: "Opportunities", href: "/opportunities" }, { label: opp.referenceCode }]}
      >
        <ConsultButton flow="buy-business" listingRef={opp.referenceCode} title="Register interest">
          Request the information pack <Line />
        </ConsultButton>
      </PageHero>

      <section className="sec" aria-labelledby="summary-h">
        <div className="wrap">
          <div className="notice rv">
            <b>Example layout</b>
            <span>This page shows how an opportunity will be presented. It is not a live business for sale.</span>
          </div>
          <div className="split">
            <div>
              <p className="kicker">Summary</p>
              <h2 id="summary-h">At a glance.</h2>
              <dl className="facts" style={{ marginTop: 32 }}>
                <div>
                  <dt>Sector</dt>
                  <dd>{opp.industry}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{opp.location}</dd>
                </div>
                <div>
                  <dt>Deal type</dt>
                  <dd>{opp.dealType}</dd>
                </div>
                <div>
                  <dt>Revenue</dt>
                  <dd>{opp.revenueRange}</dd>
                </div>
                <div>
                  <dt>Indicative value</dt>
                  <dd>{opp.investmentSize}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd>Registered buyers, under NDA</dd>
                </div>
              </dl>
            </div>
            <div className="rv">
              <h3 className="col-h">What a buyer would see first</h3>
              <ul className="dash">
                {opp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="muted" style={{ marginTop: 32 }}>
                The business name, financial statements and an information memorandum are released after the owner
                approves your interest and a non-disclosure agreement is signed.
              </p>
              <p style={{ marginTop: 32 }}>
                <Link className="tlink" href="/opportunities">
                  Back to opportunities
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConsultSection order={["buy-business"]} />
    </>
  );
}
