import React from "react";
import Link from "next/link";
import type { ServiceItem } from "@/types";
import type { FlowType } from "@/lib/enquiry/schema";
import { PRACTICES } from "@/data/homepage";
import { ConsultButton, ConsultSection } from "@/components/nocturne/client";
import { IndexList, Line, PageHero, SecTop } from "@/components/nocturne/ui";

const FLOW: Record<string, FlowType> = {
  "strategic-business-restructuring": "advisory",
  "working-capital-and-fund-raising": "advisory",
  "business-and-equity-selling": "sell-business",
  "mergers-and-acquisitions": "buy-business",
  "investor-matchmaking": "general",
  "advisory-and-board-member-development": "advisory",
  "financial-management": "advisory",
  "portfolio-and-wealth-management": "general",
  "business-valuation": "valuation",
  "digital-transformation-and-fintech-advisory": "advisory",
};

/** Shared template for the service pages. */
export default function ServiceDetailView({
  service,
  children,
}: {
  service: ServiceItem;
  children?: React.ReactNode;
}) {
  const index = PRACTICES.findIndex((p) => p.slug === service.slug);
  const practice = PRACTICES[index];
  const flow = FLOW[service.slug] ?? "general";
  const others = PRACTICES.filter((p) => p.slug !== service.slug);

  return (
    <>
      <PageHero
        kicker={`Advisory · ${String(index + 1).padStart(2, "0")} of ${PRACTICES.length}`}
        title={service.title}
        lede={service.shortDescription}
        photoId={practice?.photoId}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <ConsultButton flow={flow}>
          Discuss your situation <Line />
        </ConsultButton>
        <Link className="tlink" href="#scope">
          What the work covers
        </Link>
      </PageHero>

      <section className="sec ivory" aria-labelledby="overview-h">
        <div className="wrap statement">
          <div className="rv">
            <p className="kicker">Overview</p>
            <h2 id="overview-h">{service.highlight}</h2>
          </div>
          <div className="copy rv">
            <p>{service.fullDescription}</p>
            <dl className="facts">
              <div>
                <dt>Typical client</dt>
                <dd>{practice?.forWho}</dd>
              </div>
              <div>
                <dt>First step</dt>
                <dd>An initial conversation, at no obligation</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="sec" id="scope" aria-labelledby="scope-h">
        <div className="wrap">
          <SecTop kicker="Scope" id="scope-h" title="What the work covers." />
          <IndexList simple items={service.features.map((f) => ({ title: f }))} />
          <div className="cols-2" style={{ marginTop: "clamp(64px, 7vw, 112px)" }}>
            <div className="rv">
              <h3 className="col-h">What you receive</h3>
              <ul className="dash">
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="rv">
              <h3 className="col-h">Who we advise</h3>
              <ul className="dash">
                {service.targetAudience.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {children}

      <section className="sec ivory" aria-labelledby="other-h">
        <div className="wrap">
          <SecTop
            kicker="Other services"
            id="other-h"
            title="Often combined on the same engagement."
            aside={
              <Link className="tlink" href="/services" style={{ color: "var(--fg)" }}>
                All services
              </Link>
            }
          />
          <IndexList
            items={others.map((p) => ({
              title: p.title,
              body: p.summary,
              meta: p.forWho,
              href: `/services/${p.slug}`,
            }))}
          />
        </div>
      </section>

      <ConsultSection order={[flow]} />
    </>
  );
}
