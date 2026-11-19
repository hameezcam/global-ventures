import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import ValuationCalculator from "@/components/shared/ValuationCalculator";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Defensible Business Valuation Services",
  description:
    "Empirical, multi-methodology IVSC valuations: DCF modeling, guideline transaction multiples, and fairness opinions for M&A, disputes, and restructuring.",
};

export default function BusinessValuationPage() {
  const service = SERVICES.find((s) => s.slug === "business-valuation");
  if (!service) notFound();

  return (
    <>
      <ServiceDetailView service={service} />
      <section className="py-16 bg-navy-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ValuationCalculator />
        </div>
      </section>
    </>
  );
}
