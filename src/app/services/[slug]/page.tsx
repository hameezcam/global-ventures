import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/shared/ServiceDetailView";
import { SERVICES } from "@/data/services";

/* Business Valuation has its own page (it adds the calculator). */
const PAGES = SERVICES.filter((s) => s.slug !== "business-valuation");

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = PAGES.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = PAGES.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
