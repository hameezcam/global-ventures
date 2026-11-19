import React from "react";
import Link from "next/link";
import { PRACTICES } from "@/data/homepage";
import Wordmark from "@/components/brand/Wordmark";

const COLUMNS = [
  {
    title: "Advisory",
    links: PRACTICES.map((p) => ({ href: `/services/${p.slug}`, label: p.title })),
  },
  {
    title: "Transactions",
    links: [
      { href: "/sell-a-business", label: "Sell a business" },
      { href: "/buy-a-business", label: "Buy a business" },
      { href: "/opportunities", label: "Opportunities" },
    ],
  },
  {
    title: "Firm",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Leadership" },
      { href: "/industries", label: "Industries" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
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
    <div className="gv">
      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <Wordmark />
              <p>Independent advice on buying, selling, valuing and financing businesses.</p>
              <Link className="tlink" href="/contact">
                Arrange a consultation
              </Link>
            </div>
            <nav className="foot-cols" aria-label="Footer">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h2 className="foot-h">{col.title}</h2>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="foot-legal">
            {/* Registered entity, licence and office address will be added here once confirmed. */}
            <p>© {year} Global Ventures. All rights reserved.</p>
            <p>Information on this site is general in nature and is not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
