import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const artifactRoot = path.join(root, "test-results/design-system-field-family");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.DESIGN_SYSTEM_BASE_URL || "http://localhost:3023";

const themes = ["dark", "light"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const styleProperties = [
  "display", "visibility", "color", "fontSize", "fontWeight", "lineHeight",
  "width", "height", "minHeight", "marginTop", "marginRight", "marginBottom", "marginLeft",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "gap",
  "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
  "borderColor", "borderRadius", "backgroundColor", "boxShadow",
  "outlineStyle", "outlineWidth", "outlineColor", "outlineOffset",
  "opacity", "resize", "transitionDuration", "transitionProperty",
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

function imageName(key, suffix) {
  return `${key.replaceAll("/", "-")}-${suffix}.png`;
}

async function capture(page, key, suffix, locator = null) {
  const file = path.join(stageDirectory, imageName(key, suffix));
  const buffer = locator
    ? await locator.screenshot({ path: file, animations: "disabled" })
    : await page.screenshot({ path: file, fullPage: false, animations: "disabled" });
  return { file: path.relative(root, file), sha256: hash(buffer) };
}

async function fulfillJson(route, body) {
  await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
}

async function installRoutes(page) {
  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") return fulfillJson(route, { data: { configured: false, value: null } });
    return fulfillJson(route, { data: { configured: false, saved: false } });
  });
  await page.route("**/api/dashboard-backlog**", (route) => fulfillJson(route, {
    data: { configured: false, tickets: [] },
  }));
  await page.route("**/api/dashboard-redeploy**", (route) => fulfillJson(route, { data: { history: [] } }));
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
    if (action === "assets") return fulfillJson(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [] } });
    if (action === "catalog") return fulfillJson(route, { data: { types: [], weather: [] } });
    if (["history", "custom-rules", "source-history"].includes(action)) return fulfillJson(route, { data: [] });
    return fulfillJson(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {} } });
  });
  await page.route("**/api/trainer-pokemon?**", (route) => fulfillJson(route, { success: true, data: {
    items: [], snapshot: null,
    stats: { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 },
    filters: {
      genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 },
      ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 },
    },
    pagination: { page: 1, limit: 50, total: 0, pages: 0 },
  } }));
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

async function computedStyle(locator, pseudo = null) {
  return locator.evaluate((element, { properties, pseudoElement }) => {
    const styles = getComputedStyle(element, pseudoElement);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, { properties: styleProperties, pseudoElement: pseudo });
}

async function fieldSignature(locator) {
  return locator.evaluate((control) => {
    const associatedLabel = control.labels?.[0] || control.closest("label");
    const root = control.closest("label") || control.parentElement;
    const labelText = associatedLabel?.textContent?.trim().replace(/\s+/g, " ") || "";
    return {
      control: {
        tag: control.tagName.toLowerCase(), type: control.getAttribute("type") || "",
        id: control.id, name: control.getAttribute("name") || "", value: control.value,
        placeholder: control.getAttribute("placeholder") || "", required: control.required,
        disabled: control.disabled, readOnly: control.readOnly,
        ariaInvalid: control.getAttribute("aria-invalid") || "",
        ariaDescribedby: control.getAttribute("aria-describedby") || "",
        tabIndex: control.tabIndex, className: control.getAttribute("class") || "",
      },
      label: associatedLabel ? {
        tag: associatedLabel.tagName.toLowerCase(), text: labelText,
        htmlFor: associatedLabel.htmlFor || "", className: associatedLabel.getAttribute("class") || "",
      } : null,
      root: root ? { tag: root.tagName.toLowerCase(), className: root.getAttribute("class") || "" } : null,
    };
  });
}

async function styleBundle(locator) {
  const label = locator.locator("xpath=ancestor-or-self::label[1]");
  const associatedLabel = (await label.count()) ? label : locator.locator(`xpath=//label[@for=${JSON.stringify(await locator.getAttribute("id") || "__missing__")}]`).first();
  const root = (await label.count()) ? label : locator.locator("xpath=..");
  return {
    root: await computedStyle(root),
    label: (await associatedLabel.count()) ? await computedStyle(associatedLabel) : null,
    control: await computedStyle(locator),
    placeholder: await computedStyle(locator, "::placeholder"),
  };
}

async function targetSnapshot(page, key, name, locator, options = {}) {
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  const signature = await fieldSignature(locator);
  const defaultStyles = await styleBundle(locator);
  const defaultScreenshot = await capture(page, key, `${name}-default`, locator);
  let focusStyles = defaultStyles;
  let focusScreenshot = defaultScreenshot;
  if (!signature.control.disabled) {
    await locator.focus();
    await page.waitForTimeout(100);
    assert.equal(await locator.evaluate((element) => document.activeElement === element), true, `${key}/${name}: focus`);
    focusStyles = await styleBundle(locator);
    focusScreenshot = await capture(page, key, `${name}-focus`, locator);
  }
  let filledStyles = defaultStyles;
  let filledScreenshot = defaultScreenshot;
  if (options.exercise && !signature.control.disabled && !signature.control.readOnly && ["input", "textarea"].includes(signature.control.tag)) {
    const type = signature.control.type || (signature.control.tag === "textarea" ? "textarea" : "text");
    if (["text", "email", "password", "search", "textarea"].includes(type)) {
      const original = await locator.inputValue();
      const candidate = options.long
        ? "Contenu long de caractérisation. ".repeat(18).trim()
        : `${original || "Champ"} · caractérisation`;
      await locator.fill(candidate);
      assert.equal(await locator.inputValue(), candidate, `${key}/${name}: saisie`);
      filledStyles = await styleBundle(locator);
      filledScreenshot = await capture(page, key, `${name}-filled`, locator);
      await locator.fill(original);
      assert.equal(await locator.inputValue(), original, `${key}/${name}: restauration`);
    }
  }
  if (!signature.control.disabled) await locator.evaluate((element) => element.blur());
  return {
    signature, defaultStyles, focusStyles, filledStyles,
    screenshots: { default: defaultScreenshot, focus: focusScreenshot, filled: filledScreenshot },
  };
}

async function keyboardRoundTrip(page, locator) {
  if (await locator.isDisabled()) return { disabledInert: true };
  await locator.focus();
  await page.keyboard.press("Tab");
  const moved = await locator.evaluate((element) => document.activeElement !== element);
  await page.keyboard.press("Shift+Tab");
  const returned = await locator.evaluate((element) => document.activeElement === element);
  await locator.evaluate((element) => element.blur());
  return { moved, returned };
}

function labelledControl(scope, label, selector) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return scope.locator("label").filter({ hasText: new RegExp(`^\\s*${escaped}`) }).locator(selector).first();
}

async function loginScenario(page, key) {
  await page.goto(`${baseUrl}/login?error=1&next=/projects`, { waitUntil: "domcontentloaded" });
  await page.getByText("Identifiants incorrects", { exact: false }).waitFor({ state: "visible" });
  const email = page.getByLabel("Email", { exact: true });
  const password = page.getByLabel("Mot de passe", { exact: true });
  const targets = {
    email: await targetSnapshot(page, key, "email", email, { exercise: true }),
    password: await targetSnapshot(page, key, "password", password, { exercise: true }),
  };
  assert.equal(await email.getAttribute("required"), "");
  assert.equal(await password.getAttribute("required"), "");
  return { targets, interactions: await keyboardRoundTrip(page, email) };
}

async function projectsScenario(page, key) {
  await page.goto(`${baseUrl}/projects`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Projets", exact: true }).waitFor({ state: "visible" });
  await page.locator("section button.relative.z-10.block.w-full").first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const title = labelledControl(dialog, "Nom", "input");
  const description = labelledControl(dialog, "Description", "textarea");
  return {
    targets: {
      title: await targetSnapshot(page, key, "title", title, { exercise: true }),
      description: await targetSnapshot(page, key, "description", description, { exercise: true, long: true }),
      progress: await targetSnapshot(page, key, "progress", labelledControl(dialog, "Progression", "input")),
    },
    interactions: await keyboardRoundTrip(page, title),
  };
}

async function kanbanScenario(page, key) {
  await page.goto(`${baseUrl}/kanban`, { waitUntil: "domcontentloaded" });
  await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Modifier la carte" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const title = labelledControl(dialog, "Titre", "input");
  return {
    targets: {
      title: await targetSnapshot(page, key, "title", title, { exercise: true }),
      due: await targetSnapshot(page, key, "due", labelledControl(dialog, "Échéance", "input")),
      description: await targetSnapshot(page, key, "description", labelledControl(dialog, "Description enrichie", "textarea"), { exercise: true, long: true }),
      points: await targetSnapshot(page, key, "points", labelledControl(dialog, "Points", "input")),
    },
    interactions: {
      ...await keyboardRoundTrip(page, title),
      categoryButtons: await dialog.locator('button[type="button"]').filter({ hasText: /Produit|Design|API|Ops|Urgent/ }).count(),
    },
  };
}

async function calendarScenario(page, key) {
  await page.goto(`${baseUrl}/calendar`, { waitUntil: "domcontentloaded" });
  await page.getByText("Events Pokémon GO", { exact: true }).waitFor({ state: "visible" });
  const event = page.locator("button.w-full.rounded-lg.border.p-3.text-left.transition").filter({ hasText: "Review Dashboard" }).first();
  await event.waitFor({ state: "visible" });
  await event.click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const title = labelledControl(dialog, "Titre", "input");
  return {
    targets: {
      title: await targetSnapshot(page, key, "title", title, { exercise: true }),
      start: await targetSnapshot(page, key, "start", labelledControl(dialog, "Début", "input")),
      time: await targetSnapshot(page, key, "time", labelledControl(dialog, "Heure", "input")),
      description: await targetSnapshot(page, key, "description", labelledControl(dialog, "Description", "textarea"), { exercise: true, long: true }),
    },
    interactions: await keyboardRoundTrip(page, title),
  };
}

async function notesScenario(page, key) {
  await page.goto(`${baseUrl}/notes`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Carnet central", exact: true }).waitFor({ state: "visible" });
  const title = labelledControl(page, "Titre", "input");
  return {
    targets: {
      title: await targetSnapshot(page, key, "title", title, { exercise: true }),
      content: await targetSnapshot(page, key, "content", labelledControl(page, "Contenu", "textarea"), { exercise: true, long: true }),
    },
    interactions: await keyboardRoundTrip(page, title),
  };
}

async function backlogScenario(page, key) {
  await page.goto(`${baseUrl}/tools/dashboard-backlog`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Dashboard Backlog", exact: true }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Nouveau ticket", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const title = labelledControl(dialog, "Titre", "input");
  return {
    targets: {
      title: await targetSnapshot(page, key, "title", title, { exercise: true }),
      page: await targetSnapshot(page, key, "page", labelledControl(dialog, "Page", "input"), { exercise: true }),
      description: await targetSnapshot(page, key, "description", labelledControl(dialog, "Description", "textarea"), { exercise: true, long: true }),
    },
    interactions: await keyboardRoundTrip(page, title),
  };
}

async function learningScenario(page, key) {
  await page.goto(`${baseUrl}/js-progress`, { waitUntil: "domcontentloaded" });
  const open = page.getByRole("button", { name: /Voir le détail/ }).first();
  await open.waitFor({ state: "visible", timeout: 30_000 });
  const dialog = page.getByRole("dialog");
  for (let attempt = 0; attempt < 3 && !(await dialog.isVisible()); attempt += 1) {
    await page.getByRole("button", { name: /Voir le détail/ }).first().click();
    await page.waitForTimeout(500);
  }
  await dialog.waitFor({ state: "visible" });
  const textarea = dialog.getByLabel("Zone de rédaction", { exact: true }).first();
  await textarea.waitFor({ state: "attached" });
  const target = await targetSnapshot(page, key, "disabled-textarea", textarea);
  assert.equal(target.signature.control.disabled, true, `${key}: textarea Learning attendue disabled`);
  return { targets: { disabledTextarea: target }, interactions: { disabledInert: true } };
}

async function pokemonScenario(page, key) {
  await page.goto(`${baseUrl}/pokemon-admin?section=my-collection`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Ma collection Pokémon GO", exact: true }).waitFor({ state: "visible", timeout: 30_000 });
  const search = page.getByLabel("Rechercher dans la collection", { exact: true });
  return {
    targets: { search: await targetSnapshot(page, key, "search", search, { exercise: true }) },
    interactions: await keyboardRoundTrip(page, search),
  };
}

const authenticatedScenarios = [
  { name: "projects", run: projectsScenario },
  { name: "kanban", run: kanbanScenario },
  { name: "calendar", run: calendarScenario },
  { name: "notes", run: notesScenario },
  { name: "backlog", run: backlogScenario },
  { name: "learning-disabled", run: learningScenario },
  { name: "pokemon-collection", run: pokemonScenario },
].filter((scenario) => !process.env.DESIGN_SYSTEM_SCENARIO || scenario.name === process.env.DESIGN_SYSTEM_SCENARIO);

async function focusableSignature(page) {
  return page.evaluate(() => {
    const selector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";
    return [...document.querySelectorAll(selector)].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    }).map((element) => ({
      tag: element.tagName.toLowerCase(), type: element.getAttribute("type") || "",
      name: element.getAttribute("aria-label") || element.labels?.[0]?.textContent?.trim().replace(/\s+/g, " ") || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "",
      tabIndex: element.tabIndex,
    }));
  });
}

async function runScenario(page, theme, viewport, scenario) {
  const key = `${theme}/${viewport.name}/${scenario.name}`;
  const consoleErrors = [];
  const pageErrors = [];
  const onConsole = (message) => { if (message.type() === "error") consoleErrors.push(message.text()); };
  const onPageError = (error) => pageErrors.push(error.message);
  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  const result = await scenario.run(page, key);
  await page.evaluate(() => document.fonts.ready);
  const pageScreenshot = await capture(page, key, "page");
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
  const reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const focusables = await focusableSignature(page);
  page.off("console", onConsole);
  page.off("pageerror", onPageError);
  return { key, theme, viewport, scenario: scenario.name, overflow, reducedMotion, focusables, pageScreenshot, consoleErrors, pageErrors, ...result };
}

async function createSessionCookies(browser, credentials) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await installRoutes(page);
  await authenticate(page, credentials);
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function createContext(browser, theme, viewport, cookies = []) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height }, colorScheme: theme,
    reducedMotion: viewport.name === "mobile" ? "reduce" : "no-preference",
    storageState: { cookies, origins: [] },
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("matweb-theme", selectedTheme);
    for (const key of ["matweb.calendar", "matweb.kanban", "matweb.projects", "matweb.notes", "matweb.js.learning.progress", "matweb.js.learning.progress.v2"]) localStorage.removeItem(key);
  }, theme);
  return context;
}

async function runCombination(browser, cookies, theme, viewport) {
  const runs = [];
  if (!process.env.DESIGN_SYSTEM_SCENARIO || process.env.DESIGN_SYSTEM_SCENARIO === "login") {
    const context = await createContext(browser, theme, viewport);
    const page = await context.newPage();
    await installRoutes(page);
    runs.push(await runScenario(page, theme, viewport, { name: "login", run: loginScenario }));
    await context.close();
  }
  if (authenticatedScenarios.length) {
    const context = await createContext(browser, theme, viewport, cookies);
    for (const scenario of authenticatedScenarios) {
      const page = await context.newPage();
      await installRoutes(page);
      runs.push(await runScenario(page, theme, viewport, scenario));
      await page.close();
    }
    await context.close();
  }
  return runs;
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

async function compareRuns(baseline, current) {
  const differences = [];
  const pageDifferences = [];
  const targetDifferences = [];
  const focusTransitionDifferences = [];
  function targetEquivalent(before, after, key) {
    if (JSON.stringify(before.signature) !== JSON.stringify(after.signature)) return false;
    if (JSON.stringify(before.defaultStyles) !== JSON.stringify(after.defaultStyles)) return false;
    if (JSON.stringify(before.filledStyles) !== JSON.stringify(after.filledStyles)) return false;
    for (const section of ["root", "label", "placeholder"]) {
      if (JSON.stringify(before.focusStyles[section]) !== JSON.stringify(after.focusStyles[section])) return false;
    }
    for (const [property, value] of Object.entries(before.focusStyles.control)) {
      const next = after.focusStyles.control[property];
      if (value === next) continue;
      if (["borderColor", "backgroundColor", "outlineColor"].includes(property)) {
        focusTransitionDifferences.push({ key, property, before: value, after: next });
        continue;
      }
      return false;
    }
    return true;
  }
  const beforeByKey = new Map(baseline.runs.map((run) => [run.key, run]));
  for (const after of current.runs) {
    const before = beforeByKey.get(after.key);
    if (!before) { differences.push(`${after.key}: baseline absente`); continue; }
    for (const property of ["overflow", "reducedMotion", "focusables", "interactions"]) {
      if (JSON.stringify(before[property]) !== JSON.stringify(after[property])) differences.push(`${after.key}: ${property} différent`);
    }
    if (before.pageScreenshot.sha256 !== after.pageScreenshot.sha256) {
      const pixels = await pixelDifference(before.pageScreenshot.file, after.pageScreenshot.file);
      pageDifferences.push({ key: after.key, ...pixels });
      if (pixels.changedPixels > 500) differences.push(`${after.key}: ${pixels.changedPixels} pixels page différents`);
    }
    for (const [name, target] of Object.entries(after.targets)) {
      const previous = before.targets[name];
      if (!previous) { differences.push(`${after.key}/${name}: cible absente`); continue; }
      if (!targetEquivalent(previous, target, `${after.key}/${name}`)) differences.push(`${after.key}/${name}: DOM ou styles différents`);
      for (const state of ["default", "focus", "filled"]) {
        if (previous.screenshots[state].sha256 === target.screenshots[state].sha256) continue;
        const pixels = await pixelDifference(previous.screenshots[state].file, target.screenshots[state].file);
        targetDifferences.push({ key: `${after.key}/${name}/${state}`, ...pixels });
        if (pixels.changedPixels > 1) differences.push(`${after.key}/${name}/${state}: ${pixels.changedPixels} pixels différents`);
      }
    }
    for (const error of after.consoleErrors.filter((item) => !before.consoleErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur console: ${error}`);
    for (const error of after.pageErrors.filter((item) => !before.pageErrors.includes(item))) differences.push(`${after.key}: nouvelle erreur React: ${error}`);
  }
  return { differences, pageDifferences, targetDifferences, focusTransitionDifferences };
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const runs = [];
  try {
    const cookies = await createSessionCookies(browser, readEnvironment());
    for (const theme of themes) {
      for (const viewport of viewports) runs.push(...await runCombination(browser, cookies, theme, viewport));
    }
    for (const run of runs) {
      assert.equal(run.overflow, 0, `${run.key}: overflow horizontal`);
      assert.equal(run.pageErrors.length, 0, `${run.key}: erreur React/page`);
      assert.equal(run.consoleErrors.length, 0, `${run.key}: erreur console`);
      assert.ok(Object.values(run.interactions).every((value) => value === true || (typeof value === "number" && value > 0)), `${run.key}: interaction incomplète`);
    }
    const result = { stage, baseUrl, runs };
    if (updateBaseline) {
      writeFileSync(baselineFile, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`Baseline Field Family : ${runs.length} scénarios`);
      return;
    }
    assert.ok(existsSync(baselineFile), "Baseline absente : lancer --update-baseline avant migration");
    const comparison = await compareRuns(JSON.parse(readFileSync(baselineFile, "utf8")), result);
    writeFileSync(path.join(artifactRoot, "after.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify({ ...comparison, runCount: runs.length }, null, 2)}\n`);
    assert.deepEqual(comparison.differences, []);
    console.log(`Vérification Field Family : ${runs.length} scénarios, 0 différence critique`);
  } finally {
    await browser.close();
  }
}

await main();
