import { IndustrySector } from "@/types";

/*
 * Sector pages. Copy describes how each sector is assessed, not the firm's
 * record: do not add deal counts, client names or statistics until they are
 * confirmed. Each photoId is used only on that sector's page.
 */
export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: "technology",
    slug: "technology",
    name: "Technology & Software",
    tagline: "Software, SaaS, digital infrastructure and FinTech",
    summary: "Advice for software and technology businesses on raising capital, selling a stake and preparing for an exit.",
    highlight: "Recurring revenue is valued very differently from one-off sales.",
    description:
      "Technology businesses are valued on the quality and durability of their revenue as much as on profit. We help founders and boards present those numbers clearly, decide what kind of investor or buyer fits, and run the process from first approach to completion.",
    focusAreas: [
      "B2B software and cloud platforms",
      "Logistics and supply chain technology",
      "FinTech and payments",
      "Health technology and telemedicine",
    ],
    valueDrivers: [
      { title: "Recurring revenue", body: "How much revenue repeats each year, and how predictable it is." },
      { title: "Retention and churn", body: "Whether customers stay, and whether they spend more over time." },
      { title: "Cost to acquire a customer", body: "What growth costs, and how quickly that cost is earned back." },
      { title: "Ownership of the technology", body: "Clear rights to the code, data and intellectual property." },
    ],
    services: ["working-capital-and-fund-raising", "investor-matchmaking", "digital-transformation-and-fintech-advisory"],
    photoId: "photo-1518770660439-4636190af475",
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "Specialist clinics, diagnostics and pharmaceutical distribution",
    summary: "Transaction and financing advice for clinics, laboratories and healthcare distributors.",
    highlight: "In healthcare, licences and people are part of what is being bought.",
    description:
      "Healthcare operators are regulated businesses whose value depends on their licences, their clinicians and their payer relationships. We help owners prepare for a sale or investment, find counterparties who understand the sector, and plan for the regulatory approvals a change of ownership needs.",
    focusAreas: [
      "Day-surgery centres and outpatient polyclinics",
      "Diagnostic and pathology laboratories",
      "Medical equipment and pharmaceutical distribution",
      "Aesthetic and wellness clinics",
    ],
    valueDrivers: [
      { title: "Licences and approvals", body: "Which licences transfer with the business, and what a change of ownership requires." },
      { title: "Clinician retention", body: "How dependent revenue is on individual doctors staying after a sale." },
      { title: "Payer mix", body: "The balance between insurance, government and self-pay revenue." },
      { title: "Capacity and utilisation", body: "How fully rooms, equipment and staff are used today." },
    ],
    services: ["business-and-equity-selling", "mergers-and-acquisitions", "business-valuation"],
    photoId: "photo-1579684385127-1ef15d508118",
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Industrial & Manufacturing",
    tagline: "Precision engineering, packaging and building materials",
    summary: "Advice for manufacturers on financing, restructuring and sale, where assets and working capital drive value.",
    highlight: "Plant, inventory and contracts carry as much weight as profit.",
    description:
      "Manufacturing businesses tie up capital in equipment, inventory and receivables. We help owners understand how much of that capital the business really needs, finance growth or new capacity, restructure where the balance sheet holds the business back, and sell to buyers who can see the value in the assets and the order book.",
    focusAreas: [
      "Sustainable packaging and paperboard",
      "Precision machining and metal fabrication",
      "Chemicals and industrial polymers",
      "Building materials and modular construction",
    ],
    valueDrivers: [
      { title: "Working capital", body: "How much cash sits in inventory and receivables, and how it moves through the year." },
      { title: "Condition of the assets", body: "The age of the equipment and the investment it will need." },
      { title: "Customer contracts", body: "Order book, contract length and dependence on a few large customers." },
      { title: "Input costs", body: "Exposure to raw material and energy prices, and how they are passed on." },
    ],
    services: ["working-capital-and-fund-raising", "strategic-business-restructuring", "business-and-equity-selling"],
    photoId: "photo-1581091226825-a6a2a5aee158",
  },
  {
    id: "logistics",
    slug: "logistics",
    name: "Logistics & Supply Chain",
    tagline: "Freight forwarding, cold chain and contract warehousing",
    summary: "Advice for logistics operators on acquisitions, partnerships and raising capital for new capacity.",
    highlight: "Contracts, capacity and location decide what a logistics business is worth.",
    description:
      "Logistics businesses grow through capacity, coverage and long customer contracts. We help operators raise capital for warehouses, fleets and systems, find acquisition targets or joint venture partners that extend their network, and prepare for a sale to strategic or financial buyers.",
    focusAreas: [
      "Cold-chain and temperature-controlled warehousing",
      "Cross-border freight forwarding and customs",
      "Last-mile and e-commerce fulfilment",
      "Air and sea cargo handling",
    ],
    valueDrivers: [
      { title: "Contract length", body: "How much revenue is under contract, and for how long." },
      { title: "Utilisation", body: "How fully warehouse space and fleet are used." },
      { title: "Location and access", body: "Proximity to ports, airports, free zones and customers." },
      { title: "Systems", body: "The tracking and warehouse systems customers rely on." },
    ],
    services: ["mergers-and-acquisitions", "working-capital-and-fund-raising", "investor-matchmaking"],
    photoId: "photo-1586528116311-ad8dd3c8310d",
  },
  {
    id: "retail-consumer",
    slug: "retail-consumer",
    name: "Retail & Consumer Brands",
    tagline: "Consumer brands, specialty retail and food and beverage",
    summary: "Advice for consumer brands and retailers on growth capital, franchising and sale.",
    highlight: "A brand is worth what its customers keep coming back for.",
    description:
      "Consumer businesses are judged on the strength of the brand, the economics of each store or channel, and how repeatable growth is. We help owners raise capital to expand, bring in partners or franchisees, and sell to buyers who value the brand as well as the numbers.",
    focusAreas: [
      "Multi-site specialty retail",
      "Direct-to-consumer and omnichannel brands",
      "Food and beverage manufacturing",
      "Personal care and beauty",
    ],
    valueDrivers: [
      { title: "Brand strength", body: "Repeat customers, pricing power and recognition in the market." },
      { title: "Store and channel economics", body: "What each location or channel earns, and how quickly new ones pay back." },
      { title: "Inventory", body: "Stock levels, turnover and how much is written off." },
      { title: "Room to expand", body: "New locations, markets or franchise partners the brand can support." },
    ],
    services: ["working-capital-and-fund-raising", "business-and-equity-selling", "investor-matchmaking"],
    photoId: "photo-1441986300917-64674bd600d8",
  },
  {
    id: "hospitality",
    slug: "hospitality",
    name: "Hospitality & Leisure",
    tagline: "Boutique hotels, restaurant groups and leisure venues",
    summary: "Advice for hospitality owners and operators on asset sales, joint ventures and financing.",
    highlight: "In hospitality, the property and the operator are valued together.",
    description:
      "Hospitality businesses combine a property, an operating business and often a brand. We help owners and operators decide how to separate or combine those, raise capital, bring in joint venture partners, and sell assets or operating groups.",
    focusAreas: [
      "Boutique and heritage hotels",
      "Multi-site restaurant groups",
      "Wellness resorts and member clubs",
      "Entertainment and leisure venues",
    ],
    valueDrivers: [
      { title: "Occupancy and rates", body: "How full the business is, and what each guest or cover is worth." },
      { title: "Lease or ownership", body: "Whether the property is owned or leased, and on what terms." },
      { title: "Brand and management", body: "Brand licences, management contracts and the team that runs them." },
      { title: "Seasonality", body: "How revenue moves through the year, and how costs follow it." },
    ],
    services: ["mergers-and-acquisitions", "strategic-business-restructuring", "business-valuation"],
    photoId: "photo-1566073771259-6a8506099945",
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate & Infrastructure",
    tagline: "Commercial portfolios, industrial parks and developments",
    summary: "Advice on financing, joint ventures and capital raising for income-producing property and developments.",
    highlight: "Income, tenants and structure come before the building.",
    description:
      "Property and infrastructure projects depend on how they are structured and financed as much as on the asset. We build the financial models, shape joint ventures between landowners, developers and investors, and help raise the debt and equity a portfolio or development needs.",
    focusAreas: [
      "Commercial office assets",
      "Logistics parks and free zone assets",
      "Build-to-rent and mixed-use developments",
      "Infrastructure and renewable energy sites",
    ],
    valueDrivers: [
      { title: "Rental income", body: "Occupancy, lease length and the quality of the tenants." },
      { title: "Development risk", body: "Approvals, construction costs and the time to completion." },
      { title: "Financing structure", body: "How debt, equity and partner returns are arranged." },
      { title: "Exit options", body: "Who could buy the asset or portfolio, and when." },
    ],
    services: ["working-capital-and-fund-raising", "mergers-and-acquisitions", "portfolio-and-wealth-management"],
    photoId: "photo-1485083269755-a7b559a4fe5e",
  },
  {
    id: "professional-services",
    slug: "professional-services",
    name: "Professional & Corporate Services",
    tagline: "Engineering, consulting and corporate services firms",
    summary: "Advice for partner-owned firms on succession, partner buy-outs and sale.",
    highlight: "A firm's value walks out of the door each evening.",
    description:
      "Professional firms are built on people and client relationships, so a transaction has to keep both. We help partners plan succession, structure buy-outs and new partner entries, and sell to buyers in a way that keeps the team and its clients in place.",
    focusAreas: [
      "Engineering and architecture practices",
      "Corporate and legal services firms",
      "IT and digital consultancies",
      "Environmental and ESG advisory firms",
    ],
    valueDrivers: [
      { title: "Client relationships", body: "How long clients stay, and whether they are tied to the firm or to individuals." },
      { title: "Retained work", body: "The share of revenue from ongoing retainers rather than one-off projects." },
      { title: "Team retention", body: "Keeping key people through and after the transaction." },
      { title: "Utilisation", body: "How much of the team's time is billed." },
    ],
    services: ["strategic-business-restructuring", "business-and-equity-selling", "business-valuation"],
    photoId: "photo-1454165804606-c3d57bc86b40",
  },
];

export const sectorBySlug = (slug: string) => INDUSTRY_SECTORS.find((s) => s.slug === slug);
