"use client";

import { ExternalLink, RefreshCcw, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { pokemonAdminApiPath } from "@/services/admin/pokemon-admin-api";
import { fieldClass, Panel } from "./admin-ui";

type AuditKind = "available" | "shiny" | "costume" | "shadow";
type AuditRow = {
  sourceKey?: string;
  localKey?: string;
  dexId?: string;
  sourceName?: string;
  localName?: string;
  sourceForm?: string | null;
  localForm?: string | null;
  sourceCostume?: string | null;
  localCostume?: string | null;
  sourceInfo?: string | null;
  status: string;
  diagnostics?: string[];
  image?: string | null;
  shinyImage?: string | null;
};
type AuditPayload = {
  kind: AuditKind;
  source: { name?: string; url?: string; status?: string; fetchedAt?: string; sourceUpdatedAt?: string | null; error?: string };
  provenance?: { rawSha256?: string | null; writePolicy?: string };
  stats?: Record<string, number>;
  rows?: AuditRow[];
};

const labels: Record<AuditKind, { eyebrow: string; title: string; description: string }> = {
  available: { eyebrow: "Disponibilité", title: "Pokémon disponibles", description: "Compare les Pokémon déclarés introuvables par la source avec availability.released." },
  shiny: { eyebrow: "Chromatique", title: "Pokémon chromatiques", description: "Compare la liste chromatique externe avec availability.shinyReleased et les images locales." },
  costume: { eyebrow: "Costumes", title: "Costumes Pokémon", description: "Compare les variantes sur la clé dexId + forme + costume; le sexe reste une dimension d'asset." },
  shadow: { eyebrow: "Shadow", title: "Pokémon Shadow", description: "Compare les disponibilités Shadow et Shiny Shadow avec le contrat local." },
};
const statusLabels: Record<string, string> = {
  "up-to-date": "À jour",
  divergence: "Divergence",
  "external-only": "Externe seulement",
  "local-only": "Local seulement",
  ambiguous: "Ambigu",
};
const statusTones: Record<string, string> = {
  "up-to-date": "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  divergence: "border-rose-300/25 bg-rose-400/10 text-rose-100",
  "external-only": "border-amber-300/25 bg-amber-400/10 text-amber-100",
  "local-only": "border-sky-300/25 bg-sky-400/10 text-sky-100",
  ambiguous: "border-violet-300/25 bg-violet-400/10 text-violet-100",
};

async function fetchAudit(kind: AuditKind) {
  const params = new URLSearchParams({ action: "pokemon-release-audit", kind });
  const response = await fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Audit indisponible.");
  return result.data as AuditPayload;
}

export function PokemonReleaseAuditPanel({ kind, localEntries = [], onOpenPokemon }: { kind: AuditKind; localEntries?: Array<Record<string, unknown>>; onOpenPokemon?: (entry: Record<string, unknown>) => void }) {
  const [payload, setPayload] = useState<AuditPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("status");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setPayload(await fetchAudit(kind));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Audit indisponible.");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    let cancelled = false;
    fetchAudit(kind)
      .then((result) => {
        if (!cancelled) setPayload(result);
      })
      .catch((cause) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Audit indisponible.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [kind]);

  const visibleRows = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return [...(payload?.rows || [])]
      .filter((row) => status === "all" || row.status === status)
      .filter((row) => !needle || [row.dexId, row.sourceName, row.localName, row.sourceForm, row.localForm, row.sourceCostume, row.localCostume, ...(row.diagnostics || [])].filter(Boolean).join(" ").toLocaleLowerCase("fr").includes(needle))
      .sort((left, right) => sort === "dex"
        ? String(left.dexId || "").localeCompare(String(right.dexId || ""), "fr", { numeric: true })
        : sort === "name"
          ? String(left.localName || left.sourceName || "").localeCompare(String(right.localName || right.sourceName || ""), "fr")
          : String(left.status).localeCompare(String(right.status)));
  }, [payload?.rows, query, sort, status]);

  const localByKey = useMemo(() => new Map(localEntries.map((entry) => [String(entry.key || ""), entry])), [localEntries]);
  const view = labels[kind];
  if (loading && !payload) return <FetchLoadingState title={`Audit ${view.title} en cours…`} />;
  if (error) return <ErrorState title="Centre de contrôle indisponible" message={error} action={<Button icon={<RefreshCcw size={16} />} onClick={() => void load()}>Réessayer</Button>} />;
  if (payload?.source.status === "source-unavailable") return <ErrorState title="Source externe indisponible" message={payload.source.error || "La source n'a pas répondu. Aucun écart n'a été créé."} action={<Button icon={<RefreshCcw size={16} />} onClick={() => void load()}>Relancer</Button>} />;

  return (
    <Panel title={view.title} eyebrow={view.eyebrow} action={<Button icon={<RefreshCcw className={loading ? "animate-spin" : ""} size={16} />} disabled={loading} onClick={() => void load()}>Relancer</Button>}>
      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold text-cyan-50/90">
        <p>{view.description}</p>
        <p className="mt-2 text-cyan-100/70">Lecture seule : aucune divergence ne modifie les JSON locaux automatiquement.</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[["Lignes", payload?.stats?.total || 0], ["À jour", payload?.stats?.["up-to-date"] || 0], ["Divergences", payload?.stats?.divergence || 0], ["Externe", payload?.stats?.["external-only"] || 0], ["Local", payload?.stats?.["local-only"] || 0]].map(([label, value]) => <div className="rounded-2xl border border-line bg-surface-faint p-3" key={String(label)}><small className="type-overline text-muted">{label}</small><strong className="mt-1 block font-mono text-2xl text-domain-foreground">{value}</strong></div>)}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>{payload?.source.name}</span>
        {payload?.source.url ? <a className="inline-flex items-center gap-1 font-black text-cyan-100" href={payload.source.url} target="_blank" rel="noreferrer">Ouvrir la source <ExternalLink size={13} /></a> : null}
        <span>· empreinte {payload?.provenance?.rawSha256?.slice(0, 12) || "absente"}</span>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_13rem_13rem]">
        <label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disabled" size={16} /><Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pokémon, forme, costume…" /></label>
        <Select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filtrer le statut"><option value="all">Tous les statuts</option>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</Select>
        <Select className={fieldClass} value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Trier l'audit"><option value="status">Statut</option><option value="dex">Numéro</option><option value="name">Nom</option></Select>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        {visibleRows.map((row, index) => {
          const localEntry = row.localKey ? localByKey.get(row.localKey) : null;
          const rowKey = [row.sourceKey, row.localKey, row.sourceName, row.sourceForm, row.sourceCostume, row.sourceInfo, index].filter((value) => value !== null && value !== undefined && value !== "").join(":");
          return <article className="grid gap-3 border-b border-line bg-surface-faint p-3 last:border-b-0 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_10rem] md:items-center" key={rowKey}>
            <strong className="font-mono text-cyan-100">#{row.dexId || "—"}</strong>
            <span className="min-w-0"><small className="type-overline text-disabled">Externe</small><strong className="block truncate text-domain-foreground">{row.sourceName || "Non rapproché"}</strong><span className="block truncate text-xs text-muted">{row.sourceCostume || row.sourceForm || row.sourceInfo || "—"}</span></span>
            <span className="min-w-0"><small className="type-overline text-disabled">Local</small>{localEntry && onOpenPokemon ? <button className="block truncate font-black text-cyan-100 hover:underline" type="button" onClick={() => onOpenPokemon(localEntry)}>{row.localName || "Ouvrir la fiche"}</button> : <strong className="block truncate text-domain-foreground">{row.localName || "Absent"}</strong>}<span className="block truncate text-xs text-muted">{row.localCostume || row.localForm || row.diagnostics?.join(" · ") || "—"}</span></span>
            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-black ${statusTones[row.status] || "border-line bg-surface-control text-muted"}`}>{statusLabels[row.status] || row.status}</span>
          </article>;
        })}
        {!visibleRows.length ? <EmptyState title="Aucune ligne dans ce filtre" /> : null}
      </div>
    </Panel>
  );
}
