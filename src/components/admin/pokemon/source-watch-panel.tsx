"use client";

import { AlertTriangle, CheckCircle2, Copy, ExternalLink, Search, XCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  sourceCause,
  sourceMatchesQuery,
  sourceMatchesStatus,
  sourceSignature,
  sourceStatusKind,
  sourceStatusLabel,
  type SourceStatusFilter,
} from "@/lib/source-watch-presentation";

type SourceItem = {
  id?: string;
  name?: string;
  repo?: string;
  url?: string;
  remoteUrl?: string;
  status?: string;
  signature?: string;
  version?: string;
  updatedAt?: string | null;
  message?: string | null;
  description?: string;
  category?: string;
  type?: string;
  changedSinceLastCheck?: boolean;
};

const sourceTaxonomy = [
  { id: "pokemon", label: "Disponibilité Pokémon", categories: ["pokemon-availability", "pokemon-shiny-availability", "pokemon-costumes", "pokemon-shadow-availability", "shiny", "costume-audit"] },
  { id: "combat", label: "Combat", categories: ["pvp", "pve", "best-defenders", "gbl-calendar", "raids", "max-battles", "team-go-rocket"] },
  { id: "events", label: "Événements", categories: ["events", "events-reference", "eggs", "research-tasks", "news", "official"] },
  { id: "assets", label: "Assets", categories: ["assets", "shuffle"] },
  { id: "providers", label: "Fournisseurs et données", categories: ["gamemaster", "reference"] },
  { id: "technical", label: "Technique", categories: [] },
];

function sourceTaxonomyGroup(source: SourceItem) {
  return sourceTaxonomy.find((group) => group.categories.includes(source.category || "")) || sourceTaxonomy.at(-1)!;
}

type SourceWatchState = {
  loading?: boolean;
  error?: string;
  sources?: SourceItem[];
  checkedAt?: string;
} | null;

const emptySourceItems: SourceItem[] = [];

type SourceHistoryItem = SourceItem & {
  checkedAt?: string;
  sourceId?: string;
  previousSignature?: string | null;
  previousVersion?: string | null;
};

type DataDeployHistoryItem = {
  id?: string;
  status?: string;
  triggeredAt?: string;
  triggeredBy?: string;
  httpStatus?: number;
  dataChanges?: {
    status?: string;
    repo?: string;
    ref?: string;
    baseCommit?: string | null;
    targetCommit?: string;
    compareUrl?: string;
    trackedFiles?: number;
    pokemonFiles?: number;
    assetFiles?: number;
    catalogFiles?: number;
    truncated?: boolean;
    note?: string;
    files?: Array<{
      path?: string;
      status?: string;
      category?: string;
      label?: string;
      dexId?: string | null;
      additions?: number;
      deletions?: number;
      changes?: number;
      rawUrl?: string | null;
    }>;
  };
};

const categoryLabels: Record<string, string> = {
  official: "Officiel",
  news: "Actualités",
  gamemaster: "Game Master",
  assets: "Assets",
  shuffle: "Shuffle",
  pvp: "PvP",
  reference: "Références",
  source: "Source",
  github: "GitHub",
  website: "Site web",
};

const dataCategoryLabels: Record<string, string> = {
  pokemon: "Fiche",
  form: "Forme",
  assets: "Assets",
  catalogue: "Catalogue",
  source: "Source",
};

function issueLabel(value: unknown) {
  const key = String(value || "source");
  return categoryLabels[key] || key;
}

function formatSourceDate(value: unknown) {
  if (!value) return "date inconnue";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function SourceHistoryModal({
  open,
  history = [],
  onClose,
}: {
  open: boolean;
  history?: SourceHistoryItem[];
  onClose: () => void;
}) {
  if (!open) return null;

  const events = [...history].slice(0, 120);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-history-title"
      aria-describedby="source-history-description"
    >
      <section className="relative z-[1001] max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-hidden rounded-overlay border border-line bg-slate-950 shadow-overlay sm:max-h-[calc(100dvh-3rem)]">
        <header className="flex items-start justify-between gap-4 border-b border-line bg-surface-minimal p-5">
          <div>
            <p className="type-overline text-cyan-200/75">Mongo source history</p>
            <h3 id="source-history-title" className="mt-2 type-title-section text-domain-foreground">Historique des sources</h3>
            <p id="source-history-description" className="mt-2 max-w-3xl type-body-strong text-muted">
              Chaque changement de commit, tag, ETag, Last-Modified ou statut HTTP est conservé dans Mongo via
              <span className="font-mono text-cyan-100"> matweb.pokemon.sourceHistory</span>.
            </p>
          </div>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface-control type-title-subsection text-domain-foreground hover:bg-surface-emphasis"
            type="button"
            onClick={onClose}
            aria-label="Fermer l'historique des sources"
          >
            x
          </button>
        </header>
        <div className="max-h-[calc(100dvh-14rem)] overflow-y-auto p-5">
          {events.length ? (
            <div className="grid gap-3">
              {events.map((item) => (
                <article
                  className="rounded-2xl border border-line bg-surface-flat p-4"
                  key={item.id || `${item.sourceId}-${item.checkedAt}-${item.signature}`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 type-overline text-cyan-100">
                          {issueLabel(item.category || item.type)}
                        </span>
                        <span className="rounded-full border border-line bg-surface-control px-3 py-1 type-overline text-foreground-secondary">
                          {item.status || "statut inconnu"}
                        </span>
                      </div>
                      <strong className="mt-3 block break-words type-title-card text-domain-foreground">
                        {item.name || item.sourceId}
                      </strong>
                      <small className="mt-1 block type-caption-strong text-muted">{formatSourceDate(item.checkedAt)}</small>
                      {item.message ? (
                        <p className="mt-3 type-body-strong text-foreground-secondary">{item.message}</p>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-left md:text-right">
                      <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 type-label text-emerald-100">
                        {item.version || "sans version"}
                      </span>
                      {item.remoteUrl ? (
                        <a
                          className="mt-2 inline-flex items-center gap-1 type-label text-cyan-100 hover:text-domain-foreground"
                          href={item.remoteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          ouvrir <ExternalLink size={13} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-surface-inset-medium p-3">
                      <p className="type-overline text-disabled">Avant</p>
                      <code className="mt-2 block break-all type-caption-strong text-foreground-secondary">
                        {item.previousVersion || item.previousSignature || "premier relevé"}
                      </code>
                    </div>
                    <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-3">
                      <p className="type-overline text-cyan-100/70">Maintenant</p>
                      <code className="mt-2 block break-all type-caption-strong text-cyan-50">
                        {item.signature || item.version || "signature inconnue"}
                      </code>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="Aucun historique enregistré" description="Lance une vérification des sources pour créer le premier relevé." />
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
}

export function DataDeployHistoryModal({
  open,
  history = [],
  onClose,
}: {
  open: boolean;
  history?: DataDeployHistoryItem[];
  onClose: () => void;
}) {
  if (!open) return null;

  const events = [...history].slice(0, 80);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-deploy-history-title"
      aria-describedby="data-deploy-history-description"
    >
      <section className="relative z-[1001] max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-hidden rounded-overlay border border-line bg-slate-950 shadow-overlay sm:max-h-[calc(100dvh-3rem)]">
        <header className="flex items-start justify-between gap-4 border-b border-line bg-surface-minimal p-5">
          <div>
            <p className="type-overline text-cyan-200/75">PokemonGo-Data deploy history</p>
            <h3 id="data-deploy-history-title" className="mt-2 type-title-section text-domain-foreground">Historique des déploiements data</h3>
            <p id="data-deploy-history-description" className="mt-2 max-w-3xl type-body-strong text-muted">
              Chaque redéploiement demandé depuis le Dashboard conserve le commit PokemonGo-Data visé et les fichiers JSON
              modifiés dans <span className="font-mono text-cyan-100">matweb.dashboard.deployHistory</span>.
            </p>
          </div>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface-control type-title-subsection text-domain-foreground hover:bg-surface-emphasis"
            type="button"
            onClick={onClose}
            aria-label="Fermer l'historique data"
          >
            x
          </button>
        </header>
        <div className="max-h-[calc(100dvh-14rem)] overflow-y-auto p-5">
          {events.length ? (
            <div className="grid gap-3">
              {events.map((item) => {
                const changes = item.dataChanges;
                const files = changes?.files || [];
                return (
                  <article
                    className="rounded-2xl border border-line bg-surface-flat p-4"
                    key={item.id || `${item.triggeredAt}-${changes?.targetCommit}`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 type-overline text-cyan-100">
                            {item.status || "deploy"}
                          </span>
                          <span className="rounded-full border border-line bg-surface-control px-3 py-1 type-overline text-foreground-secondary">
                            {changes?.trackedFiles || 0} JSON suivi(s)
                          </span>
                        </div>
                        <strong className="mt-3 block break-words type-title-card text-domain-foreground">
                          PokemonGo-Data {changes?.ref || "main"}
                        </strong>
                        <small className="mt-1 block type-caption-strong text-muted">{formatSourceDate(item.triggeredAt)}</small>
                        {changes?.note ? (
                          <p className="mt-3 type-body-strong text-foreground-secondary">{changes.note}</p>
                        ) : null}
                      </div>
                      <div className="shrink-0 text-left md:text-right">
                        <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-xs font-black text-emerald-100">
                          {changes?.targetCommit ? changes.targetCommit.slice(0, 12) : "commit inconnu"}
                        </span>
                        {changes?.compareUrl ? (
                          <a
                            className="mt-2 inline-flex items-center gap-1 type-label text-cyan-100 hover:text-domain-foreground"
                            href={changes.compareUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            comparer <ExternalLink size={13} />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 type-caption-strong text-foreground-secondary sm:grid-cols-3">
                      <span className="rounded-2xl border border-line bg-surface-inset p-3">
                        Fiches: {changes?.pokemonFiles || 0}
                      </span>
                      <span className="rounded-2xl border border-line bg-surface-inset p-3">
                        Assets: {changes?.assetFiles || 0}
                      </span>
                      <span className="rounded-2xl border border-line bg-surface-inset p-3">
                        Catalogues: {changes?.catalogFiles || 0}
                      </span>
                    </div>

                    {files.length ? (
                      <div className="mt-4 grid gap-2">
                        {files.slice(0, 48).map((file) => (
                          <div
                            className="flex min-w-0 flex-col gap-2 rounded-2xl border border-line bg-surface-inset p-3 sm:flex-row sm:items-center sm:justify-between"
                            key={`${item.id}-${file.path}`}
                          >
                            <span className="min-w-0">
                              <span className="mr-2 inline-flex rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2.5 py-1 type-overline-compact text-cyan-100">
                                {dataCategoryLabels[file.category || ""] || file.category || "JSON"}
                              </span>
                              <span className="break-all text-sm font-black text-domain-foreground">{file.path}</span>
                            </span>
                            <span className="shrink-0 rounded-full border border-line bg-surface-subtle px-3 py-1 type-label text-foreground-secondary">
                              {file.status || "modified"} · +{file.additions || 0} / -{file.deletions || 0}
                            </span>
                          </div>
                        ))}
                        {files.length > 48 || changes?.truncated ? (
                          <p className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 type-caption-strong text-amber-100">
                            Liste raccourcie dans le Dashboard. Utilise le lien de comparaison GitHub pour tout voir.
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <EmptyState className="mt-4" title="Aucun fichier JSON suivi n’a été détecté entre les deux commits" />
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState title="Aucun redéploiement data enregistré pour le moment" />
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
}

export function SourceRows({ sourceWatch }: { sourceWatch: SourceWatchState }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<SourceStatusFilter>("all");
  const sources = sourceWatch?.sources || emptySourceItems;
  const filteredSources = useMemo(() => sources.filter((source) => (
    sourceMatchesQuery(source, query)
    && sourceMatchesStatus(source, statusFilter)
    && (categoryFilter === "all" || sourceTaxonomyGroup(source).id === categoryFilter)
  )), [categoryFilter, query, sources, statusFilter]);
  const groupedSources = useMemo(() => sourceTaxonomy
    .map((group) => ({ ...group, sources: filteredSources.filter((source) => sourceTaxonomyGroup(source).id === group.id) }))
    .filter((group) => group.sources.length), [filteredSources]);

  if (sourceWatch?.loading) {
    return <FetchLoadingState layout="inline" title="Vérification des sources en cours…" />;
  }

  if (sourceWatch?.error) {
    return <ErrorState title="Sources indisponibles" message={sourceWatch.error} />;
  }

  const okCount = sources.filter((source) => source.status === "ok").length;
  const warningCount = sources.filter((source) => source.status === "warning").length;
  const errorCount = sources.filter((source) => source.status && !["ok", "warning"].includes(source.status)).length;
  const changedSources = sources.filter((source) => source.changedSinceLastCheck);
  const attentionSources = sources.filter((source) => source.status && source.status !== "ok");
  const lastCheck = sourceWatch?.checkedAt || sources.map((source) => source.updatedAt).filter(Boolean).sort().at(-1);

  async function copySourceSignature(source: SourceItem) {
    const value = sourceSignature(source);
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`Empreinte copiée — ${source.name || source.repo || "source"}`);
    } catch {
      toast.error("Impossible de copier l’empreinte de la source.");
    }
  }

  return (
    <div className="min-w-0 space-y-4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <SourceStat label="Sources suivies" value={sources.length} tone="sky" />
        <SourceStat label="Sources OK" value={okCount} tone="emerald" />
        <SourceStat label="À surveiller" value={warningCount} tone="amber" />
        <SourceStat label="Indisponibles" value={errorCount} tone="red" />
        <SourceStat className="col-span-2 lg:col-span-1" label="Dernière vérification" value={formatSourceDate(lastCheck)} tone="cyan" compact />
      </div>

      <section className="rounded-3xl border border-line bg-surface-inset-subtle p-3 sm:p-4" aria-labelledby="source-watch-filters-title">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="type-overline text-cyan-700 dark:text-cyan-100">Supervision des sources</p>
            <h3 id="source-watch-filters-title" className="mt-1 font-black text-domain-foreground">Rechercher et filtrer</h3>
          </div>
          <p className="type-caption-strong text-muted" aria-live="polite">{filteredSources.length} sur {sources.length} source(s)</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(14rem,1fr)_14rem_13rem]">
          <label className="relative min-w-0">
            <span className="sr-only">Rechercher une source</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} />
            <Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, URL, catégorie, hash…" aria-label="Rechercher une source" />
          </label>
          <Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filtrer les sources par catégorie">
            <option value="all">Toutes les catégories</option>
            {sourceTaxonomy.map((group) => <option key={group.id} value={group.id}>{group.label}</option>)}
          </Select>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as SourceStatusFilter)} aria-label="Filtrer les sources par statut">
            <option value="all">Tous les statuts</option>
            <option value="ok">Opérationnelles</option>
            <option value="warning">À surveiller</option>
            <option value="error">Indisponibles</option>
          </Select>
        </div>
      </section>

      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 type-body-strong text-cyan-950 dark:text-cyan-50">
        La veille croise Game Master, assets dataminés, annonces officielles, Margxt, LeekDuck, PvPoke et les sources d’événements et de combat. Les commits, tags, ETag, Last-Modified et statuts HTTP sont comparés à chaque contrôle.
      </div>

      {attentionSources.length ? <section className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4" aria-labelledby="source-watch-attention-title"><p id="source-watch-attention-title" className="type-overline text-amber-900 dark:text-amber-100">Signaux à examiner</p><ul className="mt-3 grid gap-2 text-sm font-bold text-amber-950 dark:text-amber-50">{attentionSources.map((source) => <li className="rounded-xl border border-amber-300/20 bg-surface-faint p-3" key={source.id || source.name}><span className="block text-domain-foreground">{source.name || source.url}</span><span className="mt-1 block font-medium text-foreground-secondary">{sourceCause(source)}</span></li>)}</ul></section> : null}

      {changedSources.length ? (
        <div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-4">
          <p className="type-overline text-sky-100/75">
            Sources modifiees depuis ton dernier passage
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {changedSources.map((source) => (
              <span
                className="rounded-full border border-sky-200/25 bg-sky-300/15 px-3 py-1.5 type-label text-sky-50"
                key={source.id || source.name || source.url}
              >
                {source.name || source.repo || source.url}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {sources.length ? (
        <div className="space-y-4">
          {groupedSources.map((group) => <section className="min-w-0 overflow-hidden rounded-3xl border border-line bg-surface-inset-subtle" key={group.id} aria-labelledby={`source-group-${group.id}`}>
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-control px-4 py-3"><div><h3 id={`source-group-${group.id}`} className="font-black text-domain-foreground">{group.label}</h3><p className="type-caption-strong text-muted">{group.sources.length} source(s) affichée(s)</p></div><span className="rounded-full border border-line bg-surface-subtle px-3 py-1 font-mono text-sm font-black text-domain-foreground">{group.sources.length}</span></header>
            <div className="hidden border-b border-line bg-surface-faint px-4 py-2 type-overline-compact text-muted lg:grid lg:grid-cols-[minmax(14rem,1.45fr)_9rem_minmax(14rem,1.15fr)_11rem_minmax(10rem,.8fr)_3rem] lg:gap-3"><span>Source</span><span>Catégorie</span><span>État et cause</span><span>Dernière donnée</span><span>Empreinte</span><span className="sr-only">Lien</span></div>
          {group.sources.map((source) => {
            const statusKind = sourceStatusKind(source.status);
            const tone = sourceTone(statusKind);
            const StatusIcon = statusKind === "ok" ? CheckCircle2 : statusKind === "warning" ? AlertTriangle : XCircle;
            const signature = sourceSignature(source);
            const sourceName = source.name || source.repo || source.url || "Source sans nom";

            return (
              <article
                className={`grid min-w-0 gap-3 border-b border-line p-4 transition last:border-b-0 lg:grid-cols-[minmax(14rem,1.45fr)_9rem_minmax(14rem,1.15fr)_11rem_minmax(10rem,.8fr)_3rem] lg:items-center ${tone.card}`}
                key={source.id || source.name}
              >
                <div className="min-w-0">
                  <strong className="block break-words font-black text-domain-foreground">{sourceName}</strong>
                  <small className="mt-1 block break-words type-caption-strong text-muted">{source.description || source.url || "Description indisponible"}</small>
                </div>
                <span className="inline-flex w-fit self-start rounded-full border border-line bg-surface-subtle px-2.5 py-1 type-overline text-foreground-secondary lg:self-auto">
                  {issueLabel(source.category)}
                </span>
                <div className="min-w-0"><span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${tone.badge}`}><StatusIcon aria-hidden="true" size={14} />{sourceStatusLabel(source.status)}</span>{source.changedSinceLastCheck ? <span className="ml-2 inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-2.5 py-1 text-xs font-black text-sky-900 dark:text-sky-100">Modifiée</span> : null}<p className="mt-2 break-words text-sm font-medium text-foreground-secondary">{sourceCause(source)}</p></div>
                <div className="min-w-0 text-sm"><span className="type-overline-compact text-muted lg:hidden">Dernière donnée</span><time className="mt-1 block break-words font-bold text-domain-foreground" dateTime={source.updatedAt || undefined}>{source.updatedAt ? formatSourceDate(source.updatedAt) : "Non communiquée"}</time></div>
                <div className="min-w-0"><span className="type-overline-compact text-muted lg:hidden">Empreinte</span>{signature ? <div className="mt-1 flex min-w-0 items-center gap-2"><code className="min-w-0 flex-1 truncate rounded-lg border border-line bg-surface-inset px-2 py-1.5 text-xs text-domain-foreground" title={signature}>{signature}</code><button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-control text-foreground-secondary transition hover:text-domain-foreground" type="button" onClick={() => void copySourceSignature(source)} aria-label={`Copier l’empreinte de ${sourceName}`} title="Copier l’empreinte"><Copy aria-hidden="true" size={14} /></button></div> : <span className="mt-1 block text-sm font-semibold text-muted">Aucune empreinte</span>}</div>
                <a className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-control text-cyan-800 transition hover:bg-surface-emphasis dark:text-cyan-100 lg:w-11" href={source.remoteUrl || source.url} rel="noreferrer" target="_blank" aria-label={`Ouvrir ${sourceName} dans un nouvel onglet`} title="Ouvrir la source"><span className="font-bold lg:sr-only">Ouvrir la source</span><ExternalLink aria-hidden="true" size={16} /></a>
              </article>
            );
          })}
          </section>)}
        </div>
      ) : <EmptyState title="Aucune source affichée" description={sources.length ? "Aucune source ne correspond aux filtres actifs." : "Lance une vérification pour afficher les sources."} />}
    </div>
  );
}

function sourceTone(status: "ok" | "warning" | "error") {
  if (status === "ok") return { card: "bg-emerald-400/[0.035] hover:bg-emerald-400/[0.07]", badge: "bg-emerald-400/15 text-emerald-900 dark:text-emerald-100" };
  if (status === "warning") return { card: "bg-amber-400/[0.045] hover:bg-amber-400/[0.08]", badge: "bg-amber-400/15 text-amber-950 dark:text-amber-100" };
  return { card: "bg-red-500/[0.045] hover:bg-red-500/[0.08]", badge: "bg-red-500/15 text-red-950 dark:text-red-100" };
}

function SourceStat({ label, value, tone, compact = false, className = "" }: { label: string; value: ReactNode; tone: "cyan" | "emerald" | "amber" | "red" | "sky"; compact?: boolean; className?: string }) {
  const classes = {
    cyan: "border-cyan-300/15 bg-cyan-400/10 text-cyan-100/70",
    emerald: "border-emerald-300/15 bg-emerald-400/10 text-emerald-100/70",
    amber: "border-amber-300/15 bg-amber-400/10 text-amber-100/70",
    red: "border-red-300/15 bg-red-500/10 text-red-100/70",
    sky: "border-sky-300/15 bg-sky-400/10 text-sky-100/70",
  };

  return (
    <article className={`rounded-2xl border p-4 ${classes[tone]} ${className}`}>
      <span className="type-overline">{label}</span>
      <strong className={`mt-2 block text-domain-foreground ${compact ? "text-sm leading-5" : "type-title-section"}`}>{value}</strong>
    </article>
  );
}
