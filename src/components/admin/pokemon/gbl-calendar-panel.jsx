"use client";

import { CalendarDays, Download, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/admin/shared/state-system";
import { filterGblPeriods } from "@/lib/pvp-rankings-display.mjs";
import { DatasetSourceHeader } from "./dataset-source-header";
import { fieldClass, Panel } from "./admin-ui";

const statusLabels = { past: "Terminé", current: "En direct", upcoming: "À venir" };
const statusClasses = {
  past: "border-white/10 bg-white/[0.03] text-muted",
  current: "border-cyan-300/30 bg-cyan-400/16 text-cyan-100",
  upcoming: "border-violet-300/24 bg-violet-400/12 text-violet-100",
};
const tierClasses = {
  little: "border-rose-300/25 bg-rose-400/10",
  great: "border-emerald-300/25 bg-emerald-400/10",
  ultra: "border-amber-300/25 bg-amber-400/10",
  master: "border-violet-300/25 bg-violet-400/10",
  custom: "border-cyan-300/25 bg-cyan-400/10",
};
const emptyPeriods = [];

function formatBoundary(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(value));
}

function CompetitionCard({ competition }) {
  return <article className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-xl border p-3 ${tierClasses[competition.tier] || tierClasses.custom}`}><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-slate-950/45">{competition.iconUrl ? <span aria-hidden="true" className="h-8 w-8 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(competition.iconUrl)})` }} /> : <span className="font-mono text-xs">GBL</span>}</span><span className="min-w-0"><span className="flex flex-wrap items-baseline gap-2"><strong className="text-domain-foreground">{competition.sourceName}</strong><small className="font-mono font-black text-muted">PC {competition.cpCap}</small></span>{competition.eligibleTypes?.length ? <span className="mt-2 flex flex-wrap gap-1">{competition.eligibleTypes.map((type) => <small className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 font-black" key={type}>{type}</small>)}</span> : null}{competition.restrictions?.length ? <span className="mt-2 flex flex-wrap gap-1">{competition.restrictions.map((rule) => <small className="rounded-full border border-amber-300/20 bg-amber-400/10 px-2 py-0.5 font-black text-amber-100" key={rule}>{rule}</small>)}</span> : null}</span></article>;
}

export function GblCalendarPanel({ dataset, loading, regenerating, onRefresh, onDownload, onRegenerate }) {
  const periods = dataset?.data?.periods || emptyPeriods;
  const season = dataset?.data?.season || {};
  const meta = dataset?.meta || {};
  const [status, setStatus] = useState("all");
  const [tier, setTier] = useState("all");
  const [cupQuery, setCupQuery] = useState("");
  const deferredCupQuery = useDeferredValue(cupQuery.trim().toLocaleLowerCase("fr"));
  const tiers = useMemo(() => [...new Set(periods.flatMap((period) => period.competitions || []).map((competition) => competition.tier).filter(Boolean))], [periods]);
  const visiblePeriods = useMemo(() => filterGblPeriods(periods, { status, tier, cupQuery: deferredCupQuery }), [deferredCupQuery, periods, status, tier]);
  return <div className="space-y-5"><Panel eyebrow="Source publique · Battleflow" title="Calendrier GBL" action={<div className="flex flex-wrap gap-2"><Button icon={<Download size={16} />} onClick={onDownload} disabled={!dataset}>JSON</Button><Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={onRefresh}>Actualiser</Button><Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate}>Régénérer</Button></div>}><DatasetSourceHeader dataset={dataset} total={meta.total || periods.length} /><div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-violet-300/16 bg-violet-400/[0.06] p-4"><CalendarDays className="text-violet-200" /><span><strong className="block text-domain-foreground">Saison {season.name || "GBL"}</strong><small className="text-muted">{formatBoundary(season.start)} → {formatBoundary(season.end)}</small></span></div><div className="mt-4 grid gap-2 md:grid-cols-3"><Select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Statut des rotations"><option value="all">Tous les statuts</option><option value="current">En cours</option><option value="upcoming">À venir</option><option value="past">Passé</option></Select><Select className={fieldClass} value={tier} onChange={(event) => setTier(event.target.value)} aria-label="Ligue GBL"><option value="all">Toutes les ligues</option>{tiers.map((value) => <option value={value} key={value}>{value}</option>)}</Select><input className={fieldClass} value={cupQuery} onChange={(event) => setCupQuery(event.target.value)} placeholder="Filtrer une coupe" aria-label="Coupe GBL" /></div></Panel><section className="space-y-4" aria-label="Rotations GBL">{visiblePeriods.map((period) => <article className={`overflow-hidden rounded-2xl border ${period.status === "current" ? "border-cyan-300/30 bg-cyan-400/[0.05]" : "border-line bg-surface-faint"}`} key={period.id}><header className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4"><span><strong className="block uppercase tracking-wide text-domain-foreground">{period.dateLabel}</strong><small className="text-muted">Bascule le {formatBoundary(period.end)}</small></span><span className="flex flex-wrap gap-2">{period.bonuses?.map((bonus) => <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/25 bg-amber-400/12 px-3 py-1 text-xs font-black text-amber-100" key={bonus.label}><Sparkles size={13} />{bonus.label}</span>)}<span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${statusClasses[period.status] || statusClasses.upcoming}`}>{statusLabels[period.status] || period.status}</span></span></header><div className="grid gap-2 p-4 lg:grid-cols-2">{period.competitions.map((competition) => <CompetitionCard competition={competition} key={`${period.id}-${competition.order}-${competition.sourceName}`} />)}</div></article>)}{!visiblePeriods.length ? <EmptyState size="section" title={periods.length ? "Aucune rotation dans ces filtres" : "Calendrier GBL indisponible"} /> : null}</section></div>;
}
