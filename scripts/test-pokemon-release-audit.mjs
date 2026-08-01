import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  auditStats,
  compareAuditRows,
  localAuditRows,
  parseMargxtAuditHtml,
  resolveAuditIdentity,
} = require("../src/server/pokemon-go/apps/checklist/server/pokemon-release-audit.js");
const { auditPayloadSchema, auditRowSchema } = require("../src/server/pokemon-go/apps/checklist/server/pokemon-release-audit-schema.js");
const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "margxt");
const fixture = (name) => fs.readFileSync(path.join(fixtures, `${name}.html`), "utf8");

function local(overrides = {}) {
  return {
    localKey: "pokemon-0001",
    dexId: "0001",
    pokemonId: 1,
    canonicalId: "BULBASAUR_NORMAL",
    localName: "Bulbizarre",
    displayName: "Bulbizarre",
    localForm: "BULBASAUR_NORMAL",
    localCostume: null,
    sourceType: "pokemon-file",
    image: "normal.png",
    shinyImage: "shiny.png",
    genderVariants: { male: true, female: true },
    file: "pokemon/0001-bulbasaur.json",
    released: true,
    shinyReleased: true,
    shadow: true,
    shadowShinyReleased: false,
    ...overrides,
  };
}

test("les quatre fixtures Margxt produisent des observations structurées", () => {
  const missing = parseMargxtAuditHtml(fixture("missing"), "available");
  const shiny = parseMargxtAuditHtml(fixture("shiny"), "shiny");
  const costume = parseMargxtAuditHtml(fixture("costume"), "costume");
  const shadow = parseMargxtAuditHtml(fixture("shadow"), "shadow");
  assert.equal(missing.rows[0].expected, false);
  assert.equal(missing.rows[0].sourceName, "Meloetta");
  assert.equal(missing.rows[0].sourceForm, "Forme Danse");
  assert.equal(missing.rows.some((row) => /Liste des Zarbi/.test(row.sourceName)), false);
  assert.equal(missing.rows[1].sourceName, "Zarbi");
  assert.equal(missing.rows[1].sourceForm, "A");
  assert.equal(shiny.rows[1].sourceName, "Prismillon");
  assert.equal(shiny.rows[1].sourceForm, "Motif Poké Ball");
  assert.equal(shiny.rows[1].sourceDate, "2020-08-07");
  assert.equal(shiny.rows[1].sourceEvent, "Semaine Énigmatique");
  assert.equal(costume.rows[0].sourceName, "Pikachu");
  assert.equal(costume.rows[0].sourceCostume, "Assistant du Professeur Willow");
  assert.equal(costume.rows[0].sourceEvent, "Festival Pokémon GO 2026");
  assert.equal(shadow.rows[0].shadowShiny, true);
  assert.equal(shadow.rows[0].shadowShinyEvent, "Week-end Combat");
});

test("isFemale reste une dimension d’asset et ne crée pas une seconde identité métier", () => {
  const inventory = { identities: [{
    identityKey: "PIKACHU_NORMAL__COSTUME_WILLOW",
    pokemonId: 25,
    canonicalId: "PIKACHU_NORMAL__COSTUME_WILLOW",
    pokemonName: "Pikachu",
    formId: "PIKACHU_NORMAL",
    costume: "WILLOW",
    category: "costume",
    sourceType: "asset-form",
    sourceFile: "pokemon-assets/costume/0025-pikachu-willow.assets.json",
    pokemonSourceFile: "pokemon/0025-pikachu.json",
    genderVariants: { male: true, female: true },
    genderAssets: [{ gender: "male" }, { gender: "female" }],
    assets: { image: "male.png", shinyImage: "male-s.png" },
  }] };
  const rows = localAuditRows([{ key: "pikachu", file: "pokemon/0025-pikachu.json", name: "Pikachu" }], "costume", inventory);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].genderVariants, { male: true, female: true });
  assert.equal(rows[0].canonicalId, "PIKACHU_NORMAL__COSTUME_WILLOW");
});

test("Meloetta, Prismillon et Zarbi reposent sur la forme canonique exacte", () => {
  const locals = [
    local({ dexId: "0648", canonicalId: "MELOETTA_PIROUETTE", localName: "Meloetta", displayName: "Meloetta Forme Danse", localForm: "MELOETTA_PIROUETTE" }),
    local({ dexId: "0666", canonicalId: "VIVILLON_POKEBALL", localName: "Prismillon", displayName: "Prismillon Motif Poké Ball", localForm: "VIVILLON_POKEBALL" }),
    local({ dexId: "0201", canonicalId: "UNOWN_A", localName: "Zarbi", displayName: "Zarbi A", localForm: "UNOWN_A" }),
    local({ dexId: "0201", canonicalId: "UNOWN_B", localName: "Zarbi", displayName: "Zarbi B", localForm: "UNOWN_B" }),
    local({ dexId: "0201", canonicalId: "UNOWN_EXCLAMATION_POINT", localName: "Zarbi", displayName: "Zarbi !", localForm: "UNOWN_EXCLAMATION_POINT" }),
    local({ dexId: "0201", canonicalId: "UNOWN_QUESTION_MARK", localName: "Zarbi", displayName: "Zarbi ?", localForm: "UNOWN_QUESTION_MARK" }),
  ];
  for (const source of [
    { dexId: "0648", sourceName: "Meloetta", sourceForm: "Forme Danse" },
    { dexId: "0666", sourceName: "Prismillon", sourceForm: "Motif Poké Ball" },
    { dexId: "0201", sourceName: "Zarbi", sourceForm: "A" },
    { dexId: "0201", sourceName: "Zarbi", sourceForm: "!", sourceNormalizedForm: "UNOWN_EXCLAMATION_POINT" },
    { dexId: "0201", sourceName: "Zarbi", sourceForm: "?", sourceNormalizedForm: "UNOWN_QUESTION_MARK" },
  ]) {
    const result = resolveAuditIdentity(source, locals);
    assert.equal(result.resolutionStatus, "exact");
    assert.ok(result.local?.canonicalId);
  }
});

test("un costume Pikachu approuvé est résolu par mapping, jamais par meilleur score", () => {
  const locals = [
    local({ dexId: "0025", canonicalId: "PIKACHU_GO_FEST_2026_CAP_RED", localName: "Pikachu", localForm: "PIKACHU_NORMAL", localCostume: "GO_FEST_2026_CAP_RED", sourceType: "asset-form" }),
    local({ dexId: "0025", canonicalId: "PIKACHU_GO_FEST_2026_CAP_BLUE", localName: "Pikachu", localForm: "PIKACHU_NORMAL", localCostume: "GO_FEST_2026_CAP_BLUE", sourceType: "asset-form" }),
  ];
  const source = { kind: "costume", dexId: "0025", sourceName: "Pikachu", sourceCostume: "Chapeau de la Team Valor" };
  const result = resolveAuditIdentity(source, locals, { approvedMappings: [{ kinds: ["costume"], dexId: 25, sourceValue: "Chapeau de la Team Valor", canonicalId: "PIKACHU_GO_FEST_2026_CAP_RED" }] });
  assert.equal(result.resolutionStatus, "mapping-approved");
  assert.equal(result.local.canonicalId, "PIKACHU_GO_FEST_2026_CAP_RED");
});

test("une espèce sans qualificatif choisit sa fiche *_NORMAL, jamais sa transformation Dynamax", () => {
  const result = resolveAuditIdentity({ dexId: "0001", sourceName: "Bulbizarre" }, [
    local({ canonicalId: "BULBASAUR_NORMAL", localForm: "BULBASAUR", category: "alternative" }),
    local({ canonicalId: "BULBASAUR_DYNAMAX", localForm: "BULBASAUR_DYNAMAX", category: "dynamax" }),
  ]);
  assert.equal(result.resolutionStatus, "exact");
  assert.equal(result.strategy, "canonical-normal-form");
  assert.equal(result.local.canonicalId, "BULBASAUR_NORMAL");
});

test("une espèce sans forme normale unique reste ambiguë et expose ses fiches existantes", () => {
  const result = resolveAuditIdentity({ dexId: "0327", sourceName: "Spinda" }, [
    local({ dexId: "0327", canonicalId: "SPINDA_01", localName: "Spinda", localForm: "SPINDA_01" }),
    local({ dexId: "0327", canonicalId: "SPINDA_02", localName: "Spinda", localForm: "SPINDA_02" }),
  ]);
  assert.equal(result.resolutionStatus, "ambiguous");
  assert.equal(result.strategy, "dex-and-species-exact");
  assert.deepEqual(result.candidates.map((candidate) => candidate.canonicalId), ["SPINDA_01", "SPINDA_02"]);
});

test("une suggestion textuelle ne devient ni association ni divergence", () => {
  const rows = compareAuditRows("costume", [{ sourceKey: "x", dexId: "0025", sourceName: "Pikachu", sourceCostume: "Chapeau inconnu" }], [
    local({ dexId: "0025", canonicalId: "PIKACHU_COSTUME_A", localName: "Pikachu", localCostume: "CHAPEAU_A", sourceType: "asset-form" }),
    local({ dexId: "0025", canonicalId: "PIKACHU_COSTUME_B", localName: "Pikachu", localCostume: "CHAPEAU_B", sourceType: "asset-form" }),
  ]);
  assert.equal(rows[0].status, "identity-unresolved");
  assert.equal(rows[0].businessStatus, "not-verified");
  assert.equal(rows.some((row) => row.status === "divergence"), false);
  assert.equal(rows.filter((row) => row.status === "not-verified").length, 2);
});

test("les compteurs excluent parsing et ambiguïtés des divergences", () => {
  const stats = auditStats([
    { status: "divergence", sourceKey: "1", resolutionStatus: "exact", canonicalId: "A" },
    { status: "identity-ambiguous", sourceKey: "2", resolutionStatus: "ambiguous" },
    { status: "parse-error", sourceKey: "3", resolutionStatus: "parse-error" },
  ], 2, 1);
  assert.equal(stats.divergences, 1);
  assert.equal(stats.ambiguous, 1);
  assert.equal(stats.parseErrors, 1);
  assert.equal(stats.resolvedIdentities, 1);
});

test("les comparaisons exposent le champ et les deux valeurs", () => {
  const rows = compareAuditRows("shiny", [{ sourceKey: "bulba", dexId: "0001", sourceName: "Bulbizarre" }], [local({ shinyReleased: false, shinyImage: null })]);
  assert.equal(rows[0].status, "divergence");
  assert.deepEqual(rows[0].comparisons.map((item) => item.field), ["availability.shinyReleased", "assets.shinyImage"]);
  assert.equal(rows[0].comparisons[0].externalValue, true);
  assert.equal(rows[0].comparisons[0].localValue, false);
});

test("une source indisponible n’est pas transformée en divergence", () => {
  assert.deepEqual(compareAuditRows("shiny", [], []), []);
});

test("le schéma refuse un statut mélangé ou inconnu", () => {
  assert.equal(auditRowSchema.safeParse({ status: "identity-unresolved", diagnostics: [], comparisons: [], candidates: [] }).success, true);
  assert.equal(auditRowSchema.safeParse({ status: "ambiguous-divergence", diagnostics: [], comparisons: [], candidates: [] }).success, false);
  assert.equal(auditPayloadSchema.safeParse({}).success, false);
});

test("le panneau affiche les champs comparés, les candidats et les compteurs explicites", () => {
  const panel = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "components", "admin", "pokemon", "pokemon-release-audit-panel.tsx"), "utf8");
  for (const label of ["Entrées externes analysées", "Identités résolues", "Divergences réelles", "Erreurs de parsing", "Comparaison métier", "Candidats locaux", "Fichier JSON local", "Lier à cette fiche JSON", "Confirmer l’association manuelle"]) assert.match(panel, new RegExp(label));
  assert.doesNotMatch(panel, /\[\["Lignes"/);
  assert.match(panel, /grid-cols-2/);
  assert.match(panel, /content-visibility:auto/);
  assert.match(panel, /pokemon-release-audit-manual-match/);
  assert.match(panel, /Aucune donnée Pokémon n’est réécrite/);
  assert.match(panel, /row\.sourceCostume \|\| row\.sourceForm \|\| row\.sourceVariant/);
});
