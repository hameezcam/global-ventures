"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { OpportunityListing } from "@/types";
import EnquiryModal from "@/components/forms/EnquiryModal";

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const CATEGORIES = ["All", "Technology", "Healthcare", "Manufacturing", "Logistics", "Retail & Consumer", "Professional Services"];
const DEAL_TYPES = ["All", "Full Acquisition", "Majority Stake", "Strategic Investment"];

/** Filterable grid of anonymised opportunity cards. */
export default function OpportunityBoard({ listings }: { listings: OpportunityListing[] }) {
  const [category, setCategory] = useState("All");
  const [dealType, setDealType] = useState("All");
  const [listingRef, setListingRef] = useState<string | null>(null);

  const filtered = listings.filter(
    (o) => (category === "All" || o.category === category) && (dealType === "All" || o.dealType === dealType)
  );

  const Chips = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <>
      <span className="fl" id={`f-${label}`}>
        {label}
      </span>
      <div className="chips" role="group" aria-labelledby={`f-${label}`}>
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="filters rv">
        <Chips label="Sector" options={CATEGORIES} value={category} onChange={setCategory} />
        <Chips label="Deal type" options={DEAL_TYPES} value={dealType} onChange={setDealType} />
      </div>
      <div className="result-bar" aria-live="polite">
        <span>
          Showing {filtered.length} example {filtered.length === 1 ? "layout" : "layouts"}
        </span>
        <span>Financial detail is released to registered buyers after an NDA</span>
      </div>
      {filtered.length > 0 ? (
        <div className="op-grid">
          {filtered.map((o) => (
            <article className="op" key={o.id}>
              <div className="r1">
                <span>{o.category}</span>
                <span className="tag">Example</span>
              </div>
              <h3>
                <Link href={`/opportunities/${o.id}`}>{cap(o.title.replace(/^Example:\s*/, ""))}</Link>
              </h3>
              <dl>
                <div>
                  <dt>Revenue</dt>
                  <dd className="lock">{o.revenueRange}</dd>
                </div>
                <div>
                  <dt>Deal type</dt>
                  <dd>{o.dealType}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{o.location}</dd>
                </div>
                <div>
                  <dt>Reference</dt>
                  <dd>{o.referenceCode}</dd>
                </div>
              </dl>
              <button type="button" className="act" onClick={() => setListingRef(o.referenceCode)}>
                Request information →
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No examples match these filters.</h3>
          <p className="muted">Register as a buyer and we will tell you about relevant opportunities privately.</p>
        </div>
      )}
      <EnquiryModal
        isOpen={listingRef !== null}
        onClose={() => setListingRef(null)}
        flow="buy-business"
        prefilledListingRef={listingRef ?? ""}
        title="Register interest"
      />
    </>
  );
}
