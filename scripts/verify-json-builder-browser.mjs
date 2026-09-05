import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import nextEnv from "@next/env";
import { chromium } from "playwright";

const root = process.cwd();
nextEnv.loadEnvConfig(root);
const origin = process.env.JSON_BUILDER_BROWSER_ORIGIN || "http://localhost:3100";
const output = path.join(root, "test-results", "json-builder");
const credentials = {
  email: process.env.ADMIN_EMAIL || "matthieu@example.com",
  password: process.env.ADMIN_PASSWORD || "change-moi",
};

fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const httpErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().includes("/api/json-builder")) httpErrors.push(`${response.status()} ${response.url()}`);
  });

  await page.goto(`${origin}/login`, { waitUntil: "domcontentloaded" });
  const login = await context.request.post(`${origin}/api/session`, {
    form: { ...credentials, next: "/json-builder" },
    maxRedirects: 0,
    headers: { origin },
  });
  assert.equal(login.status(), 303);
  const [name, value] = login.headers()["set-cookie"].split(";", 1)[0].split("=");
  await context.addCookies([{ name, value, url: origin }]);

  const bootstrapResponse = await context.request.get(`${origin}/api/json-builder`);
  assert.equal(bootstrapResponse.status(), 200);
  const bootstrap = (await bootstrapResponse.json()).data;
  assert.ok(["WORKTREE", "main", "develop"].includes(bootstrap.contractSource.ref));
  assert.ok(["data-root", "local-develop", "github-develop", "github-cache"].includes(bootstrap.contractSource.source));
  assert.equal(bootstrap.writeMode.enabled, false);
  const values = structuredClone(bootstrap.templates.normal);
  Object.assign(values, {
    id: "BROWSERCHECKMON",
    formId: "BROWSERCHECKMON",
    baseFormId: "BROWSERCHECKMON",
    form: "normal",
    slug: "browsercheckmon",
    dexNr: 9995,
    dexId: "9995",
    regionId: "FUTURE",
    names: {
      English: "Browsercheckmon",
      German: "Browsercheckmon",
      French: "Browsercheckmon",
      Italian: "Browsercheckmon",
      Japanese: "Browsercheckmon",
      Korean: "Browsercheckmon",
      Spanish: "Browsercheckmon",
    },
  });
  const draft = {
    id: "browser-dry-run",
    name: "Validation navigateur sans écriture",
    updatedAt: new Date().toISOString(),
    entityType: "normal",
    values,
    states: { id: "automatic", formId: "automatic", baseFormId: "automatic", dexId: "automatic", pvpRef: "automatic", assetsRef: "automatic" },
    assets: { core: structuredClone(bootstrap.assetTemplates.core) },
    assetStates: { core: {} },
    options: { assetFamilies: [] },
  };

  await page.goto(`${origin}/json-builder`, { waitUntil: "domcontentloaded" });
  await page.evaluate((payload) => localStorage.setItem("matweb.pokemon.jsonBuilderDraft", JSON.stringify(payload)), draft);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("[data-json-builder]").waitFor({ timeout: 45_000 });
  await page.getByRole("heading", { name: "JSON Builder", exact: true, level: 1 }).waitFor();
  assert.equal(await page.locator("[data-nextjs-dialog]").count(), 0);
  assert.equal(await page.evaluate(() => document.body.innerText.trim().length > 500), true);
  await page.getByRole("button", { name: /Preview & création/ }).click();
  await page.getByRole("button", { name: "Calculer le dry-run" }).click();
  await page.getByText("BROWSERCHECKMON", { exact: true }).waitFor({ timeout: 45_000 });
  await page.getByText("Templates canoniques consommés", { exact: true }).waitFor();
  assert.equal(await page.getByText("Bloquants").locator("..").getByText("0", { exact: true }).count(), 1);
  assert.equal(await page.getByRole("button", { name: "Créer et committer" }).isDisabled(), true);
  await page.screenshot({ path: path.join(output, "desktop-preview.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("[data-json-builder]").waitFor({ timeout: 45_000 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await page.screenshot({ path: path.join(output, "mobile-wizard.png"), fullPage: true });

  assert.deepEqual(httpErrors, []);
  assert.deepEqual(consoleErrors, []);
  console.log("JSON Builder navigateur : contrat develop distant, wizard, dry-run, preview, sécurité écriture et responsive PASS");
} finally {
  await browser.close();
}
