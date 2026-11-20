import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { APPROACH_STAGES, PRACTICES, photo } from "@/data/homepage";
import { ConsultSection } from "@/components/nocturne/client";
import { IndexList, Photo, PageHero, SecTop, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Advisory services",
  description:
    "Eight advisory services: restructuring, working capital and fund raising, business and equity selling, mergers, acquisitions and joint ventures, investor matchmaking, portfolio and wealth management, valuation, and digital transformation and FinTech advisory.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Advisory"
        title={
          <>
            Eight services, <em>one view</em> of your business.
          </>
        }
        lede="Each service has its own method. On most engagements two or three work together under one lead adviser, so you deal with one team from start to finish."
        crumbs={[{ label: "Services" }]}
      />

      <section className="sec ivory" aria-labelledby="index-h">
        <div className="wrap">
          <SecTop
            kicker="Index"
            id="index-h"
            title="Find the service for the decision in front of you."
            aside={<p>Not sure where to start? Tell us what you are facing and we will route it to the right adviser.</p>}
          />
          <IndexList
            items={PRACTICES.map((p) => ({
              title: p.title,
              body: p.menuLine,
              meta: p.forWho,
              href: `/services/${p.slug}`,
            }))}
          />
        </div>
      </section>

      <section className="sec" aria-label="How we work">
        <div className="wrap">
          <Stages
            kicker="Method"
            title="The same four stages, whichever service leads."
            note="So you always know where an engagement stands and what comes next."
            stages={APPROACH_STAGES}
          />
          <div className="photo-pair" style={{ marginTop: "clamp(72px, 8vw, 128px)" }}>
            <Photo className="ph rv" src={photo("servicesPairA", 1600)} sizes="55vw" />
            <Photo className="ph rv" src={photo("servicesPairB", 1000)} sizes="40vw" />
          </div>
          <p className="muted rv" style={{ marginTop: 32, maxWidth: "36rem" }}>
            Buying or selling a whole business? See{" "}
            <Link className="tlink" href="/sell-a-business" style={{ color: "var(--fg)" }}>
              selling a business
            </Link>{" "}
            and{" "}
            <Link className="tlink" href="/buy-a-business" style={{ color: "var(--fg)" }}>
              buying a business
            </Link>
            .
          </p>
        </div>
      </section>

      <ConsultSection />
    </>
  );
}
