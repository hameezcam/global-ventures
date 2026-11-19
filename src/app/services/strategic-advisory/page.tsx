import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Strategic Advisory & Exit Readiness",
  description:
    "Long-term value creation, board-level advisory, feasibility studies, exit readiness planning, and market entry strategy.",
};

export default function StrategicAdvisoryPage() {
  const service = SERVICES.find((s) => s.slug === "strategic-advisory");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
