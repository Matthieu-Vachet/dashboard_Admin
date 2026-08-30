"use client";

import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Code2,
  FileJson,
  GitCommitHorizontal,
  History,
  LoaderCircle,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { EmptyState, ErrorState, FetchLoadingState } from "@/components/admin/shared/state-system";
import { fieldClass, panelClass } from "./admin-ui";
import {
  commitJsonBuilder,
  dryRunJsonBuilder,
  loadJsonBuilder,
  saveJsonBuilderDrafts,
} from "@/services/admin/json-builder";

type BuilderData = {
  fingerprint: string;
  entityTypes: Record<string, { label: string; category: string; form: string | null }>;
  valueStates: string[];
  templates: Record<string, Record<string, unknown>>;
  assetTemplates: Record<string, Record<string, unknown>>;
  schemas: Record<string, unknown>;
  catalog: {
    identities: Array<{ formId?: string; dexId?: string; slug?: string; file?: string }>;
    moves: Array<{ id?: string; name?: string; category?: string; type?: string }>;
    types: string[];
  };
  contractSource: { source: string; ref: string };
  repository: { branch?: string | null; head?: string | null };
  writeMode: { enabled: boolean; mode: string; reason?: string | null };
  persistence: { configured: boolean; drafts: BuilderDraft[]; history: Array<Record<string, unknown>> };
};

type BuilderDraft = {
  id: string;
  name: string;
  updatedAt: string;
  entityType: string;
  values: Record<string, unknown>;
  states: Record<string, string>;
  assets: Record<string, Record<string, unknown>>;
  assetStates: Record<string, Record<string, string>>;
  options: { assetFamilies: string[] };
};

type DryRun = {
  operationId: string;
  fingerprint: string;
  token: string;
  expiresAt: string;
  preview: string;
  identity: Record<string, string>;
  issues: Array<{ level: string; code: string; path: string; message: string }>;
  files: Array<{ kind: string; relativePath: string; mode: string; content: string; diff: string; beforeSha256: string | null; afterSha256: string }>;
  completeness: { blocking: number; informative: number; canCommit: boolean };
  checks: Record<string, unknown>;
};

const steps = [
  { id: "type", label: "Type", keys: [] },
  { id: "identity", label: "Identité", keys: ["id", "formId", "baseFormId", "form", "slug", "dexNr", "dexId", "regionId"] },
  { id: "names", label: "Noms", keys: ["names"] },
  { id: "stats", label: "Types & statistiques", keys: ["primaryType", "secondaryType", "pokemonClass", "size", "stats", "maxCp", "weatherBoost", "buddyDistance", "catchRate", "fleeRate", "megaEnergyReward", "megaEnergyCost", "captureRewards", "secondChargeMoveCost"] },
  { id: "availability", label: "Disponibilité", keys: ["availability", "shinyAvailability", "shadowShinyAvailability", "shadow"] },
  { id: "moves", label: "Attaques", keys: ["quickMoves", "cinematicMoves", "eliteQuickMoves", "eliteCinematicMoves", "maxBattle"] },
  { id: "evolutions", label: "Évolutions", keys: ["regionForms", "evolutions", "hasMegaEvolution", "megaEvolutions", "dynamaxForms", "hasGigantamaxEvolution", "gigantamaxForms"] },
  { id: "assets", label: "Assets", keys: [] },
  { id: "pvp", label: "PvP & contrôles", keys: ["pvpRef", "assetsRef"] },
  { id: "preview", label: "Preview & création", keys: [] },
] as const;

const stateLabels: Record<string, string> = {
  filled: "Renseignée",
  "not-applicable": "Non applicable",
  unknown: "Inconnue",
  "not-published": "Pas encore publiée",
  automatic: "Automatique",
};

const labels: Record<string, string> = {
  id: "Identité interne",
  formId: "Identité de forme",
  baseFormId: "Identité parente",
  form: "Forme",
  slug: "Slug",
  dexNr: "N° Pokédex",
  dexId: "N° canonique",
  regionId: "Région",
  primaryType: "Type principal",
  secondaryType: "Type secondaire",
  pokemonClass: "Classe",
  quickMoves: "Attaques immédiates",
  cinematicMoves: "Attaques chargées",
  eliteQuickMoves: "Attaques immédiates Elite",
  eliteCinematicMoves: "Attaques chargées Elite",
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

function draftId() {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function newDraft(data: BuilderData, entityType = "normal"): BuilderDraft {
  return {
    id: draftId(),
    name: "Nouvelle fiche Pokémon",
    updatedAt: new Date().toISOString(),
    entityType,
    values: clone(data.templates[entityType]),
    states: {
      id: "automatic",
      formId: "automatic",
      baseFormId: "automatic",
      dexId: "automatic",
      pvpRef: "automatic",
      assetsRef: "automatic",
    },
    assets: { core: clone(data.assetTemplates.core) },
    assetStates: { core: {} },
    options: { assetFamilies: [] },
  };
}

function setAtPath(target: Record<string, unknown>, dottedPath: string, value: unknown) {
  const next = clone(target);
  const parts = dottedPath.split(".").filter(Boolean);
  let current: Record<string, unknown> = next;
  for (const key of parts.slice(0, -1)) {
    if (!current[key] || typeof current[key] !== "object" || Array.isArray(current[key])) current[key] = {};
    current = current[key] as Record<string, unknown>;
  }
  current[parts.at(-1)!] = value;
  return next;
}

function leafFields(value: unknown, prefix: string): Array<{ path: string; value: unknown }> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => leafFields(child, `${prefix}.${key}`));
  }
  return [{ path: prefix, value }];
}

function displayLabel(path: string) {
  const key = path.split(".").at(-1) || path;
  return labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase());
}

function parseInput(value: string, previous: unknown) {
  if (typeof previous === "number") return value === "" ? 0 : Number(value);
  if (typeof previous === "boolean") return value === "true";
  if (Array.isArray(previous)) {
    if (previous.some((item) => item && typeof item === "object")) return JSON.parse(value || "[]");
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  if (previous === null) return value || null;
  return value;
}

function valueForInput(value: unknown) {
  if (Array.isArray(value)) return value.some((item) => item && typeof item === "object") ? JSON.stringify(value, null, 2) : value.join(", ");
  if (value === null || value === undefined) return "";
  return String(value);
}

function FieldEditor({
  path,
  value,
  state,
  valueStates,
  onValue,
  onState,
  datalist,
}: {
  path: string;
  value: unknown;
  state: string;
  valueStates: string[];
  onValue: (value: unknown) => void;
  onState: (state: string) => void;
  datalist?: string[];
}) {
  const id = `json-builder-${path.replace(/[^a-z0-9]+/gi, "-")}`;
  const disabled = !["filled", "automatic"].includes(state);
  const isLong = Array.isArray(value) && value.some((item) => item && typeof item === "object");
  const apply = (raw: string) => {
    try {
      onValue(parseInput(raw, value));
    } catch {
      toast.error(`${displayLabel(path)} contient un JSON invalide.`);
    }
  };
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-surface-inset-subtle p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <label className="type-label text-domain-foreground" htmlFor={id}>{displayLabel(path)}</label>
        <Select
          aria-label={`État de ${displayLabel(path)}`}
          className="min-h-8 w-auto rounded-xl px-2 py-1 text-foreground-secondary"
          value={state}
          onChange={(event) => onState(event.target.value)}
        >
          {valueStates.map((option) => <option key={option} value={option}>{stateLabels[option] || option}</option>)}
        </Select>
      </div>
      {typeof value === "boolean" ? (
        <Select id={id} className={fieldClass} disabled={disabled} value={String(value)} onChange={(event) => onValue(event.target.value === "true")}>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </Select>
      ) : isLong ? (
        <textarea id={id} className={`${fieldClass} min-h-32 font-mono text-xs`} disabled={disabled} defaultValue={valueForInput(value)} onBlur={(event) => apply(event.target.value)} />
      ) : (
        <>
          <input
            id={id}
            className={fieldClass}
            disabled={disabled}
            inputMode={typeof value === "number" ? "decimal" : undefined}
            list={datalist?.length ? `${id}-list` : undefined}
            value={valueForInput(value)}
            onChange={(event) => apply(event.target.value)}
          />
          {datalist?.length ? <datalist id={`${id}-list`}>{datalist.map((option) => <option key={option} value={option} />)}</datalist> : null}
        </>
      )}
      <p className="mt-1 truncate font-mono text-[10px] text-disabled">{path}</p>
    </div>
  );
}

function CheckLine({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-foreground-secondary">
      {ok ? <Check className="mt-0.5 text-emerald-300" size={16} /> : <AlertTriangle className="mt-0.5 text-amber-300" size={16} />}
      <span>{children}</span>
    </li>
  );
}

export function JsonBuilderPanel() {
  const [data, setData] = useState<BuilderData | null>(null);
  const [draft, setDraft] = useState<BuilderDraft | null>(null);
  const [savedDrafts, setSavedDrafts] = useState<BuilderDraft[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [dryRun, setDryRun] = useState<DryRun | null>(null);
  const [selectedFile, setSelectedFile] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [push, setPush] = useState(false);

  useEffect(() => {
    let active = true;
    loadJsonBuilder()
      .then((payload: BuilderData) => {
        if (!active) return;
        const local = (() => {
          try { return JSON.parse(localStorage.getItem("matweb.pokemon.jsonBuilderDraft") || "null") as BuilderDraft | null; } catch { return null; }
        })();
        const persisted = Array.isArray(payload.persistence?.drafts) ? payload.persistence.drafts : [];
        setData(payload);
        setSavedDrafts(persisted);
        setDraft(local?.values ? local : persisted[0]?.values ? persisted[0] : newDraft(payload));
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!draft) return;
    localStorage.setItem("matweb.pokemon.jsonBuilderDraft", JSON.stringify(draft));
    const timer = window.setTimeout(() => {
      setSavedDrafts((current) => {
        const next = [draft, ...current.filter((item) => item.id !== draft.id)].slice(0, 20);
        void saveJsonBuilderDrafts(next).catch(() => undefined);
        return next;
      });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [draft]);

  const currentStep = steps[step];
  const fields = useMemo(() => {
    if (!draft || !currentStep.keys.length) return [];
    return currentStep.keys.flatMap((key) => leafFields(draft.values[key], key));
  }, [draft, currentStep]);

  if (loading) return <FetchLoadingState title="Chargement du JSON Builder…" detail="Je charge les templates et schémas canoniques depuis PokémonGo-Data develop." />;
  if (error || !data || !draft) return <ErrorState title="JSON Builder indisponible" message={error || "Contrat canonique absent."} />;

  const updateDraft = (patch: Partial<BuilderDraft>) => {
    setDraft((current) => current ? { ...current, ...patch, updatedAt: new Date().toISOString() } : current);
    setDryRun(null);
    setConfirmed(false);
  };
  const updateValue = (fieldPath: string, value: unknown) => updateDraft({ values: setAtPath(draft.values, fieldPath, value) });
  const updateState = (fieldPath: string, state: string) => updateDraft({ states: { ...draft.states, [fieldPath]: state } });
  const switchType = (entityType: string) => {
    const next = newDraft(data, entityType);
    next.id = draft.id;
    next.name = draft.name;
    setDraft(next);
    setDryRun(null);
  };
  const runDry = async () => {
    setRunning(true);
    try {
      const result = await dryRunJsonBuilder(draft) as DryRun;
      setDryRun(result);
      setSelectedFile(0);
      setStep(steps.length - 1);
      if (result.completeness.canCommit) toast.success("Dry-run valide : preview et diff prêts.");
      else toast.warning(`${result.completeness.blocking} contrôle(s) bloquant(s).`);
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Dry-run impossible.");
    } finally {
      setRunning(false);
    }
  };
  const create = async () => {
    if (!dryRun || !confirmed) return;
    setCommitting(true);
    try {
      const result = await commitJsonBuilder(draft, dryRun.token, { commit: true, push });
      toast.success(`Transaction ${String(result.operationId)} appliquée sur develop.`);
      setConfirmed(false);
      setDryRun(null);
    } catch (reason) {
      const rollback = reason && typeof reason === "object" && "rollback" in reason ? (reason as { rollback?: { rolledBack?: boolean } }).rollback : null;
      toast.error(`${reason instanceof Error ? reason.message : "Création impossible."}${rollback?.rolledBack ? " Rollback confirmé." : ""}`);
    } finally {
      setCommitting(false);
    }
  };
  const selected = dryRun?.files[selectedFile];
  const moveIds = data.catalog.moves.map((move) => move.id || "").filter(Boolean);

  return (
    <div className="space-y-5" data-json-builder>
      <section className={`${panelClass} overflow-hidden`}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="type-overline text-violet-200">templates canoniques PokémonGo-Data</p>
            <h2 className="mt-1 type-title-section">JSON Builder</h2>
            <p className="mt-2 max-w-3xl type-body text-muted">Crée une fiche et ses fichiers liés sans dupliquer le schéma, sans reformater les JSON existants et sans écraser une identité.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="green">Contrat {data.contractSource.ref}</Badge>
            <Badge tone={data.writeMode.enabled ? "green" : "amber"}>{data.writeMode.enabled ? "Écriture develop" : "Dry-run uniquement"}</Badge>
            <Badge>{data.catalog.identities.length} identités</Badge>
          </div>
        </div>
        {!data.writeMode.enabled ? <p className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3 text-sm font-bold text-amber-100">{data.writeMode.reason}</p> : null}
      </section>

      <nav aria-label="Étapes JSON Builder" className="grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-10">
        {steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-current={index === step ? "step" : undefined}
            onClick={() => setStep(index)}
            className={`min-h-16 rounded-2xl border px-3 py-2 text-left text-xs font-black transition ${index === step ? "border-cyan-200/55 bg-cyan-400/20 text-cyan-50" : index < step ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" : "border-line bg-surface-control text-muted"}`}
          >
            <span className="block text-[10px] opacity-70">{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </nav>

      <section className={panelClass}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="type-overline text-cyan-200">Étape {step + 1} / {steps.length}</p>
            <h3 className="mt-1 type-title-subsection">{currentStep.label}</h3>
          </div>
          <label className="min-w-64">
            <span className="mb-1 block type-overline text-disabled">Nom du brouillon</span>
            <input className={fieldClass} value={draft.name} onChange={(event) => updateDraft({ name: event.target.value })} />
          </label>
        </div>

        {currentStep.id === "type" ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {Object.entries(data.entityTypes).map(([id, config]) => (
              <button key={id} type="button" onClick={() => switchType(id)} className={`rounded-2xl border p-4 text-left transition ${draft.entityType === id ? "border-violet-300/60 bg-violet-400/20" : "border-line bg-surface-inset-subtle hover:border-violet-300/35"}`}>
                <Sparkles className="mb-3 text-violet-200" size={20} />
                <strong className="block text-domain-foreground">{config.label}</strong>
                <span className="mt-1 block text-xs text-muted">{config.category}</span>
              </button>
            ))}
          </div>
        ) : null}

        {fields.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {fields.map((field) => (
              <FieldEditor
                key={field.path}
                path={field.path}
                value={field.value}
                state={draft.states[field.path] || "filled"}
                valueStates={data.valueStates}
                onValue={(value) => updateValue(field.path, value)}
                onState={(state) => updateState(field.path, state)}
                datalist={field.path.endsWith("Type") ? data.catalog.types : field.path.toLowerCase().includes("moves") ? moveIds : undefined}
              />
            ))}
          </div>
        ) : null}

        {currentStep.id === "assets" ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Object.keys(data.assetTemplates).filter((family) => family !== "core").map((family) => {
                const checked = draft.options.assetFamilies.includes(family);
                return (
                  <label key={family} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface-inset-subtle p-4 text-sm font-black text-domain-foreground">
                    <Checkbox checked={checked} onChange={() => {
                      const families = checked ? draft.options.assetFamilies.filter((item) => item !== family) : [...draft.options.assetFamilies, family];
                      updateDraft({ options: { assetFamilies: families }, assets: checked ? draft.assets : { ...draft.assets, [family]: clone(data.assetTemplates[family]) } });
                    }} />
                    {family}
                  </label>
                );
              })}
            </div>
            {["core", ...draft.options.assetFamilies].map((family) => (
              <section key={family} className="rounded-2xl border border-line bg-surface-faint p-4">
                <h4 className="mb-3 type-title-inline text-domain-foreground">Assets · {family}</h4>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {leafFields(draft.assets[family] || data.assetTemplates[family], `assets.${family}`).map((field) => {
                    const relative = field.path.replace(new RegExp(`^assets\\.${family}\\.`), "");
                    return (
                      <FieldEditor
                        key={field.path}
                        path={field.path}
                        value={field.value}
                        state={draft.assetStates?.[family]?.[relative] || "filled"}
                        valueStates={["filled", "not-applicable", "unknown", "not-published", "automatic"]}
                        onValue={(value) => updateDraft({ assets: { ...draft.assets, [family]: setAtPath(draft.assets[family] || data.assetTemplates[family], relative, value) } })}
                        onState={(state) => updateDraft({ assetStates: { ...draft.assetStates, [family]: { ...(draft.assetStates?.[family] || {}), [relative]: state } } })}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {currentStep.id === "pvp" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <ShieldCheck className="text-cyan-200" />
              <h4 className="mt-3 font-black text-domain-foreground">PvP status-only</h4>
              <p className="mt-2 text-sm text-muted">Le fichier PvP est produit depuis le template officiel. Aucun classement n’est inventé : une fiche publiée reçoit SOURCE_MISSING, une fiche future UNRELEASED.</p>
            </div>
            <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
              <GitCommitHorizontal className="text-violet-200" />
              <h4 className="mt-3 font-black text-domain-foreground">Engine & Identity</h4>
              <p className="mt-2 text-sm text-muted">Le dry-run contrôle le schéma récursif, le classificateur de catégorie, les collisions formId/dexId+slug, les chemins et la branche develop.</p>
            </div>
          </div>
        ) : null}

        {currentStep.id === "preview" ? (
          <div className="space-y-4">
            {!dryRun ? (
              <EmptyState title="Aucun dry-run calculé" description="Calculez l’aperçu pour obtenir les fichiers, les diffs et l’empreinte signée." action={<Button variant="primary" icon={running ? <LoaderCircle className="animate-spin" /> : <Code2 />} onClick={runDry}>Calculer le dry-run</Button>} />
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-line bg-surface-inset-subtle p-4"><span className="type-overline text-disabled">Fichiers</span><strong className="mt-1 block text-2xl text-domain-foreground">{dryRun.files.length}</strong></div>
                  <div className="rounded-2xl border border-line bg-surface-inset-subtle p-4"><span className="type-overline text-disabled">Bloquants</span><strong className={`mt-1 block text-2xl ${dryRun.completeness.blocking ? "text-rose-200" : "text-emerald-200"}`}>{dryRun.completeness.blocking}</strong></div>
                  <div className="rounded-2xl border border-line bg-surface-inset-subtle p-4"><span className="type-overline text-disabled">Identité</span><strong className="mt-1 block truncate text-lg text-domain-foreground">{dryRun.identity.formId}</strong></div>
                  <div className="rounded-2xl border border-line bg-surface-inset-subtle p-4"><span className="type-overline text-disabled">Empreinte</span><strong className="mt-1 block truncate font-mono text-xs text-cyan-100">{dryRun.fingerprint}</strong></div>
                </div>
                {dryRun.issues.length ? <ul className="space-y-2 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4">{dryRun.issues.map((issue, index) => <li key={`${issue.code}-${index}`} className="text-sm text-amber-50"><strong>{issue.code}</strong> · {issue.path} · {issue.message}</li>)}</ul> : null}
                <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
                  <div className="space-y-2">
                    {dryRun.files.map((file, index) => <button key={file.relativePath} type="button" onClick={() => setSelectedFile(index)} className={`w-full rounded-xl border p-3 text-left ${selectedFile === index ? "border-cyan-300/50 bg-cyan-300/15" : "border-line bg-surface-inset-subtle"}`}><span className="block type-caption-strong text-domain-foreground">{file.kind}</span><span className="mt-1 block break-all font-mono text-[10px] text-muted">{file.relativePath}</span></button>)}
                  </div>
                  {selected ? <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-[#050814]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-3">
                      <div className="flex gap-2"><button className={`rounded-lg px-3 py-1 text-xs font-black ${!showDiff ? "bg-cyan-300/20 text-cyan-50" : "text-muted"}`} onClick={() => setShowDiff(false)}>JSON</button><button className={`rounded-lg px-3 py-1 text-xs font-black ${showDiff ? "bg-violet-300/20 text-violet-50" : "text-muted"}`} onClick={() => setShowDiff(true)}>Diff</button></div>
                      <Button size="sm" icon={<Clipboard size={14} />} onClick={() => { void navigator.clipboard.writeText(showDiff ? selected.diff : selected.content); toast.success("Copié."); }}>Copier</Button>
                    </div>
                    <pre className="max-h-[620px] overflow-auto p-4 text-xs leading-6 text-cyan-50"><code>{showDiff ? selected.diff : selected.content}</code></pre>
                  </div> : null}
                </div>
                <ul className="grid gap-2 rounded-2xl border border-line bg-surface-inset-subtle p-4 md:grid-cols-2">
                  <CheckLine ok={dryRun.checks.templatesConsumed === true}>Templates canoniques consommés</CheckLine>
                  <CheckLine ok={dryRun.checks.recursiveKeyOrderPreserved === true}>Ordre récursif des clés préservé</CheckLine>
                  <CheckLine ok={dryRun.checks.existingJsonReformatted === 0}>JSON existants reformatés : 0</CheckLine>
                  <CheckLine ok={dryRun.checks.unrelatedJsonModified === 0}>JSON non concernés modifiés : 0</CheckLine>
                </ul>
                <div className="rounded-2xl border border-violet-300/25 bg-violet-300/10 p-4">
                  <label className="flex items-start gap-3 text-sm font-bold text-domain-foreground"><Checkbox className="mt-1" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />Je confirme les chemins, le diff et la création transactionnelle sur PokémonGo-Data develop.</label>
                  <label className="mt-3 flex items-start gap-3 text-sm text-muted"><Checkbox className="mt-1" checked={push} onChange={(event) => setPush(event.target.checked)} />Pousser ensuite le commit sur `origin/develop`.</label>
                  <Button className="mt-4" variant="primary" icon={<GitCommitHorizontal />} disabled={!confirmed || !dryRun.completeness.canCommit || !data.writeMode.enabled} loading={committing} loadingText="Transaction en cours…" onClick={create}>Créer et committer</Button>
                </div>
              </>
            )}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <Button icon={<ChevronLeft />} disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Précédent</Button>
          <div className="flex flex-wrap gap-2">
            <Button icon={<Save />} onClick={() => { void saveJsonBuilderDrafts([draft, ...savedDrafts.filter((item) => item.id !== draft.id)]); toast.success("Brouillon sauvegardé."); }}>Sauvegarder</Button>
            {step < steps.length - 1 ? <Button variant="primary" icon={<ChevronRight />} onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>Suivant</Button> : <Button variant="primary" icon={running ? <LoaderCircle className="animate-spin" /> : <FileJson />} disabled={running} onClick={runDry}>Recalculer l’aperçu</Button>}
          </div>
        </div>
      </section>

      {data.persistence.history.length ? <section className={panelClass}><div className="flex items-center gap-2"><History className="text-cyan-200" /><h3 className="type-title-subsection">Historique JSON Builder</h3></div><div className="mt-4 grid gap-2">{data.persistence.history.slice(0, 8).map((entry, index) => <div key={String(entry.operationId || index)} className="rounded-xl border border-line bg-surface-inset-subtle p-3"><strong className="block text-sm text-domain-foreground">{String(entry.operationId || "Opération")}</strong><span className="mt-1 block font-mono text-xs text-muted">{String(entry.fingerprint || "")}</span></div>)}</div></section> : null}
    </div>
  );
}
