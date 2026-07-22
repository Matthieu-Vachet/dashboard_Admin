import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-state-system/after");
const baseUrl = process.env.STATE_SYSTEM_BASE_URL || "http://localhost:3029";
mkdirSync(artifactRoot, { recursive: true });

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const scenarios = [
  { name: "dashboard", path: "/", ready: "Dashboard live" },
  { name: "projects", path: "/projects", ready: "Projets" },
  { name: "events", path: "/calendar", ready: "Events Pokémon GO" },
  { name: "admin-pokemon", path: "/pokemon-admin?section=my-collection", ready: "Ma collection Pokémon GO" },
  { name: "learning", path: "/js-progress", ready: "JS Progress V2" },
  { name: "database", path: "/database", ready: "Utilisation de la base dashboard" },
  { name: "lists", path: "/tools/dashboard-backlog", ready: "Backlog" },
  { name: "search-filter", path: "/pokemon-docs", ready: "API Explorer Pokémon" },
  { name: "modal", path: "/pokemon-admin?section=my-collection", ready: "Ma collection Pokémon GO", openHistory: true },
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

const emptyTrainerPayload = {
  success: true,
  data: {
    items: [], snapshot: null,
    stats: { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 },
    filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } },
    pagination: { page: 1, limit: 50, total: 0, pages: 0 },
  },
};

const noResultsTrainerPayload = {
  ...emptyTrainerPayload,
  data: {
    ...emptyTrainerPayload.data,
    snapshot: { id: "fixture", sourceFileName: "fixture.json", importedAt: "2026-07-22T08:00:00.000Z", sourceExportTime: null, checksum: "1234567890abcdef" },
  },
};

async function json(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page, options = {}) {
  let trainerCalls = 0;
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return json(route, { data: { configured: false, value: null } });
    return json(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-backlog**", (route) => json(route, { data: { configured: true, tickets: [] } }));
  await page.route("**/api/dashboard-redeploy**", (route) => json(route, { data: { history: [] } }));
  await page.route("**/api/events**", (route) => json(route, { data: { events: [], configured: false, seeded: true, collection: "events" } }));
  await page.route("**/api/database-stats**", (route) => json(route, { data: {
    configured: true, database: "fixture", collection: "dashboard", ownerDocuments: 0, totalDocuments: 0,
    approxOwnerBytes: 0, storageSize: 0, indexSize: 0, updatedAt: "2026-07-22T08:00:00.000Z",
    keys: [], usage: { total: 0, days: 14, perDay: [], endpoints: [] },
  } }));
  await page.route("**/api/learning/topics**", (route) => json(route, { data: {
    topics: [], curriculum: { schemaVersion: 1, levels: [] }, source: "local", warning: null,
    progress: {}, migrated: 0, activity: [], databaseConfigured: false,
    stats: { totalStudySeconds: 0, weekStudySeconds: 0, todayStudySeconds: 0, xpToday: 0, xpWeek: 0, xpMonth: 0, completedExercises: 0, completedChallenges: 0, completedProjects: 0, currentStreak: 0, bestStreak: 0, lastActivity: null },
  } }));
  await page.route("**/api/learning/imports**", (route) => json(route, { data: { imports: [] } }));
  await page.route("**/api/pokemon-stats", async (route) => {
    if (options.slowPokemonStats) await new Promise((resolve) => setTimeout(resolve, 800));
    return json(route, { source: "fixture", status: "ok", total: 0, complete: 0, issues: 0, quality: 100, catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [] });
  });
  await page.route("**/api/pokemon-api-health", (route) => json(route, { data: { connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600, timestamp: "2026-07-22T08:00:00.000Z", label: "API stable" } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const action = new URL(route.request().url()).searchParams.get("action") || "bootstrap";
    if (action === "session") return json(route, { data: { authenticated: true } });
    if (action === "assets") return json(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return json(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history", "data-deploy-history"].includes(action)) return json(route, { data: [] });
    return json(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {}, sourceWatch: { sources: [] } } });
  });
  await page.route("**/api/trainer-pokemon/imports**", (route) => json(route, { success: true, data: { imports: [] } }));
  await page.route("**/api/trainer-pokemon?**", async (route) => {
    trainerCalls += 1;
    if (options.slowTrainer) await new Promise((resolve) => setTimeout(resolve, 900));
    if (options.errorThenEmpty && trainerCalls <= 2) return json(route, { success: false, error: { message: "Erreur fixture récupérable." } }, 500);
    return json(route, options.noResults ? noResultsTrainerPayload : emptyTrainerPayload);
  });
}

async function authenticate(browser) {
  const credentials = readEnvironment();
  const context = await browser.newContext();
  const page = await context.newPage();
  await installRoutes(page);
  await page.goto(`${baseUrl}/login?next=/`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/", { timeout: 20_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function newContext(browser, cookies, theme, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    localStorage.setItem("pokedex-v4-admin-collections", "[]");
  }, theme);
  return context;
}

async function assertLayout(page, label) {
  const measurements = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
    statuses: [...document.querySelectorAll('[data-state-system="fetch-loading"]')].map((node) => ({ busy: node.getAttribute("aria-busy"), text: node.textContent?.trim() })),
  }));
  assert.ok(measurements.scroll <= measurements.viewport + 1, `${label}: overflow horizontal ${measurements.scroll}/${measurements.viewport}`);
  for (const status of measurements.statuses) assert.equal(status.busy, "true", `${label}: status sans aria-busy (${status.text})`);
}

const browser = await chromium.launch();
try {
  const cookies = await authenticate(browser);
  let visualChecks = 0;
  for (const theme of themes) {
    for (const viewport of viewports) {
      for (const scenario of scenarios) {
        const context = await newContext(browser, cookies, theme, viewport);
        const page = await context.newPage();
        const consoleErrors = [];
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        await installRoutes(page, { noResults: scenario.name === "search-filter" });
        await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded" });
        await page.getByText(scenario.ready, { exact: false }).filter({ visible: true }).first().waitFor({ timeout: 30_000 });
        if (scenario.openHistory) {
          await page.getByRole("button", { name: "Historique", exact: true }).click();
          await page.getByRole("dialog", { name: "Historique des imports" }).waitFor();
          await page.getByText("Aucun historique", { exact: true }).waitFor();
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        await assertLayout(page, `${scenario.name}-${theme}-${viewport.name}`);
        assert.deepEqual(consoleErrors.filter((entry) => !entry.includes("favicon")), [], `${scenario.name}: erreurs console`);
        await page.screenshot({ path: path.join(artifactRoot, `${scenario.name}-${theme}-${viewport.name}.png`), fullPage: true });
        await page.waitForTimeout(100);
        assert.deepEqual(consoleErrors.filter((entry) => !entry.includes("favicon")), [], `${scenario.name}: erreurs console après capture`);
        visualChecks += 1;
        await context.close();
      }
    }
  }

  const loadingContext = await newContext(browser, cookies, "dark", viewports[2]);
  const loadingPage = await loadingContext.newPage();
  await installRoutes(loadingPage, { slowTrainer: true });
  await loadingPage.goto(`${baseUrl}/pokemon-admin?section=my-collection`, { waitUntil: "domcontentloaded" });
  const loading = loadingPage.getByRole("status").filter({ hasText: "Chargement de la collection" });
  await loading.waitFor({ state: "visible", timeout: 10_000 });
  assert.equal(await loading.getAttribute("aria-busy"), "true");
  await loadingPage.getByText("Aucune collection importée", { exact: true }).waitFor({ timeout: 10_000 });
  assert.equal(await loading.isVisible(), false);
  await loadingContext.close();

  const retryContext = await newContext(browser, cookies, "light", viewports[0]);
  const retryPage = await retryContext.newPage();
  await installRoutes(retryPage, { errorThenEmpty: true });
  await retryPage.goto(`${baseUrl}/pokemon-admin?section=my-collection`, { waitUntil: "domcontentloaded" });
  const alert = retryPage.getByRole("alert").filter({ hasText: "Collection indisponible" });
  await alert.waitFor({ state: "visible", timeout: 30_000 });
  await alert.getByRole("button", { name: "Réessayer" }).click();
  await retryPage.getByText("Aucune collection importée", { exact: true }).waitFor({ timeout: 20_000 });
  assert.equal(await alert.isVisible(), false);
  await retryContext.close();

  const noResultsContext = await newContext(browser, cookies, "dark", viewports[1]);
  const noResultsPage = await noResultsContext.newPage();
  await installRoutes(noResultsPage, { noResults: true });
  await noResultsPage.goto(`${baseUrl}/pokemon-admin?section=my-collection`, { waitUntil: "domcontentloaded" });
  await noResultsPage.getByText("Aucun résultat", { exact: true }).waitFor({ timeout: 30_000 });
  await assertLayout(noResultsPage, "no-results-dark-tablet");
  await noResultsContext.close();

  console.log(`State System browser verification: ${visualChecks} dark/light responsive captures + loading/content + error/retry + no-results.`);
} finally {
  await browser.close();
}
