"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/brand/Wordmark";
import EnquiryModal from "@/components/forms/EnquiryModal";
import { PRACTICES, TRANSACTION_LINKS, photo } from "@/data/homepage";

type Panel = "advisory" | "transactions" | "mobile" | null;

const SIMPLE_LINKS = [
  { href: "/industries", label: "Industries", optional: true },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes.
  useEffect(() => setPanel(null), [pathname]);

  const close = useCallback((returnFocus = false) => {
    setPanel(null);
    if (returnFocus) lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [panel, close]);

  const toggle = (next: Exclude<Panel, null>) => (e: React.MouseEvent<HTMLButtonElement>) => {
    lastTrigger.current = e.currentTarget;
    setPanel((p) => (p === next ? null : next));
  };

  // Hover opens a panel only for fine pointers; touch and keyboard use click.
  const hoverOpen = (next: "advisory" | "transactions") => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      lastTrigger.current = e.currentTarget;
      setPanel(next);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const openConsultation = () => {
    setPanel(null);
    setModalOpen(true);
  };

  const showAdvisory = panel === "advisory" || panel === "mobile";
  const showTransactions = panel === "transactions" || panel === "mobile";

  return (
    <div className="gv">
      <header
        ref={headerRef}
        className={`nav${scrolled ? " solid" : ""}${panel ? " open" : ""}`}
        onMouseLeave={() => {
          if (panel === "advisory" || panel === "transactions") {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setPanel(null);
          }
        }}
      >
        <div className="wrap nav-row">
          <Wordmark />
          <nav aria-label="Primary">
            <ul className="menu">
              <li>
                <button
                  type="button"
                  aria-expanded={panel === "advisory"}
                  aria-controls="gv-menu-panel"
                  onClick={toggle("advisory")}
                  onMouseEnter={hoverOpen("advisory")}
                  className={isActive("/services") ? "current" : undefined}
                >
                  Advisory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-expanded={panel === "transactions"}
                  aria-controls="gv-menu-panel"
                  onClick={toggle("transactions")}
                  onMouseEnter={hoverOpen("transactions")}
                >
                  Transactions
                </button>
              </li>
              {SIMPLE_LINKS.map((l) => (
                <li key={l.href} className={l.optional ? "opt" : undefined}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    onMouseEnter={() => panel !== "mobile" && setPanel(null)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className="nav-cta" onClick={openConsultation}>
            Arrange a consultation
          </button>
          <button
            type="button"
            className="burger"
            aria-expanded={panel === "mobile"}
            aria-controls="gv-menu-panel"
            onClick={toggle("mobile")}
          >
            <i aria-hidden="true" />
            {panel === "mobile" ? "Close" : "Menu"}
          </button>
        </div>

        <div
          className="mega"
          id="gv-menu-panel"
          role="region"
          aria-label={panel === "transactions" ? "Transactions" : panel === "mobile" ? "Site menu" : "Advisory services"}
        >
          <div className={`wrap mega-grid${panel === "mobile" ? " is-mobile" : ""}`}>
            {panel !== "mobile" && (
              <div className="mega-intro">
                <p className="label">{panel === "transactions" ? "Transactions" : "Advisory"}</p>
                <h2>
                  {panel === "transactions"
                    ? "A clear path for both sides of a deal."
                    : "Six disciplines, one coherent view of your transaction."}
                </h2>
                <p>
                  {panel === "transactions"
                    ? "Selling or acquiring, the process is structured, confidential and paced around you."
                    : "Every engagement is shaped around the decision in front of you, not a standard package."}
                </p>
                <Link className="tlink" href={panel === "transactions" ? "/contact" : "/services"}>
                  {panel === "transactions" ? "Talk to us about a transaction" : "All advisory services"}
                </Link>
              </div>
            )}

            {showAdvisory && (
              <div>
                {panel === "mobile" && <p className="label mega-group">Advisory</p>}
                <ul className="mega-list">
                  {PRACTICES.map((p, i) => (
                    <li key={p.slug}>
                      <Link href={`/services/${p.slug}`} onClick={() => close()}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <b>{p.title}</b>
                          <em>{p.menuLine}</em>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showTransactions && (
              <div>
                {panel === "mobile" && <p className="label mega-group">Transactions</p>}
                <ul className={`mega-list${panel === "transactions" ? " single" : ""}`}>
                  {TRANSACTION_LINKS.map((t, i) => (
                    <li key={t.href}>
                      <Link href={t.href} onClick={() => close()}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <b>{t.title}</b>
                          <em>{t.line}</em>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {panel === "mobile" ? (
              <div className="mobile-extra">
                <ul className="mobile-links">
                  {[...SIMPLE_LINKS, { href: "/contact", label: "Contact" }].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => close()}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-dark" onClick={openConsultation}>
                  Arrange a consultation <span className="arr" aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <div className="mega-feature">
                <div className="ph" data-tone="deep">
                  <Image
                    src={photo(panel === "transactions" ? "skyline" : "interior", 900)}
                    alt=""
                    width={900}
                    height={675}
                    sizes="320px"
                  />
                </div>
                <p>Not sure which service fits? Start with a confidential conversation.</p>
                <button type="button" className="tlink" onClick={openConsultation}>
                  Arrange a consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Navbar;
