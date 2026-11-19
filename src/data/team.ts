export interface TeamMember {
  id: string;
  name: string;
  role: string;
  practiceArea: string;
  bio: string;
  credentials: string[];
  image: string;
}

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: "managing-partner-ma",
    name: "M&A & Divestitures Practice Committee",
    role: "Senior Partner Lead — Mergers & Acquisitions",
    practiceArea: "M&A, Cross-Border Transactions & Capital Sourcing",
    bio: "Steers strategic corporate finance, cross-border transaction origination, corporate divestitures, and structured growth equity mandates across the GCC and international markets. Senior partners are assigned directly upon mandate onboarding.",
    credentials: [
      "Cross-Border M&A Structuring",
      "Confidential Sell-Side Execution",
      "Transaction Negotiation & Auction Dynamics",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "partner-transaction-advisory",
    name: "Due Diligence & Quality of Earnings Practice",
    role: "Practice Lead — Transaction Advisory & Due Diligence",
    practiceArea: "Financial Due Diligence, Quality of Earnings & SPA Advisory",
    bio: "Oversees buy-side and sell-side financial due diligence, balance sheet risk mitigation, EBITDA normalization, and complex completion accounts scrutiny for mid-market and institutional transactions.",
    credentials: [
      "Quality of Earnings (QoE) Analysis",
      "Working Capital Peg Calibration",
      "SPA Financial Mechanism Review",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "head-valuation",
    name: "Valuation & Economic Modeling Practice",
    role: "Practice Lead — Business Valuation & Appraisal",
    practiceArea: "IVSC Valuation, DCF Analysis & Fairness Opinions",
    bio: "Leads independent enterprise valuations, quantitative modeling, fairness opinions, and dispute advisory, providing empirical defensibility to shareholders, family offices, and corporate boards.",
    credentials: [
      "IVSC Empirical Valuation Standards",
      "DCF, WACC & Multiple Modeling",
      "Intangible Asset & Goodwill Appraisal",
    ],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "director-brokerage",
    name: "Private Intermediation & Brokerage Desk",
    role: "Practice Lead — Business Brokerage & Transactions",
    practiceArea: "Confidential Business Dispositions & Buyer Pre-Screening",
    bio: "Focuses on confidential intermediary mandates for private enterprise owners, confidential memorandum preparation, qualified buyer verification (KYC/AML), and discreet closing coordination.",
    credentials: [
      "Confidential Intermediation Protocols",
      "Buyer Pre-Qualification & Proof of Funds",
      "Closing & Escrow Coordination",
    ],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
];
