"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, History, Play, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type OpenApiParameter = { name: string; in: "path" | "query"; required?: boolean; example?: unknown; description?: string };
type Endpoint = { id: string; method: "GET" | "POST"; path: string; testPath: string; label: string; group: string; description: string; parameters: OpenApiParameter[]; auth: boolean; visibility: "public" | "private" };
type ApiResult = { path: string; url: string; status: number; ok: boolean; durationMs: number; contentType: string; body: unknown };

const adminEndpoints: Endpoint[] = [
  ["raids", "Raids"], ["eggs", "Œufs"], ["max-battles", "Max Battles"], ["rocket", "Rocket"], ["research", "Research"],
  ["shiny", "Shiny Tracker privé"], ["pvp-rankings", "PvP Rankings"],
].map(([domain, label]) => ({ id: `POST-admin-${domain}`, method: "POST", path: `/api/v1/admin/${domain}/regenerate`, testPath: `/api/v1/admin/${domain}/regenerate`, label: `Régénérer ${label}`, group: "Admin", description: "Mutation protégée par le secret serveur.", parameters: [], auth: true, visibility: "private" }));

function examplePath(path: string, parameters: OpenApiParameter[]) {
  let result = path;
  const query = new URLSearchParams();
  for (const parameter of parameters) {
    if (parameter.example === undefined) continue;
    if (parameter.in === "path") result = result.replace(`{${parameter.name}}`, encodeURIComponent(String(parameter.example)));
    if (parameter.in === "query" && parameter.required) query.set(parameter.name, String(parameter.example));
  }
  return `${result}${query.size ? `?${query}` : ""}`;
}

function endpointsFromOpenApi(specification: Record<string, unknown>) {
  const paths = specification.paths as Record<string, Record<string, Record<string, unknown>>> | undefined;
  return Object.entries(paths || {}).flatMap(([path, methods]) => Object.entries(methods).flatMap(([method, operation]) => {
    const upper = method.toUpperCase();
    if (upper !== "GET") return [];
    const parameters = (operation.parameters || []) as OpenApiParameter[];
    const tags = operation.tags as string[] | undefined;
    return [{
      id: `${upper}-${path}`,
      method: upper,
      path,
      testPath: examplePath(path, parameters),
      label: String(operation.summary || path),
      group: tags?.[0] || "Autres",
      description: String(operation.description || operation.summary || "Endpoint public"),
      parameters,
      auth: false,
      visibility: "public",
    } satisfies Endpoint];
  }));
}

export function PokemonApiExplorer() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(adminEndpoints);
  const [selectedId, setSelectedId] = useState("");
  const [path, setPath] = useState("/health");
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [body, setBody] = useState("{}");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registryError, setRegistryError] = useState("");
  const [history, setHistory] = useState<Array<{ path: string; method: string; status: number }>>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/pokemon-api-proxy?path=${encodeURIComponent("/api-docs.json")}`, { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((payload) => {
        const publicEndpoints = endpointsFromOpenApi(payload?.data?.body || {});
        if (!publicEndpoints.length) throw new Error("OpenAPI ne contient aucun endpoint.");
        const all = [...publicEndpoints, ...adminEndpoints];
        setEndpoints(all);
        setSelectedId(all[0].id);
        setPath(all[0].testPath);
        setMethod(all[0].method);
      })
      .catch((requestError) => {
        if (requestError?.name !== "AbortError") setRegistryError(requestError instanceof Error ? requestError.message : "Registry OpenAPI indisponible.");
      });
    return () => controller.abort();
  }, []);

  const selected = endpoints.find((endpoint) => endpoint.id === selectedId);
  const grouped = useMemo(() => Object.entries(endpoints.reduce<Record<string, Endpoint[]>>((groups, endpoint) => {
    groups[endpoint.group] ||= [];
    groups[endpoint.group].push(endpoint);
    return groups;
  }, {})), [endpoints]);

  function chooseEndpoint(id: string) {
    const endpoint = endpoints.find((item) => item.id === id);
    if (!endpoint) return;
    setSelectedId(id);
    setPath(endpoint.testPath);
    setMethod(endpoint.method);
    setBody("{}");
  }

  async function run() {
    setLoading(true); setError(""); setResult(null);
    try {
      const init: RequestInit = method === "POST"
        ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ path, body: JSON.parse(body || "{}") }) }
        : { method: "GET" };
      const url = method === "GET" ? `/api/pokemon-api-proxy?path=${encodeURIComponent(path)}` : "/api/pokemon-api-proxy";
      const response = await fetch(url, { ...init, cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) { setError(payload.error || "Endpoint indisponible."); return; }
      setResult(payload.data);
      setHistory((current) => [{ path, method, status: payload.data.status }, ...current].slice(0, 6));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erreur réseau.");
    } finally { setLoading(false); }
  }

  return (
    <Card className="p-4">
      <CardHeader eyebrow="Registry OpenAPI + routes Admin" action={<Badge tone={result?.ok ? "green" : error || registryError ? "red" : "cyan"}>{endpoints.length} endpoints</Badge>}><CardTitle>API Explorer Pokémon</CardTitle><CardDescription>Tous les endpoints publics sont chargés depuis OpenAPI; les mutations Admin protégées sont ajoutées depuis le registre privé.</CardDescription></CardHeader>
      {registryError ? <p className="mt-4 flex items-center gap-2 rounded-lg border border-warning/35 bg-warning/10 p-3 text-sm font-bold text-amber-100"><AlertTriangle size={16} />{registryError}</p> : null}
      <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(16rem,23rem)_1fr_auto]">
        <select className="min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none" value={selectedId} onChange={(event) => chooseEndpoint(event.target.value)}>{grouped.map(([group, values]) => <optgroup label={group} key={group}>{(values || []).map((endpoint) => <option key={endpoint.id} value={endpoint.id}>{endpoint.method} · {endpoint.label}</option>)}</optgroup>)}</select>
        <input className="min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 font-mono text-sm font-semibold outline-none" value={path} onChange={(event) => setPath(event.target.value)} aria-label="Route à tester" />
        <Button variant="primary" type="button" icon={<Play size={16} />} onClick={run} disabled={loading}>{loading ? "Test..." : "Lancer"}</Button>
      </div>
      {selected ? <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-muted"><Badge tone={selected.visibility === "private" ? "violet" : "green"}>{selected.visibility}</Badge><Badge tone={selected.auth ? "amber" : "cyan"}>{selected.auth ? "auth serveur" : "public"}</Badge><span>{selected.description}</span>{selected.parameters.length ? <span>{selected.parameters.length} paramètre(s)</span> : null}</div> : null}
      {method === "POST" ? <textarea className="mt-3 min-h-28 w-full rounded-lg border border-line bg-slate-950/70 p-3 font-mono text-xs text-cyan-50 outline-none" value={body} onChange={(event) => setBody(event.target.value)} aria-label="Body JSON" /> : null}
      {error ? <p className="mt-4 rounded-lg border border-danger/35 bg-danger/12 p-3 text-sm font-bold text-rose-100">{error}</p> : null}
      {result ? <div className="mt-4 grid gap-3 xl:grid-cols-[280px_1fr]"><div className="space-y-2 rounded-lg border border-line bg-white/[0.04] p-3"><StatusLine label="Statut" value={`HTTP ${result.status}`} /><StatusLine label="Durée" value={`${result.durationMs} ms`} /><StatusLine label="Type" value={result.contentType || "?"} /><StatusLine label="URL" value={result.url} /></div><pre className="max-h-96 overflow-auto rounded-lg border border-line bg-slate-950/75 p-4 font-mono text-xs leading-6 text-cyan-50"><code>{JSON.stringify(result.body, null, 2)}</code></pre></div> : <div className="mt-4 grid min-h-28 place-items-center rounded-lg border border-dashed border-line bg-white/[0.025] text-center text-sm font-bold text-muted"><span className="inline-flex items-center gap-2"><Server size={16} />Sélectionne un endpoint puis lance un test.</span></div>}
      {history.length ? <section className="mt-4 rounded-lg border border-line bg-white/[0.03] p-3"><h3 className="flex items-center gap-2 text-sm font-black"><History size={16} />Tests récents</h3><div className="mt-2 grid gap-2 md:grid-cols-2 xl:grid-cols-3">{history.map((item, index) => <button className="truncate rounded-lg border border-line bg-white/[0.04] px-3 py-2 text-left font-mono text-xs" key={`${item.method}-${item.path}-${index}`} type="button" onClick={() => { setPath(item.path); setMethod(item.method as "GET" | "POST"); }}>{item.method} · {item.path} · {item.status}</button>)}</div></section> : null}
    </Card>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) { return <div className="grid gap-1"><span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span><strong className="break-all text-sm font-black text-foreground">{value}</strong></div>; }
