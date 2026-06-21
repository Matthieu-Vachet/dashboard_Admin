import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { fetchPokemonMetrics } from "@/lib/pokemon";
import { rateLimit } from "@/lib/security";

export async function GET(request: Request) {
  try {
    rateLimit(request, "pokemon-stats", 120, 60_000);
    const session = await getSession();
    if (session) await recordDashboardApiCall(session.email, "/api/pokemon-stats", "GET");
    const metrics = await fetchPokemonMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    const status =
      error && typeof error === "object" && "status" in error
        ? Number((error as { status?: unknown }).status) || 500
        : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Stats Pokémon indisponibles." },
      { status },
    );
  }
}
