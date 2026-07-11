"use client";

import { AlertTriangle, CheckCircle2, Database, ExternalLink, GitCompare } from "lucide-react";

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

export function CurrentDatasetDiagnostics({ dataset, total = 0, refreshError = "" }) {
  const meta = dataset?.meta || {};
  const current = dataset?.current || {};
  const sourceDetails = meta.sourceDetails || current.source || {};
  const diagnostics = meta.diagnostics || current.diagnostics || {};
  const diff = diagnostics.diff || {};
  const warnings = Array.isArray(diagnostics.warnings) ? diagnostics.warnings : [];
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
  const error = refreshError || meta.refreshError || "";
  const hasDiff = typeof diff.changed === "boolean";
  const changed = diff.changed === true;
  const errorMessage = error && String(error).startsWith("Affichage de la dernière version MongoDB connue")
    ? String(error)
    : `Affichage de la dernière version MongoDB connue — la nouvelle récupération a échoué. ${error}`;

  return (
    <section className="mt-4 space-y-3 rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.075] p-4" aria-label="État de la source de données">
      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-red-200/25 bg-red-400/12 p-3 text-sm font-bold leading-5 text-red-50" role="alert">
          <AlertTriangle className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-sm font-black text-cyan-50">
          <Database size={18} aria-hidden="true" />
          <span>Source active : {sourceLabel}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.07] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-100/70">
            {status}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${changed ? "border-amber-200/25 bg-amber-300/14 text-amber-50" : "border-emerald-200/25 bg-emerald-300/14 text-emerald-50"}`}>
          {changed ? <GitCompare size={13} aria-hidden="true" /> : <CheckCircle2 size={13} aria-hidden="true" />}
          {hasDiff ? (changed ? "Contenu modifié" : "Contenu inchangé") : "Diff indisponible"}
        </span>
      </div>

      <dl className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Provider" value={provider} />
        <Metric label="Mode" value={mode} />
        <Metric label="Événement" value={formatEvent(event)} />
        <Metric label="Total" value={count} mono />
        <Metric label="Récupéré le" value={formatDate(fetchedAt)} />
        <Metric label="Enregistré le" value={formatDate(savedAt)} />
        <Metric label="Hash" value={shortHash} mono />
        <Metric label="Matchés / non matchés" value={`${Number(diagnostics.matchedCount) || 0} / ${Number(diagnostics.unmatchedCount) || 0}`} mono />
      </dl>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-300">
        {sourceUrl ? (
          <a className="inline-flex min-w-0 items-center gap-1 text-cyan-100 underline decoration-cyan-200/30 underline-offset-4 hover:text-white" href={sourceUrl} target="_blank" rel="noreferrer">
            <span className="max-w-[36rem] truncate">{sourceUrl}</span>
            <ExternalLink className="shrink-0" size={13} aria-hidden="true" />
          </a>
        ) : <span>URL source indisponible</span>}
        <span>Ajoutés : {Number(diff.added) || 0}</span>
        <span>Retirés : {Number(diff.removed) || 0}</span>
        <span>Modifiés : {Number(diff.modified) || 0}</span>
        <span>Avertissements : {warningCount}</span>
      </div>

      {warnings.length ? (
        <ul className="space-y-1 rounded-xl border border-amber-200/20 bg-amber-300/10 p-3 text-xs font-bold leading-5 text-amber-50">
          {warnings.map((warning) => (
            <li key={formatWarning(warning)}>• {formatWarning(warning)}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
