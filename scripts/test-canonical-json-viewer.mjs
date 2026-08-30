import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const projectRoot = process.cwd();
const dataRoot = path.resolve(projectRoot, "../PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = dataRoot;
const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");

const fixtures = [
  {
    name: "normal avec variantes et Location Cards",
    key: "pokemon:data/pokemon/normal/0001-bulbasaur.json",
    labels: [
      "Pokémon",
      "Assets Core",
      "Assets Home",
      "Assets Shuffle",
      "Assets Variants",
      "Location Cards",
      "PvP",
    ],
  },
  {
    name: "forme Alola",
    key: "form:data/pokemon/alola/0019-rattata-alola.json",
    labels: ["Pokémon", "Assets Core", "Assets Home", "Assets Shuffle", "PvP"],
  },
  {
    name: "forme Mega",
    key: "mega:data/pokemon/mega/0003-venusaur-mega.json#VENUSAUR_MEGA",
    labels: ["Pokémon", "Assets Core", "Assets Home", "Assets Shuffle", "PvP"],
  },
  {
    name: "forme Dynamax sans classement PvP utile",
    key: "dynamax:data/pokemon/dynamax/0001-bulbasaur-dynamax.json",
    labels: ["Pokémon", "Assets Core", "Assets Shuffle", "PvP"],
    pvpStatus: "UNSUPPORTED_FORM",
  },
  {
    name: "forme Gigantamax",
    key: "gigantamax:data/pokemon/gigantamax/0003-venusaur-gigantamax.json",
    labels: ["Pokémon", "Assets Core", "Assets Home", "Assets Shuffle", "PvP"],
    pvpStatus: "UNSUPPORTED_FORM",
  },
];

function readJson(reference) {
  return JSON.parse(fs.readFileSync(path.join(dataRoot, reference), "utf8"));
}

test("le détail expose chaque fichier canonique existant sans recomposition", () => {
  for (const fixture of fixtures) {
    const detail = engine.detailForKey(fixture.key);
    assert.ok(detail, fixture.name);
    assert.deepEqual(
      detail.canonicalJsonRecords.map((record) => record.label),
      fixture.labels,
      fixture.name,
    );
    for (const record of detail.canonicalJsonRecords) {
      assert.ok(record.path.startsWith("data/"), `${fixture.name}: ${record.path}`);
      assert.ok(fs.existsSync(path.join(dataRoot, record.path)), record.path);
      assert.deepEqual(record.data, readJson(record.path), record.path);
      assert.equal(record.data.familyDocuments, undefined, record.path);
    }
    if (fixture.pvpStatus) {
      const pvp = detail.canonicalJsonRecords.find((record) => record.id === "pvp");
      assert.ok(pvp, fixture.name);
      assert.ok(
        Object.values(pvp.data.leagues).every(
          (league) => league.status === fixture.pvpStatus,
        ),
        fixture.name,
      );
    }
  }
});

test("les sections sans fichier réel ne sont pas créées", () => {
  const records = engine.buildCanonicalJsonRecords(
    "data/pokemon/normal/9999-test.json",
    { formId: "TEST" },
    null,
    null,
  );
  assert.deepEqual(records.map((record) => record.id), ["pokemon"]);
});

test("le viewer propose navigation, copie, chemin et téléchargement", () => {
  const source = fs.readFileSync(
    path.join(projectRoot, "src/components/admin/pokemon/detail-modal.jsx"),
    "utf8",
  );
  assert.match(source, /payload\.canonicalJsonRecords/);
  assert.match(source, /Copier le JSON/);
  assert.match(source, /Copier le chemin/);
  assert.match(source, /Télécharger/);
  assert.match(source, /Fichiers JSON canoniques/);
  assert.match(source, /role="region"/);
  assert.match(source, /tabIndex=\{0\}/);
  assert.doesNotMatch(source, /title="JSON assets"/);
});
