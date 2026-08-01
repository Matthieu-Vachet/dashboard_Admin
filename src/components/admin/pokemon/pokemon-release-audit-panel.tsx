"use client";

import { ChevronDown, ExternalLink, RefreshCcw, Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { pokemonAdminApiPath } from "@/services/admin/pokemon-admin-api";
import { fieldClass, Panel } from "./admin-ui";

type AuditKind = "available" | "shiny" | "costume" | "shadow";
type AuditComparison = {
  field: string;
  externalValue: unknown;
  localValue: unknown;
  matches: boolean;
  reason: string;
};
type AuditCandidate = {
  canonicalId?: string;
  dexId?: string;
  displayName?: string;
  form?: string | null;
  costume?: string | null;
  file?: string | null;
};
type AuditRow = {
  sourceKey?: string | null;
  localKey?: string | null;
  dexId?: string | null;
  effectiveDexId?: string | null;
  canonicalId?: string | null;
  sourceName?: string | null;
  sourceNormalizedName?: string | null;
  localName?: string | null;
  displayName?: string | null;
  sourceForm?: string | null;
  localForm?: string | null;
  sourceCostume?: string | null;
  localCostume?: string | null;
  sourceVariant?: string | null;
  sourceInfo?: string | null;
  sourceEvent?: string | null;
  sourceDate?: string | null;
  status: string;
  businessStatus?: string;
  resolutionStatus?: string;
  resolutionStrategy?: string;
  confidence?: number;
  diagnostics?: string[];
  comparisons?: AuditComparison[];
  candidates?: AuditCandidate[];
  image?: string | null;
  shinyImage?: string | null;
  sourceImage?: string | null;
  sourceShinyImage?: string | null;
  genderVariants?: { male?: boolean; female?: boolean };
  file?: string | null;
  pokemonFile?: string | null;
  assetsRef?: string | null;
};
type AuditStats = {
  externalEntries?: number;
  resolvedIdentities?: number;
  upToDate?: number;
  divergences?: number;
  ambiguous?: number;
  unresolved?: number;
  parseErrors?: number;
  externalOnly?: number;
  localOnly?: number;
  notVerified?: number;
  sourceUnavailable?: number;
  totalResults?: number;
};
type AuditPayload = {
  kind: AuditKind;
  source: { name?: string; url?: string; status?: string; fetchedAt?: string; sourceUpdatedAt?: string | null; error?: string };
  provenance?: { rawSha256?: string | null; writePolicy?: string; parser?: string; identityAuthority?: string };
  definitions?: { statuses?: Record<string, string>; counters?: Record<string, string> };
  stats?: AuditStats;
  rows?: AuditRow[];
};
type ManualMatchSelection = {
  row: AuditRow;
  candidate: AuditCandidate;
  aliasValue: string;
};
type IdentitySearchResult = {
  canonicalId: string;
  pokemonId: number;
  form?: string | null;
  costume?: string | null;
  status?: string;
  localIdentity?: {
    pokemonName?: string | null;
    sourceFile?: string | null;
    pokemonSourceFile?: string | null;
    assetsRef?: string | null;
  } | null;
};

const labels: Record<AuditKind, { eyebrow: string; title: string; description: string }> = {
  available: { eyebrow: "Disponibilité", title: "Pokémon disponibles", description: "La source répertorie les Pokémon introuvables. Une absence de cette liste n’est donc jamais interprétée seule comme une preuve de disponibilité." },
  shiny: { eyebrow: "Chromatique", title: "Pokémon chromatiques", description: "Compare chaque identité résolue avec availability.shinyReleased et la présence de son asset shiny canonique." },
  costume: { eyebrow: "Costumes", title: "Costumes Pokémon", description: "Compare les variantes sur dexId + forme + costume. Le sexe reste une dimension d’asset et ne duplique pas l’identité métier." },
  shadow: { eyebrow: "Shadow", title: "Pokémon Shadow", description: "Compare séparément availability.shadow et availability.shadowShinyReleased, sans confondre assets, Apex ou Purified." },
};
const statusLabels: Record<string, string> = {
  "up-to-date": "À jour",
  divergence: "Divergence réelle",
  "external-only": "Uniquement externe",
  "local-only": "Uniquement locale",
  "identity-ambiguous": "Identité ambiguë",
  "identity-unresolved": "Identité non résolue",
  "parse-error": "Erreur de parsing",
  "source-unavailable": "Source indisponible",
  "not-verified": "Non vérifié",
  ignored: "Ignoré",
  "false-positive": "Faux positif",
  "manual-match": "Association manuelle",
};
const resolutionLabels: Record<string, string> = {
  exact: "Exacte",
  "alias-exact": "Alias exact",
  "mapping-approved": "Mapping approuvé",
  "manual-match": "Association manuelle",
  probable: "Suggestion seulement",
  ambiguous: "Ambiguë",
  unresolved: "Non résolue",
  "parse-error": "Parsing impossible",
};
const statusTones: Record<string, string> = {
  "up-to-date": "border-emerald-300/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-100",
  divergence: "border-rose-300/30 bg-rose-400/10 text-rose-700 dark:text-rose-100",
  "external-only": "border-amber-300/30 bg-amber-400/10 text-amber-700 dark:text-amber-100",
  "local-only": "border-sky-300/30 bg-sky-400/10 text-sky-700 dark:text-sky-100",
  "identity-ambiguous": "border-violet-300/30 bg-violet-400/10 text-violet-700 dark:text-violet-100",
  "identity-unresolved": "border-orange-300/30 bg-orange-400/10 text-orange-700 dark:text-orange-100",
  "parse-error": "border-red-300/30 bg-red-500/10 text-red-700 dark:text-red-100",
  "not-verified": "border-slate-300/30 bg-slate-400/10 text-slate-700 dark:text-slate-100",
};
const counterCards: Array<{ key: keyof AuditStats; label: string; status?: string; tone: string }> = [
  { key: "externalEntries", label: "Entrées externes analysées", tone: "text-cyan-700 dark:text-cyan-100" },
  { key: "resolvedIdentities", label: "Identités résolues", tone: "text-blue-700 dark:text-blue-100" },
  { key: "upToDate", label: "À jour", status: "up-to-date", tone: "text-emerald-700 dark:text-emerald-100" },
  { key: "divergences", label: "Divergences réelles", status: "divergence", tone: "text-rose-700 dark:text-rose-100" },
  { key: "ambiguous", label: "Ambiguës", status: "identity-ambiguous", tone: "text-violet-700 dark:text-violet-100" },
  { key: "unresolved", label: "Non résolues", status: "identity-unresolved", tone: "text-orange-700 dark:text-orange-100" },
  { key: "parseErrors", label: "Erreurs de parsing", status: "parse-error", tone: "text-red-700 dark:text-red-100" },
  { key: "externalOnly", label: "Uniquement externes", status: "external-only", tone: "text-amber-700 dark:text-amber-100" },
  { key: "localOnly", label: "Uniquement locales", status: "local-only", tone: "text-sky-700 dark:text-sky-100" },
  { key: "notVerified", label: "Non vérifiées", status: "not-verified", tone: "text-slate-700 dark:text-slate-100" },
];

async function fetchAudit(kind: AuditKind) {
  const params = new URLSearchParams({ action: "pokemon-release-audit", kind });
  const response = await fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Audit indisponible.");
  return result.data as AuditPayload;
}

async function createManualMatch(kind: AuditKind, selection: ManualMatchSelection) {
  const response = await fetch(pokemonAdminApiPath, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      action: "pokemon-release-audit-manual-match",
      kind,
      canonicalId: selection.candidate.canonicalId,
      aliasValue: selection.aliasValue,
      sourceKey: selection.row.sourceKey,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Association impossible.");
  return result.data;
}

async function searchExistingIdentities(row: AuditRow, search: string) {
  const params = new URLSearchParams({
    action: "identity-manager",
    status: "active",
    page: "1",
    limit: "24",
  });
  const pokemonId = Number(row.effectiveDexId || row.dexId);
  if (Number.isFinite(pokemonId) && pokemonId > 0) params.set("pokemonId", String(pokemonId));
  if (search.trim()) params.set("search", search.trim());
  const response = await fetch(`${pokemonAdminApiPath}?${params}`, { cache: "no-store" });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Recherche des fiches JSON impossible.");
  const upstream = result.data;
  if (Array.isArray(upstream)) return upstream as IdentitySearchResult[];
  return (Array.isArray(upstream?.data) ? upstream.data : []) as IdentitySearchResult[];
}

function manualAliasValue(row: AuditRow) {
  return [row.sourceName, row.sourceCostume || row.sourceForm || row.sourceVariant]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .trim();
}

function identitySearchSeed(row: AuditRow) {
  return String(row.sourceName || row.localName || row.canonicalId || "").trim();
}

function identityCandidate(identity: IdentitySearchResult): AuditCandidate {
  return {
    canonicalId: identity.canonicalId,
    dexId: String(identity.pokemonId).padStart(4, "0"),
    displayName: identity.localIdentity?.pokemonName || identity.canonicalId,
    form: identity.form || null,
    costume: identity.costume || null,
    file: identity.localIdentity?.sourceFile || identity.localIdentity?.pokemonSourceFile || null,
  };
}

function renderValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Non renseigné";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function AuditDatum({ label, value, mono = false }: { label: string; value: unknown; mono?: boolean }) {
  return <div className="min-w-0"><dt className="type-overline text-disabled">{label}</dt><dd className={`mt-1 break-words text-sm font-bold text-domain-foreground ${mono ? "font-mono" : ""}`}>{renderValue(value)}</dd></div>;
}

export function PokemonReleaseAuditPanel({ kind, localEntries = [], onOpenPokemon }: { kind: AuditKind; localEntries?: Array<Record<string, unknown>>; onOpenPokemon?: (entry: Record<string, unknown>) => void }) {
  const [payload, setPayload] = useState<AuditPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("status");
  const [visibleLimit, setVisibleLimit] = useState(100);
  const [manualMatch, setManualMatch] = useState<ManualMatchSelection | null>(null);
  const [linking, setLinking] = useState(false);
  const [identityPickerRow, setIdentityPickerRow] = useState<AuditRow | null>(null);
  const [identityPickerQuery, setIdentityPickerQuery] = useState("");
  const deferredIdentityPickerQuery = useDeferredValue(identityPickerQuery);
  const [identityPickerResults, setIdentityPickerResults] = useState<IdentitySearchResult[]>([]);
  const [identityPickerLoading, setIdentityPickerLoading] = useState(false);
  const [identityPickerError, setIdentityPickerError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setPayload(await fetchAudit(kind));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Audit indisponible.");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    let cancelled = false;
    fetchAudit(kind)
      .then((result) => { if (!cancelled) setPayload(result); })
      .catch((cause) => { if (!cancelled) setError(cause instanceof Error ? cause.message : "Audit indisponible."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [kind]);

  useEffect(() => {
    if (!identityPickerRow) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setIdentityPickerLoading(true);
      setIdentityPickerError("");
      try {
        const results = await searchExistingIdentities(identityPickerRow, deferredIdentityPickerQuery);
        if (!cancelled) setIdentityPickerResults(results);
      } catch (cause) {
        if (!cancelled) {
          setIdentityPickerResults([]);
          setIdentityPickerError(cause instanceof Error ? cause.message : "Recherche des fiches JSON impossible.");
        }
      } finally {
        if (!cancelled) setIdentityPickerLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [deferredIdentityPickerQuery, identityPickerRow]);

  const filteredRows = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase("fr");
    return [...(payload?.rows || [])]
      .filter((row) => status === "all" || row.status === status)
      .filter((row) => !needle || [row.dexId, row.effectiveDexId, row.sourceName, row.sourceNormalizedName, row.localName, row.canonicalId, row.sourceForm, row.localForm, row.sourceCostume, row.localCostume, row.file, ...(row.diagnostics || [])].filter(Boolean).join(" ").toLocaleLowerCase("fr").includes(needle))
      .sort((left, right) => sort === "dex"
        ? String(left.dexId || left.effectiveDexId || "").localeCompare(String(right.dexId || right.effectiveDexId || ""), "fr", { numeric: true })
        : sort === "name"
          ? String(left.localName || left.sourceName || "").localeCompare(String(right.localName || right.sourceName || ""), "fr")
          : String(left.status).localeCompare(String(right.status)));
  }, [deferredQuery, payload?.rows, sort, status]);
  const visibleRows = filteredRows.slice(0, visibleLimit);
  const localByKey = useMemo(() => new Map(localEntries.map((entry) => [String(entry.key || ""), entry])), [localEntries]);
  const view = labels[kind];
  const selectStatus = (nextStatus: string) => { setStatus(nextStatus); setVisibleLimit(100); };
  const updateQuery = (value: string) => { setQuery(value); setVisibleLimit(100); };
  const openIdentityPicker = (row: AuditRow) => {
    setIdentityPickerRow(row);
    setIdentityPickerQuery(identitySearchSeed(row));
    setIdentityPickerResults([]);
    setIdentityPickerError("");
  };
  const chooseIdentity = (identity: IdentitySearchResult) => {
    if (!identityPickerRow) return;
    setManualMatch({ row: identityPickerRow, candidate: identityCandidate(identity), aliasValue: manualAliasValue(identityPickerRow) });
    setIdentityPickerRow(null);
  };
  const confirmManualMatch = async () => {
    if (!manualMatch?.candidate.canonicalId || !manualMatch.aliasValue) return;
    setLinking(true);
    try {
      await createManualMatch(kind, manualMatch);
      toast.success(`Alias Margxt lié à ${manualMatch.candidate.canonicalId}.`);
      setManualMatch(null);
      await load();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Association impossible.");
    } finally {
      setLinking(false);
    }
  };

  if (loading && !payload) return <FetchLoadingState title={`Audit ${view.title} en cours…`} />;
  if (error) return <ErrorState title="Centre de contrôle indisponible" message={error} action={<Button icon={<RefreshCcw size={16} />} onClick={() => void load()}>Réessayer</Button>} />;
  if (payload?.source.status === "source-unavailable") return <ErrorState title="Source externe indisponible" message={payload.source.error || "La source n’a pas répondu. Aucun écart n’a été créé."} action={<Button icon={<RefreshCcw size={16} />} onClick={() => void load()}>Relancer</Button>} />;

  return (
    <Panel title={view.title} eyebrow={view.eyebrow} action={<Button icon={<RefreshCcw className={loading ? "animate-spin" : ""} size={16} />} disabled={loading} onClick={() => void load()}>Relancer</Button>}>
      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm font-bold text-cyan-900 dark:text-cyan-50/90">
        <p>{view.description}</p>
        <p className="mt-2 text-cyan-800/80 dark:text-cyan-100/70">Lecture seule : aucune observation externe ne modifie les JSON locaux automatiquement.</p>
      </div>

      <details className="mt-4 rounded-2xl border border-line bg-surface-inset-subtle" open>
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-black text-domain-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
          <span>Résumé de l’audit</span><ChevronDown aria-hidden="true" size={18} />
        </summary>
        <div className="grid grid-cols-2 gap-2 border-t border-line p-3 md:grid-cols-3 xl:grid-cols-5">
          {counterCards.map((card) => {
            const content = <><small className="type-overline text-muted">{card.label}</small><strong className={`mt-1 block font-mono text-xl ${card.tone}`}>{payload?.stats?.[card.key] || 0}</strong></>;
            return card.status ? <button className="min-h-20 rounded-2xl border border-line bg-surface-faint p-3 text-left transition hover:bg-surface-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" key={card.key} title={payload?.definitions?.counters?.[card.key]} type="button" onClick={() => selectStatus(card.status!)}>{content}</button> : <div className="min-h-20 rounded-2xl border border-line bg-surface-faint p-3" key={card.key} title={payload?.definitions?.counters?.[card.key]}>{content}</div>;
          })}
        </div>
      </details>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>{payload?.source.name}</span>
        {payload?.source.url ? <a className="inline-flex min-h-11 items-center gap-1 font-black text-cyan-700 hover:underline dark:text-cyan-100" href={payload.source.url} target="_blank" rel="noreferrer">Ouvrir la source <ExternalLink size={13} /></a> : null}
        <span>· relevé {payload?.source.fetchedAt ? new Date(payload.source.fetchedAt).toLocaleString("fr-FR") : "inconnu"}</span>
        <span>· empreinte {payload?.provenance?.rawSha256?.slice(0, 12) || "absente"}</span>
      </div>

      <div className="sticky top-2 z-20 mt-4 grid gap-2 rounded-2xl border border-line bg-surface-flat/95 p-2 shadow-lg backdrop-blur md:grid-cols-[minmax(0,1fr)_13rem_13rem]">
        <label className="relative"><span className="sr-only">Rechercher dans l’audit</span><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-disabled" size={16} /><Input className="pl-10" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Pokémon, canonicalId, forme…" /></label>
        <Select className={fieldClass} value={status} onChange={(event) => selectStatus(event.target.value)} aria-label="Filtrer le statut"><option value="all">Tous les statuts</option>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</Select>
        <Select className={fieldClass} value={sort} onChange={(event) => { setSort(event.target.value); setVisibleLimit(100); }} aria-label="Trier l’audit"><option value="status">Statut</option><option value="dex">Numéro</option><option value="name">Nom</option></Select>
      </div>

      <p className="mt-3 text-sm font-bold text-muted" aria-live="polite">{filteredRows.length} résultat(s) · {visibleRows.length} affiché(s)</p>
      <div className="mt-3 space-y-2">
        {visibleRows.map((row, index) => {
          const localEntry = row.localKey ? localByKey.get(row.localKey) : null;
          const rowKey = [row.sourceKey, row.localKey, row.canonicalId, index].filter(Boolean).join(":");
          const sprite = row.image;
          const genders = [row.genderVariants?.male ? "masculin/partagé" : null, row.genderVariants?.female ? "féminin" : null].filter(Boolean).join(" + ") || "aucune variante déclarée";
          const canLinkExistingIdentity = ["identity-unresolved", "identity-ambiguous", "external-only"].includes(row.status) && Boolean(manualAliasValue(row));
          return <details className="rounded-2xl border border-line bg-surface-faint [content-visibility:auto] [contain-intrinsic-size:108px]" key={rowKey}>
            <summary className="grid min-h-24 cursor-pointer list-none gap-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-center">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-line bg-surface-control">{sprite ? <Image alt="" className="h-12 w-12 object-contain" height={48} loading="lazy" src={sprite} unoptimized width={48} /> : <span className="font-mono text-xs text-muted">#{row.dexId || row.effectiveDexId || "—"}</span>}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2"><strong className="break-words text-domain-foreground">#{row.dexId || row.effectiveDexId || "—"} · {row.localName || row.sourceName || "Observation sans nom"}</strong>{row.canonicalId ? <code className="break-all rounded-md bg-surface-control px-1.5 py-0.5 text-[11px] text-muted">{row.canonicalId}</code> : null}</span>
                <span className="mt-1 block break-words type-caption-strong text-muted">Externe : {row.sourceName || "absent"}{row.sourceForm ? ` · ${row.sourceForm}` : ""}{row.sourceCostume ? ` · ${row.sourceCostume}` : ""}</span>
              </span>
              <span className="flex flex-wrap items-center gap-2 sm:justify-end"><span className={`inline-flex rounded-full border px-3 py-1 type-label ${statusTones[row.status] || "border-line bg-surface-control text-muted"}`}>{statusLabels[row.status] || row.status}</span><ChevronDown aria-hidden="true" className="text-muted" size={18} /></span>
            </summary>
            <div className="border-t border-line p-4">
              <div className="grid gap-5 xl:grid-cols-2">
                <section><h3 className="font-black text-domain-foreground">Identité et résolution</h3><dl className="mt-3 grid gap-3 sm:grid-cols-2"><AuditDatum label="Nom externe brut" value={row.sourceName} /><AuditDatum label="Nom normalisé" value={row.sourceNormalizedName || row.sourceName} /><AuditDatum label="canonicalId" value={row.canonicalId} mono /><AuditDatum label="dexId" value={row.dexId || row.effectiveDexId} mono /><AuditDatum label="Forme externe / locale" value={`${renderValue(row.sourceForm)} / ${renderValue(row.localForm)}`} /><AuditDatum label="Costume externe / local" value={`${renderValue(row.sourceCostume)} / ${renderValue(row.localCostume)}`} /><AuditDatum label="Variantes de sexe" value={genders} /><AuditDatum label="Résolution" value={`${resolutionLabels[row.resolutionStatus || ""] || row.resolutionStatus || "Non renseignée"} · ${row.resolutionStrategy || "stratégie inconnue"}`} /><AuditDatum label="Confiance" value={row.confidence === undefined ? null : `${Math.round(row.confidence * 100)} %`} /></dl></section>
                <section><h3 className="font-black text-domain-foreground">Traçabilité</h3><dl className="mt-3 grid gap-3 sm:grid-cols-2"><AuditDatum label="Source" value={payload?.source.name} /><AuditDatum label="Date de récupération" value={payload?.source.fetchedAt} /><AuditDatum label="Date / événement source" value={[row.sourceDate, row.sourceEvent].filter(Boolean).join(" · ")} /><AuditDatum label="Image source externe" value={row.sourceImage} mono /><AuditDatum label="Fichier JSON local" value={row.file || row.pokemonFile} mono /><AuditDatum label="assetsRef" value={row.assetsRef} mono /></dl>{localEntry && onOpenPokemon ? <Button className="mt-4" onClick={() => onOpenPokemon(localEntry)}>Ouvrir la fiche Pokémon</Button> : null}</section>
              </div>

              {row.comparisons?.length ? <section className="mt-5"><h3 className="font-black text-domain-foreground">Comparaison métier</h3><div className="mt-3 grid gap-3">{row.comparisons.map((item) => <article className={`rounded-xl border p-3 ${item.matches ? "border-emerald-300/20 bg-emerald-400/5" : "border-rose-300/25 bg-rose-400/10"}`} key={item.field}><div className="flex flex-wrap items-center justify-between gap-2"><code className="break-all type-caption-strong text-domain-foreground">{item.field}</code><span className={`rounded-full px-2 py-1 type-label ${item.matches ? "bg-emerald-400/15 text-emerald-700 dark:text-emerald-100" : "bg-rose-400/15 text-rose-700 dark:text-rose-100"}`}>{item.matches ? "Conforme" : "Différent"}</span></div><dl className="mt-3 grid gap-3 sm:grid-cols-2"><AuditDatum label="Externe" value={item.externalValue} mono /><AuditDatum label="Local" value={item.localValue} mono /></dl><p className="mt-3 text-sm font-bold text-muted">{item.reason}</p></article>)}</div></section> : null}

              {row.candidates?.length ? <section className="mt-5"><h3 className="font-black text-domain-foreground">Candidats locaux — aucune association automatique</h3><p className="mt-1 text-sm font-bold text-muted">Choisissez une fiche existante uniquement après vérification. L’action crée un alias Margxt traçable dans Identity Manager ; elle ne modifie aucun JSON Pokémon.</p><div className="mt-3 grid gap-2 md:grid-cols-2">{row.candidates.map((candidate) => <article className="flex flex-col rounded-xl border border-violet-300/20 bg-violet-400/5 p-3" key={candidate.canonicalId}><code className="break-all type-caption-strong text-domain-foreground">{candidate.canonicalId}</code><p className="mt-2 text-sm font-bold text-muted">#{candidate.dexId} · {candidate.displayName} · forme {candidate.form || "normale"} · costume {candidate.costume || "aucun"}</p>{candidate.file ? <p className="mt-1 break-all font-mono text-xs text-disabled">{candidate.file}</p> : null}<Button className="mt-3 self-start" size="sm" disabled={!candidate.canonicalId || !manualAliasValue(row)} onClick={() => setManualMatch({ row, candidate, aliasValue: manualAliasValue(row) })}>Lier à cette fiche JSON</Button></article>)}</div></section> : null}

              {canLinkExistingIdentity ? <section className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-400/5 p-3"><h3 className="font-black text-domain-foreground">La fiche JSON existe déjà ?</h3><p className="mt-1 text-sm font-bold text-muted">Recherchez l’identité synchronisée correspondant à ce numéro Pokédex, puis liez explicitement l’observation externe. Aucune fiche JSON ne sera créée ou modifiée.</p><Button className="mt-3" size="sm" onClick={() => openIdentityPicker(row)}>{row.candidates?.length ? "Rechercher une autre fiche JSON" : "Rechercher et lier une fiche JSON"}</Button></section> : null}

              {row.diagnostics?.length ? <section className="mt-5 rounded-xl border border-amber-300/20 bg-amber-400/5 p-3"><h3 className="font-black text-domain-foreground">Explication</h3><ul className="mt-2 space-y-1 text-sm font-bold text-muted">{row.diagnostics.map((diagnostic) => <li key={diagnostic}>• {diagnostic}</li>)}</ul></section> : null}
              {payload?.source.url ? <a className="mt-4 inline-flex min-h-11 items-center gap-2 font-black text-cyan-700 hover:underline dark:text-cyan-100" href={payload.source.url} target="_blank" rel="noreferrer">Consulter la source <ExternalLink size={15} /></a> : null}
            </div>
          </details>;
        })}
        {!filteredRows.length ? <EmptyState title="Aucune observation dans ce filtre" description="Le filtre ne masque aucune divergence dans les compteurs du résumé." /> : null}
      </div>
      {visibleRows.length < filteredRows.length ? <div className="mt-4 flex justify-center"><Button onClick={() => setVisibleLimit((current) => current + 100)}>Afficher 100 résultats de plus</Button></div> : null}
      <Modal
        open={Boolean(identityPickerRow)}
        title="Lier à une fiche JSON existante"
        description="La recherche interroge le catalogue canonique synchronisé dans Identity Manager et reste limitée au numéro Pokédex de l’observation lorsqu’il est connu."
        onClose={() => setIdentityPickerRow(null)}
      >
        <label className="grid gap-2 font-black text-domain-foreground">
          Rechercher une identité
          <Input value={identityPickerQuery} onChange={(event) => setIdentityPickerQuery(event.target.value)} placeholder="Nom, canonicalId ou alias…" autoFocus />
        </label>
        <p className="mt-2 text-xs font-bold text-muted">Observation : #{identityPickerRow?.effectiveDexId || identityPickerRow?.dexId || "—"} · {identityPickerRow?.sourceName || "nom inconnu"}{identityPickerRow?.sourceCostume ? ` · ${identityPickerRow.sourceCostume}` : identityPickerRow?.sourceForm ? ` · ${identityPickerRow.sourceForm}` : ""}</p>
        <div className="mt-4 grid max-h-[55vh] gap-2 overflow-y-auto pr-1">
          {identityPickerLoading ? <FetchLoadingState title="Recherche des fiches JSON…" /> : null}
          {!identityPickerLoading && identityPickerError ? <ErrorState title="Recherche indisponible" message={identityPickerError} /> : null}
          {!identityPickerLoading && !identityPickerError && identityPickerResults.map((identity) => {
            const candidate = identityCandidate(identity);
            return <article className="rounded-xl border border-line bg-surface-faint p-3" key={identity.canonicalId}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><code className="break-all type-caption-strong text-domain-foreground">{identity.canonicalId}</code><p className="mt-1 text-sm font-bold text-muted">#{candidate.dexId} · {candidate.displayName} · forme {candidate.form || "normale"} · costume {candidate.costume || "aucun"}</p>{candidate.file ? <p className="mt-1 break-all font-mono text-xs text-disabled">{candidate.file}</p> : <p className="mt-1 text-xs font-bold text-amber-700 dark:text-amber-200">Chemin JSON non renseigné dans l’identité synchronisée.</p>}</div><Button className="shrink-0" size="sm" disabled={!identity.canonicalId} onClick={() => chooseIdentity(identity)}>Choisir cette fiche</Button></div></article>;
          })}
          {!identityPickerLoading && !identityPickerError && !identityPickerResults.length ? <EmptyState title="Aucune fiche trouvée" description="Modifiez la recherche ou synchronisez d’abord le catalogue Identity Manager. L’observation reste non résolue." /> : null}
        </div>
      </Modal>
      <Modal
        open={Boolean(manualMatch)}
        title="Confirmer l’association manuelle"
        description="Cette décision sera enregistrée dans Identity Manager et réutilisée par les prochains audits."
        onClose={() => { if (!linking) setManualMatch(null); }}
        footer={<div className="flex flex-wrap justify-end gap-2"><Button disabled={linking} onClick={() => setManualMatch(null)}>Annuler</Button><Button variant="primary" loading={linking} loadingText="Association…" onClick={() => void confirmManualMatch()}>Confirmer l’association</Button></div>}
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <AuditDatum label="Alias Margxt" value={manualMatch?.aliasValue} />
          <AuditDatum label="Fiche canonique" value={manualMatch?.candidate.canonicalId} mono />
          <AuditDatum label="Fichier JSON" value={manualMatch?.candidate.file} mono />
          <AuditDatum label="Effet" value="Alias actif, confiance 100 %, source manuelle" />
        </dl>
        <p className="mt-4 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-muted">Aucune donnée Pokémon n’est réécrite. Vous pourrez déprécier cet alias depuis Identity Manager si l’association doit être annulée.</p>
      </Modal>
    </Panel>
  );
}
