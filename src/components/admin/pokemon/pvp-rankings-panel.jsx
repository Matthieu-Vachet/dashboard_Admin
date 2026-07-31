"use client";

import { ChevronDown, Download, ExternalLink, Plus, RefreshCcw, RotateCcw, Trash2 } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar as RadarShape, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { uiAssets } from "@/components/site/ui-assets";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { PokemonArtwork } from "./pokemon-artwork";
import { EmptyState } from "@/components/admin/shared/state-system";
import { addChecklistBuild, buffLabels, checklistBuildsForEntry, checklistIdentity, emptyChecklistState, filterChecklistEntries, migrateChecklistState, moveCounts, patchChecklistBuild, performanceRadarData, removeChecklistBuild } from "@/lib/pvp-rankings-display.mjs";
import { fighterFromChecklistBuild, fighterFromRanking, pvpBattleUrl } from "@/lib/pvp-battle-deep-link.mjs";
import { readDashboardStoreValue, writeDashboardStoreValue } from "@/services/admin/dashboard-store";
import { pokemonAdminApiPath } from "@/services/admin/pokemon-admin-api";
import { CandyAssetImage } from "./candy-asset-image";
import { xlCandyRequirement } from "@/lib/pokemon-candy-assets.mjs";
import { enrichPvpRankingWithLocalData, normalizeSuggestedTeammate, pvpTeammatesErrorMessage } from "@/lib/pvp-ranking-local-data.mjs";

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

function RadarTick({ x, y, payload }) {
  return <text x={x} y={y} dy={4} textAnchor="middle" className="fill-slate-300 text-[11px] font-black">{payload?.value}</text>;
}

function PerformanceRadar({ scores = {} }) {
  const data = performanceRadarData(scores);
  return (
    <section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Performances</h3><div className="mt-2 h-72" role="img" aria-label="Radar des six scores de performance PvP"><ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 320, height: 288 }}><RadarChart data={data} outerRadius="72%"><PolarGrid stroke="rgba(148,163,184,.28)" /><PolarAngleAxis dataKey="label" tick={<RadarTick />} /><Tooltip contentStyle={{ background: "#080d1a", border: "1px solid rgba(148,163,184,.24)" }} /><RadarShape dataKey="value" stroke="#22d3ee" fill="#8b5cf6" fillOpacity={0.48} /></RadarChart></ResponsiveContainer></div><div className="grid grid-cols-3 gap-2">{data.map((item) => <span className="text-center type-caption-strong text-muted" key={item.id}>{item.label} <b className="font-mono text-cyan-100">{item.value}</b></span>)}</div></section>
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

function TeammateBadge({ item, onOpenPokemon, onSimulate }) {
  const teammate = normalizeSuggestedTeammate(item);
  const pokemon = teammate.pokemon;
  const label = teammate.label;
  const className = "inline-flex items-center gap-2 rounded-xl border border-line bg-surface-control px-2 py-1 text-sm font-black";
  const content = <><PokemonArtwork pokemon={pokemon} alt={label} className="h-8 w-8 rounded-lg" /><span className="min-w-0"><span className="block truncate">{label}{teammate.shadow ? " (Obscur)" : ""}</span><small className="mt-0.5 flex items-center gap-1 text-muted"><TypeIcons types={pokemon.types} size="sm" />{pokemon.form || pokemon.formId || teammate.form || "Forme non précisée"}</small></span>{teammate.rankOrOrder != null ? <small className="rounded-full bg-cyan-300/10 px-2 py-1 font-mono text-cyan-100">#{teammate.rankOrOrder}</small> : null}</>;
  if (onOpenPokemon && teammate.resolutionStatus === "matched") return <span className="inline-flex flex-wrap items-center gap-1"><button className={className} type="button" onClick={() => onOpenPokemon(pokemon)}>{content}</button>{onSimulate ? <button className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/10" type="button" onClick={() => onSimulate(teammate)} aria-label={`Simuler contre ${label}`} title={`Simuler contre ${label}`}><img className="h-5 w-5 object-contain" src={uiAssets.icons.battle} alt="" /></button> : null}</span>;
  return <span className={className}>{content}{teammate.resolutionStatus !== "matched" ? <small className="text-amber-200">Alias à résoudre</small> : null}</span>;
}

function PvpDetail({ entry, references, format, onOpenPokemon, onSimulate, onSimulateTeammate, suggestedTeammates, teammatesLoading, teammatesError }) {
  const fastRecommended = resolveMove(references, entry.moveset?.fast);
  const chargedRecommended = (entry.moveset?.charged || []).map((id) => resolveMove(references, id));
  const allFast = (entry.pvp?.allMoves?.fast || []).map((id) => resolveMove(references, id));
  const allCharged = (entry.pvp?.allMoves?.charged || []).map((id) => resolveMove(references, id));
  const attacksFast = allFast.length ? allFast : fastRecommended ? [fastRecommended] : [];
  const attacksCharged = allCharged.length ? allCharged : chargedRecommended;
  const matchupTypes = combinedTypeMatchups(entry.pokemon?.types, references?.types);
  const ivs = entry.pvp?.ivs;
  const level = entry.pvp?.level;
  const xlRequirement = xlCandyRequirement(entry);
  const candyFamilyId = entry.pvp?.candyFamilyId ?? entry.pokemon?.assets?.candy?.familyId;
  const candyXlImage = entry.pokemon?.assets?.candy?.xlImage;
  const costs = entry.pvp?.secondChargedMoveCost || {};
  const rank1Stats = entry.rank1?.stats || entry.stats || {};

  return (
    <div className="space-y-4 border-t border-line p-3 sm:p-5">
      <div className="grid gap-4 xl:grid-cols-2"><section><h3 className="mb-3 font-black text-domain-foreground">Gagne contre · Cote de combat</h3><div className="space-y-2">{(entry.matchups || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good pokemonReferences={references?.pokemon} />)}</div></section><section><h3 className="mb-3 font-black text-domain-foreground">Perd contre · Cote de combat</h3><div className="space-y-2">{(entry.counters || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good={false} pokemonReferences={references?.pokemon} />)}</div></section></div>
      <div className="grid gap-4 xl:grid-cols-2"><PerformanceRadar scores={entry.roleScores} /><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Stats PvP · Rank 1</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-disabled">Attaque</dt><dd className="font-mono font-black">{rank1Stats.attack ?? "—"}</dd></div><div><dt className="text-disabled">Défense</dt><dd className="font-mono font-black">{rank1Stats.defense ?? "—"}</dd></div><div><dt className="text-disabled">Endurance</dt><dd className="font-mono font-black">{rank1Stats.stamina ?? "—"}</dd></div><div><dt className="text-disabled">Stat Product</dt><dd className="font-mono font-black">{entry.rank1?.statProduct ?? entry.stats?.product ?? "—"}</dd></div><div><dt className="text-disabled">Niveau recommandé</dt><dd className="font-mono font-black">{level ?? "Indisponible"}</dd></div><div><dt className="text-disabled">IV exacts</dt><dd className="font-mono font-black">{ivs ? `${ivs.attack}/${ivs.defense}/${ivs.stamina}` : "Indisponibles"}</dd></div><div><dt className="text-disabled">CP obtenu / plafond</dt><dd className="font-mono font-black">{entry.pvp?.cp ?? "—"} / {format?.cp || entry.pvp?.cpTarget || "—"}</dd></div><div><dt className="text-disabled">Bonbons XL</dt><dd className="mt-1 flex items-center gap-2 font-black"><CandyAssetImage familyId={candyFamilyId} xlUrl={candyXlImage} kind="xl" className="h-8 w-8" />{xlRequirement.label}</dd></div></dl></section></div>
      {entry.editor?.notes?.English ? <section className="rounded-2xl border border-violet-200/20 bg-violet-300/[0.07] p-4"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-violet-50">Note de la rédaction · {entry.editor.score || "—"}</h3><span className="rounded-full border border-violet-200/20 bg-violet-300/14 px-2 py-0.5 text-[9px] font-black text-violet-100">EN</span></div><p className="mt-3 whitespace-pre-line type-body-strong text-foreground-secondary">{entry.editor.notes.English}</p></section> : null}
      <div className="grid gap-4 xl:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques immédiates</h3><div className="mt-3 space-y-2">{attacksFast.map((move) => <MoveBadge key={move.id} move={move} fastMove recommended={move.id === entry.moveset?.fast} />)}{!attacksFast.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque immédiate locale reliée.</p> : null}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques chargées</h3><div className="mt-3 space-y-2">{attacksCharged.map((move) => <MoveBadge key={move.id} move={move} fastMove={false} selectedFastMove={fastRecommended} recommended={entry.moveset?.charged?.includes(move.id)} />)}{!attacksCharged.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque chargée locale reliée.</p> : null}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Types</h3><div className="mt-3 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} />{(entry.pokemon?.types || []).map((type) => <span className="rounded-full border border-line bg-surface-control px-3 py-1 text-sm font-black" key={type}>{typeLabels[String(type).toUpperCase()] || type}</span>)}</div></div><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Coût et distance</h3><p className="mt-3 text-sm font-bold text-foreground-secondary">Copain : {entry.pvp?.buddyDistanceKm == null ? "Indisponible" : `${entry.pvp.buddyDistanceKm} km`}</p><p className="mt-1 text-sm font-bold text-foreground-secondary">Seconde attaque : {costs.stardust == null ? "coût local indisponible" : `${Number(costs.stardust).toLocaleString("fr-FR")} poussières`}{costs.candy == null ? "" : ` · ${costs.candy} bonbons`}</p></div></section>
      <div className="grid gap-3 sm:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Faiblesses</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.weaknesses.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 type-label" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Résistances</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.resistances.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 type-label" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Coéquipiers suggérés</h3>{teammatesLoading ? <p className="mt-2 animate-pulse text-sm font-bold text-cyan-100 motion-reduce:animate-none">Calcul PvPoke en cours…</p> : suggestedTeammates?.length ? <div className="mt-3 flex flex-wrap gap-2">{suggestedTeammates.map((item) => <TeammateBadge item={item} onOpenPokemon={onOpenPokemon} onSimulate={(teammate) => onSimulateTeammate?.(entry, teammate)} key={`${item.rankOrOrder}-${item.providerAlias}`} />)}</div> : <p className={`mt-2 text-sm font-bold ${teammatesError ? "text-amber-200" : "text-muted"}`}>{teammatesError || "Aucun partenaire exact retourné par la fiche PvPoke."}</p>}</div><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Pokémon similaires</h3><p className="mt-2 text-sm font-bold text-muted">Aucune donnée source exacte n’est publiée dans le snapshot de classement.</p></div></section>
      <div className="flex flex-wrap gap-2">{onSimulate && fighterFromRanking(entry) ? <Button variant="primary" icon={<img className="h-5 w-5 object-contain" src={uiAssets.icons.battle} alt="" />} onClick={() => onSimulate(entry)}>Simuler · Rank 1</Button> : null}{onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}><ExternalLink size={16} /> Fiche Pokémon</button> : null}</div>
    </div>
  );
}

function PvpChecklist({ league, sourceHash, onOpenPokemon }) {
  const [catalogue, setCatalogue] = useState([]);
  const [state, setState] = useState(emptyChecklistState());
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
      const migrated = migrateChecklistState(stored.value, rankings, league);
      setState(migrated);
      if (stored.configured !== false && JSON.stringify(migrated) !== JSON.stringify(stored.value)) void writeDashboardStoreValue(checklistStoreKey, migrated);
    }).catch(() => {
      if (!cancelled) setCatalogue([]);
    }).finally(() => {
      if (!cancelled) setLoadedKey(requestKey);
    });
    return () => { cancelled = true; };
  }, [league, requestKey]);

  const owned = useMemo(() => state.contexts?.[league] || { builds: {} }, [league, state.contexts]);
  const visible = useMemo(() => filterChecklistEntries({ catalogue, owned, query: deferredQuery, filter, sort }), [catalogue, deferredQuery, filter, owned, sort]);
  const ownedCount = Object.values(owned.builds || {}).filter((build) => build?.owned !== false).length;

  function persist(next) {
    next = { ...next, updatedAt: new Date().toISOString() };
    setState(next);
    void writeDashboardStoreValue(checklistStoreKey, next);
  }

  function add(entry, duplicate = false) {
    persist(addChecklistBuild(state, league, entry, { allowDuplicate: duplicate }));
  }

  function patch(buildId, update) {
    persist(patchChecklistBuild(state, league, buildId, { ...update, source: "mes-iv" }));
  }

  function simulate(build) {
    const fighter = fighterFromChecklistBuild(build);
    if (fighter) window.location.assign(pvpBattleUrl({ leagueId: league, pokemon: [fighter], strategy: { baiting: "selective" } }));
  }

  return <Panel eyebrow="Persistée par compte Dashboard · schéma v2" title="Ma checklist PvP"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-foreground-secondary"><strong className="font-mono text-cyan-100">{ownedCount}</strong> build(s) possédé(s) · {catalogue.length} entrées · ligue <strong>{league}</strong></p>{!configured ? <span className="type-label text-amber-200">MongoDB Dashboard non configuré</span> : null}</div><div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_12rem_12rem]"><input className={fieldClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans la ligue active" aria-label="Rechercher dans la checklist PvP" /><Select className={fieldClass} value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filtre checklist"><option value="all">Tous</option><option value="owned">Possédés</option><option value="missing">Manquants</option></Select><Select className={fieldClass} value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Tri checklist"><option value="rank">Rang</option><option value="name">Nom</option><option value="type">Type</option></Select></div>{loading ? <p className="mt-4 text-sm font-bold text-muted">Chargement du catalogue complet…</p> : <div className="mt-4 grid max-h-[54rem] gap-3 overflow-y-auto pr-1 xl:grid-cols-2">{visible.map((entry) => { const id = checklistIdentity(entry); const builds = checklistBuildsForEntry(state, league, entry); return <article className={`rounded-2xl border p-3 [content-visibility:auto] ${builds.length ? "border-emerald-300/25 bg-emerald-400/[0.06]" : "border-line bg-surface-faint"}`} key={`${entry.rank}-${id}`}><header className="flex items-center gap-3"><PokemonArtwork pokemon={entry.pokemon} alt={pokemonName(entry)} className="h-12 w-12 rounded-xl" /><div className="min-w-0 flex-1"><strong className="block truncate">#{entry.rank} {pokemonName(entry)}</strong><TypeIcons types={entry.pokemon?.types} size="sm" /></div><Button size="sm" icon={<Plus size={15} />} disabled={!entry.rank1} onClick={() => add(entry, builds.length > 0)}>{builds.length ? "Build" : "Rank 1"}</Button></header>{!entry.rank1 ? <p className="mt-3 type-caption-strong text-amber-200">Cette information n’est pas fournie : la source ne permet pas un build Rank 1 légal.</p> : null}<div className="mt-3 space-y-3">{builds.map((build) => <section className="rounded-xl border border-line bg-surface-control p-3" key={build.buildId}><div className="flex flex-wrap items-center justify-between gap-2"><span className={`rounded-full px-2 py-1 text-[10px] font-black ${build.source === "rank-1" || build.source === "migration-rank-1" ? "bg-cyan-300/12 text-cyan-100" : "bg-violet-300/12 text-violet-100"}`}>{build.source === "rank-1" || build.source === "migration-rank-1" ? "Rank 1" : "Mes IV"}</span><div className="flex gap-1"><Button size="sm" variant="primary" icon={<img className="h-4 w-4 object-contain" src={uiAssets.icons.battle} alt="" />} onClick={() => simulate(build)}>Simuler</Button><Button size="icon" variant="ghost" icon={<Trash2 size={15} />} aria-label="Supprimer ce build" onClick={() => persist(removeChecklistBuild(state, league, build.buildId))} /></div></div><div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{[["Atk", "attack"], ["Def", "defense"], ["HP", "stamina"]].map(([label, key]) => <label className="text-[10px] font-black text-muted" key={key}>{label}<input className={`${fieldClass} mt-1 px-2`} type="number" min="0" max="15" value={build.ivs[key]} onChange={(event) => patch(build.buildId, { ivs: { ...build.ivs, [key]: Number(event.target.value) } })} /></label>)}<label className="text-[10px] font-black text-muted">Niv.<input className={`${fieldClass} mt-1 px-2`} type="number" min="1" max="55" step="0.5" value={build.level} onChange={(event) => patch(build.buildId, { level: Number(event.target.value) })} /></label><label className="text-[10px] font-black text-muted">PC<input className={`${fieldClass} mt-1 px-2`} type="number" min="10" max="10000" value={build.cp || ""} onChange={(event) => patch(build.buildId, { cp: Number(event.target.value) })} /></label><label className="text-[10px] font-black text-muted">Rang<input className={`${fieldClass} mt-1 px-2`} type="number" min="1" value={build.rank || ""} onChange={(event) => patch(build.buildId, { rank: Number(event.target.value) })} /></label></div></section>)}</div>{onOpenPokemon ? <button className="mt-2 text-[10px] font-black text-cyan-200" type="button" onClick={() => onOpenPokemon(entry.pokemon)}>Ouvrir la fiche</button> : null}</article>; })}{!visible.length ? <EmptyState size="section" title="Aucun Pokémon dans ce filtre" /> : null}</div>}</Panel>;
}

function FormatSelect({ formats, value, onChange }) {
  const grouped = useMemo(() => Object.entries(categoryLabels).map(([id, label]) => ({ id, label, formats: formats.filter((format) => (format.category || "event-cups") === id) })).filter((group) => group.formats.length), [formats]);
  return <Select className={fieldClass} value={value} onChange={onChange} aria-label="Ligue">{grouped.map((group) => <optgroup label={group.label} key={group.id}>{group.formats.map((format) => <option value={format.id} key={format.id}>{format.label}{format.labelEnglish && format.labelEnglish !== format.label ? ` · ${format.labelEnglish}` : ""} · {format.cp} CP{format.available === false ? " · indisponible" : ""}</option>)}</optgroup>)}</Select>;
}

export function PvpRankingsPanel({ dataset, localEntries = [], loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onOpenPokemon }) {
  const [view, setView] = useState("rankings");
  const [expanded, setExpanded] = useState("");
  const [teammatesByEntry, setTeammatesByEntry] = useState({});
  const rawEntries = useMemo(() => dataset?.data?.rankings || [], [dataset?.data?.rankings]);
  const entries = useMemo(
    () => rawEntries.map((entry) => enrichPvpRankingWithLocalData(entry, localEntries)),
    [rawEntries, localEntries],
  );
  const formats = dataset?.data?.formats || [];
  const references = dataset?.data?.references || { moves: {}, types: {} };
  const roles = dataset?.data?.roles?.length ? dataset.data.roles.map((role) => [role.id, role.label]) : fallbackRoles;
  const meta = dataset?.meta || {};
  const selectedFormat = formats.find((format) => format.id === (dataset?.data?.league || options.league));
  const league = dataset?.data?.league || options.league;

  function simulateRanking(entry) {
    const fighter = fighterFromRanking(entry, "Rank 1");
    if (fighter) window.location.assign(pvpBattleUrl({ leagueId: league, pokemon: [fighter], strategy: { baiting: "selective" } }));
  }

  function simulateTeammate(entry, teammate) {
    const fighter = fighterFromRanking(entry, "Rank 1");
    if (!fighter || !teammate?.canonicalId) return;
    window.location.assign(pvpBattleUrl({
      leagueId: league,
      pokemon: [fighter, { canonicalId: teammate.canonicalId, presetLabel: "Rank 1" }],
      strategy: { baiting: "selective" },
    }));
  }

  async function loadSuggestedTeammates(entry) {
    const speciesId = entry.sourceIdentity?.speciesId;
    const cacheKey = `${league}:${speciesId}`;
    if (!speciesId || teammatesByEntry[cacheKey]) return;
    setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: true, data: [], error: "" } }));
    try {
      const params = new URLSearchParams({ action: "pvp-teammates", league, speciesId });
      const response = await fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || !Array.isArray(payload.data?.data)) throw new Error(pvpTeammatesErrorMessage(payload));
      setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: false, data: payload.data.data, error: "" } }));
    } catch (error) {
      setTeammatesByEntry((current) => ({ ...current, [cacheKey]: { loading: false, data: [], error: error.message || "Suggested Teammates indisponibles." } }));
    }
  }

  return (
    <div className="space-y-5">
      <Panel eyebrow="Source officielle · dépôt MIT PvPoke" title="Classements PvP" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} onClick={onDownload} disabled={!dataset}>JSON</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={onRefresh}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate}>Régénérer</Button></div>}><DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} /></Panel>
      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-surface-inset-subtle p-2" role="tablist" aria-label="Vues PvP"><button className={`min-h-11 rounded-xl px-4 text-sm font-black ${view === "rankings" ? "bg-cyan-300/14 text-cyan-50" : "text-muted"}`} type="button" role="tab" aria-selected={view === "rankings"} onClick={() => setView("rankings")}>Classements</button><button className={`min-h-11 rounded-xl px-4 text-sm font-black ${view === "checklist" ? "bg-cyan-300/14 text-cyan-50" : "text-muted"}`} type="button" role="tab" aria-selected={view === "checklist"} onClick={() => setView("checklist")}>Ma Checklist</button></div>
      {view === "checklist" ? <PvpChecklist league={dataset?.data?.league || options.league} sourceHash={dataset?.meta?.sourceHash} onOpenPokemon={onOpenPokemon} /> : <>
      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} />
      <div className="grid gap-3 lg:grid-cols-2"><FormatSelect formats={formats} value={options.league} onChange={(event) => { setExpanded(""); onOptionsChange({ ...options, league: event.target.value, page: 1 }); }} /><Select className={fieldClass} value={options.role} onChange={(event) => onOptionsChange({ ...options, role: event.target.value, page: 1 })} aria-label="Classement">{roles.map(([id, label]) => <option value={id === "overall" ? "" : id} key={id}>{label}</option>)}</Select></div>
      <section className="space-y-2" aria-label="Classement PvP">
        {entries.map((entry) => { const key = `${entry.rank}-${entry.sourceIdentity?.speciesId}`; const teammateKey = `${league}:${entry.sourceIdentity?.speciesId}`; const teammateState = teammatesByEntry[teammateKey] || {}; const isOpen = expanded === key; const fast = resolveMove(references, entry.moveset?.fast); const charged = (entry.moveset?.charged || []).map((id) => resolveMove(references, id)); return <article className="overflow-hidden rounded-2xl border border-line" style={typeSurface(entry)} key={key}><button className="grid w-full min-w-0 gap-3 p-3 text-left sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto] sm:items-center" type="button" onClick={() => { setExpanded(isOpen ? "" : key); if (!isOpen) void loadSuggestedTeammates(entry); }} aria-expanded={isOpen}><span className="flex items-center gap-2 font-mono text-sm font-black text-muted"><ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={16} />#{entry.rank}</span><PokemonArtwork pokemon={entry.pokemon} alt={pokemonName(entry)} className="h-14 w-14 rounded-xl" /><span className="min-w-0"><strong className="block truncate text-base text-domain-foreground">#{entry.pokemon?.dexNr || "—"} {pokemonName(entry)}{entry.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><small className="font-bold text-foreground-secondary">{moveName(fast)} · {charged.map(moveName).join(" · ") || "Attaques chargées non reliées"}</small></span></span><span className="inline-flex items-center justify-center gap-1 rounded-full border border-cyan-200/16 bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50"><img className="h-4 w-4 object-contain" src={entry.variant === "shadow" ? uiAssets.icons.shadow : uiAssets.icons.chargedAttack} alt="" />{entry.displayScore ?? entry.score}</span></button>{isOpen ? <PvpDetail entry={entry} references={references} format={selectedFormat} onOpenPokemon={onOpenPokemon} onSimulate={simulateRanking} onSimulateTeammate={simulateTeammate} suggestedTeammates={teammateState.data} teammatesLoading={teammateState.loading} teammatesError={teammateState.error} /> : null}</article>; })}
        {!entries.length ? <EmptyState size="section" title="Aucun classement PvP pour ces filtres" /> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-muted">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-foreground-secondary">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
      </>}
    </div>
  );
}
