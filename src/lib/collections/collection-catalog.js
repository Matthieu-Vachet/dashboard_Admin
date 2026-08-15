const COLLECTION_SCHEMA_VERSION = 2;

const COLLECTION_TYPES = Object.freeze([
  "normal",
  "event",
  "lucky",
  "shadow",
  "purified",
  "mega",
  "dynamax",
  "gigantamax",
]);

const SPECIALIZED_KINDS = new Set(["mega", "dynamax", "gigantamax"]);
const REGIONAL_FORMS = new Set(["alola", "galar", "hisui", "paldea"]);

function token(value) {
  return String(value ?? "").trim();
}

function lower(value) {
  return token(value).toLowerCase();
}

function normalizeType(value) {
  const type = lower(value);
  return COLLECTION_TYPES.includes(type) ? type : "normal";
}

function normalizeVariantMode(value) {
  return lower(value) === "single" ? "single" : "multi";
}

function isReleased(source) {
  return source?.availability?.released === true;
}

function sourceKind(source) {
  return lower(source?.kind || "pokemon");
}

function sourceForm(source) {
  return lower(source?.form || "normal");
}

function sourceCanonicalId(source) {
  return token(source?.formId || source?.id || source?.baseFormId || source?.dexId || source?.key);
}

function sourceCategory(source) {
  const kind = sourceKind(source);
  const form = sourceForm(source);
  if (kind === "mega") return form === "primal" ? "primal" : "mega";
  if (kind === "dynamax") return "dynamax";
  if (kind === "gigantamax") return "gigantamax";
  if (REGIONAL_FORMS.has(form)) return "regional";
  if (kind === "form") return "form";
  return "normal";
}

function sourceVariants(source) {
  return Array.isArray(source?.collectionVariants) ? source.collectionVariants : [];
}

function variantKind(variant) {
  return lower(variant?.kind);
}

function variantGender(variant) {
  if (variant?.isFemale === true || lower(variant?.gender) === "female") return "female";
  if (lower(variant?.gender) === "male") return "male";
  return null;
}

function isEventVariant(variant) {
  return ["costume", "event"].includes(variantKind(variant));
}

function isGenderVariant(variant) {
  return variantKind(variant) === "gender" && variantGender(variant) === "female";
}

function stableVariantId(variant) {
  return [
    variantKind(variant) || "variant",
    token(variant?.form) || "normal",
    token(variant?.costume) || "none",
    variantGender(variant) || "main",
  ].join(":");
}

function eventIdentityId(variant) {
  return [variantKind(variant), token(variant?.form) || "normal", token(variant?.costume) || "none"].join(":");
}

function readableVariantLabel(value) {
  const raw = token(value);
  if (!raw || ["normal", "base"].includes(lower(raw))) return "Forme standard";
  const knownLabels = {
    JAN_2020_NOEVOLVE: "Chapeau de fête",
  };
  if (knownLabels[raw.toUpperCase()]) return knownLabels[raw.toUpperCase()];
  const replacements = [
    [/\bGOFEST\b/g, "GO Fest"],
    [/\bCOPY\b/g, "Clone"],
    [/\bFALL\b/g, "Automne"],
    [/\bSPRING\b/g, "Printemps"],
    [/\bSUMMER\b/g, "Été"],
    [/\bWINTER\b/g, "Hiver"],
    [/\bHOLIDAY\b/g, "Fêtes"],
    [/\bJAN\b/g, "Nouvel An"],
    [/\bFASHION\b/g, "Mode"],
    [/\bNOEVOLVE\b/g, ""],
    [/\bCOSTUME\b/g, "Costume"],
  ];
  let label = raw.toUpperCase().replace(/_/g, " ");
  for (const [pattern, replacement] of replacements) label = label.replace(pattern, replacement);
  return label
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("fr-FR")
    .replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase("fr-FR"));
}

function sourceLabel(source) {
  const form = sourceForm(source);
  if (form === "normal") return "Forme standard";
  if (form === "alola") return "Forme d’Alola";
  if (form === "galar") return "Forme de Galar";
  if (form === "hisui") return "Forme de Hisui";
  if (form === "paldea") return "Forme de Paldea";
  if (form === "primal") return "Primo-Résurgence";
  if (form === "gigantamax") return "Gigamax";
  if (form === "dynamax") return "Dynamax";
  if (form.startsWith("mega")) return form === "mega" ? "Méga-Évolution" : `Méga ${form.split("-").at(-1).toUpperCase()}`;
  return readableVariantLabel(source?.form);
}

function sourceSearchNames(source) {
  const names = source?.names && typeof source.names === "object" ? Object.values(source.names) : [];
  return [...new Set([source?.name, ...names].map(token).filter(Boolean))];
}

function collectionRegion(source) {
  if (sourceForm(source) === "hisui") return "hisui";
  return token(source?.generation || "unknown");
}

function sourceSupportsType(source, type, variantMode) {
  const kind = sourceKind(source);
  const form = sourceForm(source);
  if (!isReleased(source)) return false;
  if (type === "event") return sourceVariants(source).some(isEventVariant);
  if (type === "mega") return kind === "mega";
  if (type === "dynamax") return kind === "dynamax";
  if (type === "gigantamax") return kind === "gigantamax";
  if (["normal", "lucky", "shadow", "purified"].includes(type)) {
    if (["shadow", "purified"].includes(type) && source?.availability?.shadow !== true) return false;
    if (SPECIALIZED_KINDS.has(kind)) return false;
    if (variantMode === "single") return kind === "pokemon" && ["normal", "base"].includes(form);
    return kind === "pokemon" || kind === "form";
  }
  return false;
}

function shinyIsReleased(source, type, variant = null) {
  if (variant) return Boolean(variant.shinyImage);
  if (["shadow", "purified"].includes(type)) return source?.availability?.shadowShinyReleased === true;
  return source?.availability?.shinyReleased === true;
}

function resolveCollectionAsset(source, { shiny = false, variant = null } = {}) {
  if (variant) return token(shiny ? variant.shinyImage : variant.image) || null;
  const exact = shiny ? source?.goShinyImage : source?.goImage;
  if (exact) return exact;
  const home = shiny ? source?.homeShinyImage : source?.homeImage;
  if (home) return home;
  const shuffle = shiny ? source?.shuffleShinyImage : source?.shuffleImage;
  return token(shuffle) || null;
}

function entryKey({ type, canonicalId, category, sourceVariantId, gender, shiny }) {
  return [
    "collection",
    type,
    canonicalId,
    category,
    sourceVariantId || "base",
    gender || "main",
    shiny ? "shiny" : "standard",
  ].map((value) => encodeURIComponent(token(value))).join(":");
}

function legacyEventAlias(source, variant) {
  return `${source.key}:event:${variant.costume || variant.form || stableVariantId(variant)}`;
}

function makeEntry(source, options, { variant = null, category = null, gender = undefined, variantId = null } = {}) {
  const type = normalizeType(options.type);
  const shiny = Boolean(options.shiny);
  const canonicalId = sourceCanonicalId(source);
  const resolvedCategory = category || sourceCategory(source);
  const resolvedGender = gender === undefined ? variantGender(variant) : gender;
  const sourceVariantId = variantId || (variant ? stableVariantId(variant) : null);
  const asset = resolveCollectionAsset(source, { shiny, variant });
  const labelSource = variant?.costume || variant?.form || null;
  const label = variant ? readableVariantLabel(labelSource || variantKind(variant)) : sourceLabel(source);
  const searchNames = sourceSearchNames(source);
  const legacyAliases = variant
    ? [legacyEventAlias(source, variant)]
    : [source.key].filter(Boolean);
  return {
    key: entryKey({
      type,
      canonicalId,
      category: resolvedCategory,
      sourceVariantId,
      gender: resolvedGender,
      shiny,
    }),
    canonicalId,
    dexId: token(source.dexId).padStart(4, "0"),
    name: token(source.name || canonicalId),
    names: searchNames,
    category: resolvedCategory,
    gender: resolvedGender,
    shiny,
    hundo: Boolean(options.hundo),
    asset,
    sourceEntityId: token(source.key || canonicalId),
    sourceVariantId,
    generation: source.generation ?? null,
    region: collectionRegion(source),
    released: isReleased(source),
    shinyReleased: shinyIsReleased(source, type, variant),
    kind: variant ? variantKind(variant) : sourceKind(source),
    form: token(variant?.form || source.form || "normal"),
    costume: token(variant?.costume) || null,
    label,
    primaryType: source.primaryType || null,
    secondaryType: source.secondaryType || null,
    tone: type === "lucky"
      ? "lucky"
      : type === "shadow"
        ? "shadow"
        : type === "purified"
          ? "purified"
          : ["dynamax", "gigantamax"].includes(resolvedCategory)
            ? "max"
            : resolvedCategory,
    searchText: [
      ...searchNames,
      source.dexId,
      canonicalId,
      source.id,
      source.formId,
      source.form,
      variant?.kind,
      variant?.form,
      variant?.costume,
      resolvedCategory,
      label,
    ].filter(Boolean).join(" ").toLocaleLowerCase("fr-FR"),
    legacyAliases,
  };
}

function buildEventEntries(source, options) {
  const variants = sourceVariants(source).filter(isEventVariant);
  if (normalizeVariantMode(options.variantMode) === "multi") {
    return variants
      .filter((variant) => !options.shiny || shinyIsReleased(source, options.type, variant))
      .map((variant) => makeEntry(source, options, {
        variant,
        category: variantKind(variant) === "costume" ? "costume" : "event",
      }));
  }

  const groups = new Map();
  for (const variant of variants) {
    const identity = eventIdentityId(variant);
    const current = groups.get(identity) || [];
    current.push(variant);
    groups.set(identity, current);
  }
  return [...groups.entries()].flatMap(([identity, group]) => {
    const principal = group.find((variant) => variantGender(variant) !== "female") || group[0];
    if (!principal || (options.shiny && !shinyIsReleased(source, options.type, principal))) return [];
    return [makeEntry(source, options, {
      variant: principal,
      category: variantKind(principal) === "costume" ? "costume" : "event",
      gender: null,
      variantId: identity,
    })];
  });
}

function buildSourceEntries(source, options) {
  const type = normalizeType(options.type);
  if (type === "event") return buildEventEntries(source, options);
  if (options.shiny && !shinyIsReleased(source, type)) return [];

  const variants = sourceVariants(source);
  const hasFemale = variants.some(isGenderVariant);
  const base = makeEntry(source, options, {
    gender: normalizeVariantMode(options.variantMode) === "multi" && hasFemale ? "male" : null,
  });
  const entries = [base];
  if (normalizeVariantMode(options.variantMode) !== "multi" || !["normal", "lucky", "shadow", "purified"].includes(type)) {
    return entries;
  }
  for (const variant of variants.filter(isGenderVariant)) {
    if (options.shiny && !shinyIsReleased(source, type, variant)) continue;
    entries.push(makeEntry(source, options, { variant, category: sourceCategory(source), gender: "female" }));
  }
  return entries;
}

function dexNumber(entry) {
  const value = Number.parseInt(token(entry.dexId).replace(/\D/g, ""), 10);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

function sortCatalog(entries) {
  return [...entries].sort((left, right) =>
    dexNumber(left) - dexNumber(right)
    || token(left.name).localeCompare(token(right.name), "fr")
    || token(left.label).localeCompare(token(right.label), "fr")
    || token(left.gender).localeCompare(token(right.gender), "fr")
    || left.key.localeCompare(right.key));
}

function buildCollectionCatalog(sourceEntries = [], rawOptions = {}) {
  const options = {
    type: normalizeType(rawOptions.type),
    variantMode: normalizeVariantMode(rawOptions.variantMode),
    shiny: Boolean(rawOptions.shiny),
    hundo: Boolean(rawOptions.hundo),
    generation: token(rawOptions.generation || "all"),
    search: token(rawOptions.search).toLocaleLowerCase("fr-FR"),
  };
  const seen = new Set();
  const catalog = [];
  for (const source of sourceEntries) {
    if (!sourceSupportsType(source, options.type, options.variantMode)) continue;
    for (const entry of buildSourceEntries(source, options)) {
      if (!entry.asset) continue;
      if (seen.has(entry.key)) continue;
      seen.add(entry.key);
      catalog.push(entry);
    }
  }
  return sortCatalog(catalog).filter((entry) => {
    const generationMatches = options.generation === "all" || entry.region === options.generation;
    const searchMatches = !options.search || entry.searchText.includes(options.search);
    return generationMatches && searchMatches;
  });
}

function validateCollectionCatalog(catalog = [], options = {}) {
  const diagnostics = [];
  const keys = new Set();
  for (const entry of catalog) {
    const add = (code, detail) => diagnostics.push({ code, key: entry.key, detail });
    if (entry.released !== true) add("COLLECTION_UNRELEASED_ENTRY", "availability.released doit être strictement vrai");
    if (keys.has(entry.key)) add("COLLECTION_DUPLICATE_ENTRY", "clé CollectionEntry dupliquée");
    keys.add(entry.key);
    if (!entry.asset) add("COLLECTION_MISSING_ASSET", "asset exact absent");
    if (entry.shiny && entry.shinyReleased !== true) add("COLLECTION_SHINY_NOT_RELEASED", "entrée shiny sans sortie compatible");
    if (["costume", "event"].includes(entry.category) && !["costume", "event"].includes(entry.kind)) {
      add("COLLECTION_INVALID_EVENT_KIND", `kind ${entry.kind || "absent"}`);
    }
    if (entry.gender && !["male", "female"].includes(entry.gender)) add("COLLECTION_INVALID_GENDER_VARIANT", entry.gender);
    if (!["normal", "form", "regional", "costume", "event", "mega", "primal", "dynamax", "gigantamax"].includes(entry.category)) {
      add("COLLECTION_INVALID_CATEGORY", entry.category);
    }
    if (Boolean(options.shiny) !== Boolean(entry.shiny)) add("COLLECTION_WRONG_ASSET_VARIANT", "mode shiny incohérent");
  }
  return diagnostics;
}

function buildCollectionContractReport(sourceEntries = []) {
  const counts = {};
  const diagnostics = [];
  for (const type of COLLECTION_TYPES) {
    for (const variantMode of ["single", "multi"]) {
      for (const shiny of [false, true]) {
        const options = { type, variantMode, shiny };
        const catalog = buildCollectionCatalog(sourceEntries, options);
        const id = `${type}.${variantMode}.${shiny ? "shiny" : "standard"}`;
        counts[id] = catalog.length;
        diagnostics.push(...validateCollectionCatalog(catalog, options).map((item) => ({ ...item, contract: id })));
      }
    }
  }
  return {
    schemaVersion: COLLECTION_SCHEMA_VERSION,
    counts,
    diagnostics,
    valid: diagnostics.length === 0,
  };
}

function buildCollectionDataStats(sourceEntries = []) {
  const released = sourceEntries.filter(isReleased);
  return {
    shiny: released.filter((source) => source?.availability?.shinyReleased === true).length,
    shadow: released.filter((source) => source?.availability?.shadow === true).length,
    shadowShiny: released.filter((source) => source?.availability?.shadowShinyReleased === true).length,
    dynamax: released.filter((source) => sourceKind(source) === "dynamax").length,
    gigantamax: released.filter((source) => sourceKind(source) === "gigantamax").length,
    mega: released.filter((source) => sourceKind(source) === "mega").length,
    forms: released.filter((source) => sourceKind(source) === "form").length,
    regional: released.filter((source) => REGIONAL_FORMS.has(sourceForm(source))).length,
    event: buildCollectionCatalog(sourceEntries, { type: "event", variantMode: "single" }).length,
  };
}

function migrateCollectionSelections(collection, catalog = []) {
  const oldItems = collection?.items && typeof collection.items === "object" ? collection.items : {};
  const activeKeys = Object.keys(oldItems).filter((key) => oldItems[key]);
  const byKey = new Map(catalog.map((entry) => [entry.key, [entry.key]]));
  for (const entry of catalog) {
    for (const alias of entry.legacyAliases || []) {
      const matches = byKey.get(alias) || [];
      matches.push(entry.key);
      byKey.set(alias, [...new Set(matches)]);
    }
  }
  const items = {};
  const legacyItems = { ...(collection?.legacyItems || {}) };
  let mapped = 0;
  let ambiguous = 0;
  let unmapped = 0;
  for (const key of activeKeys) {
    const matches = byKey.get(key) || [];
    if (!matches.length) {
      legacyItems[key] = true;
      unmapped += 1;
      continue;
    }
    if (matches.length > 1) ambiguous += 1;
    for (const match of matches) items[match] = true;
    mapped += 1;
  }
  return {
    ...collection,
    schemaVersion: COLLECTION_SCHEMA_VERSION,
    items,
    legacyItems,
    migration: {
      migratedAt: new Date().toISOString(),
      existing: activeKeys.length,
      mapped,
      unmapped,
      ambiguous,
    },
  };
}

function mergeSelectedItems(...snapshots) {
  const merged = {};
  for (const snapshot of snapshots) {
    if (!snapshot || typeof snapshot !== "object") continue;
    for (const [key, selected] of Object.entries(snapshot)) {
      if (selected) merged[key] = true;
    }
  }
  return merged;
}

function collectionTimestamp(collection) {
  const value = Date.parse(collection?.updatedAt || collection?.createdAt || "");
  return Number.isFinite(value) ? value : 0;
}

function mergeCollectionSnapshots(storedCollections = [], localCollections = []) {
  const stored = Array.isArray(storedCollections) ? storedCollections : [];
  const local = Array.isArray(localCollections) ? localCollections : [];
  const merged = new Map();
  const order = [];

  function add(collection, source, index) {
    if (!collection || typeof collection !== "object") return;
    const id = token(collection.id);
    const key = id || `${source}:${index}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, collection);
      order.push(key);
      return;
    }
    const preferred = collectionTimestamp(collection) > collectionTimestamp(existing) ? collection : existing;
    merged.set(key, {
      ...preferred,
      id: preferred.id || existing.id || collection.id,
      schemaVersion: Math.max(Number(existing.schemaVersion || 1), Number(collection.schemaVersion || 1)),
      items: mergeSelectedItems(existing.items, collection.items),
      legacyItems: mergeSelectedItems(existing.legacyItems, collection.legacyItems),
    });
  }

  stored.forEach((collection, index) => add(collection, "stored", index));
  local.forEach((collection, index) => add(collection, "local", index));
  return order.map((key) => merged.get(key));
}

module.exports = {
  COLLECTION_SCHEMA_VERSION,
  COLLECTION_TYPES,
  buildCollectionCatalog,
  buildCollectionContractReport,
  buildCollectionDataStats,
  mergeCollectionSnapshots,
  migrateCollectionSelections,
  readableVariantLabel,
  resolveCollectionAsset,
  validateCollectionCatalog,
};
