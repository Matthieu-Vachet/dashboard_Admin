import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  POKEMON_GO_DOUBLE_WEAKNESS_MULTIPLIER,
  POKEMON_GO_SUPER_EFFECTIVE_MULTIPLIER,
  rocketWeaknessGroups,
} from "../src/lib/rocket-weakness-presentation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "runtime-data/PokemonGo-Data/data/battles/rocket/current.json"), "utf8")).currentRocketList;
const component = fs.readFileSync(path.join(root, "src/components/admin/pokemon/rocket-panel.jsx"), "utf8");
const profiles = [
  ...(data.giovanni || []),
  ...Object.values(data.leaders || {}).flat(),
  ...(data.grunts || []),
];
const pokemon = profiles.flatMap((profile) => Object.values(profile.slots || {}).flat());

function findPokemon(profileName, pokemonName) {
  const profile = profiles.find((entry) => entry.trainer === profileName);
  return Object.values(profile?.slots || {}).flat().find((entry) => entry.names?.French === pokemonName || entry.sourceName === pokemonName);
}

test("les multiplicateurs suivent les conventions Pokémon GO", () => {
  assert.equal(POKEMON_GO_SUPER_EFFECTIVE_MULTIPLIER, 1.6);
  assert.equal(POKEMON_GO_DOUBLE_WEAKNESS_MULTIPLIER, 2.56);
  assert.ok(Math.abs(POKEMON_GO_SUPER_EFFECTIVE_MULTIPLIER ** 2 - POKEMON_GO_DOUBLE_WEAKNESS_MULTIPLIER) < Number.EPSILON * 4);
});

test("Giovanni, les Leaders et les Grunts couvrent les cas simple, double et sans double", () => {
  const rhyperior = rocketWeaknessGroups(findPokemon("Giovanni", "Rhinastoc").weaknesses);
  assert.deepEqual(rhyperior[0], { kind: "double", label: "Double faiblesse", multiplier: 2.56, types: ["Water", "Grass"] });
  assert.deepEqual(rhyperior[1].types, ["Ice", "Fighting", "Ground", "Steel"]);

  const charizard = rocketWeaknessGroups(findPokemon("Arlo", "Dracaufeu").weaknesses);
  assert.deepEqual(charizard[0].types, ["Rock"]);
  assert.equal(charizard[0].multiplier, 2.56);

  const persian = rocketWeaknessGroups(findPokemon("Giovanni", "Persian").weaknesses);
  assert.deepEqual(persian, [{ kind: "single", label: "Faiblesse", multiplier: 1.6, types: ["Fighting"] }]);

  assert.ok(profiles.some((profile) => String(profile.trainerType).toLowerCase() === "grunt"));
  assert.ok(pokemon.some((entry) => (entry.weaknesses?.double || []).length > 0));
  assert.ok(pokemon.some((entry) => (entry.weaknesses?.double || []).length === 0));
});

test("chaque faiblesse Rocket réutilise un asset de type existant", () => {
  const typeFiles = {
    Normal: "ico_0_normal.png", Fighting: "ico_1_fighting.png", Flying: "ico_2_flying.png", Poison: "ico_3_poison.png",
    Ground: "ico_4_ground.png", Rock: "ico_5_rock.png", Bug: "ico_6_bug.png", Ghost: "ico_7_ghost.png",
    Steel: "ico_8_steel.png", Fire: "ico_9_fire.png", Water: "ico_10_water.png", Grass: "ico_11_grass.png",
    Electric: "ico_12_electric.png", Psychic: "ico_13_psychic.png", Ice: "ico_14_ice.png", Dragon: "ico_15_dragon.png",
    Dark: "ico_16_dark.png", Fairy: "ico_17_fairy.png",
  };
  const types = new Set(pokemon.flatMap((entry) => [...(entry.weaknesses?.double || []), ...(entry.weaknesses?.single || [])]));
  for (const type of types) {
    assert.ok(typeFiles[type], `type Rocket inconnu: ${type}`);
    assert.ok(fs.existsSync(path.join(root, "public/assets/pokemon/types/icons", typeFiles[type])), `asset absent pour ${type}`);
  }
  assert.match(component, /typeIconAsset\(type\)/);
  assert.match(component, /rocketWeaknessGroups/);
  assert.match(component, /×\{group\.multiplier/);
  assert.doesNotMatch(component, /Double faiblesse : \{doubleWeaknesses\.join/);
});
