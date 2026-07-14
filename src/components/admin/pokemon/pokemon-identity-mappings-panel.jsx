"use client";

import { AlertTriangle, CheckCircle2, Download, RefreshCcw, RotateCcw } from "lucide-react";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { DatasetSourceHeader } from "./dataset-source-header";

const statusLabels = {
  matched: "Résolu",
  "missing-local-form": "Forme locale absente",
  "missing-local-pokemon": "Pokémon local absent",
};

export function PokemonIdentityMappingsPanel({ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate }) {
  const mappings = dataset?.data?.mappings || [];
  const metadata = dataset?.data?.metadata || {};
  const meta = dataset?.meta || {};
  const counts = metadata.statusCounts || meta.summary?.statusCounts || {};
  const setOption = (key, value) => onOptionsChange({ ...options, [key]: value, page: 1 });
  return (
    <div className="space-y-5">
      <Panel eyebrow="Référentiel officiel PokeMiners · Game Master" title="Résolution des variantes Pokémon" action={<div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}><Download size={16} /> JSON</button><button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button><button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}><RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Régénérer les mappings</button></div>}>
        <DatasetSourceHeader dataset={dataset} total={meta.total || metadata.total || mappings.length} />
      </Panel>
      <section className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-emerald-200/16 bg-emerald-300/[.08] p-4"><CheckCircle2 className="text-emerald-200" size={18} /><span className="mt-3 block text-xs font-black uppercase tracking-[.15em] text-slate-500">Résolus</span><strong className="font-mono text-3xl text-emerald-100">{Number(counts.matched || 0).toLocaleString("fr-FR")}</strong></div><div className="rounded-2xl border border-amber-200/16 bg-amber-300/[.08] p-4"><AlertTriangle className="text-amber-200" size={18} /><span className="mt-3 block text-xs font-black uppercase tracking-[.15em] text-slate-500">Formes à mapper</span><strong className="font-mono text-3xl text-amber-100">{Number(counts["missing-local-form"] || 0).toLocaleString("fr-FR")}</strong></div><div className="rounded-2xl border border-rose-200/16 bg-rose-300/[.08] p-4"><AlertTriangle className="text-rose-200" size={18} /><span className="mt-3 block text-xs font-black uppercase tracking-[.15em] text-slate-500">Pokémon absents</span><strong className="font-mono text-3xl text-rose-100">{Number(counts["missing-local-pokemon"] || 0).toLocaleString("fr-FR")}</strong></div></section>
      <DatasetFilterBar query={options.search} onQueryChange={(search) => setOption("search", search)} placeholder="Template, forme, asset bundle…" resultCount={mappings.length} totalCount={meta.total || mappings.length} />
      <select className={fieldClass} value={options.status} onChange={(event) => setOption("status", event.target.value)} aria-label="Statut de résolution"><option value="">Tous les statuts</option>{Object.entries(statusLabels).map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select>
      <div className="overflow-x-auto rounded-2xl border border-white/10"><table className="min-w-full text-left text-sm"><thead className="bg-white/[.05] text-[10px] uppercase tracking-[.14em] text-slate-500"><tr><th className="p-3">Pokémon</th><th className="p-3">Forme Game Master</th><th className="p-3">Forme locale</th><th className="p-3">Asset bundle</th><th className="p-3">Statut</th></tr></thead><tbody>{mappings.map((mapping) => <tr className="border-t border-white/8" key={`${mapping.templateId}-${mapping.form}-${mapping.assetBundleValue || ""}`}><td className="p-3 font-mono font-black text-white">#{mapping.pokemonId} {mapping.pokemon}</td><td className="p-3 font-mono text-slate-300">{mapping.form || "—"}</td><td className="p-3 font-mono text-slate-300">{mapping.localForm || "—"}</td><td className="p-3 text-xs text-slate-400"><span className="block">{mapping.assetBundleValue || "—"}</span><span>{mapping.assetBundleSuffix || ""}</span></td><td className="p-3"><span className={`rounded-full border px-2 py-1 text-[9px] font-black uppercase ${mapping.mappingStatus === "matched" ? "border-emerald-200/20 bg-emerald-300/10 text-emerald-100" : "border-amber-200/20 bg-amber-300/10 text-amber-100"}`}>{statusLabels[mapping.mappingStatus] || mapping.mappingStatus}</span></td></tr>)}</tbody></table>{!mappings.length ? <p className="p-8 text-center font-bold text-slate-400">Aucun mapping pour ces filtres.</p> : null}</div>
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-black text-slate-400">Affichés {mappings.length} sur {meta.total || mappings.length}</span><div className="flex items-center gap-3"><button className={buttonClass} type="button" disabled={options.page <= 1} onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}>Précédent</button><span className="font-mono text-sm font-black text-slate-300">Page {meta.page || options.page} / {meta.pages || 1}</span><button className={buttonClass} type="button" disabled={(meta.page || options.page) >= (meta.pages || 1)} onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}>Suivant</button></div></div>
    </div>
  );
}
