import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-card-surface-family");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.CARD_SURFACE_BASE_URL || "http://localhost:3026";
const pagePixelNoiseRatio = 0.0015;

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "position", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "gap", "borderRadius",
  "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderColor",
  "backgroundColor", "backgroundImage", "color", "boxShadow", "backdropFilter", "overflow",
  "overflowX", "overflowY", "opacity", "transform", "transitionDuration", "animationDuration",
];

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

async function fulfillJson(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page) {
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") {
      const key = new URL(route.request().url()).searchParams.get("key");
      if (key === "matweb.pomodoro") {
        return fulfillJson(route, { data: { configured: true, value: { sessions: 3, focusMinutes: 75, history: [{ mode: "focus", finishedAt: "2026-07-22T08:00:00.000Z" }] } } });
      }
      return fulfillJson(route, { data: { configured: false, value: null } });
    }
    return fulfillJson(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-redeploy**", (route) => fulfillJson(route, { data: { history: [] } }));
  await page.route("**/api/events**", (route) => fulfillJson(route, { data: { events: [], configured: false, seeded: true, collection: "events" } }));
  await page.route("**/api/learning/topics**", (route) => fulfillJson(route, { data: {
    topics: [], curriculum: { schemaVersion: 1, levels: [] }, source: "local", warning: null,
    progress: {}, migrated: 0, activity: [], databaseConfigured: false,
    stats: { totalStudySeconds: 0, weekStudySeconds: 0, todayStudySeconds: 0, xpToday: 0, xpWeek: 0, xpMonth: 0, completedExercises: 0, completedChallenges: 0, completedProjects: 0, currentStreak: 0, bestStreak: 0, lastActivity: null },
  } }));
  await page.route("**/api/learning/imports**", (route) => fulfillJson(route, { data: { imports: [] } }));
  await page.route("**/api/pokemon-stats", (route) => fulfillJson(route, {
    source: "fixture", status: "ok", total: 1602, complete: 1602, issues: 0, quality: 100,
    catalog: { types: 18, weather: 7, stickers: 1667, moves: 467 },
    generations: [{ name: "G1", completion: 100, entries: 151 }], kinds: [{ name: "pokemon", value: 1602 }],
  }));
  await page.route("**/api/pokemon-api-health", (route) => fulfillJson(route, { data: {
    connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600,
    timestamp: "2026-07-22T08:00:00.000Z", label: "API stable",
  } }));
  await page.route("**/api/database-stats", (route) => fulfillJson(route, { data: {
    configured: true, database: "fixture", collection: "dashboard_store", ownerDocuments: 4,
    totalDocuments: 8, approxOwnerBytes: 4096, storageSize: 8192, indexSize: 2048,
    keys: [{ key: "matweb.notes", approxBytes: 2048, updatedAt: "2026-07-22T08:00:00.000Z", createdAt: "2026-07-20T08:00:00.000Z" }],
    usage: { total: 12, days: 14, perDay: [{ day: "2026-07-22", count: 12 }], endpoints: [{ endpoint: "/api/dashboard-store", count: 12 }] },
    updatedAt: "2026-07-22T08:00:00.000Z",
  } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const action = new URL(route.request().url()).searchParams.get("action") || "bootstrap";
    if (action === "session") return fulfillJson(route, { data: { authenticated: true } });
    if (action === "assets") return fulfillJson(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history", "data-deploy-history"].includes(action)) return fulfillJson(route, { data: [] });
    if (["raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings", "best-attackers", "pokemon-identity-mappings"].includes(action)) {
      return fulfillJson(route, { data: { entries: [], raids: [], eggs: [], battles: [], profiles: [], research: [], meta: { total: 0, page: 1, pages: 1 } } });
    }
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
}

async function authenticate(page) {
  const credentials = readEnvironment();
  await page.goto(`${baseUrl}/login?next=/`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/", { timeout: 20_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
}

async function createCookies(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await installRoutes(page);
  await authenticate(page);
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function createContext(browser, cookies, theme, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript(({ selectedTheme }) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    localStorage.setItem("matweb.pomodoro", JSON.stringify({ sessions: 3, focusMinutes: 75, history: [{ mode: "focus", finishedAt: "2026-07-22T08:00:00.000Z" }] }));
    localStorage.setItem("pokedex-v4-admin-collections", JSON.stringify([]));
  }, { selectedTheme: theme });
  return context;
}

async function goto(page, pathname) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((theme) => document.documentElement.classList.contains(theme), await page.evaluate(() => localStorage.getItem("matweb-theme")));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
}

function ancestorFlat(locator) {
  return locator.locator("xpath=ancestor::div[contains(@class,'rounded-lg') and contains(@class,'border-line')][1]");
}

const focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

async function verifyNestedKeyboard(locator) {
  const focusables = locator.locator(focusableSelector);
  const count = await focusables.count();
  if (!count) return;
  await focusables.nth(0).focus();
  assert.equal(await focusables.nth(0).evaluate((element) => document.activeElement === element), true);
  if (count > 1) {
    await locator.page().keyboard.press("Tab");
    assert.equal(await focusables.nth(1).evaluate((element) => document.activeElement === element), true);
    await locator.page().keyboard.press("Shift+Tab");
    assert.equal(await focusables.nth(0).evaluate((element) => document.activeElement === element), true);
  }
  await locator.page().evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
}

async function computedStyles(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function signature(locator) {
  return locator.evaluate((element) => ({
    tag: element.tagName.toLowerCase(), role: element.getAttribute("role") || "", tabIndex: element.tabIndex,
    text: element.textContent?.replace(/\s+/g, " ").trim() || "",
    children: element.children.length,
    focusables: [...element.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])")].map((item) => ({
      tag: item.tagName.toLowerCase(), name: item.getAttribute("aria-label") || item.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) || "", tabIndex: item.tabIndex,
    })),
  }));
}

async function captureTarget(locator, key, name) {
  await locator.waitFor({ state: "visible", timeout: 20_000 });
  await locator.scrollIntoViewIfNeeded();
  await locator.page().waitForTimeout(150);
  const file = path.join(stageDirectory, `${key.replaceAll("/", "-")}-${name}.png`);
  await locator.screenshot({ path: file, animations: "disabled" });
  const result = {
    semantic: await signature(locator), styles: await computedStyles(locator), box: await locator.boundingBox(),
    screenshot: path.relative(root, file),
  };
  await verifyNestedKeyboard(locator);
  return result;
}

async function pageScenario(page, key, definition) {
  await goto(page, definition.path);
  await page.getByText(definition.ready, { exact: true }).first().waitFor({ state: "visible", timeout: 30_000 });
  const targets = {};
  for (const [name, locate] of Object.entries(definition.targets)) targets[name] = await captureTarget(locate(page), key, name);
  await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); window.scrollTo(0, 0); });
  const pageFile = path.join(stageDirectory, `${key.replaceAll("/", "-")}-page.png`);
  await page.screenshot({ path: pageFile, animations: "disabled" });
  return { targets, pageScreenshot: path.relative(root, pageFile) };
}

const scenarios = [
  { name: "dashboard", path: "/", ready: "Dashboard live", targets: {
    signal: (page) => ancestorFlat(page.getByText("Todo ouverte", { exact: true })),
    kanban: (page) => ancestorFlat(page.getByText("Backlog", { exact: true }).last()),
  } },
  { name: "projects", path: "/projects", ready: "Projets pratiques guidés", targets: {
    objective: (page) => ancestorFlat(page.getByText("Objectif", { exact: true })),
    routine: (page) => ancestorFlat(page.getByText("Routine", { exact: true })),
  } },
  { name: "analytics", path: "/analytics", ready: "Stats de progression personnelle", targets: {
    status: (page) => ancestorFlat(page.getByText("Terminées", { exact: true })),
  } },
  { name: "database", path: "/database", ready: "Utilisation de la base dashboard", targets: {
    miniRow: (page) => ancestorFlat(page.getByText("Stockage collection", { exact: true })),
  } },
  { name: "tools", path: "/tools", ready: "Outils quotidiens", targets: {
    link: (page) => ancestorFlat(page.locator('input[value="Dashboard prod"]')),
    snippet: (page) => ancestorFlat(page.locator('input[value="Commit propre"]')),
  }, verify: async (page) => {
    const input = page.getByText("Liens rapides", { exact: true })
      .locator("xpath=ancestor::div[contains(@class,'rounded-lg')][1]").locator("input").first();
    const initial = await input.inputValue();
    await input.fill(`${initial} test`); assert.equal(await input.inputValue(), `${initial} test`);
    await input.fill(initial);
  } },
  { name: "notes", path: "/notes", ready: "Carnet central", targets: {
    metadata: (page) => ancestorFlat(page.getByText("Métadonnées", { exact: true })),
  }, verify: async (page) => {
    const input = page.getByPlaceholder("pokemon, api, todo"); const initial = await input.inputValue();
    await input.fill("card-test"); assert.equal(await input.inputValue(), "card-test"); await input.fill(initial);
  } },
  { name: "pomodoro", path: "/pomodoro", ready: "Timer de concentration", targets: {
    stat: (page) => ancestorFlat(page.getByText("Pomodoros", { exact: true })),
    history: (page) => page.locator("div.rounded-lg.border-line").filter({ hasText: "Focus 25 min terminé" }).last(),
  } },
  { name: "palette", path: "/palette", ready: "Labo couleur", targets: {
    swatch: (page) => page.getByRole("button", { name: "Utiliser #20d3ff" }).locator("xpath=.."),
  }, verify: async (page) => {
    await page.getByRole("button", { name: "Utiliser #20d3ff" }).click();
    assert.equal(await page.locator('input[type="color"]').inputValue(), "#20d3ff");
  } },
  { name: "todo", path: "/todo", ready: "Liste d'actions", targets: {
    row: (page) => ancestorFlat(page.locator('input[value="Configurer les variables Vercel"]')),
  }, verify: async (page) => {
    const row = ancestorFlat(page.locator('input[value="Configurer les variables Vercel"]'));
    const toggle = row.getByRole("button", { name: "Basculer la tâche" });
    const initial = await toggle.locator("svg").count();
    await toggle.click(); assert.notEqual(await toggle.locator("svg").count(), initial);
    await toggle.click(); assert.equal(await toggle.locator("svg").count(), initial);
  } },
  { name: "events-specialized", path: "/pokemon-admin?section=events", ready: "Calendrier Events", targets: {} },
  { name: "pokemon-specialized", path: "/pokemon-admin", ready: "Voici ce qui demande votre attention aujourd’hui.", targets: {} },
];

async function pixelDifference(beforeFile, afterFile) {
  const before = await sharp(path.join(root, beforeFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(path.join(root, afterFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(before.info.width, after.info.width); assert.equal(before.info.height, after.info.height);
  let changed = 0;
  for (let index = 0; index < before.data.length; index += 4) {
    if (Math.max(...[0, 1, 2, 3].map((channel) => Math.abs(before.data[index + channel] - after.data[index + channel]))) > 8) changed += 1;
  }
  return changed;
}

async function runScenario(browser, cookies, theme, viewport, definition) {
  const context = await createContext(browser, cookies, theme, viewport);
  const page = await context.newPage(); await installRoutes(page);
  const consoleErrors = []; const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const key = `${theme}/${viewport.name}/${definition.name}`;
  try {
    const result = await pageScenario(page, key, definition);
    if (theme === "dark" && viewport.name === "desktop" && definition.verify) await definition.verify(page);
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    assert.equal(overflow, 0, `${key}: overflow horizontal`);
    assert.deepEqual(pageErrors, [], `${key}: erreurs React/page`);
    assert.deepEqual(consoleErrors, [], `${key}: erreurs console`);
    return { key, theme, viewport: viewport.name, scenario: definition.name, overflow, consoleErrors, pageErrors, result };
  } finally { await context.close(); }
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const cookies = await createCookies(browser); const runs = [];
    for (const theme of themes) for (const viewport of viewports) for (const scenario of scenarios) {
      console.log(`Card Surface ${stage}: ${theme}/${viewport.name}/${scenario.name}`);
      runs.push(await runScenario(browser, cookies, theme, viewport, scenario));
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Card Surface : ${runs.length} scénarios`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
    const differences = [];
    const toleratedPageNoise = [];
    for (const run of runs) {
      const before = beforeByKey.get(run.key);
      if (!before) { differences.push(`${run.key}: baseline absente`); continue; }
      for (const [name, target] of Object.entries(run.result.targets)) {
        const previous = before.result.targets[name];
        if (!previous) { differences.push(`${run.key}/${name}: cible baseline absente`); continue; }
        if (JSON.stringify(previous.semantic) !== JSON.stringify(target.semantic)) differences.push(`${run.key}/${name}: sémantique différente`);
        if (JSON.stringify(previous.styles) !== JSON.stringify(target.styles)) differences.push(`${run.key}/${name}: styles calculés différents`);
        if (JSON.stringify(previous.box) !== JSON.stringify(target.box)) differences.push(`${run.key}/${name}: dimensions différentes`);
        const pixels = await pixelDifference(previous.screenshot, target.screenshot);
        if (pixels) differences.push(`${run.key}/${name}: ${pixels} pixels significativement différents`);
      }
      const pagePixels = await pixelDifference(before.result.pageScreenshot, run.result.pageScreenshot);
      const pageArea = viewports.find((viewport) => viewport.name === run.viewport).width
        * viewports.find((viewport) => viewport.name === run.viewport).height;
      if (pagePixels / pageArea > pagePixelNoiseRatio) {
        differences.push(`${run.key}: ${pagePixels} pixels page significativement différents`);
      } else if (pagePixels) {
        toleratedPageNoise.push({ key: run.key, pixels: pagePixels, ratio: pagePixels / pageArea });
      }
    }
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ differences, toleratedPageNoise, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(differences, []);
    console.log(`Vérification Card Surface : ${runs.length} scénarios, 0 différence visuelle ou de style`);
  } finally { await browser.close(); }
}

await main();
