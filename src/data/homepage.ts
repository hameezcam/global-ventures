/**
 * Copy for the redesigned homepage and navigation.
 *
 * Kept deliberately plain and factual: no statistics, credentials, client
 * names or claims of track record. Add those only once they are verified.
 */

export interface PracticeSummary {
  slug: string;
  title: string;
  /** One line used in the mega-menu. */
  menuLine: string;
  /** One or two sentences used on the homepage. */
  summary: string;
  image: string;
}

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const PHOTOS = {
  tower: "photo-1486406146926-c627a92ad1ab",
  skyline: "photo-1512453979798-5ea266f8880c",
  interior: "photo-1497366216548-37526070297c",
  desk: "photo-1454165804606-c3d57bc86b40",
} as const;

export const photo = (key: keyof typeof PHOTOS, width = 1600) => img(PHOTOS[key], width);
export const unsplash = img;

/** Display order for the six practices. Slugs match the existing service pages. */
export const PRACTICES: PracticeSummary[] = [
  {
    slug: "mergers-and-acquisitions",
    title: "Mergers & Acquisitions",
    menuLine: "Sell-side, buy-side and cross-border transactions",
    summary: "Sell-side and buy-side advice, from preparing the story to negotiating the final agreement.",
    image: photo("tower", 500),
  },
  {
    slug: "corporate-finance",
    title: "Corporate Finance",
    menuLine: "Capital structure, debt and growth capital",
    summary: "Capital structure, debt advisory and growth capital for businesses planning their next stage.",
    image: photo("skyline", 500),
  },
  {
    slug: "business-valuation",
    title: "Business Valuation",
    menuLine: "Independent, well-reasoned valuation work",
    summary: "Independent valuations built on clear reasoning, for transactions, shareholders and boards.",
    image: photo("interior", 500),
  },
  {
    slug: "business-brokerage",
    title: "Business Brokerage",
    menuLine: "Confidential sale of privately held companies",
    summary: "A confidential, managed sale process for privately held companies and their owners.",
    image: photo("desk", 500),
  },
  {
    slug: "transaction-advisory",
    title: "Transaction Advisory",
    menuLine: "Financial due diligence and deal support",
    summary: "Financial due diligence and quality-of-earnings work that gives each side a clear view.",
    image: photo("tower", 500),
  },
  {
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    menuLine: "Exit readiness and long-range planning",
    summary: "Exit readiness and long-range planning, well before a transaction is on the table.",
    image: photo("skyline", 500),
  },
];

export const TRANSACTION_LINKS = [
  { href: "/sell-a-business", title: "Sell a business", line: "Exit planning, valuation and a confidential sale" },
  { href: "/buy-a-business", title: "Buy a business", line: "Acquisition search, diligence and completion" },
  {
    href: "/opportunities",
    title: "Opportunities",
    line: "How opportunities are shared with registered buyers",
  },
];

export const APPROACH_STAGES = [
  {
    numeral: "I",
    title: "Understand",
    body: "We start with your objectives, constraints and timing, and agree what success looks like.",
  },
  {
    numeral: "II",
    title: "Assess",
    body: "The financial and commercial picture is analysed so every option is grounded in evidence.",
  },
  {
    numeral: "III",
    title: "Execute",
    body: "We run the process: preparing materials, managing counterparties and protecting confidentiality.",
  },
  {
    numeral: "IV",
    title: "Complete",
    body: "Negotiation, documentation and closing, with a clear handover once the deal is done.",
  },
];
