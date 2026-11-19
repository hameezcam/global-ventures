import React from "react";
import { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Confidentiality & Data Protection",
  description:
    "Review Global Ventures' privacy protocols, confidentiality commitments, and data governance standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="LEGAL &amp; COMPLIANCE"
        title="Privacy Policy &amp; Data Confidentiality."
        subtitle="Our operational protocols regarding the protection of proprietary corporate records, personal information, and advisory communications."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-ivory-100/80 leading-relaxed font-light">
          <div>
            <h2 className="text-xl font-serif text-white mb-3">1. Foundational Commitment to Discretion</h2>
            <p>
              Global Ventures (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates as a
              specialized corporate finance and business transaction brokerage firm. Given the sensitive
              commercial nature of our mandates, confidentiality is the cornerstone of our advisory
              practice. We process personal and corporate information strictly in accordance with
              applicable data protection laws, including the UAE Federal Decree Law No. 45 of 2021 on
              the Protection of Personal Data (PDPL), and international standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect information provided directly by clients and prospective mandate counterparties, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Contact details (name, corporate email, telephone, job title).</li>
              <li>Company and entity details (company name, jurisdiction of incorporation, commercial register numbers).</li>
              <li>Financial parameters (approximate turnover brackets, capital requirements, indicative investment budgets).</li>
              <li>Transaction preferences and inquiry context.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">3. Non-Disclosure &amp; Information Walls</h2>
            <p>
              Information received via this website or preliminary consultations is treated as confidential.
              We do not sell, rent, or trade client information. Prior to exchanging detailed operational,
              technical, or audited financial records regarding any company, formal bilateral Non-Disclosure
              Agreements (NDAs) are executed between parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">4. Security &amp; Data Retention</h2>
            <p>
              We implement institutional-grade technical and organizational safeguards—including transport
              layer encryption (TLS), secure servers, and restricted internal access permissions—to protect
              data against unauthorized access, alteration, or disclosure. Data is retained only as long
              as necessary to fulfill the commercial mandate or comply with statutory retention obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">5. Inquiries &amp; Data Subject Rights</h2>
            <p>
              Clients and counterparties may request access to, correction of, or deletion of their personal
              records by contacting our compliance desk at{" "}
              <span className="text-gold-400 font-mono">compliance@globalventures.com [Placeholder]</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
