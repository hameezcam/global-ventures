import React from "react";
import Link from "next/link";
import { ArrowUpRight, Lock, MapPin, Mail } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { SERVICES } from "@/data/services";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/10 text-ivory-100/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-sm text-ivory-100/70 leading-relaxed max-w-sm mt-3">
              Global Ventures is an elite financial advisory and business transaction brokerage firm.
              We advise founders, enterprise shareholders, and institutional investors across capital
              raising, M&amp;A divestitures, independent valuations, and discreet transaction brokerage.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-gold-400 bg-navy-900 border border-gold-500/20 px-3 py-1.5 rounded">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>Confidential Corporate Financial Advisory</span>
              </span>
            </div>
          </div>

          {/* Column 2: Advisory Practices */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Advisory Practices
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-gold-300 transition-colors inline-flex items-center gap-1 text-ivory-100/70"
                  >
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Transactions & Portals */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Transactions &amp; Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/opportunities"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Confidential Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-a-business"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Sell a Business / Exit
                </Link>
              </li>
              <li>
                <Link
                  href="/buy-a-business"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Acquire a Business / Buy-Side
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Industry Sectors
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Editorial &amp; Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-gold-300 transition-colors text-ivory-100/70"
                >
                  Leadership Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Confidential Engagement */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Private Office
            </h4>
            <div className="space-y-3 text-xs text-ivory-100/70">
              <p className="leading-relaxed">
                Direct advisory consultations are coordinated under bilateral Non-Disclosure
                Agreements (NDA).
              </p>
              <div className="pt-2 space-y-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-semibold text-xs"
                >
                  <span>Request a Private Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-gold-400" />
                  <span>United Arab Emirates &bull; International Mandates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-gold-400" />
                  <span>advisory@globalventures.com [Placeholder]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Disclaimer */}
        <div className="py-6 border-b border-white/10 text-[11px] text-slate-400 leading-relaxed">
          <p className="mb-2">
            <strong className="text-ivory-100/80">Regulatory Notice &amp; Legal Disclaimers:</strong>{" "}
            Global Ventures provides independent corporate finance advisory, commercial valuation,
            and business transaction brokerage. The information published on this website is for
            general informational purposes and does not constitute an offer, solicitation, or
            recommendation to buy or sell securities, financial instruments, or commercial
            enterprises. All business transaction opportunities showcased on this platform are
            anonymized or demonstration examples until formal non-disclosure protocols and buyer
            qualification procedures are executed. Specific regulatory licenses, registrations, and
            formal practice authorities are verified on an engagement-specific basis in accordance
            with applicable local jurisdictions.
          </p>
        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} GLOBAL VENTURES. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacy-policy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
