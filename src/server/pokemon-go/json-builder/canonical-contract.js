const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const {
  CATEGORY_DIRECTORIES,
  classifyEntity,
  resolveCanonicalReference,
} = require("../apps/checklist/server/entity-category");

const VALUE_STATES = Object.freeze([
  "filled",
  "not-applicable",
  "unknown",
  "not-published",
  "automatic",
]);

const ENTITY_TYPES = Object.freeze({
  normal: { label: "Forme normale", template: "templates/pokemon/exemple.json", category: "NORMAL", form: "normal" },
  alola: { label: "Forme d’Alola", template: "templates/pokemon/exemple-form.json", category: "ALOLA", form: "alola" },
  galar: { label: "Forme de Galar", template: "templates/pokemon/exemple-form.json", category: "GALAR", form: "galar" },
  hisui: { label: "Forme de Hisui", template: "templates/pokemon/exemple-form.json", category: "HISUI", form: "hisui" },
  paldea: { label: "Forme de Paldea", template: "templates/pokemon/exemple-form.json", category: "PALDEA", form: "paldea" },
  form: { label: "Forme spéciale", template: "templates/pokemon/exemple-form.json", category: "FORM", form: null },
  mega: { label: "Méga-Évolution", template: "templates/pokemon/exemple-mega.json", category: "MEGA", form: "mega" },
  primal: { label: "Réversion Primo", template: "templates/pokemon/exemple-primal.json", category: "PRIMAL", form: "primal" },
  dynamax: { label: "Dynamax", template: "templates/pokemon/exemple-dynamax.json", category: "DYNAMAX", form: "dynamax" },
  gigantamax: { label: "Gigamax", template: "templates/pokemon/exemple-gigantamax.json", category: "GIGANTAMAX", form: "gigantamax" },
});

const ASSET_TEMPLATES = Object.freeze({
  core: "templates/assets/exemple.assets.json",
  home: "templates/assets/exemple.home.json",
  shuffle: "templates/assets/exemple.shuffle.json",
  variants: "templates/assets/exemple.variants.json",
  "location-cards": "templates/assets/exemple.location-cards.json",
});

const SCHEMA_PATHS = Object.freeze({
  pokemon: "schemas/pokemon/pokemon.schema.json",
  core: "schemas/assets/pokemon-assets-core.schema.json",
  home: "schemas/assets/pokemon-assets-home.schema.json",
  shuffle: "schemas/assets/pokemon-assets-shuffle.schema.json",
  variants: "schemas/assets/pokemon-assets-variants.schema.json",
  "location-cards": "schemas/assets/pokemon-assets-location-cards.schema.json",
  pvp: "schemas/pvp/pvp-pokemon.schema.json",
});

const PVP_TEMPLATE = "templates/pvp/exemple.pvp.json";
const TEMPLATE_PLACEHOLDER = /(?:À_REMPLIR|EXEMPLE|Example|Beispiel|Esempio|Ejemplo|メガ例|메가예시)/iu;

function builderError(message, code = "JSON_BUILDER_INVALID", status = 400, details = null) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.details = details;
  return error;
}

function readJson(root, relativePath) {
  const absoluteRoot = path.resolve(root);
  const absolute = path.resolve(absoluteRoot, relativePath);
  const relative = path.relative(absoluteRoot, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw builderError("Chemin canonique hors du dépôt.", "JSON_BUILDER_PATH_TRAVERSAL", 400, { relativePath });
  }
  return JSON.parse(fs.readFileSync(absolute, "utf8"));
}

function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function identityToken(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function mergeTemplate(template, input) {
  if (Array.isArray(template)) return Array.isArray(input) ? clone(input) : clone(template);
  if (!template || typeof template !== "object") return input === undefined ? template : clone(input);
  const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const result = {};
  for (const key of Object.keys(template)) result[key] = mergeTemplate(template[key], source[key]);
  return result;
}

function schemaAtPath(schema, dottedPath) {
  let current = schema;
  for (const segment of String(dottedPath || "").split(".").filter(Boolean)) {
    if (current?.$ref) return null;
    if (/^\d+$/.test(segment)) current = current?.items;
    else current = current?.properties?.[segment];
    if (!current) return null;
  }
  return current;
}

function parentSchemaAtPath(schema, dottedPath) {
  const parts = String(dottedPath || "").split(".").filter(Boolean);
  const key = parts.pop();
  return { schema: schemaAtPath(schema, parts.join(".")), key };
}

function setAtPath(target, dottedPath, value) {
  const parts = String(dottedPath || "").split(".").filter(Boolean);
  let current = target;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    if (!current[part] || typeof current[part] !== "object") current[part] = /^\d+$/.test(parts[index + 1]) ? [] : {};
    current = current[part];
  }
  current[parts.at(-1)] = value;
}

function deleteAtPath(target, dottedPath) {
  const parts = String(dottedPath || "").split(".").filter(Boolean);
  let current = target;
  for (const part of parts.slice(0, -1)) {
    if (!current || typeof current !== "object") return;
    current = current[part];
  }
  if (current && typeof current === "object") delete current[parts.at(-1)];
}

function schemaAllowsNull(schema) {
  const types = Array.isArray(schema?.type) ? schema.type : [schema?.type];
  return types.includes("null");
}

function requiredAtPath(rootSchema, dottedPath) {
  const { schema: parent, key } = parentSchemaAtPath(rootSchema, dottedPath);
  return Boolean(parent?.required?.includes(key));
}

function applyValueStates(value, schema, states = {}) {
  const output = clone(value);
  const issues = [];
  for (const [fieldPath, state] of Object.entries(states || {})) {
    if (!VALUE_STATES.includes(state)) {
      issues.push({ level: "blocking", code: "VALUE_STATE_INVALID", path: fieldPath, message: `État inconnu : ${state}.` });
      continue;
    }
    if (state === "filled" || state === "automatic") continue;
    const fieldSchema = schemaAtPath(schema, fieldPath);
    if (!fieldSchema) {
      issues.push({ level: "blocking", code: "FIELD_NOT_IN_SCHEMA", path: fieldPath, message: "Champ absent du schéma canonique." });
      continue;
    }
    if (schemaAllowsNull(fieldSchema)) setAtPath(output, fieldPath, null);
    else if (!requiredAtPath(schema, fieldPath)) deleteAtPath(output, fieldPath);
    else issues.push({
      level: "blocking",
      code: "VALUE_STATE_NOT_REPRESENTABLE",
      path: fieldPath,
      message: `L’état « ${state} » ne peut pas être écrit sans violer le schéma canonique.`,
    });
  }
  return { value: output, issues };
}

function typeMatches(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function resolveSchemaRef(rootSchema, ref) {
  if (!String(ref || "").startsWith("#/$defs/")) return null;
  return rootSchema.$defs?.[String(ref).slice("#/$defs/".length)] || null;
}

function validateAgainstSchema(value, schema, pathLabel = "$", rootSchema = schema, issues = []) {
  const effective = schema?.$ref ? resolveSchemaRef(rootSchema, schema.$ref) : schema;
  if (!effective) {
    issues.push({ level: "blocking", code: "SCHEMA_REF_UNRESOLVED", path: pathLabel, message: `Référence de schéma introuvable : ${schema?.$ref || "inconnue"}.` });
    return issues;
  }
  const allowedTypes = Array.isArray(effective.type) ? effective.type : effective.type ? [effective.type] : [];
  if (allowedTypes.length && !allowedTypes.some((type) => typeMatches(value, type))) {
    issues.push({ level: "blocking", code: "SCHEMA_TYPE", path: pathLabel, message: `Type attendu : ${allowedTypes.join(" | ")}.` });
    return issues;
  }
  if (typeof value === "string" && effective.pattern && !new RegExp(effective.pattern).test(value)) {
    issues.push({ level: "blocking", code: "SCHEMA_PATTERN", path: pathLabel, message: "Valeur non conforme au motif canonique." });
  }
  if (Array.isArray(value) && effective.items) {
    value.forEach((item, index) => validateAgainstSchema(item, effective.items, `${pathLabel}.${index}`, rootSchema, issues));
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const required of effective.required || []) {
      if (!Object.hasOwn(value, required)) issues.push({ level: "blocking", code: "SCHEMA_REQUIRED", path: `${pathLabel}.${required}`, message: "Champ canonique requis." });
    }
    if (effective.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(effective.properties || {}, key)) issues.push({ level: "blocking", code: "SCHEMA_ADDITIONAL_PROPERTY", path: `${pathLabel}.${key}`, message: "Clé non autorisée par le schéma canonique." });
      }
    }
    for (const [key, childSchema] of Object.entries(effective.properties || {})) {
      if (Object.hasOwn(value, key)) validateAgainstSchema(value[key], childSchema, `${pathLabel}.${key}`, rootSchema, issues);
    }
  }
  return issues;
}

function findPlaceholderIssues(value, pathLabel = "$", issues = []) {
  if (typeof value === "string" && TEMPLATE_PLACEHOLDER.test(value)) {
    issues.push({ level: "blocking", code: "TEMPLATE_PLACEHOLDER", path: pathLabel, message: "Valeur d’exemple du template encore présente." });
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => findPlaceholderIssues(item, `${pathLabel}.${index}`, issues));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) findPlaceholderIssues(child, `${pathLabel}.${key}`, issues);
  }
  return issues;
}

function serializeOrdered(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function loadCanonicalContract(root) {
  const pokemonTemplates = Object.fromEntries(
    Object.entries(ENTITY_TYPES).map(([key, config]) => [key, readJson(root, config.template)]),
  );
  const assetTemplates = Object.fromEntries(
    Object.entries(ASSET_TEMPLATES).map(([key, relativePath]) => [key, readJson(root, relativePath)]),
  );
  const schemas = Object.fromEntries(
    Object.entries(SCHEMA_PATHS).map(([key, relativePath]) => [key, readJson(root, relativePath)]),
  );
  return {
    root: path.resolve(root),
    entityTypes: clone(ENTITY_TYPES),
    valueStates: [...VALUE_STATES],
    pokemonTemplates,
    assetTemplates,
    pvpTemplate: readJson(root, PVP_TEMPLATE),
    schemas,
    fingerprint: sha256(JSON.stringify({ pokemonTemplates, assetTemplates, pvp: readJson(root, PVP_TEMPLATE), schemas })),
  };
}

function automatePokemonIdentity(contract, draft) {
  const entityType = String(draft.entityType || "normal");
  const config = ENTITY_TYPES[entityType];
  if (!config) throw builderError("Type d’entité non pris en charge.", "ENTITY_TYPE_INVALID");
  const template = contract.pokemonTemplates[entityType];
  const pokemon = mergeTemplate(template, draft.values || {});
  const dexNr = Number(pokemon.dexNr);
  const dexId = Number.isInteger(dexNr) && dexNr >= 0 ? String(dexNr).padStart(4, "0") : String(pokemon.dexId || "").padStart(4, "0");
  const baseName = pokemon.names?.English || pokemon.names?.French || pokemon.slug || pokemon.baseFormId;
  const baseFormId = identityToken(pokemon.baseFormId || pokemon.id || baseName);
  const customForm = config.form || slugify(pokemon.form);
  const slug = slugify(pokemon.slug || `${baseName}${customForm && customForm !== "normal" ? `-${customForm}` : ""}`);
  let formId = identityToken(pokemon.formId);
  let id = identityToken(pokemon.id);
  if (!formId || TEMPLATE_PLACEHOLDER.test(formId)) formId = entityType === "normal" ? baseFormId : identityToken(slug);
  if (!id || TEMPLATE_PLACEHOLDER.test(id)) id = ["mega", "primal"].includes(entityType) ? formId : baseFormId;

  Object.assign(pokemon, {
    id,
    formId,
    baseFormId,
    form: customForm,
    slug,
    dexNr,
    dexId,
  });
  if (["mega", "primal"].includes(entityType)) pokemon.megaEvolutions = [formId];
  if (entityType === "dynamax") pokemon.dynamaxForms = [formId];
  if (entityType === "gigantamax") {
    pokemon.dynamaxForms = [`${baseFormId}_DYNAMAX`];
    pokemon.gigantamaxForms = [formId];
  }
  pokemon.pvpRef = resolveCanonicalReference(pokemon, { domain: "pvp", category: config.category });
  pokemon.assetsRef = resolveCanonicalReference(pokemon, { family: "core", category: config.category });

  const classification = classifyEntity(pokemon, { isAlternative: entityType === "form" });
  const identityIssues = [];
  if (classification.ambiguous || classification.category !== config.category) {
    identityIssues.push({ level: "blocking", code: "ENTITY_CATEGORY_MISMATCH", path: "$.formId", message: `Catégorie attendue ${config.category}, obtenue ${classification.category || "ambiguë"}.` });
  }
  return { pokemon, config, identityIssues };
}

function identityFields(pokemon) {
  return Object.fromEntries(["id", "formId", "baseFormId", "form", "slug", "dexNr", "dexId"].map((key) => [key, pokemon[key]]));
}

function buildAssetRecord(contract, pokemon, family, input) {
  const template = contract.assetTemplates[family];
  const record = mergeTemplate(template, input || {});
  Object.assign(record, identityFields(pokemon));
  if (family === "core") {
    record.assetRefs = {};
  }
  const category = classifyEntity(pokemon, { isAlternative: pokemon.formId !== pokemon.baseFormId }).category;
  const relativePath = resolveCanonicalReference(pokemon, { family, category });
  return { family, relativePath, record };
}

function buildPvpRecord(contract, pokemon) {
  const record = mergeTemplate(contract.pvpTemplate, {});
  const category = classifyEntity(pokemon, { isAlternative: pokemon.formId !== pokemon.baseFormId }).category;
  const localFile = resolveCanonicalReference(pokemon, { domain: "pokemon", category });
  record.pvpId = pokemon.formId;
  record.pvpRef = pokemon.pvpRef;
  Object.assign(record.identity, {
    canonicalId: pokemon.formId,
    pokemonId: pokemon.id,
    formId: pokemon.formId,
    baseFormId: pokemon.baseFormId,
    form: pokemon.form,
    dexNr: pokemon.dexNr,
    dexId: pokemon.dexId,
    localFile,
  });
  record.mapping.status = pokemon.availability?.released ? "MAPPING_MISSING" : "UNRELEASED";
  for (const league of Object.values(record.leagues || {})) league.status = pokemon.availability?.released ? "SOURCE_MISSING" : "UNRELEASED";
  return { relativePath: pokemon.pvpRef, record };
}

function buildCanonicalFiles(contract, draft) {
  if (!draft || typeof draft !== "object" || Array.isArray(draft) || !draft.values || typeof draft.values !== "object" || Array.isArray(draft.values)) {
    throw builderError("Brouillon JSON Builder invalide.", "JSON_BUILDER_DRAFT_INVALID", 400);
  }
  const { pokemon: automated, config, identityIssues } = automatePokemonIdentity(contract, draft);
  const stateResult = applyValueStates(automated, contract.schemas.pokemon, draft.states);
  const pokemon = stateResult.value;
  const category = classifyEntity(pokemon, { isAlternative: draft.entityType === "form" }).category;
  const pokemonPath = resolveCanonicalReference(pokemon, { domain: "pokemon", category: config.category });
  const issues = [
    ...identityIssues,
    ...stateResult.issues,
    ...validateAgainstSchema(pokemon, contract.schemas.pokemon),
    ...findPlaceholderIssues(pokemon),
  ];
  const assets = [];
  const requestedFamilies = new Set(["core", ...(draft.options?.assetFamilies || [])]);
  for (const family of Object.keys(ASSET_TEMPLATES)) {
    if (!requestedFamilies.has(family)) continue;
    const built = buildAssetRecord(contract, pokemon, family, draft.assets?.[family]);
    const assetStateResult = applyValueStates(built.record, contract.schemas[family], draft.assetStates?.[family]);
    built.record = assetStateResult.value;
    issues.push(...assetStateResult.issues.map((issue) => ({ ...issue, path: `$assets.${family}.${issue.path}` })));
    assets.push(built);
  }
  const core = assets.find((item) => item.family === "core");
  if (core) {
    core.record.assetRefs = Object.fromEntries(
      assets.filter((item) => item.family !== "core").map((item) => [item.family, item.relativePath]),
    );
  }
  for (const asset of assets) {
    issues.push(...validateAgainstSchema(asset.record, contract.schemas[asset.family], `$assets.${asset.family}`));
    issues.push(...findPlaceholderIssues(asset.record, `$assets.${asset.family}`));
  }
  const pvp = buildPvpRecord(contract, pokemon);
  issues.push(...validateAgainstSchema(pvp.record, contract.schemas.pvp, "$pvp"));

  const files = [
    { kind: "pokemon", relativePath: pokemonPath, data: pokemon, content: serializeOrdered(pokemon), mode: "create" },
    ...assets.map((asset) => ({ kind: `assets:${asset.family}`, relativePath: asset.relativePath, data: asset.record, content: serializeOrdered(asset.record), mode: "create" })),
    { kind: "pvp", relativePath: pvp.relativePath, data: pvp.record, content: serializeOrdered(pvp.record), mode: "create" },
  ];
  return {
    category,
    pokemon,
    pokemonPath,
    files,
    issues,
    completeness: {
      blocking: issues.filter((issue) => issue.level === "blocking").length,
      informative: issues.filter((issue) => issue.level !== "blocking").length,
    },
  };
}

module.exports = {
  ASSET_TEMPLATES,
  ENTITY_TYPES,
  PVP_TEMPLATE,
  SCHEMA_PATHS,
  VALUE_STATES,
  applyValueStates,
  automatePokemonIdentity,
  builderError,
  buildCanonicalFiles,
  clone,
  findPlaceholderIssues,
  identityToken,
  loadCanonicalContract,
  mergeTemplate,
  serializeOrdered,
  sha256,
  slugify,
  validateAgainstSchema,
};
