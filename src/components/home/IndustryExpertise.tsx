import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { INDUSTRY_SECTORS } from "@/data/industries";

export const IndustryExpertise: React.FC = () => {
  return (
    <section className="py-24 bg-ivory-100 text-navy-900 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-gold-600" />
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">
                SECTOR ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-navy-900 tracking-tight">
              Target Industry Practices.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Specialized sector methodologies recognizing that valuation multiples, transaction
              structuring, and risk parameters vary fundamentally across commercial ecosystems.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              [Proposed Industry Categories]
            </span>
          </div>
        </div>

        {/* 8-Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Image with gradient overlay */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold block">
                    {sector.tagline}
                  </span>
                  <h3 className="text-lg font-serif text-white font-bold">{sector.name}</h3>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sector.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                      Target Niches
                    </span>
                    <ul className="text-[11px] text-slate-700 space-y-0.5">
                      {sector.focusAreas.slice(0, 2).map((fa, i) => (
                        <li key={i} className="line-clamp-1">
                          &bull; {fa}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href="/industries"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 uppercase tracking-wider transition-colors"
                  >
                    <span>View Sector Framework</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryExpertise;
