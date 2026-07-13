import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(repositoryRoot, "test-results/design-system-badge");
const baselineFile = path.join(artifactRoot, "baseline.json");
const updateBaseline = process.argv.includes("--update-baseline");
const stage = updateBaseline ? "before" : "after";
const stageDirectory = path.join(artifactRoot, stage);
const baseUrl = process.env.DESIGN_SYSTEM_BASE_URL || "http://localhost:3020";
const categories = ["Produit", "Design", "API", "Ops", "Urgent"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const themes = ["dark", "light"];
const styleProperties = [
  "display",
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
];

function readEnvironment() {
  const file = path.join(repositoryRoot, ".env.local");
  if (!existsSync(file)) return {};
  const values = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

function hash(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function screenshotPath(theme, viewport, state) {
  return path.join(stageDirectory, `${theme}-${viewport.name}-${state}.png`);
}

async function capture(page, theme, viewport, state) {
  const file = screenshotPath(theme, viewport, state);
  const buffer = await page.screenshot({ path: file, fullPage: false, animations: "disabled" });
  return { file: path.relative(repositoryRoot, file), sha256: hash(buffer) };
}

async function computedStyle(locator) {
  return locator.evaluate((element, properties) => {
    const styles = window.getComputedStyle(element);
    return Object.fromEntries(properties.map((property) => [property, styles[property]]));
  }, styleProperties);
}

async function focusableSignature(page) {
  return page.evaluate(() => {
    const selector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";
    return [...document.querySelectorAll(selector)]
      .filter((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      })
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        type: element.getAttribute("type") || "",
        name: element.getAttribute("aria-label") || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "",
        tabIndex: element.tabIndex,
      }));
  });
}

async function authenticate(page, credentials) {
  await page.goto(`${baseUrl}/login?next=/kanban`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL("**/kanban", { timeout: 15_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
}

async function preparePage(context, theme) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.addInitScript((selectedTheme) => {
    window.localStorage.setItem("matweb-theme", selectedTheme);
    window.localStorage.removeItem("matweb.kanban");
  }, theme);

  await page.route("**/api/dashboard-store**", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: { configured: false, value: null } }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: { configured: false, saved: false } }),
    });
  });

  return { page, consoleErrors, pageErrors };
}

async function waitForKanban(page, theme) {
  await page.getByRole("heading", { name: "Kanban projet" }).waitFor({ state: "visible", timeout: 15_000 });
  await page.getByText("Sauvegarde active", { exact: true }).waitFor({ state: "visible", timeout: 15_000 });
  await page.locator('[data-task-id="k1"]').waitFor({ state: "visible", timeout: 15_000 });
  await page.waitForFunction((selectedTheme) => document.documentElement.classList.contains(selectedTheme), theme);
  await page.evaluate(() => document.fonts.ready);
}

async function runViewport(browser, credentials, theme, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: theme,
  });
  const { page, consoleErrors, pageErrors } = await preparePage(context, theme);
  await authenticate(page, credentials);
  await waitForKanban(page, theme);

  const card = page.locator('[data-task-id="k1"]');
  const normalScreenshot = await capture(page, theme, viewport, "loaded");
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth));
  const focusables = await focusableSignature(page);

  await card.locator("button.block.w-full").click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const modalOpens = await dialog.isVisible();
  const selectedCard = (await card.getAttribute("class"))?.includes("border-brand-2/55") || false;
  const modalScreenshot = await capture(page, theme, viewport, "modal");

  const styles = {};
  const labelClasses = {};
  const labelTags = {};
  const categoryButtonTags = {};
  for (const category of categories) {
    const button = dialog.getByRole("button", { name: category, exact: true });
    categoryButtonTags[category] = await button.evaluate((element) => element.tagName.toLowerCase());
    await button.click();
    const label = card.locator("span").filter({ hasText: new RegExp(`^${category}$`) }).first();
    await label.waitFor({ state: "visible" });
    styles[category] = await computedStyle(label);
    labelClasses[category] = await label.getAttribute("class");
    labelTags[category] = await label.evaluate((element) => element.tagName.toLowerCase());
  }

  const productButton = dialog.getByRole("button", { name: "Produit", exact: true });
  await productButton.focus();
  await page.keyboard.press("Enter");
  const categoryKeyboard = await card.locator("span").filter({ hasText: /^Produit$/ }).first().isVisible();

  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  await card.getByRole("button", { name: "Modifier la carte" }).click();
  const editAction = await dialog.isVisible();
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  await card.getByRole("button", { name: "Demander la suppression de la carte" }).click();
  await dialog.waitFor({ state: "visible" });
  const deleteAction = await dialog.getByRole("button", { name: "Confirmer la suppression", exact: true }).isVisible();
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  let dragPreview = { tested: false, visible: false, screenshot: null, reason: null };
  let dragMove = { tested: false, moved: false, reason: null };
  let deleteConfirmed = false;
  if (viewport.name === "desktop") {
    try {
      const handle = card.getByRole("button", { name: "Glisser la carte" });
      const box = await handle.boundingBox();
      assert.ok(box, "Poignée de drag sans dimensions");
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 24, y + 18, { steps: 8 });
      await page.waitForTimeout(150);
      const matchingArticles = page.locator("article").filter({ hasText: "Finaliser les tokens UI" });
      const visible = (await matchingArticles.count()) >= 2;
      dragPreview = {
        tested: true,
        visible,
        screenshot: visible ? await capture(page, theme, viewport, "drag-preview") : null,
        reason: visible ? null : "DragOverlay non détecté",
      };
      const targetBox = await page.locator('[data-column-id="doing"]').boundingBox();
      assert.ok(targetBox, "Colonne cible du drag sans dimensions");
      const targetX = targetBox.x + targetBox.width / 2;
      const targetY = targetBox.y + targetBox.height - 70;
      await page.mouse.move(targetX, targetY, { steps: 30 });
      await page.waitForTimeout(250);
      const targetOver = (await page.locator('[data-column-id="doing"]').getAttribute("class"))?.includes("border-brand-2/50") || false;
      await page.mouse.up();
      await page.waitForTimeout(450);
      const moved = await page.locator('[data-column-id="doing"] [data-task-id="k1"]').isVisible();
      dragMove = {
        tested: true,
        moved,
        reason: moved ? null : `Colonne cible isOver=${targetOver}`,
      };
      if (await dialog.isVisible()) {
        await page.keyboard.press("Escape");
        await dialog.waitFor({ state: "hidden" });
      }

      const movedCard = page.locator('[data-task-id="k1"]');
      await movedCard.getByRole("button", { name: "Demander la suppression de la carte" }).click();
      await dialog.waitFor({ state: "visible" });
      await dialog.getByRole("button", { name: "Confirmer la suppression", exact: true }).click();
      await movedCard.waitFor({ state: "detached" });
      deleteConfirmed = true;
    } catch (error) {
      await page.mouse.up().catch(() => {});
      if (!dragPreview.tested) {
        dragPreview = { tested: true, visible: false, screenshot: null, reason: error.message };
      }
      dragMove = { tested: true, moved: false, reason: error.message };
    }
  }

  const result = {
    theme,
    viewport,
    overflow,
    screenshots: { loaded: normalScreenshot, modal: modalScreenshot },
    styles,
    labelClasses,
    labelTags,
    focusables,
    checks: {
      modalOpens,
      selectedCard,
      editAction,
      deleteAction,
      categoryKeyboard,
      categoryButtonTags,
      dragPreview,
      dragMove,
      deleteConfirmed,
    },
    consoleErrors,
    pageErrors,
  };

  await context.close();
  return result;
}

async function verifyReducedMotion(browser, credentials) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  const { page, consoleErrors, pageErrors } = await preparePage(context, "dark");
  await authenticate(page, credentials);
  await waitForKanban(page, "dark");
  const result = {
    mediaMatches: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
    cardVisible: await page.locator('[data-task-id="k1"]').isVisible(),
    consoleErrors,
    pageErrors,
  };
  await context.close();
  return result;
}

function compareRuns(baseline, current) {
  const differences = [];
  for (let index = 0; index < baseline.runs.length; index += 1) {
    const before = baseline.runs[index];
    const after = current.runs[index];
    const key = `${before.theme}/${before.viewport.name}`;
    for (const category of categories) {
      if (JSON.stringify(before.styles[category]) !== JSON.stringify(after.styles[category])) {
        differences.push(`${key}/${category}: styles calculés différents`);
      }
      if (before.labelClasses[category] !== after.labelClasses[category]) {
        differences.push(`${key}/${category}: classes résolues différentes`);
      }
      if (before.labelTags[category] !== after.labelTags[category]) {
        differences.push(`${key}/${category}: élément racine différent`);
      }
    }
    if (JSON.stringify(before.focusables) !== JSON.stringify(after.focusables)) {
      differences.push(`${key}: tab order différent`);
    }
    if (after.overflow !== before.overflow || after.overflow !== 0) {
      differences.push(`${key}: overflow ${before.overflow} -> ${after.overflow}`);
    }
    for (const state of ["loaded", "modal"]) {
      if (before.screenshots[state].sha256 !== after.screenshots[state].sha256) {
        differences.push(`${key}/${state}: capture différente`);
      }
    }
    if (before.checks.dragPreview.tested && before.checks.dragPreview.visible) {
      if (!after.checks.dragPreview.visible) differences.push(`${key}: drag preview absent après migration`);
      else if (before.checks.dragPreview.screenshot.sha256 !== after.checks.dragPreview.screenshot.sha256) {
        differences.push(`${key}/drag-preview: capture différente`);
      }
    }
    if (after.viewport.name === "desktop" && !after.checks.deleteConfirmed) {
      differences.push(`${key}: suppression fonctionnelle non confirmée`);
    }
    const requiredChecks = ["modalOpens", "selectedCard", "editAction", "deleteAction", "categoryKeyboard"];
    for (const check of requiredChecks) if (!after.checks[check]) differences.push(`${key}: échec ${check}`);
    if (Object.values(after.checks.categoryButtonTags).some((tag) => tag !== "button")) {
      differences.push(`${key}: un contrôle de catégorie n'est plus un button`);
    }
    const newConsoleErrors = after.consoleErrors.filter((error) => !before.consoleErrors.includes(error));
    const newPageErrors = after.pageErrors.filter((error) => !before.pageErrors.includes(error));
    for (const error of newConsoleErrors) differences.push(`${key}: nouvelle erreur console: ${error}`);
    for (const error of newPageErrors) differences.push(`${key}: nouvelle erreur React/page: ${error}`);
  }
  if (JSON.stringify(baseline.reducedMotion) !== JSON.stringify(current.reducedMotion)) {
    differences.push("prefers-reduced-motion: résultat différent");
  }
  return differences;
}

async function main() {
  mkdirSync(stageDirectory, { recursive: true });
  const credentials = { ...readEnvironment(), ...process.env };
  const browser = await chromium.launch({ headless: true });
  const runs = [];
  try {
    for (const theme of themes) {
      for (const viewport of viewports) {
        runs.push(await runViewport(browser, credentials, theme, viewport));
      }
    }
    const reducedMotion = await verifyReducedMotion(browser, credentials);
    const result = { stage, baseUrl, createdAt: new Date().toISOString(), runs, reducedMotion };
    const resultFile = updateBaseline ? baselineFile : path.join(artifactRoot, "after.json");
    writeFileSync(resultFile, `${JSON.stringify(result, null, 2)}\n`);

    if (updateBaseline) {
      console.log(JSON.stringify({ status: "baseline-created", file: path.relative(repositoryRoot, resultFile), runs: runs.length }, null, 2));
      return;
    }

    assert.ok(existsSync(baselineFile), "Baseline absente : exécuter d'abord avec --update-baseline");
    const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
    const differences = compareRuns(baseline, result);
    const comparison = {
      status: differences.length ? "failed" : "passed",
      differences,
      baseline: path.relative(repositoryRoot, baselineFile),
      current: path.relative(repositoryRoot, resultFile),
    };
    writeFileSync(path.join(artifactRoot, "comparison.json"), `${JSON.stringify(comparison, null, 2)}\n`);
    console.log(JSON.stringify(comparison, null, 2));
    assert.deepEqual(differences, []);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
