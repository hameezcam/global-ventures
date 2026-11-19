import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "corporate-finance");

export const metadata: Metadata = {
  title: "Corporate finance advisory",
  description: service?.shortDescription,
};

export default function CorporateFinancePage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
