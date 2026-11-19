"use client";

import React, { useId, useState } from "react";
import EnquiryModal from "@/components/forms/EnquiryModal";

/*
 * Illustrative sector multiples, clearly labelled as such. The arithmetic is
 * unchanged from the original tool and covered by tests/valuationCalculator.
 */
const SECTOR_MULTIPLES: Record<string, { min: number; max: number; label: string }> = {
  technology: { min: 6.5, max: 9.5, label: "Technology & software" },
  healthcare: { min: 7.0, max: 10.0, label: "Healthcare & life sciences" },
  manufacturing: { min: 4.5, max: 6.5, label: "Industrial & manufacturing" },
  logistics: { min: 5.0, max: 7.2, label: "Logistics & supply chain" },
  retail: { min: 4.0, max: 5.8, label: "Retail & consumer" },
  services: { min: 4.5, max: 6.8, label: "Professional & corporate services" },
};

export const ValuationCalculator: React.FC = () => {
  const uid = useId();
  const [revenue, setRevenue] = useState<number>(30); // AED millions
  const [margin, setMargin] = useState<number>(20); // percent
  const [sector, setSector] = useState<string>("technology");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSector = SECTOR_MULTIPLES[sector] || SECTOR_MULTIPLES.technology;
  const ebitda = revenue * (margin / 100);
  const estimatedMinEV = (ebitda * currentSector.min).toFixed(1);
  const estimatedMaxEV = (ebitda * currentSector.max).toFixed(1);

  return (
    <>
      <div className="calc rv">
        <div className="controls">
          <div>
            <div className="row">
              <label htmlFor={`${uid}-rev`}>Annual revenue</label>
              <output htmlFor={`${uid}-rev`}>AED {revenue}M</output>
            </div>
            <input
              id={`${uid}-rev`}
              type="range"
              min="5"
              max="200"
              step="5"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              aria-valuetext={`AED ${revenue} million`}
            />
            <div className="scale" aria-hidden="true">
              <span>AED 5M</span>
              <span>AED 100M</span>
              <span>AED 200M</span>
            </div>
          </div>

          <div>
            <div className="row">
              <label htmlFor={`${uid}-margin`}>Normalised EBITDA margin</label>
              <output htmlFor={`${uid}-margin`}>{margin}%</output>
            </div>
            <input
              id={`${uid}-margin`}
              type="range"
              min="5"
              max="45"
              step="1"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              aria-valuetext={`${margin} percent`}
            />
            <div className="scale" aria-hidden="true">
              <span>5%</span>
              <span>25%</span>
              <span>45%</span>
            </div>
          </div>

          <div>
            <label htmlFor={`${uid}-sector`} className="lbl" style={{ display: "block", marginBottom: 8 }}>
              Sector (illustrative multiple range)
            </label>
            <select id={`${uid}-sector`} value={sector} onChange={(e) => setSector(e.target.value)}>
              {Object.entries(SECTOR_MULTIPLES).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label} ({s.min.toFixed(1)}x – {s.max.toFixed(1)}x)
                </option>
              ))}
            </select>
          </div>

          <details>
            <summary>Enterprise value and what the owner receives</summary>
            <p>
              Enterprise value is the value of the business as a whole, regardless of how it is financed. What
              shareholders receive, the equity value, is found through the usual bridge:
            </p>
            <code>Equity value = Enterprise value − debt + surplus cash ± working capital adjustment</code>
          </details>
        </div>

        <div className="out" aria-live="polite">
          <div>
            <p className="fine">Implied EBITDA</p>
            <p className="val" style={{ marginTop: 6 }}>
              AED {ebitda.toFixed(2)}M
            </p>
          </div>
          <div>
            <p className="fine">Indicative enterprise value</p>
            <p className="ev" style={{ marginTop: 8 }}>
              AED {estimatedMinEV}M – {estimatedMaxEV}M
            </p>
            <p className="fine" style={{ marginTop: 8 }}>
              At {currentSector.min}x – {currentSector.max}x EBITDA
            </p>
          </div>
          <p className="fine">
            An illustration using broad sector multiples. It is not a valuation, an appraisal or a fairness opinion,
            and should not be relied on for any decision.
          </p>
          <button type="button" className="cta solid" style={{ alignSelf: "flex-start", marginTop: "auto" }} onClick={() => setIsModalOpen(true)}>
            Request a formal valuation <span className="ln" aria-hidden="true" />
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flow="valuation"
        title="Request a formal valuation"
      />
    </>
  );
};

export default ValuationCalculator;
