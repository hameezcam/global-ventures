import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Mergers & Acquisitions (M&A) Advisory",
  description:
    "End-to-end sell-side and buy-side M&A advisory, cross-border transaction execution, carve-outs, and strategic partnership orchestration.",
};

export default function MergersAndAcquisitionsPage() {
  const service = SERVICES.find((s) => s.slug === "mergers-and-acquisitions");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
