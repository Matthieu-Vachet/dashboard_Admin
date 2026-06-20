import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const defaultHealthUrl = "https://pokemon-go-api.vercel.app/health";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function GET() {
  const session = await getSession();
  if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });

  const healthUrl = process.env.POKEMON_API_HEALTH_URL || defaultHealthUrl;

  try {
    let health = await fetchHealth(healthUrl);

    if (!health.connected) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      health = await fetchHealth(healthUrl);
    }

    return json({
      data: {
        connected: health.connected,
        api: health.apiOk ? "ok" : "degraded",
        database: health.database,
        statusCode: health.statusCode,
        uptimeSeconds: health.data.uptimeSeconds ?? null,
        timestamp: health.data.timestamp ?? null,
        label: health.connected
          ? "API + DB connectées"
          : health.apiOk
            ? "API en ligne, DB à vérifier"
            : "API à vérifier",
        docsUrl: process.env.POKEMON_API_DOCS_URL || "https://pokemon-go-api.vercel.app/api-docs",
        swaggerUrl: process.env.POKEMON_API_SWAGGER_URL || "https://pokemon-go-api.vercel.app/swagger",
      },
    });
  } catch (error) {
    return json({
      data: {
        connected: false,
        api: "error",
        database: "unknown",
        statusCode: null,
        uptimeSeconds: null,
        timestamp: null,
        label: "API indisponible",
        detail: error instanceof Error ? error.message : "Erreur inconnue.",
        docsUrl: process.env.POKEMON_API_DOCS_URL || "https://pokemon-go-api.vercel.app/api-docs",
        swaggerUrl: process.env.POKEMON_API_SWAGGER_URL || "https://pokemon-go-api.vercel.app/swagger",
      },
    });
  }
}

async function fetchHealth(healthUrl: string) {
  const response = await fetch(healthUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(9000),
    headers: { accept: "application/json" },
  });
  const payload = await response.json().catch(() => ({}));
  const data = payload.data || {};
  const database = String(data.database || "unknown");
  const apiOk = response.ok && data.status === "ok";
  const connected = apiOk && database === "connected";

  return {
    apiOk,
    connected,
    database,
    data,
    statusCode: response.status,
  };
}
