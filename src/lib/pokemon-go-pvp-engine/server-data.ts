import "server-only";

/* eslint-disable @typescript-eslint/no-explicit-any -- Les JSON PokemonGo-Data sont validés à leur frontière métier. */

import fs from "node:fs/promises";
import path from "node:path";
import { getBattleFormMechanic } from "./form-mechanics";
import { rankIvs, rankIvTable } from "./rules";
import type {
  BattleIvs,
  CombatBuffs,
  CombatMove,
  PokemonBattleBuild,
  PokemonType,
  TypeCatalogEntry,
} from "./types";

type JsonRecord = Record<string, any>;

export type PvpLeague = {
  id: string;
  name: string;
  cpCap: number;
  levelCap: number;
  allowedTypes: PokemonType[];
  bannedTypes: PokemonType[];
  allowedPokemon: string[];
  bannedPokemon: string[];
  allowMega: boolean;
  allowShadow: boolean;
  allowLegendary: boolean;
};

export type PvpCatalogPokemon = {
  canonicalId: string;
  pokemonId: string;
  formId: string;
  baseFormId: string;
  form: string;
  pokemonClass: string;
  dexNr: number;
  dexId: string;
  names: Record<string, string>;
  primaryType: PokemonType;
  secondaryType: PokemonType | null;
  types: PokemonType[];
  stats: { attack: number; defense: number; stamina: number };
  availability: { shadow: boolean; released: boolean };
  assets: JsonRecord;
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
  pvpRef: string | null;
  pvpSource: JsonRecord | null;
  moves: { fast: CombatMove[]; charged: CombatMove[] };
  recommended: Record<string, { fast: string | null; charged: string[] }>;
  searchText: string;
};

export type PvpCatalog = {
  pokemon: PvpCatalogPokemon[];
  types: Array<TypeCatalogEntry & JsonRecord>;
  leagues: PvpLeague[];
  versions: {
    data: string;
    package: string;
    commit: string;
    syncedAt: string | null;
    pvpCommit: string;
    pvpSyncedAt: string | null;
  };
};

export type BattleBuildConfig = {
  canonicalId: string;
  level: number;
  ivs: BattleIvs;
  shadow: boolean;
  fastMoveId: string;
  chargedMoveIds: string[];
  shields: number;
  startingEnergy?: number;
  startingHp?: number;
  startingHpPercent?: number;
  startingStages?: { attack: number; defense: number };
};

const defaultLeagues: PvpLeague[] = [
  {
    id: "great",
    name: "Ligue Super",
    cpCap: 1500,
    levelCap: 50,
    allowedTypes: [],
    bannedTypes: [],
    allowedPokemon: [],
    bannedPokemon: [],
    allowMega: false,
    allowShadow: true,
    allowLegendary: true,
  },
  {
    id: "ultra",
    name: "Ligue Hyper",
    cpCap: 2500,
    levelCap: 50,
    allowedTypes: [],
    bannedTypes: [],
    allowedPokemon: [],
    bannedPokemon: [],
    allowMega: false,
    allowShadow: true,
    allowLegendary: true,
  },
  {
    id: "master",
    name: "Ligue Master",
    cpCap: 10_000,
    levelCap: 50,
    allowedTypes: [],
    bannedTypes: [],
    allowedPokemon: [],
    bannedPokemon: [],
    allowMega: false,
    allowShadow: true,
    allowLegendary: true,
  },
  {
    id: "little",
    name: "Ligue Petite",
    cpCap: 500,
    levelCap: 50,
    allowedTypes: [],
    bannedTypes: [],
    allowedPokemon: [],
    bannedPokemon: [],
    allowMega: false,
    allowShadow: true,
    allowLegendary: true,
  },
];

const localizedTypeIds: Record<string, PokemonType> = {
  ACIER: "STEEL",
  COMBAT: "FIGHTING",
  DRAGON: "DRAGON",
  EAU: "WATER",
  ELECTRIK: "ELECTRIC",
  FEE: "FAIRY",
  FEU: "FIRE",
  GLACE: "ICE",
  INSECTE: "BUG",
  NORMAL: "NORMAL",
  PLANTE: "GRASS",
  POISON: "POISON",
  PSY: "PSYCHIC",
  ROCHE: "ROCK",
  SOL: "GROUND",
  SPECTRE: "GHOST",
  TENEBRES: "DARK",
  VOL: "FLYING",
};

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function parseLocalizedTypes(values: string[]) {
  return [
    ...new Set(
      values
        .flatMap((value) => value.split("/"))
        .map((value) => localizedTypeIds[normalizeLabel(value)])
        .filter(Boolean),
    ),
  ];
}

let catalogPromise: Promise<PvpCatalog> | null = null;

function dataRoot() {
  return process.env.POKEMON_GO_DATA_DIR
    ? path.resolve(process.env.POKEMON_GO_DATA_DIR)
    : path.join(process.cwd(), ".data", "PokemonGo-Data");
}

async function readJson(file: string): Promise<JsonRecord> {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function jsonFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  const pending = [directory];
  while (pending.length) {
    const current = pending.pop()!;
    const entries = await fs
      .readdir(current, { withFileTypes: true })
      .catch(() => []);
    for (const entry of entries) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(target);
      else if (entry.isFile() && entry.name.endsWith(".json"))
        files.push(target);
    }
  }
  return files.sort();
}

async function mapConcurrent<Input, Output>(
  values: Input[],
  concurrency: number,
  callback: (value: Input, index: number) => Promise<Output>,
) {
  const output = new Array<Output>(values.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (cursor < values.length) {
        const index = cursor++;
        output[index] = await callback(values[index], index);
      }
    }),
  );
  return output;
}

function canonicalId(entry: JsonRecord) {
  const formId = String(entry.formId || entry.id || "")
    .trim()
    .toUpperCase();
  const baseFormId = String(entry.baseFormId || entry.id || "")
    .trim()
    .toUpperCase();
  if (!formId) return "";
  if (formId !== baseFormId || formId.endsWith("_NORMAL")) return formId;
  return `${formId}_NORMAL`;
}

function normalizedBuffs(
  value: JsonRecord | null | undefined,
): CombatBuffs | null {
  if (!value || typeof value !== "object") return null;
  return {
    activationChance: Number(value.activationChance || 0),
    attackerAttackStatsChange: Number(value.attackerAttackStatsChange || 0),
    attackerDefenseStatsChange: Number(value.attackerDefenseStatsChange || 0),
    targetAttackStatsChange: Number(value.targetAttackStatsChange || 0),
    targetDefenseStatsChange: Number(value.targetDefenseStatsChange || 0),
  };
}

async function loadMoves(root: string) {
  const folders = [
    ["fast", false],
    ["fast_elite", true],
    ["charged", false],
    ["charged_elite", true],
  ] as const;
  const byId = new Map<string, CombatMove>();
  for (const [folder, elite] of folders) {
    for (const file of await jsonFiles(path.join(root, "moves", folder))) {
      const entry = await readJson(file);
      if (!entry.combat || !entry.id) continue;
      const id = String(entry.id).toUpperCase();
      const category = folder.startsWith("fast") ? "fast" : "charged";
      const move: CombatMove = {
        id,
        name: entry.names?.French || entry.names?.English || id,
        type: String(entry.type).toUpperCase() as PokemonType,
        category,
        power: Number(entry.combat.power || 0),
        energy: Number(entry.combat.energy || 0),
        turns: Math.max(1, Number(entry.combat.turns || 1)),
        buffs: normalizedBuffs(entry.combat.buffs),
        legacy: Boolean(entry.legacy || entry.legacySlugs?.length),
        elite,
        shadowOnly: Boolean(entry.shadowOnly),
      };
      const previous = byId.get(id);
      if (!previous || (!elite && previous.elite))
        byId.set(id, { ...move, elite: Boolean(previous?.elite || elite) });
      else if (elite) byId.set(id, { ...previous, elite: true });
    }
  }
  return byId;
}

function selectAsset(entry: JsonRecord, assetDocument: JsonRecord | null) {
  const assets = assetDocument?.assets || {};
  const normalShuffle =
    assets.shuffle?.variants?.find(
      (item: JsonRecord) => !item.shiny && item.state === "normal",
    ) || assets.shuffle?.variants?.find((item: JsonRecord) => !item.shiny);
  const shinyShuffle =
    assets.shuffle?.variants?.find(
      (item: JsonRecord) => item.shiny && item.state === "normal",
    ) || assets.shuffle?.variants?.find((item: JsonRecord) => item.shiny);
  return {
    image:
      entry.assets?.image ||
      assets.home?.image ||
      assets.portrait ||
      normalShuffle?.image ||
      null,
    shinyImage:
      entry.assets?.shinyImage ||
      assets.home?.shinyImage ||
      assets.portraitShiny ||
      shinyShuffle?.image ||
      null,
  };
}

function recommendation(pvpRecord: JsonRecord | null, league: string) {
  const dedicated = pvpRecord?.leagues?.[league];
  const primary = dedicated?.variants?.find((variant: JsonRecord) => variant.variant === "normal")
    || dedicated?.variants?.[0]
    || null;
  const moves = primary?.bestMoveset;
  return {
    fast: moves?.fast?.moveId || dedicated?.legacyBestMovesets?.fast || null,
    charged: Array.isArray(moves?.charged)
      ? moves.charged.map((move: JsonRecord) => move.moveId).filter(Boolean)
      : dedicated?.legacyBestMovesets?.charged || [],
  };
}

async function dynamicLeagues(root: string) {
  const calendar = await readJson(
    path.join(root, "gbl-calendar", "current.json"),
  ).catch(() => null);
  const seen = new Set(defaultLeagues.map((league) => league.id));
  const additions: PvpLeague[] = [];
  for (const period of calendar?.periods || []) {
    for (const competition of period.competitions || []) {
      const cup = String(competition.cup || "all")
        .trim()
        .toLowerCase();
      if (!cup || cup === "all" || seen.has(cup)) continue;
      seen.add(cup);
      const restrictions = (competition.restrictions || []).map(String);
      const bannedLabels = restrictions.flatMap((restriction: string) => {
        const match = restriction.match(/^Sans\s+(.+)$/i);
        return match ? match[1].split("/") : [];
      });
      additions.push({
        id: cup,
        name: competition.sourceName || cup,
        cpCap: Number(competition.cpCap || 1500),
        levelCap: 50,
        allowedTypes: parseLocalizedTypes(competition.eligibleTypes || []),
        bannedTypes: parseLocalizedTypes(bannedLabels),
        allowedPokemon: [],
        bannedPokemon: [],
        allowMega: restrictions.some((item: string) => /méga|mega/i.test(item)),
        allowShadow: true,
        allowLegendary: !restrictions.some((item: string) =>
          /légend|legend|mythique|mythic/i.test(item),
        ),
      });
    }
  }
  return [...defaultLeagues, ...additions];
}

async function createCatalog(): Promise<PvpCatalog> {
  const root = dataRoot();
  const [
    moves,
    typeData,
    pokemonFiles,
    formFiles,
    packageJson,
    snapshot,
    leagues,
    pvpManifest,
  ] = await Promise.all([
    loadMoves(root),
    readJson(path.join(root, "types", "types.json")),
    jsonFiles(path.join(root, "pokemon")),
    jsonFiles(path.join(root, "pokemon-forms")),
    readJson(path.join(root, "package.json")),
    readJson(path.join(root, ".dashboard-data-snapshot.json")).catch(
      (): JsonRecord => ({}),
    ),
    dynamicLeagues(root),
    readJson(path.join(root, "pvp", "manifest.json")),
  ]);
  const records = await mapConcurrent(
    [...pokemonFiles, ...formFiles],
    16,
    async (file) => {
      const entry = await readJson(file);
      const reference = path.relative(root, file).replaceAll(path.sep, "/");
      const assetsRef = entry.assets?.assetsRef || null;
      const assetDocument = assetsRef
        ? await readJson(
            path.join(/* turbopackIgnore: true */ root, assetsRef),
          ).catch(() => null)
        : null;
      const pvpRef = entry.pvpRef || null;
      const pvpRecord = pvpRef
        ? await readJson(path.join(/* turbopackIgnore: true */ root, pvpRef)).catch(() => null)
        : null;
      const fastIds = [
        ...new Set([
          ...(entry.quickMoves || []),
          ...(entry.eliteQuickMoves || []),
        ]),
      ];
      const chargedIds = [
        ...new Set([
          ...(entry.cinematicMoves || []),
          ...(entry.eliteCinematicMoves || []),
        ]),
      ];
      const fast = fastIds
        .map((id) => moves.get(String(id).toUpperCase()))
        .filter(Boolean) as CombatMove[];
      const charged = chargedIds
        .map((id) => moves.get(String(id).toUpperCase()))
        .filter(Boolean) as CombatMove[];
      const frustration = moves.get("FRUSTRATION");
      if (entry.availability?.shadow && frustration)
        charged.push(frustration);
      const canonical = canonicalId(entry);
      const types = [entry.primaryType, entry.secondaryType]
        .filter(Boolean)
        .map((item) => String(item).toUpperCase()) as PokemonType[];
      const names = entry.names || {};
      const selectedAssets = selectAsset(entry, assetDocument);
      const assetStatus = selectedAssets.image ? "matched" : "missing-asset";
      return {
        canonicalId: canonical,
        pokemonId: String(entry.id || entry.formId || canonical),
        formId: String(entry.formId || entry.id || canonical),
        baseFormId: String(entry.baseFormId || entry.id || canonical),
        form: String(entry.form || "normal"),
        pokemonClass: String(entry.pokemonClass || "POKEMON_CLASS_NORMAL"),
        dexNr: Number(entry.dexNr || 0),
        dexId: String(entry.dexId || "").padStart(4, "0"),
        names: { French: names.French || "", English: names.English || "" },
        primaryType: String(
          entry.primaryType || "NORMAL",
        ).toUpperCase() as PokemonType,
        secondaryType: entry.secondaryType
          ? (String(entry.secondaryType).toUpperCase() as PokemonType)
          : null,
        types,
        stats: {
          attack: Number(entry.stats?.attack || 0),
          defense: Number(entry.stats?.defense || 0),
          stamina: Number(entry.stats?.stamina || 0),
        },
        availability: {
          shadow: Boolean(entry.availability?.shadow),
          released: entry.availability?.released !== false,
        },
        assets: selectedAssets,
        identity: {
          canonicalId: canonical,
          localReference: reference,
          assetsRef,
          image: selectedAssets.image,
          shinyImage: selectedAssets.shinyImage,
          resolutionStatus: assetStatus,
          assetResolution: {
            status: assetStatus,
            image: selectedAssets.image,
            shinyImage: selectedAssets.shinyImage,
            reason: selectedAssets.image ? null : "ASSET_ENTRY_NOT_FOUND",
          },
        },
        pvpRef,
        pvpSource: pvpRecord?.source || null,
        moves: { fast, charged },
        recommended: {
          little: recommendation(pvpRecord, "little"),
          great: recommendation(pvpRecord, "great"),
          ultra: recommendation(pvpRecord, "ultra"),
          master: recommendation(pvpRecord, "master"),
        },
        searchText: [
          canonical,
          entry.id,
          entry.formId,
          entry.slug,
          entry.dexNr,
          ...Object.values(names),
        ]
          .join(" ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
      } satisfies PvpCatalogPokemon;
    },
  );
  const pokemon = records
    .filter(
      (entry) =>
        entry.canonicalId &&
        entry.stats.attack &&
        entry.moves.fast.length &&
        entry.moves.charged.length &&
        !["dynamax", "gigantamax"].includes(entry.form.toLowerCase()),
    )
    .sort(
      (left, right) =>
        left.dexNr - right.dexNr ||
        left.canonicalId.localeCompare(right.canonicalId),
    );
  const packageVersion = String(packageJson.version || "unknown");
  const commit = String(snapshot.commit || "local");
  return {
    pokemon,
    types: typeData as Array<TypeCatalogEntry & JsonRecord>,
    leagues,
    versions: {
      data: `${packageVersion}+${commit.slice(0, 12)}`,
      package: packageVersion,
      commit,
      syncedAt: snapshot.syncedAt || null,
      pvpCommit: String(pvpManifest.source?.commit || "unknown"),
      pvpSyncedAt: pvpManifest.source?.syncedAt || null,
    },
  };
}

export function readPvpCatalog() {
  if (!catalogPromise) {
    catalogPromise = createCatalog().catch((error) => {
      catalogPromise = null;
      throw error;
    });
  }
  return catalogPromise;
}

export async function getCatalogPokemon(identifier: string) {
  const catalog = await readPvpCatalog();
  const token = String(identifier || "")
    .trim()
    .toUpperCase();
  const pokemon = catalog.pokemon.find(
    (entry) =>
      entry.canonicalId === token ||
      entry.formId === token ||
      entry.pokemonId === token,
  );
  if (!pokemon) throw new Error("POKEMON_NOT_FOUND");
  return pokemon;
}

export async function calculateCatalogIvRank(
  identifier: string,
  leagueId: string,
  ivs?: BattleIvs,
  levelCap: 40 | 41 | 50 | 51 = 50,
) {
  const catalog = await readPvpCatalog();
  const league = catalog.leagues.find((item) => item.id === leagueId);
  if (!league) throw new Error("RULESET_NOT_FOUND");
  const pokemon = await getCatalogPokemon(identifier);
  return rankIvs({
    baseStats: pokemon.stats,
    cpCap: league.cpCap,
    levelCap,
    ivs,
  });
}

export async function calculateCatalogIvRankings(
  identifier: string,
  leagueId: string,
  levelCap: 40 | 41 | 50 | 51 = 50,
) {
  const catalog = await readPvpCatalog();
  const league = catalog.leagues.find((item) => item.id === leagueId);
  if (!league) throw new Error("RULESET_NOT_FOUND");
  const pokemon = await getCatalogPokemon(identifier);
  return rankIvTable({
    baseStats: pokemon.stats,
    cpCap: league.cpCap,
    levelCap,
  });
}

export async function prepareBattleBuild(
  config: BattleBuildConfig,
  league: PvpLeague,
): Promise<PokemonBattleBuild> {
  const pokemon = await getCatalogPokemon(config.canonicalId);
  if (config.shadow && (!league.allowShadow || !pokemon.availability.shadow))
    throw new Error("SHADOW_FORM_NOT_AVAILABLE");
  if (
    league.allowedTypes.length &&
    !pokemon.types.some((type) => league.allowedTypes.includes(type))
  )
    throw new Error("POKEMON_NOT_ELIGIBLE");
  if (pokemon.types.some((type) => league.bannedTypes.includes(type)))
    throw new Error("POKEMON_NOT_ELIGIBLE");
  if (!league.allowMega && /mega|primal/i.test(pokemon.form))
    throw new Error("POKEMON_NOT_ELIGIBLE");
  if (!league.allowLegendary && /LEGENDARY|MYTHIC/.test(pokemon.pokemonClass))
    throw new Error("POKEMON_NOT_ELIGIBLE");
  const fastMove = pokemon.moves.fast.find(
    (move) => move.id === config.fastMoveId,
  );
  const chargedMoves = config.chargedMoveIds
    .map((id) => pokemon.moves.charged.find((move) => move.id === id))
    .filter(Boolean) as CombatMove[];
  if (!fastMove || !chargedMoves.length || chargedMoves.length > 2)
    throw new Error("MOVE_NOT_AVAILABLE");
  if (chargedMoves.some((move) => move.shadowOnly) && !config.shadow)
    throw new Error("MOVE_NOT_AVAILABLE");
  return {
    canonicalId: pokemon.canonicalId,
    pokemonId: pokemon.pokemonId,
    formId: pokemon.formId,
    name: pokemon.names.French || pokemon.names.English || pokemon.formId,
    baseStats: pokemon.stats,
    types: pokemon.types,
    ivs: config.ivs,
    level: config.level,
    shadow: config.shadow,
    fastMove,
    chargedMoves: chargedMoves as [CombatMove, CombatMove] | [CombatMove],
    shields: config.shields,
    startingEnergy: config.startingEnergy,
    startingHp: config.startingHp,
    startingHpPercent: config.startingHpPercent,
    startingStages: config.startingStages,
    formMechanic: getBattleFormMechanic(pokemon.canonicalId),
  };
}

export async function prepareDefaultBattleBuild(
  identifier: string,
  league: PvpLeague,
  shields = 1,
  shadow = false,
) {
  const pokemon = await getCatalogPokemon(identifier);
  const rank = rankIvs({
    baseStats: pokemon.stats,
    cpCap: league.cpCap,
    levelCap: [40, 41, 50, 51].includes(league.levelCap)
      ? (league.levelCap as 40 | 41 | 50 | 51)
      : 50,
  });
  const leagueKey =
    league.cpCap <= 500
      ? "little"
      : league.cpCap <= 1500
        ? "great"
        : league.cpCap <= 2500
          ? "ultra"
          : "master";
  const recommended = pokemon.recommended[leagueKey];
  const fastMoveId =
    recommended?.fast &&
    pokemon.moves.fast.some((move) => move.id === recommended.fast)
      ? recommended.fast
      : pokemon.moves.fast[0].id;
  const recommendedCharged = (recommended?.charged || []).filter((id) =>
    pokemon.moves.charged.some((move) => move.id === id),
  );
  const chargedMoveIds = [
    ...new Set([
      ...recommendedCharged,
      ...pokemon.moves.charged.map((move) => move.id),
    ]),
  ].slice(0, 2);
  return prepareBattleBuild(
    {
      canonicalId: pokemon.canonicalId,
      level: rank.level,
      ivs: rank.ivs,
      shadow,
      fastMoveId,
      chargedMoveIds,
      shields,
      startingEnergy: 0,
      startingHpPercent: 100,
    },
    league,
  );
}
