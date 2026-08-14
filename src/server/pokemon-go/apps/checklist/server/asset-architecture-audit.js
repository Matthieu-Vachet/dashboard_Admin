const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  dataPath,
  dataRoot,
  resolveDataFile,
} = require("../../../src/lib/data-repository");
const { CATEGORY_DIRECTORIES, categoryFromReference, classifyEntity, resolveCanonicalReference } = require("./entity-category");
const { enrichDiagnostic } = require("./diagnostic-taxonomy");

const ASSET_FAMILY_FIELDS = Object.freeze({
  home: "home",
  shuffle: "shuffle",
  variants: "variants",
  "location-cards": "locationCards",
});
const IDENTITY_FIELDS = Object.freeze([
  "id",
  "formId",
  "baseFormId",
  "form",
  "slug",
  "dexNr",
  "dexId",
]);
const VARIANT_KINDS = new Set(["gender", "costume", "event"]);
const FORBIDDEN_VARIANT_CATEGORIES = new Set([
  "ALOLA",
  "GALAR",
  "HISUI",
  "PALDEA",
  "MEGA",
  "PRIMAL",
  "DYNAMAX",
  "GIGANTAMAX",
]);

function variantToken(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function expectedVariantKind(variant = {}) {
  if (String(variant.costume || "").trim()) return "costume";
  if (!variant.form && variant.isFemale === true) return "gender";
  if (variant.form) return "event";
  return null;
}

function canonicalVariantMatches(document, variant, candidates = []) {
  if (String(variant.costume || "").trim()) return [];
  if (!variant.form && variant.isFemale === true) return [];
  if (!variant.form) {
    return candidates.filter((candidate) =>
      variantToken(candidate.data.formId || candidate.data.id) === variantToken(document.formId || document.id),
    );
  }
  const form = variantToken(variant.form);
  const base = variantToken(document.baseFormId || document.id);
  const preferred = form.startsWith(`${base}_`) ? form : `${base}_${form}`;
  const scored = candidates.map((candidate) => {
    const formId = variantToken(candidate.data.formId || candidate.data.id);
    const entityForm = variantToken(candidate.data.form);
    let score = 0;
    if (formId === preferred) score = 120;
    else if (formId === form) score = 115;
    else if (entityForm === form) score = 110;
    else if (formId.endsWith(`_${form}`)) score = 100;
    return { candidate, score };
  }).filter(({ score }) => score >= 100);
  if (!scored.length) return [];
  const bestScore = Math.max(...scored.map(({ score }) => score));
  return scored.filter(({ score }) => score === bestScore).map(({ candidate }) => candidate);
}

function listJsonFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listJsonFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
  });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function relativeDataPath(file) {
  return path.relative(dataRoot, file).replace(/\\/g, "/");
}

function isInside(directory, file) {
  const relative = path.relative(directory, file);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function sameIdentityValue(field, left, right) {
  if (field === "slug")
    return String(left || "").toLowerCase() === String(right || "").toLowerCase();
  return left === right;
}

function nonEmptyPayload(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (!value || typeof value !== "object") return false;
  return Object.values(value).some((entry) => {
    if (Array.isArray(entry)) return entry.length > 0;
    if (entry && typeof entry === "object") return Object.keys(entry).length > 0;
    return entry !== null && entry !== "";
  });
}

function collectUrls(value, output = []) {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) output.push(value);
  else if (Array.isArray(value)) value.forEach((entry) => collectUrls(entry, output));
  else if (value && typeof value === "object")
    Object.values(value).forEach((entry) => collectUrls(entry, output));
  return output;
}

function buildAssetArchitectureAudit() {
  const assetsDirectory = dataPath("data", "assets");
  const manifestFile = dataPath("data", "assets", "manifests", "separation-manifest.json");
  const diagnostics = [];
  const diagnosticsByRef = new Map();
  const diagnosticsBySource = new Map();

  function issue({
    sourceFile = null,
    assetRef = null,
    path: pathName,
    code,
    expected,
    actual,
    severity = "error",
  }) {
    const diagnostic = enrichDiagnostic({
      category: "assets",
      severity,
      sourceFile,
      assetRef,
      path: pathName,
      issue: code,
      expected,
      actual,
    });
    diagnostics.push(diagnostic);
    if (assetRef) {
      const values = diagnosticsByRef.get(assetRef) || [];
      values.push(diagnostic);
      diagnosticsByRef.set(assetRef, values);
    }
    if (sourceFile) {
      const values = diagnosticsBySource.get(sourceFile) || [];
      values.push(diagnostic);
      diagnosticsBySource.set(sourceFile, values);
    }
  }

  const requiredDirectories = [
    "core",
    "home",
    "shuffle",
    "variants",
    "location-cards",
    "manifests",
  ];
  for (const directory of requiredDirectories) {
    const absolute = path.join(/*turbopackIgnore: true*/ assetsDirectory, directory);
    if (!fs.existsSync(/*turbopackIgnore: true*/ absolute))
      issue({
        path: `data/assets/${directory}`,
        code: "asset_directory_missing",
        expected: "dossier canonique présent",
        actual: "absent",
      });
  }
  for (const family of ["core", ...Object.keys(ASSET_FAMILY_FIELDS)]) {
    for (const category of Object.values(CATEGORY_DIRECTORIES)) {
      const absolute = path.join(assetsDirectory, family, category);
      if (!fs.existsSync(absolute))
        issue({
          path: `data/assets/${family}/${category}`,
          code: "asset_category_directory_missing",
          expected: "dossier de catégorie canonique présent",
          actual: "absent",
        });
    }
  }
  if (!fs.existsSync(manifestFile))
    issue({
      path: "data/assets/manifests/separation-manifest.json",
      code: "asset_manifest_missing",
      expected: "manifeste de séparation présent",
      actual: "absent",
    });

  if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    return {
      summary: {
        valid: false,
        sources: 0,
        core: 0,
        familyRecords: 0,
        references: 0,
        urls: 0,
        uniqueUrls: 0,
        errors: diagnostics.length,
        warnings: 0,
      },
      issues: diagnostics,
      diagnosticsByRef,
      diagnosticsBySource,
    };
  }

  const sourceFiles = listJsonFiles(dataPath("data", "pokemon")).sort();
  const sources = sourceFiles.map((file) => ({
    file,
    sourceFile: relativeDataPath(file),
    data: readJson(file),
  }));
  for (const source of sources) {
    const classification = classifyEntity(source.data, { sourceFile: source.sourceFile });
    if (classification.ambiguous)
      issue({ sourceFile: source.sourceFile, path: "form", code: "ENTITY_CLASSIFICATION_AMBIGUOUS", expected: "une catégorie canonique unique", actual: classification.signals.join(", ") });
  }
  const sourcesByFormId = new Map();
  const sourcesByDex = new Map();
  for (const source of sources) {
    const formId = source.data.formId || source.data.id;
    const values = sourcesByFormId.get(formId) || [];
    values.push(source);
    sourcesByFormId.set(formId, values);
    const dex = Number(source.data.dexNr);
    const dexSources = sourcesByDex.get(dex) || [];
    dexSources.push(source);
    sourcesByDex.set(dex, dexSources);
  }
  for (const [formId, values] of sourcesByFormId)
    if (values.length > 1)
      values.forEach((source) => issue({
        sourceFile: source.sourceFile,
        path: "formId",
        code: "asset_source_identity_collision",
        expected: "une seule fiche source par formId",
        actual: `${formId} dans ${values.map((value) => value.sourceFile).join(", ")}`,
      }));

  const coreFiles = listJsonFiles(dataPath("data", "assets", "core")).sort();
  const coreRecords = coreFiles.map((file) => ({
    file,
    sourceFile: relativeDataPath(file),
    data: readJson(file),
  }));
  const legacyEmbeddedFields = {
    home: 0,
    shuffle: 0,
    assetForms: 0,
    locationCards: 0,
  };
  for (const { data } of coreRecords) {
    if (data.assets?.home != null) legacyEmbeddedFields.home += 1;
    if (data.assets?.shuffle != null) legacyEmbeddedFields.shuffle += 1;
    if (Array.isArray(data.assets?.assetForms) && data.assets.assetForms.length) legacyEmbeddedFields.assetForms += 1;
    if (Array.isArray(data.assets?.locationCards) && data.assets.locationCards.length) legacyEmbeddedFields.locationCards += 1;
  }
  const coreByFormId = new Map();
  for (const core of coreRecords) {
    const classification = classifyEntity(core.data);
    const coreRef = relativeDataPath(core.file);
    if (classification.ambiguous)
      issue({ assetRef: coreRef, path: "form", code: "ENTITY_CLASSIFICATION_AMBIGUOUS", expected: "une catégorie canonique unique", actual: classification.signals.join(", ") });
    else if (categoryFromReference(coreRef) !== classification.category)
      issue({ assetRef: coreRef, path: "category", code: "ASSET_WRONG_CATEGORY_DIRECTORY", expected: classification.directory, actual: coreRef.split("/")[2] || "absent" });
    const values = coreByFormId.get(core.data.formId) || [];
    values.push(core);
    coreByFormId.set(core.data.formId, values);
  }
  for (const [formId, values] of coreByFormId)
    if (!formId || values.length > 1)
      values.forEach((core) => issue({
        assetRef: core.sourceFile,
        path: "formId",
        code: "asset_core_identity_collision",
        expected: "formId core présent et unique",
        actual: formId ? `${values.length} occurrences` : "absent",
      }));

  const familyRecords = [];
  const familyCounts = {};
  for (const [family, field] of Object.entries(ASSET_FAMILY_FIELDS)) {
    const files = listJsonFiles(dataPath("data", "assets", family)).sort();
    familyCounts[family] = files.length;
    for (const file of files) {
      const data = readJson(file);
      const assetRef = relativeDataPath(file);
      familyRecords.push({ family, field, file, assetRef, data });
      const classification = classifyEntity(data);
      if (classification.ambiguous)
        issue({ assetRef, path: "form", code: "ENTITY_CLASSIFICATION_AMBIGUOUS", expected: "une catégorie canonique unique", actual: classification.signals.join(", ") });
      else if (categoryFromReference(assetRef) !== classification.category)
        issue({ assetRef, path: "category", code: "ASSET_WRONG_CATEGORY_DIRECTORY", expected: classification.directory, actual: assetRef.split("/")[2] || "absent" });
      if (!nonEmptyPayload(data[field]))
        issue({
          assetRef,
          path: field,
          code: "asset_family_empty",
          expected: "famille secondaire non vide",
          actual: data[field] == null ? "absente" : "vide",
        });
      if (family === "variants") {
        if (data.schemaVersion !== 2)
          issue({ assetRef, path: "schemaVersion", code: "VARIANT_KIND_INVALID", expected: 2, actual: data.schemaVersion ?? "absent" });
        for (const [index, variant] of (Array.isArray(data.variants) ? data.variants : []).entries()) {
          const variantPath = `variants[${index}]`;
          const expectedKind = expectedVariantKind(variant);
          if (!Object.hasOwn(variant, "kind"))
            issue({ assetRef, path: `${variantPath}.kind`, code: "VARIANT_KIND_MISSING", expected: expectedKind || [...VARIANT_KINDS].join(" | "), actual: "absent" });
          else if (!VARIANT_KINDS.has(variant.kind) || !expectedKind || variant.kind !== expectedKind)
            issue({ assetRef, path: `${variantPath}.kind`, code: "VARIANT_KIND_INVALID", expected: expectedKind || [...VARIANT_KINDS].join(" | "), actual: variant.kind });
          const expectedGender = variant.isFemale === true ? "female" : "male";
          if (variant.gender !== expectedGender)
            issue({ assetRef, path: `${variantPath}.gender`, code: "VARIANT_KIND_INVALID", expected: expectedGender, actual: variant.gender ?? "absent" });

          const matches = canonicalVariantMatches(data, variant, sourcesByDex.get(Number(data.dexNr)) || []);
          if (matches.length > 1)
            issue({ assetRef, path: variantPath, code: "VARIANT_AMBIGUOUS", expected: "une identité canonique unique", actual: matches.map(({ sourceFile }) => sourceFile).join(", ") });
          if (matches.length === 1) {
            const target = matches[0];
            const category = classifyEntity(target.data, { sourceFile: target.sourceFile }).category;
            issue({ assetRef, path: variantPath, code: "VARIANT_DUPLICATES_CANONICAL_ENTITY", expected: "variante secondaire uniquement", actual: target.sourceFile });
            if (FORBIDDEN_VARIANT_CATEGORIES.has(category))
              issue({ assetRef, path: variantPath, code: "VARIANT_CANONICAL_CATEGORY_FORBIDDEN", expected: "gender | costume | event", actual: category });
          }
        }
      }
    }
  }

  const canonicalFiles = [...coreRecords.map((record) => record.file), ...familyRecords.map((record) => record.file)];
  const canonicalPaths = new Set(canonicalFiles.map((file) => relativeDataPath(file)));
  const referencesByPath = new Map();
  const legitimateAbsences = Object.fromEntries(Object.keys(ASSET_FAMILY_FIELDS).map((family) => [family, 0]));
  let temporaryLegacyRefs = 0;

  for (const source of sources) {
    const formId = source.data.formId || source.data.id;
    const classification = classifyEntity(source.data, { sourceFile: source.sourceFile });
    if (classification.ambiguous) continue;
    const canonicalCoreRef = resolveCanonicalReference(source.data, { family: "core", sourceFile: source.sourceFile });
    const core = coreByFormId.get(formId)?.[0] || null;
    const embeddedAssetFields = ["image", "shinyImage", "candy", "colors"]
      .filter((field) => Object.hasOwn(source.data.assets || {}, field));
    if (embeddedAssetFields.length)
      issue({
        sourceFile: source.sourceFile,
        path: "assets",
        code: "LEGACY_EMBEDDED_ASSET_DUPLICATE",
        expected: "assetsRef racine uniquement",
        actual: embeddedAssetFields.join(", "),
        severity: "warning",
      });
    const pokemonAssetsRef = source.data.assetsRef;
    if (typeof pokemonAssetsRef !== "string" || !pokemonAssetsRef) {
      issue({
        sourceFile: source.sourceFile,
        path: "assetsRef",
        code: "assets_ref_missing",
        expected: canonicalCoreRef,
        actual: "absent",
      });
    } else {
      const resolved = resolveDataFile(pokemonAssetsRef);
      if (!isInside(assetsDirectory, resolved) || !fs.existsSync(resolved))
        issue({
          sourceFile: source.sourceFile,
          assetRef: pokemonAssetsRef,
          path: "assetsRef",
          code: "assets_ref_broken",
          expected: "référence existante sous data/assets",
          actual: pokemonAssetsRef,
        });
      if (pokemonAssetsRef !== canonicalCoreRef) temporaryLegacyRefs += 1;
      if (categoryFromReference(pokemonAssetsRef) !== classification.category)
        issue({ sourceFile: source.sourceFile, assetRef: pokemonAssetsRef, path: "assetsRef", code: "REFERENCE_CATEGORY_MISMATCH", expected: classification.category, actual: categoryFromReference(pokemonAssetsRef) || "absent" });
    }
    if (!core) {
      issue({
        sourceFile: source.sourceFile,
        assetRef: canonicalCoreRef,
        path: "assetsRef",
        code: "asset_core_missing",
        expected: "fiche core canonique existante",
        actual: "absente",
      });
      continue;
    }
    const coreClassification = classifyEntity(core.data);
    if (!coreClassification.ambiguous && coreClassification.category !== classification.category)
      issue({
        sourceFile: source.sourceFile,
        assetRef: canonicalCoreRef,
        path: "entityCategory",
        code: "ENTITY_CATEGORY_MISMATCH",
        expected: classification.category,
        actual: coreClassification.category,
      });
    if (relativeDataPath(core.file) !== canonicalCoreRef)
      issue({
        sourceFile: source.sourceFile,
        assetRef: relativeDataPath(core.file),
        path: "assetsRef",
        code: "asset_core_path_mismatch",
        expected: canonicalCoreRef,
        actual: relativeDataPath(core.file),
      });
    for (const field of IDENTITY_FIELDS)
      if (!sameIdentityValue(field, core.data[field], source.data[field]))
        issue({
          sourceFile: source.sourceFile,
          assetRef: canonicalCoreRef,
          path: field,
          code: "asset_core_identity_mismatch",
          expected: source.data[field] ?? "absent",
          actual: core.data[field] ?? "absent",
        });

    const refs = core.data.assetRefs || {};
    for (const unknownFamily of Object.keys(refs).filter((family) => !ASSET_FAMILY_FIELDS[family]))
      issue({
        sourceFile: source.sourceFile,
        assetRef: canonicalCoreRef,
        path: `assetRefs.${unknownFamily}`,
        code: "asset_family_unknown",
        expected: Object.keys(ASSET_FAMILY_FIELDS).join(" | "),
        actual: unknownFamily,
      });
    for (const family of Object.keys(ASSET_FAMILY_FIELDS)) {
      const reference = refs[family];
      if (!reference) {
        legitimateAbsences[family] += 1;
        continue;
      }
      const expectedRef = resolveCanonicalReference(source.data, { family, sourceFile: source.sourceFile });
      if (reference !== expectedRef)
        issue({
          sourceFile: source.sourceFile,
          assetRef: reference,
          path: `assetRefs.${family}`,
          code: "asset_family_path_mismatch",
          expected: expectedRef,
          actual: reference,
        });
      if (categoryFromReference(reference) !== classification.category)
        issue({ sourceFile: source.sourceFile, assetRef: reference, path: `assetRefs.${family}`, code: "REFERENCE_CATEGORY_MISMATCH", expected: classification.category, actual: categoryFromReference(reference) || "absent" });
      const linkedSources = referencesByPath.get(reference) || [];
      linkedSources.push(source.sourceFile);
      referencesByPath.set(reference, linkedSources);
      const resolved = resolveDataFile(reference);
      if (!isInside(path.join(assetsDirectory, family), resolved) || !fs.existsSync(resolved)) {
        issue({
          sourceFile: source.sourceFile,
          assetRef: reference,
          path: `assetRefs.${family}`,
          code: "asset_family_ref_broken",
          expected: `fichier existant sous data/assets/${family}`,
          actual: reference,
        });
        continue;
      }
      const record = readJson(resolved);
      const recordClassification = classifyEntity(record);
      if (!recordClassification.ambiguous && recordClassification.category !== classification.category)
        issue({
          sourceFile: source.sourceFile,
          assetRef: reference,
          path: "entityCategory",
          code: "ENTITY_CATEGORY_MISMATCH",
          expected: classification.category,
          actual: recordClassification.category,
        });
      for (const field of IDENTITY_FIELDS)
        if (!sameIdentityValue(field, record[field], core.data[field]))
          issue({
            sourceFile: source.sourceFile,
            assetRef: reference,
            path: field,
            code: "asset_family_identity_mismatch",
            expected: core.data[field] ?? "absent",
            actual: record[field] ?? "absent",
          });
    }
  }

  for (const [reference, owners] of referencesByPath)
    if (owners.length > 1)
      issue({
        assetRef: reference,
        path: "assetRefs",
        code: "asset_ref_collision",
        expected: "une seule identité par référence",
        actual: owners.join(", "),
      });
  for (const record of familyRecords)
    if (!referencesByPath.has(record.assetRef))
      issue({
        assetRef: record.assetRef,
        path: "assetRefs",
        code: "asset_family_orphan",
        expected: "référence depuis une fiche core",
        actual: "aucun propriétaire",
      });

  const manifest = readJson(manifestFile);
  const manifestEntries = Array.isArray(manifest.files) ? manifest.files : [];
  const manifestByPath = new Map();
  for (const entry of manifestEntries) {
    const values = manifestByPath.get(entry?.path) || [];
    values.push(entry);
    manifestByPath.set(entry?.path, values);
  }
  for (const [manifestPath, entries] of manifestByPath)
    if (!manifestPath || entries.length > 1)
      issue({
        assetRef: manifestPath || null,
        path: "data/assets/manifests/separation-manifest.json.files",
        code: "asset_manifest_path_collision",
        expected: "chemin présent et unique",
        actual: manifestPath ? `${entries.length} occurrences` : "chemin absent",
      });
  for (const filePath of canonicalPaths) {
    const entry = manifestByPath.get(filePath)?.[0];
    const file = resolveDataFile(filePath);
    if (!entry) {
      issue({
        assetRef: filePath,
        path: "data/assets/manifests/separation-manifest.json.files",
        code: "asset_manifest_entry_missing",
        expected: "entrée de manifeste",
        actual: "absente",
      });
      continue;
    }
    const bytes = fs.statSync(file).size;
    if (entry.bytes !== bytes)
      issue({
        assetRef: filePath,
        path: "bytes",
        code: "asset_manifest_bytes_mismatch",
        expected: bytes,
        actual: entry.bytes,
      });
    const digest = sha256(file);
    if (entry.sha256 !== digest)
      issue({
        assetRef: filePath,
        path: "sha256",
        code: "asset_manifest_hash_mismatch",
        expected: digest,
        actual: entry.sha256,
      });
  }
  for (const manifestPath of manifestByPath.keys())
    if (manifestPath && !canonicalPaths.has(manifestPath))
      issue({
        assetRef: manifestPath,
        path: "data/assets/manifests/separation-manifest.json.files",
        code: "asset_manifest_orphan",
        expected: "fichier canonique existant",
        actual: "entrée sans fichier canonique",
      });

  const actualCounts = { core: coreFiles.length, ...familyCounts };
  for (const [family, count] of Object.entries(actualCounts))
    if (manifest.totals?.[family] !== count)
      issue({
        path: `data/assets/manifests/separation-manifest.json.totals.${family}`,
        code: "asset_manifest_count_mismatch",
        expected: count,
        actual: manifest.totals?.[family] ?? "absent",
      });
  const categorizedFiles = { core: coreRecords, ...Object.fromEntries(Object.keys(ASSET_FAMILY_FIELDS).map((family) => [family, familyRecords.filter((record) => record.family === family)])) };
  for (const [family, records] of Object.entries(categorizedFiles))
    for (const [category, directory] of Object.entries(CATEGORY_DIRECTORIES)) {
      const count = records.filter((record) => categoryFromReference(relativeDataPath(record.file)) === category).length;
      if (manifest.counts?.[family]?.[directory] !== count)
        issue({ path: `data/assets/manifests/separation-manifest.json.counts.${family}.${directory}`, code: "asset_manifest_category_count_mismatch", expected: count, actual: manifest.counts?.[family]?.[directory] ?? "absent" });
    }
  if (manifestEntries.length !== canonicalFiles.length)
    issue({
      path: "data/assets/manifests/separation-manifest.json.files",
      code: "asset_manifest_total_mismatch",
      expected: canonicalFiles.length,
      actual: manifestEntries.length,
    });

  const urls = canonicalFiles.flatMap((file) => collectUrls(readJson(file)));
  for (const url of new Set(urls)) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") throw new Error("protocol");
    } catch {
      issue({
        path: "url",
        code: "asset_url_invalid",
        expected: "URL HTTPS absolue",
        actual: url,
      });
    }
  }

  const legacyFiles = fs.existsSync(assetsDirectory)
    ? fs.readdirSync(assetsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !requiredDirectories.includes(entry.name))
        .flatMap((entry) => listJsonFiles(path.join(assetsDirectory, entry.name)))
    : [];
  if (temporaryLegacyRefs || legacyFiles.length)
    issue({
      path: "assetsRef",
      code: "asset_legacy_transition_retained",
      expected: "références temporaires retirées au lot de finalisation",
      actual: `${temporaryLegacyRefs} référence(s), ${legacyFiles.length} monolithe(s)`,
      severity: "warning",
    });

  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === "error").length;
  const warnings = diagnostics.length - errors;
  return {
    summary: {
      valid: errors === 0,
      sources: sources.length,
      core: coreFiles.length,
      familyRecords: familyRecords.length,
      references: referencesByPath.size,
      manifestRecords: manifestEntries.length,
      counts: actualCounts,
      categoryCounts: manifest.counts || {},
      legitimateAbsences,
      urls: urls.length,
      uniqueUrls: new Set(urls).size,
      temporaryLegacyRefs,
      legacyMonoliths: legacyFiles.length,
      legacyEmbeddedFields,
      errors,
      warnings,
      aggregateSha256: manifest.source?.aggregateSha256 || null,
      archiveTag: manifest.source?.archiveTag || null,
    },
    issues: diagnostics,
    diagnosticsByRef,
    diagnosticsBySource,
  };
}

module.exports = {
  ASSET_FAMILY_FIELDS,
  IDENTITY_FIELDS,
  buildAssetArchitectureAudit,
  collectUrls,
  nonEmptyPayload,
};
