const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { performance } = require("perf_hooks");
const {
  dataPath,
  isInsideData,
  relativeToApp,
  resolveDataFile,
} = require("../../../src/lib/data-repository");
const { buildCpByLevel } = require("../../../src/lib/pokemon-cp");
const {
  applyCustomRules,
  enabledCustomRules,
} = require("./custom-rules");
const { buildPvpArchitectureAudit } = require("./pvp-architecture-audit");
const { buildAssetArchitectureAudit } = require("./asset-architecture-audit");
const { categoryFromReference, classifyEntity, resolveCanonicalReference } = require("./entity-category");
const { categoryCounts, enrichDiagnostic } = require("./diagnostic-taxonomy");
const { validateAgainstSchema } = require("../../../json-builder/canonical-contract");
const {
  buildCollectionContractReport,
} = require("../../../../../lib/collections/collection-catalog");

const pokemonRoot = dataPath("data", "pokemon");
const pokemonDir = dataPath("data", "pokemon", "normal");
const formsDir = pokemonRoot;
const movesDir = dataPath("data", "moves");
const adventureEffectsDir = dataPath("data", "adventure-effects", "effects");
const adventureEffectsManifestFile = dataPath("data", "adventure-effects", "manifests", "index.json");
const generationsDir = dataPath("data", "reference", "generations");
const assetsDir = dataPath("data", "assets");
const pvpDir = dataPath("data", "pvp");
const typesDir = dataPath("data", "reference", "types");
const weatherDir = dataPath("data", "reference", "weather");
const stickersDir = dataPath("data", "reference", "stickers");
const languages = [
  "English",
  "German",
  "French",
  "Italian",
  "Japanese",
  "Korean",
  "Spanish",
];
const copySuffix = / \d+\.json$/;
const assetFamilies = ["home", "shuffle", "variants", "location-cards"];
const canonicalAssetLabels = {
  home: "Assets Home",
  shuffle: "Assets Shuffle",
  variants: "Assets Variants",
  "location-cards": "Location Cards",
};

function listJsonFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listJsonFiles(entryPath);
    return entry.isFile() &&
      entry.name.endsWith(".json") &&
      !copySuffix.test(entry.name) &&
      entry.name !== "index.json"
      ? [entryPath]
      : [];
  });
}

function listFormJsonFiles() {
  return listJsonFiles(formsDir).filter((file) => !file.startsWith(`${pokemonDir}${path.sep}`));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function readAdventureEffects() {
  if (!fs.existsSync(adventureEffectsDir)) return [];
  return listJsonFiles(adventureEffectsDir).map(readJson).sort((left, right) => String(left.id).localeCompare(String(right.id)));
}

function exactAdventureEffectReference(reference, data, { sourceFile = null, requestedFormId = null } = {}) {
  if (!reference || !data) return false;
  const exactFormId = requestedFormId || data.formId;
  if (reference.pokemonId !== data.id || reference.formId !== data.formId || reference.formId !== exactFormId) return false;
  const category = classifyEntity(data, { sourceFile: sourceFile || reference.pokemonRef }).category;
  if (categoryFromReference(reference.pokemonRef) !== category) return false;
  return !sourceFile || reference.pokemonRef === sourceFile;
}

function adventureEffectsForPokemon(data, effects = readAdventureEffects(), context = {}) {
  const declared = new Set(Array.isArray(data?.adventureEffectRefs) ? data.adventureEffectRefs : []);
  if (!declared.size) return [];
  return effects.filter((effect) => declared.has(effect.id)
    && effect.pokemonRefs?.some((reference) => exactAdventureEffectReference(reference, data, context)));
}

function referencedPokemonPresentation(reference) {
  const file = resolveDataFile(reference?.pokemonRef || "");
  if (!isInsideData(file) || !fs.existsSync(file)) return null;
  const data = readJson(file);
  if (!exactAdventureEffectReference(reference, data, { sourceFile: reference.pokemonRef })) return null;
  const assets = readAssetRecord(data)?.assets || {};
  return {
    pokemonId: data.id,
    formId: data.formId,
    name: data.names?.French || data.names?.English || data.formId,
    image: assets.portrait || assets.image || null,
    candy: assets.candy || null,
  };
}

function excludedPokemonPresentation(effect) {
  const excluded = new Set(effect.effect?.excludedPokedexIds || []);
  if (!excluded.size) return [];
  return listJsonFiles(pokemonRoot)
    .map(readJson)
    .filter((pokemon) => excluded.has(pokemon.id) && pokemon.formId === pokemon.id)
    .map((pokemon) => {
      const assets = readAssetRecord(pokemon)?.assets || {};
      return {
        pokemonId: pokemon.id,
        formId: pokemon.formId,
        name: pokemon.names?.French || pokemon.names?.English || pokemon.id,
        image: assets.portrait || assets.image || null,
      };
    })
    .sort((left, right) => left.pokemonId.localeCompare(right.pokemonId));
}

function adventureEffectPresentation(effect) {
  return {
    ...effect,
    pokemon: (effect.pokemonRefs || []).map(referencedPokemonPresentation).filter(Boolean),
    excludedPokemon: excludedPokemonPresentation(effect),
  };
}

function adventureEffectArchitectureAudit() {
  const effects = readAdventureEffects();
  const issues = [];
  const seenIds = new Set();
  const seenMoves = new Set();
  const moveCatalog = buildMoveCatalog();
  const requiredLocales = ["en", "de", "es", "pt", "fr", "nl"];
  const schemaFile = dataPath("schemas", "adventure-effects", "adventure-effect.schema.json");
  const schema = fs.existsSync(schemaFile) ? readJson(schemaFile) : null;
  const add = (effect, issue, pathName, expected, actual, severity = "error", extra = {}) => issues.push(enrichDiagnostic({
    issue,
    path: `${effect?.id || "adventure-effects"}.${pathName}`,
    expected,
    actual,
    severity,
    ...extra,
  }));
  for (const effect of effects) {
    const schemaIssues = schema ? validateAgainstSchema(effect, schema) : [{ path: "$", message: "Schéma Adventure Effect absent" }];
    for (const issue of schemaIssues) add(effect, "adventure_effect_schema_invalid", issue.path, "schéma canonique valide", issue.message);
    if (schemaIssues.length) continue;
    if (!effect.id || seenIds.has(effect.id)) add(effect, "adventure_effect_id_duplicate", "id", "ID unique", effect.id || "absent");
    seenIds.add(effect.id);
    if (!effect.moveRef || seenMoves.has(effect.moveRef)) add(effect, "adventure_effect_move_duplicate", "moveRef", "Move unique", effect.moveRef || "absent");
    seenMoves.add(effect.moveRef);
    const move = moveCatalog.get(effect.moveRef);
    if (!move) add(effect, "adventure_effect_move_ref_broken", "moveRef", "Move existant", effect.moveRef);
    else if (move.adventureEffectRef !== effect.id) add(effect, "adventure_effect_move_reference_mismatch", "moveRef", effect.id, move.adventureEffectRef || "absent");
    for (const reference of effect.pokemonRefs || []) {
      const file = resolveDataFile(reference.pokemonRef);
      if (!isInsideData(file) || !fs.existsSync(file)) add(effect, "adventure_effect_pokemon_ref_broken", "pokemonRefs", "fichier existant", reference.pokemonRef);
      else {
        const pokemon = readJson(file);
        if (pokemon.id !== reference.pokemonId || pokemon.formId !== reference.formId) add(effect, "adventure_effect_form_reference_mismatch", "pokemonRefs", `${reference.pokemonId}/${reference.formId}`, `${pokemon.id}/${pokemon.formId}`);
        if (!(pokemon.adventureEffectRefs || []).includes(effect.id)) add(effect, "adventure_effect_pokemon_reference_mismatch", "pokemonRefs", effect.id, "référence inverse absente");
      }
    }
    if (!effect.localization?.en?.name) add(effect, "adventure_effect_localization_missing", "localization.en", "nom source anglais", "absent");
    if (!Number.isFinite(effect.cost?.candy?.amount) || effect.cost.candy.amount < 0) add(effect, "adventure_effect_cost_invalid", "cost.candy.amount", "nombre positif", effect.cost?.candy?.amount);
    if (!Number.isFinite(effect.duration?.durationSeconds) || effect.duration.durationSeconds <= 0) add(effect, "adventure_effect_duration_invalid", "duration.durationSeconds", "durée positive", effect.duration?.durationSeconds);
    if (effect.bonusEffects?.status === "NOT_AVAILABLE" && effect.bonusEffects.raw !== null) add(effect, "adventure_effect_raw_state_invalid", "bonusEffects.raw", "null", actualType(effect.bonusEffects.raw));
    if (effect.bonusEffects?.status === "AVAILABLE" && !effect.bonusEffects.raw) add(effect, "adventure_effect_raw_state_invalid", "bonusEffects.raw", "bloc publié", "absent");
    for (const [kind, assetPath] of [["banner", effect.assets?.bannerPath], ["portrait", effect.assets?.portraitPath]]) {
      if (assetPath && (!assetPath.startsWith("AdventureEffect/") || !effect.assets?.[kind]?.endsWith(assetPath))) add(effect, "adventure_effect_asset_ref_invalid", `assets.${kind}`, assetPath, effect.assets?.[kind] || "absent");
    }
  }
  const expectedHash = crypto.createHash("sha256").update(JSON.stringify(effects)).digest("hex");
  const manifest = fs.existsSync(adventureEffectsManifestFile) ? readJson(adventureEffectsManifestFile) : null;
  if (!manifest || manifest.count !== effects.length || manifest.hash !== expectedHash) add(
    null,
    "MANIFEST_STALE",
    "manifest",
    `${effects.length}/${expectedHash}`,
    manifest ? `${manifest.count}/${manifest.hash}` : "absent",
    "warning",
    { classification: "OPERATIONAL_METADATA", fix: "npm run manifests:rebuild" },
  );
  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  return {
    effects: effects.map(adventureEffectPresentation),
    issues,
    summary: {
      valid: errorCount === 0,
      effects: effects.length,
      pokemonLinks: effects.reduce((total, effect) => total + (effect.pokemonRefs?.length || 0), 0),
      moveLinks: new Set(effects.map((effect) => effect.moveRef)).size,
      languages: requiredLocales,
      banners: effects.filter((effect) => effect.assets?.banner).length,
      portraits: effects.filter((effect) => effect.assets?.portrait).length,
      errors: errorCount,
      manifestStale: issues.some((issue) => issue.issue === "MANIFEST_STALE"),
    },
  };
}

function canonicalAssetStem(data) {
  const identity = String(data?.formId || data?.id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${String(data?.dexId || "").padStart(4, "0")}-${identity}`;
}

function canonicalCoreRef(data) {
  return resolveCanonicalReference(data, { family: "core" });
}

function readSafeAssetFile(reference, expectedFamily, formId) {
  if (typeof reference !== "string") return null;
  const file = resolveDataFile(reference);
  const familyRoot = path.join(assetsDir, expectedFamily);
  if (!isInsideData(file) || !file.startsWith(`${familyRoot}${path.sep}`) || !fs.existsSync(file)) return null;
  const record = readJson(file);
  const classification = classifyEntity(record);
  return (!formId || record?.formId === formId) && !classification.ambiguous && categoryFromReference(reference) === classification.category ? record : null;
}

function readAssetRecord(data) {
  const coreRef = data?.assetsRef;
  if (!coreRef || coreRef !== canonicalCoreRef(data)) return null;
  const core = readSafeAssetFile(coreRef, "core", data?.formId);
  return core || null;
}

function readAssetBundle(data, { families = assetFamilies } = {}) {
  const core = readAssetRecord(data);
  if (!core) return null;
  const requested = new Set(families.filter((family) => assetFamilies.includes(family)));
  const documents = {};
  if (core.assetRefs) {
    for (const family of requested) {
      const reference = core.assetRefs[family];
      if (!reference) continue;
      const record = readSafeAssetFile(reference, family, core.formId);
      if (record) documents[family] = record;
    }
  }
  return { core, families: documents };
}

function readPvpRecord(data) {
  const pvpRef = data?.pvpRef;
  if (!pvpRef) return null;
  if (pvpRef !== resolveCanonicalReference(data, { family: "pvp" })) return null;
  const file = resolveDataFile(pvpRef);
  if (!isInsideData(file) || !file.startsWith(pvpDir) || !fs.existsSync(file)) return null;
  const record = readJson(file);
  return record?.identity?.canonicalId === data.formId ? record : null;
}

function buildCanonicalJsonRecords(
  relativeFile,
  sourceData,
  assetBundle,
  pvpSourceData,
) {
  const records = [
    {
      id: "pokemon",
      label: "Pokémon",
      path: relativeFile,
      data: sourceData,
    },
  ];

  if (assetBundle?.core && sourceData.assetsRef) {
    records.push({
      id: "assets-core",
      label: "Assets Core",
      path: sourceData.assetsRef,
      data: assetBundle.core,
    });
  }

  for (const family of assetFamilies) {
    const data = assetBundle?.families?.[family];
    const reference = assetBundle?.core?.assetRefs?.[family];
    if (!data || !reference) continue;
    records.push({
      id: `assets-${family}`,
      label: canonicalAssetLabels[family],
      path: reference,
      data,
    });
  }

  if (pvpSourceData && sourceData.pvpRef) {
    records.push({
      id: "pvp",
      label: "PvP",
      path: sourceData.pvpRef,
      data: pvpSourceData,
    });
  }

  return records;
}

function legacyPvpFromRecord(record) {
  if (!record?.leagues) return null;
  const keys = {
    little: "littleCup",
    great: "greatLeague",
    ultra: "ultraLeague",
    master: "masterLeague",
  };
  return Object.fromEntries(Object.entries(keys).map(([leagueId, legacyKey]) => {
    const league = record.leagues[leagueId];
    if (!league) return [legacyKey, null];
    const primary = league.variants?.find((variant) => variant.variant === "normal") || league.variants?.[0] || null;
    return [legacyKey, {
      tierRank: league.tier ?? null,
      rank1: league.rank1 ?? null,
      rank: primary?.rank ?? null,
      score: primary?.score ?? null,
      rating: primary?.rating ?? null,
      bestMovesets: primary ? {
        fast: primary.bestMoveset?.fast?.moveId || null,
        charged: (primary.bestMoveset?.charged || []).map((move) => move.moveId).filter(Boolean),
      } : league.legacyBestMovesets ?? null,
      status: league.status,
      source: record.source,
      requirements: primary?.requirements || league.requirements || null,
      variants: league.variants || [],
    }];
  }));
}

function normalizeAssetForm(asset) {
  const source = asset && typeof asset === "object" ? asset : {};
  return {
    ...source,
    form: source.form ?? null,
    image: typeof source.image === "string" ? source.image : source.image ?? "",
    shinyImage: source.shinyImage ?? null,
    costume: source.costume ?? null,
    isFemale: source.isFemale === true,
  };
}

function normalizeAssetForms(assetForms) {
  return Array.isArray(assetForms) ? assetForms.map(normalizeAssetForm) : [];
}

function eventAssetIsCostumeOrEvent(asset = {}) {
  if (["costume", "event"].includes(asset.kind)) return true;
  if (asset.kind === "gender") return false;
  return Boolean(asset.costume);
}

function hydrateSourceData(data, { families = assetFamilies, sourceFile = null, requestedFormId = null } = {}) {
  const bundle = readAssetBundle(data, { families });
  const record = bundle?.core || null;
  const familyDocuments = bundle?.families || {};
  const pvpRecord = readPvpRecord(data);
  const separated = Boolean(record?.assetRefs);
  const home = separated ? familyDocuments.home?.home ?? null : record?.assets?.home ?? null;
  const shuffle = separated ? familyDocuments.shuffle?.shuffle ?? null : record?.assets?.shuffle ?? null;
  const locationCards = separated
    ? familyDocuments["location-cards"]?.locationCards ?? []
    : Array.isArray(record?.assets?.locationCards) ? record.assets.locationCards : [];
  const variants = separated
    ? familyDocuments.variants?.variants ?? []
    : record?.assets?.assetForms ?? [];
  const { assets: _legacyEmbeddedAssets, ...withoutEmbeddedAssets } = data;
  return {
    ...withoutEmbeddedAssets,
    ...(pvpRecord ? { pvp: legacyPvpFromRecord(pvpRecord), pvpRecord } : {}),
    assetRefs: record?.assetRefs || {},
    assets: {
      image: record?.assets?.image ?? null,
      shinyImage: record?.assets?.shinyImage ?? null,
      candy: record?.assets?.candy ?? null,
      assetRefs: record?.assetRefs || {},
      home,
      portrait: record?.assets?.portrait ?? null,
      portraitShiny: record?.assets?.portraitShiny ?? null,
      locationCards,
      shuffle,
    },
    assetForms: normalizeAssetForms(variants),
    adventureEffects: adventureEffectsForPokemon(data, readAdventureEffects(), { sourceFile, requestedFormId })
      .map(adventureEffectPresentation),
  };
}

function buildMoveCatalog() {
  const effectByMove = new Map(readAdventureEffects().map((effect) => [effect.moveRef, adventureEffectPresentation(effect)]));
  return new Map(
    listJsonFiles(movesDir).map((file) => {
      const move = readJson(file);
      return [move.id, { ...move, adventureEffect: effectByMove.get(move.id) || null }];
    }),
  );
}

function resolveMoves(value, catalog) {
  const ids = Array.isArray(value)
    ? value
    : value && typeof value === "object"
      ? Object.keys(value)
      : [];
  return Object.fromEntries(
    ids.map((id) => [id, catalog.get(id) || { id }]),
  );
}

function actualType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function releaseMetadataConflicts(
  availability,
  flagName,
  value,
  pathName,
) {
  const conflicts = [];
  const canonical = availability?.[flagName];
  const metadataFields = ["releaseDate", "event", "source", "matchedName"];
  const populated =
    actualType(value) === "object" &&
    metadataFields.some(
      (fieldName) =>
        typeof value[fieldName] === "string" && value[fieldName].trim(),
    );

  if (canonical !== true && populated) {
    conflicts.push({
      path: pathName,
      issue: "release_metadata_conflict",
      expected: `${flagName} à true ou métadonnées vides`,
      actual: `${String(canonical)} avec métadonnées de sortie`,
    });
  }
  if (
    actualType(value) === "object" &&
    typeof value.released === "boolean" &&
    value.released !== (canonical === true)
  ) {
    conflicts.push({
      path: `${pathName}.released`,
      issue: "release_flag_conflict",
      expected: String(canonical === true),
      actual: String(value.released),
    });
  }
  return conflicts;
}

function createValidator() {
  const issues = [];

  function add(pathName, issue, expected, actual, extras = {}) {
    issues.push(enrichDiagnostic({ path: pathName, issue, expected, actual, ...extras }));
  }

  function field(object, key, pathName, type, options = {}) {
    const value = object?.[key];
    if (value === undefined) {
      // Certains champs existent seulement pour une mécanique précise
      // (Méga, Dynamax, assets lourds). optional évite les faux positifs.
      if (options.optional) return undefined;
      add(pathName, "missing", type, "absent");
      return undefined;
    }
    if (value === null && options.nullable) return value;
    if (actualType(value) !== type) {
      add(
        pathName,
        "type",
        options.nullable ? `${type} ou null` : type,
        actualType(value),
      );
      return value;
    }
    if (
      options.nonEmpty &&
      ((type === "string" && value.trim() === "") ||
        Object.keys(value).length === 0)
    ) {
      add(pathName, "empty", "non vide", "vide");
    }
    return value;
  }

  function names(value, pathName) {
    if (actualType(value) !== "object") {
      add(
        pathName,
        value === undefined ? "missing" : "type",
        "objet de traductions",
        actualType(value),
      );
      return;
    }
    for (const language of languages)
      field(value, language, `${pathName}.${language}`, "string", {
        nonEmpty: true,
      });
  }

  function typeBlock(value, pathName, nullable = false) {
    if (value === null && nullable) return;
    if (typeof value === "string" && value.trim()) return;
    add(
      pathName,
      value === undefined ? "missing" : "type",
      nullable ? "identifiant ou null" : "identifiant de type",
      actualType(value),
    );
  }

  function move(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "type", "objet attaque", actualType(value));
      return;
    }
    for (const key of ["id", "slug"])
      field(value, key, `${pathName}.${key}`, "string", { nonEmpty: true });
    for (const key of ["power", "energy", "durationMs"])
      field(value, key, `${pathName}.${key}`, "number");
    typeBlock(value.type, `${pathName}.type`);
    names(value.names, `${pathName}.names`);
    const combat = field(value, "combat", `${pathName}.combat`, "object", {
      nullable: true,
    });
    if (actualType(combat) === "object") {
      for (const key of ["energy", "power", "turns"])
        field(combat, key, `${pathName}.combat.${key}`, "number");
      field(combat, "buffs", `${pathName}.combat.buffs`, "object", {
        nullable: true,
      });
    }
  }

  function moveDictionary(value, pathName, allowEmpty = false) {
    if (Array.isArray(value)) {
      if (!allowEmpty && value.length === 0)
        add(pathName, "empty", "au moins un identifiant d'attaque", "vide");
      value.forEach((moveId, index) => {
        if (typeof moveId !== "string" || moveId.trim() === "")
          add(
            `${pathName}[${index}]`,
            "type",
            "identifiant d'attaque",
            actualType(moveId),
          );
      });
      return;
    }
    if (actualType(value) !== "object") {
      add(
        pathName,
        value === undefined ? "missing" : "type",
        "tableau d'identifiants",
        actualType(value),
      );
      return;
    }
    if (Object.keys(value).length === 0)
      add(pathName, "empty", "objet non vide", "vide");
    for (const [moveId, moveData] of Object.entries(value))
      move(moveData, `${pathName}.${moveId}`);
  }

  function eliteMoves(value, pathName) {
    moveDictionary(value, pathName, true);
  }

  function assets(
    value,
    pathName,
    nullable = false,
    partial = false,
    allowHomeFallback = false,
  ) {
    if (value === null && nullable) return;
    if (actualType(value) !== "object") {
      add(
        pathName,
        value === undefined ? "missing" : "type",
        nullable ? "objet ou null si non sorti" : "objet",
        actualType(value),
      );
      return;
    }
    if (partial && Object.keys(value).length === 0)
      add(pathName, "empty", "objet d'assets non vide", "vide");
    const relaxedAssetFields = nullable && !partial;
    if (
      !partial &&
      !relaxedAssetFields &&
      !(nullable && value.image === undefined && value.shinyImage === undefined)
    ) {
      if (!(allowHomeFallback && value.home?.image))
        field(value, "image", `${pathName}.image`, "string", { nonEmpty: true });
      if (!(allowHomeFallback && value.home?.shinyImage))
        field(value, "shinyImage", `${pathName}.shinyImage`, "string", {
          nonEmpty: true,
        });
    } else {
      if (value.image !== undefined)
        field(value, "image", `${pathName}.image`, "string", {
          nonEmpty: !relaxedAssetFields,
          nullable: relaxedAssetFields,
        });
      if (value.shinyImage !== undefined)
        field(value, "shinyImage", `${pathName}.shinyImage`, "string", {
          nonEmpty: !relaxedAssetFields,
          nullable: relaxedAssetFields,
        });
    }
    if (value.home !== undefined && value.home !== null)
      homeAssets(value.home, `${pathName}.home`);
    if (value.locationCards !== undefined)
      locationCards(value.locationCards, `${pathName}.locationCards`);
    if (value.shuffle !== undefined && value.shuffle !== null)
      shuffleAssets(value.shuffle, `${pathName}.shuffle`);
  }

  function shuffleAssets(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "type", "objet d'assets Pokémon Shuffle", actualType(value));
      return;
    }
    field(value, "source", `${pathName}.source`, "string", { nonEmpty: true });
    const variants = field(value, "variants", `${pathName}.variants`, "array", {
      nonEmpty: true,
    });
    if (!Array.isArray(variants)) return;
    variants.forEach((variant, index) => {
      const variantPath = `${pathName}.variants[${index}]`;
      for (const key of ["id", "filename", "image"])
        field(variant, key, `${variantPath}.${key}`, "string", { nonEmpty: true });
      field(variant, "form", `${variantPath}.form`, "string", { nonEmpty: true });
      field(variant, "state", `${variantPath}.state`, "string", { nonEmpty: true });
      field(variant, "codes", `${variantPath}.codes`, "array");
      field(variant, "tags", `${variantPath}.tags`, "array");
      field(variant, "shiny", `${variantPath}.shiny`, "boolean");
    });
  }

  function locationCards(value, pathName) {
    if (!Array.isArray(value)) {
      add(pathName, "type", "tableau de cartes de lieu", actualType(value));
      return;
    }
    value.forEach((card, index) => {
      const cardPath = `${pathName}[${index}]`;
      if (actualType(card) !== "object") {
        add(cardPath, "type", "objet de carte de lieu", actualType(card));
        return;
      }
      for (const key of ["id", "name", "date", "image", "source"])
        field(card, key, `${cardPath}.${key}`, "string", { nonEmpty: true });
      field(card, "type", `${cardPath}.type`, "string", { nonEmpty: true });
      const eligibleForms = field(
        card,
        "eligibleForms",
        `${cardPath}.eligibleForms`,
        "array",
        { nonEmpty: true },
      );
      if (Array.isArray(eligibleForms))
        eligibleForms.forEach((form, formIndex) => {
          if (actualType(form) !== "string" || !form.trim())
            add(
              `${cardPath}.eligibleForms[${formIndex}]`,
              "type",
              "libellé de forme non vide",
              actualType(form),
            );
        });
      if (!["location", "special"].includes(card.type))
        add(`${cardPath}.type`, "valeur", "location ou special", card.type);
    });
  }

  function homeAssets(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "type", "objet d'assets Pokémon Home", actualType(value));
      return;
    }
    field(value, "source", `${pathName}.source`, "string", { nonEmpty: true });
    field(value, "image", `${pathName}.image`, "string", {
      nonEmpty: true,
      nullable: true,
    });
    field(value, "shinyImage", `${pathName}.shinyImage`, "string", {
      nonEmpty: true,
      nullable: true,
    });
    const variants = field(value, "variants", `${pathName}.variants`, "array");
    if (!Array.isArray(variants)) return;
    variants.forEach((variant, index) => {
      const variantPath = `${pathName}.variants[${index}]`;
      for (const key of ["formIndex", "gender", "genderCode", "detail", "view"])
        field(variant, key, `${variantPath}.${key}`, "string", { nonEmpty: true });
      field(variant, "gigantamax", `${variantPath}.gigantamax`, "boolean");
      if (variant.image !== undefined)
        field(variant, "image", `${variantPath}.image`, "string", { nonEmpty: true });
      if (variant.shinyImage !== undefined)
        field(variant, "shinyImage", `${variantPath}.shinyImage`, "string", {
          nonEmpty: true,
        });
      if (!variant.image && !variant.shinyImage)
        add(variantPath, "missing", "image ou shinyImage", "absent");
    });
  }

  function evolution(value, pathName) {
    field(value, "targetFormId", `${pathName}.targetFormId`, "string", {
      nonEmpty: true,
    });
    field(value, "candies", `${pathName}.candies`, "number");
    field(value, "item", `${pathName}.item`, "object", { nullable: true });
    field(value, "quests", `${pathName}.quests`, "array");
  }

  function shadow(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "type", "objet de données Shadow", actualType(value));
      return;
    }
    field(value, "firstReleaseDate", `${pathName}.firstReleaseDate`, "string", {
      nonEmpty: true,
    });
    field(value, "source", `${pathName}.source`, "string", { nonEmpty: true });
    const validateCost = (cost, costPath) => {
      if (actualType(cost) !== "object") {
        add(costPath, "type", "objet de coût de purification", actualType(cost));
        return;
      }
      for (const key of ["stardust", "candy"])
        field(cost, key, `${costPath}.${key}`, "number");
    };
    const validateCatchCp = (catchCp, cpPath) => {
      if (actualType(catchCp) !== "object") {
        add(cpPath, "type", "objet de Catch CP", actualType(catchCp));
        return;
      }
      for (const key of ["normal", "weatherBoosted"]) {
        const range = field(catchCp, key, `${cpPath}.${key}`, "object");
        if (actualType(range) === "object")
          for (const bound of ["min", "max"])
            field(range, bound, `${cpPath}.${key}.${bound}`, "number");
      }
    };
    validateCost(value.purificationCost, `${pathName}.purificationCost`);
    validateCatchCp(value.catchCp, `${pathName}.catchCp`);
    const variants = field(value, "variants", `${pathName}.variants`, "array", {
      nonEmpty: true,
    });
    if (Array.isArray(variants))
      variants.forEach((variant, index) => {
        const variantPath = `${pathName}.variants[${index}]`;
        for (const key of ["name", "variant", "releaseDate", "releaseDateText"])
          field(variant, key, `${variantPath}.${key}`, "string", { nonEmpty: true });
        if (variant.purificationCost !== undefined)
          validateCost(variant.purificationCost, `${variantPath}.purificationCost`);
        if (variant.catchCp !== undefined)
          validateCatchCp(variant.catchCp, `${variantPath}.catchCp`);
      });
  }

  function releaseRecord(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "missing", "objet de disponibilité datée", actualType(value));
      return;
    }
    for (const key of ["releaseDate", "event", "source", "matchedName"]) {
      field(value, key, `${pathName}.${key}`, "string", { nullable: true });
    }
  }

  function releaseConsistency(availability, flagName, value, pathName) {
    for (const conflict of releaseMetadataConflicts(
      availability,
      flagName,
      value,
      pathName,
    )) {
      add(
        conflict.path,
        conflict.issue,
        conflict.expected,
        conflict.actual,
      );
    }
  }

  function mega(value, pathName) {
    if (actualType(value) !== "object") {
      add(pathName, "type", "objet Méga / Primo", actualType(value));
      return;
    }
    for (const key of ["id", "slug", "formId", "form", "dexId", "baseFormId"])
      field(value, key, `${pathName}.${key}`, "string", { nonEmpty: true });
    field(value, "dexNr", `${pathName}.dexNr`, "number");
    names(value.names, `${pathName}.names`);
    const size = field(value, "size", `${pathName}.size`, "object");
    if (actualType(size) === "object")
      for (const key of ["height", "weight"])
        field(size, key, `${pathName}.size.${key}`, "number");
    for (const key of ["catchRate", "fleeRate"])
      field(value, key, `${pathName}.${key}`, "number");
    field(value, "megaEnergyCost", `${pathName}.megaEnergyCost`, "number", {
      nullable: true,
      optional: true,
    });
    const availability = field(
      value,
      "availability",
      `${pathName}.availability`,
      "object",
    );
    if (actualType(availability) === "object") {
      for (const key of [
        "released",
        "shinyReleased",
        "shadowShinyReleased",
        "tradable",
        "pokemonHomeTransfer",
      ])
        field(availability, key, `${pathName}.availability.${key}`, "boolean");
    }
    releaseRecord(value.shinyAvailability, `${pathName}.shinyAvailability`);
    releaseConsistency(
      availability,
      "shinyReleased",
      value.shinyAvailability,
      `${pathName}.shinyAvailability`,
    );
    releaseRecord(
      value.shadowShinyAvailability,
      `${pathName}.shadowShinyAvailability`,
    );
    releaseConsistency(
      availability,
      "shadowShinyReleased",
      value.shadowShinyAvailability,
      `${pathName}.shadowShinyAvailability`,
    );
    const maxCp = field(value, "maxCp", `${pathName}.maxCp`, "object");
    if (actualType(maxCp) === "object") {
      for (const key of [
        "maxLevel50",
        "maxLevel40",
        "weatherBoostLevel25",
        "raidLevel20",
        "researchLevel15",
      ])
        field(maxCp, key, `${pathName}.maxCp.${key}`, "number");
    }
    const stats = field(value, "stats", `${pathName}.stats`, "object");
    if (actualType(stats) === "object")
      for (const key of ["stamina", "attack", "defense"])
        field(stats, key, `${pathName}.stats.${key}`, "number");
    typeBlock(value.primaryType, `${pathName}.primaryType`);
    typeBlock(value.secondaryType, `${pathName}.secondaryType`, true);
    assets(
      value.assets,
      `${pathName}.assets`,
      value.availability?.released === false,
      false,
      true,
    );
  }

  function maxForm(value, pathName = "") {
    const prefix = pathName ? `${pathName}.` : "";
    for (const key of ["id", "formId", "slug", "dexId", "form", "baseFormId"])
      field(value, key, `${prefix}${key}`, "string", { nonEmpty: true });
    field(value, "dexNr", `${prefix}dexNr`, "number");
    if (!["dynamax", "gigantamax"].includes(value.form))
      add(`${prefix}form`, "value", "dynamax ou gigantamax", value.form);
    if (value.names !== undefined) names(value.names, `${prefix}names`);
    if (value.stats !== undefined) {
      const stats = field(value, "stats", `${prefix}stats`, "object");
      if (actualType(stats) === "object")
        for (const key of ["stamina", "attack", "defense"])
          field(stats, key, `${prefix}stats.${key}`, "number");
    }
    if (value.primaryType !== undefined)
      typeBlock(value.primaryType, `${prefix}primaryType`);
    if (value.secondaryType !== undefined)
      typeBlock(value.secondaryType, `${prefix}secondaryType`, true);

    const maxCp = field(value, "maxCp", `${prefix}maxCp`, "object");
    if (actualType(maxCp) === "object") {
      const allowedMaxCp = new Set([
        "maxLevel50",
        "maxLevel40",
        "weatherBoostLevel25",
        "raidLevel20",
        "maxBattlesLevel20",
        "researchLevel15",
      ]);
      for (const key of Object.keys(maxCp))
        if (!allowedMaxCp.has(key))
          add(
            `${prefix}maxCp.${key}`,
            "unexpected",
            "pattern maxCp complet",
            "champ en trop",
          );
      for (const key of [
        "maxLevel50",
        "maxLevel40",
        "weatherBoostLevel25",
        "raidLevel20",
        "researchLevel15",
      ])
        field(maxCp, key, `${prefix}maxCp.${key}`, "number", {
          nullable: true,
          optional: true,
        });
      field(
        maxCp,
        "maxBattlesLevel20",
        `${prefix}maxCp.maxBattlesLevel20`,
        "number",
        { nullable: true, optional: true },
      );
    }

    const maxBattle = field(value, "maxBattle", `${prefix}maxBattle`, "object");
    if (actualType(maxBattle) === "object") {
      for (const key of Object.keys(maxBattle))
        if (key !== "moves")
          add(
            `${prefix}maxBattle.${key}`,
            "unexpected",
            "uniquement moves",
            "champ en trop",
          );
      moveDictionary(maxBattle.moves, `${prefix}maxBattle.moves`);
    }
    if (value.availability !== undefined) {
      const availability = field(
        value,
        "availability",
        `${prefix}availability`,
        "object",
      );
      if (actualType(availability) === "object")
        for (const [key, flag] of Object.entries(availability))
          if (typeof flag !== "boolean")
            add(
              `${prefix}availability.${key}`,
              "type",
              "boolean",
              actualType(flag),
            );
    }
    releaseRecord(value.shinyAvailability, `${prefix}shinyAvailability`);
    releaseConsistency(
      value.availability,
      "shinyReleased",
      value.shinyAvailability,
      `${prefix}shinyAvailability`,
    );
    releaseRecord(
      value.shadowShinyAvailability,
      `${prefix}shadowShinyAvailability`,
    );
    releaseConsistency(
      value.availability,
      "shadowShinyReleased",
      value.shadowShinyAvailability,
      `${prefix}shadowShinyAvailability`,
    );
    assets(
      value.assets,
      `${prefix}assets`,
      value.availability?.released === false,
      true,
    );
    if (value.form === "dynamax" || value.evolutions !== undefined) {
      const evolutions = field(
        value,
        "evolutions",
        `${prefix}evolutions`,
        "array",
      );
      if (Array.isArray(evolutions))
        evolutions.forEach((item, index) =>
          evolution(item, `${prefix}evolutions[${index}]`),
        );
    }
  }

  function pokemon(value, profile, pathName = "", requireBaseFormId = false) {
    const prefix = pathName ? `${pathName}.` : "";
    const isMaxForm = ["dynamax", "gigantamax"].includes(
      String(value.form || "").toLowerCase(),
    );
    for (const key of ["id", "formId", "slug", "dexId", "form"])
      field(value, key, `${prefix}${key}`, "string", { nonEmpty: true });
    if (requireBaseFormId)
      field(value, "baseFormId", `${prefix}baseFormId`, "string", {
        nonEmpty: true,
      });
    field(value, "dexNr", `${prefix}dexNr`, "number");
    names(value.names, `${prefix}names`);
    field(value, "regionId", `${prefix}regionId`, "string", { nonEmpty: true });
    const size = field(value, "size", `${prefix}size`, "object");
    if (actualType(size) === "object")
      for (const key of ["height", "weight"])
        field(size, key, `${prefix}size.${key}`, "number");
    field(value, "weatherBoost", `${prefix}weatherBoost`, "array", {
      nonEmpty: true,
    });
    for (const key of ["buddyDistance", "catchRate", "fleeRate"])
      field(value, key, `${prefix}${key}`, "number");
    field(value, "megaEnergyReward", `${prefix}megaEnergyReward`, "number", {
      nullable: true,
    });
    field(value, "megaEnergyCost", `${prefix}megaEnergyCost`, "number", {
      nullable: true,
      optional: true,
    });
    for (const [blockName, keys] of [
      ["captureRewards", ["candy", "stardust"]],
      ["secondChargeMoveCost", ["candy", "stardust"]],
      ["stats", ["stamina", "attack", "defense"]],
      [
        "maxCp",
        [
          "maxLevel50",
          "maxLevel40",
          "weatherBoostLevel25",
          "raidLevel20",
          "maxBattlesLevel20",
          "researchLevel15",
        ],
      ],
    ]) {
      const block = field(value, blockName, `${prefix}${blockName}`, "object");
      if (actualType(block) === "object")
        for (const key of keys) {
          if (
            blockName === "maxCp" &&
            key === "maxBattlesLevel20" &&
            block[key] === undefined &&
            !isMaxForm
          ) {
            continue;
          }
          field(block, key, `${prefix}${blockName}.${key}`, "number", {
            nullable: blockName === "maxCp" && key === "maxBattlesLevel20",
            optional:
              blockName === "maxCp" &&
              key === "maxBattlesLevel20" &&
              !isMaxForm,
          });
        }
    }
    const availability = field(
      value,
      "availability",
      `${prefix}availability`,
      "object",
    );
    if (actualType(availability) === "object") {
      for (const key of [
        "released",
        "shinyReleased",
        "shadowShinyReleased",
        "tradable",
        "pokemonHomeTransfer",
        "shadow",
        "dynamax",
        "gigantamax",
        "apex",
      ]) {
        field(availability, key, `${prefix}availability.${key}`, "boolean");
      }
    }
    releaseRecord(value.shinyAvailability, `${prefix}shinyAvailability`);
    releaseConsistency(
      availability,
      "shinyReleased",
      value.shinyAvailability,
      `${prefix}shinyAvailability`,
    );
    releaseRecord(
      value.shadowShinyAvailability,
      `${prefix}shadowShinyAvailability`,
    );
    releaseConsistency(
      availability,
      "shadowShinyReleased",
      value.shadowShinyAvailability,
      `${prefix}shadowShinyAvailability`,
    );
    if (value.shadow !== undefined && value.shadow !== null)
      shadow(value.shadow, `${prefix}shadow`);
    if (value.availability?.shadow === true && (value.shadow === undefined || value.shadow === null))
      add(`${prefix}shadow`, "missing", "données Shadow", "absent");
    if (value.availability?.shadow === false && value.shadow !== undefined && value.shadow !== null)
      add(`${prefix}shadow`, "unexpected", "absent si Shadow non sorti", "présent");
    typeBlock(value.primaryType, `${prefix}primaryType`);
    typeBlock(value.secondaryType, `${prefix}secondaryType`, true);
    field(value, "pokemonClass", `${prefix}pokemonClass`, "string", {
      nullable: true,
    });
    moveDictionary(value.quickMoves, `${prefix}quickMoves`);
    moveDictionary(value.cinematicMoves, `${prefix}cinematicMoves`);
    if (value.eliteQuickMoves === undefined)
      add(`${prefix}eliteQuickMoves`, "missing", "tableau ou objet", "absent");
    else eliteMoves(value.eliteQuickMoves, `${prefix}eliteQuickMoves`);
    if (value.eliteCinematicMoves === undefined)
      add(
        `${prefix}eliteCinematicMoves`,
        "missing",
        "tableau ou objet",
        "absent",
      );
    else eliteMoves(value.eliteCinematicMoves, `${prefix}eliteCinematicMoves`);
    assets(
      value.assets,
      `${prefix}assets`,
      value.availability?.released === false,
    );

    const evolutions = field(
      value,
      "evolutions",
      `${prefix}evolutions`,
      "array",
    );
    if (Array.isArray(evolutions)) {
      if (
        (profile === "base" || profile === "intermediate") &&
        evolutions.length === 0
      ) {
        add(`${prefix}evolutions`, "empty", "au moins une évolution", "vide");
      }
      evolutions.forEach((item, index) =>
        evolution(item, `${prefix}evolutions[${index}]`),
      );
    }

    field(value, "hasMegaEvolution", `${prefix}hasMegaEvolution`, "boolean");
    field(
      value,
      "hasGigantamaxEvolution",
      `${prefix}hasGigantamaxEvolution`,
      "boolean",
    );
    for (const referenceField of ["dynamaxForms", "gigantamaxForms"]) {
      if (value[referenceField] === undefined) continue;
      const released = value.availability?.released !== false;
      const required =
        released &&
        ((referenceField === "dynamaxForms" && value.availability?.dynamax === true) ||
          (referenceField === "gigantamaxForms" && value.hasGigantamaxEvolution === true));
      if (value[referenceField] === null && !required) continue;
      const references = field(
        value,
        referenceField,
        `${prefix}${referenceField}`,
        "array",
        { nonEmpty: required },
      );
      if (Array.isArray(references))
        references.forEach((formId, index) =>
          field(
            references,
            index,
            `${prefix}${referenceField}[${index}]`,
            "string",
            { nonEmpty: true },
          ),
        );
    }
    const regionForms = field(
      value,
      "regionForms",
      `${prefix}regionForms`,
      "array",
    );
    if (actualType(regionForms) === "object") {
      add(
        `${prefix}regionForms`,
        "invalid",
        "tableau de formId, les données vivent dans data/pokemon/<catégorie>",
        "objet imbrique",
      );
    } else if (Array.isArray(regionForms)) {
      regionForms.forEach((formId, index) =>
        field(regionForms, index, `${prefix}regionForms[${index}]`, "string", {
          nonEmpty: true,
        }),
      );
    }
    const megas = field(
      value,
      "megaEvolutions",
      `${prefix}megaEvolutions`,
      "array",
    );
    if (
      value.hasMegaEvolution === true &&
      Array.isArray(megas) &&
      megas.length === 0
    ) {
      add(
        `${prefix}megaEvolutions`,
        "empty",
        "au moins une Méga / Primo",
        "vide",
      );
    }
    if (actualType(megas) === "object") {
      add(
        `${prefix}megaEvolutions`,
        "invalid",
        "tableau de formId, les données Méga vivent dans data/pokemon/mega",
        "objet imbrique",
      );
    } else if (Array.isArray(megas)) {
      megas.forEach((formId, index) =>
        field(megas, index, `${prefix}megaEvolutions[${index}]`, "string", {
          nonEmpty: true,
        }),
      );
    }
    const assetForms = field(
      value,
      "assetForms",
      `${prefix}assetForms`,
      "array",
    );
    if (Array.isArray(assetForms)) {
      assetForms.forEach((asset, index) => {
        const assetPath = `${prefix}assetForms[${index}]`;
        field(asset, "form", `${assetPath}.form`, "string", { nullable: true });
        field(asset, "costume", `${assetPath}.costume`, "string", {
          nullable: true,
        });
        field(asset, "isFemale", `${assetPath}.isFemale`, "boolean");
        field(asset, "image", `${assetPath}.image`, "string", {
          nonEmpty: true,
        });
        field(asset, "shinyImage", `${assetPath}.shinyImage`, "string", {
          nonEmpty: true,
          nullable: true,
        });
      });
    }
  }

  return { add, issues, pokemon, mega, maxForm };
}

function validateSourceData(data, relativeFile = "", kindHint = "", options = {}) {
  const validator = createValidator();
  data = hydrateSourceData(data);
  const category = classifyEntity(data, { sourceFile: relativeFile }).category;
  const kind = kindHint || (
    ["MEGA", "PRIMAL"].includes(category) ? "mega"
      : category === "DYNAMAX" ? "dynamax"
        : category === "GIGANTAMAX" ? "gigantamax"
          : category === "NORMAL" ? "pokemon" : "form"
  );
  if (kind === "mega")
    validator.mega(data, "");
  else if (kind === "dynamax" || kind === "gigantamax")
    validator.maxForm(data, "");
  else validator.pokemon(data, "single", "", kind === "form");
  applyCustomRules(
    data,
    kind,
    validator.add,
    options.customRules || enabledCustomRules(),
    { file: relativeFile },
  );
  for (const issue of validator.issues)
    issue.path = issue.path.replace(/^\./, "");
  const pvpArchitecture = options.pvpArchitecture || buildPvpArchitectureAudit();
  const pvpSourceFile = String(relativeFile).replace(/^data\/(?=data\/)/, "");
  validator.issues.push(
    ...(pvpArchitecture.diagnosticsBySource.get(pvpSourceFile) || []),
  );
  const moveIds = new Set(buildMoveCatalog().keys());
  const formIds = new Set();
  for (const directory of [pokemonRoot]) {
    for (const file of listJsonFiles(directory)) {
      const source = readJson(file);
      for (const value of [source.id, source.formId, source.baseFormId])
        if (value) formIds.add(value);
      for (const form of [
        ...Object.values(source.regionForms || {}),
        ...Object.values(source.megaEvolutions || {}),
      ])
        for (const value of [form.id, form.formId])
          if (value) formIds.add(value);
    }
  }
  validator.issues.push(...referenceIssues(data, moveIds, formIds));
  return validator.issues.map(enrichDiagnostic);
}

function evolutionProfile(data, incomingIds) {
  const hasIncoming = incomingIds.has(data.formId) || incomingIds.has(data.id);
  const hasOutgoing =
    Array.isArray(data.evolutions) && data.evolutions.length > 0;
  if (!hasIncoming && hasOutgoing) return "base";
  if (hasIncoming && hasOutgoing) return "intermediate";
  if (hasIncoming && !hasOutgoing) return "final";
  return "single";
}

function mergedFormAssets(parent, form) {
  const hasOwnHome = Object.prototype.hasOwnProperty.call(form.assets || {}, "home");
  const assets = {
    ...(parent.assets || {}),
    ...(form.assets || {}),
    home: hasOwnHome ? form.assets.home : parent.assets?.home,
  };
  if (form.assets?.shuffle === undefined) delete assets.shuffle;
  return assets;
}

function generationCatalog() {
  return new Map(
    listJsonFiles(generationsDir).map((file) => {
      const generation = readJson(file);
      return [generation.id, generation];
    }),
  );
}

function resolveRegionReference(data, parent = {}, catalog = generationCatalog()) {
  const regionId =
    data.regionId ||
    (typeof data.region === "string" ? data.region : data.region?.id) ||
    parent.regionId ||
    parent.region?.id;
  const region = catalog.get(regionId) || data.region || parent.region;
  return {
    ...data,
    regionId,
    region,
    generation: data.generation || region?.generation || parent.generation,
  };
}

function mergeInheritedForm(parent, form) {
  const isMaxForm = ["dynamax", "gigantamax"].includes(form.form);
  const merged = {
    ...parent,
    ...form,
    formId: form.formId || form.id || parent.formId,
    regionId: form.regionId || parent.regionId,
    availability: {
      ...(parent.availability || {}),
      ...(form.availability || {}),
    },
    stats: form.stats || parent.stats,
    maxCp: isMaxForm
      ? form.maxCp || {}
      : form.maxCp === undefined
        ? parent.maxCp
        : form.maxCp,
    primaryType: form.primaryType || parent.primaryType,
    secondaryType:
      form.secondaryType === undefined ? parent.secondaryType : form.secondaryType,
    pvp: form.pvp === undefined ? parent.pvp : form.pvp,
    pvpRef: form.pvpRef || parent.pvpRef || null,
    pvpRecord: form.pvpRecord || parent.pvpRecord || null,
    assets: mergedFormAssets(parent, form),
  };
  if (!isMaxForm) return merged;
  return {
    ...merged,
    quickMoves: form.quickMoves || [],
    cinematicMoves: form.cinematicMoves || [],
    eliteQuickMoves: form.eliteQuickMoves || [],
    eliteCinematicMoves: form.eliteCinematicMoves || [],
    pvp: form.pvp === undefined ? null : form.pvp,
    evolutions: form.evolutions || [],
    regionForms: form.regionForms || [],
    hasMegaEvolution: false,
    megaEvolutions: [],
    hasGigantamaxEvolution: form.form === "gigantamax",
  };
}

function issueCategory(input) {
  if (input && typeof input === "object" && input.category) return input.category;
  const path = String(
    input && typeof input === "object" ? input.path : input || "",
  ).toLowerCase();
  if (path.includes("asset") || path.includes("image")) return "assets";
  if (path.includes("pvp")) return "pvp";
  if (path.includes("move")) return "moves";
  if (path.includes("evolution") || path.includes("form")) return "forms";
  if (path.includes("name") || path.includes("region")) return "translations";
  if (path.includes("stat") || path.includes("maxcp")) return "stats";
  if (path.includes("size") || path.includes("height") || path.includes("weight"))
    return "size";
  if (
    path.includes("availability") ||
    path.includes("capture") ||
    path.includes("catch") ||
    path.includes("flee") ||
    path.includes("buddy") ||
    path.includes("weather")
  )
    return "gameplay";
  return "structure";
}

function qualitySummary(issues) {
  const actionable = issues.filter((issue) => issue.severity !== "info");
  const categories = [...new Set(actionable.map((issue) => issueCategory(issue)))];
  const missing = actionable.filter((issue) => issue.issue === "missing").length;
  const invalid = actionable.length - missing;
  const score = Math.max(0, Math.round(100 - missing * 3 - invalid * 5));
  return {
    score,
    categories,
    missing,
    invalid,
    priority: actionable.length ? score * 100 - actionable.length : -1,
  };
}

function patchPathParts(pathName) {
  return String(pathName)
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function setPatchValue(target, pathName, value) {
  const parts = patchPathParts(pathName);
  let cursor = target;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    const next = parts[index + 1];
    if (!cursor[part] || typeof cursor[part] !== "object")
      cursor[part] = typeof next === "number" ? [] : {};
    cursor = cursor[part];
  }
  cursor[parts.at(-1)] = value;
}

function suggestedValue(issue, kind = "pokemon") {
  if (issue.suggested !== undefined) return structuredClone(issue.suggested);
  const templates = {
    size: { height: null, weight: null },
    availability:
      kind === "mega"
        ? {
            released: false,
            shinyReleased: false,
            shadowShinyReleased: false,
            tradable: false,
            pokemonHomeTransfer: false,
          }
        : {
            released: false,
            shinyReleased: false,
            shadowShinyReleased: false,
            tradable: false,
            pokemonHomeTransfer: false,
            shadow: false,
            dynamax: false,
            gigantamax: false,
            apex: false,
          },
    maxCp: {
      maxLevel50: null,
      maxLevel40: null,
      ...(kind === "dynamax" || kind === "gigantamax"
        ? { maxBattlesLevel20: null }
        : {
            weatherBoostLevel25: null,
            raidLevel20: null,
            researchLevel15: null,
          }),
    },
    stats: { stamina: null, attack: null, defense: null },
    captureRewards: { candy: null, stardust: null },
    secondChargeMoveCost: { candy: null, stardust: null },
    assets: { image: "", shinyImage: "" },
    regionId: "",
    names: Object.fromEntries(languages.map((language) => [language, ""])),
    maxBattle: { moves: [""] },
    quickMoves: [""],
    cinematicMoves: [""],
    eliteQuickMoves: [],
    eliteCinematicMoves: [],
    evolutions: [
      { targetFormId: "", candies: null, item: null, quests: [] },
    ],
    regionForms: issue.expected.includes("object") ? {} : [],
    megaEvolutions: issue.expected.includes("object") ? {} : [],
    assetForms: [],
    weatherBoost: [""],
    quests: [],
    moves: [""],
    charged: [""],
  };
  const field = issue.path
    .replace(/\[\d+\]/g, "")
    .split(".")
    .filter(Boolean)
    .at(-1);
  if (Object.hasOwn(templates, field))
    return structuredClone(templates[field]);
  if (
    issue.expected.includes("array") ||
    issue.expected.includes("tableau")
  )
    return issue.expected.includes("au moins") ? [""] : [];
  if (issue.expected.includes("boolean")) return false;
  if (issue.expected.includes("number")) return null;
  if (
    issue.expected.includes("string") ||
    issue.expected.includes("identifiant")
  )
    return "";
  if (issue.expected.includes("object") || issue.expected.includes("objet"))
    return {};
  return null;
}

function buildSuggestedPatch(issues, kind = "pokemon") {
  const patch = {};
  for (const issue of [...issues].sort(
    (left, right) =>
      patchPathParts(left.path).length - patchPathParts(right.path).length,
  ))
    setPatchValue(patch, issue.path, suggestedValue(issue, kind));
  return patch;
}

function assetSummary(data) {
  const home = data.assets?.home || {};
  const locationCards = Array.isArray(data.assets?.locationCards)
    ? data.assets.locationCards
    : [];
  const homeVariants = Array.isArray(home.variants) ? home.variants : [];
  const goVariants = Array.isArray(data.assetForms) ? data.assetForms : [];
  const shuffleVariants = Array.isArray(data.assets?.shuffle?.variants)
    ? data.assets.shuffle.variants
    : [];
  const urls = [
    data.assets?.image,
    data.assets?.shinyImage,
    data.assets?.candy?.image,
    home.image,
    home.shinyImage,
    ...goVariants.flatMap((asset) => [asset.image, asset.shinyImage]),
    ...homeVariants.flatMap((asset) => [asset.image, asset.shinyImage]),
    ...shuffleVariants.map((asset) => asset.image),
  ].filter(Boolean);
  return {
    go: Boolean(data.assets?.image),
    goShiny: Boolean(data.assets?.shinyImage),
    candy: data.assets?.candy || null,
    home: Boolean(home.image),
    homeShiny: Boolean(home.shinyImage),
    goVariants: goVariants.length,
    homeVariants: homeVariants.length,
    locationCards: locationCards.length,
    shuffleVariants: shuffleVariants.length,
    femaleVariants: homeVariants.filter((asset) =>
      ["fd", "fo"].includes(asset.genderCode),
    ).length,
    backViews: homeVariants.filter((asset) => asset.view === "back").length,
    duplicateUrls: urls.length - new Set(urls).size,
    incompletePairs: [...goVariants, ...homeVariants].filter(
      (asset) => Boolean(asset.image) !== Boolean(asset.shinyImage),
    ).length,
  };
}

function assetPresentation(data, { includeLocationCards = false } = {}) {
  const home = data.assets?.home || {};
  const homeVariants = Array.isArray(home.variants) ? home.variants : [];
  const shuffleVariants = Array.isArray(data.assets?.shuffle?.variants)
    ? data.assets.shuffle.variants
    : [];
  const homeVariant = homeVariants.find((asset) => asset?.image || asset?.shinyImage);
  const shuffleVariant =
    shuffleVariants.find((asset) => !asset?.shiny && (asset?.image || asset?.shinyImage)) ||
    shuffleVariants.find((asset) => asset?.image || asset?.shinyImage);
  const shuffleShinyVariant = shuffleVariants.find(
    (asset) => asset?.shiny && (asset?.image || asset?.shinyImage),
  );
  const goCollectionVariants = Array.isArray(data.assetForms)
    ? data.assetForms
        .filter((asset) => asset?.image || asset?.shinyImage)
        .map((asset) => ({
          kind: asset.kind || (asset.costume ? "costume" : null),
          gender: asset.gender || (asset.isFemale === true ? "female" : "male"),
          form: asset.form || null,
          costume: asset.costume || null,
          image: asset.image || null,
          shinyImage: asset.shinyImage || null,
          isFemale: Boolean(asset.isFemale),
        }))
    : [];
  const homeGenderVariant = homeVariants.find((asset) =>
    (asset?.gender === "female-difference" || asset?.genderCode === "fd")
    && asset?.view !== "back"
    && asset?.gigantamax !== true
    && (asset?.image || asset?.shinyImage));
  const collectionVariants = goCollectionVariants.some((asset) => asset.kind === "gender" && asset.isFemale)
    || !homeGenderVariant
    ? goCollectionVariants
    : [...goCollectionVariants, {
        kind: "gender",
        gender: "female",
        form: null,
        costume: null,
        image: homeGenderVariant.image || null,
        shinyImage: homeGenderVariant.shinyImage || null,
        isFemale: true,
      }];
  const eventAssets = collectionVariants.filter(eventAssetIsCostumeOrEvent);
  const summary = assetSummary(data);
  return {
    goImage: data.assets?.image || null,
    goShinyImage: data.assets?.shinyImage || null,
    portraitImage: data.assets?.portrait || null,
    portraitShinyImage: data.assets?.portraitShiny || null,
    image: data.assets?.portrait || data.assets?.image || null,
    homeImage: home.image || home.shinyImage || homeVariant?.image || homeVariant?.shinyImage || null,
    shuffleImage: shuffleVariant?.image || shuffleVariant?.shinyImage || null,
    homeShinyImage: home.shinyImage || homeVariant?.shinyImage || null,
    shuffleShinyImage: shuffleShinyVariant?.image || shuffleShinyVariant?.shinyImage || null,
    shinyImage: data.assets?.portraitShiny || data.assets?.shinyImage || null,
    collectionVariants,
    eventAssets,
    assets: includeLocationCards
      ? { ...summary, locationCards: data.assets?.locationCards || [] }
      : summary,
  };
}

function referenceIssues(data, moveIds, formIds) {
  const issues = [];
  const add = (pathName, expected, actual) =>
    issues.push({ path: pathName, issue: "reference", expected, actual });
  if (data.dexId && !/^\d{4}$/.test(data.dexId))
    add("dexId", "identifiant Pokédex sur 4 chiffres", data.dexId);
  if (
    Number.isFinite(data.dexNr) &&
    data.dexId &&
    Number(data.dexId) !== data.dexNr
  )
    add("dexNr", `même numéro que dexId (${Number(data.dexId)})`, data.dexNr);
  for (const block of [
    "quickMoves",
    "cinematicMoves",
    "eliteQuickMoves",
    "eliteCinematicMoves",
  ]) {
    const value = data[block];
    const ids = Array.isArray(value)
      ? value
      : value && typeof value === "object"
        ? Object.keys(value)
        : [];
    ids.forEach((id, index) => {
      if (!moveIds.has(id))
        add(
          `${block}${Array.isArray(value) ? `[${index}]` : `.${id}`}`,
          "identifiant présent dans data/moves",
          id,
        );
    });
  }
  const maxMoves = data.maxBattle?.moves;
  if (Array.isArray(maxMoves))
    maxMoves.forEach((id, index) => {
      if (!moveIds.has(id))
        add(`maxBattle.moves[${index}]`, "identifiant présent dans data/moves", id);
    });
  for (const [index, evolution] of (data.evolutions || []).entries()) {
    const target = evolution.targetFormId || evolution.formId || evolution.id;
    const inheritedTarget = String(target || "").replace(
      /_(DYNAMAX|GIGANTAMAX)$/,
      "",
    );
    if (target && !formIds.has(target) && !formIds.has(inheritedTarget))
      add(
        `evolutions[${index}].targetFormId`,
        "identifiant de forme existant",
        target,
      );
  }
  for (const field of [
    "regionForms",
    "megaEvolutions",
    "dynamaxForms",
    "gigantamaxForms",
  ])
    if (Array.isArray(data[field]))
      data[field].forEach((formId, index) => {
        if (!formIds.has(formId))
          add(`${field}[${index}]`, "identifiant de forme existant", formId);
      });
  return issues;
}

function buildChecklist(customRulesOverride = null, options = {}) {
  const customRules = Array.isArray(customRulesOverride)
    ? customRulesOverride.filter((rule) => rule?.enabled !== false)
    : enabledCustomRules();
  const sources = [];
  for (const file of fs
    .readdirSync(pokemonDir)
    .filter((name) => name.endsWith(".json") && !copySuffix.test(name))
    .sort()
    .map((name) => path.join(pokemonDir, name))) {
    const sourceData = readJson(file);
    sources.push({
      file,
      kind: "pokemon",
      sourceData,
      data: hydrateSourceData(sourceData, { families: ["home", "variants"] }),
    });
  }
  for (const file of listFormJsonFiles().sort()) {
    const sourceData = readJson(file);
    const data = hydrateSourceData(sourceData, { families: ["home", "variants"] });
    const form = String(data.form || "");
    sources.push({
      file,
      kind: form.startsWith("mega") || form === "primal"
        ? "mega"
        : ["dynamax", "gigantamax"].includes(form)
          ? form
          : "form",
      sourceData,
      data,
    });
  }

  const incomingIds = new Set();
  for (const source of sources.filter((source) => source.kind !== "mega")) {
    for (const evolutionData of source.data.evolutions || []) {
      incomingIds.add(evolutionData.targetFormId);
      incomingIds.add(evolutionData.formId);
      incomingIds.add(evolutionData.id);
    }
  }
  const parents = new Map();
  for (const source of sources.filter((source) => source.kind === "pokemon")) {
    parents.set(source.data.id, source.data);
    parents.set(source.data.formId, source.data);
    parents.set(source.data.dexId, source.data);
  }
  const moveIds = new Set(buildMoveCatalog().keys());
  const regions = generationCatalog();
  const pvpArchitecture =
    options.pvpArchitecture || buildPvpArchitectureAudit();
  const formIds = new Set();
  for (const source of sources) {
    for (const value of [source.data.id, source.data.formId, source.data.baseFormId])
      if (value) formIds.add(value);
  }

  return sources.map(({ file, kind, data }) => {
    const validator = createValidator();
    const profile =
      ["mega", "dynamax", "gigantamax"].includes(kind)
        ? kind
        : evolutionProfile(data, incomingIds);
    if (kind === "mega") validator.mega(data, "");
    else if (kind === "dynamax" || kind === "gigantamax")
      validator.maxForm(data, "");
    else validator.pokemon(data, profile, "", kind === "form");
    applyCustomRules(data, kind, validator.add, customRules, {
      file: relativeToApp(file),
      profile,
    });
    for (const issue of validator.issues)
      issue.path = issue.path.replace(/^\./, "");
    validator.issues.push(...referenceIssues(data, moveIds, formIds).map(enrichDiagnostic));
    const pvpSourceFile = relativeToApp(file);
    validator.issues.push(
      ...(pvpArchitecture.diagnosticsBySource.get(pvpSourceFile) || []),
    );
    const parent =
      parents.get(data.baseFormId) ||
      parents.get(data.inherits) ||
      parents.get(data.id) ||
      {};
    const inheritedData =
      kind !== "pokemon"
        ? mergeInheritedForm(parent, data)
        : data;
    const displayData = resolveRegionReference(inheritedData, parent, regions);
    const name =
      displayData.names?.French ||
      displayData.names?.English ||
      displayData.slug ||
      data.id ||
      path.basename(file);
    const quality = qualitySummary(validator.issues);
    const presentedAssets = assetPresentation(displayData);
    return {
      key: `${kind}:${relativeToApp(file)}${
        kind === "mega" ? `#${data.formId || data.id}` : ""
      }`,
      kind,
      profile,
      name,
      names: displayData.names || {},
      id: data.id || null,
      formId: data.formId || data.id || null,
      baseFormId: data.baseFormId || data.id || null,
      dexId: data.dexId || path.basename(file).slice(0, 4),
      generation: displayData.generation || null,
      form: data.form || "normal",
      file: relativeToApp(file),
      assetsRef: data.assetsRef || null,
      assetRefs: data.assetRefs || {},
      pvpRef: data.pvpRef || null,
      ...presentedAssets,
      primaryType:
        typeof displayData.primaryType === "string"
          ? displayData.primaryType
          : displayData.primaryType?.type || null,
      secondaryType:
        typeof displayData.secondaryType === "string"
          ? displayData.secondaryType
          : displayData.secondaryType?.type || null,
      stats: displayData.stats || null,
      maxCp: displayData.maxCp || null,
      megaEnergyCost:
        typeof data.megaEnergyCost === "number" ? data.megaEnergyCost : null,
      buddyDistance: displayData.buddyDistance ?? null,
      secondChargeMoveCost: displayData.secondChargeMoveCost || null,
      availability: displayData.availability || null,
      shinyAvailability: displayData.shinyAvailability || null,
      shadowShinyAvailability: displayData.shadowShinyAvailability || null,
      weatherBoost: displayData.weatherBoost || [],
      adventureEffects: displayData.adventureEffects || [],
      eliteQuickMoves: displayData.eliteQuickMoves || [],
      eliteCinematicMoves: displayData.eliteCinematicMoves || [],
      legacyQuickMoves: displayData.legacyQuickMoves || [],
      legacyCinematicMoves: displayData.legacyCinematicMoves || [],
      pvpLeagues:
        displayData.pvp && typeof displayData.pvp === "object"
          ? Object.entries(displayData.pvp)
              .filter(([, league]) => league !== null)
              .map(([league]) => league)
          : [],
      quickMoveCount:
        data.quickMoves && typeof data.quickMoves === "object"
          ? Object.keys(data.quickMoves).length
          : 0,
      chargedMoveCount:
        data.cinematicMoves && typeof data.cinematicMoves === "object"
          ? Object.keys(data.cinematicMoves).length
          : 0,
      maxMoveCount: Array.isArray(data.maxBattle?.moves)
        ? data.maxBattle.moves.length
        : 0,
      evolutionCount: Array.isArray(data.evolutions)
        ? data.evolutions.length
        : 0,
      complete: validator.issues.every((issue) => issue.severity === "info"),
      issues: validator.issues,
      suggestedPatch: buildSuggestedPatch(validator.issues, kind),
      quality,
      issueCategories: quality.categories,
    };
  });
}

function buildAssetFamilyPatches(families = assetFamilies) {
  const selectedFamilies = [...new Set(families)].filter((family) => assetFamilies.includes(family));
  const sources = [
    ...fs.readdirSync(pokemonDir)
      .filter((name) => name.endsWith(".json") && !copySuffix.test(name))
      .sort()
      .map((name) => ({ file: path.join(pokemonDir, name), kind: "pokemon" })),
    ...listFormJsonFiles().sort().map((file) => ({ file, kind: null })),
  ];
  return sources.map(({ file, kind }) => {
    const sourceData = readJson(file);
    const form = String(sourceData.form || "");
    const resolvedKind = kind || (form.startsWith("mega") || form === "primal"
      ? "mega"
      : ["dynamax", "gigantamax"].includes(form) ? form : "form");
    const data = hydrateSourceData(sourceData, { families: selectedFamilies });
    return {
      key: `${resolvedKind}:${relativeToApp(file)}${resolvedKind === "mega" ? `#${sourceData.formId || sourceData.id}` : ""}`,
      assetRefs: data.assetRefs || {},
      loadedAssetFamilies: selectedFamilies,
      ...assetPresentation(data, { includeLocationCards: selectedFamilies.includes("location-cards") }),
    };
  });
}

function buildCustomRuleCatalogChecklist(customRulesOverride = null) {
  const customRules = Array.isArray(customRulesOverride)
    ? customRulesOverride.filter((rule) => rule?.enabled !== false)
    : enabledCustomRules();
  const sources = [
    ["move", movesDir],
    ["type", typesDir],
    ["weather", weatherDir],
    ["generation", generationsDir],
    ["sticker", stickersDir],
  ].flatMap(([kind, directory]) =>
    fs.existsSync(directory)
      ? listJsonFiles(directory)
          .sort()
          .flatMap((file) => {
            const data = readJson(file);
            if (!Array.isArray(data)) return [{ kind, file, data }];
            return data.map((item, itemIndex) => ({
              kind,
              file,
              data: item,
              itemIndex,
              itemId: item?.id || item?.slug || item?.filename || itemIndex,
            }));
          })
      : [],
  );

  return sources.map(({ kind, file, data, itemIndex, itemId }) => {
    const validator = createValidator();
    applyCustomRules(data, kind, validator.add, customRules, {
      file: relativeToApp(file),
      itemId,
      itemIndex,
    });
    for (const issue of validator.issues)
      issue.path = issue.path.replace(/^\./, "");
    const name =
      data.names?.French ||
      data.names?.English ||
      data.name ||
      data.id ||
      data.slug ||
      path.basename(file);
    const quality = qualitySummary(validator.issues);

    return {
      key: `${kind}:${relativeToApp(file)}${itemId !== undefined ? `#${itemId}` : ""}`,
      kind,
      name,
      file: `${relativeToApp(file)}${itemId !== undefined ? `#${itemId}` : ""}`,
      complete: validator.issues.every((issue) => issue.severity === "info"),
      issues: validator.issues,
      suggestedPatch: buildSuggestedPatch(validator.issues, kind),
      quality,
      issueCategories: quality.categories,
    };
  });
}

function issueCounts(issues) {
  const counts = new Map();
  for (const item of issues) {
    const code = item?.issue || "unknown";
    counts.set(code, (counts.get(code) || 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function measuredMemory() {
  const memory = process.memoryUsage();
  return {
    rssBytes: memory.rss,
    heapTotalBytes: memory.heapTotal,
    heapUsedBytes: memory.heapUsed,
    externalBytes: memory.external,
  };
}

function buildCanonicalEngineReport(customRulesOverride = null, options = {}) {
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const memoryBefore = measuredMemory();
  const pvpArchitecture = options.pvpArchitecture || buildPvpArchitectureAudit();
  const assetArchitecture = options.assetArchitecture || buildAssetArchitectureAudit();
  const adventureEffectArchitecture = options.adventureEffectArchitecture || adventureEffectArchitectureAudit();
  const entries = buildChecklist(customRulesOverride, { pvpArchitecture });
  const collectionCatalog = buildCollectionContractReport(entries);
  const customRuleEntries = buildCustomRuleCatalogChecklist(customRulesOverride);
  const checklistIssues = entries.flatMap((entry) => entry.issues || []);
  const customRuleIssues = customRuleEntries.flatMap((entry) => entry.issues || []);
  const architectureIssues = [...assetArchitecture.issues, ...pvpArchitecture.issues, ...adventureEffectArchitecture.issues];
  const checklistOnlyIssues = checklistIssues.filter((item) => !["assets", "pvp"].includes(item.category));
  const displayedDiagnostics = [...architectureIssues, ...checklistOnlyIssues, ...customRuleIssues].map(enrichDiagnostic);
  const memoryAfter = measuredMemory();
  const durationMs = Number((performance.now() - started).toFixed(3));
  const legitimateAbsences = Object.values(assetArchitecture.summary.legitimateAbsences || {})
    .reduce((total, value) => total + Number(value || 0), 0);
  const leagueStatuses = pvpArchitecture.summary.leagueStatusCounts || {};
  const brokenReferences = architectureIssues.filter((item) => /(?:ref_broken|ref_invalid|reference_mismatch)$/.test(item.issue || "")).length;
  const orphans = architectureIssues.filter((item) => /orphan/.test(item.issue || "")).length;
  const legacyEmbeddedFields = assetArchitecture.summary.legacyEmbeddedFields || {};
  const migrationIncomplete = Number(assetArchitecture.summary.temporaryLegacyRefs || 0)
    + Number(assetArchitecture.summary.legacyMonoliths || 0)
    + Object.values(legacyEmbeddedFields).reduce((total, value) => total + Number(value || 0), 0)
    + Number(pvpArchitecture.summary.legacyEmbeddedBlocks || 0);
  const collectionErrors = collectionCatalog.diagnostics.length;
  const trueErrors = Number(assetArchitecture.summary.errors || 0) + Number(pvpArchitecture.summary.errors || 0) + Number(adventureEffectArchitecture.summary.errors || 0) + collectionErrors;
  const expectedInfoCount = legitimateAbsences
    + Number(leagueStatuses.UNSUPPORTED_FORM || 0)
    + Number(leagueStatuses.NOT_RANKED || 0)
    + Number(leagueStatuses.UNRELEASED || 0)
    + Number(leagueStatuses.FORMAT_EXCLUDED || 0);
  const severityCounts = {
    error: displayedDiagnostics.filter((item) => item.severity === "error").length,
    warning: displayedDiagnostics.filter((item) => item.severity === "warning").length,
    info: expectedInfoCount + displayedDiagnostics.filter((item) => item.severity === "info").length,
  };
  const diagnosticCategories = categoryCounts(displayedDiagnostics);
  const architectureInfo = legitimateAbsences
    + Number(leagueStatuses.UNSUPPORTED_FORM || 0)
    + Number(leagueStatuses.NOT_RANKED || 0)
    + Number(leagueStatuses.FORMAT_EXCLUDED || 0);
  diagnosticCategories.architecture.info += architectureInfo;
  diagnosticCategories.architecture.total += architectureInfo;
  diagnosticCategories["release-metadata"].info += Number(leagueStatuses.UNRELEASED || 0);
  diagnosticCategories["release-metadata"].total += Number(leagueStatuses.UNRELEASED || 0);
  const status = trueErrors || migrationIncomplete
    ? "INVALID"
    : architectureIssues.length || checklistIssues.length || customRuleIssues.length
      ? "VALID_WITH_DIAGNOSTICS"
      : "VALID";

  const report = {
    schemaVersion: 1,
    reportId: "ENGINE-CANONICAL-ARCHITECTURE-001",
    generatedAt: startedAt,
    status,
    architecture: {
      resolver: "family + entityCategory + canonicalFilename",
      categories: ["NORMAL", "ALOLA", "GALAR", "HISUI", "PALDEA", "FORM", "MEGA", "PRIMAL", "DYNAMAX", "GIGANTAMAX"],
      assets: assetArchitecture.summary,
      pvp: pvpArchitecture.summary,
      adventureEffects: adventureEffectArchitecture.summary,
      collectionCatalog: {
        schemaVersion: collectionCatalog.schemaVersion,
        valid: collectionCatalog.valid,
        counts: collectionCatalog.counts,
        diagnostics: collectionCatalog.diagnostics.length,
      },
      legacyRequirements: {
        pokemonPvpEmbedded: Number(pvpArchitecture.summary.legacyEmbeddedBlocks || 0) > 0,
        assetsHomeEmbedded: Number(legacyEmbeddedFields.home || 0) > 0,
        assetsShuffleEmbedded: Number(legacyEmbeddedFields.shuffle || 0) > 0,
        assetsAssetFormsEmbedded: Number(legacyEmbeddedFields.assetForms || 0) > 0,
        assetsLocationCardsEmbedded: Number(legacyEmbeddedFields.locationCards || 0) > 0,
        monolithicAssetFiles: Number(assetArchitecture.summary.legacyMonoliths || 0) > 0,
      },
    },
    coverage: {
      pokemonAndForms: entries.length,
      moves: listJsonFiles(movesDir).length,
      types: listJsonFiles(typesDir).length,
      weather: listJsonFiles(weatherDir).length,
      generations: listJsonFiles(generationsDir).length,
      stickers: listJsonFiles(stickersDir).length,
      assetCore: assetArchitecture.summary.core || 0,
      assetFamilies: assetArchitecture.summary.familyRecords || 0,
      pvpRecords: pvpArchitecture.summary.records || 0,
      adventureEffects: adventureEffectArchitecture.summary.effects || 0,
      customRuleCatalogEntries: customRuleEntries.length,
      collectionCatalogContracts: Object.keys(collectionCatalog.counts).length,
    },
    diagnosticTaxonomy: {
      LEGITIMATE_ABSENCE: { count: legitimateAbsences, blocking: false, category: "architecture", severity: "info" },
      OPTIONAL: { count: 0, blocking: false, category: "schema", severity: "info" },
      UNSUPPORTED_FORM: { count: Number(leagueStatuses.UNSUPPORTED_FORM || 0), blocking: false, category: "architecture", severity: "info" },
      NOT_RANKED: { count: Number(leagueStatuses.NOT_RANKED || 0), blocking: false, category: "architecture", severity: "info" },
      UNRELEASED: { count: Number(leagueStatuses.UNRELEASED || 0), blocking: false, category: "release-metadata", severity: "info" },
      FORMAT_EXCLUDED: { count: Number(leagueStatuses.FORMAT_EXCLUDED || 0), blocking: false, category: "architecture", severity: "info" },
      MAPPING_MISSING: { count: Number(pvpArchitecture.summary.mappingWarnings || 0), blocking: false, category: "pokemon-pvpoke-mapping", severity: "warning" },
      MOVE_MAPPING_MISSING: { count: Number(issueCounts(architectureIssues).pvp_move_mapping_missing || 0), blocking: false, category: "move-mapping", severity: "warning" },
      SOURCE_MISMATCH: { count: Number(issueCounts(architectureIssues).pvp_provider_source_movepool_mismatch || 0), blocking: false, category: "source", severity: "info" },
      BROKEN_REFERENCE: { count: brokenReferences, blocking: true, category: "reference", severity: "error" },
      ORPHAN: { count: orphans, blocking: true, category: "reference", severity: "error" },
      MIGRATION_INCOMPLETE: { count: migrationIncomplete, blocking: true, category: "architecture", severity: "error" },
      VARIANT_DUPLICATES_CANONICAL_ENTITY: { count: Number(issueCounts(architectureIssues).VARIANT_DUPLICATES_CANONICAL_ENTITY || 0), blocking: true, category: "architecture", severity: "error" },
      VARIANT_CANONICAL_CATEGORY_FORBIDDEN: { count: Number(issueCounts(architectureIssues).VARIANT_CANONICAL_CATEGORY_FORBIDDEN || 0), blocking: true, category: "architecture", severity: "error" },
      VARIANT_KIND_MISSING: { count: Number(issueCounts(architectureIssues).VARIANT_KIND_MISSING || 0), blocking: true, category: "schema", severity: "error" },
      VARIANT_KIND_INVALID: { count: Number(issueCounts(architectureIssues).VARIANT_KIND_INVALID || 0), blocking: true, category: "schema", severity: "error" },
      VARIANT_AMBIGUOUS: { count: Number(issueCounts(architectureIssues).VARIANT_AMBIGUOUS || 0), blocking: true, category: "architecture", severity: "error" },
      ERROR: { count: trueErrors, blocking: true, category: "architecture", severity: "error" },
      COLLECTION_UNRELEASED_ENTRY: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_UNRELEASED_ENTRY").length, blocking: true, category: "release-metadata", severity: "error" },
      COLLECTION_DUPLICATE_ENTRY: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_DUPLICATE_ENTRY").length, blocking: true, category: "architecture", severity: "error" },
      COLLECTION_WRONG_ASSET_VARIANT: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_WRONG_ASSET_VARIANT").length, blocking: true, category: "assets", severity: "error" },
      COLLECTION_INVALID_EVENT_KIND: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_INVALID_EVENT_KIND").length, blocking: true, category: "architecture", severity: "error" },
      COLLECTION_INVALID_GENDER_VARIANT: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_INVALID_GENDER_VARIANT").length, blocking: true, category: "architecture", severity: "error" },
      COLLECTION_INVALID_CATEGORY: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_INVALID_CATEGORY").length, blocking: true, category: "architecture", severity: "error" },
      COLLECTION_SHINY_NOT_RELEASED: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_SHINY_NOT_RELEASED").length, blocking: true, category: "release-metadata", severity: "error" },
      COLLECTION_MISSING_ASSET: { count: collectionCatalog.diagnostics.filter((item) => item.code === "COLLECTION_MISSING_ASSET").length, blocking: true, category: "assets", severity: "error" },
    },
    diagnostics: {
      architectureByCode: issueCounts(architectureIssues),
      checklistByCode: issueCounts(checklistIssues),
      customRulesByCode: issueCounts(customRuleIssues),
      architectureErrors: trueErrors,
      architectureWarnings: architectureIssues.filter((item) => item.severity === "warning").length,
      dataQualityFindings: checklistIssues.length,
      customRuleFindings: customRuleIssues.length,
      collectionCatalogByCode: issueCounts(collectionCatalog.diagnostics.map((item) => ({ issue: item.code }))),
      severityCounts,
      categories: diagnosticCategories,
    },
    indexes: {
      strategy: "Map/Set indexes built once per audit",
      pokemonByFormId: entries.length,
      assetReferences: assetArchitecture.summary.references || 0,
      pvpReferences: pvpArchitecture.summary.references || 0,
      moveCatalog: listJsonFiles(movesDir).length,
      adventureEffects: adventureEffectArchitecture.summary.effects || 0,
    },
    performance: {
      durationMs,
      memoryBefore,
      memoryAfter,
      heapDeltaBytes: memoryAfter.heapUsedBytes - memoryBefore.heapUsedBytes,
    },
  };

  return {
    report,
    entries,
    customRuleEntries,
    assetArchitecture,
    pvpArchitecture,
    adventureEffectArchitecture,
  };
}

function detailForKey(key) {
  const separator = key.indexOf(":");
  const kind = key.slice(0, separator);
  const [relativeFile, requestedFormId] = key.slice(separator + 1).split("#");
  const file = resolveDataFile(relativeFile);
  if (!isInsideData(file) || !fs.existsSync(file)) return null;
  const sourceData = readJson(file);
  if (requestedFormId && requestedFormId !== sourceData.formId) return null;
  const assetBundle = readAssetBundle(sourceData);
  const assetSourceData = assetBundle
    ? { ...assetBundle.core, familyDocuments: assetBundle.families }
    : null;
  const pvpSourceData = readPvpRecord(sourceData);
  const canonicalJsonRecords = buildCanonicalJsonRecords(
    relativeFile,
    sourceData,
    assetBundle,
    pvpSourceData,
  );
  let data = hydrateSourceData(sourceData, { sourceFile: relativeFile, requestedFormId });

  if (classifyEntity(sourceData, { sourceFile: relativeFile }).category !== "NORMAL") {
    const parent = fs
      .readdirSync(pokemonDir)
      .filter((name) => name.endsWith(".json") && !copySuffix.test(name))
      .map((name) => hydrateSourceData(readJson(path.join(pokemonDir, name))))
      .find(
        (candidate) =>
          candidate.id === data.baseFormId ||
          candidate.formId === data.baseFormId ||
          candidate.id === data.inherits ||
          candidate.formId === data.inherits ||
          candidate.id === data.id ||
          (candidate.dexId === data.dexId && candidate.slug === data.slug),
      );
    if (parent) data = mergeInheritedForm(parent, data);
  }

  data = resolveRegionReference(data);
  const moveCatalog = buildMoveCatalog();
  const adventureEffects = adventureEffectsForPokemon(sourceData, readAdventureEffects(), {
    sourceFile: relativeFile,
    requestedFormId,
  }).map(adventureEffectPresentation);
  return {
    ...data,
    sourceData,
    assetSourceData,
    assetSourceFile: sourceData.assetsRef || null,
    pvpSourceData,
    pvpSourceFile: sourceData.pvpRef || null,
    canonicalJsonRecords,
    adventureEffects,
    moveDetails: {
      quickMoves: resolveMoves(data.quickMoves, moveCatalog),
      cinematicMoves: resolveMoves(data.cinematicMoves, moveCatalog),
      eliteQuickMoves: resolveMoves(data.eliteQuickMoves, moveCatalog),
      eliteCinematicMoves: resolveMoves(data.eliteCinematicMoves, moveCatalog),
      legacyQuickMoves: resolveMoves(data.legacyQuickMoves, moveCatalog),
      legacyCinematicMoves: resolveMoves(data.legacyCinematicMoves, moveCatalog),
      maxMoves: resolveMoves(data.maxBattle?.moves, moveCatalog),
    },
    cpByLevel: buildCpByLevel(data.stats),
  };
}

module.exports = {
  adventureEffectPresentation,
  adventureEffectArchitectureAudit,
  adventureEffectsForPokemon,
  exactAdventureEffectReference,
  assetFamilies,
  assetPresentation,
  assetSummary,
  buildAssetFamilyPatches,
  buildAssetArchitectureAudit,
  buildCustomRuleCatalogChecklist,
  buildCanonicalEngineReport,
  buildCanonicalJsonRecords,
  buildPvpArchitectureAudit,
  buildSuggestedPatch,
  buildChecklist,
  detailForKey,
  eventAssetIsCostumeOrEvent,
  hydrateSourceData,
  readAssetBundle,
  readAssetRecord,
  issueCategory,
  qualitySummary,
  releaseMetadataConflicts,
  referenceIssues,
  validateSourceData,
};
