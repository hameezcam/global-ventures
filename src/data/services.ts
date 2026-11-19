import { ServiceItem } from "@/types";

export const SERVICES: ServiceItem[] = [
  {
    id: "corporate-finance",
    slug: "corporate-finance",
    title: "Corporate Finance",
    shortDescription:
      "Capital structure optimization, debt restructuring, growth capital sourcing and balance sheet advisory for mid-market and enterprise businesses.",
    fullDescription:
      "Global Ventures provides tailored corporate finance advisory designed to align balance sheet architecture with long-term commercial goals. We assist enterprises in navigating capital raises, senior and subordinated debt structuring, covenant negotiations, and liquidity management with international institutional rigor.",
    iconName: "TrendingUp",
    highlight: "Strategic capital planning engineered for resilience and expansion.",
    features: [
      "Capital Structure Diagnostic & Optimization",
      "Debt Advisory & Refinancing Solutions",
      "Growth Equity & Structured Capital Raising",
      "Working Capital & Cash Flow Rationalization",
      "Financial Modeling & Sensitivity Architecture",
    ],
    deliverables: [
      "Comprehensive Capital Strategy Memorandum",
      "Bankable 3-Statement Dynamic Financial Model",
      "Lender & Institutional Investor Teasers",
      "Debt Capacity & Covenant Stress-Test Report",
    ],
    targetAudience: [
      "Mid-market enterprises planning regional or international expansion",
      "C-suite executives restructuring existing obligations",
      "Family offices requiring structured portfolio debt management",
    ],
  },
  {
    id: "mergers-and-acquisitions",
    slug: "mergers-and-acquisitions",
    title: "Mergers & Acquisitions",
    shortDescription:
      "End-to-end sell-side and buy-side advisory, cross-border transaction execution, carve-outs and strategic partnership orchestration.",
    fullDescription:
      "Our M&A practice guides founders, shareholders, and corporate entities through the highest-stakes moments of their business lifecycle. We coordinate proprietary deal origination, confidential marketing, competitive auction dynamics, valuation defenses, and definitive agreement negotiations.",
    iconName: "Briefcase",
    highlight: "Discreet, value-maximizing M&A execution with global reach.",
    features: [
      "Sell-Side Advisory & Enterprise Divestitures",
      "Buy-Side Mandates & Proprietary Deal Sourcing",
      "Management Buyouts (MBO) & Buy-Ins (MBI)",
      "Carve-Outs & Non-Core Asset Divestments",
      "Cross-Border Joint Ventures & Strategic Alliances",
    ],
    deliverables: [
      "Confidential Information Memorandum (CIM)",
      "Target Valuation & Transaction Synergy Matrix",
      "Curated International Buyer / Target Universe",
      "Virtual Data Room (VDR) Management & Process Letters",
    ],
    targetAudience: [
      "Founders and shareholders seeking optimal enterprise exit",
      "Corporates executing accretive bolt-on acquisitions",
      "Private equity sponsors requiring regional origination support",
    ],
  },
  {
    id: "business-valuation",
    slug: "business-valuation",
    title: "Business Valuation",
    shortDescription:
      "Defensible, multi-methodology valuations using DCF, trading multiples, and transaction comps for M&A, shareholder restructuring, and dispute advisory.",
    fullDescription:
      "We provide objective, methodologically rigorous valuations benchmarked against international standards (IVSC/RICS principles). Whether needed for upcoming transactions, partnership admissions, regulatory compliance, or internal strategic benchmarking, our valuations provide clarity and defensibility.",
    iconName: "PieChart",
    highlight: "Institutional-grade valuation reports built on empirical rigor.",
    features: [
      "Discounted Cash Flow (DCF) & WACC Benchmarking",
      "Precedent Transaction Multiples Analysis",
      "Comparable Public Company Peer Benchmarking",
      "Intangible Asset & Intellectual Property Valuation",
      "Fairness Opinions & Shareholder Dispute Support",
    ],
    deliverables: [
      "Formal Valuation Report & Executive Synthesis",
      "Interactive Sensitivity & Scenario Model",
      "WACC, Beta, and Country-Risk Premium Schedules",
      "Market Multiple Comparative Compendium",
    ],
    targetAudience: [
      "Shareholders planning equity transfers or exits",
      "Corporate boards requiring independent fairness opinions",
      "Legal counsel and auditors requiring defensible expert appraisal",
    ],
  },
  {
    id: "business-brokerage",
    slug: "business-brokerage",
    title: "Business Brokerage",
    shortDescription:
      "Structured, strictly confidential transaction brokerage connecting qualified buyers with profitable, privately-held businesses across prime sectors.",
    fullDescription:
      "Global Ventures operates a confidential business brokerage practice catering to profitable privately-owned companies. We act as discreet intermediaries, screening prospective buyers, protecting trade secrets via strict non-disclosure agreements, and guiding the transaction through due diligence to successful closing.",
    iconName: "ShieldCheck",
    highlight: "Strict confidentiality, qualified buyers, seamless execution.",
    features: [
      "Confidential Business Marketing & Teaser Preparation",
      "Buyer Pre-Qualification & Verification of Funds",
      "Escrow & Transaction Staging Advisory",
      "Commercial Due Diligence Coordination",
      "Seamless Ownership Transition Planning",
    ],
    deliverables: [
      "Blind Profile / Confidential One-Page Teaser",
      "Vetted Buyer Verification Dossier",
      "Heads of Terms / Letter of Intent (LOI) Framework",
      "Transition Roadmap & Closing Protocols",
    ],
    targetAudience: [
      "Business owners desiring a quiet, confidential exit",
      "High-net-worth investors and family offices looking for turnkey businesses",
      "Serial entrepreneurs seeking established cash-flowing assets",
    ],
  },
  {
    id: "transaction-advisory",
    slug: "transaction-advisory",
    title: "Transaction Advisory",
    shortDescription:
      "Financial and commercial due diligence, quality of earnings (QoE) analyses, SPA mechanism advisory, and completion accounts scrutiny.",
    fullDescription:
      "Transaction Advisory bridges the gap between commercial optimism and financial reality. We uncover balance sheet risks, analyze normalized EBITDA through Quality of Earnings reviews, scrutinize working capital pegs, and assist counsel in drafting robust financial clauses in Sale and Purchase Agreements (SPAs).",
    iconName: "CheckCircle2",
    highlight: "Mitigating downside risk and securing transaction value.",
    features: [
      "Buy-Side & Sell-Side Financial Due Diligence",
      "Quality of Earnings (QoE) & EBITDA Normalization",
      "Net Working Capital (NWC) Target & Peg Advisory",
      "SPA Financial Mechanism Review (Locked Box vs Completion Accounts)",
      "Post-Closing Completion Balance Sheet Verification",
    ],
    deliverables: [
      "Comprehensive Financial Due Diligence Report",
      "Bridge of Reported to Normalized EBITDA Schedule",
      "Working Capital Analysis & Volatility Assessment",
      "SPA Pricing Mechanism Commentary & Recommendations",
    ],
    targetAudience: [
      "Acquirers wanting deep financial validation before signing",
      "Sellers conducting vendor due diligence to accelerate closing",
      "Lenders assessing debt service capacity of an acquisition target",
    ],
  },
  {
    id: "strategic-advisory",
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    shortDescription:
      "Long-term value creation, board-level advisory, feasibility studies, exit readiness planning, and market entry strategy.",
    fullDescription:
      "Strategic Advisory delivers high-conviction counsel to business owners and corporate leadership teams navigating pivotal inflection points. From preparing a business for a multi-year exit value enhancement program to evaluating new market entry in the GCC and internationally, we provide executive-level strategic support.",
    iconName: "Compass",
    highlight: "Transforming vision into tangible enterprise value.",
    features: [
      "Exit Readiness & Pre-Sale Value Enhancement Programs",
      "Feasibility Studies & Market Entry Strategy",
      "Commercial Strategy & Business Model Evolution",
      "Corporate Governance & Board-Level Advisory",
      "Post-Merger Integration (PMI) Planning",
    ],
    deliverables: [
      "Exit Readiness Diagnostic & Value Gap Roadmap",
      "Strategic Business Plan & 5-Year Horizon Model",
      "Market Feasibility Assessment & Risk Matrix",
      "Post-Transaction Integration Blueprint",
    ],
    targetAudience: [
      "Founders planning an exit 12 to 36 months in advance",
      "Multinational brands entering the regional market",
      "Boards seeking independent strategic perspective",
    ],
  },
];
