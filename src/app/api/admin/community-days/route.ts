import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listCommunityDaysAdmin } from "@/lib/community-days-store";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "community-days-admin-read", 120, 60_000);
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/admin/community-days", "GET");
    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    return NextResponse.json({ success: true, data: await listCommunityDaysAdmin(query) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Community Days indisponibles." }, { status: 500 });
  }
}
