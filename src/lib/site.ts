/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL once the firm's own domain is
 * confirmed; until then Vercel's production URL is used.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://global-ventures-rho.vercel.app")
).replace(/\/$/, "");
