"use client";

import { FileJson, History, RefreshCcw, Search, Sparkles, Unlink } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { PokemonArtwork } from "./pokemon-artwork";
import { useAdminPokemonSearch } from "./admin-pokemon-search-context";

const statusTabs = [["", "Tous"], ["upcoming", "À venir"], ["active", "En cours"], ["past", "Passés"], ["unresolved", "Non résolus"]];
const statusLabels = { upcoming: "À venir", active: "En cours", past: "Passé" };
const generationRanges = { 1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493], 5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 905], 9: [906, 1025] };
const featuredPreviewLimit = 4;

function featuredName(featured) {
  return featured?.name
    || featured?.rawAlias
    || featured?.identity?.rawAlias
    || featured?.canonicalId
    || featured?.pokemonId
    || "Pokémon non identifié";
}

function featuredCanonicalId(featured) {
  return featured?.canonicalId || featured?.pokemonId || "Canonical ID indisponible";
}

function FeaturedPokemonTile({ featured, detailed = false }) {
  const matched = featured?.resolutionStatus === "matched";
  const name = featuredName(featured);
  const reason = featured?.resolutionReason || featured?.resolutionDiagnostic?.reason || "ALIAS_UNKNOWN";
  const assetSize = detailed ? "h-20 w-20" : "h-16 w-16";

  return (
    <article className="min-w-0 rounded-xl border border-white/10 bg-slate-950/45 p-2.5">
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <div className="grid grid-cols-2 gap-1.5" aria-label={`Assets de ${name}`}>
          <div className="min-w-0 text-center">
            <PokemonArtwork pokemon={featured} alt={name} className={assetSize} />
            <span className="mt-1 block text-[9px] font-black uppercase tracking-wide text-slate-500">Normal</span>
          </div>
          <div className="min-w-0 text-center">
            <PokemonArtwork pokemon={featured} shiny alt={`${name} chromatique`} className={assetSize} />
            <span className="mt-1 block text-[9px] font-black uppercase tracking-wide text-slate-500">Shiny</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-white" title={name}>{name}</p>
          <p className="mt-1 truncate font-mono text-[10px] font-bold text-cyan-100/75" title={featuredCanonicalId(featured)}>{featuredCanonicalId(featured)}</p>
          <Badge className="mt-2 max-w-full truncate" tone={matched ? "green" : "amber"} title={matched ? "Résolution canonique complète" : reason}>
            {matched ? "Résolu" : reason}
          </Badge>
        </div>
      </div>
      {detailed && !matched ? (
        <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-2">
            <dt className="font-black uppercase tracking-wide text-slate-500">Alias source</dt>
            <dd className="mt-1 break-words font-mono font-bold text-slate-200">{featured?.rawAlias || name}</dd>
          </div>
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-2">
            <dt className="font-black uppercase tracking-wide text-slate-500">Raison exacte</dt>
            <dd className="mt-1 break-words font-mono font-bold text-amber-100">{reason}</dd>
          </div>
        </dl>
      ) : null}
    </article>
  );
}

function CommunityDayDetails({ item }) {
  const featured = item?.featuredPokemon || [];
  const unresolved = featured.filter((entry) => entry.resolutionStatus !== "matched");
  const moves = item?.exclusiveMoves || [];
  const bonuses = item?.bonuses || [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{featured.length} Pokémon</Badge>
        <Badge tone={unresolved.length ? "amber" : "green"}>{unresolved.length ? `${unresolved.length} non résolu(s)` : "Résolution complète"}</Badge>
        <Badge>{new Date(item.startDate).toLocaleDateString("fr-FR")} → {new Date(item.endDate).toLocaleDateString("fr-FR")}</Badge>
      </div>

      <section aria-labelledby="community-pokemon-title">
        <h3 id="community-pokemon-title" className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">Pokémon vedettes</h3>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {featured.map((entry) => <FeaturedPokemonTile key={`${featuredCanonicalId(entry)}:${entry.rawAlias || entry.name || "unknown"}`} featured={entry} detailed />)}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-slate-950/35 p-3" aria-labelledby="community-moves-title">
          <h3 id="community-moves-title" className="text-sm font-black text-white">Attaques exclusives</h3>
          {moves.length ? <ul className="mt-2 space-y-2">{moves.map((move, index) => (
            <li className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-bold text-cyan-50" key={`${move.pokemon}:${move.move}:${index}`}>
              <span className="text-white">{move.pokemon}</span><span className="text-slate-500"> · </span>{move.move}
            </li>
          ))}</ul> : <p className="mt-2 text-xs font-bold text-slate-400">Aucune attaque dans la source.</p>}
        </section>
        <section className="rounded-xl border border-white/10 bg-slate-950/35 p-3" aria-labelledby="community-bonuses-title">
          <h3 id="community-bonuses-title" className="text-sm font-black text-white">Bonus</h3>
          {bonuses.length ? <ul className="mt-2 space-y-2">{bonuses.map((bonus) => <li className="text-xs font-bold text-slate-300" key={bonus}>• {bonus}</li>)}</ul> : <p className="mt-2 text-xs font-bold text-slate-400">Aucun bonus dans la source.</p>}
        </section>
      </div>

      <details className="rounded-xl border border-white/10 bg-slate-950/45 p-3">
        <summary className="cursor-pointer text-xs font-black text-slate-200">Afficher le JSON d’audit</summary>
        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words text-xs text-cyan-50">{JSON.stringify(item, null, 2)}</pre>
      </details>
    </div>
  );
}

function CommunityDayCard({ item, onInspect }) {
  const featured = item.featuredPokemon || [];
  const unresolved = featured.filter((entry) => entry.resolutionStatus !== "matched");
  const preview = featured.slice(0, featuredPreviewLimit);
  const remaining = featured.length - preview.length;
  const names = featured.map(featuredName).join(", ");
  const moves = item.exclusiveMoves || [];
  const bonuses = item.bonuses || [];

  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <header className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/75">Community Day n°{item.sourceId}</p>
          <h3 className="mt-1 text-lg font-black text-white">{featured.length > 1 ? `${featured.length} Pokémon vedettes` : featuredName(featured[0])}</h3>
          <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-slate-400" title={names}>{names || "Aucun Pokémon structuré"}</p>
        </div>
        <Badge tone={item.status === "active" ? "green" : item.status === "upcoming" ? "cyan" : "neutral"}>{statusLabels[item.status] || item.status}</Badge>
      </header>

      <p className="mt-3 text-xs font-bold text-slate-400">{new Date(item.startDate).toLocaleDateString("fr-FR")} → {new Date(item.endDate).toLocaleDateString("fr-FR")}</p>

      <div className="mt-3 grid gap-2 xl:grid-cols-2">
        {preview.map((entry) => <FeaturedPokemonTile key={`${featuredCanonicalId(entry)}:${entry.rawAlias || entry.name || "unknown"}`} featured={entry} />)}
      </div>
      {remaining > 0 ? (
        <Button className="mt-2 w-full" size="sm" variant="ghost" type="button" onClick={() => onInspect(item)}>
          Voir les {remaining} autre(s) Pokémon
        </Button>
      ) : null}

      {moves.length ? (
        <section className="mt-3" aria-label="Aperçu des attaques exclusives">
          <ul className="grid gap-1.5 sm:grid-cols-2">{moves.slice(0, 4).map((move, index) => (
            <li className="min-w-0 truncate rounded-lg border border-cyan-200/10 bg-cyan-300/[0.04] px-2.5 py-2 text-xs font-bold text-cyan-50" key={`${move.pokemon}:${move.move}:${index}`} title={`${move.move} (${move.pokemon})`}>
              {move.move} <span className="text-slate-500">·</span> {move.pokemon}
            </li>
          ))}</ul>
          {moves.length > 4 ? <p className="mt-1 text-[10px] font-black text-slate-500">+ {moves.length - 4} autre(s) attaque(s)</p> : null}
        </section>
      ) : null}

      {bonuses.length ? <ul className="mt-3 space-y-1 text-xs font-bold text-slate-300">{bonuses.slice(0, 3).map((bonus) => <li className="line-clamp-2" key={bonus}>• {bonus}</li>)}</ul> : null}
      {bonuses.length > 3 ? <p className="mt-1 text-[10px] font-black text-slate-500">+ {bonuses.length - 3} autre(s) bonus</p> : null}

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
        <Badge tone={unresolved.length ? "amber" : "green"} title={unresolved.map((entry) => `${featuredName(entry)} : ${entry.resolutionReason || "ALIAS_UNKNOWN"}`).join("\n") || "Résolution canonique complète"}>
          {unresolved.length ? `${featured.length - unresolved.length}/${featured.length} résolus · ${unresolved.length} à vérifier` : `${featured.length}/${featured.length} résolus`}
        </Badge>
        <Button size="sm" variant="secondary" type="button" onClick={() => onInspect(item)}>Détail</Button>
      </footer>
    </article>
  );
}

export function CommunityDaysPanel() {
  const { combineWith } = useAdminPokemonSearch();
  const [resource, setResource] = useState({ items: [], meta: {}, history: [] });
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [attack, setAttack] = useState("");
  const [shiny, setShiny] = useState("");
  const [generation, setGeneration] = useState("");
  const [busy, setBusy] = useState("");
  const [inspect, setInspect] = useState(null);
  const effectiveQuery = combineWith(query);

  const load = useCallback(async (notify = false, trackBusy = true) => {
    if (trackBusy) setBusy("load");
    try {
      const params = new URLSearchParams({ limit: "200" });
      if (status && status !== "unresolved") params.set("status", status);
      if (status === "unresolved") params.set("unresolved", "true");
      if (year) params.set("year", year);
      if (month) params.set("month", month);
      if (effectiveQuery) params.set("search", effectiveQuery);
      const response = await fetch(`/api/admin/community-days?${params}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Community Days indisponibles.");
      setResource(payload.data);
      if (notify) toast.success("Community Days actualisés.");
    } catch (error) {
      toast.error(error.message || "Community Days indisponibles.");
    } finally { if (trackBusy) setBusy(""); }
  }, [status, year, month, effectiveQuery]);

  useEffect(() => { const timer = setTimeout(() => load(false), 180); return () => clearTimeout(timer); }, [load]);

  async function sync() {
    setBusy("sync");
    try {
      const response = await fetch("/api/admin/community-days/sync", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Synchronisation impossible.");
      toast.success(`${payload.data.total} Community Day(s) conservé(s), ${payload.data.added} ajouté(s), ${payload.data.modified} modifié(s).`);
      await load(false, false);
    } catch (error) { toast.error(error.message || "Synchronisation impossible."); }
    finally { setBusy(""); }
  }

  const visible = useMemo(() => resource.items.filter((item) => {
    const featured = item.featuredPokemon || [];
    if (pokemon && !JSON.stringify(featured).toLowerCase().includes(pokemon.toLowerCase())) return false;
    if (attack && !JSON.stringify(item.exclusiveMoves || []).toLowerCase().includes(attack.toLowerCase())) return false;
    if (shiny === "yes" && !item.shinyAvailable) return false;
    if (shiny === "no" && item.shinyAvailable) return false;
    if (generation) {
      const [min, max] = generationRanges[generation] || [1, 1025];
      if (!featured.some((entry) => Number(entry.dexNr) >= min && Number(entry.dexNr) <= max)) return false;
    }
    return true;
  }), [resource.items, pokemon, attack, shiny, generation]);
  const latest = resource.meta?.sourceRun;

  return <section className="space-y-5">
    <Panel title="Community Days" eyebrow="Événements · référentiel permanent" action={<div className="flex flex-wrap gap-2"><Button variant="primary" type="button" icon={<Sparkles size={17} />} loading={busy === "sync"} loadingText="Synchronisation…" disabled={Boolean(busy)} onClick={sync}>Synchroniser les Community Days</Button><Button type="button" icon={<RefreshCcw size={17} />} loading={busy === "load"} loadingText="Actualisation…" disabled={Boolean(busy)} onClick={() => load(true)}>Actualiser</Button><button className={buttonClass} type="button" onClick={() => setInspect({ kind: "json", title: "JSON Community Days", value: visible })}><FileJson size={17} />Voir JSON</button><button className={buttonClass} type="button" onClick={() => setInspect({ kind: "json", title: "Historique des synchronisations", value: resource.history })}><History size={17} />Voir historique</button><button className={buttonClass} type="button" onClick={() => setStatus("unresolved")}><Unlink size={17} />Voir non résolus</button></div>}>
      <div className="flex flex-wrap gap-2">{statusTabs.map(([id, label]) => <button className={`${buttonClass} ${status === id ? "border-cyan-200/50 bg-cyan-300/15" : ""}`} type="button" key={id} onClick={() => setStatus(id)}>{label}</button>)}</div>
      <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4"><label className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} /><input className={`${fieldClass} pl-11`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Recherche" /></label><input className={fieldClass} value={year} onChange={(event) => setYear(event.target.value)} placeholder="Année" inputMode="numeric" /><select className={fieldClass} value={month} onChange={(event) => setMonth(event.target.value)}><option value="">Tous les mois</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{new Date(2020, index).toLocaleString("fr-FR", { month: "long" })}</option>)}</select><input className={fieldClass} value={pokemon} onChange={(event) => setPokemon(event.target.value)} placeholder="Pokémon" /><input className={fieldClass} value={attack} onChange={(event) => setAttack(event.target.value)} placeholder="Attaque exclusive" /><select className={fieldClass} value={shiny} onChange={(event) => setShiny(event.target.value)}><option value="">Shiny : tous</option><option value="yes">Shiny disponible</option><option value="no">Shiny incomplet</option></select><select className={fieldClass} value={generation} onChange={(event) => setGeneration(event.target.value)}><option value="">Toutes générations</option>{Array.from({ length: 9 }, (_, index) => <option key={index + 1} value={index + 1}>Génération {index + 1}</option>)}</select><div className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-xs font-bold text-slate-300">{visible.length} résultat(s) · Sync {latest?.savedAt ? new Date(latest.savedAt).toLocaleString("fr-FR") : "jamais"}</div></div>
    </Panel>
    <section className="grid min-w-0 gap-3 xl:grid-cols-2">{visible.map((item) => <CommunityDayCard item={item} key={item.id} onInspect={(selected) => setInspect({ kind: "community-day", title: `Community Day n°${selected.sourceId}`, item: selected })} />)}</section>
    <Modal open={Boolean(inspect)} onClose={() => setInspect(null)} title={inspect?.title || "Détail Community Day"} description={inspect?.kind === "community-day" ? "Pokémon, assets canoniques, attaques, bonus et diagnostics de résolution." : "Données archivées et payload source conservés sans modification."} className="max-w-6xl">
      {inspect?.kind === "community-day" ? <CommunityDayDetails item={inspect.item} /> : <pre className="max-h-[68dvh] overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-950/70 p-4 text-xs text-cyan-50">{JSON.stringify(inspect?.value || {}, null, 2)}</pre>}
    </Modal>
  </section>;
}
