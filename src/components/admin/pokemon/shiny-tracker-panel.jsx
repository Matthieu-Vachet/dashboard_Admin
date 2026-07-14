"use client";

import { Download, ExternalLink, RefreshCcw, RotateCcw, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Modal } from "@/components/ui/modal";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { TypeIcons } from "./asset-icons";
import { AssetStatCard, buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { PokemonArtwork } from "./pokemon-artwork";

function formatNumber(value, compact = false) {
  if (value == null) return "—";
  return Number(value).toLocaleString("fr-FR", compact
    ? { notation: "compact", maximumFractionDigits: 2 }
    : { maximumFractionDigits: 2 });
}

function formatDate(value) {
  if (!value) return "Indisponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Paris" }).format(date);
}

function pokemonName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.sourceIdentity?.name || "Pokémon";
}

function primaryType(entry) {
  return String(entry?.pokemon?.types?.[0] || "NORMAL").toUpperCase();
}

function typeSurface(entry, opacity = 0.14) {
  const color = typeColors[primaryType(entry)] || typeColors.NORMAL;
  return { backgroundImage: `linear-gradient(110deg, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}, rgba(2,6,23,.72))` };
}

function Trend({ value, variation }) {
  const positive = value === "up" || Number(variation) > 0;
  const negative = value === "down" || Number(variation) < 0;
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-xs font-black ${positive ? "text-emerald-300" : negative ? "text-red-300" : "text-slate-400"}`}>
      {positive ? <TrendingUp size={14} /> : negative ? <TrendingDown size={14} /> : <Sparkles size={13} />}
      {variation == null ? "Stable" : `${Number(variation) > 0 ? "+" : ""}${formatNumber(variation)} %`}
    </span>
  );
}

function ActivityBar({ label, value, maximum, tone }) {
  const width = maximum > 0 ? Math.max(2, Math.min(100, (Number(value || 0) / maximum) * 100)) : 0;
  return (
    <div className="grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-3">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <span className="h-3 overflow-hidden rounded-full bg-black/35"><i className={`block h-full rounded-full ${tone}`} style={{ width: `${width}%` }} /></span>
      <strong className="min-w-14 text-right font-mono text-sm text-white">{formatNumber(value, true)}</strong>
    </div>
  );
}

function ShinyDetail({ entry, history, onOpenPokemon }) {
  if (!entry) return null;
  const points = (history?.points || []).map((point) => ({
    date: new Date(point.snapshotAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
    odds: point.odds?.denominator || null,
  })).filter((point) => point.odds);
  const statistics = history?.statistics?.allTime;
  const sevenDays = history?.statistics?.windows?.sevenDays;
  const thirtyDays = history?.statistics?.windows?.thirtyDays;
  const variation = statistics?.variation;
  const current = Number(entry.stats?.daily || 0);
  const average = Number(entry.stats?.dailyAverage || 0);
  const maximum = Math.max(current, average, 1);
  const types = entry.pokemon?.types || [];
  const shinyRate = entry.shiny?.ratePercent;
  const shinyProgress = shinyRate == null ? 0 : Math.min(100, Math.max(1, Number(shinyRate) * 10));
  const catchCpMin = Number(entry.catchCpRange?.min);
  const catchCpMax = Number(entry.catchCpRange?.max);
  const detailMetrics = [
    ["Weekly", entry.stats?.weekly, "cyan"],
    ["Monthly", entry.stats?.monthly, "violet"],
    ["All-Time", entry.stats?.allTime, "amber"],
    ...(Number.isFinite(catchCpMin) && Number.isFinite(catchCpMax)
      ? [["Catch CP", `${formatNumber(catchCpMin)} – ${formatNumber(catchCpMax)}`, "green"]]
      : []),
  ];

  return (
    <div className="space-y-4">
      <section className="grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-[9rem_minmax(0,1fr)]" style={typeSurface(entry, 0.18)}>
        <div className="grid min-h-36 place-items-center rounded-2xl border border-white/10 bg-black/25 p-3"><PokemonArtwork pokemon={entry.pokemon} shiny alt={pokemonName(entry)} className="h-32 w-32 border-0 bg-transparent" priority /></div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="font-mono text-xs font-black text-slate-400">#{String(entry.pokemon?.dexNr || entry.sourceIdentity?.id || "—").padStart(4, "0")}</span>
              <h3 className="text-2xl font-black text-white">{pokemonName(entry)} ✦</h3>
            </div>
            <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 font-mono text-xs font-black">Rang #{entry.rank} / {entry.rankTotal || "—"}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <TypeIcons types={types} />
            {types.map((type) => <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-black" key={type}>{typeLabels[String(type).toUpperCase()] || type}</span>)}
            {entry.shiny?.rarity ? <span className="rounded-full border border-amber-200/25 bg-amber-300/14 px-3 py-1 text-xs font-black text-amber-50">{entry.shiny.rarity}</span> : null}
          </div>
          <div className="mt-5 space-y-3">
            <ActivityBar label="Aujourd’hui" value={current} maximum={maximum} tone="bg-gradient-to-r from-emerald-400 to-cyan-400" />
            <ActivityBar label="Moy. / jour" value={average} maximum={maximum} tone="bg-gradient-to-r from-slate-400 to-slate-200" />
            <Trend value={entry.source?.trend} variation={entry.stats?.dailyVariationPercent} />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {detailMetrics.map(([label, value, tone]) => (
          <AssetStatCard key={label} label={label} value={typeof value === "number" ? formatNumber(value, true) : value} tone={tone} />
        ))}
      </section>

      <section className="rounded-2xl border p-4" style={{ borderColor: `${typeColors[primaryType(entry)] || typeColors.NORMAL}66`, ...typeSurface(entry, 0.2) }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Shiny</span><strong className="mt-1 block font-mono text-3xl text-white">{entry.shiny?.odds?.raw || "Odds indisponibles"}</strong></div>
          {entry.shiny?.rarity ? <span className="rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-xs font-black">{entry.shiny.rarity}</span> : null}
        </div>
        {shinyRate != null ? <div className="mt-3 h-3 overflow-hidden rounded-full border border-white/10 bg-black/30"><i className="block h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400" style={{ width: `${shinyProgress}%` }} /></div> : null}
        <p className="mt-3 text-sm font-bold text-slate-300">{formatNumber(entry.shiny?.seen, true)} shiny vus{shinyRate == null ? "" : ` · ${formatNumber(shinyRate)} % de taux shiny`}</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><span className="text-[10px] font-black uppercase tracking-wider text-slate-500">First Seen</span><strong className="mt-2 block text-white">{formatDate(entry.firstSeenAt)}</strong></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Last Seen</span><strong className="mt-2 block text-white">{formatDate(entry.lastSeenAt)}</strong></div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <h3 className="font-black text-white">Historique de nos snapshots</h3>
        {statistics ? (
          <dl className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Moyenne globale", statistics.average], ["Moyenne 7 jours", sevenDays?.average], ["Moyenne 30 jours", thirtyDays?.average],
              ["Variation", variation?.absolute], ["Meilleure", statistics.best?.value], ["Pire", statistics.worst?.value],
            ].map(([label, value]) => <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3" key={label}><dt className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</dt><dd className="mt-1 font-mono font-black text-white">{value == null ? "—" : label === "Variation" ? `${Number(value) > 0 ? "+" : ""}${formatNumber(value)}` : `1 / ${formatNumber(value)}`}</dd></div>)}
          </dl>
        ) : <p className="mt-3 text-sm font-bold text-slate-400">Aucune statistique calculable avant plusieurs snapshots réels.</p>}
        {points.length >= 2 ? (
          <div className="mt-4 h-56" aria-label="Évolution des odds collectées">
            <ResponsiveContainer width="100%" height="100%"><LineChart data={points}><CartesianGrid stroke="rgba(148,163,184,.15)" /><XAxis dataKey="date" stroke="#94a3b8" /><YAxis reversed stroke="#94a3b8" /><Tooltip contentStyle={{ background: "#08101f", border: "1px solid rgba(255,255,255,.14)", borderRadius: 10, color: "#fff" }} /><Line type="monotone" dataKey="odds" stroke="#fbbf24" strokeWidth={3} dot={{ fill: "#fbbf24" }} /></LineChart></ResponsiveContainer>
          </div>
        ) : <p className="mt-4 rounded-xl border border-dashed border-white/12 p-4 text-sm font-bold text-slate-400">Historique insuffisant : le graphique apparaîtra après au moins deux snapshots réellement collectés.</p>}
      </section>
      {onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}><ExternalLink size={16} /> Ouvrir la fiche Pokémon locale</button> : null}
    </div>
  );
}

function Podium({ entries, board, onOpen }) {
  if (!entries.length) return null;
  const order = entries.length >= 3 ? [entries[1], entries[0], entries[2]] : entries;
  return (
    <section className={`grid auto-cols-[minmax(9rem,1fr)] grid-flow-col items-end gap-3 overflow-x-auto pb-1 sm:grid-flow-row sm:auto-cols-auto sm:overflow-visible ${entries.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`} aria-label="Podium Shiny">
      {order.map((entry) => {
        const place = entry.rank <= 3 ? entry.rank : entries.indexOf(entry) + 1;
        const tone = place === 1 ? "border-amber-300/55 shadow-[0_20px_70px_rgba(251,191,36,.16)] sm:min-h-[19rem]" : place === 2 ? "border-slate-300/35 sm:min-h-[17rem]" : "border-orange-300/35 sm:min-h-[16rem]";
        const metric = board === "today" ? entry.stats?.daily : board === "rare" ? entry.shiny?.odds?.raw : entry.stats?.allTime;
        return (
          <button className={`relative flex min-h-[11rem] flex-col items-center justify-end overflow-hidden rounded-2xl border p-3 text-center sm:min-h-[14rem] sm:p-4 ${tone}`} style={typeSurface(entry, 0.15)} key={`${place}-${entry.sourceIdentity?.variantKey || entry.sourceIdentity?.id}`} type="button" onClick={() => onOpen(entry)}>
            <span className={`absolute top-3 grid h-9 w-9 place-items-center rounded-full font-mono font-black ${place === 1 ? "bg-amber-400 text-slate-950" : place === 2 ? "bg-slate-300 text-slate-950" : "bg-orange-400 text-slate-950"}`}>{place}</span>
            <PokemonArtwork pokemon={entry.pokemon} shiny alt={pokemonName(entry)} className="mb-2 h-16 w-16 border-0 bg-transparent drop-shadow-[0_18px_30px_rgba(0,0,0,.45)] sm:mb-3 sm:h-24 sm:w-24" />
            <strong className="line-clamp-2 text-base text-white">#{entry.pokemon?.dexNr} {pokemonName(entry)}</strong>
            <span className="mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2 font-mono text-lg font-black text-white">{typeof metric === "number" ? formatNumber(metric, true) : metric || "—"}</span>
            <small className="mt-2 font-mono font-black text-amber-100">{entry.shiny?.odds?.raw || "—"}</small>
          </button>
        );
      })}
    </section>
  );
}

export function ShinyTrackerPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onLoadHistory, onOpenPokemon }) {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState({ points: [], statistics: null });
  const entries = dataset?.data?.rankings || [];
  const podium = dataset?.data?.podium || entries.slice(0, 3);
  const rankedEntries = entries.filter((entry) => Number(entry.rank) > 3);
  const summary = dataset?.data?.summary || {};
  const meta = dataset?.meta || {};

  async function openEntry(entry) {
    setSelected(entry);
    setHistory({ points: [], statistics: null });
    const identity = entry.sourceIdentity?.variantKey || entry.pokemon?.formId || entry.pokemon?.id || entry.sourceIdentity?.id;
    if (identity && onLoadHistory) setHistory(await onLoadHistory(identity));
  }

  return (
    <div className="space-y-5">
      <Panel eyebrow="Provider autorisé · espace privé" title="Shiny Tracker" action={<div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}><Download size={16} /> JSON privé</button><button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button><button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}><RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Snapshot</button></div>}>
        <div className="grid gap-3 sm:grid-cols-3"><AssetStatCard label="Aujourd’hui" value={summary.today} tone="amber" /><AssetStatCard label="Total" value={summary.total} tone="cyan" /><AssetStatCard label="Rares" value={summary.rare} tone="violet" /></div>
        <DatasetSourceHeader dataset={dataset} total={meta.total || entries.length} />
      </Panel>

      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} toggles={['today', 'total', 'rare'].map((board) => ({ id: board, label: board === 'today' ? 'Aujourd’hui' : board === 'total' ? 'Total' : 'Rares', active: options.board === board, onClick: () => onOptionsChange({ ...options, board, page: 1 }) }))} />
      <div className="grid gap-3 sm:grid-cols-3">
        <select className={fieldClass} value={options.generation} onChange={(event) => onOptionsChange({ ...options, generation: event.target.value, page: 1 })} aria-label="Génération"><option value="">Toutes les générations</option>{[1,2,3,4,5,6,7,8,9].map((generation) => <option key={generation} value={generation}>Génération {generation}</option>)}</select>
        <select className={fieldClass} value={options.trend} onChange={(event) => onOptionsChange({ ...options, trend: event.target.value, page: 1 })} aria-label="Tendance"><option value="">Toutes les tendances</option><option value="up">En hausse</option><option value="down">En baisse</option><option value="flat">Stable</option></select>
        <select className={fieldClass} value={options.type} onChange={(event) => onOptionsChange({ ...options, type: event.target.value, page: 1 })} aria-label="Type"><option value="">Tous les types</option>{Object.keys(typeLabels).map((type) => <option key={type} value={type}>{typeLabels[type]}</option>)}</select>
      </div>

      <Podium entries={podium} board={options.board} onOpen={openEntry} />

      <section className="space-y-2" aria-label="Classement Shiny">
        {rankedEntries.map((entry) => (
          <button className="grid w-full min-w-0 grid-cols-[2rem_3.5rem_minmax(0,1fr)] gap-2 rounded-2xl border border-white/10 p-3 text-left transition hover:border-cyan-200/35 sm:grid-cols-[3rem_4rem_minmax(0,1fr)_repeat(4,minmax(5rem,auto))] sm:items-center sm:gap-3" style={typeSurface(entry, 0.1)} type="button" key={`${entry.rank}-${entry.sourceIdentity?.variantKey}`} onClick={() => openEntry(entry)}>
            <span className="font-mono text-sm font-black text-slate-400">#{entry.rank}</span>
            <PokemonArtwork pokemon={entry.pokemon} shiny alt={pokemonName(entry)} className="h-12 w-12 border-0 bg-transparent sm:h-14 sm:w-14" />
            <span className="min-w-0"><strong className="block truncate text-sm text-white">#{entry.pokemon?.dexNr} {pokemonName(entry)}</strong><span className="mt-1 flex flex-wrap items-center gap-2"><TypeIcons types={entry.pokemon?.types} size="sm" /><small className="truncate text-xs font-bold text-slate-400">Dernière : {formatDate(entry.lastSeenAt)}</small></span></span>
            <span className="col-span-3 grid grid-cols-4 gap-2 border-t border-white/10 pt-2 sm:hidden">
              <span><small className="block text-[9px] font-black uppercase text-slate-500">Daily</small><strong className="font-mono text-xs text-white">{formatNumber(entry.stats?.daily, true)}</strong></span>
              <span><small className="block text-[9px] font-black uppercase text-slate-500">Mois</small><strong className="font-mono text-xs text-white">{formatNumber(entry.stats?.monthly, true)}</strong></span>
              <span><small className="block text-[9px] font-black uppercase text-slate-500">Total</small><strong className="font-mono text-xs text-white">{formatNumber(entry.stats?.allTime, true)}</strong></span>
              <span><small className="block text-[9px] font-black uppercase text-slate-500">Odds</small><strong className="font-mono text-xs text-amber-100">{entry.shiny?.odds?.raw || "—"}</strong></span>
            </span>
            <span className="hidden sm:block"><small className="block text-[9px] font-black uppercase text-slate-500">Daily</small><strong className="font-mono text-sm text-white">{formatNumber(entry.stats?.daily, true)}</strong></span>
            <span className="hidden sm:block"><small className="block text-[9px] font-black uppercase text-slate-500">Monthly</small><strong className="font-mono text-sm text-white">{formatNumber(entry.stats?.monthly, true)}</strong></span>
            <span className="hidden sm:block"><small className="block text-[9px] font-black uppercase text-slate-500">Total</small><strong className="font-mono text-sm text-white">{formatNumber(entry.stats?.allTime, true)}</strong></span>
            <span className="hidden sm:block"><small className="block text-[9px] font-black uppercase text-slate-500">Odds</small><strong className="font-mono text-sm text-amber-100">{entry.shiny?.odds?.raw || "—"}</strong><Trend value={entry.source?.trend} /></span>
          </button>
        ))}
        {!rankedEntries.length ? <p className="rounded-2xl border border-dashed border-white/12 p-5 text-center text-sm font-bold text-slate-400">{entries.length ? "Le classement détaillé commence au rang 4 après le podium." : "Aucun résultat Shiny pour ces filtres."}</p> : null}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-slate-400">Affichés {entries.length} sur {meta.total || entries.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-slate-300">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
      <Modal open={Boolean(selected)} title={selected ? pokemonName(selected) : "Shiny"} description={selected ? `${selected.shiny?.odds?.raw || 'Odds indisponibles'}${selected.shiny?.rarity ? ` · ${selected.shiny.rarity}` : ''}` : ""} onClose={() => setSelected(null)} className="max-w-5xl"><ShinyDetail entry={selected} history={history} onOpenPokemon={onOpenPokemon} /></Modal>
    </div>
  );
}
