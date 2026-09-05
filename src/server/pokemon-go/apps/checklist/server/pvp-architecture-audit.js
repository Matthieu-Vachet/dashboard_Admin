const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { dataPath, dataRoot, resolveDataFile } = require("../../../src/lib/data-repository");
const { CATEGORY_DIRECTORIES, categoryFromReference, classifyEntity, resolveCanonicalReference } = require("./entity-category");
const { enrichDiagnostic } = require("./diagnostic-taxonomy");

const MONTHLY_FRESHNESS_DAYS = 45;
const LEAGUE_STATUSES = new Set([
  "RANKED",
  "NOT_RANKED",
  "NOT_ELIGIBLE",
  "UNRELEASED",
  "MAPPING_MISSING",
  "SOURCE_MISSING",
  "FORMAT_EXCLUDED",
  "UNSUPPORTED_FORM",
]);

function listJsonFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listJsonFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".json") && entry.name !== "index.json"
      ? [entryPath]
      : [];
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

function roundMetric(value) {
  return Number(Number(value).toFixed(3));
}

function issue({
  sourceFile = null,
  pvpRef = null,
  path: pathName,
  code,
  expected,
  actual,
  severity = "error",
}) {
  const manifestStale = code.startsWith("pvp_manifest_");
  return enrichDiagnostic({
    category: "pvp",
    severity: manifestStale ? "warning" : severity,
    sourceFile,
    pvpRef,
    path: pathName,
    issue: manifestStale ? "MANIFEST_STALE" : code,
    detailCode: manifestStale ? code : null,
    classification: manifestStale ? "OPERATIONAL_METADATA" : null,
    fix: manifestStale ? "npm run manifests:rebuild" : null,
    expected,
    actual,
  });
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function buildPvpArchitectureAudit(options = {}) {
  const now = options.now ? new Date(options.now) : new Date();
  const pokemonDirectories = [dataPath("data", "pokemon")];
  const pvpPokemonDirectory = dataPath("data", "pvp", "pokemon");
  const manifestFile = dataPath("data", "pvp", "manifests", "current.json");
  const pokemonMapFile = dataPath("mappings", "providers", "pvpoke", "pokemon-map.json");
  const moveMapFile = dataPath("mappings", "providers", "pvpoke", "move-map.json");
  const pokemonOverrideFile = dataPath("mappings", "providers", "pvpoke", "pokemon-overrides.json");
  const moveOverrideFile = dataPath("mappings", "providers", "pvpoke", "move-overrides.json");
  const movesetAuditFile = dataPath("operations", "reports", "pvpoke", "moveset-mapping-audit-current.json");
  const diagnostics = [];
  const diagnosticsByRef = new Map();
  const diagnosticsBySource = new Map();

  function add(diagnostic) {
    diagnostics.push(diagnostic);
    if (diagnostic.pvpRef) {
      const values = diagnosticsByRef.get(diagnostic.pvpRef) || [];
      values.push(diagnostic);
      diagnosticsByRef.set(diagnostic.pvpRef, values);
    }
    if (diagnostic.sourceFile) {
      const values = diagnosticsBySource.get(diagnostic.sourceFile) || [];
      values.push(diagnostic);
      diagnosticsBySource.set(diagnostic.sourceFile, values);
    }
  }

  const requiredFiles = [
    manifestFile,
    pokemonMapFile,
    moveMapFile,
    pokemonOverrideFile,
    moveOverrideFile,
    movesetAuditFile,
  ];
  for (const file of requiredFiles) {
    if (!fs.existsSync(file))
      add(issue({
        path: relativeDataPath(file),
        code: "pvp_architecture_file_missing",
        expected: "fichier JSON canonique présent",
        actual: "absent",
      }));
  }
  for (const category of Object.values(CATEGORY_DIRECTORIES)) {
    const directory = path.join(pvpPokemonDirectory, category);
    if (!fs.existsSync(directory))
      add(issue({
        path: relativeDataPath(directory),
        code: "pvp_category_directory_missing",
        expected: "dossier de catégorie canonique présent",
        actual: "absent",
      }));
  }

  if (requiredFiles.some((file) => !fs.existsSync(file)) || diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    return {
      summary: {
        valid: false,
        records: 0,
        references: 0,
        errors: diagnostics.length,
        warnings: 0,
        infos: 0,
        freshnessDays: null,
        sourceCommit: null,
        syncedAt: null,
      },
      issues: diagnostics,
      diagnosticsByRef,
      diagnosticsBySource,
    };
  }

  const manifest = readJson(manifestFile);
  const pokemonMap = readJson(pokemonMapFile);
  const moveMap = readJson(moveMapFile);
  const pokemonOverrides = readJson(pokemonOverrideFile);
  const moveOverrides = readJson(moveOverrideFile);
  const movesetAudit = readJson(movesetAuditFile);
  const movesetAuditByIdentity = new Map((movesetAudit.mappings || []).map((mapping) => [`${mapping.canonicalId}:${mapping.moveId}`, mapping]));
  const sourceFiles = pokemonDirectories.flatMap(listJsonFiles).sort();
  const sources = sourceFiles.map((file) => {
    const data = readJson(file);
    const sourceFile = relativeDataPath(file);
    const classification = classifyEntity(data, { sourceFile });
    const assetsRef = typeof data.assetsRef === "string" ? data.assetsRef : null;
    let assetCore = null;
    if (assetsRef) {
      const assetFile = resolveDataFile(assetsRef);
      if (isInside(dataPath("data", "assets", "core"), assetFile) && fs.existsSync(assetFile))
        assetCore = readJson(assetFile);
    }
    return {
      data,
      assetCore,
      file,
      sourceFile,
      pvpRef: typeof data.pvpRef === "string" ? data.pvpRef : null,
      canonicalId: data.formId || data.id || null,
      pokemonId: data.id || data.baseFormId || data.formId || null,
      moveIds: new Set([
        ...(data.quickMoves || []),
        ...(data.cinematicMoves || []),
        ...(data.eliteQuickMoves || []),
        ...(data.eliteCinematicMoves || []),
        ...(data.legacyQuickMoves || []),
        ...(data.legacyCinematicMoves || []),
      ]),
      classification,
    };
  });
  const legacyEmbeddedBlocks = sources.filter((source) => source.data.pvp != null).length;
  if (movesetAudit.source?.repositoryCommit !== manifest.source?.commit)
    add(issue({
      path: "operations/reports/pvpoke/moveset-mapping-audit-current.json.source.repositoryCommit",
      code: "pvp_moveset_audit_snapshot_mismatch",
      expected: manifest.source?.commit || "commit du manifeste",
      actual: movesetAudit.source?.repositoryCommit || "absent",
    }));
  if (movesetAudit.summary?.openOccurrences !== 0)
    add(issue({
      path: "operations/reports/pvpoke/moveset-mapping-audit-current.json.summary.openOccurrences",
      code: "pvp_moveset_audit_incomplete",
      expected: 0,
      actual: movesetAudit.summary?.openOccurrences ?? "absent",
    }));
  const sourcesByRef = new Map();
  for (const source of sources) {
    if (source.classification.ambiguous) {
      add(issue({ sourceFile: source.sourceFile, path: "form", code: "ENTITY_CLASSIFICATION_AMBIGUOUS", expected: "une catégorie canonique unique", actual: source.classification.signals.join(", ") }));
      continue;
    }
    if (!source.pvpRef) {
      add(issue({
        sourceFile: source.sourceFile,
        path: "pvpRef",
        code: "pvp_ref_missing",
        expected: "référence vers data/pvp/pokemon/*.pvp.json",
        actual: "absent",
      }));
      continue;
    }
    const expectedRef = resolveCanonicalReference(source.data, { family: "pvp", sourceFile: source.sourceFile });
    if (source.pvpRef !== expectedRef)
      add(issue({ sourceFile: source.sourceFile, pvpRef: source.pvpRef, path: "pvpRef", code: "PVP_WRONG_CATEGORY_DIRECTORY", expected: expectedRef, actual: source.pvpRef }));
    if (categoryFromReference(source.pvpRef) !== source.classification.category)
      add(issue({ sourceFile: source.sourceFile, pvpRef: source.pvpRef, path: "pvpRef", code: "REFERENCE_CATEGORY_MISMATCH", expected: source.classification.category, actual: categoryFromReference(source.pvpRef) || "absent" }));
    const values = sourcesByRef.get(source.pvpRef) || [];
    values.push(source);
    sourcesByRef.set(source.pvpRef, values);
  }

  for (const [pvpRef, linkedSources] of sourcesByRef) {
    if (linkedSources.length > 1)
      for (const source of linkedSources)
        add(issue({
          sourceFile: source.sourceFile,
          pvpRef,
          path: "pvpRef",
          code: "pvp_ref_collision",
          expected: "une seule fiche Pokémon/forme par pvpRef",
          actual: linkedSources.map((item) => item.sourceFile).join(", "),
        }));
  }

  const manifestEntries = Array.isArray(manifest.files) ? manifest.files : [];
  const manifestByPath = new Map();
  for (const entry of manifestEntries) {
    if (!entry?.path) continue;
    const values = manifestByPath.get(entry.path) || [];
    values.push(entry);
    manifestByPath.set(entry.path, values);
  }
  for (const [manifestPath, entries] of manifestByPath) {
    if (entries.length > 1)
      add(issue({
        pvpRef: manifestPath,
        path: "data/pvp/manifests/current.json.files",
        code: "pvp_manifest_path_collision",
        expected: "chemin unique",
        actual: `${entries.length} occurrences`,
      }));
  }
  for (const pvpId of duplicateValues(manifestEntries.map((entry) => entry?.pvpId).filter(Boolean)))
    add(issue({
      path: "data/pvp/manifests/current.json.files.pvpId",
      code: "pvp_manifest_id_collision",
      expected: "pvpId unique",
      actual: pvpId,
    }));

  const pvpFiles = listJsonFiles(pvpPokemonDirectory).sort();
  if (manifest.records !== pvpFiles.length || manifestEntries.length !== pvpFiles.length)
    add(issue({
      path: "data/pvp/manifests/current.json.records",
      code: "pvp_manifest_count_mismatch",
      expected: `${pvpFiles.length} fichiers PvP`,
      actual: `${manifest.records} records / ${manifestEntries.length} entrées`,
    }));
  for (const [category, directory] of Object.entries(CATEGORY_DIRECTORIES)) {
    const count = pvpFiles.filter((file) => categoryFromReference(relativeDataPath(file)) === category).length;
    if (manifest.counts?.[directory] !== count)
      add(issue({ path: `data/pvp/manifests/current.json.counts.${directory}`, code: "pvp_manifest_category_count_mismatch", expected: count, actual: manifest.counts?.[directory] ?? "absent" }));
  }

  const providerPokemonMappings = new Map();
  for (const mapping of pokemonMap.mappings || []) {
    if (!mapping?.providerId) continue;
    const values = providerPokemonMappings.get(mapping.providerId) || [];
    values.push(mapping);
    providerPokemonMappings.set(mapping.providerId, values);
  }
  const providerMoveMappings = new Map();
  for (const mapping of moveMap.mappings || []) {
    if (!mapping?.providerId) continue;
    const values = providerMoveMappings.get(mapping.providerId) || [];
    values.push(mapping);
    providerMoveMappings.set(mapping.providerId, values);
  }
  const moveCatalog = new Map();
  for (const file of listJsonFiles(dataPath("data", "moves"))) {
    const move = readJson(file);
    if (move?.id) moveCatalog.set(move.id, { ...move, file: relativeDataPath(file) });
  }

  for (const [providerId, mappings] of providerPokemonMappings) {
    const canonicalIds = new Set(
      mappings.filter((mapping) => mapping.status === "MATCHED").map((mapping) => mapping.canonicalId),
    );
    if (canonicalIds.size > 1)
      add(issue({
        path: `mappings/providers/pvpoke/pokemon-map.json.${providerId}`,
        code: "pvp_provider_collision",
        expected: "un seul ID canonique par providerId",
        actual: [...canonicalIds].join(", "),
      }));
  }
  for (const [providerId, mappings] of providerMoveMappings) {
    const moveIds = new Set(
      mappings.filter((mapping) => mapping.status === "MATCHED").map((mapping) => mapping.moveId),
    );
    if (moveIds.size > 1)
      add(issue({
        path: `mappings/providers/pvpoke/move-map.json.${providerId}`,
        code: "pvp_move_mapping_collision",
        expected: "une seule attaque interne par providerId",
        actual: [...moveIds].join(", "),
      }));
  }

  for (const [label, mappingDocument] of [
    ["pokemon-map", pokemonMap],
    ["move-map", moveMap],
  ]) {
    const commit = mappingDocument.metadata?.repositoryCommit;
    if (!commit || commit !== manifest.source?.commit)
      add(issue({
        path: `mappings/providers/pvpoke/${label}.json.metadata.repositoryCommit`,
        code: "pvp_snapshot_commit_mismatch",
        expected: manifest.source?.commit || "commit du manifeste",
        actual: commit || "absent",
      }));
  }
  if (!Array.isArray(pokemonOverrides.overrides) || !Array.isArray(moveOverrides.overrides))
    add(issue({
      path: "mappings/providers/pvpoke/*-overrides.json.overrides",
      code: "pvp_override_catalog_invalid",
      expected: "tableaux d'overrides explicites",
      actual: "structure invalide",
    }));

  const syncedAt = Date.parse(manifest.source?.syncedAt || "");
  const freshnessDays = Number.isFinite(syncedAt)
    ? Math.floor(Math.max(0, now.getTime() - syncedAt) / 86_400_000)
    : null;
  if (freshnessDays === null || freshnessDays > MONTHLY_FRESHNESS_DAYS)
    add(issue({
      path: "data/pvp/manifests/current.json.source.syncedAt",
      code: "pvp_monthly_freshness",
      expected: `snapshot âgé de ${MONTHLY_FRESHNESS_DAYS} jours maximum`,
      actual: freshnessDays === null ? "date invalide" : `${freshnessDays} jours`,
      severity: "warning",
    }));

  const checkedMetrics = new Set();
  const checkedProviderIds = new Map();

  function checkMetric(moveId, expectedCategory, diagnosticContext) {
    if (!moveId || checkedMetrics.has(`${diagnosticContext.pvpRef}:${moveId}`)) return;
    checkedMetrics.add(`${diagnosticContext.pvpRef}:${moveId}`);
    const move = moveCatalog.get(moveId);
    if (!move) {
      add(issue({
        ...diagnosticContext,
        path: `moves.${moveId}`,
        code: "pvp_move_missing",
        expected: "attaque interne existante",
        actual: moveId,
      }));
      return;
    }
    if (move.category !== expectedCategory)
      add(issue({
        ...diagnosticContext,
        path: `${move.file}.category`,
        code: "pvp_move_category_mismatch",
        expected: expectedCategory,
        actual: move.category || "absent",
      }));
    const combat = move.combat;
    if (!combat || !Number.isFinite(combat.power) || !Number.isFinite(combat.energy)) {
      add(issue({
        ...diagnosticContext,
        path: `${move.file}.combat`,
        code: "pvp_move_metrics_missing",
        expected: "métriques combat numériques",
        actual: "incomplètes",
      }));
      return;
    }
    if (expectedCategory === "FAST") {
      if (!Number.isFinite(combat.turns) || combat.turns <= 0) {
        add(issue({
          ...diagnosticContext,
          path: `${move.file}.combat.turns`,
          code: "pvp_fast_turns_invalid",
          expected: "nombre de tours positif",
          actual: combat.turns,
        }));
        return;
      }
      const expectedDpt = roundMetric(combat.power / combat.turns);
      const expectedEpt = roundMetric(combat.energy / combat.turns);
      if (combat.dpt !== expectedDpt || combat.ept !== expectedEpt)
        add(issue({
          ...diagnosticContext,
          path: `${move.file}.combat.dpt/ept`,
          code: "pvp_fast_metrics_mismatch",
          expected: `DPT ${expectedDpt} / EPT ${expectedEpt}`,
          actual: `DPT ${combat.dpt} / EPT ${combat.ept}`,
        }));
    } else {
      const expectedEnergyCost = Math.abs(combat.energy);
      const expectedDpe = expectedEnergyCost ? roundMetric(combat.power / expectedEnergyCost) : null;
      if (combat.energyCost !== expectedEnergyCost || combat.dpe !== expectedDpe)
        add(issue({
          ...diagnosticContext,
          path: `${move.file}.combat.energyCost/dpe`,
          code: "pvp_charged_metrics_mismatch",
          expected: `coût ${expectedEnergyCost} / DPE ${expectedDpe}`,
          actual: `coût ${combat.energyCost} / DPE ${combat.dpe}`,
        }));
    }
  }

  function checkProviderMove(moveReference, expectedCategory, diagnosticContext, pathName) {
    if (!moveReference || typeof moveReference !== "object") return;
    if (moveReference.mappingStatus !== "MATCHED") {
      add(issue({
        ...diagnosticContext,
        path: pathName,
        code: "pvp_move_mapping_missing",
        expected: "mapping attaque MATCHED",
        actual: `${moveReference.sourceId || "source inconnue"} · ${moveReference.mappingStatus || "absent"}`,
        severity: "warning",
      }));
      return;
    }
    const mappings = providerMoveMappings.get(moveReference.sourceId) || [];
    const mapping = mappings.find(
      (candidate) => candidate.status === "MATCHED" && candidate.moveId === moveReference.moveId,
    );
    if (!mapping)
      add(issue({
        ...diagnosticContext,
        path: pathName,
        code: "pvp_move_mapping_inconsistent",
        expected: `${moveReference.sourceId} → ${moveReference.moveId}`,
        actual: "mapping absent ou différent",
      }));
    checkMetric(moveReference.moveId, expectedCategory, diagnosticContext);
  }

  const leagueStatusCounts = Object.fromEntries([...LEAGUE_STATUSES].map((status) => [status, 0]));
  for (const pvpFile of pvpFiles) {
    const pvpRef = relativeDataPath(pvpFile);
    const linkedSources = sourcesByRef.get(pvpRef) || [];
    const source = linkedSources[0] || null;
    const sourceFile = source?.sourceFile || null;
    const context = { sourceFile, pvpRef };
    if (!source)
      add(issue({
        pvpRef,
        path: pvpRef,
        code: "pvp_orphan_record",
        expected: "une fiche Pokémon/forme référençante",
        actual: "aucune",
      }));
    const manifestRecords = manifestByPath.get(pvpRef) || [];
    if (manifestRecords.length !== 1) {
      add(issue({
        ...context,
        path: "data/pvp/manifests/current.json.files",
        code: "pvp_manifest_reference_mismatch",
        expected: "une entrée manifeste",
        actual: `${manifestRecords.length} entrée(s)`,
      }));
      continue;
    }
    const manifestRecord = manifestRecords[0];
    const actualHash = sha256(pvpFile);
    if (manifestRecord.sha256 !== actualHash)
      add(issue({
        ...context,
        path: "data/pvp/manifests/current.json.files.sha256",
        code: "pvp_manifest_hash_mismatch",
        expected: manifestRecord.sha256,
        actual: actualHash,
      }));
    const record = readJson(pvpFile);
    const recordClassification = classifyEntity(record.identity, { sourceFile: record.identity?.localFile });
    if (recordClassification.ambiguous)
      add(issue({ ...context, path: "identity.form", code: "ENTITY_CLASSIFICATION_AMBIGUOUS", expected: "une catégorie canonique unique", actual: recordClassification.signals.join(", ") }));
    else if (categoryFromReference(pvpRef) !== recordClassification.category)
      add(issue({ ...context, path: "category", code: "PVP_WRONG_CATEGORY_DIRECTORY", expected: recordClassification.directory, actual: pvpRef.split("/")[2] || "absent" }));
    if (source && !recordClassification.ambiguous && recordClassification.category !== source.classification.category)
      add(issue({
        ...context,
        path: "identity.entityCategory",
        code: "ENTITY_CATEGORY_MISMATCH",
        expected: source.classification.category,
        actual: recordClassification.category,
      }));
    if (record.pvpRef !== pvpRef)
      add(issue({
        ...context,
        path: "pvpRef",
        code: "pvp_record_self_reference_mismatch",
        expected: pvpRef,
        actual: record.pvpRef || "absent",
      }));
    if (record.pvpId !== manifestRecord.pvpId)
      add(issue({
        ...context,
        path: "pvpId",
        code: "pvp_manifest_identity_mismatch",
        expected: manifestRecord.pvpId,
        actual: record.pvpId || "absent",
      }));
    if (source) {
      const identityExpectations = {
        canonicalId: source.canonicalId,
        pokemonId: source.data.id || source.data.baseFormId || source.canonicalId,
        formId: source.canonicalId,
        baseFormId: source.data.baseFormId,
        form: source.data.form,
        dexNr: source.data.dexNr,
        dexId: source.data.dexId,
        localFile: source.sourceFile,
      };
      for (const [field, expected] of Object.entries(identityExpectations))
        if (record.identity?.[field] !== expected)
          add(issue({
            ...context,
            path: `identity.${field}`,
            code: "pvp_identity_mismatch",
            expected,
            actual: record.identity?.[field] ?? "absent",
          }));
      const standardFast = new Set(source.data.quickMoves || []);
      const standardCharged = new Set(source.data.cinematicMoves || []);
      for (const moveId of source.data.eliteQuickMoves || [])
        if (standardFast.has(moveId))
          add(issue({
            ...context,
            path: "eliteQuickMoves",
            code: "pvp_elite_move_duplicate",
            expected: "attaque Elite absente du movepool rapide standard",
            actual: moveId,
          }));
      for (const moveId of source.data.eliteCinematicMoves || [])
        if (standardCharged.has(moveId))
          add(issue({
            ...context,
            path: "eliteCinematicMoves",
            code: "pvp_elite_move_duplicate",
            expected: "attaque Elite absente du movepool chargé standard",
            actual: moveId,
          }));
    }
    for (const field of ["commit", "hash", "syncedAt", "generatorVersion"])
      if (record.source?.[field] !== manifest.source?.[field])
        add(issue({
          ...context,
          path: `source.${field}`,
          code: "pvp_snapshot_source_mismatch",
          expected: manifest.source?.[field],
          actual: record.source?.[field] ?? "absent",
        }));
    if (record.mapping?.provider !== "pvpoke")
      add(issue({
        ...context,
        path: "mapping.provider",
        code: "pvp_mapping_provider_invalid",
        expected: "pvpoke",
        actual: record.mapping?.provider || "absent",
      }));
    if (record.mapping?.status === "MAPPING_MISSING")
      add(issue({
        ...context,
        path: "mapping.status",
        code: "pvp_mapping_missing",
        expected: "mapping explicite vers un ID PvPoke",
        actual: "MAPPING_MISSING",
        severity: "warning",
      }));
    for (const [index, provider] of (record.mapping?.providerIds || []).entries()) {
      const mappings = providerPokemonMappings.get(provider.providerId) || [];
      const mapping = mappings.find(
        (candidate) => candidate.status === "MATCHED" && candidate.canonicalId === record.identity?.canonicalId,
      );
      if (!mapping)
        add(issue({
          ...context,
          path: `mapping.providerIds[${index}]`,
          code: "pvp_pokemon_mapping_inconsistent",
          expected: `${provider.providerId} → ${record.identity?.canonicalId}`,
          actual: "mapping absent ou différent",
        }));
      const owners = checkedProviderIds.get(provider.providerId) || new Set();
      owners.add(record.identity?.canonicalId);
      checkedProviderIds.set(provider.providerId, owners);
    }
    for (const [leagueId, league] of Object.entries(record.leagues || {})) {
      if (LEAGUE_STATUSES.has(league?.status)) leagueStatusCounts[league.status] += 1;
      if (!LEAGUE_STATUSES.has(league?.status))
        add(issue({
          ...context,
          path: `leagues.${leagueId}.status`,
          code: "pvp_league_status_invalid",
          expected: [...LEAGUE_STATUSES].join(" | "),
          actual: league?.status ?? "absent",
        }));
      if (league?.rank1?.level > 40 && !source.assetCore?.assets?.candy?.xlImage)
        add(issue({
          ...context,
          path: `leagues.${leagueId}.rank1.level`,
          code: "pvp_xl_asset_missing",
          expected: "asset Bonbon XL pour un build niveau > 40",
          actual: `niveau ${league.rank1.level}`,
        }));
      if (league?.rank1?.level > 55 || league?.rank1?.level < 1)
        add(issue({
          ...context,
          path: `leagues.${leagueId}.rank1.level`,
          code: "pvp_rank1_level_invalid",
          expected: "niveau compris entre 1 et 55",
          actual: league.rank1.level,
        }));
      if (league?.rank1?.cp > league?.cpCap)
        add(issue({
          ...context,
          path: `leagues.${leagueId}.rank1.cp`,
          code: "pvp_rank1_cp_cap_exceeded",
          expected: `PC ≤ ${league.cpCap}`,
          actual: league.rank1.cp,
        }));
      for (const [variantIndex, variant] of (league?.variants || []).entries()) {
        const basePath = `leagues.${leagueId}.variants[${variantIndex}]`;
        checkProviderMove(variant.bestMoveset?.fast, "FAST", context, `${basePath}.bestMoveset.fast`);
        for (const [index, move] of (variant.bestMoveset?.charged || []).entries())
          checkProviderMove(move, "CHARGED", context, `${basePath}.bestMoveset.charged[${index}]`);
        for (const [index, move] of (variant.availableMoves?.fast || []).entries())
          checkProviderMove(move, "FAST", context, `${basePath}.availableMoves.fast[${index}]`);
        for (const [index, move] of (variant.availableMoves?.charged || []).entries())
          checkProviderMove(move, "CHARGED", context, `${basePath}.availableMoves.charged[${index}]`);
        if (source) {
          const rankedMoveIds = [
            variant.bestMoveset?.fast?.moveId,
            ...(variant.bestMoveset?.charged || []).map((move) => move.moveId),
          ].filter(Boolean);
          for (const moveId of rankedMoveIds)
            if (!source.moveIds.has(moveId)) {
              const audited = movesetAuditByIdentity.get(`${source.canonicalId}:${moveId}`);
              if (audited?.classification === "SHADOW_ONLY" && variant.sourceId?.endsWith("_shadow")) continue;
              if (audited?.classification === "PURIFIED_ONLY" && audited.status === "EXPECTED") continue;
              add(issue({
                ...context,
                path: `${basePath}.bestMoveset`,
                code: audited?.classification === "SOURCE_SNAPSHOT_MISMATCH"
                  ? "pvp_provider_source_movepool_mismatch"
                  : "pvp_moveset_outside_local_movepool",
                expected: audited?.classification === "SOURCE_SNAPSHOT_MISMATCH"
                  ? "attaque présente dans le Game Master PvPoke du même commit"
                  : "attaque présente dans le movepool standard, Elite ou Legacy local",
                actual: moveId,
                severity: audited?.classification === "SOURCE_SNAPSHOT_MISMATCH"
                  ? "info"
                  : "warning",
              }));
            }
        }
      }
      if (league?.legacyBestMovesets) {
        checkMetric(league.legacyBestMovesets.fast, "FAST", context);
        for (const moveId of league.legacyBestMovesets.charged || [])
          checkMetric(moveId, "CHARGED", context);
      }
    }
  }

  for (const [pvpRef, linkedSources] of sourcesByRef) {
    const resolved = resolveDataFile(pvpRef);
    if (!isInside(pvpPokemonDirectory, resolved) || !fs.existsSync(resolved))
      for (const source of linkedSources)
        add(issue({
          sourceFile: source.sourceFile,
          pvpRef,
          path: "pvpRef",
          code: "pvp_ref_invalid",
          expected: "fichier existant sous pvp/pokemon",
          actual: pvpRef,
        }));
  }
  for (const [providerId, owners] of checkedProviderIds)
    if (owners.size > 1)
      add(issue({
        path: `data/pvp/pokemon/*.mapping.providerIds.${providerId}`,
        code: "pvp_record_provider_collision",
        expected: "providerId rattaché à une identité canonique",
        actual: [...owners].join(", "),
      }));

  const errors = diagnostics.filter((item) => item.severity === "error").length;
  const warnings = diagnostics.filter((item) => item.severity === "warning").length;
  const infos = diagnostics.filter((item) => item.severity === "info").length;
  return {
    summary: {
      valid: errors === 0,
      records: pvpFiles.length,
      references: sourcesByRef.size,
      manifestRecords: manifest.records ?? null,
      categoryCounts: manifest.counts || {},
      mappedRecords: sources.filter((source) => {
        if (!source.pvpRef || !fs.existsSync(resolveDataFile(source.pvpRef))) return false;
        return readJson(resolveDataFile(source.pvpRef)).mapping?.status === "MATCHED";
      }).length,
      mappingWarnings: diagnostics.filter((item) => item.issue === "pvp_mapping_missing").length,
      providerPokemonMappings: (pokemonMap.mappings || []).length,
      providerMoveMappings: (moveMap.mappings || []).length,
      errors,
      warnings,
      infos,
      freshnessDays,
      monthlyFresh: freshnessDays !== null && freshnessDays <= MONTHLY_FRESHNESS_DAYS,
      movesetAudit: movesetAudit.summary || {},
      sourceCommit: manifest.source?.commit || null,
      sourceHash: manifest.source?.hash || null,
      syncedAt: manifest.source?.syncedAt || null,
      leagueStatusCounts,
      legacyEmbeddedBlocks,
    },
    issues: diagnostics,
    diagnosticsByRef,
    diagnosticsBySource,
  };
}

module.exports = {
  LEAGUE_STATUSES,
  MONTHLY_FRESHNESS_DAYS,
  buildPvpArchitectureAudit,
};
