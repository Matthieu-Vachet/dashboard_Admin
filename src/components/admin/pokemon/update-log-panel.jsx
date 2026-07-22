"use client";

import { Cloud, ExternalLink, GitCommitHorizontal, History } from "lucide-react";

function formatDate(value) {
  if (!value) return "date inconnue";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function shortValue(value) {
  const text = String(value || "");
  return text.length > 16 ? text.slice(0, 16) : text || "sans signature";
}

export function UpdateLogPanel({
  gitHistory = [],
  sourceHistory = [],
  deployHistory = [],
  onOpenSourceHistory,
  onOpenDeployHistory,
}) {
  const recentSources = [...sourceHistory].slice(0, 12);
  const recentDeploys = [...deployHistory].slice(0, 6);
  const recentGit = [...gitHistory].slice(0, 10);

  return (
    <section className="grid items-start gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <article className="rounded-2xl border border-line bg-surface-subtle p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Mongo source history</p>
            <h2 className="mt-2 text-2xl font-black text-domain-foreground">Modifications surveillées</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-muted">
              Les changements de commits, tags, ETag, Last-Modified et statuts HTTP remontent ici.
            </p>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.075] px-4 py-2 text-sm font-black text-domain-foreground transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
            type="button"
            onClick={onOpenSourceHistory}
          >
            <History size={17} /> Tout voir
          </button>
        </div>
        {recentSources.length ? (
          <div className="grid gap-3">
            {recentSources.map((item) => (
              <article
                className="rounded-2xl border border-cyan-200/15 bg-cyan-400/[0.07] p-4"
                key={`${item.sourceId || item.id || item.name}-${item.checkedAt}-${item.signature}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <strong className="block break-words font-black text-domain-foreground">{item.name || item.sourceId || "Source"}</strong>
                    <small className="mt-1 block text-xs font-bold text-muted">{formatDate(item.checkedAt)}</small>
                    {item.message ? (
                      <p className="mt-2 text-sm font-bold leading-6 text-foreground-secondary">{item.message}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 rounded-full border border-cyan-200/25 bg-surface-inset px-3 py-1.5 font-mono text-xs font-black text-cyan-100">
                    {shortValue(item.version || item.signature)}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-xs font-bold text-muted sm:grid-cols-2">
                  <span className="truncate rounded-xl border border-line bg-surface-inset px-3 py-2">
                    Avant: {shortValue(item.previousVersion || item.previousSignature)}
                  </span>
                  <span className="truncate rounded-xl border border-cyan-200/15 bg-cyan-400/10 px-3 py-2 text-cyan-100">
                    Après: {shortValue(item.version || item.signature)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-medium p-5 text-sm font-bold text-muted">
            Aucun changement enregistré. Lance une veille pour créer les premiers logs.
          </p>
        )}
      </article>

      <article className="rounded-2xl border border-line bg-surface-subtle p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200/70">PokemonGo-Data</p>
            <h2 className="mt-2 text-2xl font-black text-domain-foreground">Déploiements data</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-muted">
              Redéploiements du Dashboard déclenchés après un push data, avec le diff des JSON suivis.
            </p>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.075] px-4 py-2 text-sm font-black text-domain-foreground transition hover:border-sky-200/50 hover:bg-sky-400/15"
            type="button"
            onClick={onOpenDeployHistory}
          >
            <Cloud size={17} /> Tout voir
          </button>
        </div>
        {recentDeploys.length ? (
          <div className="grid gap-3">
            {recentDeploys.map((item) => {
              const changes = item.dataChanges || {};
              return (
                <article
                  className="rounded-2xl border border-sky-200/15 bg-sky-400/[0.07] p-4"
                  key={item.id || `${item.triggeredAt}-${changes.targetCommit}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <strong className="block break-words font-black text-domain-foreground">
                        {changes.trackedFiles || 0} JSON suivi(s)
                      </strong>
                      <small className="mt-1 block text-xs font-bold text-muted">{formatDate(item.triggeredAt)}</small>
                      <p className="mt-2 text-sm font-bold leading-6 text-foreground-secondary">
                        Fiches {changes.pokemonFiles || 0} · Assets {changes.assetFiles || 0} · Catalogues{" "}
                        {changes.catalogFiles || 0}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-sky-200/25 bg-surface-inset px-3 py-1.5 font-mono text-xs font-black text-sky-100">
                      {changes.targetCommit ? String(changes.targetCommit).slice(0, 12) : item.status || "deploy"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-medium p-5 text-sm font-bold text-muted">
            Aucun redéploiement data enregistré pour le moment.
          </p>
        )}
      </article>

      <article className="rounded-2xl border border-line bg-surface-subtle p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <GitCommitHorizontal className="text-emerald-200" size={22} />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200/70">Git</p>
            <h2 className="text-2xl font-black text-domain-foreground">Derniers commits</h2>
          </div>
        </div>
        {recentGit.length ? (
          <div className="grid gap-3">
            {recentGit.map((item) => (
              <article className="rounded-2xl border border-line bg-surface-inset p-4" key={item.hash || item.message}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-disabled">{item.date || "date inconnue"}</p>
                <strong className="mt-2 block break-words text-sm font-black text-domain-foreground">{item.message || "Commit"}</strong>
                {item.hash ? (
                  <code className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-bold text-cyan-100">
                    {String(item.hash).slice(0, 12)} <ExternalLink size={12} />
                  </code>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-medium p-5 text-sm font-bold text-muted">
            Historique Git indisponible pour le moment.
          </p>
        )}
      </article>
    </section>
  );
}
