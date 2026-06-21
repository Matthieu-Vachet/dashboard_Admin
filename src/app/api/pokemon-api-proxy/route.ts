import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

const baseUrl = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";
const allowedPaths = [
  "/health",
  "/api-docs.json",
  "/api/v1",
  "/api/v1/pokemon",
  "/api/v1/moves",
  "/api/v1/types",
  "/api/v1/weather",
  "/api/v1/regions",
  "/api/v1/meta/sync",
];

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function safePath(value: string) {
  const path = value.trim() || "/health";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const allowed = allowedPaths.some(
    (allowedPath) => normalized === allowedPath || normalized.startsWith(`${allowedPath}/`),
  );

  if (!allowed) {
    const error = new Error("Endpoint Pokémon non autorisé dans le testeur.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  return normalized;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-api-proxy", 60, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/pokemon-api-proxy", "GET");

    const path = safePath(request.nextUrl.searchParams.get("path") || "/health");
    const target = new URL(path, baseUrl);
    const startedAt = Date.now();
    const response = await fetch(target, {
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
      headers: { accept: "application/json" },
    });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await response.json().catch(() => null)
      : await response.text().catch(() => "");

    return json({
      data: {
        path,
        url: target.toString(),
        status: response.status,
        ok: response.ok,
        durationMs: Date.now() - startedAt,
        contentType,
        body,
      },
    });
  } catch (error) {
    const status =
      error && typeof error === "object" && "status" in error
        ? Number((error as { status?: unknown }).status) || 500
        : 500;

    return json(
      {
        error: error instanceof Error ? error.message : "Erreur test endpoint Pokémon.",
      },
      { status },
    );
  }
}
