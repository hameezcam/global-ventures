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
    name: "Executive Leadership [Designation Pending Approval]",
    role: "Senior Partner — Mergers & Acquisitions",
    practiceArea: "M&A, Cross-Border Transactions & Capital Sourcing",
    bio: "Senior corporate financier with deep advisory experience spanning cross-border transaction origination, corporate divestitures, and structured growth equity across the GCC, Europe, and emerging markets.",
    credentials: ["Senior Corporate Finance Advisory", "Cross-Border M&A Structuring", "Transaction Negotiation"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "partner-transaction-advisory",
    name: "Advisory Practice Lead [Designation Pending Approval]",
    role: "Partner — Transaction Advisory & Due Diligence",
    practiceArea: "Financial Due Diligence, Quality of Earnings & SPA Advisory",
    bio: "Specialist in buy-side and sell-side financial due diligence, balance sheet risk mitigation, EBITDA normalization, and complex completion accounts scrutiny for mid-market and institutional transactions.",
    credentials: ["Quality of Earnings (QoE)", "Financial Due Diligence", "Covenant & Working Capital Structuring"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "head-valuation",
    name: "Practice Director [Designation Pending Approval]",
    role: "Director — Business Valuation & Economic Modeling",
    practiceArea: "IVSC Valuation, DCF Analysis & Fairness Opinions",
    bio: "Directs independent valuation mandates, quantitative modeling, fairness opinions, and dispute advisory, providing empirical defensibility to shareholders and boardrooms.",
    credentials: ["DCF & Market Multiple Modeling", "Fairness Opinions", "Intangible Asset Appraisal"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "director-brokerage",
    name: "Client Director [Designation Pending Approval]",
    role: "Director — Business Brokerage & Private Client Intermediation",
    practiceArea: "Confidential Business Dispositions & Buyer Pre-Screening",
    bio: "Focuses on confidential intermediary mandates for private enterprise owners, confidential memorandum preparation, buyer qualification, and discreet transaction management.",
    credentials: ["Confidential Intermediation", "Buyer Qualification & KYC", "Transaction Closing Coordination"],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
];
