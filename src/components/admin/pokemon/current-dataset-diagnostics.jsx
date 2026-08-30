"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Database,
  ExternalLink,
  GitCompare,
  History,
  LoaderCircle,
  XCircle,
} from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { UnmatchedEntriesReport } from "./unmatched-entries-report";
import {
  normalizePvpRankingWarnings,
  pvpRankingRegenerationMessage,
} from "@/lib/pvp-ranking-regeneration-state.mjs";
import { actionError, normalizeActionError } from "@/lib/admin-action-errors";

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

function DatasetStatusBadge({ status }) {
  const normalizedStatus = String(status || "inconnu").toLowerCase();
  const tone = ["success", "ready", "completed"].includes(normalizedStatus)
    ? "border-success/25 bg-success/14 text-success-foreground"
    : ["partial", "warning", "cancelled"].includes(normalizedStatus)
      ? "border-warning/25 bg-warning/14 text-warning-foreground"
      : ["failed", "error"].includes(normalizedStatus)
        ? "border-danger/25 bg-danger/14 text-danger-foreground"
        : normalizedStatus === "running"
          ? "border-cyan-300/25 bg-cyan-300/12 text-cyan-100"
          : "border-line bg-white/[0.07] text-muted";

  return (
    <span className={`inline-flex min-h-6 items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-black uppercase leading-4 tracking-[0.12em] ${tone}`} role="status" aria-live="polite" data-regeneration-status={normalizedStatus}>
      {normalizedStatus}
    </span>
  );
}

function DatasetRegenerationStatus({ state, onReport, onRetry }) {
  if (!state) return null;
  const status = state.status || "idle";
  const partial = status === "partial";
  const failed = status === "failed";
  const cancelled = status === "cancelled";
  const running = status === "running";
  const success = status === "success";
  const tone = partial || cancelled
    ? "border-warning/25 bg-warning/10 text-warning-foreground"
    : failed
      ? "border-danger/25 bg-danger/10 text-danger-foreground"
      : success
        ? "border-success/25 bg-success/10 text-success-foreground"
        : "border-line bg-surface-inset-subtle text-foreground-secondary";
  const Icon = running ? LoaderCircle : partial || cancelled ? AlertTriangle : failed ? XCircle : CheckCircle2;
  const label = {
    idle: "Prêt",
    running: "En cours",
    success: "Succès",
    partial: "Résultat partiel",
    failed: "Échec",
    cancelled: "Annulé",
  }[status] || status;

  return (
    <div className={`mt-3 flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center ${tone}`} role={failed ? "alert" : "status"} data-regeneration-status={status}>
      <Icon className={`shrink-0 ${running ? "animate-spin motion-reduce:animate-none" : ""}`} size={18} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <strong className="type-label">{label}</strong>
        <p className="mt-1 type-caption-strong">{pvpRankingRegenerationMessage(state)}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        {state.reportAvailable ? <Button size="sm" variant="ghost" type="button" onClick={onReport}>Voir le rapport</Button> : null}
        {["partial", "failed", "cancelled"].includes(status) ? <Button size="sm" variant="secondary" type="button" onClick={onRetry}>Relancer</Button> : null}
      </div>
    </div>
  );
}

function PvpWarningCard({ warning }) {
  return (
    <article className={`rounded-xl border p-3 ${warning.informational ? "border-cyan-200/20 bg-cyan-300/[.07]" : "border-warning/25 bg-warning/10"}`} data-warning-code={warning.code}>
      <header className="flex min-w-0 flex-wrap items-center gap-2">
        <code className="break-all rounded-md border border-line bg-slate-950/30 px-2 py-1 text-[10px] font-black text-domain-foreground">{warning.code}</code>
        <strong className="min-w-0 break-words text-sm text-domain-foreground">{warning.entity}</strong>
        {warning.informational ? <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-cyan-100">Informatif</span> : null}
      </header>
      <dl className="mt-3 grid gap-2 lg:grid-cols-3">
        {[
          ["Raison", warning.reason],
          ["Impact", warning.impact],
          ["Action", warning.action],
        ].map(([label, value]) => (
          <div className="rounded-lg border border-white/[.07] bg-slate-950/20 p-2.5" key={label}>
            <dt className="text-[9px] font-black uppercase tracking-[0.14em] text-disabled">{label}</dt>
            <dd className="mt-1 type-caption-strong leading-relaxed text-foreground-secondary">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function mergePvpWarnings(stateWarnings, datasetWarnings) {
  const seen = new Set();
  return [...(Array.isArray(stateWarnings) ? stateWarnings : []), ...normalizePvpRankingWarnings(datasetWarnings)]
    .filter((warning) => {
      const key = `${warning.code}:${warning.entity}:${warning.reason}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function RegenerationControl({ dataset, total = 0, refreshError = "", historyUrl = "", regeneration = null, onRetry = null }) {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [unmatchedOpen, setUnmatchedOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRuns, setHistoryRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState(null);
  const meta = dataset?.meta || {};
  const resolvedHistoryUrl = historyUrl || (meta.domain ? `/api/pokemon-admin?action=dataset-history&domain=${encodeURIComponent(meta.domain)}` : "");
  const current = dataset?.current || {};
  const sourceDetails = meta.sourceDetails || current.source || {};
  const diagnostics = meta.diagnostics || current.diagnostics || {};
  const diff = diagnostics.diff || {};
  const warnings = Array.isArray(diagnostics.warnings) ? diagnostics.warnings : [];
  const unmatchedEntries = Array.isArray(diagnostics.unmatchedReport?.entries)
    ? diagnostics.unmatchedReport.entries
    : Array.isArray(diagnostics.unmatchedEntries)
      ? diagnostics.unmatchedEntries
      : [];
  const unmatchedCount = Math.max(
    Number(diagnostics.unmatchedReport?.total) || 0,
    Number(diagnostics.unmatchedCount) || 0,
    Number(regeneration?.unmatchedCount) || 0,
    unmatchedEntries.length,
  );
  const warningCount = Math.max(
    Array.isArray(diagnostics.warnings) ? diagnostics.warnings.length : Number(diagnostics.warnings) || 0,
    Number(diagnostics.warningsCount) || 0,
    Number(regeneration?.warningCount) || 0,
  );
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
  const compactStatus = regeneration?.status && regeneration.status !== "idle" ? regeneration.status : status;
  const lastSyncAt = firstDefined(savedAt, fetchedAt);
  const visibility = firstDefined(meta.visibility, current.visibility, dataset?.data?.meta?.visibility, "public");
  const timezone = firstDefined(meta.timezone, sourceDetails.timezone, diagnostics.details?.timezone);
  const selection = firstDefined(meta.selection, sourceDetails.selection, diagnostics.details?.selectedRaids);
  const dynamicShellDetected = Boolean(firstDefined(
    meta.dynamicShellDetected,
    sourceDetails.dynamicShellDetected,
    diagnostics.details?.dynamicShellDetected,
  ));
  const error = refreshError || meta.refreshError || "";
  const normalizedError = normalizeActionError(error, "La nouvelle récupération a échoué.").message;
  const hasDiff = typeof diff.changed === "boolean";
  const changed = diff.changed === true;
  const errorMessage = normalizedError.startsWith("Affichage de la dernière version MongoDB connue")
    ? normalizedError
    : `Affichage de la dernière version MongoDB connue — la nouvelle récupération a échoué. ${normalizedError}`;
  const metrics = [
    ["Provider", provider, false],
    ["Mode", mode, false],
    ["Événement", formatEvent(event), false],
    ["Total", count, true],
    ["Récupéré le", formatDate(fetchedAt), false],
    ["Enregistré le", formatDate(savedAt), false],
    ["Hash", shortHash, true],
    ["Operation ID", firstDefined(regeneration?.operationId, diagnostics.operationId, current.operationId, "Indisponible"), true],
    ["Matchés / non matchés", `${Number(diagnostics.matchedCount) || 0} / ${Number(diagnostics.unmatchedCount) || 0}`, true],
  ];
  const isPvpRankings = meta.domain === "pvp-rankings";
  const currentPvpWarnings = isPvpRankings
    ? mergePvpWarnings(regeneration?.warningDetails, warnings)
    : [];
  const selectedPvpWarnings = !isPvpRankings
    ? []
    : !selectedRun
      ? currentPvpWarnings
      : Array.isArray(selectedRun.warningDetails)
        ? selectedRun.warningDetails
        : normalizePvpRankingWarnings(selectedRun.warnings);

  function toggleExpanded() {
    setExpanded((currentExpanded) => !currentExpanded);
  }

  async function openHistory(preferCurrent = false) {
    setHistoryOpen(true);
    if (preferCurrent) {
      setSelectedRun({
        status,
        unmatchedEntries,
        warnings,
        warningDetails: currentPvpWarnings,
        errors: [],
        added: diff.added,
        removed: diff.removed,
        modified: diff.modified,
        changed: diff.changed,
        matchedCount: diagnostics.matchedCount,
        unmatchedCount: diagnostics.unmatchedCount,
        mappingMissingCount: diagnostics.mappingMissingCount ?? diagnostics.unmatchedCount,
        ignoredCount: diagnostics.ignoredCount,
        warningsCount: diagnostics.warningsCount ?? warnings.length,
        diffUnavailableReason: diagnostics.diffUnavailableReason,
      });
    }
    if (!resolvedHistoryUrl) return;
    setHistoryLoading(true);
    try {
      const response = await fetch(`${resolvedHistoryUrl}${resolvedHistoryUrl.includes("?") ? "&" : "?"}page=1&limit=50`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw actionError(payload.error, "Historique indisponible.");
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

  function openRegenerationReport() {
    if (unmatchedCount) setUnmatchedOpen(true);
    else openHistory(true);
  }

  return (
    <section className="mt-4 min-w-0 rounded-xl border border-cyan-300/15 bg-cyan-400/[0.055] p-3" aria-label="Contrôle de régénération">
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-foreground">
          <Database className="shrink-0" size={18} aria-hidden="true" />
          <span className="text-muted">Dernière synchro :</span>
          <strong className="min-w-0 truncate" title={formatDate(lastSyncAt)}>{formatDate(lastSyncAt)}</strong>
        </div>
        <DatasetStatusBadge status={compactStatus} />
        {unmatchedCount ? (
          <Button className="min-h-9 whitespace-nowrap" size="sm" variant="secondary" type="button" onClick={() => setUnmatchedOpen(true)}>
            Voir les {unmatchedCount.toLocaleString("fr-FR")} non-matchés
          </Button>
        ) : null}
        <div className="flex shrink-0 items-center gap-2">
          <Button className="min-h-9" size="sm" variant="ghost" type="button" onClick={toggleExpanded} aria-expanded={expanded} aria-controls={detailsId}>
            Détails
            <ChevronDown className={`ml-1 transition-transform duration-motion-normal motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>

      {error ? <ErrorState className="mt-3" title="Diagnostic indisponible" message={errorMessage} /> : null}

      {expanded ? (
        <div className="mt-3 space-y-3 border-t border-line pt-3" id={detailsId}>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <strong className="inline-flex min-w-0 items-center gap-2 text-sm text-foreground">
              <Database className="shrink-0" size={16} aria-hidden="true" />
              <span className="truncate" title={`Source active : ${sourceLabel}`}>Source active : {sourceLabel}</span>
            </strong>
            <span className={`inline-flex min-h-6 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] font-black uppercase leading-4 tracking-[0.08em] sm:py-1 sm:text-[10px] sm:tracking-[0.12em] ${visibility === "private" ? "border-brand/25 bg-brand/14 text-foreground" : "border-success/25 bg-success/14 text-success-foreground"}`}>
              {visibility === "private" ? "Privé · Admin" : "Public · API"}
            </span>
            {warningCount ? <span className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border border-warning/25 bg-warning/12 px-2 py-0.5 text-[9px] font-black leading-4 text-warning-foreground sm:py-1 sm:text-[10px]">{warningCount} avertissement(s)</span> : null}
            {unmatchedCount ? (
              <button className="inline-flex min-h-6 items-center whitespace-nowrap rounded-full border border-warning/25 bg-warning/12 px-2 py-0.5 text-[9px] font-black leading-4 text-warning-foreground underline-offset-2 hover:underline sm:py-1 sm:text-[10px]" type="button" onClick={() => setUnmatchedOpen(true)}>
                {unmatchedCount.toLocaleString("fr-FR")} non matchée(s)
              </button>
            ) : null}
            <span className="ml-auto"><DatasetDiffBadge changed={changed} hasDiff={hasDiff} /></span>
          </div>

          <DatasetRegenerationStatus
            state={regeneration}
            onReport={openRegenerationReport}
            onRetry={onRetry}
          />

          {currentPvpWarnings.length ? (
            <section className="space-y-2 rounded-xl border border-warning/20 bg-amber-300/[.045] p-3" aria-labelledby={`${detailsId}-pvp-warnings`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-domain-foreground" id={`${detailsId}-pvp-warnings`}>
                    {regeneration?.status === "partial" ? "Pourquoi ce statut PARTIAL ?" : "Avertissements du dernier snapshot PvP"}
                  </h3>
                  <p className="mt-1 type-caption-strong text-muted">Chaque avertissement expose son code, l’entité, sa cause, son impact et l’action attendue.</p>
                </div>
                <span className="rounded-full border border-warning/25 bg-warning/10 px-2.5 py-1 text-[10px] font-black text-warning-foreground">{warningCount} avertissement(s)</span>
              </div>
              {currentPvpWarnings.map((warning, index) => <PvpWarningCard warning={warning} key={`${warning.code}-${warning.entity}-${index}`} />)}
            </section>
          ) : null}

          <dl className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, mono]) => <Metric key={label} label={label} value={value} mono={mono} />)}
          </dl>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 type-caption-strong text-foreground-secondary">
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

          {!hasDiff && diagnostics.diffUnavailableReason ? <p className="rounded-xl border border-line bg-slate-950/25 px-3 py-2 type-caption-strong text-muted">Diff indisponible : {diagnostics.diffUnavailableReason}</p> : null}

          {selection ? (
            <div className="grid gap-2 rounded-xl border border-violet-200/18 bg-violet-400/9 p-3 sm:grid-cols-2">
              {selection.regular ? <div className="min-w-0"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-violet-100/55">Rotation raids normale</span><strong className="mt-1 block truncate text-xs text-violet-50">{formatEvent(selection.regular)}</strong></div> : null}
              {selection.shadow ? <div className="min-w-0"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-red-100/55">Rotation raids obscurs</span><strong className="mt-1 block truncate text-xs text-red-50">{formatEvent(selection.shadow)}</strong></div> : null}
            </div>
          ) : null}

          {warnings.length && !isPvpRankings ? (
            <details className="group rounded-xl border border-amber-200/20 bg-amber-300/10 type-caption-strong text-amber-50">
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
              <Metric label="MAPPING_MISSING" value={selectedRun?.mappingMissingCount ?? diagnostics.mappingMissingCount ?? diagnostics.unmatchedCount ?? 0} mono />
              <Metric label="Ignorés" value={selectedRun?.ignoredCount ?? diagnostics.ignoredCount ?? 0} mono />
              <Metric label="WARNING" value={selectedRun?.warningsCount ?? diagnostics.warningsCount ?? warnings.length} mono />
            </dl>
            {selectedPvpWarnings.length ? (
              <section className="mt-4 space-y-2" aria-label="Avertissements de génération PvP">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-sm text-domain-foreground">Avertissements expliqués</strong>
                  <span className="type-caption-strong text-muted">{selectedPvpWarnings.length} détail(s)</span>
                </div>
                {selectedPvpWarnings.map((warning, index) => <PvpWarningCard warning={warning} key={`${warning.code}-${warning.entity}-${index}`} />)}
              </section>
            ) : null}
            <div className="mt-4">
              <UnmatchedEntriesReport entries={selectedRun?.unmatchedEntries || unmatchedEntries} total={selectedRun?.unmatchedCount ?? unmatchedCount} provider={selectedRun?.provider || provider} />
            </div>
            {selectedRun?.errors?.length ? <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-red-200/20 bg-red-300/[.07] p-3 text-xs text-red-100">{JSON.stringify(selectedRun.errors, null, 2)}</pre> : null}
          </div>
        </div>
      </Modal>

      <Modal open={unmatchedOpen} onClose={() => setUnmatchedOpen(false)} title="Entrées non matchées" description={`${provider} · contrat UnmatchedEntriesReport`} className="max-w-6xl">
        <UnmatchedEntriesReport entries={unmatchedEntries} total={unmatchedCount} provider={provider} />
      </Modal>
    </section>
  );
}

// Façades de compatibilité pour les panels existants.
export const DatasetSourceHeader = RegenerationControl;
export const CurrentDatasetDiagnostics = RegenerationControl;
