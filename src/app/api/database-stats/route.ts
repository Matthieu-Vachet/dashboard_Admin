import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDashboardStoreStats, recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function GET(request: Request) {
  try {
    rateLimit(request, "database-stats-read", 90, 60_000);
    const session = await getSession();

    if (!session) {
      return json({ error: "Accès dashboard requis." }, { status: 401 });
    }

    await recordDashboardApiCall(session.email, "/api/database-stats", "GET");
    return json({ data: await getDashboardStoreStats(session.email) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stats MongoDB indisponibles.";
    const status =
      error && typeof error === "object" && "status" in error
        ? Number((error as { status?: unknown }).status) || 500
        : 500;
    return json({ error: message }, { status });
  }
}
