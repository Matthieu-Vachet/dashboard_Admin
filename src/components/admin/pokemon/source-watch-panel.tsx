"use client";

import { ExternalLink } from "lucide-react";
import { createPortal } from "react-dom";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";

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
} | null;

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
  if (sourceWatch?.loading) {
    return <FetchLoadingState layout="inline" title="Vérification des sources en cours…" />;
  }

  if (sourceWatch?.error) {
    return <ErrorState title="Sources indisponibles" message={sourceWatch.error} />;
  }

  const sources = sourceWatch?.sources || [];
  const okCount = sources.filter((source) => source.status === "ok").length;
  const warningCount = sources.filter((source) => source.status === "warning").length;
  const errorCount = sources.filter((source) => source.status && !["ok", "warning"].includes(source.status)).length;
  const changedSources = sources.filter((source) => source.changedSinceLastCheck);
  const errorSources = sources.filter((source) => source.status && !["ok", "warning"].includes(source.status));
  const groupedSources = sourceTaxonomy.map((group) => ({ ...group, sources: sources.filter((source) => sourceTaxonomyGroup(source).id === group.id) })).filter((group) => group.sources.length);
  const lastCheck = sources.map((source) => source.updatedAt).filter(Boolean).sort().at(-1);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <SourceStat label="Sources suivies" value={sources.length} tone="sky" />
        <SourceStat label="Sources OK" value={okCount} tone="emerald" />
        <SourceStat label="À surveiller" value={warningCount} tone="amber" />
        <SourceStat label="Indisponibles" value={errorCount} tone="red" />
      </div>
      <p className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 type-body-strong text-cyan-100">
        La veille croise maintenant Game Master, assets datamines, annonces officielles, sites communautaires et donnees PvP.
        Un nouveau commit, tag, ETag, Last-Modified ou statut HTTP different remontera au prochain controle.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {groupedSources.map((group) => <article className="rounded-2xl border border-line bg-surface-faint p-3" key={group.id}><small className="type-overline text-muted">{group.label}</small><strong className="mt-1 block font-mono text-xl text-domain-foreground">{group.sources.length}</strong></article>)}
      </div>
      <div className="rounded-2xl border border-violet-300/15 bg-violet-400/[0.07] p-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><p className="type-overline text-violet-700 dark:text-violet-100">Supervision des sources</p><span className="type-caption-strong text-muted">Dernier signal source : {formatSourceDate(lastCheck)}</span></div>
      </div>
      {errorSources.length ? <div className="rounded-2xl border border-red-300/25 bg-red-500/10 p-4"><p className="type-overline text-red-100">Erreurs actives</p><ul className="mt-2 space-y-1 text-sm font-bold text-red-50">{errorSources.map((source) => <li key={source.id || source.name}>• {source.name || source.url} — {source.message || source.status}</li>)}</ul></div> : null}
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
          {groupedSources.map((group) => <section className="overflow-hidden rounded-3xl border border-line bg-surface-inset-subtle" key={group.id}>
            <header className="border-b border-line bg-surface-control px-4 py-3"><h3 className="font-black text-domain-foreground">{group.label}</h3><p className="type-caption-strong text-muted">{group.sources.length} source(s) enregistrée(s)</p></header>
          {group.sources.map((source) => {
            const tone =
              source.changedSinceLastCheck
                ? {
                    card: "border-red-300/40 bg-red-500/16 hover:bg-red-500/22",
                    badge: "bg-red-500/20 text-red-50",
                  }
                : source.status === "ok"
                ? {
                    card: "border-emerald-300/14 bg-emerald-400/[0.045] hover:bg-emerald-400/9",
                    badge: "bg-emerald-400/15 text-emerald-100",
                  }
                : source.status === "warning"
                  ? {
                      card: "border-amber-300/18 bg-amber-400/[0.05] hover:bg-amber-400/10",
                      badge: "bg-amber-400/15 text-amber-100",
                    }
                  : {
                      card: "border-red-300/18 bg-red-500/[0.055] hover:bg-red-500/10",
                      badge: "bg-red-500/15 text-red-100",
                    };

            return (
              <a
                className={`grid min-w-0 gap-3 border-b border-line p-3 transition last:border-b-0 md:grid-cols-[minmax(0,1fr)_11rem_10rem_auto] md:items-center ${tone.card}`}
                href={source.remoteUrl || source.url}
                key={source.id || source.name}
                rel="noreferrer"
                target="_blank"
              >
                <span className="min-w-0">
                  <strong className="block truncate font-black text-domain-foreground">{source.name || source.repo || source.url}</strong>
                  <small className="mt-1 block truncate type-caption-strong text-muted">{source.message || source.description || source.status}</small>
                </span>
                <span className="inline-flex w-fit rounded-full border border-line bg-surface-subtle px-2.5 py-1 type-overline text-foreground-secondary">
                  {issueLabel(source.category)}
                </span>
                <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-black ${tone.badge}`}>
                  {source.changedSinceLastCheck ? "modifiée" : source.status || "statut"}
                </span>
                <span className="inline-flex items-center justify-end gap-2 type-label text-cyan-100">
                  <span className="max-w-32 truncate">{source.version || "ouvrir"}</span>
                  <ExternalLink size={14} />
                </span>
              </a>
            );
          })}
          </section>)}
        </div>
      ) : (
        <EmptyState title="Aucune source affichée" description="Lance une vérification pour afficher les sources." />
      )}
    </div>
  );
}

function SourceStat({ label, value, tone }: { label: string; value: number; tone: "cyan" | "emerald" | "amber" | "red" | "sky" }) {
  const classes = {
    cyan: "border-cyan-300/15 bg-cyan-400/10 text-cyan-100/70",
    emerald: "border-emerald-300/15 bg-emerald-400/10 text-emerald-100/70",
    amber: "border-amber-300/15 bg-amber-400/10 text-amber-100/70",
    red: "border-red-300/15 bg-red-500/10 text-red-100/70",
    sky: "border-sky-300/15 bg-sky-400/10 text-sky-100/70",
  };

  return (
    <article className={`rounded-2xl border p-4 ${classes[tone]}`}>
      <span className="type-overline">{label}</span>
      <strong className="mt-2 block type-title-section text-domain-foreground">{value}</strong>
    </article>
  );
}
