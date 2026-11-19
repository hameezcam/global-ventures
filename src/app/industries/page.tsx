import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { INDUSTRY_SECTORS } from "@/data/industries";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Industry Sectors & Advisory Architecture",
  description:
    "Explore Global Ventures' sector methodologies spanning Technology, Healthcare, Logistics, Manufacturing, Consumer Brands, Hospitality, Real Estate, and Professional Services.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SECTOR EXPERTISE"
        title="Deep Sector Context. Tailored Transaction Architectures."
        subtitle="Valuation multiples, working capital dynamics, and regulatory approvals differ dramatically across industries. We tailor our corporate finance and M&A methodologies accordingly."
        breadcrumbs={[{ label: "Industries" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 p-4 rounded-lg bg-navy-900 border border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>
              Sector architectures represent our analytical coverage and valuation modeling
              methodologies across the GCC and international commercial spheres.
            </span>
            <span className="font-mono text-gold-400 text-[10px] uppercase font-semibold hidden sm:inline">
              [Proposed Industry Practice Scope]
            </span>
          </div>

          <div className="space-y-16">
            {INDUSTRY_SECTORS.map((sector, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={sector.id}
                  id={sector.slug}
                  className={`bg-navy-900 border border-white/10 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col lg:flex-row items-stretch ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo Column */}
                  <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[400px]">
                    <Image
                      src={sector.image}
                      alt={sector.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy-950/80 via-navy-950/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs uppercase font-semibold px-3 py-1.5 rounded">
                        Sector 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="p-8 sm:p-12 w-full lg:w-1/2 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                        {sector.tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-white">
                        {sector.name}
                      </h2>
                      <p className="text-sm text-ivory-100/80 leading-relaxed font-light">
                        {sector.description}
                      </p>

                      <div className="pt-4 border-t border-white/10">
                        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                          Priority Coverage Niches
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sector.focusAreas.map((focus, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-ivory-100/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                              <span>{focus}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={`/contact?sector=${sector.slug}`}
                        className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-colors"
                      >
                        <span>Discuss Sector Mandate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/opportunities"
                        className="text-xs uppercase tracking-wider text-slate-400 hover:text-gold-400 transition-colors"
                      >
                        Active Deals &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
