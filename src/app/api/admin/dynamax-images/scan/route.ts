import { after, NextRequest } from "next/server";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-scan", 4, 60_000);
    assertSameOrigin(request);
    await requireDynamaxAdmin("/api/admin/dynamax-images/scan");
    const startedAt = new Date().toISOString();
    after(async () => {
      try {
        const upstream = await callDynamaxApi("/scan", "POST");
        await upstream.arrayBuffer();
        if (!upstream.ok) console.error(`[dynamax-images] Scan API terminé avec HTTP ${upstream.status}.`);
      } catch (error) {
        console.error("[dynamax-images] Fin de suivi du scan API.", error instanceof Error ? error.message : error);
      }
    });
    return Response.json(
      { success: true, data: { status: "started", startedAt } },
      { status: 202, headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return routeError(error);
  }
}
