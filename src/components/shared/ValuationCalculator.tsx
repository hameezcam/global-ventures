"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, ShieldAlert, HelpCircle } from "lucide-react";
import EnquiryModal from "@/components/forms/EnquiryModal";

export const ValuationCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(30); // in millions AED
  const [margin, setMargin] = useState<number>(20); // in percent
  const [sector, setSector] = useState<string>("technology");
  const [showBridgeInfo, setShowBridgeInfo] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Illustrative sector multiple benchmarks (clearly labeled as illustrative benchmarks pending formal mandate)
  const sectorMultiples: Record<string, { min: number; max: number; label: string }> = {
    technology: { min: 6.5, max: 9.5, label: "Technology & Software (6.5x – 9.5x Illustrative)" },
    healthcare: { min: 7.0, max: 10.0, label: "Healthcare & Life Sciences (7.0x – 10.0x Illustrative)" },
    manufacturing: { min: 4.5, max: 6.5, label: "Industrial & Manufacturing (4.5x – 6.5x Illustrative)" },
    logistics: { min: 5.0, max: 7.2, label: "Logistics & Supply Chain (5.0x – 7.2x Illustrative)" },
    retail: { min: 4.0, max: 5.8, label: "Retail & Consumer (4.0x – 5.8x Illustrative)" },
    services: { min: 4.5, max: 6.8, label: "Professional Services (4.5x – 6.8x Illustrative)" },
  };

  const currentSector = sectorMultiples[sector] || sectorMultiples.technology;
  const ebitda = revenue * (margin / 100);
  const estimatedMinEV = (ebitda * currentSector.min).toFixed(1);
  const estimatedMaxEV = (ebitda * currentSector.max).toFixed(1);

  return (
    <>
      <div className="bg-navy-900 border border-gold-500/30 rounded-xl p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-gold-400" />
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
            Illustrative Diagnostic Tool
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
          Indicative Enterprise Valuation Scenario
        </h3>
        <p className="text-xs sm:text-sm text-ivory-100/75 mb-8 max-w-2xl leading-relaxed">
          Test operational assumptions to explore how margin expansion and illustrative sector
          multiples influence indicative Enterprise Value (EV). Formal valuations require
          multi-paradigm IVS/IVSC modeling, discounted cash flow (DCF), and debt/cash adjustments.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                <span>Annual Revenue (Turnover)</span>
                <span className="font-mono text-gold-400 font-bold text-sm">
                  AED {revenue} Million
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-gold-500 bg-navy-950 h-2 rounded-lg cursor-pointer"
                aria-label="Annual Revenue Slider in Millions AED"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>AED 5M</span>
                <span>AED 100M</span>
                <span>AED 200M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium">
                <span>Normalized EBITDA Margin</span>
                <span className="font-mono text-gold-400 font-bold text-sm">{margin}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-gold-500 bg-navy-950 h-2 rounded-lg cursor-pointer"
                aria-label="Normalized EBITDA Margin Slider in Percent"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>5% (Operational Lean)</span>
                <span>25% (Robust)</span>
                <span>45% (High Margin)</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="sector-select"
                className="block text-xs uppercase tracking-wider text-ivory-100/80 mb-2 font-medium"
              >
                Target Industry Multiplier Class (Illustrative GCC Benchmarks)
              </label>
              <select
                id="sector-select"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-navy-950 border border-white/15 focus:border-gold-500 rounded px-4 py-3 text-sm text-white focus:outline-none"
              >
                <option value="technology">Technology &amp; Software (6.5x – 9.5x Illustrative)</option>
                <option value="healthcare">Healthcare &amp; Life Sciences (7.0x – 10.0x Illustrative)</option>
                <option value="manufacturing">Industrial &amp; Manufacturing (4.5x – 6.5x Illustrative)</option>
                <option value="logistics">Logistics &amp; Supply Chain (5.0x – 7.2x Illustrative)</option>
                <option value="retail">Retail &amp; Consumer (4.0x – 5.8x Illustrative)</option>
                <option value="services">Professional &amp; Corporate Services (4.5x – 6.8x Illustrative)</option>
              </select>
            </div>

            {/* Enterprise Value vs Equity Value Explainer */}
            <div className="p-4 rounded-lg bg-navy-950/80 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setShowBridgeInfo(!showBridgeInfo)}
                className="flex items-center justify-between w-full text-gold-400 hover:text-gold-300 font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Understanding Enterprise Value vs. Equity Value (Net Take-Home)</span>
                </span>
                <span className="text-[10px] uppercase underline">{showBridgeInfo ? "Hide" : "Explain"}</span>
              </button>

              {showBridgeInfo && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2 text-ivory-100/75 leading-relaxed">
                  <p>
                    <strong>Enterprise Value (EV)</strong> represents the total operational value of the
                    business regardless of financing structure.
                  </p>
                  <p>
                    <strong>Equity Value (Shareholder Net Proceeds)</strong> is derived through the
                    customary M&amp;A bridge:
                  </p>
                  <div className="p-2.5 rounded bg-navy-900 border border-white/5 font-mono text-[11px] text-gold-300">
                    Equity Value = Enterprise Value − Funded Debt + Surplus Cash ± Working Capital Adjustment
                  </div>
                  <p className="text-[11px] text-slate-400">
                    A formal IVSC valuation establishes both figures defensibly for contract negotiations.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-navy-950 border border-white/10 p-6 rounded-xl space-y-5 text-center sm:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                Derived Normalized Economic EBITDA
              </span>
              <span className="text-xl font-mono text-white font-bold">
                AED {ebitda.toFixed(2)} Million
              </span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                Indicative Enterprise Value (EV) Range
              </span>
              <div className="text-2xl sm:text-3xl font-serif text-white font-bold text-gold-gradient">
                AED {estimatedMinEV}M – {estimatedMaxEV}M
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Based on illustrative sector multiples: {currentSector.min}x – {currentSector.max}x
              </span>
            </div>

            <div className="p-3.5 rounded bg-navy-900 border border-white/5 flex items-start gap-2.5 text-left">
              <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-snug">
                <strong>Illustrative Scenario Notice:</strong> This tool produces indicative
                ranges based on generalized industry multiples. It does not constitute a formal
                appraisal or fairness opinion compliant with IVS/IVSC standards.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded transition-colors"
            >
              <span>Commission Formal IVSC Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flow="valuation"
        title="Commission Formal Business Valuation"
      />
    </>
  );
};

export default ValuationCalculator;
