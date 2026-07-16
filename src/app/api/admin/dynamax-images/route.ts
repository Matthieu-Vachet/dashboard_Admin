import { NextRequest } from "next/server";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-read", 120, 60_000);
    await requireDynamaxAdmin("/api/admin/dynamax-images");
    const upstream = await callDynamaxApi("");
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": upstream.headers.get("content-type") || "application/json", "Cache-Control": "private, no-store" } });
  } catch (error) {
    return routeError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-cache", 10, 60_000);
    assertSameOrigin(request);
    await requireDynamaxAdmin("/api/admin/dynamax-images/cache");
    const upstream = await callDynamaxApi("/cache", "DELETE");
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" } });
  } catch (error) {
    return routeError(error);
  }
}
