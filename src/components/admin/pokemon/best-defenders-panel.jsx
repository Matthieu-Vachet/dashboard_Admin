"use client";

import { Download, ExternalLink, RefreshCcw, RotateCcw, Shield } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { DatasetSourceHeader } from "./dataset-source-header";
import { PokemonArtwork } from "./pokemon-artwork";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { executePokemonAdminRegeneration } from "@/lib/admin-pokemon-global-regeneration";
import { bestDefendersSourceIssue } from "@/lib/best-defenders-source-state.mjs";

const tiers = ["", "S", "A+", "A", "B", "C", "D"];

function pokemonName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.source?.name || "Pokémon non résolu";
}

function typeSurface(entry) {
  const color = typeColors[String(entry?.pokemon?.types?.[0] || "NORMAL").toUpperCase()] || typeColors.NORMAL;
  return { backgroundImage: `linear-gradient(115deg, ${color}24, rgba(2,6,23,.92) 62%)` };
}

function downloadJson(value, name) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name}-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function BestDefendersPanel({ onOpenPokemon, globalSearch = "", onSearchChange }) {
  const [options, setOptions] = useState({ tier: "", type: "", page: 1, limit: 100 });
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState("");
  const [sourceIssue, setSourceIssue] = useState(null);
  const requestSequence = useRef(0);

  const load = useCallback(async ({ notify = false } = {}) => {
    const sequence = requestSequence.current + 1;
    requestSequence.current = sequence;
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams({ action: "best-defenders", page: String(options.page), limit: String(options.limit) });
      const requestOptions = { ...options, search: globalSearch };
      for (const key of ["search", "tier", "type"]) if (requestOptions[key]) query.set(key, requestOptions[key]);
      const response = await fetch(`/api/pokemon-admin?${query}`, { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
      const issue = bestDefendersSourceIssue(payload.data);
      if (requestSequence.current === sequence) {
        setDataset(payload.data);
        setSourceIssue(issue);
      }
      if (notify) {
        if (issue) toast.warning(`${issue.code} · ${issue.message}`);
        else toast.success("Best Defenders actualisé.");
      }
      return issue;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Best Defenders indisponible.";
      if (requestSequence.current === sequence) setError(message);
      if (notify) toast.error(message);
      return null;
    } finally {
      if (requestSequence.current === sequence) setLoading(false);
    }
  }, [globalSearch, options]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => { void load(); });
    return () => window.cancelAnimationFrame(frame);
  }, [load]);

  async function regenerate() {
    setRegenerating(true);
    setError("");
    try {
      await executePokemonAdminRegeneration("regenerate-best-defenders");
      await load();
      toast.success("Best Defenders régénéré.");
    } catch (caught) {
      const issue = bestDefendersSourceIssue(caught) || await load();
      if (issue) {
        setSourceIssue(issue);
        setError("");
        toast.warning(`${issue.code} · ${issue.message} Le dernier snapshot MongoDB validé reste actif.`);
      } else {
        const message = caught instanceof Error ? caught.message : "Régénération Best Defenders impossible.";
        setError(message);
        toast.error(message);
      }
    } finally {
      setRegenerating(false);
    }
  }

  const entries = dataset?.data?.rankings || [];
  const meta = dataset?.meta || {};
  const setOption = (key, value) => setOptions((current) => ({ ...current, [key]: value, page: 1 }));

  return (
    <div className="min-w-0 space-y-5">
      <Panel eyebrow="Provider Pokémon GO Hub · assets canoniques locaux" title="Best Defenders" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} disabled={!dataset} onClick={() => downloadJson(dataset, "best-defenders")}>JSON</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={() => void load({ notify: true })}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={() => void regenerate()}>Régénérer</Button></div>}>
        <DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} refreshError={dataset && !sourceIssue ? error : ""} />
        {sourceIssue ? (
          <section className="mt-3 rounded-2xl border border-warning/30 bg-warning/12 p-4 text-warning-foreground" role="status" data-source-availability={sourceIssue.code}>
            <strong className="block type-label">{sourceIssue.code} · {sourceIssue.title}</strong>
            <p className="mt-1 type-body-strong">{sourceIssue.message}</p>
            <p className="mt-1 type-caption-strong">{dataset ? "La dernière version MongoDB validée reste affichée ; aucune donnée n’a été remplacée." : sourceIssue.preservation}</p>
          </section>
        ) : null}
        <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.07] p-4 type-body-strong text-foreground-secondary">Les tiers et scores proviennent de Pokémon GO Hub. Les noms, formes, types et images affichés passent par l’Identity Manager puis par le résolveur d’asset canonique ; l’image source n’est jamais utilisée comme fallback.</p>
        <a className="mt-3 inline-flex items-center gap-2 text-sm font-black text-cyan-100 hover:text-white" href="https://db.pokemongohub.net/fr/best/gym-defenders" target="_blank" rel="noreferrer">Voir la source Pokémon GO Hub <ExternalLink size={14} /></a>
      </Panel>
      <DatasetFilterBar query={globalSearch} onQueryChange={(value) => { setOptions((current) => ({ ...current, page: 1 })); onSearchChange?.(value); }} placeholder="Nom, forme ou numéro Pokédex…" resultCount={entries.length} totalCount={meta.total || entries.length} />
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Select className={fieldClass} aria-label="Tier" value={options.tier} onChange={(event) => setOption("tier", event.target.value)}>{tiers.map((tier) => <option value={tier} key={tier || "all"}>{tier ? `Tier ${tier}` : "Tous les tiers"}</option>)}</Select>
        <Select className={fieldClass} aria-label="Type" value={options.type} onChange={(event) => setOption("type", event.target.value)}><option value="">Tous les types</option>{Object.entries(typeLabels).map(([id, label]) => <option value={id} key={id}>{label}</option>)}</Select>
      </div>
      {error && !dataset ? <ErrorState title="Best Defenders indisponible" message={error} action={<Button onClick={() => void load()}>Réessayer</Button>} /> : null}
      {sourceIssue && !dataset ? <ErrorState title={`${sourceIssue.code} · ${sourceIssue.title}`} message={sourceIssue.preservation} action={<Button onClick={() => void load()}>Réessayer</Button>} /> : null}
      {loading && !dataset ? <FetchLoadingState title="Chargement des défenseurs" /> : null}
      <section className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" aria-label="Classement Best Defenders">
        {entries.map((entry) => (
          <article className="min-w-0 rounded-2xl border border-line p-4" style={typeSurface(entry)} key={`${entry.tier}-${entry.rank}-${entry.source?.slug}`}>
            <div className="flex items-start justify-between gap-3"><span className="rounded-full border border-emerald-200/25 bg-emerald-400/12 px-3 py-1 type-label text-emerald-100">Tier {entry.tier}</span><span className="font-mono text-sm font-black text-muted">#{entry.rank}</span></div>
            <div className="mt-3 flex min-w-0 items-center gap-3"><PokemonArtwork pokemon={entry.pokemon} className="h-20 w-20" priority={entry.tier === "S"} /><div className="min-w-0"><button className="block max-w-full truncate text-left text-base font-black text-domain-foreground hover:text-cyan-100" type="button" onClick={() => onOpenPokemon?.(entry.pokemon)}>#{entry.pokemon?.dexNr} {pokemonName(entry)}</button><div className="mt-2"><TypeIcons types={entry.pokemon?.types} size="sm" /></div></div></div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-black/25 px-3 py-2"><span className="inline-flex items-center gap-2 type-overline text-muted"><Shield size={14} /> Résistance</span><strong className="font-mono text-lg text-domain-foreground">{entry.scoreLabel || entry.score?.toLocaleString("fr-FR") || "—"}</strong></div>
            {entry.pokemon?.unmatched ? <p className="mt-3 type-caption-strong text-amber-200">Identité à résoudre · aucun asset de remplacement.</p> : null}
          </article>
        ))}
      </section>
      {!loading && !entries.length && !error ? <EmptyState title="Aucun défenseur pour ces filtres" /> : null}
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-muted">{entries.length} affiché(s) sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button type="button" className={buttonClass} disabled={options.page <= 1} onClick={() => setOptions((current) => ({ ...current, page: current.page - 1 }))}>Précédent</button><span className="font-mono text-sm font-black">Page {meta.page || options.page} / {meta.pages || 1}</span><button type="button" className={buttonClass} disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => setOptions((current) => ({ ...current, page: current.page + 1 }))}>Suivant</button></div></div>
    </div>
  );
}
