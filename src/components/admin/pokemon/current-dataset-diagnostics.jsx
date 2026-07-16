"use client";

import { AlertTriangle, CheckCircle2, Copy, Database, ExternalLink, GitCompare, History, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ModalPortal } from "@/components/admin/shared/modal-portal";

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function formatDate(value) {
  if (!value) return "Indisponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Paris",
  }).format(date);
}

function formatEvent(event) {
  if (!event) return "Aucun événement détecté";
  if (typeof event === "string") return event;
  const name = firstDefined(event.name, event.title, event.label, event.slug, "Événement détecté");
  const status = firstDefined(event.status, event.state);
  return status ? `${name} · ${status}` : name;
}

function formatWarning(warning) {
  if (typeof warning === "string") return warning;
  if (warning?.message) return warning.message;
  try {
    return JSON.stringify(warning);
  } catch {
    return String(warning);
  }
}

function Metric({ label, value, mono = false }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2.5">
      <dt className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</dt>
      <dd className={`mt-1 truncate text-xs font-black text-slate-100 ${mono ? "font-mono" : ""}`} title={String(value)}>
        {value}
      </dd>
    </div>
  );
}

export function DatasetSourceHeader({ dataset, total = 0, refreshError = "", historyUrl = "" }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRuns, setHistoryRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState(null);
  const [diagnosticQuery, setDiagnosticQuery] = useState("");
  const meta = dataset?.meta || {};
  const resolvedHistoryUrl = historyUrl || (meta.domain ? `/api/pokemon-admin?action=dataset-history&domain=${encodeURIComponent(meta.domain)}` : "");
  const current = dataset?.current || {};
  const sourceDetails = meta.sourceDetails || current.source || {};
  const diagnostics = meta.diagnostics || current.diagnostics || {};
  const diff = diagnostics.diff || {};
  const warnings = Array.isArray(diagnostics.warnings) ? diagnostics.warnings : [];
  const unmatchedEntries = useMemo(
    () => (Array.isArray(diagnostics.unmatchedEntries) ? diagnostics.unmatchedEntries : []),
    [diagnostics.unmatchedEntries],
  );
  const warningCount = Array.isArray(diagnostics.warnings)
    ? diagnostics.warnings.length
    : Number(diagnostics.warnings) || 0;
  const source = firstDefined(meta.source, current.source?.storage);
  const sourceLabel = source === "mongodb" || source === "MongoDB" ? "MongoDB" : "Source indisponible";
  const provider = firstDefined(meta.provider, sourceDetails.provider, "Indisponible");
  const sourceUrl = firstDefined(meta.url, sourceDetails.url);
  const mode = firstDefined(meta.mode, sourceDetails.mode, "Indisponible");
  const event = firstDefined(meta.event, sourceDetails.event);
  const fetchedAt = firstDefined(meta.fetchedAt, sourceDetails.fetchedAt);
  const savedAt = firstDefined(meta.savedAt, current.savedAt, meta.generatedAt, current.generatedAt);
  const count = firstDefined(meta.count, current.count, total, 0);
  const sourceHash = firstDefined(meta.sourceHash, current.sourceHash, "Indisponible");
  const shortHash = sourceHash === "Indisponible" ? sourceHash : String(sourceHash).slice(0, 12);
  const status = firstDefined(meta.status, current.status, "inconnu");
  const visibility = firstDefined(meta.visibility, current.visibility, dataset?.data?.meta?.visibility, "public");
  const timezone = firstDefined(meta.timezone, sourceDetails.timezone, diagnostics.details?.timezone);
  const selection = firstDefined(meta.selection, sourceDetails.selection, diagnostics.details?.selectedRaids);
  const dynamicShellDetected = Boolean(firstDefined(
    meta.dynamicShellDetected,
    sourceDetails.dynamicShellDetected,
    diagnostics.details?.dynamicShellDetected,
  ));
  const error = refreshError || meta.refreshError || "";
  const hasDiff = typeof diff.changed === "boolean";
  const changed = diff.changed === true;
  const errorMessage = error && String(error).startsWith("Affichage de la dernière version MongoDB connue")
    ? String(error)
    : `Affichage de la dernière version MongoDB connue — la nouvelle récupération a échoué. ${error}`;
  const metrics = [
    ["Provider", provider, false],
    ["Mode", mode, false],
    ["Événement", formatEvent(event), false],
    ["Total", count, true],
    ["Récupéré le", formatDate(fetchedAt), false],
    ["Enregistré le", formatDate(savedAt), false],
    ["Hash", shortHash, true],
    ["Matchés / non matchés", `${Number(diagnostics.matchedCount) || 0} / ${Number(diagnostics.unmatchedCount) || 0}`, true],
  ];
  const visibleUnmatched = useMemo(() => {
    const entries = selectedRun?.unmatchedEntries || unmatchedEntries;
    const needle = diagnosticQuery.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter((entry) => JSON.stringify(entry).toLowerCase().includes(needle));
  }, [diagnosticQuery, selectedRun, unmatchedEntries]);

  useEffect(() => {
    if (!historyOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setHistoryOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [historyOpen]);

  async function openHistory(preferCurrent = false) {
    setHistoryOpen(true);
    setDiagnosticQuery("");
    if (preferCurrent) setSelectedRun({ status, unmatchedEntries, warnings, errors: [], added: diff.added, removed: diff.removed, modified: diff.modified, changed: diff.changed, matchedCount: diagnostics.matchedCount, unmatchedCount: diagnostics.unmatchedCount, diffUnavailableReason: diagnostics.diffUnavailableReason });
    if (!resolvedHistoryUrl) return;
    setHistoryLoading(true);
    try {
      const response = await fetch(`${resolvedHistoryUrl}${resolvedHistoryUrl.includes("?") ? "&" : "?"}page=1&limit=50`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Historique indisponible.");
      const resource = payload.data?.data ?? payload.data;
      const runs = resource?.runs || resource || [];
      setHistoryRuns(Array.isArray(runs) ? runs : []);
      if (!preferCurrent && runs.length) setSelectedRun(runs[0]);
    } catch (historyError) {
      setHistoryRuns([{ status: "failed", errors: [{ message: historyError.message }], unmatchedEntries: [] }]);
    } finally {
      setHistoryLoading(false);
    }
  }

  async function copyDiagnostic(value) {
    await navigator.clipboard.writeText(typeof value === "string" ? value : JSON.stringify(value, null, 2));
  }

  return (
    <section className="mt-4 min-w-0 space-y-3 rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.075] p-3 sm:p-4" aria-label="État de la source de données">
      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-red-200/25 bg-red-400/12 p-3 text-sm font-bold leading-5 text-red-50" role="alert">
          <AlertTriangle className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-black text-cyan-50">
          <Database size={18} aria-hidden="true" />
          <span>Source active : {sourceLabel}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.07] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-100/70">
            {status}
          </span>
          <span className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${visibility === "private" ? "border-violet-200/25 bg-violet-300/14 text-violet-50" : "border-emerald-200/25 bg-emerald-300/14 text-emerald-50"}`}>
            {visibility === "private" ? "Privé · Admin" : "Public · API"}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${changed ? "border-amber-200/25 bg-amber-300/14 text-amber-50" : "border-emerald-200/25 bg-emerald-300/14 text-emerald-50"}`}>
          {changed ? <GitCompare size={13} aria-hidden="true" /> : <CheckCircle2 size={13} aria-hidden="true" />}
          {hasDiff ? (changed ? "Contenu modifié" : "Contenu inchangé") : "Diff indisponible"}
        </span>
      </div>

      <dl className="hidden gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, mono]) => <Metric key={label} label={label} value={value} mono={mono} />)}
      </dl>
      <details className="rounded-xl border border-white/10 bg-slate-950/25 text-xs sm:hidden">
        <summary className="cursor-pointer px-3 py-2.5 font-black text-cyan-50">Afficher les détails de la source</summary>
        <dl className="grid gap-2 border-t border-white/10 p-2">
          {metrics.map(([label, value, mono]) => <Metric key={label} label={label} value={value} mono={mono} />)}
        </dl>
      </details>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-300">
        {sourceUrl ? (
          <a className="inline-flex min-w-0 items-center gap-1 text-cyan-100 underline decoration-cyan-200/30 underline-offset-4 hover:text-white" href={sourceUrl} target="_blank" rel="noreferrer">
            <span className="max-w-full break-all sm:max-w-[36rem] sm:truncate">{sourceUrl}</span>
            <ExternalLink className="shrink-0" size={13} aria-hidden="true" />
          </a>
        ) : <span>URL source indisponible</span>}
        <span>Ajoutés : {Number(diff.added) || 0}</span>
        <span>Retirés : {Number(diff.removed) || 0}</span>
        <span>Modifiés : {Number(diff.modified) || 0}</span>
        <span>Avertissements : {warningCount}</span>
        {timezone ? <span>Fuseau : {timezone}</span> : null}
        {dynamicShellDetected ? <span className="text-violet-100">Page dynamique résolue</span> : null}
        {resolvedHistoryUrl ? <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-cyan-100 hover:bg-white/[.06]" type="button" onClick={() => openHistory(false)}><History size={13} /> Historique</button> : null}
        {unmatchedEntries.length ? <button className="inline-flex items-center gap-1 rounded-lg border border-amber-200/20 px-2 py-1 text-amber-100 hover:bg-amber-300/10" type="button" onClick={() => openHistory(true)}>Voir les {unmatchedEntries.length} entrées non matchées</button> : null}
      </div>

      {!hasDiff && diagnostics.diffUnavailableReason ? <p className="rounded-xl border border-white/10 bg-slate-950/25 px-3 py-2 text-xs font-bold text-slate-400">Diff indisponible : {diagnostics.diffUnavailableReason}</p> : null}

      {selection ? (
        <div className="grid gap-2 rounded-xl border border-violet-200/18 bg-violet-400/9 p-3 sm:grid-cols-2">
          {selection.regular ? (
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-[0.16em] text-violet-100/55">Rotation raids normale</span>
              <strong className="mt-1 block truncate text-xs text-violet-50">{formatEvent(selection.regular)}</strong>
            </div>
          ) : null}
          {selection.shadow ? (
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-[0.16em] text-red-100/55">Rotation raids obscurs</span>
              <strong className="mt-1 block truncate text-xs text-red-50">{formatEvent(selection.shadow)}</strong>
            </div>
          ) : null}
        </div>
      ) : null}

      {warnings.length ? (
        <details className="group rounded-xl border border-amber-200/20 bg-amber-300/10 text-xs font-bold leading-5 text-amber-50">
          <summary className="cursor-pointer list-none px-3 py-2.5">Afficher les {warnings.length} diagnostic(s)</summary>
          <ul className="space-y-1 border-t border-amber-100/10 p-3">
            {warnings.map((warning) => (
              <li key={formatWarning(warning)}>• {formatWarning(warning)}</li>
            ))}
          </ul>
        </details>
      ) : null}

      {historyOpen ? <ModalPortal><div className="fixed inset-0 z-[110] bg-slate-950/88 p-3 backdrop-blur-lg" role="dialog" aria-modal="true" aria-label="Historique et diagnostics de scraping"><div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]"><header className="flex items-center gap-3 border-b border-white/10 p-4"><History className="text-cyan-200" size={20} /><div className="min-w-0 flex-1"><h3 className="font-black text-white">Historique des exécutions</h3><p className="text-xs font-bold text-slate-500">{provider}</p></div><button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white" type="button" onClick={() => setHistoryOpen(false)} aria-label="Fermer"><X size={18} /></button></header><div className="grid min-h-0 flex-1 lg:grid-cols-[19rem_minmax(0,1fr)]"><aside className="min-h-0 overflow-y-auto border-b border-white/10 p-3 lg:border-b-0 lg:border-r">{historyLoading ? <p className="text-sm text-slate-400">Chargement…</p> : historyRuns.map((run, index) => <button className={`mb-2 w-full rounded-xl border p-3 text-left ${selectedRun === run ? "border-cyan-200/35 bg-cyan-300/10" : "border-white/10 bg-white/[.025]"}`} type="button" onClick={() => setSelectedRun(run)} key={run.id || `${run.startedAt}-${index}`}><strong className="block text-xs text-white">{run.status || "inconnu"}</strong><span className="mt-1 block text-[10px] text-slate-500">{formatDate(run.startedAt || run.savedAt)}</span><span className="mt-1 block font-mono text-[10px] text-slate-400">{run.totalAfter ?? 0} · {run.unmatchedCount ?? 0} non matché(s)</span></button>)}</aside><main className="min-h-0 overflow-y-auto p-3 sm:p-5"><div className="grid gap-2 sm:grid-cols-4"><Metric label="Statut" value={selectedRun?.status || status} /><Metric label="Total" value={selectedRun?.totalAfter ?? count} mono /><Metric label="Matchés" value={selectedRun?.matchedCount ?? diagnostics.matchedCount ?? 0} mono /><Metric label="Non matchés" value={selectedRun?.unmatchedCount ?? diagnostics.unmatchedCount ?? 0} mono /></div><div className="relative mt-4"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} /><input className="min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/45 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-200/40" value={diagnosticQuery} onChange={(event) => setDiagnosticQuery(event.target.value)} placeholder="Identifiant, forme, costume, raison…" /></div><div className="mt-3 space-y-2">{visibleUnmatched.map((entry, index) => <article className="rounded-xl border border-amber-200/15 bg-amber-300/[.055] p-3" key={`${entry.sourceId}-${entry.sourceName}-${index}`}><div className="flex items-start justify-between gap-2"><div><strong className="text-sm text-white">{entry.sourceName || entry.sourceId || "Entrée source inconnue"}</strong><p className="mt-1 font-mono text-[10px] text-amber-100">{entry.reason || "unknown"}</p></div><button className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-300" type="button" onClick={() => copyDiagnostic(entry)} aria-label="Copier le diagnostic"><Copy size={13} /></button></div><dl className="mt-2 grid gap-2 text-xs sm:grid-cols-2"><Metric label="ID source" value={entry.sourceId || "—"} mono /><Metric label="Forme / costume" value={entry.sourceForm || entry.sourceCostume || "—"} mono />{entry.localFile ? <Metric label="Fichier local possible" value={entry.localFile} mono /> : null}</dl></article>)}{!visibleUnmatched.length ? <p className="rounded-xl border border-dashed border-white/12 p-6 text-center text-sm font-bold text-slate-400">Aucune entrée non matchée pour cette exécution.</p> : null}</div>{selectedRun?.errors?.length ? <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-red-200/20 bg-red-300/[.07] p-3 text-xs text-red-100">{JSON.stringify(selectedRun.errors, null, 2)}</pre> : null}</main></div></div></div></ModalPortal> : null}
    </section>
  );
}

// Façade de compatibilité pour les panels existants.
export const CurrentDatasetDiagnostics = DatasetSourceHeader;
