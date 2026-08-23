"use client";

import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileUp,
  Fingerprint,
  History,
  Link2,
  PackageCheck,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  Trash2,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { toast } from "sonner";
import { actionError, normalizeActionError } from "@/lib/admin-action-errors";
import { typeColors, typeLabels } from "@/components/site/pokemon-style";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field as DesignSystemField } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { cn } from "@/lib/cn";
import { useAdminPokemonSearch } from "./admin-pokemon-search-context";

type IdentityStatus = "active" | "draft" | "deprecated" | "ignored";
type AliasStatus = "active" | "deprecated" | "ignored" | "conflict";
type IdentitySyncStatus = "synchronized" | "orphaned" | "draft" | "conflict";

type LocalGenderAsset = {
  isFemale?: boolean | null;
  gender?: string;
  image?: string | null;
  shinyImage?: string | null;
  sourcePath?: string | null;
  source?: string | null;
};

type LocalIdentityInfo = {
  pokemonName?: string | null;
  types?: string[];
  form?: string | null;
  formId?: string | null;
  costume?: string | null;
  transformation?: string | null;
  category?: string;
  identityKey?: string;
  sourceType?: string;
  sourceFile?: string;
  pokemonSourceFile?: string | null;
  assetsRef?: string | null;
  assets?: { image?: string | null; shinyImage?: string | null; imageSource?: string | null; shinyImageSource?: string | null };
  genderAssets?: LocalGenderAsset[];
  localReferences?: Array<{ type?: string; sourceFile?: string; sourcePath?: string | null; assetsRef?: string | null }>;
  fingerprint?: string;
  inventoryFingerprint?: string;
  lastValidatedAt?: string;
  issues?: string[];
};

type ProviderAlias = {
  aliasId: string;
  provider: string;
  value: string;
  normalizedValue: string;
  status: AliasStatus;
  confidence: number;
  source: string;
  reason?: string | null;
  updatedAt?: string;
};

type PokemonIdentity = {
  _id?: string;
  id?: string;
  canonicalId: string;
  pokemonId: number;
  form?: string | null;
  costume?: string | null;
  transformation?: string | null;
  status: IdentityStatus;
  syncStatus?: IdentitySyncStatus;
  aliases: ProviderAlias[];
  genderVariants?: { male?: boolean; female?: boolean };
  localIdentity?: LocalIdentityInfo | null;
  previousCanonicalIds?: string[];
  metadata?: { notes?: string | null; tags?: string[]; lastUsedAt?: string | null; usageCount?: number };
  updatedAt?: string;
};

type IdentityDiagnostic = {
  _id?: string;
  id?: string;
  provider: string;
  sourceId?: string | null;
  rawAlias: string;
  normalizedAlias: string;
  pokemonId?: number | null;
  pokemon?: string | null;
  form?: string | null;
  costume?: string | null;
  reason: string;
  code?: string;
  severity?: "info" | "warning" | "error";
  reasonDetails?: string;
  confidence: number;
  candidates?: Array<Record<string, unknown>>;
  proposedAction?: string;
  action?: {
    kind: string;
    required: boolean;
    label: string;
    identity?: {
      identityId?: string;
      canonicalId?: string;
      pokemonId?: number;
      form?: string | null;
      costume?: string | null;
      sourceFile?: string | null;
      identityKey?: string | null;
    } | null;
  };
  firstDetectedAt?: string;
  lastDetectedAt?: string;
  occurrences?: number;
  status: "open" | "resolved" | "ignored" | "false-positive";
};

type DiagnosticCodeSummary = {
  code: string;
  severity: "info" | "warning" | "error";
  reason: string;
  total: number;
  open: number;
  resolved: number;
  occurrences: number;
};

type DiagnosticProviderSummary = {
  id: string;
  label: string;
  activeAliases: number;
  activeAliasesWithLocalPath: number;
  totalDiagnostics: number;
  open: number;
  resolved: number;
  ignored: number;
  falsePositive: number;
  actionable: number;
  alreadyAssociated: number;
  sourceIdsPresent: number;
  withCandidates: number;
  occurrences: number;
  codes: DiagnosticCodeSummary[];
};

type DiagnosticSummary = {
  totals: {
    totalDiagnostics: number;
    open: number;
    resolved: number;
    ignored: number;
    falsePositive: number;
    actionable: number;
    alreadyAssociated: number;
    activeAliases: number;
    activeAliasesWithLocalPath: number;
    occurrences: number;
  };
  providers: DiagnosticProviderSummary[];
  integrity: {
    resolvedIdentityReferences: number;
    invalidResolvedIdentityReferences: number;
    activeAliases: number;
    activeAliasesWithLocalPath: number;
    activeAliasesWithoutLocalPath: number;
  };
};

type ListMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  stats?: {
    providers?: Array<{ provider: string; count: number }>;
    statuses?: Record<string, number>;
  };
};

type ManagedProvider = {
  id: string;
  label: string;
  domains: string[];
  visibility: string;
  status: string;
  aliases: number;
  activeAliases: number;
  openDiagnostics: number;
  occurrences: number;
};

type ImportReport = {
  mode: "preview" | "apply";
  total: number;
  create: number;
  update: number;
  duplicates: unknown[];
  conflicts: unknown[];
  invalid: unknown[];
};

type IdentitySyncReport = {
  mode: "dry-run" | "write";
  inventory: { schemaVersion: number; fingerprint: string; total: number; issues: number };
  before: { identities: number; aliases: number };
  after: { identities: number; aliases: number };
  create: number;
  update: number;
  unchanged: number;
  orphan: number;
  orphanUpdate: number;
  conflict: number;
  aliasesPreserved: number;
  synchronization: {
    state: "SYNCED" | "CHANGES_REQUIRED" | "CONFLICT";
    dirty: boolean;
    localHash: string;
    mongoHash: string;
    hashesMatch: boolean;
    lastSyncedAt: string | null;
    algorithm: "sha256";
    serialization: "stable-json-v1";
    ordering: string;
  };
  conflicts: IdentitySyncConflict[];
  mewtwoArmored: "present" | "missing";
};

type IdentityConflictSubject = {
  identityId?: string | null;
  canonicalId?: string | null;
  identityKey?: string | null;
  pokemonId?: number | null;
  pokemonKey?: string | null;
  form?: string | null;
  formId?: string | null;
  parentFormId?: string | null;
  costume?: string | null;
  transformation?: string | null;
  category?: string | null;
  sourceFile?: string | null;
  pokemonSourceFile?: string | null;
  assetsRef?: string | null;
  candidateFiles?: string[];
  aliases?: Array<{ provider?: string; value?: string; status?: string }>;
};

type IdentitySyncConflict = {
  code?: string;
  cause?: string;
  canonicalId?: string;
  identityKey?: string;
  existingIdentityId?: string;
  localCandidate?: IdentityConflictSubject;
  claimedBy?: IdentityConflictSubject;
  existingIdentity?: IdentityConflictSubject;
  existingCandidates?: IdentityConflictSubject[];
  existingCanonicalIds?: string[];
  resolution?: {
    action?: string;
    recommendation?: string;
    automaticSelection?: boolean;
    automaticDeletion?: boolean;
  };
};

type IdentityForm = {
  canonicalId: string;
  pokemonId: string;
  form: string;
  costume: string;
  status: IdentityStatus;
  male: boolean;
  female: boolean;
  notes: string;
};

type AliasForm = {
  provider: string;
  value: string;
  status: AliasStatus;
  confidence: string;
  reason: string;
};

const emptyIdentityForm: IdentityForm = {
  canonicalId: "",
  pokemonId: "",
  form: "",
  costume: "",
  status: "draft",
  male: false,
  female: false,
  notes: "",
};

const diagnosticReasonOptions = [
  "ALIAS_UNKNOWN",
  "POKEMON_UNKNOWN",
  "FORM_UNKNOWN",
  "COSTUME_UNKNOWN",
  "CANONICAL_ID_MISSING",
  "CANONICAL_ID_NOT_SYNCHRONIZED",
  "DUPLICATE_ALIAS",
  "ALIAS_CONFLICT",
  "MULTIPLE_FUNCTIONAL_IDENTITIES",
  "GENDER_ASSET_UNAVAILABLE",
  "IDENTITY_DEPRECATED",
  "ALIAS_IGNORED",
  "SOURCE_DATA_INCOMPLETE",
  "LOCAL_IDENTITY_MISSING",
  "VARIANT_NOT_FOUND",
  "unknown-alias",
  "unknown-pokemon",
  "unknown-form",
  "unknown-costume",
  "missing-canonical-id",
  "duplicate",
  "conflict",
  "multiple-candidates",
  "ambiguous-gender",
  "deprecated-identity",
  "ignored-alias",
  "incomplete-source",
  "missing-local-match",
  "ambiguous",
  "multiple-local-identities",
  "multiple-canonical-identities",
  "CANONICAL_ASSET_MISSING",
] as const;

const emptyAliasForm: AliasForm = {
  provider: "game-master",
  value: "",
  status: "active",
  confidence: "1",
  reason: "",
};

const cardClass = "min-w-0 overflow-hidden rounded-surface border border-line bg-surface-inset p-4 shadow-surface";

function identityId(identity: PokemonIdentity) {
  return identity.id || identity._id || "";
}

function diagnosticId(diagnostic: IdentityDiagnostic) {
  return diagnostic.id || diagnostic._id || "";
}

function normalizeDiagnosticAlias(value?: string | null) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function diagnosticAliasValue(diagnostic: IdentityDiagnostic) {
  const form = normalizeDiagnosticAlias(diagnostic.form);
  if (form && form !== "normal") return form;
  const pokemon = normalizeDiagnosticAlias(diagnostic.pokemon);
  const costume = normalizeDiagnosticAlias(diagnostic.costume);
  if (pokemon && costume) return `${pokemon}_${costume}`;
  return diagnostic.rawAlias;
}

function formatDate(value?: string | null) {
  if (!value) return "Jamais";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function statusTone(status: string): "green" | "amber" | "red" | "violet" | "neutral" {
  if (status === "active" || status === "resolved" || status === "synchronized") return "green";
  if (status === "draft" || status === "open" || status === "orphaned") return "amber";
  if (status === "conflict" || status === "false-positive") return "red";
  if (status === "deprecated") return "violet";
  return "neutral";
}

function severityTone(severity?: string): "green" | "amber" | "red" | "violet" | "neutral" {
  if (severity === "error") return "red";
  if (severity === "warning") return "amber";
  if (severity === "info") return "violet";
  return "neutral";
}

function candidateLabel(candidate: Record<string, unknown>) {
  return String(candidate.canonicalId || candidate.identityKey || candidate.value || candidate.alias || candidate.id || "Candidat sans identifiant");
}

function localPreviewAsset(identity: PokemonIdentity) {
  const genderAssets = identity.localIdentity?.genderAssets || [];
  const preferred = genderAssets.find((asset) => asset.isFemale === false)
    || genderAssets.find((asset) => asset.isFemale == null)
    || genderAssets[0];
  return preferred?.image || identity.localIdentity?.assets?.image || null;
}

function localAssetBundle(identity: PokemonIdentity) {
  return identity.localIdentity?.assetsRef
    || identity.localIdentity?.localReferences?.find((reference) => reference.assetsRef)?.assetsRef
    || null;
}

function identityTypes(identity: PokemonIdentity) {
  return [...new Set((identity.localIdentity?.types || []).map((type) => String(type).toUpperCase()).filter(Boolean))];
}

function identityCardStyle(types: string[]): CSSProperties {
  const [primaryType, secondaryType] = types;
  const primary = typeColors[primaryType] || typeColors.NORMAL;
  const secondary = typeColors[secondaryType] || primary;
  return {
    borderColor: `color-mix(in srgb, ${primary} 42%, rgba(255,255,255,.12))`,
    background: `linear-gradient(145deg, color-mix(in srgb, ${primary} 15%, rgba(2,6,23,.94)), color-mix(in srgb, ${secondary} 8%, rgba(2,6,23,.96)) 62%, rgba(2,6,23,.97))`,
  };
}

function identityPayload(form: IdentityForm) {
  return {
    canonicalId: form.canonicalId,
    pokemonId: Number(form.pokemonId),
    form: form.form || null,
    costume: form.costume || null,
    status: form.status,
    genderVariants: { male: form.male, female: form.female },
    metadata: { notes: form.notes || null, tags: [] },
  };
}

function aliasPayload(form: AliasForm) {
  return {
    provider: form.provider,
    value: form.value,
    status: form.status,
    confidence: Number(form.confidence),
    source: "manual",
    reason: form.reason || null,
  };
}

async function apiGet(action: string, params: Record<string, string | number | boolean | undefined> = {}) {
  const query = new URLSearchParams({ action });
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== false) query.set(key, String(value));
  });
  const response = await fetch(`/api/pokemon-admin?${query}`, { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw actionError(payload.error, `Erreur HTTP ${response.status}`);
  return payload.data;
}

async function apiPost(action: string, body: Record<string, unknown> = {}) {
  const response = await fetch("/api/pokemon-admin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, ...body }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw actionError(payload.error, `Erreur HTTP ${response.status}`);
  return payload.data;
}

function unwrapList<T>(upstream: { data?: T[]; meta?: ListMeta } | null | undefined) {
  return { items: upstream?.data || [], meta: upstream?.meta || { page: 1, limit: 24, total: 0, pages: 1 } };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DesignSystemField className="grid gap-1.5" label={label}>
      {children}
    </DesignSystemField>
  );
}

function Stat({ label, value, tone = "cyan", onClick }: { label: string; value: number; tone?: "cyan" | "violet" | "green" | "amber" | "red"; onClick?: () => void }) {
  const tones = {
    cyan: "border-brand-2/25 bg-brand-2/10 text-cyan-100",
    violet: "border-brand/25 bg-brand/10 text-violet-100",
    green: "border-brand-3/25 bg-brand-3/10 text-emerald-100",
    amber: "border-warning/30 bg-warning/10 text-amber-100",
    red: "border-danger/30 bg-danger/10 text-rose-100",
  };
  const Component = onClick ? "button" : "div";
  return (
    <Component type={onClick ? "button" : undefined} onClick={onClick} className={cn("rounded-xl border p-3 text-left", tones[tone], onClick && "transition hover:-translate-y-0.5 hover:brightness-110")}>
      <span className="block type-overline-compact opacity-70">{label}</span>
      <strong className="mt-1 block font-mono text-2xl">{value.toLocaleString("fr-FR")}</strong>
    </Component>
  );
}

const conflictCauseLabels: Record<string, string> = {
  "doublon-reel-inventaire-local": "Doublon réel dans l’inventaire local",
  "index-mongodb-ancien-ou-incoherent": "Document MongoDB ancien ou index incohérent",
  "collision-cle-identite": "Collision de clé d’identité",
  "collision-forme-ou-document-mongodb-ancien": "Collision de forme ou document MongoDB ancien",
  "document-mongodb-ancien-ambigu": "Document MongoDB ancien ambigu",
  "collision-forme-ou-normalisation-trop-large": "Collision de forme ou normalisation trop large",
};

function IdentityConflictSubjectView({ label, subject }: { label: string; subject?: IdentityConflictSubject | null }) {
  if (!subject) return null;
  const files = [...new Set([...(subject.candidateFiles || []), subject.sourceFile, subject.pokemonSourceFile, subject.assetsRef].filter(Boolean))] as string[];
  return (
    <section className="min-w-0 rounded-lg border border-line bg-surface-inset p-3">
      <p className="type-overline-compact text-muted">{label}</p>
      <p className="mt-2 break-all font-mono text-sm font-black text-cyan-100">{subject.canonicalId || "Canonical ID absent"}</p>
      <dl className="mt-2 grid gap-x-3 gap-y-2 text-xs sm:grid-cols-2">
        <div><dt className="text-muted">Identity key</dt><dd className="break-all font-mono text-foreground">{subject.identityKey || "—"}</dd></div>
        <div><dt className="text-muted">Pokédex</dt><dd className="font-bold text-foreground">{subject.pokemonId ? `#${subject.pokemonId}` : "—"}</dd></div>
        <div><dt className="text-muted">Forme / formId</dt><dd className="break-all font-mono text-foreground">{subject.form || "—"} / {subject.formId || "—"}</dd></div>
        <div><dt className="text-muted">Costume / transformation</dt><dd className="break-all font-mono text-foreground">{subject.costume || "—"} / {subject.transformation || "—"}</dd></div>
      </dl>
      {files.length ? <div className="mt-3"><p className="type-overline-compact text-muted">Fichiers et assets candidats</p><ul className="mt-1 space-y-1">{files.map((file) => <li key={file} className="break-all font-mono text-xs text-foreground">{file}</li>)}</ul></div> : null}
      {subject.aliases?.length ? <div className="mt-3"><p className="type-overline-compact text-muted">Alias MongoDB préservés</p><ul className="mt-1 space-y-1">{subject.aliases.map((alias, index) => <li key={`${alias.provider}-${alias.value}-${index}`} className="break-all text-xs text-foreground"><strong>{alias.provider || "provider inconnu"}</strong> · {alias.value || "valeur absente"} · {alias.status || "statut inconnu"}</li>)}</ul></div> : null}
    </section>
  );
}

function IdentitySyncConflictCard({ conflict, index }: { conflict: IdentitySyncConflict; index: number }) {
  const cause = conflict.cause ? conflictCauseLabels[conflict.cause] || conflict.cause : "Cause à confirmer par examen manuel";
  const localCandidate = conflict.localCandidate || { canonicalId: conflict.canonicalId, identityKey: conflict.identityKey };
  return (
    <article className="rounded-xl border border-danger/35 bg-danger/10 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="red">Conflit {index + 1}</Badge>
        <code className="break-all type-caption-strong text-rose-100">{conflict.code || "IDENTITY_SYNC_CONFLICT"}</code>
      </div>
      <h4 className="mt-2 font-black text-rose-50">{cause}</h4>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <IdentityConflictSubjectView label="Candidat local" subject={localCandidate} />
        <IdentityConflictSubjectView label="Document MongoDB concerné" subject={conflict.existingIdentity} />
        <IdentityConflictSubjectView label="Document déjà revendiqué par" subject={conflict.claimedBy} />
        {(conflict.existingCandidates || []).map((candidate, candidateIndex) => <IdentityConflictSubjectView key={`${candidate.identityId || candidate.canonicalId}-${candidateIndex}`} label={`Candidat MongoDB ${candidateIndex + 1}`} subject={candidate} />)}
      </div>
      {conflict.existingCanonicalIds?.length ? <p className="mt-3 break-all text-xs text-rose-100">Canonical IDs MongoDB candidats : <span className="font-mono">{conflict.existingCanonicalIds.join(", ")}</span></p> : null}
      <div className="mt-3 rounded-lg border border-warning/35 bg-warning/10 p-3 text-sm text-amber-50">
        <p className="font-black">Résolution recommandée</p>
        <p className="mt-1">{conflict.resolution?.recommendation || "Comparer les IDs, formes, fichiers et alias avant toute correction explicite."}</p>
        <p className="mt-2 type-caption-strong text-amber-100">Aucune sélection et aucune suppression MongoDB automatiques.</p>
      </div>
    </article>
  );
}

export function IdentityManagerPanel() {
  const { combineWith } = useAdminPokemonSearch();
  const [view, setView] = useState<"identities" | "diagnostics">("identities");
  const [identities, setIdentities] = useState<PokemonIdentity[]>([]);
  const [meta, setMeta] = useState<ListMeta>({ page: 1, limit: 24, total: 0, pages: 1 });
  const [diagnostics, setDiagnostics] = useState<IdentityDiagnostic[]>([]);
  const [diagnosticMeta, setDiagnosticMeta] = useState<ListMeta>({ page: 1, limit: 24, total: 0, pages: 1 });
  const [diagnosticSummary, setDiagnosticSummary] = useState<DiagnosticSummary | null>(null);
  const [conflicts, setConflicts] = useState<{ aliasConflicts?: unknown[]; explicitConflicts?: number; incomplete?: number }>({});
  const [managedProviders, setManagedProviders] = useState<ManagedProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState("");
  const busy = Boolean(busyAction);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", provider: "", status: "", syncStatus: "", pokemonId: "", form: "", costume: "", conflict: false, withoutGameMaster: false, stale: false, sort: "updatedAt", order: "desc", page: 1 });
  const [diagnosticFilters, setDiagnosticFilters] = useState({ provider: "", reason: "", code: "", severity: "", status: "open", pokemonId: "", form: "", costume: "", confidence: "", page: 1 });
  const [identityModal, setIdentityModal] = useState<{ open: boolean; identity?: PokemonIdentity; diagnostic?: IdentityDiagnostic }>({ open: false });
  const [identityForm, setIdentityForm] = useState<IdentityForm>(emptyIdentityForm);
  const [aliasModal, setAliasModal] = useState<{ open: boolean; identity?: PokemonIdentity; alias?: ProviderAlias }>({ open: false });
  const [aliasForm, setAliasForm] = useState<AliasForm>(emptyAliasForm);
  const [aliasProviderSelection, setAliasProviderSelection] = useState(emptyAliasForm.provider);
  const [historyModal, setHistoryModal] = useState<{ open: boolean; identity?: PokemonIdentity; items: Array<Record<string, unknown>> }>({ open: false, items: [] });
  const [mergeModal, setMergeModal] = useState<{ open: boolean; identity?: PokemonIdentity; targetId: string; reason: string }>({ open: false, targetId: "", reason: "" });
  const [deprecateModal, setDeprecateModal] = useState<{ open: boolean; identity?: PokemonIdentity; reason: string }>({ open: false, reason: "" });
  const [importModal, setImportModal] = useState(false);
  const [importIdentities, setImportIdentities] = useState<unknown[]>([]);
  const [importReport, setImportReport] = useState<ImportReport | null>(null);
  const [associateModal, setAssociateModal] = useState<{ open: boolean; diagnostic?: IdentityDiagnostic }>({ open: false });
  const [associateSearch, setAssociateSearch] = useState("");
  const [associateCandidates, setAssociateCandidates] = useState<PokemonIdentity[]>([]);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncReport, setSyncReport] = useState<IdentitySyncReport | null>(null);
  const effectiveIdentitySearch = combineWith(filters.search);

  const providers = useMemo(() => managedProviders.length
    ? managedProviders.map((provider) => ({ provider: provider.id, count: provider.aliases, label: provider.label }))
    : meta.stats?.providers || [], [managedProviders, meta.stats?.providers]);
  const aliasProviderOptions = useMemo(() => {
    const names = new Set(
      managedProviders
        .map((entry) => entry.id.trim())
        .filter(Boolean),
    );
    names.add(emptyAliasForm.provider);
    return [...names].sort((left, right) => left.localeCompare(right, "fr"));
  }, [managedProviders]);
  const activeCount = Number(meta.stats?.statuses?.active || 0);
  const conflictCount = Number(conflicts.explicitConflicts || 0) + Number(conflicts.aliasConflicts?.length || 0);
  const localFieldsLocked = Boolean(identityModal.identity?.localIdentity && identityModal.identity.syncStatus === "synchronized");
  const syncState = syncReport?.synchronization?.state
    || (syncReport?.conflict ? "CONFLICT" : syncReport?.create || syncReport?.update ? "CHANGES_REQUIRED" : "SYNCED");
  const syncHasChanges = syncState === "CHANGES_REQUIRED";
  const associateAlias = associateModal.diagnostic ? diagnosticAliasValue(associateModal.diagnostic) : "";

  const loadSyncPreview = useCallback(async (notify = false) => {
    setSyncLoading(true);
    try {
      const upstream = await apiGet("identity-manager-sync-preview");
      const report = upstream?.data as IdentitySyncReport;
      setSyncReport(report);
      if (notify) toast.success("Inventaire PokemonGo-Data vérifié sans écriture.");
      return report;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Aperçu de synchronisation indisponible.";
      if (notify) toast.error(message);
      return null;
    } finally {
      setSyncLoading(false);
    }
  }, []);

  const loadIdentities = useCallback(async (notify = false) => {
    setLoading(true);
    setError("");
    try {
      const [identityUpstream, conflictUpstream, providerUpstream] = await Promise.all([
        apiGet("identity-manager", { ...filters, search: effectiveIdentitySearch, limit: 24 }),
        apiGet("identity-manager-conflicts"),
        apiGet("identity-manager-providers"),
      ]);
      const result = unwrapList<PokemonIdentity>(identityUpstream);
      setIdentities(result.items);
      setMeta(result.meta);
      setConflicts(conflictUpstream?.data || {});
      setManagedProviders(providerUpstream?.data || []);
      if (notify) toast.success("Catalogue d’identités actualisé.");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Identity Manager indisponible.";
      setError(message);
      if (notify) toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [effectiveIdentitySearch, filters]);

  const loadDiagnostics = useCallback(async (notify = false) => {
    setLoading(true);
    setError("");
    try {
      const [upstream, summaryUpstream] = await Promise.all([
        apiGet("identity-manager-diagnostics", { ...diagnosticFilters, limit: 24 }),
        apiGet("identity-manager-diagnostics-summary"),
      ]);
      const result = unwrapList<IdentityDiagnostic>(upstream);
      setDiagnostics(result.items);
      setDiagnosticMeta(result.meta);
      setDiagnosticSummary(summaryUpstream?.data || null);
      if (notify) toast.success("Diagnostics actualisés.");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Diagnostics indisponibles.";
      setError(message);
      if (notify) toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [diagnosticFilters]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (view === "identities") void loadIdentities();
      else void loadDiagnostics();
    }, 250);
    return () => window.clearTimeout(timer);
  }, [loadDiagnostics, loadIdentities, view]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadSyncPreview(), 0);
    return () => window.clearTimeout(timer);
  }, [loadSyncPreview]);

  useEffect(() => {
    if (!associateModal.open) return;
    const timer = window.setTimeout(async () => {
      try {
        const upstream = await apiGet("identity-manager", { search: associateSearch, status: "active", page: 1, limit: 12 });
        setAssociateCandidates(unwrapList<PokemonIdentity>(upstream).items);
      } catch {
        setAssociateCandidates([]);
      }
    }, 200);
    return () => window.clearTimeout(timer);
  }, [associateModal.open, associateSearch]);

  function updateFilter(key: string, value: string | boolean | number) {
    setFilters((current) => ({ ...current, [key]: value, page: key === "page" ? Number(value) : 1 }));
  }

  function updateDiagnosticFilter(key: string, value: string | number) {
    setDiagnosticFilters((current) => ({ ...current, [key]: value, page: key === "page" ? Number(value) : 1 }));
  }

  function openCreate(diagnostic?: IdentityDiagnostic) {
    const canonicalSuggestion = [diagnostic?.pokemon, diagnostic?.form, diagnostic?.costume].filter(Boolean).join("_").toUpperCase().replace(/[^A-Z0-9]+/g, "_");
    setIdentityForm({ ...emptyIdentityForm, canonicalId: canonicalSuggestion, pokemonId: diagnostic?.pokemonId ? String(diagnostic.pokemonId) : "", form: diagnostic?.form || "", costume: diagnostic?.costume || "", status: "draft" });
    setIdentityModal({ open: true, diagnostic });
  }

  function openEdit(identity: PokemonIdentity) {
    setIdentityForm({
      canonicalId: identity.canonicalId,
      pokemonId: String(identity.pokemonId),
      form: identity.form || "",
      costume: identity.costume || "",
      status: identity.status,
      male: Boolean(identity.genderVariants?.male),
      female: Boolean(identity.genderVariants?.female),
      notes: identity.metadata?.notes || "",
    });
    setIdentityModal({ open: true, identity });
  }

  function openAlias(identity: PokemonIdentity, alias?: ProviderAlias) {
    const form = alias ? { provider: alias.provider, value: alias.value, status: alias.status, confidence: String(alias.confidence), reason: alias.reason || "" } : emptyAliasForm;
    setAliasForm(form);
    setAliasProviderSelection(form.provider);
    setAliasModal({ open: true, identity, alias });
  }

  async function resolveDiagnostic(diagnostic: IdentityDiagnostic, identity: PokemonIdentity) {
    const alias = diagnosticAliasValue(diagnostic);
    await apiPost("identity-manager-alias-create", {
      identityId: identityId(identity),
      payload: { provider: diagnostic.provider, value: alias, status: "active", confidence: 1, source: "manual", reason: `Résolu depuis le diagnostic ${diagnosticId(diagnostic)} (source : ${diagnostic.rawAlias})` },
    });
    await apiPost("identity-manager-diagnostic-update", { diagnosticId: diagnosticId(diagnostic), payload: { status: "resolved", identityId: identityId(identity) } });
  }

  async function saveIdentity() {
    if (!identityForm.canonicalId || !identityForm.pokemonId) return toast.error("Canonical ID et numéro Pokédex sont requis.");
    setBusyAction("save-identity");
    try {
      const action = identityModal.identity ? "identity-manager-update" : "identity-manager-create";
      const upstream = await apiPost(action, { identityId: identityModal.identity ? identityId(identityModal.identity) : undefined, payload: identityPayload(identityForm) });
      const saved = upstream?.data as PokemonIdentity;
      if (identityModal.diagnostic && saved) await resolveDiagnostic(identityModal.diagnostic, saved);
      toast.success(identityModal.identity ? "Identité mise à jour." : "Identité créée.");
      setIdentityModal({ open: false });
      if (view === "diagnostics") await loadDiagnostics(); else await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Impossible d’enregistrer l’identité.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function saveAlias() {
    if (!aliasModal.identity || !aliasForm.provider || !aliasForm.value) return toast.error("Provider et alias sont requis.");
    setBusyAction("save-alias");
    try {
      await apiPost(aliasModal.alias ? "identity-manager-alias-update" : "identity-manager-alias-create", {
        identityId: identityId(aliasModal.identity),
        aliasId: aliasModal.alias?.aliasId,
        payload: aliasPayload(aliasForm),
      });
      toast.success(aliasModal.alias ? "Alias mis à jour." : "Alias ajouté.");
      setAliasModal({ open: false });
      await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Impossible d’enregistrer l’alias.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function restoreIdentity(identity: PokemonIdentity) {
    setBusyAction(`restore:${identityId(identity)}`);
    try {
      await apiPost("identity-manager-restore", { identityId: identityId(identity) });
      toast.success(`${identity.canonicalId} restaurée.`);
      await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Changement de statut impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function deprecateIdentity() {
    if (!deprecateModal.identity || !deprecateModal.reason.trim()) return toast.error("Le motif de dépréciation est obligatoire.");
    setBusyAction("deprecate");
    try {
      await apiPost("identity-manager-deprecate", { identityId: identityId(deprecateModal.identity), reason: deprecateModal.reason });
      toast.success(`${deprecateModal.identity.canonicalId} dépréciée sans suppression.`);
      setDeprecateModal({ open: false, reason: "" });
      await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Dépréciation impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function openHistory(identity: PokemonIdentity) {
    setHistoryModal({ open: true, identity, items: [] });
    try {
      const upstream = await apiGet("identity-manager-history", { identityId: identityId(identity), page: 1, limit: 100 });
      setHistoryModal({ open: true, identity, items: upstream?.data || [] });
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Historique indisponible.").message);
    }
  }

  async function openGlobalHistory() {
    setHistoryModal({ open: true, items: [] });
    try {
      const upstream = await apiGet("identity-manager-history", { page: 1, limit: 100 });
      setHistoryModal({ open: true, items: upstream?.data || [] });
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Historique indisponible.").message);
    }
  }

  async function mergeIdentity() {
    if (!mergeModal.identity || !mergeModal.targetId || !mergeModal.reason.trim()) return toast.error("Identité cible et motif requis.");
    setBusyAction("merge");
    try {
      await apiPost("identity-manager-merge", { identityId: identityId(mergeModal.identity), targetId: mergeModal.targetId, reason: mergeModal.reason });
      toast.success("Identités fusionnées et source dépréciée.");
      setMergeModal({ open: false, targetId: "", reason: "" });
      await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Fusion impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function readImportFile(file?: File) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const entries = Array.isArray(parsed) ? parsed : parsed.identities;
      if (!Array.isArray(entries)) throw new Error("Le fichier doit contenir un tableau identities.");
      setImportIdentities(entries);
      const upstream = await apiPost("identity-manager-import", { payload: { mode: "preview", identities: entries } });
      setImportReport(upstream?.data || null);
    } catch (caught) {
      setImportReport(null);
      toast.error(normalizeActionError(caught, "Import invalide.").message);
    }
  }

  async function applyImport() {
    if (!importReport || importReport.conflicts.length || importReport.duplicates.length || importReport.invalid.length) return;
    setBusyAction("import");
    try {
      const upstream = await apiPost("identity-manager-import", { payload: { mode: "apply", identities: importIdentities } });
      setImportReport(upstream?.data || null);
      toast.success("Import contrôlé appliqué.");
      await loadIdentities();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Import impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function updateDiagnostic(diagnostic: IdentityDiagnostic, status: "ignored" | "false-positive") {
    setBusyAction(`diagnostic:${status}:${diagnosticId(diagnostic)}`);
    try {
      await apiPost("identity-manager-diagnostic-update", { diagnosticId: diagnosticId(diagnostic), payload: { status } });
      toast.success(status === "ignored" ? "Alias ignoré avec traçabilité." : "Diagnostic marqué comme faux positif.");
      await loadDiagnostics();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Diagnostic non modifié.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function reconcileDiagnostics() {
    setBusyAction("reconcile-diagnostics");
    try {
      const upstream = await apiPost("identity-manager-diagnostics-reconcile");
      const report = upstream?.data || {};
      toast.success(`${Number(report.modified || 0).toLocaleString("fr-FR")} diagnostic(s) réconcilié(s) avec les alias actifs.`);
      await Promise.all([loadDiagnostics(), loadIdentities()]);
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Réconciliation des diagnostics impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function associate(identity: PokemonIdentity) {
    if (!associateModal.diagnostic) return;
    setBusyAction(`associate:${identityId(identity)}`);
    try {
      await resolveDiagnostic(associateModal.diagnostic, identity);
      toast.success(`Alias ${diagnosticAliasValue(associateModal.diagnostic)} associé à ${identity.canonicalId}.`);
      setAssociateModal({ open: false });
      await loadDiagnostics();
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Association impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  async function openSyncPreview() {
    setSyncModalOpen(true);
    await loadSyncPreview(true);
  }

  async function applyLocalSync() {
    if (!syncReport || syncState === "CONFLICT" || !syncHasChanges) return;
    setBusyAction("sync");
    try {
      const upstream = await apiPost("identity-manager-sync-apply");
      const report = upstream?.data as IdentitySyncReport;
      setSyncReport(report);
      toast.success(`Synchronisation appliquée : ${report.create} création(s), ${report.update} mise(s) à jour, ${report.orphanUpdate || 0} orphelin(s) marqué(s).`);
      await Promise.all([loadIdentities(), loadSyncPreview()]);
    } catch (caught) {
      toast.error(normalizeActionError(caught, "Synchronisation locale impossible.").message);
    } finally {
      setBusyAction("");
    }
  }

  function downloadDiagnostics() {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), filters: diagnosticFilters, diagnostics }, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `pokemon-identity-diagnostics-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <section className="space-y-5" aria-labelledby="identity-manager-title">
      <header className="rounded-2xl border border-brand-2/25 bg-[linear-gradient(135deg,rgba(14,165,233,.13),rgba(139,92,246,.1),rgba(2,6,23,.8))] p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="type-overline text-cyan-200/75">Catalogue local PokemonGo-Data · MongoDB privé</p>
            <h2 id="identity-manager-title" className="mt-1 flex items-center gap-3 type-title-section"><Fingerprint className="text-cyan-200" /> Identity Manager</h2>
            <p className="mt-2 max-w-3xl type-body-strong text-muted">Associez chaque identifiant fournisseur à une identité PokemonGo-Data unique, sans altérer sa valeur originale.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="primary" icon={<PackageCheck size={15} />} loading={syncLoading} loadingText="Vérification…" onClick={() => void openSyncPreview()}>Synchroniser le catalogue</Button>
            <Button size="sm" variant="ghost" icon={<History size={15} />} onClick={() => void openGlobalHistory()}>Historique global</Button>
            <Button size="sm" variant="secondary" icon={<Download size={15} />} onClick={() => { window.location.href = "/api/pokemon-admin?action=identity-manager-export"; }}>JSON</Button>
            <Button size="sm" variant="secondary" icon={<FileUp size={15} />} onClick={() => setImportModal(true)}>Importer</Button>
            <Button size="sm" variant="primary" icon={<Plus size={15} />} onClick={() => openCreate()}>Nouvelle identité</Button>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Stat label="Identités" value={meta.total} />
          <Stat label="Actives" value={activeCount} tone="green" />
          <Stat label="Providers" value={providers.length} tone="violet" />
          <Stat label="Conflits" value={conflictCount} tone="red" onClick={() => { setView("identities"); updateFilter("conflict", true); }} />
          <Stat label="Sans Game Master" value={Number(conflicts.incomplete || 0)} tone="amber" onClick={() => { setView("identities"); updateFilter("withoutGameMaster", true); }} />
        </div>
        {managedProviders.length ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Providers gérés par l’Identity Manager">
            {managedProviders.map((provider) => (
              <button className="min-w-[12rem] rounded-xl border border-line bg-surface-faint p-3 text-left transition hover:border-cyan-200/35" type="button" key={provider.id} onClick={() => { setView("identities"); updateFilter("provider", provider.id); }}>
                <span className="block truncate type-label text-domain-foreground">{provider.label}</span>
                <span className="mt-1 block text-[10px] font-bold text-muted">{provider.activeAliases} alias actifs · {provider.openDiagnostics} diagnostics</span>
              </button>
            ))}
          </div>
        ) : null}
        {syncReport ? (
          <button type="button" className={cn("mt-3 flex w-full flex-wrap items-center gap-2 rounded-xl border p-3 text-left text-sm font-bold transition hover:brightness-110", syncState === "CONFLICT" ? "border-danger/35 bg-danger/10 text-rose-100" : syncState === "CHANGES_REQUIRED" ? "border-warning/35 bg-warning/10 text-amber-100" : "border-brand-3/30 bg-brand-3/10 text-emerald-100")} onClick={() => setSyncModalOpen(true)}>
            <Database size={17} />
            <span>{syncReport.inventory.total.toLocaleString("fr-FR")} identités locales</span>
            <Badge tone={syncState === "CONFLICT" ? "red" : syncState === "CHANGES_REQUIRED" ? "amber" : "green"}>{syncState === "CONFLICT" ? `${syncReport.conflict} conflit(s)` : syncState === "CHANGES_REQUIRED" ? "Synchronisation requise" : "Synchronisé"}</Badge>
            <span className="ml-auto text-xs opacity-80">Empreinte {syncReport.inventory.fingerprint.slice(0, 12)} · Mewtwo Armored {syncReport.mewtwoArmored === "present" ? "présent" : "absent"}</span>
          </button>
        ) : null}
      </header>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-panel/55 p-2">
        <Button size="sm" variant={view === "identities" ? "primary" : "ghost"} icon={<Fingerprint size={15} />} onClick={() => setView("identities")}>Identités</Button>
        <Button size="sm" variant={view === "diagnostics" ? "primary" : "ghost"} icon={<ShieldAlert size={15} />} onClick={() => setView("diagnostics")}>Diagnostics détaillés <Badge tone={(diagnosticSummary?.totals.open || managedProviders.reduce((total, provider) => total + provider.openDiagnostics, 0)) ? "amber" : "neutral"}>{diagnosticSummary?.totals.open ?? managedProviders.reduce((total, provider) => total + provider.openDiagnostics, 0)}</Badge></Button>
        <Button className="ml-auto" size="sm" variant="ghost" icon={<RefreshCcw size={15} />} loading={loading} loadingText="Actualisation…" onClick={() => view === "identities" ? void loadIdentities(true) : void loadDiagnostics(true)}>Actualiser</Button>
      </div>

      {view === "identities" ? (
        <>
          <div className="grid gap-3 rounded-xl border border-line bg-panel/55 p-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="relative md:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} />
              <Input aria-label="Rechercher une identité par Canonical ID ou alias" className="pl-10" placeholder="Canonical ID ou alias…" value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} />
            </label>
            <Select aria-label="Provider" value={filters.provider} onChange={(event) => updateFilter("provider", event.target.value)}>
              <option value="">Tous les providers</option>
              {providers.map((provider) => <option key={provider.provider} value={provider.provider}>{"label" in provider && typeof provider.label === "string" ? provider.label : provider.provider} ({provider.count})</option>)}
            </Select>
            <Select aria-label="Statut" value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
              <option value="">Tous les statuts</option>
              {(["active", "draft", "deprecated", "ignored"] as const).map((status) => <option key={status}>{status}</option>)}
            </Select>
            <Select aria-label="État de synchronisation" value={filters.syncStatus} onChange={(event) => updateFilter("syncStatus", event.target.value)}>
              <option value="">Tous les états de synchronisation</option>
              {(["synchronized", "orphaned", "draft", "conflict"] as const).map((status) => <option key={status}>{status}</option>)}
            </Select>
            <Input aria-label="Filtrer par numéro Pokédex" inputMode="numeric" placeholder="N° Pokédex" value={filters.pokemonId} onChange={(event) => updateFilter("pokemonId", event.target.value)} />
            <Input aria-label="Filtrer par forme" placeholder="Forme" value={filters.form} onChange={(event) => updateFilter("form", event.target.value)} />
            <Input aria-label="Filtrer par costume" placeholder="Costume" value={filters.costume} onChange={(event) => updateFilter("costume", event.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Select aria-label="Trier" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}><option value="updatedAt">Modification</option><option value="canonicalId">Canonical ID</option><option value="pokemonId">Pokédex</option><option value="status">Statut</option><option value="syncStatus">Synchronisation</option></Select>
              <Select aria-label="Ordre" value={filters.order} onChange={(event) => updateFilter("order", event.target.value)}><option value="desc">Décroissant</option><option value="asc">Croissant</option></Select>
            </div>
            <div className="flex flex-wrap gap-2 md:col-span-2 xl:col-span-4">
              <Button size="sm" variant={filters.conflict ? "danger" : "secondary"} icon={<AlertTriangle size={14} />} onClick={() => updateFilter("conflict", !filters.conflict)}>Avec conflit</Button>
              <Button size="sm" variant={filters.withoutGameMaster ? "primary" : "secondary"} icon={<Link2 size={14} />} onClick={() => updateFilter("withoutGameMaster", !filters.withoutGameMaster)}>Sans alias Game Master</Button>
              <Button size="sm" variant={filters.stale ? "primary" : "secondary"} icon={<Clock3 size={14} />} onClick={() => updateFilter("stale", !filters.stale)}>Non utilisé récemment</Button>
              <Button size="sm" variant="ghost" icon={<RotateCcw size={14} />} onClick={() => setFilters({ search: "", provider: "", status: "", syncStatus: "", pokemonId: "", form: "", costume: "", conflict: false, withoutGameMaster: false, stale: false, sort: "updatedAt", order: "desc", page: 1 })}>Réinitialiser</Button>
            </div>
          </div>

          {error ? <ErrorState title="Catalogue indisponible" message={error} /> : null}
          {loading ? <FetchLoadingState title="Chargement du catalogue…" /> : null}
          {!loading && !identities.length ? <EmptyState size="section" title="Aucune identité ne correspond aux filtres" /> : null}
          <div className="grid min-w-0 gap-4 xl:grid-cols-2">
            {identities.map((identity) => {
              const previewAsset = localPreviewAsset(identity);
              const assetBundle = localAssetBundle(identity);
              const types = identityTypes(identity);
              return (
              <article key={identityId(identity)} className={cardClass} style={identityCardStyle(types)}>
                <div className="grid min-w-0 grid-cols-[6rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[7rem_minmax(0,1fr)_auto]">
                    <div className="h-24 w-24 shrink-0 rounded-xl border border-line bg-slate-950/60 bg-contain bg-center bg-no-repeat sm:h-28 sm:w-28" style={previewAsset ? { backgroundImage: `url(${JSON.stringify(previewAsset).slice(1, -1)})` } : undefined} role="img" aria-label={previewAsset ? `Asset local de ${identity.localIdentity?.pokemonName || identity.canonicalId}` : "Asset local absent"}>
                      {!previewAsset ? <span className="grid h-full place-items-center text-[10px] font-black uppercase text-muted">Absent</span> : null}
                    </div>
                    <div className="min-w-0">
                    <strong className="block [overflow-wrap:anywhere] font-mono text-lg text-cyan-100">{identity.canonicalId}</strong>
                    <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2"><Badge tone={statusTone(identity.status)}>{identity.status}</Badge>{identity.syncStatus ? <Badge tone={statusTone(identity.syncStatus)}>{identity.syncStatus}</Badge> : null}</div>
                    <p className="mt-1 text-base font-black text-foreground">{identity.localIdentity?.pokemonName || `Pokémon #${identity.pokemonId}`}</p>
                    <p className="mt-1 text-sm font-bold text-muted">#{String(identity.pokemonId).padStart(4, "0")} · {identity.form || "forme normale"} · {identity.costume || "sans costume"}{identity.transformation ? ` · ${identity.transformation}` : ""}</p>
                    <p className="mt-1 type-caption text-muted">Genre disponible : {identity.genderVariants?.male ? "mâle" : "—"} / {identity.genderVariants?.female ? "femelle" : "—"}</p>
                    {types.length ? <div className="mt-2 flex flex-wrap gap-1.5">{types.map((type) => <span key={type} className="rounded-full border border-line-medium px-2 py-1 type-overline-compact text-domain-foreground" style={{ backgroundColor: `color-mix(in srgb, ${typeColors[type] || typeColors.NORMAL} 48%, rgba(2,6,23,.75))` }}>{typeLabels[type] || type}</span>)}</div> : null}
                    </div>
                  <span className="col-span-2 type-caption text-muted sm:col-span-1 sm:whitespace-nowrap">MAJ {formatDate(identity.updatedAt)}</span>
                </div>
                <div className="mt-4 grid gap-2 rounded-lg border border-brand-2/20 bg-brand-2/[0.055] p-3 text-xs sm:grid-cols-2">
                  <p className="min-w-0"><span className="font-black uppercase tracking-[0.12em] text-cyan-200/65">Identité locale</span><br /><code className="break-all text-foreground">{identity.localIdentity?.identityKey || "Non reliée à PokemonGo-Data"}</code></p>
                  <p className="min-w-0"><span className="font-black uppercase tracking-[0.12em] text-cyan-200/65">Asset bundle</span><br /><code className={cn("break-all", assetBundle ? "text-foreground" : "text-amber-100")}>{assetBundle || "Aucun asset bundle déclaré"}</code></p>
                  <p className="min-w-0"><span className="font-black uppercase tracking-[0.12em] text-cyan-200/65">Source locale</span><br /><code className="break-all text-foreground">{identity.localIdentity?.sourceFile || "Non disponible"}</code></p>
                  <p><span className="font-black uppercase tracking-[0.12em] text-cyan-200/65">Assets sexués</span><br /><strong>{identity.localIdentity?.genderAssets?.length || 0} variante(s) · validé {formatDate(identity.localIdentity?.lastValidatedAt)}</strong></p>
                </div>
                {identity.localIdentity?.issues?.length ? <p className="mt-2 rounded-lg border border-warning/30 bg-warning/10 p-2 type-caption-strong text-amber-100">{identity.localIdentity.issues.join(" · ")}</p> : null}
                <div className="mt-4 space-y-2">
                  {identity.aliases.length ? identity.aliases.map((alias) => (
                    <button key={alias.aliasId} type="button" className="flex w-full min-w-0 flex-col gap-2 rounded-lg border border-line bg-surface-faint p-2.5 text-left transition hover:border-brand-2/35 sm:flex-row sm:items-center" onClick={() => openAlias(identity, alias)}>
                      <span className="flex w-full min-w-0 items-center gap-2 sm:flex-1"><Badge tone="violet">{alias.provider}</Badge><span className="min-w-0 flex-1 truncate font-mono text-sm font-bold">{alias.value}</span></span>
                      <span className="flex items-center gap-2"><Badge tone={statusTone(alias.status)}>{alias.status}</Badge><span className="type-label text-muted">{Math.round(alias.confidence * 100)}%</span></span>
                    </button>
                  )) : <p className="rounded-lg border border-dashed border-warning/35 bg-warning/5 p-3 text-sm font-bold text-amber-100">Aucun alias fournisseur.</p>}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <Button className="w-full sm:w-auto" size="sm" variant="primary" icon={<Link2 size={14} />} onClick={() => openAlias(identity)}>Alias</Button>
                  <Button className="w-full sm:w-auto" size="sm" variant="secondary" onClick={() => openEdit(identity)}>Modifier</Button>
                  <Button className="w-full sm:w-auto" size="sm" variant="ghost" icon={<History size={14} />} onClick={() => void openHistory(identity)}>Historique</Button>
                  <Button className="w-full sm:w-auto" size="sm" variant="ghost" icon={<ArrowLeftRight size={14} />} onClick={() => setMergeModal({ open: true, identity, targetId: "", reason: "" })}>Fusionner</Button>
                  <Button className="col-span-2 w-full sm:w-auto" size="sm" variant={identity.status === "deprecated" ? "secondary" : "danger"} icon={identity.status === "deprecated" ? <RotateCcw size={14} /> : <Trash2 size={14} />} loading={busyAction === `restore:${identityId(identity)}`} loadingText="Restauration…" disabled={busy} onClick={() => identity.status === "deprecated" ? void restoreIdentity(identity) : setDeprecateModal({ open: true, identity, reason: "" })}>{identity.status === "deprecated" ? "Restaurer" : "Déprécier"}</Button>
                </div>
              </article>
              );
            })}
          </div>
          <Pagination meta={meta} onPage={(page) => updateFilter("page", page)} />
        </>
      ) : (
        <>
          {diagnosticSummary ? (
            <section className="space-y-4 rounded-xl border border-brand-2/25 bg-panel/65 p-4" aria-labelledby="diagnostic-summary-title">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="type-overline text-cyan-200/75">Audit par fournisseur, code, sévérité et cause</p>
                  <h3 id="diagnostic-summary-title" className="mt-1 text-xl font-black text-foreground">Synthèse des diagnostics</h3>
                  <p className="mt-1 text-sm font-semibold text-muted">Les associations validées restent actives ; seules les alertes encore réellement actionnables demeurent ouvertes.</p>
                </div>
                <Button variant="primary" icon={<UserRoundCheck size={16} />} loading={busyAction === "reconcile-diagnostics"} loadingText="Réconciliation…" disabled={busy || !diagnosticSummary.totals.alreadyAssociated} onClick={() => void reconcileDiagnostics()}>
                  Réconcilier les alias validés ({diagnosticSummary.totals.alreadyAssociated})
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <Stat label="Ouverts" value={diagnosticSummary.totals.open} tone="amber" />
                <Stat label="Actionnables" value={diagnosticSummary.totals.actionable} tone="red" />
                <Stat label="Déjà associés" value={diagnosticSummary.totals.alreadyAssociated} tone="green" />
                <Stat label="Résolus" value={diagnosticSummary.totals.resolved} tone="green" />
                <Stat label="Alias actifs" value={diagnosticSummary.totals.activeAliases} tone="cyan" />
              </div>
              <div className="grid min-w-0 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
                {diagnosticSummary.providers.filter((provider) => provider.totalDiagnostics || provider.activeAliases).map((provider) => (
                  <article key={provider.id} className="min-w-0 rounded-xl border border-line bg-surface-inset p-3">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0"><p className="truncate font-black text-foreground">{provider.label}</p><code className="block truncate text-xs text-cyan-200/70">{provider.id}</code></div>
                      <Badge tone={provider.open ? "amber" : "green"}>{provider.open} ouvert(s)</Badge>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-muted">{provider.activeAliases} alias actifs · {provider.activeAliasesWithLocalPath} chemin(s) local(aux) vérifié(s) · {provider.resolved} résolu(s)</p>
                    <p className="mt-1 text-xs font-semibold text-muted">{provider.actionable} actionnable(s) · {provider.alreadyAssociated} déjà associé(s) · {provider.occurrences} occurrence(s)</p>
                    {provider.codes.length ? <div className="mt-3 space-y-1.5">{provider.codes.slice(0, 4).map((entry) => (
                      <button key={`${provider.id}-${entry.code}`} type="button" className="flex w-full min-w-0 items-center gap-2 rounded-lg border border-line bg-surface-faint px-2.5 py-2 text-left" onClick={() => { updateDiagnosticFilter("provider", provider.id); updateDiagnosticFilter("code", entry.code); }}>
                        <Badge tone={severityTone(entry.severity)}>{entry.severity}</Badge><code className="min-w-0 flex-1 truncate text-xs font-bold text-foreground">{entry.code}</code><strong>{entry.open}</strong>
                      </button>
                    ))}</div> : null}
                  </article>
                ))}
              </div>
              <p className={cn("rounded-lg border p-3 text-xs font-bold", diagnosticSummary.integrity.invalidResolvedIdentityReferences || diagnosticSummary.integrity.activeAliasesWithoutLocalPath ? "border-danger/30 bg-danger/10 text-rose-100" : "border-brand-3/30 bg-brand-3/10 text-emerald-100")}>Intégrité MongoDB : {diagnosticSummary.integrity.resolvedIdentityReferences} référence(s) résolue(s), {diagnosticSummary.integrity.invalidResolvedIdentityReferences} référence(s) invalide(s) · {diagnosticSummary.integrity.activeAliasesWithLocalPath}/{diagnosticSummary.integrity.activeAliases} alias actifs reliés à un chemin canonique.</p>
            </section>
          ) : null}
          <div className="grid gap-3 rounded-xl border border-line bg-panel/55 p-4 md:grid-cols-2 xl:grid-cols-4">
            <Select aria-label="Cause" value={diagnosticFilters.reason} onChange={(event) => updateDiagnosticFilter("reason", event.target.value)}>
              <option value="">Toutes les causes</option>
              {diagnosticReasonOptions.map((reason) => <option key={reason}>{reason}</option>)}
            </Select>
            <Select aria-label="Code diagnostic" value={diagnosticFilters.code} onChange={(event) => updateDiagnosticFilter("code", event.target.value)}>
              <option value="">Tous les codes</option>
              {[...new Set(diagnosticSummary?.providers.flatMap((provider) => provider.codes.map((entry) => entry.code)) || [])].sort().map((code) => <option key={code}>{code}</option>)}
            </Select>
            <Select aria-label="Sévérité" value={diagnosticFilters.severity} onChange={(event) => updateDiagnosticFilter("severity", event.target.value)}><option value="">Toutes les sévérités</option><option value="error">Erreur</option><option value="warning">Avertissement</option><option value="info">Information</option></Select>
            <Input aria-label="Filtrer les diagnostics par provider" placeholder="Provider" value={diagnosticFilters.provider} onChange={(event) => updateDiagnosticFilter("provider", event.target.value)} />
            <Select aria-label="Statut de traitement" value={diagnosticFilters.status} onChange={(event) => updateDiagnosticFilter("status", event.target.value)}><option value="">Tous les statuts</option><option value="open">Ouvert</option><option value="resolved">Résolu</option><option value="ignored">Ignoré</option><option value="false-positive">Faux positif</option></Select>
            <Input aria-label="Filtrer par confiance minimum" inputMode="decimal" placeholder="Confiance minimum (0-1)" value={diagnosticFilters.confidence} onChange={(event) => updateDiagnosticFilter("confidence", event.target.value)} />
            <Input aria-label="Filtrer les diagnostics par numéro Pokédex" inputMode="numeric" placeholder="N° Pokédex" value={diagnosticFilters.pokemonId} onChange={(event) => updateDiagnosticFilter("pokemonId", event.target.value)} />
            <Input aria-label="Filtrer les diagnostics par forme" placeholder="Forme" value={diagnosticFilters.form} onChange={(event) => updateDiagnosticFilter("form", event.target.value)} />
            <Input aria-label="Filtrer les diagnostics par costume" placeholder="Costume" value={diagnosticFilters.costume} onChange={(event) => updateDiagnosticFilter("costume", event.target.value)} />
            <Button variant="secondary" icon={<Download size={15} />} onClick={downloadDiagnostics}>Exporter le diagnostic</Button>
          </div>
          {error ? <ErrorState title="Diagnostics indisponibles" message={error} /> : null}
          {loading ? <FetchLoadingState title="Chargement des diagnostics…" /> : null}
          <div className="space-y-3">
            {diagnostics.map((diagnostic) => (
              <article key={diagnosticId(diagnostic)} className={cn(cardClass, diagnostic.status === "open" && "border-warning/30")}>
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,.7fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><Badge tone="violet">{diagnostic.provider}</Badge><Badge tone={severityTone(diagnostic.severity)}>{diagnostic.severity || "warning"}</Badge><Badge tone={statusTone(diagnostic.status)}>{diagnostic.status}</Badge><Badge tone="neutral">{diagnostic.code || diagnostic.reason}</Badge><Badge tone={diagnostic.confidence >= .8 ? "green" : diagnostic.confidence >= .5 ? "amber" : "red"}>{Math.round(diagnostic.confidence * 100)}% confiance</Badge></div>
                    <h3 className="mt-3 break-all font-mono text-lg font-black text-cyan-100">{diagnostic.rawAlias}</h3>
                    <p className="mt-1 break-all text-sm font-semibold text-muted">Alias normalisé : <code>{diagnostic.normalizedAlias}</code></p>
                    <p className="mt-1 break-all text-sm font-semibold text-muted">ID source : <code className={diagnostic.sourceId ? "text-foreground" : "text-amber-100"}>{diagnostic.sourceId || "non fourni"}</code></p>
                    <div className="mt-3 rounded-lg border border-warning/25 bg-warning/[0.07] p-3 text-sm"><p className="font-black text-amber-100">Pourquoi ce diagnostic ?</p><p className="mt-1 font-semibold text-muted">{diagnostic.reasonDetails || diagnostic.reason}</p></div>
                    <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3"><p><span className="text-muted">Pokémon</span><br /><strong>{diagnostic.pokemon || "Inconnu"} {diagnostic.pokemonId ? `#${diagnostic.pokemonId}` : ""}</strong></p><p><span className="text-muted">Forme</span><br /><strong>{diagnostic.form || "—"}</strong></p><p><span className="text-muted">Costume</span><br /><strong>{diagnostic.costume || "—"}</strong></p></div>
                    {diagnostic.action?.identity ? <div className="mt-3 rounded-lg border border-brand-3/30 bg-brand-3/10 p-3 text-sm"><p className="font-black text-emerald-100">Association active retrouvée</p><p className="mt-1 break-all font-mono text-foreground">{diagnostic.action.identity.canonicalId || diagnostic.action.identity.identityId}</p><p className="mt-1 break-all text-xs text-muted">Clé : {diagnostic.action.identity.identityKey || "—"} · Source locale : {diagnostic.action.identity.sourceFile || "—"}</p></div> : null}
                    {diagnostic.candidates?.length ? <details className="mt-3 rounded-lg border border-line bg-surface-faint p-3"><summary className="cursor-pointer font-bold">Examiner les {diagnostic.candidates.length} candidat(s)</summary><div className="mt-3 space-y-2">{diagnostic.candidates.map((candidate, index) => <div key={`${candidateLabel(candidate)}-${index}`} className="rounded-lg border border-line bg-surface-inset p-2"><p className="break-all font-mono text-xs font-black text-foreground">{candidateLabel(candidate)}</p><pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap text-[10px] text-muted">{JSON.stringify(candidate, null, 2)}</pre></div>)}</div></details> : null}
                  </div>
                  <div className="rounded-lg border border-line bg-white/[0.025] p-3 text-sm">
                    <p><span className="text-muted">Première détection</span><br /><strong>{formatDate(diagnostic.firstDetectedAt)}</strong></p>
                    <p className="mt-2"><span className="text-muted">Dernière détection</span><br /><strong>{formatDate(diagnostic.lastDetectedAt)}</strong></p>
                    <p className="mt-2"><span className="text-muted">Occurrences</span><br /><strong>{diagnostic.occurrences || 1}</strong></p>
                    <p className="mt-2"><span className="text-muted">Action attendue</span><br /><strong className={diagnostic.action?.required ? "text-amber-100" : "text-emerald-100"}>{diagnostic.action?.label || diagnostic.proposedAction || "Examiner et associer"}</strong></p>
                    <Badge className="mt-3" tone={diagnostic.action?.required ? "amber" : "green"}>{diagnostic.action?.required ? "Action nécessaire" : "Déjà traité"}</Badge>
                  </div>
                </div>
                {diagnostic.status === "open" ? <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="primary" icon={<Link2 size={14} />} onClick={() => { setAssociateSearch(diagnostic.pokemon || diagnostic.rawAlias); setAssociateModal({ open: true, diagnostic }); }}>Associer</Button><Button size="sm" variant="secondary" icon={<Plus size={14} />} onClick={() => openCreate(diagnostic)}>Créer une identité</Button><Button size="sm" variant="ghost" icon={<XCircle size={14} />} loading={busyAction === `diagnostic:ignored:${diagnosticId(diagnostic)}`} loadingText="Mise à jour…" disabled={busy} onClick={() => void updateDiagnostic(diagnostic, "ignored")}>Ignorer</Button><Button size="sm" variant="ghost" icon={<ShieldAlert size={14} />} loading={busyAction === `diagnostic:false-positive:${diagnosticId(diagnostic)}`} loadingText="Mise à jour…" disabled={busy} onClick={() => void updateDiagnostic(diagnostic, "false-positive")}>Faux positif</Button></div> : null}
              </article>
            ))}
          </div>
          {!loading && !diagnostics.length ? <p className="rounded-xl border border-brand-3/25 bg-brand-3/10 p-8 text-center font-bold text-emerald-100"><CheckCircle2 className="mx-auto mb-2" /> Aucun diagnostic pour ces filtres.</p> : null}
          <Pagination meta={diagnosticMeta} onPage={(page) => updateDiagnosticFilter("page", page)} />
        </>
      )}

      <Modal open={syncModalOpen} onClose={() => setSyncModalOpen(false)} title="Synchroniser le catalogue canonique" description="PokemonGo-Data reste la vérité absolue. Cet aperçu compare l’inventaire local à MongoDB sans modifier les alias fournisseurs." className="max-w-4xl" footer={<div className="flex flex-wrap justify-end gap-2"><Button variant="secondary" icon={<RefreshCcw size={15} />} loading={syncLoading} loadingText="Recalcul…" disabled={busy} onClick={() => void loadSyncPreview(true)}>Recalculer l’aperçu</Button><Button variant="primary" icon={<Database size={15} />} loading={busyAction === "sync"} loadingText="Synchronisation…" disabled={busy || syncLoading || !syncReport || syncState === "CONFLICT" || !syncHasChanges} onClick={() => void applyLocalSync()}>{syncHasChanges ? "Appliquer la synchronisation" : "Catalogue déjà synchronisé"}</Button></div>}>
        {syncLoading && !syncReport ? <FetchLoadingState layout="inline" title="Comparaison du catalogue local et de MongoDB…" /> : null}
        {syncReport ? <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3"><Stat label="Inventaire local" value={syncReport.inventory.total} tone="cyan" /><Stat label="MongoDB avant" value={syncReport.before.identities} tone="violet" /><Stat label="MongoDB après" value={syncReport.after.identities} tone="green" /></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Stat label="À créer" value={syncReport.create} tone="green" /><Stat label="À mettre à jour" value={syncReport.update} tone="cyan" /><Stat label="Orphelins conservés" value={syncReport.orphan} tone="amber" /><Stat label="Conflits bloquants" value={syncReport.conflict} tone="red" /></div>
          <div className="rounded-xl border border-line bg-surface-faint p-4 text-sm font-semibold text-muted">
            <p><strong className="text-foreground">{syncReport.unchanged.toLocaleString("fr-FR")}</strong> identité(s) inchangée(s) · <strong className="text-foreground">{syncReport.aliasesPreserved.toLocaleString("fr-FR")}</strong> alias préservé(s) · <strong className="text-foreground">{syncReport.inventory.issues}</strong> alerte(s) d’inventaire.</p>
            <p className="mt-2"><strong className={syncState === "SYNCED" ? "text-emerald-200" : syncState === "CONFLICT" ? "text-rose-200" : "text-amber-200"}>État : {syncState === "SYNCED" ? "Synchronisé" : syncState === "CONFLICT" ? "Conflit" : "Synchronisation requise"}</strong>{syncReport.orphan ? ` · ${syncReport.orphan.toLocaleString("fr-FR")} orphelin(s) conservé(s), ${(syncReport.orphanUpdate || 0).toLocaleString("fr-FR")} à marquer` : ""}</p>
            <p className="mt-2 break-all font-mono text-xs">Empreinte locale : {syncReport.synchronization?.localHash || syncReport.inventory.fingerprint}</p>
            <p className="mt-1 break-all font-mono text-xs">Empreinte MongoDB : {syncReport.synchronization?.mongoHash || "indisponible"}</p>
            <p className="mt-1 text-xs">Dernière synchronisation : {syncReport.synchronization?.lastSyncedAt ? formatDate(syncReport.synchronization.lastSyncedAt) : "aucune empreinte courante validée"} · SHA-256 / JSON stable / ordre canonique</p>
            <p className={cn("mt-2 font-black", syncReport.mewtwoArmored === "present" ? "text-emerald-200" : "text-rose-200")}>Régression Mewtwo Armored : {syncReport.mewtwoArmored === "present" ? "identité présente" : "identité absente"}</p>
          </div>
          {syncReport.conflicts.length ? <div className="space-y-3"><p className="rounded-xl border border-danger/35 bg-danger/10 p-4 font-black text-rose-100">La synchronisation est bloquée. Chaque conflit doit être résolu explicitement.</p>{syncReport.conflicts.map((conflict, index) => <IdentitySyncConflictCard key={`${conflict.code || "conflict"}-${conflict.canonicalId || index}-${index}`} conflict={conflict} index={index} />)}</div> : null}
        </div> : null}
      </Modal>

      <Modal open={identityModal.open} onClose={() => setIdentityModal({ open: false })} title={identityModal.identity ? `Modifier ${identityModal.identity.canonicalId}` : "Créer une identité canonique"} description={identityModal.diagnostic ? `Cette création crée un brouillon puis résout l’alias ${identityModal.diagnostic.rawAlias}. Activez-le seulement après ajout de la fiche locale.` : "Le catalogue actif vient de PokemonGo-Data. Une création manuelle commence en brouillon pour une donnée future."} footer={<div className="flex justify-end gap-2"><Button onClick={() => setIdentityModal({ open: false })} disabled={busy}>Annuler</Button><Button variant="primary" loading={busyAction === "save-identity"} loadingText="Enregistrement…" disabled={busy} onClick={() => void saveIdentity()}>Enregistrer</Button></div>}>
        <div className="grid gap-4 sm:grid-cols-2">
          {localFieldsLocked ? <p className="sm:col-span-2 rounded-lg border border-brand-3/30 bg-brand-3/10 p-3 text-sm font-bold text-emerald-100">Canonical ID, forme, costume et genres sont verrouillés car ils proviennent de PokemonGo-Data. La synchronisation locale est leur seul point d’écriture.</p> : null}
          <Field label="Canonical ID"><Input disabled={localFieldsLocked} value={identityForm.canonicalId} onChange={(event) => setIdentityForm((current) => ({ ...current, canonicalId: event.target.value }))} placeholder="PIKACHU_WORLD_CAP" /></Field>
          <Field label="Numéro Pokédex"><Input disabled={localFieldsLocked} inputMode="numeric" value={identityForm.pokemonId} onChange={(event) => setIdentityForm((current) => ({ ...current, pokemonId: event.target.value }))} /></Field>
          <Field label="Forme"><Input disabled={localFieldsLocked} value={identityForm.form} onChange={(event) => setIdentityForm((current) => ({ ...current, form: event.target.value }))} placeholder="optionnelle" /></Field>
          <Field label="Costume"><Input disabled={localFieldsLocked} value={identityForm.costume} onChange={(event) => setIdentityForm((current) => ({ ...current, costume: event.target.value }))} placeholder="optionnel" /></Field>
          <Field label="Statut"><Select value={identityForm.status} onChange={(event) => setIdentityForm((current) => ({ ...current, status: event.target.value as IdentityStatus }))}>{(["active", "draft", "deprecated", "ignored"] as const).map((status) => <option key={status}>{status}</option>)}</Select></Field>
          <div className="grid grid-cols-2 gap-2 pt-5"><label className="flex items-center gap-2 rounded-lg border border-line p-3 text-sm font-bold"><Checkbox disabled={localFieldsLocked} checked={identityForm.male} onChange={(event) => setIdentityForm((current) => ({ ...current, male: event.target.checked }))} /> Mâle</label><label className="flex items-center gap-2 rounded-lg border border-line p-3 text-sm font-bold"><Checkbox disabled={localFieldsLocked} checked={identityForm.female} onChange={(event) => setIdentityForm((current) => ({ ...current, female: event.target.checked }))} /> Femelle</label></div>
          <div className="sm:col-span-2"><Field label="Notes"><Textarea value={identityForm.notes} onChange={(event) => setIdentityForm((current) => ({ ...current, notes: event.target.value }))} /></Field></div>
        </div>
      </Modal>

      <Modal open={aliasModal.open} onClose={() => setAliasModal({ open: false })} title={aliasModal.alias ? "Modifier l’alias" : "Ajouter un alias fournisseur"} description={aliasModal.identity?.canonicalId} footer={<div className="flex justify-end gap-2"><Button onClick={() => setAliasModal({ open: false })} disabled={busy}>Annuler</Button><Button variant="primary" loading={busyAction === "save-alias"} loadingText="Enregistrement…" disabled={busy} onClick={() => void saveAlias()}>Enregistrer</Button></div>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fournisseur">
            <Select
              value={aliasProviderSelection}
              onChange={(event) => {
                const provider = event.target.value;
                setAliasProviderSelection(provider);
                setAliasForm((current) => ({ ...current, provider }));
              }}
            >
              {aliasProviderOptions.map((provider) => <option key={provider} value={provider}>{provider}</option>)}
            </Select>
            <span className="normal-case tracking-normal text-muted">Seules les sources enregistrées et actives peuvent recevoir un alias.</span>
          </Field>
          <Field label="Valeur originale"><Input value={aliasForm.value} onChange={(event) => setAliasForm((current) => ({ ...current, value: event.target.value }))} placeholder="pikachu-world-cap" /></Field>
          <Field label="Statut"><Select value={aliasForm.status} onChange={(event) => setAliasForm((current) => ({ ...current, status: event.target.value as AliasStatus }))}>{(["active", "deprecated", "ignored", "conflict"] as const).map((status) => <option key={status}>{status}</option>)}</Select></Field>
          <Field label="Confiance (0 à 1)"><Input inputMode="decimal" value={aliasForm.confidence} onChange={(event) => setAliasForm((current) => ({ ...current, confidence: event.target.value }))} /></Field>
          <div className="sm:col-span-2"><Field label="Motif"><Textarea value={aliasForm.reason} onChange={(event) => setAliasForm((current) => ({ ...current, reason: event.target.value }))} /></Field></div>
        </div>
      </Modal>

      <Modal open={historyModal.open} onClose={() => setHistoryModal({ open: false, items: [] })} title={historyModal.identity ? `Historique · ${historyModal.identity.canonicalId}` : "Historique Identity Manager"} className="max-w-4xl">
        {!historyModal.items.length ? <p className="p-4 text-center font-bold text-muted">Chargement ou aucune modification enregistrée.</p> : <div className="space-y-2">{historyModal.items.map((item, index) => <article key={String(item.id || item._id || index)} className="rounded-lg border border-line bg-surface-faint p-3"><div className="flex flex-wrap items-center gap-2"><Badge tone="violet">{String(item.action || "modification")}</Badge>{item.provider ? <Badge>{String(item.provider)}</Badge> : null}<strong className="font-mono">{String(item.canonicalId || "")}</strong><span className="ml-auto text-xs text-muted">{formatDate(String(item.createdAt || ""))}</span></div><p className="mt-2 text-sm text-muted">{String(item.user || "système")}{item.reason ? ` · ${String(item.reason)}` : ""}</p></article>)}</div>}
      </Modal>

      <Modal open={mergeModal.open} onClose={() => setMergeModal({ open: false, targetId: "", reason: "" })} title="Fusionner des identités" description={`La source ${mergeModal.identity?.canonicalId || ""} sera dépréciée, jamais supprimée.`} footer={<div className="flex justify-end gap-2"><Button onClick={() => setMergeModal({ open: false, targetId: "", reason: "" })} disabled={busy}>Annuler</Button><Button variant="danger" loading={busyAction === "merge"} loadingText="Fusion…" disabled={busy} onClick={() => void mergeIdentity()}>Fusionner</Button></div>}><div className="space-y-4"><Field label="ObjectId de l’identité cible"><Input value={mergeModal.targetId} onChange={(event) => setMergeModal((current) => ({ ...current, targetId: event.target.value }))} /></Field><Field label="Motif obligatoire"><Textarea value={mergeModal.reason} onChange={(event) => setMergeModal((current) => ({ ...current, reason: event.target.value }))} /></Field></div></Modal>

      <Modal open={deprecateModal.open} onClose={() => setDeprecateModal({ open: false, reason: "" })} title="Déprécier l’identité" description={`${deprecateModal.identity?.canonicalId || ""} restera dans MongoDB et pourra être restaurée.`} footer={<div className="flex justify-end gap-2"><Button onClick={() => setDeprecateModal({ open: false, reason: "" })} disabled={busy}>Annuler</Button><Button variant="danger" loading={busyAction === "deprecate"} loadingText="Dépréciation…" disabled={busy || !deprecateModal.reason.trim()} onClick={() => void deprecateIdentity()}>Déprécier</Button></div>}><Field label="Motif obligatoire"><Textarea value={deprecateModal.reason} onChange={(event) => setDeprecateModal((current) => ({ ...current, reason: event.target.value }))} /></Field></Modal>

      <Modal open={importModal} onClose={() => setImportModal(false)} title="Importer des identités" description="Aucune écriture n’est possible avant une prévisualisation sans conflit." footer={<div className="flex justify-end gap-2"><Button onClick={() => setImportModal(false)} disabled={busy}>Fermer</Button><Button variant="primary" loading={busyAction === "import"} loadingText="Import…" disabled={busy || !importReport || Boolean(importReport.conflicts.length || importReport.duplicates.length || importReport.invalid.length)} onClick={() => void applyImport()}>Valider l’import</Button></div>}><Input aria-label="Fichier JSON d’identités à importer" type="file" accept="application/json,.json" onChange={(event) => void readImportFile(event.target.files?.[0])} />{importReport ? <div className="mt-4 grid gap-3 sm:grid-cols-3"><Stat label="Créations" value={importReport.create} tone="green" /><Stat label="Mises à jour" value={importReport.update} tone="cyan" /><Stat label="Conflits" value={importReport.conflicts.length + importReport.duplicates.length + importReport.invalid.length} tone="red" /></div> : null}</Modal>

      <Modal open={associateModal.open} onClose={() => setAssociateModal({ open: false })} title="Associer l’alias" description={`${associateModal.diagnostic?.provider || ""} · ${associateModal.diagnostic?.rawAlias || ""}`} className="max-w-4xl">
        <div className="space-y-4">
          <div className="rounded-surface border border-brand-2/30 bg-brand-2/10 p-3">
            <p className="type-overline text-cyan-200/75">Alias proposé</p>
            <code className="mt-1 block break-all font-mono text-sm font-black text-cyan-100">{associateAlias}</code>
            <p className="mt-1 type-caption text-muted">La forme structurée du diagnostic est prioritaire ; le nom et le costume servent de secours.</p>
          </div>
          <label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} /><Input aria-label="Rechercher une identité canonique à associer" className="pl-10" value={associateSearch} onChange={(event) => setAssociateSearch(event.target.value)} placeholder="Rechercher un Canonical ID…" /></label>
          <div className="space-y-2">{associateCandidates.map((identity) => <button key={identityId(identity)} type="button" disabled={busy} className="flex w-full items-center gap-3 rounded-lg border border-line bg-surface-faint p-3 text-left transition hover:border-brand-2/50" onClick={() => void associate(identity)}><UserRoundCheck className="text-cyan-200" /><span className="min-w-0 flex-1"><strong className="block break-all font-mono">{identity.canonicalId}</strong><small className="type-caption text-muted">#{identity.pokemonId} · {identity.form || "normal"} · {identity.costume || "sans costume"}</small></span><Badge tone="green">Associer</Badge></button>)}</div>
        </div>
      </Modal>
    </section>
  );
}

function Pagination({ meta, onPage }: { meta: ListMeta; onPage: (page: number) => void }) {
  if (meta.pages <= 1) return null;
  return <nav className="flex items-center justify-center gap-3" aria-label="Pagination"><Button size="icon" variant="ghost" disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)} aria-label="Page précédente"><ChevronLeft /></Button><span className="text-sm font-black text-muted">Page {meta.page} / {meta.pages} · {meta.total.toLocaleString("fr-FR")} résultat(s)</span><Button size="icon" variant="ghost" disabled={meta.page >= meta.pages} onClick={() => onPage(meta.page + 1)} aria-label="Page suivante"><ChevronRight /></Button></nav>;
}
