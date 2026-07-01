import { NextRequest, NextResponse } from "next/server";
import { listPokemonEvents } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Calendrier events indisponible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ success: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-events-read", 240, 60_000);
    const includeArchived = request.nextUrl.searchParams.get("includeArchived") === "1";
    const data = await listPokemonEvents({ includeArchived });

    return json({ success: true, data });
  } catch (error) {
    return serverError(error);
  }
}
