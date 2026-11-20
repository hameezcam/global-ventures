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

/** Display order for the eight services. Slugs match the service pages. */
export const PRACTICES: PracticeSummary[] = [
  {
    slug: "strategic-business-restructuring",
    title: "Strategic Business Restructuring",
    menuLine: "Structure, ownership and borrowing",
    forWho: "Owners and boards",
    summary: "Reshaping a business, its structure or its finances so it can perform, grow or prepare for a transaction.",
    photoId: PHOTOS.geometry,
    numeral: "i",
  },
  {
    slug: "working-capital-and-fund-raising",
    title: "Working Capital & Fund Raising",
    menuLine: "Cash, debt facilities and equity",
    forWho: "Growing companies",
    summary: "Freeing up cash inside the business and raising the debt or equity it needs for the next stage.",
    photoId: PHOTOS.skyline,
    numeral: "ii",
  },
  {
    slug: "business-and-equity-selling",
    title: "Business & Equity Selling",
    menuLine: "Full sales and stake sales, confidentially",
    forWho: "Owners and shareholders",
    summary: "A confidential sale of the whole business or a stake in it, from preparation to completion.",
    photoId: PHOTOS.interior,
    numeral: "iii",
  },
  {
    slug: "mergers-and-acquisitions",
    title: "Mergers, Acquisitions & Joint Ventures",
    menuLine: "Acquisitions, mergers and partnerships",
    forWho: "Companies and investors",
    summary: "Buying, merging with or partnering with another business, from the first approach to the signed agreement.",
    photoId: PHOTOS.tower,
    numeral: "iv",
  },
  {
    slug: "investor-matchmaking",
    title: "Investor Matchmaking",
    menuLine: "Introductions between capital and companies",
    forWho: "Businesses and investors",
    summary: "Introducing businesses that are raising capital or seeking a partner to investors whose interests fit.",
    photoId: PHOTOS.editorial,
    numeral: "v",
  },
  {
    slug: "portfolio-and-wealth-management",
    title: "Portfolio & Wealth Management",
    menuLine: "Planning what owners and families hold",
    forWho: "Owners and families",
    summary: "Helping owners and families plan and structure what they hold, before and after a liquidity event.",
    photoId: PHOTOS.dusk,
    numeral: "vi",
  },
  {
    slug: "business-valuation",
    title: "Business Valuation & Revaluation",
    menuLine: "Independent, clearly reasoned valuations",
    forWho: "Shareholders and boards",
    summary: "Independent, clearly reasoned valuations and revaluations for transactions, shareholders and boards.",
    photoId: PHOTOS.facade,
    numeral: "vii",
  },
  {
    slug: "digital-transformation-and-fintech-advisory",
    title: "Digital Transformation & FinTech Advisory",
    menuLine: "Finance technology and FinTech growth",
    forWho: "Businesses and FinTechs",
    summary: "Modernising finance and operations with the right technology, and advising FinTech businesses on growth and capital.",
    photoId: PHOTOS.desk,
    numeral: "viii",
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
