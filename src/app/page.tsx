import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APPROACH_STAGES, PRACTICES, photo } from "@/data/homepage";
import { INDUSTRY_SECTORS } from "@/data/industries";
import { INSIGHT_ARTICLES } from "@/data/insights";
import { ConsultButton, ConsultSection, IndustryDirectory, PracticeRail } from "@/components/nocturne/client";
import { IndexList, Line, Photo, SecTop, Stages } from "@/components/nocturne/ui";

export default function HomePage() {
  // Only approved articles appear in Production. Previews also show drafts, flagged.
  const showDrafts = process.env.VERCEL_ENV !== "production";
  const articles = INSIGHT_ARTICLES.filter((a) => !a.isDraft || showDrafts).slice(0, 2);
  const sectors = INDUSTRY_SECTORS.map((s) => ({ slug: s.slug, name: s.name, line: s.tagline }));

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-h">
        <div className="ph">
          <Image src={photo("tower", 2400)} alt="Glass and steel office tower seen from street level" fill priority sizes="100vw" />
        </div>
        <div className="wrap">
          <p className="kicker rv">Financial advisory &amp; business transactions</p>
          <h1 id="hero-h">
            <span className="l">
              <span>Where</span>
            </span>
            <span className="l">
              <span>Capital Meets</span>
            </span>
            <span className="l">
              <span>
                <em>Opportunity.</em>
              </span>
            </span>
          </h1>
          <div className="hero-foot rv">
            <div>
              <p className="lede">
                Independent counsel for owners, boards and investors on selling, acquiring, valuing and financing
                private companies.
              </p>
              <div className="actions" style={{ marginTop: 32 }}>
                <ConsultButton>
                  Arrange a confidential consultation <Line />
                </ConsultButton>
                <Link className="tlink" href="#practices">
                  Our advisory
                </Link>
              </div>
            </div>
            <span className="scroll-cue" aria-hidden="true">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* The firm */}
      <section className="sec ivory" aria-labelledby="firm-h">
        <div className="wrap">
          <div className="statement">
            <div className="rv">
              <p className="kicker">The firm</p>
              <h2 id="firm-h">
                Some decisions are made once in a lifetime. <em>They deserve undivided attention.</em>
              </h2>
            </div>
            <div className="copy rv">
              <p>
                Global Ventures advises on the moments that define a company: a sale, an acquisition, a new structure
                of capital.
              </p>
              <p>
                We take on a limited number of engagements at a time, so the people you meet at the start are the
                people who see it through.
              </p>
              <Link className="tlink" href="/about">
                About the firm
              </Link>
            </div>
          </div>
          <div className="photo-pair">
            <Photo className="ph rv" src={photo("skyline", 1600)} sizes="(max-width: 900px) 55vw, 56vw" />
            <Photo className="ph rv" src={photo("interior", 1000)} sizes="(max-width: 900px) 45vw, 40vw" />
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className="sec" id="practices" aria-labelledby="practices-h">
        <div className="wrap">
          <SecTop
            kicker="Advisory"
            id="practices-h"
            title="Eight services. One point of view on your business."
            aside={<p>Each service has its own method, and they combine whenever the work needs more than one discipline.</p>}
          />
        </div>
        <PracticeRail items={PRACTICES.map((p) => ({ ...p, photoId: p.cardPhotoId }))} />
      </section>

      {/* Owners and acquirers */}
      <section aria-labelledby="doors-h">
        <h2 id="doors-h" className="sr-only">
          Business transactions
        </h2>
        <div className="doors">
          <article className="door rv">
            <Photo src={photo("doorSell", 1600)} sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="box">
              <p className="who">For owners</p>
              <h3>
                <Link href="/sell-a-business">Selling a business, on your terms.</Link>
              </h3>
              <ol>
                <li>Readiness</li>
                <li>Valuation</li>
                <li>Confidential approach</li>
                <li>Completion</li>
              </ol>
              <ConsultButton flow="sell-business">
                Begin a sale enquiry <Line />
              </ConsultButton>
            </div>
          </article>
          <article className="door rv">
            <Photo src={photo("doorBuy", 1600)} sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="box">
              <p className="who">For acquirers</p>
              <h3>
                <Link href="/buy-a-business">Finding the right company to acquire.</Link>
              </h3>
              <ol>
                <li>Mandate</li>
                <li>Search</li>
                <li>Diligence</li>
                <li>Close</li>
              </ol>
              <ConsultButton flow="buy-business">
                Begin an acquisition enquiry <Line />
              </ConsultButton>
            </div>
          </article>
        </div>
        <div className="wrap">
          <div className="disclose rv">
            <p>
              We never publish live mandates. Opportunities are introduced privately to registered, qualified buyers
              under a non-disclosure agreement.
            </p>
            <Link className="tlink" href="/opportunities" style={{ whiteSpace: "nowrap", color: "var(--ivory)" }}>
              How opportunities are shared
            </Link>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="sec" aria-label="Our method">
        <div className="wrap">
          <Stages
            kicker="Method"
            title="Measured, confidential, and paced around you."
            note="Every engagement follows the same four stages, so you always know where things stand."
            stages={APPROACH_STAGES}
          />
        </div>
      </section>

      {/* Industries */}
      <section className="sec ivory" aria-labelledby="ind-h">
        <div className="wrap">
          <SecTop
            kicker="Industries"
            id="ind-h"
            title="Sectors we follow closely."
            aside={
              <Link className="tlink" href="/industries" style={{ color: "var(--fg)" }}>
                All sectors
              </Link>
            }
          />
          <IndustryDirectory sectors={sectors} />
        </div>
      </section>

      {/* Insights */}
      {articles.length > 0 && (
        <section className="sec" aria-labelledby="ins-h">
          <div className="wrap">
            <SecTop
              kicker="Insights"
              id="ins-h"
              title="Perspectives on value and timing."
              aside={
                articles.some((a) => a.isDraft) ? (
                  <p>Preview only: draft articles are hidden on the live site.</p>
                ) : (
                  <Link className="tlink" href="/insights">
                    All insights
                  </Link>
                )
              }
            />
            <IndexList
              items={articles.map((a) => ({
                title: a.title,
                body: a.summary,
                meta: a.isDraft ? `${a.category} · Draft` : a.category,
                href: `/insights/${a.slug}`,
              }))}
            />
          </div>
        </section>
      )}

      <ConsultSection />
    </>
  );
}
