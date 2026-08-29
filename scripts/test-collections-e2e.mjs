import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.DASHBOARD_BASE_URL || "http://localhost:3000";
const outputDirectory = path.resolve("test-results/collections-e2e");
fs.mkdirSync(outputDirectory, { recursive: true });
try {
  process.loadEnvFile(path.resolve(".env.local"));
} catch {
  // Les valeurs locales par défaut restent valables en développement.
}

async function authenticate(page) {
  const target = `${baseUrl}/pokemon-admin?section=collections`;
  await page.goto(target, { waitUntil: "networkidle", timeout: 30_000 });
  if (await page.locator('input[type="email"]').isVisible().catch(() => false)) {
    await page.locator('input[type="email"]').fill(process.env.ADMIN_EMAIL || "matthieu@example.com");
    await page.locator('input[type="password"]').fill(process.env.ADMIN_PASSWORD || "change-moi");
    await page.getByRole("button", { name: "Entrer dans le dashboard" }).click();
    await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30_000 });
    await page.goto(target, { waitUntil: "networkidle", timeout: 30_000 });
  }
  if (await page.locator("#form-a11y-pokemon-admin-password").isVisible().catch(() => false)) {
    await page.locator("#form-a11y-pokemon-admin-password").fill(process.env.ADMIN_PASSWORD || "change-moi");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await page.waitForLoadState("networkidle");
    await page.goto(target, { waitUntil: "networkidle", timeout: 30_000 });
  }
  await page.waitForSelector('[data-testid="collections-panel"]', { timeout: 30_000 });
}

async function selectCollectionType(page, label) {
  await page.getByRole("button", { name: /filtres/i }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: label, exact: true }).click();
  const action = dialog.getByRole("button", { name: /Afficher .* Pokémon/ });
  const text = await action.innerText();
  const count = Number(text.replace(/\D/g, ""));
  await action.click();
  await page.waitForTimeout(100);
  return count;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark" });
const store = new Map();
await context.route("**/api/dashboard-store**", async (route) => {
  const request = route.request();
  if (request.method() === "GET") {
    const key = new URL(request.url()).searchParams.get("key");
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: { configured: true, key, value: store.get(key) ?? null } }) });
    return;
  }
  if (request.method() === "PUT") {
    const body = request.postDataJSON();
    store.set(body.key, body.value);
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: { configured: true, key: body.key } }) });
    return;
  }
  await route.continue();
});

const page = await context.newPage();
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

try {
  await authenticate(page);
  const testName = `Équipe Élite ${Date.now()}`;
  await page.getByTestId("collection-create-trigger").click();
  let dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Gigamax" }).click();
  await dialog.getByRole("button", { name: "Non variante" }).click();
  assert.equal(await dialog.getByLabel("Sexe").isChecked(), false);
  assert.match(await dialog.innerText(), /Inclure les différences visuelles mâle \/ femelle lorsqu'elles existent\./);
  await dialog.getByLabel("Sexe").check();
  assert.match(await dialog.getByRole("button", { name: /Créer la collection/ }).innerText(), /17 Pokémon/);
  await dialog.getByLabel("Sexe").uncheck();
  const nameInput = dialog.getByPlaceholder("ex. Shiny Shadow Kanto");
  await nameInput.pressSequentially(testName, { delay: 2 });
  assert.equal(await nameInput.inputValue(), testName);
  assert.equal(await nameInput.evaluate((element) => element === document.activeElement), true);
  const create = dialog.getByRole("button", { name: /Créer la collection/ });
  assert.match(await create.innerText(), /17 Pokémon/);
  await create.click();
  await page.waitForSelector(".collection-pokemon-card");

  const selector = page.getByTestId("collection-selector-trigger");
  const activeCard = page.getByTestId("active-collection-card");
  assert.equal(await selector.count(), 1);
  assert.equal(await activeCard.getByTestId("collection-selector-trigger").count(), 1);
  assert.match(await selector.innerText(), new RegExp(testName));
  assert.match(await activeCard.innerText(), /1 collection\(s\)/);

  const longName = `Collection chromatique événementielle au nom volontairement très long ${Date.now()}`;
  await page.getByTestId("collection-create-trigger").click();
  dialog = page.getByRole("dialog");
  const longNameInput = dialog.getByPlaceholder("ex. Shiny Shadow Kanto");
  await longNameInput.fill(longName);
  await dialog.getByRole("button", { name: /Créer la collection/ }).click();
  await page.waitForTimeout(100);
  assert.equal(await selector.getAttribute("title"), longName);
  assert.match(await activeCard.innerText(), /2 collection\(s\)/);

  await page.setViewportSize({ width: 320, height: 568 });
  const narrowHeader = await page.evaluate(() => {
    const card = document.querySelector('[data-testid="active-collection-card"]');
    const selectorButton = document.querySelector('[data-testid="collection-selector-trigger"]');
    const selectorName = selectorButton?.querySelector("span");
    const actions = document.querySelector('button[aria-label="Actions de la collection"]');
    const cardRect = card?.getBoundingClientRect();
    const selectorRect = selectorButton?.getBoundingClientRect();
    const actionsRect = actions?.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      cardLeft: cardRect?.left,
      cardRight: cardRect?.right,
      selectorLeft: selectorRect?.left,
      selectorRight: selectorRect?.right,
      actionsLeft: actionsRect?.left,
      actionsRight: actionsRect?.right,
      nameIsTruncated: (selectorName?.scrollWidth || 0) > (selectorName?.clientWidth || 0),
    };
  });
  assert.ok(narrowHeader.overflow <= 1, `sélecteur mobile: overflow ${narrowHeader.overflow}px`);
  assert.ok(narrowHeader.selectorLeft >= narrowHeader.cardLeft);
  assert.ok(narrowHeader.selectorRight < narrowHeader.actionsLeft);
  assert.ok(narrowHeader.actionsRight <= narrowHeader.cardRight);
  assert.equal(narrowHeader.nameIsTruncated, true);

  await selector.click();
  dialog = page.getByRole("dialog");
  assert.equal(await dialog.getByTestId("collection-option").count(), 2);
  const sheetRect = await dialog.evaluate((element) => element.getBoundingClientRect());
  assert.ok(sheetRect.left >= 0 && sheetRect.right <= 320);
  assert.ok(sheetRect.top >= 0 && sheetRect.bottom <= 568);
  await dialog.getByTitle(testName, { exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await selector.getAttribute("title"), testName);

  await page.evaluate(() => window.scrollTo(0, 0));
  const firstCardTop = await page.locator(".collection-pokemon-card").first().evaluate((element) => element.getBoundingClientRect().top);
  assert.ok(firstCardTop <= 844, `première carte à ${firstCardTop}px`);
  assert.equal(await page.locator(".collection-pokemon-card").count(), 17);
  assert.equal(await page.locator('[data-testid="collections-sticky-bar"]').count(), 1);

  await page.locator(".collection-pokemon-card button").first().click();
  assert.match(await page.locator('[data-testid="collections-sticky-bar"]').innerText(), /1\/17/);
  await page.getByRole("button", { name: "HAVE" }).first().click();
  assert.equal(await page.locator(".collection-pokemon-card").count(), 1);
  await page.getByRole("button", { name: "NEED" }).first().click();
  assert.equal(await page.locator(".collection-pokemon-card").count(), 16);
  await page.getByRole("button", { name: "ALL" }).first().click();

  await page.getByRole("button", { name: "Ouvrir la recherche" }).click();
  let search = page.getByRole("dialog").getByRole("textbox", { name: "Rechercher dans la collection" });
  await search.fill("Florizarre");
  await page.getByRole("dialog").getByRole("button", { name: "Afficher 1 Pokémon" }).click();
  assert.equal(await page.locator(".collection-pokemon-card").count(), 1);
  await page.getByRole("button", { name: "Ouvrir la recherche" }).click();
  search = page.getByRole("dialog").getByRole("textbox", { name: "Rechercher dans la collection" });
  await search.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
  await search.press("Backspace");
  assert.equal(await search.inputValue(), "");
  const resetSearch = page.getByRole("dialog").getByRole("button", { name: "Afficher 17 Pokémon" });
  await resetSearch.click();

  const scrollBeforeSheet = await page.evaluate(() => window.scrollY);
  await page.getByRole("button", { name: "Changer de région" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Kanto", exact: true }).click();
  assert.equal(await page.locator(".collection-pokemon-card").count(), 11);
  await page.getByRole("button", { name: "Changer de région" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Toutes", exact: true }).click();
  assert.ok(Math.abs((await page.evaluate(() => window.scrollY)) - scrollBeforeSheet) < 4);

  const expectedCounts = new Map([
    ["Événement", 311],
    ["Chanceux", 955],
    ["Obscur", 458],
    ["Purifié", 458],
    ["Méga", 58],
    ["Dynamax", 127],
    ["Gigamax", 17],
    ["Normal", 955],
  ]);
  for (const [label, expected] of expectedCounts) {
    assert.equal(await selectCollectionType(page, label), expected, label);
  }

  assert.equal(await page.locator(".collection-pokemon-card").count(), 955);
  assert.equal(await page.getByLabel("Choisir une page Collections").count(), 0);

  await page.getByRole("button", { name: "Actions de la collection" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Sélectionner tous les résultats", exact: true }).click();
  await dialog.getByRole("button", { name: "Fermer" }).click();
  assert.match(await page.locator('[data-testid="collections-sticky-bar"]').innerText(), /955\/955/);
  await page.getByRole("button", { name: "Actions de la collection" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Désélectionner tous les résultats", exact: true }).click();
  await dialog.getByRole("button", { name: "Fermer" }).click();
  assert.match(await page.locator('[data-testid="collections-sticky-bar"]').innerText(), /0\/955/);

  await page.getByRole("button", { name: /filtres/i }).first().click();
  dialog = page.getByRole("dialog");
  await dialog.getByLabel("Chromatique").check();
  assert.match(await dialog.getByRole("button", { name: /Afficher .* Pokémon/ }).innerText(), /876 Pokémon/);
  await dialog.getByLabel("Sexe").check();
  assert.match(await dialog.getByRole("button", { name: /Afficher .* Pokémon/ }).innerText(), /975 Pokémon/);
  await dialog.getByRole("button", { name: /Afficher .* Pokémon/ }).click();
  await page.locator('[data-sonner-toast]').waitFor({ state: "hidden", timeout: 6_000 }).catch(() => {});

  const responsiveFirstCardTop = {};
  for (const viewport of [
    { name: "iphone-se", width: 320, height: 568 },
    { name: "iphone", width: 390, height: 844 },
    { name: "iphone-pro-max", width: 430, height: 932 },
    { name: "android", width: 412, height: 915 },
    { name: "landscape", width: 844, height: 390 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const layout = await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="collections-panel"]')?.getBoundingClientRect();
      const title = document.querySelector('[data-testid="collections-panel"] h2')?.getBoundingClientRect();
      const firstCard = document.querySelector('.collection-pokemon-card')?.getBoundingClientRect();
      return {
        innerWidth: window.innerWidth,
        largeBreakpoint: window.matchMedia('(min-width: 64rem)').matches,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        scrollX: window.scrollX,
        framePaddingLeft: getComputedStyle(document.querySelector('#dashboard-content')?.parentElement).paddingLeft,
        panelLeft: panel?.left ?? -1,
        panelRight: panel?.right ?? -1,
        titleLeft: title?.left ?? -1,
        firstCardTop: firstCard?.top ?? -1,
      };
    });
    const overflow = layout.overflow;
    responsiveFirstCardTop[viewport.name] = Math.round(layout.firstCardTop);
    assert.ok(overflow <= 1, `${viewport.name}: overflow ${overflow}px`);
    assert.equal(layout.scrollX, 0, `${viewport.name}: défilement horizontal résiduel`);
    assert.ok(layout.panelLeft >= (viewport.width >= 1024 ? 96 : 0), `${viewport.name}: panneau masqué à gauche ${JSON.stringify(layout)}`);
    assert.ok(layout.panelRight <= viewport.width + 1, `${viewport.name}: panneau masqué à droite (${layout.panelRight}px)`);
    assert.ok(layout.titleLeft >= layout.panelLeft + 8, `${viewport.name}: titre rogné à gauche (${layout.titleLeft}px)`);
    if (["iphone-se", "iphone", "iphone-pro-max", "android"].includes(viewport.name)) {
      assert.ok(layout.firstCardTop <= viewport.height, `${viewport.name}: début des cartes hors du premier écran (${layout.firstCardTop}px)`);
    }
    await page.screenshot({ path: path.join(outputDirectory, `${viewport.name}.png`), fullPage: false });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole("button", { name: "Changer le thème" }).click();
  await page.waitForTimeout(100);
  assert.equal(await page.locator("html").evaluate((element) => element.classList.contains("light")), true);
  await page.screenshot({ path: path.join(outputDirectory, "mobile-light.png"), fullPage: false });
  await page.getByRole("button", { name: "Changer le thème" }).click();
  await page.getByRole("button", { name: "Actions de la collection" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Supprimer" }).click();
  await dialog.getByRole("button", { name: "Confirmer la suppression" }).click();
  assert.equal(store.get("matweb.pokemon.collections")?.length, 1);
  await page.getByRole("button", { name: "Actions de la collection" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Supprimer" }).click();
  await dialog.getByRole("button", { name: "Confirmer la suppression" }).click();
  assert.equal(store.get("matweb.pokemon.collections")?.length, 0);

  const overlay = await page.locator('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay').count();
  assert.equal(overlay, 0);
  assert.deepEqual(consoleErrors, []);
  console.log(JSON.stringify({ status: "PASS", firstCardTop, responsiveFirstCardTop, viewports: 7, themes: 2, scenarios: 17, consoleErrors: 0 }));
} finally {
  await browser.close();
}
