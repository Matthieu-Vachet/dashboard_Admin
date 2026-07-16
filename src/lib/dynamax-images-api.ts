import { getSession } from "./auth";
import { recordDashboardApiCall } from "./dashboard-store";

const apiBase = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";

function adminSecret() {
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) {
    const error = new Error("POKEMON_API_ADMIN_SECRET est requis côté serveur.");
    (error as Error & { status?: number }).status = 500;
    throw error;
  }
  return secret;
}

export async function requireDynamaxAdmin(endpoint: string) {
  const session = await getSession();
  if (!session) {
    const error = new Error("Accès dashboard requis.");
    (error as Error & { status?: number }).status = 401;
    throw error;
  }
  await recordDashboardApiCall(session.email, endpoint, "GET");
  return session;
}

export async function callDynamaxApi(path: string, method: "GET" | "POST" | "DELETE" = "GET") {
  const response = await fetch(new URL(`/api/v1/admin/dynamax-images${path}`, apiBase), {
    method,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(method === "POST" ? 58_000 : 25_000),
    headers: { "x-api-admin-secret": adminSecret(), accept: path.endsWith(".zip") ? "application/zip" : "application/json" },
  });
  return response;
}

export function routeError(error: unknown) {
  const status = error && typeof error === "object" && "status" in error ? Number((error as { status?: unknown }).status) || 500 : 500;
  return Response.json({ success: false, error: error instanceof Error ? error.message : "Service Dynamax indisponible." }, { status, headers: { "Cache-Control": "private, no-store" } });
}
