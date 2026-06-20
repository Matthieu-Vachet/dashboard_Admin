"use client";

import { useState } from "react";
import { Play, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const endpoints = [
  { label: "Santé API + DB", path: "/health" },
  { label: "OpenAPI JSON", path: "/api-docs.json" },
  { label: "Index API v1", path: "/api/v1" },
  { label: "Pokémon", path: "/api/v1/pokemon?limit=3" },
  { label: "Bulbizarre", path: "/api/v1/pokemon/bulbasaur" },
  { label: "Attaques", path: "/api/v1/moves?limit=3" },
  { label: "Types", path: "/api/v1/types" },
  { label: "Météo", path: "/api/v1/weather" },
  { label: "Régions", path: "/api/v1/regions" },
  { label: "Dernière sync", path: "/api/v1/meta/sync" },
];

type ApiResult = {
  path: string;
  url: string;
  status: number;
  ok: boolean;
  durationMs: number;
  contentType: string;
  body: unknown;
};

export function PokemonApiExplorer() {
  const [path, setPath] = useState(endpoints[0].path);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/pokemon-api-proxy?path=${encodeURIComponent(path)}`, {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Endpoint indisponible.");
        return;
      }

      setResult(payload.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4">
      <CardHeader
        eyebrow="Test endpoints"
        action={<Badge tone={result?.ok ? "green" : error ? "red" : "cyan"}>{result ? `HTTP ${result.status}` : "Prêt"}</Badge>}
      >
        <CardTitle>API Explorer Pokémon</CardTitle>
        <CardDescription>Teste les points API publics depuis ton dashboard admin.</CardDescription>
      </CardHeader>

      <div className="mt-4 grid gap-3 lg:grid-cols-[260px_1fr_auto]">
        <select
          className="min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
          value={path}
          onChange={(event) => setPath(event.target.value)}
        >
          {endpoints.map((endpoint) => (
            <option key={endpoint.path} value={endpoint.path}>
              {endpoint.label}
            </option>
          ))}
        </select>
        <input
          className="min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 font-mono text-sm font-semibold outline-none"
          value={path}
          onChange={(event) => setPath(event.target.value)}
        />
        <Button variant="primary" type="button" icon={<Play size={16} />} onClick={run} disabled={loading}>
          {loading ? "Test..." : "Lancer"}
        </Button>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-danger/35 bg-danger/12 p-3 text-sm font-bold text-rose-100">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-4 grid gap-3 xl:grid-cols-[280px_1fr]">
          <div className="space-y-2 rounded-lg border border-line bg-white/[0.04] p-3">
            <StatusLine label="Statut" value={`HTTP ${result.status}`} />
            <StatusLine label="Durée" value={`${result.durationMs} ms`} />
            <StatusLine label="Type" value={result.contentType || "?"} />
            <StatusLine label="URL" value={result.url} />
          </div>
          <pre className="max-h-96 overflow-auto rounded-lg border border-line bg-slate-950/75 p-4 font-mono text-xs leading-6 text-cyan-50">
            <code>{JSON.stringify(result.body, null, 2)}</code>
          </pre>
        </div>
      ) : (
        <div className="mt-4 grid min-h-28 place-items-center rounded-lg border border-dashed border-line bg-white/[0.025] text-center text-sm font-bold text-muted">
          <span className="inline-flex items-center gap-2">
            <Server size={16} />
            Sélectionne un endpoint puis lance un test.
          </span>
        </div>
      )}
    </Card>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <strong className="break-all text-sm font-black text-foreground">{value}</strong>
    </div>
  );
}
