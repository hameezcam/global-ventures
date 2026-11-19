"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/brand/Wordmark";
import EnquiryModal from "@/components/forms/EnquiryModal";
import { FIRM_LINKS, PRACTICES, TRANSACTION_LINKS, unsplash } from "@/data/homepage";

const LEFT = [{ href: "/insights", label: "Insights" }];
const RIGHT = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Split navigation around a centred wordmark. "Advisory", "Transactions" and
 * the mobile "Menu" button open one full-screen menu: a practice index (what
 * each covers and who it is for) beside a photograph that follows the
 * hovered or focused practice.
 */
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button")).filter(
        (el) => el.offsetParent !== null
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget;
    setOpen(true);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const cur = (href: string) => (isActive(href) ? ("page" as const) : undefined);
  const consult = () => {
    setOpen(false);
    setModalOpen(true);
  };
  const advisoryActive = isActive("/services");
  const txActive = TRANSACTION_LINKS.some((l) => isActive(l.href));

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-row">
          <nav aria-label="Primary">
            <ul>
              <li>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  aria-controls="site-menu"
                  onClick={openMenu}
                  aria-current={advisoryActive ? "page" : undefined}
                >
                  Advisory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  aria-controls="site-menu"
                  onClick={openMenu}
                  aria-current={txActive ? "page" : undefined}
                >
                  Transactions
                </button>
              </li>
              {LEFT.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={cur(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Wordmark />
          <div className="right">
            <ul>
              {RIGHT.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={cur(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" className="consult" onClick={() => setModalOpen(true)}>
              Arrange a consultation
            </button>
            <button
              type="button"
              className="burger"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={openMenu}
            >
              <i aria-hidden="true" />
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        className={`menu-ov${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="top">
          <Wordmark align="left" />
          <button type="button" className="close" ref={closeRef} onClick={() => close()}>
            Close ✕
          </button>
        </div>
        <div className="pane">
          <h2>Advisory</h2>
          <table className="mi-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Number</span>
                </th>
                <th scope="col">Practice</th>
                <th scope="col">What it covers</th>
                <th scope="col">Typical client</th>
              </tr>
            </thead>
            <tbody>
              {PRACTICES.map((p, i) => (
                <tr key={p.slug}>
                  <td colSpan={4}>
                    <Link
                      href={`/services/${p.slug}`}
                      aria-current={cur(`/services/${p.slug}`)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                    >
                      <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <b>{p.title}</b>
                      <em>{p.menuLine}</em>
                      <em>{p.forWho}</em>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mi-cols">
            <div>
              <h2>Transactions</h2>
              {TRANSACTION_LINKS.map((l) => (
                <Link key={l.href} href={l.href} aria-current={cur(l.href)}>
                  {l.title}
                </Link>
              ))}
            </div>
            <div>
              <h2>The firm</h2>
              {FIRM_LINKS.map((l) => (
                <Link key={l.href} href={l.href} aria-current={cur(l.href)}>
                  {l.title}
                </Link>
              ))}
            </div>
            <div>
              <h2>Overview</h2>
              <Link href="/services" aria-current={cur("/services") && pathname === "/services" ? "page" : undefined}>
                All services
              </Link>
              <Link href="/">Home</Link>
            </div>
          </div>
          <div className="foot">
            <span>Where Capital Meets Opportunity.</span>
            <button type="button" className="cta" onClick={consult}>
              Arrange a consultation <span className="ln" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="visual" aria-hidden="true">
          <div className="ph">
            {PRACTICES.map((p, i) => (
              <Image
                key={p.slug}
                src={unsplash(p.photoId, 1400)}
                alt=""
                fill
                sizes="45vw"
                className={i === active ? "on" : undefined}
              />
            ))}
          </div>
          <p className="cap">
            {PRACTICES[active].title}
            <small>{PRACTICES[active].summary}</small>
          </p>
        </div>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
