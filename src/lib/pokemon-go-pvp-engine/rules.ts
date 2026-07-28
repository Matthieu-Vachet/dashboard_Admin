import type {
  BaseStats,
  BattleIvs,
  BattleStats,
  DamageBreakdown,
  IvRankResult,
  PokemonType,
  TypeCatalogEntry,
  TypeEffectivenessResult,
} from "./types";

export const ENGINE_VERSION = "1.1.0";
export const RULES_VERSION = "2026.07.2";

export const PVP_RULES = Object.freeze({
  stab: 1.2000000476837158,
  superEffective: 1.600000023841858,
  resisted: 0.625,
  immunity: 0.390625,
  damageBonus: 1.2999999523162842,
  shadowAttack: 1.2,
  shadowDefense: 0.83333331,
  maximumEnergy: 100,
  maximumShields: 2,
  maximumStage: 4,
  turnDurationMs: 500,
  battleTimeoutTurns: 480,
});

// Levels 1 through 55 in half-level increments. These are central rules data,
// never copied into individual Pokemon records.
const CP_MULTIPLIERS = Object.freeze([
  0.0939999967813491, 0.135137430784308, 0.166397869586944, 0.192650914456886,
  0.215732470154762, 0.236572655026622, 0.255720049142837, 0.273530381100769,
  0.29024988412857, 0.306057381335773, 0.321087598800659, 0.335445032295077,
  0.349212676286697, 0.36245774877879, 0.375235587358474, 0.387592411085168,
  0.399567276239395, 0.41119354951725, 0.422500014305114, 0.432926413410414,
  0.443107545375824, 0.453059953871985, 0.46279838681221, 0.472336077786704,
  0.481684952974319, 0.490855810259008, 0.499858438968658, 0.508701756943992,
  0.517393946647644, 0.525942508771329, 0.534354329109191, 0.542635762230353,
  0.550792694091796, 0.558830599438087, 0.566754519939422, 0.574569148039264,
  0.582278907299041, 0.589887911977272, 0.59740000963211, 0.604823657502073,
  0.61215728521347, 0.61940411056605, 0.626567125320434, 0.633649181622743,
  0.640652954578399, 0.647580963301656, 0.654435634613037, 0.661219263506722,
  0.667934000492096, 0.674581899290818, 0.681164920330047, 0.687684905887771,
  0.694143652915954, 0.700542893277978, 0.706884205341339, 0.713169102333341,
  0.719399094581604, 0.725575616972598, 0.731700003147125, 0.734741011137376,
  0.737769484519958, 0.740785574597326, 0.743789434432983, 0.746781208702482,
  0.749761044979095, 0.752729105305821, 0.75568550825119, 0.758630366519684,
  0.761563837528228, 0.764486065255226, 0.767397165298461, 0.77029727397159,
  0.77318650484085, 0.776064945942412, 0.778932750225067, 0.781790064808426,
  0.784636974334716, 0.787473583646825, 0.790300011634826, 0.792803950958807,
  0.795300006866455, 0.79780392148697, 0.800300002098083, 0.802803892322847,
  0.805299997329711, 0.807803863460723, 0.81029999256134, 0.812803834895026,
  0.815299987792968, 0.817803806620319, 0.820299983024597, 0.822803778631297,
  0.825299978256225, 0.827803750922782, 0.830299973487854, 0.832803753381377,
  0.835300028324127, 0.837803755931569, 0.840300023555755, 0.842803729034748,
  0.845300018787384, 0.847803702398935, 0.850300014019012, 0.852803676019539,
  0.85530000925064, 0.857803649892077, 0.860300004482269, 0.862803624012168,
  0.865299999713897,
]);

export function isValidLevel(level: number) {
  return Number.isFinite(level)
    && level >= 1
    && level <= 55
    && Math.abs(level * 2 - Math.round(level * 2)) < Number.EPSILON;
}

export function getCpMultiplier(level: number) {
  if (!isValidLevel(level)) throw new Error(`INVALID_LEVEL:${level}`);
  return CP_MULTIPLIERS[Math.round((level - 1) * 2)];
}

export function calculateCp(baseStats: BaseStats, ivs: BattleIvs, level: number) {
  const cpm = getCpMultiplier(level);
  const value = (
    (baseStats.attack + ivs.attack)
    * Math.sqrt(baseStats.defense + ivs.defense)
    * Math.sqrt(baseStats.stamina + ivs.stamina)
    * cpm ** 2
  ) / 10;
  return Math.max(10, Math.floor(value));
}

export function calculateBattleStats(input: {
  baseStats: BaseStats;
  ivs: BattleIvs;
  level: number;
}): BattleStats {
  const { baseStats, ivs, level } = input;
  const cpm = getCpMultiplier(level);
  const attack = (baseStats.attack + ivs.attack) * cpm;
  const defense = (baseStats.defense + ivs.defense) * cpm;
  const hp = Math.max(10, Math.floor((baseStats.stamina + ivs.stamina) * cpm));
  return {
    level,
    cpm,
    attack,
    defense,
    hp,
    cp: calculateCp(baseStats, ivs, level),
    statProduct: (attack * defense * hp) / 1_000,
  };
}

export function clampStatStage(stage: number) {
  return Math.max(-PVP_RULES.maximumStage, Math.min(PVP_RULES.maximumStage, Math.trunc(stage)));
}

export function applyStatStage(current: number, change: number) {
  return clampStatStage(current + change);
}

export function getStageMultiplier(stage: number) {
  const value = clampStatStage(stage);
  return value > 0 ? (4 + value) / 4 : 4 / (4 - value);
}

function normalizeType(value: string): PokemonType {
  return String(value || "").trim().toUpperCase() as PokemonType;
}

export function getTypeEffectiveness(
  moveType: PokemonType,
  defenderTypes: PokemonType[],
  catalog: TypeCatalogEntry[],
): TypeEffectivenessResult {
  const attackType = normalizeType(moveType);
  const byId = new Map(catalog.map((entry) => [normalizeType(entry.id), entry]));
  let multiplier = 1;
  const details = defenderTypes.map((defenderType) => {
    const normalizedDefender = normalizeType(defenderType);
    const entry = byId.get(normalizedDefender);
    const weaknesses = (entry?.doubleDamageFrom || []).map(normalizeType);
    const resistances = (entry?.halfDamageFrom || []).map(normalizeType);
    const immunities = (entry?.noDamageFrom || []).map(normalizeType);
    let relation: "weak" | "resisted" | "immune" | "neutral" = "neutral";
    let value = 1;
    if (weaknesses.includes(attackType)) {
      relation = "weak";
      value = PVP_RULES.superEffective;
    } else if (resistances.includes(attackType)) {
      relation = "resisted";
      value = PVP_RULES.resisted;
    } else if (immunities.includes(attackType)) {
      relation = "immune";
      value = PVP_RULES.immunity;
    }
    multiplier *= value;
    return { defenderType: normalizedDefender, relation, multiplier: value };
  });
  return { multiplier, details };
}

export function getStab(moveType: PokemonType, pokemonTypes: PokemonType[]) {
  return pokemonTypes.map(normalizeType).includes(normalizeType(moveType)) ? PVP_RULES.stab : 1;
}

export function calculateDamage(input: {
  power: number;
  moveType: PokemonType;
  attackerTypes: PokemonType[];
  defenderTypes: PokemonType[];
  attackerStats: BattleStats;
  defenderStats: BattleStats;
  attackerShadow?: boolean;
  defenderShadow?: boolean;
  attackerStage?: number;
  defenderStage?: number;
  typeCatalog: TypeCatalogEntry[];
}): DamageBreakdown {
  const stab = getStab(input.moveType, input.attackerTypes);
  const effectiveness = getTypeEffectiveness(input.moveType, input.defenderTypes, input.typeCatalog).multiplier;
  const attackStage = getStageMultiplier(input.attackerStage || 0);
  const defenseStage = getStageMultiplier(input.defenderStage || 0);
  const shadowAttack = input.attackerShadow ? PVP_RULES.shadowAttack : 1;
  const shadowDefense = input.defenderShadow ? PVP_RULES.shadowDefense : 1;
  const attack = input.attackerStats.attack * attackStage * shadowAttack;
  const defense = input.defenderStats.defense * defenseStage * shadowDefense;
  const unrounded = input.power
    * stab
    * (attack / defense)
    * effectiveness
    * 0.5
    * PVP_RULES.damageBonus;
  return {
    power: input.power,
    attack,
    defense,
    stab,
    effectiveness,
    shadowAttack,
    shadowDefense,
    attackStage,
    defenseStage,
    bonus: PVP_RULES.damageBonus,
    unrounded,
    damage: Math.floor(unrounded) + 1,
  };
}

function bestLevelForSpread(baseStats: BaseStats, ivs: BattleIvs, cpCap: number, levelCap: number) {
  for (let level = levelCap; level >= 1; level -= 0.5) {
    if (calculateCp(baseStats, ivs, level) <= cpCap) return level;
  }
  return null;
}

export function rankIvs(input: {
  baseStats: BaseStats;
  cpCap: number;
  levelCap?: number;
  ivs?: BattleIvs;
}): IvRankResult {
  const levelCap = input.levelCap ?? 50;
  if (!isValidLevel(levelCap)) throw new Error(`INVALID_LEVEL:${levelCap}`);
  const combinations: Array<BattleStats & { ivs: BattleIvs }> = [];
  for (let attack = 0; attack <= 15; attack += 1) {
    for (let defense = 0; defense <= 15; defense += 1) {
      for (let stamina = 0; stamina <= 15; stamina += 1) {
        const ivs = { attack, defense, stamina };
        const level = bestLevelForSpread(input.baseStats, ivs, input.cpCap, levelCap);
        if (level === null) continue;
        combinations.push({ ...calculateBattleStats({ baseStats: input.baseStats, ivs, level }), ivs });
      }
    }
  }
  combinations.sort((left, right) =>
    right.statProduct - left.statProduct
    || right.attack - left.attack
    || right.defense - left.defense
    || right.hp - left.hp
    || left.ivs.attack - right.ivs.attack
    || right.ivs.defense - left.ivs.defense
    || right.ivs.stamina - left.ivs.stamina,
  );
  const requested = input.ivs || combinations[0]?.ivs;
  const index = combinations.findIndex((entry) =>
    entry.ivs.attack === requested.attack
    && entry.ivs.defense === requested.defense
    && entry.ivs.stamina === requested.stamina,
  );
  const selected = combinations[Math.max(0, index)];
  if (!selected) throw new Error("CP_LIMIT_EXCEEDED");
  return {
    ...selected,
    rank: index < 0 ? 1 : index + 1,
    percentage: combinations[0].statProduct ? (selected.statProduct / combinations[0].statProduct) * 100 : 0,
    combinations: combinations.length,
  };
}

export function ratingClass(rating: number) {
  if (rating === 500) return "tie";
  if (rating <= 150) return "dominant-loss";
  if (rating < 400) return "loss";
  if (rating < 500) return "close-loss";
  if (rating < 600) return "close-win";
  if (rating < 850) return "win";
  return "dominant-win";
}
