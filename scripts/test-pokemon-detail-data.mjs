import assert from "node:assert/strict";
import test from "node:test";

import {
  assemblePokemonDetail,
  loadPokemonDetail,
  pokemonDetailKey,
} from "../src/lib/pokemon-detail-data.mjs";

const releaseSummary = {
  key: "pokemon:data/pokemon/0001-bulbasaur.json",
  availability: { shinyReleased: true, shadowShinyReleased: true },
  shinyAvailability: { releaseDate: "2018-03-25", event: "Community Day" },
  shadowShinyAvailability: {
    releaseDate: "2022-07-09",
    event: "Week-end Combat",
  },
};

test("liste, recherche, Candies et cartes assemblent la même fiche", () => {
  for (const entryPoint of ["list", "search", "candies", "table", "card"]) {
    const detail = assemblePokemonDetail(
      { ...releaseSummary, entryPoint },
      { detail: { names: { French: "Bulbizarre" } } },
    );
    assert.equal(detail.availability.shinyReleased, true);
    assert.equal(detail.shinyAvailability.releaseDate, "2018-03-25");
    assert.equal(detail.shadowShinyAvailability.event, "Week-end Combat");
  }
});

test("la réponse complète prime sans perdre les métadonnées du résumé", () => {
  const detail = assemblePokemonDetail(releaseSummary, {
    detail: {
      availability: { shinyReleased: false, shadowShinyReleased: false },
      shinyAvailability: null,
      sourceData: { shinyAvailability: { releaseDate: "2020-01-01" } },
    },
  });
  assert.equal(detail.availability.shinyReleased, false);
  assert.equal(detail.shinyAvailability, null);
});

test("le loader utilise baseKey et retourne directement la fiche assemblée", async () => {
  const entry = { ...releaseSummary, baseKey: "pokemon:data/pokemon/base.json" };
  let requestedUrl = "";
  const result = await loadPokemonDetail({
    adminApiPath: "/api/pokemon-admin",
    entry,
    fetcher: async (url) => {
      requestedUrl = url;
      return {
        ok: true,
        json: async () => ({ data: { detail: { id: "BULBASAUR" } } }),
      };
    },
  });
  assert.equal(
    requestedUrl,
    "/api/pokemon-admin?action=detail&key=pokemon%3Adata%2Fpokemon%2Fbase.json",
  );
  assert.equal(result.id, "BULBASAUR");
  assert.equal(result.shinyAvailability.event, "Community Day");
  assert.equal(pokemonDetailKey(entry), entry.baseKey);
});

test("les erreurs HTTP sont explicites", async () => {
  await assert.rejects(
    loadPokemonDetail({
      adminApiPath: "/api/pokemon-admin",
      entry: releaseSummary,
      fetcher: async () => ({
        ok: false,
        json: async () => ({ error: "Fiche introuvable." }),
      }),
    }),
    /Fiche introuvable/,
  );
});
