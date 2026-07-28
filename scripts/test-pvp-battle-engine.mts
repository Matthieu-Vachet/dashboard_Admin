import assert from "node:assert/strict";
import test from "node:test";
import engine from "../src/lib/pokemon-go-pvp-engine/index.ts";
import type {
  CombatMove,
  PokemonBattleBuild,
  PokemonType,
  TypeCatalogEntry,
} from "../src/lib/pokemon-go-pvp-engine/index.ts";

const {
  BATTLE_FORM_MECHANICS,
  PVP_RULES,
  applyStatStage,
  calculateBattleStats,
  calculateCp,
  calculateDamage,
  getCpMultiplier,
  getStageMultiplier,
  getTypeEffectiveness,
  rankIvs,
  simulateShieldMatrix,
  simulateSingleBattle,
} = engine;

const typeCatalog: TypeCatalogEntry[] = [
  { id: "GHOST", doubleDamageFrom: ["GHOST", "DARK"], halfDamageFrom: ["POISON", "BUG"], noDamageFrom: ["NORMAL", "FIGHTING"] },
  { id: "FAIRY", doubleDamageFrom: ["POISON", "STEEL"], halfDamageFrom: ["FIGHTING", "BUG", "DARK"], noDamageFrom: ["DRAGON"] },
  { id: "NORMAL", doubleDamageFrom: ["FIGHTING"], halfDamageFrom: [], noDamageFrom: ["GHOST"] },
  { id: "ROCK", doubleDamageFrom: ["FIGHTING", "GROUND", "STEEL", "WATER", "GRASS"], halfDamageFrom: ["NORMAL", "FLYING", "POISON", "FIRE"], noDamageFrom: [] },
  { id: "ICE", doubleDamageFrom: ["FIGHTING", "ROCK", "STEEL", "FIRE"], halfDamageFrom: ["ICE"], noDamageFrom: [] },
  { id: "GRASS", doubleDamageFrom: ["FLYING", "POISON", "BUG", "FIRE", "ICE"], halfDamageFrom: ["GROUND", "WATER", "GRASS", "ELECTRIC"], noDamageFrom: [] },
] as TypeCatalogEntry[];

const move = (
  id: string,
  category: "fast" | "charged",
  type: PokemonType,
  power: number,
  energy: number,
  turns = 1,
  buffs: CombatMove["buffs"] = null,
): CombatMove => ({ id, name: id, category, type, power, energy, turns, buffs });

const shadowClaw = move("SHADOW_CLAW_FAST", "fast", "GHOST", 6, 8, 2);
const rollout = move("ROLLOUT_FAST", "fast", "ROCK", 7, 13, 3);
const shadowSneak = move("SHADOW_SNEAK", "charged", "GHOST", 75, -50);
const playRough = move("PLAY_ROUGH", "charged", "FAIRY", 90, -60);
const bodySlam = move("BODY_SLAM", "charged", "NORMAL", 55, -35);
const shadowBall = move("SHADOW_BALL", "charged", "GHOST", 100, -50);

function mimikyu(overrides: Partial<PokemonBattleBuild> = {}): PokemonBattleBuild {
  return {
    canonicalId: "MIMIKYU_NORMAL",
    pokemonId: "MIMIKYU",
    formId: "MIMIKYU",
    name: "Mimiqui",
    baseStats: { attack: 177, defense: 199, stamina: 146 },
    types: ["GHOST", "FAIRY"],
    ivs: { attack: 1, defense: 14, stamina: 15 },
    level: 25.5,
    shadow: false,
    fastMove: shadowClaw,
    chargedMoves: [shadowSneak, playRough],
    shields: 1,
    ...overrides,
  };
}

function lickilicky(overrides: Partial<PokemonBattleBuild> = {}): PokemonBattleBuild {
  return {
    canonicalId: "LICKILICKY_NORMAL",
    pokemonId: "LICKILICKY",
    formId: "LICKILICKY",
    name: "Coudlangue",
    baseStats: { attack: 161, defense: 181, stamina: 242 },
    types: ["NORMAL"],
    ivs: { attack: 0, defense: 15, stamina: 10 },
    level: 23.5,
    shadow: false,
    fastMove: rollout,
    chargedMoves: [bodySlam, shadowBall],
    shields: 1,
    ...overrides,
  };
}

test("la table CPM couvre précisément les niveaux PvP actuels", () => {
  assert.equal(getCpMultiplier(1), 0.0939999967813491);
  assert.equal(getCpMultiplier(40), 0.790300011634826);
  assert.equal(getCpMultiplier(50), 0.840300023555755);
  assert.equal(getCpMultiplier(55), 0.865299999713897);
  assert.throws(() => getCpMultiplier(40.25), /INVALID_LEVEL/);
});

test("CP, HP et statistiques réelles suivent les arrondis Pokémon GO", () => {
  const stats = calculateBattleStats({
    baseStats: { attack: 155, defense: 196, stamina: 198 },
    ivs: { attack: 1, defense: 14, stamina: 14 },
    level: 25.5,
  });
  assert.equal(stats.cp, 1497);
  assert.equal(stats.hp, 143);
  assert.equal(calculateCp({ attack: 155, defense: 196, stamina: 198 }, { attack: 1, defense: 14, stamina: 14 }, 25.5), 1497);
});

test("Rank 1 Great League corrige Mimikyu et Tinkaton", () => {
  const mimikyuRank = rankIvs({ baseStats: { attack: 177, defense: 199, stamina: 146 }, cpCap: 1500, levelCap: 50 });
  const tinkatonRank = rankIvs({ baseStats: { attack: 155, defense: 196, stamina: 198 }, cpCap: 1500, levelCap: 50 });
  assert.deepEqual(mimikyuRank.ivs, { attack: 1, defense: 14, stamina: 15 });
  assert.deepEqual(tinkatonRank.ivs, { attack: 1, defense: 14, stamina: 14 });
  assert.equal(tinkatonRank.cp, 1497);
});

test("efficacité, immunités GO, STAB, Shadow et stages composent une formule unique", () => {
  const effectiveness = getTypeEffectiveness("GHOST", ["NORMAL"], typeCatalog);
  assert.equal(effectiveness.multiplier, PVP_RULES.immunity);
  const attackerStats = calculateBattleStats({ baseStats: mimikyu().baseStats, ivs: mimikyu().ivs, level: mimikyu().level });
  const defenderStats = calculateBattleStats({ baseStats: lickilicky().baseStats, ivs: lickilicky().ivs, level: lickilicky().level });
  const damage = calculateDamage({
    power: 6,
    moveType: "GHOST",
    attackerTypes: ["GHOST", "FAIRY"],
    defenderTypes: ["NORMAL"],
    attackerStats,
    defenderStats,
    attackerStage: 1,
    defenderStage: -1,
    attackerShadow: true,
    typeCatalog,
  });
  assert.equal(damage.stab, PVP_RULES.stab);
  assert.equal(damage.effectiveness, PVP_RULES.immunity);
  assert.equal(damage.attackStage, 1.25);
  assert.equal(damage.defenseStage, 0.8);
  assert.ok(damage.damage >= 1);
});

test("les stages sont bornés de -4 à +4", () => {
  assert.equal(applyStatStage(3, 2), 4);
  assert.equal(applyStatStage(-3, -2), -4);
  assert.equal(getStageMultiplier(4), 2);
  assert.equal(getStageMultiplier(-4), 0.5);
});

test("les mécaniques de forme restent pilotées par le registre central", () => {
  const result = simulateSingleBattle({
    leagueId: "great",
    cpCap: 1500,
    pokemon: [
      mimikyu({ shields: 0, formMechanic: BATTLE_FORM_MECHANICS.MIMIKYU_NORMAL }),
      lickilicky({ shields: 0, startingEnergy: 100 }),
    ],
    typeCatalog,
    strategy: { baiting: "off" },
  });
  const formEvent = result.timeline.find((event) => event.action === "form");
  const absorbed = result.timeline.find((event) => event.action === "charged" && event.target === 0);
  assert.equal(absorbed?.damage, 1);
  assert.equal(formEvent?.moveId, "mimikyu-disguise");
  assert.equal(formEvent?.stagesAfter?.defense, -1);
});

test("Single est déterministe et produit une timeline complète", () => {
  const input = {
    leagueId: "great",
    cpCap: 1500,
    pokemon: [mimikyu(), lickilicky()] as [PokemonBattleBuild, PokemonBattleBuild],
    typeCatalog,
    dataVersion: "fixture-2026-07-28",
  };
  const first = simulateSingleBattle(input);
  const second = simulateSingleBattle(input);
  assert.deepEqual(first, second);
  assert.ok(first.timeline.some((event) => event.action === "fast"));
  assert.ok(first.timeline.some((event) => event.action === "charged"));
  assert.ok(first.timeline.some((event) => event.action === "shield"));
  assert.ok(first.timeline.some((event) => event.action === "faint"));
  assert.equal(first.diagnostics.deterministic, true);
  assert.equal(first.combatants[0].stats.cp <= 1500, true);
});

test("Shield Matrix calcule les neuf scénarios sans requête HTTP unitaire", () => {
  const matrix = simulateShieldMatrix({
    leagueId: "great",
    cpCap: 1500,
    pokemon: [mimikyu(), lickilicky()],
    typeCatalog,
  });
  assert.equal(matrix.scenarios.length, 9);
  assert.deepEqual(matrix.scenarios.map((entry) => entry.shields), [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ]);
});

test("les buffs probabilistes utilisent un compteur déterministe", () => {
  const debuff = move("TEST_DEBUFF", "charged", "GHOST", 1, -1, 1, {
    activationChance: 50,
    attackerAttackStatsChange: 0,
    attackerDefenseStatsChange: 0,
    targetAttackStatsChange: 0,
    targetDefenseStatsChange: -1,
  });
  const result = simulateSingleBattle({
    leagueId: "master",
    cpCap: 10_000,
    pokemon: [
      mimikyu({ chargedMoves: [debuff], startingEnergy: 100, shields: 0 }),
      lickilicky({ shields: 0, startingHpPercent: 100 }),
    ],
    typeCatalog,
    strategy: { buffMode: "deterministic", baiting: "off" },
  });
  const debuffs = result.timeline.filter((event) => event.action === "debuff");
  assert.ok(debuffs.length >= 1);
  assert.equal(debuffs[0].turn >= 2, true);
});

test("la CMP utilise l’Attaque réelle après CPM, Shadow et stage", () => {
  const result = simulateSingleBattle({
    leagueId: "master",
    cpCap: 10_000,
    pokemon: [
      mimikyu({ startingEnergy: 100, startingStages: { attack: -4, defense: 0 } }),
      lickilicky({ startingEnergy: 100, shadow: true, startingStages: { attack: 4, defense: 0 } }),
    ],
    typeCatalog,
    strategy: { baiting: "off" },
  });
  assert.equal(result.timeline.find((event) => event.action === "cmp")?.actor, 1);
});

test("le bait sélectif est déterministe et expose sa décision dans la timeline", () => {
  const cheap = move("CHEAP_BAIT", "charged", "GHOST", 35, -35);
  const nuke = move("EXPENSIVE_NUKE", "charged", "GHOST", 180, -60);
  const result = simulateSingleBattle({
    leagueId: "master",
    cpCap: 10_000,
    pokemon: [
      mimikyu({ chargedMoves: [cheap, nuke], startingEnergy: 100, shields: 0 }),
      lickilicky({ shields: 1, startingHpPercent: 30 }),
    ],
    typeCatalog,
    strategy: { baiting: "selective" },
  });
  const charged = result.timeline.find((event) => event.action === "charged" && event.actor === 0);
  assert.equal(charged?.moveId, "CHEAP_BAIT");
  assert.equal(charged?.bait, true);
  assert.equal(charged?.decision, "predicted-shield-preserve-ko");
  assert.equal(result.diagnostics.baitModel, "deterministic-shield-and-ko-opportunity");
});

test("énergie, boucliers et gaspillage respectent leurs bornes après chaque événement", () => {
  const result = simulateSingleBattle({
    leagueId: "master",
    cpCap: 10_000,
    pokemon: [mimikyu({ startingEnergy: 100, shields: 2 }), lickilicky({ startingEnergy: 100, shields: 2 })],
    typeCatalog,
  });
  for (const event of result.timeline) {
    if (event.energyAfter !== undefined) assert.ok(event.energyAfter >= 0 && event.energyAfter <= 100);
  }
  for (const combatant of result.combatants) {
    assert.ok(combatant.shieldsUsed >= 0 && combatant.shieldsUsed <= 2);
    assert.ok(combatant.energyWasted >= 0);
    assert.ok(combatant.remainingEnergy >= 0 && combatant.remainingEnergy <= 100);
  }
});
