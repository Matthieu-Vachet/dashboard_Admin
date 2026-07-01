import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createPokemonEvent, recordDashboardApiCall } from "@/lib/dashboard-store";
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

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-events-write", 80, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ success: false, error: "Accès dashboard requis." }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    assertJsonPayloadSize(body, 500_000);
    await recordDashboardApiCall(session.email, "/api/admin/events", "POST");

    const event = await createPokemonEvent(session.email, body);
    return json({ success: true, data: { event } }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
