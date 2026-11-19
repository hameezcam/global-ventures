import React from "react";
import { Metadata } from "next";
import { PHOTOS, PRACTICES } from "@/data/homepage";
import { ConsultSection } from "@/components/nocturne/client";
import { IndexList, PageHero, SecTop } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Leadership",
  description: "How Global Ventures staffs its engagements, and who leads each advisory practice.",
};

/*
 * Named profiles are deliberately not shown until each person, title and
 * qualification has been confirmed. Add them to a data file (e.g. src/data/team.ts) and render
 * them here once verified.
 */
export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Leadership"
        title={
          <>
            The people you meet are <em>the people who do the work.</em>
          </>
        }
        lede="Every engagement is led by a senior adviser from first meeting to completion, supported by specialists from the practices the transaction needs."
        photoId={PHOTOS.interior}
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
      />

      <section className="sec ivory" aria-labelledby="staff-h">
        <div className="wrap statement">
          <div className="rv">
            <p className="kicker">How engagements are staffed</p>
            <h2 id="staff-h">
              One lead adviser. <em>The right specialists around them.</em>
            </h2>
          </div>
          <div className="copy rv">
            <p>
              Your lead adviser is your single point of contact and is responsible for the outcome. They bring in
              colleagues from valuation, due diligence or corporate finance as the work requires, and stay involved
              throughout.
            </p>
            <p>
              Before any engagement begins, you will meet the people who will work on it and receive a written scope
              setting out who does what.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="practices-h">
        <div className="wrap">
          <SecTop
            kicker="Practice leadership"
            id="practices-h"
            title="Each practice has a dedicated lead."
            aside={<p>Adviser profiles are introduced at the first meeting, and will be published here.</p>}
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

      <ConsultSection />
    </>
  );
}
