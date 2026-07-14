import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

const baseUrl = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";
const systemPaths = new Set(["/health", "/api-docs.json", "/api/checklist-v3", "/api/v1"]);
const adminPaths = new Set([
  "/api/v1/admin/raids/regenerate", "/api/v1/admin/eggs/regenerate", "/api/v1/admin/max-battles/regenerate",
  "/api/v1/admin/rocket/regenerate", "/api/v1/admin/research/regenerate", "/api/v1/admin/shiny/regenerate",
  "/api/v1/admin/pvp-rankings/regenerate",
  "/api/v1/admin/best-attackers/regenerate",
  "/api/v1/admin/pokemon-identity-mappings/regenerate",
]);
const privateChecklistActions = new Set(["source-watch", "history", "url-audit"]);

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function pathPattern(path: string) {
  return new RegExp(`^${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\{[^}]+\\\}/g, "[^/]+")}$`);
}

async function publicOpenApiPaths() {
  const response = await fetch(new URL("/api-docs.json", baseUrl), { cache: "no-store", signal: AbortSignal.timeout(8_000) });
  const specification = await response.json() as { paths?: Record<string, unknown> };
  return Object.keys(specification.paths || {});
}

async function safePath(value: string) {
  const path = value.trim() || "/health";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const pathname = new URL(normalized, baseUrl).pathname;
  const publicPaths = await publicOpenApiPaths();
  const allowed = systemPaths.has(pathname)
    || adminPaths.has(pathname)
    || publicPaths.some((allowedPath) => pathPattern(allowedPath).test(pathname));

  if (!allowed) {
    const error = new Error("Endpoint Pokémon non autorisé dans le testeur.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  return normalized;
}

function shouldAttachAdminSecret(path: string) {
  const target = new URL(path, baseUrl);
  if (target.pathname.startsWith("/api/v1/admin/")) return true;
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

async function execute(request: NextRequest, method: "GET" | "POST") {
  try {
    rateLimit(request, "pokemon-api-proxy", 60, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/pokemon-api-proxy", "GET");

    const requestBody = method === "POST" ? await request.json().catch(() => ({})) as { path?: string; body?: unknown } : null;
    const path = await safePath(requestBody?.path || request.nextUrl.searchParams.get("path") || "/health");
    const target = new URL(path, baseUrl);
    const startedAt = Date.now();
    const response = await fetch(target, {
      method,
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
      headers: { ...pokemonApiHeaders(path), ...(method === "POST" ? { "content-type": "application/json" } : {}) },
      body: method === "POST" ? JSON.stringify(requestBody?.body || {}) : undefined,
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

export async function GET(request: NextRequest) {
  return execute(request, "GET");
}

export async function POST(request: NextRequest) {
  return execute(request, "POST");
}
