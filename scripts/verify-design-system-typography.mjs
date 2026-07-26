import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-typography");
const baseUrl = process.env.TYPOGRAPHY_BASE_URL || "http://localhost:3031";
mkdirSync(artifactRoot, { recursive: true });

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const scenarios = [
  { name: "dashboard-cards", path: "/", ready: "Dashboard live" },
  { name: "projects", path: "/projects", ready: "Projets pratiques guidés" },
  { name: "events", path: "/pokemon-admin?section=events", ready: "Calendrier Events Pokémon GO" },
  { name: "admin-pokemon", path: "/pokemon-admin?section=overview", ready: "Synthèse des fiches" },
  { name: "learning", path: "/js-progress", ready: "JS Progress V2" },
  { name: "analytics", path: "/analytics", ready: "Stats de progression personnelle" },
  { name: "notes", path: "/notes", ready: "Carnet central" },
  { name: "tools", path: "/tools", ready: "Outils quotidiens" },
  { name: "forms", path: "/kanban", ready: "Kanban projet" },
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
    items: [], snapshot: null,
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
    configured: true, database: "fixture", collection: "dashboard", ownerDocuments: 0,
    totalDocuments: 0, approxOwnerBytes: 0, storageSize: 0, indexSize: 0,
    updatedAt: "2026-07-26T08:00:00.000Z", keys: [], usage: { total: 0, days: 14, perDay: [], endpoints: [] },
  } }));
  await page.route("**/api/learning/topics**", (route) => json(route, { data: {
    topics: [], curriculum: { schemaVersion: 1, levels: [] }, source: "local", warning: null,
    progress: {}, migrated: 0, activity: [], databaseConfigured: false,
    stats: { totalStudySeconds: 0, weekStudySeconds: 0, todayStudySeconds: 0, xpToday: 0, xpWeek: 0, xpMonth: 0, completedExercises: 0, completedChallenges: 0, completedProjects: 0, currentStreak: 0, bestStreak: 0, lastActivity: null },
  } }));
  await page.route("**/api/learning/imports**", (route) => json(route, { data: { imports: [] } }));
  await page.route("**/api/pokemon-stats", (route) => json(route, {
    source: "fixture", status: "ok", total: 0, complete: 0, issues: 0, quality: 100,
    catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [],
  }));
  await page.route("**/api/pokemon-api-health", (route) => json(route, { data: {
    connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600,
    timestamp: "2026-07-26T08:00:00.000Z", label: "API stable",
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
    viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    localStorage.setItem("pokedex-v4-admin-collections", "[]");
  }, theme);
  return context;
}

async function typographyProbe(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const semantic = [...document.querySelectorAll('[class*="type-"]')].filter(visible);
    const element = semantic.find((candidate) => [...candidate.classList].some((name) => name.startsWith("type-title"))) || semantic[0];
    const role = element ? [...element.classList].find((name) => name.startsWith("type-")) : null;
    const style = element ? getComputedStyle(element) : null;
    const box = element?.getBoundingClientRect();
    const rootStyle = getComputedStyle(document.documentElement);
    const mono = [...document.querySelectorAll(".font-mono")].find(visible);
    return {
      semanticCount: semantic.length,
      headingSemanticCount: [...document.querySelectorAll("h1[class*='type-'], h2[class*='type-'], h3[class*='type-']")].filter(visible).length,
      role,
      fontSize: style ? Number.parseFloat(style.fontSize) : 0,
      fontWeight: style?.fontWeight || "",
      lineHeight: style ? Number.parseFloat(style.lineHeight) : 0,
      letterSpacing: style?.letterSpacing || "",
      box: box ? { left: box.left, right: box.right, width: box.width, scrollWidth: element.scrollWidth, clientWidth: element.clientWidth } : null,
      bodyFamily: getComputedStyle(document.body).fontFamily,
      monoFamily: mono ? getComputedStyle(mono).fontFamily : null,
      monoClassName: mono?.className || null,
      sansVariable: rootStyle.getPropertyValue("--font-geist-sans").trim(),
      monoVariable: rootStyle.getPropertyValue("--font-geist-mono").trim(),
      fontsStatus: document.fonts.status,
      loadedFamilies: [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.family),
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    };
  });
}

const browser = await chromium.launch();
try {
  const cookies = await authenticate(browser);
  let captures = 0;
  let zoomChecks = 0;
  let monoChecks = 0;
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
        await page.evaluate(() => document.fonts.ready);

        if (scenario.openModal) {
          const trigger = page.getByRole("button", { name: "Importer un JSON", exact: true }).first();
          await trigger.click();
          const dialog = page.getByRole("dialog", { name: "Importer ma collection" });
          await dialog.waitFor({ state: "visible" });
          assert.equal(await dialog.locator(".type-title-subsection").count(), 1, `${theme}-${viewport.name}: titre Modal`);
          assert.equal(await dialog.locator(".type-body-strong").count(), 1, `${theme}-${viewport.name}: body Modal`);
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          await page.waitForFunction((element) => document.activeElement === element, await trigger.elementHandle(), { timeout: 2_000 });
        }

        const probe = await typographyProbe(page);
        assert.ok(probe.semanticCount > 0, `${scenario.name}: aucun rôle Typography`);
        assert.ok(probe.headingSemanticCount > 0 || scenario.name === "state-system" || scenario.name === "modal", `${scenario.name}: aucun heading sémantique`);
        assert.ok(probe.fontSize >= 10 && probe.fontSize <= 60, `${scenario.name}: font-size ${probe.fontSize}`);
        assert.ok(["500", "600", "700", "900"].includes(probe.fontWeight), `${scenario.name}: weight ${probe.fontWeight}`);
        assert.ok(probe.lineHeight >= 16, `${scenario.name}: line-height ${probe.lineHeight}`);
        assert.ok(probe.sansVariable && probe.monoVariable, `${scenario.name}: variables Geist absentes`);
        assert.equal(probe.fontsStatus, "loaded", `${scenario.name}: fonts status`);
        assert.ok(probe.loadedFamilies.length >= 1, `${scenario.name}: Geist Sans non chargée`);
        if (probe.monoFamily) {
          assert.notEqual(probe.bodyFamily, probe.monoFamily, `${scenario.name}: Sans et Mono confondues ${JSON.stringify(probe)}`);
          monoChecks += 1;
        }
        assert.ok(probe.scroll <= probe.viewport + 1, `${scenario.name}-${theme}-${viewport.name}: overflow ${probe.scroll}/${probe.viewport}`);
        assert.ok(probe.box && probe.box.right <= probe.viewport + 1 && probe.box.left >= -1, `${scenario.name}: titre hors viewport`);

        if (scenario.name === "dashboard-cards" && viewport.name === "mobile") {
          const zoom = await page.evaluate(() => {
            const element = [...document.querySelectorAll('[class*="type-title"]')].find((candidate) => candidate.getBoundingClientRect().height > 0);
            const before = Number.parseFloat(getComputedStyle(element).fontSize);
            document.documentElement.style.fontSize = "200%";
            const after = Number.parseFloat(getComputedStyle(element).fontSize);
            const visibleText = document.body.innerText.trim().length;
            document.documentElement.style.fontSize = "";
            return { before, after, visibleText };
          });
          assert.ok(zoom.after >= zoom.before * 1.9, `${theme}: zoom Typography ${zoom.before}/${zoom.after}`);
          assert.ok(zoom.visibleText > 0, `${theme}: texte absent au zoom`);
          zoomChecks += 1;
        }

        assert.deepEqual(consoleErrors, [], `${scenario.name}: console errors`);
        assert.deepEqual(pageErrors, [], `${scenario.name}: page errors`);
        await page.screenshot({ path: path.join(artifactRoot, `${scenario.name}-${theme}-${viewport.name}.png`), fullPage: true });
        captures += 1;
        await context.close();
      }
    }
  }
  assert.equal(zoomChecks, 2);
  assert.ok(monoChecks > 0, "aucun scénario Geist Mono vérifié");
  console.info(`Typography browser verification: ${captures} captures, ${zoomChecks} contrôles zoom, ${monoChecks} contrôles Mono, sans overflow ni erreur.`);
} finally {
  await browser.close();
}
