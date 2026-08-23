"use client";

import { AlertTriangle, Copy, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/admin/shared/state-system";
import {
  createUnmatchedEntriesReport,
  unmatchedReasonLabels,
} from "@/lib/unmatched-entries-report.mjs";

const PAGE_SIZE = 50;
const fieldClass = "min-h-11 w-full rounded-xl border border-line bg-surface-inset-strong px-3 text-sm font-bold text-domain-foreground outline-none focus:border-cyan-200/40";

function printable(value) {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function ReportField({ label, value, mono = false }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-surface-inset-subtle p-2.5">
      <dt className="text-[9px] font-black uppercase tracking-[0.14em] text-disabled">{label}</dt>
      <dd className={`mt-1 break-words text-xs font-bold text-foreground-secondary ${mono ? "font-mono" : ""}`}>{printable(value)}</dd>
    </div>
  );
}

function UnmatchedEntryCard({ entry }) {
  async function copyEntry() {
    await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
  }

  return (
    <article className="min-w-0 rounded-xl border border-warning/20 bg-warning/[.065] p-3" data-unmatched-reason={entry.reason} data-unmatched-status={entry.status}>
      <header className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="break-words text-sm text-domain-foreground">{entry.name || entry.sourceId || "Entrée source inconnue"}</strong>
            <span className="rounded-full border border-warning/25 bg-warning/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-warning-foreground">{entry.status}</span>
          </div>
          <code className="mt-1 block break-all text-[10px] font-black text-warning-foreground">{entry.reason}</code>
          <p className="mt-1 type-caption-strong text-muted">{unmatchedReasonLabels[entry.reason] || entry.reasonDetails}</p>
        </div>
        <Button size="icon" variant="ghost" type="button" onClick={copyEntry} aria-label="Copier l’entrée non matchée"><Copy size={14} /></Button>
      </header>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <ReportField label="Provider" value={entry.provider} mono />
        <ReportField label="Source ID" value={entry.sourceId} mono />
        <ReportField label="Nom" value={entry.name} />
        <ReportField label="Valeur source" value={entry.sourceValue} mono />
        <ReportField label="Raison" value={entry.reasonDetails} />
        <ReportField label="Confiance" value={`${Math.round(Number(entry.confidence || 0) * 100)} %`} mono />
        <ReportField label="Destination éventuelle" value={entry.destination} mono />
        <ReportField label="Forme source" value={entry.sourceForm} mono />
        <ReportField label="Variante / costume" value={entry.sourceCostume} mono />
      </dl>
      <details className="mt-3 rounded-lg border border-line bg-surface-inset-subtle text-xs">
        <summary className="cursor-pointer px-3 py-2 font-black text-cyan-100">Candidats · {entry.candidates.length}</summary>
        <pre className="max-h-52 overflow-auto border-t border-line p-3 text-[10px] text-foreground-secondary">{entry.candidates.length ? JSON.stringify(entry.candidates, null, 2) : "Aucun candidat proposé."}</pre>
      </details>
    </article>
  );
}

export function UnmatchedEntriesReport({ entries = [], total = 0, provider = "Indisponible" }) {
  const [query, setQuery] = useState("");
  const [reason, setReason] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const report = useMemo(
    () => createUnmatchedEntriesReport(entries, { provider, expectedCount: total }),
    [entries, provider, total],
  );
  const reasons = useMemo(() => [...new Set(report.entries.map((entry) => entry.reason))].sort(), [report.entries]);
  const providers = useMemo(() => [...new Set(report.entries.map((entry) => entry.provider))].sort(), [report.entries]);
  const statuses = useMemo(() => [...new Set(report.entries.map((entry) => entry.status))].sort(), [report.entries]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return report.entries.filter((entry) => {
      if (reason !== "all" && entry.reason !== reason) return false;
      if (selectedProvider !== "all" && entry.provider !== selectedProvider) return false;
      if (status !== "all" && entry.status !== status) return false;
      return !needle || JSON.stringify(entry).toLowerCase().includes(needle);
    });
  }, [query, reason, report.entries, selectedProvider, status]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  return (
    <section className="min-w-0" aria-label="Rapport des entrées non matchées" data-report-schema={report.schema}>
      <div className="grid gap-2 sm:grid-cols-3">
        <ReportField label="Entrées non matchées" value={report.total.toLocaleString("fr-FR")} mono />
        <ReportField label="Détails disponibles" value={report.detailedCount.toLocaleString("fr-FR")} mono />
        <ReportField label="Résultats filtrés" value={filtered.length.toLocaleString("fr-FR")} mono />
      </div>
      {!report.complete ? (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-danger/25 bg-danger/10 p-3 text-danger-foreground" role="alert">
          <AlertTriangle className="mt-0.5 shrink-0" size={17} />
          <p className="type-caption-strong">Rapport incomplet : {report.missingDetailCount.toLocaleString("fr-FR")} entrée(s) historique(s) ne possèdent pas encore de détail structuré. Une nouvelle régénération appliquera le contrat complet.</p>
        </div>
      ) : null}
      <div className="mt-4 grid gap-2 lg:grid-cols-[minmax(15rem,1fr)_15rem_15rem_12rem]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disabled" size={16} />
          <input className={`${fieldClass} pl-10`} value={query} onChange={(event) => changeFilter(setQuery, event.target.value)} placeholder="ID, nom, valeur source, candidat…" aria-label="Rechercher dans les non-matchés" />
        </label>
        <select className={fieldClass} value={reason} onChange={(event) => changeFilter(setReason, event.target.value)} aria-label="Filtrer par raison">
          <option value="all">Toutes les raisons</option>
          {reasons.map((value) => <option value={value} key={value}>{value}</option>)}
        </select>
        <select className={fieldClass} value={selectedProvider} onChange={(event) => changeFilter(setSelectedProvider, event.target.value)} aria-label="Filtrer par provider">
          <option value="all">Tous les providers</option>
          {providers.map((value) => <option value={value} key={value}>{value}</option>)}
        </select>
        <select className={fieldClass} value={status} onChange={(event) => changeFilter(setStatus, event.target.value)} aria-label="Filtrer par statut">
          <option value="all">Tous les statuts</option>
          {statuses.map((value) => <option value={value} key={value}>{value}</option>)}
        </select>
      </div>
      <div className="mt-3 max-h-[54dvh] space-y-2 overflow-y-auto pr-1">
        {visible.map((entry, index) => <UnmatchedEntryCard entry={entry} key={`${entry.provider}-${entry.sourceId}-${entry.sourceValue}-${index}`} />)}
        {!visible.length ? <EmptyState title="Aucune entrée non matchée dans ces filtres" /> : null}
      </div>
      {pages > 1 ? (
        <nav className="mt-3 flex flex-wrap items-center justify-between gap-2" aria-label="Pagination des non-matchés">
          <span className="type-caption-strong text-muted">Page {safePage} / {pages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" type="button" disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Précédent</Button>
            <Button size="sm" variant="ghost" type="button" disabled={safePage >= pages} onClick={() => setPage((value) => Math.min(pages, value + 1))}>Suivant</Button>
          </div>
        </nav>
      ) : null}
    </section>
  );
}
