const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const {
  appRoot,
  dataPath,
  dataRoot,
  isInsideData,
  relativeToApp,
  relativeToData,
  resolveDataFile,
} = require("../../../src/lib/data-repository");
const { detailForKey, hydrateSourceData, validateSourceData } = require("./engine");
const {
  deleteCustomRule,
  listCustomRules,
  previewCustomRule,
  saveCustomRule,
  toggleCustomRule,
} = require("./custom-rules");

const rootDir = appRoot;
const notesFile = path.join(rootDir, ".checklist-notes.json");
const reviewsFile = path.join(rootDir, ".checklist-image-reviews.json");
const hdDir = path.join(rootDir, "asset", "HD");
const shuffleDir = path.join(rootDir, "asset", "pokemonShuffle");
const typesFile = dataPath("data", "reference", "types", "types.json");
const weatherFile = dataPath("data", "reference", "weather", "weather.json");
const stickersFile = dataPath("data", "reference", "stickers", "stickers.json");
const movesDir = dataPath("data", "moves");
const adventureEffectsDir = dataPath("data", "adventure-effects", "effects");
const remoteHd =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/PokemonHd";
const remoteShuffle =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/pokemonShuffle";
const remoteLocationCards =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/LocationCards";
const filenamePattern =
  /^poke_capture_(\d{4})_(\d{3})_([^_]+)_([^_]+)_(\d{8})_([^_]+)_([nr])\.png$/;
let remoteHdCache = null;
let remoteShuffleCache = null;
let remoteLocationCardsCache = null;
let remoteAssetTreeCache = null;
let remoteAssetTreePromise = null;

async function allRemoteAssetTree() {
  if (remoteAssetTreeCache) return remoteAssetTreeCache;
  if (!remoteAssetTreePromise) {
    const headers = { "user-agent": "PokemonGo-API-checklist" };
    const token = String(process.env.GITHUB_TOKEN || "").trim();
    if (token) headers.authorization = `Bearer ${token}`;
    remoteAssetTreePromise = fetch(
      "https://api.github.com/repos/Matthieu-Vachet/PokemonGo-Assets-API/git/trees/main?recursive=1",
      { headers, next: { revalidate: 3600 } },
    )
      .then(async (response) => {
        if (!response.ok) throw new Error(`GitHub assets: HTTP ${response.status}`);
        const tree = await response.json();
        remoteAssetTreeCache = tree.tree || [];
        return remoteAssetTreeCache;
      })
      .catch((error) => {
        remoteAssetTreePromise = null;
        throw error;
      });
  }
  return remoteAssetTreePromise;
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function validate(data, relativeFile, kind) {
  return validateSourceData(data, relativeFile, kind);
}

function customRules() {
  return listCustomRules();
}

function parseAsset(filename) {
  const match = filename.match(filenamePattern);
  if (!match) return null;
  return {
    dexId: match[1],
    formIndex: match[2],
    genderCode: match[3],
    gender:
      {
        fd: "différence femelle",
        fo: "femelle uniquement",
        md: "différence mâle",
        mf: "partagé",
        mo: "mâle uniquement",
        uk: "sans genre",
      }[match[3]] || "inconnu",
    gigantamax: match[4] === "g",
    detail: match[5],
    view: match[6] === "b" ? "back" : "front",
    shiny: match[7] === "r",
    filename,
    url: `${remoteHd}/${filename}`,
  };
}

async function allHdAssets() {
  if (fs.existsSync(hdDir))
    return fs.readdirSync(hdDir).map(parseAsset).filter(Boolean);
  if (remoteHdCache) return remoteHdCache;
  const tree = await allRemoteAssetTree();
  remoteHdCache = tree
    .filter((item) => item.type === "blob" && item.path.startsWith("PokemonHd/"))
    .map((item) => parseAsset(path.basename(item.path)))
    .filter(Boolean);
  return remoteHdCache;
}

function usedAssetUrls(assets = allGoAssets()) {
  return assets.map((asset) => ({ url: asset.url, file: asset.file }));
}

function allGoAssets() {
  const assets = [];
  const add = (data, file, label, url, shiny = false, details = "", assetType = "go") => {
    if (!url) return;
    assets.push({
      dexId: data.dexId || path.basename(file).slice(0, 4),
      name: data.names?.French || data.names?.English || data.slug || data.id,
      form: data.form || "normal",
      assetType,
      label,
      shiny,
      details,
      url,
      filename: path.basename(url),
      file: relativeToApp(file),
    });
  };
  for (const file of [
    ...listFiles(dataPath("data", "pokemon")),
  ]) {
    const data = hydrateSourceData(readJson(file, {}));
    add(data, file, "Image principale", data.assets?.image, false, "", "go");
    add(data, file, "Image principale shiny", data.assets?.shinyImage, true, "", "go");
    add(data, file, "Candy", data.assets?.candy?.image, false, `familyId ${data.assets?.candy?.familyId ?? "-"}`, "candy");
    add(data, file, "Candy XL", data.assets?.candy?.xlImage, false, `familyId ${data.assets?.candy?.familyId ?? "-"}`, "xl-candy");
    add(data, file, "Portrait", data.assets?.portrait, false, "portrait", "portrait");
    add(data, file, "Portrait shiny", data.assets?.portraitShiny, true, "portrait", "portrait");
    add(data, file, "Home", data.assets?.home?.image, false, "home", "home");
    add(data, file, "Home shiny", data.assets?.home?.shinyImage, true, "home", "home");
    for (const [index, asset] of (data.assets?.home?.variants || []).entries()) {
      const details = [
        asset.formIndex && `formIndex ${asset.formIndex}`,
        asset.gender && `genre ${asset.gender}`,
        asset.detail && `detail ${asset.detail}`,
        asset.view && `vue ${asset.view}`,
        asset.gigantamax && "gigantamax",
      ]
        .filter(Boolean)
        .join(" · ");
      add(data, file, `Home variante ${index + 1}`, asset.image, false, details, "home");
      add(data, file, `Home variante ${index + 1} shiny`, asset.shinyImage, true, details, "home");
    }
    for (const [index, asset] of (data.assetForms || []).entries()) {
      const details = [
        asset.form && `forme ${asset.form}`,
        asset.costume && `costume ${asset.costume}`,
        asset.isFemale && "femelle",
      ]
        .filter(Boolean)
        .join(" · ");
      add(data, file, `Variante ${index + 1}`, asset.image, false, details, "variant");
      add(
        data,
        file,
        `Variante ${index + 1} shiny`,
        asset.shinyImage,
        true,
        details,
        "variant",
      );
    }
    for (const [index, asset] of (data.assets?.shuffle?.variants || []).entries()) {
      const details = [asset.form, asset.state, ...(asset.tags || [])].filter(Boolean).join(" · ");
      add(data, file, `Shuffle ${index + 1}`, asset.image, Boolean(asset.shiny), details, "shuffle");
    }
    for (const [index, asset] of (data.assets?.locationCards || []).entries()) {
      add(data, file, `Background ${index + 1}`, asset.image, false, asset.name || asset.type || "", "background");
    }
  }
  return assets.sort(
    (left, right) =>
      left.dexId.localeCompare(right.dexId) ||
      left.form.localeCompare(right.form) ||
      Number(left.shiny) - Number(right.shiny),
  );
}

function parseShuffleAsset(filename) {
  const match = filename.match(/^(\d+)_([^.]+)\.png$/i);
  if (!match) return null;
  const codes = match[2].split("_").filter(Boolean);
  const shiny = codes.at(-1) === "chromatique";
  const withoutShiny = shiny ? codes.slice(0, -1) : codes;
  const terminal = ["dynamax", "gigantamax", "shadow", "purified"].includes(
    withoutShiny.at(-1),
  )
    ? withoutShiny.at(-1)
    : null;
  const state =
    terminal ||
    (withoutShiny.includes("mega") ? "mega" : withoutShiny.includes("event") ? "event" : "normal");
  return {
    dexId: String(Number(match[1])).padStart(4, "0"),
    name: `Pokémon n° ${Number(match[1])}`,
    form: "shuffle",
    state,
    label: `${state}${shiny ? " · chromatique" : ""}`,
    shiny,
    details: codes.join(" · ") || "",
    url: `${remoteShuffle}/${encodeURIComponent(filename)}`,
    filename,
    file: null,
  };
}

async function allShuffleAssets() {
  let assets;
  if (fs.existsSync(shuffleDir)) {
    assets = fs.readdirSync(shuffleDir).map(parseShuffleAsset).filter(Boolean);
  } else if (remoteShuffleCache) {
    assets = remoteShuffleCache;
  } else {
    const tree = await allRemoteAssetTree();
    remoteShuffleCache = tree
      .filter((item) => item.type === "blob" && item.path.startsWith("pokemonShuffle/"))
      .map((item) => parseShuffleAsset(path.basename(item.path)))
      .filter(Boolean);
    assets = remoteShuffleCache;
  }
  return assets
    .sort(
      (left, right) =>
        left.dexId.localeCompare(right.dexId) ||
        left.filename.localeCompare(right.filename),
    );
}

function locationCardLabel(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/^(lc|sb)_/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function allLocationCardAssets() {
  if (remoteLocationCardsCache) return remoteLocationCardsCache;

  const tree = await allRemoteAssetTree();
  remoteLocationCardsCache = tree
    .filter((item) => item.type === "blob" && item.path.startsWith("LocationCards/"))
    .map((item) => {
      const filename = path.basename(item.path);
      return {
        filename,
        label: locationCardLabel(filename),
        url: `${remoteLocationCards}/${encodeURIComponent(filename)}`,
      };
    })
    .sort((left, right) => left.label.localeCompare(right.label, "fr"));

  return remoteLocationCardsCache;
}

function knownCandyFamilies() {
  const families = new Map();
  for (const file of [
    ...listFiles(dataPath("data", "pokemon")),
  ]) {
    const data = hydrateSourceData(readJson(file, {}), { families: [] });
    const value = data.assets?.candy?.familyId;
    if (value === null || value === undefined || value === "") continue;
    const familyId = Number(value);
    if (!Number.isInteger(familyId) || familyId < 0) continue;
    const current = families.get(familyId) || [];
    current.push(relativeToApp(file));
    families.set(familyId, current);
  }
  return families;
}

function auditXlCandyAssets(tree, familyInventory = knownCandyFamilies()) {
  if (!Array.isArray(tree)) {
    return {
      status: "source-unavailable",
      files: 0,
      knownFamilies: familyInventory.size,
      missing: [],
      orphans: [],
      duplicates: [],
      invalid: [],
    };
  }
  const candidates = tree.filter(
    (item) => item?.type === "blob" && String(item.path || "").toLowerCase().startsWith("xl_candy/"),
  );
  const valid = [];
  const invalid = [];
  for (const item of candidates) {
    const match = String(item.path).match(/^xl_candy\/(0|[1-9]\d*)\.png$/);
    if (!match) {
      invalid.push({ path: item.path, reason: "Le chemin attendu est xl_candy/{familyId}.png, en minuscules." });
      continue;
    }
    valid.push({ familyId: Number(match[1]), path: item.path, size: item.size ?? null });
  }
  const byFamily = new Map();
  for (const item of valid) {
    const current = byFamily.get(item.familyId) || [];
    current.push(item);
    byFamily.set(item.familyId, current);
  }
  const present = new Set(byFamily.keys());
  return {
    status: "success",
    files: valid.length,
    knownFamilies: familyInventory.size,
    missing: [...familyInventory.entries()]
      .filter(([familyId]) => !present.has(familyId))
      .map(([familyId, references]) => ({ familyId, references })),
    orphans: valid.filter((item) => !familyInventory.has(item.familyId)),
    duplicates: [...byFamily.entries()]
      .filter(([, items]) => items.length > 1)
      .map(([familyId, items]) => ({ familyId, paths: items.map((item) => item.path) })),
    invalid,
  };
}

async function assetAudit(dexId = "") {
  const remoteResults = await Promise.allSettled([
    allHdAssets(),
    allLocationCardAssets(),
    allShuffleAssets(),
    allRemoteAssetTree(),
  ]);
  const [assetsResult, locationCardsResult, shuffleAssetsResult, assetTreeResult] = remoteResults;
  const assets = assetsResult.status === "fulfilled" ? assetsResult.value : [];
  const locationCards = locationCardsResult.status === "fulfilled" ? locationCardsResult.value : [];
  const shuffleAssets = shuffleAssetsResult.status === "fulfilled" ? shuffleAssetsResult.value : [];
  const xlCandyAudit = auditXlCandyAssets(
    assetTreeResult.status === "fulfilled" ? assetTreeResult.value : null,
  );
  const warnings = [...new Set(remoteResults
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || "Bibliothèque distante indisponible."))];
  const goAssets = allGoAssets();
  const used = usedAssetUrls(goAssets);
  const counts = new Map();
  for (const item of used)
    counts.set(item.url, (counts.get(item.url) || 0) + 1);
  const countLinkedType = (type) => goAssets.filter((asset) => asset.assetType === type).length;
  const filterDex = String(dexId).padStart(4, "0");
  return {
    totals: {
      files: assets.length,
      used: new Set(used.map((item) => item.url)).size,
      unused: assets.filter((asset) => !counts.has(asset.url)).length,
      duplicated: [...counts.values()].filter((count) => count > 1).length,
      goFiles: goAssets.length,
      linkedGoFiles: countLinkedType("go"),
      variantFiles: countLinkedType("variant"),
      homeFiles: countLinkedType("home"),
      portraitFiles: countLinkedType("portrait"),
      backgroundFiles: countLinkedType("background"),
      locationCardLibraryFiles: locationCards.length,
      candyFiles: countLinkedType("candy"),
      linkedXlCandyFiles: countLinkedType("xl-candy"),
      xlCandyFiles: xlCandyAudit.files,
      linkedShuffleFiles: countLinkedType("shuffle"),
      shuffleFiles: shuffleAssets.length,
    },
    proposals: assets
      .filter((asset) => !dexId || asset.dexId === filterDex)
      .sort(
        (left, right) =>
          left.dexId.localeCompare(right.dexId) ||
          left.formIndex.localeCompare(right.formIndex) ||
          left.filename.localeCompare(right.filename),
      ),
    goAssets: goAssets.filter((asset) => !dexId || asset.dexId === filterDex),
    locationCards,
    shuffleAssets: shuffleAssets.filter(
      (asset) => !dexId || asset.dexId === filterDex,
    ),
    unused: assets.filter((asset) => !counts.has(asset.url)).slice(0, 300),
    duplicated: [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([url, count]) => ({ url, count })),
    xlCandyAudit,
    warnings,
  };
}

async function auditUrls(key) {
  const detail = detailForKey(key);
  if (!detail) throw new Error("Fiche introuvable.");
  const urls = [
    ...new Set(
      [...JSON.stringify(detail.sourceData || detail).matchAll(/https?:[^"\\]+\.(?:png|webp|jpe?g)/g)].map(
        (match) => match[0],
      ),
    ),
  ].slice(0, 100);
  return Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(6000),
        });
        return { url, ok: response.ok, status: response.status };
      } catch (error) {
        return { url, ok: false, status: 0, error: error.message };
      }
    }),
  );
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listFiles(file)
      : entry.isFile() && entry.name.endsWith(".json")
        ? [file]
      : [];
  });
}

function moveIdsFrom(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value && typeof value === "object") return Object.keys(value).filter(Boolean);
  return [];
}

function sourceKindForFile(file, data) {
  const relativeFile = relativeToData(file);
  if (relativeFile.startsWith("data/pokemon/normal/")) return "pokemon";
  const form = String(data.form || "");
  if (form.startsWith("mega") || form === "primal") return "mega";
  if (form === "dynamax" || form === "gigantamax") return form;
  return "form";
}

function linkedPokemonImage(data) {
  return (
    data.assets?.portrait ||
    data.assets?.image ||
    data.assets?.home?.image ||
    data.assets?.home?.shinyImage ||
    data.assetForms?.find((asset) => asset?.image)?.image ||
    null
  );
}

function buildMoveLinks() {
  const links = new Map();
  const files = [
    ...listFiles(dataPath("data", "pokemon")),
  ];
  for (const file of files) {
    const data = hydrateSourceData(readJson(file, {}), { families: [] });
    if (data.availability?.released === false) continue;
    const kind = sourceKindForFile(file, data);
    const relativeFile = relativeToApp(file);
    const pokemon = {
      key: `${kind}:${relativeFile}${kind === "mega" ? `#${data.formId || data.id}` : ""}`,
      kind,
      name: data.names?.French || data.names?.English || data.slug || data.id,
      dexId: data.dexId || path.basename(file).slice(0, 4),
      form: data.form || "normal",
      file: relativeFile,
      image: linkedPokemonImage(data),
      primaryType:
        typeof data.primaryType === "string"
          ? data.primaryType
          : data.primaryType?.type || null,
    };
    const slots = [
      ["quickMoves", "Rapide", moveIdsFrom(data.quickMoves)],
      ["cinematicMoves", "Chargée", moveIdsFrom(data.cinematicMoves)],
      ["eliteQuickMoves", "Elite rapide", moveIdsFrom(data.eliteQuickMoves)],
      ["eliteCinematicMoves", "Elite chargée", moveIdsFrom(data.eliteCinematicMoves)],
      ["maxBattle.moves", "Max", moveIdsFrom(data.maxBattle?.moves)],
    ];
    for (const [, slotLabel, moveIds] of slots) {
      for (const moveId of moveIds) {
        const current = links.get(moveId) || [];
        const existing = current.find((item) => item.key === pokemon.key);
        if (existing) {
          if (!existing.moveSlots.includes(slotLabel)) existing.moveSlots.push(slotLabel);
        } else {
          current.push({ ...pokemon, moveSlots: [slotLabel] });
        }
        links.set(moveId, current);
      }
    }
  }
  for (const [moveId, pokemon] of links.entries()) {
    links.set(
      moveId,
      pokemon.sort(
        (left, right) =>
          String(left.dexId).localeCompare(String(right.dexId)) ||
          String(left.form).localeCompare(String(right.form), "fr") ||
          String(left.name).localeCompare(String(right.name), "fr"),
      ),
    );
  }
  return links;
}

function moveFolder(file) {
  const parts = relativeToData(file).replaceAll("\\", "/").split("/");
  return parts[0] === "data" && parts[1] === "moves" ? parts[2] : "unknown";
}

function movePvpViewModel(move) {
  const combat = move.combat && typeof move.combat === "object" ? move.combat : null;
  const category = String(move.category || "").toUpperCase();
  const fast = category === "FAST";
  if (!combat) return {
    category: fast ? "fast" : "charged",
    power: null,
    energy: null,
    turns: null,
    damagePerTurn: null,
    energyPerTurn: null,
    energyCost: null,
    damagePerEnergy: null,
    buffs: null,
  };
  const power = Number(combat.power);
  const energy = Number(combat.energy);
  const turns = Number(combat.turns);
  const energyCost = Number(combat.energyCost || Math.abs(Math.min(0, energy)));
  return {
    category: fast ? "fast" : "charged",
    power: Number.isFinite(power) ? power : null,
    energy: Number.isFinite(energy) ? energy : null,
    turns: fast && Number.isFinite(turns) ? turns : null,
    damagePerTurn: fast && Number.isFinite(Number(combat.dpt))
      ? Number(combat.dpt)
      : fast && turns > 0 ? Number((power / turns).toFixed(3)) : null,
    energyPerTurn: fast && Number.isFinite(Number(combat.ept))
      ? Number(combat.ept)
      : fast && turns > 0 ? Number((energy / turns).toFixed(3)) : null,
    energyCost: !fast && energyCost > 0 ? energyCost : null,
    damagePerEnergy: !fast && Number.isFinite(Number(combat.dpe))
      ? Number(combat.dpe)
      : !fast && energyCost > 0 ? Number((power / energyCost).toFixed(3)) : null,
    buffs: combat.buffs || null,
  };
}

function buildMoveCatalog() {
  const moveLinks = buildMoveLinks();
  const adventureEffects = fs.existsSync(adventureEffectsDir)
    ? listFiles(adventureEffectsDir).map((file) => readJson(file)).filter(Boolean)
    : [];
  const adventureEffectByMove = new Map(adventureEffects.map((effect) => [effect.moveRef, effect]));
  const groups = new Map();
  for (const file of listFiles(movesDir)) {
    const move = readJson(file);
    if (!move?.id) continue;
    const current = groups.get(move.id) || [];
    current.push({ move, folder: moveFolder(file), file: relativeToData(file) });
    groups.set(move.id, current);
  }
  const priority = { fast: 0, charged: 0, "charged-plus": 1, max: 2, gmax: 2, "fast-elite": 3, "charged-elite": 3 };
  return [...groups.entries()].map(([id, records]) => {
    const ordered = [...records].sort((left, right) => (priority[left.folder] ?? 9) - (priority[right.folder] ?? 9));
    const base = ordered[0].move;
    const folders = [...new Set(records.map((record) => record.folder))].sort();
    const elite = folders.some((folder) => folder.endsWith("-elite"));
    const normal = folders.some((folder) => !folder.endsWith("-elite"));
    return {
      ...base,
      id,
      pvp: movePvpViewModel(base),
      availability: {
        normal,
        elite,
        eliteRequirement: elite ? (normal ? "conditional" : "required") : "none",
        folders,
      },
      sourceFiles: ordered.map((record) => record.file),
      pokemon: moveLinks.get(id) || [],
      adventureEffect: adventureEffectByMove.get(id) || null,
    };
  }).sort((left, right) => String(left.names?.French || left.id).localeCompare(String(right.names?.French || right.id), "fr"));
}

function catalog() {
  const moves = buildMoveCatalog();
  return {
    types: readJson(typesFile, []),
    weather: readJson(weatherFile, []),
    stickers: readJson(stickersFile, []),
    moves,
    adventureEffects: moves.map((move) => move.adventureEffect).filter(Boolean),
  };
}

function notes() {
  return readJson(notesFile, []);
}

function saveNote(note) {
  const list = notes();
  list.unshift({
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    text: String(note.text || "").trim(),
    key: note.key || null,
    name: note.name || null,
  });
  writeJson(notesFile, list.slice(0, 500));
  return list[0];
}

function imageReviews() {
  return readJson(reviewsFile, []);
}

function saveImageReview(review) {
  const list = imageReviews();
  list.unshift({
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    status: review.status === "valid" ? "valid" : "issue",
    key: review.key,
    name: review.name,
    details: String(review.details || ""),
  });
  writeJson(reviewsFile, list.slice(0, 2000));
  return list[0];
}

function gitHistory(relativeFile) {
  if (!relativeFile) return [];
  const dataFile = resolveDataFile(relativeFile);
  const cwd = isInsideData(dataFile) ? dataRoot : rootDir;
  const target = isInsideData(dataFile) ? relativeToData(dataFile) : relativeFile;
  try {
    return childProcess
      .execFileSync(
        "git",
        ["log", "-8", "--date=short", "--pretty=format:%h|%ad|%s", "--", target],
        { cwd, encoding: "utf8" },
      )
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(parseGitLine);
  } catch {
    return deploymentHistory();
  }
}

function parsePokemonDataRepo() {
  const repo = String(process.env.POKEMON_GO_DATA_REPO || "https://github.com/Matthieu-Vachet/PokemonGo-Data.git")
    .trim()
    .replace(/\.git$/, "");
  const match = repo.match(/github\.com[:/]([^/]+)\/([^/]+)$/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

async function githubRepoHistory() {
  const target = parsePokemonDataRepo();
  if (!target) return deploymentHistory();
  const ref = process.env.POKEMON_GO_DATA_REF || "main";
  try {
    const response = await fetch(
      `https://api.github.com/repos/${target.owner}/${target.repo}/commits?sha=${encodeURIComponent(ref)}&per_page=12`,
      {
        headers: {
          accept: "application/vnd.github+json",
          "user-agent": "matweb-dashboard-admin",
        },
      },
    );
    if (!response.ok) throw new Error(`GitHub history HTTP ${response.status}`);
    const commits = await response.json();
    return (Array.isArray(commits) ? commits : []).map((commit) => ({
      hash: String(commit.sha || "").slice(0, 12),
      date:
        commit.commit?.committer?.date?.slice(0, 10) ||
        commit.commit?.author?.date?.slice(0, 10) ||
        "",
      subject: commit.commit?.message?.split("\n")[0] || "Commit PokemonGo-Data",
    }));
  } catch {
    return deploymentHistory();
  }
}

async function repoHistory() {
  try {
    const history = childProcess
      .execFileSync(
        "git",
        ["log", "-12", "--date=short", "--pretty=format:%h|%ad|%s"],
        { cwd: dataRoot, encoding: "utf8" },
      )
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(parseGitLine);
    if (history.length) return history;
    return githubRepoHistory();
  } catch {
    return githubRepoHistory();
  }
}

function parseGitLine(line) {
  const [hash, date, ...subject] = line.split("|");
  return { hash, date, subject: subject.join("|") };
}

function deploymentHistory() {
  const hash = process.env.VERCEL_GIT_COMMIT_SHA;
  if (!hash) return [];
  return [
    {
      hash: hash.slice(0, 12),
      date: new Date().toISOString().slice(0, 10),
      subject: process.env.VERCEL_GIT_COMMIT_MESSAGE || "Déploiement Vercel actif",
    },
  ];
}

function openFile(relativeFile) {
  const file = resolveDataFile(relativeFile);
  if (!isInsideData(file) || !fs.existsSync(file))
    throw new Error("Fichier non autorisé.");
  if (process.platform === "darwin")
    childProcess.spawn("open", ["-R", file], { detached: true, stdio: "ignore" }).unref();
  return { file: relativeFile, opened: process.platform === "darwin" };
}

module.exports = {
  assetAudit,
  auditXlCandyAssets,
  auditUrls,
  buildMoveCatalog,
  catalog,
  customRules,
  deleteCustomRule,
  gitHistory,
  imageReviews,
  notes,
  openFile,
  previewCustomRule,
  repoHistory,
  saveImageReview,
  saveCustomRule,
  saveNote,
  toggleCustomRule,
  validate,
};
