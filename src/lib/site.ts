/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL once the firm's own domain is
 * confirmed; until then Vercel's production URL is used.
 */
/** Public contact details, as supplied by the firm (2026-11-20). */
export const CONTACT = {
  email: "info@globalventure.ae",
  phone: "+971 56 412 6558",
  /** E.164 form for tel: links. */
  phoneHref: "tel:+971564126558",
  /** The same number on WhatsApp (click-to-chat link). */
  whatsappHref: "https://wa.me/971564126558",
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://global-ventures-rho.vercel.app")
).replace(/\/$/, "");
