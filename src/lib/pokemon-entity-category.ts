export const pokemonCategoryDirectories = {
  NORMAL: "normal",
  FORM: "forms",
  MEGA: "mega",
  DYNAMAX: "dynamax",
  GIGANTAMAX: "gigantamax",
} as const;

export type PokemonEntityCategory = keyof typeof pokemonCategoryDirectories;
type Entity = { id?: unknown; formId?: unknown; baseFormId?: unknown; form?: unknown; dexId?: unknown; dexNr?: unknown };

function token(value: unknown) { return String(value || "").trim().toUpperCase(); }

export function classifyPokemonEntity(entity: Entity, sourceFile?: string | null) {
  const form = token(entity.form).toLowerCase();
  const formId = token(entity.formId || entity.id);
  const baseFormId = token(entity.baseFormId || entity.id);
  const signals: PokemonEntityCategory[] = [];
  if (["mega", "mega-x", "mega-y", "primal"].includes(form) || /_(?:MEGA(?:_[XY])?|PRIMAL)$/.test(formId)) signals.push("MEGA");
  if (form === "dynamax" || /_DYNAMAX$/.test(formId)) signals.push("DYNAMAX");
  if (form === "gigantamax" || /_GIGANTAMAX$/.test(formId)) signals.push("GIGANTAMAX");
  const unique = [...new Set(signals)];
  if (unique.length > 1) return { category: null, directory: null, ambiguous: true, diagnostic: "ENTITY_CLASSIFICATION_AMBIGUOUS" as const };
  const isFormFile = String(sourceFile || "").replaceAll("\\", "/").replace(/^data\//, "").startsWith("pokemon-forms/");
  const category: PokemonEntityCategory = unique[0] || (formId !== baseFormId || isFormFile ? "FORM" : "NORMAL");
  return { category, directory: pokemonCategoryDirectories[category], ambiguous: false, diagnostic: null };
}

export function canonicalPokemonStem(entity: Entity) {
  const identity = String(entity.formId || entity.id || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${String(entity.dexId || entity.dexNr || "").padStart(4, "0")}-${identity}`;
}

export function resolvePokemonDataReference(entity: Entity, family: "core" | "home" | "shuffle" | "variants" | "location-cards" | "pvp", sourceFile?: string | null) {
  const classification = classifyPokemonEntity(entity, sourceFile);
  if (classification.ambiguous || !classification.directory) throw new Error(`${String(entity.formId)}: ENTITY_CLASSIFICATION_AMBIGUOUS`);
  const stem = canonicalPokemonStem(entity);
  if (family === "pvp") return `pvp/pokemon/${classification.directory}/${stem}.pvp.json`;
  if (family === "core") return `pokemon-assets/core/${classification.directory}/${stem}.assets.json`;
  return `pokemon-assets/${family}/${classification.directory}/${stem}.${family}.json`;
}
