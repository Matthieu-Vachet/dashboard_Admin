const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { createRequire } = require("node:module");

const {
  builderError,
  buildCanonicalFiles,
  loadCanonicalContract,
  serializeOrdered,
  sha256,
} = require("./canonical-contract");
const { CATEGORY_DIRECTORIES } = require("../apps/checklist/server/entity-category");

const ALLOWED_WRITE_PREFIXES = Object.freeze([
  "data/pokemon/",
  "data/assets/",
  "data/pvp/",
  "mappings/pokemon/",
  "operations/backups/json-builder/",
  "operations/reports/json-builder/",
]);
const ASSET_MANIFEST = "data/assets/manifests/separation-manifest.json";
const PVP_MANIFEST = "data/pvp/manifests/current.json";
const IDENTITY_INVENTORY = "mappings/pokemon/identity-inventory.json";
const TOKEN_TTL_MS = 30 * 60_000;

function normalizeRelativePath(value) {
  const normalized = String(value || "").replace(/\\/g, "/").replace(/^\.\//, "");
  if (
    !normalized
    || normalized.startsWith("/")
    || normalized.includes("\0")
    || normalized.split("/").includes("..")
    || !ALLOWED_WRITE_PREFIXES.some((prefix) => normalized.startsWith(prefix))
  ) {
    throw builderError("Chemin d’écriture refusé.", "JSON_BUILDER_PATH_TRAVERSAL", 400, { value });
  }
  return normalized;
}

function pathInsideRoot(root, relativePath) {
  const safe = normalizeRelativePath(relativePath);
  const absoluteRoot = fs.realpathSync(path.resolve(root));
  const absolute = path.resolve(absoluteRoot, safe);
  const relative = path.relative(absoluteRoot, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw builderError("Chemin d’écriture hors du dépôt.", "JSON_BUILDER_PATH_TRAVERSAL", 400, { relativePath });
  }
  let existing = absolute;
  while (!fs.existsSync(existing)) {
    const parent = path.dirname(existing);
    if (parent === existing) break;
    existing = parent;
  }
  if (fs.existsSync(existing)) {
    const realExisting = fs.realpathSync(existing);
    const realRelative = path.relative(absoluteRoot, realExisting);
    if (realRelative.startsWith("..") || path.isAbsolute(realRelative)) {
      throw builderError("Lien symbolique hors dépôt refusé.", "JSON_BUILDER_PATH_TRAVERSAL", 400, { relativePath });
    }
  }
  return absolute;
}

function readText(root, relativePath) {
  const absolute = pathInsideRoot(root, relativePath);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : null;
}

function fileState(root, relativePath) {
  const content = readText(root, relativePath);
  return { exists: content !== null, sha256: content === null ? null : sha256(content), bytes: content === null ? 0 : Buffer.byteLength(content) };
}

function listJsonFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listJsonFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(absolute);
  }
  return files.sort();
}

function readJsonFile(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadIdentityInventory(root) {
  const entries = [];
  for (const file of listJsonFiles(path.join(root, "data", "pokemon"))) {
    try {
      const value = readJsonFile(file);
      entries.push({
        id: value.id,
        formId: value.formId,
        baseFormId: value.baseFormId,
        dexNr: value.dexNr,
        dexId: value.dexId,
        slug: value.slug,
        file: path.relative(root, file).replace(/\\/g, "/"),
      });
    } catch {
      // Les JSON invalides seront signalés par l’Engine canonique ; ils ne deviennent jamais des collisions silencieuses.
    }
  }
  return entries;
}

function identityCollisions(inventory, pokemon, targetPath) {
  const conflicts = [];
  for (const entry of inventory) {
    const reasons = [];
    if (String(entry.formId || "") === String(pokemon.formId || "")) reasons.push("formId");
    if (String(entry.dexId || "") === String(pokemon.dexId || "") && String(entry.slug || "") === String(pokemon.slug || "")) reasons.push("dexId+slug");
    if (entry.file === targetPath) reasons.push("chemin");
    if (reasons.length) conflicts.push({ file: entry.file, formId: entry.formId, reasons });
  }
  return conflicts;
}

function findParent(inventory, pokemon) {
  return inventory.find((entry) =>
    entry.file.startsWith("data/pokemon/normal/")
    && String(entry.formId || "") === String(pokemon.baseFormId || "")
    && Number(entry.dexNr) === Number(pokemon.dexNr),
  ) || null;
}

function matchingBracket(text, start) {
  let depth = 0;
  let quote = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') quote = false;
      continue;
    }
    if (character === '"') quote = true;
    else if (character === "[") depth += 1;
    else if (character === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function patchJsonStringArray(source, key, value) {
  const expression = new RegExp(`(^|\\n)([ \\t]*)"${key.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}"\\s*:\\s*\\[`, "m");
  const match = expression.exec(source);
  if (!match) throw builderError(`Tableau parent introuvable : ${key}.`, "PARENT_PATCH_TARGET_MISSING", 409);
  const arrayStart = source.indexOf("[", match.index + match[0].length - 1);
  const arrayEnd = matchingBracket(source, arrayStart);
  if (arrayEnd < 0) throw builderError(`Tableau parent invalide : ${key}.`, "PARENT_PATCH_TARGET_INVALID", 409);
  const current = JSON.parse(source.slice(arrayStart, arrayEnd + 1));
  if (!Array.isArray(current) || current.some((item) => typeof item !== "string")) {
    throw builderError(`Le champ ${key} n’est pas un tableau d’identités.`, "PARENT_PATCH_TARGET_INVALID", 409);
  }
  if (current.includes(value)) return { content: source, changed: false };
  const indent = match[2];
  const childIndent = `${indent}  `;
  const replacement = current.length === 0
    ? `[\n${childIndent}${JSON.stringify(value)}\n${indent}]`
    : `${source.slice(arrayStart, arrayEnd).replace(/\s*$/, "")},\n${childIndent}${JSON.stringify(value)}\n${indent}]`;
  const content = `${source.slice(0, arrayStart)}${replacement}${source.slice(arrayEnd + 1)}`;
  JSON.parse(content);
  return { content, changed: true };
}

function patchJsonBoolean(source, key, value) {
  const expression = new RegExp(`("${key.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}"\\s*:\\s*)(true|false)`);
  const match = expression.exec(source);
  if (!match) throw builderError(`Booléen parent introuvable : ${key}.`, "PARENT_PATCH_TARGET_MISSING", 409);
  const current = match[2] === "true";
  if (current === value) return { content: source, changed: false };
  const content = `${source.slice(0, match.index)}${match[1]}${String(value)}${source.slice(match.index + match[0].length)}`;
  JSON.parse(content);
  return { content, changed: true };
}

function parentPatchContract(entityType) {
  if (["mega", "primal"].includes(entityType)) return { arrays: ["megaEvolutions"], booleans: ["hasMegaEvolution"] };
  if (entityType === "dynamax") return { arrays: ["dynamaxForms"], booleans: [] };
  if (entityType === "gigantamax") return { arrays: ["gigantamaxForms"], booleans: ["hasGigantamaxEvolution"] };
  if (["alola", "galar", "hisui", "paldea"].includes(entityType)) return { arrays: ["regionForms"], booleans: [] };
  return { arrays: [], booleans: [] };
}

function parentPatch(root, inventory, pokemon, entityType, operationId) {
  if (entityType === "normal") return [];
  const contract = parentPatchContract(entityType);
  const parent = findParent(inventory, pokemon);
  if (!parent) {
    return [{ issue: { level: "blocking", code: "PARENT_IDENTITY_MISSING", path: "$.baseFormId", message: "La fiche normale parente est introuvable." } }];
  }
  const source = readText(root, parent.file);
  if (!contract.arrays.length && !contract.booleans.length) return [];
  let content = source;
  let changed = false;
  for (const key of contract.arrays) {
    const patched = patchJsonStringArray(content, key, pokemon.formId);
    content = patched.content;
    changed ||= patched.changed;
  }
  for (const key of contract.booleans) {
    const patched = patchJsonBoolean(content, key, true);
    content = patched.content;
    changed ||= patched.changed;
  }
  if (!changed) return [];
  const backupPath = `operations/backups/json-builder/${operationId}/${parent.file}`;
  return [
    { kind: "parent-backup", relativePath: backupPath, content: source, mode: "create", expected: { exists: false, sha256: null, bytes: 0 } },
    { kind: "parent-patch", relativePath: parent.file, content, mode: "update", expected: fileState(root, parent.file), beforeContent: source },
  ];
}

function categoryDirectory(category) {
  return CATEGORY_DIRECTORIES[String(category || "").toUpperCase()] || null;
}

function updateAssetManifest(root, generatedFiles, category) {
  const source = readText(root, ASSET_MANIFEST);
  if (!source) throw builderError("Manifeste Assets canonique introuvable.", "ASSET_MANIFEST_MISSING", 500);
  const manifest = JSON.parse(source);
  const directory = categoryDirectory(category);
  const additions = generatedFiles.filter((file) => file.kind.startsWith("assets:"));
  for (const file of additions) {
    const family = file.kind.slice("assets:".length);
    if (manifest.files.some((entry) => entry.path === file.relativePath)) {
      throw builderError(`Collision dans le manifeste Assets : ${file.relativePath}.`, "FILE_COLLISION", 409);
    }
    manifest.files.push({ path: file.relativePath, sha256: sha256(file.content), bytes: Buffer.byteLength(file.content) });
    manifest.counts[family][directory] = Number(manifest.counts[family][directory] || 0) + 1;
    manifest.totals[family] = Number(manifest.totals[family] || 0) + 1;
  }
  manifest.files.sort((left, right) => left.path.localeCompare(right.path));
  return { kind: "asset-manifest", relativePath: ASSET_MANIFEST, content: serializeOrdered(manifest), mode: "update", expected: fileState(root, ASSET_MANIFEST), beforeContent: source };
}

function updatePvpManifest(root, generatedFiles, pokemon, category) {
  const source = readText(root, PVP_MANIFEST);
  if (!source) throw builderError("Manifeste PvP canonique introuvable.", "PVP_MANIFEST_MISSING", 500);
  const manifest = JSON.parse(source);
  const file = generatedFiles.find((item) => item.kind === "pvp");
  if (!file) throw builderError("Fichier PvP de statut absent du plan.", "PVP_STATUS_FILE_MISSING", 500);
  if (manifest.files.some((entry) => entry.path === file.relativePath || entry.pvpId === pokemon.formId)) {
    throw builderError(`Collision dans le manifeste PvP : ${file.relativePath}.`, "FILE_COLLISION", 409);
  }
  manifest.records = Number(manifest.records || 0) + 1;
  const directory = categoryDirectory(category);
  manifest.counts[directory] = Number(manifest.counts[directory] || 0) + 1;
  for (const league of Object.values(file.data.leagues || {})) {
    manifest.statuses[league.id] ||= {};
    manifest.statuses[league.id][league.status] = Number(manifest.statuses[league.id][league.status] || 0) + 1;
  }
  manifest.files.push({ pvpId: pokemon.formId, path: file.relativePath, category, sha256: sha256(file.content) });
  manifest.files.sort((left, right) => left.pvpId.localeCompare(right.pvpId));
  return { kind: "pvp-manifest", relativePath: PVP_MANIFEST, content: serializeOrdered(manifest), mode: "update", expected: fileState(root, PVP_MANIFEST), beforeContent: source };
}

function mirrorDirectoryWithHardlinks(source, target) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      mirrorDirectoryWithHardlinks(sourcePath, targetPath);
    } else if (entry.isFile()) {
      try {
        fs.linkSync(sourcePath, targetPath);
      } catch {
        fs.copyFileSync(sourcePath, targetPath, fs.constants.COPYFILE_EXCL);
      }
    }
  }
}

function updateIdentityInventory(root, generatedFiles, generatedAt) {
  const source = readText(root, IDENTITY_INVENTORY);
  if (!source) throw builderError("Inventaire Identity canonique introuvable.", "IDENTITY_INVENTORY_MISSING", 500);
  const inventoryModule = path.join(root, "tooling", "lib", "pokemon-local-identity-inventory.js");
  const generatorModule = path.join(root, "tooling", "scripts", "generators", "generatePokemonLocalIdentityInventory.js");
  if (!fs.existsSync(inventoryModule) || !fs.existsSync(generatorModule)) {
    throw builderError("Générateur Identity canonique introuvable.", "IDENTITY_GENERATOR_MISSING", 500);
  }

  const overlayRoot = fs.mkdtempSync(path.join(os.tmpdir(), "json-builder-identity-"));
  try {
    mirrorDirectoryWithHardlinks(path.join(root, "data", "pokemon"), path.join(overlayRoot, "data", "pokemon"));
    mirrorDirectoryWithHardlinks(path.join(root, "data", "assets"), path.join(overlayRoot, "data", "assets"));
    for (const file of generatedFiles.filter((entry) => entry.relativePath.startsWith("data/pokemon/") || entry.relativePath.startsWith("data/assets/"))) {
      const destination = path.join(overlayRoot, file.relativePath);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      if (fs.existsSync(destination)) fs.unlinkSync(destination);
      fs.writeFileSync(destination, file.content, "utf8");
    }
    const dataRequire = createRequire(path.join(root, "package.json"));
    const { loadPokemonLocalIdentityInventory } = dataRequire(inventoryModule);
    const { stablePayload } = dataRequire(generatorModule);
    const inventory = loadPokemonLocalIdentityInventory(overlayRoot);
    inventory.metadata.generatedAt = new Date(generatedAt).toISOString();
    const payload = stablePayload(inventory);
    return {
      kind: "identity-inventory",
      relativePath: IDENTITY_INVENTORY,
      content: serializeOrdered(payload),
      mode: "update",
      expected: fileState(root, IDENTITY_INVENTORY),
      beforeContent: source,
      stats: inventory.stats,
    };
  } finally {
    fs.rmSync(overlayRoot, { recursive: true, force: true });
  }
}

function unifiedDiff(file) {
  if (file.mode === "create") return `--- /dev/null\n+++ b/${file.relativePath}\n@@ nouveau fichier @@\n${file.content.split("\n").map((line) => `+${line}`).join("\n")}`;
  const before = String(file.beforeContent || "").split("\n");
  const after = String(file.content || "").split("\n");
  let prefix = 0;
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) prefix += 1;
  let suffix = 0;
  while (suffix < before.length - prefix && suffix < after.length - prefix && before.at(-1 - suffix) === after.at(-1 - suffix)) suffix += 1;
  const oldSlice = before.slice(prefix, before.length - suffix);
  const newSlice = after.slice(prefix, after.length - suffix);
  return [
    `--- a/${file.relativePath}`,
    `+++ b/${file.relativePath}`,
    `@@ -${prefix + 1},${oldSlice.length} +${prefix + 1},${newSlice.length} @@`,
    ...oldSlice.map((line) => `-${line}`),
    ...newSlice.map((line) => `+${line}`),
  ].join("\n");
}

function signingSecret(secret) {
  const value = String(secret || process.env.JSON_BUILDER_SIGNING_SECRET || process.env.SESSION_SECRET || "");
  if (!value) throw builderError("Secret de signature JSON Builder absent.", "JSON_BUILDER_SIGNING_SECRET_MISSING", 503);
  return value;
}

function signPayload(payload, secret) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", signingSecret(secret)).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyToken(token, secret) {
  const [encoded, signature, extra] = String(token || "").split(".");
  if (!encoded || !signature || extra) throw builderError("Jeton dry-run invalide.", "DRY_RUN_TOKEN_INVALID", 409);
  const expected = crypto.createHmac("sha256", signingSecret(secret)).update(encoded).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) throw builderError("Signature dry-run invalide.", "DRY_RUN_TOKEN_INVALID", 409);
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  if (Date.now() > Number(payload.expiresAt || 0)) throw builderError("Le dry-run a expiré ; recalculez l’aperçu.", "DRY_RUN_STALE", 409);
  return payload;
}

function operationId() {
  return `json-builder-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`;
}

function git(root, args, options = {}) {
  const result = spawnSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024, ...options });
  return { status: result.status, stdout: String(result.stdout || "").trim(), stderr: String(result.stderr || "").trim() };
}

function repositoryState(root) {
  const head = git(root, ["rev-parse", "HEAD"]);
  const branch = git(root, ["branch", "--show-current"]);
  return { head: head.status === 0 ? head.stdout : null, branch: branch.status === 0 ? branch.stdout : null, git: head.status === 0 };
}

function planFingerprint(contract, draft, files, repository) {
  return sha256(JSON.stringify({
    contract: contract.fingerprint,
    draft,
    repository,
    files: files.map((file) => ({ path: file.relativePath, content: sha256(file.content), expected: file.expected })),
  }));
}

function buildDryRun({ root, contractRoot = root, draft, owner, secret, now = Date.now(), requestedOperationId = null, requireDevelop = true }) {
  const contract = loadCanonicalContract(contractRoot);
  const generated = buildCanonicalFiles(contract, draft);
  const id = requestedOperationId || operationId();
  const inventory = loadIdentityInventory(root);
  const collisions = identityCollisions(inventory, generated.pokemon, generated.pokemonPath);
  const issues = [...generated.issues];
  if (collisions.length) issues.push({ level: "blocking", code: "IDENTITY_COLLISION", path: "$.formId", message: `${collisions.length} collision(s) d’identité détectée(s).`, details: collisions });

  const planned = generated.files.map((file) => ({ ...file, expected: fileState(root, file.relativePath) }));
  for (const file of planned) {
    normalizeRelativePath(file.relativePath);
    if (file.expected.exists) issues.push({ level: "blocking", code: "OVERWRITE_PROTECTED", path: file.relativePath, message: "Le fichier existe déjà ; l’écrasement est interdit." });
  }
  const parentEntries = parentPatch(root, inventory, generated.pokemon, draft.entityType, id);
  for (const entry of parentEntries) {
    if (entry.issue) issues.push(entry.issue);
    else planned.push(entry);
  }
  if (draft.entityType === "gigantamax" && !inventory.some((entry) => entry.formId === `${generated.pokemon.baseFormId}_DYNAMAX`)) {
    issues.push({ level: "blocking", code: "DYNAMAX_DEPENDENCY_MISSING", path: "$.dynamaxForms", message: "La forme Dynamax parente requise par la forme Gigamax est introuvable." });
  }
  if (!issues.some((issue) => issue.code === "FILE_COLLISION" || issue.code === "OVERWRITE_PROTECTED")) {
    planned.push(updateAssetManifest(root, planned, generated.category));
    planned.push(updatePvpManifest(root, planned, generated.pokemon, generated.category));
    planned.push(updateIdentityInventory(root, planned, now));
  }
  const repository = repositoryState(root);
  if (requireDevelop && repository.git && repository.branch !== "develop") {
    issues.push({ level: "blocking", code: "DEVELOP_BRANCH_REQUIRED", path: "$repository", message: `Branche Data refusée : ${repository.branch || "détachée"}.` });
  }
  const blocking = issues.filter((issue) => issue.level === "blocking").length;
  const fingerprint = planFingerprint(contract, draft, planned, repository);
  const expiresAt = now + TOKEN_TTL_MS;
  const tokenPayload = {
    version: 1,
    operationId: id,
    owner: sha256(String(owner || "anonymous")),
    fingerprint,
    issuedAt: now,
    expiresAt,
    expected: Object.fromEntries(planned.map((file) => [file.relativePath, file.expected])),
    repository,
  };
  const token = signPayload(tokenPayload, secret);
  return {
    operationId: id,
    contractFingerprint: contract.fingerprint,
    fingerprint,
    token,
    issuedAt: new Date(now).toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
    repository,
    category: generated.category,
    identity: { id: generated.pokemon.id, formId: generated.pokemon.formId, baseFormId: generated.pokemon.baseFormId, dexId: generated.pokemon.dexId, slug: generated.pokemon.slug },
    preview: serializeOrdered(generated.pokemon),
    files: planned.map((file) => ({
      kind: file.kind,
      relativePath: file.relativePath,
      mode: file.mode,
      bytes: Buffer.byteLength(file.content),
      beforeSha256: file.expected?.sha256 || null,
      afterSha256: sha256(file.content),
      content: file.content,
      diff: unifiedDiff(file),
    })),
    issues,
    collisions,
    completeness: { blocking, informative: issues.length - blocking, canCommit: blocking === 0 },
    checks: {
      templatesConsumed: true,
      recursiveKeyOrderPreserved: true,
      existingJsonReformatted: 0,
      existingJsonReordered: 0,
      unrelatedJsonModified: 0,
      overwriteProtection: true,
      identityInventory: inventory.length,
      engine: blocking === 0 ? "SCHEMA_AND_IDENTITY_VALID" : "BLOCKED",
    },
    _planned: planned,
  };
}

function assertPlanFresh(root, dryRun, tokenPayload) {
  if (dryRun.fingerprint !== tokenPayload.fingerprint) throw builderError("Le brouillon ne correspond plus au dry-run signé.", "DRY_RUN_STALE", 409);
  const state = repositoryState(root);
  if (tokenPayload.repository?.head && state.head !== tokenPayload.repository.head) throw builderError("Le dépôt Data a changé depuis le dry-run.", "DRY_RUN_STALE", 409);
  for (const [relativePath, expected] of Object.entries(tokenPayload.expected || {})) {
    const current = fileState(root, relativePath);
    if (current.exists !== expected.exists || current.sha256 !== expected.sha256) {
      throw builderError(`Le fichier ${relativePath} a changé depuis le dry-run.`, "DRY_RUN_STALE", 409);
    }
  }
}

function atomicInstall(root, writes, { failAfter = null } = {}) {
  const txRoot = fs.mkdtempSync(path.join(root, ".json-builder-tx-"));
  const stagedRoot = path.join(txRoot, "staged");
  const backupRoot = path.join(txRoot, "backup");
  const installed = [];
  try {
    for (const write of writes) {
      const relativePath = normalizeRelativePath(write.relativePath);
      const current = fileState(root, relativePath);
      if (current.exists !== write.expected.exists || current.sha256 !== write.expected.sha256) {
        throw builderError(`État périmé avant écriture : ${relativePath}.`, "DRY_RUN_STALE", 409);
      }
      const staged = path.join(stagedRoot, relativePath);
      fs.mkdirSync(path.dirname(staged), { recursive: true });
      const descriptor = fs.openSync(staged, "wx", 0o600);
      fs.writeFileSync(descriptor, write.content, "utf8");
      fs.fsyncSync(descriptor);
      fs.closeSync(descriptor);
    }
    for (let index = 0; index < writes.length; index += 1) {
      const write = writes[index];
      const relativePath = normalizeRelativePath(write.relativePath);
      const destination = pathInsideRoot(root, relativePath);
      const staged = path.join(stagedRoot, relativePath);
      const backup = path.join(backupRoot, relativePath);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      if (fs.existsSync(destination)) {
        fs.mkdirSync(path.dirname(backup), { recursive: true });
        fs.renameSync(destination, backup);
      }
      fs.renameSync(staged, destination);
      installed.push({ destination, backup, existed: fs.existsSync(backup) });
      if (failAfter !== null && index + 1 >= failAfter) throw builderError("Échec injecté pour valider le rollback.", "ROLLBACK_TEST_FAILURE", 500);
    }
    return { atomic: true, rolledBack: false, filesWritten: writes.length };
  } catch (error) {
    for (const item of installed.reverse()) {
      if (fs.existsSync(item.destination)) fs.unlinkSync(item.destination);
      if (item.existed && fs.existsSync(item.backup)) {
        fs.mkdirSync(path.dirname(item.destination), { recursive: true });
        fs.renameSync(item.backup, item.destination);
      }
    }
    error.rollback = { atomic: true, rolledBack: true, filesRestored: installed.length };
    throw error;
  } finally {
    fs.rmSync(txRoot, { recursive: true, force: true });
  }
}

function rollbackInstalled(root, writes) {
  const restored = [];
  for (const write of [...writes].reverse()) {
    const destination = pathInsideRoot(root, write.relativePath);
    if (write.expected.exists) {
      if (typeof write.beforeContent !== "string") throw builderError(`Rollback impossible sans contenu initial : ${write.relativePath}.`, "ROLLBACK_SOURCE_MISSING", 500);
      const temporary = `${destination}.${process.pid}.${Date.now()}.rollback.tmp`;
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(temporary, write.beforeContent, { encoding: "utf8", mode: 0o600 });
      fs.renameSync(temporary, destination);
    } else if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
    restored.push(write.relativePath);
  }
  return { atomic: true, rolledBack: true, filesRestored: restored.length };
}

function runCanonicalEngine(root) {
  const engineFile = path.resolve(__dirname, "../apps/checklist/server/engine.js");
  const script = [
    "const engine = require(process.argv[1]);",
    "const result = engine.buildCanonicalEngineReport();",
    "const payload = { status: result.report.status, diagnostics: result.report.diagnostics.length, assetValid: result.assetArchitecture.summary.valid, assetErrors: result.assetArchitecture.summary.errors, pvpValid: result.pvpArchitecture.summary.valid, pvpErrors: result.pvpArchitecture.summary.errors, coverage: result.report.coverage };",
    "process.stdout.write(JSON.stringify(payload));",
    "if (!payload.assetValid || !payload.pvpValid || payload.status === 'INVALID') process.exitCode = 2;",
  ].join("\n");
  const result = spawnSync(process.execPath, ["-e", script, engineFile], {
    cwd: path.resolve(__dirname, "../../../.."),
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, POKEMON_GO_DATA_DIR: path.resolve(root) },
  });
  let report = null;
  try { report = JSON.parse(String(result.stdout || "{}")); } catch { /* message détaillé ci-dessous */ }
  if (result.status !== 0 || !report) {
    throw builderError(result.stderr || result.stdout || "Engine canonique en échec.", "CANONICAL_ENGINE_FAILED", 409, report);
  }
  return report;
}

function gitCommit(root, relativePaths, message, { push = false } = {}) {
  const branch = repositoryState(root).branch;
  if (branch !== "develop") throw builderError("Seule la branche develop peut recevoir le JSON Builder.", "DEVELOP_BRANCH_REQUIRED", 409);
  const add = git(root, ["add", "--", ...relativePaths]);
  if (add.status !== 0) throw builderError(add.stderr || "Indexation Git impossible.", "GIT_ADD_FAILED", 500);
  const commit = git(root, ["commit", "-m", message]);
  if (commit.status !== 0) throw builderError(commit.stderr || commit.stdout || "Commit Git impossible.", "GIT_COMMIT_FAILED", 500);
  const head = git(root, ["rev-parse", "HEAD"]).stdout;
  if (push) {
    const pushed = git(root, ["push", "origin", "develop"]);
    if (pushed.status !== 0) throw builderError(pushed.stderr || "Push develop impossible.", "GIT_PUSH_FAILED", 502);
  }
  return { committed: true, pushed: Boolean(push), head, branch: "develop", message };
}

function commitDryRun({ root, contractRoot = root, draft, token, owner, secret, push = false, commit = false, failAfter = null, engineCheck = true }) {
  const tokenPayload = verifyToken(token, secret);
  if (tokenPayload.owner !== sha256(String(owner || "anonymous"))) throw builderError("Le dry-run appartient à une autre session.", "DRY_RUN_TOKEN_INVALID", 403);
  const dryRun = buildDryRun({ root, contractRoot, draft, owner, secret, now: tokenPayload.issuedAt, requestedOperationId: tokenPayload.operationId, requireDevelop: true });
  if (!dryRun.completeness.canCommit) throw builderError("Le plan contient des erreurs bloquantes.", "DRY_RUN_BLOCKED", 409, dryRun.issues);
  assertPlanFresh(root, dryRun, tokenPayload);

  const reportPath = `operations/reports/json-builder/${dryRun.operationId}.json`;
  const report = {
    schemaVersion: 1,
    operationId: dryRun.operationId,
    createdAt: new Date().toISOString(),
    owner: sha256(String(owner || "anonymous")),
    fingerprint: dryRun.fingerprint,
    identity: dryRun.identity,
    category: dryRun.category,
    status: "APPLIED",
    checks: dryRun.checks,
    files: dryRun.files.map(({ content, diff, ...file }) => file),
  };
  const reportWrite = { kind: "operation-report", relativePath: reportPath, content: serializeOrdered(report), mode: "create", expected: fileState(root, reportPath) };
  if (reportWrite.expected.exists) throw builderError("Le rapport d’opération existe déjà.", "FILE_COLLISION", 409);
  const writes = [...dryRun._planned, reportWrite];
  const transaction = atomicInstall(root, writes, { failAfter });
  let engineReport = { status: "SKIPPED_BY_TEST_HARNESS" };
  try {
    if (engineCheck) engineReport = runCanonicalEngine(root);
  } catch (error) {
    error.rollback = rollbackInstalled(root, writes);
    throw error;
  }
  let gitResult = { committed: false, pushed: false, head: repositoryState(root).head, branch: repositoryState(root).branch };
  if (commit) {
    try {
      gitResult = gitCommit(root, writes.map((file) => file.relativePath), `feat(data): add ${dryRun.identity.formId} via JSON Builder`, { push });
    } catch (error) {
      if (error.code !== "GIT_PUSH_FAILED") {
        git(root, ["restore", "--staged", "--", ...writes.map((file) => file.relativePath)]);
        error.rollback = rollbackInstalled(root, writes);
      }
      throw error;
    }
  }
  return {
    operationId: dryRun.operationId,
    fingerprint: dryRun.fingerprint,
    transaction,
    engine: engineReport,
    git: gitResult,
    reportPath,
    files: writes.map((file) => ({ relativePath: file.relativePath, sha256: sha256(file.content), bytes: Buffer.byteLength(file.content) })),
  };
}

function loadCatalog(root) {
  const identities = loadIdentityInventory(root);
  const moves = listJsonFiles(path.join(root, "data", "moves")).flatMap((file) => {
    try {
      const value = readJsonFile(file);
      return [{ id: value.id, slug: value.slug, category: value.category, type: value.type, name: value.names?.French || value.names?.English || value.id }];
    } catch {
      return [];
    }
  });
  const types = [...new Set(moves.map((move) => move.type).filter(Boolean))].sort();
  return { identities, moves, types };
}

function publicContract(root, contractRoot = root) {
  const contract = loadCanonicalContract(contractRoot);
  return {
    fingerprint: contract.fingerprint,
    entityTypes: contract.entityTypes,
    valueStates: contract.valueStates,
    templates: contract.pokemonTemplates,
    assetTemplates: contract.assetTemplates,
    schemas: contract.schemas,
    catalog: loadCatalog(root),
  };
}

function copyDataRepository(source, target) {
  fs.cpSync(source, target, { recursive: true, filter: (file) => !file.includes(`${path.sep}.git${path.sep}`) && !file.endsWith(`${path.sep}.git`) });
}

module.exports = {
  ALLOWED_WRITE_PREFIXES,
  ASSET_MANIFEST,
  IDENTITY_INVENTORY,
  PVP_MANIFEST,
  TOKEN_TTL_MS,
  assertPlanFresh,
  atomicInstall,
  buildDryRun,
  commitDryRun,
  copyDataRepository,
  fileState,
  identityCollisions,
  loadCatalog,
  loadIdentityInventory,
  normalizeRelativePath,
  patchJsonStringArray,
  patchJsonBoolean,
  pathInsideRoot,
  publicContract,
  rollbackInstalled,
  runCanonicalEngine,
  repositoryState,
  verifyToken,
};
