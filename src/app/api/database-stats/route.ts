import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDashboardStoreStats, recordDashboardApiCall } from "@/lib/dashboard-store";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function GET() {
  const session = await getSession();

  if (!session) {
    return json({ error: "Accès dashboard requis." }, { status: 401 });
  }

  try {
    await recordDashboardApiCall(session.email, "/api/database-stats", "GET");
    return json({ data: await getDashboardStoreStats(session.email) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stats MongoDB indisponibles.";
    return json({ error: message }, { status: 500 });
  }
}
