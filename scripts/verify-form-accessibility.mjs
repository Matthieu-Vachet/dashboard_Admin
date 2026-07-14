import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/form-accessibility");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.FORM_A11Y_BASE_URL || "http://localhost:3024";
const learningFixture = path.join(root, "src/data/learning/javascript.json");

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "visibility", "color", "fontSize", "fontWeight", "lineHeight", "width", "height",
  "minHeight", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth",
  "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderColor", "borderRadius",
  "backgroundColor", "boxShadow", "outlineStyle", "outlineWidth", "outlineColor", "outlineOffset",
  "opacity", "resize", "transitionDuration", "transitionProperty",
];

const categories = {
  "A11Y-FIELD-008": "A",
  ...Object.fromEntries(["012", "023", "024", "030", "033", "051", "055", "065", "069", "071", "072", "074", "075", "077", "080", "082", "086", "092"].map((id) => [`A11Y-FIELD-${id}`, "B"])),
  ...Object.fromEntries(["049", "061", "062"].map((id) => [`A11Y-FIELD-${id}`, "C"])),
  ...Object.fromEntries(["013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "025", "026", "027", "028", "029", "034", "050", "056", "057", "058", "059"].map((id) => [`A11Y-FIELD-${id}`, "D"])),
};

const expectedNames = {
  "A11Y-FIELD-012": "HEX",
  "A11Y-FIELD-023": "Journal du jour",
  "A11Y-FIELD-024": "Rechercher langage, tag, contenu...",
  "A11Y-FIELD-030": "Import JSON",
  "A11Y-FIELD-033": "Rechercher event, bonus, Pokémon...",
  "A11Y-FIELD-051": "Chercher titre, tag, priorité...",
  "A11Y-FIELD-055": "Ajouter une action...",
  "A11Y-FIELD-065": "Filtrer fichiers / cibles",
  "A11Y-FIELD-069": "Chercher fiche, type, fichier...",
  "A11Y-FIELD-071": "Corrections groupées",
  "A11Y-FIELD-072": "Export et partage",
  "A11Y-FIELD-074": "Ajouter une tâche",
  "A11Y-FIELD-075": "Modifier la tâche",
  "A11Y-FIELD-077": "Rechercher dans la collection...",
  "A11Y-FIELD-080": "Rechercher boss, type, forme, costume ou habitat...",
  "A11Y-FIELD-082": "Mot de passe admin",
  "A11Y-FIELD-086": "Chercher dans les docs",
  "A11Y-FIELD-092": "Rechercher titre, page, composant...",
};

const expectedDescriptions = {
  "A11Y-FIELD-023": "Sauvegarde automatique dans ton navigateur.",
  "A11Y-FIELD-065": "Optionnel: vise une forme, un dossier, un fichier ou un id précis, par exemple types/fire, moves/charged, kanto ou WEATHER_BALL_FIRE.",
  "A11Y-FIELD-071": "Génère un brouillon JSON à partir des problèmes détectés. Ce panneau ne modifie pas les fichiers: il sert à préparer des corrections groupées.",
  "A11Y-FIELD-072": "Exporte les fiches correspondant à la recherche globale en cours. Pratique pour partager un lot réduit ou conserver un état de contrôle.",
  "A11Y-FIELD-082": "Connexion refusée.",
};

function readEnvironment() {
  const file = path.join(root, ".env.local");
  if (!existsSync(file)) return {};
  return Object.fromEntries(readFileSync(file, "utf8").split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) return [];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    return [[match[1], value]];
  }));
}

function hash(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function fileName(key, suffix) {
  return `${key.replaceAll("/", "-")}-${suffix}.png`;
}

async function capture(page, key, suffix, locator = null) {
  const file = path.join(stageDirectory, fileName(key, suffix));
  const buffer = locator
    ? await locator.screenshot({ path: file, animations: "disabled" })
    : await page.screenshot({ path: file, fullPage: false, animations: "disabled" });
  return { file: path.relative(root, file), sha256: hash(buffer) };
}

async function fulfillJson(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page, options = {}) {
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return fulfillJson(route, { data: { configured: false, value: null } });
    return fulfillJson(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-backlog**", (route) => fulfillJson(route, { data: { configured: false, tickets: [] } }));
  await page.route("**/api/dashboard-redeploy**", (route) => fulfillJson(route, { data: { history: [] } }));
  await page.route("**/api/events**", (route) => fulfillJson(route, { data: { events: [], configured: false, seeded: true, collection: "events" } }));
  await page.route("**/api/learning/imports**", (route) => fulfillJson(route, { data: { imports: [] } }));
  await page.route("**/api/pokemon-stats", (route) => fulfillJson(route, {
    source: "fixture", status: "ok", total: 0, complete: 0, issues: 0, quality: 100,
    catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [],
  }));
  await page.route("**/api/pokemon-api-health", (route) => fulfillJson(route, { data: {
    connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600,
    timestamp: "2026-07-14T08:00:00.000Z", label: "API stable",
  } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const url = new URL(route.request().url());
    const action = url.searchParams.get("action") || "bootstrap";
    if (route.request().method() === "POST") {
      const body = route.request().postDataJSON();
      if (body?.action === "login" && options.pokemonAuthenticated === false) return fulfillJson(route, { error: "Connexion refusée." }, 401);
    }
    if (action === "session") return fulfillJson(route, { data: { authenticated: options.pokemonAuthenticated !== false } });
    if (action === "assets") return fulfillJson(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history"].includes(action)) return fulfillJson(route, { data: [] });
    if (["raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings"].includes(action)) {
      return fulfillJson(route, { data: { entries: [], raids: [], eggs: [], battles: [], profiles: [], research: [], meta: { total: 0, page: 1, pages: 1 } } });
    }
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
  await page.route("**/api/trainer-pokemon?**", (route) => fulfillJson(route, { success: true, data: {
    items: [], snapshot: null,
    stats: { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 },
    filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } },
    pagination: { page: 1, limit: 50, total: 0, pages: 0 },
  } }));
}

async function authenticate(page, credentials) {
  await page.goto(`${baseUrl}/login?next=/`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/", { timeout: 20_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
}

async function createSessionCookies(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await installRoutes(page);
  await authenticate(page, readEnvironment());
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function createContext(browser, theme, viewport, cookies = []) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript(({ selectedTheme, fixedTime }) => {
    const NativeDate = Date;
    const fixed = new NativeDate(fixedTime).valueOf();
    class FixedDate extends NativeDate {
      constructor(...args) { super(...(args.length ? args : [fixed])); }
      static now() { return fixed; }
    }
    window.Date = FixedDate;
    localStorage.setItem("matweb-theme", selectedTheme);
    for (const key of ["matweb.calendar", "matweb.kanban", "matweb.projects", "matweb.notes", "matweb.todos", "matweb.writer.documents", "matweb.palette.swatches", "matweb.snippets", "matweb.tools.widgets"]) localStorage.removeItem(key);
    localStorage.setItem("pokedex-v4-admin-todos", JSON.stringify([{ id: "todo-fixture", text: "Vérifier les données", done: false }]));
    localStorage.setItem("pokedex-v4-admin-collections", JSON.stringify([{ id: "collection-fixture", name: "Collection test", type: "normal", variantMode: "multi", shiny: false, hundo: false, items: {}, createdAt: fixedTime }]));
  }, { selectedTheme: theme, fixedTime: "2026-07-14T08:00:00.000Z" });
  return context;
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function parseAriaSnapshot(snapshot) {
  const first = String(snapshot || "").split("\n")[0] || "";
  const match = first.match(/^- ([^ :]+)(?: "((?:\\.|[^"])*)")?/);
  if (!match) return { role: "", accessibleName: "", snapshot: String(snapshot || "") };
  let accessibleName = match[2] || "";
  try { accessibleName = JSON.parse(`"${accessibleName}"`); } catch { /* valeur déjà lisible */ }
  return { role: match[1], accessibleName, snapshot: String(snapshot || "") };
}

async function computedStyle(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function controlSignature(locator) {
  const dom = await locator.evaluate((control) => {
    const labels = control.labels ? [...control.labels] : [];
    const ids = (control.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
    return {
      tag: control.tagName.toLowerCase(), type: control.getAttribute("type") || "",
      id: control.id, name: control.getAttribute("name") || "", value: control.value || "",
      placeholder: control.getAttribute("placeholder") || "", required: Boolean(control.required),
      disabled: Boolean(control.disabled), readOnly: Boolean(control.readOnly), tabIndex: control.tabIndex,
      className: control.getAttribute("class") || "", ariaLabel: control.getAttribute("aria-label") || "",
      ariaLabelledby: control.getAttribute("aria-labelledby") || "",
      ariaDescribedby: control.getAttribute("aria-describedby") || "",
      ariaInvalid: control.getAttribute("aria-invalid") || "",
      labelText: labels.map((label) => label.textContent?.replace(/\s+/g, " ").trim()).filter(Boolean).join(" | "),
      describedText: ids.map((id) => document.getElementById(id)?.textContent?.replace(/\s+/g, " ").trim() || "").filter(Boolean).join(" "),
    };
  });
  let accessibility = { role: "", accessibleName: "", snapshot: "" };
  try { accessibility = parseAriaSnapshot(await locator.ariaSnapshot()); } catch { /* élément caché hors arbre */ }
  const nameSource = dom.ariaLabelledby ? "aria-labelledby" : dom.ariaLabel ? "aria-label" : dom.labelText ? "label" : dom.placeholder ? "placeholder" : dom.type === "hidden" ? "hors arbre" : "aucune";
  return { ...dom, ...accessibility, nameSource };
}

async function keyboardRoundTrip(page, locator, signature) {
  if (signature.type === "hidden" || signature.disabled) return { skipped: true };
  await locator.focus();
  const focused = await locator.evaluate((element) => document.activeElement === element);
  await page.keyboard.press("Tab");
  const moved = await locator.evaluate((element) => document.activeElement !== element);
  await page.keyboard.press("Shift+Tab");
  const returned = await locator.evaluate((element) => document.activeElement === element);
  await locator.evaluate((element) => element.blur());
  return { focused, moved, returned };
}

async function targetSnapshot(page, key, id, locator) {
  await locator.waitFor({ state: "attached", timeout: 30_000 });
  assert.equal(await locator.count(), 1, `${key}/${id}: cible unique attendue`);
  await page.waitForTimeout(350);
  const category = categories[id];
  const signature = await controlSignature(locator);
  const defaultStyles = await computedStyle(locator);
  const visible = await locator.isVisible();
  let defaultScreenshot = null;
  let focusScreenshot = null;
  let filledScreenshot = null;
  let focusStyles = defaultStyles;
  let filledStyles = defaultStyles;
  if (category === "B" && visible) defaultScreenshot = await capture(page, key, `${id}-default`, locator);
  if (signature.type !== "hidden" && !signature.disabled) {
    await locator.focus();
    await page.waitForTimeout(350);
    await locator.evaluate((element) => {
      for (const animation of element.getAnimations()) animation.finish();
    });
    focusStyles = await computedStyle(locator);
    if (category === "B" && visible) focusScreenshot = await capture(page, key, `${id}-focus`, locator);
  }
  if (category === "B" && !signature.disabled && !signature.readOnly && ["input", "textarea"].includes(signature.tag) && !["date", "number", "checkbox", "radio", "file", "hidden"].includes(signature.type)) {
    const original = await locator.inputValue();
    const candidate = id === "A11Y-FIELD-012"
      ? "#123456"
      : `${original || "Valeur"} · test accessibilité`;
    await locator.fill(candidate);
    assert.equal(await locator.inputValue(), candidate, `${key}/${id}: saisie`);
    filledStyles = await computedStyle(locator);
    if (visible) filledScreenshot = await capture(page, key, `${id}-filled`, locator);
    await locator.fill(original);
    assert.equal(await locator.inputValue(), original, `${key}/${id}: restauration`);
  }
  if (!signature.disabled && signature.type !== "hidden") await locator.evaluate((element) => element.blur());
  return {
    id, category, signature, defaultStyles, focusStyles, filledStyles,
    screenshots: { default: defaultScreenshot, focus: focusScreenshot || defaultScreenshot, filled: filledScreenshot || defaultScreenshot },
    keyboard: await keyboardRoundTrip(page, locator, signature),
  };
}

async function snapshotTargets(page, key, entries) {
  const result = {};
  for (const [id, locator] of entries) result[id] = await targetSnapshot(page, key, id, locator);
  return result;
}

async function goto(page, pathname, heading) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
  if (!heading) return;
  const target = page.getByRole("heading", { name: heading, exact: true }).first();
  try {
    await target.waitFor({ state: "visible", timeout: 30_000 });
  } catch {
    await page.reload({ waitUntil: "domcontentloaded" });
    await target.waitFor({ state: "visible", timeout: 30_000 });
  }
}

async function loginScenario(page, key) {
  await goto(page, "/login?error=1&next=/projects", "Connexion");
  await page.waitForTimeout(500);
  const hidden = page.locator('input[type="hidden"]');
  const email = page.getByLabel("Email", { exact: true });
  assert.equal(await email.getAttribute("required"), "");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-008", hidden]]) };
}

async function paletteScenario(page, key) {
  await goto(page, "/palette", "Labo couleur");
  await page.getByText("Palette sauvegardée", { exact: true }).waitFor({ state: "visible" });
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-012", page.locator('input:not([type="color"])').first()]]) };
}

async function toolsScenario(page, key) {
  await goto(page, "/tools", "Outils quotidiens");
  const journal = page.locator('textarea[placeholder="Note tes décisions, blocages, idées et actions de demain..."]');
  const controls = page.locator('input, textarea:not([placeholder="Note tes décisions, blocages, idées et actions de demain..."])');
  await controls.first().waitFor({ state: "attached" });
  assert.ok(await controls.count() >= 10, `${key}: contrôles Tools incomplets`);
  const ids = ["013", "014", "015", "016", "017", "018", "019", "020", "021", "022"];
  return { targets: await snapshotTargets(page, key, [
    ...ids.map((id, index) => [`A11Y-FIELD-${id}`, controls.nth(index)]),
    ["A11Y-FIELD-023", journal],
  ]) };
}

async function snippetsScenario(page, key) {
  await goto(page, "/snippets", "Snippets de code");
  await page.getByText("Coffre synchronisé", { exact: true }).waitFor({ state: "visible" });
  const search = page.locator('input[placeholder="Rechercher langage, tag, contenu..."]');
  await page.getByRole("button", { name: "Ajouter", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Nouveau snippet" });
  await dialog.waitFor({ state: "visible" });
  const controls = dialog.locator("input, textarea");
  const entries = [["A11Y-FIELD-024", search], ...["025", "026", "027", "028", "029"].map((id, index) => [`A11Y-FIELD-${id}`, controls.nth(index)])];
  return { targets: await snapshotTargets(page, key, entries) };
}

async function projectsScenario(page) {
  await goto(page, "/projects", "Projets");
  await page.locator("section button.relative.z-10.block.w-full").first().click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  assert.equal(await page.getByLabel("Nom", { exact: true }).count(), 1);
  return { targets: {} };
}

async function kanbanScenario(page, key) {
  await goto(page, "/kanban");
  await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Modifier la carte" }).first().click();
  const dialog = page.getByRole("dialog");
  const checklist = dialog.locator('input[type="checkbox"]').first();
  const text = checklist.locator("xpath=following::input[1]");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-049", checklist], ["A11Y-FIELD-050", text]]) };
}

async function calendarScenario(page) {
  await goto(page, "/calendar");
  await page.getByText("Events Pokémon GO", { exact: true }).waitFor({ state: "visible" });
  await page.locator("button.w-full.rounded-lg.border.p-3.text-left.transition").first().click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  return { targets: {} };
}

async function notesScenario(page, key) {
  await goto(page, "/notes", "Carnet central");
  const search = page.locator('input[placeholder="Chercher titre, tag, priorité..."]');
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-051", search]]) };
}

async function todoScenario(page, key) {
  await goto(page, "/todo", "Liste d'actions");
  await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible" });
  const inputs = page.locator("input");
  assert.ok(await inputs.count() >= 2, `${key}: todo initiale absente`);
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-055", inputs.nth(0)], ["A11Y-FIELD-056", inputs.nth(1)]]) };
}

async function writerScenario(page, key) {
  await goto(page, "/writer", "Rédaction");
  const controls = page.locator("input, textarea");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-057", controls.nth(0)], ["A11Y-FIELD-058", controls.nth(1)], ["A11Y-FIELD-059", controls.nth(2)]]) };
}

async function learningScenario(page, key) {
  await goto(page, "/js-progress", "JS Progress V2");
  await page.getByText(/^(Mode local sécurisé|MongoDB synchronisé)$/).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Importer un JSON", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Importer un JSON pédagogique" });
  const file = dialog.locator('input[type="file"]');
  const first = await targetSnapshot(page, key, "A11Y-FIELD-061", file);
  await file.setInputFiles(learningFixture);
  const radio = dialog.locator('input[type="radio"]').first();
  await radio.waitFor({ state: "attached" });
  const second = await targetSnapshot(page, key, "A11Y-FIELD-062", radio);
  return { targets: { "A11Y-FIELD-061": first, "A11Y-FIELD-062": second } };
}

async function backlogScenario(page, key) {
  await goto(page, "/tools/dashboard-backlog", "Dashboard Backlog");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-092", page.locator('input[placeholder="Rechercher titre, page, composant..."]')]]) };
}

async function pokemonDocsScenario(page, key) {
  await goto(page, "/pokemon-docs", "Documentation JSON");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-086", page.locator('input[placeholder="Chercher dans les docs"]')]]) };
}

async function pokemonGlobalScenario(page, key) {
  await goto(page, "/pokemon-admin", "Accueil");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-069", page.locator('input[placeholder="Chercher fiche, type, fichier..."]')]]) };
}

async function pokemonRulesScenario(page, key) {
  await goto(page, "/pokemon-admin?section=rules", "Règles JSON");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-065", page.locator('input[placeholder^="ex: types/fire"]')]]) };
}

async function pokemonBulkScenario(page, key) {
  await goto(page, "/pokemon-admin?section=bulk", "Corrections");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-071", page.locator("textarea[readonly]")]]) };
}

async function pokemonExportScenario(page, key) {
  await goto(page, "/pokemon-admin?section=export", "Export");
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-072", page.locator("textarea[readonly]")]]) };
}

async function pokemonTodoScenario(page, key) {
  await goto(page, "/pokemon-admin?section=todo", "Todo-list");
  const add = page.locator('input[placeholder="Ajouter une tâche"]');
  await page.getByRole("button", { name: "Modifier la tâche" }).first().click();
  const edit = page.locator("article input").first();
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-074", add], ["A11Y-FIELD-075", edit]]) };
}

async function pokemonCollectionsScenario(page, key) {
  await goto(page, "/pokemon-admin?section=collections", "Collections");
  const search = page.locator('input[placeholder="Rechercher dans la collection..."]');
  await search.waitFor({ state: "visible" });
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-077", search]]) };
}

async function pokemonDatasetScenario(page, key) {
  await goto(page, "/pokemon-admin?section=raids", "Raids");
  const search = page.locator('input[placeholder="Rechercher boss, type, forme, costume ou habitat..."]');
  await search.waitFor({ state: "visible", timeout: 30_000 });
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-080", search]]) };
}

async function pokemonLoginScenario(page, key) {
  await goto(page, "/pokemon-admin", "Connexion sécurisée");
  const password = page.locator('input[type="password"]');
  await password.fill("incorrect");
  await page.getByRole("button", { name: "Se connecter", exact: true }).click();
  await page.locator("p").getByText("Connexion refusée.", { exact: true }).waitFor({ state: "visible" });
  return { targets: await snapshotTargets(page, key, [["A11Y-FIELD-082", password]]) };
}

async function eventsEditorScenario(page, key) {
  await goto(page, "/pokemon-admin?section=events", "Calendrier Events");
  const eventSearch = page.locator('input[placeholder="Rechercher event, bonus, Pokémon..."]');
  const date = page.locator('input[type="date"]').first();
  const entries = [["A11Y-FIELD-033", eventSearch], ["A11Y-FIELD-034", date]];
  await page.getByRole("button", { name: "Import JSON", exact: true }).click();
  const importTextarea = page.locator(
    'textarea[placeholder*="community-day-example"]',
  );
  entries.push(["A11Y-FIELD-030", importTextarea]);
  const targets = await snapshotTargets(page, key, entries);
  await page.getByRole("button", { name: "Annuler", exact: true }).click();
  await page.getByRole("button", { name: "Ajouter", exact: true }).click();
  await page.getByRole("heading", { name: "Ajouter un event", exact: true }).waitFor({ state: "visible" });
  return { targets };
}

const scenarios = [
  { name: "login", auth: false, run: loginScenario },
  { name: "projects", run: projectsScenario },
  { name: "kanban", run: kanbanScenario },
  { name: "calendar", run: calendarScenario },
  { name: "notes", run: notesScenario },
  { name: "events-editor", run: eventsEditorScenario },
  { name: "backlog", run: backlogScenario },
  { name: "palette", run: paletteScenario },
  { name: "tools", run: toolsScenario },
  { name: "snippets", run: snippetsScenario },
  { name: "todo", run: todoScenario },
  { name: "writer", run: writerScenario },
  { name: "learning-import", run: learningScenario },
  { name: "pokemon-docs", run: pokemonDocsScenario },
  { name: "pokemon-global", run: pokemonGlobalScenario },
  { name: "pokemon-rules", run: pokemonRulesScenario },
  { name: "pokemon-bulk", run: pokemonBulkScenario },
  { name: "pokemon-export", run: pokemonExportScenario },
  { name: "pokemon-todo", run: pokemonTodoScenario },
  { name: "pokemon-collections", run: pokemonCollectionsScenario },
  { name: "pokemon-dataset", run: pokemonDatasetScenario },
  { name: "pokemon-login", pokemonAuthenticated: false, run: pokemonLoginScenario },
].filter((scenario) => !process.env.FORM_A11Y_SCENARIO || scenario.name === process.env.FORM_A11Y_SCENARIO);

async function focusableStructure(page) {
  return page.evaluate(() => {
    const selector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";
    return [...document.querySelectorAll(selector)].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && (rect.width > 0 || element.matches(".sr-only")) && (rect.height > 0 || element.matches(".sr-only"));
    }).map((element) => ({ tag: element.tagName.toLowerCase(), type: element.getAttribute("type") || "", tabIndex: element.tabIndex }));
  });
}

async function runScenario(page, theme, viewport, scenario) {
  const key = `${theme}/${viewport.name}/${scenario.name}`;
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const result = await scenario.run(page, key);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const pageScreenshot = await capture(page, key, "page");
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
  const duplicateIds = await page.evaluate(() => [...document.querySelectorAll("[id]")].map((element) => element.id).filter((id, index, ids) => ids.indexOf(id) !== index));
  return {
    key, theme, viewport, scenario: scenario.name, overflow, duplicateIds,
    reducedMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
    focusables: await focusableStructure(page), pageScreenshot, consoleErrors, pageErrors, ...result,
  };
}

async function runCombination(browser, cookies, theme, viewport) {
  const runs = [];
  for (const scenario of scenarios) {
    const context = await createContext(browser, theme, viewport, scenario.auth === false ? [] : cookies);
    const page = await context.newPage();
    await installRoutes(page, { pokemonAuthenticated: scenario.pokemonAuthenticated });
    runs.push(await runScenario(page, theme, viewport, scenario));
    await context.close();
  }
  return runs;
}

async function pixelDifference(beforeFile, afterFile) {
  const before = await sharp(path.join(root, beforeFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(path.join(root, afterFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(before.info.width, after.info.width);
  assert.equal(before.info.height, after.info.height);
  let changedPixels = 0;
  for (let index = 0; index < before.data.length; index += 4) {
    const delta = Math.max(...[0, 1, 2].map((channel) => Math.abs(before.data[index + channel] - after.data[index + channel])));
    if (delta > 8) changedPixels += 1;
  }
  return { changedPixels, percent: changedPixels / (before.info.width * before.info.height) * 100 };
}

function stableSignature(signature) {
  const stable = { ...signature };
  stable.role = stable.role.replace(/^['"]+|['"]+$/g, "");
  for (const property of ["id", "ariaLabel", "ariaLabelledby", "ariaDescribedby", "ariaInvalid", "accessibleName", "nameSource", "describedText", "snapshot"]) delete stable[property];
  return stable;
}

function colorValueEquivalent(before, after) {
  const beforeNumbers = String(before).match(/-?\d*\.?\d+/g)?.map(Number) || [];
  const afterNumbers = String(after).match(/-?\d*\.?\d+/g)?.map(Number) || [];
  if (beforeNumbers.length !== afterNumbers.length) return false;
  const beforeShape = String(before).replace(/-?\d*\.?\d+/g, "#");
  const afterShape = String(after).replace(/-?\d*\.?\d+/g, "#");
  if (beforeShape !== afterShape) return false;
  return beforeNumbers.every((value, index) => {
    const other = afterNumbers[index];
    const tolerance = Math.abs(value) <= 1 && Math.abs(other) <= 1 ? 0.02 : 6;
    return Math.abs(value - other) <= tolerance;
  });
}

function stylesEquivalent(before, after) {
  const colorProperties = new Set(["color", "borderColor", "backgroundColor", "outlineColor", "boxShadow"]);
  return Object.keys(before).every((property) =>
    before[property] === after[property]
    || (colorProperties.has(property) && colorValueEquivalent(before[property], after[property])),
  );
}

async function compareRuns(baseline, current) {
  const differences = [];
  const pageDifferences = [];
  const targetDifferences = [];
  const accessibilityChanges = [];
  const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
  for (const after of current.runs) {
    const before = beforeByKey.get(after.key);
    if (!before) { differences.push(`${after.key}: baseline absente`); continue; }
    for (const property of ["overflow", "duplicateIds", "reducedMotion", "focusables"]) {
      if (JSON.stringify(before[property]) !== JSON.stringify(after[property])) differences.push(`${after.key}: ${property} différent`);
    }
    if (before.pageScreenshot.sha256 !== after.pageScreenshot.sha256) {
      const pixels = await pixelDifference(before.pageScreenshot.file, after.pageScreenshot.file);
      pageDifferences.push({ key: after.key, ...pixels });
      const dynamicApiRegistry = after.scenario === "pokemon-docs";
      if (pixels.changedPixels > 800 && !dynamicApiRegistry) differences.push(`${after.key}: ${pixels.changedPixels} pixels page différents`);
    }
    for (const [id, target] of Object.entries(after.targets)) {
      const previous = before.targets[id];
      if (!previous) { differences.push(`${after.key}/${id}: cible absente`); continue; }
      if (JSON.stringify(stableSignature(previous.signature)) !== JSON.stringify(stableSignature(target.signature))) differences.push(`${after.key}/${id}: contrat stable différent`);
      if (!stylesEquivalent(previous.defaultStyles, target.defaultStyles)) differences.push(`${after.key}/${id}: styles default différents`);
      if (!stylesEquivalent(previous.focusStyles, target.focusStyles)) differences.push(`${after.key}/${id}: styles focus différents`);
      if (!stylesEquivalent(previous.filledStyles, target.filledStyles)) differences.push(`${after.key}/${id}: styles filled différents`);
      if (JSON.stringify(previous.keyboard) !== JSON.stringify(target.keyboard)) differences.push(`${after.key}/${id}: clavier différent`);
      for (const stateName of ["default", "focus", "filled"]) {
        const oldShot = previous.screenshots[stateName];
        const newShot = target.screenshots[stateName];
        if (!oldShot && !newShot) continue;
        if (!oldShot || !newShot) { differences.push(`${after.key}/${id}/${stateName}: capture absente`); continue; }
        if (oldShot.sha256 === newShot.sha256) continue;
        const pixels = await pixelDifference(oldShot.file, newShot.file);
        targetDifferences.push({ key: `${after.key}/${id}/${stateName}`, ...pixels });
        if (pixels.changedPixels > 1) differences.push(`${after.key}/${id}/${stateName}: ${pixels.changedPixels} pixels différents`);
      }
      if (target.category === "B") {
        const expectedName = expectedNames[id];
        if (normalizeText(target.signature.accessibleName) !== normalizeText(expectedName)) differences.push(`${after.key}/${id}: nom attendu ${JSON.stringify(expectedName)}, reçu ${JSON.stringify(target.signature.accessibleName)}`);
        const expectedDescription = expectedDescriptions[id] || "";
        if (normalizeText(target.signature.describedText) !== normalizeText(expectedDescription)) differences.push(`${after.key}/${id}: description/erreur incorrecte`);
        if (id === "A11Y-FIELD-082" && target.signature.ariaInvalid !== "true") differences.push(`${after.key}/${id}: aria-invalid absent`);
        accessibilityChanges.push({ key: `${after.key}/${id}`, before: previous.signature, after: target.signature });
      } else if (JSON.stringify(previous.signature) !== JSON.stringify(target.signature)) {
        differences.push(`${after.key}/${id}: accessibilité hors lot modifiée`);
      }
    }
    for (const error of after.consoleErrors.filter((item) => !before.consoleErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur console: ${error}`);
    for (const error of after.pageErrors.filter((item) => !before.pageErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur React: ${error}`);
  }
  return { differences, pageDifferences, targetDifferences, accessibilityChanges };
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const cookies = await createSessionCookies(browser);
    const runs = [];
    for (const theme of themes) for (const viewport of viewports) runs.push(...await runCombination(browser, cookies, theme, viewport));
    for (const run of runs) {
      const unexpectedConsoleErrors = run.consoleErrors.filter((message) =>
        !(run.scenario === "pokemon-login" && /Failed to load resource.*401/.test(message)),
      );
      assert.equal(run.overflow, 0, `${run.key}: overflow horizontal`);
      assert.equal(run.pageErrors.length, 0, `${run.key}: erreur React/page`);
      assert.equal(
        unexpectedConsoleErrors.length,
        0,
        `${run.key}: erreur console ${JSON.stringify(unexpectedConsoleErrors)}`,
      );
      assert.deepEqual(run.duplicateIds, [], `${run.key}: IDs dupliqués`);
      for (const target of Object.values(run.targets)) {
        const values = Object.values(target.keyboard);
        assert.ok(values.includes(true) || target.keyboard.skipped, `${run.key}/${target.id}: clavier non vérifié`);
      }
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      const uniqueIds = new Set(runs.flatMap((run) => Object.keys(run.targets)));
      assert.equal(uniqueIds.size, 43, `43 contrôles de la cohorte attendus, ${uniqueIds.size} obtenus`);
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline accessibilité formulaires : ${runs.length} scénarios, ${uniqueIds.size} contrôles`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const comparison = await compareRuns(JSON.parse(readFileSync(baselineFile, "utf8")), result);
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ ...comparison, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(comparison.differences, []);
    console.log(`Vérification accessibilité formulaires : ${runs.length} scénarios, 0 différence critique`);
  } finally {
    await browser.close();
  }
}

await main();
