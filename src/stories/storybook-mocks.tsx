import type { Decorator } from "@storybook/nextjs-vite";
import {
  sampleAdminBootstrap,
  sampleApiHealth,
  sampleAssetAudit,
  sampleCatalog,
  sampleHistory,
  samplePokemonDetail,
  samplePokemonMetrics,
  sampleSourceWatch,
} from "./mock-data";

let originalFetch: typeof fetch | null = null;

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function mockFetch(input: RequestInfo | URL, init?: RequestInit) {
  const rawUrl =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;
  const url = new URL(rawUrl, "http://storybook.local");

  if (url.pathname === "/api/pokemon-stats") {
    return Promise.resolve(response(samplePokemonMetrics));
  }

  if (url.pathname === "/api/pokemon-api-health") {
    return Promise.resolve(response({ data: sampleApiHealth }));
  }

  if (url.pathname === "/api/pokemon-api-proxy") {
    return Promise.resolve(
      response({
        data: {
          path: url.searchParams.get("path") || "/health",
          url: "https://pokemon-go-api.vercel.app/health",
          status: 200,
          ok: true,
          durationMs: 142,
          contentType: "application/json",
          body: { data: { status: "ok", database: "connected", uptimeSeconds: 542 } },
        },
      }),
    );
  }

  if (url.pathname === "/api/dashboard-store") {
    if (init?.method === "PUT") {
      return Promise.resolve(response({ data: { configured: true } }));
    }

    return Promise.resolve(response({ data: { configured: false, value: null } }));
  }

  if (url.pathname === "/api/pokemon-admin") {
    const action = url.searchParams.get("action") || "bootstrap";

    if (action === "session") return Promise.resolve(response({ data: { authenticated: true } }));
    if (action === "catalog") return Promise.resolve(response({ data: sampleCatalog }));
    if (action === "assets") return Promise.resolve(response({ data: sampleAssetAudit }));
    if (action === "history") return Promise.resolve(response({ data: sampleHistory }));
    if (action === "source-watch") return Promise.resolve(response({ data: sampleSourceWatch }));
    if (action === "detail") return Promise.resolve(response({ data: { detail: samplePokemonDetail } }));

    return Promise.resolve(response({ data: sampleAdminBootstrap }));
  }

  return originalFetch
    ? originalFetch(input as RequestInfo, init)
    : Promise.resolve(response({ error: `Endpoint mock non défini: ${url.pathname}` }, 404));
}

function installMockFetch() {
  if (typeof window === "undefined" || originalFetch) return;
  originalFetch = globalThis.fetch.bind(globalThis) as typeof fetch;
  globalThis.fetch = mockFetch as typeof fetch;
}

export const withMockedDashboardFetch: Decorator = (Story) => {
  installMockFetch();
  return <Story />;
};

export const withDarkCanvas: Decorator = (Story) => (
  <div className="min-h-screen bg-[#05060d] p-4 text-foreground">
    <Story />
  </div>
);
