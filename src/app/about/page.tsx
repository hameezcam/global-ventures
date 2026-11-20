import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { APPROACH_STAGES, PHOTOS, photo } from "@/data/homepage";
import { ConsultSection } from "@/components/nocturne/client";
import { IndexList, Photo, PageHero, SecTop, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "About the firm",
  description:
    "Global Ventures is an independent advisory firm for owners, boards and investors on selling, acquiring, valuing and financing private companies.",
};

const PRINCIPLES = [
  {
    title: "Independence",
    body: "Our advice is not tied to a lender, a fund or a product. We are paid to give you an honest view, including when that view is to wait.",
  },
  {
    title: "Confidentiality",
    body: "Nothing that identifies your business is shared without your approval, and nothing sensitive is shared without a non-disclosure agreement.",
  },
  {
    title: "Senior attention",
    body: "We take on a limited number of engagements at a time, so the people you meet at the start are the people who do the work.",
  },
  {
    title: "Clear reasoning",
    body: "Every recommendation and every number is explained, so you can test it, challenge it and stand behind it in a negotiation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About the firm"
        title={
          <>
            Counsel for the moments that <em>define a company.</em>
          </>
        }
        lede="Global Ventures advises owners, boards and investors on selling, acquiring, valuing and financing private companies."
        photoId={PHOTOS.aboutHero}
        crumbs={[{ label: "About" }]}
      />

      <section className="sec ivory" aria-labelledby="why-h">
        <div className="wrap statement">
          <div className="rv">
            <p className="kicker">Why we exist</p>
            <h2 id="why-h">
              Most owners sell a business once. <em>The other side has often done it many times.</em>
            </h2>
          </div>
          <div className="copy rv">
            <p>
              A sale, an acquisition or a new structure of capital is usually the largest financial decision an owner
              or board will make. It is also the one where they have the least practice.
            </p>
            <p>
              Our role is to close that gap: to prepare the business, set out the options plainly, run a careful
              process and negotiate on your behalf, so you go into each decision with the same clarity as the people
              across the table.
            </p>
            <Link className="tlink" href="/services">
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="principles-h">
        <div className="wrap">
          <SecTop kicker="Principles" id="principles-h" title="Four commitments behind every engagement." />
          <IndexList simple items={PRINCIPLES} />
          <div className="photo-pair">
            <Photo className="ph rv" src={photo("aboutPairA", 1600)} sizes="55vw" />
            <Photo className="ph rv" src={photo("aboutPairB", 1000)} sizes="40vw" />
          </div>
        </div>
      </section>

      <section className="sec" aria-label="How we work">
        <div className="wrap">
          <Stages
            kicker="How we work"
            title="Measured, confidential, and paced around you."
            note="Every engagement follows the same four stages."
            stages={APPROACH_STAGES}
          />
        </div>
      </section>

      <section className="sec ivory tight" aria-labelledby="people-h">
        <div className="wrap statement" style={{ alignItems: "center" }}>
          <div className="rv">
            <p className="kicker">Leadership</p>
            <h2 id="people-h" style={{ fontSize: "var(--t-h2)" }}>
              Who leads each service.
            </h2>
          </div>
          <div className="copy rv">
            <p>How engagements are staffed, and who you will work with.</p>
            <Link className="tlink" href="/team">
              Leadership
            </Link>
          </div>
        </div>
      </section>

      <ConsultSection />
    </>
  );
}
