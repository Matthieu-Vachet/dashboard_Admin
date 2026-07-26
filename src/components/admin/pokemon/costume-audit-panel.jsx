"use client";

import { Download, ExternalLink, RefreshCcw, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { DatasetSourceHeader } from "./dataset-source-header";
import { PokemonArtwork } from "./pokemon-artwork";
import { buttonClass, fieldClass, Panel } from "./admin-ui";

function downloadJson(value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = `costume-audit-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
}

export function CostumeAuditPanel({ globalSearch = "", onSearchChange }) {
  const [options, setOptions] = useState({ status: "", shiny: "", page: 1, limit: 25 });
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState("");
  const requestSequence = useRef(0);

  const load = useCallback(async () => {
    const sequence = requestSequence.current + 1;
    requestSequence.current = sequence;
    setLoading(true); setError("");
    try {
      const query = new URLSearchParams({ action: "costume-audit", page: String(options.page), limit: String(options.limit) });
      const requestOptions = { ...options, search: globalSearch };
      for (const key of ["search", "status", "shiny"]) if (requestOptions[key] !== "") query.set(key, requestOptions[key]);
      const response = await fetch(`/api/pokemon-admin?${query}`, { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
      if (requestSequence.current === sequence) setDataset(payload.data);
    } catch (caught) { if (requestSequence.current === sequence) setError(caught instanceof Error ? caught.message : "Audit costumes indisponible."); }
    finally { if (requestSequence.current === sequence) setLoading(false); }
  }, [globalSearch, options]);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => { void load(); });
    return () => window.cancelAnimationFrame(frame);
  }, [load]);

  async function regenerate() {
    setRegenerating(true); setError("");
    try {
      const response = await fetch("/api/pokemon-admin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "regenerate-costume-audit" }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
      await load();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Régénération Margxt impossible."); }
    finally { setRegenerating(false); }
  }

  const items = dataset?.data?.items || [];
  const metadata = dataset?.data?.metadata || {};
  const meta = dataset?.meta || {};
  const setOption = (key, value) => setOptions((current) => ({ ...current, [key]: value, page: 1 }));

  return (
    <div className="min-w-0 space-y-5">
      <Panel eyebrow="Privé · Margxt comparé à PokemonGo-Data" title="Costumes / Event Pokémon" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} disabled={!dataset} onClick={() => downloadJson(dataset)}>JSON privé</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={() => void load()}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={() => void regenerate()}>Régénérer</Button></div>}>
        <DatasetSourceHeader dataset={dataset} total={meta.total || metadata.total || items.length} />
        <div className="mt-4 grid gap-3 sm:grid-cols-4">{[["Référence Margxt", metadata.total], ["Présents localement", metadata.statusCounts?.present], ["À corriger", metadata.statusCounts?.missing], ["Shiny source", metadata.statusCounts?.shinyAvailable]].map(([label, value]) => <div className="rounded-xl border border-line bg-surface-faint p-3" key={label}><span className="type-overline-compact text-muted">{label}</span><strong className="mt-1 block text-2xl">{Number(value || 0).toLocaleString("fr-FR")}</strong></div>)}</div>
        <p className="mt-4 type-body-strong text-foreground-secondary">Les images Margxt sont conservées comme preuve source seulement. L’interface affiche exclusivement l’asset exact issu de PokemonGo-Data ; toute absence reste visible et produit un diagnostic Identity Manager actionnable.</p>
        <a className="mt-3 inline-flex items-center gap-2 text-sm font-black text-cyan-100 hover:text-white" href="https://www.margxt.fr/guide-les-pokemon-deguises-dans-pokemon-go/" target="_blank" rel="noreferrer">Voir la source Margxt <ExternalLink size={14} /></a>
      </Panel>
      <DatasetFilterBar query={globalSearch} onQueryChange={(value) => { setOptions((current) => ({ ...current, page: 1 })); onSearchChange?.(value); }} placeholder="Pokémon, costume ou événement…" resultCount={items.length} totalCount={meta.total || metadata.total || items.length} />
      <div className="grid min-w-0 gap-3 sm:grid-cols-2"><Select className={fieldClass} value={options.status} onChange={(event) => setOption("status", event.target.value)} aria-label="Disponibilité locale"><option value="">Tous les statuts locaux</option><option value="present">Présents</option><option value="missing">Tous les points à corriger</option><option value="unresolved">Non résolus</option><option value="ambiguous">Ambigus</option><option value="asset-missing">Assets absents</option><option value="inconsistent">Incohérents</option><option value="duplicate">Doublons</option></Select><Select className={fieldClass} value={options.shiny} onChange={(event) => setOption("shiny", event.target.value)} aria-label="Disponibilité shiny"><option value="">Shiny indifférent</option><option value="true">Shiny indiqué par Margxt</option><option value="false">Sans shiny indiqué</option></Select></div>
      {error ? <ErrorState title="Audit costumes indisponible" message={error} action={<Button onClick={() => void load()}>Réessayer</Button>} /> : null}
      {loading && !dataset ? <FetchLoadingState title="Chargement de l’audit costumes" /> : null}
      <section className="grid min-w-0 gap-3 lg:grid-cols-2" aria-label="Audit des costumes Pokémon">
        {items.map((item) => {
          const pokemon = { dexNr: item.identity?.pokemonId, form: item.identity?.form, costume: item.identity?.costume, names: { French: item.source?.pokemonName }, assets: { image: item.pokemonGoData?.exactNormalAsset, shinyImage: item.pokemonGoData?.exactShinyAsset } };
          const status = item.pokemonGoData?.status || "unresolved";
          const present = status === "present";
          const statusLabel = { present: "Présent", unresolved: "Non résolu", ambiguous: "Ambigu", "asset-missing": "Asset absent", inconsistent: "Incohérent", duplicate: "Doublon" }[status] || "À vérifier";
          return <article className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-line bg-surface-faint p-4" key={item.id}><PokemonArtwork pokemon={pokemon} className="h-20 w-20" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><Badge tone={present ? "green" : status === "ambiguous" || status === "inconsistent" ? "red" : "amber"}>{statusLabel}</Badge>{item.shinyAvailable ? <Badge tone="violet"><Sparkles size={11} /> Shiny source</Badge> : null}</div><h3 className="mt-2 break-words text-base font-black text-domain-foreground">{item.source?.pokemonName} · {item.source?.costumeName}</h3><p className="mt-1 break-all font-mono text-[10px] font-bold text-muted">{item.pokemonGoData?.canonicalId || item.identity?.resolution?.reason || "Identité canonique absente"}</p>{!present ? <p className="mt-2 inline-flex items-start gap-2 type-caption-strong text-amber-200"><TriangleAlert className="mt-0.5 shrink-0" size={14} />{item.identity?.resolution?.ambiguityExplanation || item.identity?.resolution?.warnings?.join(" · ") || "Alias ou asset exact absent."}</p> : null}<div className="mt-3 flex flex-wrap gap-1.5">{(item.events || []).slice(0, 3).map((event) => <span className="max-w-full break-words rounded-lg border border-line bg-black/20 px-2 py-1 text-[10px] font-bold text-foreground-secondary" key={event}>{event}</span>)}</div>{item.notes?.length ? <p className="mt-2 break-words type-caption text-muted">{item.notes.join(" · ")}</p> : null}</div></article>;
        })}
      </section>
      {!loading && !items.length && !error ? <EmptyState title="Aucun costume pour ces filtres" /> : null}
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-muted">{items.length} affiché(s) sur {meta.total || metadata.total || items.length}</span><div className="flex items-center gap-3"><button type="button" className={buttonClass} disabled={options.page <= 1} onClick={() => setOptions((current) => ({ ...current, page: current.page - 1 }))}>Précédent</button><span className="font-mono text-sm font-black">Page {meta.page || options.page} / {meta.pages || 1}</span><button type="button" className={buttonClass} disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => setOptions((current) => ({ ...current, page: current.page + 1 }))}>Suivant</button></div></div>
    </div>
  );
}
