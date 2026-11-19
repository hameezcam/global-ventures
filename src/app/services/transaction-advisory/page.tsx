import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

const service = SERVICES.find((s) => s.slug === "transaction-advisory");

export const metadata: Metadata = {
  title: "Transaction advisory & due diligence",
  description: service?.shortDescription,
};

export default function TransactionAdvisoryPage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
