"use client";

import {
  Activity,
  ArrowLeftRight,
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { TypeIcons } from "./asset-icons";
import { PokemonArtwork } from "./pokemon-artwork";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type {
  IvRankResult,
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
  stats: { attack: number; defense: number; stamina: number };
  availability: { shadow: boolean; released: boolean };
  assets: Record<string, unknown>;
  identity: {
    canonicalId: string;
    localReference: string;
    assetsRef: string | null;
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
  if (!league.allowMega && /mega/i.test(pokemon.form)) return false;
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
  };
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

function encodeShare(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));
}

function decodeShare(value: string) {
  const bytes = Uint8Array.from(atob(value), (character) =>
    character.charCodeAt(0),
  );
  return JSON.parse(new TextDecoder().decode(bytes));
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

function PokemonPicker({
  id,
  pokemon,
  catalog,
  onSelect,
}: {
  id: string;
  pokemon: CatalogPokemon | null;
  catalog: CatalogPokemon[];
  onSelect: (pokemon: CatalogPokemon) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => {
    const needle = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
    if (!needle) return catalog.slice(0, 10);
    return catalog
      .filter((entry) => entry.searchText.includes(needle))
      .slice(0, 12);
  }, [catalog, query]);
  return (
    <div className="relative">
      <Field label="Pokémon">
        <Input
          className="mt-1"
          value={open ? query : pokemonName(pokemon)}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          placeholder="Nom FR, EN, dex, forme…"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={id}
        />
      </Field>
      {open ? (
        <div
          id={id}
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-line bg-surface-elevated p-1.5 shadow-raised"
          role="listbox"
        >
          {results.map((entry) => (
            <button
              className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-2"
              key={entry.canonicalId}
              type="button"
              role="option"
              aria-selected={entry.canonicalId === pokemon?.canonicalId}
              onClick={() => {
                onSelect(entry);
                setOpen(false);
                setQuery("");
              }}
            >
              <PokemonArtwork pokemon={entry} className="h-10 w-10" />
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm text-foreground">
                  {pokemonName(entry)}
                </strong>
                <small className="block truncate text-[10px] text-muted">
                  #{entry.dexId} · {entry.canonicalId}
                </small>
              </span>
              <TypeIcons types={entry.types} size="sm" />
            </button>
          ))}
          {!results.length ? <EmptyState title="Aucun Pokémon trouvé" /> : null}
        </div>
      ) : null}
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

function FighterEditor({
  side,
  pokemon,
  config,
  rank,
  catalog,
  typeCatalog,
  onSelect,
  onPatch,
  onRankOne,
  onPerfect,
}: {
  side: "A" | "B";
  pokemon: CatalogPokemon | null;
  config: FighterConfig | null;
  rank: IvRankResult | null;
  catalog: CatalogPokemon[];
  typeCatalog: Array<Record<string, unknown>>;
  onSelect: (pokemon: CatalogPokemon) => void;
  onPatch: (patch: Partial<FighterConfig>) => void;
  onRankOne: () => void;
  onPerfect: () => void;
}) {
  if (!pokemon || !config) return null;
  const patchIv = (key: keyof FighterConfig["ivs"], value: number) =>
    onPatch({ ivs: { ...config.ivs, [key]: value } });
  const charged = config.chargedMoveIds;
  return (
    <Card className="min-w-0 overflow-visible p-4 sm:p-5" tone="strong">
      <CardHeader eyebrow={`COMBATTANT ${side}`}>
        <div className="flex items-center gap-3">
          <PokemonArtwork
            pokemon={pokemon}
            className="h-20 w-20"
            priority={side === "A"}
            variant={{ shadow: config.shadow }}
          />
          <div className="min-w-0">
            <CardTitle className="truncate">{pokemonName(pokemon)}</CardTitle>
            <p className="mt-1 truncate text-[10px] font-black uppercase tracking-[.1em] text-muted">
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
          catalog={catalog}
          onSelect={onSelect}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Field label="Niveau">
          <Input
            className="mt-1"
            type="number"
            min={1}
            max={55}
            step={0.5}
            value={config.level}
            onChange={(event) => onPatch({ level: Number(event.target.value) })}
          />
        </Field>
        {(["attack", "defense", "stamina"] as const).map((key) => (
          <Field
            key={key}
            label={
              key === "stamina"
                ? "HP IV"
                : `${key === "attack" ? "Atk" : "Def"} IV`
            }
          >
            <Input
              className="mt-1"
              type="number"
              min={0}
              max={15}
              value={config.ivs[key]}
              onChange={(event) => patchIv(key, Number(event.target.value))}
            />
          </Field>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" type="button" onClick={onRankOne}>
          Rank 1
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={onPerfect}>
          15 / 15 / 15
        </Button>
        {rank ? (
          <Badge tone="cyan">
            Rank #{rank.rank} · {rank.cp} PC · niv. {rank.level}
          </Badge>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3">
        <Field label="Fast Move">
          <Select
            className="mt-1"
            value={config.fastMoveId}
            onChange={(event) => onPatch({ fastMoveId: event.target.value })}
          >
            {pokemon.moves.fast.map((move) => (
              <option key={move.id} value={move.id}>
                <MoveOption move={move} />
              </option>
            ))}
          </Select>
        </Field>
        {[0, 1].map((index) => (
          <Field key={index} label={`Charged Move ${index + 1}`}>
            <Select
              className="mt-1"
              value={charged[index] || ""}
              onChange={(event) => {
                const next = [...charged];
                next[index] = event.target.value;
                onPatch({ chargedMoveIds: next.filter(Boolean).slice(0, 2) });
              }}
            >
              {pokemon.moves.charged.map((move) => (
                <option key={move.id} value={move.id}>
                  <MoveOption move={move} />
                </option>
              ))}
            </Select>
          </Field>
        ))}
      </div>

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
        <Field label="Boucliers">
          <div className="mt-1 grid min-h-11 grid-cols-3 gap-1 rounded-control border border-line bg-surface-control p-1">
            {[0, 1, 2].map((count) => (
              <button
                className={`rounded-lg text-sm font-black ${config.shields === count ? "bg-brand-2/20 text-accent-text" : "text-muted"}`}
                key={count}
                type="button"
                onClick={() => onPatch({ shields: count })}
                aria-pressed={config.shields === count}
              >
                {count}
              </button>
            ))}
          </div>
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

      <label className="mt-4 flex min-h-11 items-center gap-3 rounded-control border border-line bg-surface-control px-3 text-sm font-bold text-foreground">
        <Checkbox
          checked={config.shadow}
          disabled={!pokemon.availability.shadow}
          onChange={(event) => onPatch({ shadow: event.target.checked })}
        />
        Forme Shadow{" "}
        {pokemon.availability.shadow ? "disponible" : "indisponible"}
      </label>
    </Card>
  );
}

function ResultHeader({ result }: { result: SingleBattleResult }) {
  const winner =
    result.winner === null ? null : result.combatants[result.winner];
  return (
    <Card className="overflow-hidden p-5" tone="strong">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="type-overline text-brand-2">
            {winner ? "GAGNANT" : "ÉGALITÉ"}
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-foreground">
            {winner?.name || "Match nul"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {result.durationTurns} tours ·{" "}
            {(result.durationMs / 1_000).toFixed(1)} s · moteur{" "}
            {result.versions.engine}
          </p>
        </div>
        <div className="rounded-2xl border border-brand-2/25 bg-brand-2/10 p-4 text-center">
          <span className="block text-[10px] font-black uppercase tracking-[.16em] text-accent-text">
            Battle Rating
          </span>
          <strong className="mt-1 block text-4xl font-black text-foreground">
            {result.battleRating}
          </strong>
          <small className="text-xs font-bold text-muted">
            {result.ratingClass}
          </small>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
              <span>
                <b className="block text-lg text-foreground">
                  {combatant.shieldsRemaining}
                </b>
                Shields
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ShieldScenarioMatrix({
  matrix,
  onSelect,
}: {
  matrix: ShieldMatrixResult;
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
          <CardTitle>Shield Matrix</CardTitle>
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
                  {value} shield
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((left) => (
              <tr key={left}>
                <th className="p-2 text-left text-muted">{left} shield</th>
                {[0, 1, 2].map((right) => {
                  const item = scenario(left, right)!;
                  const win = item.result.winner === 0;
                  const tie = item.result.winner === null;
                  return (
                    <td key={right}>
                      <button
                        className={`min-h-20 w-full rounded-xl border p-2 font-black transition hover:-translate-y-0.5 ${tie ? "border-line bg-surface-control" : win ? "border-success/35 bg-success/10 text-success-foreground" : "border-danger/35 bg-danger/10 text-danger-foreground"}`}
                        type="button"
                        onClick={() => onSelect(item.result)}
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
              className="px-1 text-center text-[9px] font-black uppercase tracking-wider text-disabled"
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
                    className={`h-full w-full rounded-xl border p-2 text-left text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-2 ${event.action === "faint" ? "border-danger/40 bg-danger/10" : event.action === "shield" ? "border-brand-2/35 bg-brand-2/10" : "border-line bg-surface-control"}`}
                    type="button"
                    onClick={() => setSelected(event)}
                  >
                    <strong className="block truncate text-foreground">
                      {event.moveName || event.action.toUpperCase()}
                    </strong>
                    <span className="mt-1 block line-clamp-3 text-muted">
                      {event.description}
                    </span>
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
          open
        >
          <summary className="cursor-pointer text-sm font-black text-foreground">
            Tour {selected.turn} · {selected.description}
          </summary>
          <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-[11px] text-muted">
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
        {result.combatants.map((combatant) => (
          <div
            className="rounded-2xl border border-line bg-surface-inset-subtle p-4"
            key={combatant.canonicalId}
          >
            <h3 className="font-black text-foreground">{combatant.name}</h3>
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
                ["CMP gagnées", combatant.cmpWins],
              ].map(([label, value]) => (
                <div
                  className="rounded-xl bg-surface-control p-2"
                  key={String(label)}
                >
                  <dt>{label}</dt>
                  <dd className="mt-1 text-base font-black text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
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
    ) => {
      const rank = await api<IvRankResult>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "iv-rank",
          leagueId: targetLeague,
          canonicalId: config.canonicalId,
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
              ? { ...item, level: rank.level, ivs: rank.ivs }
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
        const selectedLeague =
          data.leagues.find((item) => item.id === "great") || data.leagues[0];
        const left =
          data.pokemon.find((item) => item.formId === "MIMIKYU") ||
          data.pokemon[0];
        const right =
          data.pokemon.find((item) => item.formId === "LICKILICKY") ||
          data.pokemon[1];
        const configs = [
          baseConfig(left, selectedLeague),
          baseConfig(right, selectedLeague),
        ] as [FighterConfig, FighterConfig];
        const eligible = data.pokemon.filter((pokemon) =>
          pokemonEligibleForLeague(pokemon, selectedLeague),
        );
        const shared = new URL(window.location.href).searchParams.get(
          "pvpBattle",
        );
        let initial = configs;
        let initialLeague = selectedLeague.id;
        if (shared) {
          try {
            const decoded = decodeShare(shared) as {
              leagueId?: string;
              pokemon?: [FighterConfig, FighterConfig];
            };
            if (decoded.leagueId && decoded.pokemon?.length === 2) {
              initialLeague = decoded.leagueId;
              initial = decoded.pokemon;
              setLeagueId(decoded.leagueId);
            }
          } catch {
            toast.error("Le lien partagé est invalide.");
          }
        }
        setFighters(initial);
        const initialRanks = await Promise.all(
          initial.map((config) =>
            api<IvRankResult>(endpoint, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                action: "iv-rank",
                leagueId: initialLeague,
                canonicalId: config.canonicalId,
                ivs: shared ? config.ivs : undefined,
              }),
            }),
          ),
        );
        setRanks(initialRanks as [IvRankResult, IvRankResult]);
        setFighters(
          initial.map((config, index) => ({
            ...config,
            level: initialRanks[index].level,
            ivs: initialRanks[index].ivs,
          })) as [FighterConfig, FighterConfig],
        );
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

  async function selectPokemon(index: 0 | 1, pokemon: CatalogPokemon) {
    if (!league) return;
    const next = baseConfig(pokemon, league);
    patchFighter(index, next);
    try {
      await rankConfig(index, next);
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Rank IV indisponible.",
      );
    }
  }

  async function changeLeague(nextLeagueId: string) {
    setLeagueId(nextLeagueId);
    setResult(null);
    const nextLeague = catalog?.leagues.find(
      (item) => item.id === nextLeagueId,
    );
    if (!catalog || !nextLeague) return;
    const eligible = catalog.pokemon.filter((pokemon) =>
      pokemonEligibleForLeague(pokemon, nextLeague),
    );
    const current = fighters.map((fighter, index) => {
      const selected = catalog.pokemon.find(
        (pokemon) => pokemon.canonicalId === fighter?.canonicalId,
      );
      return fighter &&
        selected &&
        pokemonEligibleForLeague(selected, nextLeague)
        ? fighter
        : eligible[index]
          ? baseConfig(eligible[index], nextLeague)
          : null;
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
      encodeShare({ leagueId, pokemon: fighters, strategy: { baiting } }),
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
              <Badge tone="cyan">Engine 1.0.0</Badge>
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
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-start">
            <FighterEditor
              side="A"
              pokemon={selectedPokemon[0]}
              config={fighters[0]}
              rank={ranks[0]}
              catalog={leaguePokemon}
              typeCatalog={catalog.types}
              onSelect={(pokemon) => void selectPokemon(0, pokemon)}
              onPatch={(patch) => patchFighter(0, patch)}
              onRankOne={() => fighters[0] && void rankConfig(0, fighters[0])}
              onPerfect={() =>
                fighters[0] &&
                void rankConfig(0, fighters[0], leagueId, {
                  attack: 15,
                  defense: 15,
                  stamina: 15,
                })
              }
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
              catalog={leaguePokemon}
              typeCatalog={catalog.types}
              onSelect={(pokemon) => void selectPokemon(1, pokemon)}
              onPatch={(patch) => patchFighter(1, patch)}
              onRankOne={() => fighters[1] && void rankConfig(1, fighters[1])}
              onPerfect={() =>
                fighters[1] &&
                void rankConfig(1, fighters[1], leagueId, {
                  attack: 15,
                  defense: 15,
                  stamina: 15,
                })
              }
            />
          </div>
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
              >
                SIMULER LE COMBAT
              </Button>
            </div>
          </Card>
          {result ? (
            <>
              <ResultHeader result={result} />
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
              {shieldMatrix ? (
                <ShieldScenarioMatrix
                  matrix={shieldMatrix}
                  onSelect={setResult}
                />
              ) : null}
              <Timeline key={result.id} result={result} />
              <BattleSummary result={result} />
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
