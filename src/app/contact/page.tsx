import React from "react";
import { Metadata } from "next";
import { PHOTOS } from "@/data/homepage";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { PageHero, Stages } from "@/components/nocturne/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a confidential conversation with Global Ventures about selling, buying, valuing or financing a business.",
};

const NEXT = [
  { title: "We read your enquiry", body: "An adviser reviews what you have shared and how it fits our services." },
  { title: "We arrange a conversation", body: "We contact you to set up an initial discussion, at no obligation." },
  { title: "We agree what happens next", body: "If it makes sense to work together, you receive a written scope before anything begins." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={
          <>
            Begin a <em>confidential</em> conversation.
          </>
        }
        lede="Tell us a little about your situation. Your details are used only to respond to you, and an NDA is available before any detailed discussion."
        photoId={PHOTOS.dusk}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="sec deep" aria-label="Enquiry form">
        <div className="wrap split">
          <div className="sticky">
            <p className="kicker">Enquiry</p>
            <h2>Two minutes, in confidence.</h2>
            <ul className="assure">
              <li>Used only to respond to your enquiry</li>
              <li>Sent over an encrypted connection and stored securely</li>
              <li>A non-disclosure agreement before any detailed discussion</li>
            </ul>
          </div>
          <div className="rv">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section className="sec" aria-label="What happens next">
        <div className="wrap">
          <Stages kicker="After you write" title="What happens next." stages={NEXT} />
        </div>
      </section>
    </>
  );
}
