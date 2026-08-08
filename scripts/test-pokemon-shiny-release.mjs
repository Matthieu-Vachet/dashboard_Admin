import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

import {
  hasReleaseMetadata,
  resolvePokemonShinyReleases,
  resolveShinyReleaseStatus,
} from "../src/lib/pokemon-shiny-release.mjs";

const require = createRequire(import.meta.url);
const { releaseMetadataConflicts } = require(
  "../src/server/pokemon-go/apps/checklist/server/engine.js",
);

test("Bulbizarre et Florizarre restent disponibles selon le booléen canonique", () => {
  for (const name of ["Bulbizarre", "Florizarre"]) {
    const status = resolveShinyReleaseStatus(
      { shinyReleased: true },
      { releaseDate: "2018-03-25", event: "Community Day", matchedName: name },
    );
    assert.equal(status.released, true);
    assert.equal(status.details.releaseDate, "2018-03-25");
    assert.equal(status.details.matchedName, name);
  }
});

test("un booléen vrai reste disponible avec ou sans détails", () => {
  assert.equal(
    resolveShinyReleaseStatus({ shinyReleased: true }, null).released,
    true,
  );
  assert.equal(
    resolveShinyReleaseStatus({ shinyReleased: true }, null).details,
    null,
  );
});
test("false, null et métadonnées seules ne rendent jamais un shiny disponible", () => {
  const metadata = { releaseDate: "2026-01-01", event: "Test" };
  for (const flag of [false, null, undefined]) {
    const status = resolveShinyReleaseStatus({ shinyReleased: flag }, metadata);
    assert.equal(status.released, false);
    assert.equal(status.details, null);
  }
  assert.equal(hasReleaseMetadata(metadata), true);
  assert.equal(hasReleaseMetadata({ releaseDate: null, event: "" }), false);
});

test("le Shadow shiny utilise exclusivement son propre booléen et ses détails", () => {
  const statuses = resolvePokemonShinyReleases({
    availability: { shinyReleased: false, shadowShinyReleased: true },
    shinyAvailability: { releaseDate: "2018-03-25" },
    shadowShinyAvailability: {
      releaseDate: "2022-07-09",
      event: "Week-end Combat",
    },
  });
  assert.equal(statuses.shiny.released, false);
  assert.equal(statuses.shiny.details, null);
  assert.equal(statuses.shadow.released, true);
  assert.equal(statuses.shadow.details.event, "Week-end Combat");
});

test("formes et costumes partagent exactement le même contrat", () => {
  for (const payload of [
    { form: "mega", availability: { shinyReleased: true } },
    { form: "alola", availability: { shinyReleased: false } },
    { costume: "party-hat", availability: { shinyReleased: true } },
  ]) {
    const result = resolvePokemonShinyReleases(payload);
    assert.equal(
      result.shiny.released,
      payload.availability.shinyReleased === true,
    );
  }
});

test("l’Engine signale les métadonnées et anciens flags contradictoires", () => {
  assert.deepEqual(
    releaseMetadataConflicts(
      { shinyReleased: false },
      "shinyReleased",
      { releaseDate: "2018-03-25" },
      "shinyAvailability",
    ).map((issue) => issue.issue),
    ["release_metadata_conflict"],
  );
  assert.deepEqual(
    releaseMetadataConflicts(
      { shadowShinyReleased: true },
      "shadowShinyReleased",
      { released: false },
      "shadowShinyAvailability",
    ).map((issue) => issue.issue),
    ["release_flag_conflict"],
  );
  assert.equal(
    releaseMetadataConflicts(
      { shinyReleased: true },
      "shinyReleased",
      { releaseDate: "2018-03-25" },
      "shinyAvailability",
    ).length,
    0,
  );
});
