import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { LEADERSHIP_TEAM } from "@/data/team";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Leadership & Practice Heads",
  description:
    "Meet the senior advisory partners and corporate finance directors leading Global Ventures.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="ADVISORY LEADERSHIP"
        title="Direct Senior Partner Mandate Stewardship."
        subtitle="Our practice heads bring multi-disciplinary transaction experience across cross-border M&A, forensic due diligence, IVSC valuation, and confidential brokerage."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Leadership" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Note on designation approvals */}
          <div className="mb-12 p-4 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-between text-xs text-ivory-100/70">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold-400" />
              <span>
                Practice Director profiles shown below reflect operational leadership roles. Verified
                individual biographies and public registrations are confirmed during bilateral
                mandate onboarding.
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono text-gold-400 font-semibold shrink-0 ml-4 hidden sm:inline">
              [Practice Framework]
            </span>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl overflow-hidden transition-all duration-300 group flex flex-col sm:flex-row"
              >
                {/* Photo */}
                <div className="relative w-full sm:w-48 h-64 sm:h-auto shrink-0 bg-navy-950">
                  <Image
                    src={member.image}
                    alt={member.role}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-navy-900/60 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                      {member.practiceArea}
                    </span>
                    <h3 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors">
                      {member.role}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono block mb-3">
                      {member.name}
                    </span>

                    <p className="text-xs text-ivory-100/70 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                        Core Competencies
                      </span>
                      <ul className="text-[11px] text-ivory-100/80 space-y-1">
                        {member.credentials.map((cred, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-gold-400 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <span>Consult Practice Head</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
