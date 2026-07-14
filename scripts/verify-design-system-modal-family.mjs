import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-modal-family");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.MODAL_FAMILY_BASE_URL || "http://localhost:3025";

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "position", "zIndex", "width", "height", "maxWidth", "maxHeight", "paddingTop",
  "paddingRight", "paddingBottom", "paddingLeft", "borderRadius", "borderTopWidth", "borderColor",
  "backgroundColor", "color", "boxShadow", "overflow", "overflowY", "opacity", "transform",
  "transitionDuration", "animationDuration",
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

function hash(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function fulfillJson(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page) {
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return fulfillJson(route, { data: { configured: false, value: null } });
    return fulfillJson(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-redeploy**", (route) => fulfillJson(route, { data: { history: [] } }));
  await page.route("**/api/events**", (route) => fulfillJson(route, { data: { events: [], configured: false, seeded: true, collection: "events" } }));
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
    if (action === "session") return fulfillJson(route, { data: { authenticated: true } });
    if (action === "assets") return fulfillJson(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history"].includes(action)) return fulfillJson(route, { data: [] });
    if (["raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings", "best-attackers", "pokemon-identity-mappings"].includes(action)) {
      return fulfillJson(route, { data: { entries: [], raids: [], eggs: [], battles: [], profiles: [], research: [], meta: { total: 0, page: 1, pages: 1 } } });
    }
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
}

async function authenticate(page) {
  const credentials = readEnvironment();
  await page.goto(`${baseUrl}/login?next=/kanban`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/kanban", { timeout: 20_000 }),
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
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: theme,
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
    for (const key of ["matweb.kanban", "matweb.dashboard.sidebarGroups"]) localStorage.removeItem(key);
    localStorage.setItem("pokedex-v4-admin-collections", JSON.stringify([]));
  }, { selectedTheme: theme, fixedTime: "2026-07-14T08:00:00.000Z" });
  return context;
}

async function goto(page, pathname) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((theme) => document.documentElement.classList.contains(theme), await page.evaluate(() => localStorage.getItem("matweb-theme")));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
}

async function computedStyles(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function elementSignature(locator) {
  return locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      tag: element.tagName.toLowerCase(), role: element.getAttribute("role") || "",
      ariaModal: element.getAttribute("aria-modal") || "", ariaLabel: element.getAttribute("aria-label") || "",
      ariaLabelledby: element.getAttribute("aria-labelledby") || "", width: Math.round(rect.width),
      height: Math.round(rect.height), clientHeight: element.clientHeight, scrollHeight: element.scrollHeight,
    };
  });
}

async function screenshot(locator, key) {
  const file = path.join(stageDirectory, `${key.replaceAll("/", "-")}.png`);
  const buffer = await locator.screenshot({ path: file, animations: "disabled" });
  return { sha256: hash(buffer), file: path.relative(root, file) };
}

async function visibleFocusables(locator) {
  return locator.locator("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])").evaluateAll((elements) => elements.filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  }).map((element) => ({
    tag: element.tagName.toLowerCase(), type: element.getAttribute("type") || "",
    name: element.getAttribute("aria-label") || element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) || "",
    tabIndex: element.tabIndex,
  })));
}

async function openSurface(trigger, surface, label) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    if (await surface.isVisible()) return;
    await trigger.click();
    try {
      await surface.waitFor({ state: "visible", timeout: 2_500 });
      return;
    } catch {
      if (attempt === 3) throw new Error(`${label}: ouverture impossible après ${attempt} tentatives`);
      await trigger.page().waitForTimeout(300);
    }
  }
}

async function canonicalScenario(page, key) {
  await goto(page, "/kanban");
  const card = page.locator('[data-task-id="k1"]');
  await card.waitFor({ state: "visible" });
  const opener = card.locator("button.block.w-full");
  await opener.focus();
  const overflowBefore = await page.evaluate(() => document.body.style.overflow);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(80);
  const overlay = dialog.locator("xpath=..");
  const focusables = dialog.locator("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])");
  const first = focusables.first();
  const last = focusables.last();
  const initialFocusInside = await dialog.evaluate((element) => element.contains(document.activeElement));
  const overflowDuring = await page.evaluate(() => document.body.style.overflow);
  await first.focus();
  await page.keyboard.press("Shift+Tab");
  const backwardTrap = await last.evaluate((element) => document.activeElement === element);
  await last.focus();
  await page.keyboard.press("Tab");
  const forwardTrap = await first.evaluate((element) => document.activeElement === element);
  const result = {
    kind: "A-canonical", dialog: await elementSignature(dialog), dialogStyles: await computedStyles(dialog),
    overlayStyles: await computedStyles(overlay), focusables: await visibleFocusables(dialog),
    screenshot: await screenshot(dialog, key), initialFocusInside, backwardTrap, forwardTrap,
    scrollLock: overflowDuring === "hidden", overflowBefore,
  };
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  result.escapeCloses = true;
  result.focusReturnsAfterEscape = await opener.evaluate((element) => document.activeElement === element);
  result.scrollRestored = await page.evaluate((previous) => document.body.style.overflow === previous, overflowBefore);

  await opener.click();
  await dialog.waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Fermer", exact: true }).click({ position: { x: 2, y: 2 } });
  await dialog.waitFor({ state: "hidden" });
  result.overlayCloses = true;

  await opener.click();
  await dialog.waitFor({ state: "visible" });
  await dialog.getByRole("button", { name: "Fermer la fenêtre", exact: true }).click();
  await dialog.waitFor({ state: "hidden" });
  result.closeButtonCloses = true;
  assert.equal(result.dialog.role, "dialog");
  assert.equal(result.dialog.ariaModal, "true");
  for (const property of ["initialFocusInside", "backwardTrap", "forwardTrap", "scrollLock", "escapeCloses", "focusReturnsAfterEscape", "scrollRestored", "overlayCloses", "closeButtonCloses"]) assert.equal(result[property], true, `${key}: ${property}`);
  return result;
}

async function versionScenario(page, key) {
  await goto(page, "/kanban");
  const trigger = page.getByRole("button", { name: "Ouvrir l'historique des versions du Dashboard" }).first();
  const overflowBefore = await page.evaluate(() => document.body.style.overflow);
  const dialog = page.getByRole("dialog", { name: "Historique des versions du Dashboard" });
  await openSurface(trigger, dialog, `${key}/version-history`);
  await page.waitForTimeout(220);
  const panel = dialog.locator("section");
  const panelScreenshot = await screenshot(panel, key);
  const result = {
    kind: "D-legacy", dialog: await elementSignature(dialog), dialogStyles: await computedStyles(dialog),
    panelStyles: await computedStyles(panel), focusables: await visibleFocusables(dialog),
    screenshot: panelScreenshot,
    initialFocusInside: await dialog.evaluate((element) => element.contains(document.activeElement)),
    scrollLock: await page.evaluate(() => document.body.style.overflow === "hidden"),
  };
  await page.keyboard.press("Escape");
  result.escapeCloses = !(await dialog.isVisible());
  await dialog.click({ position: { x: 2, y: 2 } });
  await dialog.waitFor({ state: "hidden" });
  result.overlayCloses = true;
  result.scrollUnchanged = await page.evaluate((previous) => document.body.style.overflow === previous, overflowBefore);

  await openSurface(trigger, dialog, `${key}/version-history-close`);
  await dialog.getByRole("button", { name: "Fermer l'historique des versions" }).click();
  await dialog.waitFor({ state: "hidden" });
  result.closeButtonCloses = true;
  assert.equal(result.dialog.role, "dialog");
  assert.equal(result.dialog.ariaModal, "true");
  assert.equal(result.escapeCloses, false);
  assert.equal(result.overlayCloses, true);
  assert.equal(result.closeButtonCloses, true);
  return result;
}

async function drawerScenario(page, key, viewport) {
  if (viewport.name === "desktop") return { kind: "C-drawer", skipped: "desktop" };
  await goto(page, "/kanban");
  const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
  const drawer = page.locator(".dashboard-sidebar-mobile");
  await openSurface(trigger, drawer, `${key}/drawer`);
  const overlay = drawer.locator("xpath=..");
  const drawerScreenshot = await screenshot(drawer, key);
  const result = {
    kind: "C-drawer", drawer: await elementSignature(drawer), drawerStyles: await computedStyles(drawer),
    overlayStyles: await computedStyles(overlay), screenshot: drawerScreenshot,
    initialFocusInside: await drawer.evaluate((element) => element.contains(document.activeElement)),
    scrollLock: await page.evaluate(() => document.body.style.overflow === "hidden"),
  };
  await page.keyboard.press("Escape");
  result.escapeCloses = !(await drawer.isVisible());
  const box = await overlay.boundingBox();
  assert.ok(box);
  await page.mouse.click(box.x + box.width - 2, box.y + 2);
  await drawer.waitFor({ state: "hidden" });
  result.overlayCloses = true;
  assert.equal(result.escapeCloses, false);
  return result;
}

async function eventImportScenario(page, key) {
  await goto(page, "/pokemon-admin?section=events");
  await page.getByRole("heading", { name: "Calendrier Events", exact: true }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Import JSON", exact: true });
  const heading = page.getByRole("heading", { name: "Importer des events" });
  await openSurface(trigger, heading, `${key}/event-import`);
  const panel = heading.locator("xpath=ancestor::article");
  const overlay = panel.locator("xpath=..");
  const result = {
    kind: "D-collision", panel: await elementSignature(panel), panelStyles: await computedStyles(panel),
    overlayStyles: await computedStyles(overlay), focusables: await visibleFocusables(panel),
    screenshot: await screenshot(panel, key), initialFocusInside: await panel.evaluate((element) => element.contains(document.activeElement)),
  };
  await page.keyboard.press("Escape");
  result.escapeCloses = !(await panel.isVisible());
  await overlay.click({ position: { x: 2, y: 2 } });
  await panel.waitFor({ state: "hidden" });
  result.overlayCloses = true;
  await openSurface(trigger, heading, `${key}/event-import-close`);
  await panel.locator("button").first().click();
  await panel.waitFor({ state: "hidden" });
  result.closeButtonCloses = true;
  assert.equal(result.panel.role, "");
  assert.equal(result.escapeCloses, false);
  return result;
}

async function collectionsScenario(page, key) {
  await goto(page, "/pokemon-admin?section=collections");
  await page.getByRole("heading", { name: "Collections Pokemon GO" }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Nouvelle collection" });
  const dialog = page.getByRole("dialog");
  await openSurface(trigger, dialog, `${key}/collections-editor`);
  const panel = dialog.locator("section");
  const result = {
    kind: "C-collision", dialog: await elementSignature(dialog), panelStyles: await computedStyles(panel),
    screenshot: await screenshot(panel, key), focusables: await visibleFocusables(dialog),
    initialFocusInside: await dialog.evaluate((element) => element.contains(document.activeElement)),
  };
  await page.keyboard.press("Escape");
  result.escapeCloses = !(await dialog.isVisible());
  await dialog.click({ position: { x: 2, y: 2 } });
  result.overlayCloses = !(await dialog.isVisible());
  await dialog.locator("button").first().click();
  await dialog.waitFor({ state: "hidden" });
  result.closeButtonCloses = true;
  assert.equal(result.dialog.ariaModal, "true");
  assert.equal(result.dialog.ariaLabel, "");
  assert.equal(result.escapeCloses, false);
  assert.equal(result.overlayCloses, false);
  return result;
}

async function sourceHistoryScenario(page, key) {
  await goto(page, "/pokemon-admin?section=sources");
  await page.getByRole("heading", { name: "Veille sources" }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Historique", exact: true });
  const dialog = page.getByRole("dialog");
  await openSurface(trigger, dialog, `${key}/source-history`);
  const panel = dialog.locator("section");
  const result = {
    kind: "D-legacy", dialog: await elementSignature(dialog), panelStyles: await computedStyles(panel),
    screenshot: await screenshot(panel, key), focusables: await visibleFocusables(dialog),
    initialFocusInside: await dialog.evaluate((element) => element.contains(document.activeElement)),
  };
  await page.keyboard.press("Escape");
  result.escapeCloses = !(await dialog.isVisible());
  await dialog.click({ position: { x: 2, y: 2 } });
  result.overlayCloses = !(await dialog.isVisible());
  await dialog.getByRole("button", { name: "Fermer l'historique des sources" }).click();
  await dialog.waitFor({ state: "hidden" });
  result.closeButtonCloses = true;
  assert.equal(result.dialog.ariaModal, "true");
  assert.equal(result.dialog.ariaLabel, "");
  assert.equal(result.escapeCloses, false);
  assert.equal(result.overlayCloses, false);
  return result;
}

const scenarios = [
  ["canonical-kanban", canonicalScenario],
  ["version-history", versionScenario],
  ["drawer", drawerScenario],
  ["event-import", eventImportScenario],
  ["collections-editor", collectionsScenario],
  ["source-history", sourceHistoryScenario],
];
const selectedScenarios = scenarios.filter(([name]) => !process.env.MODAL_FAMILY_SCENARIO || name === process.env.MODAL_FAMILY_SCENARIO);
const selectedThemes = themes.filter((theme) => !process.env.MODAL_FAMILY_THEME || theme === process.env.MODAL_FAMILY_THEME);
const selectedViewports = viewports.filter((viewport) => !process.env.MODAL_FAMILY_VIEWPORT || viewport.name === process.env.MODAL_FAMILY_VIEWPORT);

async function runScenario(browser, cookies, theme, viewport, name, handler) {
  const context = await createContext(browser, cookies, theme, viewport);
  const page = await context.newPage();
  await installRoutes(page);
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const key = `${theme}/${viewport.name}/${name}`;
  try {
    const result = await handler(page, key, viewport);
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    const reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
    assert.equal(overflow, 0, `${key}: overflow horizontal`);
    assert.deepEqual(pageErrors, [], `${key}: erreurs React/page`);
    assert.deepEqual(consoleErrors, [], `${key}: erreurs console`);
    return { key, theme, viewport: viewport.name, scenario: name, overflow, reducedMotion, consoleErrors, pageErrors, result };
  } finally {
    await context.close();
  }
}

function comparable(run) {
  return JSON.parse(JSON.stringify(run, (key, value) => ["file", "sha256"].includes(key) ? undefined : value));
}

async function pixelDifference(beforeFile, afterFile) {
  const before = await sharp(path.join(root, beforeFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(path.join(root, afterFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(before.info.width, after.info.width);
  assert.equal(before.info.height, after.info.height);
  let changedPixels = 0;
  for (let index = 0; index < before.data.length; index += 4) {
    const delta = Math.max(...[0, 1, 2, 3].map((channel) => Math.abs(before.data[index + channel] - after.data[index + channel])));
    if (delta > 8) changedPixels += 1;
  }
  return changedPixels;
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const cookies = await createCookies(browser);
    const runs = [];
    for (const theme of selectedThemes) {
      for (const viewport of selectedViewports) {
        for (const [name, handler] of selectedScenarios) {
          console.log(`Modal ${stage}: ${theme}/${viewport.name}/${name}`);
          runs.push(await runScenario(browser, cookies, theme, viewport, name, handler));
        }
      }
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Modal : ${runs.length} scénarios, ${runs.filter((run) => !run.result.skipped).length} exécutés`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
    const differences = [];
    for (const run of runs) {
      const before = beforeByKey.get(run.key);
      if (!before) { differences.push(`${run.key}: baseline absente`); continue; }
      if (JSON.stringify(comparable(before)) !== JSON.stringify(comparable(run))) differences.push(`${run.key}: contrat, styles, interaction ou capture différents`);
      if (before.result.screenshot && run.result.screenshot) {
        const changedPixels = await pixelDifference(before.result.screenshot.file, run.result.screenshot.file);
        if (changedPixels) differences.push(`${run.key}: ${changedPixels} pixels significativement différents`);
      }
    }
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ differences, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(differences, []);
    console.log(`Vérification Modal : ${runs.length} scénarios, 0 différence`);
  } finally {
    await browser.close();
  }
}

await main();
