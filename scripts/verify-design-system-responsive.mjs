import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = process.env.RESPONSIVE_BASE_URL || "http://localhost:3033";
const artifactRoot = path.join(root, "test-results/design-system-responsive");
mkdirSync(artifactRoot, { recursive: true });

const themes = ["light", "dark"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const scenarios = [
  { id: "dashboard", path: "/", ready: "Dashboard live", shellDrawer: true },
  { id: "projects", path: "/projects", ready: "Projets pratiques guidés" },
  { id: "notes", path: "/notes", ready: "Carnet central", form: true },
  { id: "todo", path: "/todo", ready: "Liste d'actions", form: true },
  { id: "tools", path: "/tools", ready: "Outils quotidiens" },
  { id: "backlog", path: "/tools/dashboard-backlog", ready: "Dashboard Backlog", form: true },
  { id: "calendar", path: "/calendar", ready: "Calendrier", form: true },
  { id: "kanban", path: "/kanban", ready: "Kanban projet", form: true },
  { id: "learning", path: "/exercices-javascript", ready: "Pratique guidée", form: true },
  { id: "analytics", path: "/analytics", ready: "Stats de progression personnelle" },
  { id: "database", path: "/database", ready: "Utilisation de la base dashboard" },
  { id: "pokemon-docs", path: "/pokemon-docs", ready: "Documentation JSON", table: true },
  { id: "admin-overview", path: "/pokemon-admin?section=overview", ready: "Synthèse des fiches", adminNavigation: true },
  { id: "raids", path: "/pokemon-admin?section=raids", ready: "Raids Pokémon GO" },
  { id: "eggs", path: "/pokemon-admin?section=eggs", ready: "Oeufs Pokémon GO" },
  { id: "research", path: "/pokemon-admin?section=research", ready: "Research Pokémon GO" },
  { id: "collections", path: "/pokemon-admin?section=collections", ready: "Collections Pokemon GO" },
  { id: "events", path: "/pokemon-admin?section=events", ready: "Calendrier Events Pokémon GO", eventModal: true },
  { id: "trainer-state", path: "/pokemon-admin?section=my-collection", ready: "Aucune collection importée", modal: true },
  { id: "mappings-table", path: "/pokemon-admin?section=pokemon-identity-mappings", ready: "Résolution", table: true },
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

const artwork = "/ui/zygardDexLogo.png";
const event = {
  id: "responsive-fixture-event",
  title: "Shadow Palkia in Shadow Raids",
  type: "raid_battles",
  source: "leekduck",
  sourceUrl: "https://example.test/events/palkia",
  startDate: "2026-07-01T04:00:00.000Z",
  endDate: "2026-08-04T20:00:00.000Z",
  description: "Événement fixture destiné à la vérification responsive.",
  featuredPokemon: [{ id: "PALKIA", name: "Palkia", image: artwork }],
  bonuses: ["Bonus de test lisible sur écran étroit"],
  rewards: [],
  sections: [],
  status: "active",
};

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
  await page.route("**/api/dashboard-store**", (route) => route.request().method() === "GET"
    ? json(route, { data: { configured: false, value: null } })
    : json(route, { data: { configured: false, saved: false } }));
  await page.route("**/api/dashboard-backlog**", (route) => json(route, { data: { configured: true, tickets: [] } }));
  await page.route("**/api/dashboard-redeploy**", (route) => json(route, { data: { history: [] } }));
  await page.route("**/api/database-stats**", (route) => json(route, { data: {
    configured: true,
    database: "responsive-fixture",
    collection: "dashboard",
    ownerDocuments: 0,
    totalDocuments: 0,
    approxOwnerBytes: 0,
    storageSize: 0,
    indexSize: 0,
    updatedAt: "2026-07-26T12:00:00.000Z",
    keys: [],
    usage: { total: 0, days: 14, perDay: [], endpoints: [] },
  } }));
  await page.route("**/api/pokemon-stats**", (route) => json(route, {
    source: "fixture", status: "ok", total: 1605, complete: 1605, issues: 0, quality: 100,
    catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [],
  }));
  await page.route("**/api/pokemon-api-health**", (route) => json(route, { data: {
    connected: true, api: "ok", database: "responsive-fixture", statusCode: 200,
    uptimeSeconds: 600, timestamp: "2026-07-26T12:00:00.000Z", label: "API stable",
  } }));
  await page.route("**/api/pokemon-api-proxy**", (route) => json(route, { data: {
    path: "/api-docs.json", url: "https://example.test/api-docs.json", status: 200, ok: true,
    durationMs: 1, contentType: "application/json", body: { paths: { "/health": { get: { summary: "Santé API", tags: ["System"], parameters: [] } } } },
  } }));
  await page.route("**/api/admin/events**", (route) => json(route, { data: { events: [event], configured: true, seeded: false, collection: "events" } }));
  await page.route("**/api/events**", (route) => json(route, { data: { events: [event], configured: true, seeded: false, collection: "events" } }));
  await page.route("**/api/trainer-pokemon/imports**", (route) => json(route, { success: true, data: { imports: [] } }));
  await page.route("**/api/trainer-pokemon/diagnostics**", (route) => json(route, { success: true, data: { items: [], summary: {}, pagination: { page: 1, limit: 50, total: 0, pages: 0 } } }));
  await page.route("**/api/trainer-pokemon?**", (route) => json(route, emptyTrainerPayload));
  await page.route("**/api/pokemon-admin**", (route) => {
    const action = new URL(route.request().url()).searchParams.get("action") || "bootstrap";
    if (action === "session") return json(route, { data: { authenticated: true } });
    if (["history", "custom-rules", "source-history", "data-deploy-history", "event-history"].includes(action)) return json(route, { data: [] });
    if (action === "assets") return json(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return json(route, { data: { types: [], weather: [], items: [] } });
    if (action === "items") return json(route, { data: { data: { items: [] } } });
    if (["raids", "eggs", "max-battles", "rocket", "rocket-texts", "research", "shiny", "pvp-rankings", "best-attackers", "pokemon-identity-mappings"].includes(action)) {
      return json(route, { data: { entries: [], rankings: [], raids: [], eggs: [], battles: [], profiles: [], research: [], mappings: [], current: null, history: [], meta: { page: 1, limit: 100, total: 0, pages: 0 } } });
    }
    return json(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {}, collections: [], sourceWatch: { sources: [] } } });
  });
}

async function authenticate(browser) {
  const credentials = readEnvironment();
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page = await context.newPage();
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

async function layoutProbe(page) {
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const main = document.querySelector("#dashboard-content")?.getBoundingClientRect();
    return {
      viewport,
      root: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      mainLeft: main ? Math.round(main.left) : null,
      mainRight: main ? Math.round(main.right) : null,
      visualViewport: Math.round(window.visualViewport?.width || viewport),
    };
  });
}

function assertContained(probe, label) {
  assert.ok(probe.root <= probe.viewport + 1, `${label}: overflow racine ${JSON.stringify(probe)}`);
  assert.ok(probe.body <= probe.viewport + 1, `${label}: overflow body ${JSON.stringify(probe)}`);
  assert.ok(probe.mainLeft === null || probe.mainLeft >= -1, `${label}: main sort à gauche ${JSON.stringify(probe)}`);
  assert.ok(probe.mainRight === null || probe.mainRight <= probe.viewport + 1, `${label}: main sort à droite ${JSON.stringify(probe)}`);
}

const browser = await chromium.launch();
const report = [];
let interactions = 0;
let modalChecks = 0;
let tableChecks = 0;
try {
  const cookies = await authenticate(browser);
  for (const theme of themes) {
    for (const viewport of viewports) {
      for (const scenario of scenarios) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          storageState: { cookies, origins: [] },
        });
        await context.addInitScript((selectedTheme) => {
          localStorage.setItem("matweb-theme", selectedTheme);
          localStorage.setItem("pokedex-v4-admin-collections", "[]");
        }, theme);
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        await installRoutes(page);
        await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded" });
        await page.locator("#dashboard-content").waitFor({ state: "visible", timeout: 30_000 });
        await page.getByText(scenario.ready, { exact: false }).filter({ visible: true }).first().waitFor({ timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(200);

        const overlay = page.locator('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay');
        assert.equal(await overlay.count(), 0, `${scenario.id}-${theme}-${viewport.name}: overlay framework`);
        const before = await layoutProbe(page);
        assertContained(before, `${scenario.id}-${theme}-${viewport.name}`);

        if (scenario.shellDrawer && viewport.width < 1024) {
          const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
          await trigger.click();
          const drawer = page.locator(".dashboard-sidebar-mobile");
          await drawer.waitFor({ state: "visible" });
          const width = await drawer.evaluate((element) => Math.round(element.getBoundingClientRect().width));
          assert.ok(width <= viewport.width - 16, `${scenario.id}: drawer ${width}/${viewport.width}`);
          assert.equal(await drawer.evaluate((element) => element.contains(document.activeElement)), true, `${scenario.id}: focus hors drawer`);
          assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden", `${scenario.id}: scroll non verrouillé`);
          assertContained(await layoutProbe(page), `${scenario.id}-drawer-${theme}-${viewport.name}`);
          await page.keyboard.press("Escape");
          await drawer.waitFor({ state: "hidden" });
          await page.waitForFunction((element) => document.activeElement === element, await trigger.elementHandle(), { timeout: 2_000 });
          interactions += 1;
        }

        if (scenario.adminNavigation && viewport.width < 1024) {
          await page.locator('nav[aria-label="Sections Admin Pokémon"] > button').click();
          const dialog = page.getByRole("dialog", { name: "Navigation Admin Pokémon" });
          await dialog.waitFor({ state: "visible" });
          assertContained(await layoutProbe(page), `${scenario.id}-navigation-${theme}-${viewport.name}`);
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          interactions += 1;
        }

        if (scenario.modal) {
          const trigger = page.getByRole("button", { name: "Importer un JSON", exact: true }).first();
          await trigger.click();
          const dialog = page.getByRole("dialog", { name: "Importer ma collection" });
          await dialog.waitFor({ state: "visible" });
          const box = await dialog.boundingBox();
          assert.ok(box && box.width <= viewport.width && box.height <= viewport.height, `${scenario.id}: modal ${JSON.stringify(box)}`);
          await page.keyboard.press("Tab");
          assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true, `${scenario.id}: focus hors modal`);
          assertContained(await layoutProbe(page), `${scenario.id}-modal-${theme}-${viewport.name}`);
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          await page.waitForFunction((element) => document.activeElement === element, await trigger.elementHandle(), { timeout: 2_000 });
          modalChecks += 1;
          interactions += 1;
        }

        if (scenario.eventModal) {
          const trigger = page.getByRole("button", { name: new RegExp(event.title) }).filter({ visible: true }).first();
          await trigger.click();
          const dialog = page.locator(".event-detail-modal");
          await dialog.waitFor({ state: "visible" });
          const box = await dialog.boundingBox();
          assert.ok(box && box.width <= viewport.width && box.height <= viewport.height, `${scenario.id}: event modal ${JSON.stringify(box)}`);
          await page.waitForFunction((element) => element.contains(document.activeElement), await dialog.elementHandle(), { timeout: 2_000 });
          assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true, `${scenario.id}: focus hors event modal`);
          await page.keyboard.press("Tab");
          assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true, `${scenario.id}: trap event modal`);
          assertContained(await layoutProbe(page), `${scenario.id}-modal-${theme}-${viewport.name}`);
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          await page.waitForFunction((element) => document.activeElement === element, await trigger.elementHandle(), { timeout: 2_000 });
          modalChecks += 1;
          interactions += 1;
        }

        if (scenario.table) {
          const visibleTables = page.locator("table:visible");
          if (await visibleTables.count()) {
            const containment = await visibleTables.first().evaluate((table) => {
              const parent = table.parentElement;
              const style = parent ? getComputedStyle(parent) : null;
              return { overflowX: style?.overflowX || "", parentWidth: parent?.clientWidth || 0, tableWidth: table.scrollWidth };
            });
            assert.match(containment.overflowX, /auto|scroll/, `${scenario.id}: table non contenue ${JSON.stringify(containment)}`);
            tableChecks += 1;
          }
        }

        if (scenario.form) {
          const controls = page.locator("main input:visible, main select:visible, main textarea:visible, main button:visible");
          assert.ok(await controls.count() > 0, `${scenario.id}: aucun contrôle visible`);
        }

        const filteredConsole = consoleErrors.filter((entry) => !/favicon|Failed to load resource.*404/i.test(entry));
        assert.deepEqual(filteredConsole, [], `${scenario.id}-${theme}-${viewport.name}: erreurs console`);
        assert.deepEqual(pageErrors, [], `${scenario.id}-${theme}-${viewport.name}: erreurs page`);

        const screenshot = `${scenario.id}-${theme}-${viewport.name}.png`;
        await page.screenshot({ path: path.join(artifactRoot, screenshot), fullPage: false });
        report.push({ scenario: scenario.id, theme, viewport: viewport.name, width: viewport.width, height: viewport.height, probe: before, screenshot });
        await context.close();
      }
    }
  }

  assert.equal(report.length, scenarios.length * themes.length * viewports.length);
  assert.ok(interactions >= 20, `interactions insuffisantes: ${interactions}`);
  assert.ok(modalChecks >= 12, `modales insuffisantes: ${modalChecks}`);
  assert.ok(tableChecks >= 4, `tables insuffisantes: ${tableChecks}`);
  writeFileSync(path.join(artifactRoot, "report.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), checks: report.length, interactions, modalChecks, tableChecks, results: report }, null, 2)}\n`);
  console.info(`Responsive browser verification: ${report.length} vues, ${interactions} interactions, ${modalChecks} modales, ${tableChecks} tables, sans overflow ni erreur.`);
} finally {
  await browser.close();
}
