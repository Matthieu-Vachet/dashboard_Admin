import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

const baseUrl = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";
const allowedPaths = [
  "/health",
  "/api-docs.json",
  "/api/checklist-v3",
  "/api/v1",
  "/api/v1/pokemon",
  "/api/v1/moves",
  "/api/v1/types",
  "/api/v1/weather",
  "/api/v1/regions",
  "/api/v1/meta/filters",
];
const privateChecklistActions = new Set(["source-watch", "history", "url-audit"]);

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function safePath(value: string) {
  const path = value.trim() || "/health";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const pathname = new URL(normalized, baseUrl).pathname;
  const allowed = allowedPaths.some((allowedPath) => {
    return pathname === allowedPath || pathname.startsWith(`${allowedPath}/`);
  });

  if (!allowed) {
    const error = new Error("Endpoint Pokémon non autorisé dans le testeur.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  return normalized;
}

function shouldAttachAdminSecret(path: string) {
  const target = new URL(path, baseUrl);
  if (target.pathname !== "/api/checklist-v3") return false;
  return privateChecklistActions.has(target.searchParams.get("action") || "");
}

function pokemonApiHeaders(path: string) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (!shouldAttachAdminSecret(path)) return headers;

  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) {
    const error = new Error(
      "POKEMON_API_ADMIN_SECRET doit être défini côté serveur pour appeler cette route Pokémon privée.",
    );
    (error as Error & { status?: number }).status = 500;
    throw error;
  }

  headers["x-api-admin-secret"] = secret;
  return headers;
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
      headers: pokemonApiHeaders(path),
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
