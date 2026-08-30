import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import nextEnv from "@next/env";
import { chromium } from "playwright";
import { pokemonSectionRoutes } from "../src/data/pokemon-routes.ts";

const root = process.cwd();
nextEnv.loadEnvConfig(root);
const port = 3221;
const origin = `http://localhost:${port}`;
const outputDirectory = path.join(root, "test-results", "dashboard-split-pokemon");
const credentials = {
  email: process.env.ADMIN_EMAIL || "matthieu@example.com",
  password: process.env.ADMIN_PASSWORD || "change-moi",
};
const hasPrivateApiSecret = Boolean(process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET);
const privateActions = [
  "action=identity-manager-diagnostics",
  "action=identity-manager-conflicts",
  "action=pokemon-identity-mappings",
];

let server;
let browser;
let serverOutput = "";

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(`${origin}/login`)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Serveur indisponible.\n${serverOutput.slice(-4_000)}`);
}

try {
  fs.mkdirSync(outputDirectory, { recursive: true });
  server = spawn(path.join(root, "node_modules/.bin/next"), ["start", "-p", String(port)], {
    cwd: root,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk; });
  server.stderr.on("data", (chunk) => { serverOutput += chunk; });
  await waitForServer();

  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const httpErrors = [];
  const handledHttpWarnings = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() < 400) return;
    const detail = `${response.status()} ${response.url()}`;
    if (response.status() === 410 && response.url().includes("action=best-defenders")) {
      handledHttpWarnings.push(detail);
      return;
    }
    if (
      response.status() === 500
      && !hasPrivateApiSecret
      && privateActions.some((action) => response.url().includes(action))
    ) {
      handledHttpWarnings.push(detail);
      return;
    }
    httpErrors.push(detail);
  });

  await page.goto(origin, { waitUntil: "domcontentloaded" });
  assert.match(page.url(), /\/login/);
  const loginResponse = await context.request.post(`${origin}/api/session`, {
    form: { ...credentials, next: "/" },
    maxRedirects: 0,
    headers: { origin },
  });
  assert.equal(loginResponse.status(), 303);
  const [name, value] = loginResponse.headers()["set-cookie"].split(";", 1)[0].split("=");
  await context.addCookies([{ name, value, url: origin }]);

  for (const section of pokemonSectionRoutes) {
    const errorCount = httpErrors.length;
    await page.goto(`${origin}${section.path}`, { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: section.label, exact: true, level: 1 }).waitFor({ timeout: 20_000 });
    await page.waitForTimeout(150);
    assert.equal(await page.locator("[data-nextjs-dialog]").count(), 0, section.path);
    assert.equal(await page.evaluate(() => document.body.innerText.trim().length > 50), true, section.path);
    assert.deepEqual(httpErrors.slice(errorCount), [], `${section.path}: ${httpErrors.slice(errorCount).join(", ")}`);
  }

  await page.goto(`${origin}/pokemon-admin?section=pvp-rankings&q=azumarill`, { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\/pvp-rankings\?q=azumarill/);

  const storeResponse = await page.request.get(`${origin}/api/dashboard-store?key=matweb.pokemon.collections`);
  assert.equal(storeResponse.status(), 200);
  assert.equal((await storeResponse.json()).data.configured, true);

  await page.goto(origin, { waitUntil: "domcontentloaded" });
  await page.getByText("Voici ce qui demande votre attention aujourd’hui.").waitFor({ timeout: 30_000 });
  await page.getByRole("button", { name: "Changer le thème" }).click();
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outputDirectory, "desktop-home-theme.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.getByRole("dialog", { name: "Navigation principale" }).waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDirectory, "mobile-navigation.png"), fullPage: true });
  await page.keyboard.press("Escape");
  await page.getByRole("dialog", { name: "Navigation principale" }).waitFor({ state: "detached" });

  const unexpectedConsoleErrors = consoleErrors.filter(
    (message) => !(
      (handledHttpWarnings.some((warning) => warning.startsWith("410 ")) && message.includes("status of 410"))
      || (handledHttpWarnings.some((warning) => warning.startsWith("500 ")) && message.includes("status of 500"))
    ),
  );
  assert.deepEqual(unexpectedConsoleErrors, [], httpErrors.join("\n"));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/account`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Déconnexion" }).click();
  await page.waitForURL(/\/login/);
  console.log(`Dashboard Pokémon navigateur : ${pokemonSectionRoutes.length} routes, redirection, auth, Mongo, thèmes et mobile PASS`);
} finally {
  await browser?.close().catch(() => {});
  if (server && !server.killed) server.kill("SIGTERM");
}
