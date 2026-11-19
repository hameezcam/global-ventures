"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
  FileCheck,
  Users,
  Lock,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import EnquiryModal from "@/components/forms/EnquiryModal";
import { ServiceItem } from "@/types";
import { SERVICES } from "@/data/services";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
};

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = ICON_MAP[service.iconName] || Briefcase;

  const flowType =
    service.slug === "business-valuation"
      ? "valuation"
      : service.slug === "mergers-and-acquisitions"
      ? "sell-business"
      : service.slug === "business-brokerage"
      ? "buy-business"
      : "advisory";

  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="PRACTICE DETAIL"
        title={service.title}
        subtitle={service.shortDescription}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  PRACTICE CHARTER
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Institutional Scope &amp; Advisory Methodology
                </h2>
                <p className="text-base sm:text-lg text-ivory-100/80 leading-relaxed font-light">
                  {service.fullDescription}
                </p>
              </div>

              {/* Core Features / Advisory Capabilities */}
              <div className="p-8 rounded-xl bg-navy-900 border border-white/10 space-y-6">
                <h3 className="text-xl font-serif text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-gold-400" />
                  <span>Mandate Capabilities &amp; Advisory Scope</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded bg-navy-950 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-ivory-100 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concrete Deliverables */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white">
                  Client Deliverables &amp; Work Products
                </h3>
                <p className="text-xs text-ivory-100/70 leading-relaxed">
                  Every mandate culminates in rigorous, bankable documentation prepared to withstand
                  the scrutiny of institutional investors, credit committees, and legal counsel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-navy-900/60 border border-gold-500/20 text-xs text-ivory-100"
                    >
                      <span className="font-mono text-gold-400 text-[10px] block mb-1">
                        DELIVERABLE 0{i + 1}
                      </span>
                      <span className="font-semibold">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidentiality Commitment */}
              <div className="p-6 rounded-xl bg-navy-900 border border-gold-500/30 flex items-start gap-4">
                <Lock className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Strict Non-Disclosure Guarantee</h4>
                  <p className="text-xs text-ivory-100/70 mt-1 leading-relaxed">
                    Prior to any commercial discovery or receipt of sensitive financial documentation,
                    Global Ventures executes bilateral non-disclosure agreements adhering to customary
                    international legal standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar / Action Card */}
            <div className="lg:col-span-4 space-y-8">
              {/* Engagement Box */}
              <div className="bg-navy-900 border border-gold-500/40 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-950 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Direct Engagement
                    </span>
                    <span className="text-sm font-serif text-white font-bold">
                      {service.title}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-ivory-100/70 leading-relaxed">
                  Speak directly with the lead partner responsible for our {service.title} practice.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-colors"
                >
                  <span>Request Practice Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Ideal Client Profiles
                  </span>
                  <ul className="space-y-1.5 text-xs text-ivory-100/80">
                    {service.targetAudience.map((target, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Practices */}
              <div className="bg-navy-900 border border-white/10 rounded-xl p-6 space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  Complementary Practices
                </span>
                <div className="space-y-3">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}`}
                      className="block p-3 rounded bg-navy-950/60 hover:bg-navy-950 border border-white/5 hover:border-gold-500/30 transition-colors group"
                    >
                      <h5 className="text-xs font-semibold text-white group-hover:text-gold-300">
                        {other.title}
                      </h5>
                      <p className="text-[10px] text-ivory-100/60 mt-0.5 line-clamp-1">
                        {other.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flow={flowType}
        title={`Consultation: ${service.title}`}
      />
    </>
  );
};

export default ServiceDetailView;
