import { NextRequest } from "next/server";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-scan", 4, 60_000);
    assertSameOrigin(request);
    await requireDynamaxAdmin("/api/admin/dynamax-images/scan");
    const upstream = await callDynamaxApi("/scan", "POST");
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" } });
  } catch (error) {
    return routeError(error);
  }
}
