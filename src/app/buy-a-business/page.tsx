import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PHOTOS } from "@/data/homepage";
import { ConsultButton, ConsultSection } from "@/components/nocturne/client";
import { IndexList, Line, PageHero, SecTop, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Buy a business",
  description:
    "Buy-side advice for investors and companies: defining the mandate, finding and approaching targets, due diligence, and negotiating to completion.",
};

const STAGES = [
  { title: "Mandate", body: "We agree what you are looking for: sector, size, location, the role of management, and the price range that makes sense." },
  { title: "Search and approach", body: "We identify businesses that fit, including ones not openly for sale, and approach owners discreetly on your behalf." },
  { title: "Valuation", body: "Independent analysis sets a disciplined price range and a structure before you make an offer." },
  { title: "Due diligence", body: "We test the numbers behind the story: quality of earnings, working capital, and risks that should shape the terms." },
  { title: "Negotiation and close", body: "Price, earn-outs, protections and completion mechanics, negotiated with your lawyers through to closing." },
];

const BUYERS = [
  { title: "Private investors and family offices", body: "Looking for an established business with steady cash flow and a management team in place." },
  { title: "Companies acquiring for growth", body: "Adding capability, customers or geography through a bolt-on acquisition." },
  { title: "Management teams", body: "Planning a buy-out or buy-in and needing help with structure and financing." },
];

export default function BuyBusinessPage() {
  return (
    <>
      <PageHero
        kicker="For acquirers"
        title={
          <>
            Finding the right company <em>to acquire.</em>
          </>
        }
        lede="Buy-side advice from defining what you want to the signed agreement, with the numbers tested before you commit."
        photoId={PHOTOS.skyline}
        crumbs={[{ label: "Transactions" }, { label: "Buy a business" }]}
      >
        <ConsultButton flow="buy-business">
          Register as a buyer <Line />
        </ConsultButton>
        <Link className="tlink" href="/opportunities">
          How opportunities are shared
        </Link>
      </PageHero>

      <section className="sec ivory" aria-labelledby="intro-h">
        <div className="wrap statement">
          <div className="rv">
            <p className="kicker">The approach</p>
            <h2 id="intro-h">
              The best acquisitions are rarely <em>advertised.</em>
            </h2>
          </div>
          <div className="copy rv">
            <p>
              Many good businesses are never openly for sale. We work from a clear mandate to find companies that fit,
              approach their owners discreetly, and build the case for a transaction.
            </p>
            <p>
              When a target is found, we make sure the price reflects what the business really earns, and that the
              terms protect you after completion.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-label="The acquisition process">
        <div className="wrap">
          <Stages kicker="Process" title="Five stages, from mandate to close." stages={STAGES} />
        </div>
      </section>

      <section className="sec ivory" aria-labelledby="who-h">
        <div className="wrap">
          <SecTop kicker="Who we act for" id="who-h" title="Buyers we typically advise." />
          <IndexList simple items={BUYERS} />
        </div>
      </section>

      <ConsultSection
        order={["buy-business", "advisory"]}
        title={
          <>
            Looking for a business <em>to buy?</em>
          </>
        }
      />
    </>
  );
}
