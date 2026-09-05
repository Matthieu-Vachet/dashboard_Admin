import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const contractApi = require("../src/server/pokemon-go/json-builder/canonical-contract.js");
const engine = require("../src/server/pokemon-go/json-builder/transaction-engine.js");
const canonicalRoot = path.resolve(process.cwd(), "..", "PokemonGo-Data");

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function categoryCounts(value = 0) {
  return Object.fromEntries(["normal", "alola", "galar", "hisui", "paldea", "forms", "mega", "primal", "dynamax", "gigantamax"].map((key) => [key, value]));
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "json-builder-test-"));
  writeJson(path.join(root, "package.json"), { name: "pokemon-go-data", version: "0.0.0-test" });
  fs.cpSync(path.join(canonicalRoot, "templates"), path.join(root, "templates"), { recursive: true });
  fs.cpSync(path.join(canonicalRoot, "schemas"), path.join(root, "schemas"), { recursive: true });
  fs.cpSync(path.join(canonicalRoot, "tooling", "lib"), path.join(root, "tooling", "lib"), { recursive: true });
  fs.mkdirSync(path.join(root, "tooling", "scripts", "generators"), { recursive: true });
  fs.copyFileSync(
    path.join(canonicalRoot, "tooling", "scripts", "generators", "generatePokemonLocalIdentityInventory.js"),
    path.join(root, "tooling", "scripts", "generators", "generatePokemonLocalIdentityInventory.js"),
  );
  const families = ["home", "shuffle", "variants", "location-cards"];
  writeJson(path.join(root, "data/assets/manifests/separation-manifest.json"), {
    schemaVersion: 1,
    dataset: "pokemon-assets-separated",
    source: { archiveTag: "test", monolithicRecords: 0, aggregateSha256: null },
    families,
    counts: { core: categoryCounts(), ...Object.fromEntries(families.map((family) => [family, categoryCounts()])) },
    totals: { core: 0, ...Object.fromEntries(families.map((family) => [family, 0])) },
    files: [],
  });
  writeJson(path.join(root, "data/pvp/manifests/current.json"), {
    schemaVersion: 1,
    dataset: "pokemon-pvp-records",
    generatedAt: "2000-01-01T00:00:00.000Z",
    source: {},
    records: 0,
    counts: categoryCounts(),
    classificationAmbiguous: [],
    statuses: { little: {}, great: {}, ultra: {}, master: {} },
    files: [],
  });
  writeJson(path.join(root, "mappings/pokemon/identity-inventory.json"), {
    metadata: { schemaVersion: 2, source: "PokemonGo-Data", generatedAt: "2000-01-01T00:00:00.000Z", fingerprint: null },
    stats: {},
    identities: [],
    issues: [],
  });
  return root;
}

function localized(name) {
  return { English: name, German: name, French: name, Italian: name, Japanese: name, Korean: name, Spanish: name };
}

function replaceAssetPlaceholders(value) {
  if (Array.isArray(value)) return value.map(replaceAssetPlaceholders);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, replaceAssetPlaceholders(child)]));
  if (typeof value !== "string") return value;
  return value
    .replace(/EXEMPLE/gi, (match) => match === match.toUpperCase() ? "BUILDERMON" : "buildermon")
    .replace(/À_REMPLIR/gi, "BUILDER")
    .replace(/Example/gi, "Buildermon")
    .replace(/Beispiel/gi, "Buildermon")
    .replace(/Esempio/gi, "Buildermon")
    .replace(/Ejemplo/gi, "Buildermon");
}

function makeDraft(root, entityType = "normal", options = {}) {
  const contract = contractApi.loadCanonicalContract(root);
  const values = structuredClone(contract.pokemonTemplates[entityType]);
  const base = options.base || "BUILDERMON";
  const dexNr = options.dexNr || 9998;
  const suffixes = {
    normal: "",
    alola: "_ALOLA",
    galar: "_GALAR",
    hisui: "_HISUI",
    paldea: "_PALDEA",
    form: "_PARTY_HAT",
    mega: "_MEGA",
    primal: "_PRIMAL",
    dynamax: "_DYNAMAX",
    gigantamax: "_GIGANTAMAX",
  };
  const formId = `${base}${suffixes[entityType]}`;
  const form = entityType === "form" ? "party-hat" : entityType === "normal" ? "normal" : entityType;
  const slug = formId.toLowerCase().replace(/_/g, "-");
  Object.assign(values, {
    id: ["mega", "primal"].includes(entityType) ? formId : base,
    formId,
    baseFormId: base,
    form,
    slug,
    dexNr,
    dexId: String(dexNr).padStart(4, "0"),
    regionId: "FUTURE",
    names: localized(options.name || `Buildermon ${entityType}`),
  });
  if (entityType === "gigantamax") values.maxBattle.moves = ["GMAX_BUILDER_STRIKE"];
  if (options.released === false) values.availability.released = false;
  return {
    entityType,
    values,
    states: options.states || {},
    assets: { core: {} },
    assetStates: { core: {} },
    options: { assetFamilies: options.assetFamilies || [] },
  };
}

function addParent(root, draft) {
  const contract = contractApi.loadCanonicalContract(root);
  const parent = structuredClone(contract.pokemonTemplates.normal);
  Object.assign(parent, {
    id: draft.values.baseFormId,
    formId: draft.values.baseFormId,
    baseFormId: draft.values.baseFormId,
    form: "normal",
    slug: String(draft.values.baseFormId).toLowerCase(),
    dexNr: draft.values.dexNr,
    dexId: draft.values.dexId,
    regionId: "FUTURE",
    names: localized("Buildermon parent"),
  });
  parent.pvpRef = `data/pvp/pokemon/normal/${parent.dexId}-${parent.slug}.pvp.json`;
  parent.assetsRef = `data/assets/core/normal/${parent.dexId}-${parent.slug}.assets.json`;
  const file = path.join(root, `data/pokemon/normal/${parent.dexId}-${parent.slug}.json`);
  writeJson(file, parent);
  return file;
}

function addDynamaxDependency(root, draft) {
  const dependency = makeDraft(root, "dynamax", { base: draft.values.baseFormId, dexNr: draft.values.dexNr });
  const file = path.join(root, `data/pokemon/dynamax/${dependency.values.dexId}-${dependency.values.slug}.json`);
  writeJson(file, dependency.values);
  return file;
}

function dry(root, draft) {
  return engine.buildDryRun({ root, draft, owner: "builder@test.local", secret: "test-json-builder-secret" });
}

function makeAdventureEffectDraft(root) {
  const contract = contractApi.loadCanonicalContract(root);
  const values = structuredClone(contract.pokemonTemplates["adventure-effect"]);
  Object.assign(values, {
    id: "ADVENTURE_EFFECT_BUILDER_EFFECT",
    slug: "builder-effect",
    moveRef: "BUILDER_EFFECT",
    pokemonRefs: [{ pokemonId: "BUILDERMON", formId: "BUILDERMON", pokemonRef: "data/pokemon/normal/9995-buildermon.json" }],
    localization: { en: { name: "Builder Effect", description: null, bonusLabel: null, status: "NOT_AVAILABLE" } },
    cost: { candy: { amount: 1, pokemonId: "BUILDERMON" } },
  });
  return { entityType: "adventure-effect", values, states: {}, assets: {}, assetStates: {}, options: { assetFamilies: [] } };
}

function hashTree(root) {
  const hashes = {};
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) hashes[path.relative(root, absolute)] = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
    }
  }
  visit(root);
  return hashes;
}

function assertKeyOrder(template, generated, pointer = "$") {
  if (Array.isArray(template) || !template || typeof template !== "object") return;
  assert.deepEqual(Object.keys(generated), Object.keys(template), `${pointer}: ordre des clés`);
  for (const key of Object.keys(template)) assertKeyOrder(template[key], generated[key], `${pointer}.${key}`);
}

test("normal: consomme le template, préserve l’ordre récursif et produit Pokémon + Assets + PvP + manifests", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const draft = makeDraft(root, "normal");
  const result = dry(root, draft);
  assert.equal(result.completeness.canCommit, true);
  assert.deepEqual(result.files.map((file) => file.relativePath), [
    "data/pokemon/normal/9998-buildermon.json",
    "data/assets/core/normal/9998-buildermon.assets.json",
    "data/pvp/pokemon/normal/9998-buildermon.pvp.json",
    "data/assets/manifests/separation-manifest.json",
    "data/pvp/manifests/current.json",
    "mappings/pokemon/identity-inventory.json",
  ]);
  const contract = contractApi.loadCanonicalContract(root);
  assertKeyOrder(contract.pokemonTemplates.normal, JSON.parse(result.preview));
  assert.equal(result.checks.existingJsonReformatted, 0);
  assert.equal(result.checks.unrelatedJsonModified, 0);
  const identityInventory = JSON.parse(result.files.find((file) => file.kind === "identity-inventory").content);
  assert.equal(identityInventory.stats.totalIdentities, 1);
  assert.equal(identityInventory.identities[0].formId, "BUILDERMON");
});

for (const [entityType, directory] of Object.entries({
  alola: "alola",
  galar: "galar",
  hisui: "hisui",
  paldea: "paldea",
  form: "forms",
  mega: "mega",
  primal: "primal",
  dynamax: "dynamax",
  gigantamax: "gigantamax",
})) {
  test(`${entityType}: classe la fiche et ses références dans ${directory}`, (t) => {
    const root = fixture();
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const draft = makeDraft(root, entityType, { dexNr: 9997 });
    addParent(root, draft);
    if (entityType === "gigantamax") addDynamaxDependency(root, draft);
    const result = dry(root, draft);
    assert.equal(result.completeness.canCommit, true, JSON.stringify(result.issues));
    assert.match(result.files[0].relativePath, new RegExp(`^data/pokemon/${directory}/`));
    assert.match(result.files.find((file) => file.kind === "pvp").relativePath, new RegExp(`^data/pvp/pokemon/${directory}/`));
    if (entityType !== "form") assert.ok(result.files.some((file) => file.kind === "parent-patch"));
  });
}

test("fiche future: le PvP reste status-only UNRELEASED sans inventer de classement", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const result = dry(root, makeDraft(root, "normal", { released: false }));
  const pvp = JSON.parse(result.files.find((file) => file.kind === "pvp").content);
  assert.equal(pvp.mapping.status, "UNRELEASED");
  for (const league of Object.values(pvp.leagues)) {
    assert.equal(league.status, "UNRELEASED");
    assert.deepEqual(league.variants, []);
  }
});

test("familles Assets: consomme les cinq templates et applique les états autorisés", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const draft = makeDraft(root, "normal", { assetFamilies: ["home", "shuffle", "variants", "location-cards"] });
  const contract = contractApi.loadCanonicalContract(root);
  for (const family of draft.options.assetFamilies) draft.assets[family] = replaceAssetPlaceholders(contract.assetTemplates[family]);
  draft.assetStates = { core: { "assets.image": "unknown" } };
  const result = dry(root, draft);
  assert.equal(result.completeness.canCommit, true, JSON.stringify(result.issues));
  assert.equal(result.files.filter((file) => file.kind.startsWith("assets:")).length, 5);
  const core = JSON.parse(result.files.find((file) => file.kind === "assets:core").content);
  assert.equal(core.assets.image, null);
  assert.deepEqual(Object.keys(core.assetRefs).sort(), ["home", "location-cards", "shuffle", "variants"]);
});

test("la sélection d’un effet existant exige son Move et ajoute la relation inverse sans reformater", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const relative = "data/adventure-effects/effects/spacial-rend.adventure-effect.json";
  fs.mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
  fs.copyFileSync(path.join(canonicalRoot, relative), path.join(root, relative));
  const before = fs.readFileSync(path.join(root, relative), "utf8");
  const draft = makeDraft(root);
  draft.values.adventureEffectRefs = ["ADVENTURE_EFFECT_SPACIAL_REND"];
  assert.ok(dry(root, draft).issues.some((issue) => issue.code === "ADVENTURE_EFFECT_MOVE_REQUIRED"));
  draft.values.cinematicMoves.push("SPACIAL_REND");
  const result = dry(root, draft);
  assert.equal(result.completeness.canCommit, true, JSON.stringify(result.issues));
  const patch = result.files.find((file) => file.kind === "adventure-effect-pokemon-reference");
  const effect = JSON.parse(patch.content);
  assert.equal(effect.pokemonRefs.at(-1).formId, "BUILDERMON");
  assert.equal(patch.content.slice(0, patch.content.indexOf('"pokemonRefs"')), before.slice(0, before.indexOf('"pokemonRefs"')));
  assert.equal(patch.content.slice(patch.content.indexOf('"localization"')), before.slice(before.indexOf('"localization"')));
  assert.equal(JSON.parse(result.files.find((file) => file.kind === "adventure-effect-manifest").content).count, 1);
});

test("Adventure Effect: formulaire dédié, preview ordonnée, relations minimales, manifeste et transaction atomique", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const pokemon = makeDraft(root, "normal", { base: "BUILDERMON", dexNr: 9995 }).values;
  writeJson(path.join(root, "data/pokemon/normal/9995-buildermon.json"), pokemon);
  writeJson(path.join(root, "data/moves/charged/BUILDER_EFFECT.json"), { id: "BUILDER_EFFECT", names: localized("Builder Effect") });
  const unrelated = path.join(root, "data/unrelated.json");
  writeJson(unrelated, { sentinel: true });
  const unrelatedHash = crypto.createHash("sha256").update(fs.readFileSync(unrelated)).digest("hex");
  const draft = makeAdventureEffectDraft(root);
  const result = dry(root, draft);
  assert.equal(result.completeness.canCommit, true, JSON.stringify(result.issues));
  assertKeyOrder(contractApi.loadCanonicalContract(root).pokemonTemplates["adventure-effect"], JSON.parse(result.preview));
  assert.deepEqual(result.checks, {
    templatesConsumed: true,
    recursiveKeyOrderPreserved: true,
    existingJsonReformatted: 0,
    existingJsonReordered: 0,
    unrelatedJsonModified: 0,
    overwriteProtection: true,
    identityInventory: 1,
    engine: "SCHEMA_AND_IDENTITY_VALID",
  });
  assert.ok(result.files.some((file) => file.kind === "adventure-effect"));
  assert.ok(result.files.some((file) => file.kind === "pokemon-adventure-reference"));
  assert.ok(result.files.some((file) => file.kind === "move-adventure-reference"));
  assert.ok(result.files.some((file) => file.kind === "adventure-effect-manifest"));
  const committed = engine.commitDryRun({ root, draft, token: result.token, owner: "builder@test.local", secret: "test-json-builder-secret", commit: false, engineCheck: false });
  assert.equal(committed.transaction.atomic, true);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, "data/pokemon/normal/9995-buildermon.json"), "utf8")).adventureEffectRefs, ["ADVENTURE_EFFECT_BUILDER_EFFECT"]);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, "data/moves/charged/BUILDER_EFFECT.json"), "utf8")).adventureEffectRef, "ADVENTURE_EFFECT_BUILDER_EFFECT");
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, "data/adventure-effects/manifests/index.json"), "utf8")).count, 1);
  assert.equal(crypto.createHash("sha256").update(fs.readFileSync(unrelated)).digest("hex"), unrelatedHash);
});

test("états inconnue/non publiée: null si autorisé, blocage si le schéma exige une valeur", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const allowed = makeDraft(root, "normal", { states: { secondaryType: "unknown" } });
  const allowedResult = dry(root, allowed);
  assert.equal(JSON.parse(allowedResult.preview).secondaryType, null);
  const blocked = makeDraft(root, "normal", { states: { primaryType: "not-published" } });
  const blockedResult = dry(root, blocked);
  assert.ok(blockedResult.issues.some((issue) => issue.code === "VALUE_STATE_NOT_REPRESENTABLE"));
});

test("collision Identity et overwrite: aucun fichier existant n’est écrasé", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const draft = makeDraft(root, "normal");
  const target = path.join(root, "data/pokemon/normal/9998-buildermon.json");
  writeJson(target, draft.values);
  const result = dry(root, draft);
  assert.ok(result.issues.some((issue) => issue.code === "IDENTITY_COLLISION"));
  assert.ok(result.issues.some((issue) => issue.code === "OVERWRITE_PROTECTED"));
  assert.equal(result.completeness.canCommit, false);
});

test("patch parent minimal: les octets hors tableau restent strictement identiques", () => {
  const source = '{\n  "id": "BASE",\n  "megaEvolutions": [],\n  "sentinel": { "keep": "same spacing" }\n}\n';
  const patched = engine.patchJsonStringArray(source, "megaEvolutions", "BASE_MEGA").content;
  assert.equal(patched.replace(/\[\n    "BASE_MEGA"\n  \]/, "[]"), source);
  assert.equal(JSON.parse(patched).megaEvolutions[0], "BASE_MEGA");
});

test("patch parent Méga: active le booléen sans reformater le document", () => {
  const source = '{\n  "hasMegaEvolution": false,\n  "megaEvolutions": [],\n  "sentinel": { "keep": "same spacing" }\n}\n';
  let patched = engine.patchJsonStringArray(source, "megaEvolutions", "BASE_MEGA").content;
  patched = engine.patchJsonBoolean(patched, "hasMegaEvolution", true).content;
  assert.equal(JSON.parse(patched).hasMegaEvolution, true);
  assert.equal(JSON.parse(patched).megaEvolutions[0], "BASE_MEGA");
  assert.match(patched, /"sentinel": \{ "keep": "same spacing" \}/);
});

test("sécurité chemins: traversal, absolu et préfixe non autorisé sont refusés", () => {
  for (const value of ["../secret.json", "/tmp/secret.json", "templates/pokemon/exemple.json", "data/pokemon/../../secret.json"]) {
    assert.throws(() => engine.normalizeRelativePath(value), (error) => error.code === "JSON_BUILDER_PATH_TRAVERSAL");
  }
});

test("dry-run périmé: une modification concurrente du manifeste bloque la transaction", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const draft = makeDraft(root, "normal");
  const result = dry(root, draft);
  fs.appendFileSync(path.join(root, "data/assets/manifests/separation-manifest.json"), "\n");
  assert.throws(
    () => engine.commitDryRun({ root, draft, token: result.token, owner: "builder@test.local", secret: "test-json-builder-secret", commit: false, engineCheck: false }),
    (error) => error.code === "DRY_RUN_STALE",
  );
});

test("écriture atomique: rollback intégral en cas d’échec injecté", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const draft = makeDraft(root, "normal");
  const result = dry(root, draft);
  const before = hashTree(root);
  assert.throws(
    () => engine.commitDryRun({ root, draft, token: result.token, owner: "builder@test.local", secret: "test-json-builder-secret", commit: false, failAfter: 3, engineCheck: false }),
    (error) => error.code === "ROLLBACK_TEST_FAILURE" && error.rollback?.rolledBack === true,
  );
  assert.deepEqual(hashTree(root), before);
});

test("transaction réussie: installe les fichiers, backups, rapport et manifests sans toucher les non-concernés", (t) => {
  const root = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const unrelated = path.join(root, "data/unrelated.json");
  writeJson(unrelated, { sentinel: true });
  const unrelatedHash = crypto.createHash("sha256").update(fs.readFileSync(unrelated)).digest("hex");
  const draft = makeDraft(root, "mega", { dexNr: 9996 });
  addParent(root, draft);
  const result = dry(root, draft);
  const committed = engine.commitDryRun({ root, draft, token: result.token, owner: "builder@test.local", secret: "test-json-builder-secret", commit: false, engineCheck: false });
  assert.equal(committed.transaction.atomic, true);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, result.files.find((file) => file.kind === "pokemon").relativePath), "utf8")).formId, "BUILDERMON_MEGA");
  assert.ok(fs.existsSync(path.join(root, committed.reportPath)));
  assert.ok(committed.files.some((file) => file.relativePath.includes("operations/backups/json-builder/")));
  assert.equal(crypto.createHash("sha256").update(fs.readFileSync(unrelated)).digest("hex"), unrelatedHash);
});

test("Engine canonique réel: baseline Data, Assets et PvP contrôlée", () => {
  const report = engine.runCanonicalEngine(canonicalRoot);
  assert.equal(report.assetValid, true);
  assert.equal(report.pvpValid, true);
  assert.notEqual(report.status, "INVALID");
  assert.ok(report.coverage.pokemonAndForms >= 1617);
});

test("architecture route/UI: session, same-origin, rate limit, navigation et panneau sont présents", () => {
  const route = fs.readFileSync(path.resolve("src/app/api/json-builder/route.ts"), "utf8");
  const panel = fs.readFileSync(path.resolve("src/components/admin/pokemon/json-builder-panel.tsx"), "utf8");
  const routes = fs.readFileSync(path.resolve("src/data/pokemon-routes.ts"), "utf8");
  assert.match(route, /getSession\(\)/);
  assert.match(route, /assertSameOrigin\(request\)/);
  assert.match(route, /rateLimit\(request, "json-builder-write"/);
  assert.match(route, /assertJsonPayloadSize\(body/);
  assert.match(panel, /data-json-builder/);
  assert.match(panel, /Étape \{step \+ 1\} \/ \{activeSteps\.length\}/);
  assert.match(routes, /"json-builder"/);
});
