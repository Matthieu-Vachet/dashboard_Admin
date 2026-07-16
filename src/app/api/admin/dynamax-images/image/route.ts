import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/security";
import { callDynamaxApi, requireDynamaxAdmin, routeError } from "@/lib/dynamax-images-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "dynamax-images-binary", 600, 60_000);
    await requireDynamaxAdmin("/api/admin/dynamax-images/image");
    const filename = request.nextUrl.searchParams.get("file") || "";
    if (!/^[a-z0-9][a-z0-9._-]{0,180}$/i.test(filename)) return Response.json({ success: false, error: "Nom de fichier invalide." }, { status: 400 });
    const upstream = await callDynamaxApi(`?file=${encodeURIComponent(filename)}`);
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": upstream.headers.get("content-type") || "application/octet-stream", "Cache-Control": "private, max-age=300", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    return routeError(error);
  }
}
