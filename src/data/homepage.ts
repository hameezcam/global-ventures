/**
 * Shared copy for the homepage, navigation and practice pages.
 *
 * Kept deliberately plain and factual: no statistics, credentials, client
 * names or claims of track record. Add those only once they are verified.
 */

export interface PracticeSummary {
  slug: string;
  title: string;
  /** One line used in the menu index. */
  menuLine: string;
  /** Who the practice typically advises (menu index and practice rows). */
  forWho: string;
  /** One or two sentences used on the homepage and services overview. */
  summary: string;
  /** Unsplash photo id for this practice. */
  photoId: string;
  /** Roman numeral used on photographic cards. */
  numeral: string;
}

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const PHOTOS = {
  tower: "photo-1486406146926-c627a92ad1ab",
  skyline: "photo-1512453979798-5ea266f8880c",
  interior: "photo-1497366216548-37526070297c",
  desk: "photo-1454165804606-c3d57bc86b40",
  facade: "photo-1449157291145-7efd050a4d0e",
  geometry: "photo-1487958449943-2429e8be8625",
  dusk: "photo-1477959858617-67f85cf4f1df",
  editorial: "photo-1431576901776-e539bd916ba2",
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export const photo = (key: PhotoKey, width = 1600) => img(PHOTOS[key], width);
export const unsplash = img;

/** Display order for the six practices. Slugs match the existing service pages. */
export const PRACTICES: PracticeSummary[] = [
  {
    slug: "mergers-and-acquisitions",
    title: "Mergers & Acquisitions",
    menuLine: "Sell-side and buy-side, through to signing",
    forWho: "Owners and acquirers",
    summary: "Sell-side and buy-side mandates, from positioning the business to the signed agreement.",
    photoId: PHOTOS.tower,
    numeral: "i",
  },
  {
    slug: "corporate-finance",
    title: "Corporate Finance",
    menuLine: "Capital structure, debt and growth capital",
    forWho: "Boards and CFOs",
    summary: "Capital structure, debt advisory and growth capital for the next stage of a business.",
    photoId: PHOTOS.skyline,
    numeral: "ii",
  },
  {
    slug: "business-valuation",
    title: "Business Valuation",
    menuLine: "Independent, clearly reasoned valuations",
    forWho: "Shareholders and boards",
    summary: "Independent, clearly reasoned valuations for transactions, shareholders and boards.",
    photoId: PHOTOS.facade,
    numeral: "iii",
  },
  {
    slug: "business-brokerage",
    title: "Business Brokerage",
    menuLine: "A managed, confidential sale process",
    forWho: "Private owners",
    summary: "A managed, confidential sale for privately held companies and their owners.",
    photoId: PHOTOS.interior,
    numeral: "iv",
  },
  {
    slug: "transaction-advisory",
    title: "Transaction Advisory",
    menuLine: "Financial due diligence, quality of earnings",
    forWho: "Buyers and lenders",
    summary: "Financial due diligence and quality-of-earnings work that tests the numbers behind a deal.",
    photoId: PHOTOS.desk,
    numeral: "v",
  },
  {
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    menuLine: "Exit readiness and long-range planning",
    forWho: "Founders",
    summary: "Exit readiness and long-range planning, well before a deal is on the table.",
    photoId: PHOTOS.geometry,
    numeral: "vi",
  },
];

export const practicePhoto = (p: PracticeSummary, width = 900) => img(p.photoId, width);

export const TRANSACTION_LINKS = [
  { href: "/sell-a-business", title: "Sell a business", line: "Exit planning, valuation and a confidential sale" },
  { href: "/buy-a-business", title: "Buy a business", line: "Acquisition search, diligence and completion" },
  { href: "/opportunities", title: "Opportunities", line: "Introduced privately, under NDA" },
];

export const FIRM_LINKS = [
  { href: "/about", title: "About" },
  { href: "/team", title: "Leadership" },
  { href: "/industries", title: "Industries" },
  { href: "/insights", title: "Insights" },
  { href: "/contact", title: "Contact" },
];

export const APPROACH_STAGES = [
  {
    numeral: "i",
    title: "Understand",
    body: "Your objectives, constraints and timing, and what a good outcome looks like.",
  },
  {
    numeral: "ii",
    title: "Assess",
    body: "The financial and commercial picture, so every option rests on evidence.",
  },
  {
    numeral: "iii",
    title: "Execute",
    body: "Materials, counterparties and confidentiality, managed end to end.",
  },
  {
    numeral: "iv",
    title: "Complete",
    body: "Negotiation, documentation and closing, then a clear handover.",
  },
];
