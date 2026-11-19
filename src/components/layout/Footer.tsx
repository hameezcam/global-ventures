import React from "react";
import Link from "next/link";
import { FIRM_LINKS, PRACTICES, TRANSACTION_LINKS } from "@/data/homepage";
import Wordmark from "@/components/brand/Wordmark";

const COLUMNS = [
  { title: "Advisory", links: PRACTICES.map((p) => ({ href: `/services/${p.slug}`, label: p.title })) },
  { title: "Transactions", links: TRANSACTION_LINKS.map((l) => ({ href: l.href, label: l.title })) },
  { title: "Firm", links: FIRM_LINKS.map((l) => ({ href: l.href, label: l.title })) },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <Wordmark align="left" />
            <p>Independent advice on buying, selling, valuing and financing businesses.</p>
            <Link className="tlink" href="/contact">
              Arrange a consultation
            </Link>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="f-legal">
          {/* Registered entity, licence and office address will be added here once confirmed. */}
          <p>© {year} Global Ventures. All rights reserved.</p>
          <p>Information on this site is general in nature and is not financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
