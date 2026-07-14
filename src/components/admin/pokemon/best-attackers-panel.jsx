"use client";

import { Download, RefreshCcw, RotateCcw, Swords, Trophy } from "lucide-react";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { TypeIcons } from "./asset-icons";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { DatasetSourceHeader } from "./dataset-source-header";
import { PokemonArtwork } from "./pokemon-artwork";
import { PokemonStateIndicators } from "./pokemon-state-indicators";

const typeOrder = ["ANY", "NORMAL", "FIGHTING", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST", "STEEL", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE", "DRAGON", "DARK", "FAIRY"];
const metricLabels = { edps: "eDPS · efficacité réelle", dps: "DPS · dégâts/seconde", tdo: "TDO · dégâts totaux" };
const movesetLabels = { "": "Tous les movesets", "on-type": "Deux attaques du type", "same-type": "Même type", mixed: "Mixte", "off-type": "Hors type" };

function nameOf(value) {
  return value?.names?.French || value?.names?.English || value?.id || "Non relié";
}

function metricValue(entry, metric) {
  return Number(entry?.[metric] || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: metric === "tdo" ? 1 : 2 });
}

function typeSurface(entry) {
  const type = String(entry.pokemon?.types?.[0] || "NORMAL").toUpperCase();
  const color = typeColors[type] || typeColors.NORMAL;
  return { backgroundImage: `linear-gradient(110deg, ${color}20, rgba(2,6,23,.90) 58%)` };
}

export function BestAttackersPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onOpenPokemon }) {
  const entries = dataset?.data?.rankings || [];
  const apiOptions = dataset?.data?.options || { levels: [30, 40, 50], types: typeOrder, metrics: ["edps", "dps", "tdo"] };
  const meta = dataset?.meta || {};
  const setOption = (key, value) => onOptionsChange({ ...options, [key]: value, page: 1 });
  const toggles = [
    ["shadow", "Obscurs", options.shadow === true],
    ["mega", "Méga / Primo", options.mega === true],
    ["elite", "Attaques élite", options.elite === true],
  ].map(([id, label, active]) => ({ id, label, active, onClick: () => setOption(id, active ? "" : true) }));

  return (
    <div className="space-y-5">
      <Panel eyebrow="Moteur DialgaDex · données locales PokemonGo-Data" title="Meilleurs attaquants PvE" action={<div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}><Download size={16} /> JSON</button><button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button><button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}><RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Régénérer</button></div>}>
        <DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} />
        <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.07] p-4 text-sm font-bold leading-6 text-slate-300">Les formules sont wrappées depuis DialgaDex avec l’accord du propriétaire. Pokémon, formes, attaques, sorties et images viennent exclusivement des référentiels locaux.</p>
      </Panel>
      <DatasetFilterBar query={options.search} onQueryChange={(search) => setOption("search", search)} placeholder="Pokémon, forme ou attaque…" resultCount={entries.length} totalCount={meta.total || entries.length} toggles={toggles} />
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5" aria-label="Filtres Best Attackers">
        <label><span className="mb-1 block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Type</span><select className={fieldClass} value={options.type} onChange={(event) => setOption("type", event.target.value)}>{typeOrder.filter((type) => apiOptions.types.includes(type)).map((type) => <option value={type} key={type}>{type === "ANY" ? "Tous les types" : typeLabels[type] || type}</option>)}</select></label>
        <label><span className="mb-1 block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Niveau</span><select className={fieldClass} value={options.level} onChange={(event) => setOption("level", Number(event.target.value))}>{apiOptions.levels.map((level) => <option value={level} key={level}>Niveau {level}</option>)}</select></label>
        <label><span className="mb-1 block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Métrique</span><select className={fieldClass} value={options.metric} onChange={(event) => setOption("metric", event.target.value)}>{apiOptions.metrics.map((metric) => <option value={metric} key={metric}>{metricLabels[metric] || metric}</option>)}</select></label>
        <label><span className="mb-1 block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Moveset</span><select className={fieldClass} value={options.movesetClass} onChange={(event) => setOption("movesetClass", event.target.value)}>{Object.entries(movesetLabels).map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select></label>
        <label><span className="mb-1 block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Classe</span><select className={fieldClass} value={options.class} onChange={(event) => setOption("class", event.target.value)}><option value="">Toutes</option><option value="LEGENDARY">Légendaire</option><option value="MYTHIC">Fabuleux</option><option value="ULTRA_BEAST">Ultra-Chimère</option></select></label>
      </section>
      <section className="space-y-2" aria-label="Classement des meilleurs attaquants">
        {entries.map((entry) => (
          <article className="grid min-w-0 gap-3 rounded-2xl border border-white/10 p-3 sm:grid-cols-[3rem_4.5rem_minmax(0,1fr)_auto] sm:items-center" style={typeSurface(entry)} key={`${entry.pokemonKey}-${entry.rank}`}>
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-200/18 bg-amber-300/10 font-mono text-sm font-black text-amber-100" title={`Rang global ${entry.rank}`}><Trophy size={14} />#{entry.rank}</span>
            <PokemonArtwork pokemon={entry.pokemon} className="h-16 w-16" />
            <div className="min-w-0"><button className="block max-w-full truncate text-left text-base font-black text-white hover:text-cyan-100" type="button" onClick={() => onOpenPokemon?.(entry.pokemon)}>#{entry.pokemon?.dexNr || "—"} {nameOf(entry.pokemon)}{entry.pokemon?.shadow ? " obscur" : ""}</button><div className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><PokemonStateIndicators pokemon={entry.pokemon} /><span className="rounded-full border border-white/10 bg-white/[.06] px-2 py-1 text-[9px] font-black uppercase text-slate-300">Tier {entry.tier}</span></div><p className="mt-2 flex min-w-0 flex-wrap items-center gap-1 text-xs font-bold text-slate-300"><Swords size={13} /><span className="truncate">{nameOf(entry.fastMove)}{entry.eliteFast ? " ★" : ""} · {nameOf(entry.chargedMove)}{entry.eliteCharged ? " ★" : ""}</span></p></div>
            <div className="grid grid-cols-3 gap-2 sm:min-w-[17rem]"><div className="rounded-xl border border-cyan-200/15 bg-cyan-300/[.08] p-2 text-center"><small className="block text-[9px] font-black uppercase text-slate-500">DPS</small><strong className="font-mono text-sm text-cyan-50">{metricValue(entry, "dps")}</strong></div><div className="rounded-xl border border-violet-200/15 bg-violet-300/[.08] p-2 text-center"><small className="block text-[9px] font-black uppercase text-slate-500">TDO</small><strong className="font-mono text-sm text-violet-50">{metricValue(entry, "tdo")}</strong></div><div className="rounded-xl border border-emerald-200/15 bg-emerald-300/[.08] p-2 text-center"><small className="block text-[9px] font-black uppercase text-slate-500">eDPS</small><strong className="font-mono text-sm text-emerald-50">{metricValue(entry, "edps")}</strong></div><div className="col-span-3 h-2 overflow-hidden rounded-full bg-black/30"><i className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300" style={{ width: `${Math.min(100, entry.percentage || 0)}%` }} /></div></div>
          </article>
        ))}
        {!entries.length ? <p className="rounded-2xl border border-dashed border-white/12 p-8 text-center font-bold text-slate-400">Aucun attaquant pour ces filtres.</p> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-slate-400">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-slate-300">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
    </div>
  );
}
