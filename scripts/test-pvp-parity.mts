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

test("les références PvPoke et une campagne multi-format étendue restent déterministes", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/pvpoke-parity-2026-07-28.json", import.meta.url), "utf8")) as Fixture;
  const catalog = await readPvpCatalog();
  const league = catalog.leagues.find((entry: { id: string }) => entry.id === "great");
  assert.ok(league);
  assert.equal(fixture.cases.length, 20);
  for (const canonicalId of [
    "BULBASAUR_NORMAL",
    "CHARIZARD_NORMAL",
    "CHARIZARD_MEGA_X",
    "CHARIZARD_MEGA_Y",
    "RATTATA_ALOLA",
    "TYPHLOSION_HISUIAN",
    "DARMANITAN_ZEN",
  ]) {
    assert.ok(catalog.pokemon.some((entry: { canonicalId: string }) => entry.canonicalId === canonicalId), `${canonicalId} absent du catalogue Battle Lab`);
  }
  const shadowQuagsire = catalog.pokemon.find((entry: { canonicalId: string }) => entry.canonicalId === "QUAGSIRE_NORMAL");
  assert.equal(shadowQuagsire?.availability.shadow, true);
  assert.ok(shadowQuagsire?.moves.charged.some((move: { id: string; shadowOnly?: boolean }) => move.id === "FRUSTRATION" && move.shadowOnly));

  const report = [];
  let winnerMatches = 0;
  let fastDamageMatches = 0;
  let fastDamageChecks = 0;
  let chargedDamageMatches = 0;
  let chargedDamageChecks = 0;
  const preparedCases: Array<Awaited<ReturnType<typeof prepareBattleBuild>>[]> = [];

  for (const scenario of fixture.cases) {
    const configurations = [fixture.pokemon[scenario.left], fixture.pokemon[scenario.right]] as const;
    const builds = await Promise.all(configurations.map((configuration, index) => prepareBattleBuild({
      ...configuration,
      shadow: Boolean(configuration.shadow),
      shields: scenario.shields[index] || 0,
      startingEnergy: 0,
      startingHpPercent: 100,
    }, league)));
    preparedCases.push(builds);
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

  const campaignLeagues = [
    { id: "little", cpCap: 500, level: 1 },
    { id: "great", cpCap: 1500, level: null },
    { id: "ultra", cpCap: 2500, level: null },
    { id: "master", cpCap: 10_000, level: null },
  ];
  let campaignScenarios = 0;
  for (const campaignLeague of campaignLeagues) {
    for (const builds of preparedCases) {
      for (let left = 0; left <= 2; left += 1) {
        for (let right = 0; right <= 2; right += 1) {
          const pokemon = builds.map((build, index) => ({
            ...build,
            level: campaignLeague.level || build.level,
            shields: index === 0 ? left : right,
          })) as typeof builds;
          const input = {
            leagueId: campaignLeague.id,
            cpCap: campaignLeague.cpCap,
            pokemon: pokemon as [typeof pokemon[0], typeof pokemon[1]],
            typeCatalog: catalog.types,
            strategy: { baiting: campaignScenarios % 3 === 0 ? "off" as const : campaignScenarios % 3 === 1 ? "selective" as const : "on" as const, optimizeTiming: true, buffMode: "deterministic" as const },
          };
          const result = simulateSingleBattle(input);
          assert.deepEqual(result, simulateSingleBattle(input));
          assert.ok(result.combatants.every((combatant) => combatant.remainingEnergy >= 0 && combatant.remainingEnergy <= 100));
          campaignScenarios += 1;
        }
      }
    }
  }
  assert.ok(campaignScenarios >= 100);

  assert.equal(fastDamageMatches, fastDamageChecks, "les dégâts des attaques rapides doivent être exacts");
  assert.equal(winnerMatches, fixture.cases.length, `parité vainqueur incomplète: ${winnerMatches}/20`);
  assert.equal(chargedDamageMatches, chargedDamageChecks, "les dégâts des attaques chargées doivent être exacts");
  console.log(JSON.stringify({
    sourceCommit: fixture.source.commit,
    summary: { officialReferenceCases: fixture.cases.length, campaignScenarios, catalogForms: catalog.pokemon.length, explicitBattleVariants: catalog.pokemon.length + catalog.pokemon.filter((entry: { availability: { shadow: boolean } }) => entry.availability.shadow).length, winnerMatches, fastDamageMatches, fastDamageChecks, chargedDamageMatches, chargedDamageChecks },
    report,
  }));
});
