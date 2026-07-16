import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-export", 20, 60_000);
    await requireDynamaxAdmin("/api/admin/dynamax-images/export.zip");
    const upstream = await callDynamaxApi("/export.zip");
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/zip",
        "Content-Disposition": upstream.headers.get("content-disposition") || "attachment; filename=dynamax-images.zip",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
