import React from "react";
import {
  Approach,
  Contact,
  Expertise,
  Hero,
  Industries,
  Insights,
  Introduction,
  Transactions,
} from "@/components/editorial/HomeSections";
import { MotionController } from "@/components/editorial/client";

export default function HomePage() {
  return (
    <div className="gv gv-page">
      <MotionController />
      <Hero />
      <Introduction />
      <Expertise />
      <Transactions />
      <Approach />
      <Industries />
      <Insights />
      <Contact />
    </div>
  );
}
