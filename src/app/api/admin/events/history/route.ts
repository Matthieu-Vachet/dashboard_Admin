import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listDatasetRuns, recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-events-history", 120, 60_000);
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/admin/events/history", "GET");
    const result = await listDatasetRuns("events-calendar", {
      page: Number(request.nextUrl.searchParams.get("page")) || 1,
      limit: Number(request.nextUrl.searchParams.get("limit")) || 20,
      status: request.nextUrl.searchParams.get("status") || undefined,
    });
    return NextResponse.json({ success: true, data: result }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Historique indisponible." }, { status: 500 });
  }
}
