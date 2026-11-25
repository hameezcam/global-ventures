import React from "react";
import { Metadata } from "next";
import { PHOTOS } from "@/data/homepage";
import { INDUSTRY_SECTORS } from "@/data/industries";
import { ConsultSection } from "@/components/nocturne/client";
import { IndexList, PageHero, SecTop } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors Global Venture follows closely, and how valuation, diligence and deal structure differ between them.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries"
        title={
          <>
            Every sector <em>prices risk differently.</em>
          </>
        }
        lede="Valuation multiples, working capital and regulatory approvals vary widely between industries. Our work starts from how your sector actually behaves."
        photoId={PHOTOS.industriesHero}
        crumbs={[{ label: "Industries" }]}
      />
      <section className="sec ivory" aria-labelledby="sectors-h">
        <div className="wrap">
          <SecTop
            kicker="Sectors"
            id="sectors-h"
            title="Sectors we follow closely."
            aside={<p>Each sector has its own page on what buyers and investors look at. We are glad to discuss companies in other sectors too.</p>}
          />
          <IndexList
            items={INDUSTRY_SECTORS.map((s) => ({
              title: s.name,
              body: s.summary,
              meta: s.tagline,
              href: `/industries/${s.slug}`,
            }))}
          />
        </div>
      </section>
      <ConsultSection />
    </>
  );
}
