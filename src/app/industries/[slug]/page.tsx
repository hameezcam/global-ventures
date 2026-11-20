import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRY_SECTORS, sectorBySlug } from "@/data/industries";
import { PRACTICES } from "@/data/homepage";
import { ConsultButton, ConsultSection, IndustryDirectory } from "@/components/nocturne/client";
import { IndexList, Line, PageHero, SecTop } from "@/components/nocturne/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  return { title: sector.name, description: sector.summary };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();
  const index = INDUSTRY_SECTORS.indexOf(sector);
  const services = sector.services
    .map((s) => PRACTICES.find((p) => p.slug === s))
    .filter((p): p is (typeof PRACTICES)[number] => Boolean(p));
  const others = INDUSTRY_SECTORS.filter((s) => s.slug !== sector.slug).map((s) => ({
    slug: s.slug,
    name: s.name,
    line: s.tagline,
  }));

  return (
    <>
      <PageHero
        kicker={`Industries · ${String(index + 1).padStart(2, "0")} of ${String(INDUSTRY_SECTORS.length).padStart(2, "0")}`}
        title={sector.name}
        lede={sector.summary}
        photoId={sector.photoId}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: sector.name }]}
      >
        <ConsultButton title={`Discuss a ${sector.name.toLowerCase()} business`}>
          Discuss your business <Line />
        </ConsultButton>
        <Link className="tlink" href="#drivers">
          What buyers look at
        </Link>
      </PageHero>

      <section className="sec ivory" aria-labelledby="overview-h">
        <div className="wrap statement top">
          <div className="rv">
            <p className="kicker">Overview</p>
            <h2 id="overview-h">{sector.highlight}</h2>
          </div>
          <div className="copy rv">
            <p>{sector.description}</p>
            <div>
              <h3 className="col-h">Businesses we typically advise</h3>
              <ul className="dash">
                {sector.focusAreas.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="drivers" aria-labelledby="drivers-h">
        <div className="wrap">
          <SecTop
            kicker="Value"
            id="drivers-h"
            title="What buyers and investors look at closely."
            aside={<p>Preparing these well before a transaction is usually where most value is protected.</p>}
          />
          <IndexList simple items={sector.valueDrivers} />
        </div>
      </section>

      <section className="sec ivory" aria-labelledby="services-h">
        <div className="wrap">
          <SecTop
            kicker="Services"
            id="services-h"
            title="How we usually help in this sector."
            aside={
              <Link className="tlink" href="/services" style={{ color: "var(--fg)" }}>
                All services
              </Link>
            }
          />
          <IndexList
            items={services.map((p) => ({
              title: p.title,
              body: p.summary,
              meta: p.forWho,
              href: `/services/${p.slug}`,
            }))}
          />
        </div>
      </section>

      <section className="sec" aria-labelledby="others-h">
        <div className="wrap">
          <SecTop kicker="Other sectors" id="others-h" title="Sectors we also follow." />
          <IndustryDirectory sectors={others} />
        </div>
      </section>

      <ConsultSection />
    </>
  );
}
