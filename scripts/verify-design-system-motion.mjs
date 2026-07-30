import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-motion");
const baseUrl = process.env.MOTION_BASE_URL || "http://localhost:3032";
mkdirSync(artifactRoot, { recursive: true });

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const preferences = [
  { name: "normal", reducedMotion: "no-preference" },
  { name: "reduced", reducedMotion: "reduce" },
];
const scenarios = [
  { name: "dashboard", path: "/", ready: "Dashboard live" },
  { name: "interactive-cards", path: "/projects", ready: "Projets pratiques guidés" },
  { name: "forms", path: "/kanban", ready: "Kanban projet" },
  { name: "palette-menu", path: "/", ready: "Dashboard live", palette: true },
  { name: "drawer", path: "/", ready: "Dashboard live", drawer: true },
  { name: "admin-pokemon", path: "/pokemon-admin?section=overview", ready: "Synthèse des fiches" },
  { name: "events", path: "/pokemon-admin?section=events", ready: "Calendrier Events Pokémon GO" },
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

async function motionProbe(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const transitionElement = [...document.querySelectorAll('[class~="transition"], [class*="transition-"]')].find(visible);
    const energy = document.querySelector(".energy-scan");
    const sheen = [...document.querySelectorAll(".animated-sheen")].find(visible);
    const transitionStyle = transitionElement ? getComputedStyle(transitionElement) : null;
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      fast: rootStyle.getPropertyValue("--motion-duration-fast").trim(),
      normal: rootStyle.getPropertyValue("--motion-duration-normal").trim(),
      slow: rootStyle.getPropertyValue("--motion-duration-slow").trim(),
      standard: rootStyle.getPropertyValue("--motion-ease-standard").trim(),
      transitionDuration: transitionStyle?.transitionDuration || "",
      transitionProperty: transitionStyle?.transitionProperty || "",
      energyAnimation: energy ? getComputedStyle(energy).animationName : null,
      sheenAnimation: sheen ? getComputedStyle(sheen).animationName : null,
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    };
  });
}

const browser = await chromium.launch();
try {
  const cookies = await authenticate(browser);
  let captures = 0;
  let reducedChecks = 0;
  let interactionChecks = 0;
  for (const preference of preferences) {
    for (const theme of themes) {
      for (const viewport of viewports) {
        for (const scenario of scenarios) {
          const context = await browser.newContext({
            viewport: { width: viewport.width, height: viewport.height },
            colorScheme: theme,
            reducedMotion: preference.reducedMotion,
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
          await page.getByText(scenario.ready, { exact: false }).filter({ visible: true }).first().waitFor({ timeout: 30_000 });

          if (scenario.palette) {
            const trigger = page.getByRole("button", { name: /Palette dominante/ });
            await trigger.click();
            await page.getByText("Palette globale", { exact: true }).waitFor({ state: "visible" });
            assert.equal(await trigger.getAttribute("aria-expanded"), "true");
            interactionChecks += 1;
          }

          if (scenario.drawer && viewport.width < 1024) {
            const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
            await trigger.click();
            await page.locator(".dashboard-sidebar-mobile").waitFor({ state: "visible" });
            await page.keyboard.press("Escape");
            interactionChecks += 1;
          }

          await page.screenshot({ path: path.join(artifactRoot, `${scenario.name}-${preference.name}-${theme}-${viewport.name}.png`), fullPage: true });

          const probe = await motionProbe(page);
          assert.equal(probe.reduced, preference.name === "reduced", `${scenario.name}: préférence`);
          assert.ok(["150ms", ".15s", "0.15s"].includes(probe.fast), `${scenario.name}: fast ${probe.fast}`);
          assert.ok(["200ms", ".2s", "0.2s"].includes(probe.normal), `${scenario.name}: normal ${probe.normal}`);
          assert.ok(["300ms", ".3s", "0.3s"].includes(probe.slow), `${scenario.name}: slow ${probe.slow}`);
          assert.ok(probe.standard, `${scenario.name}: easing standard`);
          assert.ok(probe.transitionDuration, `${scenario.name}: transition calculée absente`);
          if (preference.name === "reduced") {
            assert.match(probe.transitionDuration, /0\.00001s|0\.01ms|1e-05s/, `${scenario.name}: durée réduite ${probe.transitionDuration}`);
            assert.equal(probe.energyAnimation, "none", `${scenario.name}: energy-scan réduit`);
            if (probe.sheenAnimation) assert.equal(probe.sheenAnimation, "none", `${scenario.name}: sheen réduit`);
            reducedChecks += 1;
          } else {
            assert.doesNotMatch(probe.transitionDuration, /0\.00001s|0\.01ms|1e-05s/, `${scenario.name}: durée normale`);
            assert.equal(probe.energyAnimation, "energy-scan", `${scenario.name}: energy-scan normal`);
          }
          assert.ok(probe.scroll <= probe.viewport + 1, `${scenario.name}-${preference.name}-${theme}-${viewport.name}: overflow ${probe.scroll}/${probe.viewport}`);
          assert.deepEqual(consoleErrors, [], `${scenario.name}: console errors`);
          assert.deepEqual(pageErrors, [], `${scenario.name}: page errors`);
          captures += 1;
          await context.close();
        }
      }
    }
  }
  assert.equal(captures, 84);
  assert.equal(reducedChecks, 42);
  assert.ok(interactionChecks >= 12);
  console.info(`Motion browser verification: ${captures} captures, ${reducedChecks} contrôles reduced-motion, ${interactionChecks} interactions, sans overflow ni erreur.`);
} finally {
  await browser.close();
}
