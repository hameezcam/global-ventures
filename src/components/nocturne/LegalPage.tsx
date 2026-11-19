import React from "react";
import { PageHero } from "./ui";

/** Shared layout for legal pages: plain hero, then a readable column of prose. */
export default function LegalPage({
  kicker,
  title,
  lede,
  crumb,
  meta,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lede: string;
  crumb: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero kicker={kicker} title={title} lede={lede} crumbs={[{ label: crumb }]} />
      <section className="sec ivory">
        <div className="wrap split">
          <aside className="sticky">
            <p className="kicker">{meta ?? "Legal"}</p>
            <p className="muted" style={{ marginTop: 20, maxWidth: "22rem" }}>
              Questions about this page can be sent through the enquiry form on our contact page.
            </p>
          </aside>
          <article className="prose">{children}</article>
        </div>
      </section>
    </>
  );
}
