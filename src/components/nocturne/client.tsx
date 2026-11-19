"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/forms/EnquiryModal";
import type { FlowType } from "@/lib/enquiry/schema";
import { unsplash } from "@/data/homepage";

/**
 * Wraps every page (via app/template.tsx). Plays the page-enter transition,
 * starts the hero reveal and fades sections in as they reach the viewport.
 * Without JS, or with reduced motion, everything is simply visible.
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    document.documentElement.classList.add("gv-ready");
    const raf = requestAnimationFrame(() => root.classList.add("gv-in"));
    const els = Array.from(root.querySelectorAll<HTMLElement>(".rv"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  }, [pathname]);
  return (
    <div ref={ref} className="pt">
      {children}
    </div>
  );
}

/** A button that opens the existing enquiry dialog on a given flow. */
export function ConsultButton({
  flow = "general",
  className = "cta",
  children,
  title,
  listingRef,
}: {
  flow?: FlowType;
  className?: string;
  children: React.ReactNode;
  title?: string;
  listingRef?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <EnquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        flow={flow}
        title={title}
        prefilledListingRef={listingRef}
      />
    </>
  );
}

const CHOICES: { flow: FlowType; title: string; line: string }[] = [
  { flow: "sell-business", title: "Selling a business", line: "Exit planning, valuation and a confidential sale" },
  { flow: "buy-business", title: "Buying a business", line: "Acquisition search and buyer registration" },
  { flow: "valuation", title: "A business valuation", line: "For a transaction, shareholders or the board" },
  { flow: "advisory", title: "Financial advisory", line: "Debt, growth capital or due diligence" },
  { flow: "general", title: "Something else", line: "A general conversation about your plans" },
];

/**
 * The closing consultation panel used on every page: the visitor picks the
 * decision they face, which opens the existing form on the matching flow.
 */
export function ConsultSection({
  kicker = "Consultation",
  title,
  note = "Choose one to begin. Each opens a short, confidential form, and your details are used only to respond to you.",
  photoId = "photo-1477959858617-67f85cf4f1df",
  order,
}: {
  kicker?: string;
  title?: React.ReactNode;
  note?: string;
  photoId?: string | null;
  /** Put the most relevant flow first. */
  order?: FlowType[];
}) {
  const [flow, setFlow] = useState<FlowType | null>(null);
  const choices = order
    ? [...CHOICES].sort((a, b) => {
        const ia = order.indexOf(a.flow);
        const ib = order.indexOf(b.flow);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      })
    : CHOICES;
  return (
    <section className="consult-sec" id="consult" aria-labelledby="consult-h">
      {photoId && (
        <div className="ph" aria-hidden="true">
          <Image src={unsplash(photoId, 2000)} alt="" fill sizes="100vw" />
        </div>
      )}
      <div className="wrap box">
        <div className="rv">
          <p className="kicker">{kicker}</p>
          <h2 id="consult-h">
            {title ?? (
              <>
                What decision are you <em>facing?</em>
              </>
            )}
          </h2>
          <p className="note">{note}</p>
          <ul className="assure">
            <li>Used only to respond to your enquiry</li>
            <li>Sent over an encrypted connection and stored securely</li>
            <li>A non-disclosure agreement before any detailed discussion</li>
          </ul>
        </div>
        <ul className="choices rv">
          {choices.map((c) => (
            <li key={c.flow}>
              <button type="button" onClick={() => setFlow(c.flow)}>
                <span>
                  <b>{c.title}</b>
                  <em>{c.line}</em>
                </span>
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <EnquiryModal isOpen={flow !== null} onClose={() => setFlow(null)} flow={flow ?? "general"} />
    </section>
  );
}

/** Horizontal photographic rail of practices, with previous/next buttons. */
export function PracticeRail({
  items,
}: {
  items: { slug: string; title: string; summary: string; numeral: string; photoId: string }[];
}) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <>
      <div className="rail" ref={rail} tabIndex={0} role="region" aria-label="Advisory practices">
        {items.map((p) => (
          <Link className="pcard" href={`/services/${p.slug}`} key={p.slug}>
            <div className="ph" aria-hidden="true">
              <Image src={unsplash(p.photoId, 900)} alt="" fill sizes="(max-width: 900px) 78vw, 26vw" />
            </div>
            <div className="box">
              <span className="n" aria-hidden="true">
                {p.numeral}
              </span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <span className="go" aria-hidden="true">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="wrap rail-foot">
        <span>Drag or scroll · {items.length} practices</span>
        <div className="arrows">
          <button type="button" aria-label="Previous practices" onClick={() => move(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next practices" onClick={() => move(1)}>
            →
          </button>
        </div>
      </div>
    </>
  );
}

export interface SectorItem {
  id: string;
  name: string;
  line: string;
  description?: string;
  focusAreas?: string[];
  image: string;
}

/**
 * Typographic sector list. Hovering or focusing a sector swaps the
 * photograph; with `expandable`, choosing one reveals its detail.
 */
export function IndustryDirectory({ sectors, expandable = false }: { sectors: SectorItem[]; expandable?: boolean }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(expandable ? 0 : null);
  return (
    <div className="ind">
      <div className="ind-visual rv">
        <div className="ph" aria-hidden="true">
          {sectors.map((s, i) => (
            <Image
              key={s.id}
              src={s.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={i === active ? "on" : undefined}
            />
          ))}
        </div>
        <p aria-live="polite">{sectors[active]?.name}</p>
      </div>
      <ul className="ind-list rv">
        {sectors.map((s, i) => (
          <li key={s.id} className={open === i ? "open" : undefined}>
            <button
              type="button"
              aria-pressed={expandable ? undefined : i === active}
              aria-expanded={expandable ? open === i : undefined}
              aria-controls={expandable ? `sector-${s.id}` : undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => {
                setActive(i);
                if (expandable) setOpen(open === i ? null : i);
              }}
            >
              <b>{s.name}</b>
              <span>{s.line}</span>
            </button>
            {expandable && (
              <div className="ind-detail" id={`sector-${s.id}`}>
                <div>
                  {s.description && <p>{s.description}</p>}
                  {s.focusAreas && (
                    <ul aria-label={`${s.name} focus areas`}>
                      {s.focusAreas.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Floating enquiry bar on phones, shown after the first screen. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  if (pathname === "/contact") return null;
  return (
    <>
      <div className={`mbar${show ? " show" : ""}`} aria-hidden={!show}>
        <span>Confidential consultation</span>
        <button type="button" tabIndex={show ? 0 : -1} onClick={() => setOpen(true)}>
          Begin
        </button>
      </div>
      <EnquiryModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
