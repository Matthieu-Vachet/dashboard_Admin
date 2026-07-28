"use client";

import {
  Activity,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Gauge,
  History,
  Pause,
  Play,
  RefreshCcw,
  RotateCcw,
  Save,
  Share2,
  Shuffle,
  Sparkles,
  Swords,
  Trash2,
} from "lucide-react";
import {
  type CSSProperties,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { TypeIcons } from "./asset-icons";
import { PokemonArtwork } from "./pokemon-artwork";
import { uiAssets } from "@/components/site/ui-assets";
import {
  typeColors,
  typeIcon as typeIconAsset,
  typeLabels,
} from "@/components/site/pokemon-style";
import {
  EmptyState,
  ErrorState,
  FetchLoadingState,
} from "@/components/admin/shared/state-system";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { decodePvpBattle, encodePvpBattle } from "@/lib/pvp-battle-deep-link.mjs";
import type {
  IvRankResult,
  IvRankingTableResult,
  MatrixBattleResult,
  MultiBattleResult,
  ShieldMatrixResult,
  SingleBattleResult,
} from "@/lib/pokemon-go-pvp-engine";

type CatalogMove = {
  id: string;
  name: string;
  type: string;
  category: "fast" | "charged";
  power: number;
  energy: number;
  turns: number;
  buffs: Record<string, number> | null;
  legacy?: boolean;
  elite?: boolean;
  shadowOnly?: boolean;
};

type CatalogPokemon = {
  canonicalId: string;
  pokemonId: string;
  formId: string;
  baseFormId: string;
  form: string;
  pokemonClass: string;
  dexNr: number;
  dexId: string;
  names: Record<string, string>;
  types: string[];
  availability: { shadow: boolean };
  identity: {
    canonicalId: string;
    localReference: string;
    assetsRef: string | null;
    image: string | null;
    shinyImage: string | null;
    resolutionStatus: "matched" | "missing-asset";
    assetResolution: {
      status: "matched" | "missing-asset";
      image: string | null;
      shinyImage: string | null;
      reason: string | null;
    };
  };
  moves: { fast: CatalogMove[]; charged: CatalogMove[] };
  recommended: Record<string, { fast: string | null; charged: string[] }>;
  searchText: string;
};

type League = {
  id: string;
  name: string;
  cpCap: number;
  levelCap: number;
  allowedTypes: string[];
  bannedTypes: string[];
  allowMega: boolean;
  allowShadow: boolean;
  allowLegendary: boolean;
};
type Catalog = {
  pokemon: CatalogPokemon[];
  types: Array<Record<string, unknown>>;
  leagues: League[];
  versions: {
    data: string;
    package: string;
    commit: string;
    syncedAt: string | null;
  };
};

type FighterConfig = {
  canonicalId: string;
  level: number;
  ivs: { attack: number; defense: number; stamina: number };
  shadow: boolean;
  fastMoveId: string;
  chargedMoveIds: string[];
  shields: number;
  startingEnergy: number;
  startingHpPercent: number;
  startingStages: { attack: number; defense: number };
  ivMode?: "optimal" | "perfect" | "custom";
  levelCap?: 40 | 41 | 50 | 51;
  presetLabel?: string;
};

type HistoryRecord = {
  id: string;
  createdAt: string;
  league: string;
  configuration: { leagueId?: string; pokemon?: FighterConfig[] };
  result: SingleBattleResult;
  engineVersion: string;
  dataVersion: string;
};

const endpoint = "/api/admin/pvp-simulator";
const tabs = [
  ["single", "Single"],
  ["multi", "Multi"],
  ["matrix", "Matrix"],
  ["history", "Historique"],
] as const;
const levelCaps = [40, 41, 50, 51] as const;
type LevelCap = (typeof levelCaps)[number];
type PickerFilter = "all" | "normal" | "mega" | "shadow" | "regional" | "other";

function pokemonName(pokemon?: CatalogPokemon | null) {
  return (
    pokemon?.names?.French ||
    pokemon?.names?.English ||
    pokemon?.formId ||
    "Pokémon"
  );
}

function leagueRecommendation(pokemon: CatalogPokemon, league: League) {
  const key =
    league.cpCap <= 500
      ? "little"
      : league.cpCap <= 1500
        ? "great"
        : league.cpCap <= 2500
          ? "ultra"
          : "master";
  return pokemon.recommended[key] || { fast: null, charged: [] };
}

function pokemonEligibleForLeague(pokemon: CatalogPokemon, league: League) {
  if (!league.allowMega && /mega|primal/i.test(pokemon.form)) return false;
  if (!league.allowLegendary && /LEGENDARY|MYTHIC/.test(pokemon.pokemonClass))
    return false;
  if (
    league.allowedTypes.length &&
    !pokemon.types.some((type) => league.allowedTypes.includes(type))
  )
    return false;
  return !pokemon.types.some((type) => league.bannedTypes.includes(type));
}

function baseConfig(pokemon: CatalogPokemon, league: League): FighterConfig {
  const recommended = leagueRecommendation(pokemon, league);
  const fastMoveId =
    recommended.fast &&
    pokemon.moves.fast.some((move) => move.id === recommended.fast)
      ? recommended.fast
      : pokemon.moves.fast[0]?.id || "";
  const chargedMoveIds = [
    ...new Set([
      ...recommended.charged.filter((id) =>
        pokemon.moves.charged.some((move) => move.id === id),
      ),
      ...pokemon.moves.charged.map((move) => move.id),
    ]),
  ].slice(0, 2);
  return {
    canonicalId: pokemon.canonicalId,
    level: 1,
    ivs: { attack: 0, defense: 0, stamina: 0 },
    shadow: false,
    fastMoveId,
    chargedMoveIds,
    shields: 1,
    startingEnergy: 0,
    startingHpPercent: 100,
    startingStages: { attack: 0, defense: 0 },
    ivMode: "optimal",
    levelCap: 50,
  };
}

function hydrateDeepLinkFighter(
  raw: Partial<FighterConfig> & { canonicalId?: string },
  catalog: CatalogPokemon[],
  league: League,
) {
  const pokemon = catalog.find((entry) => entry.canonicalId === raw?.canonicalId);
  if (!pokemon || !pokemonEligibleForLeague(pokemon, league)) return null;
  const fallback = baseConfig(pokemon, league);
  const validFast = pokemon.moves.fast.some((move) => move.id === raw.fastMoveId) ? raw.fastMoveId! : fallback.fastMoveId;
  const validCharged = (raw.chargedMoveIds || []).filter((id) => pokemon.moves.charged.some((move) => move.id === id)).slice(0, 2);
  const ivs = raw.ivs && [raw.ivs.attack, raw.ivs.defense, raw.ivs.stamina].every((value) => Number.isInteger(value) && value >= 0 && value <= 15)
    ? raw.ivs
    : fallback.ivs;
  const level = Number(raw.level);
  return {
    ...fallback,
    ...raw,
    canonicalId: pokemon.canonicalId,
    level: Number.isFinite(level) && level >= 1 && level <= league.levelCap && Number.isInteger(level * 2) ? level : fallback.level,
    ivs,
    shadow: Boolean(raw.shadow && pokemon.availability.shadow && league.allowShadow),
    fastMoveId: validFast,
    chargedMoveIds: validCharged.length ? validCharged : fallback.chargedMoveIds,
    shields: [0, 1, 2].includes(Number(raw.shields)) ? Number(raw.shields) : fallback.shields,
    startingEnergy: Math.max(0, Math.min(100, Math.trunc(Number(raw.startingEnergy) || 0))),
    startingHpPercent: Math.max(1, Math.min(100, Number(raw.startingHpPercent) || 100)),
    startingStages: {
      attack: Math.max(-4, Math.min(4, Math.trunc(Number(raw.startingStages?.attack) || 0))),
      defense: Math.max(-4, Math.min(4, Math.trunc(Number(raw.startingStages?.defense) || 0))),
    },
    ivMode: ["optimal", "perfect", "custom"].includes(String(raw.ivMode))
      ? raw.ivMode
      : fallback.ivMode,
    levelCap: levelCaps.includes(Number(raw.levelCap) as LevelCap)
      ? (Number(raw.levelCap) as LevelCap)
      : fallback.levelCap,
    presetLabel: raw.presetLabel,
  } satisfies FighterConfig;
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...init });
  const payload = (await response.json().catch(() => null)) as {
    success?: boolean;
    data?: T;
    error?: { message?: string; code?: string };
  } | null;
  if (!response.ok || !payload?.success)
    throw new Error(
      payload?.error?.message ||
        payload?.error?.code ||
        `HTTP ${response.status}`,
    );
  return payload.data as T;
}

function downloadJson(value: unknown, name: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name}-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function normalizedSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function formCategory(pokemon: CatalogPokemon): Exclude<PickerFilter, "all" | "shadow"> {
  const value = `${pokemon.form} ${pokemon.canonicalId}`.toLowerCase();
  if (/mega|primal/.test(value)) return "mega";
  if (/alola|galar|hisui|paldea/.test(value)) return "regional";
  if (pokemon.form === "normal" && /_NORMAL$/.test(pokemon.canonicalId))
    return "normal";
  return "other";
}

function formLabel(pokemon: CatalogPokemon, shadow = false) {
  if (shadow) return "SHADOW · OBSCUR";
  const labels: Record<string, string> = {
    normal: "Normal",
    alola: "ALOLA",
    galar: "GALAR",
    hisui: "HISUI",
    paldea: "PALDEA",
    mega: "MEGA",
    "mega-x": "MEGA_X",
    "mega-y": "MEGA_Y",
    primal: "PRIMAL",
  };
  return labels[pokemon.form.toLowerCase()] || pokemon.form.toUpperCase();
}

type PickerEntry = {
  id: string;
  pokemon: CatalogPokemon;
  shadow: boolean;
  category: Exclude<PickerFilter, "all">;
  searchText: string;
};

function PokemonPicker({
  id,
  pokemon,
  shadow = false,
  catalog,
  league,
  onSelect,
}: {
  id: string;
  pokemon: CatalogPokemon | null;
  shadow?: boolean;
  catalog: CatalogPokemon[];
  league: League;
  onSelect: (pokemon: CatalogPokemon, shadow: boolean) => void;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filter, setFilter] = useState<PickerFilter>("all");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState({
    top: 0,
    left: 0,
    width: 360,
    maxHeight: 420,
  });
  const entries = useMemo<PickerEntry[]>(() =>
    catalog.flatMap((entry) => {
      const baseCategory = formCategory(entry);
      const commonSearch = normalizedSearch(
        `${entry.searchText} ${entry.form} ${formLabel(entry)} ${baseCategory}`,
      );
      const variants: PickerEntry[] = [{
        id: entry.canonicalId,
        pokemon: entry,
        shadow: false,
        category: baseCategory,
        searchText: commonSearch,
      }];
      if (entry.availability.shadow) {
        variants.push({
          id: `${entry.canonicalId}:shadow`,
          pokemon: entry,
          shadow: true,
          category: "shadow",
          searchText: `${commonSearch} shadow obscur sombre frustration`,
        });
      }
      return variants;
    }), [catalog]);
  const results = useMemo(() => {
    const needle = normalizedSearch(deferredQuery);
    return entries
      .filter((entry) => filter === "all" || entry.category === filter)
      .filter((entry) => !needle || entry.searchText.includes(needle))
      .slice(0, 24);
  }, [deferredQuery, entries, filter]);

  useEffect(() => {
    if (!open) return undefined;
    const updatePlacement = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.max(360, rect.width);
      const availableBelow = window.innerHeight - rect.bottom - 16;
      const maxHeight = Math.min(440, Math.max(260, availableBelow));
      const openAbove = availableBelow < 280 && rect.top > availableBelow;
      setPlacement({
        top: openAbove ? Math.max(12, rect.top - Math.min(440, rect.top - 16) - 8) : rect.bottom + 8,
        left: rect.left,
        width,
        maxHeight: openAbove ? Math.min(440, rect.top - 16) : maxHeight,
      });
    };
    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open]);

  const choose = (entry: PickerEntry) => {
    const eligible = pokemonEligibleForLeague(entry.pokemon, league)
      && (!entry.shadow || league.allowShadow);
    if (!eligible) {
      toast.error("Cette forme est visible dans le catalogue mais hors du format actif.");
      return;
    }
    onSelect(entry.pokemon, entry.shadow);
    setOpen(false);
    setQuery("");
  };
  const active = results[activeIndex];
  const selectedId = pokemon
    ? `${pokemon.canonicalId}${shadow ? ":shadow" : ""}`
    : "";
  const list = (
    <div
      id={id}
      className="overflow-y-auto rounded-overlay border border-line-strong bg-panel-strong p-2 shadow-overlay"
      role="listbox"
    >
      <div className="sticky top-0 z-10 mb-2 space-y-2 rounded-xl bg-panel-strong p-1">
        <div className="flex items-center justify-between gap-2 px-1">
          <p className="text-xs font-black uppercase tracking-wider text-muted">
            {entries.length} variantes de combat
          </p>
          <Badge tone="cyan">24 max.</Badge>
        </div>
        <Input
          className="sm:hidden"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) => Math.min(Math.max(0, results.length - 1), index + 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(0, index - 1));
            }
            if (event.key === "Enter" && active) {
              event.preventDefault();
              choose(active);
            }
          }}
          placeholder="Nom FR/EN, dex, forme, ID…"
          aria-label="Recherche Pokémon mobile"
          autoFocus
        />
        <div className="flex gap-1 overflow-x-auto pb-1" aria-label="Filtres de formes">
          {([
            ["all", "Toutes"],
            ["normal", "Normal"],
            ["mega", "Méga"],
            ["shadow", "Obscur"],
            ["regional", "Régional"],
            ["other", "Autres"],
          ] as const).map(([value, label]) => (
            <button
              className={`min-h-9 shrink-0 rounded-lg px-2.5 type-caption-strong ${filter === value ? "bg-brand-2/18 text-accent-text" : "bg-surface-control text-muted"}`}
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => {
                setFilter(value);
                setActiveIndex(0);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {results.map((entry, index) => {
        const eligible = pokemonEligibleForLeague(entry.pokemon, league)
          && (!entry.shadow || league.allowShadow);
        return (
          <button
            className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-2 ${index === activeIndex ? "bg-surface-hover" : "hover:bg-surface-hover"} ${eligible ? "" : "opacity-55"}`}
            key={entry.id}
            id={`${id}-${entry.id}`}
            type="button"
            role="option"
            aria-selected={entry.id === selectedId}
            aria-disabled={!eligible}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => choose(entry)}
          >
            <PokemonArtwork
              pokemon={entry.pokemon}
              className="h-11 w-11"
              variant={{ shadow: entry.shadow }}
            />
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-sm text-foreground">
                {pokemonName(entry.pokemon)}{entry.shadow ? " Obscur" : ""}
              </strong>
              <small className="block truncate type-caption text-muted">
                #{entry.pokemon.dexId} · {formLabel(entry.pokemon, entry.shadow)}
                {!eligible ? " · Hors format" : ""}
              </small>
            </span>
            {entry.shadow ? (
              <img className="h-7 w-7 object-contain" src={uiAssets.icons.shadow} alt="Obscur" />
            ) : (
              <TypeIcons types={entry.pokemon.types} size="sm" />
            )}
          </button>
        );
      })}
      {!results.length ? <EmptyState title="Aucun Pokémon trouvé" /> : null}
    </div>
  );

  return (
    <div ref={anchorRef}>
      <Field label="Pokémon / forme de combat">
        <Input
          className="mt-1 bg-panel-strong"
          value={open ? query : pokemon ? `${pokemonName(pokemon)}${shadow ? " Obscur" : ""}` : ""}
          onClick={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          placeholder="Nom FR/EN, dex, forme, ID…"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={id}
          aria-activedescendant={open && active ? `${id}-${active.id}` : undefined}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) => Math.min(Math.max(0, results.length - 1), index + 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(0, index - 1));
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
            }
            if (event.key === "Enter" && open && active) {
              event.preventDefault();
              choose(active);
            }
          }}
        />
      </Field>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[1050]">
              <button
                className="absolute inset-0 bg-overlay backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
                type="button"
                aria-label="Fermer le sélecteur"
                onClick={() => setOpen(false)}
              />
              <div
                className="pvp-picker-surface"
                style={{
                  "--pvp-picker-top": `${placement.top}px`,
                  "--pvp-picker-left": `${placement.left}px`,
                  "--pvp-picker-width": `${placement.width}px`,
                  "--pvp-picker-max-height": `${placement.maxHeight}px`,
                } as CSSProperties}
              >
                {list}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function MoveOption({ move }: { move: CatalogMove }) {
  const energy =
    move.category === "fast" ? `+${move.energy}` : Math.abs(move.energy);
  return (
    <>
      {move.name} · {move.power} P · {energy} E{move.elite ? " · Elite" : ""}
    </>
  );
}

function MoveSelect({
  label,
  moves,
  value,
  onChange,
}: {
  label: string;
  moves: CatalogMove[];
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = moves.find((move) => move.id === value) || moves[0];
  const type = String(selected?.type || "NORMAL").toUpperCase();
  const color = typeColors[type] || typeColors.NORMAL;
  const icon = typeIconAsset(type);
  return (
    <Field label={label}>
      <div
        className="relative mt-1 overflow-hidden rounded-control border"
        style={{
          borderColor: `color-mix(in srgb, ${color} 56%, transparent)`,
          background: `linear-gradient(135deg, color-mix(in srgb, ${color} 25%, var(--surface-control)), color-mix(in srgb, ${color} 10%, var(--surface-control)))`,
        }}
      >
        {icon ? (
          <img
            className="pointer-events-none absolute left-3 top-1/2 z-10 h-7 w-7 -translate-y-1/2 object-contain"
            src={icon}
            alt=""
          />
        ) : null}
        <Select
          className="min-h-14 border-0 bg-transparent pl-12 pr-3 font-black"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
        >
          {moves.map((move) => (
            <option key={move.id} value={move.id}>
              <MoveOption move={move} />
            </option>
          ))}
        </Select>
        {selected ? (
          <span className="pointer-events-none absolute bottom-1.5 left-12 type-overline-compact text-muted">
            {typeLabels[type] || type} · {selected.category === "fast" ? `${selected.turns} tour${selected.turns > 1 ? "s" : ""}` : `${Math.abs(selected.energy)} énergie`}
            {selected.elite || selected.legacy ? " · Elite/Legacy" : ""}
          </span>
        ) : null}
      </div>
    </Field>
  );
}

function ShieldIcons({ count, compact = false }: { count: number; compact?: boolean }) {
  if (count <= 0)
    return <span className="font-black text-muted" aria-label="Aucun bouclier">—</span>;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} bouclier${count > 1 ? "s" : ""}`}>
      {Array.from({ length: count }, (_, index) => (
        <img
          className={compact ? "h-4 w-4 object-contain" : "h-6 w-6 object-contain"}
          key={index}
          src={uiAssets.icons.shieldAlt}
          alt=""
        />
      ))}
    </span>
  );
}

function FighterEditor({
  side,
  pokemon,
  config,
  rank,
  catalog,
  typeCatalog,
  league,
  onSelect,
  onPatch,
  onRankOne,
  onPerfect,
  onMaximize,
  onRankSelected,
}: {
  side: "A" | "B";
  pokemon: CatalogPokemon | null;
  config: FighterConfig | null;
  rank: IvRankResult | null;
  catalog: CatalogPokemon[];
  typeCatalog: Array<Record<string, unknown>>;
  league: League;
  onSelect: (pokemon: CatalogPokemon, shadow: boolean) => void;
  onPatch: (patch: Partial<FighterConfig>) => void;
  onRankOne: (levelCap: LevelCap) => void;
  onPerfect: (levelCap: LevelCap) => void;
  onMaximize: (levelCap: LevelCap) => void;
  onRankSelected: (rank: IvRankResult) => void;
}) {
  const [rankingTable, setRankingTable] = useState<IvRankingTableResult | null>(null);
  const [rankingsOpen, setRankingsOpen] = useState(false);
  const [rankingBusy, setRankingBusy] = useState(false);
  const [rankingPage, setRankingPage] = useState(0);
  const pageSize = 64;
  const levelCap = (config?.levelCap || 50) as LevelCap;
  const openRankings = async () => {
    if (!pokemon || !config) return;
    setRankingsOpen(true);
    setRankingPage(0);
    if (rankingTable?.levelCap === levelCap) return;
    setRankingBusy(true);
    try {
      const table = await api<IvRankingTableResult>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "iv-rankings",
          leagueId: league.id,
          canonicalId: config.canonicalId,
          levelCap,
        }),
      });
      setRankingTable(table);
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Classement IV indisponible.");
      setRankingsOpen(false);
    } finally {
      setRankingBusy(false);
    }
  };
  if (!pokemon || !config) return (
    <section className="min-w-0 rounded-3xl border border-dashed border-line-strong bg-surface-inset-subtle p-4 sm:p-5">
      <CardHeader eyebrow={`BUILD ${side}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-20 w-20 place-items-center rounded-2xl border border-dashed border-cyan-200/20 bg-cyan-300/[0.05]"><img className="h-12 w-12 object-contain opacity-60" src={uiAssets.icons.pokemon} alt="" /></span>
          <div><CardTitle>Aucun Pokémon</CardTitle><CardDescription>Sélectionne un combattant pour afficher son build.</CardDescription></div>
        </div>
      </CardHeader>
      <div className="mt-5"><PokemonPicker id={`pvp-pokemon-results-${side.toLowerCase()}`} pokemon={null} catalog={catalog} league={league} onSelect={onSelect} /></div>
    </section>
  );
  const patchIv = (key: keyof FighterConfig["ivs"], value: number) =>
    onPatch({
      ivs: { ...config.ivs, [key]: value },
      ivMode: "custom",
      presetLabel: "Mes IV",
    });
  const charged = config.chargedMoveIds;
  const availableChargedMoves = pokemon.moves.charged.filter(
    (move) => !move.shadowOnly || config.shadow,
  );
  const advancedCount = Number(config.startingEnergy !== 0)
    + Number(config.startingHpPercent !== 100)
    + Number(config.startingStages.attack !== 0)
    + Number(config.startingStages.defense !== 0);
  const rankingRows = rankingTable?.rows.slice(
    rankingPage * pageSize,
    (rankingPage + 1) * pageSize,
  ) || [];
  const totalPages = Math.max(1, Math.ceil((rankingTable?.rows.length || 0) / pageSize));
  return (
    <section className="min-w-0 rounded-3xl border border-line bg-surface-subtle p-4 sm:p-5">
      <CardHeader eyebrow={`BUILD ${side}`}>
        <div className="flex items-center gap-3">
          <PokemonArtwork
            pokemon={pokemon}
            className="h-20 w-20"
            priority={side === "A"}
            variant={{ shadow: config.shadow }}
          />
          <div className="min-w-0">
            <CardTitle className="truncate">{pokemonName(pokemon)}</CardTitle>
            <div className="flex flex-wrap gap-1.5">
              {config.presetLabel ? <Badge tone={config.presetLabel === "Mes IV" ? "violet" : "cyan"}>{config.presetLabel}</Badge> : null}
              {config.shadow ? <Badge tone="violet"><img className="h-3.5 w-3.5 object-contain" src={uiAssets.icons.shadow} alt="" /> Obscur</Badge> : null}
            </div>
            <p className="mt-1 truncate type-overline-compact text-muted">
              {pokemon.canonicalId}
            </p>
            <div className="mt-2">
              <TypeIcons types={pokemon.types} catalog={typeCatalog} />
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="mt-5">
        <PokemonPicker
          id={`pvp-pokemon-results-${side.toLowerCase()}`}
          pokemon={pokemon}
          shadow={config.shadow}
          catalog={catalog}
          league={league}
          onSelect={onSelect}
        />
      </div>

      {pokemon.availability.shadow ? (
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-control border border-line bg-surface-control p-1" aria-label="Variante de combat">
          <button className={`rounded-lg px-3 text-xs font-black ${!config.shadow ? "bg-brand-2/18 text-accent-text" : "text-muted"}`} type="button" aria-pressed={!config.shadow} onClick={() => { const regularMoves = config.chargedMoveIds.filter((id) => !pokemon.moves.charged.find((move) => move.id === id)?.shadowOnly); onPatch({ shadow: false, chargedMoveIds: regularMoves.length ? regularMoves : pokemon.moves.charged.filter((move) => !move.shadowOnly).slice(0, 2).map((move) => move.id) }); }}>Normal</button>
          <button className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 text-xs font-black ${config.shadow ? "bg-violet-400/18 text-violet-100" : "text-muted"}`} type="button" aria-pressed={config.shadow} onClick={() => onPatch({ shadow: true })}><img className="h-5 w-5 object-contain" src={uiAssets.icons.shadow} alt="" /> Obscur</button>
        </div>
      ) : null}

      <section className="mt-4 rounded-2xl border border-line bg-surface-inset-subtle p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-foreground">IV & Niveau</h3>
            <p className="type-caption text-muted">Le cap est explicite et indépendant du format.</p>
          </div>
          {rank ? <Badge tone="cyan">#{rank.rank} / {rank.combinations}</Badge> : null}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-control border border-line bg-surface-control p-1" role="group" aria-label="Mode IV">
          {([
            ["optimal", "Rank optimal"],
            ["perfect", "15/15/15"],
            ["custom", "Personnalisé"],
          ] as const).map(([mode, label]) => (
            <button
              className={`rounded-lg px-2 type-label ${config.ivMode === mode ? "bg-brand-2/18 text-accent-text" : "text-muted"}`}
              key={mode}
              type="button"
              aria-pressed={config.ivMode === mode}
              onClick={() => {
                onPatch({ ivMode: mode, presetLabel: mode === "custom" ? "Mes IV" : mode === "perfect" ? "15/15/15" : "Rank 1" });
                if (mode === "optimal") onRankOne(levelCap);
                if (mode === "perfect") onPerfect(levelCap);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Field label="Level cap">
            <Select
              className="mt-1"
              value={levelCap}
              onChange={(event) => {
                const nextCap = Number(event.target.value) as LevelCap;
                onPatch({ levelCap: nextCap });
                if (config.ivMode === "optimal") onRankOne(nextCap);
                if (config.ivMode === "perfect") onPerfect(nextCap);
              }}
            >
              {levelCaps.map((cap) => <option key={cap} value={cap}>Cap {cap}</option>)}
            </Select>
          </Field>
          <Field label="Niveau">
            <Input className="mt-1" type="number" min={1} max={levelCap} step={0.5} value={config.level} onChange={(event) => onPatch({ level: Number(event.target.value), ivMode: "custom", presetLabel: "Mes IV" })} />
          </Field>
          {(["attack", "defense", "stamina"] as const).map((key) => (
            <Field key={key} label={key === "stamina" ? "HP IV" : `${key === "attack" ? "Atk" : "Def"} IV`}>
              <Input className="mt-1" type="number" min={0} max={15} value={config.ivs[key]} onChange={(event) => patchIv(key, Number(event.target.value))} />
            </Field>
          ))}
        </div>
        {rank ? (
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-surface-control p-3 text-center type-caption text-muted">
            <span><b className="block text-base text-foreground">{rank.cp}</b>PC</span>
            <span><b className="block text-base text-foreground">{rank.level}</b>Niveau</span>
            <span><b className="block text-base text-foreground">{rank.statProduct.toFixed(2)}</b>Stat Product</span>
          </div>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="primary" type="button" onClick={() => onRankOne(levelCap)}>Rank 1</Button>
          <Button size="sm" type="button" onClick={() => onMaximize(levelCap)}>Maximiser</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => { onPatch({ levelCap: 50, ivMode: "optimal", presetLabel: "Rank 1" }); onRankOne(50); }}>Défaut</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => void openRankings()}>Voir classement IV</Button>
        </div>
      </section>

      <div className="mt-4 grid gap-3">
        <MoveSelect label="Fast Move" moves={pokemon.moves.fast} value={config.fastMoveId} onChange={(fastMoveId) => onPatch({ fastMoveId })} />
        {[0, 1].map((index) => (
          <MoveSelect
            key={index}
            label={`Charged Move ${index + 1}`}
            moves={availableChargedMoves}
            value={charged[index] || availableChargedMoves[0]?.id || ""}
            onChange={(value) => {
              const next = [...charged];
              next[index] = value;
              onPatch({ chargedMoveIds: next.filter(Boolean).slice(0, 2) });
            }}
          />
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 type-overline-compact text-muted">Shields de départ</p>
        <div className="grid grid-cols-3 gap-1 rounded-control border border-line bg-surface-control p-1">
          {[0, 1, 2].map((count) => (
            <button className={`grid min-h-12 place-items-center rounded-lg ${config.shields === count ? "bg-brand-2/20 text-accent-text" : "text-muted"}`} key={count} type="button" onClick={() => onPatch({ shields: count })} aria-pressed={config.shields === count}><ShieldIcons count={count} /></button>
          ))}
        </div>
      </div>

      <details className="mt-4 rounded-2xl border border-line bg-surface-inset-subtle p-3">
        <summary className="cursor-pointer text-sm font-black text-foreground">Options avancées{advancedCount ? ` · ${advancedCount} modifiée${advancedCount > 1 ? "s" : ""}` : ""}</summary>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Field label="Énergie initiale">
          <Input
            className="mt-1"
            type="number"
            min={0}
            max={100}
            value={config.startingEnergy}
            onChange={(event) =>
              onPatch({ startingEnergy: Number(event.target.value) })
            }
          />
        </Field>
        <Field label="HP de départ %">
          <Input
            className="mt-1"
            type="number"
            min={1}
            max={100}
            value={config.startingHpPercent}
            onChange={(event) =>
              onPatch({ startingHpPercent: Number(event.target.value) })
            }
          />
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {(["attack", "defense"] as const).map((key) => (
          <Field
            key={key}
            label={`Stage ${key === "attack" ? "Attack" : "Defense"}`}
          >
            <Select
              className="mt-1"
              value={config.startingStages[key]}
              onChange={(event) =>
                onPatch({
                  startingStages: {
                    ...config.startingStages,
                    [key]: Number(event.target.value),
                  },
                })
              }
            >
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((stage) => (
                <option key={stage} value={stage}>
                  {stage > 0 ? `+${stage}` : stage}
                </option>
              ))}
            </Select>
          </Field>
        ))}
      </div>
      </details>
      <Modal
        open={rankingsOpen}
        onClose={() => setRankingsOpen(false)}
        title={`Classement IV · ${pokemonName(pokemon)}`}
        description={`Ligue ${league.name} · ${league.cpCap} PC · level cap ${levelCap} · 4096 spreads calculés`}
        className="max-w-5xl"
        footer={<div className="flex items-center justify-between gap-3"><span className="text-xs font-bold text-muted">Page {rankingPage + 1} / {totalPages}</span><Button type="button" onClick={() => setRankingsOpen(false)}>Fermer</Button></div>}
      >
        {rankingBusy ? <FetchLoadingState title="Calcul des 4096 spreads…" /> : (
          <>
            <div className="mb-3 flex items-center justify-between gap-2">
              <Button size="icon" type="button" icon={<ChevronLeft size={16} />} aria-label="Page précédente" disabled={rankingPage === 0} onClick={() => setRankingPage((page) => Math.max(0, page - 1))} />
              <strong className="text-sm">Rangs {rankingPage * pageSize + 1}–{Math.min((rankingPage + 1) * pageSize, rankingTable?.rows.length || 0)}</strong>
              <Button size="icon" type="button" icon={<ChevronRight size={16} />} aria-label="Page suivante" disabled={rankingPage >= totalPages - 1} onClick={() => setRankingPage((page) => Math.min(totalPages - 1, page + 1))} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead className="text-muted"><tr><th className="p-2">Rank</th><th className="p-2">Level</th><th className="p-2">IV</th><th className="p-2">CP</th><th className="p-2">Stat Product</th><th className="p-2 text-right">Action</th></tr></thead>
                <tbody>{rankingRows.map((row) => <tr className="border-t border-line" key={`${row.ivs.attack}-${row.ivs.defense}-${row.ivs.stamina}`}><td className="p-2 font-black">#{row.rank}</td><td className="p-2">{row.level}</td><td className="p-2 font-mono">{row.ivs.attack}/{row.ivs.defense}/{row.ivs.stamina}</td><td className="p-2">{row.cp}</td><td className="p-2">{row.statProduct.toFixed(2)}</td><td className="p-2 text-right"><Button size="sm" variant="primary" type="button" onClick={() => { onRankSelected(row); setRankingsOpen(false); }}>Choisir</Button></td></tr>)}</tbody>
              </table>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

function BattleArena({
  pokemon,
  fighters,
  ranks,
  league,
  typeCatalog,
  result,
}: {
  pokemon: [CatalogPokemon | null, CatalogPokemon | null];
  fighters: [FighterConfig | null, FighterConfig | null];
  ranks: [IvRankResult | null, IvRankResult | null];
  league: League;
  typeCatalog: Array<Record<string, unknown>>;
  result: SingleBattleResult | null;
}) {
  return (
    <Card className="relative min-h-[20rem] overflow-hidden border-cyan-200/15 p-4 sm:min-h-[25rem] sm:p-6" tone="strong">
      <img className="absolute inset-0 h-full w-full object-cover opacity-35" src={uiAssets.backgrounds.battle} alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,.2),rgba(3,7,18,.92))]" />
      <div className="relative flex h-full min-h-[18rem] flex-col justify-between sm:min-h-[22rem]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-cyan-200/20 bg-slate-950/70 px-3 py-1 text-xs font-black text-cyan-50">{league.name} · {league.cpCap} PC</span>
          <span className="rounded-full border border-line bg-slate-950/70 px-3 py-1 text-xs font-black text-muted">1 tour = 0,5 s</span>
        </div>
        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 py-4 sm:gap-8">
          {([0, 1] as const).map((index) => (
            <div className={`flex min-w-0 flex-col items-center justify-center text-center ${index === 1 ? "order-3" : ""}`} key={index}>
              <div className="grid aspect-square w-full max-w-32 place-items-center rounded-overlay border border-cyan-100/20 bg-slate-950/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] sm:max-w-48 sm:p-4">
                {pokemon[index] ? <PokemonArtwork pokemon={pokemon[index]} variant={{ shadow: fighters[index]?.shadow }} priority={index === 0} className="h-full w-full border-0 bg-transparent p-0" imageClassName="scale-[.90] object-center" /> : <img className="h-16 w-16 object-contain opacity-55 sm:h-24 sm:w-24" src={uiAssets.icons.pokemon} alt="" />}
              </div>
              <strong className="mt-3 max-w-full truncate text-sm text-white sm:text-xl">{pokemon[index] ? `${pokemonName(pokemon[index])}${fighters[index]?.shadow ? " Obscur" : ""}` : `Combattant ${index === 0 ? "A" : "B"}`}</strong>
              {pokemon[index] ? <div className="mt-2"><TypeIcons types={pokemon[index]?.types} catalog={typeCatalog} size="sm" /></div> : null}
              {fighters[index] ? (
                <div className="mt-3 grid w-full max-w-64 grid-cols-3 gap-1 rounded-xl border border-line bg-slate-950/65 p-2 text-center type-overline-compact text-muted">
                  <span><b className="block text-sm text-white">{ranks[index]?.cp ?? result?.combatants[index].stats.cp ?? "—"}</b>PC</span>
                  <span><b className="block text-sm text-white">{fighters[index]?.level}</b>Niv.</span>
                  <span><b className="block text-sm text-white">{fighters[index]?.ivs.attack}/{fighters[index]?.ivs.defense}/{fighters[index]?.ivs.stamina}</b>IV</span>
                </div>
              ) : null}
              {result ? (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-full border border-line bg-slate-950/70 px-3 py-1.5 type-overline-compact text-foreground-secondary">
                  <span>{result.combatants[index].remainingHp} HP</span>
                  <span>· {result.combatants[index].remainingEnergy} E</span>
                  <ShieldIcons count={result.combatants[index].shieldsRemaining} compact />
                </div>
              ) : null}
            </div>
          ))}
          <div className="order-2 grid h-12 w-12 place-items-center self-center rounded-full border border-violet-200/25 bg-violet-400/15 shadow-[0_0_40px_rgba(139,92,246,.35)] sm:h-20 sm:w-20"><img className="h-7 w-7 object-contain sm:h-11 sm:w-11" src={uiAssets.icons.swords} alt="Versus" /></div>
        </div>
      </div>
    </Card>
  );
}

function ResultHeader({ result, pokemon }: { result: SingleBattleResult; pokemon: [CatalogPokemon | null, CatalogPokemon | null] }) {
  const winner =
    result.winner === null ? null : result.combatants[result.winner];
  const ratingTotal = Math.max(1, result.ratings[0] + result.ratings[1]);
  const leftShare = Math.round((result.ratings[0] / ratingTotal) * 100);
  return (
    <Card className="relative overflow-hidden border-emerald-200/15 p-5 sm:p-7" tone="strong">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(52,211,153,.18),transparent_34%),linear-gradient(135deg,rgba(15,23,42,.2),rgba(2,6,23,.75))]" />
      <div className="relative text-center motion-safe:animate-[fade-in_.45s_ease-out]">
        <p className="type-overline text-emerald-200">{winner ? "VICTOIRE" : "ÉGALITÉ"}</p>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          {([0, 1] as const).map((index) => (
            <div className={index === 1 ? "order-3" : ""} key={index}>
              {pokemon[index] ? <PokemonArtwork pokemon={pokemon[index]} className={`mx-auto h-20 w-20 sm:h-28 sm:w-28 ${result.winner === index ? "border-emerald-200/40 bg-emerald-400/12" : "opacity-75"}`} imageClassName="scale-[.9]" /> : null}
              <strong className="mt-2 block truncate text-xs text-foreground sm:text-base">{result.combatants[index].name}</strong>
              <span className="mt-1 inline-flex items-center gap-2 type-overline-compact text-muted"><ShieldIcons count={result.combatants[index].shieldsRemaining} compact /> {result.combatants[index].remainingHp} HP · {result.combatants[index].remainingEnergy} E</span>
            </div>
          ))}
          <div className="order-2 min-w-20 sm:min-w-32">
            <strong className="block text-4xl font-black text-white sm:text-6xl">{result.battleRating}</strong>
            <span className="mt-1 block type-overline-compact text-emerald-200">Battle Rating</span>
            <span className="mt-2 block type-overline-compact text-muted">{result.durationTurns} tours · {(result.durationMs / 1_000).toFixed(1)} s</span>
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl">{winner?.name || "Match nul"}</h2>
        <p className="mt-1 type-caption-strong text-muted">{result.ratingClass} · moteur {result.versions.engine}</p>
      </div>
      <div className="relative mt-6">
        <div className="flex items-center justify-between text-xs font-black text-foreground"><span>{result.ratings[0]}</span><span>VS</span><span>{result.ratings[1]}</span></div>
        <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-surface-control" aria-label={`Dominance ${leftShare} % contre ${100 - leftShare} %`}><span className="bg-cyan-400" style={{ width: `${leftShare}%` }} /><span className="bg-violet-400" style={{ width: `${100 - leftShare}%` }} /></div>
      </div>
      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
        {result.combatants.map((combatant, index) => (
          <div
            className={`rounded-2xl border p-4 ${result.winner === index ? "border-success/35 bg-success/10" : "border-line bg-surface-inset-subtle"}`}
            key={combatant.canonicalId}
          >
            <div className="flex items-center justify-between gap-3">
              <strong>{combatant.name}</strong>
              <Badge tone={result.winner === index ? "green" : "neutral"}>
                {combatant.rating}
              </Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <span>
                <b className="block text-lg text-foreground">
                  {combatant.remainingHp}
                </b>
                HP
              </span>
              <span>
                <b className="block text-lg text-foreground">
                  {combatant.remainingEnergy}
                </b>
                Énergie
              </span>
              <span><b className="grid min-h-7 place-items-center text-lg text-foreground"><ShieldIcons count={combatant.shieldsRemaining} compact /></b>Shields</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ShieldScenarioMatrix({
  matrix,
  activeResultId,
  onSelect,
}: {
  matrix: ShieldMatrixResult;
  activeResultId?: string;
  onSelect: (result: SingleBattleResult) => void;
}) {
  const scenario = (left: number, right: number) =>
    matrix.scenarios.find(
      (item) => item.shields[0] === left && item.shields[1] === right,
    );
  return (
    <Card className="p-4 sm:p-5">
      <CardHeader eyebrow="TOUS LES SCÉNARIOS">
        <div>
          <CardTitle><span className="inline-flex items-center gap-2"><img className="h-6 w-6 object-contain" src={uiAssets.icons.shieldAlt} alt="" />Shield Matrix</span></CardTitle>
          <CardDescription>
            Cliquer sur une case recharge son résultat et sa timeline.
          </CardDescription>
        </div>
      </CardHeader>
      <div className="mt-4 overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[430px] border-separate border-spacing-2 text-center text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left text-muted">Vous \ Adversaire</th>
              {[0, 1, 2].map((value) => (
                <th key={value} className="p-2 text-muted">
                  <span className="inline-grid min-h-8 place-items-center"><ShieldIcons count={value} /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((left) => (
              <tr key={left}>
                <th className="p-2 text-left text-muted"><ShieldIcons count={left} /></th>
                {[0, 1, 2].map((right) => {
                  const item = scenario(left, right)!;
                  const win = item.result.winner === 0;
                  const tie = item.result.winner === null;
                  return (
                    <td key={right}>
                      <button
                        className={`min-h-20 w-full rounded-xl border p-2 font-black transition hover:-translate-y-0.5 ${item.result.id === activeResultId ? "ring-2 ring-brand-2 ring-offset-2 ring-offset-background" : ""} ${tie ? "border-line bg-surface-control" : win ? "border-success/35 bg-success/10 text-success-foreground" : "border-danger/35 bg-danger/10 text-danger-foreground"}`}
                        type="button"
                        onClick={() => onSelect(item.result)}
                        aria-pressed={item.result.id === activeResultId}
                      >
                        <span className="block">
                          {tie ? "Égalité" : win ? "Victoire" : "Défaite"}
                        </span>
                        <strong className="mt-1 block text-lg">
                          {item.result.ratings[0]}
                        </strong>
                        <small>
                          {item.result.combatants[0].remainingHp} HP
                        </small>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function timelineEventAsset(action: SingleBattleResult["timeline"][number]["action"]) {
  if (action === "fast") return uiAssets.icons.attackMove;
  if (action === "charged" || action === "cmp") return uiAssets.icons.swords;
  if (action === "shield") return uiAssets.icons.shieldAlt;
  if (action === "buff" || action === "debuff" || action === "form") return uiAssets.icons.up;
  return uiAssets.icons.battle;
}

function Timeline({ result }: { result: SingleBattleResult }) {
  const [cursor, setCursor] = useState(result.timeline.length - 1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [selected, setSelected] = useState(
    result.timeline[result.timeline.length - 1] || null,
  );
  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () =>
        setCursor((current) => {
          if (current >= result.timeline.length - 1) {
            setPlaying(false);
            return current;
          }
          return current + 1;
        }),
      Math.max(60, 500 / speed),
    );
    return () => window.clearInterval(timer);
  }, [playing, result.timeline.length, speed]);
  const visible = result.timeline.slice(0, cursor + 1);
  return (
    <Card className="p-4 sm:p-5">
      <CardHeader
        eyebrow="REPLAY DÉTERMINISTE"
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              type="button"
              icon={playing ? <Pause size={15} /> : <Play size={15} />}
              onClick={() => {
                if (cursor >= result.timeline.length - 1) setCursor(-1);
                setPlaying((value) => !value);
              }}
            >
              {playing ? "Pause" : "Play"}
            </Button>
            <Button
              size="sm"
              type="button"
              icon={<RotateCcw size={15} />}
              onClick={() => {
                setCursor(-1);
                setPlaying(false);
              }}
            >
              Restart
            </Button>
            <Select
              aria-label="Vitesse de lecture"
              className="min-h-9 w-20"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            >
              {[1, 2, 4, 8].map((value) => (
                <option key={value} value={value}>
                  {value}x
                </option>
              ))}
            </Select>
          </div>
        }
      >
        <div>
          <CardTitle>Timeline complète</CardTitle>
          <CardDescription>
            1 tour = 0,5 seconde. Les détails restent lisibles au clavier et
            sans code couleur.
          </CardDescription>
        </div>
      </CardHeader>
      <div
        className="mt-4 overflow-x-auto overscroll-x-contain pb-2"
        role="region"
        tabIndex={0}
        aria-label="Timeline de la bataille"
      >
        <div
          className="grid min-w-max grid-rows-[auto_6rem_6rem] gap-y-2"
          style={{
            gridTemplateColumns: `repeat(${Math.max(1, visible.length)}, minmax(8rem, 10rem))`,
          }}
        >
          {visible.map((event) => (
            <span
              className="px-1 text-center type-overline-compact text-disabled"
              key={`turn-${event.id}`}
            >
              Tour {event.turn}
            </span>
          ))}
          {([0, 1] as const).flatMap((actor) =>
            visible.map((event, index) => (
              <div
                className="px-1"
                key={`${actor}-${event.id}`}
                style={{ gridRow: actor + 2, gridColumn: index + 1 }}
              >
                {event.actor === actor ? (
                  <button
                    className={`h-full w-full rounded-xl border p-2 text-left type-caption-strong transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-2 ${event.action === "faint" ? "border-danger/40 bg-danger/10" : event.action === "shield" ? "border-brand-2/35 bg-brand-2/10" : "border-line bg-surface-control"}`}
                    type="button"
                    onClick={() => setSelected(event)}
                  >
                    <strong className="flex items-center gap-1.5 truncate text-foreground"><img className="h-4 w-4 shrink-0 object-contain" src={timelineEventAsset(event.action)} alt="" />{event.moveType && typeIconAsset(event.moveType) ? <img className="h-4 w-4 shrink-0 object-contain" src={typeIconAsset(event.moveType)!} alt="" /> : null}<span className="truncate">{event.moveName || event.action.toUpperCase()}</span></strong>
                    <span className="mt-1 block truncate type-caption text-muted">{result.combatants[event.actor].name}</span>
                    <span className="mt-1 block line-clamp-2 text-muted">{event.damage !== undefined ? `${event.damage} dégâts` : event.action.toUpperCase()}{event.energyAfter !== undefined ? ` · ${event.energyAfter} E` : ""}{event.hpAfter !== undefined ? ` · ${event.hpAfter} HP` : ""}</span>
                  </button>
                ) : (
                  <span className="block h-full border-l border-line-subtle" />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      {selected ? (
        <details
          className="mt-4 rounded-2xl border border-line bg-surface-inset-subtle p-4"
        >
          <summary className="cursor-pointer text-sm font-black text-foreground">
            Voir données techniques · tour {selected.turn}
          </summary>
          <p className="mt-3 text-sm font-bold text-foreground">{selected.description}</p>
          <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-muted">
            {JSON.stringify(selected, null, 2)}
          </pre>
        </details>
      ) : null}
    </Card>
  );
}

function BattleSummary({ result }: { result: SingleBattleResult }) {
  return (
    <Card className="p-4 sm:p-5">
      <CardHeader eyebrow="ANALYSE">
        <div>
          <CardTitle>Combat Summary</CardTitle>
          <CardDescription>
            Dégâts, énergie, boucliers, buffs et CMP calculés par le moteur.
          </CardDescription>
        </div>
      </CardHeader>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {result.combatants.map((combatant, combatantIndex) => {
          const events = result.timeline.filter((event) => event.actor === combatantIndex);
          const fastDamage = events.filter((event) => event.action === "fast").reduce((sum, event) => sum + Number(event.damage || 0), 0);
          const chargedDamage = events.filter((event) => event.action === "charged").reduce((sum, event) => sum + Number(event.damage || 0), 0);
          const totalMoveDamage = fastDamage + chargedDamage;
          const fastShare = totalMoveDamage ? Math.round((fastDamage / totalMoveDamage) * 100) : 0;
          const chargedShare = totalMoveDamage ? 100 - fastShare : 0;
          const fastPercent = totalMoveDamage ? `${fastShare} %` : "—";
          const chargedPercent = totalMoveDamage ? `${chargedShare} %` : "—";
          const energyEfficiency = combatant.energyUsed ? (combatant.damageDealt / combatant.energyUsed).toFixed(2) : "—";
          const turnEfficiency = result.durationTurns ? (combatant.damageDealt / result.durationTurns).toFixed(2) : "—";
          return (
          <div
            className="rounded-2xl border border-line bg-surface-inset-subtle p-4"
            key={combatant.canonicalId}
          >
            <h3 className="font-black text-foreground">{combatant.name}</h3>
            <div className="mt-4 space-y-3">
              {[
                ["Dégâts Fast", fastShare, "bg-cyan-400"],
                ["Dégâts Charged", chargedShare, "bg-violet-400"],
                ["HP restant", Math.max(0, Math.min(100, combatant.remainingHpPercent)), "bg-emerald-400"],
                ["Énergie conservée", combatant.remainingEnergy, "bg-amber-300"],
              ].map(([label, value, color]) => (
                <div key={String(label)}>
                  <div className="flex items-center justify-between type-overline-compact text-muted"><span>{label}</span><span>{value} %</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-control"><span className={`block h-full rounded-full ${color}`} style={{ width: `${Number(value)}%` }} /></div>
                </div>
              ))}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
              {[
                ["Dégâts infligés", combatant.damageDealt],
                ["Dégâts reçus", combatant.damageTaken],
                ["Fast Moves", combatant.fastMoves],
                ["Charged Moves", combatant.chargedMoves],
                ["Énergie générée", combatant.energyGenerated],
                ["Énergie perdue", combatant.energyWasted],
                ["Shields utilisés", combatant.shieldsUsed],
                ["Dégâts bloqués", combatant.shieldDamageBlocked],
                ["Buffs / debuffs", combatant.buffActivations],
                ["CMP gagnées", combatant.cmpWins, "Priorité des attaques chargées simultanées, basée sur l’Attaque réelle."],
                ["Dégâts Fast", fastPercent, "Part des dégâts directs provenant des Fast Moves."],
                ["Dégâts Charged", chargedPercent, "Part des dégâts directs provenant des Charged Moves."],
                ["Efficacité énergie", energyEfficiency, "Dégâts infligés divisés par l’énergie dépensée."],
                ["HP restants", `${combatant.remainingHpPercent} %`, "Pourcentage de points de vie à la fin du combat."],
                ["Efficacité / tour", turnEfficiency, "Dégâts infligés divisés par la durée totale en tours."],
              ].map(([label, value, help]) => (
                <div
                  className="rounded-xl bg-surface-control p-2"
                  key={String(label)}
                  title={String(help || "Métrique calculée par le moteur natif.")}
                >
                  <dt>{label}</dt>
                  <dd className="mt-1 text-base font-black text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          );
        })}
      </div>
    </Card>
  );
}

export function PvpBattleLab() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("single");
  const [leagueId, setLeagueId] = useState("great");
  const [fighters, setFighters] = useState<
    [FighterConfig | null, FighterConfig | null]
  >([null, null]);
  const [ranks, setRanks] = useState<
    [IvRankResult | null, IvRankResult | null]
  >([null, null]);
  const [baiting, setBaiting] = useState<"off" | "selective" | "on">(
    "selective",
  );
  const [busy, setBusy] = useState("");
  const [batchController, setBatchController] =
    useState<AbortController | null>(null);
  const [result, setResult] = useState<SingleBattleResult | null>(null);
  const [analysisTab, setAnalysisTab] = useState<"shields" | "timeline" | "summary">("shields");
  const [shieldMatrix, setShieldMatrix] = useState<ShieldMatrixResult | null>(
    null,
  );
  const [multiCount, setMultiCount] = useState(25);
  const [multiResult, setMultiResult] = useState<MultiBattleResult | null>(
    null,
  );
  const [matrixA, setMatrixA] = useState("");
  const [matrixB, setMatrixB] = useState("");
  const [matrixResult, setMatrixResult] = useState<MatrixBattleResult | null>(
    null,
  );
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [historyConfigured, setHistoryConfigured] = useState(true);
  const league =
    catalog?.leagues.find((item) => item.id === leagueId) ||
    catalog?.leagues[0] ||
    null;
  const leaguePokemon = useMemo(
    () =>
      catalog && league
        ? catalog.pokemon.filter((pokemon) =>
            pokemonEligibleForLeague(pokemon, league),
          )
        : [],
    [catalog, league],
  );
  const selectedPokemon = fighters.map(
    (fighter) =>
      catalog?.pokemon.find(
        (entry) => entry.canonicalId === fighter?.canonicalId,
      ) || null,
  ) as [CatalogPokemon | null, CatalogPokemon | null];

  const rankConfig = useCallback(
    async (
      index: 0 | 1,
      config: FighterConfig,
      targetLeague = leagueId,
      ivs?: FighterConfig["ivs"],
      targetLevelCap: LevelCap = (config.levelCap || 50) as LevelCap,
    ) => {
      const rank = await api<IvRankResult>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "iv-rank",
          leagueId: targetLeague,
          canonicalId: config.canonicalId,
          levelCap: targetLevelCap,
          ...(ivs ? { ivs } : {}),
        }),
      });
      setRanks(
        (current) =>
          current.map((item, itemIndex) =>
            itemIndex === index ? rank : item,
          ) as typeof current,
      );
      setFighters(
        (current) =>
          current.map((item, itemIndex) =>
            itemIndex === index && item
              ? { ...item, level: rank.level, ivs: rank.ivs, levelCap: targetLevelCap }
              : item,
          ) as typeof current,
      );
      return rank;
    },
    [leagueId],
  );

  useEffect(() => {
    api<Catalog>(endpoint)
      .then(async (data) => {
        setCatalog(data);
        let selectedLeague = data.leagues.find((item) => item.id === "great") || data.leagues[0];
        const eligible = data.pokemon.filter((pokemon) =>
          pokemonEligibleForLeague(pokemon, selectedLeague),
        );
        const shared = new URL(window.location.href).searchParams.get(
          "pvpBattle",
        );
        const initial: [FighterConfig | null, FighterConfig | null] = [null, null];
        const initialRanks: [IvRankResult | null, IvRankResult | null] = [null, null];
        if (shared) {
          try {
            const decoded = decodePvpBattle(shared) as {
              leagueId?: string;
              pokemon?: Array<Partial<FighterConfig> & { canonicalId?: string }>;
              strategy?: { baiting?: "off" | "selective" | "on" };
            };
            const requestedLeague = data.leagues.find((item) => item.id === decoded.leagueId)
              || data.leagues.find((item) => item.id === (String(decoded.leagueId).endsWith("-500") ? "little" : String(decoded.leagueId).endsWith("-1500") ? "great" : String(decoded.leagueId).endsWith("-2500") ? "ultra" : String(decoded.leagueId).endsWith("-10000") ? "master" : ""));
            if (requestedLeague) selectedLeague = requestedLeague;
            setLeagueId(selectedLeague.id);
            if (decoded.strategy?.baiting) setBaiting(decoded.strategy.baiting);
            const requested = (decoded.pokemon || []).slice(0, 2);
            const hydrated = requested.map((raw) => hydrateDeepLinkFighter(raw, data.pokemon, selectedLeague));
            for (let index = 0; index < hydrated.length; index += 1) {
              const config = hydrated[index];
              if (!config) continue;
              const raw = requested[index];
              const exactBuild = Boolean(raw?.ivs && raw?.level && raw?.fastMoveId && raw?.chargedMoveIds?.length);
              const rank = await api<IvRankResult>(endpoint, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  action: "iv-rank",
                  leagueId: selectedLeague.id,
                  canonicalId: config.canonicalId,
                  levelCap: (config.levelCap || 50) as LevelCap,
                  ...(exactBuild ? { ivs: config.ivs } : {}),
                }),
              });
              initialRanks[index as 0 | 1] = rank;
              initial[index as 0 | 1] = exactBuild
                ? config
                : { ...config, level: rank.level, ivs: rank.ivs, presetLabel: raw?.presetLabel || "Rank 1" };
            }
          } catch {
            toast.error("Le lien partagé est invalide.");
          }
        }
        setFighters(initial);
        setRanks(initialRanks);
        setMatrixA(
          eligible
            .slice(0, 5)
            .map((item) => item.canonicalId)
            .join(", "),
        );
        setMatrixB(
          eligible
            .slice(5, 10)
            .map((item) => item.canonicalId)
            .join(", "),
        );
      })
      .catch((reason) => {
        setError(
          reason instanceof Error
            ? reason.message
            : "Catalogue PvP indisponible.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const data = await api<{ configured: boolean; items: HistoryRecord[] }>(
        `${endpoint}?action=history`,
      );
      setHistory(data.items || []);
      setHistoryConfigured(data.configured);
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Historique indisponible.",
      );
    }
  }, []);

  function patchFighter(index: 0 | 1, patch: Partial<FighterConfig>) {
    setFighters(
      (current) =>
        current.map((item, itemIndex) =>
          itemIndex === index && item ? { ...item, ...patch } : item,
        ) as typeof current,
    );
  }

  async function selectPokemon(index: 0 | 1, pokemon: CatalogPokemon, shadow = false) {
    if (!league) return;
    const next = { ...baseConfig(pokemon, league), shadow };
    setFighters(
      (current) =>
        current.map((item, itemIndex) =>
          itemIndex === index ? next : item,
        ) as typeof current,
    );
    try {
      await rankConfig(index, next);
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Rank IV indisponible.",
      );
    }
  }

  function selectIvRank(index: 0 | 1, rank: IvRankResult) {
    setRanks((current) => current.map((item, itemIndex) => itemIndex === index ? rank : item) as typeof current);
    setFighters((current) => current.map((item, itemIndex) => itemIndex === index && item ? {
      ...item,
      level: rank.level,
      ivs: rank.ivs,
      ivMode: "custom",
      presetLabel: "Mes IV",
    } : item) as typeof current);
    setResult(null);
  }

  async function changeLeague(nextLeagueId: string) {
    setLeagueId(nextLeagueId);
    setResult(null);
    const nextLeague = catalog?.leagues.find(
      (item) => item.id === nextLeagueId,
    );
    if (!catalog || !nextLeague) return;
    const current = fighters.map((fighter) => {
      if (!fighter) return null;
      const selected = catalog.pokemon.find(
        (pokemon) => pokemon.canonicalId === fighter?.canonicalId,
      );
      return selected && pokemonEligibleForLeague(selected, nextLeague) ? fighter : null;
    }) as [FighterConfig | null, FighterConfig | null];
    setFighters(current);
    try {
      await Promise.all(
        current.map((fighter, index) =>
          fighter
            ? rankConfig(index as 0 | 1, { ...fighter }, nextLeagueId)
            : null,
        ),
      );
    } catch (reason) {
      toast.error(
        reason instanceof Error
          ? reason.message
          : "Impossible d’ajuster les IV au format.",
      );
    }
  }

  async function simulate() {
    if (!fighters[0] || !fighters[1]) return;
    setBusy("Simulation Single + 9 scénarios shields…");
    try {
      const data = await api<{
        result: SingleBattleResult;
        shieldMatrix: ShieldMatrixResult;
      }>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "simulate",
          leagueId,
          pokemon: fighters,
          strategy: {
            baiting,
            optimizeTiming: true,
            buffMode: "deterministic",
          },
          includeShieldMatrix: true,
        }),
      });
      setResult(data.result);
      setShieldMatrix(data.shieldMatrix);
      toast.success(
        `Simulation terminée · ${data.result.durationTurns} tours.`,
      );
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Simulation impossible.",
      );
    } finally {
      setBusy("");
    }
  }

  async function runMulti() {
    if (!fighters[0] || !catalog) return;
    const ids = leaguePokemon
      .filter((item) => item.canonicalId !== fighters[0]?.canonicalId)
      .slice(0, multiCount)
      .map((item) => item.canonicalId);
    const controller = new AbortController();
    setBatchController(controller);
    setBusy(`Simulation 0 / ${ids.length}`);
    try {
      const data = await api<MultiBattleResult>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "multi",
          leagueId,
          subject: fighters[0],
          opponentIds: ids,
          strategy: { baiting },
        }),
        signal: controller.signal,
      });
      setMultiResult(data);
      toast.success(`Simulation ${data.total} / ${data.total} terminée.`);
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError")
        toast.info("Multi Battle annulé.");
      else
        toast.error(
          reason instanceof Error ? reason.message : "Multi Battle impossible.",
        );
    } finally {
      setBusy("");
      setBatchController(null);
    }
  }

  const groupIds = (value: string) => [
    ...new Set(
      value
        .split(/[\s,;]+/)
        .map((item) => item.trim().toUpperCase())
        .filter(Boolean),
    ),
  ];
  async function runMatrix() {
    const groupAIds = groupIds(matrixA).slice(0, 20);
    const groupBIds = groupIds(matrixB).slice(0, 20);
    const controller = new AbortController();
    setBatchController(controller);
    setBusy(`Matrix 0 / ${groupAIds.length * groupBIds.length}`);
    try {
      const data = await api<MatrixBattleResult>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "matrix",
          leagueId,
          groupAIds,
          groupBIds,
          strategy: { baiting },
        }),
        signal: controller.signal,
      });
      setMatrixResult(data);
      toast.success(
        `Matrix ${data.cells.length} / ${data.cells.length} terminée.`,
      );
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError")
        toast.info("Matrix annulée.");
      else
        toast.error(
          reason instanceof Error ? reason.message : "Matrix impossible.",
        );
    } finally {
      setBusy("");
      setBatchController(null);
    }
  }

  function swap() {
    setFighters(([left, right]) => [right, left]);
    setRanks(([left, right]) => [right, left]);
    setResult(null);
  }

  function randomize(index: 0 | 1) {
    if (!catalog || !league) return;
    const pool = leaguePokemon.filter(
      (pokemon) => pokemon.moves.fast.length && pokemon.moves.charged.length,
    );
    const random = pool[Math.floor(Math.random() * pool.length)];
    void selectPokemon(index, random);
  }

  async function saveResult() {
    if (!result || !fighters[0] || !fighters[1]) return;
    try {
      await api(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "save",
          configuration: { leagueId, pokemon: fighters, strategy: { baiting } },
          result,
        }),
      });
      toast.success("Simulation sauvegardée dans l’historique.");
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Sauvegarde impossible.",
      );
    }
  }

  async function shareResult() {
    if (!fighters[0] || !fighters[1]) return;
    const url = new URL(window.location.href);
    url.searchParams.set("section", "pvp-simulator");
    url.searchParams.set(
      "pvpBattle",
      encodePvpBattle({ leagueId, pokemon: fighters, strategy: { baiting } }),
    );
    await navigator.clipboard.writeText(url.toString());
    window.history.replaceState({}, "", url);
    toast.success("Lien interne copié.");
  }

  function pvpokeUrl() {
    if (!fighters[0] || !fighters[1] || !league)
      return "https://pvpoke.com/battle/";
    const poke = (fighter: FighterConfig) => {
      const species = fighter.canonicalId
        .toLowerCase()
        .replace(/_normal$/, "")
        .replaceAll("_", "-");
      return `${species}-${fighter.level}-${fighter.ivs.attack}-${fighter.ivs.defense}-${fighter.ivs.stamina}-${fighter.startingStages.attack + 4}-${fighter.startingStages.defense + 4}-${baiting === "off" ? 0 : 1}-1${fighter.shadow ? "-shadow" : ""}`;
    };
    const moves = (fighter: FighterConfig) =>
      [
        fighter.fastMoveId.replace(/_FAST$/, ""),
        ...fighter.chargedMoveIds,
      ].join("-");
    return `https://pvpoke.com/battle/${league.cpCap}/${poke(fighters[0])}/${poke(fighters[1])}/${fighters[0].shields}${fighters[1].shields}/${moves(fighters[0])}/${moves(fighters[1])}/`;
  }

  if (loading)
    return (
      <FetchLoadingState
        title="Initialisation du Battle Lab…"
        detail="Chargement du snapshot PokemonGo-Data, des moves combat et des règles PvP."
      />
    );
  if (error || !catalog || !league)
    return (
      <ErrorState
        title="Simulateur PvP indisponible"
        message={error || "Catalogue incomplet."}
      />
    );

  return (
    <section
      className="space-y-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_select]:min-h-11"
      aria-label="Simulateur Pokémon GO PvP"
    >
      <Card className="relative overflow-hidden p-5" tone="strong">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,.14),transparent_35%)]" />
        <div className="relative grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="type-overline text-brand-2">
              POKÉMON GO · MOTEUR NATIF
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Simulateur PvP
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              Single, Multi, Matrix, IV Rank, CMP, shields, buffs et timeline
              calculés depuis <code>combat.*</code> dans PokemonGo-Data.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="cyan">Engine 1.2.0</Badge>
              <Badge tone="violet">Data {catalog.versions.data}</Badge>
              <Badge tone="green">Déterministe</Badge>
            </div>
          </div>
          <Field label="Format actif" className="w-full xl:w-64">
            <Select
              className="mt-1"
              value={leagueId}
              onChange={(event) => void changeLeague(event.target.value)}
            >
              {catalog.leagues.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.cpCap} PC
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      <div
        className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-surface-inset-subtle p-2"
        role="tablist"
        aria-label="Modes du simulateur"
      >
        {tabs.map(([id, label]) => (
          <button
            className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-black transition ${tab === id ? "bg-brand-2/18 text-accent-text" : "text-muted hover:bg-surface-hover hover:text-foreground"}`}
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => {
              setTab(id);
              if (id === "history") void loadHistory();
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "single" ? (
        <>
          <BattleArena pokemon={selectedPokemon} fighters={fighters} ranks={ranks} league={league} typeCatalog={catalog.types} result={result} />
          <Card className="p-3 sm:p-4" tone="strong">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div><p className="type-overline text-brand-2">BUILD BAR</p><h3 className="text-lg font-black text-foreground">Préparer les combattants</h3></div>
              <Badge tone="neutral">IV · Moves · Shields</Badge>
            </div>
          <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-start">
            <FighterEditor
              side="A"
              pokemon={selectedPokemon[0]}
              config={fighters[0]}
              rank={ranks[0]}
              catalog={catalog.pokemon}
              typeCatalog={catalog.types}
              league={league}
              onSelect={(pokemon, shadow) => void selectPokemon(0, pokemon, shadow)}
              onPatch={(patch) => patchFighter(0, patch)}
              onRankOne={(levelCap) => fighters[0] && void rankConfig(0, { ...fighters[0], ivMode: "optimal", presetLabel: "Rank 1", levelCap }, leagueId, undefined, levelCap)}
              onPerfect={(levelCap) =>
                fighters[0] &&
                void rankConfig(0, { ...fighters[0], ivMode: "perfect", presetLabel: "15/15/15", levelCap }, leagueId, {
                  attack: 15,
                  defense: 15,
                  stamina: 15,
                }, levelCap)
              }
              onMaximize={(levelCap) => fighters[0] && void rankConfig(0, { ...fighters[0], ivMode: "custom", presetLabel: "Mes IV", levelCap }, leagueId, fighters[0].ivs, levelCap)}
              onRankSelected={(rank) => selectIvRank(0, rank)}
            />
            <div className="flex items-center justify-center gap-2 xl:flex-col xl:pt-36">
              <Button
                size="icon"
                type="button"
                icon={<Shuffle size={17} />}
                onClick={() => randomize(0)}
                aria-label="Pokémon A aléatoire"
              />
              <Button
                size="icon"
                variant="primary"
                type="button"
                icon={<ArrowLeftRight size={19} />}
                onClick={swap}
                aria-label="Inverser les Pokémon"
              />
              <Button
                size="icon"
                type="button"
                icon={<Shuffle size={17} />}
                onClick={() => randomize(1)}
                aria-label="Pokémon B aléatoire"
              />
            </div>
            <FighterEditor
              side="B"
              pokemon={selectedPokemon[1]}
              config={fighters[1]}
              rank={ranks[1]}
              catalog={catalog.pokemon}
              typeCatalog={catalog.types}
              league={league}
              onSelect={(pokemon, shadow) => void selectPokemon(1, pokemon, shadow)}
              onPatch={(patch) => patchFighter(1, patch)}
              onRankOne={(levelCap) => fighters[1] && void rankConfig(1, { ...fighters[1], ivMode: "optimal", presetLabel: "Rank 1", levelCap }, leagueId, undefined, levelCap)}
              onPerfect={(levelCap) =>
                fighters[1] &&
                void rankConfig(1, { ...fighters[1], ivMode: "perfect", presetLabel: "15/15/15", levelCap }, leagueId, {
                  attack: 15,
                  defense: 15,
                  stamina: 15,
                }, levelCap)
              }
              onMaximize={(levelCap) => fighters[1] && void rankConfig(1, { ...fighters[1], ivMode: "custom", presetLabel: "Mes IV", levelCap }, leagueId, fighters[1].ivs, levelCap)}
              onRankSelected={(rank) => selectIvRank(1, rank)}
            />
          </div>
          </Card>
          <Card className="sticky bottom-3 z-20 p-3 shadow-raised supports-[backdrop-filter]:bg-surface-elevated/90">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Field label="Baiting">
                  <Select
                    className="mt-1 w-36"
                    value={baiting}
                    onChange={(event) =>
                      setBaiting(event.target.value as typeof baiting)
                    }
                  >
                    <option value="off">Off</option>
                    <option value="selective">Selective</option>
                    <option value="on">On</option>
                  </Select>
                </Field>
                <span className="text-xs text-muted">
                  <Gauge className="mr-1 inline" size={14} /> Timing optimisé ·
                  buffs déterministes
                </span>
              </div>
              <Button
                size="lg"
                variant="primary"
                type="button"
                icon={<Swords size={19} />}
                loading={Boolean(busy)}
                loadingText={busy}
                onClick={simulate}
                disabled={!fighters[0] || !fighters[1]}
              >
                SIMULER LE COMBAT
              </Button>
            </div>
          </Card>
          {result ? (
            <>
              <ResultHeader result={result} pokemon={selectedPokemon} />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  icon={<Save size={16} />}
                  onClick={saveResult}
                >
                  Sauvegarder
                </Button>
                <Button
                  type="button"
                  icon={<Share2 size={16} />}
                  onClick={shareResult}
                >
                  Lien interne
                </Button>
                <Button
                  type="button"
                  icon={<Download size={16} />}
                  onClick={() =>
                    downloadJson(
                      {
                        input: {
                          leagueId,
                          pokemon: fighters,
                          strategy: { baiting },
                        },
                        output: result,
                        shieldMatrix,
                      },
                      "pvp-battle",
                    )
                  }
                >
                  Exporter JSON
                </Button>
                <Button asChild type="button" icon={<ExternalLink size={16} />}>
                  <a href={pvpokeUrl()} target="_blank" rel="noreferrer">
                    Ouvrir dans PvPoke
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface-inset-subtle p-1 md:hidden" role="tablist" aria-label="Analyse du combat">
                {([
                  ["shields", "Shields"],
                  ["timeline", "Timeline"],
                  ["summary", "Analyse"],
                ] as const).map(([value, label]) => <button className={`rounded-xl px-2 text-xs font-black ${analysisTab === value ? "bg-brand-2/18 text-accent-text" : "text-muted"}`} key={value} type="button" role="tab" aria-selected={analysisTab === value} onClick={() => setAnalysisTab(value)}>{label}</button>)}
              </div>
              {shieldMatrix ? (
                <div className={analysisTab === "shields" ? "block" : "hidden md:block"}>
                  <ShieldScenarioMatrix
                    matrix={shieldMatrix}
                    activeResultId={result.id}
                    onSelect={setResult}
                  />
                </div>
              ) : null}
              <div className={analysisTab === "timeline" ? "block" : "hidden md:block"}><Timeline key={result.id} result={result} /></div>
              <div className={analysisTab === "summary" ? "block" : "hidden md:block"}><BattleSummary result={result} /></div>
            </>
          ) : (
            <EmptyState
              title="Configure les deux Pokémon puis lance le combat"
              description="Le moteur retournera le gagnant, les neuf scénarios shields, la timeline et les diagnostics de dégâts."
            />
          )}
        </>
      ) : null}

      {tab === "multi" ? (
        <Card className="p-5">
          <CardHeader eyebrow="BATCH ENGINE">
            <div>
              <CardTitle>Multi Battle</CardTitle>
              <CardDescription>
                {pokemonName(selectedPokemon[0])} contre un lot de Pokémon du
                format, dans une seule requête.
              </CardDescription>
            </div>
          </CardHeader>
          <div className="mt-5 grid gap-4 sm:grid-cols-[220px_auto] sm:items-end">
            <Field label="Taille du groupe">
              <Select
                className="mt-1"
                value={multiCount}
                onChange={(event) => setMultiCount(Number(event.target.value))}
              >
                {[10, 25, 50, 100].map((count) => (
                  <option key={count} value={count}>
                    {count} adversaires
                  </option>
                ))}
              </Select>
            </Field>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                type="button"
                icon={<Activity size={17} />}
                loading={Boolean(busy)}
                loadingText={busy}
                onClick={runMulti}
              >
                Lancer Multi
              </Button>
              {batchController ? (
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => batchController.abort()}
                >
                  Annuler
                </Button>
              ) : null}
            </div>
          </div>
          {multiResult ? (
            <>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Victoires", multiResult.wins],
                  ["Défaites", multiResult.losses],
                  ["Nuls", multiResult.draws],
                  ["Rating moyen", multiResult.averageRating],
                ].map(([label, value]) => (
                  <div
                    className="rounded-2xl border border-line bg-surface-control p-4 text-center"
                    key={String(label)}
                  >
                    <strong className="block text-2xl text-foreground">
                      {value}
                    </strong>
                    <small className="text-muted">{label}</small>
                  </div>
                ))}
              </div>
              <div className="mt-4 max-h-[34rem] overflow-auto rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-surface-elevated text-muted">
                    <tr>
                      <th className="p-3">Adversaire</th>
                      <th className="p-3">Résultat</th>
                      <th className="p-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {multiResult.matchups.map((item) => (
                      <tr
                        className="border-t border-line-subtle"
                        key={item.opponent}
                      >
                        <td className="p-3 font-bold">{item.opponent}</td>
                        <td className="p-3">
                          {item.result.winner === 0
                            ? "Victoire"
                            : item.result.winner === 1
                              ? "Défaite"
                              : "Nul"}
                        </td>
                        <td className="p-3">{item.result.ratings[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </Card>
      ) : null}

      {tab === "matrix" ? (
        <Card className="p-5">
          <CardHeader eyebrow="GROUPES A × B">
            <div>
              <CardTitle>Matrix Battle</CardTitle>
              <CardDescription>
                CanonicalId séparés par virgule, 20 × 20 maximum. Calcul batch
                sans requêtes unitaires.
              </CardDescription>
            </div>
          </CardHeader>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Groupe A">
              <Textarea
                className="mt-1 min-h-28"
                value={matrixA}
                onChange={(event) => setMatrixA(event.target.value)}
              />
            </Field>
            <Field label="Groupe B">
              <Textarea
                className="mt-1 min-h-28"
                value={matrixB}
                onChange={(event) => setMatrixB(event.target.value)}
              />
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="primary"
              type="button"
              icon={<Sparkles size={17} />}
              loading={Boolean(busy)}
              loadingText={busy}
              onClick={runMatrix}
            >
              Calculer la Matrix
            </Button>
            {batchController ? (
              <Button
                variant="danger"
                type="button"
                onClick={() => batchController.abort()}
              >
                Annuler
              </Button>
            ) : null}
          </div>
          {matrixResult ? (
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
              <table className="min-w-max border-separate border-spacing-1 text-center text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-surface-elevated p-3">
                      A \ B
                    </th>
                    {matrixResult.columns.map((column) => (
                      <th
                        className="max-w-28 truncate p-3"
                        key={column}
                        title={column}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixResult.rows.map((row, rowIndex) => (
                    <tr key={row}>
                      <th
                        className="sticky left-0 max-w-32 truncate bg-surface-elevated p-3 text-left"
                        title={row}
                      >
                        {row}
                      </th>
                      {matrixResult.columns.map((_, columnIndex) => {
                        const cell = matrixResult.cells.find(
                          (item) =>
                            item.row === rowIndex &&
                            item.column === columnIndex,
                        )!;
                        return (
                          <td
                            className={`min-w-20 rounded-lg p-3 font-black ${cell.result.winner === 0 ? "bg-success/12 text-success-foreground" : cell.result.winner === 1 ? "bg-danger/12 text-danger-foreground" : "bg-surface-control text-muted"}`}
                            key={columnIndex}
                          >
                            {cell.result.ratings[0]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Card>
      ) : null}

      {tab === "history" ? (
        <Card className="p-5">
          <CardHeader
            eyebrow="MONGODB · DASHBOARD STORE"
            action={
              <Button
                size="sm"
                type="button"
                icon={<RefreshCcw size={15} />}
                onClick={() => void loadHistory()}
              >
                Actualiser
              </Button>
            }
          >
            <div>
              <CardTitle>Historique des simulations</CardTitle>
              <CardDescription>
                Les résultats conservent configuration et versions du moteur et
                des données.
              </CardDescription>
            </div>
          </CardHeader>
          {!historyConfigured ? (
            <ErrorState
              title="Historique non configuré"
              message="MongoDB Dashboard est requis uniquement pour sauvegarder. Les simulations restent disponibles."
            />
          ) : history.length ? (
            <div className="mt-5 grid gap-3">
              {history.map((item) => (
                <div
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-inset-subtle p-4 sm:flex-row sm:items-center sm:justify-between"
                  key={item.id}
                >
                  <div>
                    <strong className="text-foreground">
                      {item.result.combatants?.[0]?.name} vs{" "}
                      {item.result.combatants?.[1]?.name}
                    </strong>
                    <p className="mt-1 text-xs text-muted">
                      {new Date(item.createdAt).toLocaleString("fr-FR")} ·{" "}
                      {item.league} · {item.engineVersion} · {item.dataVersion}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      type="button"
                      icon={<History size={14} />}
                      onClick={() => {
                        if (item.configuration.pokemon?.length === 2) {
                          setLeagueId(item.configuration.leagueId || "great");
                          setFighters(
                            item.configuration.pokemon as [
                              FighterConfig,
                              FighterConfig,
                            ],
                          );
                          setResult(item.result);
                          setTab("single");
                        }
                      }}
                    >
                      Ouvrir
                    </Button>
                    <Button
                      size="icon"
                      variant="danger"
                      type="button"
                      icon={<Trash2 size={15} />}
                      aria-label="Supprimer la simulation"
                      onClick={async () => {
                        try {
                          await api(
                            `${endpoint}?id=${encodeURIComponent(item.id)}`,
                            { method: "DELETE" },
                          );
                          await loadHistory();
                        } catch (reason) {
                          toast.error(
                            reason instanceof Error
                              ? reason.message
                              : "Suppression impossible.",
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucune simulation sauvegardée"
              description="Lance une bataille Single puis utilise Sauvegarder."
            />
          )}
        </Card>
      ) : null}

      <details className="rounded-2xl border border-line bg-surface-inset-subtle p-4">
        <summary className="cursor-pointer text-sm font-black text-foreground">
          Aide · IV, shields, énergie, CMP, rating et timeline
        </summary>
        <div className="mt-3 grid gap-3 text-sm leading-6 text-muted md:grid-cols-2">
          <p>
            <b className="text-foreground">Single</b> simule tour par tour les
            durées 1–5 tours. La CMP départage deux Charged Moves simultanées
            par l’Attack réelle.
          </p>
          <p>
            <b className="text-foreground">Battle Rating</b> reprend l’échelle
            0–1000 : dégâts infligés et proportion de HP restante, 500
            représentant une égalité.
          </p>
          <p>
            <b className="text-foreground">IV Rank</b> énumère 4096 spreads et
            chaque demi-niveau sous le cap actif.
          </p>
          <p>
            <b className="text-foreground">Buffs</b> probabilistes utilisent par
            défaut un compteur déterministe reproductible ; aucun tirage
            aléatoire n’altère une simulation identique.
          </p>
        </div>
      </details>
    </section>
  );
}
