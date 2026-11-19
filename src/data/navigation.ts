export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    description: string;
    href: string;
    icon?: string;
  }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        title: "About Global Ventures",
        description: "Our philosophy, advisory standards, and discreet international focus.",
        href: "/about",
      },
      {
        title: "Leadership & Practice Heads",
        description: "Meet the senior advisors steering complex corporate transactions.",
        href: "/team",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        title: "Corporate Finance",
        description: "Capital structure optimization, debt advisory, and balance sheet resilience.",
        href: "/services/corporate-finance",
      },
      {
        title: "Mergers & Acquisitions",
        description: "Confidential sell-side, buy-side, and cross-border strategic transactions.",
        href: "/services/mergers-and-acquisitions",
      },
      {
        title: "Business Valuation",
        description: "Defensible, multi-methodology IVSC appraisal and fairness opinions.",
        href: "/services/business-valuation",
      },
      {
        title: "Business Brokerage",
        description: "Discreet intermediary representation for private commercial exits.",
        href: "/services/business-brokerage",
      },
      {
        title: "Transaction Advisory",
        description: "Quality of Earnings (QoE), financial due diligence, and SPA scrutiny.",
        href: "/services/transaction-advisory",
      },
      {
        title: "Strategic Advisory",
        description: "Exit readiness roadmaps, feasibility studies, and value acceleration.",
        href: "/services/strategic-advisory",
      },
    ],
  },
  {
    label: "Transactions",
    href: "/opportunities",
    children: [
      {
        title: "Confidential Opportunities",
        description: "Curated demonstration portfolio of vetted acquisition opportunities.",
        href: "/opportunities",
      },
      {
        title: "Sell Your Business",
        description: "Structured exit advisory, confidential marketing, and valuation defense.",
        href: "/sell-a-business",
      },
      {
        title: "Acquire a Business",
        description: "Target search mandates, due diligence, and strategic transaction closing.",
        href: "/buy-a-business",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
