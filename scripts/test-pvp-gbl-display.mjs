import assert from "node:assert/strict";
import test from "node:test";
import {
  buffLabels,
  addChecklistBuild,
  checklistBuildsForEntry,
  checklistIdentity,
  filterChecklistEntries,
  filterGblPeriods,
  migrateChecklistState,
  moveCounts,
  patchChecklistBuild,
  performanceRadarData,
  toggleChecklistEntry,
} from "../src/lib/pvp-rankings-display.mjs";

const mimikyu = { rank: 1, pokemon: { names: { French: "Mimiqui" }, types: ["GHOST", "FAIRY"], identity: { canonicalId: "MIMIKYU_BUSTED" } }, sourceIdentity: { speciesId: "mimikyu" } };
const tinkaton = { rank: 2, pokemon: { names: { French: "Forgelina" }, types: ["FAIRY", "STEEL"], identity: { canonicalId: "TINKATON" } }, sourceIdentity: { speciesId: "tinkaton" } };

test("le radar conserve exactement les six métriques PvPoke", () => {
  const data = performanceRadarData({ lead: 100, switch: 100, charger: 97.7, closer: 100, consistency: 94.2, attacker: 92.5 });
  assert.deepEqual(data.map(({ id, value }) => [id, value]), [["lead", 100], ["switch", 100], ["charger", 97.7], ["closer", 100], ["consistency", 94.2], ["attacker", 92.5]]);
});

test("les comptes d'attaques utilisent l'énergie positive ou négative sans changer le coût", () => {
  assert.deepEqual(moveCounts({ combat: { energy: 8 } }, { combat: { energy: -40 } }), [5, 5, 5, 5]);
  assert.deepEqual(moveCounts({ combat: { energy: 9 } }, { combat: { energy: 50 } }), [6, 6, 5, 6]);
});

test("les buffs null, self, opponent, partiels et garantis restent explicites", () => {
  assert.deepEqual(buffLabels(null), []);
  assert.deepEqual(buffLabels({ activationChance: 100, attackerDefenseStatsChange: 1 }), ["Défense lanceur +1", "100 % de chance"]);
  assert.deepEqual(buffLabels({ activationChance: 12, targetAttackStatsChange: -1 }), ["Attaque cible -1", "12 % de chance"]);
  assert.deepEqual(buffLabels({ activationChance: 0.1, attackerAttackStatsChange: 2, targetDefenseStatsChange: -2 }), ["Attaque lanceur +2", "Défense cible -2", "10 % de chance"]);
});

test("la checklist s'appuie sur canonicalId, persiste par ligue et filtre le catalogue actif", () => {
  assert.equal(checklistIdentity(mimikyu), "MIMIKYU_BUSTED");
  const greatState = toggleChecklistEntry({ schemaVersion: 1, contexts: { ultra: { TINKATON: true } } }, "great", mimikyu);
  assert.equal(greatState.schemaVersion, 2);
  assert.equal(checklistBuildsForEntry(greatState, "great", mimikyu).length, 1);
  assert.deepEqual(filterChecklistEntries({ catalogue: [tinkaton, mimikyu], owned: greatState.contexts.great, query: "mimi", filter: "owned" }), [mimikyu]);
});

test("la migration v1 est progressive, idempotente et conserve les identités non résolues", () => {
  const legacy = { schemaVersion: 1, contexts: { great: { MIMIKYU_BUSTED: true, UNKNOWN: true }, ultra: { TINKATON: true } } };
  const first = migrateChecklistState(legacy, [mimikyu], "great");
  assert.equal(first.schemaVersion, 2);
  assert.equal(checklistBuildsForEntry(first, "great", mimikyu)[0].source, "migration-rank-1");
  assert.equal(first.legacyV1.contexts.great.UNKNOWN, true);
  assert.equal(first.legacyV1.contexts.ultra.TINKATON, true);
  const second = migrateChecklistState(first, [mimikyu], "great");
  assert.equal(checklistBuildsForEntry(second, "great", mimikyu).length, 1);
});

test("une même espèce peut conserver plusieurs builds et ses IV personnels", () => {
  const base = addChecklistBuild(undefined, "great", mimikyu, { now: "2026-07-28T00:00:00.000Z" });
  const multiple = addChecklistBuild(base, "great", mimikyu, { allowDuplicate: true, suffix: "mine" });
  const customId = "MIMIKYU_BUSTED:custom:mine";
  const edited = patchChecklistBuild(multiple, "great", customId, {
    source: "mes-iv",
    ivs: { attack: 2, defense: 15, stamina: 14 },
    level: 25,
    cp: 1497,
  }, "2026-07-28T01:00:00.000Z");
  assert.equal(checklistBuildsForEntry(edited, "great", mimikyu).length, 2);
  assert.deepEqual(edited.contexts.great.builds[customId].ivs, { attack: 2, defense: 15, stamina: 14 });
  assert.equal(edited.contexts.great.builds[customId].cp, 1497);
});

test("les filtres GBL combinent statut, ligue et coupe", () => {
  const periods = [{ id: "now", status: "current", competitions: [{ tier: "great", cup: "retro", sourceName: "Coupe Rétro" }, { tier: "master", cup: "master", sourceName: "Ligue Master" }] }, { id: "next", status: "upcoming", competitions: [{ tier: "great", cup: "summer", sourceName: "Coupe Été" }] }];
  assert.deepEqual(filterGblPeriods(periods, { status: "current", tier: "great", cupQuery: "rétro" }).map((period) => period.id), ["now"]);
  assert.equal(filterGblPeriods(periods, { status: "upcoming", tier: "master" }).length, 0);
});
