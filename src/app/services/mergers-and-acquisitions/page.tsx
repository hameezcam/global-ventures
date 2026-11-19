import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "mergers-and-acquisitions");

export const metadata: Metadata = {
  title: "Mergers & acquisitions advisory",
  description: service?.shortDescription,
};

export default function MergersAndAcquisitionsPage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
