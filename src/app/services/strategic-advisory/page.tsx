import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "strategic-advisory");

export const metadata: Metadata = {
  title: "Strategic advisory & exit readiness",
  description: service?.shortDescription,
};

export default function StrategicAdvisoryPage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
