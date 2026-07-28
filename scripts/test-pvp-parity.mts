import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import engineModule from "../src/lib/pokemon-go-pvp-engine/index.ts";
import serverDataModule from "../src/lib/pokemon-go-pvp-engine/server-data.ts";

type FixturePokemon = {
  canonicalId: string;
  level: number;
  ivs: { attack: number; defense: number; stamina: number };
  fastMoveId: string;
  chargedMoveIds: string[];
  shadow?: boolean;
};

type FixtureCase = {
  id: string;
  left: string;
  right: string;
  shields: [number, number];
  expected: {
    winner: 0 | 1;
    rating: number;
    durationSeconds: number;
    remainingHp: number;
    remainingEnergy: number;
    firstDamage: [number, number, number | null, number | null];
  };
};

type Fixture = {
  source: { commit: string };
  pokemon: Record<string, FixturePokemon>;
  cases: FixtureCase[];
};

const { simulateSingleBattle } = engineModule;
const { prepareBattleBuild, readPvpCatalog } = serverDataModule;

test("20 combats PvPoke figés restent comparables et déterministes", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/pvpoke-parity-2026-07-28.json", import.meta.url), "utf8")) as Fixture;
  const catalog = await readPvpCatalog();
  const league = catalog.leagues.find((entry: { id: string }) => entry.id === "great");
  assert.ok(league);
  assert.equal(fixture.cases.length, 20);

  const report = [];
  let winnerMatches = 0;
  let fastDamageMatches = 0;
  let fastDamageChecks = 0;
  let chargedDamageMatches = 0;
  let chargedDamageChecks = 0;

  for (const scenario of fixture.cases) {
    const configurations = [fixture.pokemon[scenario.left], fixture.pokemon[scenario.right]] as const;
    const builds = await Promise.all(configurations.map((configuration, index) => prepareBattleBuild({
      ...configuration,
      shadow: Boolean(configuration.shadow),
      shields: scenario.shields[index] || 0,
      startingEnergy: 0,
      startingHpPercent: 100,
    }, league)));
    const input = {
      leagueId: "great",
      cpCap: 1500,
      pokemon: builds,
      typeCatalog: catalog.types,
      dataVersion: catalog.versions.data,
      strategy: { baiting: "selective" as const, optimizeTiming: true, buffMode: "deterministic" as const },
    };
    const result = simulateSingleBattle(input);
    assert.deepEqual(result, simulateSingleBattle(input), `${scenario.id} doit être déterministe`);
    if (result.winner === scenario.expected.winner) winnerMatches += 1;

    const observedDamage = ([0, 1] as const).flatMap((actor) => [
      result.timeline.find((event) => event.action === "fast" && event.actor === actor)?.damage ?? null,
    ]);
    const chargedDamage = ([0, 1] as const).map((actor) =>
      result.timeline.find((event) => event.action === "charged" && event.actor === actor)?.damage ?? null,
    );
    for (let index = 0; index < 2; index += 1) {
      fastDamageChecks += 1;
      if (observedDamage[index] === scenario.expected.firstDamage[index]) fastDamageMatches += 1;
      const expectedCharged = scenario.expected.firstDamage[index + 2];
      if (expectedCharged !== null) {
        chargedDamageChecks += 1;
        if (chargedDamage[index] === expectedCharged) chargedDamageMatches += 1;
      }
    }

    const winningCombatant = result.winner === null ? null : result.combatants[result.winner];
    report.push({
      id: scenario.id,
      winner: [result.winner, scenario.expected.winner],
      rating: [result.ratings[0], scenario.expected.rating],
      durationSeconds: [result.durationMs / 1_000, scenario.expected.durationSeconds],
      remainingHp: [winningCombatant?.remainingHp ?? 0, scenario.expected.remainingHp],
      remainingEnergy: [winningCombatant?.remainingEnergy ?? 0, scenario.expected.remainingEnergy],
      firstDamage: [[...observedDamage, ...chargedDamage], scenario.expected.firstDamage],
    });
  }

  assert.equal(fastDamageMatches, fastDamageChecks, "les dégâts des attaques rapides doivent être exacts");
  assert.ok(winnerMatches >= 15, `parité vainqueur insuffisante: ${winnerMatches}/20`);
  console.log(JSON.stringify({
    sourceCommit: fixture.source.commit,
    summary: { winnerMatches, fastDamageMatches, fastDamageChecks, chargedDamageMatches, chargedDamageChecks },
    report,
  }));
});
