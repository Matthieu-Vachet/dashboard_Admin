"use client";

import { ChevronDown, Download, ExternalLink, RefreshCcw, RotateCcw, Shield, Swords } from "lucide-react";
import { useMemo, useState } from "react";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";

const fallbackRoles = [
  ["overall", "Classement total"], ["lead", "Ouverture"], ["closer", "Fermeur"], ["switch", "Changement"],
  ["charger", "Chargeur"], ["attacker", "Attaquant"], ["consistency", "Cohérence"],
  ["stat-product", "Stat Product"], ["offense", "Offense"], ["defense", "Défense"], ["stamina", "Endurance"],
];
const performanceRoles = [["lead", "Ouverture"], ["switch", "Changement"], ["charger", "Chargeur"], ["closer", "Fermeur"], ["consistency", "Cohérence"], ["attacker", "Attaquant"]];
const categoryLabels = { standards: "Standards", "little-cups": "Little Cups", "seasonal-cups": "Coupes saisonnières", "event-cups": "Coupes événementielles", "battle-frontier": "Battle Frontier", custom: "Personnalisés" };

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

function MoveBadge({ move, recommended, fastMove }) {
  const combat = move?.combat || {};
  const energy = Math.abs(Number(combat.energy || move?.energy || 0));
  const turns = Math.max(1, Number(combat.turns || 1));
  const power = Number(combat.power || move?.power || 0);
  const dpt = fastMove ? power / turns : null;
  const ept = fastMove ? energy / turns : (energy ? power / energy : null);
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.055] p-3" style={{ borderLeft: `4px solid ${typeColors[String(move?.type || "NORMAL").toUpperCase()] || typeColors.NORMAL}` }}>
      <div className="flex flex-wrap items-start justify-between gap-2"><strong className="text-sm text-white">{moveName(move)}</strong><div className="flex flex-wrap gap-1">{recommended ? <span className="rounded-full bg-emerald-400/16 px-2 py-0.5 text-[9px] font-black text-emerald-100">RECOMMANDÉE</span> : null}{move?.legacy ? <span className="rounded-full bg-amber-400/16 px-2 py-0.5 text-[9px] font-black text-amber-100">LEGACY</span> : null}</div></div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300"><TypeIcons types={[move?.type]} size="sm" /><span>{typeLabels[String(move?.type || "").toUpperCase()] || move?.type || "Type absent"}</span><span>{fastMove ? "Immédiate" : "Chargée"}</span></div>
      <dl className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs"><div><dt className="text-slate-500">Dégâts</dt><dd>{power || "—"}</dd></div><div><dt className="text-slate-500">Énergie</dt><dd>{energy || "—"}</dd></div><div><dt className="text-slate-500">{fastMove ? "DPT / EPT" : "DPE"}</dt><dd>{fastMove ? `${dpt?.toFixed(2)} / ${ept?.toFixed(2)}` : ept?.toFixed(2) || "—"}</dd></div></dl>
      {fastMove ? <p className="mt-2 text-xs font-bold text-slate-400">{turns} tour(s)</p> : null}
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
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-black/20 p-1">{pokemon.assets?.image ? <img className="h-full w-full object-contain" src={pokemon.assets.image} alt="" loading="lazy" /> : <span className="text-[9px] font-black text-amber-200">ABSENT</span>}</span>
      <span className="min-w-0"><strong className="block truncate text-sm text-white">{name}{item.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex items-center gap-2"><TypeIcons types={pokemon.types} size="sm" /><small className="text-slate-400">{pokemon.formId || "Forme non reliée"}</small></span></span>
      <span className="text-right"><small className="block text-[9px] font-black uppercase text-slate-500">Cote de combat</small><strong className={`font-mono text-lg ${good ? "text-emerald-200" : "text-rose-200"}`}>{item.rating}</strong></span>
    </article>
  );
}

function PerformanceBars({ scores = {} }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Performances</h3><div className="mt-4 space-y-3">{performanceRoles.map(([id, label]) => { const value = Number(scores[id] || 0); return <div className="grid grid-cols-[6rem_minmax(0,1fr)_3.5rem] items-center gap-3" key={id}><span className="text-xs font-bold text-slate-300">{label}</span><span className="h-3 overflow-hidden rounded-full bg-black/30"><i className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></span><strong className="text-right font-mono text-sm text-cyan-100">{value || "—"}</strong></div>; })}</div></section>
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

function PvpDetail({ entry, references, format, onOpenPokemon }) {
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

  return (
    <div className="space-y-4 border-t border-white/10 p-3 sm:p-5">
      <div className="grid gap-4 xl:grid-cols-2"><section><h3 className="mb-3 font-black text-white">Gagne contre · Cote de combat</h3><div className="space-y-2">{(entry.matchups || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good pokemonReferences={references?.pokemon} />)}</div></section><section><h3 className="mb-3 font-black text-white">Perd contre · Cote de combat</h3><div className="space-y-2">{(entry.counters || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good={false} pokemonReferences={references?.pokemon} />)}</div></section></div>
      <div className="grid gap-4 xl:grid-cols-2"><PerformanceBars scores={entry.roleScores} /><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Stats PvP</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-500">Attaque</dt><dd className="font-mono font-black">{entry.stats?.attack ?? "—"}</dd></div><div><dt className="text-slate-500">Défense</dt><dd className="font-mono font-black">{entry.stats?.defense ?? "—"}</dd></div><div><dt className="text-slate-500">Endurance</dt><dd className="font-mono font-black">{entry.stats?.stamina ?? "—"}</dd></div><div><dt className="text-slate-500">Stat Product</dt><dd className="font-mono font-black">{entry.stats?.product ?? "—"}</dd></div><div><dt className="text-slate-500">Niveau recommandé</dt><dd className="font-mono font-black">{level ?? "Indisponible"}</dd></div><div><dt className="text-slate-500">IV exacts</dt><dd className="font-mono font-black">{ivs ? `${ivs.attack}/${ivs.defense}/${ivs.stamina}` : "Indisponibles"}</dd></div><div><dt className="text-slate-500">CP cible</dt><dd className="font-mono font-black">{format?.cp || entry.pvp?.cpTarget || "—"}</dd></div><div><dt className="text-slate-500">Bonbons XL</dt><dd className="font-black">{needsXl ? "Requis · quantité indisponible" : level == null ? "Indisponible" : "Aucun requis"}</dd></div></dl></section></div>
      {entry.editor?.notes?.English ? <section className="rounded-2xl border border-violet-200/20 bg-violet-300/[0.07] p-4"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-violet-50">Note de la rédaction · {entry.editor.score || "—"}</h3><span className="rounded-full border border-violet-200/20 bg-violet-300/14 px-2 py-0.5 text-[9px] font-black text-violet-100">EN</span></div><p className="mt-3 whitespace-pre-line text-sm font-semibold leading-6 text-slate-300">{entry.editor.notes.English}</p></section> : null}
      <div className="grid gap-4 xl:grid-cols-2"><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Attaques immédiates</h3><div className="mt-3 space-y-2">{attacksFast.map((move) => <MoveBadge key={move.id} move={move} fastMove recommended={move.id === entry.moveset?.fast} />)}{!attacksFast.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque immédiate locale reliée.</p> : null}</div></section><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Attaques chargées</h3><div className="mt-3 space-y-2">{attacksCharged.map((move) => <MoveBadge key={move.id} move={move} fastMove={false} recommended={entry.moveset?.charged?.includes(move.id)} />)}{!attacksCharged.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque chargée locale reliée.</p> : null}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Types</h3><div className="mt-3 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} />{(entry.pokemon?.types || []).map((type) => <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-black" key={type}>{typeLabels[String(type).toUpperCase()] || type}</span>)}</div></div><div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Coût et distance</h3><p className="mt-3 text-sm font-bold text-slate-300">Copain : {entry.pvp?.buddyDistanceKm == null ? "Indisponible" : `${entry.pvp.buddyDistanceKm} km`}</p><p className="mt-1 text-sm font-bold text-slate-300">Seconde attaque : {costs.stardust == null ? "coût local indisponible" : `${Number(costs.stardust).toLocaleString("fr-FR")} poussières`}{costs.candy == null ? "" : ` · ${costs.candy} bonbons`}</p></div></section>
      <div className="grid gap-3 sm:grid-cols-2"><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Faiblesses</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.weaknesses.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-black" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><h3 className="font-black text-white">Résistances</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.resistances.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-black" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-white">Coéquipiers suggérés</h3><p className="mt-2 text-sm font-bold text-slate-400">Cette information n’est pas fournie dans le snapshot PvPoke collecté.</p></div><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-white">Pokémon similaires</h3><p className="mt-2 text-sm font-bold text-slate-400">Aucune donnée source fiable disponible pour ce classement.</p></div></section>
      <div className="flex flex-wrap gap-2">{onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}><ExternalLink size={16} /> Fiche Pokémon</button> : null}<span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-400">Comparaison et équipe : liens internes à venir lorsque les données seront disponibles</span></div>
    </div>
  );
}

function FormatSelect({ formats, value, onChange }) {
  const grouped = useMemo(() => Object.entries(categoryLabels).map(([id, label]) => ({ id, label, formats: formats.filter((format) => (format.category || "event-cups") === id) })).filter((group) => group.formats.length), [formats]);
  return <select className={fieldClass} value={value} onChange={onChange} aria-label="Ligue">{grouped.map((group) => <optgroup label={group.label} key={group.id}>{group.formats.map((format) => <option value={format.id} key={format.id}>{format.label}{format.labelEnglish && format.labelEnglish !== format.label ? ` · ${format.labelEnglish}` : ""} · {format.cp} CP{format.available === false ? " · indisponible" : ""}</option>)}</optgroup>)}</select>;
}

export function PvpRankingsPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onOpenPokemon }) {
  const [expanded, setExpanded] = useState("");
  const entries = dataset?.data?.rankings || [];
  const formats = dataset?.data?.formats || [];
  const references = dataset?.data?.references || { moves: {}, types: {} };
  const roles = dataset?.data?.roles?.length ? dataset.data.roles.map((role) => [role.id, role.label]) : fallbackRoles;
  const meta = dataset?.meta || {};
  const selectedFormat = formats.find((format) => format.id === (dataset?.data?.league || options.league));

  return (
    <div className="space-y-5">
      <Panel eyebrow="Source officielle · dépôt MIT PvPoke" title="Classements PvP" action={<div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}><Download size={16} /> JSON</button><button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button><button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}><RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Régénérer</button></div>}><DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} /></Panel>
      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} />
      <div className="grid gap-3 lg:grid-cols-2"><FormatSelect formats={formats} value={options.league} onChange={(event) => { setExpanded(""); onOptionsChange({ ...options, league: event.target.value, page: 1 }); }} /><select className={fieldClass} value={options.role} onChange={(event) => onOptionsChange({ ...options, role: event.target.value, page: 1 })} aria-label="Classement">{roles.map(([id, label]) => <option value={id === "overall" ? "" : id} key={id}>{label}</option>)}</select></div>
      <section className="space-y-2" aria-label="Classement PvP">
        {entries.map((entry) => { const key = `${entry.rank}-${entry.sourceIdentity?.speciesId}`; const isOpen = expanded === key; const fast = resolveMove(references, entry.moveset?.fast); const charged = (entry.moveset?.charged || []).map((id) => resolveMove(references, id)); return <article className="overflow-hidden rounded-2xl border border-white/10" style={typeSurface(entry)} key={key}><button className="grid w-full min-w-0 gap-3 p-3 text-left sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto] sm:items-center" type="button" onClick={() => setExpanded(isOpen ? "" : key)} aria-expanded={isOpen}><span className="flex items-center gap-2 font-mono text-sm font-black text-slate-400"><ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={16} />#{entry.rank}</span><span className="grid h-14 w-14 place-items-center rounded-xl bg-black/20 p-1">{entry.pokemon?.assets?.image ? <img className="h-full w-full object-contain" src={entry.pokemon.assets.image} alt="" loading="lazy" /> : <span className="text-[9px] font-black text-amber-200">ASSET ABSENT</span>}</span><span className="min-w-0"><strong className="block truncate text-base text-white">#{entry.pokemon?.dexNr || "—"} {pokemonName(entry)}{entry.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><small className="font-bold text-slate-300">{moveName(fast)} · {charged.map(moveName).join(" · ") || "Attaques chargées non reliées"}</small></span></span><span className="inline-flex items-center justify-center gap-1 rounded-full border border-cyan-200/16 bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50">{entry.variant === "shadow" ? <Shield size={14} /> : <Swords size={14} />}{entry.displayScore ?? entry.score}</span></button>{isOpen ? <PvpDetail entry={entry} references={references} format={selectedFormat} onOpenPokemon={onOpenPokemon} /> : null}</article>; })}
        {!entries.length ? <p className="rounded-2xl border border-dashed border-white/12 p-8 text-center font-bold text-slate-400">Aucun classement PvP pour ces filtres.</p> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-slate-400">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-slate-300">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
    </div>
  );
}
