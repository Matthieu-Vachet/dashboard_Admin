export type PokemonType =
  | "NORMAL"
  | "FIGHTING"
  | "FLYING"
  | "POISON"
  | "GROUND"
  | "ROCK"
  | "BUG"
  | "GHOST"
  | "STEEL"
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "PSYCHIC"
  | "ICE"
  | "DRAGON"
  | "DARK"
  | "FAIRY";

export type BattleIvs = {
  attack: number;
  defense: number;
  stamina: number;
};

export type BaseStats = {
  attack: number;
  defense: number;
  stamina: number;
};

export type BattleStats = {
  level: number;
  cpm: number;
  attack: number;
  defense: number;
  hp: number;
  cp: number;
  statProduct: number;
};

export type CombatBuffs = {
  activationChance: number;
  attackerAttackStatsChange: number;
  attackerDefenseStatsChange: number;
  targetAttackStatsChange: number;
  targetDefenseStatsChange: number;
};

export type CombatMove = {
  id: string;
  name: string;
  type: PokemonType;
  category: "fast" | "charged";
  power: number;
  energy: number;
  turns: number;
  buffs: CombatBuffs | null;
  legacy?: boolean;
  elite?: boolean;
};

export type BattleFormMechanic = {
  id: string;
  trigger: "first-unshielded-charged-damage";
  damageLimit: number;
  attackStageChange?: number;
  defenseStageChange?: number;
  transformedFormId?: string;
  label: string;
};

export type PokemonBattleBuild = {
  canonicalId: string;
  pokemonId: string;
  formId: string;
  name: string;
  baseStats: BaseStats;
  types: PokemonType[];
  ivs: BattleIvs;
  level: number;
  shadow: boolean;
  fastMove: CombatMove;
  chargedMoves: [CombatMove, CombatMove] | [CombatMove];
  shields: number;
  startingEnergy?: number;
  startingHp?: number;
  startingHpPercent?: number;
  startingStages?: {
    attack: number;
    defense: number;
  };
  formMechanic?: BattleFormMechanic;
};

export type TypeCatalogEntry = {
  id: PokemonType;
  type?: string;
  doubleDamageFrom?: string[];
  halfDamageFrom?: string[];
  noDamageFrom?: string[];
};

export type TypeEffectivenessDetail = {
  defenderType: PokemonType;
  relation: "weak" | "resisted" | "immune" | "neutral";
  multiplier: number;
};

export type TypeEffectivenessResult = {
  multiplier: number;
  details: TypeEffectivenessDetail[];
};

export type DamageBreakdown = {
  power: number;
  attack: number;
  defense: number;
  stab: number;
  effectiveness: number;
  shadowAttack: number;
  shadowDefense: number;
  attackStage: number;
  defenseStage: number;
  bonus: number;
  unrounded: number;
  damage: number;
};

export type BattleStrategy = {
  baiting?: "off" | "selective" | "on";
  optimizeTiming?: boolean;
  buffMode?: "deterministic" | "guaranteed" | "disabled";
};

export type SimulateSingleBattleInput = {
  leagueId: string;
  cpCap: number;
  pokemon: [PokemonBattleBuild, PokemonBattleBuild];
  typeCatalog: TypeCatalogEntry[];
  strategy?: BattleStrategy;
  engineVersion?: string;
  dataVersion?: string;
};

export type BattleTimelineEvent = {
  id: string;
  turn: number;
  timestampMs: number;
  actor: 0 | 1;
  target: 0 | 1;
  action: "fast" | "charged" | "shield" | "buff" | "debuff" | "form" | "cmp" | "faint";
  moveId?: string;
  moveName?: string;
  damage?: number;
  energyBefore?: number;
  energyAfter?: number;
  hpBefore?: number;
  hpAfter?: number;
  shield?: boolean;
  stagesBefore?: { attack: number; defense: number };
  stagesAfter?: { attack: number; defense: number };
  cmp?: boolean;
  bait?: boolean;
  decision?: string;
  effectiveness?: number;
  stab?: number;
  damageBreakdown?: DamageBreakdown;
  description: string;
};

export type CombatantBattleResult = {
  canonicalId: string;
  name: string;
  stats: BattleStats;
  remainingHp: number;
  remainingHpPercent: number;
  remainingEnergy: number;
  shieldsRemaining: number;
  stages: { attack: number; defense: number };
  rating: number;
  damageDealt: number;
  damageTaken: number;
  energyGenerated: number;
  energyUsed: number;
  energyWasted: number;
  fastMoves: number;
  chargedMoves: number;
  shieldsUsed: number;
  shieldDamageBlocked: number;
  buffActivations: number;
  cmpWins: number;
};

export type SingleBattleResult = {
  id: string;
  winner: 0 | 1 | null;
  loser: 0 | 1 | null;
  battleRating: number;
  ratings: [number, number];
  ratingClass: string;
  durationTurns: number;
  durationMs: number;
  combatants: [CombatantBattleResult, CombatantBattleResult];
  timeline: BattleTimelineEvent[];
  versions: {
    engine: string;
    rules: string;
    data: string;
  };
  diagnostics: {
    deterministic: true;
    cmpTieBreak: "attack-then-canonical-id";
    maxTurnsReached: boolean;
    timingModel: "fast-completion-boundaries";
    baitModel: "deterministic-shield-and-ko-opportunity";
  };
};

export type ShieldMatrixResult = {
  scenarios: Array<{
    shields: [number, number];
    result: SingleBattleResult;
  }>;
  durationMs: number;
};

export type IvRankResult = BattleStats & {
  rank: number;
  ivs: BattleIvs;
  percentage: number;
  combinations: number;
};

export type MultiBattleResult = {
  subject: string;
  total: number;
  wins: number;
  losses: number;
  draws: number;
  averageRating: number;
  matchups: Array<{ opponent: string; result: SingleBattleResult }>;
  durationMs: number;
};

export type MatrixBattleResult = {
  rows: string[];
  columns: string[];
  cells: Array<{ row: number; column: number; result: SingleBattleResult }>;
  durationMs: number;
};
