const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {
  dataPath,
  dataRoot,
  resolveDataFile,
} = require("../../../src/lib/data-repository");

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

function canonicalStem(data) {
  const formId = String(data?.formId || data?.id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${String(data?.dexId || data?.dexNr || "").padStart(4, "0")}-${formId}`;
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
  const assetsDirectory = dataPath("pokemon-assets");
  const manifestFile = dataPath("pokemon-assets", "manifests", "separation-manifest.json");
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
    const diagnostic = {
      category: "assets",
      severity,
      sourceFile,
      assetRef,
      path: pathName,
      issue: code,
      expected,
      actual,
    };
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
    const absolute = path.join(assetsDirectory, directory);
    if (!fs.existsSync(absolute))
      issue({
        path: `pokemon-assets/${directory}`,
        code: "asset_directory_missing",
        expected: "dossier canonique présent",
        actual: "absent",
      });
  }
  if (!fs.existsSync(manifestFile))
    issue({
      path: "pokemon-assets/manifests/separation-manifest.json",
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

  const sourceFiles = [dataPath("pokemon"), dataPath("pokemon-forms")]
    .flatMap(listJsonFiles)
    .sort();
  const sources = sourceFiles.map((file) => ({
    file,
    sourceFile: relativeDataPath(file),
    data: readJson(file),
  }));
  const sourcesByFormId = new Map();
  for (const source of sources) {
    const formId = source.data.formId || source.data.id;
    const values = sourcesByFormId.get(formId) || [];
    values.push(source);
    sourcesByFormId.set(formId, values);
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

  const coreFiles = listJsonFiles(dataPath("pokemon-assets", "core")).sort();
  const coreRecords = coreFiles.map((file) => ({
    file,
    sourceFile: relativeDataPath(file),
    data: readJson(file),
  }));
  const coreByFormId = new Map();
  for (const core of coreRecords) {
    const values = coreByFormId.get(core.data.formId) || [];
    values.push(core);
    coreByFormId.set(core.data.formId, values);
  }
  for (const [formId, values] of coreByFormId)
    if (!formId || values.length > 1)
      values.forEach((core) => issue({
        assetRef: core.sourceFile.replace(/^data\//, ""),
        path: "formId",
        code: "asset_core_identity_collision",
        expected: "formId core présent et unique",
        actual: formId ? `${values.length} occurrences` : "absent",
      }));

  const familyRecords = [];
  const familyCounts = {};
  for (const [family, field] of Object.entries(ASSET_FAMILY_FIELDS)) {
    const files = listJsonFiles(dataPath("pokemon-assets", family)).sort();
    familyCounts[family] = files.length;
    for (const file of files) {
      const data = readJson(file);
      const assetRef = relativeDataPath(file).replace(/^data\//, "");
      familyRecords.push({ family, field, file, assetRef, data });
      if (!nonEmptyPayload(data[field]))
        issue({
          assetRef,
          path: field,
          code: "asset_family_empty",
          expected: "famille secondaire non vide",
          actual: data[field] == null ? "absente" : "vide",
        });
    }
  }

  const canonicalFiles = [...coreRecords.map((record) => record.file), ...familyRecords.map((record) => record.file)];
  const canonicalPaths = new Set(canonicalFiles.map((file) => relativeDataPath(file).replace(/^data\//, "")));
  const referencesByPath = new Map();
  const legitimateAbsences = Object.fromEntries(Object.keys(ASSET_FAMILY_FIELDS).map((family) => [family, 0]));
  let temporaryLegacyRefs = 0;

  for (const source of sources) {
    const formId = source.data.formId || source.data.id;
    const stem = canonicalStem(source.data);
    const canonicalCoreRef = `pokemon-assets/core/${stem}.assets.json`;
    const core = coreByFormId.get(formId)?.[0] || null;
    const pokemonAssetsRef = source.data.assets?.assetsRef;
    if (typeof pokemonAssetsRef !== "string" || !pokemonAssetsRef) {
      issue({
        sourceFile: source.sourceFile,
        path: "assets.assetsRef",
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
          path: "assets.assetsRef",
          code: "assets_ref_broken",
          expected: "référence existante sous pokemon-assets",
          actual: pokemonAssetsRef,
        });
      if (pokemonAssetsRef !== canonicalCoreRef) temporaryLegacyRefs += 1;
    }
    if (!core) {
      issue({
        sourceFile: source.sourceFile,
        assetRef: canonicalCoreRef,
        path: "assets.assetsRef",
        code: "asset_core_missing",
        expected: "fiche core canonique existante",
        actual: "absente",
      });
      continue;
    }
    if (relativeDataPath(core.file).replace(/^data\//, "") !== canonicalCoreRef)
      issue({
        sourceFile: source.sourceFile,
        assetRef: relativeDataPath(core.file).replace(/^data\//, ""),
        path: "assets.assetsRef",
        code: "asset_core_path_mismatch",
        expected: canonicalCoreRef,
        actual: relativeDataPath(core.file).replace(/^data\//, ""),
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
      const expectedRef = `pokemon-assets/${family}/${stem}.${family}.json`;
      if (reference !== expectedRef)
        issue({
          sourceFile: source.sourceFile,
          assetRef: reference,
          path: `assetRefs.${family}`,
          code: "asset_family_path_mismatch",
          expected: expectedRef,
          actual: reference,
        });
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
          expected: `fichier existant sous pokemon-assets/${family}`,
          actual: reference,
        });
        continue;
      }
      const record = readJson(resolved);
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
        path: "pokemon-assets/manifests/separation-manifest.json.files",
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
        path: "pokemon-assets/manifests/separation-manifest.json.files",
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
        path: "pokemon-assets/manifests/separation-manifest.json.files",
        code: "asset_manifest_orphan",
        expected: "fichier canonique existant",
        actual: "entrée sans fichier canonique",
      });

  const actualCounts = { core: coreFiles.length, ...familyCounts };
  for (const [family, count] of Object.entries(actualCounts))
    if (manifest.counts?.[family] !== count)
      issue({
        path: `pokemon-assets/manifests/separation-manifest.json.counts.${family}`,
        code: "asset_manifest_count_mismatch",
        expected: count,
        actual: manifest.counts?.[family] ?? "absent",
      });
  if (manifestEntries.length !== canonicalFiles.length)
    issue({
      path: "pokemon-assets/manifests/separation-manifest.json.files",
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
      path: "assets.assetsRef",
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
      legitimateAbsences,
      urls: urls.length,
      uniqueUrls: new Set(urls).size,
      temporaryLegacyRefs,
      legacyMonoliths: legacyFiles.length,
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
