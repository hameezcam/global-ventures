import "server-only";
import type { NextRequest } from "next/server";

export class BodyTooLargeError extends Error {}

/**
 * Reads the request body as UTF-8 text, aborting as soon as it exceeds
 * maxBytes. Unlike a Content-Length check this also covers chunked uploads
 * and clients that lie about the length.
 */
export async function readBodyWithLimit(request: NextRequest, maxBytes: number): Promise<string> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > maxBytes) throw new BodyTooLargeError();
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(merged);
}

export function isJsonContentType(request: NextRequest): boolean {
  const type = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  return type === "application/json";
}

function allowedOrigins(request: NextRequest): Set<string> {
  const origins = new Set<string>();
  const add = (value: string | undefined, withScheme = false) => {
    if (!value) return;
    try {
      origins.add(new URL(withScheme ? `https://${value}` : value).origin);
    } catch {
      /* ignore malformed config */
    }
  };
  // The host this request was actually served on (production alias, preview URL or localhost).
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  if (host) add(`${proto}://${host}`);
  add(process.env.NEXT_PUBLIC_SITE_URL);
  add(process.env.VERCEL_PROJECT_PRODUCTION_URL, true);
  add(process.env.VERCEL_URL, true);
  add(process.env.VERCEL_BRANCH_URL, true);
  return origins;
}

/** Browser same-origin check; blocks cross-site form posts (CSRF-style abuse). */
export function isAllowedOrigin(request: NextRequest): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return allowedOrigins(request).has(origin);
}

/** Best-effort client IP. On Vercel, x-forwarded-for is set by the platform edge. */
export function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function parseIdempotencyKey(request: NextRequest): string | null {
  const key = request.headers.get("idempotency-key")?.trim() ?? "";
  return UUID_REGEX.test(key) ? key.toLowerCase() : null;
}
