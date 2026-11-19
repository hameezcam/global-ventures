import { INSIGHT_ARTICLES } from "@/data/insights";

/** Draft articles are visible on Preview deployments only, flagged as drafts. */
export const showDraftInsights = () => process.env.VERCEL_ENV !== "production";

export const visibleInsights = () => INSIGHT_ARTICLES.filter((a) => !a.isDraft || showDraftInsights());
