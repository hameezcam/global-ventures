import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/nocturne/LegalPage";
import { PRIVACY_NOTICE_VERSION } from "@/lib/enquiry/schema";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Global Ventures collects, protects and uses the information you share with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy notice."
      lede="How we collect, protect and use the information you share with us."
      crumb="Privacy notice"
      meta={`Notice version ${PRIVACY_NOTICE_VERSION}`}
    >
      <h2>1. Our commitment to confidentiality</h2>
      <p>
        Global Ventures (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) advises on corporate finance and
        business transactions. Given the sensitive commercial nature of this work, confidentiality is central to how we
        operate. We process personal and company information in accordance with applicable data protection laws,
        including UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect information provided directly by clients and prospective counterparties, including:</p>
      <ul>
        <li>Contact details (name, email, telephone, job title).</li>
        <li>Company details (company name, jurisdiction of incorporation, commercial registration).</li>
        <li>Financial parameters (approximate revenue range, capital requirements, indicative budgets).</li>
        <li>Transaction preferences and the context of your enquiry.</li>
      </ul>

      <h2>3. Non-disclosure</h2>
      <p>
        Information received through this website or in preliminary conversations is treated as confidential. We do
        not sell, rent or trade client information. Before detailed operational, technical or financial records about
        any company are exchanged, a non-disclosure agreement is put in place between the parties.
      </p>

      <h2>4. Security and retention</h2>
      <p>
        We use technical and organisational safeguards, including encrypted connections (TLS), secure servers and
        restricted internal access, to protect information against unauthorised access, alteration or disclosure.
        Information is kept only as long as needed to respond to your enquiry, carry out an engagement, or meet legal
        retention obligations.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You may ask to access, correct or delete your personal information. Please send your request through the
        enquiry form on our <Link href="/contact">contact page</Link>, choosing &ldquo;Something else&rdquo;.
      </p>
    </LegalPage>
  );
}
