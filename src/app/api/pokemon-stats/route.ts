import { NextResponse } from "next/server";
import { fetchPokemonMetrics } from "@/lib/pokemon";

export async function GET() {
  const metrics = await fetchPokemonMetrics();
  return NextResponse.json(metrics);
}
