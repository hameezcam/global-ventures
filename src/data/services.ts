import { ServiceItem } from "@/types";

/*
 * Practice copy. Written to be specific and verifiable: it describes the work,
 * not the firm's standing. Do not add accreditations, standards bodies,
 * statistics or client names until they are confirmed.
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "corporate-finance",
    slug: "corporate-finance",
    title: "Corporate Finance",
    shortDescription:
      "Capital structure, debt advisory and growth capital for businesses planning their next stage.",
    fullDescription:
      "We help owners and boards decide how a business should be financed: how much debt it can carry, where growth capital should come from, and how to present the business to lenders and investors. The aim is a capital structure that supports the plan rather than constrains it.",
    iconName: "TrendingUp",
    highlight: "Financing that supports the plan, not the other way round.",
    features: [
      "Review of the current capital structure and its constraints",
      "Debt advisory, refinancing and lender negotiations",
      "Raising growth and structured capital",
      "Working capital and cash flow planning",
      "Financial models that test the plan under different scenarios",
    ],
    deliverables: [
      "A capital strategy paper with recommended options",
      "An integrated three-statement financial model",
      "Lender and investor presentation materials",
      "A debt capacity and covenant sensitivity analysis",
    ],
    targetAudience: [
      "Businesses planning regional or international expansion",
      "Management teams restructuring existing borrowing",
      "Family offices reviewing how holdings are financed",
    ],
  },
  {
    id: "mergers-and-acquisitions",
    slug: "mergers-and-acquisitions",
    title: "Mergers & Acquisitions",
    shortDescription:
      "Sell-side and buy-side mandates, from positioning the business to the signed agreement.",
    fullDescription:
      "We guide founders, shareholders and companies through the sale or acquisition of a business. That covers preparing the business and its story, identifying and approaching counterparties confidentially, running a competitive process, and negotiating terms through to the signed agreement.",
    iconName: "Briefcase",
    highlight: "A confidential, well-run process from first approach to signing.",
    features: [
      "Sell-side advisory for full and partial exits",
      "Buy-side mandates and target identification",
      "Management buy-outs and buy-ins",
      "Carve-outs and disposals of non-core businesses",
      "Joint ventures and strategic partnerships",
    ],
    deliverables: [
      "An information memorandum and anonymised teaser",
      "A valuation view and analysis of likely synergies",
      "A researched list of buyers or targets",
      "Data room management and process letters",
    ],
    targetAudience: [
      "Founders and shareholders planning an exit",
      "Companies pursuing bolt-on acquisitions",
      "Investors looking for regional deal flow",
    ],
  },
  {
    id: "business-valuation",
    slug: "business-valuation",
    title: "Business Valuation",
    shortDescription:
      "Independent, clearly reasoned valuations for transactions, shareholders and boards.",
    fullDescription:
      "We prepare valuations using established methods: discounted cash flow, comparable transactions and comparable listed companies. Each report sets out the assumptions and reasoning clearly, so the conclusion can be understood, challenged and relied on in a negotiation, a shareholder matter or a board decision.",
    iconName: "PieChart",
    highlight: "A valuation you can explain, defend and act on.",
    features: [
      "Discounted cash flow analysis and cost of capital",
      "Comparable transaction multiples",
      "Comparable listed company benchmarking",
      "Valuation of intangible assets and intellectual property",
      "Support for shareholder discussions and disputes",
    ],
    deliverables: [
      "A written valuation report with an executive summary",
      "A sensitivity and scenario model",
      "Supporting cost of capital schedules",
      "A summary of market multiples used",
    ],
    targetAudience: [
      "Shareholders planning a transfer or exit",
      "Boards that need an independent view of value",
      "Legal and financial advisers who need a reasoned valuation",
    ],
  },
  {
    id: "business-brokerage",
    slug: "business-brokerage",
    title: "Business Brokerage",
    shortDescription:
      "A managed, confidential sale for privately held companies and their owners.",
    fullDescription:
      "For owners of profitable private companies, we act as a discreet intermediary: preparing anonymised materials, screening prospective buyers, putting non-disclosure agreements in place before anything sensitive is shared, and managing diligence through to completion.",
    iconName: "ShieldCheck",
    highlight: "Confidentiality first, qualified buyers only.",
    features: [
      "Anonymised marketing and teaser preparation",
      "Buyer screening, including evidence of funds",
      "Advice on deal staging and escrow arrangements",
      "Coordination of buyer due diligence",
      "Planning for a smooth ownership transition",
    ],
    deliverables: [
      "A blind profile of the business",
      "A screened list of qualified buyers",
      "A heads of terms or letter of intent framework",
      "A transition and completion plan",
    ],
    targetAudience: [
      "Owners who want a quiet, confidential exit",
      "Private investors looking for established businesses",
      "Entrepreneurs seeking a business with steady cash flow",
    ],
  },
  {
    id: "transaction-advisory",
    slug: "transaction-advisory",
    title: "Transaction Advisory",
    shortDescription:
      "Financial due diligence and quality-of-earnings work that tests the numbers behind a deal.",
    fullDescription:
      "Before a price is agreed, both sides need to understand what the business really earns. We review historical results, normalise earnings, examine working capital, and help legal counsel shape the financial terms of the sale and purchase agreement.",
    iconName: "CheckCircle2",
    highlight: "A clear view of the numbers before you commit.",
    features: [
      "Buy-side and vendor financial due diligence",
      "Quality of earnings and EBITDA normalisation",
      "Working capital analysis and target setting",
      "Review of pricing mechanisms: locked box or completion accounts",
      "Review of the completion balance sheet",
    ],
    deliverables: [
      "A financial due diligence report",
      "A bridge from reported to normalised EBITDA",
      "A working capital analysis",
      "Commentary on the pricing mechanism in the agreement",
    ],
    targetAudience: [
      "Acquirers who want the numbers tested before signing",
      "Sellers preparing vendor due diligence",
      "Lenders assessing an acquisition",
    ],
  },
  {
    id: "strategic-advisory",
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    shortDescription:
      "Exit readiness and long-range planning, well before a deal is on the table.",
    fullDescription:
      "The best transactions are prepared years in advance. We work with owners and boards on what drives value in their business, what a buyer will scrutinise, and how to enter new markets or restructure the business model, so that when the moment comes the company is ready.",
    iconName: "Compass",
    highlight: "Preparing the business long before the deal.",
    features: [
      "Exit readiness reviews and value improvement plans",
      "Feasibility studies and market entry strategy",
      "Commercial strategy and business model review",
      "Governance and board advisory",
      "Planning for integration after a transaction",
    ],
    deliverables: [
      "An exit readiness review with a prioritised plan",
      "A business plan and five-year financial model",
      "A market feasibility assessment",
      "An integration plan for after completion",
    ],
    targetAudience: [
      "Founders planning an exit in the next one to three years",
      "Companies entering the regional market",
      "Boards that want an independent strategic view",
    ],
  },
];
