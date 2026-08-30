import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

import { resolveMegaEvolutionTargets } from "../src/lib/pokemon-detail-data.mjs";

const projectRoot = process.cwd();
const dataRoot = path.resolve(projectRoot, "../PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = dataRoot;
const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const entries = engine.buildChecklist();

function detail(formId) {
  const entry = entries.find((candidate) => candidate.formId === formId);
  assert.ok(entry, formId);
  return engine.detailForKey(entry.key);
}

test("Florizarre résout sa Méga avec image, coût réel et navigation", () => {
  const venusaur = detail("VENUSAUR");
  const targets = resolveMegaEvolutionTargets(venusaur.megaEvolutions, entries);
  assert.equal(targets.length, 1);
  assert.equal(targets[0].formId, "VENUSAUR_MEGA");
  assert.equal(targets[0].target.name, "Méga-Florizarre");
  assert.equal(targets[0].target.form, "mega");
  assert.ok(targets[0].target.image);
  assert.equal(targets[0].initialEnergyCost, 200);
  assert.equal(targets[0].released, true);
  assert.ok(targets[0].target.key);
});

test("Dracaufeu distingue les cibles Méga X et Méga Y", () => {
  const charizard = detail("CHARIZARD");
  const targets = resolveMegaEvolutionTargets(charizard.megaEvolutions, entries);
  assert.deepEqual(
    targets.map(({ formId, target, initialEnergyCost }) => ({
      formId,
      name: target.name,
      form: target.form,
      initialEnergyCost,
    })),
    [
      {
        formId: "CHARIZARD_MEGA_X",
        name: "Méga-Dracaufeu X",
        form: "mega-x",
        initialEnergyCost: 200,
      },
      {
        formId: "CHARIZARD_MEGA_Y",
        name: "Méga-Dracaufeu Y",
        form: "mega-y",
        initialEnergyCost: 200,
      },
    ],
  );
  assert.ok(targets.every(({ target }) => target.image && target.key));
});

test("un Pokémon sans Méga ne reçoit aucune cible artificielle", () => {
  const bulbasaur = detail("BULBASAUR");
  assert.deepEqual(bulbasaur.megaEvolutions, []);
  assert.deepEqual(
    resolveMegaEvolutionTargets(bulbasaur.megaEvolutions, entries),
    [],
  );
});

test("la vue Évolution intègre les Méga et documente les champs absents", () => {
  const source = fs.readFileSync(
    path.join(projectRoot, "src/components/admin/pokemon/detail-modal.jsx"),
    "utf8",
  );
  assert.match(source, /megaEvolutions=\{payload\.megaEvolutions \|\| \[\]\}/);
  assert.match(source, /Méga-évolutions/);
  assert.match(source, /Coût initial/);
  assert.match(source, /niveau Méga ou cooldown n’est publié/);
  assert.match(source, /target \? onOpenRelated : null/);
});
