import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { fetchPokemonMetrics } from "@/lib/pokemon";

export async function GET() {
  const session = await getSession();
  if (session) await recordDashboardApiCall(session.email, "/api/pokemon-stats", "GET");
  const metrics = await fetchPokemonMetrics();
  return NextResponse.json(metrics);
}
