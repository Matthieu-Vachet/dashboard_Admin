import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-modal-complete");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const target = !updateBaseline;
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.MODAL_COMPLETE_BASE_URL || "http://localhost:3025";

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "position", "zIndex", "width", "height", "maxWidth", "maxHeight",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderRadius",
  "borderTopWidth", "borderColor", "backgroundColor", "color", "boxShadow",
  "overflow", "overflowY", "opacity", "transform", "transitionDuration", "animationDuration",
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
    if (route.request().method() === "GET") return fulfillJson(route, { data: { configured: false, value: null } });
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
    source: "fixture", status: "ok", total: 0, complete: 0, issues: 0, quality: 100,
    catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [],
  }));
  await page.route("**/api/pokemon-api-health", (route) => fulfillJson(route, { data: {
    connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600,
    timestamp: "2026-07-22T08:00:00.000Z", label: "API stable",
  } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const url = new URL(route.request().url());
    const action = url.searchParams.get("action") || "bootstrap";
    if (action === "session") return fulfillJson(route, { data: { authenticated: true } });
    if (action === "assets") return fulfillJson(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history", "data-deploy-history"].includes(action)) return fulfillJson(route, { data: [] });
    if (action === "identity-manager-sync-preview") return fulfillJson(route, { data: {
      inventory: { total: 0, issues: 0, fingerprint: "fixture-identity-catalog" },
      before: { identities: 0 }, after: { identities: 0 }, create: 0, update: 0, orphan: 0,
      conflict: 0, unchanged: 0, aliasesPreserved: 0, conflicts: [], mewtwoArmored: "present",
    } });
    if (action === "identity-manager-conflicts") return fulfillJson(route, { data: { data: { explicitConflicts: 0, aliasConflicts: [] } } });
    if (action.startsWith("identity-manager")) return fulfillJson(route, { data: { data: [], meta: { page: 1, limit: 24, total: 0, pages: 1, stats: { providers: [], statuses: {} } } } });
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
    viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript(({ selectedTheme }) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    for (const key of ["matweb.kanban", "matweb.dashboard.sidebarGroups", "matweb.js.learning.progress", "matweb.js.learning.progress.v2"]) localStorage.removeItem(key);
    localStorage.setItem("pokedex-v4-admin-collections", JSON.stringify([]));
  }, { selectedTheme: theme });
  return context;
}

async function goto(page, pathname) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((theme) => document.documentElement.classList.contains(theme), await page.evaluate(() => localStorage.getItem("matweb-theme")));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
}

async function openSurface(trigger, surface, label) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    if (await surface.isVisible()) return;
    await trigger.click();
    try {
      await surface.waitFor({ state: "visible", timeout: 3_000 });
      return;
    } catch {
      if (attempt === 3) throw new Error(`${label}: ouverture impossible`);
      await trigger.page().waitForTimeout(300);
    }
  }
}

async function computedStyles(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function contract(locator) {
  return locator.evaluate((element) => {
    const labelledby = element.getAttribute("aria-labelledby") || "";
    const describedby = element.getAttribute("aria-describedby") || "";
    const textFor = (ids) => ids.split(/\s+/).filter(Boolean).map((id) => document.getElementById(id)?.textContent?.replace(/\s+/g, " ").trim() || "").join(" ");
    return {
      tag: element.tagName.toLowerCase(), role: element.getAttribute("role") || "",
      ariaModal: element.getAttribute("aria-modal") || "", ariaLabel: element.getAttribute("aria-label") || "",
      labelledby, describedby, labelledText: textFor(labelledby), describedText: textFor(describedby),
      idCount: new Set([labelledby, describedby].flatMap((ids) => ids.split(/\s+/)).filter(Boolean)).size,
    };
  });
}

async function visibleFocusables(locator) {
  return locator.locator("button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])").evaluateAll((elements) => elements.filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  }).map((element) => ({ tag: element.tagName.toLowerCase(), tabIndex: element.tabIndex, name: element.getAttribute("aria-label") || element.textContent?.replace(/\s+/g, " ").trim().slice(0, 60) || "" })));
}

async function capture(surface, panel, overlay, key) {
  await surface.page().evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
  const file = path.join(stageDirectory, `${key.replaceAll("/", "-")}.png`);
  await panel.screenshot({ path: file, animations: "disabled" });
  return {
    contract: await contract(surface),
    focusables: await visibleFocusables(surface),
    overlay: overlay ? await overlay.evaluate((element) => ({ tag: element.tagName.toLowerCase(), tabIndex: element.tabIndex, ariaHidden: element.getAttribute("aria-hidden") || "" })) : null,
    visual: { surface: await computedStyles(surface), panel: await computedStyles(panel), overlay: overlay ? await computedStyles(overlay) : null },
    screenshot: path.relative(root, file),
  };
}

async function canonicalKanban(page, key) {
  await goto(page, "/kanban");
  const opener = page.locator('[data-task-id="k1"] button.block.w-full');
  await opener.waitFor({ state: "visible" });
  await opener.focus();
  const overflowBefore = await page.evaluate(() => document.body.style.overflow);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement));
  const overlay = dialog.locator("xpath=preceding-sibling::*[1]");
  const first = dialog.locator("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]").first();
  const last = dialog.locator("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]").last();
  const initialFocusInside = await dialog.evaluate((element) => element.contains(document.activeElement));
  await first.focus(); await page.keyboard.press("Shift+Tab");
  const backwardTrap = await last.evaluate((element) => document.activeElement === element);
  await last.focus(); await page.keyboard.press("Tab");
  const forwardTrap = await first.evaluate((element) => document.activeElement === element);
  const result = await capture(dialog, dialog, overlay, key);
  Object.assign(result, { initialFocusInside, backwardTrap, forwardTrap, scrollLock: await page.evaluate(() => document.body.style.overflow === "hidden") });
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  result.escapeCloses = true;
  result.focusReturns = await opener.evaluate((element) => document.activeElement === element);
  result.scrollRestored = await page.evaluate((before) => document.body.style.overflow === before, overflowBefore);
  await opener.click(); await dialog.waitFor({ state: "visible" });
  const nextOverlay = dialog.locator("xpath=preceding-sibling::*[1]");
  await nextOverlay.click({ position: { x: 2, y: 2 } }); await dialog.waitFor({ state: "hidden" });
  result.overlayCloses = true;
  await opener.click(); await dialog.waitFor({ state: "visible" });
  await dialog.getByRole("button", { name: "Fermer la fenêtre" }).click(); await dialog.waitFor({ state: "hidden" });
  result.closeCloses = true;
  for (const field of ["initialFocusInside", "backwardTrap", "forwardTrap", "scrollLock", "escapeCloses", "focusReturns", "scrollRestored", "overlayCloses", "closeCloses"]) assert.equal(result[field], true, `${key}: ${field}`);
  if (target) {
    assert.equal(result.contract.ariaLabel, ""); assert.ok(result.contract.labelledText); assert.ok(result.contract.describedText);
    assert.equal(result.overlay.tabIndex, -1); assert.equal(result.overlay.ariaHidden, "true");
  }
  return result;
}

async function identityFooter(page, key) {
  await goto(page, "/pokemon-admin?section=identity-manager");
  const trigger = page.getByRole("button", { name: "Importer", exact: true }).last();
  await trigger.waitFor({ state: "visible", timeout: 30_000 });
  const dialog = page.getByRole("dialog", { name: "Importer des identités" });
  await openSurface(trigger, dialog, key);
  const overlay = dialog.locator("xpath=preceding-sibling::*[1]");
  const result = await capture(dialog, dialog, overlay, key);
  result.hasFooter = await dialog.locator("footer").isVisible();
  assert.equal(result.hasFooter, true);
  if (target) { assert.equal(result.contract.labelledText, "Importer des identités"); assert.ok(result.contract.describedText); }
  await dialog.getByRole("button", { name: "Fermer la fenêtre" }).click();
  return result;
}

async function learningLong(page, key) {
  await goto(page, "/js-progress");
  const trigger = page.getByRole("button", { name: "Importer un JSON" });
  const dialog = page.getByRole("dialog", { name: "Importer un JSON pédagogique" });
  await openSurface(trigger, dialog, key);
  const overlay = dialog.locator("xpath=preceding-sibling::*[1]");
  const result = await capture(dialog, dialog, overlay, key);
  result.scrollable = await dialog.locator("div.max-h-\\[calc\\(92dvh-9rem\\)\\]").evaluate((element) => element.scrollHeight >= element.clientHeight);
  if (target) { assert.equal(result.contract.labelledText, "Importer un JSON pédagogique"); assert.ok(result.contract.describedText); }
  await dialog.getByRole("button", { name: "Fermer la fenêtre" }).click();
  return result;
}

async function versionHistory(page, key, viewport) {
  await goto(page, "/kanban");
  const trigger = page.getByRole("button", { name: "Ouvrir l'historique des versions du Dashboard" }).first();
  const dialog = target
    ? page.getByRole("dialog", { name: "Historique des versions", exact: true })
    : page.getByRole("dialog", { name: "Historique des versions du Dashboard" });
  const overflowBefore = await page.evaluate(() => document.body.style.overflow);
  await openSurface(trigger, dialog, key); await page.waitForTimeout(220);
  const panel = (await dialog.evaluate((element) => element.tagName.toLowerCase())) === "section" ? dialog : dialog.locator("section");
  const outer = (await dialog.evaluate((element) => element.tagName.toLowerCase())) === "section" ? dialog.locator("xpath=..") : dialog;
  const initialFocusInside = await dialog.evaluate((element) => element.contains(document.activeElement));
  const result = await capture(dialog, panel, outer, key);
  // Le rôle dialog passe de l'overlay au panneau, mais le contrat visuel à
  // comparer reste celui du panneau dans les deux états.
  result.visual.surface = result.visual.panel;
  result.initialFocusInside = initialFocusInside;
  result.scrollLock = await page.evaluate(() => document.body.style.overflow === "hidden");
  result.reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  await page.keyboard.press("Escape");
  try {
    await dialog.waitFor({ state: "hidden", timeout: 1_000 });
    result.escapeCloses = true;
  } catch {
    result.escapeCloses = false;
  }
  if (!result.escapeCloses) { await outer.click({ position: { x: 2, y: 2 } }); await dialog.waitFor({ state: "hidden" }); }
  result.focusReturns = await trigger.evaluate((element) => document.activeElement === element);
  result.scrollRestored = await page.evaluate((before) => document.body.style.overflow === before, overflowBefore);
  if (target) {
    assert.ok(result.contract.labelledText.includes("Historique des versions")); assert.ok(result.contract.describedText);
    for (const field of ["initialFocusInside", "scrollLock", "escapeCloses", "focusReturns", "scrollRestored"]) assert.equal(result[field], true, `${key}: ${field}`);
    if (viewport.name === "mobile") assert.equal(result.reducedMotion, true);
  }
  return result;
}

async function eventImport(page, key) {
  await goto(page, "/pokemon-admin?section=events");
  await page.getByRole("heading", { name: "Calendrier Events", exact: true }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Import JSON", exact: true });
  const heading = page.getByRole("heading", { name: "Importer des events" });
  await trigger.click(); await heading.waitFor({ state: "visible" });
  const panel = heading.locator("xpath=ancestor::article");
  const surface = target ? panel : panel;
  const overlay = panel.locator("xpath=..");
  const result = await capture(surface, panel, overlay, key);
  if (target) { assert.equal(result.contract.role, "dialog"); assert.equal(result.contract.labelledText, "Importer des events"); }
  if (target) await panel.getByRole("button", { name: "Fermer l’import des events" }).click();
  else await panel.locator("button").first().click();
  return result;
}

async function collectionsEditor(page, key) {
  await goto(page, "/pokemon-admin?section=collections");
  await page.getByRole("heading", { name: "Collections Pokemon GO" }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Nouvelle collection" });
  const dialog = page.getByRole("dialog");
  await openSurface(trigger, dialog, key);
  const panel = dialog.locator("section");
  const result = await capture(dialog, panel, dialog, key);
  if (target) assert.equal(result.contract.labelledText, "Nouvelle collection");
  if (target) await dialog.getByRole("button", { name: "Fermer l’éditeur de collection" }).click();
  else await dialog.locator("button").first().click();
  return result;
}

async function sourceHistory(page, key) {
  await goto(page, "/pokemon-admin?section=sources");
  await page.getByRole("heading", { name: "Veille sources" }).waitFor({ state: "visible", timeout: 30_000 });
  const trigger = page.getByRole("button", { name: "Historique", exact: true });
  const dialog = page.getByRole("dialog");
  await openSurface(trigger, dialog, key);
  const panel = dialog.locator("section");
  const result = await capture(dialog, panel, dialog, key);
  if (target) { assert.equal(result.contract.labelledText, "Historique des sources"); assert.ok(result.contract.describedText); }
  await dialog.getByRole("button", { name: "Fermer l'historique des sources" }).click();
  return result;
}

async function mobileNavigation(page, key, viewport) {
  if (viewport.name === "desktop") return { skipped: "desktop" };
  await goto(page, "/pokemon-admin");
  const trigger = page.locator('button[aria-haspopup="dialog"]');
  await trigger.waitFor({ state: "visible", timeout: 30_000 });
  const dialog = page.getByRole("dialog", { name: "Navigation Admin Pokémon" });
  await openSurface(trigger, dialog, key);
  await page.waitForFunction(() => document.querySelector('[aria-label="Navigation Admin Pokémon"]')?.contains(document.activeElement));
  const initialFocusInside = await dialog.evaluate((element) => element.contains(document.activeElement));
  const result = await capture(dialog, dialog, null, key);
  result.initialFocusInside = initialFocusInside;
  result.scrollLock = await page.evaluate(() => document.body.style.overflow === "hidden");
  await page.keyboard.press("Escape"); result.escapeCloses = !(await dialog.isVisible());
  for (const field of ["initialFocusInside", "scrollLock", "escapeCloses"]) assert.equal(result[field], true, `${key}: ${field}`);
  return result;
}

const scenarios = [
  ["canonical-kanban", canonicalKanban], ["canonical-identity-footer", identityFooter],
  ["canonical-learning-long", learningLong], ["specialized-version-history", versionHistory],
  ["specialized-event-import", eventImport], ["specialized-collections", collectionsEditor],
  ["specialized-source-history", sourceHistory], ["mobile-admin-navigation", mobileNavigation],
];

async function pixelDifference(beforeFile, afterFile) {
  const before = await sharp(path.join(root, beforeFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(path.join(root, afterFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(before.info.width, after.info.width); assert.equal(before.info.height, after.info.height);
  let changed = 0;
  for (let index = 0; index < before.data.length; index += 4) {
    const delta = Math.max(...[0, 1, 2, 3].map((channel) => Math.abs(before.data[index + channel] - after.data[index + channel])));
    if (delta > 8) changed += 1;
  }
  return changed;
}

async function runScenario(browser, cookies, theme, viewport, name, handler) {
  const context = await createContext(browser, cookies, theme, viewport);
  const page = await context.newPage(); await installRoutes(page);
  const consoleErrors = []; const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const key = `${theme}/${viewport.name}/${name}`;
  try {
    const result = await handler(page, key, viewport);
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    assert.equal(overflow, 0, `${key}: overflow horizontal`);
    assert.deepEqual(pageErrors, [], `${key}: erreurs React/page`);
    assert.deepEqual(consoleErrors, [], `${key}: erreurs console`);
    return { key, theme, viewport: viewport.name, scenario: name, overflow, consoleErrors, pageErrors, result };
  } finally { await context.close(); }
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const cookies = await createCookies(browser); const runs = [];
    for (const theme of themes) for (const viewport of viewports) for (const [name, handler] of scenarios) {
      console.log(`Modal complet ${stage}: ${theme}/${viewport.name}/${name}`);
      runs.push(await runScenario(browser, cookies, theme, viewport, name, handler));
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Modal complet : ${runs.length} scénarios, ${runs.filter((run) => !run.result.skipped).length} exécutés`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run])); const differences = [];
    for (const run of runs) {
      const before = beforeByKey.get(run.key);
      if (!before) { differences.push(`${run.key}: baseline absente`); continue; }
      if (run.result.skipped || before.result.skipped) continue;
      const beforeVisual = run.scenario === "specialized-version-history"
        ? { ...before.result.visual, surface: before.result.visual.panel }
        : before.result.visual;
      if (JSON.stringify(beforeVisual) !== JSON.stringify(run.result.visual)) differences.push(`${run.key}: styles calculés différents`);
      const changedPixels = await pixelDifference(before.result.screenshot, run.result.screenshot);
      if (changedPixels) differences.push(`${run.key}: ${changedPixels} pixels significativement différents`);
    }
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ differences, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(differences, []);
    console.log(`Vérification Modal complet : ${runs.length} scénarios, 0 différence visuelle ou de style`);
  } finally { await browser.close(); }
}

await main();
