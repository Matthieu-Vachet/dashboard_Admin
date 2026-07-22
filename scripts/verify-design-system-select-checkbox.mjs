import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-select-checkbox");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.SELECT_CHECKBOX_BASE_URL || "http://localhost:3028";
const learningFixture = path.join(root, "src/data/learning/javascript.json");

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "width", "height", "minWidth", "minHeight", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "fontSize", "fontWeight", "color", "backgroundColor", "borderTopWidth", "borderRightWidth", "borderBottomWidth",
  "borderLeftWidth", "borderColor", "borderRadius", "boxShadow", "outlineStyle", "outlineWidth", "outlineColor",
  "opacity", "accentColor", "transitionDuration",
];
const layoutProperties = [
  "display", "width", "height", "minWidth", "minHeight", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "fontSize", "fontWeight", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius",
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
  await page.route("**/api/dashboard-backlog**", (route) => fulfillJson(route, { data: { configured: false, tickets: [] } }));
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
  await page.route("**/api/trainer-pokemon?**", (route) => fulfillJson(route, { success: true, data: {
    items: [], snapshot: null,
    stats: { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 },
    filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } },
    pagination: { page: 1, limit: 50, total: 0, pages: 0 },
  } }));
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
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference", storageState: { cookies, origins: [] },
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
    for (const key of ["matweb.calendar", "matweb.kanban", "matweb.projects", "matweb.tools.widgets"]) localStorage.removeItem(key);
    localStorage.setItem("pokedex-v4-admin-collections", JSON.stringify([]));
  }, { selectedTheme: theme, fixedTime: "2026-07-22T08:00:00.000Z" });
  return context;
}

async function goto(page, pathname, ready) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((theme) => document.documentElement.classList.contains(theme), await page.evaluate(() => localStorage.getItem("matweb-theme")));
  if (ready) await page.getByText(ready, { exact: true }).filter({ visible: true }).first().waitFor({ state: "visible", timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

async function computedStyles(locator) {
  return locator.evaluate((element, properties) => {
    const styles = getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function semantic(locator) {
  const aria = await locator.ariaSnapshot();
  return locator.evaluate((element, snapshot) => ({
    tag: element.tagName.toLowerCase(), type: element.getAttribute("type") || "", value: element.value || "",
    checked: Boolean(element.checked), disabled: Boolean(element.disabled), required: Boolean(element.required),
    optionValues: element instanceof HTMLSelectElement ? [...element.options].map((option) => option.value) : [],
    labelText: "labels" in element ? [...element.labels || []].map((label) => label.textContent?.replace(/\s+/g, " ").trim()).join(" | ") : "",
    ariaLabel: element.getAttribute("aria-label") || "", ariaLabelledby: element.getAttribute("aria-labelledby") || "",
    ariaSnapshot: snapshot,
  }), aria);
}

async function captureControl(locator, key, name, kind) {
  await locator.waitFor({ state: "visible", timeout: 30_000 });
  await locator.scrollIntoViewIfNeeded();
  const file = path.join(stageDirectory, `${key.replaceAll("/", "-")}-${name}.png`);
  await locator.screenshot({ path: file, animations: "disabled" });
  return {
    kind, semantic: await semantic(locator), styles: await computedStyles(locator), box: await locator.boundingBox(),
    screenshot: path.relative(root, file),
  };
}

async function verifySelect(locator) {
  const initial = await locator.inputValue();
  const values = await locator.locator("option").evaluateAll((options) => options.map((option) => option.value));
  await locator.focus();
  assert.equal(await locator.evaluate((element) => document.activeElement === element), true);
  if (values.length > 1) {
    const targetValue = values.find((value) => value !== initial);
    await locator.selectOption(targetValue);
    assert.equal(await locator.inputValue(), targetValue);
    await locator.selectOption(initial);
  }
  await locator.evaluate((element) => { element.disabled = true; document.body.focus(); element.focus(); });
  assert.equal(await locator.evaluate((element) => document.activeElement === element), false);
  await locator.evaluate((element) => { element.disabled = false; });
  if (values.includes("")) {
    await locator.selectOption("");
    await locator.evaluate((element) => { element.required = true; });
    assert.equal(await locator.evaluate((element) => element.matches(":invalid")), true);
    await locator.evaluate((element) => { element.required = false; });
    await locator.selectOption(initial);
  }
}

async function verifyCheckbox(locator, verifyLabel = false) {
  const initial = await locator.isChecked();
  await locator.focus();
  assert.equal(await locator.evaluate((element) => document.activeElement === element), true);
  await locator.press("Space");
  assert.equal(await locator.isChecked(), !initial);
  await locator.press("Space");
  assert.equal(await locator.isChecked(), initial);
  if (verifyLabel && await locator.evaluate((element) => Boolean(element.labels?.length))) {
    await locator.evaluate((element) => element.labels[0].click());
    assert.equal(await locator.isChecked(), !initial);
    await locator.evaluate((element) => element.labels[0].click());
    assert.equal(await locator.isChecked(), initial);
  }
  await locator.evaluate((element) => { element.disabled = true; document.body.focus(); element.focus(); });
  assert.equal(await locator.evaluate((element) => document.activeElement === element), false);
  await locator.evaluate((element) => { element.disabled = false; });
}

async function setupScenario(page, scenario) {
  await goto(page, scenario.path, scenario.ready);
  if (scenario.name === "projects") {
    await page.locator("section button.relative.z-10.block.w-full").first().click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
  }
  if (scenario.name === "kanban") {
    await page.getByRole("button", { name: "Modifier la carte" }).first().click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
  }
  if (scenario.name === "rules") {
    await page.getByRole("button", { name: "Clé simple + type", exact: true }).click();
    await page.locator("select").first().waitFor({ state: "visible" });
  }
  if (scenario.name === "learning") {
    await page.getByRole("button", { name: "Importer un JSON", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Importer un JSON pédagogique" });
    await dialog.locator('input[type="file"]').setInputFiles(learningFixture);
    await dialog.locator('input[type="radio"]').first().waitFor({ state: "attached" });
  }
  if (scenario.name === "palette") {
    await page.locator(".dashboard-palette-trigger").click();
    await page.locator(".dashboard-palette-menu").waitFor({ state: "visible" });
  }
}

const scenarios = [
  { name: "dashboard", path: "/", ready: "Dashboard live", controls: [] },
  { name: "tools", path: "/tools", ready: "Outils quotidiens", controls: [{ name: "billing", kind: "select", locate: (page) => page.locator("select").first() }] },
  { name: "projects", path: "/projects", ready: "Projets pratiques guidés", controls: [{ name: "status", kind: "select", locate: (page) => page.getByRole("dialog").locator("select").first() }] },
  { name: "kanban", path: "/kanban", ready: "Sauvegarde active", controls: [
    { name: "status", kind: "select", locate: (page) => page.getByRole("dialog").locator("select").first() },
    { name: "checklist", kind: "checkbox", locate: (page) => page.getByRole("dialog").locator('input[type="checkbox"]').first() },
  ] },
  { name: "calendar", path: "/calendar", ready: "Events Pokémon GO", controls: [
    { name: "status-filter", kind: "select", locate: (page) => page.locator("select").nth(0) },
    { name: "category-filter", kind: "select", locate: (page) => page.locator("select").nth(1) },
  ] },
  { name: "backlog", path: "/tools/dashboard-backlog", ready: "Dashboard Backlog", controls: [{ name: "filter", kind: "select", locate: (page) => page.locator("select").first() }] },
  { name: "events", path: "/pokemon-admin?section=events", ready: "Calendrier Events", controls: [
    { name: "type-filter", kind: "select", locate: (page) => page.locator("select").nth(0) },
    { name: "status-filter", kind: "select", locate: (page) => page.locator("select").nth(1) },
  ] },
  { name: "rules", path: "/pokemon-admin?section=rules", ready: "Règles JSON personnalisées", controls: [
    { name: "rule-type", kind: "select", locate: (page) => page.locator("select").first() },
    { name: "rule-enabled", kind: "checkbox", labelClick: true, locate: (page) => page.locator('input[type="checkbox"]').first() },
  ] },
  { name: "my-collection", path: "/pokemon-admin?section=my-collection", ready: "Ma collection Pokémon GO", controls: [
    { name: "sort", kind: "select", locate: (page) => page.locator("select").first() },
    { name: "perfect", kind: "checkbox", labelClick: true, locate: (page) => page.locator('input[type="checkbox"]').first() },
  ] },
  { name: "learning", path: "/js-progress", ready: "JS Progress V2", controls: [{ name: "strategy-radio", kind: "radio", locate: (page) => page.getByRole("dialog").locator('input[type="radio"]').first() }] },
  { name: "palette", path: "/palette", ready: "Labo couleur", controls: [{ name: "custom-palette", kind: "specialized", locate: (page) => page.locator(".dashboard-palette-menu") }] },
];

async function runScenario(browser, cookies, theme, viewport, scenario) {
  const context = await createContext(browser, cookies, theme, viewport);
  const page = await context.newPage();
  await installRoutes(page);
  const consoleErrors = []; const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const key = `${theme}/${viewport.name}/${scenario.name}`;
  try {
    await setupScenario(page, scenario);
    const controls = {};
    for (const definition of scenario.controls) {
      const locator = definition.locate(page);
      controls[definition.name] = await captureControl(locator, key, definition.name, definition.kind);
      if (definition.kind === "select") await verifySelect(locator);
      if (definition.kind === "checkbox") await verifyCheckbox(locator, definition.labelClick);
      if (!updateBaseline && ["select", "checkbox"].includes(definition.kind)) {
        const details = await semantic(locator);
        assert.match(`${details.ariaLabel} ${details.ariaLabelledby} ${details.labelText} ${details.ariaSnapshot}`, /\S/);
      }
    }
    if (scenario.name === "learning") assert.equal(await page.locator('input[type="checkbox"]').count(), 0);
    if (scenario.name === "palette") assert.equal(await page.locator(".dashboard-palette-menu select").count(), 0);
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    assert.equal(overflow, 0, `${key}: overflow horizontal`);
    assert.deepEqual(pageErrors, [], `${key}: erreurs React/page`);
    assert.deepEqual(consoleErrors, [], `${key}: erreurs console`);
    await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); window.scrollTo(0, 0); });
    const pageFile = path.join(stageDirectory, `${key.replaceAll("/", "-")}-page.png`);
    await page.screenshot({ path: pageFile, animations: "disabled" });
    return { key, theme, viewport: viewport.name, scenario: scenario.name, overflow, consoleErrors, pageErrors, controls, pageScreenshot: path.relative(root, pageFile) };
  } finally { await context.close(); }
}

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

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const cookies = await createCookies(browser); const runs = [];
    for (const theme of themes) for (const viewport of viewports) for (const scenario of scenarios) {
      console.log(`Select + Checkbox ${stage}: ${theme}/${viewport.name}/${scenario.name}`);
      runs.push(await runScenario(browser, cookies, theme, viewport, scenario));
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Select + Checkbox : ${runs.length} scénarios`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline Select + Checkbox absente");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
    const differences = []; const visualChanges = [];
    for (const run of runs) {
      const before = beforeByKey.get(run.key);
      if (!before) { differences.push(`${run.key}: baseline absente`); continue; }
      for (const [name, control] of Object.entries(run.controls)) {
        const previous = before.controls[name];
        if (!previous) { differences.push(`${run.key}/${name}: cible baseline absente`); continue; }
        for (const property of ["tag", "type", "value", "checked", "disabled", "required", "optionValues"]) {
          if (JSON.stringify(previous.semantic[property]) !== JSON.stringify(control.semantic[property])) differences.push(`${run.key}/${name}: ${property} différent`);
        }
        if (control.kind !== "checkbox") {
          const previousLayout = Object.fromEntries(layoutProperties.map((property) => [property, previous.styles[property]]));
          const currentLayout = Object.fromEntries(layoutProperties.map((property) => [property, control.styles[property]]));
          if (JSON.stringify(previousLayout) !== JSON.stringify(currentLayout)) differences.push(`${run.key}/${name}: layout calculé différent`);
        }
        if (control.kind === "checkbox" && (previous.box?.width !== control.box?.width || previous.box?.height !== control.box?.height)) {
          visualChanges.push({ key: `${run.key}/${name}`, scope: "control", beforeBox: previous.box, afterBox: control.box });
        } else {
          const pixels = await pixelDifference(previous.screenshot, control.screenshot);
          if (pixels) visualChanges.push({ key: `${run.key}/${name}`, scope: "control", pixels });
        }
      }
      const pixels = await pixelDifference(before.pageScreenshot, run.pageScreenshot);
      const viewport = viewports.find((item) => item.name === run.viewport);
      const ratio = pixels / (viewport.width * viewport.height);
      if (ratio > 0.035) differences.push(`${run.key}: ratio pixels ${ratio.toFixed(4)} > 0.035`);
      if (pixels) visualChanges.push({ key: run.key, scope: "page", pixels, ratio });
    }
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ differences, visualChanges, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(differences, []);
    console.log(`Vérification Select + Checkbox : ${runs.length} scénarios, natif/clavier/focus/thèmes validés`);
  } finally { await browser.close(); }
}

await main();
