import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  pokemonVariantBadges,
  resolvePokemonVariant,
} from "../src/lib/pokemon-variant-resolver.ts";

const normal = "https://assets.example/pikachu.png";
const normalShiny = "https://assets.example/pikachu-shiny.png";
const winter = "https://assets.example/pikachu-winter-2020.png";
const winterShiny = "https://assets.example/pikachu-winter-2020-shiny.png";
const female = "https://assets.example/pikachu-female.png";
const dashboardRoot = path.resolve(import.meta.dirname, "..");
const dataRoot = path.resolve(dashboardRoot, "..", "PokemonGo-Data");

function pikachu() {
  return {
    id: "PIKACHU",
    formId: "PIKACHU",
    baseFormId: "PIKACHU",
    form: "normal",
    names: { French: "Pikachu", English: "Pikachu" },
    assets: {
      image: normal,
      shinyImage: normalShiny,
      assetForms: [
        { form: "WINTER_2020", costume: null, isFemale: false, image: winter, shinyImage: winterShiny },
        { form: "WINTER_2020", costume: null, isFemale: true, image: `${winter}?female=1`, shinyImage: `${winterShiny}?female=1` },
        { form: null, costume: null, isFemale: true, image: female, shinyImage: null },
      ],
    },
  };
}

test("résout un Pokémon normal et sa forme _NORMAL sur l'asset principal", () => {
  assert.equal(resolvePokemonVariant(pikachu()).image, normal);
  const normalForm = resolvePokemonVariant(pikachu(), { form: "PIKACHU_NORMAL" });
  assert.equal(normalForm.image, normal);
  assert.equal(normalForm.source, "primary-assets");
});

test("résout un costume officiel même s'il est encore stocké dans assetForms.form", () => {
  const resolution = resolvePokemonVariant(pikachu(), {
    form: "PIKACHU_NORMAL",
    costume: "PIKACHU_WINTER_2020",
  });
  assert.equal(resolution.image, winter);
  assert.equal(resolution.source, "asset-form");
  assert.deepEqual(pokemonVariantBadges(pikachu(), { costume: "PIKACHU_WINTER_2020" }), [
    "Costume : PIKACHU_WINTER_2020",
  ]);
});

test("résout le shiny exact du costume sans utiliser l'image normale", () => {
  const resolution = resolvePokemonVariant(pikachu(), {
    costume: "PIKACHU_WINTER_2020",
    shiny: true,
  });
  assert.equal(resolution.image, winterShiny);
  assert.notEqual(resolution.image, normalShiny);
});

test("résout la variante féminine exacte", () => {
  const resolution = resolvePokemonVariant(pikachu(), { isFemale: true });
  assert.equal(resolution.image, female);
  assert.ok(pokemonVariantBadges(pikachu(), { isFemale: true }).includes("Forme femelle"));
});

test("refuse tout fallback normal lorsqu'un costume explicite est absent", () => {
  const resolution = resolvePokemonVariant(pikachu(), { costume: "PIKACHU_UNKNOWN_2099" });
  assert.equal(resolution.image, null);
  assert.equal(resolution.status, "missing-asset");
  assert.equal(resolution.source, "missing");
});

test("refuse un ancien assets.selected non certifié pour un costume explicite", () => {
  const resolution = resolvePokemonVariant({
    id: "PIKACHU",
    costume: "PIKACHU_WINTER_2020",
    assets: {
      image: "pikachu-normal.png",
      selected: "pikachu-normal.png",
      assetForms: [],
    },
  });
  assert.equal(resolution.image, null);
  assert.equal(resolution.status, "missing-asset");
  assert.equal(resolution.source, "missing");
});

test("refuse tout fallback normal lorsqu'un shiny exact est absent", () => {
  const pokemon = pikachu();
  pokemon.assets.assetForms.push({ form: null, costume: "NO_SHINY", isFemale: false, image: "https://assets.example/no-shiny.png", shinyImage: null });
  const resolution = resolvePokemonVariant(pokemon, { costume: "NO_SHINY", shiny: true });
  assert.equal(resolution.image, null);
  assert.equal(resolution.status, "missing-asset");
});

test("résout une forme régionale exacte depuis assetForms", () => {
  const rattata = {
    id: "RATTATA",
    formId: "RATTATA",
    form: "normal",
    assets: {
      image: "https://assets.example/rattata.png",
      assetForms: [{ form: "alola", costume: null, isFemale: false, image: "https://assets.example/rattata-alola.png" }],
    },
  };
  assert.equal(
    resolvePokemonVariant(rattata, { form: "RATTATA_ALOLA" }).image,
    "https://assets.example/rattata-alola.png",
  );
});

test("conserve l'asset principal d'une fiche Méga déjà exacte", () => {
  const mega = {
    pokemonId: "RAYQUAZA_MEGA",
    formId: "RAYQUAZA_MEGA",
    form: "mega",
    mega: true,
    identity: {
      pokemon: "RAYQUAZA",
      form: "RAYQUAZA_MEGA",
      isMega: true,
      resolution: { status: "matched" },
    },
    assets: { image: "https://assets.example/rayquaza-mega.png" },
  };
  const resolution = resolvePokemonVariant(mega);
  assert.equal(resolution.image, "https://assets.example/rayquaza-mega.png");
  assert.equal(resolution.source, "primary-assets");
  assert.ok(pokemonVariantBadges(mega).includes("Méga / Primo"));
});

test("conserve l'artwork exact et les badges Obscur et Purifié", () => {
  const shadow = resolvePokemonVariant(pikachu(), { shadow: true });
  const purified = resolvePokemonVariant(pikachu(), { purified: true });
  assert.equal(shadow.image, normal);
  assert.equal(purified.image, normal);
  assert.ok(pokemonVariantBadges(pikachu(), { shadow: true }).includes("Obscur"));
  assert.ok(pokemonVariantBadges(pikachu(), { purified: true }).includes("Purifié"));
});

test("conserve les états Dynamax et Gigamax sans inventer d'asset", () => {
  assert.ok(pokemonVariantBadges(pikachu(), { dynamax: true }).includes("Dynamax"));
  const badges = pokemonVariantBadges(pikachu(), { dynamax: true, gigantamax: true });
  assert.ok(badges.includes("Gigamax"));
  assert.ok(!badges.includes("Dynamax"));
});

test("résout les vrais assets Bulbizarre FALL 2019 et Pikachu WINTER 2020", {
  skip: !fs.existsSync(path.join(dataRoot, "pokemon-assets/normal/0001-bulbasaur.assets.json")),
}, () => {
  const bulbasaur = JSON.parse(fs.readFileSync(path.join(dataRoot, "pokemon-assets/normal/0001-bulbasaur.assets.json"), "utf8"));
  const pikachuAssetFile = JSON.parse(fs.readFileSync(path.join(dataRoot, "pokemon-assets/normal/0025-pikachu.assets.json"), "utf8"));
  const bulbasaurResolution = resolvePokemonVariant(bulbasaur, {
    id: "BULBASAUR",
    form: "BULBASAUR_NORMAL",
    costume: "BULBASAUR_FALL_2019",
  });
  const pikachuResolution = resolvePokemonVariant(pikachuAssetFile, {
    id: "PIKACHU",
    form: "PIKACHU_NORMAL",
    costume: "PIKACHU_WINTER_2020",
    shiny: true,
  });
  assert.match(bulbasaurResolution.image || "", /pm1\.fFALL_2019\.icon\.png$/);
  assert.match(pikachuResolution.image || "", /pm25\.fWINTER_2020\.s\.icon\.png$/);
});

test("les composants partagés ne sélectionnent plus directement les assets Pokémon", () => {
  const artwork = fs.readFileSync(path.join(dashboardRoot, "src/components/admin/pokemon/pokemon-artwork.jsx"), "utf8");
  const style = fs.readFileSync(path.join(dashboardRoot, "src/components/site/pokemon-style.js"), "utf8");
  const collections = fs.readFileSync(path.join(dashboardRoot, "src/components/admin/pokemon/collections-panel.jsx"), "utf8");
  assert.match(artwork, /resolvePokemonVariant/);
  assert.doesNotMatch(artwork, /assets\??\.(?:image|shinyImage)/);
  assert.match(style, /resolvePokemonVariant/);
  assert.doesNotMatch(collections, /entry\.(?:image|shinyImage|homeImage|homeShinyImage)\s*\|\|/);
});
