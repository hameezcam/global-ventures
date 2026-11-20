import React from "react";
import { Metadata } from "next";
import { PHOTOS } from "@/data/homepage";
import { INDUSTRY_SECTORS } from "@/data/industries";
import { ConsultSection, IndustryDirectory } from "@/components/nocturne/client";
import { PageHero, SecTop } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors Global Ventures follows closely, and how valuation, diligence and deal structure differ between them.",
};

export default function IndustriesPage() {
  const sectors = INDUSTRY_SECTORS.map((s) => ({
    id: s.id,
    name: s.name,
    line: s.tagline.split(",")[0].trim(),
    description: s.description,
    focusAreas: s.focusAreas,
    image: s.image.replace("w=800", "w=1200"),
  }));
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
            aside={<p>Choose a sector to see the businesses we typically advise. We are glad to discuss companies in other sectors too.</p>}
          />
          <IndustryDirectory sectors={sectors} expandable />
        </div>
      </section>
      <ConsultSection />
    </>
  );
}
