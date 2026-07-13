import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(repositoryRoot, "test-results/design-system-badge-family");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.DESIGN_SYSTEM_BASE_URL || "http://localhost:3021";
const transparentPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAFAgI/6tW4GQAAAABJRU5ErkJggg==", "base64");
const fixtureImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' rx='48' fill='%2322d3ee'/%3E%3Ccircle cx='48' cy='48' r='22' fill='%230f172a'/%3E%3C/svg%3E";

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const themes = ["dark", "light"];
const styleProperties = [
  "display", "minHeight", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom",
  "borderRadius", "borderWidth", "borderColor", "backgroundColor", "color", "fontSize",
  "fontWeight", "lineHeight", "alignItems",
];

const scenarios = [
  { name: "dashboard", path: "/", heading: "MatWeb Innovation", kind: "dashboard" },
  { name: "kanban", path: "/kanban", heading: "Kanban projet", kind: "kanban" },
  { name: "projects-status-cards", path: "/projects", heading: "Projets", kind: "projects" },
  { name: "js-progress", path: "/js-progress", heading: "JS Progress V2", kind: "generic" },
  { name: "pokemon-raids", path: "/pokemon-admin?section=raids", heading: "Raids", kind: "pokemon", openText: "5 étoiles", targetText: "Raid Forme très longue de vérification" },
  { name: "pokemon-eggs", path: "/pokemon-admin?section=eggs", heading: "Œufs", kind: "pokemon", openText: "2 km", targetText: "Egg Forme très longue de vérification" },
  { name: "pokemon-max", path: "/pokemon-admin?section=max-battles", heading: "Max Battles", kind: "pokemon", openText: "Tier 1", targetText: "Max Forme très longue de vérification" },
  { name: "pokemon-research", path: "/pokemon-admin?section=research", heading: "Research", kind: "research", openText: "Field Research", targetText: "Field Research baseline" },
];

function readEnvironment() {
  const file = path.join(repositoryRoot, ".env.local");
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

function screenshotPath(theme, viewport, scenario, suffix = "page") {
  return path.join(stageDirectory, `${theme}-${viewport.name}-${scenario}-${suffix}.png`);
}

async function capture(page, theme, viewport, scenario, suffix = "page", locator = null) {
  const file = screenshotPath(theme, viewport, scenario, suffix);
  const buffer = locator
    ? await locator.screenshot({ path: file, animations: "disabled" })
    : await page.screenshot({ path: file, fullPage: false, animations: "disabled" });
  return { file: path.relative(repositoryRoot, file), sha256: hash(buffer) };
}

function pokemonFixture(kind) {
  const shared = {
    id: `fixture-${kind}`,
    names: { French: `Pokémon fixture ${kind}`, English: `Fixture ${kind}` },
    sourceName: `Fixture ${kind}`,
    costume: "Costume baseline",
    types: [],
    assets: { image: fixtureImage, sourceImage: "fixture-source" },
    cpRange: [1234, 1288],
    unmatched: false,
    shiny: false,
  };
  if (kind === "raids") {
    return { data: { currentList: { lvl5: [{ ...shared, form: "Raid Forme très longue de vérification", raidType: "Legendary" }] } }, meta: { buckets: { lvl5: 1 } }, current: { key: "current", updatedAt: "2026-07-13T08:00:00.000Z" } };
  }
  if (kind === "eggs") {
    return { data: { currentEggsList: { "2km": [{ ...shared, form: "Egg Forme très longue de vérification", rarity: 1, cp: "1234 - 1288" }] } }, meta: { buckets: { "2km": 1 } }, current: { key: "current", updatedAt: "2026-07-13T08:00:00.000Z" } };
  }
  if (kind === "max-battles") {
    return { data: { currentMaxBattle: { "Tier 1": [{ ...shared, form: "Max Forme très longue de vérification", maxForm: "Dynamax", tier: "Tier 1" }] } }, meta: { buckets: { "Tier 1": 1 } }, current: { key: "current", updatedAt: "2026-07-13T08:00:00.000Z" } };
  }
  return {
    data: {
      currentResearchList: {
        fieldResearch: [{
          task: "Effectuer une vérification visuelle du Design System",
          category: "Field Research baseline",
          categoryTitle: "Field Research baseline",
          event: { name: "Événement baseline", endsAt: "2026-07-14T08:00:00.000Z" },
          rewards: [
            { rewardType: "pokemon", reward: { ...shared, form: "Research" } },
            { rewardType: "item", reward: { id: "fixture-item", name: "Item fixture", quantity: 2 } },
          ],
        }],
      },
    },
    meta: { buckets: { fieldResearch: 1 } },
    current: { key: "current", updatedAt: "2026-07-13T08:00:00.000Z" },
  };
}

async function fulfillJson(route, body) {
  await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page) {
  await page.route("**/api/pokemon-stats", (route) => fulfillJson(route, {
    source: "live", status: "fixture", detail: "Baseline Design System", total: 1602, complete: 1602,
    issues: 0, quality: 100, catalog: { types: 18, weather: 7, stickers: 1667, moves: 467 },
    generations: Array.from({ length: 9 }, (_, index) => ({ name: `G${index + 1}`, completion: 100, entries: 100 })),
    kinds: [{ name: "pokemon", value: 1602 }],
  }));
  await page.route("**/api/pokemon-api-health", (route) => fulfillJson(route, { data: {
    connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600,
    timestamp: "2026-07-13T08:00:00.000Z", label: "API stable", docsUrl: "https://example.test/docs", swaggerUrl: "https://example.test/swagger",
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
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (action === "history" || action === "custom-rules" || action === "source-history") return fulfillJson(route, { data: [] });
    if (action === "assets") return fulfillJson(route, { data: {} });
    if (action === "source-watch") return fulfillJson(route, { data: { sources: [], history: [] } });
    if (action === "items") return fulfillJson(route, { data: { data: { items: [] } } });
    if (["raids", "eggs", "max-battles", "research"].includes(action)) return fulfillJson(route, { data: pokemonFixture(action) });
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
  await page.route("https://raw.githubusercontent.com/**", (route) => route.fulfill({ status: 200, contentType: "image/png", body: transparentPng }));
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

async function computedStyle(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function waitForStableScenario(page, scenario) {
  if (scenario.kind === "dashboard") {
    await page.getByText("Dashboard live", { exact: true }).waitFor({ state: "visible", timeout: 15_000 });
    await page.getByText("API stable", { exact: true }).waitFor({ state: "visible", timeout: 15_000 });
  }
  if (scenario.kind === "kanban") await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible", timeout: 15_000 });
  if (scenario.kind === "projects") await page.getByText(/^\d+ actifs$/).first().waitFor({ state: "visible", timeout: 15_000 });
  if (scenario.name === "js-progress") await page.getByText(/MongoDB synchronisé|Mode local sécurisé/).first().waitFor({ state: "visible", timeout: 15_000 });
}

async function openScenarioState(page, scenario, theme, viewport) {
  const screenshots = {};
  const checks = { headingVisible: true, modal: null, selectedCard: null, hover: null, targetVisible: null };
  let target = null;

  if (scenario.kind === "kanban") {
    const card = page.locator('[data-task-id="k1"]');
    await card.waitFor({ state: "visible" });
    await card.locator("button.block.w-full").click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    checks.modal = true;
    checks.selectedCard = (await card.getAttribute("class"))?.includes("border-brand-2/55") || false;
    screenshots.modal = await capture(page, theme, viewport, scenario.name, "modal");
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
  }

  if (scenario.kind === "projects") {
    const control = page.locator("button.rounded-full").first();
    if (await control.count()) {
      await control.hover();
      checks.hover = true;
      screenshots.hover = await capture(page, theme, viewport, scenario.name, "hover");
    } else checks.hover = false;
  }

  if (scenario.kind === "pokemon") {
    const opener = page.getByRole("button", { name: new RegExp(scenario.openText, "i") }).first();
    await opener.waitFor({ state: "visible", timeout: 15_000 });
    await opener.click();
    target = page.getByText(scenario.targetText, { exact: true }).first();
    await target.waitFor({ state: "visible", timeout: 15_000 });
  }

  if (scenario.kind === "research") {
    const summary = page.locator("summary").filter({ hasText: scenario.openText }).first();
    await summary.waitFor({ state: "visible", timeout: 15_000 });
    await summary.click();
    target = page.getByText(scenario.targetText, { exact: true }).first();
    await target.waitFor({ state: "visible", timeout: 15_000 });
  }

  let targetData = null;
  if (target) {
    await target.scrollIntoViewIfNeeded();
    checks.targetVisible = await target.isVisible();
    targetData = {
      tag: await target.evaluate((element) => element.tagName.toLowerCase()),
      text: (await target.textContent())?.trim(),
      className: await target.getAttribute("class"),
      styles: await computedStyle(target),
      screenshot: await capture(page, theme, viewport, scenario.name, "target", target),
    };
  }

  return { screenshots, checks, target: targetData };
}

async function runViewport(browser, credentials, theme, viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    localStorage.removeItem("matweb.kanban");
    localStorage.removeItem("matweb.projects");
    localStorage.removeItem("matweb.jsProgress");
  }, theme);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await installRoutes(page);
  await authenticate(page, credentials);

  const results = [];
  for (const scenario of scenarios) {
    const consoleStart = consoleErrors.length;
    const pageErrorStart = pageErrors.length;
    await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded" });
    const heading = page.getByRole("heading", { name: scenario.heading, exact: true }).first();
    await heading.waitFor({ state: "visible", timeout: 20_000 });
    await waitForStableScenario(page, scenario);
    await page.waitForFunction((selectedTheme) => document.documentElement.classList.contains(selectedTheme), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;caret-color:transparent!important}" });
    await page.waitForTimeout(750);
    const state = await openScenarioState(page, scenario, theme, viewport);
    const screenshot = await capture(page, theme, viewport, scenario.name);
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth));
    results.push({
      key: `${theme}/${viewport.name}/${scenario.name}`,
      theme,
      viewport,
      scenario: scenario.name,
      overflow,
      focusables: await focusableSignature(page),
      screenshot,
      ...state,
      consoleErrors: consoleErrors.slice(consoleStart),
      pageErrors: pageErrors.slice(pageErrorStart),
    });
  }
  await context.close();
  return results;
}

async function verifyReducedMotion(browser, credentials) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "dark", reducedMotion: "reduce" });
  await context.addInitScript(() => localStorage.setItem("matweb-theme", "dark"));
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await installRoutes(page);
  await authenticate(page, credentials);
  await page.goto(`${baseUrl}/kanban`, { waitUntil: "domcontentloaded" });
  await page.getByText("Kanban projet", { exact: true }).waitFor({ state: "visible" });
  await page.locator('[data-task-id="k1"]').waitFor({ state: "visible", timeout: 15_000 });
  const result = {
    mediaMatches: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
    cardVisible: await page.locator('[data-task-id="k1"]').isVisible(),
    consoleErrors,
    pageErrors,
  };
  await context.close();
  return result;
}

function artifactHashes(artifacts) {
  return Object.fromEntries(Object.entries(artifacts).map(([key, value]) => [key, value.sha256]));
}

function targetSignature(target) {
  if (!target) return null;
  return { tag: target.tag, text: target.text, className: target.className, styles: target.styles, screenshot: target.screenshot.sha256 };
}

async function pixelDifference(beforeFile, afterFile) {
  const before = await sharp(path.join(repositoryRoot, beforeFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(path.join(repositoryRoot, afterFile)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(before.info.width, after.info.width);
  assert.equal(before.info.height, after.info.height);
  let changed = 0;
  for (let index = 0; index < before.data.length; index += 4) {
    const delta = Math.max(...[0, 1, 2].map((channel) => Math.abs(before.data[index + channel] - after.data[index + channel])));
    if (delta > 8) changed += 1;
  }
  return { changedPixels: changed, percent: changed / (before.info.width * before.info.height) * 100 };
}

async function compareRuns(baseline, current) {
  const differences = [];
  const toleratedPageDifferences = [];
  const stateScreenshotDifferences = [];
  const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
  for (const after of current.runs) {
    const before = beforeByKey.get(after.key);
    if (!before) { differences.push(`${after.key}: baseline absente`); continue; }
    if (after.overflow !== 0 || before.overflow !== after.overflow) differences.push(`${after.key}: overflow ${before.overflow} -> ${after.overflow}`);
    if (JSON.stringify(before.focusables) !== JSON.stringify(after.focusables)) differences.push(`${after.key}: tab order différent`);
    if (before.screenshot.sha256 !== after.screenshot.sha256) {
      const pixels = await pixelDifference(before.screenshot.file, after.screenshot.file);
      if (after.scenario.startsWith("pokemon-") && pixels.percent > 0.05) differences.push(`${after.key}: screenshot page Pokémon différent (${pixels.percent.toFixed(4)} %)`);
      else toleratedPageDifferences.push({ key: after.key, ...pixels, reason: after.scenario.startsWith("pokemon-") ? "variation sous le seuil" : "capture globale hors sources migrées" });
    }
    const beforeStates = artifactHashes(before.screenshots);
    const afterStates = artifactHashes(after.screenshots);
    for (const state of new Set([...Object.keys(beforeStates), ...Object.keys(afterStates)])) {
      if (beforeStates[state] !== afterStates[state]) {
        const pixels = await pixelDifference(before.screenshots[state].file, after.screenshots[state].file);
        stateScreenshotDifferences.push({ key: after.key, state, ...pixels, reason: "état interactif hors sources migrées" });
      }
    }
    if (JSON.stringify(before.checks) !== JSON.stringify(after.checks)) differences.push(`${after.key}: interaction différente`);
    if (JSON.stringify(targetSignature(before.target)) !== JSON.stringify(targetSignature(after.target))) differences.push(`${after.key}: DOM/style/capture cible différent`);
    for (const error of after.consoleErrors.filter((item) => !before.consoleErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur console: ${error}`);
    for (const error of after.pageErrors.filter((item) => !before.pageErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur React: ${error}`);
  }
  if (JSON.stringify(baseline.reducedMotion) !== JSON.stringify(current.reducedMotion)) differences.push("prefers-reduced-motion différent");
  return { differences, toleratedPageDifferences, stateScreenshotDifferences };
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const credentials = readEnvironment();
  const browser = await chromium.launch({ headless: true });
  const runs = [];
  try {
    for (const theme of themes) for (const viewport of viewports) runs.push(...await runViewport(browser, credentials, theme, viewport));
    const reducedMotion = await verifyReducedMotion(browser, credentials);
    const result = { stage, baseUrl, scenarios: scenarios.map(({ name, path }) => ({ name, path })), runs, reducedMotion };
    for (const run of runs) {
      assert.equal(run.overflow, 0, `${run.key}: overflow horizontal`);
      assert.equal(run.pageErrors.length, 0, `${run.key}: erreur React/page`);
      assert.equal(run.consoleErrors.length, 0, `${run.key}: erreur console`);
      assert.equal(run.checks.headingVisible, true, `${run.key}: heading absent`);
      if (run.scenario === "kanban") {
        assert.equal(run.checks.modal, true, `${run.key}: modale Kanban absente`);
        assert.equal(run.checks.selectedCard, true, `${run.key}: sélection Kanban absente`);
      }
      if (run.scenario === "projects-status-cards") assert.equal(run.checks.hover, true, `${run.key}: hover non testé`);
      if (run.scenario.startsWith("pokemon-")) {
        assert.ok(run.target, `${run.key}: badge métier cible absent`);
        assert.equal(run.target.tag, "span", `${run.key}: racine non span`);
        assert.equal(run.checks.targetVisible, true, `${run.key}: cible invisible`);
      }
    }
    assert.equal(reducedMotion.mediaMatches, true);
    assert.equal(reducedMotion.cardVisible, true);
    assert.equal(reducedMotion.consoleErrors.length, 0);
    assert.equal(reducedMotion.pageErrors.length, 0);

    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline écrite : ${path.relative(repositoryRoot, baselineFile)} (${runs.length} scénarios)`);
      return;
    }

    assert.ok(existsSync(baselineFile), "Baseline absente : lancer avec --update-baseline avant migration");
    const afterFile = path.join(artifactRoot, "after.json");
    const comparisonFile = path.join(artifactRoot, "comparison.json");
    writeFileSync(afterFile, `${JSON.stringify(result, null, 2)}\n`);
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const { differences, toleratedPageDifferences, stateScreenshotDifferences } = await compareRuns(baseline, result);
    writeFileSync(comparisonFile, `${JSON.stringify({ differences, toleratedPageDifferences, stateScreenshotDifferences, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(differences, []);
    console.log(`Vérification Badge Family : ${runs.length} scénarios, 0 différence`);
  } finally {
    await browser.close();
  }
}

await main();
