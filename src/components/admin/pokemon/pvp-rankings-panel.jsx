"use client";

import { Check, ChevronDown, Download, ExternalLink, RefreshCcw, RotateCcw, Shield, Swords } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar as RadarShape, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { PokemonArtwork } from "./pokemon-artwork";
import { EmptyState } from "@/components/admin/shared/state-system";
import { buffLabels, checklistIdentity, filterChecklistEntries, moveCounts, performanceRadarData, toggleChecklistEntry } from "@/lib/pvp-rankings-display.mjs";
import { readDashboardStoreValue, writeDashboardStoreValue } from "@/services/admin/dashboard-store";
import { pokemonAdminApiPath } from "@/services/admin/pokemon-admin-api";

const fallbackRoles = [
  ["overall", "Classement total"], ["lead", "Ouverture"], ["closer", "Fermeur"], ["switch", "Changement"],
  ["charger", "Chargeur"], ["attacker", "Attaquant"], ["consistency", "Cohérence"],
  ["stat-product", "Stat Product"], ["offense", "Offense"], ["defense", "Défense"], ["stamina", "Endurance"],
];
const categoryLabels = { standards: "Standards", "little-cups": "Little Cups", "seasonal-cups": "Coupes saisonnières", "event-cups": "Coupes événementielles", "battle-frontier": "Battle Frontier", custom: "Personnalisés" };
const checklistStoreKey = "matweb.pokemon.pvpChecklist";

function pokemonName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.sourceIdentity?.speciesName || entry?.sourceIdentity?.speciesId || "Pokémon";
}

function primaryType(entry) {
  return String(entry?.pokemon?.types?.[0] || "NORMAL").toUpperCase();
}

function typeSurface(entry, opacity = 0.11) {
  const color = typeColors[primaryType(entry)] || typeColors.NORMAL;
  return { backgroundImage: `linear-gradient(100deg, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}, rgba(2,6,23,.82))` };
}

function moveName(move) {
  return move?.names?.French || move?.names?.English || move?.id || "Attaque non reliée";
}

function MoveBadge({ move, recommended, fastMove, selectedFastMove }) {
  const combat = move?.combat || {};
  const energy = Math.abs(Number(combat.energy || move?.energy || 0));
  const turns = Math.max(1, Number(combat.turns || 1));
  const power = Number(combat.power || move?.power || 0);
  const dpt = fastMove ? power / turns : null;
  const ept = fastMove ? energy / turns : (energy ? power / energy : null);
  const counts = fastMove ? [] : moveCounts(selectedFastMove, move);
  const effects = buffLabels(combat.buffs);
  return (
    <article className="rounded-xl border border-line bg-surface-subtle p-3" style={{ borderLeft: `4px solid ${typeColors[String(move?.type || "NORMAL").toUpperCase()] || typeColors.NORMAL}` }}>
      <div className="flex flex-wrap items-start justify-between gap-2"><strong className="text-sm text-domain-foreground">{moveName(move)}</strong><div className="flex flex-wrap gap-1">{recommended ? <span className="rounded-full bg-emerald-400/16 px-2 py-0.5 text-[9px] font-black text-emerald-100">RECOMMANDÉE</span> : null}{move?.legacy ? <span className="rounded-full bg-amber-400/16 px-2 py-0.5 text-[9px] font-black text-amber-100">LEGACY</span> : null}</div></div>
      <div className="mt-2 flex flex-wrap items-center gap-2 type-caption-strong text-foreground-secondary"><TypeIcons types={[move?.type]} size="sm" /><span>{typeLabels[String(move?.type || "").toUpperCase()] || move?.type || "Type absent"}</span><span>{fastMove ? "Immédiate" : "Chargée"}</span></div>
      <dl className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs"><div><dt className="text-disabled">Dégâts</dt><dd>{power || "—"}</dd></div><div><dt className="text-disabled">Énergie</dt><dd>{energy || "—"}</dd></div><div><dt className="text-disabled">{fastMove ? "DPT / EPT" : "DPE"}</dt><dd>{fastMove ? `${dpt?.toFixed(2)} / ${ept?.toFixed(2)}` : ept?.toFixed(2) || "—"}</dd></div></dl>
      <p className="mt-2 type-caption-strong text-muted">{turns} tour(s){fastMove ? "" : " · contrat combat local"}</p>
      {counts.length ? <p className="mt-2 font-mono text-xs font-black text-cyan-100">Compte : {counts.join(" – ")}</p> : null}
      {effects.length ? <div className="mt-2 flex flex-wrap gap-1">{effects.map((effect) => <span className="rounded-full bg-violet-400/14 px-2 py-1 text-[10px] font-black text-violet-100" key={effect}>{effect}</span>)}</div> : null}
    </article>
  );
}

function resolveMove(references, id) {
  return id ? references?.moves?.[id] || { id } : null;
}

function MatchupCard({ item, good, pokemonReferences }) {
  const pokemon = item.pokemon || pokemonReferences?.[item.pokemonRef] || {};
  const name = pokemon.names?.French || pokemon.names?.English || item.sourceId;
  return (
    <article className={`grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 ${good ? "border-emerald-200/16 bg-emerald-400/[0.07]" : "border-rose-200/16 bg-rose-400/[0.07]"}`}>
      <PokemonArtwork pokemon={pokemon} alt={name} className="h-12 w-12 rounded-xl" />
      <span className="min-w-0"><strong className="block truncate text-sm text-domain-foreground">{name}{item.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex items-center gap-2"><TypeIcons types={pokemon.types} size="sm" /><small className="text-muted">{pokemon.formId || "Forme non reliée"}</small></span></span>
      <span className="text-right"><small className="block text-[9px] font-black uppercase text-disabled">Cote de combat</small><strong className={`font-mono text-lg ${good ? "text-emerald-200" : "text-rose-200"}`}>{item.rating}</strong></span>
    </article>
  );
}

function PerformanceRadar({ scores = {} }) {
  const data = performanceRadarData(scores);
  return (
    <section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Performances</h3><div className="mt-2 h-72" role="img" aria-label="Radar des six scores de performance PvP"><ResponsiveContainer width="100%" height="100%"><RadarChart data={data} outerRadius="72%"><PolarGrid stroke="rgba(148,163,184,.28)" /><PolarAngleAxis dataKey="label" tick={{ fill: "#cbd5e1", fontSize: 11, fontWeight: 800 }} /><Tooltip contentStyle={{ background: "#080d1a", border: "1px solid rgba(148,163,184,.24)", borderRadius: 12 }} /><RadarShape dataKey="value" stroke="#22d3ee" fill="#8b5cf6" fillOpacity={0.48} /></RadarChart></ResponsiveContainer></div><div className="grid grid-cols-3 gap-2">{data.map((item) => <span className="text-center type-caption-strong text-muted" key={item.id}>{item.label} <b className="font-mono text-cyan-100">{item.value}</b></span>)}</div></section>
  );
}

function combinedTypeMatchups(types, typeReferences) {
  const defenders = (types || []).map((type) => String(type).toUpperCase());
  const results = Object.values(typeReferences || {}).map((attackType) => {
    const multiplier = defenders.reduce((product, defender) => product * Number(attackType.damageMultiplier?.[defender.charAt(0) + defender.slice(1).toLowerCase()] ?? 1), 1);
    return { type: attackType.id, multiplier: Number(multiplier.toFixed(4)) };
  });
  return { weaknesses: results.filter((item) => item.multiplier > 1.01), resistances: results.filter((item) => item.multiplier < 0.99) };
}

function TeammateBadge({ item, onOpenPokemon }) {
  const pokemon = item.pokemon || {};
  const label = pokemon.names?.French || pokemon.names?.English || item.rawName || "Pokémon";
  const className = "inline-flex items-center gap-2 rounded-xl border border-line bg-surface-control px-2 py-1 text-sm font-black";
  const content = <><PokemonArtwork pokemon={pokemon} alt={label} className="h-8 w-8 rounded-lg" /><span>{label}{item.shadow ? " (Obscur)" : ""}</span></>;
  if (onOpenPokemon && item.resolutionStatus === "matched") return <button className={className} type="button" onClick={() => onOpenPokemon(pokemon)}>{content}</button>;
  return <span className={className}>{content}{item.resolutionStatus !== "matched" ? <small className="text-amber-200">Alias à résoudre</small> : null}</span>;
}

function PvpDetail({ entry, references, format, onOpenPokemon, suggestedTeammates, teammatesLoading, teammatesError }) {
  const fastRecommended = resolveMove(references, entry.moveset?.fast);
  const chargedRecommended = (entry.moveset?.charged || []).map((id) => resolveMove(references, id));
  const allFast = (entry.pvp?.allMoves?.fast || []).map((id) => resolveMove(references, id));
  const allCharged = (entry.pvp?.allMoves?.charged || []).map((id) => resolveMove(references, id));
  const attacksFast = allFast.length ? allFast : fastRecommended ? [fastRecommended] : [];
  const attacksCharged = allCharged.length ? allCharged : chargedRecommended;
  const matchupTypes = combinedTypeMatchups(entry.pokemon?.types, references?.types);
  const ivs = entry.pvp?.ivs;
  const level = entry.pvp?.level;
  const needsXl = Number(level) > 40;
  const costs = entry.pvp?.secondChargedMoveCost || {};
  const rank1Stats = entry.rank1?.stats || entry.stats || {};

  return (
    <div className="space-y-4 border-t border-line p-3 sm:p-5">
      <div className="grid gap-4 xl:grid-cols-2"><section><h3 className="mb-3 font-black text-domain-foreground">Gagne contre · Cote de combat</h3><div className="space-y-2">{(entry.matchups || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good pokemonReferences={references?.pokemon} />)}</div></section><section><h3 className="mb-3 font-black text-domain-foreground">Perd contre · Cote de combat</h3><div className="space-y-2">{(entry.counters || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good={false} pokemonReferences={references?.pokemon} />)}</div></section></div>
      <div className="grid gap-4 xl:grid-cols-2"><PerformanceRadar scores={entry.roleScores} /><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Stats PvP · Rank 1</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-disabled">Attaque</dt><dd className="font-mono font-black">{rank1Stats.attack ?? "—"}</dd></div><div><dt className="text-disabled">Défense</dt><dd className="font-mono font-black">{rank1Stats.defense ?? "—"}</dd></div><div><dt className="text-disabled">Endurance</dt><dd className="font-mono font-black">{rank1Stats.stamina ?? "—"}</dd></div><div><dt className="text-disabled">Stat Product</dt><dd className="font-mono font-black">{entry.rank1?.statProduct ?? entry.stats?.product ?? "—"}</dd></div><div><dt className="text-disabled">Niveau recommandé</dt><dd className="font-mono font-black">{level ?? "Indisponible"}</dd></div><div><dt className="text-disabled">IV exacts</dt><dd className="font-mono font-black">{ivs ? `${ivs.attack}/${ivs.defense}/${ivs.stamina}` : "Indisponibles"}</dd></div><div><dt className="text-disabled">CP obtenu / plafond</dt><dd className="font-mono font-black">{entry.pvp?.cp ?? "—"} / {format?.cp || entry.pvp?.cpTarget || "—"}</dd></div><div><dt className="text-disabled">Bonbons XL</dt><dd className="font-black">{needsXl ? "Requis · quantité indisponible" : level == null ? "Indisponible" : "Aucun requis"}</dd></div></dl></section></div>
      {entry.editor?.notes?.English ? <section className="rounded-2xl border border-violet-200/20 bg-violet-300/[0.07] p-4"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-violet-50">Note de la rédaction · {entry.editor.score || "—"}</h3><span className="rounded-full border border-violet-200/20 bg-violet-300/14 px-2 py-0.5 text-[9px] font-black text-violet-100">EN</span></div><p className="mt-3 whitespace-pre-line type-body-strong text-foreground-secondary">{entry.editor.notes.English}</p></section> : null}
      <div className="grid gap-4 xl:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques immédiates</h3><div className="mt-3 space-y-2">{attacksFast.map((move) => <MoveBadge key={move.id} move={move} fastMove recommended={move.id === entry.moveset?.fast} />)}{!attacksFast.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque immédiate locale reliée.</p> : null}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques chargées</h3><div className="mt-3 space-y-2">{attacksCharged.map((move) => <MoveBadge key={move.id} move={move} fastMove={false} selectedFastMove={fastRecommended} recommended={entry.moveset?.charged?.includes(move.id)} />)}{!attacksCharged.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque chargée locale reliée.</p> : null}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Types</h3><div className="mt-3 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} />{(entry.pokemon?.types || []).map((type) => <span className="rounded-full border border-line bg-surface-control px-3 py-1 text-sm font-black" key={type}>{typeLabels[String(type).toUpperCase()] || type}</span>)}</div></div><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Coût et distance</h3><p className="mt-3 text-sm font-bold text-foreground-secondary">Copain : {entry.pvp?.buddyDistanceKm == null ? "Indisponible" : `${entry.pvp.buddyDistanceKm} km`}</p><p className="mt-1 text-sm font-bold text-foreground-secondary">Seconde attaque : {costs.stardust == null ? "coût local indisponible" : `${Number(costs.stardust).toLocaleString("fr-FR")} poussières`}{costs.candy == null ? "" : ` · ${costs.candy} bonbons`}</p></div></section>
      <div className="grid gap-3 sm:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Faiblesses</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.weaknesses.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 type-label" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Résistances</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.resistances.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 type-label" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Coéquipiers suggérés</h3>{teammatesLoading ? <p className="mt-2 animate-pulse text-sm font-bold text-cyan-100 motion-reduce:animate-none">Calcul PvPoke en cours…</p> : suggestedTeammates?.length ? <div className="mt-3 flex flex-wrap gap-2">{suggestedTeammates.map((item) => <TeammateBadge item={item} onOpenPokemon={onOpenPokemon} key={`${item.rankOrOrder}-${item.providerAlias}`} />)}</div> : <p className={`mt-2 text-sm font-bold ${teammatesError ? "text-amber-200" : "text-muted"}`}>{teammatesError || "Aucun partenaire exact retourné par la fiche PvPoke."}</p>}</div><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Pokémon similaires</h3><p className="mt-2 text-sm font-bold text-muted">Aucune donnée source exacte n’est publiée dans le snapshot de classement.</p></div></section>
      <div className="flex flex-wrap gap-2">{onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}><ExternalLink size={16} /> Fiche Pokémon</button> : null}<span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-minimal px-3 py-2 type-label text-muted">Comparaison et équipe : liens internes à venir lorsque les données seront disponibles</span></div>
    </div>
  );
}

function PvpChecklist({ league, sourceHash, onOpenPokemon }) {
  const [catalogue, setCatalogue] = useState([]);
  const [state, setState] = useState({ schemaVersion: 1, contexts: {} });
  const [loadedKey, setLoadedKey] = useState("");
  const [configured, setConfigured] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rank");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("fr"));
  const requestKey = `${league}:${sourceHash || "current"}`;
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ action: "pvp-rankings", league, full: "true" });
    Promise.all([
      fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" }).then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Catalogue PvP indisponible.");
        return payload.data?.data?.rankings || [];
      }),
      readDashboardStoreValue(checklistStoreKey),
    ]).then(([rankings, stored]) => {
      if (cancelled) return;
      setCatalogue(rankings);
      setConfigured(stored.configured !== false);
      if (stored.value?.schemaVersion === 1) setState(stored.value);
    }).catch(() => {
      if (!cancelled) setCatalogue([]);
    }).finally(() => {
      if (!cancelled) setLoadedKey(requestKey);
    });
    return () => { cancelled = true; };
  }, [league, requestKey]);

  const owned = useMemo(() => state.contexts?.[league] || {}, [league, state.contexts]);
  const visible = useMemo(() => filterChecklistEntries({ catalogue, owned, query: deferredQuery, filter, sort }), [catalogue, deferredQuery, filter, owned, sort]);
  const ownedCount = catalogue.reduce((count, entry) => count + Number(Boolean(owned[checklistIdentity(entry)])), 0);

  function toggle(entry) {
    const next = { ...toggleChecklistEntry(state, league, entry), updatedAt: new Date().toISOString() };
    setState(next);
    void writeDashboardStoreValue(checklistStoreKey, next);
  }

  return <Panel eyebrow="Persistée par compte Dashboard" title="Ma checklist PvP"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-foreground-secondary"><strong className="font-mono text-cyan-100">{ownedCount}</strong> / {catalogue.length} possédés · contexte {league}</p>{!configured ? <span className="text-xs font-black text-amber-200">MongoDB Dashboard non configuré</span> : null}</div><div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_12rem_12rem]"><input className={fieldClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans le catalogue actif" aria-label="Rechercher dans la checklist PvP" /><Select className={fieldClass} value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filtre checklist"><option value="all">Tous</option><option value="owned">Possédés</option><option value="missing">Manquants</option></Select><Select className={fieldClass} value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Tri checklist"><option value="rank">Rang</option><option value="name">Nom</option><option value="type">Type</option></Select></div>{loading ? <p className="mt-4 text-sm font-bold text-muted">Chargement du catalogue complet…</p> : <div className="mt-4 grid max-h-[32rem] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">{visible.map((entry) => { const id = checklistIdentity(entry); const checked = Boolean(owned[id]); return <label className={`grid cursor-pointer grid-cols-[auto_2.5rem_minmax(0,1fr)] items-center gap-2 rounded-xl border p-2 [content-visibility:auto] ${checked ? "border-emerald-300/30 bg-emerald-400/[0.08]" : "border-line bg-surface-faint"}`} key={id}><input className="sr-only" type="checkbox" checked={checked} onChange={() => toggle(entry)} /><span className={`grid h-6 w-6 place-items-center rounded-md border ${checked ? "border-emerald-300 bg-emerald-400 text-slate-950" : "border-line"}`}>{checked ? <Check size={15} /> : null}</span><PokemonArtwork pokemon={entry.pokemon} alt={pokemonName(entry)} className="h-10 w-10 rounded-lg" /><span className="min-w-0"><strong className="block truncate text-sm">#{entry.rank} {pokemonName(entry)}</strong><span className="mt-0.5 flex items-center gap-1"><TypeIcons types={entry.pokemon?.types} size="sm" />{onOpenPokemon ? <button className="text-[10px] font-black text-cyan-200" type="button" onClick={(event) => { event.preventDefault(); onOpenPokemon(entry.pokemon); }}>Fiche</button> : null}</span></span></label>; })}{!visible.length ? <EmptyState size="section" title="Aucun Pokémon dans ce filtre" /> : null}</div>}</Panel>;
}

function FormatSelect({ formats, value, onChange }) {
  const grouped = useMemo(() => Object.entries(categoryLabels).map(([id, label]) => ({ id, label, formats: formats.filter((format) => (format.category || "event-cups") === id) })).filter((group) => group.formats.length), [formats]);
  return <Select className={fieldClass} value={value} onChange={onChange} aria-label="Ligue">{grouped.map((group) => <optgroup label={group.label} key={group.id}>{group.formats.map((format) => <option value={format.id} key={format.id}>{format.label}{format.labelEnglish && format.labelEnglish !== format.label ? ` · ${format.labelEnglish}` : ""} · {format.cp} CP{format.available === false ? " · indisponible" : ""}</option>)}</optgroup>)}</Select>;
}

export function PvpRankingsPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onOpenPokemon }) {
  const [expanded, setExpanded] = useState("");
  const [teammatesByEntry, setTeammatesByEntry] = useState({});
  const entries = dataset?.data?.rankings || [];
  const formats = dataset?.data?.formats || [];
  const references = dataset?.data?.references || { moves: {}, types: {} };
  const roles = dataset?.data?.roles?.length ? dataset.data.roles.map((role) => [role.id, role.label]) : fallbackRoles;
  const meta = dataset?.meta || {};
  const selectedFormat = formats.find((format) => format.id === (dataset?.data?.league || options.league));
  const league = dataset?.data?.league || options.league;

  async function loadSuggestedTeammates(entry) {
    const speciesId = entry.sourceIdentity?.speciesId;
    const cacheKey = `${league}:${speciesId}`;
    if (!speciesId || teammatesByEntry[cacheKey]) return;
    setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: true, data: [], error: "" } }));
    try {
      const params = new URLSearchParams({ action: "pvp-teammates", league, speciesId });
      const response = await fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || !Array.isArray(payload.data?.data)) throw new Error(payload.error || "Suggested Teammates indisponibles.");
      setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: false, data: payload.data.data, error: "" } }));
    } catch (error) {
      setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: false, data: [], error: error.message || "Suggested Teammates indisponibles." } }));
    }
  }

  return (
    <div className="space-y-5">
      <Panel eyebrow="Source officielle · dépôt MIT PvPoke" title="Classements PvP" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} onClick={onDownload} disabled={!dataset}>JSON</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={onRefresh}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate}>Régénérer</Button></div>}><DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} /></Panel>
      <PvpChecklist league={dataset?.data?.league || options.league} sourceHash={dataset?.meta?.sourceHash} onOpenPokemon={onOpenPokemon} />
      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} />
      <div className="grid gap-3 lg:grid-cols-2"><FormatSelect formats={formats} value={options.league} onChange={(event) => { setExpanded(""); onOptionsChange({ ...options, league: event.target.value, page: 1 }); }} /><Select className={fieldClass} value={options.role} onChange={(event) => onOptionsChange({ ...options, role: event.target.value, page: 1 })} aria-label="Classement">{roles.map(([id, label]) => <option value={id === "overall" ? "" : id} key={id}>{label}</option>)}</Select></div>
      <section className="space-y-2" aria-label="Classement PvP">
        {entries.map((entry) => { const key = `${entry.rank}-${entry.sourceIdentity?.speciesId}`; const teammateKey = `${league}:${entry.sourceIdentity?.speciesId}`; const teammateState = teammatesByEntry[teammateKey] || {}; const isOpen = expanded === key; const fast = resolveMove(references, entry.moveset?.fast); const charged = (entry.moveset?.charged || []).map((id) => resolveMove(references, id)); return <article className="overflow-hidden rounded-2xl border border-line" style={typeSurface(entry)} key={key}><button className="grid w-full min-w-0 gap-3 p-3 text-left sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto] sm:items-center" type="button" onClick={() => { setExpanded(isOpen ? "" : key); if (!isOpen) void loadSuggestedTeammates(entry); }} aria-expanded={isOpen}><span className="flex items-center gap-2 font-mono text-sm font-black text-muted"><ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={16} />#{entry.rank}</span><PokemonArtwork pokemon={entry.pokemon} alt={pokemonName(entry)} className="h-14 w-14 rounded-xl" /><span className="min-w-0"><strong className="block truncate text-base text-domain-foreground">#{entry.pokemon?.dexNr || "—"} {pokemonName(entry)}{entry.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><small className="font-bold text-foreground-secondary">{moveName(fast)} · {charged.map(moveName).join(" · ") || "Attaques chargées non reliées"}</small></span></span><span className="inline-flex items-center justify-center gap-1 rounded-full border border-cyan-200/16 bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50">{entry.variant === "shadow" ? <Shield size={14} /> : <Swords size={14} />}{entry.displayScore ?? entry.score}</span></button>{isOpen ? <PvpDetail entry={entry} references={references} format={selectedFormat} onOpenPokemon={onOpenPokemon} suggestedTeammates={teammateState.data} teammatesLoading={teammateState.loading} teammatesError={teammateState.error} /> : null}</article>; })}
        {!entries.length ? <EmptyState size="section" title="Aucun classement PvP pour ces filtres" /> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-muted">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-foreground-secondary">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
    </div>
  );
}
