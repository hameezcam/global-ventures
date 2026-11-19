export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  targetAudience: string[];
  highlight: string;
}

export interface OpportunityListing {
  id: string;
  referenceCode: string;
  title: string;
  category: string;
  industry: string;
  location: string;
  revenueRange: string;
  ebitdaMargin?: string;
  investmentSize: string;
  dealType: 'Full Acquisition' | 'Majority Stake' | 'Strategic Investment' | 'Partnership';
  summary: string;
  highlights: string[];
  confidentialityLevel: 'Strict NDA Required' | 'Pre-Screened Access' | 'Public Memorandum';
  isDemonstration: boolean;
  featured?: boolean;
}

export interface InsightArticle {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  summary: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
  content: {
    heading: string;
    body: string[];
  }[];
  keyTakeaways: string[];
  isDraft?: boolean;
}

export interface IndustrySector {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  image: string;
}

export type { FlowType } from "@/lib/enquiry/schema";
