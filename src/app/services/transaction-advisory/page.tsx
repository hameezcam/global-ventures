import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Transaction Advisory & Due Diligence",
  description:
    "Financial and commercial due diligence, quality of earnings (QoE) analyses, SPA mechanism advisory, and completion accounts scrutiny.",
};

export default function TransactionAdvisoryPage() {
  const service = SERVICES.find((s) => s.slug === "transaction-advisory");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
