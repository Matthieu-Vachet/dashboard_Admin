import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { executeAtomicSnapshotImport, executeAtomicSnapshotRollback } from "../src/lib/trainer-pokemon/atomic.ts";
import { normalizeTrainerPokemonImport } from "../src/lib/trainer-pokemon/normalize.ts";
import { TrainerPokemonValidationError, validateTrainerPokemonImport } from "../src/lib/trainer-pokemon/schema.ts";

const root = path.resolve(import.meta.dirname, "../..");
const dataRoot = path.join(root, "PokemonGo-Data");
const samplePath = "/Users/matthieuvachet/Downloads/Pokemons-Mat02120-13-07-2026.json";

function json(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function filesUnder(directory, extension = ".json") {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(target, extension) : entry.name.endsWith(extension) ? [target] : [];
  });
}

function localReferences() {
  const pokemon = [...filesUnder(path.join(dataRoot, "pokemon")), ...filesUnder(path.join(dataRoot, "pokemon-forms"))]
    .map(json)
    .map((item) => {
      const assetFile = item.assets?.assetsRef ? path.join(dataRoot, item.assets.assetsRef) : null;
      const heavyAssets = assetFile && fs.existsSync(assetFile) ? json(assetFile).assets : {};
      return {
        id: item.id, formId: item.formId, key: item.formId, dexNr: item.dexNr, form: item.form, names: item.names,
        data: {
          names: item.names,
          primaryType: item.primaryType,
          secondaryType: item.secondaryType,
          assets: item.assets,
          assetForms: heavyAssets.assetForms || [],
        },
      };
    });
  const moves = filesUnder(path.join(dataRoot, "moves")).map((file) => {
    const item = json(file);
    return { ...item, kind: file.includes(`${path.sep}fast${path.sep}`) ? "fast" : "charged" };
  });
  const types = filesUnder(path.join(dataRoot, "types")).map(json);
  return { pokemon, moves, types, fetchedAt: "2026-07-13T00:00:00.000Z", source: "PokemonGo-Data test source" };
}

function validEntry(overrides = {}) {
  return {
    mon_weight: 9.2, mon_move_1: "Charme", mon_height: 0.5, mon_gender: "FEMALE",
    mon_form: "CUBCHOO_NORMAL", mon_stamina: 15, mon_attack: 15, mon_name: "Cubchoo",
    mon_isShiny: "YES", mon_move_2: "Vent Glace", mon_cp: 551, mon_number: 613,
    mon_defence: 15, mon_isLucky: "NO", ...overrides,
  };
}

function validFile(entry = validEntry()) {
  return { fileName: "collection", exportTime: "date", pokemonCount: 1, version: "1.0", fileData: { "17397759268769916024": entry } };
}

test("valide le contrat et conserve un identifiant 64 bits comme chaîne", () => {
  const file = validateTrainerPokemonImport(validFile());
  assert.equal(Object.keys(file.fileData)[0], "17397759268769916024");
});

test("refuse un JSON invalide, fileData absent et un compteur incohérent", () => {
  assert.throws(() => JSON.parse("{"), SyntaxError);
  assert.throws(() => validateTrainerPokemonImport({ fileName: "x", pokemonCount: 0 }), TrainerPokemonValidationError);
  assert.throws(
    () => validateTrainerPokemonImport({ ...validFile(), pokemonCount: 2 }),
    (error) => error instanceof TrainerPokemonValidationError && error.issues.some((item) => /compteur annoncé/i.test(item.message)),
  );
});

test("refuse les IV hors limites avec un chemin précis", () => {
  assert.throws(
    () => validateTrainerPokemonImport(validFile(validEntry({ mon_attack: 16 }))),
    (error) => error instanceof TrainerPokemonValidationError && error.issues.some((item) => item.path.endsWith(".mon_attack")),
  );
});

test("accepte les champs facultatifs, inconnus, la troisième attaque et le surnom absent", () => {
  const file = validateTrainerPokemonImport(validFile(validEntry({
    mon_move_3: "Aurore", mon_costume: "FALL_2022", mon_alignment: "SHADOW", mon_npc_stats: { value: 1 }, extra: true,
  })));
  assert.equal(file.pokemonCount, 1);
});

test("normalise les noms français, IV, attaques, shiny et diagnostics d’asset", () => {
  const references = localReferences();
  const file = validateTrainerPokemonImport(validFile(validEntry({ mon_gender: "MALE" })));
  const { entries, preview } = normalizeTrainerPokemonImport(file, references);
  assert.equal(entries[0].frenchName, "Polarhume");
  assert.equal(entries[0].ivPercent, 100);
  assert.equal(entries[0].chargedMoves.length, 1);
  assert.equal(entries[0].nickname, null);
  assert.match(entries[0].image || "", /\.s\.|_r\./i);
  assert.equal(preview.stats.perfect, 1);

  const unresolved = normalizeTrainerPokemonImport(
    validateTrainerPokemonImport(validFile(validEntry({ mon_move_1: "Attaque totalement inconnue", mon_costume: "UNKNOWN_COSTUME" }))),
    references,
  );
  assert.equal(unresolved.entries[0].fastMove.resolved, false);
  assert.equal(unresolved.entries[0].image, null);
  assert.equal(unresolved.preview.diagnosticCounts.UNKNOWN_MOVE, 1);
  assert.equal(unresolved.preview.diagnosticCounts.ASSET_FALLBACK, 0);
  assert.equal(unresolved.preview.diagnosticCounts.MISSING_ASSET, 1);
});

test("résout le costume exact et ne présente jamais une image normale comme shiny", () => {
  const references = localReferences();
  const costume = normalizeTrainerPokemonImport(
    validateTrainerPokemonImport(validFile(validEntry({
      mon_number: 25,
      mon_name: "Pikachu",
      mon_form: "PIKACHU_NORMAL",
      mon_costume: "JAN_2020_NOEVOLVE",
    }))),
    references,
  );
  assert.match(costume.entries[0].image || "", /cJAN_2020_NOEVOLVE(?:\.g\d+)?\.s\.icon\.png$/);
  assert.equal(costume.entries[0].imageMatch, "exact");

  const withoutShiny = {
    ...references,
    pokemon: [{
      id: "CUBCHOO", formId: "CUBCHOO", key: "CUBCHOO", dexNr: 613, form: "normal",
      names: { French: "Polarhume" },
      data: { names: { French: "Polarhume" }, primaryType: "ICE", assets: { image: "https://assets.example/normal.png" }, assetForms: [] },
    }],
  };
  const shiny = normalizeTrainerPokemonImport(validateTrainerPokemonImport(validFile()), withoutShiny);
  assert.equal(shiny.entries[0].image, null);
  assert.equal(shiny.entries[0].imageMatch, "missing");
  assert.equal(shiny.preview.diagnosticCounts.MISSING_ASSET, 1);
});

test("le fichier réel de 4 838 Pokémon est entièrement validé et normalisé", { skip: !fs.existsSync(samplePath) }, () => {
  const raw = json(samplePath);
  const validated = validateTrainerPokemonImport(raw);
  const result = normalizeTrainerPokemonImport(validated, localReferences());
  assert.equal(result.entries.length, 4_838);
  assert.equal(result.preview.validPokemonCount, 4_838);
  assert.equal(result.entries[0].sourceId, "17397759268769916024");
  assert.equal(result.preview.diagnosticCounts.UNKNOWN_GENDER, 1);
  assert.ok(result.entries.some((item) => item.chargedMoves.length === 2));
  assert.ok(result.entries.some((item) => item.nickname === null));
});

test("l’activation est un pointeur atomique et aucune suppression destructive n’existe", () => {
  const repository = fs.readFileSync(path.join(root, "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"), "utf8");
  const atomic = fs.readFileSync(path.join(root, "Dashboard Admin/src/lib/trainer-pokemon/atomic.ts"), "utf8");
  const pointerSwap = atomic.indexOf("swapActiveSnapshot(snapshotId");
  const activeStatus = atomic.indexOf("markSnapshotActive(snapshotId)", pointerSwap);
  assert.ok(pointerSwap > 0 && activeStatus > pointerSwap);
  assert.doesNotMatch(repository, /deleteMany\s*\(/);
  assert.match(atomic, /trainerPokemonEntryChecksum/);
});

function memorySnapshotStore({ active = null, failWrite = false, corruptReadBack = false, failBookkeeping = false } = {}) {
  const state = { active, previous: null, sequence: 0, entries: new Map(), statuses: new Map(), bookkeepingFailures: 0 };
  return {
    state,
    store: {
      createStagingSnapshot: async () => { const id = `snapshot-${++state.sequence}`; state.statuses.set(id, "staging"); return id; },
      writeEntries: async (id, entries) => { if (failWrite) throw new Error("write failed"); state.entries.set(id, entries.map((item) => item.sourceId)); },
      readSourceIds: async (id) => corruptReadBack ? ["corrupt"] : state.entries.get(id) || [],
      readActiveSnapshotId: async () => state.active,
      swapActiveSnapshot: async (id, previous) => { state.previous = previous; state.active = id; },
      markSnapshotActive: async (id) => { if (failBookkeeping) throw new Error("status failed"); state.statuses.set(id, "active"); },
      markSnapshotArchived: async (id) => state.statuses.set(id, "archived"),
      markSnapshotFailed: async (id) => state.statuses.set(id, "failed"),
      reportBookkeepingFailure: () => { state.bookkeepingFailures += 1; },
    },
  };
}

test("simule import initial, remplacement et conservation du snapshot précédent", async () => {
  const initial = memorySnapshotStore();
  const first = await executeAtomicSnapshotImport(initial.store, [{ sourceId: "1" }, { sourceId: "2" }]);
  assert.equal(initial.state.active, first.snapshotId);
  assert.equal(initial.state.previous, null);

  const replacement = memorySnapshotStore({ active: "snapshot-old" });
  replacement.state.statuses.set("snapshot-old", "active");
  const next = await executeAtomicSnapshotImport(replacement.store, [{ sourceId: "3" }]);
  assert.equal(replacement.state.active, next.snapshotId);
  assert.equal(replacement.state.previous, "snapshot-old");
  assert.equal(replacement.state.statuses.get("snapshot-old"), "archived");
});

test("un échec d’écriture ou de read-back conserve l’actif et marque staging en échec", async () => {
  for (const options of [{ failWrite: true }, { corruptReadBack: true }]) {
    const memory = memorySnapshotStore({ active: "snapshot-valid", ...options });
    await assert.rejects(() => executeAtomicSnapshotImport(memory.store, [{ sourceId: "1" }, { sourceId: "2" }]));
    assert.equal(memory.state.active, "snapshot-valid");
    assert.equal(memory.state.statuses.get("snapshot-1"), "failed");
  }
});

test("une erreur de bookkeeping après la bascule ne rend pas l’actif invisible", async () => {
  const memory = memorySnapshotStore({ active: "snapshot-old", failBookkeeping: true });
  const result = await executeAtomicSnapshotImport(memory.store, [{ sourceId: "1" }]);
  assert.equal(memory.state.active, result.snapshotId);
  assert.equal(memory.state.bookkeepingFailures, 1);
});

test("simule rollback valide et refus du rollback au read-back invalide", async () => {
  const memory = memorySnapshotStore({ active: "snapshot-current" });
  memory.state.entries.set("snapshot-target", ["1", "2"]);
  const rollbackStore = {
    readActiveSnapshotId: memory.store.readActiveSnapshotId,
    countSnapshotEntries: async (id) => memory.state.entries.get(id)?.length || 0,
    swapActiveSnapshot: memory.store.swapActiveSnapshot,
    markSnapshotActive: memory.store.markSnapshotActive,
    markSnapshotArchived: memory.store.markSnapshotArchived,
  };
  const result = await executeAtomicSnapshotRollback(rollbackStore, "snapshot-target", 2);
  assert.equal(memory.state.active, "snapshot-target");
  assert.equal(result.previousSnapshotId, "snapshot-current");
  await assert.rejects(() => executeAtomicSnapshotRollback(rollbackStore, "snapshot-missing", 2), /read-back/i);
});

test("les routes privées vérifient la session et restent absentes de l’OpenAPI public", () => {
  const routes = filesUnder(path.join(root, "Dashboard Admin/src/app/api/trainer-pokemon"), ".ts").map((file) => fs.readFileSync(file, "utf8"));
  assert.ok(routes.length >= 4);
  for (const source of routes) assert.match(source, /getSession\(\)/);
  const openapi = fs.readFileSync(path.join(root, "PokemonGo-API-/src/docs/openapi.js"), "utf8");
  assert.doesNotMatch(openapi, /trainer-pokemon|trainer_pokemon|ma collection/i);
});

test("l’interface couvre recherche, filtres, tri, pagination, états vides et responsive", () => {
  const panel = fs.readFileSync(path.join(root, "Dashboard Admin/src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx"), "utf8");
  for (const evidence of ["debouncedSearch", "Plus de filtres", "Forme spéciale", "Poids (kg)", "Taille (m)", "IV 100 % uniquement", "Trier par", "Pagination", "Aucune collection importée", "Aucun résultat", "lg:hidden", "hidden overflow-x-auto"]) {
    assert.match(panel, new RegExp(evidence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
