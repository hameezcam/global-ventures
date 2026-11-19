"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Briefcase,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Phone,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { MAIN_NAVIGATION } from "@/data/navigation";
import EnquiryModal from "@/components/forms/EnquiryModal";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "corporate-finance": TrendingUp,
  "mergers-and-acquisitions": Briefcase,
  "business-valuation": PieChart,
  "business-brokerage": ShieldCheck,
  "transaction-advisory": CheckCircle2,
  "strategic-advisory": Compass,
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-navy-950/90 backdrop-blur-md border-b border-gold-500/20 py-3.5 shadow-2xl"
            : "bg-navy-900/60 backdrop-blur-sm border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo variant="dark" size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {MAIN_NAVIGATION.map((item) => {
                const isServices = item.label === "Services";
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isActive = pathname === item.href || (item.children && item.children.some(c => pathname === c.href));

                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onFocus={() => hasChildren && setOpenDropdown(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-widest font-medium transition-colors ${
                        isActive
                          ? "text-gold-400 font-semibold"
                          : "text-ivory-100/80 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </Link>

                    {/* Mega Menu for Services */}
                    {isServices && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-navy-950 border border-gold-500/25 rounded-xl shadow-2xl p-6 transition-all duration-200 ${
                          openDropdown === "Services"
                            ? "opacity-100 visible translate-y-2 pointer-events-auto"
                            : "opacity-0 invisible translate-y-0 pointer-events-none"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                              Specialized Practices
                            </span>
                            <h4 className="text-sm font-serif text-white">
                              Institutional Financial Advisory & Transaction Practice
                            </h4>
                          </div>
                          <Link
                            href="/services"
                            className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1"
                          >
                            <span>All Practice Areas</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {item.children?.map((child) => {
                            const slug = child.href.split("/").pop() || "";
                            const IconComp = SERVICE_ICONS[slug] || Briefcase;
                            return (
                              <Link
                                key={child.title}
                                href={child.href}
                                className="group/item flex items-start gap-3.5 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-gold-500/20"
                              >
                                <div className="p-2 rounded bg-navy-900 border border-white/10 group-hover/item:border-gold-500/40 text-gold-400 shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-white group-hover/item:text-gold-300 transition-colors">
                                    {child.title}
                                  </div>
                                  <p className="text-[11px] text-ivory-100/60 leading-relaxed mt-0.5 line-clamp-2">
                                    {child.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Standard Dropdown for other items with children */}
                    {hasChildren && !isServices && (
                      <div
                        className={`absolute top-full left-0 w-64 bg-navy-950 border border-gold-500/25 rounded-lg shadow-2xl p-2 transition-all duration-200 ${
                          openDropdown === item.label
                            ? "opacity-100 visible translate-y-2 pointer-events-auto"
                            : "opacity-0 invisible translate-y-0 pointer-events-none"
                        }`}
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="block p-3 rounded hover:bg-white/5 transition-colors group/sub"
                          >
                            <div className="text-xs font-semibold text-white group-hover/sub:text-gold-300">
                              {child.title}
                            </div>
                            <div className="text-[10px] text-ivory-100/60 mt-0.5 leading-snug">
                              {child.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-200 shadow-sm hover:shadow-gold-500/20"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 p-2.5 rounded text-xs min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Direct consultation request"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-ivory-100 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-gold-500 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            role="region"
            aria-label="Mobile Navigation Menu"
            className="lg:hidden bg-navy-950/98 border-b border-gold-500/30 px-4 sm:px-6 py-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
          >
            <div className="space-y-4">
              {MAIN_NAVIGATION.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = openDropdown === item.label;

                return (
                  <div key={item.label} className="border-b border-white/5 pb-3">
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(isExpanded ? null : item.label)}
                          className="w-full flex items-center justify-between text-left text-sm uppercase tracking-wider font-semibold text-ivory-100 hover:text-gold-400 py-1"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-gold-400" : ""
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="mt-2 space-y-2 pl-3 border-l-2 border-gold-500/30">
                            {item.children?.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                className="block py-1.5 text-xs text-ivory-100/70 hover:text-gold-300"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-sm uppercase tracking-wider font-semibold text-ivory-100 hover:text-gold-400 py-1"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest px-5 py-3 rounded"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Consultation Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
