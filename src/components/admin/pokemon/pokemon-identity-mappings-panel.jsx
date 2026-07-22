"use client";

import { AlertTriangle, CheckCircle2, Download, ImageOff, RefreshCcw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { buttonClass, fieldClass, Panel } from "./admin-ui";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { DatasetSourceHeader } from "./dataset-source-header";
import { EmptyState } from "@/components/admin/shared/state-system";

const statusLabels = {
  matched: "Résolu",
  ambiguous: "Résolution ambiguë",
  "missing-local-form": "Forme locale absente",
  "missing-local-costume": "Costume local absent",
  "missing-local-pokemon": "Pokémon local absent",
  "missing-local-asset": "Asset local absent",
  "missing-shiny-asset": "Asset shiny absent",
  "value-mismatch": "Valeur différente",
  "local-only": "Local uniquement",
  "game-master-only": "Game Master uniquement",
  unresolved: "Non résolu",
};

function statusTone(status) {
  if (status === "matched") return "border-emerald-200/25 bg-emerald-300/10 text-emerald-100";
  if (["missing-local-pokemon", "unresolved"].includes(status)) return "border-rose-200/25 bg-rose-300/10 text-rose-100";
  if (status === "ambiguous") return "border-violet-200/25 bg-violet-300/10 text-violet-100";
  return "border-amber-200/25 bg-amber-300/10 text-amber-100";
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex max-w-full rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[.05em] ${statusTone(status)}`}>
      <span className="truncate">{statusLabels[status] || status || "Non résolu"}</span>
    </span>
  );
}

function MappingArtwork({ mapping, className = "h-14 w-14" }) {
  const image = mapping.localAsset?.image || null;
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-slate-950/55 ${className}`} title={image ? `Asset exact · ${mapping.localAsset.source || "source locale"}` : "Aucun asset exact disponible"}>
      {image ? (
        <img className="h-full w-full object-contain p-1" src={image} alt={`Asset exact de ${mapping.pokemon || "Pokémon"}`} loading="lazy" />
      ) : (
        <ImageOff className="text-slate-600" size={20} aria-label="Asset exact absent" />
      )}
    </span>
  );
}

function AssetBundleValue({ mapping }) {
  const value = [mapping.assetBundleValue, mapping.assetBundleSuffix].filter(Boolean).join(" · ");
  return <><span className="block break-all">{value || "Non fourni par le Game Master"}</span><span className="mt-1 block text-[9px] text-disabled">{mapping.assetBundleSource || "Aucune source bundle"}</span></>;
}

function MappingIdentity({ mapping, compact = false }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <MappingArtwork mapping={mapping} className={compact ? "h-12 w-12" : "h-14 w-14"} />
      <div className="min-w-0">
        <strong className="block truncate font-black text-domain-foreground">#{mapping.pokemonId} {mapping.pokemon || "Pokémon inconnu"}</strong>
        <span className="block truncate font-mono text-[10px] text-disabled">{mapping.templateId || "template inconnu"}</span>
      </div>
    </div>
  );
}

function SummaryCard({ tone, icon: Icon, label, value }) {
  const styles = {
    emerald: "border-emerald-200/16 bg-emerald-300/[.08] text-emerald-100",
    amber: "border-amber-200/16 bg-amber-300/[.08] text-amber-100",
    rose: "border-rose-200/16 bg-rose-300/[.08] text-rose-100",
  };
  return (
    <div className={`rounded-2xl border p-4 ${styles[tone]}`}>
      <Icon size={18} />
      <span className="mt-3 block text-[10px] font-black uppercase tracking-[.15em] text-disabled">{label}</span>
      <strong className="font-mono text-3xl">{Number(value || 0).toLocaleString("fr-FR")}</strong>
    </div>
  );
}

export function PokemonIdentityMappingsPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate }) {
  const mappings = dataset?.data?.mappings || [];
  const metadata = dataset?.data?.metadata || {};
  const meta = dataset?.meta || {};
  const counts = metadata.statusCounts || meta.summary?.statusCounts || {};
  const setOption = (key, value) => onOptionsChange({ ...options, [key]: value, page: 1 });
  const formIssues = Number(counts["missing-local-form"] || 0) + Number(counts["missing-local-costume"] || 0) + Number(counts.ambiguous || 0);

  return (
    <div className="space-y-5">
      <Panel
        eyebrow="Référentiel officiel PokeMiners · Game Master"
        title="Résolution des variantes Pokémon"
        action={(
          <div className="flex flex-wrap gap-2">
            <Button icon={<Download size={16} />} onClick={onDownload} disabled={!dataset}>JSON</Button>
            <Button icon={<RefreshCcw size={16} />} loading={loading} loadingText="Actualisation…" onClick={onRefresh}>Actualiser</Button>
            <Button variant="primary" icon={<RotateCcw size={16} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate}>Régénérer les mappings</Button>
          </div>
        )}
      >
        <DatasetSourceHeader dataset={dataset} total={meta.total || metadata.total || mappings.length} />
      </Panel>

      <section className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Synthèse des mappings">
        <SummaryCard tone="emerald" icon={CheckCircle2} label="Résolus" value={counts.matched} />
        <SummaryCard tone="amber" icon={AlertTriangle} label="À mapper" value={formIssues} />
        <SummaryCard tone="rose" icon={AlertTriangle} label="Absents" value={counts["missing-local-pokemon"]} />
      </section>

      <DatasetFilterBar query={options.search} onQueryChange={(search) => setOption("search", search)} placeholder="Template, forme, asset bundle…" resultCount={mappings.length} totalCount={meta.total || mappings.length} />
      <Select className={fieldClass} value={options.status} onChange={(event) => setOption("status", event.target.value)} aria-label="Statut de résolution">
        <option value="">Tous les statuts</option>
        {Object.entries(statusLabels).map(([id, label]) => <option value={id} key={id}>{label}</option>)}
      </Select>

      <div className="space-y-2 md:hidden" aria-label="Mappings de variantes en cartes">
        {mappings.map((mapping) => (
          <article className="rounded-2xl border border-line bg-surface-inset-strong p-3" key={`${mapping.templateId}-${mapping.form}-${mapping.assetBundleValue || ""}`}>
            <div className="flex items-start justify-between gap-2">
              <MappingIdentity mapping={mapping} compact />
              <StatusBadge status={mapping.mappingStatus} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="min-w-0 rounded-xl border border-line-subtle bg-surface-faint p-2">
                <dt className="text-[9px] font-black uppercase tracking-[.1em] text-disabled">Game Master</dt>
                <dd className="mt-1 truncate font-mono font-bold text-foreground">{mapping.form || "—"}</dd>
              </div>
              <div className="min-w-0 rounded-xl border border-line-subtle bg-surface-faint p-2">
                <dt className="text-[9px] font-black uppercase tracking-[.1em] text-disabled">Forme locale</dt>
                <dd className="mt-1 truncate font-mono font-bold text-foreground">{mapping.localForm || "—"}</dd>
              </div>
              <div className="col-span-2 min-w-0 rounded-xl border border-line-subtle bg-surface-faint p-2">
                <dt className="text-[9px] font-black uppercase tracking-[.1em] text-disabled">Asset bundle</dt>
                <dd className="mt-1 font-mono text-[10px] font-bold text-foreground-secondary"><AssetBundleValue mapping={mapping} /></dd>
              </div>
            </dl>
            {mapping.ambiguityReason ? <p className="mt-2 rounded-xl border border-violet-200/20 bg-violet-300/[.08] p-2 text-[10px] font-bold leading-5 text-violet-100">{mapping.ambiguityReason} — {mapping.ambiguityExplanation}</p> : null}
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[.05] text-[10px] uppercase tracking-[.14em] text-disabled"><tr><th className="p-3">Pokémon</th><th className="p-3">Forme Game Master</th><th className="p-3">Forme locale</th><th className="p-3">Asset bundle</th><th className="p-3">Statut</th></tr></thead>
          <tbody>
            {mappings.map((mapping) => (
              <tr className="border-t border-line-subtle" key={`${mapping.templateId}-${mapping.form}-${mapping.assetBundleValue || ""}`}>
                <td className="p-3"><MappingIdentity mapping={mapping} /></td>
                <td className="p-3 font-mono text-foreground-secondary">{mapping.form || "—"}</td>
                <td className="p-3 font-mono text-foreground-secondary">{mapping.localForm || "—"}</td>
                <td className="p-3 text-xs text-muted"><AssetBundleValue mapping={mapping} /></td>
                <td className="p-3"><StatusBadge status={mapping.mappingStatus} />{mapping.ambiguityReason ? <span className="mt-1 block max-w-64 text-[10px] leading-4 text-violet-200">{mapping.ambiguityReason} · {mapping.candidateCount || mapping.ambiguityCount || 0} candidat(s)</span> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!mappings.length ? <EmptyState size="section" title="Aucun mapping pour ces filtres" /> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs font-black text-muted">Affichés {mappings.length} sur {meta.total || mappings.length}</span>
        <div className="flex items-center gap-3">
          <button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button>
          <span className="font-mono text-sm font-black text-foreground-secondary">Page {meta.page || options.page} / {meta.pages || 1}</span>
          <button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button>
        </div>
      </div>
    </div>
  );
}
