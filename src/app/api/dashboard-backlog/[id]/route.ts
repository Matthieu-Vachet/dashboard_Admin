import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  deleteDashboardBacklogTicket,
  recordDashboardApiCall,
  updateDashboardBacklogTicket,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Ticket backlog indisponible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ error: message }, { status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    rateLimit(request, "dashboard-backlog-update", 120, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-backlog/:id", "PATCH");

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertJsonPayloadSize(body);
    const { id } = await params;
    const ticket = await updateDashboardBacklogTicket(session.email, id, body);

    return json({ data: { ticket } });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    rateLimit(request, "dashboard-backlog-delete", 45, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-backlog/:id", "DELETE");

    const { id } = await params;
    const result = await deleteDashboardBacklogTicket(session.email, id);

    return json({ data: result });
  } catch (error) {
    return serverError(error);
  }
}
