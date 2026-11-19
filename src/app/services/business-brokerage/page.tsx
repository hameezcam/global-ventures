import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Confidential Business Brokerage & Intermediation",
  description:
    "Structured, strictly confidential transaction brokerage connecting qualified buyers with profitable, privately-held businesses across prime sectors.",
};

export default function BusinessBrokeragePage() {
  const service = SERVICES.find((s) => s.slug === "business-brokerage");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
