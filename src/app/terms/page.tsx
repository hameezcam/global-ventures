import React from "react";
import { Metadata } from "next";
import LegalPage from "@/components/nocturne/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing the use of the Global Venture website, its tools and its information.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of use."
      lede="The terms that govern your use of this website, its tools and its information."
      crumb="Terms of use"
    >
      <h2>1. Information only</h2>
      <p>
        The content on this website is for general information only. It is not investment, legal or tax advice, an
        offer to buy or sell securities, or a solicitation of financial services in any jurisdiction where that would
        be unlawful.
      </p>

      <h2>2. Example opportunities</h2>
      <p>
        Business listings shown on this website are examples that illustrate how opportunities will be presented. They
        are not live businesses for sale and contain no real financial information. Any resemblance to a specific
        business is coincidental. Real opportunities are shared only with qualified buyers after a non-disclosure
        agreement is signed.
      </p>

      <h2>3. Valuation tools</h2>
      <p>
        Interactive tools and multiples on this website produce indicative, non-binding illustrations based on general
        industry assumptions. They are not valuations, appraisals or fairness opinions and must not be relied on. A
        formal valuation requires an engagement, access to the business&rsquo;s information, and a written report.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The Global Venture name and wordmark, publications, methods and design of this website belong to Global
        Venture LLC and are protected by copyright and trademark law. Reproduction or distribution without permission is
        not allowed.
      </p>

      <h2>5. Governing law</h2>
      <p>
        These terms are governed by the laws of the United Arab Emirates. Any dispute arising from the use of this
        website is subject to the exclusive jurisdiction of the competent courts of the United Arab Emirates.
      </p>
    </LegalPage>
  );
}
