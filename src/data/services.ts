import { ServiceItem } from "@/types";

/*
 * Service copy. Written to be specific and verifiable: it describes the work,
 * not the firm's standing. Do not add accreditations, licences, standards
 * bodies, statistics or client names until they are confirmed.
 *
 * Order and titles follow the Global Venture LLC core competencies list (ten
 * services; corporate tax and bookkeeping are deliberately not offered).
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "strategic-business-restructuring",
    slug: "strategic-business-restructuring",
    title: "Strategic Business Restructuring",
    shortDescription:
      "Reshaping a business, its structure or its finances so it can perform, grow or prepare for a transaction.",
    fullDescription:
      "Businesses outgrow the structures they started with. We work with owners and boards to review how the company is organised, owned and financed, decide what needs to change, and plan the change so the business keeps running while it happens. That can mean a new group structure, separating divisions, bringing in or buying out shareholders, or restructuring borrowing.",
    iconName: "Compass",
    highlight: "A clear plan for change that the business can carry out.",
    features: [
      "Review of the group, ownership and operating structure",
      "Separation, consolidation or carve-out of business units",
      "Restructuring of borrowing and lender negotiations",
      "Shareholder changes: entries, exits and buy-outs",
      "Exit readiness and value improvement plans",
    ],
    deliverables: [
      "A restructuring options paper with a recommended path",
      "A financial model of the business before and after",
      "A step plan with timing, owners and dependencies",
      "Materials for shareholders, lenders or the board",
    ],
    targetAudience: [
      "Owners preparing a business for growth or sale",
      "Family businesses reorganising ownership between generations",
      "Boards dealing with underperformance or excess debt",
    ],
  },
  {
    id: "working-capital-and-fund-raising",
    slug: "working-capital-and-fund-raising",
    title: "Working Capital & Fund Raising",
    shortDescription:
      "Freeing up cash inside the business and raising the debt or equity it needs for the next stage.",
    fullDescription:
      "We help owners and finance teams understand where cash is tied up, how much funding the plan really needs, and which source of capital fits: bank debt, trade and working capital facilities, or equity from investors. We then prepare the business case and materials and support the conversations with funders through to terms.",
    iconName: "TrendingUp",
    highlight: "The right amount of capital, from the right source, on workable terms.",
    features: [
      "Working capital review: receivables, payables and inventory",
      "Cash flow forecasting and funding requirement",
      "Bank, trade and working capital facilities",
      "Equity and growth capital raises",
      "Lender and investor presentations and term negotiation",
    ],
    deliverables: [
      "A working capital and cash flow analysis",
      "A funding plan with recommended sources",
      "A financial model and business plan for funders",
      "An investor or lender presentation",
    ],
    targetAudience: [
      "Growing companies that need capital to expand",
      "Businesses under cash pressure from growth or long payment cycles",
      "Founders preparing a first institutional raise",
    ],
  },
  {
    id: "business-and-equity-selling",
    slug: "business-and-equity-selling",
    title: "Business & Equity Selling",
    shortDescription:
      "A confidential sale of the whole business or a stake in it, from preparation to completion.",
    fullDescription:
      "Whether an owner wants to sell outright, sell a majority or minority stake, or bring in a partner, we prepare the business and its story, approach qualified buyers or investors discreetly, put non-disclosure agreements in place before anything sensitive is shared, and negotiate on the owner's behalf through to completion.",
    iconName: "ShieldCheck",
    highlight: "Confidentiality first, qualified counterparties only.",
    features: [
      "Full sale, majority or minority stake sales",
      "Anonymised teaser and information memorandum",
      "Buyer and investor screening, including evidence of funds",
      "A managed process to create competition between serious bidders",
      "Negotiation of price, structure and protections",
    ],
    deliverables: [
      "A blind profile and information memorandum",
      "A screened list of qualified buyers or investors",
      "A heads of terms framework",
      "A completion and handover plan",
    ],
    targetAudience: [
      "Owners planning a full or partial exit",
      "Shareholders selling a stake to a partner or investor",
      "Founders who want a quiet, confidential process",
    ],
  },
  {
    id: "mergers-and-acquisitions",
    slug: "mergers-and-acquisitions",
    title: "Mergers, Acquisitions & Joint Ventures",
    shortDescription:
      "Buying, merging with or partnering with another business, from the first approach to the signed agreement.",
    fullDescription:
      "We advise companies and investors on acquisitions, mergers and joint ventures. That covers defining what to look for, identifying and approaching targets or partners confidentially, testing the numbers, structuring the deal, and negotiating terms through to signing, including how a joint venture will be governed and how partners can exit.",
    iconName: "Briefcase",
    highlight: "A well-run deal, from the first approach to signing.",
    features: [
      "Buy-side acquisition search and target approaches",
      "Mergers between private companies",
      "Joint ventures and strategic partnerships",
      "Financial due diligence and quality of earnings",
      "Deal structuring and negotiation through to signing",
    ],
    deliverables: [
      "A target or partner long list and short list",
      "A valuation view and analysis of likely synergies",
      "A due diligence summary of the key findings",
      "Heads of terms and a joint venture framework where relevant",
    ],
    targetAudience: [
      "Companies pursuing acquisitions or bolt-ons",
      "Businesses looking for a joint venture partner",
      "Investors looking for regional deals",
    ],
  },
  {
    id: "investor-matchmaking",
    slug: "investor-matchmaking",
    title: "Investor Matchmaking",
    shortDescription:
      "Introducing businesses that are raising capital or seeking a partner to investors whose interests fit.",
    fullDescription:
      "Finding capital is often less about the number of investors approached than about approaching the right ones. We work with businesses to understand what kind of investor fits, prepare them for the conversation, and make considered introductions. For investors, we look for opportunities that match their sector, size and return requirements, shared under a non-disclosure agreement.",
    iconName: "Users",
    highlight: "Fewer, better introductions.",
    features: [
      "Defining the investor profile that fits the business",
      "Investor readiness review and materials",
      "Considered introductions to strategic and financial investors",
      "Mandates for investors seeking specific opportunities",
      "Support through meetings, term sheets and negotiation",
    ],
    deliverables: [
      "An investor profile and target list",
      "An investment summary and presentation",
      "Managed introductions and meeting notes",
      "A term sheet comparison where offers are received",
    ],
    targetAudience: [
      "Businesses raising growth capital or seeking a strategic partner",
      "Family offices and private investors looking for opportunities",
      "Companies looking for co-investors in a project",
    ],
  },
  {
    id: "advisory-and-board-member-development",
    slug: "advisory-and-board-member-development",
    title: "Advisory & Board Member Development Services",
    shortDescription:
      "Building boards and advisory panels that help owners govern, decide and grow, and preparing the people who sit on them.",
    fullDescription:
      "As a company grows, decisions that once sat with the founder need structure around them. We help owners decide what kind of board or advisory panel the business needs, define the roles and how the board will work, find candidates with the right experience, and prepare new and existing members to contribute from their first meeting.",
    iconName: "Users",
    highlight: "A board that adds judgement, not just meetings.",
    features: [
      "Review of the current board, its make-up and how it works",
      "Design of a board or advisory panel suited to the business",
      "Role definitions, terms of reference and meeting calendar",
      "Search for independent and non-executive members",
      "Induction and development for new and existing members",
    ],
    deliverables: [
      "A board review with recommendations",
      "A board or advisory panel structure and charter",
      "Role profiles and a candidate shortlist",
      "An induction and development plan for members",
    ],
    targetAudience: [
      "Founder-led businesses forming their first board",
      "Family businesses separating ownership from management",
      "Companies preparing for investors or a future sale",
    ],
  },
  {
    id: "financial-management",
    slug: "financial-management",
    title: "Financial Management",
    shortDescription:
      "Planning, budgeting, reporting and cash control that give owners a clear view of the numbers and the decisions behind them.",
    fullDescription:
      "Good decisions need reliable numbers at the right time. We work with owners and finance teams to set budgets and forecasts, design the management reports the board actually uses, tighten cash and cost control, and strengthen the processes and controls behind them, so the business is run on facts and is ready for funders, buyers or auditors.",
    iconName: "BarChart3",
    highlight: "Clear numbers, on time, that management can act on.",
    features: [
      "Budgeting, forecasting and business planning",
      "Management reporting and key performance indicators",
      "Cash flow, cost and margin management",
      "Review of finance processes and internal controls",
      "Finance function review and interim support",
    ],
    deliverables: [
      "A budget and rolling forecast model",
      "A management reporting pack and KPI dashboard",
      "A cash and cost improvement plan",
      "A finance process and controls review with recommendations",
    ],
    targetAudience: [
      "Owner-managed businesses without a senior finance lead",
      "Growing companies whose reporting has not kept pace",
      "Businesses preparing for funding, a sale or an audit",
    ],
  },
  {
    id: "portfolio-and-wealth-management",
    slug: "portfolio-and-wealth-management",
    title: "Portfolio & Wealth Management",
    shortDescription:
      "Helping owners and families plan and structure what they hold, before and after a liquidity event.",
    fullDescription:
      "A sale or a partial exit often turns business wealth into cash for the first time. We help owners and families take stock of what they hold across businesses, property and investments, set objectives for it, and plan how it should be structured, reviewed and passed on over time.",
    iconName: "PieChart",
    highlight: "A considered plan for wealth built in a business.",
    features: [
      "Review of business, property and investment holdings",
      "Planning for proceeds before and after a sale",
      "Holding and family structures",
      "Succession planning across generations",
      "Regular portfolio reviews and reporting",
    ],
    deliverables: [
      "A consolidated view of holdings",
      "A written plan with objectives and priorities",
      "A recommended holding structure",
      "A periodic review report",
    ],
    targetAudience: [
      "Owners approaching or following a sale",
      "Families with holdings across several businesses",
      "Individuals planning succession",
    ],
  },
  {
    id: "business-valuation",
    slug: "business-valuation",
    title: "Business Valuation & Revaluation",
    shortDescription:
      "Independent, clearly reasoned valuations and revaluations for transactions, shareholders and boards.",
    fullDescription:
      "We prepare valuations using established methods: discounted cash flow, comparable transactions and comparable listed companies. Each report sets out the assumptions and reasoning clearly, so the conclusion can be understood, challenged and relied on. Where a valuation already exists, we revalue the business to reflect new results, a change in the market or an upcoming event.",
    iconName: "PieChart",
    highlight: "A valuation you can explain, defend and act on.",
    features: [
      "Discounted cash flow analysis and cost of capital",
      "Comparable transaction multiples",
      "Comparable listed company benchmarking",
      "Periodic revaluations and updates to an earlier valuation",
      "Valuation of intangible assets and intellectual property",
    ],
    deliverables: [
      "A written valuation report with an executive summary",
      "A sensitivity and scenario model",
      "Supporting cost of capital schedules",
      "A summary of market multiples used",
    ],
    targetAudience: [
      "Shareholders planning a transfer or exit",
      "Boards that need an independent or updated view of value",
      "Legal and financial advisers who need a reasoned valuation",
    ],
  },
  {
    id: "digital-transformation-and-fintech-advisory",
    slug: "digital-transformation-and-fintech-advisory",
    title: "Digital Transformation & FinTech Advisory",
    shortDescription:
      "Modernising finance and operations with the right technology, and advising FinTech businesses on growth and capital.",
    fullDescription:
      "We help established businesses decide where technology will genuinely improve how they run: finance systems, reporting, payments and the data management needs to make decisions. For FinTech companies, we advise on business models, partnerships, fund raising and readiness for investors or buyers.",
    iconName: "Cpu",
    highlight: "Technology chosen for what it does for the business.",
    features: [
      "Review of finance systems, reporting and processes",
      "Digital transformation roadmaps",
      "Payments, banking and FinTech partnerships",
      "Business model and growth advice for FinTech companies",
      "Fund raising and investor readiness for technology businesses",
    ],
    deliverables: [
      "A current-state review with priorities",
      "A transformation roadmap with costs and timing",
      "A vendor and partner shortlist",
      "An investor-ready plan for FinTech businesses",
    ],
    targetAudience: [
      "Established businesses modernising finance and operations",
      "FinTech founders preparing to scale or raise capital",
      "Investors assessing technology businesses",
    ],
  },
];
