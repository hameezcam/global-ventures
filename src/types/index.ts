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
  /** Short line shown under the name in sector lists. */
  tagline: string;
  /** One-sentence summary used as the sector page lede. */
  summary: string;
  /** Opening paragraph of the sector page. */
  description: string;
  /** Statement heading for the overview section. */
  highlight: string;
  focusAreas: string[];
  /** What buyers, investors and valuers look at closely in this sector. */
  valueDrivers: { title: string; body: string }[];
  /** Slugs of the services most often used in this sector. */
  services: string[];
  /** Unsplash photo id for the sector page hero (used only there). */
  photoId: string;
}

export type { FlowType } from "@/lib/enquiry/schema";
