import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PHOTOS } from "@/data/homepage";
import { ConsultButton, ConsultSection } from "@/components/nocturne/client";
import ValuationCalculator from "@/components/shared/ValuationCalculator";
import { IndexList, Line, PageHero, SecTop, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Sell a business",
  description:
    "Confidential sell-side advice for owners: exit readiness, valuation, a discreet approach to qualified buyers, and negotiation through to completion.",
};

const STAGES = [
  {
    title: "Readiness",
    body: "We review the business as a buyer will: normalised earnings, customer concentration, reliance on the owner, and anything that needs addressing before going to market.",
  },
  {
    title: "Valuation",
    body: "A reasoned view of value and the range a buyer is likely to pay, so you set expectations and a walk-away point before negotiations begin.",
  },
  {
    title: "Confidential approach",
    body: "An anonymised teaser goes only to buyers we have screened. Detailed information follows a signed non-disclosure agreement.",
  },
  {
    title: "Offers and negotiation",
    body: "Where possible we create competition between serious buyers, then negotiate price, structure and protections on your behalf.",
  },
  {
    title: "Completion",
    body: "We manage confirmatory diligence, coordinate with your lawyers, and plan the handover so the business keeps running smoothly.",
  },
];

const CONCERNS = [
  { title: "Will my staff or customers find out?", body: "Not from us. Your business is not named in any marketing, and buyers see identifying detail only after an NDA and your approval." },
  { title: "What is my business actually worth?", body: "We give you a reasoned range before you commit to selling, with the assumptions set out so you can test them." },
  { title: "How long does a sale take?", body: "It depends on the business and the market. We agree a realistic timetable with you at the start and report against it." },
  { title: "Do I have to sell all of it?", body: "No. Partial sales, staged exits and minority investment are all options we can explore." },
];

export default function SellBusinessPage() {
  return (
    <>
      <PageHero
        kicker="For owners"
        title={
          <>
            Selling a business, <em>on your terms.</em>
          </>
        }
        lede="Confidential sell-side advice, from preparing the business to the day the sale completes."
        photoId={PHOTOS.interior}
        crumbs={[{ label: "Transactions" }, { label: "Sell a business" }]}
      >
        <ConsultButton flow="sell-business">
          Begin a sale enquiry <Line />
        </ConsultButton>
        <Link className="tlink" href="#estimate">
          Estimate a value range
        </Link>
      </PageHero>

      <section className="sec ivory" aria-labelledby="intro-h">
        <div className="wrap statement">
          <div className="rv">
            <p className="kicker">The approach</p>
            <h2 id="intro-h">
              A good sale is prepared <em>long before</em> the first buyer hears about it.
            </h2>
          </div>
          <div className="copy rv">
            <p>
              Buyers look for reasons to lower the price. We find those reasons first, so they can be fixed, explained
              or priced in on your terms rather than theirs.
            </p>
            <p>
              Then we run a discreet, structured process with qualified buyers only, and negotiate on your behalf
              through to completion.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-label="The sale process">
        <div className="wrap">
          <Stages kicker="Process" title="Five stages, from readiness to completion." stages={STAGES} />
        </div>
      </section>

      <section className="sec deep" id="estimate" aria-labelledby="estimate-h">
        <div className="wrap">
          <SecTop
            kicker="Indicative estimate"
            id="estimate-h"
            title="A first look at what your business may be worth."
            aside={<p>An illustration only, using broad sector multiples. Your valuation will look at far more.</p>}
          />
          <ValuationCalculator />
        </div>
      </section>

      <section className="sec ivory" aria-labelledby="faq-h">
        <div className="wrap">
          <SecTop kicker="Common questions" id="faq-h" title="What owners usually ask first." />
          <IndexList simple items={CONCERNS} />
        </div>
      </section>

      <ConsultSection
        order={["sell-business", "valuation"]}
        title={
          <>
            Thinking about <em>selling?</em>
          </>
        }
      />
    </>
  );
}
