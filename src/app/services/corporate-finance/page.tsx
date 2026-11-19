import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Corporate Finance Advisory",
  description:
    "Capital structure optimization, debt restructuring, growth capital sourcing, and balance sheet advisory for mid-market and enterprise businesses.",
};

export default function CorporateFinancePage() {
  const service = SERVICES.find((s) => s.slug === "corporate-finance");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
