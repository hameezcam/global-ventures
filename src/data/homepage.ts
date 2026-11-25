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
  /** Photo for the service's own page hero. */
  photoId: string;
  /** Photo for the service's card on the homepage. */
  cardPhotoId: string;
  /** Roman numeral used on photographic cards. */
  numeral: string;
}

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/**
 * Every photograph on the site, by where it is used. Each photo appears in
 * exactly one place (tests/photos.test.mjs checks that no id is repeated in
 * the source). Add a new entry rather than reusing one.
 */
export const PHOTOS = {
  // Home
  tower: "photo-1486406146926-c627a92ad1ab", // hero
  skyline: "photo-1512453979798-5ea266f8880c", // firm photo pair
  interior: "photo-1497366216548-37526070297c", // firm photo pair
  doorSell: "photo-1503423571797-2d2bb372094a",
  doorBuy: "photo-1619806840163-38e329be64bb",
  // Home service cards
  cardRestructuring: "photo-1567943183748-3a7542120c90",
  cardWorkingCapital: "photo-1459787915554-b34915863013",
  cardEquitySelling: "photo-1758448500688-3ababa93fd67",
  cardMergers: "photo-1462556791646-c201b8241a94",
  cardInvestors: "photo-1766742364990-76bf8187aaaf",
  cardBoard: "photo-1552664730-d307ca884978",
  cardFinancial: "photo-1554224155-6726b3ff858f",
  cardPortfolio: "photo-1604328698692-f76ea9498e76",
  cardValuation: "photo-1498262257252-c282316270bc",
  cardDigital: "photo-1788007711483-a18963a1b490",
  // Service page heroes
  geometry: "photo-1487958449943-2429e8be8625", // restructuring
  heroWorkingCapital: "photo-1721170628208-dffed6eb3514",
  heroEquitySelling: "photo-1768836180167-6d4a25c421b2",
  heroMergers: "photo-1579525612525-053cd3e8cbd7",
  heroInvestors: "photo-1768426264661-7671fd431151",
  heroBoard: "photo-1556761175-5973dc0f32e7",
  heroFinancial: "photo-1460925895917-afdab827c52f",
  heroPortfolio: "photo-1550779864-6ccb28702fdb",
  facade: "photo-1449157291145-7efd050a4d0e", // valuation
  heroDigital: "photo-1652707228067-25672fa0b082",
  // Other pages
  aboutHero: "photo-1762600749688-8dfc960d86c5",
  aboutPairA: "photo-1497366754035-f200968a6e72",
  aboutPairB: "photo-1671818786462-b55a5bb49a23",
  teamHero: "photo-1517502884422-41eaead166d4",
  servicesPairA: "photo-1558591710-4b4a1ae0f04d",
  servicesPairB: "photo-1737475989516-a00ab059781d",
  sellHero: "photo-1462826303086-329426d1aef5",
  buyHero: "photo-1544092683-c0c9ebb368e5",
  dusk: "photo-1477959858617-67f85cf4f1df", // opportunities hero
  contactHero: "photo-1612873649383-edf91f1cf7fe",
  industriesHero: "photo-1651467606797-e1c660cf3fda",
  menu: "photo-1779700210487-a01758a3c55a", // full-screen menu
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export const photo = (key: PhotoKey, width = 1600) => img(PHOTOS[key], width);
export const unsplash = img;

/** Display order for the ten services. Slugs match the service pages. */
export const PRACTICES: PracticeSummary[] = [
  {
    slug: "strategic-business-restructuring",
    title: "Strategic Business Restructuring",
    menuLine: "Structure, ownership and borrowing",
    forWho: "Owners and boards",
    summary: "Reshaping a business, its structure or its finances so it can perform, grow or prepare for a transaction.",
    photoId: PHOTOS.geometry,
    cardPhotoId: PHOTOS.cardRestructuring,
    numeral: "i",
  },
  {
    slug: "working-capital-and-fund-raising",
    title: "Working Capital & Fund Raising",
    menuLine: "Cash, debt facilities and equity",
    forWho: "Growing companies",
    summary: "Freeing up cash inside the business and raising the debt or equity it needs for the next stage.",
    photoId: PHOTOS.heroWorkingCapital,
    cardPhotoId: PHOTOS.cardWorkingCapital,
    numeral: "ii",
  },
  {
    slug: "business-and-equity-selling",
    title: "Business & Equity Selling",
    menuLine: "Full sales and stake sales, confidentially",
    forWho: "Owners and shareholders",
    summary: "A confidential sale of the whole business or a stake in it, from preparation to completion.",
    photoId: PHOTOS.heroEquitySelling,
    cardPhotoId: PHOTOS.cardEquitySelling,
    numeral: "iii",
  },
  {
    slug: "mergers-and-acquisitions",
    title: "Mergers, Acquisitions & Joint Ventures",
    menuLine: "Acquisitions, mergers and partnerships",
    forWho: "Companies and investors",
    summary: "Buying, merging with or partnering with another business, from the first approach to the signed agreement.",
    photoId: PHOTOS.heroMergers,
    cardPhotoId: PHOTOS.cardMergers,
    numeral: "iv",
  },
  {
    slug: "investor-matchmaking",
    title: "Investor Matchmaking",
    menuLine: "Introductions between capital and companies",
    forWho: "Businesses and investors",
    summary: "Introducing businesses that are raising capital or seeking a partner to investors whose interests fit.",
    photoId: PHOTOS.heroInvestors,
    cardPhotoId: PHOTOS.cardInvestors,
    numeral: "v",
  },
  {
    slug: "advisory-and-board-member-development",
    title: "Advisory & Board Member Development Services",
    menuLine: "Boards and advisory panels that add judgement",
    forWho: "Owners and boards",
    summary: "Building boards and advisory panels that help owners govern and grow, and preparing the people who sit on them.",
    photoId: PHOTOS.heroBoard,
    cardPhotoId: PHOTOS.cardBoard,
    numeral: "vi",
  },
  {
    slug: "financial-management",
    title: "Financial Management",
    menuLine: "Budgets, reporting and cash control",
    forWho: "Owners and finance teams",
    summary: "Planning, budgeting, reporting and cash control that give owners a clear view of the numbers.",
    photoId: PHOTOS.heroFinancial,
    cardPhotoId: PHOTOS.cardFinancial,
    numeral: "vii",
  },
  {
    slug: "portfolio-and-wealth-management",
    title: "Portfolio & Wealth Management",
    menuLine: "Planning what owners and families hold",
    forWho: "Owners and families",
    summary: "Helping owners and families plan and structure what they hold, before and after a liquidity event.",
    photoId: PHOTOS.heroPortfolio,
    cardPhotoId: PHOTOS.cardPortfolio,
    numeral: "viii",
  },
  {
    slug: "business-valuation",
    title: "Business Valuation & Revaluation",
    menuLine: "Independent, clearly reasoned valuations",
    forWho: "Shareholders and boards",
    summary: "Independent, clearly reasoned valuations and revaluations for transactions, shareholders and boards.",
    photoId: PHOTOS.facade,
    cardPhotoId: PHOTOS.cardValuation,
    numeral: "ix",
  },
  {
    slug: "digital-transformation-and-fintech-advisory",
    title: "Digital Transformation & FinTech Advisory",
    menuLine: "Finance technology and FinTech growth",
    forWho: "Businesses and FinTechs",
    summary: "Modernising finance and operations with the right technology, and advising FinTech businesses on growth and capital.",
    photoId: PHOTOS.heroDigital,
    cardPhotoId: PHOTOS.cardDigital,
    numeral: "x",
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
