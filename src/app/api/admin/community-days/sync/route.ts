import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { synchronizeCommunityDays } from "@/lib/community-days-store";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "community-days-sync", 6, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/admin/community-days/sync", "POST");
    return NextResponse.json({ success: true, data: await synchronizeCommunityDays() }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Synchronisation Community Days indisponible." }, { status: 500 });
  }
}
