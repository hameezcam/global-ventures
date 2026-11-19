/**
 * Image loader for next/image.
 *
 * Unsplash already resizes and compresses on its own CDN, so images are
 * requested from it directly at the width the browser needs. This avoids
 * Vercel Image Optimization, whose Hobby-plan quota is exhausted (requests
 * were returning 402 and images were not showing).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    if (!url.searchParams.has("fit")) url.searchParams.set("fit", "crop");
    return url.toString();
  }
  // Local files under /public are served as they are.
  return src;
}
