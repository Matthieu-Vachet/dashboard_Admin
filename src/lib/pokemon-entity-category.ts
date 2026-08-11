export const pokemonCategoryDirectories = {
  NORMAL: "normal",
  ALOLA: "alola",
  GALAR: "galar",
  HISUI: "hisui",
  PALDEA: "paldea",
  FORM: "forms",
  MEGA: "mega",
  PRIMAL: "primal",
  DYNAMAX: "dynamax",
  GIGANTAMAX: "gigantamax",
} as const;

export type PokemonEntityCategory = keyof typeof pokemonCategoryDirectories;
type Entity = { id?: unknown; formId?: unknown; baseFormId?: unknown; form?: unknown; slug?: unknown; dexId?: unknown; dexNr?: unknown };

const regionalForms: Record<"ALOLA" | "GALAR" | "HISUI" | "PALDEA", string[]> = {
  ALOLA: ["alola", "alolan"],
  GALAR: ["galar", "galarian"],
  HISUI: ["hisui", "hisuian"],
  PALDEA: ["paldea", "paldean"],
};

function normalizedToken(value: unknown) { return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function identityToken(value: unknown) { return String(value || "").trim().toUpperCase(); }

export function classifyPokemonEntity(entity: Entity) {
  const form = normalizedToken(entity.form);
  const formId = identityToken(entity.formId || entity.id);
  const baseFormId = identityToken(entity.baseFormId || entity.id);
  const distinctIdentity = Boolean(formId && baseFormId && formId !== baseFormId);
  const signals = new Set<PokemonEntityCategory>();
  for (const [category, aliases] of Object.entries(regionalForms) as [PokemonEntityCategory, string[]][]) {
    if (distinctIdentity && aliases.includes(form)) signals.add(category);
  }
  for (const [category, expression] of [
    ["ALOLA", /_(?:ALOLA|ALOLAN)(?:_|$)/],
    ["GALAR", /_(?:GALAR|GALARIAN)(?:_|$)/],
    ["HISUI", /_(?:HISUI|HISUIAN)(?:_|$)/],
    ["PALDEA", /_(?:PALDEA|PALDEAN)(?:_|$)/],
  ] as [PokemonEntityCategory, RegExp][]) if (expression.test(`${formId}_`)) signals.add(category);
  if (["mega", "mega-x", "mega-y"].includes(form) || /_MEGA(?:_[XY])?$/.test(formId)) signals.add("MEGA");
  if (form === "primal" || /_PRIMAL$/.test(formId)) signals.add("PRIMAL");
  if (form === "dynamax" || /_DYNAMAX$/.test(formId)) signals.add("DYNAMAX");
  if (form === "gigantamax" || /_GIGANTAMAX$/.test(formId)) signals.add("GIGANTAMAX");
  const unique = [...signals];
  if (unique.length > 1) return { category: null, directory: null, ambiguous: true, diagnostic: "ENTITY_CLASSIFICATION_AMBIGUOUS" as const, signals: unique };
  const category: PokemonEntityCategory = unique[0] || (distinctIdentity || (form && form !== "normal" && !Object.values(regionalForms).flat().includes(form)) ? "FORM" : "NORMAL");
  return { category, directory: pokemonCategoryDirectories[category], ambiguous: false, diagnostic: null, signals: [category] };
}

export function canonicalPokemonStem(entity: Entity) {
  const identity = normalizedToken(entity.slug || entity.formId || entity.id);
  return `${String(entity.dexId || entity.dexNr || "").padStart(4, "0")}-${identity}`;
}

export function resolveEntityPath({ domain, family, category, entity, sourceFile }: { domain: "pokemon" | "pvp" | "assets"; family?: "core" | "home" | "shuffle" | "variants" | "location-cards"; category?: string; entity: Entity; sourceFile?: string | null }) {
  const categoryKey = category?.toUpperCase() as PokemonEntityCategory | undefined;
  const classification = categoryKey
    ? { directory: pokemonCategoryDirectories[categoryKey], ambiguous: false }
    : classifyPokemonEntity(entity);
  if (classification.ambiguous || !classification.directory) throw new Error(`${String(entity.formId)}: ENTITY_CLASSIFICATION_AMBIGUOUS`);
  const stem = canonicalPokemonStem(entity);
  if (domain === "pokemon") return `data/pokemon/${classification.directory}/${stem}.json`;
  if (domain === "pvp") return `data/pvp/pokemon/${classification.directory}/${stem}.pvp.json`;
  const suffix = { core: "assets", home: "home", shuffle: "shuffle", variants: "variants", "location-cards": "location-cards" }[family || "core"];
  return `data/assets/${family || "core"}/${classification.directory}/${stem}.${suffix}.json`;
}

export function resolvePokemonDataReference(entity: Entity, family: "core" | "home" | "shuffle" | "variants" | "location-cards" | "pvp", sourceFile?: string | null) {
  return resolveEntityPath({ domain: family === "pvp" ? "pvp" : "assets", family: family === "pvp" ? undefined : family, entity, sourceFile });
}
