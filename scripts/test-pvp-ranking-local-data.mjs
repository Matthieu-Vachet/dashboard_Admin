import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { enrichPvpRankingWithLocalData, normalizeSuggestedTeammate, pvpMoveRestriction, pvpTeammatesErrorMessage } from "../src/lib/pvp-ranking-local-data.mjs";

const require = createRequire(import.meta.url);
const { buildChecklist } = require("../src/server/pokemon-go/apps/checklist/server/engine.js");

test("la fiche locale enrichit le coût PvP imbriqué et la famille de bonbon", () => {
  const result = enrichPvpRankingWithLocalData({ pokemonRef: "MIMIKYU", pokemon: {}, pvp: {} }, [{
    formId: "MIMIKYU",
    buddyDistance: 5,
    secondChargeMoveCost: { candy: 50, stardust: 50000 },
    assets: { candy: { familyId: 778, image: "https://example.test/778.png", xlImage: "https://example.test/xl/778.png" } },
  }]);
  assert.deepEqual(result.pvp.secondChargedMoveCost, { candy: 50, stardust: 50000 });
  assert.equal(result.pvp.candyFamilyId, 778);
  assert.equal(result.pokemon.assets.candy.xlImage, "https://example.test/xl/778.png");
  assert.equal(result.pvp.localDataProvenance.secondChargedMoveCost, "pokemon.sourceData.secondChargeMoveCost");
});

test("un teammate objet ne peut pas devenir [object Object]", () => {
  const result = normalizeSuggestedTeammate({ rawName: { label: "objet" }, providerAlias: "Tinkaton" });
  assert.equal(result.label, "Tinkaton");
  assert.notEqual(result.label, "[object Object]");
});

test("une erreur API structurée ne peut pas devenir [object Object]", () => {
  assert.equal(pvpTeammatesErrorMessage({ error: { code: "ENOEXEC", message: "spawn ENOEXEC" } }), "spawn ENOEXEC");
  assert.equal(pvpTeammatesErrorMessage({ error: {} }), "Suggested Teammates indisponibles.");
});

test("le bootstrap réel transmet le coût imbriqué de Mimiqui à PvP Rankings", () => {
  const mimikyu = buildChecklist().find((entry) => entry.formId === "MIMIKYU" && entry.kind === "pokemon");
  assert.deepEqual(mimikyu?.secondChargeMoveCost, { candy: 50, stardust: 50000 });
  const ranking = enrichPvpRankingWithLocalData({ pokemonRef: "MIMIKYU", pokemon: {}, pvp: {} }, [mimikyu]);
  assert.deepEqual(ranking.pvp.secondChargedMoveCost, { candy: 50, stardust: 50000 });
});

test("Plaquage est Héritage uniquement pour le movepool de Coudlangue", () => {
  const lickilicky = buildChecklist().find((entry) => entry.formId === "LICKILICKY" && entry.kind === "pokemon");
  const ranking = enrichPvpRankingWithLocalData({ pokemonRef: "LICKILICKY", pokemon: {}, pvp: {} }, [lickilicky]);
  assert.deepEqual(ranking.pvp.restrictedMoves.elite.charged, ["BODY_SLAM"]);
  assert.deepEqual(ranking.pvp.restrictedMoves.historical.charged, []);
  assert.equal(pvpMoveRestriction(ranking, { id: "BODY_SLAM" }, false)?.label, "Héritage");
  assert.equal(pvpMoveRestriction(ranking, { id: "EARTHQUAKE" }, false), null);
});

test("les attaques retirées restent distinctes des attaques Elite", () => {
  const muk = buildChecklist().find((entry) => entry.formId === "MUK" && entry.kind === "pokemon");
  const ranking = enrichPvpRankingWithLocalData({ pokemonRef: "MUK", pokemon: {}, pvp: {} }, [muk]);
  const restriction = pvpMoveRestriction(ranking, { id: "ACID_FAST" }, true);
  assert.equal(restriction?.kind, "historical");
  assert.equal(restriction?.label, "Retirée");
  assert.match(restriction?.description || "", /retirée du movepool/);
});
