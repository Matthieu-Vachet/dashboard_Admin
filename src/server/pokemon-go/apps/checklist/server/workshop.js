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
const typesFile = dataPath("types", "types.json");
const weatherFile = dataPath("weather", "weather.json");
const stickersFile = dataPath("stickers", "stickers.json");
const movesDir = dataPath("moves");
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
  const response = await fetch(
    "https://api.github.com/repos/Matthieu-Vachet/PokemonGo-Assets-API/git/trees/main?recursive=1",
    { headers: { "user-agent": "PokemonGo-API-checklist" } },
  );
  if (!response.ok) throw new Error(`GitHub assets: HTTP ${response.status}`);
  const tree = await response.json();
  remoteHdCache = (tree.tree || [])
    .filter((item) => item.type === "blob" && item.path.startsWith("PokemonHd/"))
    .map((item) => parseAsset(path.basename(item.path)))
    .filter(Boolean);
  return remoteHdCache;
}

function usedAssetUrls() {
  const urls = [];
  for (const file of [
    ...listFiles(dataPath("pokemon")),
    ...listFiles(dataPath("pokemon-forms")),
  ]) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/https?:[^"\\]+poke_capture_[^"\\]+\.png/g))
      urls.push({ url: match[0], file: relativeToApp(file) });
  }
  return urls;
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
    ...listFiles(dataPath("pokemon")),
    ...listFiles(dataPath("pokemon-forms")),
  ]) {
    const data = hydrateSourceData(readJson(file, {}));
    add(data, file, "Image principale", data.assets?.image, false, "", "go");
    add(data, file, "Image principale shiny", data.assets?.shinyImage, true, "", "go");
    add(data, file, "Candy", data.assets?.candy?.image, false, `familyId ${data.assets?.candy?.familyId ?? "-"}`, "candy");
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
    const response = await fetch(
      "https://api.github.com/repos/Matthieu-Vachet/PokemonGo-Assets-API/git/trees/main?recursive=1",
      { headers: { "user-agent": "PokemonGo-API-checklist" } },
    );
    if (!response.ok) throw new Error(`GitHub assets: HTTP ${response.status}`);
    const tree = await response.json();
    remoteShuffleCache = (tree.tree || [])
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

  const response = await fetch(
    "https://api.github.com/repos/Matthieu-Vachet/PokemonGo-Assets-API/git/trees/main?recursive=1",
    { headers: { "user-agent": "PokemonGo-API-checklist" } },
  );
  if (!response.ok) throw new Error(`GitHub assets: HTTP ${response.status}`);

  const tree = await response.json();
  remoteLocationCardsCache = (tree.tree || [])
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

async function assetAudit(dexId = "") {
  const [assets, locationCards] = await Promise.all([allHdAssets(), allLocationCardAssets()]);
  const goAssets = allGoAssets();
  const shuffleAssets = await allShuffleAssets();
  const used = usedAssetUrls();
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
  if (relativeFile.startsWith("pokemon/")) return "pokemon";
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
    ...listFiles(dataPath("pokemon")),
    ...listFiles(dataPath("pokemon-forms")),
  ];
  for (const file of files) {
    const data = hydrateSourceData(readJson(file, {}));
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

function catalog() {
  const moveLinks = buildMoveLinks();
  return {
    types: readJson(typesFile, []),
    weather: readJson(weatherFile, []),
    stickers: readJson(stickersFile, []),
    moves: listFiles(movesDir)
      .map((file) => readJson(file))
      .filter(Boolean)
      .map((move) => ({ ...move, pokemon: moveLinks.get(move.id) || [] }))
      .sort((a, b) =>
        String(a.names?.French || a.id).localeCompare(
          String(b.names?.French || b.id),
          "fr",
        ),
      ),
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
  auditUrls,
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
