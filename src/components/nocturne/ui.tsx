import React from "react";
import Image from "next/image";
import Link from "next/link";
import { unsplash } from "@/data/homepage";

/** A photograph that fills its frame. Accepts an Unsplash id or a full URL. */
export function Photo({
  id,
  src,
  alt = "",
  sizes = "100vw",
  width = 1600,
  priority = false,
  className = "ph",
  style,
}: {
  id?: string;
  src?: string;
  alt?: string;
  sizes?: string;
  width?: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const url = src ?? (id ? unsplash(id, width) : "");
  return (
    <div className={className} style={style} aria-hidden={alt ? undefined : true}>
      {url && <Image src={url} alt={alt} fill sizes={sizes} priority={priority} />}
    </div>
  );
}

export const Line = () => <span className="ln" aria-hidden="true" />;
export const Arrow = () => <span aria-hidden="true">→</span>;

export interface Crumb {
  label: string;
  href?: string;
}

/** Inner-page opening: kicker, display title, lede and optional photograph. */
export function PageHero({
  kicker,
  title,
  lede,
  photoId,
  photoAlt = "",
  crumbs,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  photoId?: string;
  photoAlt?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero${photoId ? " has-photo" : ""}`} aria-labelledby="page-title">
      {photoId && <Photo id={photoId} alt={photoAlt} priority width={2400} />}
      <div className="wrap">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <Link href={c.href}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="kicker rv" style={{ marginTop: crumbs ? 40 : 0 }}>
          {kicker}
        </p>
        <h1 id="page-title" className="rv">
          {title}
        </h1>
        {(lede || children) && (
          <div className="hero-foot rv">
            {lede && <p className="lede">{lede}</p>}
            {children && <div className="actions">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

/** Section heading: kicker, headline and an optional note or link. */
export function SecTop({
  kicker,
  title,
  id,
  aside,
}: {
  kicker: string;
  title: React.ReactNode;
  id?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="sec-top">
      <div>
        <p className="kicker rv">{kicker}</p>
        <h2 className="rv" id={id}>
          {title}
        </h2>
      </div>
      {aside && <div className="rv muted" style={{ maxWidth: "30rem" }}>{aside}</div>}
    </div>
  );
}

/** Numbered rows. Each row links somewhere or simply lists an item. */
export function IndexList({
  items,
  simple = false,
}: {
  items: { title: string; body?: string; meta?: string; href?: string }[];
  simple?: boolean;
}) {
  return (
    <ol className={`index${simple ? " simple" : ""}`}>
      {items.map((it) =>
        it.href ? (
          <li key={it.title} className="rv">
            <Link className="index-row" href={it.href}>
              <h3>{it.title}</h3>
              {it.body && <p>{it.body}</p>}
              {!simple && <span className="for">{it.meta}</span>}
              {!simple && (
                <span className="go" aria-hidden="true">
                  →
                </span>
              )}
            </Link>
          </li>
        ) : (
          <li key={it.title} className="rv">
            <div className="index-row">
              <h3>{it.title}</h3>
              {it.body && <p>{it.body}</p>}
            </div>
          </li>
        )
      )}
    </ol>
  );
}

/** Four (or more) stages with a sticky heading. */
export function Stages({
  kicker,
  title,
  note,
  stages,
}: {
  kicker: string;
  title: React.ReactNode;
  note?: string;
  stages: { numeral?: string; title: string; body: string }[];
}) {
  const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
  return (
    <div className="split">
      <div className="sticky">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      <ol className="stages">
        {stages.map((s, i) => (
          <li className="stage rv" key={s.title}>
            <span className="n" aria-hidden="true">
              {s.numeral ?? roman[i]}
            </span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
