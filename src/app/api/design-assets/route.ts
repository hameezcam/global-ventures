/**
 * Design-review helper that exists only on the design/concepts-v2 branch and is
 * never merged. It returns base64 copies of specific Unsplash photos so
 * concept screenshots can show real photography. Preview deployments only,
 * and only images.unsplash.com photo ids.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (process.env.VERCEL_ENV !== "preview") return new Response("Not found", { status: 404 });
  const ids = (new URL(req.url).searchParams.get("ids") ?? "")
    .split(",")
    .filter((id) => /^photo-[0-9]{10,13}-[0-9a-f]{12}$/.test(id))
    .slice(0, 20);
  const w = Math.min(Number(new URL(req.url).searchParams.get("w") ?? 1400) || 1400, 2000);
  const out: Record<string, { ok: boolean; status?: number; b64?: string }> = {};
  await Promise.all(
    ids.map(async (id) => {
      try {
        const r = await fetch(`https://images.unsplash.com/${id}?auto=format&fm=jpg&fit=crop&w=${w}&q=62`);
        if (!r.ok) return void (out[id] = { ok: false, status: r.status });
        out[id] = { ok: true, b64: Buffer.from(await r.arrayBuffer()).toString("base64") };
      } catch {
        out[id] = { ok: false };
      }
    })
  );
  return Response.json(out, { headers: { "cache-control": "no-store" } });
}
