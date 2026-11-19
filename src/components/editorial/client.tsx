"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import EnquiryModal from "@/components/forms/EnquiryModal";
import type { FlowType } from "@/lib/enquiry/schema";

/**
 * Starts the entrance animations: marks the document ready, plays the hero
 * reveal, and fades sections in as they enter the viewport. Without JS or
 * with reduced motion everything is simply visible.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("gv-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => root.classList.add("loaded"));
    const els = Array.from(document.querySelectorAll<HTMLElement>(".gv .reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  return null;
}

/** A button that opens the existing enquiry dialog on a given flow. */
export function ConsultButton({
  flow = "general",
  className = "btn btn-light",
  children,
  title,
}: {
  flow?: FlowType;
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <EnquiryModal isOpen={open} onClose={() => setOpen(false)} flow={flow} title={title} />
    </>
  );
}

export interface SectorItem {
  id: string;
  name: string;
  line: string;
  image: string;
}

/** Typographic sector list; hovering, focusing or choosing a sector swaps the image. */
export function IndustryDirectory({ sectors }: { sectors: SectorItem[] }) {
  const [active, setActive] = useState(0);
  const current = sectors[active];
  return (
    <div className="ind-grid">
      <div className="ind-visual reveal">
        <div className="ph" data-tone="stone">
          {sectors.map((s, i) => (
            <Image
              key={s.id}
              src={s.image}
              alt=""
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
              className={i === active ? "is-active" : undefined}
            />
          ))}
        </div>
        <p aria-live="polite">{current.name}</p>
      </div>
      <div>
        <ul className="ind-list reveal">
          {sectors.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <b>{s.name}</b>
                <span>{s.line}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ind-note reveal">
          Our sector coverage reflects where private ownership and transaction activity are most
          significant. We are glad to discuss businesses in other sectors.
        </p>
      </div>
    </div>
  );
}

const FLOW_CHOICES: { value: FlowType; title: string; line: string; time: string }[] = [
  { value: "sell-business", title: "Selling a business", line: "Exit planning, valuation and a confidential sale", time: "About 3 min" },
  { value: "buy-business", title: "Buying a business", line: "Acquisition search and buyer registration", time: "About 3 min" },
  { value: "valuation", title: "A business valuation", line: "For a transaction, shareholders or the board", time: "About 2 min" },
  { value: "advisory", title: "Financial advisory", line: "Debt, growth capital, due diligence or restructuring", time: "About 2 min" },
  { value: "general", title: "Something else", line: "A general conversation about your plans", time: "About 2 min" },
];

/**
 * Step one of the consultation: choose one of the five existing enquiry
 * flows, then continue into the existing form (same fields, validation,
 * idempotency and API).
 */
export function ConsultationChooser() {
  const [flow, setFlow] = useState<FlowType>("sell-business");
  const [open, setOpen] = useState(false);
  return (
    <>
      <form
        className="contact-r reveal"
        aria-labelledby="gv-flow-h"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <p className="step">Step 1 of 2</p>
        <h3 id="gv-flow-h">What would you like to discuss?</h3>
        <fieldset className="flows">
          <legend className="sr-only">Enquiry type</legend>
          {FLOW_CHOICES.map((c) => (
            <label key={c.value}>
              <input
                type="radio"
                name="gv-flow"
                value={c.value}
                checked={flow === c.value}
                onChange={() => setFlow(c.value)}
              />
              <span>
                <b>{c.title}</b>
                <em>{c.line}</em>
              </span>
              <span className="t">{c.time}</span>
            </label>
          ))}
        </fieldset>
        <button className="btn btn-dark" type="submit">
          Continue <span className="arr" aria-hidden="true">→</span>
        </button>
        <p className="secure">
          Your enquiry is sent over an encrypted connection and stored securely.
        </p>
      </form>
      <EnquiryModal isOpen={open} onClose={() => setOpen(false)} flow={flow} />
    </>
  );
}
