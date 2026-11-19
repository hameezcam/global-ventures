import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import ValuationCalculator from "@/components/shared/ValuationCalculator";
import { SecTop } from "@/components/nocturne/ui";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "business-valuation");

export const metadata: Metadata = {
  title: "Business valuation",
  description: service?.shortDescription,
};

export default function BusinessValuationPage() {
  if (!service) notFound();
  return (
    <ServiceDetailView service={service}>
      <section className="sec deep" id="estimate" aria-labelledby="estimate-h">
        <div className="wrap">
          <SecTop
            kicker="Indicative estimate"
            id="estimate-h"
            title="See how margin and sector shape value."
            aside={<p>An illustration only, using broad sector multiples. A formal valuation looks at far more than this.</p>}
          />
          <ValuationCalculator />
        </div>
      </section>
    </ServiceDetailView>
  );
}
