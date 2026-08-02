import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";
import { privateEndpointFor, type PokemonApiMethod } from "@/lib/pokemon-api-private-registry";

const baseUrl = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";
const systemPaths = new Set(["/health", "/api-docs.json", "/api/checklist-v3", "/api/v1"]);
const privateChecklistActions = new Set(["source-watch", "history", "url-audit"]);

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function pathPattern(path: string) {
  return new RegExp(`^${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\{[^}]+\\\}/g, "[^/]+")}$`);
}

async function publicOpenApiOperations() {
  const response = await fetch(new URL("/api-docs.json", baseUrl), { cache: "no-store", signal: AbortSignal.timeout(8_000) });
  const specification = await response.json() as { paths?: Record<string, Record<string, unknown>> };
  return Object.entries(specification.paths || {}).flatMap(([path, methods]) =>
    Object.keys(methods).filter((method) => ["get", "post", "patch", "delete"].includes(method)).map((method) => ({ path, method: method.toUpperCase() as PokemonApiMethod })),
  );
}

async function safePath(value: string, method: PokemonApiMethod) {
  const path = value.trim() || "/health";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const trustedBase = new URL(baseUrl);
  const candidate = new URL(normalized, trustedBase);
  if (candidate.origin !== trustedBase.origin) {
    const error = new Error("Origine Pokémon non autorisée dans le testeur.");
    Object.assign(error, { status: 400 });
    throw error;
  }
  const pathname = candidate.pathname;
  const publicOperations = await publicOpenApiOperations();
  const allowed = (method === "GET" && systemPaths.has(pathname))
    || Boolean(privateEndpointFor(method, pathname))
    || publicOperations.some((operation) => operation.method === method && pathPattern(operation.path).test(pathname));

  if (!allowed) {
    const error = new Error("Endpoint Pokémon non autorisé dans le testeur.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  return `${pathname}${candidate.search}`;
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

async function execute(request: NextRequest, transportMethod: "GET" | "POST") {
  try {
    rateLimit(request, "pokemon-api-proxy", 60, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    const requestBody = transportMethod === "POST" ? await request.json().catch(() => ({})) as { path?: string; method?: PokemonApiMethod; body?: unknown } : null;
    const method = transportMethod === "POST" ? String(requestBody?.method || "POST").toUpperCase() as PokemonApiMethod : "GET";
    if (!["GET", "POST", "PATCH", "DELETE"].includes(method)) return json({ error: "Méthode Pokémon non autorisée." }, { status: 400 });
    await recordDashboardApiCall(session.email, "/api/pokemon-api-proxy", method);

    const path = await safePath(requestBody?.path || request.nextUrl.searchParams.get("path") || "/health", method);
    const target = new URL(path, baseUrl);
    const startedAt = Date.now();
    const response = await fetch(target, {
      method,
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
      headers: { ...pokemonApiHeaders(path), ...(method !== "GET" ? { "content-type": "application/json" } : {}) },
      body: method !== "GET" ? JSON.stringify(requestBody?.body || {}) : undefined,
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
        method,
        headers: Object.fromEntries(["cache-control", "content-type", "etag", "last-modified", "x-request-id", "x-ratelimit-limit", "x-ratelimit-remaining"].map((name) => [name, response.headers.get(name)]).filter(([, value]) => value)),
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
