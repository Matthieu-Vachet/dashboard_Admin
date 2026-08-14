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
        { kind: "costume", gender: "male", form: null, costume: "PIKACHU_FALL_2019", isFemale: false, image: "male.png", shinyImage: "male-shiny.png" },
        { kind: "costume", gender: "female", form: null, costume: "PIKACHU_FALL_2019", isFemale: true, image: "female.png", shinyImage: "female-shiny.png" },
        { kind: "costume", gender: "male", form: null, costume: "PIKACHU_WINTER_2020", isFemale: false, image: "winter.png" },
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
        { kind: "costume", gender: "female", form: null, costume: "PIKACHU_FEMALE_ONLY", isFemale: true, image: "female-only.png" },
      ],
    }),
  ]);

  assert.equal(entry.eventAsset.image, "female-only.png");
  assert.equal(entry.isFemale, true);
  assert.equal(entry.presentationVariant.selectedGender, "female");
});

test("une forme clone reconnue par l'Engine reste visible sans costume dupliqué", () => {
  const entries = costumePresentationEntries([
    pikachu({ eventAssets: [{ kind: "event", gender: "female", form: "COPY_2019", costume: null, isFemale: true, image: "clone-form.png" }] }),
  ]);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].form, "COPY_2019");
  assert.equal(entries[0].costume, null);
  assert.equal(entries[0].eventAsset.image, "clone-form.png");
});

test("le filtre Chromatique marque explicitement la sélection shiny", () => {
  const released = pikachu({ shinyImage: "pikachu-shiny.png" });
  const hidden = pikachu({ key: "hidden", availability: { shinyReleased: false } });
  const entries = shinyPresentationEntries([released, hidden]);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].presentationVariant.shiny, true);
  assert.equal(entries[0].shinyImage, "pikachu-shiny.png");
});

test("le filtre Costume exclut les différences de genre et les anciennes formes structurelles", () => {
  const entries = costumePresentationEntries([
    pikachu({
      eventAssets: [
        { kind: "gender", gender: "female", form: null, costume: null, isFemale: true, image: "female.png" },
        { form: "galar", costume: null, isFemale: false, image: "legacy-galar.png" },
      ],
    }),
  ]);
  assert.deepEqual(entries, []);
});

test("la recherche inclut costume et variantes sexuées", () => {
  const [entry] = pokemonPresentationEntries([
    pikachu({ eventAssets: [{ kind: "costume", costume: "PIKACHU_FALL_2019", isFemale: false, image: "male.png" }] }),
  ], "costume");
  assert.match(pokemonPresentationSearchText(entry), /pikachu_fall_2019/);
});
