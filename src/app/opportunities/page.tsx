import React from "react";
import { Metadata } from "next";
import { PHOTOS } from "@/data/homepage";
import { DEMO_OPPORTUNITIES } from "@/data/opportunities";
import OpportunityBoard from "@/components/opportunities/OpportunityBoard";
import { ConsultButton, ConsultSection } from "@/components/nocturne/client";
import { Line, PageHero, SecTop, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "How Global Venture shares acquisition opportunities: anonymised summaries for registered buyers, with detail released under a non-disclosure agreement.",
};

const DISCLOSURE = [
  { title: "Anonymised summary", body: "Sector, region, deal type and a short description. Nothing that identifies the business." },
  { title: "Registration", body: "You tell us who you are, what you are looking for and how an acquisition would be funded." },
  { title: "Non-disclosure agreement", body: "Once the owner approves your interest, you sign an NDA before any detail is released." },
  { title: "Information pack", body: "Financials, the business name and an information memorandum, followed by a meeting if both sides wish." },
];

export default function OpportunitiesPage() {
  return (
    <>
      <PageHero
        kicker="Opportunities"
        title={
          <>
            Introduced privately, <em>never advertised.</em>
          </>
        }
        lede="We do not publish live mandates. Opportunities are shared with registered, qualified buyers, with detail released only under a non-disclosure agreement."
        photoId={PHOTOS.dusk}
        crumbs={[{ label: "Transactions" }, { label: "Opportunities" }]}
      >
        <ConsultButton flow="buy-business" title="Register as a buyer">
          Register as a buyer <Line />
        </ConsultButton>
      </PageHero>

      <section className="sec" aria-labelledby="board-h">
        <div className="wrap">
          <SecTop kicker="Format" id="board-h" title="How opportunities will be presented." />
          <div className="notice rv">
            <b>Example layouts</b>
            <span>
              The cards below are examples of the format only. They are not live businesses for sale and contain no
              real financial information.
            </span>
          </div>
          <OpportunityBoard listings={DEMO_OPPORTUNITIES} />
        </div>
      </section>

      <section className="sec ivory" aria-label="How disclosure works">
        <div className="wrap">
          <Stages
            kicker="Disclosure"
            title="What you see, and when."
            note="Owners decide who learns about their business. These four steps protect them, and give serious buyers a fair view."
            stages={DISCLOSURE}
          />
        </div>
      </section>

      <ConsultSection order={["buy-business", "sell-business"]} />
    </>
  );
}
