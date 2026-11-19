import React from "react";
import { Metadata } from "next";
import { Shield, Lock, MapPin, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ConsultationForm from "@/components/forms/ConsultationForm";

export const metadata: Metadata = {
  title: "Contact Private Office | Confidential Advisory",
  description:
    "Initiate a confidential consultation with senior practice partners across corporate finance, M&A, business valuation, and transaction brokerage.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRIVATE OFFICE ENGAGEMENT"
        title="Initiate a Confidential Strategic Conversation."
        subtitle="Direct consultations are steered by senior practice directors under strict bilateral non-disclosure protocols."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Directives & Protocols */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
                  ADVISORY MANDATES
                </span>
                <h2 className="text-3xl font-serif text-white">
                  Clarity in Finance. Confidence in Every Transaction.
                </h2>
                <p className="text-sm text-ivory-100/80 leading-relaxed font-light">
                  Whether you are planning an enterprise exit over the next 18 months, acquiring an
                  operational business, or requiring an independent IVSC business valuation, our
                  directors are available for discreet, preliminary discovery discussions.
                </p>
              </div>

              {/* Strict Confidentiality Guarantee Card */}
              <div className="p-6 rounded-xl bg-navy-900 border border-gold-500/30 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  <h3 className="text-base font-serif text-white">Bilateral Non-Disclosure</h3>
                </div>
                <p className="text-xs text-ivory-100/70 leading-relaxed">
                  Every submitted communication is handled under professional discretion. No client
                  identity or proprietary financial records are disclosed to third parties without
                  explicit written authorization.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-gold-300">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Custom bilateral NDAs provided upon request</span>
                </div>
              </div>

              {/* Office Details */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-ivory-100/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Advisory Headquarters</span>
                    <span className="text-slate-400">United Arab Emirates (Dubai &bull; Abu Dhabi)</span>
                    <span className="text-[10px] text-slate-500 block">[Specific office suite verified upon appointment confirmation]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Direct Inquiries</span>
                    <span className="text-slate-400">advisory@globalventures.com [Placeholder]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Consultation Hours</span>
                    <span className="text-slate-400">Monday – Friday: 09:00 – 18:00 GST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Stream Lead Generation Form */}
            <div className="lg:col-span-7">
              <ConsultationForm className="shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
