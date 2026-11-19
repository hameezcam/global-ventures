import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APPROACH_STAGES, PRACTICES, photo } from "@/data/homepage";
import { INDUSTRY_SECTORS } from "@/data/industries";
import { INSIGHT_ARTICLES } from "@/data/insights";
import { ConsultButton, ConsultationChooser, IndustryDirectory } from "./client";

const Arrow = () => (
  <span className="arr" aria-hidden="true">
    →
  </span>
);

/* 1. Hero ---------------------------------------------------------------- */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="gv-hero-h">
      <div className="ph">
        <Image
          src={photo("tower", 2400)}
          alt="Glass and steel office tower seen from below"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="wrap hero-inner">
        <p className="label fade">Financial advisory &amp; business transactions</p>
        <h1 id="gv-hero-h">
          <span className="line">
            <span>Where Capital</span>
          </span>
          <span className="line">
            <span>
              Meets <em>Opportunity.</em>
            </span>
          </span>
        </h1>
        <div className="hero-foot fade">
          <div>
            <p className="hero-lede">
              Independent advice for owners, boards and investors on buying, selling, valuing and
              financing businesses.
            </p>
            <div className="hero-actions">
              <ConsultButton>
                Arrange a confidential consultation <Arrow />
              </ConsultButton>
              <Link className="tlink" href="#expertise">
                Explore our advisory
              </Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="hero-index fade" aria-label="Advisory services">
        <ul className="wrap">
          {PRACTICES.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/services/${p.slug}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

/* 2. Introduction -------------------------------------------------------- */
export function Introduction() {
  return (
    <section className="intro" aria-labelledby="gv-intro-h">
      <div className="wrap intro-grid">
        <p className="label reveal">Global Ventures</p>
        <h2 className="intro-statement reveal" id="gv-intro-h">
          Considered counsel for the decisions that <em>shape a company’s future</em> — a sale, an
          acquisition, a new chapter of capital.
        </h2>
        <figure className="intro-photo reveal">
          <div className="ph" data-tone="stone">
            <Image
              src={photo("skyline", 1400)}
              alt="City skyline in soft daylight"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </div>
        </figure>
        <div className="intro-copy reveal">
          <p>
            We work with a small number of clients at a time, so each engagement receives senior
            attention from first meeting to completion.
          </p>
          <p>
            Our role is to bring clarity to complex financial decisions: what a business is worth,
            who the right counterparty is, how a transaction should be structured, and when to act.
          </p>
          <dl className="facts">
            <div>
              <dt>Who we advise</dt>
              <dd>Founders, shareholders &amp; boards</dd>
            </div>
            <div>
              <dt>What we do</dt>
              <dd>Transactions, valuation &amp; capital</dd>
            </div>
            <div>
              <dt>How we work</dt>
              <dd>Confidential and senior-led</dd>
            </div>
            <div>
              <dt>First step</dt>
              <dd>An initial conversation, at no obligation</dd>
            </div>
          </dl>
          <Link className="tlink" href="/about">
            About the firm
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 3. Expertise ----------------------------------------------------------- */
export function Expertise() {
  return (
    <section className="expertise" id="expertise" aria-labelledby="gv-exp-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="label reveal">Expertise</p>
          <h2 className="reveal" id="gv-exp-h">
            Advisory from the first question to the final signature.
          </h2>
          <p className="reveal">
            Six practices, each with its own method, brought together whenever a transaction needs
            more than one.
          </p>
        </div>
        <ol className="chapters">
          {PRACTICES.map((p, i) => (
            <li className="chapter reveal" key={p.slug}>
              <Link href={`/services/${p.slug}`}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="go" aria-hidden="true">
                  →
                </span>
                <span className="thumb ph" aria-hidden="true">
                  <Image src={p.image} alt="" fill sizes="200px" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 4. Business transactions ---------------------------------------------- */
const SELL_STEPS = [
  ["Readiness review", "What a buyer will look for, and what to address first."],
  ["Valuation", "A defensible view of value before you go to market."],
  ["Confidential approach", "Qualified buyers only, under non-disclosure."],
  ["Negotiation & completion", "Terms, diligence and closing, managed end to end."],
];
const BUY_STEPS = [
  ["Mandate", "Define the sector, size and strategic fit you need."],
  ["Search & screening", "Targets identified and assessed against your criteria."],
  ["Due diligence", "Financial review that tests the numbers behind the story."],
  ["Structuring & close", "Price, terms and completion, negotiated with care."],
];

function Journey({
  who,
  title,
  steps,
  image,
  cta,
  flow,
  href,
}: {
  who: string;
  title: string;
  steps: string[][];
  image: string;
  cta: string;
  flow: "sell-business" | "buy-business";
  href: string;
}) {
  return (
    <article className="journey reveal">
      <div className="ph" data-tone="deep">
        <Image src={image} alt="" fill sizes="(max-width: 960px) 100vw, 50vw" />
      </div>
      <div className="journey-body">
        <p className="who">{who}</p>
        <h3>
          <Link href={href} className="journey-link">
            {title}
          </Link>
        </h3>
        <ol className="steps">
          {steps.map(([t, d]) => (
            <li key={t}>
              <div>
                <b>{t}</b>
                {d}
              </div>
            </li>
          ))}
        </ol>
        <ConsultButton flow={flow}>
          {cta} <Arrow />
        </ConsultButton>
      </div>
    </article>
  );
}

export function Transactions() {
  return (
    <section className="deals on-dark" id="transactions" aria-labelledby="gv-deals-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="label reveal">Business transactions</p>
          <h2 className="reveal" id="gv-deals-h">
            Two sides of every deal. A clear path for each.
          </h2>
          <p className="reveal">
            Whether you are preparing to sell or searching for the right acquisition, the process is
            structured, confidential and paced around you.
          </p>
        </div>
        <div className="journeys">
          <Journey
            who="For business owners"
            title="Selling your business, on your terms"
            steps={SELL_STEPS}
            image={photo("interior", 1400)}
            cta="Start a sale enquiry"
            flow="sell-business"
            href="/sell-a-business"
          />
          <Journey
            who="For acquirers & investors"
            title="Finding the right business to acquire"
            steps={BUY_STEPS}
            image={photo("skyline", 1400)}
            cta="Start an acquisition enquiry"
            flow="buy-business"
            href="/buy-a-business"
          />
        </div>
        <div className="disclosure reveal">
          <p>
            We do not publish live mandates. Opportunities are shared privately with qualified,
            registered buyers under a non-disclosure agreement.
          </p>
          <Link className="tlink" href="/buy-a-business">
            Register as a buyer
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 5. Approach ------------------------------------------------------------ */
export function Approach() {
  return (
    <section className="approach" aria-labelledby="gv-app-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="label reveal">Our approach</p>
          <h2 className="reveal" id="gv-app-h">
            A measured process, so nothing important is left to chance.
          </h2>
        </div>
        <ol className="timeline reveal">
          {APPROACH_STAGES.map((s) => (
            <li key={s.title}>
              <span className="n" aria-hidden="true">
                {s.numeral}
              </span>
              <span className="dot" aria-hidden="true" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 6. Industries ---------------------------------------------------------- */
export function Industries() {
  const sectors = INDUSTRY_SECTORS.map((s) => ({
    id: s.id,
    name: s.name,
    line: s.tagline.split(",")[0].trim(),
    image: s.image.replace("w=800", "w=1000"),
  }));
  return (
    <section className="industries" id="industries" aria-labelledby="gv-ind-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="label reveal">Industries</p>
          <h2 className="reveal" id="gv-ind-h">
            Sectors we follow closely.
          </h2>
          <p className="reveal">
            <Link className="tlink" href="/industries">
              View all sectors
            </Link>
          </p>
        </div>
        <IndustryDirectory sectors={sectors} />
      </div>
    </section>
  );
}

/* 7. Insights ------------------------------------------------------------ */
export function Insights() {
  // Only approved articles appear in Production. Preview deployments also show
  // drafts, clearly flagged, so the layout can be reviewed before approval.
  const showDrafts = process.env.VERCEL_ENV !== "production";
  const articles = INSIGHT_ARTICLES.filter((a) => !a.isDraft || showDrafts).slice(0, 3);
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const hasDrafts = articles.some((a) => a.isDraft);

  const Meta = ({ a }: { a: (typeof articles)[number] }) => (
    <div className="meta">
      <span>{a.category}</span>
      <span>{a.readingTime}</span>
      {a.isDraft && <span className="draft-tag">Draft</span>}
    </div>
  );

  return (
    <section className="insights" aria-labelledby="gv-ins-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="label reveal">Insights</p>
          <h2 className="reveal" id="gv-ins-h">
            Perspectives on value, capital and timing.
          </h2>
          <p className="reveal">
            {hasDrafts ? (
              <span className="draft-flag">Preview only: draft articles are hidden on the live site</span>
            ) : (
              <Link className="tlink" href="/insights">
                All insights
              </Link>
            )}
          </p>
        </div>
        <div className="mag">
          <Link className="story lead reveal" href={`/insights/${lead.slug}`}>
            <div className="ph">
              <Image src={lead.coverImage} alt="" fill sizes="(max-width: 960px) 100vw, 58vw" />
            </div>
            <Meta a={lead} />
            <h3>{lead.title}</h3>
            <p>{lead.summary}</p>
          </Link>
          {rest.length > 0 && (
            <div className="side">
              {rest.map((a) => (
                <Link className="story reveal" href={`/insights/${a.slug}`} key={a.slug}>
                  <div className="ph">
                    <Image src={a.coverImage} alt="" fill sizes="(max-width: 960px) 120px, 40vw" />
                  </div>
                  <Meta a={a} />
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* 8. Contact ------------------------------------------------------------- */
export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="gv-con-h">
      <div className="wrap">
        <div className="contact-card">
          <div className="contact-l reveal">
            <p className="label">Consultation</p>
            <h2 id="gv-con-h">Begin a confidential conversation.</h2>
            <p>
              Tell us a little about your situation and we will be in touch to arrange an initial
              discussion, at no obligation.
            </p>
            <ul className="assure">
              <li>Your details are used only to respond to your enquiry</li>
              <li>Submitted over an encrypted connection and stored securely</li>
              <li>A non-disclosure agreement is available before any detailed discussion</li>
            </ul>
          </div>
          <ConsultationChooser />
        </div>
      </div>
    </section>
  );
}
