const CATEGORY_DIRECTORIES = Object.freeze({
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
});
const DIRECTORY_CATEGORIES = Object.freeze(Object.fromEntries(
  Object.entries(CATEGORY_DIRECTORIES).map(([category, directory]) => [directory, category]),
));
const CATEGORY_DIAGNOSTICS = Object.freeze([
  "ENTITY_CATEGORY_MISMATCH",
  "PVP_WRONG_CATEGORY_DIRECTORY",
  "ASSET_WRONG_CATEGORY_DIRECTORY",
  "REFERENCE_CATEGORY_MISMATCH",
  "ENTITY_CLASSIFICATION_AMBIGUOUS",
]);
const REGIONAL_FORMS = Object.freeze({
  ALOLA: ["alola", "alolan"],
  GALAR: ["galar", "galarian"],
  HISUI: ["hisui", "hisuian"],
  PALDEA: ["paldea", "paldean"],
});

function normalizedToken(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function identityToken(value) { return String(value || "").trim().toUpperCase(); }

function classifyEntity(entity, { sourceFile = null, isAlternative = false } = {}) {
  if (!entity || typeof entity !== "object") {
    return { category: null, directory: null, ambiguous: true, signals: [], reasons: ["entity-missing"], diagnostic: "ENTITY_CLASSIFICATION_AMBIGUOUS" };
  }
  const form = normalizedToken(entity.form);
  const formId = identityToken(entity.formId || entity.id);
  const baseFormId = identityToken(entity.baseFormId || entity.id);
  const slug = normalizedToken(entity.slug);
  const distinctIdentity = Boolean(formId && baseFormId && formId !== baseFormId);
  const explicitSignals = new Set();
  const reasons = [];

  for (const [category, aliases] of Object.entries(REGIONAL_FORMS)) {
    if (distinctIdentity && aliases.includes(form)) {
      explicitSignals.add(category);
      reasons.push(`form:${form}`);
    }
  }
  for (const [category, expression] of [
    ["ALOLA", /_(?:ALOLA|ALOLAN)(?:_|$)/],
    ["GALAR", /_(?:GALAR|GALARIAN)(?:_|$)/],
    ["HISUI", /_(?:HISUI|HISUIAN)(?:_|$)/],
    ["PALDEA", /_(?:PALDEA|PALDEAN)(?:_|$)/],
  ]) {
    if (expression.test(`${formId}_`)) {
      explicitSignals.add(category);
      reasons.push(`formId:${formId}`);
    }
  }
  if (["mega", "mega-x", "mega-y"].includes(form) || /_MEGA(?:_[XY])?$/.test(formId)) explicitSignals.add("MEGA");
  if (form === "primal" || /_PRIMAL$/.test(formId)) explicitSignals.add("PRIMAL");
  if (form === "dynamax" || /_DYNAMAX$/.test(formId)) explicitSignals.add("DYNAMAX");
  if (form === "gigantamax" || /_GIGANTAMAX$/.test(formId)) explicitSignals.add("GIGANTAMAX");

  const signals = [...explicitSignals];
  if (signals.length > 1) return { category: null, directory: null, ambiguous: true, signals, reasons, diagnostic: "ENTITY_CLASSIFICATION_AMBIGUOUS" };
  if (signals.length === 1) return { category: signals[0], directory: CATEGORY_DIRECTORIES[signals[0]], ambiguous: false, signals, reasons, diagnostic: null };

  const alternativeIdentity = Boolean(
    distinctIdentity
      || (form && form !== "normal" && !Object.values(REGIONAL_FORMS).flat().includes(form))
      || isAlternative
  );
  const category = alternativeIdentity ? "FORM" : "NORMAL";
  return { category, directory: CATEGORY_DIRECTORIES[category], ambiguous: false, signals: [category], reasons: [alternativeIdentity ? `alternative:${form || slug || formId}` : "base-identity"], diagnostic: null };
}

function canonicalStem(entity) {
  const dexId = String(entity?.dexId || entity?.dexNr || "").padStart(4, "0");
  const identity = normalizedToken(entity?.slug || entity?.formId || entity?.id);
  if (!dexId || !identity) throw new Error("Impossible de construire le nom canonique sans dexId et identité.");
  return `${dexId}-${identity}`;
}

function resolveCanonicalReference(entity, { domain = null, family = null, category = null, sourceFile = null } = {}) {
  const categoryKey = category ? String(category).toUpperCase() : null;
  const classification = categoryKey
    ? { category: categoryKey, directory: CATEGORY_DIRECTORIES[categoryKey], ambiguous: false }
    : classifyEntity(entity, { sourceFile });
  if (classification.ambiguous || !classification.directory) throw new Error(`${entity?.formId}: ENTITY_CLASSIFICATION_AMBIGUOUS`);
  const stem = canonicalStem(entity);
  const resolvedDomain = domain || (family === "pvp" ? "pvp" : "assets");
  if (resolvedDomain === "pokemon") return `data/pokemon/${classification.directory}/${stem}.json`;
  if (resolvedDomain === "pvp") return `data/pvp/pokemon/${classification.directory}/${stem}.pvp.json`;
  const suffix = { core: "assets", home: "home", shuffle: "shuffle", variants: "variants", "location-cards": "location-cards" }[family];
  if (!suffix) throw new Error(`Famille inconnue : ${family}`);
  return `data/assets/${family}/${classification.directory}/${stem}.${suffix}.json`;
}

function categoryFromReference(reference) {
  const match = String(reference || "").replace(/\\/g, "/").match(/^data\/(?:pokemon|pvp\/pokemon|assets\/[^/]+)\/([^/]+)\//);
  return match ? DIRECTORY_CATEGORIES[match[1]] || null : null;
}

module.exports = { CATEGORY_DIAGNOSTICS, CATEGORY_DIRECTORIES, canonicalStem, categoryFromReference, classifyEntity, resolveCanonicalReference };
