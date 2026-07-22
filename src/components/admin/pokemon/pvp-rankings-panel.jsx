"use client";

import { ChevronDown, Download, ExternalLink, RefreshCcw, RotateCcw, Shield, Swords } from "lucide-react";
import { useMemo, useState } from "react";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { PokemonArtwork } from "./pokemon-artwork";

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
    <article className="rounded-xl border border-line bg-surface-subtle p-3" style={{ borderLeft: `4px solid ${typeColors[String(move?.type || "NORMAL").toUpperCase()] || typeColors.NORMAL}` }}>
      <div className="flex flex-wrap items-start justify-between gap-2"><strong className="text-sm text-domain-foreground">{moveName(move)}</strong><div className="flex flex-wrap gap-1">{recommended ? <span className="rounded-full bg-emerald-400/16 px-2 py-0.5 text-[9px] font-black text-emerald-100">RECOMMANDÉE</span> : null}{move?.legacy ? <span className="rounded-full bg-amber-400/16 px-2 py-0.5 text-[9px] font-black text-amber-100">LEGACY</span> : null}</div></div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-foreground-secondary"><TypeIcons types={[move?.type]} size="sm" /><span>{typeLabels[String(move?.type || "").toUpperCase()] || move?.type || "Type absent"}</span><span>{fastMove ? "Immédiate" : "Chargée"}</span></div>
      <dl className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs"><div><dt className="text-disabled">Dégâts</dt><dd>{power || "—"}</dd></div><div><dt className="text-disabled">Énergie</dt><dd>{energy || "—"}</dd></div><div><dt className="text-disabled">{fastMove ? "DPT / EPT" : "DPE"}</dt><dd>{fastMove ? `${dpt?.toFixed(2)} / ${ept?.toFixed(2)}` : ept?.toFixed(2) || "—"}</dd></div></dl>
      {fastMove ? <p className="mt-2 text-xs font-bold text-muted">{turns} tour(s)</p> : null}
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

function PerformanceBars({ scores = {} }) {
  return (
    <section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Performances</h3><div className="mt-4 space-y-3">{performanceRoles.map(([id, label]) => { const value = Number(scores[id] || 0); return <div className="grid grid-cols-[6rem_minmax(0,1fr)_3.5rem] items-center gap-3" key={id}><span className="text-xs font-bold text-foreground-secondary">{label}</span><span className="h-3 overflow-hidden rounded-full bg-black/30"><i className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></span><strong className="text-right font-mono text-sm text-cyan-100">{value || "—"}</strong></div>; })}</div></section>
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
    <div className="space-y-4 border-t border-line p-3 sm:p-5">
      <div className="grid gap-4 xl:grid-cols-2"><section><h3 className="mb-3 font-black text-domain-foreground">Gagne contre · Cote de combat</h3><div className="space-y-2">{(entry.matchups || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good pokemonReferences={references?.pokemon} />)}</div></section><section><h3 className="mb-3 font-black text-domain-foreground">Perd contre · Cote de combat</h3><div className="space-y-2">{(entry.counters || []).map((item) => <MatchupCard key={`${item.sourceId}-${item.rating}`} item={item} good={false} pokemonReferences={references?.pokemon} />)}</div></section></div>
      <div className="grid gap-4 xl:grid-cols-2"><PerformanceBars scores={entry.roleScores} /><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Stats PvP</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-disabled">Attaque</dt><dd className="font-mono font-black">{entry.stats?.attack ?? "—"}</dd></div><div><dt className="text-disabled">Défense</dt><dd className="font-mono font-black">{entry.stats?.defense ?? "—"}</dd></div><div><dt className="text-disabled">Endurance</dt><dd className="font-mono font-black">{entry.stats?.stamina ?? "—"}</dd></div><div><dt className="text-disabled">Stat Product</dt><dd className="font-mono font-black">{entry.stats?.product ?? "—"}</dd></div><div><dt className="text-disabled">Niveau recommandé</dt><dd className="font-mono font-black">{level ?? "Indisponible"}</dd></div><div><dt className="text-disabled">IV exacts</dt><dd className="font-mono font-black">{ivs ? `${ivs.attack}/${ivs.defense}/${ivs.stamina}` : "Indisponibles"}</dd></div><div><dt className="text-disabled">CP cible</dt><dd className="font-mono font-black">{format?.cp || entry.pvp?.cpTarget || "—"}</dd></div><div><dt className="text-disabled">Bonbons XL</dt><dd className="font-black">{needsXl ? "Requis · quantité indisponible" : level == null ? "Indisponible" : "Aucun requis"}</dd></div></dl></section></div>
      {entry.editor?.notes?.English ? <section className="rounded-2xl border border-violet-200/20 bg-violet-300/[0.07] p-4"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-violet-50">Note de la rédaction · {entry.editor.score || "—"}</h3><span className="rounded-full border border-violet-200/20 bg-violet-300/14 px-2 py-0.5 text-[9px] font-black text-violet-100">EN</span></div><p className="mt-3 whitespace-pre-line text-sm font-semibold leading-6 text-foreground-secondary">{entry.editor.notes.English}</p></section> : null}
      <div className="grid gap-4 xl:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques immédiates</h3><div className="mt-3 space-y-2">{attacksFast.map((move) => <MoveBadge key={move.id} move={move} fastMove recommended={move.id === entry.moveset?.fast} />)}{!attacksFast.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque immédiate locale reliée.</p> : null}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Attaques chargées</h3><div className="mt-3 space-y-2">{attacksCharged.map((move) => <MoveBadge key={move.id} move={move} fastMove={false} recommended={entry.moveset?.charged?.includes(move.id)} />)}{!attacksCharged.length ? <p className="text-sm font-bold text-amber-200">Aucune attaque chargée locale reliée.</p> : null}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Types</h3><div className="mt-3 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} />{(entry.pokemon?.types || []).map((type) => <span className="rounded-full border border-line bg-surface-control px-3 py-1 text-sm font-black" key={type}>{typeLabels[String(type).toUpperCase()] || type}</span>)}</div></div><div className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Coût et distance</h3><p className="mt-3 text-sm font-bold text-foreground-secondary">Copain : {entry.pvp?.buddyDistanceKm == null ? "Indisponible" : `${entry.pvp.buddyDistanceKm} km`}</p><p className="mt-1 text-sm font-bold text-foreground-secondary">Seconde attaque : {costs.stardust == null ? "coût local indisponible" : `${Number(costs.stardust).toLocaleString("fr-FR")} poussières`}{costs.candy == null ? "" : ` · ${costs.candy} bonbons`}</p></div></section>
      <div className="grid gap-3 sm:grid-cols-2"><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Faiblesses</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.weaknesses.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 text-xs font-black" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section><section className="rounded-2xl border border-line bg-surface-faint p-4"><h3 className="font-black text-domain-foreground">Résistances</h3><div className="mt-3 flex flex-wrap gap-2">{matchupTypes.resistances.map((item) => <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-control px-2 py-1 text-xs font-black" key={item.type}><TypeIcons types={[item.type]} size="sm" />x{item.multiplier}</span>)}</div></section></div>
      <section className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Coéquipiers suggérés</h3><p className="mt-2 text-sm font-bold text-muted">Cette information n’est pas fournie dans le snapshot PvPoke collecté.</p></div><div className="rounded-2xl border border-dashed border-white/12 p-4"><h3 className="font-black text-domain-foreground">Pokémon similaires</h3><p className="mt-2 text-sm font-bold text-muted">Aucune donnée source fiable disponible pour ce classement.</p></div></section>
      <div className="flex flex-wrap gap-2">{onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}><ExternalLink size={16} /> Fiche Pokémon</button> : null}<span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-minimal px-3 py-2 text-xs font-black text-muted">Comparaison et équipe : liens internes à venir lorsque les données seront disponibles</span></div>
    </div>
  );
}

function FormatSelect({ formats, value, onChange }) {
  const grouped = useMemo(() => Object.entries(categoryLabels).map(([id, label]) => ({ id, label, formats: formats.filter((format) => (format.category || "event-cups") === id) })).filter((group) => group.formats.length), [formats]);
  return <Select className={fieldClass} value={value} onChange={onChange} aria-label="Ligue">{grouped.map((group) => <optgroup label={group.label} key={group.id}>{group.formats.map((format) => <option value={format.id} key={format.id}>{format.label}{format.labelEnglish && format.labelEnglish !== format.label ? ` · ${format.labelEnglish}` : ""} · {format.cp} CP{format.available === false ? " · indisponible" : ""}</option>)}</optgroup>)}</Select>;
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
      <Panel eyebrow="Source officielle · dépôt MIT PvPoke" title="Classements PvP" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} onClick={onDownload} disabled={!dataset}>JSON</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={onRefresh}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate}>Régénérer</Button></div>}><DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} /></Panel>
      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} />
      <div className="grid gap-3 lg:grid-cols-2"><FormatSelect formats={formats} value={options.league} onChange={(event) => { setExpanded(""); onOptionsChange({ ...options, league: event.target.value, page: 1 }); }} /><Select className={fieldClass} value={options.role} onChange={(event) => onOptionsChange({ ...options, role: event.target.value, page: 1 })} aria-label="Classement">{roles.map(([id, label]) => <option value={id === "overall" ? "" : id} key={id}>{label}</option>)}</Select></div>
      <section className="space-y-2" aria-label="Classement PvP">
        {entries.map((entry) => { const key = `${entry.rank}-${entry.sourceIdentity?.speciesId}`; const isOpen = expanded === key; const fast = resolveMove(references, entry.moveset?.fast); const charged = (entry.moveset?.charged || []).map((id) => resolveMove(references, id)); return <article className="overflow-hidden rounded-2xl border border-line" style={typeSurface(entry)} key={key}><button className="grid w-full min-w-0 gap-3 p-3 text-left sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto] sm:items-center" type="button" onClick={() => setExpanded(isOpen ? "" : key)} aria-expanded={isOpen}><span className="flex items-center gap-2 font-mono text-sm font-black text-muted"><ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={16} />#{entry.rank}</span><PokemonArtwork pokemon={entry.pokemon} alt={pokemonName(entry)} className="h-14 w-14 rounded-xl" /><span className="min-w-0"><strong className="block truncate text-base text-domain-foreground">#{entry.pokemon?.dexNr || "—"} {pokemonName(entry)}{entry.variant === "shadow" ? " (Obscur)" : ""}</strong><span className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><small className="font-bold text-foreground-secondary">{moveName(fast)} · {charged.map(moveName).join(" · ") || "Attaques chargées non reliées"}</small></span></span><span className="inline-flex items-center justify-center gap-1 rounded-full border border-cyan-200/16 bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50">{entry.variant === "shadow" ? <Shield size={14} /> : <Swords size={14} />}{entry.displayScore ?? entry.score}</span></button>{isOpen ? <PvpDetail entry={entry} references={references} format={selectedFormat} onOpenPokemon={onOpenPokemon} /> : null}</article>; })}
        {!entries.length ? <p className="rounded-2xl border border-dashed border-white/12 p-8 text-center font-bold text-muted">Aucun classement PvP pour ces filtres.</p> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-muted">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-foreground-secondary">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
    </div>
  );
}
