import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import nextEnv from "@next/env";
import { chromium } from "playwright";

nextEnv.loadEnvConfig(process.cwd());
const origin = process.env.ADVENTURE_EFFECTS_BROWSER_ORIGIN || "http://localhost:3100";
const bootstrapUrl = process.env.ADVENTURE_EFFECTS_BROWSER_BOOTSTRAP_URL || "";
const output = path.resolve(process.cwd(), process.env.ADVENTURE_EFFECTS_BROWSER_OUTPUT || "test-results/adventure-effects");
fs.mkdirSync(output, { recursive: true });
assert.ok(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD, "Identifiants de test requis");
const browser = await chromium.launch();
const results = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  if (bootstrapUrl) {
    const bootstrap = await context.request.get(bootstrapUrl, { maxRedirects: 10 });
    assert.ok(bootstrap.status() < 400, `Accès Preview impossible (${bootstrap.status()})`);
  }
  const login = await context.request.post(`${origin}/api/session`, { form: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, next: "/catalogues" }, headers: { origin }, maxRedirects: 0 });
  assert.equal(login.status(), 303);
  // Never persist test drafts or trigger a commit, even when testing production.
  await context.route("**/api/json-builder", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    const { action } = route.request().postDataJSON();
    if (action === "dry-run") return route.continue();
    if (action === "save-drafts") return route.fulfill({ json: { data: { saved: true } } });
    throw new Error(`Écriture de test interdite : ${action}`);
  });
  const page = await context.newPage();
  const errors = [];
  const ignoredExternalErrors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error" || message.text().includes("net::ERR_FAILED")) return;
    if (/vercel\.live\/_next-live\/feedback\/feedback\.js/.test(message.text())) ignoredExternalErrors.push(message.text());
    else errors.push(message.text());
  });
  await page.goto(`${origin}/catalogues`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Effets d’aventure", exact: true }).click({ timeout: 60000 });
  await page.waitForFunction(() => document.querySelectorAll("[data-adventure-effect]").length === 11);
  for (const card of await page.locator("[data-adventure-effect]").all()) {
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").evaluateAll((images) => Promise.all(images.map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; }))));
    assert.equal(await card.locator("img").evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)), true);
    const id = await card.getAttribute("data-adventure-effect");
    await card.screenshot({ path: path.join(output, `${id}.png`) });
    results.push({ id, rendered: true, imagesLoaded: true });
  }
  const requiredVisualEffects = [
    "ADVENTURE_EFFECT_DYNAMAX_CANNON",
    "ADVENTURE_EFFECT_BEHEMOTH_BASH",
    "ADVENTURE_EFFECT_BEHEMOTH_BLADE",
    "ADVENTURE_EFFECT_MEGA_MEWTWO_X",
    "ADVENTURE_EFFECT_MEGA_MEWTWO_Y",
    "ADVENTURE_EFFECT_SPACIAL_REND",
    "ADVENTURE_EFFECT_ROAR_OF_TIME",
  ];
  assert.deepEqual(
    requiredVisualEffects.filter((id) => !results.some((result) => result.id === id)),
    [],
  );
  assert.equal(await page.getByText("Source et fiabilité", { exact: true }).count(), 0);
  assert.ok(await page.locator("[data-adventure-effect-metric]").count() >= 22);
  const mewtwo = page.locator('[data-adventure-effect="ADVENTURE_EFFECT_MEGA_MEWTWO_X"]');
  assert.match(await mewtwo.innerText(), /Description EN/);
  assert.match(await mewtwo.innerText(), /10 min/);
  assert.match(await mewtwo.innerText(), /75 MEWTWO/);
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("matweb-theme", value), theme);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Effets d’aventure", exact: true }).click({ timeout: 60000 });
    await page.waitForFunction(() => document.querySelectorAll("[data-adventure-effect]").length === 11, { timeout: 60000 });
    await page.getByPlaceholder("Chercher dans effets d’aventure...").fill("Gladius Maximus");
    for (const [device, width, height] of [["desktop", 1440, 1000], ["macbook", 1280, 800], ["mobile", 390, 844]]) {
      await page.setViewportSize({ width, height });
      const card = page.locator('[data-adventure-effect="ADVENTURE_EFFECT_BEHEMOTH_BLADE"]');
      await card.waitFor();
      await card.scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${device}/${theme}: débordement`);
      assert.equal(await page.evaluate((value) => document.documentElement.classList.contains(value), theme), true);
      await page.screenshot({ path: path.join(output, `${device}-${theme}.png`), fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  const assetUrls = await page.locator('[data-adventure-effect="ADVENTURE_EFFECT_BEHEMOTH_BLADE"] img').evaluateAll((images) => images.map((image) => image.src));
  for (const url of assetUrls) await context.route(url, (route) => route.abort());
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Effets d’aventure", exact: true }).click({ timeout: 60000 });
  await page.getByPlaceholder("Chercher dans effets d’aventure...").fill("Gladius Maximus");
  const failedAssetCard = page.locator('[data-adventure-effect="ADVENTURE_EFFECT_BEHEMOTH_BLADE"]');
  await failedAssetCard.scrollIntoViewIfNeeded();
  await failedAssetCard.getByText("Bannière indisponible").waitFor();
  await failedAssetCard.getByRole("img", { name: "Portrait indisponible" }).waitFor();
  await failedAssetCard.screenshot({ path: path.join(output, "broken-assets-fallback.png") });
  for (const url of assetUrls) await context.unroute(url);
  results.push({ brokenAssetFallback: true });
  await page.getByRole("button", { name: "Attaques", exact: true }).click();
  await page.getByPlaceholder("Chercher dans attaques...").fill("SPACIAL_REND");
  console.log("Cartes et responsive validés ; ouverture Move et Pokémon.");
  await page.getByRole("button", { name: /SPACIAL_REND/ }).first().click();
  await page.locator('[data-adventure-effect="ADVENTURE_EFFECT_SPACIAL_REND"]').waitFor();
  results.push({ moveDetail: true });
  await page.getByRole("button", { name: /Palkia/ }).first().click();
  await page.locator(".pokemon-detail-modal").waitFor();
  await page.locator(".pokemon-detail-modal").getByRole("button", { name: /Effets d’aventure/ }).click();
  await page.locator('.pokemon-detail-modal [data-adventure-effect="ADVENTURE_EFFECT_SPACIAL_REND"]').waitFor();
  await page.screenshot({ path: path.join(output, "pokemon-detail.png"), fullPage: true });
  const detail = await context.request.get(`${origin}/api/pokemon-admin?action=detail&key=${encodeURIComponent("form:data/pokemon/forms/0484-palkia-origin.json#PALKIA_ORIGIN")}`);
  assert.equal(detail.status(), 200);
  assert.match(await detail.text(), /ADVENTURE_EFFECT_SPACIAL_REND/);

  async function verifyPokedexDetail({ query, name, effectId = null }) {
    await page.goto(`${origin}/pokedex?q=${encodeURIComponent(query)}`, { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: "Fiches", exact: true }).waitFor({ timeout: 60000 });
    await page.getByRole("button", { name: "Ouvrir", exact: true }).first().click({ timeout: 60000 });
    const modal = page.locator(".pokemon-detail-modal");
    await modal.waitFor({ timeout: 60000 });
    assert.equal(await modal.getByRole("heading", { name, exact: true }).count(), 1);
    if (effectId) {
      await modal.getByRole("button", { name: "Effets d’aventure", exact: true }).click();
      await modal.locator(`[data-adventure-effect="${effectId}"]`).waitFor();
      assert.equal(await modal.getByText("Source et fiabilité", { exact: true }).count(), 0);
      assert.equal(await modal.evaluate((element) => element.scrollWidth <= element.clientWidth + 1), true);
      await modal.screenshot({ path: path.join(output, `${effectId}-pokemon-detail.png`) });
    } else {
      assert.equal(await modal.getByRole("button", { name: "Effets d’aventure", exact: true }).count(), 0);
      assert.equal(await modal.locator("[data-adventure-effect]").count(), 0);
    }
    await modal.getByRole("button", { name: "Fermer", exact: true }).click();
  }

  await verifyPokedexDetail({ query: "MEWTWO_MEGA_X", name: "Méga-Mewtwo X", effectId: "ADVENTURE_EFFECT_MEGA_MEWTWO_X" });
  await verifyPokedexDetail({ query: "MEWTWO_MEGA_Y", name: "Méga-Mewtwo Y", effectId: "ADVENTURE_EFFECT_MEGA_MEWTWO_Y" });
  await verifyPokedexDetail({ query: "data/pokemon/normal/0150-mewtwo.json", name: "Mewtwo" });
  results.push({ megaMewtwoXDetail: true, megaMewtwoYDetail: true, normalMewtwoIsolated: true });

  await page.goto(`${origin}/json-builder`, { waitUntil: "domcontentloaded" });
  await page.locator("[data-json-builder]").waitFor({ timeout: 60000 });
  await page.getByRole("button", { name: /Effet d’aventure/ }).click();
  await page.getByLabel("Sélectionner un effet existant").selectOption("ADVENTURE_EFFECT_MEGA_MEWTWO_X");
  await page.getByRole("button", { name: /Identité & relations/ }).click();
  await page.locator('[aria-label="pokemonRefs.0.formId"]').selectOption("MEWTWO_MEGA_X");
  await page.getByRole("button", { name: /Preview & création/ }).click();
  await page.getByRole("button", { name: "Calculer le dry-run" }).click();
  await page.getByText("OVERWRITE_PROTECTED", { exact: true }).first().waitFor({ timeout: 60000 });
  assert.match(await page.locator("pre code").innerText(), /"pokemonRefs": \[/);
  assert.match(await page.locator("pre code").innerText(), /"raw": null/);
  assert.equal(await page.getByRole("button", { name: "Créer et committer" }).isDisabled(), true);
  await page.screenshot({ path: path.join(output, "builder-dry-run.png"), fullPage: true });
  results.push({ builderPreview: true, overwriteProtected: true, writesPrevented: true });
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, "verification.json"), JSON.stringify({ origin, results, errors, ignoredExternalErrors }, null, 2));
  console.log(JSON.stringify({ origin, cards: results.filter((result) => result.id).length, themes: 2, viewports: 3, move: true, pokemonRelation: true, builder: true, errors, ignoredExternalErrors: ignoredExternalErrors.length }, null, 2));
} finally {
  await browser.close();
}
