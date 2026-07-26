import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-visual-consistency");
const baseUrl = process.env.VISUAL_CONSISTENCY_BASE_URL || "http://localhost:3030";
mkdirSync(artifactRoot, { recursive: true });

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const scenarios = [
  { name: "dashboard", path: "/", ready: "Dashboard live" },
  { name: "projects", path: "/projects", ready: "Projets pratiques guidés" },
  { name: "notes", path: "/notes", ready: "Carnet central" },
  { name: "todo", path: "/todo", ready: "Liste d'actions" },
  { name: "tools", path: "/tools", ready: "Outils quotidiens" },
  { name: "calendar", path: "/calendar", ready: "Events Pokémon GO" },
  { name: "admin-overview", path: "/pokemon-admin?section=overview", ready: "Synthèse des fiches" },
  { name: "admin-events", path: "/pokemon-admin?section=events", ready: "Calendrier Events Pokémon GO" },
  { name: "raids", path: "/pokemon-admin?section=raids", ready: "Raids Pokémon GO" },
  { name: "eggs", path: "/pokemon-admin?section=eggs", ready: "Oeufs Pokémon GO" },
  { name: "research", path: "/pokemon-admin?section=research", ready: "Research Pokémon GO" },
  { name: "collections", path: "/pokemon-admin?section=collections", ready: "Collections Pokemon GO" },
  { name: "learning", path: "/js-progress", ready: "JS Progress V2" },
  { name: "analytics", path: "/analytics", ready: "Stats de progression personnelle" },
  { name: "tables", path: "/tools/dashboard-backlog", ready: "Dashboard Backlog" },
  { name: "state-system", path: "/pokemon-admin?section=my-collection", ready: "Aucune collection importée" },
  { name: "modal", path: "/pokemon-admin?section=my-collection", ready: "Ma collection Pokémon GO", openModal: true },
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
    items: [],
    snapshot: null,
    stats: { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 },
    filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } },
    pagination: { page: 1, limit: 50, total: 0, pages: 0 },
  },
};

async function json(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page) {
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return json(route, { data: { configured: false, value: null } });
    return json(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-backlog**", (route) => json(route, { data: { configured: true, tickets: [] } }));
  await page.route("**/api/dashboard-redeploy**", (route) => json(route, { data: { history: [] } }));
  await page.route("**/api/events**", (route) => json(route, { data: { events: [], configured: false, seeded: true, collection: "events" } }));
  await page.route("**/api/database-stats**", (route) => json(route, { data: {
    configured: true,
    database: "fixture",
    collection: "dashboard",
    ownerDocuments: 0,
    totalDocuments: 0,
    approxOwnerBytes: 0,
    storageSize: 0,
    indexSize: 0,
    updatedAt: "2026-07-26T08:00:00.000Z",
    keys: [],
    usage: { total: 0, days: 14, perDay: [], endpoints: [] },
  } }));
  await page.route("**/api/learning/topics**", (route) => json(route, { data: {
    topics: [],
    curriculum: { schemaVersion: 1, levels: [] },
    source: "local",
    warning: null,
    progress: {},
    migrated: 0,
    activity: [],
    databaseConfigured: false,
    stats: { totalStudySeconds: 0, weekStudySeconds: 0, todayStudySeconds: 0, xpToday: 0, xpWeek: 0, xpMonth: 0, completedExercises: 0, completedChallenges: 0, completedProjects: 0, currentStreak: 0, bestStreak: 0, lastActivity: null },
  } }));
  await page.route("**/api/learning/imports**", (route) => json(route, { data: { imports: [] } }));
  await page.route("**/api/pokemon-stats", (route) => json(route, {
    source: "fixture",
    status: "ok",
    total: 0,
    complete: 0,
    issues: 0,
    quality: 100,
    catalog: { types: 18, weather: 7, stickers: 0, moves: 0 },
    generations: [],
    kinds: [],
  }));
  await page.route("**/api/pokemon-api-health", (route) => json(route, { data: {
    connected: true,
    api: "ok",
    database: "fixture",
    statusCode: 200,
    uptimeSeconds: 600,
    timestamp: "2026-07-26T08:00:00.000Z",
    label: "API stable",
  } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const action = new URL(route.request().url()).searchParams.get("action") || "bootstrap";
    if (action === "session") return json(route, { data: { authenticated: true } });
    if (action === "assets") return json(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return json(route, { data: { types: [], weather: [], items: [] } });
    if (["history", "custom-rules", "source-history", "data-deploy-history", "event-history"].includes(action)) return json(route, { data: [] });
    if (["raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings", "best-attackers", "pokemon-identity-mappings"].includes(action)) {
      return json(route, { data: { entries: [], raids: [], eggs: [], battles: [], profiles: [], research: [], current: null, history: [], meta: { total: 0, page: 1, pages: 1 } } });
    }
    return json(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {}, collections: [], sourceWatch: { sources: [] } } });
  });
  await page.route("**/api/trainer-pokemon/imports**", (route) => json(route, { success: true, data: { imports: [] } }));
  await page.route("**/api/trainer-pokemon/diagnostics**", (route) => json(route, { success: true, data: { items: [], summary: {} } }));
  await page.route("**/api/trainer-pokemon?**", (route) => json(route, emptyTrainerPayload));
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

async function layoutProbe(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const radiusElement = [...document.querySelectorAll(".rounded-control, .rounded-surface, .rounded-overlay")].find(visible);
    const elevationElement = [...document.querySelectorAll(".shadow-surface, .shadow-raised, .shadow-strong, .shadow-overlay, .shadow-floating, .glass-panel, .glass-panel-strong")].find(visible);
    const radiusBox = radiusElement?.getBoundingClientRect();
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      radius: radiusElement ? getComputedStyle(radiusElement).borderRadius : null,
      radiusBox: radiusBox ? { width: radiusBox.width, height: radiusBox.height, left: radiusBox.left, right: radiusBox.right } : null,
      shadow: elevationElement ? getComputedStyle(elevationElement).boxShadow : null,
      elevationOverlay: rootStyle.getPropertyValue("--elevation-overlay").trim(),
      elevationRaised: rootStyle.getPropertyValue("--elevation-raised").trim(),
    };
  });
}

const browser = await chromium.launch();
try {
  const cookies = await authenticate(browser);
  const themeShadows = new Map();
  let captures = 0;

  for (const theme of themes) {
    for (const viewport of viewports) {
      for (const scenario of scenarios) {
        const context = await newContext(browser, cookies, theme, viewport);
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        await installRoutes(page);
        await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded" });
        await page.getByText(scenario.ready, { exact: false }).filter({ visible: true }).first().waitFor({ timeout: 30_000 });

        if (scenario.openModal) {
          const trigger = page.getByRole("button", { name: "Importer un JSON", exact: true }).first();
          await trigger.click();
          const dialog = page.getByRole("dialog", { name: "Importer ma collection" });
          await dialog.waitFor({ state: "visible" });
          const style = await dialog.evaluate((element) => ({
            radius: getComputedStyle(element).borderRadius,
            shadow: getComputedStyle(element).boxShadow,
          }));
          assert.equal(style.radius, "8px", `${theme}-${viewport.name}: radius Modal`);
          assert.notEqual(style.shadow, "none", `${theme}-${viewport.name}: shadow Modal`);
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          const triggerHandle = await trigger.elementHandle();
          await page.waitForFunction(
            (element) => document.activeElement === element,
            triggerHandle,
            { timeout: 2_000 },
          );
        }

        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(250);
        const probe = await layoutProbe(page);
        assert.ok(probe.scroll <= probe.viewport + 1, `${scenario.name}-${theme}-${viewport.name}: overflow ${probe.scroll}/${probe.viewport}`);
        assert.equal(probe.radius, "8px", `${scenario.name}-${theme}-${viewport.name}: rôle radius non compilé`);
        assert.ok(probe.radiusBox?.width > 0 && probe.radiusBox?.height > 0, `${scenario.name}: boîte radius absente`);
        assert.ok(probe.elevationOverlay && probe.elevationRaised, `${scenario.name}: variables elevation absentes`);
        if (probe.shadow) assert.notEqual(probe.shadow, "none", `${scenario.name}: élévation invisible`);
        if (!themeShadows.has(theme)) themeShadows.set(theme, probe.elevationRaised);

        const firstButton = page.locator("button:not([disabled])").filter({ visible: true }).first();
        if (await firstButton.count()) {
          await firstButton.focus();
          assert.equal(await firstButton.evaluate((element) => document.activeElement === element), true, `${scenario.name}: focus bouton`);
        }

        const relevantConsoleErrors = consoleErrors.filter((entry) => !/favicon|Failed to load resource.*404/.test(entry));
        assert.deepEqual(relevantConsoleErrors, [], `${scenario.name}: erreurs console`);
        assert.deepEqual(pageErrors, [], `${scenario.name}: erreurs React/page`);
        await page.screenshot({
          path: path.join(artifactRoot, `${scenario.name}-${theme}-${viewport.name}.png`),
          fullPage: true,
          animations: "disabled",
        });
        captures += 1;
        await context.close();
      }
    }
  }

  assert.notEqual(themeShadows.get("dark"), themeShadows.get("light"), "les élévations dark et light doivent rester perceptuellement distinctes");
  console.log(`Visual Consistency browser verification: ${captures} captures, dark/light × 3 viewports × ${scenarios.length} scénarios, sans overflow ni erreur.`);
} finally {
  await browser.close();
}
