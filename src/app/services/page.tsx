import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { SERVICES } from "@/data/services";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Services & Practices Overview",
  description:
    "Explore the six core advisory practices of Global Ventures: Corporate Finance, M&A, Business Valuation, Brokerage, Transaction Advisory, and Strategic Advisory.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="ADVISORY CAPABILITIES"
        title="Comprehensive Advisory for Critical Financial Milestones."
        subtitle="From growth capital restructuring to defensible business valuation and discreet cross-border exit brokerage, our practices provide institutional execution."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.iconName] || Briefcase;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  className={`bg-navy-900 border border-white/10 hover:border-gold-500/40 rounded-2xl p-8 sm:p-12 transition-all duration-300 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Column / Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-navy-950 border border-gold-500/30 flex items-center justify-center text-gold-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold">
                        Practice Area 0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif text-white">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-ivory-100/80 leading-relaxed font-light">
                      {service.fullDescription}
                    </p>

                    <div className="p-4 rounded-lg bg-navy-950 border border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                        Practice Mandate Focus
                      </span>
                      <p className="text-xs text-gold-300 font-medium italic">
                        &ldquo;{service.highlight}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors"
                      >
                        <span>Detailed Practice Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column / Deliverables & Features Box */}
                  <div className="w-full lg:w-96 bg-navy-950 border border-white/10 rounded-xl p-6 shrink-0 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider block mb-2">
                        Key Advisory Deliverables
                      </span>
                      <ul className="space-y-2 text-xs text-ivory-100/80">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-2">
                        Client Profiles
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-300">
                        {service.targetAudience.slice(0, 2).map((aud, i) => (
                          <li key={i}>&bull; {aud}</li>
                        ))}
                      </ul>
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
