"use client";

import { Download, RefreshCcw, RotateCcw, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Modal } from "@/components/ui/modal";
import { AssetStatCard, buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { CurrentDatasetDiagnostics } from "./current-dataset-diagnostics";
import { DatasetFilterBar } from "./dataset-filter-bar";

function formatNumber(value) {
  return value == null ? "—" : Number(value).toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

function pokemonName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.sourceIdentity?.name || "Pokémon";
}

function ShinyDetail({ entry, history, onOpenPokemon }) {
  if (!entry) return null;
  const chart = (history?.points || []).map((point) => ({
    date: new Date(point.snapshotAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
    odds: point.odds?.denominator || null,
  }));
  const statistics = history?.statistics?.allTime;
  const sevenDays = history?.statistics?.windows?.sevenDays;
  const thirtyDays = history?.statistics?.windows?.thirtyDays;
  const variation = statistics?.variation;
  const historyMetrics = [
    ["Moyenne globale", statistics?.average == null ? "—" : `1 / ${formatNumber(statistics.average)}`],
    ["Moyenne 7 jours", sevenDays?.average == null ? "—" : `1 / ${formatNumber(sevenDays.average)}`],
    ["Moyenne 30 jours", thirtyDays?.average == null ? "—" : `1 / ${formatNumber(thirtyDays.average)}`],
    ["Variation", variation?.absolute == null ? "—" : `${variation.absolute > 0 ? "+" : ""}${formatNumber(variation.absolute)} (${formatNumber(variation.percent)}%)`],
    ["Meilleure", statistics?.best?.value == null ? "—" : `1 / ${formatNumber(statistics.best.value)}`],
    ["Pire", statistics?.worst?.value == null ? "—" : `1 / ${formatNumber(statistics.worst.value)}`],
  ];
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
        <div className="grid min-h-32 place-items-center rounded-2xl border border-amber-200/20 bg-amber-300/10 p-3">
          <img className="max-h-28 object-contain" src={entry.pokemon?.assets?.shinyImage || entry.pokemon?.assets?.image} alt={pokemonName(entry)} />
        </div>
        <dl className="grid gap-2 sm:grid-cols-2">
          {[['Rang', `#${entry.rank}`], ['Odds', entry.shiny?.odds?.raw || '—'], ['Taux', entry.shiny?.ratePercent == null ? '—' : `${entry.shiny.ratePercent}%`], ['Shinies vus', formatNumber(entry.shiny?.seen)], ['Aujourd’hui', formatNumber(entry.stats?.daily)], ['Moyenne/jour', formatNumber(entry.stats?.dailyAverage)]].map(([label, value]) => (
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3" key={label}><dt className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</dt><dd className="mt-1 font-mono text-sm font-black text-white">{value}</dd></div>
          ))}
        </dl>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <AssetStatCard label="7 jours source" value={entry.stats?.weekly} tone="cyan" />
        <AssetStatCard label="30 jours source" value={entry.stats?.monthly} tone="violet" />
        <AssetStatCard label="Historique source" value={entry.stats?.allTime} tone="amber" />
      </div>
      <section className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <h3 className="font-black text-white">Historique de nos snapshots</h3>
        {statistics ? (
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            {historyMetrics.map(([label, value]) => (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3" key={label}>
                <dt className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</dt>
                <dd className="mt-1 font-mono font-black text-white">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {chart.length ? (
          <div className="mt-3 h-56" aria-label="Évolution des odds collectées">
            <ResponsiveContainer width="100%" height="100%"><LineChart data={chart}><CartesianGrid stroke="rgba(148,163,184,.15)" /><XAxis dataKey="date" stroke="#94a3b8" /><YAxis reversed stroke="#94a3b8" /><Tooltip /><Line type="monotone" dataKey="odds" stroke="#fbbf24" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>
          </div>
        ) : <p className="mt-3 text-sm font-bold text-slate-400">L’historique apparaîtra après les prochains snapshots du pipeline.</p>}
      </section>
      {onOpenPokemon && !entry.pokemon?.unmatched ? <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}>Ouvrir la fiche Pokémon locale</button> : null}
    </div>
  );
}

export function ShinyTrackerPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onLoadHistory, onOpenPokemon }) {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState({ points: [], statistics: null });
  const entries = dataset?.data?.rankings || [];
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
      <Panel eyebrow="Provider actif · Snacknap" title="Shiny Tracker" action={<div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}><Download size={16} /> JSON</button><button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button><button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}><RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Snapshot</button></div>}>
        <div className="grid gap-3 sm:grid-cols-3">
          <AssetStatCard label="Aujourd’hui" value={summary.today} tone="amber" />
          <AssetStatCard label="Total" value={summary.total} tone="cyan" />
          <AssetStatCard label="Rares" value={summary.rare} tone="violet" />
        </div>
        <CurrentDatasetDiagnostics dataset={dataset} total={meta.total || entries.length} />
      </Panel>

      <DatasetFilterBar query={options.search} onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })} resultCount={entries.length} totalCount={meta.total || entries.length} toggles={['today', 'total', 'rare'].map((board) => ({ id: board, label: board === 'today' ? 'Aujourd’hui' : board === 'total' ? 'Total' : 'Rares', active: options.board === board, onClick: () => onOptionsChange({ ...options, board, page: 1 }) }))} />
      <div className="grid gap-3 sm:grid-cols-3">
        <select className={fieldClass} value={options.generation} onChange={(event) => onOptionsChange({ ...options, generation: event.target.value, page: 1 })} aria-label="Génération"><option value="">Toutes les générations</option>{[1,2,3,4,5,6,7,8,9].map((generation) => <option key={generation} value={generation}>Génération {generation}</option>)}</select>
        <select className={fieldClass} value={options.trend} onChange={(event) => onOptionsChange({ ...options, trend: event.target.value, page: 1 })} aria-label="Tendance"><option value="">Toutes les tendances</option><option value="up">En hausse</option><option value="down">En baisse</option><option value="flat">Stable</option></select>
        <select className={fieldClass} value={options.type} onChange={(event) => onOptionsChange({ ...options, type: event.target.value, page: 1 })} aria-label="Type"><option value="">Tous les types</option>{['BUG','DARK','DRAGON','ELECTRIC','FAIRY','FIGHTING','FIRE','FLYING','GHOST','GRASS','GROUND','ICE','NORMAL','POISON','PSYCHIC','ROCK','STEEL','WATER'].map((type) => <option key={type} value={type}>{type}</option>)}</select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30">
        {entries.map((entry) => (
          <button className="grid w-full grid-cols-[3rem_3.5rem_minmax(0,1fr)_5.5rem_6rem] items-center gap-2 border-b border-white/8 px-3 py-3 text-left transition last:border-0 hover:bg-cyan-400/8" type="button" key={`${entry.rank}-${entry.sourceIdentity?.variantKey}`} onClick={() => openEntry(entry)}>
            <span className="font-mono text-sm font-black text-slate-500">#{entry.rank}</span>
            <img className="h-12 w-12 object-contain" src={entry.pokemon?.assets?.shinyImage || entry.pokemon?.assets?.image} alt="" loading="lazy" />
            <span className="min-w-0"><strong className="block truncate text-sm text-white">{pokemonName(entry)}</strong><small className="block truncate text-xs font-bold text-slate-500">#{entry.pokemon?.dexNr} · {entry.pokemon?.formId || entry.sourceIdentity?.name}</small></span>
            <span className="font-mono text-sm font-black text-amber-100">{entry.shiny?.odds?.raw || '—'}</span>
            <span className={`inline-flex items-center justify-end gap-1 font-mono text-sm font-black ${entry.source?.trend === 'up' ? 'text-emerald-300' : entry.source?.trend === 'down' ? 'text-red-300' : 'text-slate-300'}`}>{entry.source?.trend === 'up' ? <TrendingUp size={14} /> : entry.source?.trend === 'down' ? <TrendingDown size={14} /> : <Sparkles size={14} />}{formatNumber(entry.stats?.daily)}</span>
          </button>
        ))}
        {!entries.length ? <p className="p-8 text-center font-bold text-slate-400">Aucun résultat Shiny.</p> : null}
      </div>
      <div className="flex items-center justify-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-slate-300">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div>
      <Modal open={Boolean(selected)} title={selected ? pokemonName(selected) : "Shiny"} description={selected ? `${selected.shiny?.odds?.raw || 'Odds indisponibles'} · ${selected.shiny?.rarity || 'Sans catégorie'}` : ""} onClose={() => setSelected(null)} className="max-w-4xl"><ShinyDetail entry={selected} history={history} onOpenPokemon={onOpenPokemon} /></Modal>
    </div>
  );
}
