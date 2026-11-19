import React from "react";
import { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms and Conditions | Advisory Framework",
  description:
    "Review Global Ventures' website terms of use, legal notices, and corporate advisory disclaimers.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="LEGAL NOTICES"
        title="Terms of Use &amp; Advisory Disclaimers."
        subtitle="Important regulatory and legal terms governing the use of the Global Ventures corporate website and information channels."
        breadcrumbs={[{ label: "Terms and Conditions" }]}
      />

      <section className="py-20 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-ivory-100/80 leading-relaxed font-light">
          <div>
            <h2 className="text-xl font-serif text-white mb-3">1. Scope of Corporate Information</h2>
            <p>
              The content published on this website is for informational and educational purposes only.
              It does not constitute investment advice, legal counsel, tax advice, an offer to buy or
              sell securities, or a formal solicitation of financial services in any jurisdiction where
              such offer or solicitation would be unlawful.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">2. Anonymized Demonstration Opportunities</h2>
            <p>
              All transaction dossiers and business listings featured in the demonstration sections of
              this website are anonymized or representative models designed to illustrate data structures,
              metrics, and transaction methodologies. Any resemblance to specific operating entities is
              coincidental. Genuine transaction opportunities are made available solely to qualified,
              vetted buyers following execution of a bilateral Non-Disclosure Agreement (NDA).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">3. Independent Valuation Diagnostics</h2>
            <p>
              Any online interactive tools, scenario calculators, or valuation multiples featured on
              this platform generate indicative, non-binding estimates based on generalized industry
              assumptions. They do not constitute formal valuation opinions compliant with the
              International Valuation Standards Council (IVSC) standards. A binding valuation requires a
              formal mandate, full due diligence, and comprehensive empirical reporting signed by an
              authorized practice director.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">4. Intellectual Property</h2>
            <p>
              All trademarks, wordmarks, the GV monogram, editorial publications, methodologies, and
              design layouts on this website are the proprietary intellectual property of Global
              Ventures and are protected under international copyright and trademark laws. Unauthorized
              reproduction, duplication, or distribution is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-white mb-3">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the
              United Arab Emirates. Any disputes arising in connection with the use of this website
              shall be subject to the exclusive jurisdiction of the competent courts of the United Arab
              Emirates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
