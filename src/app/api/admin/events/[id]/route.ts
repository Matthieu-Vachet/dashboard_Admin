import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  deletePokemonEvent,
  recordDashboardApiCall,
  updatePokemonEvent,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Event Pokémon GO indisponible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ success: false, error: message }, { status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    rateLimit(request, "pokemon-events-update", 100, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ success: false, error: "Accès dashboard requis." }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertJsonPayloadSize(body, 500_000);
    const { id } = await params;
    await recordDashboardApiCall(session.email, "/api/admin/events/:id", "PATCH");

    const event = await updatePokemonEvent(session.email, decodeURIComponent(id), body);
    return json({ success: true, data: { event } });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    rateLimit(request, "pokemon-events-delete", 45, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ success: false, error: "Accès dashboard requis." }, { status: 401 });

    const { id } = await params;
    await recordDashboardApiCall(session.email, "/api/admin/events/:id", "DELETE");
    const result = await deletePokemonEvent(decodeURIComponent(id));

    return json({ success: true, data: result });
  } catch (error) {
    return serverError(error);
  }
}
