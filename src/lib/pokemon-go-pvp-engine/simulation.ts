import {
  ENGINE_VERSION,
  PVP_RULES,
  RULES_VERSION,
  applyStatStage,
  calculateBattleStats,
  calculateDamage,
  getStageMultiplier,
  ratingClass,
} from "./rules";
import type {
  BattleStrategy,
  BattleTimelineEvent,
  CombatMove,
  MatrixBattleResult,
  MultiBattleResult,
  PokemonBattleBuild,
  ShieldMatrixResult,
  SimulateSingleBattleInput,
  SingleBattleResult,
} from "./types";

type Metrics = {
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

type RuntimeCombatant = {
  index: 0 | 1;
  build: PokemonBattleBuild;
  stats: ReturnType<typeof calculateBattleStats>;
  hp: number;
  energy: number;
  shields: number;
  stages: { attack: number; defense: number };
  pendingFast: { move: CombatMove; completeTurn: number } | null;
  buffMeters: Map<string, number>;
  formMechanicTriggered: boolean;
  metrics: Metrics;
};

type ChargedDecision = { move: CombatMove; bait: boolean; reason: string };
type SelectedMove = { actor: RuntimeCombatant; defender: RuntimeCombatant; decision: ChargedDecision };

function emptyMetrics(): Metrics {
  return {
    damageDealt: 0,
    damageTaken: 0,
    energyGenerated: 0,
    energyUsed: 0,
    energyWasted: 0,
    fastMoves: 0,
    chargedMoves: 0,
    shieldsUsed: 0,
    shieldDamageBlocked: 0,
    buffActivations: 0,
    cmpWins: 0,
  };
}

function validateBuild(build: PokemonBattleBuild, cpCap: number) {
  for (const value of [build.ivs.attack, build.ivs.defense, build.ivs.stamina]) {
    if (!Number.isInteger(value) || value < 0 || value > 15) throw new Error("INVALID_IV");
  }
  if (!Number.isInteger(build.shields) || build.shields < 0 || build.shields > 2) {
    throw new Error("INVALID_SHIELD_COUNT");
  }
  const stats = calculateBattleStats({ baseStats: build.baseStats, ivs: build.ivs, level: build.level });
  if (stats.cp > cpCap) throw new Error("CP_LIMIT_EXCEEDED");
  if (build.fastMove.category !== "fast" || build.fastMove.energy < 0 || build.fastMove.turns < 1) {
    throw new Error("MOVE_NOT_AVAILABLE");
  }
  if (!build.chargedMoves.length || build.chargedMoves.some((move) => move.category !== "charged" || move.energy >= 0)) {
    throw new Error("MOVE_NOT_AVAILABLE");
  }
  return stats;
}

function runtime(build: PokemonBattleBuild, index: 0 | 1, cpCap: number): RuntimeCombatant {
  const stats = validateBuild(build, cpCap);
  const requestedHp = build.startingHp
    ?? Math.floor(stats.hp * ((build.startingHpPercent ?? 100) / 100));
  return {
    index,
    build,
    stats,
    hp: Math.max(1, Math.min(stats.hp, requestedHp || stats.hp)),
    energy: Math.max(0, Math.min(PVP_RULES.maximumEnergy, Math.trunc(build.startingEnergy || 0))),
    shields: build.shields,
    stages: {
      attack: Math.max(-4, Math.min(4, Math.trunc(build.startingStages?.attack || 0))),
      defense: Math.max(-4, Math.min(4, Math.trunc(build.startingStages?.defense || 0))),
    },
    pendingFast: null,
    buffMeters: new Map(),
    formMechanicTriggered: false,
    metrics: emptyMetrics(),
  };
}

function stableHash(value: unknown) {
  const text = JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function moveDamage(actor: RuntimeCombatant, defender: RuntimeCombatant, move: CombatMove, input: SimulateSingleBattleInput) {
  return calculateDamage({
    power: move.power,
    moveType: move.type,
    attackerTypes: actor.build.types,
    defenderTypes: defender.build.types,
    attackerStats: actor.stats,
    defenderStats: defender.stats,
    attackerShadow: actor.build.shadow,
    defenderShadow: defender.build.shadow,
    attackerStage: actor.stages.attack,
    defenderStage: defender.stages.defense,
    typeCatalog: input.typeCatalog,
  });
}

function chooseChargedMove(
  actor: RuntimeCombatant,
  defender: RuntimeCombatant,
  input: SimulateSingleBattleInput,
  strategy: BattleStrategy,
) {
  const evaluated = actor.build.chargedMoves.map((move) => ({
    move,
    breakdown: moveDamage(actor, defender, move, input),
  }));
  const available = evaluated.filter(
    ({ move }) => actor.energy >= Math.abs(move.energy),
  );
  if (!available.length) return null;
  const byDamage = [...available].sort((left, right) =>
    right.breakdown.damage - left.breakdown.damage
    || Math.abs(left.move.energy) - Math.abs(right.move.energy)
    || left.move.id.localeCompare(right.move.id),
  );
  const byCost = [...available].sort((left, right) =>
    Math.abs(left.move.energy) - Math.abs(right.move.energy)
    || right.breakdown.damage - left.breakdown.damage,
  );
  const strongest = [...evaluated].sort((left, right) =>
    right.breakdown.damage - left.breakdown.damage
    || Math.abs(left.move.energy) - Math.abs(right.move.energy)
    || left.move.id.localeCompare(right.move.id),
  )[0];
  const strongestAffordable = available.some(
    ({ move }) => move.id === strongest.move.id,
  );
  const strongestSelfDebuffs = Boolean(
    strongest.move.buffs
      && (strongest.move.buffs.attackerAttackStatsChange < 0
        || strongest.move.buffs.attackerDefenseStatsChange < 0),
  );
  const oneFastFromStrongest = Math.abs(strongest.move.energy) - actor.energy
    <= actor.build.fastMove.energy;
  if (
    defender.shields === 0
    && !strongestAffordable
    && strongestSelfDebuffs
    && oneFastFromStrongest
    && strongest.breakdown.damage >= byDamage[0].breakdown.damage * 1.35
    && actor.energy + actor.build.fastMove.energy <= PVP_RULES.maximumEnergy
  ) {
    return null;
  }
  if ((strategy.baiting || "selective") === "off" || defender.shields === 0) {
    return { move: byDamage[0].move, bait: false, reason: defender.shields === 0 ? "no-shield" : "bait-off" };
  }
  if (strategy.baiting === "on") {
    return { move: byCost[0].move, bait: byCost[0].move.id !== byDamage[0].move.id, reason: "forced-bait" };
  }
  const nuke = byDamage[0];
  const bait = byCost[0];
  const worthwhileBait = Math.abs(nuke.move.energy) - Math.abs(bait.move.energy) >= 10;
  const baitPreservesKo = bait.breakdown.damage < defender.hp;
  const baitLeavesReachableNuke = actor.energy - Math.abs(bait.move.energy) + actor.build.fastMove.energy >= Math.abs(nuke.move.energy);
  const shouldBait = worthwhileBait
    && nuke.move.id !== bait.move.id
    && nuke.breakdown.damage >= defender.hp
    && baitPreservesKo
    && baitLeavesReachableNuke;
  return shouldBait
    ? { move: bait.move, bait: true, reason: "predicted-shield-preserve-ko" }
    : { move: nuke.move, bait: false, reason: "damage-or-energy-efficiency" };
}

function shouldUseShield(
  actor: RuntimeCombatant,
  defender: RuntimeCombatant,
  move: CombatMove,
  breakdown: ReturnType<typeof moveDamage>,
  input: SimulateSingleBattleInput,
  strategy: BattleStrategy,
) {
  if (defender.shields <= 0 || breakdown.damage <= 1) return false;
  if (strategy.baiting === "on") return true;

  const fastBreakdown = moveDamage(actor, defender, actor.build.fastMove, input);
  const fastEnergy = Math.max(1, actor.build.fastMove.energy);
  const moveCost = Math.abs(move.energy);
  const storedAfterMove = Math.max(actor.energy - moveCost, 0);
  const fastAttacks = Math.ceil(
    (moveCost - storedAfterMove) / fastEnergy,
  ) + 1;
  const cycleDamage = (fastAttacks * fastBreakdown.damage + 1)
    * defender.shields;
  if (defender.hp - breakdown.damage <= cycleDamage) return true;

  const fastDamagePerTurn = fastBreakdown.damage / actor.build.fastMove.turns;
  const chargedOptions = actor.build.chargedMoves.map((chargedMove) => ({
    move: chargedMove,
    damage: moveDamage(actor, defender, chargedMove, input).damage,
  }));
  for (const { damage: chargedDamage } of chargedOptions) {
    if (chargedDamage >= defender.hp / 1.4 && fastDamagePerTurn > 1.5)
      return true;
    if (chargedDamage >= defender.hp - cycleDamage) return true;
  }

  const selfAttackDebuff = Boolean(
    move.buffs?.attackerAttackStatsChange
      && move.buffs.attackerAttackStatsChange < 0,
  );
  if (selfAttackDebuff && breakdown.damage / defender.hp > 0.55) return true;

  const strongestDamage = Math.max(
    ...chargedOptions.map(({ damage }) => damage),
  );
  const hasDominatedHigherCostMove = chargedOptions.some(
    ({ move: option, damage }) =>
      Math.abs(option.energy) > Math.abs(move.energy)
      && damage <= breakdown.damage,
  );
  const survivesComfortably = defender.hp - breakdown.damage
    > defender.stats.hp * 0.46;
  const revealsNoHiddenNuke = breakdown.damage >= strongestDamage;
  if (
    survivesComfortably
    && breakdown.effectiveness <= 1
    && revealsNoHiddenNuke
    && hasDominatedHigherCostMove
  ) {
    return false;
  }

  return true;
}

function eventId(turn: number, sequence: number) {
  return `t${turn}-${sequence}`;
}

function cmpOrder(left: SelectedMove, right: SelectedMove) {
  const cmpAttack = (fighter: RuntimeCombatant) => fighter.stats.attack
    * getStageMultiplier(fighter.stages.attack)
    * (fighter.build.shadow ? PVP_RULES.shadowAttack : 1);
  const attackDelta = cmpAttack(right.actor) - cmpAttack(left.actor);
  if (Math.abs(attackDelta) > 1e-10) return attackDelta;
  return left.actor.build.canonicalId.localeCompare(right.actor.build.canonicalId);
}

function shouldApplyBuff(actor: RuntimeCombatant, move: CombatMove, strategy: BattleStrategy) {
  if (!move.buffs) return false;
  const chance = Math.max(0, Math.min(100, move.buffs.activationChance));
  if (strategy.buffMode === "disabled") return false;
  if (strategy.buffMode === "guaranteed" || chance >= 100) return true;
  const before = actor.buffMeters.get(move.id) || 0;
  const after = before + chance / 100;
  actor.buffMeters.set(move.id, after);
  return Math.floor(after) > Math.floor(before);
}

function applyBuffs(
  actor: RuntimeCombatant,
  defender: RuntimeCombatant,
  move: CombatMove,
  turn: number,
  timeline: BattleTimelineEvent[],
  strategy: BattleStrategy,
) {
  const buffs = move.buffs;
  if (!buffs || !shouldApplyBuff(actor, move, strategy)) return;
  const changes = [
    { target: actor, attack: buffs.attackerAttackStatsChange, defense: buffs.attackerDefenseStatsChange },
    { target: defender, attack: buffs.targetAttackStatsChange, defense: buffs.targetDefenseStatsChange },
  ];
  for (const change of changes) {
    if (!change.attack && !change.defense) continue;
    const before = { ...change.target.stages };
    change.target.stages.attack = applyStatStage(change.target.stages.attack, change.attack);
    change.target.stages.defense = applyStatStage(change.target.stages.defense, change.defense);
    const after = { ...change.target.stages };
    const action = change.attack > 0 || change.defense > 0 ? "buff" : "debuff";
    timeline.push({
      id: eventId(turn, timeline.length),
      turn,
      timestampMs: turn * PVP_RULES.turnDurationMs,
      actor: actor.index,
      target: change.target.index,
      action,
      moveId: move.id,
      moveName: move.name,
      stagesBefore: before,
      stagesAfter: after,
      description: `${change.target.build.name}: Attack ${before.attack}→${after.attack}, Defense ${before.defense}→${after.defense}`,
    });
    actor.metrics.buffActivations += 1;
  }
}

function markFaints(turn: number, fighters: [RuntimeCombatant, RuntimeCombatant], timeline: BattleTimelineEvent[], marked: Set<number>) {
  for (const fighter of fighters) {
    if (fighter.hp > 0 || marked.has(fighter.index)) continue;
    marked.add(fighter.index);
    timeline.push({
      id: eventId(turn, timeline.length),
      turn,
      timestampMs: turn * PVP_RULES.turnDurationMs,
      actor: fighter.index,
      target: fighter.index === 0 ? 1 : 0,
      action: "faint",
      hpBefore: 0,
      hpAfter: 0,
      description: `${fighter.build.name} est K.O.`,
    });
  }
}

export function simulateSingleBattle(input: SimulateSingleBattleInput): SingleBattleResult {
  const strategy: BattleStrategy = {
    baiting: input.strategy?.baiting || "selective",
    optimizeTiming: input.strategy?.optimizeTiming ?? true,
    buffMode: input.strategy?.buffMode || "deterministic",
  };
  const fighters: [RuntimeCombatant, RuntimeCombatant] = [
    runtime(input.pokemon[0], 0, input.cpCap),
    runtime(input.pokemon[1], 1, input.cpCap),
  ];
  const timeline: BattleTimelineEvent[] = [];
  const markedFaints = new Set<number>();
  let turn = 1;

  while (fighters[0].hp > 0 && fighters[1].hp > 0 && turn <= PVP_RULES.battleTimeoutTurns) {
    const charged: SelectedMove[] = [];
    for (const fighter of fighters) {
      if (fighter.pendingFast || fighter.hp <= 0) continue;
      const defender = fighters[fighter.index === 0 ? 1 : 0];
      const decision = chooseChargedMove(fighter, defender, input, strategy);
      if (decision) charged.push({ actor: fighter, defender, decision });
      else fighter.pendingFast = {
        move: fighter.build.fastMove,
        completeTurn: turn + fighter.build.fastMove.turns - 1,
      };
    }

    if (charged.length === 2) {
      charged.sort(cmpOrder);
      const first = charged[0].actor;
      first.metrics.cmpWins += 1;
      timeline.push({
        id: eventId(turn, timeline.length),
        turn,
        timestampMs: turn * PVP_RULES.turnDurationMs,
        actor: first.index,
        target: first.index === 0 ? 1 : 0,
        action: "cmp",
        cmp: true,
        description: `${first.build.name} gagne la CMP`,
      });
    }

    for (const action of charged.sort(cmpOrder)) {
      const { actor, defender, decision } = action;
      const { move } = decision;
      if (actor.hp <= 0 || defender.hp <= 0) continue;
      const energyBefore = actor.energy;
      const cost = Math.abs(move.energy);
      actor.energy -= cost;
      actor.metrics.energyUsed += cost;
      actor.metrics.chargedMoves += 1;
      const breakdown = moveDamage(actor, defender, move, input);
      const hpBefore = defender.hp;
      const shielded = shouldUseShield(
        actor,
        defender,
        move,
        breakdown,
        input,
        strategy,
      );
      const formMechanic = defender.build.formMechanic;
      const triggersFormMechanic = !shielded
        && !defender.formMechanicTriggered
        && formMechanic?.trigger === "first-unshielded-charged-damage";
      const damage = shielded
        ? 1
        : triggersFormMechanic
          ? Math.min(breakdown.damage, formMechanic.damageLimit)
          : breakdown.damage;
      if (shielded) {
        defender.shields -= 1;
        defender.metrics.shieldsUsed += 1;
        defender.metrics.shieldDamageBlocked += Math.max(0, breakdown.damage - 1);
        timeline.push({
          id: eventId(turn, timeline.length),
          turn,
          timestampMs: turn * PVP_RULES.turnDurationMs,
          actor: defender.index,
          target: actor.index,
          action: "shield",
          moveId: move.id,
          moveName: move.name,
          moveType: move.type,
          shield: true,
          damage: breakdown.damage - 1,
          description: `${defender.build.name} bloque ${move.name}`,
        });
      }
      defender.hp = Math.max(0, defender.hp - damage);
      actor.metrics.damageDealt += Math.min(hpBefore, damage);
      defender.metrics.damageTaken += Math.min(hpBefore, damage);
      timeline.push({
        id: eventId(turn, timeline.length),
        turn,
        timestampMs: turn * PVP_RULES.turnDurationMs,
        actor: actor.index,
        target: defender.index,
        action: "charged",
        moveId: move.id,
        moveName: move.name,
        moveType: move.type,
        damage,
        energyBefore,
        energyAfter: actor.energy,
        hpBefore,
        hpAfter: defender.hp,
        shield: shielded,
        effectiveness: breakdown.effectiveness,
        stab: breakdown.stab,
        damageBreakdown: breakdown,
        bait: decision.bait,
        decision: decision.reason,
        description: `${actor.build.name} lance ${move.name} · ${damage} dégâts${decision.bait ? " · bait" : ""}${shielded ? " (bouclier)" : triggersFormMechanic ? ` (${formMechanic.label})` : ""}`,
      });
      if (triggersFormMechanic) {
        defender.formMechanicTriggered = true;
        const before = { ...defender.stages };
        defender.stages.attack = applyStatStage(defender.stages.attack, formMechanic.attackStageChange || 0);
        defender.stages.defense = applyStatStage(defender.stages.defense, formMechanic.defenseStageChange || 0);
        timeline.push({
          id: eventId(turn, timeline.length),
          turn,
          timestampMs: turn * PVP_RULES.turnDurationMs,
          actor: defender.index,
          target: actor.index,
          action: "form",
          moveId: formMechanic.id,
          moveName: formMechanic.label,
          stagesBefore: before,
          stagesAfter: { ...defender.stages },
          description: `${defender.build.name}: ${formMechanic.label}${formMechanic.transformedFormId ? ` → ${formMechanic.transformedFormId}` : ""}`,
        });
      }
      applyBuffs(actor, defender, move, turn, timeline, strategy);
      markFaints(turn, fighters, timeline, markedFaints);
    }

    const completing = fighters.filter((fighter) => fighter.pendingFast?.completeTurn === turn && fighter.hp > 0);
    const fastActions = completing.map((actor) => {
      const defender = fighters[actor.index === 0 ? 1 : 0];
      const move = actor.pendingFast!.move;
      return { actor, defender, move, breakdown: moveDamage(actor, defender, move, input) };
    });
    for (const action of fastActions) {
      const { actor, defender, move, breakdown } = action;
      const hpBefore = defender.hp;
      const energyBefore = actor.energy;
      const generated = Math.max(0, move.energy);
      const acceptedEnergy = Math.min(generated, PVP_RULES.maximumEnergy - actor.energy);
      actor.energy += acceptedEnergy;
      actor.metrics.energyGenerated += acceptedEnergy;
      actor.metrics.energyWasted += generated - acceptedEnergy;
      actor.metrics.fastMoves += 1;
      defender.hp = Math.max(0, defender.hp - breakdown.damage);
      actor.metrics.damageDealt += Math.min(hpBefore, breakdown.damage);
      defender.metrics.damageTaken += Math.min(hpBefore, breakdown.damage);
      timeline.push({
        id: eventId(turn, timeline.length),
        turn,
        timestampMs: turn * PVP_RULES.turnDurationMs,
        actor: actor.index,
        target: defender.index,
        action: "fast",
        moveId: move.id,
        moveName: move.name,
        moveType: move.type,
        damage: breakdown.damage,
        energyBefore,
        energyAfter: actor.energy,
        hpBefore,
        hpAfter: defender.hp,
        effectiveness: breakdown.effectiveness,
        stab: breakdown.stab,
        damageBreakdown: breakdown,
        description: `${actor.build.name} utilise ${move.name} · ${breakdown.damage} dégâts · +${acceptedEnergy} énergie`,
      });
      applyBuffs(actor, defender, move, turn, timeline, strategy);
    }
    for (const fighter of completing) fighter.pendingFast = null;
    markFaints(turn, fighters, timeline, markedFaints);
    turn += 1;
  }

  const durationTurns = Math.min(turn - 1, PVP_RULES.battleTimeoutTurns);
  const ratings = fighters.map((fighter, index) => {
    const opponent = fighters[index === 0 ? 1 : 0];
    return Math.floor(
      500 * ((opponent.stats.hp - opponent.hp) / opponent.stats.hp)
      + 500 * (fighter.hp / fighter.stats.hp),
    );
  }) as [number, number];
  const winner = ratings[0] === ratings[1] ? null : ratings[0] > ratings[1] ? 0 : 1;
  const loser = winner === null ? null : winner === 0 ? 1 : 0;
  const battleRating = winner === null ? ratings[0] : ratings[winner];
  const versions = {
    engine: input.engineVersion || ENGINE_VERSION,
    rules: RULES_VERSION,
    data: input.dataVersion || "unknown",
  };
  return {
    id: `battle-${stableHash({ input, versions })}`,
    winner,
    loser,
    battleRating,
    ratings,
    ratingClass: ratingClass(battleRating),
    durationTurns,
    durationMs: durationTurns * PVP_RULES.turnDurationMs,
    combatants: fighters.map((fighter, index) => ({
      canonicalId: fighter.build.canonicalId,
      name: fighter.build.name,
      stats: fighter.stats,
      remainingHp: fighter.hp,
      remainingHpPercent: Math.round((fighter.hp / fighter.stats.hp) * 1_000) / 10,
      remainingEnergy: fighter.energy,
      shieldsRemaining: fighter.shields,
      stages: fighter.stages,
      rating: ratings[index],
      ...fighter.metrics,
    })) as SingleBattleResult["combatants"],
    timeline,
    versions,
    diagnostics: {
      deterministic: true,
      cmpTieBreak: "attack-then-canonical-id",
      maxTurnsReached: durationTurns >= PVP_RULES.battleTimeoutTurns,
      timingModel: "fast-completion-boundaries",
      baitModel: "deterministic-shield-and-ko-opportunity",
      shieldModel: "survival-cycle-pressure",
      overfarmModel: "one-fast-self-debuff-nuke",
    },
  };
}

export function simulateShieldMatrix(input: SimulateSingleBattleInput): ShieldMatrixResult {
  const startedAt = performance.now();
  const scenarios: ShieldMatrixResult["scenarios"] = [];
  for (let left = 0; left <= 2; left += 1) {
    for (let right = 0; right <= 2; right += 1) {
      const pokemon = [
        { ...input.pokemon[0], shields: left },
        { ...input.pokemon[1], shields: right },
      ] as SimulateSingleBattleInput["pokemon"];
      scenarios.push({ shields: [left, right], result: simulateSingleBattle({ ...input, pokemon }) });
    }
  }
  return { scenarios, durationMs: performance.now() - startedAt };
}

export function simulateMultiBattle(input: Omit<SimulateSingleBattleInput, "pokemon"> & {
  subject: PokemonBattleBuild;
  opponents: PokemonBattleBuild[];
}): MultiBattleResult {
  const startedAt = performance.now();
  const matchups = input.opponents.map((opponent) => ({
    opponent: opponent.canonicalId,
    result: simulateSingleBattle({ ...input, pokemon: [input.subject, opponent] }),
  }));
  const wins = matchups.filter((item) => item.result.winner === 0).length;
  const losses = matchups.filter((item) => item.result.winner === 1).length;
  const draws = matchups.length - wins - losses;
  return {
    subject: input.subject.canonicalId,
    total: matchups.length,
    wins,
    losses,
    draws,
    averageRating: matchups.length
      ? Math.round(matchups.reduce((total, item) => total + item.result.ratings[0], 0) / matchups.length)
      : 0,
    matchups,
    durationMs: performance.now() - startedAt,
  };
}

export function simulateMatrixBattle(input: Omit<SimulateSingleBattleInput, "pokemon"> & {
  groupA: PokemonBattleBuild[];
  groupB: PokemonBattleBuild[];
}): MatrixBattleResult {
  const startedAt = performance.now();
  const cells: MatrixBattleResult["cells"] = [];
  input.groupA.forEach((left, row) => {
    input.groupB.forEach((right, column) => {
      cells.push({ row, column, result: simulateSingleBattle({ ...input, pokemon: [left, right] }) });
    });
  });
  return {
    rows: input.groupA.map((entry) => entry.canonicalId),
    columns: input.groupB.map((entry) => entry.canonicalId),
    cells,
    durationMs: performance.now() - startedAt,
  };
}
