import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
};

export const CoreExpertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-navy-800/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.24em] font-semibold text-gold-400 block mb-2">
            PRACTICE AREAS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Expertise for Every Strategic Decision.
          </h2>
          <p className="text-ivory-100/70 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Comprehensive corporate finance, transaction brokerage, and advisory capabilities
            delivered with technical precision and discreet international execution.
          </p>
        </div>

        {/* 6 Service Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Briefcase;

            return (
              <div
                key={service.id}
                className="group relative bg-navy-900/70 hover:bg-navy-900 border border-white/10 hover:border-gold-500/50 rounded-xl p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-gold-500/5"
              >
                {/* Top Corner Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-navy-950 border border-white/10 group-hover:border-gold-500/50 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-2xl text-slate-500/40 group-hover:text-gold-400/40 font-bold transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-100/70 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] text-gold-400/90 font-medium block">
                      &bull; {service.highlight}
                    </span>
                  </div>
                </div>

                {/* Link */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Explore Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Overview Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-ivory-100 hover:text-gold-400 border border-white/20 hover:border-gold-500/50 px-6 py-3 rounded transition-colors"
          >
            <span>View Complete Services Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoreExpertise;
