import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "business-brokerage");

export const metadata: Metadata = {
  title: "Confidential business brokerage",
  description: service?.shortDescription,
};

export default function BusinessBrokeragePage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
