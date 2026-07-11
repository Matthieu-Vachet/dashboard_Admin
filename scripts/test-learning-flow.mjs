import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import { chromium } from "playwright";

const root = process.cwd();
nextEnv.loadEnvConfig(root);

const mongoUri = process.env.DASHBOARD_MONGODB_URI || process.env.MONGODB_URI;
if (!mongoUri) throw new Error("MongoDB doit être configuré pour le test d’intégration learning.");

const databaseName = `jsp-e2e-${Date.now()}`;
const port = 3217;
const origin = `http://localhost:${port}`;
const email = "learning-e2e@example.com";
const password = "learning-e2e-password";
const nextBinary = path.join(root, "node_modules", ".bin", "next");
const template = JSON.parse(fs.readFileSync(path.join(root, "src/data/learning/template-topic.json"), "utf8"));
const topic = JSON.parse(JSON.stringify(template).replaceAll("topic-id", "integration-topic"));
topic.title = "Thème intégration JS Progress";
topic.description = "Version initiale du thème d’intégration.";
topic.theory.title = "Théorie intégration";
topic.exercises[0].title = "Exercice intégration";
topic.pseudocode[0].title = "Pseudo-code intégration";
topic.achievements[0].title = "Achievement intégration";

let server;
let browser;
let sessionCookie = "";
let serverOutput = "";
const mongo = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 7_000 });

function step(message) {
  console.log(`✓ ${message}`);
}

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/login`);
      if (response.ok) return;
    } catch {
      // Le serveur démarre encore.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Le serveur de test n’a pas démarré.\n${serverOutput.slice(-5_000)}`);
}

async function request(pathname, options = {}, expectedStatus = 200) {
  const response = await fetch(`${origin}${pathname}`, {
    ...options,
    headers: {
      cookie: sessionCookie,
      origin,
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  assert.equal(response.status, expectedStatus, `${pathname}: ${payload.error || response.statusText}`);
  return payload;
}

async function login() {
  const response = await fetch(`${origin}/api/session`, {
    method: "POST",
    redirect: "manual",
    headers: { origin, "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password, next: "/js-progress" }),
  });
  const failure = response.status === 303 ? "" : await response.text();
  assert.equal(response.status, 303, failure);
  sessionCookie = response.headers.get("set-cookie")?.split(";")[0] || "";
  assert.ok(sessionCookie.includes("matweb_dashboard_session="));
}

async function openTopic(page) {
  const heading = page.getByRole("heading", { name: topic.title, exact: true });
  await heading.waitFor();
  const card = heading.locator("xpath=ancestor::div[contains(@class,'glass-panel')][1]");
  await card.getByRole("button", { name: "Voir le détail" }).click();
  await page.getByRole("heading", { name: `Chapitre ${topic.chapterNumber} · ${topic.title}` }).waitFor();
  await page.getByRole("heading", { name: topic.theory.sections[0].title, exact: true }).waitFor();
}

try {
  await mongo.connect();
  server = spawn(nextBinary, ["dev", "--turbopack", "--port", String(port)], {
    cwd: root,
    env: {
      ...process.env,
      DASHBOARD_MONGODB_DB: databaseName,
      ADMIN_EMAIL: email,
      ADMIN_PASSWORD: password,
      SESSION_SECRET: "learning-e2e-session-secret",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });
  await waitForServer();
  await login();

  const emptyCatalog = await request("/api/learning/topics");
  assert.equal(emptyCatalog.data.source, "local");
  assert.equal(emptyCatalog.data.topics.length, 6);
  step("MongoDB vide : les six seeds locaux sont chargés");

  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const [cookieName, cookieValue] = sessionCookie.split("=");
  await context.addCookies([{ name: cookieName, value: cookieValue, url: origin }]);
  const page = await context.newPage();
  await page.goto(`${origin}/js-progress`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "JS Progress" }).waitFor();
  await page.getByRole("button", { name: "Importer un JSON" }).click();
  await page.locator('input[type="file"]').setInputFiles({
    name: "integration-topic.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(topic)),
  });
  await page.getByText("Aperçu validé").waitFor();
  step("Validation client du JSON réussie");
  const [importResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().endsWith("/api/learning/import") && response.request().method() === "POST"),
    page.getByRole("button", { name: "Confirmer l’import MongoDB" }).click(),
  ]);
  const importPayload = await importResponse.json().catch(() => ({}));
  assert.equal(importResponse.status(), 201, importPayload.error || "Import serveur refusé.");
  await page.getByText(/Import réussi/).waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("heading", { name: topic.title, exact: true }).waitFor();
  step("Import serveur réussi et thème visible immédiatement");

  const persistedCatalog = await request("/api/learning/topics");
  assert.equal(persistedCatalog.data.source, "mongodb");
  assert.ok(persistedCatalog.data.topics.some((item) => item.id === topic.id));
  step("Après relecture, le thème provient toujours de MongoDB");

  const exerciseId = topic.exercises[0].id;
  const pseudocodeId = topic.pseudocode[0].id;
  const startedExercise = await request("/api/learning/progress", {
    method: "PUT",
    body: JSON.stringify({ itemId: exerciseId, status: "in_progress" }),
  });
  assert.equal(startedExercise.data.progress.status, "in_progress");
  assert.equal(startedExercise.data.progress.earnedXp, 0);
  assert.ok(startedExercise.data.progress.startedAt);
  step("Exercice démarré sans XP et avec startedAt");

  await request("/api/learning/progress", {
    method: "PUT",
    body: JSON.stringify({ itemId: pseudocodeId, status: "in_progress" }),
  });

  await page.reload({ waitUntil: "networkidle" });
  await openTopic(page);
  const pseudoArticle = page.getByRole("heading", { name: topic.pseudocode[0].title }).locator("xpath=ancestor::article[1]");
  page.once("dialog", (dialog) => dialog.accept());
  await pseudoArticle.getByRole("button", { name: "Voir la correction" }).click();
  await pseudoArticle.getByText("Correction consultée", { exact: true }).waitFor();
  step("Correction confirmée et consultation enregistrée sans XP");

  const emptyAnswer = await request("/api/learning/progress", {
    method: "PUT",
    body: JSON.stringify({ itemId: pseudocodeId, answer: "   " }),
  }, 400);
  assert.match(emptyAnswer.error, /Réponse vide/);
  step("Réponse vide refusée explicitement");

  const answer = "SI la valeur est valide\n  RETOURNER vrai";
  await pseudoArticle.getByRole("textbox", { name: "ZONE DE RÉDACTION" }).fill(answer);
  await pseudoArticle.getByRole("button", { name: "Enregistrer" }).click();
  await page.getByText(/Sauvegarde réussie/).waitFor();
  step("Réponse de pseudo-code sauvegardée dans learning_progress");

  await page.reload({ waitUntil: "networkidle" });
  await openTopic(page);
  const restoredPseudo = page.getByRole("heading", { name: topic.pseudocode[0].title }).locator("xpath=ancestor::article[1]");
  assert.equal(await restoredPseudo.getByRole("textbox", { name: "ZONE DE RÉDACTION" }).inputValue(), answer);
  step("Réponse restaurée après rafraîchissement");
  await page.keyboard.press("Escape");
  await page.getByRole("heading", { name: `Chapitre ${topic.chapterNumber} · ${topic.title}` }).waitFor({ state: "detached" });
  await page.keyboard.press("Tab");
  assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), "BODY");
  step("Navigation clavier et fermeture Échap validées");

  await openTopic(page);
  const exerciseArticle = page.getByRole("heading", { name: topic.exercises[0].title }).locator("xpath=ancestor::article[1]");
  page.once("dialog", (dialog) => dialog.accept());
  await exerciseArticle.getByRole("button", { name: "Terminer" }).click();
  await exerciseArticle.getByRole("button", { name: "Terminé" }).waitFor();
  step("Confirmation de fin validée dans l’interface");

  const completedCatalog = await request("/api/learning/topics");
  const completedProgress = completedCatalog.data.progress[exerciseId];
  assert.equal(completedProgress.status, "completed");
  assert.equal(completedProgress.earnedXp, topic.exercises[0].xp);
  assert.ok(completedProgress.completedAt);

  const duplicateCompletion = await request("/api/learning/progress", {
    method: "PUT",
    body: JSON.stringify({ itemId: exerciseId, status: "completed" }),
  });
  assert.equal(duplicateCompletion.data.xpAwarded, 0);
  assert.equal(duplicateCompletion.data.progress.earnedXp, topic.exercises[0].xp);
  assert.ok(duplicateCompletion.data.messages.includes("XP déjà attribuée."));

  const activity = await request("/api/learning/activity");
  assert.equal(activity.data.activity.filter((item) => item.itemId === exerciseId && item.action === "completed").length, 1);
  assert.equal(activity.data.activity.filter((item) => item.itemId === exerciseId && item.action === "started").length, 1);
  step("XP attribuée une seule fois et historique idempotent");

  await page.reload({ waitUntil: "networkidle" });
  const achievementHeading = page.getByRole("heading", { name: topic.achievements[0].title });
  const achievementCard = achievementHeading.locator("xpath=ancestor::div[contains(@class,'glass-panel')][1]");
  await achievementCard.getByText("Débloqué", { exact: true }).waitFor();
  step("Achievement recalculé et débloqué");

  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  step("Responsive mobile 390 px sans débordement horizontal");

  const mergedTopic = structuredClone(topic);
  mergedTopic.description = "Version fusionnée du thème d’intégration.";
  mergedTopic.theory.sections[0].title = "Définition V2";
  const merged = await request("/api/learning/import", {
    method: "POST",
    body: JSON.stringify({ topic: mergedTopic, strategy: "merge", fileName: "integration-topic-v2.json" }),
  }, 201);
  const afterMerge = await request("/api/learning/topics");
  assert.equal(afterMerge.data.topics.find((item) => item.id === topic.id).description, mergedTopic.description);
  assert.equal(afterMerge.data.progress[exerciseId].earnedXp, topic.exercises[0].xp);
  assert.equal(afterMerge.data.progress[pseudocodeId].answer, answer);
  step("Fusion de contenu réussie sans perte de progression");

  await request(`/api/learning/imports/${merged.data.importId}/rollback`, { method: "POST" });
  const afterRollback = await request("/api/learning/topics");
  assert.equal(afterRollback.data.topics.find((item) => item.id === topic.id).description, topic.description);
  assert.equal(afterRollback.data.progress[exerciseId].earnedXp, topic.exercises[0].xp);
  assert.equal(afterRollback.data.progress[pseudocodeId].answer, answer);
  assert.equal(afterRollback.data.progress[pseudocodeId].correctionViewed, true);
  step("Rollback du contenu réussi avec progression intacte");

  console.log("\nScénario JS Progress V2 complet : SUCCÈS");
} finally {
  if (browser) await browser.close().catch(() => {});
  if (server && !server.killed) {
    server.kill("SIGTERM");
    await new Promise((resolve) => {
      server.once("exit", resolve);
      setTimeout(resolve, 3_000);
    });
  }
  await mongo.db(databaseName).dropDatabase().catch(() => {});
  await mongo.close().catch(() => {});
}
