"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileJson,
  History,
  LoaderCircle,
  RefreshCcw,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  commitTrainerPokemonImport,
  previewTrainerPokemonImport,
  readTrainerPokemonCollection,
  readTrainerPokemonImports,
  rollbackTrainerPokemonImport,
} from "@/services/admin/trainer-pokemon-api";
import type {
  NormalizedTrainerPokemonMove,
  TrainerPokemon,
  TrainerPokemonImportPreview,
  TrainerPokemonListResponse,
  TrainerPokemonSnapshotSummary,
  TrainerPokemonSortField,
} from "@/types/admin/trainer-pokemon";

const numberFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });
const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" });
const placeholderImage = "/ui/icons/pokemon.png";
const selectClass = "min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-bold text-foreground outline-none focus:border-brand-2/55";

type QueryState = {
  search: string;
  shiny: "all" | "yes" | "no";
  lucky: "all" | "yes" | "no";
  gender: string;
  alignment: string;
  costume: "all" | "yes" | "no";
  specialForm: "all" | "yes" | "no";
  perfect: boolean;
  ivMin: string;
  ivMax: string;
  cpMin: string;
  cpMax: string;
  weightMin: string;
  weightMax: string;
  heightMin: string;
  heightMax: string;
  sort: TrainerPokemonSortField;
  order: "asc" | "desc";
  page: number;
  limit: number;
};

const initialQuery: QueryState = {
  search: "", shiny: "all", lucky: "all", gender: "", alignment: "", costume: "all",
  specialForm: "all", perfect: false, ivMin: "", ivMax: "", cpMin: "", cpMax: "",
  weightMin: "", weightMax: "", heightMin: "", heightMax: "",
  sort: "dexNumber", order: "asc", page: 1, limit: 50,
};

const typeColors: Record<string, string> = {
  BUG: "#91c12f", DARK: "#5a5465", DRAGON: "#0b6dc3", ELECTRIC: "#f4d23c", FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b", FIRE: "#ff9d55", FLYING: "#89aae3", GHOST: "#5269ad", GRASS: "#63bc5a",
  GROUND: "#d97845", ICE: "#73cec0", NORMAL: "#919aa2", POISON: "#aa6bc8", PSYCHIC: "#fa7179",
  ROCK: "#c5b78c", STEEL: "#5a8ea2", WATER: "#5090d6",
};

const genderLabels = { MALE: "Mâle", FEMALE: "Femelle", GENDERLESS: "Sans genre", UNKNOWN: "Inconnu" } as const;
const alignmentLabels = { NORMAL: "Normal", SHADOW: "Obscur", PURIFIED: "Purifié", UNKNOWN: "Inconnu" } as const;

function errorText(error: unknown) {
  return error instanceof Error ? error.message : "Une erreur inattendue est survenue.";
}

function formatIv(value: number) {
  return `${numberFormatter.format(value)} %`;
}

function queryParams(query: QueryState, debouncedSearch: string) {
  const params = new URLSearchParams({
    page: String(query.page), limit: String(query.limit), search: debouncedSearch,
    shiny: query.shiny, lucky: query.lucky, costume: query.costume, specialForm: query.specialForm,
    sort: query.sort, order: query.order,
  });
  if (query.gender) params.set("gender", query.gender);
  if (query.alignment) params.set("alignment", query.alignment);
  if (query.perfect) params.set("perfect", "true");
  for (const key of ["ivMin", "ivMax", "cpMin", "cpMax", "weightMin", "weightMax", "heightMin", "heightMax"] as const) if (query[key] !== "") params.set(key, query[key]);
  return params;
}

function pokemonSurface(pokemon: TrainerPokemon) {
  const primary = typeColors[pokemon.primaryType || ""] || typeColors.NORMAL;
  const secondary = typeColors[pokemon.secondaryType || ""] || primary;
  return {
    borderColor: `color-mix(in srgb, ${primary} 28%, var(--line))`,
    backgroundImage: `linear-gradient(115deg, color-mix(in srgb, ${primary} 13%, transparent), color-mix(in srgb, ${secondary} 8%, transparent) 55%, transparent)`,
  };
}

function Move({ move }: { move: NormalizedTrainerPokemonMove }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-line bg-white/[0.05] px-2 py-1 text-[11px] font-bold">
      {move.typeIcon ? <Image className="h-4 w-4 shrink-0 object-contain" src={move.typeIcon} alt={`Type ${move.typeName || move.type}`} width={16} height={16} /> : <AlertTriangle className="shrink-0 text-warning" size={13} aria-hidden="true" />}
      <span className="truncate">{move.name}</span>
      {!move.resolved ? <span className="sr-only">Type introuvable</span> : null}
    </span>
  );
}

function PokemonImage({ pokemon }: { pokemon: TrainerPokemon }) {
  return (
    <span className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-white/[0.05] p-1.5 lg:h-20 lg:w-20">
      <Image
        className={pokemon.image ? "h-full w-full object-contain" : "h-8 w-8 object-contain opacity-45"}
        src={pokemon.image || placeholderImage}
        alt={pokemon.image ? `${pokemon.frenchName}${pokemon.shiny ? " chromatique" : ""}` : `Image indisponible pour ${pokemon.frenchName}`}
        width={80}
        height={80}
      />
    </span>
  );
}

function StatusBadges({ pokemon }: { pokemon: TrainerPokemon }) {
  return (
    <span className="flex flex-wrap gap-1">
      {pokemon.shiny ? <Badge tone="amber">Chromatique</Badge> : null}
      {pokemon.lucky ? <Badge tone="green">Chanceux</Badge> : null}
      <Badge tone={pokemon.alignment === "SHADOW" ? "red" : pokemon.alignment === "PURIFIED" ? "cyan" : "neutral"}>{alignmentLabels[pokemon.alignment]}</Badge>
      {pokemon.imageMatch !== "exact" ? <Badge tone={pokemon.imageMatch === "missing" ? "red" : "neutral"}>{pokemon.imageMatch === "missing" ? "Asset indisponible" : `Fallback ${pokemon.imageMatch}`}</Badge> : null}
    </span>
  );
}

function PokemonMobileCard({ pokemon }: { pokemon: TrainerPokemon }) {
  return (
    <Card className="p-3 lg:hidden" style={pokemonSurface(pokemon)}>
      <div className="flex gap-3">
        <PokemonImage pokemon={pokemon} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><strong className="block truncate text-base">#{pokemon.dexNumber} · {pokemon.frenchName}</strong><span className="block truncate text-xs font-semibold text-muted">{pokemon.nickname || "Aucun surnom"}</span></div>
            <strong className="shrink-0 font-mono text-brand-2">CP {pokemon.cp}</strong>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">{pokemon.form ? <Badge>{pokemon.form}</Badge> : null}{pokemon.costume ? <Badge tone="violet">{pokemon.costume}</Badge> : null}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-line bg-black/10 p-2 text-xs font-semibold">
        <span>IV <strong>{formatIv(pokemon.ivPercent)}</strong></span><span>A/D/E <strong>{pokemon.attackIv}/{pokemon.defenseIv}/{pokemon.staminaIv}</strong></span>
        <span>Poids <strong>{numberFormatter.format(pokemon.weightKg)} kg</strong></span><span>Taille <strong>{numberFormatter.format(pokemon.heightM)} m</strong></span>
        <span>Genre <strong>{genderLabels[pokemon.gender]}</strong></span><span>Total <strong>{pokemon.ivTotal}/45</strong></span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1"><Move move={pokemon.fastMove} />{pokemon.chargedMoves.map((move, index) => <Move key={`${move.sourceName}-${index}`} move={move} />)}</div>
      <div className="mt-3"><StatusBadges pokemon={pokemon} /></div>
    </Card>
  );
}

function PokemonTable({ items }: { items: TrainerPokemon[] }) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border border-line lg:block" tabIndex={0} aria-label="Tableau de la collection Pokémon GO">
      <table className="min-w-[1540px] w-full border-collapse text-left text-xs">
        <thead className="sticky top-0 z-10 bg-panel-strong text-muted"><tr>
          {['Pokémon', 'Nom et surnom', 'Forme / costume', 'CP', 'IV', 'Attaques', 'Poids', 'Taille', 'Genre', 'États'].map((label) => <th className="border-b border-line px-3 py-3 font-black uppercase tracking-wider" key={label}>{label}</th>)}
        </tr></thead>
        <tbody>{items.map((pokemon) => (
          <tr className="border-b border-line/70 align-middle last:border-0 hover:bg-white/[0.055]" style={pokemonSurface(pokemon)} key={pokemon.sourceId}>
            <td className="px-3 py-2"><div className="flex items-center gap-2"><PokemonImage pokemon={pokemon} /><strong className="font-mono">#{pokemon.dexNumber}</strong></div></td>
            <td className="max-w-56 px-3 py-2"><strong className="block truncate text-sm">{pokemon.frenchName}</strong><span className="block truncate font-semibold text-muted">{pokemon.nickname || "Aucun surnom"}</span><span className="block truncate text-[10px] text-muted/70">{pokemon.sourceName}</span></td>
            <td className="max-w-48 px-3 py-2"><div className="flex flex-wrap gap-1">{pokemon.form ? <Badge>{pokemon.form}</Badge> : <span className="text-muted">—</span>}{pokemon.costume ? <Badge tone="violet">{pokemon.costume}</Badge> : null}</div></td>
            <td className="px-3 py-2 font-mono text-sm font-black text-brand-2">{pokemon.cp}</td>
            <td className="px-3 py-2"><strong>{formatIv(pokemon.ivPercent)}</strong><span className="mt-1 block text-muted">{pokemon.attackIv}/15 · {pokemon.defenseIv}/15 · {pokemon.staminaIv}/15</span><span className="block text-muted">{pokemon.ivTotal}/45</span></td>
            <td className="max-w-80 px-3 py-2"><div className="flex flex-wrap gap-1"><Move move={pokemon.fastMove} />{pokemon.chargedMoves.map((move, index) => <Move key={`${move.sourceName}-${index}`} move={move} />)}</div></td>
            <td className="px-3 py-2 whitespace-nowrap">{numberFormatter.format(pokemon.weightKg)} kg</td>
            <td className="px-3 py-2 whitespace-nowrap">{numberFormatter.format(pokemon.heightM)} m</td>
            <td className="px-3 py-2 whitespace-nowrap">{genderLabels[pokemon.gender]}</td>
            <td className="max-w-52 px-3 py-2"><StatusBadges pokemon={pokemon} /></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function ImportModal({
  open, phase, preview, fileName, error, onClose, onSelectFile, onConfirm,
}: {
  open: boolean;
  phase: "idle" | "parsing" | "previewing" | "ready" | "importing" | "success" | "error";
  preview: TrainerPokemonImportPreview | null;
  fileName: string;
  error: string | null;
  onClose: () => void;
  onSelectFile: (file: File | null) => void;
  onConfirm: () => void;
}) {
  const busy = phase === "parsing" || phase === "previewing" || phase === "importing";
  return (
    <Modal open={open} onClose={busy ? () => undefined : onClose} title="Importer ma collection" description="Le fichier est entièrement validé avant tout remplacement. La collection active reste intacte jusqu’à la bascule atomique." footer={
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button onClick={onClose} disabled={busy}>Annuler</Button><Button variant="primary" icon={phase === "importing" ? <LoaderCircle className="animate-spin" size={16} /> : <Upload size={16} />} onClick={onConfirm} disabled={phase !== "ready"}>Confirmer le remplacement</Button></div>
    }>
      <div className="grid gap-4">
        <label className="grid gap-2 rounded-lg border border-dashed border-brand-2/35 bg-brand-2/[0.06] p-4 text-sm font-bold">
          <span>Sélectionner un fichier JSON</span>
          <input type="file" accept="application/json,.json" disabled={busy} onChange={(event) => onSelectFile(event.target.files?.[0] || null)} />
          {fileName ? <span className="text-xs text-muted">{fileName}</span> : null}
        </label>
        {busy ? <div className="flex items-center gap-3 rounded-lg border border-line p-4"><LoaderCircle className="animate-spin text-brand-2" /><span>{phase === "importing" ? "Écriture, read-back et activation…" : "Parsing, validation et normalisation…"}</span></div> : null}
        {error ? <div className="rounded-lg border border-danger/35 bg-danger/10 p-4 text-sm font-semibold text-rose-100" role="alert"><strong className="block">Import impossible</strong>{error}</div> : null}
        {preview ? <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{[
            ["Nom", preview.sourceFileName], ["Export", preview.sourceExportTime || "Non renseigné"], ["Annoncé", preview.declaredPokemonCount], ["Réel", preview.actualPokemonCount], ["Valides", preview.validPokemonCount], ["Avertissements", Object.values(preview.diagnosticCounts).reduce((sum, count) => sum + count, 0)],
          ].map(([label, value]) => <div className="rounded-lg border border-line bg-white/[0.04] p-3" key={label}><span className="block text-[10px] font-black uppercase text-muted">{label}</span><strong className="mt-1 block break-words text-sm">{String(value)}</strong></div>)}</div>
          <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs font-semibold text-amber-100"><strong className="block text-sm">Diagnostics non bloquants</strong>{Object.entries(preview.diagnosticCounts).filter(([, count]) => count).map(([code, count]) => <span className="mt-1 block" key={code}>{code} : {count}</span>)}</div>
          {preview.diagnostics.length ? <details className="rounded-lg border border-line p-3"><summary className="cursor-pointer text-sm font-black">Voir les premiers diagnostics précis</summary><ul className="mt-3 max-h-44 space-y-2 overflow-auto text-xs">{preview.diagnostics.slice(0, 30).map((item, index) => <li key={`${item.code}-${item.path}-${index}`}><code className="text-brand-2">{item.path}</code><span className="ml-2 text-muted">{item.message}</span></li>)}</ul></details> : null}
        </div> : null}
      </div>
    </Modal>
  );
}

export function TrainerPokemonCollectionPanel() {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [data, setData] = useState<TrainerPokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importPhase, setImportPhase] = useState<"idle" | "parsing" | "previewing" | "ready" | "importing" | "success" | "error">("idle");
  const [importPayload, setImportPayload] = useState<unknown>(null);
  const [importPreview, setImportPreview] = useState<TrainerPokemonImportPreview | null>(null);
  const [importFileName, setImportFileName] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<TrainerPokemonSnapshotSummary[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(query.search), 300);
    return () => window.clearTimeout(timeout);
  }, [query.search]);

  const load = useCallback(async (background = false) => {
    const requestId = ++requestIdRef.current;
    if (background) setRefreshing(true); else setLoading(true);
    setLoadError(null);
    try {
      const result = await readTrainerPokemonCollection(queryParams(query, debouncedSearch));
      if (requestId !== requestIdRef.current) return;
      setData(result);
      setAnnouncement(`${result.pagination.total} Pokémon correspondent aux filtres.`);
    } catch (error) {
      if (requestId === requestIdRef.current && (error as Error)?.name !== "AbortError") setLoadError(errorText(error));
    } finally {
      if (requestId === requestIdRef.current) { setLoading(false); setRefreshing(false); }
    }
  }, [query, debouncedSearch]);

  useEffect(() => { void load(); }, [load]);

  function updateQuery(patch: Partial<QueryState>) {
    setQuery((current) => ({ ...current, ...patch, page: patch.page ?? 1 }));
  }

  async function selectFile(file: File | null) {
    if (!file) return;
    setImportPreview(null); setImportPayload(null); setImportError(null); setImportFileName(file.name);
    if (!file.name.toLocaleLowerCase("fr").endsWith(".json")) { setImportPhase("error"); setImportError("Seuls les fichiers avec l’extension .json sont acceptés."); return; }
    if (file.size > 12_000_000) { setImportPhase("error"); setImportError("Le fichier dépasse la limite de 12 Mo."); return; }
    try {
      setImportPhase("parsing");
      const parsed = JSON.parse(await file.text()) as unknown;
      setImportPayload(parsed); setImportPhase("previewing");
      const preview = await previewTrainerPokemonImport(parsed);
      setImportPreview(preview); setImportPhase("ready");
    } catch (error) {
      setImportPhase("error");
      const issues = (error as Error & { issues?: Array<{ path: string; message: string }> }).issues;
      setImportError(issues?.length ? `${errorText(error)} ${issues.slice(0, 5).map((item) => `${item.path}: ${item.message}`).join(" · ")}` : errorText(error));
    }
  }

  async function confirmImport() {
    if (!importPayload || importPhase !== "ready") return;
    setImportPhase("importing"); setImportError(null);
    try {
      const result = await commitTrainerPokemonImport(importPayload);
      setImportPhase("success");
      toast.success(`${result.preview.actualPokemonCount.toLocaleString("fr-FR")} Pokémon importés. Le snapshot précédent reste disponible.`);
      setImportOpen(false); setImportPayload(null); setImportPreview(null); setQuery(initialQuery);
      await load(true);
    } catch (error) {
      setImportPhase("error"); setImportError(errorText(error));
    }
  }

  async function openHistory() {
    setHistoryOpen(true); setHistoryLoading(true);
    try { setHistory((await readTrainerPokemonImports()).imports); } catch (error) { toast.error(errorText(error)); } finally { setHistoryLoading(false); }
  }

  async function rollback(snapshot: TrainerPokemonSnapshotSummary) {
    if (!window.confirm(`Restaurer le snapshot « ${snapshot.sourceFileName} » ?`)) return;
    setHistoryLoading(true);
    try { await rollbackTrainerPokemonImport(snapshot.id); toast.success("Snapshot restauré."); setHistory((await readTrainerPokemonImports()).imports); await load(true); } catch (error) { toast.error(errorText(error)); } finally { setHistoryLoading(false); }
  }

  const statCards = useMemo(() => data ? [
    ["Total", data.stats.total, "neutral"], ["Chromatiques", data.stats.shiny, "amber"], ["Chanceux", data.stats.lucky, "green"],
    ["IV 100 %", data.stats.perfect, "violet"], ["Obscurs", data.stats.shadow, "red"], ["Purifiés", data.stats.purified, "cyan"], ["Costumes", data.stats.costume, "violet"],
  ] as const : [], [data]);
  const activeFilterCount = [
    Boolean(query.search), query.shiny !== "all", query.lucky !== "all", Boolean(query.gender), Boolean(query.alignment),
    query.costume !== "all", query.specialForm !== "all", query.perfect, query.sort !== "dexNumber", query.order !== "asc",
    ...[query.ivMin, query.ivMax, query.cpMin, query.cpMax, query.weightMin, query.weightMax, query.heightMin, query.heightMax].map(Boolean),
  ].filter(Boolean).length;

  return (
    <section className="grid gap-4" aria-labelledby="trainer-pokemon-title">
      <div className="sr-only" aria-live="polite">{announcement}</div>
      <Card tone="strong" className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-brand-2">Collection privée · MongoDB</p><h2 className="mt-1 text-2xl font-black sm:text-3xl" id="trainer-pokemon-title">Ma collection Pokémon GO</h2><p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted">Import atomique, consultation paginée et diagnostics des correspondances avec les référentiels canoniques.</p></div>
          <div className="flex flex-wrap gap-2"><Button icon={<History size={16} />} onClick={() => void openHistory()}>Historique</Button><Button icon={<RefreshCcw className={refreshing ? "animate-spin" : ""} size={16} />} onClick={() => void load(true)} disabled={refreshing}>Rafraîchir</Button><Button variant="primary" icon={<Upload size={16} />} onClick={() => { setImportOpen(true); setImportPhase("idle"); setImportError(null); setImportFileName(""); }}>Importer un JSON</Button></div>
        </div>
        {data?.snapshot ? <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 rounded-lg border border-line bg-white/[0.04] p-3 text-xs font-semibold text-muted"><span><strong className="text-foreground">Fichier :</strong> {data.snapshot.sourceFileName}</span><span><strong className="text-foreground">Dernier import :</strong> {dateFormatter.format(new Date(data.snapshot.importedAt))}</span><span><strong className="text-foreground">Export :</strong> {data.snapshot.sourceExportTime || "Non renseigné"}</span><span><strong className="text-foreground">Checksum :</strong> <code>{data.snapshot.checksum.slice(0, 12)}</code></span></div> : null}
      </Card>

      {statCards.length ? <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">{statCards.map(([label, value, tone]) => <Card className="p-3" key={label}><span className="block text-[10px] font-black uppercase tracking-wider text-muted">{label}</span><strong className="mt-1 block font-mono text-2xl">{value.toLocaleString("fr-FR")}</strong><Badge tone={tone} className="mt-2">collection active</Badge></Card>)}</div> : null}

      <Card className="p-3 sm:p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="relative block md:col-span-2"><span className="sr-only">Rechercher dans la collection</span><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} /><Input className="pl-10" value={query.search} onChange={(event) => updateQuery({ search: event.target.value })} placeholder="Nom, surnom, numéro, forme, costume ou attaque…" /></label>
          <FilterSelect label="Trier par" value={query.sort} onChange={(value) => updateQuery({ sort: value as TrainerPokemonSortField })} options={[["dexNumber", "Numéro Pokédex"], ["frenchName", "Nom"], ["nickname", "Surnom"], ["cp", "CP"], ["ivPercent", "IV %"], ["attackIv", "Attaque IV"], ["defenseIv", "Défense IV"], ["staminaIv", "Endurance IV"], ["weightKg", "Poids"], ["heightM", "Taille"], ["shiny", "Chromatique"], ["lucky", "Chanceux"]]} />
          <FilterSelect label="Ordre" value={query.order} onChange={(value) => updateQuery({ order: value as QueryState["order"] })} options={[["asc", "Ascendant"], ["desc", "Descendant"]]} />
          <FilterSelect label="Chromatique" value={query.shiny} onChange={(value) => updateQuery({ shiny: value as QueryState["shiny"] })} options={[["all", "Tous"], ["yes", "Oui"], ["no", "Non"]]} />
          <FilterSelect label="Chanceux" value={query.lucky} onChange={(value) => updateQuery({ lucky: value as QueryState["lucky"] })} options={[["all", "Tous"], ["yes", "Oui"], ["no", "Non"]]} />
          <FilterSelect label="Genre" value={query.gender} onChange={(value) => updateQuery({ gender: value })} options={[["", "Tous"], ...Object.entries(genderLabels)]} />
          <FilterSelect label="Alignement" value={query.alignment} onChange={(value) => updateQuery({ alignment: value })} options={[["", "Tous"], ["NORMAL", "Normal"], ["SHADOW", "Obscur"], ["PURIFIED", "Purifié"], ["UNKNOWN", "Inconnu"]]} />
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.04] px-3 text-sm font-bold"><input type="checkbox" checked={query.perfect} onChange={(event) => updateQuery({ perfect: event.target.checked })} /> IV 100 % uniquement</label>
          <Button icon={<SlidersHorizontal size={15} />} onClick={() => setMoreFiltersOpen((open) => !open)} aria-expanded={moreFiltersOpen}>Plus de filtres <Badge tone={activeFilterCount ? "cyan" : "neutral"}>{activeFilterCount}</Badge><ChevronDown className={moreFiltersOpen ? "rotate-180 transition" : "transition"} size={15} /></Button>
          <Button icon={<RotateCcw size={15} />} onClick={() => { setQuery(initialQuery); setMoreFiltersOpen(false); }}>Réinitialiser les filtres</Button>
        </div>
        {moreFiltersOpen ? (
          <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-2 xl:grid-cols-4">
            <FilterSelect label="Costume" value={query.costume} onChange={(value) => updateQuery({ costume: value as QueryState["costume"] })} options={[["all", "Tous"], ["yes", "Avec"], ["no", "Sans"]]} />
            <FilterSelect label="Forme spéciale" value={query.specialForm} onChange={(value) => updateQuery({ specialForm: value as QueryState["specialForm"] })} options={[["all", "Toutes"], ["yes", "Avec"], ["no", "Sans"]]} />
            <RangeFields label="IV %" min={query.ivMin} max={query.ivMax} onMin={(value) => updateQuery({ ivMin: value })} onMax={(value) => updateQuery({ ivMax: value })} maxValue={100} />
            <RangeFields label="CP" min={query.cpMin} max={query.cpMax} onMin={(value) => updateQuery({ cpMin: value })} onMax={(value) => updateQuery({ cpMax: value })} />
            <RangeFields label="Poids (kg)" min={query.weightMin} max={query.weightMax} onMin={(value) => updateQuery({ weightMin: value })} onMax={(value) => updateQuery({ weightMax: value })} step="0.01" />
            <RangeFields label="Taille (m)" min={query.heightMin} max={query.heightMax} onMin={(value) => updateQuery({ heightMin: value })} onMax={(value) => updateQuery({ heightMax: value })} step="0.01" />
          </div>
        ) : null}
      </Card>

      {loading ? <Card className="grid min-h-52 place-items-center p-6"><div className="text-center"><LoaderCircle className="mx-auto animate-spin text-brand-2" size={30} /><p className="mt-3 font-bold">Chargement de la collection…</p></div></Card> : null}
      {loadError ? <Card className="border-danger/35 p-5" role="alert"><AlertTriangle className="text-danger" /><strong className="mt-2 block">Collection indisponible</strong><p className="mt-1 text-sm text-muted">{loadError}</p><Button className="mt-4" onClick={() => void load()}>Réessayer</Button></Card> : null}
      {!loading && !loadError && !data?.snapshot ? <Card className="grid min-h-60 place-items-center p-6 text-center"><div><FileJson className="mx-auto text-brand-2" size={38} /><h3 className="mt-3 text-xl font-black">Aucune collection importée</h3><p className="mt-2 text-sm text-muted">Importe ton export Pokémon GO pour créer le premier snapshot privé.</p><Button className="mt-4" variant="primary" icon={<Upload size={16} />} onClick={() => setImportOpen(true)}>Importer un JSON</Button></div></Card> : null}
      {!loading && data?.snapshot && data.pagination.total === 0 ? <Card className="grid min-h-44 place-items-center p-6 text-center"><div><Search className="mx-auto text-muted" size={32} /><h3 className="mt-3 text-lg font-black">Aucun résultat</h3><p className="mt-1 text-sm text-muted">Modifie ou réinitialise les filtres.</p></div></Card> : null}
      {data?.items.length ? <div className="grid gap-3"><PokemonTable items={data.items} />{data.items.map((pokemon) => <PokemonMobileCard pokemon={pokemon} key={pokemon.sourceId} />)}<Pagination query={query} data={data} onPage={(page) => updateQuery({ page })} onLimit={(limit) => updateQuery({ limit })} /></div> : null}

      <ImportModal open={importOpen} phase={importPhase} preview={importPreview} fileName={importFileName} error={importError} onClose={() => setImportOpen(false)} onSelectFile={(file) => void selectFile(file)} onConfirm={() => void confirmImport()} />
      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title="Historique des imports" description="Les snapshots archivés restent récupérables. Le rollback vérifie le volume avant la bascule.">
        {historyLoading ? <LoaderCircle className="mx-auto animate-spin text-brand-2" /> : <div className="grid gap-2">{history.length ? history.map((item) => <div className="flex flex-col gap-3 rounded-lg border border-line p-3 sm:flex-row sm:items-center sm:justify-between" key={item.id}><div><strong className="block">{item.sourceFileName}</strong><span className="mt-1 block text-xs text-muted">{dateFormatter.format(new Date(item.importedAt))} · {item.actualPokemonCount.toLocaleString("fr-FR")} Pokémon · {item.status}</span></div>{item.canRollback ? <Button size="sm" icon={<RotateCcw size={14} />} onClick={() => void rollback(item)}>Restaurer</Button> : <Badge tone={item.status === "active" ? "green" : item.status === "failed" ? "red" : "neutral"}>{item.status}</Badge>}</div>) : <p className="py-8 text-center text-sm text-muted">Aucun historique.</p>}</div>}
      </Modal>
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Array<readonly [string, string]>; onChange: (value: string) => void }) {
  return <label className="grid gap-1 text-xs font-black text-muted"><span>{label}</span><select className={selectClass} value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([id, name]) => <option key={id || "all"} value={id}>{name}</option>)}</select></label>;
}

function RangeFields({ label, min, max, maxValue, step = "1", onMin, onMax }: { label: string; min: string; max: string; maxValue?: number; step?: string; onMin: (value: string) => void; onMax: (value: string) => void }) {
  return <fieldset><legend className="mb-1 text-xs font-black text-muted">{label}</legend><div className="grid grid-cols-2 gap-2"><Input type="number" min="0" max={maxValue} step={step} value={min} onChange={(event) => onMin(event.target.value)} placeholder="Min" aria-label={`${label} minimum`} /><Input type="number" min="0" max={maxValue} step={step} value={max} onChange={(event) => onMax(event.target.value)} placeholder="Max" aria-label={`${label} maximum`} /></div></fieldset>;
}

function Pagination({ query, data, onPage, onLimit }: { query: QueryState; data: TrainerPokemonListResponse; onPage: (page: number) => void; onLimit: (limit: number) => void }) {
  return <Card className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm font-semibold text-muted">Page <strong className="text-foreground">{data.pagination.page}</strong> sur {Math.max(1, data.pagination.pages)} · {data.pagination.total.toLocaleString("fr-FR")} résultat(s)</span><div className="flex flex-wrap items-center gap-2"><label className="text-xs font-bold text-muted">Par page <select className="ml-2 min-h-9 rounded-lg border border-line bg-panel px-2 text-foreground" value={query.limit} onChange={(event) => onLimit(Number(event.target.value))}><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label><Button size="icon" aria-label="Page précédente" onClick={() => onPage(query.page - 1)} disabled={query.page <= 1}><ArrowLeft size={16} /></Button><Button size="icon" aria-label="Page suivante" onClick={() => onPage(query.page + 1)} disabled={query.page >= data.pagination.pages}><ArrowRight size={16} /></Button></div></Card>;
}
