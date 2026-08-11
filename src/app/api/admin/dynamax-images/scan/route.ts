import { after, NextRequest } from "next/server";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-scan", 4, 60_000);
    assertSameOrigin(request);
    await requireDynamaxAdmin("/api/admin/dynamax-images/scan");
    const startedAt = new Date().toISOString();
    after(async () => {
      try {
        let continuation: Record<string, unknown> | undefined;
        for (let step = 0; step < 64; step += 1) {
          const upstream = await callDynamaxApi("/scan", "POST", continuation ? { continuation } : {});
          const payload = await upstream.json().catch(() => ({})) as {
            data?: { status?: string; continuation?: Record<string, unknown> };
            error?: unknown;
          };
          if (!upstream.ok) {
            console.error(`[dynamax-images] Étape ${step + 1} terminée avec HTTP ${upstream.status}.`, payload.error || "");
            return;
          }
          if (payload.data?.status !== "running") return;
          continuation = payload.data.continuation;
          if (!continuation) {
            console.error("[dynamax-images] Étape sans curseur de reprise.");
            return;
          }
        }
        console.error("[dynamax-images] Nombre maximal d'étapes de reprise dépassé.");
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
