import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { synchronizeCommunityDays } from "@/lib/community-days-store";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { adminActionErrorPayload } from "@/lib/admin-action-errors";
import { adminOperationId, logAdminOperation } from "@/lib/admin-action-observability";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const operationId = adminOperationId(request, "community-days-sync");
  const startedAt = Date.now();
  logAdminOperation({ operationId, action: "community-days-sync", provider: "pogoapi", phase: "start", startedAt });
  try {
    rateLimit(request, "community-days-sync", 6, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) throw Object.assign(new Error("Accès dashboard requis."), { status: 401, code: "DASHBOARD_AUTH_REQUIRED" });
    await recordDashboardApiCall(session.email, "/api/admin/community-days/sync", "POST");
    const data = await synchronizeCommunityDays();
    const runStatus = data.sourceRun?.status;
    const phase = runStatus === "partial" ? "partial" : runStatus === "unchanged" ? "warning" : "success";
    logAdminOperation({ operationId, action: "community-days-sync", provider: "pogoapi", phase, startedAt, durationMs: Date.now() - startedAt, diagnostics: { total: data.total, added: data.added, modified: data.modified, unmatched: data.unmatched } });
    return NextResponse.json({ success: true, operationId, data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    logAdminOperation({ operationId, action: "community-days-sync", provider: "pogoapi", phase: "failed", startedAt, durationMs: Date.now() - startedAt, error });
    const normalized = adminActionErrorPayload(error, operationId, "Synchronisation Community Days indisponible.");
    return NextResponse.json(normalized.body, { status: normalized.status, headers: { "Cache-Control": "private, no-store" } });
  }
}
