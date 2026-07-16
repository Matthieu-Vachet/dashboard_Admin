import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listEventsArchiveAdmin } from "@/lib/events-archive-store";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "events-archive-admin-read", 120, 60_000);
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/admin/events/archive", "GET");
    return NextResponse.json({ success: true, data: await listEventsArchiveAdmin(Object.fromEntries(request.nextUrl.searchParams.entries())) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Archive Events indisponible." }, { status: 500 });
  }
}
