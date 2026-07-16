import assert from "node:assert/strict";
import test from "node:test";

import {
  costumePresentationEntries,
  pokemonPresentationEntries,
  pokemonPresentationSearchText,
  shinyPresentationEntries,
} from "../src/utils/admin/pokemon-presentation-entries.mjs";

function pikachu(overrides = {}) {
  return {
    key: "pokemon:0025-pikachu.json",
    id: "PIKACHU",
    formId: "PIKACHU_NORMAL",
    dexId: "0025",
    name: "Pikachu",
    form: "normal",
    availability: { shinyReleased: true },
    eventAssets: [],
    ...overrides,
  };
}

test("le filtre Costume crée une fiche par costume et groupe les sexes", () => {
  const entries = costumePresentationEntries([
    pikachu({
      eventAssets: [
        { form: null, costume: "PIKACHU_FALL_2019", isFemale: false, image: "male.png", shinyImage: "male-shiny.png" },
        { form: null, costume: "PIKACHU_FALL_2019", isFemale: true, image: "female.png", shinyImage: "female-shiny.png" },
        { form: null, costume: "PIKACHU_WINTER_2020", isFemale: false, image: "winter.png" },
      ],
    }),
  ]);

  assert.equal(entries.length, 2);
  const fall = entries.find((entry) => entry.costume === "PIKACHU_FALL_2019");
  assert.ok(fall);
  assert.equal(fall.eventAsset.image, "male.png");
  assert.equal(fall.isFemale, false);
  assert.equal(fall.genderVariants.length, 2);
  assert.equal(fall.presentationVariant.selectedGender, "male");
  assert.equal(fall.baseKey, "pokemon:0025-pikachu.json");
});

test("un costume uniquement femelle reste visible avec son asset exact", () => {
  const [entry] = costumePresentationEntries([
    pikachu({
      eventAssets: [
        { form: null, costume: "PIKACHU_FEMALE_ONLY", isFemale: true, image: "female-only.png" },
      ],
    }),
  ]);

  assert.equal(entry.eventAsset.image, "female-only.png");
  assert.equal(entry.isFemale, true);
  assert.equal(entry.presentationVariant.selectedGender, "female");
});

test("les formes sans costume ne polluent pas le filtre Costume", () => {
  const entries = costumePresentationEntries([
    pikachu({ eventAssets: [{ form: "PIKACHU_FEMALE", costume: null, isFemale: true, image: "female-form.png" }] }),
  ]);
  assert.deepEqual(entries, []);
});

test("le filtre Chromatique marque explicitement la sélection shiny", () => {
  const released = pikachu({ shinyImage: "pikachu-shiny.png" });
  const hidden = pikachu({ key: "hidden", availability: { shinyReleased: false } });
  const entries = shinyPresentationEntries([released, hidden]);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].presentationVariant.shiny, true);
  assert.equal(entries[0].shinyImage, "pikachu-shiny.png");
});

test("la recherche inclut costume et variantes sexuées", () => {
  const [entry] = pokemonPresentationEntries([
    pikachu({ eventAssets: [{ costume: "PIKACHU_FALL_2019", isFemale: false, image: "male.png" }] }),
  ], "costume");
  assert.match(pokemonPresentationSearchText(entry), /pikachu_fall_2019/);
});
