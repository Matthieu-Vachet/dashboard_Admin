"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Database,
  ExternalLink,
  GitCompare,
  History,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";

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
    <div className="min-w-0 rounded-xl border border-line bg-surface-inset-subtle px-3 py-2.5">
      <dt className="text-[9px] font-black uppercase tracking-[0.16em] text-disabled">{label}</dt>
      <dd className={`mt-1 truncate text-xs font-black text-foreground ${mono ? "font-mono" : ""}`} title={String(value)}>
        {value}
      </dd>
    </div>
  );
}

function DatasetDiffBadge({ changed, hasDiff }) {
  return (
    <span className={`inline-flex min-h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-black uppercase leading-4 tracking-[0.08em] sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.12em] ${changed ? "border-warning/25 bg-warning/14 text-warning-foreground" : "border-success/25 bg-success/14 text-success-foreground"}`}>
      {changed ? <GitCompare size={12} aria-hidden="true" /> : <CheckCircle2 size={12} aria-hidden="true" />}
      {hasDiff ? (changed ? "Contenu modifié" : "Contenu inchangé") : "Diff indisponible"}
    </span>
  );
}

function DiagnosticCard({ entry, provider, onCopy }) {
  const rawAlias = firstDefined(entry.rawAlias, entry.sourceAlias, entry.sourceId, entry.sourceName, "—");
  const normalizedAlias = firstDefined(entry.normalizedAlias, entry.normalizedSourceId, "—");
  const pokemon = firstDefined(entry.pokemon, entry.sourceName, entry.pokemonName, "Non détecté");
  const form = firstDefined(entry.form, entry.sourceForm, "—");
  const costume = firstDefined(entry.costume, entry.sourceCostume, "—");
  const candidates = Array.isArray(entry.candidates) ? entry.candidates : [];

  return (
    <article className="rounded-xl border border-amber-200/15 bg-amber-300/[.055] p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <strong className="block break-words text-sm text-domain-foreground">{entry.sourceName || entry.sourceId || "Entrée source inconnue"}</strong>
          <p className="mt-1 break-words font-mono text-[10px] text-amber-100">{entry.reason || "alias-inconnu"}</p>
        </div>
        <Button size="icon" variant="ghost" type="button" onClick={() => onCopy(entry)} aria-label="Copier le diagnostic">
          <Copy size={13} />
        </Button>
      </div>
      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2 xl:grid-cols-3">
        <Metric label="Provider" value={entry.provider || provider} mono />
        <Metric label="Alias brut" value={rawAlias} mono />
        <Metric label="Alias normalisé" value={normalizedAlias} mono />
        <Metric label="Pokémon détecté" value={pokemon} />
        <Metric label="Pokédex" value={entry.pokemonId || entry.dexNr || "—"} mono />
        <Metric label="Forme" value={form} mono />
        <Metric label="Costume" value={costume} mono />
        <Metric label="Confiance" value={entry.confidence ?? 0} mono />
        <Metric label="Occurrences" value={entry.occurrences ?? 1} mono />
        <Metric label="Première détection" value={formatDate(entry.firstDetectedAt)} />
        <Metric label="Dernière détection" value={formatDate(entry.lastDetectedAt)} />
        <Metric label="Action proposée" value={entry.proposedAction || "Associer dans Identity Manager"} />
        {entry.localFile ? <Metric label="Fichier local possible" value={entry.localFile} mono /> : null}
      </dl>
      {candidates.length ? (
        <details className="mt-3 rounded-lg border border-line bg-surface-inset-subtle text-xs">
          <summary className="cursor-pointer px-3 py-2 font-black text-cyan-100">Voir les {candidates.length} candidat(s)</summary>
          <pre className="max-h-52 overflow-auto border-t border-line p-3 text-[10px] text-foreground-secondary">{JSON.stringify(candidates, null, 2)}</pre>
        </details>
      ) : null}
      <Button asChild className="mt-3" size="sm" variant="secondary">
        <a href="/pokemon-admin?section=identity-manager">Ouvrir l’Identity Manager</a>
      </Button>
    </article>
  );
}

export function DatasetSourceHeader({ dataset, total = 0, refreshError = "", historyUrl = "" }) {
  const [expanded, setExpanded] = useState(false);
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
  const storageKey = useMemo(
    () => `matweb.pokemon.dataset-source.${String(meta.domain || provider).toLowerCase().replace(/[^a-z0-9_-]+/g, "-")}`,
    [meta.domain, provider],
  );
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
    setExpanded(window.sessionStorage.getItem(storageKey) === "open");
  }, [storageKey]);

  function toggleExpanded() {
    setExpanded((currentExpanded) => {
      const nextExpanded = !currentExpanded;
      window.sessionStorage.setItem(storageKey, nextExpanded ? "open" : "closed");
      return nextExpanded;
    });
  }

  async function openHistory(preferCurrent = false) {
    setHistoryOpen(true);
    setDiagnosticQuery("");
    if (preferCurrent) {
      setSelectedRun({
        status,
        unmatchedEntries,
        warnings,
        errors: [],
        added: diff.added,
        removed: diff.removed,
        modified: diff.modified,
        changed: diff.changed,
        matchedCount: diagnostics.matchedCount,
        unmatchedCount: diagnostics.unmatchedCount,
        diffUnavailableReason: diagnostics.diffUnavailableReason,
      });
    }
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
    <section className="mt-4 min-w-0 rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.075] p-3 sm:p-4" aria-label="État de la source de données">
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 sm:flex sm:flex-wrap sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 text-sm font-black text-foreground sm:shrink-0">
          <Database className="shrink-0" size={18} aria-hidden="true" />
          <span className="min-w-0 truncate" title={`Source active : ${sourceLabel}`}>Source active : {sourceLabel}</span>
        </div>
        <div className="order-3 col-span-2 flex min-w-0 flex-wrap items-center gap-1.5 sm:order-none sm:flex-1 sm:gap-2">
          <span className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border border-line bg-white/[0.07] px-2 py-0.5 text-[9px] font-black uppercase leading-4 tracking-[0.08em] text-muted sm:py-1 sm:text-[10px] sm:tracking-[0.12em]">{status}</span>
          <span className={`inline-flex min-h-6 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-black uppercase leading-4 tracking-[0.08em] sm:py-1 sm:text-[10px] sm:tracking-[0.12em] ${visibility === "private" ? "border-brand/25 bg-brand/14 text-foreground" : "border-success/25 bg-success/14 text-success-foreground"}`}>
            {visibility === "private" ? "Privé · Admin" : "Public · API"}
          </span>
          {warningCount ? <span className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border border-warning/25 bg-warning/12 px-2 py-0.5 text-[9px] font-black leading-4 text-warning-foreground sm:py-1 sm:text-[10px]">{warningCount} avertissement(s)</span> : null}
          {unmatchedEntries.length ? (
            <button className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border border-warning/25 bg-warning/12 px-2 py-0.5 text-[9px] font-black leading-4 text-warning-foreground underline-offset-2 hover:underline sm:py-1 sm:text-[10px]" type="button" onClick={() => openHistory(true)}>
              {unmatchedEntries.length} non matchée(s)
            </button>
          ) : null}
          <span className="sm:hidden">
            <DatasetDiffBadge changed={changed} hasDiff={hasDiff} />
          </span>
        </div>
        <div className="col-start-2 row-start-1 flex shrink-0 items-center gap-2 sm:order-none sm:ml-auto">
          <span className="hidden sm:block">
            <DatasetDiffBadge changed={changed} hasDiff={hasDiff} />
          </span>
          <Button className="h-9 w-9 sm:h-10 sm:w-10" size="icon" variant="ghost" type="button" onClick={toggleExpanded} aria-expanded={expanded} aria-label={expanded ? "Replier les détails de la source" : "Déplier les détails de la source"}>
            <ChevronDown className={`transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} size={18} />
          </Button>
        </div>
      </div>

      {error ? <ErrorState className="mt-3" title="Diagnostic indisponible" message={errorMessage} /> : null}

      {expanded ? (
        <div className="mt-3 space-y-3">
          <dl className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, mono]) => <Metric key={label} label={label} value={value} mono={mono} />)}
          </dl>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-foreground-secondary">
            {sourceUrl ? (
              <a className="inline-flex min-w-0 items-center gap-1 text-cyan-100 underline decoration-cyan-200/30 underline-offset-4 hover:text-domain-foreground" href={sourceUrl} target="_blank" rel="noreferrer">
                <span className="max-w-full break-all sm:max-w-[36rem] sm:truncate">{sourceUrl}</span>
                <ExternalLink className="shrink-0" size={13} aria-hidden="true" />
              </a>
            ) : <span>URL source indisponible</span>}
            <span>Ajoutés : {Number(diff.added) || 0}</span>
            <span title="Absent du flux courant, jamais supprimé de l’archive permanente">Absents du flux : {Number(diff.removed) || 0}</span>
            <span>Modifiés : {Number(diff.modified) || 0}</span>
            <span>Avertissements : {warningCount}</span>
            {timezone ? <span>Fuseau : {timezone}</span> : null}
            {dynamicShellDetected ? <span className="text-violet-100">Page dynamique résolue</span> : null}
            {resolvedHistoryUrl ? <Button size="sm" variant="ghost" type="button" onClick={() => openHistory(false)} icon={<History size={13} />}>Historique</Button> : null}
          </div>

          {!hasDiff && diagnostics.diffUnavailableReason ? <p className="rounded-xl border border-line bg-slate-950/25 px-3 py-2 text-xs font-bold text-muted">Diff indisponible : {diagnostics.diffUnavailableReason}</p> : null}

          {selection ? (
            <div className="grid gap-2 rounded-xl border border-violet-200/18 bg-violet-400/9 p-3 sm:grid-cols-2">
              {selection.regular ? <div className="min-w-0"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-violet-100/55">Rotation raids normale</span><strong className="mt-1 block truncate text-xs text-violet-50">{formatEvent(selection.regular)}</strong></div> : null}
              {selection.shadow ? <div className="min-w-0"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-red-100/55">Rotation raids obscurs</span><strong className="mt-1 block truncate text-xs text-red-50">{formatEvent(selection.shadow)}</strong></div> : null}
            </div>
          ) : null}

          {warnings.length ? (
            <details className="group rounded-xl border border-amber-200/20 bg-amber-300/10 text-xs font-bold leading-5 text-amber-50">
              <summary className="cursor-pointer list-none px-3 py-2.5">Afficher les {warnings.length} diagnostic(s)</summary>
              <ul className="space-y-1 border-t border-amber-100/10 p-3">
                {warnings.map((warning, index) => <li key={`${formatWarning(warning)}-${index}`}>• {formatWarning(warning)}</li>)}
              </ul>
            </details>
          ) : null}
        </div>
      ) : null}

      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title="Historique des exécutions" description={provider} className="max-w-6xl">
        <div className="grid min-h-[56dvh] gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="max-h-[65dvh] overflow-y-auto border-b border-line pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-3">
            {historyLoading ? <FetchLoadingState layout="inline" title="Chargement de l’historique…" /> : historyRuns.map((run, index) => (
              <button className={`mb-2 w-full rounded-xl border p-3 text-left ${selectedRun === run ? "border-cyan-200/35 bg-cyan-300/10" : "border-line bg-white/[.025]"}`} type="button" onClick={() => setSelectedRun(run)} key={run.id || `${run.startedAt}-${index}`}>
                <strong className="block text-xs text-domain-foreground">{run.status || "inconnu"}</strong>
                <span className="mt-1 block text-[10px] text-disabled">{formatDate(run.startedAt || run.savedAt)}</span>
                <span className="mt-1 block font-mono text-[10px] text-muted">{run.totalAfter ?? 0} · {run.unmatchedCount ?? 0} non matché(s)</span>
              </button>
            ))}
          </aside>
          <div className="min-w-0">
            <dl className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="Statut" value={selectedRun?.status || status} />
              <Metric label="Total" value={selectedRun?.totalAfter ?? count} mono />
              <Metric label="Matchés" value={selectedRun?.matchedCount ?? diagnostics.matchedCount ?? 0} mono />
              <Metric label="Non matchés" value={selectedRun?.unmatchedCount ?? diagnostics.unmatchedCount ?? 0} mono />
            </dl>
            <label className="relative mt-4 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disabled" size={16} />
              <input className="min-h-11 w-full rounded-xl border border-line bg-surface-inset-strong pl-10 pr-3 text-sm text-domain-foreground outline-none focus:border-cyan-200/40" value={diagnosticQuery} onChange={(event) => setDiagnosticQuery(event.target.value)} placeholder="Identifiant, alias, forme, costume, raison…" />
            </label>
            <div className="mt-3 max-h-[54dvh] space-y-2 overflow-y-auto pr-1">
              {visibleUnmatched.map((entry, index) => <DiagnosticCard entry={entry} provider={provider} onCopy={copyDiagnostic} key={`${entry.sourceId}-${entry.sourceName}-${index}`} />)}
              {!visibleUnmatched.length ? <EmptyState title="Aucune entrée non matchée pour cette exécution" /> : null}
            </div>
            {selectedRun?.errors?.length ? <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-red-200/20 bg-red-300/[.07] p-3 text-xs text-red-100">{JSON.stringify(selectedRun.errors, null, 2)}</pre> : null}
          </div>
        </div>
      </Modal>
    </section>
  );
}

// Façade de compatibilité pour les panels existants.
export const CurrentDatasetDiagnostics = DatasetSourceHeader;
