import React from "react";
import Hero from "@/components/home/Hero";
import CorporateIntro from "@/components/home/CorporateIntro";
import CoreExpertise from "@/components/home/CoreExpertise";
import ClientPathways from "@/components/home/ClientPathways";
import TransactionShowcase from "@/components/home/TransactionShowcase";
import OurApproach from "@/components/home/OurApproach";
import IndustryExpertise from "@/components/home/IndustryExpertise";
import InsightsSection from "@/components/home/InsightsSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Corporate Introduction */}
      <CorporateIntro />

      {/* 3. Core Expertise (6 Practices) */}
      <CoreExpertise />

      {/* 4. Client Pathways */}
      <ClientPathways />

      {/* 5. Transaction Opportunities (Filterable Showcase) */}
      <TransactionShowcase />

      {/* 6. Our Approach (4-Stage Timeline) */}
      <OurApproach />

      {/* 7. Industry Expertise (8 Sectors) */}
      <IndustryExpertise />

      {/* 8. Editorial Insights */}
      <InsightsSection />

      {/* 9. Premium Contact Callout */}
      <ContactCTA />
    </>
  );
}
