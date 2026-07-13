import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-button-family");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.DESIGN_SYSTEM_BASE_URL || "http://localhost:3022";
const transparentPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAFAgI/6tW4GQAAAABJRU5ErkJggg==",
  "base64",
);

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display",
  "width",
  "height",
  "minHeight",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "borderRadius",
  "borderWidth",
  "borderColor",
  "backgroundColor",
  "color",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "alignItems",
  "justifyContent",
  "gap",
  "outlineStyle",
  "outlineWidth",
  "outlineColor",
  "outlineOffset",
  "opacity",
  "cursor",
  "transitionDuration",
  "transitionProperty",
];

function readEnvironment() {
  const file = path.join(root, ".env.local");
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8").split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match) return [];
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) value = value.slice(1, -1);
      return [[match[1], value]];
    }),
  );
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

async function fulfillJson(route, body) {
  await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
}

function assetFixture(index) {
  return {
    id: `asset-${index}`,
    filename: `asset-${String(index).padStart(3, "0")}.png`,
    label: `Asset fixture ${index}`,
    assetType: "go",
    url: `https://raw.githubusercontent.com/fixture/assets/asset-${index}.png`,
  };
}

async function installRoutes(page) {
  await page.route("**/api/pokemon-stats", (route) => fulfillJson(route, {
    source: "live",
    status: "fixture",
    detail: "Baseline Button",
    total: 1602,
    complete: 1602,
    issues: 0,
    quality: 100,
    catalog: { types: 18, weather: 7, stickers: 1667, moves: 467 },
    generations: Array.from({ length: 9 }, (_, index) => ({ name: `G${index + 1}`, completion: 100, entries: 100 })),
    kinds: [{ name: "pokemon", value: 1602 }],
  }));
  await page.route("**/api/pokemon-api-health", (route) => fulfillJson(route, { data: {
    connected: true,
    api: "ok",
    database: "fixture",
    statusCode: 200,
    uptimeSeconds: 600,
    timestamp: "2026-07-13T08:00:00.000Z",
    label: "API stable",
    docsUrl: "https://example.test/docs",
    swaggerUrl: "https://example.test/swagger",
  } }));
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return fulfillJson(route, { data: { configured: false, value: null } });
    return fulfillJson(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-redeploy**", (route) => fulfillJson(route, { data: { history: [] } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const url = new URL(route.request().url());
    const action = url.searchParams.get("action") || "bootstrap";
    if (action === "session") return fulfillJson(route, { data: { authenticated: true } });
    if (action === "assets") return fulfillJson(route, { data: {
      goAssets: Array.from({ length: 121 }, (_, index) => assetFixture(index + 1)),
      proposals: [],
      shuffleAssets: [],
      unused: [],
    } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history"].includes(action)) return fulfillJson(route, { data: [] });
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
  await page.route("https://raw.githubusercontent.com/**", (route) => route.fulfill({
    status: 200,
    contentType: "image/png",
    body: transparentPng,
  }));
  await page.route("https://pokemon-go-api.vercel.app/**", (route) => route.fulfill({
    status: 200,
    contentType: "text/html",
    body: "<!doctype html><title>external fixture</title>",
  }));
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

async function computedStyles(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function semanticSignature(locator) {
  return locator.evaluate((element) => ({
    tag: element.tagName.toLowerCase(),
    type: element.getAttribute("type") || "",
    disabled: "disabled" in element ? element.disabled : false,
    ariaDisabled: element.getAttribute("aria-disabled") || "",
    ariaPressed: element.getAttribute("aria-pressed") || "",
    href: element.getAttribute("href") || "",
    target: element.getAttribute("target") || "",
    rel: element.getAttribute("rel") || "",
    tabIndex: element.tabIndex,
    text: element.textContent?.trim().replace(/\s+/g, " ") || "",
    accessibleName: element.getAttribute("aria-label") || element.textContent?.trim().replace(/\s+/g, " ") || "",
    className: element.getAttribute("class") || "",
  }));
}

async function targetSnapshot(page, runKey, name, locator) {
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const semantic = await semanticSignature(locator);
  const defaultStyles = await computedStyles(locator);
  const defaultScreenshot = await capture(page, runKey, `${name}-default`, locator);
  if (!semantic.disabled) {
    await locator.hover();
    await page.waitForTimeout(250);
  }
  const hoverStyles = await computedStyles(locator);
  const hoverScreenshot = await capture(page, runKey, `${name}-hover`, locator);
  if (!semantic.disabled) await locator.focus();
  await page.waitForTimeout(250);
  const focusStyles = await computedStyles(locator);
  const focusScreenshot = await capture(page, runKey, `${name}-focus`, locator);
  return { semantic, defaultStyles, hoverStyles, focusStyles, screenshots: {
    default: defaultScreenshot,
    hover: hoverScreenshot,
    focus: focusScreenshot,
  } };
}

async function focusableSignature(page) {
  return page.evaluate(() => {
    const selector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";
    return [...document.querySelectorAll(selector)].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    }).map((element) => ({
      tag: element.tagName.toLowerCase(),
      type: element.getAttribute("type") || "",
      name: element.getAttribute("aria-label") || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "",
      tabIndex: element.tabIndex,
    }));
  });
}

async function dashboardScenario(page, runKey) {
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await page.getByText("Dashboard live", { exact: true }).waitFor({ state: "visible", timeout: 20_000 });
  await page.getByText("API stable", { exact: true }).waitFor({ state: "visible", timeout: 20_000 });
  const external = page.getByRole("link", { name: "Documentation", exact: true });
  const internal = page.getByRole("link", { name: "Docs JSON dashboard", exact: true });
  const textIcon = page.locator("#dashboard-content").getByRole("link", { name: "Admin Pokémon", exact: true });
  const targets = {
    external: await targetSnapshot(page, runKey, "external", external),
    internal: await targetSnapshot(page, runKey, "internal", internal),
    textIcon: await targetSnapshot(page, runKey, "text-icon", textIcon),
  };
  const stablePageScreenshot = await capture(page, runKey, "page");
  const popupPromise = page.waitForEvent("popup");
  await external.click();
  const popup = await popupPromise;
  await popup.waitForLoadState("domcontentloaded");
  const externalOpened = popup.url().includes("pokemon-go-api.vercel.app/api-docs");
  await popup.close();
  await internal.focus();
  await page.keyboard.press("Enter");
  await page.waitForURL((url) => url.pathname === "/pokemon-docs");
  const internalOpened = new URL(page.url()).pathname === "/pokemon-docs";
  await page.goBack({ waitUntil: "domcontentloaded" });
  return { targets, interactions: { externalOpened, internalOpened }, stablePageScreenshot };
}

async function kanbanScenario(page, runKey) {
  await page.goto(`${baseUrl}/kanban`, { waitUntil: "domcontentloaded" });
  await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible", timeout: 20_000 });
  const target = page.getByRole("button", { name: "Modifier la carte" }).first();
  const targets = { iconOnly: await targetSnapshot(page, runKey, "icon-only", target) };
  await target.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const openedWithEnter = await dialog.isVisible();
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await target.focus();
  await page.keyboard.press("Space");
  await dialog.waitFor({ state: "visible" });
  const openedWithSpace = await dialog.isVisible();
  const modalScreenshot = await capture(page, runKey, "kanban-modal");
  await page.keyboard.press("Escape");
  return { targets, interactions: { openedWithEnter, openedWithSpace }, modalScreenshot };
}

async function calendarScenario(page, runKey) {
  await page.goto(`${baseUrl}/calendar`, { waitUntil: "domcontentloaded" });
  await page.getByText("Events Pokémon GO", { exact: true }).waitFor({ state: "visible", timeout: 20_000 });
  const target = page
    .locator("button.w-full.rounded-lg.border.p-3.text-left.transition")
    .filter({ hasText: "Review Dashboard" })
    .first();
  await target.waitFor({ state: "visible", timeout: 20_000 });
  const targets = { event: await targetSnapshot(page, runKey, "event", target) };
  await target.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const opened = await dialog.isVisible();
  await page.keyboard.press("Escape");
  return { targets, interactions: { opened } };
}

async function pokemonScenario(page, runKey) {
  await page.goto(`${baseUrl}/pokemon-admin?section=assets`, { waitUntil: "domcontentloaded" });
  const target = page.getByRole("button", { name: /Afficher plus · 1 restant/ });
  await target.waitFor({ state: "visible", timeout: 20_000 });
  const targets = { loadMore: await targetSnapshot(page, runKey, "load-more", target) };
  await target.focus();
  await page.keyboard.press("Enter");
  await target.waitFor({ state: "detached" });
  return { targets, interactions: { incrementedOnce: true } };
}

async function projectsScenario(page, runKey) {
  await page.goto(`${baseUrl}/projects`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Projets", exact: true }).waitFor({ state: "visible", timeout: 20_000 });
  const target = page.locator("button:disabled").filter({ hasText: "Repo" }).first();
  await target.waitFor({ state: "visible", timeout: 20_000 });
  const targets = { disabled: await targetSnapshot(page, runKey, "disabled", target) };
  const beforeUrl = page.url();
  await target.click({ force: true });
  return { targets, interactions: { inert: page.url() === beforeUrl } };
}

const scenarios = [
  { name: "dashboard", run: dashboardScenario },
  { name: "kanban", run: kanbanScenario },
  { name: "calendar", run: calendarScenario },
  { name: "pokemon-assets", run: pokemonScenario },
  { name: "projects-disabled", run: projectsScenario },
].filter((scenario) => !process.env.DESIGN_SYSTEM_SCENARIO || scenario.name === process.env.DESIGN_SYSTEM_SCENARIO);

async function createSessionCookies(browser, credentials) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await installRoutes(page);
  await authenticate(page, credentials);
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function runCombination(browser, cookies, theme, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: theme,
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    for (const key of ["matweb.calendar", "matweb.kanban", "matweb.projects"]) localStorage.removeItem(key);
  }, theme);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await installRoutes(page);
  const results = [];
  for (const scenario of scenarios) {
    const runKey = `${theme}/${viewport.name}/${scenario.name}`;
    const consoleStart = consoleErrors.length;
    const pageErrorStart = pageErrors.length;
    const result = await scenario.run(page, runKey);
    await page.evaluate(() => document.fonts.ready);
    const pageScreenshot = result.stablePageScreenshot || await capture(page, runKey, "page");
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    results.push({
      key: runKey,
      theme,
      viewport,
      scenario: scenario.name,
      overflow,
      focusables: await focusableSignature(page),
      pageScreenshot,
      consoleErrors: consoleErrors.slice(consoleStart),
      pageErrors: pageErrors.slice(pageErrorStart),
      ...result,
      stablePageScreenshot: undefined,
    });
  }
  await context.close();
  return results;
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

function criticalTarget(target) {
  const { className, ...semantic } = target.semantic;
  return {
    semantic,
    defaultStyles: target.defaultStyles,
    hoverStyles: target.hoverStyles,
    focusStyles: target.focusStyles,
  };
}

async function compareRuns(baseline, current) {
  const differences = [];
  const classChanges = [];
  const pageDifferences = [];
  const targetPixelDifferences = [];
  const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
  for (const after of current.runs) {
    const before = beforeByKey.get(after.key);
    if (!before) { differences.push(`${after.key}: baseline absente`); continue; }
    if (before.overflow !== after.overflow || after.overflow !== 0) differences.push(`${after.key}: overflow ${before.overflow} -> ${after.overflow}`);
    if (JSON.stringify(before.focusables) !== JSON.stringify(after.focusables)) differences.push(`${after.key}: ordre de tabulation différent`);
    if (JSON.stringify(before.interactions) !== JSON.stringify(after.interactions)) differences.push(`${after.key}: interaction différente`);
    if (before.pageScreenshot.sha256 !== after.pageScreenshot.sha256) {
      pageDifferences.push({ key: after.key, ...await pixelDifference(before.pageScreenshot.file, after.pageScreenshot.file) });
    }
    for (const [name, afterTarget] of Object.entries(after.targets)) {
      const beforeTarget = before.targets[name];
      if (!beforeTarget) { differences.push(`${after.key}/${name}: cible baseline absente`); continue; }
      if (beforeTarget.semantic.className !== afterTarget.semantic.className) {
        classChanges.push({ key: `${after.key}/${name}`, before: beforeTarget.semantic.className, after: afterTarget.semantic.className });
      }
      if (JSON.stringify(criticalTarget(beforeTarget)) !== JSON.stringify(criticalTarget(afterTarget))) {
        differences.push(`${after.key}/${name}: DOM ou styles cibles différents`);
      }
      for (const state of ["default", "hover", "focus"]) {
        if (beforeTarget.screenshots[state].sha256 === afterTarget.screenshots[state].sha256) continue;
        const pixels = await pixelDifference(beforeTarget.screenshots[state].file, afterTarget.screenshots[state].file);
        targetPixelDifferences.push({ key: `${after.key}/${name}/${state}`, ...pixels });
        if (pixels.changedPixels > 0) differences.push(`${after.key}/${name}/${state}: ${pixels.changedPixels} pixels cibles différents`);
      }
    }
    for (const error of after.consoleErrors.filter((item) => !before.consoleErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur console: ${error}`);
    for (const error of after.pageErrors.filter((item) => !before.pageErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur React: ${error}`);
  }
  return { differences, classChanges, pageDifferences, targetPixelDifferences };
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const credentials = readEnvironment();
  const runs = [];
  try {
    const cookies = await createSessionCookies(browser, credentials);
    for (const theme of themes) {
      for (const viewport of viewports) runs.push(...await runCombination(browser, cookies, theme, viewport));
    }
    for (const run of runs) {
      assert.equal(run.overflow, 0, `${run.key}: overflow horizontal`);
      assert.equal(run.pageErrors.length, 0, `${run.key}: erreur React/page`);
      assert.equal(run.consoleErrors.length, 0, `${run.key}: erreur console`);
      assert.ok(Object.values(run.interactions).every(Boolean), `${run.key}: interaction incomplète`);
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Button Family : ${runs.length} scénarios`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const comparison = await compareRuns(baseline, result);
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ ...comparison, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(comparison.differences, []);
    console.log(`Vérification Button Family : ${runs.length} scénarios, 0 différence critique`);
  } finally {
    await browser.close();
  }
}

await main();
