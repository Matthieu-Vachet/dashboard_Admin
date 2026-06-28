import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createDashboardBacklogTicket,
  listDashboardBacklogTickets,
  recordDashboardApiCall,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Backlog dashboard indisponible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "dashboard-backlog-read", 180, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-backlog", "GET");

    return json({ data: await listDashboardBacklogTickets(session.email) });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "dashboard-backlog-write", 90, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-backlog", "POST");

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertJsonPayloadSize(body);
    const ticket = await createDashboardBacklogTicket(session.email, body);

    return json({ data: { ticket } }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
