"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  AlertTriangle,
  ArrowDownUp,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  Download,
  FileDiff,
  FileJson2,
  History,
  ImageOff,
  Layers3,
  RefreshCcw,
  RotateCcw,
  Search,
  ServerCog,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { GameMasterJsonViewer } from "./game-master-json-viewer";

const modes = [
  ["explorer", "Explorer", Layers3],
  ["search", "Recherche", Search],
  ["comparison", "Comparaison locale", ArrowDownUp],
  ["history", "Historique & diff", History],
];

const comparisonStatuses = {
  "": "Tous les statuts",
  matched: "Résolu",
  ambiguous: "Ambigu",
  "missing-local-form": "Forme absente",
  "missing-local-costume": "Costume absent",
  "missing-local-pokemon": "Pokémon absent",
  "missing-local-asset": "Asset absent",
  "missing-shiny-asset": "Asset shiny absent",
  "value-mismatch": "Valeur différente",
  "local-only": "Local uniquement",
  "game-master-only": "Game Master uniquement",
  unresolved: "Non résolu",
};

const detailTabs = [
  ["summary", "Résumé"],
  ["json", "JSON"],
  ["properties", "Propriétés"],
  ["local", "Comparaison locale"],
  ["assets", "Assets"],
  ["history", "Historique"],
  ["diff", "Diff"],
];

function apiError(payload, fallback) {
  if (typeof payload?.error === "string") return payload.error;
  if (typeof payload?.error?.message === "string") return payload.error.message;
  return fallback;
}

async function gameMasterRequest(action, params = {}, init = {}) {
  const url = new URL("/api/pokemon-admin", window.location.origin);
  url.searchParams.set("action", action);
  for (const [key, value] of Object.entries(params)) if (value !== "" && value !== null && value !== undefined) url.searchParams.set(key, String(value));
  const response = await fetch(url, { cache: "no-store", ...init });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(apiError(payload, `Requête Game Master impossible (HTTP ${response.status}).`));
  return payload?.data || {};
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

function formatBytes(value) {
  const size = Number(value || 0);
  if (size < 1024) return `${size} o`;
  if (size < 1024 * 1024) return `${(size / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Ko`;
  return `${(size / 1024 / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}

function statusTone(status) {
  if (status === "matched") return "border-emerald-200/25 bg-emerald-300/10 text-emerald-100";
  if (status === "ambiguous") return "border-violet-200/25 bg-violet-300/10 text-violet-100";
  if (String(status).includes("pokemon")) return "border-rose-200/25 bg-rose-300/10 text-rose-100";
  return "border-amber-200/25 bg-amber-300/10 text-amber-100";
}

function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[.06em] ${statusTone(status)}`}>{comparisonStatuses[status] || status || "Non résolu"}</span>;
}

async function copyText(value, label = "Copié") {
  try {
    await navigator.clipboard.writeText(String(value ?? ""));
    toast.success(label);
  } catch {
    toast.error("Copie impossible.");
  }
}

function SummaryMetric({ icon: Icon, label, value, tone = "cyan" }) {
  const colors = {
    cyan: "border-cyan-200/16 bg-cyan-300/[.07] text-cyan-100",
    emerald: "border-emerald-200/16 bg-emerald-300/[.07] text-emerald-100",
    amber: "border-amber-200/16 bg-amber-300/[.07] text-amber-100",
    violet: "border-violet-200/16 bg-violet-300/[.07] text-violet-100",
  };
  return (
    <div className={`min-w-0 rounded-2xl border p-3 sm:p-4 ${colors[tone]}`}>
      <Icon size={17} />
      <span className="mt-2 block truncate text-[9px] font-black uppercase tracking-[.13em] text-slate-500">{label}</span>
      <strong className="mt-0.5 block truncate font-mono text-xl sm:text-2xl">{value}</strong>
    </div>
  );
}

function Pagination({ meta, onPage }) {
  const page = Number(meta?.page || 1);
  const pages = Math.max(1, Number(meta?.pages || 1));
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="font-mono text-xs font-black text-slate-500">{Number(meta?.total || 0).toLocaleString("fr-FR")} résultat(s)</span>
      <div className="flex items-center gap-2">
        <button className={`${buttonClass} min-h-10 px-3`} type="button" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Page précédente"><ChevronLeft size={16} /></button>
        <span className="font-mono text-xs font-black text-slate-300">{page} / {pages}</span>
        <button className={`${buttonClass} min-h-10 px-3`} type="button" disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Page suivante"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function TemplateCard({ template, onOpen }) {
  return (
    <button className="group min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/35 hover:bg-cyan-300/[.07]" type="button" onClick={() => onOpen(template.templateId)}>
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-300/[.08] text-cyan-100"><FileJson2 size={18} /></span>
        <span className="rounded-full border border-white/10 bg-white/[.05] px-2 py-1 font-mono text-[9px] font-black text-slate-400">{formatBytes(template.sizeBytes)}</span>
      </div>
      <strong className="mt-3 block break-all font-mono text-xs font-black leading-5 text-white group-hover:text-cyan-100">{template.templateId}</strong>
      <span className="mt-1 block truncate text-xs font-bold text-slate-400">{template.categoryLabel || template.category}</span>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-[9px] font-black text-slate-300">{template.settingType}</span>
        {template.pokemonId ? <span className="rounded-full border border-emerald-200/15 bg-emerald-300/[.07] px-2 py-1 text-[9px] font-black text-emerald-100">{template.pokemonId}</span> : null}
        <span className="rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-[9px] font-black text-slate-400">{Number(template.propertyCount || 0)} propriétés</span>
      </div>
    </button>
  );
}

function TemplatesView({ resource, loading, onOpen, onPage }) {
  const templates = resource?.data || [];
  if (loading) return <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div className="h-40 animate-pulse rounded-2xl border border-white/8 bg-white/[.035]" key={index} />)}</div>;
  if (!templates.length) return <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm font-bold text-slate-400">Aucun template ne correspond à ces filtres.</p>;
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{templates.map((template) => <TemplateCard template={template} onOpen={onOpen} key={template.templateId} />)}</div>
      <Pagination meta={resource.meta} onPage={onPage} />
    </div>
  );
}

function DetailDefinition({ label, value }) {
  return <div className="min-w-0 rounded-xl border border-white/8 bg-white/[.035] p-3"><dt className="text-[9px] font-black uppercase tracking-[.12em] text-slate-500">{label}</dt><dd className="mt-1 break-words font-mono text-xs font-bold text-slate-200">{value ?? "—"}</dd></div>;
}

const businessFields = [
  ["pokemonId", "Espèce"], ["pokemon", "Pokémon"], ["form", "Forme"], ["costume", "Costume"],
  ["type", "Type principal"], ["type2", "Type secondaire"], ["stats", "Statistiques"],
  ["quickMoves", "Attaques rapides"], ["cinematicMoves", "Attaques chargées"], ["evolutionBranch", "Évolutions"],
  ["buddyDistanceKm", "Distance buddy"], ["itemId", "Objet"], ["moveId", "Attaque"],
];

function findFirstValue(value, key, depth = 0) {
  if (!value || typeof value !== "object" || depth > 8) return undefined;
  if (Object.hasOwn(value, key)) return value[key];
  for (const child of Object.values(value)) {
    const found = findFirstValue(child, key, depth + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}

function businessSummary(raw) {
  return businessFields.flatMap(([key, label]) => {
    const value = findFirstValue(raw, key);
    if (value === undefined || value === null || value === "") return [];
    const formatted = typeof value === "object" ? JSON.stringify(value) : String(value);
    return [[label, formatted.length > 800 ? `${formatted.slice(0, 800)}…` : formatted]];
  });
}

function LocalComparisonDetail({ item }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[.03] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2"><strong className="font-mono text-xs text-white">#{item.pokemonId} {item.pokemon} · {item.form || "normal"}</strong><StatusBadge status={item.mappingStatus} /></div>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <DetailDefinition label="Identité canonique" value={item.localIdentity || item.localPokemonFormId} />
        <DetailDefinition label="Fichier Pokémon" value={item.localFile} />
        <DetailDefinition label="assetsRef" value={item.localAssetsRef} />
        <DetailDefinition label="Forme locale" value={item.localForm} />
        <DetailDefinition label="Costume local" value={item.localCostume} />
        <DetailDefinition label="Source de résolution" value={item.resolutionSource} />
        <DetailDefinition label="Sexe" value={item.localAsset?.isFemale ? "female" : "neutral"} />
        <DetailDefinition label="assetForms" value={item.localAssetFormCount ?? 0} />
        <DetailDefinition label="Disponibilité jeu" value={item.gameAvailability?.released === false ? "Non sorti (sans effet sur l’asset)" : item.gameAvailability?.released === true ? "Sorti" : "Non renseignée"} />
      </dl>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {[['Normal', item.localAsset?.image, item.localAsset?.source], ['Shiny', item.localAsset?.shinyImage, item.localAsset?.shinySource]].map(([label, image, source]) => <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-slate-950/30 p-2" key={label}>{image ? <img className="h-14 w-14 shrink-0 object-contain" src={image} alt={`Asset local ${label.toLowerCase()}`} /> : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-white/10"><ImageOff className="text-slate-600" size={18} /></span>}<div className="min-w-0"><strong className="text-xs text-white">{label}</strong><span className="block break-all font-mono text-[9px] text-slate-500">{source || "Asset absent"}</span></div></div>)}
      </div>
    </article>
  );
}

function PropertiesView({ rows = [] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const types = useMemo(() => [...new Set(rows.map((row) => row.type).filter(Boolean))].sort(), [rows]);
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return rows.filter((row) => (!type || row.type === type) && (!needle || `${row.path} ${row.value}`.toLocaleLowerCase("fr").includes(needle)));
  }, [query, rows, type]);
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_12rem]"><input className={fieldClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Chemin ou valeur…" aria-label="Rechercher une propriété" /><select className={fieldClass} value={type} onChange={(event) => setType(event.target.value)} aria-label="Filtrer le type de propriété"><option value="">Tous les types</option>{types.map((entryType) => <option value={entryType} key={entryType}>{entryType}</option>)}</select></div>
      <p className="font-mono text-[10px] font-black text-slate-500">{visible.length.toLocaleString("fr-FR")} / {rows.length.toLocaleString("fr-FR")} propriété(s)</p>
      <div className="space-y-1">{visible.map((row, index) => <div className="group grid gap-1 rounded-xl border border-white/8 bg-white/[.025] p-2 font-mono text-xs sm:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)_2rem]" key={`${row.path}-${index}`}><button className="break-all text-left text-sky-200" type="button" onClick={() => copyText(row.path, "Chemin copié")}>{row.path}</button><span className="text-violet-200">{row.type}</span><span className="break-all text-slate-300">{row.value}</span><button className="grid h-7 w-7 place-items-center rounded text-slate-500 hover:bg-white/10 hover:text-white" type="button" onClick={() => copyText(row.value, "Valeur copiée")} aria-label={`Copier ${row.path}`}><Copy size={13} /></button></div>)}</div>
    </div>
  );
}

function DetailModal({ resource, loading, tab, onTab, onClose }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [onClose]);
  if (typeof document === "undefined") return null;
  const detail = resource?.data || {};
  const template = detail.template || {};
  const local = detail.localComparison || [];
  const history = detail.history || [];
  const diffs = detail.diffs || [];
  const assetRows = [["Asset bundle", template.assetBundleValue], ["Suffix", template.assetBundleSuffix], ["Forme", template.form], ["Costume", template.costume]].filter(([, value]) => value);
  const interpretedRows = businessSummary(template.raw || {});

  return createPortal(
    <div className="fixed inset-0 z-[95] bg-slate-950/88 p-0 backdrop-blur-lg sm:p-4" role="dialog" aria-modal="true" aria-label="Détail du template Game Master">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden border-white/10 bg-[#07101f] shadow-2xl sm:rounded-3xl sm:border">
        <header className="flex items-start gap-3 border-b border-white/10 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100"><FileJson2 size={20} /></span>
          <div className="min-w-0 flex-1"><small className="text-[9px] font-black uppercase tracking-[.15em] text-cyan-200/70">Template Game Master privé</small><h2 className="break-all font-mono text-sm font-black text-white sm:text-lg">{template.templateId || "Chargement…"}</h2></div>
          {template.templateId ? <a className="hidden min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/[.05] px-3 text-xs font-black text-slate-200 sm:inline-flex" href={`/api/pokemon-admin?action=game-master-export&scope=templates&format=json&includeRaw=true&match=exact&q=${encodeURIComponent(template.templateId)}`}><Download size={14} /> Télécharger</a> : null}
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[.05] text-white" type="button" onClick={onClose} aria-label="Fermer"><X size={20} /></button>
        </header>
        <div className="flex gap-1.5 overflow-x-auto border-b border-white/8 p-2" role="tablist">
          {detailTabs.map(([id, label]) => <button className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-black ${tab === id ? "border-cyan-200/35 bg-cyan-300/14 text-white" : "border-transparent text-slate-400 hover:bg-white/[.05] hover:text-white"}`} type="button" role="tab" aria-selected={tab === id} onClick={() => onTab(id)} key={id}>{label}</button>)}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {loading ? <div className="h-64 animate-pulse rounded-2xl bg-white/[.04]" /> : null}
          {!loading && tab === "summary" ? <div className="space-y-4"><dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"><DetailDefinition label="Catégorie" value={template.categoryLabel || template.category} /><DetailDefinition label="Groupe" value={template.categoryGroupLabel || template.categoryGroup} /><DetailDefinition label="Setting type" value={template.settingType} /><DetailDefinition label="Chemin principal" value={`data.${template.settingType || "unknown"}`} /><DetailDefinition label="Snapshot" value={template.snapshotId} /><DetailDefinition label="Pokémon" value={template.pokemonId} /><DetailDefinition label="Forme" value={template.form} /><DetailDefinition label="Costume" value={template.costume} /><DetailDefinition label="Taille" value={formatBytes(template.sizeBytes)} /><DetailDefinition label="Propriétés indexées" value={template.propertyCount} /><DetailDefinition label="Hash" value={template.sourceHash} /><DetailDefinition label="Source mise à jour" value={formatDate(template.sourceUpdatedAt)} /><DetailDefinition label="Schéma index" value={template.indexSchemaVersion} /></dl>{interpretedRows.length ? <section><h3 className="mb-2 text-xs font-black uppercase tracking-[.14em] text-slate-500">Lecture métier</h3><dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{interpretedRows.map(([label, value]) => <DetailDefinition label={label} value={value} key={label} />)}</dl></section> : null}</div> : null}
          {!loading && tab === "json" ? <GameMasterJsonViewer value={template.raw || {}} /> : null}
          {!loading && tab === "properties" ? <PropertiesView rows={template.flattenedPaths || []} /> : null}
          {!loading && tab === "local" ? <div className="space-y-2">{local.map((item) => <LocalComparisonDetail item={item} key={item.comparisonKey} />)}{!local.length ? <p className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm font-bold text-slate-400">Aucune correspondance Pokémon locale pour ce template.</p> : null}</div> : null}
          {!loading && tab === "assets" ? <div className="grid gap-2 sm:grid-cols-2">{assetRows.map(([label, value]) => <DetailDefinition label={label} value={value} key={label} />)}{local.map((item) => <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-3" key={item.comparisonKey}>{item.localAsset?.image ? <img className="h-16 w-16 object-contain" src={item.localAsset.image} alt="Asset local exact" /> : <span className="grid h-16 w-16 place-items-center rounded-xl border border-white/10"><ImageOff className="text-slate-600" /></span>}<div className="min-w-0"><strong className="block truncate text-sm text-white">Asset local exact</strong><span className="block break-all font-mono text-[10px] text-slate-400">{item.localAsset?.source || "Absent — aucun fallback normal silencieux"}</span></div></div>)}</div> : null}
          {!loading && tab === "history" ? <div className="space-y-2">{history.map((item) => <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3" key={item.snapshotId}><strong className="font-mono text-xs text-white">{item.snapshotId}</strong><p className="mt-1 text-xs font-bold text-slate-400">{formatDate(item.createdAt)} · {formatBytes(item.sizeBytes)} · {item.propertyCount} propriétés</p></div>)}{!history.length ? <p className="text-sm text-slate-400">Aucun historique.</p> : null}</div> : null}
          {!loading && tab === "diff" ? <div className="space-y-2">{diffs.map((diff) => <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3" key={diff._id || `${diff.snapshotId}-${diff.templateId}`}><div className="flex items-center justify-between gap-2"><strong className="text-sm text-white">{diff.changeType}</strong><span className="font-mono text-[10px] text-slate-500">{diff.snapshotId}</span></div>{(diff.changes || []).slice(0, 20).map((change, index) => <div className="mt-2 rounded-xl border border-white/8 bg-slate-950/35 p-2" key={`${change.path}-${index}`}><p className="break-all font-mono text-[10px] font-black text-cyan-100">{change.type} · {change.path}</p><div className="mt-2 grid gap-2 sm:grid-cols-2"><pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-rose-300/[.05] p-2 font-mono text-[9px] text-rose-100">Avant : {JSON.stringify(change.before, null, 2)}</pre><pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-emerald-300/[.05] p-2 font-mono text-[9px] text-emerald-100">Après : {JSON.stringify(change.after, null, 2)}</pre></div></div>)}</div>)}{!diffs.length ? <p className="text-sm text-slate-400">Aucune modification historique pour ce template.</p> : null}</div> : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function GameMasterExplorerPanel() {
  const [mode, setMode] = useState("explorer");
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [snapshots, setSnapshots] = useState(null);
  const [diffs, setDiffs] = useState(null);
  const [filters, setFilters] = useState({ q: "", match: "partial", category: "", group: "", settingType: "", localStatus: "", sort: "templateId", order: "asc", page: 1, limit: 50 });
  const [comparisonFilters, setComparisonFilters] = useState({ q: "", pokemonId: "", form: "", status: "", costume: "", generation: "", shiny: "", sex: "", dataType: "", category: "", page: 1, limit: 50 });
  const [diffFilters, setDiffFilters] = useState({ snapshotId: "", type: "", category: "", page: 1, limit: 50 });
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailTab, setDetailTab] = useState("summary");
  const closeDetail = useCallback(() => setDetail(null), []);

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [summaryPayload, categoriesPayload] = await Promise.all([gameMasterRequest("game-master-summary"), gameMasterRequest("game-master-categories")]);
      setSummary(summaryPayload.data || null);
      setCategories(categoriesPayload.data || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOverview(); }, [loadOverview]);

  useEffect(() => {
    if (!summary?.initialized || !["explorer", "search"].includes(mode)) return undefined;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setContentLoading(true);
      setError("");
      try {
        const payload = await gameMasterRequest(mode === "search" ? "game-master-search" : "game-master-templates", filters, { signal: controller.signal });
        setTemplates(payload);
      } catch (requestError) {
        if (requestError.name !== "AbortError") setError(requestError.message);
      } finally {
        setContentLoading(false);
      }
    }, filters.q ? 260 : 0);
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [filters, mode, summary?.initialized]);

  useEffect(() => {
    if (!summary?.initialized || mode !== "comparison") return undefined;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setContentLoading(true);
      try { setComparison(await gameMasterRequest("game-master-comparison", comparisonFilters, { signal: controller.signal })); }
      catch (requestError) { if (requestError.name !== "AbortError") setError(requestError.message); }
      finally { setContentLoading(false); }
    }, comparisonFilters.q ? 260 : 0);
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [comparisonFilters, mode, summary?.initialized]);

  useEffect(() => {
    if (!summary?.initialized || mode !== "history") return undefined;
    let cancelled = false;
    setContentLoading(true);
    Promise.all([gameMasterRequest("game-master-snapshots", { page: 1, limit: 50 }), gameMasterRequest("game-master-diff", diffFilters)])
      .then(([snapshotPayload, diffPayload]) => { if (!cancelled) { setSnapshots(snapshotPayload); setDiffs(diffPayload); } })
      .catch((requestError) => { if (!cancelled) setError(requestError.message); })
      .finally(() => { if (!cancelled) setContentLoading(false); });
    return () => { cancelled = true; };
  }, [diffFilters, mode, summary?.initialized]);

  const categoryGroups = useMemo(() => Object.entries(categories.reduce((groups, category) => {
    const key = category.groupLabel || category.group || "Autres";
    (groups[key] ||= []).push(category);
    return groups;
  }, {})), [categories]);

  async function runMutation(action, label) {
    setBusy(action);
    setError("");
    try {
      const payload = await gameMasterRequest(action, {}, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action }) });
      const report = payload.data || payload;
      toast.success(report.changed === false ? "Game Master inchangé : aucun nouveau snapshot créé." : label);
      await loadOverview();
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setBusy("");
    }
  }

  async function openTemplate(templateId) {
    setDetail({ data: { template: { templateId } } });
    setDetailLoading(true);
    setDetailTab("summary");
    try { setDetail(await gameMasterRequest("game-master-template", { templateId })); }
    catch (requestError) { setError(requestError.message); setDetail(null); }
    finally { setDetailLoading(false); }
  }

  function setFilter(key, value) { setFilters((current) => ({ ...current, [key]: value, page: 1 })); }
  function setComparisonFilter(key, value) { setComparisonFilters((current) => ({ ...current, [key]: value, page: 1 })); }
  const exportParams = mode === "comparison" ? comparisonFilters : mode === "history" ? diffFilters : filters;
  const exportHref = (format) => {
    const params = new URLSearchParams({ action: "game-master-export", scope: mode === "comparison" ? "comparison" : mode === "history" ? "diff" : "templates", format });
    for (const [key, value] of Object.entries(exportParams)) if (value !== "" && !["page", "limit"].includes(key)) params.set(key, String(value));
    return `/api/pokemon-admin?${params}`;
  };
  const currentSnapshot = summary?.state?.snapshotId || "—";
  const localSummary = summary?.localSummary || {};
  const localTotal = Object.values(localSummary).reduce((total, value) => total + Number(value || 0), 0);
  const localUnresolved = Math.max(0, localTotal - Number(localSummary.matched || 0));

  return (
    <div className="space-y-5">
      <Panel
        eyebrow="PokeMiners Game Master · index MongoDB privé"
        title="Game Master Explorer"
        action={(
          <div className="flex flex-wrap gap-2">
            <a className={buttonClass} href={exportHref("json")}><Download size={16} /> JSON</a>
            <a className={buttonClass} href={exportHref("csv")}><Download size={16} /> CSV</a>
            <button className={buttonClass} type="button" onClick={loadOverview} disabled={loading}><RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser</button>
            <button className={buttonClass} type="button" onClick={() => runMutation("reindex-game-master", "Index Game Master reconstruit.")} disabled={Boolean(busy) || !summary?.initialized}><ServerCog className={busy === "reindex-game-master" ? "animate-spin" : ""} size={16} /> Réindexer</button>
            <button className={primaryButtonClass} type="button" onClick={() => runMutation("regenerate-game-master", "Nouveau snapshot Game Master activé.")} disabled={Boolean(busy)}><RotateCcw className={busy === "regenerate-game-master" ? "animate-spin" : ""} size={16} /> Régénérer</button>
          </div>
        )}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-emerald-100"><Database size={13} /> MongoDB privé</span><span className="font-mono">Snapshot {currentSnapshot}</span><span>Vérifié {formatDate(summary?.state?.lastCheckedAt)}</span><span>Source {summary?.snapshot?.provider || "PokeMiners"}</span><span>Mise à jour {formatDate(summary?.snapshot?.sourceUpdatedAt)}</span></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><DetailDefinition label="URL source" value={summary?.snapshot?.sourceUrl} /><DetailDefinition label="Hash global" value={summary?.state?.sourceHash} /><DetailDefinition label="Récupéré" value={formatDate(summary?.state?.retrievedAt)} /><DetailDefinition label="Rétention" value={summary?.retentionPolicy?.mode === "unlimited" ? "Illimitée" : `${summary?.retentionPolicy?.maximumSnapshots} snapshots`} /></div>
      </Panel>

      {error ? <div className="flex items-start gap-3 rounded-2xl border border-rose-200/20 bg-rose-300/[.08] p-4 text-sm font-bold text-rose-100" role="alert"><AlertTriangle className="mt-0.5 shrink-0" size={18} /><span className="min-w-0 break-words">{error}</span></div> : null}

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-7" aria-label="Synthèse Game Master">
        <SummaryMetric icon={Boxes} label="Templates" value={Number(summary?.totalTemplates || 0).toLocaleString("fr-FR")} />
        <SummaryMetric icon={Layers3} label="Catégories" value={Number(summary?.totalCategories || 0).toLocaleString("fr-FR")} tone="violet" />
        <SummaryMetric icon={CheckCircle2} label="Ajoutés" value={Number(summary?.changes?.added || 0).toLocaleString("fr-FR")} tone="emerald" />
        <SummaryMetric icon={FileDiff} label="Modifiés" value={Number(summary?.changes?.modified || 0).toLocaleString("fr-FR")} tone="amber" />
        <SummaryMetric icon={FileDiff} label="Supprimés" value={Number(summary?.changes?.removed || 0).toLocaleString("fr-FR")} tone="amber" />
        <SummaryMetric icon={CheckCircle2} label="Résolus localement" value={Number(summary?.localSummary?.matched || 0).toLocaleString("fr-FR")} tone="emerald" />
        <SummaryMetric icon={AlertTriangle} label="À vérifier" value={localUnresolved.toLocaleString("fr-FR")} tone="amber" />
      </section>

      {!loading && !summary?.initialized ? (
        <div className="rounded-3xl border border-dashed border-cyan-200/25 bg-cyan-300/[.05] p-8 text-center"><Database className="mx-auto text-cyan-200" size={28} /><h3 className="mt-3 text-lg font-black text-white">Aucun snapshot indexé</h3><p className="mx-auto mt-2 max-w-xl text-sm font-bold leading-6 text-slate-400">Lance la régénération pour récupérer le Game Master côté serveur, construire l’index et activer le premier snapshot MongoDB.</p><button className={`${primaryButtonClass} mt-5`} type="button" onClick={() => runMutation("regenerate-game-master", "Premier snapshot Game Master activé.")} disabled={Boolean(busy)}><RotateCcw className={busy ? "animate-spin" : ""} size={16} /> Initialiser</button></div>
      ) : null}

      {summary?.initialized ? (
        <>
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/45 p-2" role="tablist" aria-label="Modes Game Master">
            {modes.map(([id, label, Icon]) => <button className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-black ${mode === id ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-transparent text-slate-400 hover:bg-white/[.05] hover:text-white"}`} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} key={id}><Icon size={16} /> {label}</button>)}
          </div>

          {["explorer", "search"].includes(mode) ? (
            <div className="space-y-4">
              <section className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/35 p-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Filtres Game Master">
                <label className="relative sm:col-span-2 lg:col-span-4"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} /><input className={`${fieldClass} pl-12`} value={filters.q} onChange={(event) => setFilter("q", event.target.value)} placeholder="Template ID, Pokémon, forme, valeur, clé…" aria-label="Rechercher dans le Game Master" /></label>
                <select className={fieldClass} value={filters.group} onChange={(event) => { setFilters((current) => ({ ...current, group: event.target.value, category: "", page: 1 })); }} aria-label="Groupe"><option value="">Tous les groupes</option>{[...new Map(categories.map((category) => [category.group, category.groupLabel])).entries()].map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select>
                <select className={fieldClass} value={filters.category} onChange={(event) => setFilter("category", event.target.value)} aria-label="Catégorie"><option value="">Toutes les catégories</option>{categories.filter((category) => !filters.group || category.group === filters.group).map((category) => <option value={category.id} key={category.id}>{category.label} ({category.total})</option>)}</select>
                <input className={fieldClass} value={filters.settingType} onChange={(event) => setFilter("settingType", event.target.value)} placeholder="settingType exact" aria-label="Setting type exact" />
                <div className="grid grid-cols-2 gap-2"><select className={fieldClass} value={filters.match} onChange={(event) => setFilter("match", event.target.value)} aria-label="Mode de correspondance"><option value="partial">Partiel</option><option value="exact">Template exact</option></select><select className={fieldClass} value={`${filters.sort}:${filters.order}`} onChange={(event) => { const [sort, order] = event.target.value.split(":"); setFilters((current) => ({ ...current, sort, order, page: 1 })); }} aria-label="Tri"><option value="templateId:asc">ID A–Z</option><option value="templateId:desc">ID Z–A</option><option value="sizeBytes:desc">Taille décroissante</option><option value="propertyCount:desc">Propriétés décroissantes</option></select></div>
                <select className={fieldClass} value={filters.localStatus} onChange={(event) => setFilter("localStatus", event.target.value)} aria-label="Statut de résolution locale"><option value="">Tous les statuts locaux</option>{Object.entries(comparisonStatuses).filter(([id]) => id).map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select>
                <select className={fieldClass} value={filters.limit} onChange={(event) => setFilter("limit", Number(event.target.value))} aria-label="Résultats par page"><option value={25}>25 par page</option><option value={50}>50 par page</option><option value={100}>100 par page</option></select>
                <button className={`${buttonClass} sm:col-span-2`} type="button" onClick={() => setFilters({ q: "", match: "partial", category: "", group: "", settingType: "", localStatus: "", sort: "templateId", order: "asc", page: 1, limit: 50 })}><RefreshCcw size={15} /> Réinitialiser les filtres</button>
              </section>

              {mode === "explorer" && !filters.q && !filters.category && !filters.group && !filters.settingType ? <div className="space-y-4">{categoryGroups.map(([group, groupCategories]) => <section key={group}><h3 className="mb-2 text-xs font-black uppercase tracking-[.14em] text-slate-500">{group}</h3><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{groupCategories.map((category) => <button className="rounded-2xl border border-white/10 bg-white/[.035] p-3 text-left transition hover:border-cyan-200/30 hover:bg-cyan-300/[.07]" type="button" onClick={() => setFilter("category", category.id)} key={category.id}><div className="flex items-center justify-between gap-2"><strong className="text-sm font-black text-white">{category.label}</strong><span className="font-mono text-sm font-black text-cyan-100">{category.total}</span></div><p className="mt-2 text-[10px] font-bold text-slate-500">+{category.added || 0} · −{category.removed || 0} · ~{category.modified || 0}</p></button>)}</div></section>)}</div> : null}
              <TemplatesView resource={templates} loading={contentLoading} onOpen={openTemplate} onPage={(page) => setFilters((current) => ({ ...current, page }))} />
            </div>
          ) : null}

          {mode === "comparison" ? (
            <div className="space-y-4">
              <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-8" aria-label="Résumé de la comparaison locale"><SummaryMetric icon={Boxes} label="Templates" value={Number(summary?.totalTemplates || 0).toLocaleString("fr-FR")} /><SummaryMetric icon={CheckCircle2} label="Résolus" value={Number(localSummary.matched || 0).toLocaleString("fr-FR")} tone="emerald" /><SummaryMetric icon={AlertTriangle} label="Non résolus" value={localUnresolved.toLocaleString("fr-FR")} tone="amber" /><SummaryMetric icon={AlertTriangle} label="Formes absentes" value={Number(localSummary["missing-local-form"] || 0).toLocaleString("fr-FR")} tone="amber" /><SummaryMetric icon={AlertTriangle} label="Costumes absents" value={Number(localSummary["missing-local-costume"] || 0).toLocaleString("fr-FR")} tone="amber" /><SummaryMetric icon={ImageOff} label="Assets absents" value={(Number(localSummary["missing-local-asset"] || 0) + Number(localSummary["missing-shiny-asset"] || 0)).toLocaleString("fr-FR")} tone="amber" /><SummaryMetric icon={Database} label="Local uniquement" value={Number(localSummary["local-only"] || 0).toLocaleString("fr-FR")} tone="violet" /><SummaryMetric icon={FileDiff} label="Nouveautés" value={Number(summary?.changes?.added || 0).toLocaleString("fr-FR")} tone="emerald" /></section>
              <section className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/35 p-3 sm:grid-cols-3">
                <label className="relative sm:col-span-3"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} /><input className={`${fieldClass} pl-12`} value={comparisonFilters.q} onChange={(event) => setComparisonFilter("q", event.target.value)} placeholder="Pokémon, forme, costume, bundle…" aria-label="Rechercher dans la comparaison locale" /></label>
                <input className={fieldClass} inputMode="numeric" value={comparisonFilters.pokemonId} onChange={(event) => setComparisonFilter("pokemonId", event.target.value)} placeholder="N° Pokédex exact" aria-label="Numéro Pokédex exact" />
                <input className={fieldClass} value={comparisonFilters.form} onChange={(event) => setComparisonFilter("form", event.target.value)} placeholder="Forme Game Master" aria-label="Forme Game Master" />
                <select className={fieldClass} value={comparisonFilters.status} onChange={(event) => setComparisonFilter("status", event.target.value)} aria-label="Statut local">{Object.entries(comparisonStatuses).map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select>
                <select className={fieldClass} value={comparisonFilters.costume} onChange={(event) => setComparisonFilter("costume", event.target.value)} aria-label="Costume"><option value="">Tous les costumes</option><option value="yes">Avec costume</option><option value="no">Sans costume</option></select>
                <select className={fieldClass} value={comparisonFilters.generation} onChange={(event) => setComparisonFilter("generation", event.target.value)} aria-label="Génération"><option value="">Toutes les générations</option>{Array.from({ length: 9 }, (_, index) => <option value={index + 1} key={index + 1}>Génération {index + 1}</option>)}</select>
                <select className={fieldClass} value={comparisonFilters.shiny} onChange={(event) => setComparisonFilter("shiny", event.target.value)} aria-label="Asset shiny"><option value="">Shiny : tous</option><option value="yes">Shiny disponible</option><option value="no">Shiny absent</option></select>
                <select className={fieldClass} value={comparisonFilters.sex} onChange={(event) => setComparisonFilter("sex", event.target.value)} aria-label="Sexe"><option value="">Tous les sexes</option><option value="female">Variante féminine</option><option value="neutral">Autre / neutre</option></select>
                <select className={fieldClass} value={comparisonFilters.dataType} onChange={(event) => setComparisonFilter("dataType", event.target.value)} aria-label="Type de donnée"><option value="">Tous les types de données</option><option value="pokemonSettings">Pokémon Settings</option><option value="formSettings">Form Settings</option></select>
                <select className={fieldClass} value={comparisonFilters.category} onChange={(event) => setComparisonFilter("category", event.target.value)} aria-label="Catégorie Game Master"><option value="">Toutes les catégories GM</option>{categories.filter((category) => category.group === "pokemon").map((category) => <option value={category.id} key={category.id}>{category.label}</option>)}</select>
                <select className={fieldClass} value={comparisonFilters.limit} onChange={(event) => setComparisonFilter("limit", Number(event.target.value))} aria-label="Résultats par page"><option value={25}>25 par page</option><option value={50}>50 par page</option><option value={100}>100 par page</option></select>
                <button className={buttonClass} type="button" onClick={() => setComparisonFilters({ q: "", pokemonId: "", form: "", status: "", costume: "", generation: "", shiny: "", sex: "", dataType: "", category: "", page: 1, limit: 50 })}><RefreshCcw size={15} /> Réinitialiser</button>
              </section>
              {contentLoading ? <div className="h-52 animate-pulse rounded-2xl bg-white/[.04]" /> : <div className="grid gap-2 md:grid-cols-2">{(comparison?.data || []).map((item) => <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-3" key={item.comparisonKey}><div className="flex items-start gap-3">{item.localAsset?.image ? <img className="h-14 w-14 shrink-0 rounded-xl border border-white/10 object-contain p-1" src={item.localAsset.image} alt="Asset local exact" /> : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10"><ImageOff className="text-slate-600" size={20} /></span>}<div className="min-w-0 flex-1"><strong className="block truncate text-sm font-black text-white">#{item.pokemonId} {item.pokemon}</strong><span className="block truncate font-mono text-[10px] text-slate-500">{item.form || "normal"} → {item.localForm || "—"}</span><div className="mt-2"><StatusBadge status={item.mappingStatus} /></div></div></div><button className="mt-3 w-full rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-left font-mono text-[10px] text-slate-400 hover:text-white" type="button" onClick={() => openTemplate(item.templateId)}>{item.templateId}</button></article>)}</div>}
              <Pagination meta={comparison?.meta} onPage={(page) => setComparisonFilters((current) => ({ ...current, page }))} />
            </div>
          ) : null}

          {mode === "history" ? (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.4fr)]">
              <section className="space-y-2"><h3 className="text-sm font-black text-white">Snapshots</h3>{(snapshots?.data || []).map((snapshot) => <button className={`w-full rounded-2xl border p-3 text-left ${diffFilters.snapshotId === snapshot.snapshotId || snapshot.current && !diffFilters.snapshotId ? "border-cyan-200/30 bg-cyan-300/[.08]" : "border-white/10 bg-slate-950/40"}`} type="button" onClick={() => setDiffFilters((current) => ({ ...current, snapshotId: snapshot.snapshotId, page: 1 }))} key={snapshot.snapshotId}><div className="flex items-center justify-between gap-2"><strong className="truncate font-mono text-xs text-white">{snapshot.snapshotId}</strong>{snapshot.current ? <span className="rounded-full bg-emerald-300/12 px-2 py-1 text-[8px] font-black uppercase text-emerald-100">Actif</span> : null}</div><p className="mt-2 text-[10px] font-bold text-slate-500">{formatDate(snapshot.indexedAt)} · {snapshot.totalTemplates} templates</p><p className="mt-1 text-[10px] font-bold text-slate-400">+{snapshot.changes?.added || 0} · −{snapshot.changes?.removed || 0} · ~{snapshot.changes?.modified || 0}</p></button>)}</section>
              <section className="space-y-3"><div className="grid grid-cols-2 gap-2"><select className={fieldClass} value={diffFilters.type} onChange={(event) => setDiffFilters((current) => ({ ...current, type: event.target.value, page: 1 }))}><option value="">Tous les changements</option><option value="added">Ajoutés</option><option value="removed">Retirés</option><option value="modified">Modifiés</option></select><select className={fieldClass} value={diffFilters.category} onChange={(event) => setDiffFilters((current) => ({ ...current, category: event.target.value, page: 1 }))}><option value="">Toutes les catégories</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.label}</option>)}</select></div>{contentLoading ? <div className="h-52 animate-pulse rounded-2xl bg-white/[.04]" /> : (diffs?.data || []).map((diff) => <button className="w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left hover:border-cyan-200/30" type="button" onClick={() => openTemplate(diff.templateId)} key={diff._id || `${diff.snapshotId}-${diff.templateId}`}><div className="flex items-center justify-between gap-2"><strong className="break-all font-mono text-xs text-white">{diff.templateId}</strong><span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-black uppercase text-slate-300">{diff.changeType}</span></div><p className="mt-2 text-[10px] font-bold text-slate-500">{diff.category} · {(diff.changes || []).length} changement(s){diff.truncated ? " · tronqué" : ""}</p></button>)}<Pagination meta={diffs?.meta} onPage={(page) => setDiffFilters((current) => ({ ...current, page }))} /></section>
            </div>
          ) : null}
        </>
      ) : null}

      {detail ? <DetailModal resource={detail} loading={detailLoading} tab={detailTab} onTab={setDetailTab} onClose={closeDetail} /> : null}
    </div>
  );
}
