export const typeLabels = {
  BUG: "Insecte",
  DARK: "Ténèbres",
  DRAGON: "Dragon",
  ELECTRIC: "Électrik",
  FAIRY: "Fée",
  FIGHTING: "Combat",
  FIRE: "Feu",
  FLYING: "Vol",
  GHOST: "Spectre",
  GRASS: "Plante",
  GROUND: "Sol",
  ICE: "Glace",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psy",
  ROCK: "Roche",
  STEEL: "Acier",
  WATER: "Eau",
};

export const typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
};

export function catalogItem(items, id) {
  return (items || []).find((item) => item.id === id || item.type === id || item.slug === id);
}

export function typeName(type, catalog = []) {
  const item = catalogItem(catalog, type);
  return item?.names?.French || typeLabels[type] || type || "-";
}

export function typeIcon(type, catalog = []) {
  const icons = {
    BUG: "/ui/Types/ico_6_bug.png",
    DARK: "/ui/Types/ico_16_dark.png",
    DRAGON: "/ui/Types/ico_15_dragon.png",
    ELECTRIC: "/ui/Types/ico_12_electric.png",
    FAIRY: "/ui/Types/ico_17_fairy.png",
    FIGHTING: "/ui/Types/ico_1_fighting.png",
    FIRE: "/ui/Types/ico_9_fire.png",
    FLYING: "/ui/Types/ico_2_flying.png",
    GHOST: "/ui/Types/ico_7_ghost.png",
    GRASS: "/ui/Types/ico_11_grass.png",
    GROUND: "/ui/Types/ico_4_ground.png",
    ICE: "/ui/Types/ico_14_ice.png",
    NORMAL: "/ui/Types/ico_0_normal.png",
    POISON: "/ui/Types/ico_3_poison.png",
    PSYCHIC: "/ui/Types/ico_13_psychic.png",
    ROCK: "/ui/Types/ico_5_rock.png",
    STEEL: "/ui/Types/ico_8_steel.png",
    WATER: "/ui/Types/ico_10_water.png",
  };
  return icons[String(type || "").toUpperCase()] || catalogItem(catalog, type)?.assets?.icon || null;
}

export function typeBackground(type, catalog = []) {
  return catalogItem(catalog, type)?.assets?.background || null;
}

export function preferredPokemonImage(entry = {}, options = {}) {
  return resolvePokemonVariant(entry, {
    ...options,
    shiny: Boolean(options.shiny ?? options.preferShiny),
  }).image;
}

export function pokemonVariantLabel(entry = {}) {
  return pokemonVariantBadges(entry)[0] || "Normal";
}

export { pokemonVariantBadges, resolvePokemonVariant };
import {
  pokemonVariantBadges,
  resolvePokemonVariant,
} from "@/lib/pokemon-variant-resolver";
