import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  assertCompleteRegeneration,
  RegenerationTimeoutError,
  resetRegenerationNotificationsForTests,
  runRegenerationWithToast,
} from "../src/lib/admin-regeneration-notifications.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function notifierSpy() {
  const calls = { loading: [], success: [], error: [] };
  return {
    calls,
    loading(message) { calls.loading.push(message); return "toast-1"; },
    success(message, options) { calls.success.push({ message, options }); },
    error(message, options) { calls.error.push({ message, options }); },
  };
}

test.beforeEach(() => resetRegenerationNotificationsForTests());

test("succès: remplace le toast pending après invalidation", async () => {
  const notifier = notifierSpy();
  let invalidations = 0;
  await runRegenerationWithToast({
    key: "costume-success",
    operation: async () => ({ success: true, data: { count: 42 } }),
    invalidate: async () => { invalidations += 1; },
    notifier,
    successMessage: (payload) => `${payload.data.count} costumes régénérés.`,
  });
  assert.equal(invalidations, 1);
  assert.equal(notifier.calls.loading.length, 1);
  assert.deepEqual(notifier.calls.success, [{ message: "42 costumes régénérés.", options: { id: "toast-1" } }]);
  assert.equal(notifier.calls.error.length, 0);
});

test("double clic: mutualise mutation, invalidation et toast", async () => {
  const notifier = notifierSpy();
  let mutations = 0;
  let invalidations = 0;
  const options = {
    key: "events-double-click",
    operation: async () => { mutations += 1; await new Promise((resolve) => setTimeout(resolve, 15)); return { success: true }; },
    invalidate: async () => { invalidations += 1; },
    notifier,
  };
  await Promise.all([runRegenerationWithToast(options), runRegenerationWithToast(options)]);
  assert.equal(mutations, 1);
  assert.equal(invalidations, 1);
  assert.equal(notifier.calls.loading.length, 1);
  assert.equal(notifier.calls.success.length, 1);
});

test("échec partiel: refuse le toast positif et expose l’erreur", async () => {
  const notifier = notifierSpy();
  let invalidations = 0;
  await assert.rejects(
    runRegenerationWithToast({
      key: "events-partial",
      operation: async () => ({ success: true, data: { status: "partial-failure", errors: [{ message: "2 events non persistés" }] } }),
      invalidate: async () => { invalidations += 1; },
      notifier,
      errorMessage: "Régénération Events impossible.",
    }),
    /2 events non persistés/,
  );
  assert.equal(invalidations, 0);
  assert.equal(notifier.calls.success.length, 0);
  assert.match(notifier.calls.error[0].message, /2 events non persistés/);
});

test("timeout: annule le signal et remplace le toast par une erreur explicite", async () => {
  const notifier = notifierSpy();
  let aborted = false;
  await assert.rejects(
    runRegenerationWithToast({
      key: "costume-timeout",
      operation: (signal) => new Promise((resolve, reject) => {
        signal.addEventListener("abort", () => { aborted = true; reject(new Error("aborted")); }, { once: true });
      }),
      notifier,
      timeoutMs: 10,
      errorMessage: "Régénération Costume impossible.",
    }),
    RegenerationTimeoutError,
  );
  assert.equal(aborted, true);
  assert.equal(notifier.calls.success.length, 0);
  assert.match(notifier.calls.error[0].message, /Délai d’attente dépassé/);
});

test("une invalidation en erreur ne produit jamais de faux succès", async () => {
  const notifier = notifierSpy();
  await assert.rejects(
    runRegenerationWithToast({
      key: "reload-failure",
      operation: async () => ({ success: true }),
      invalidate: async () => { throw new Error("Actualisation impossible"); },
      notifier,
    }),
    /Actualisation impossible/,
  );
  assert.equal(notifier.calls.success.length, 0);
  assert.equal(notifier.calls.error.length, 1);
});

test("le contrat détecte aussi les compteurs d’erreur imbriqués", () => {
  assert.throws(() => assertCompleteRegeneration({ data: { success: true, data: { failed: 1 } } }), /échoué/);
});

test("Events utilise le contrat de notification partagé", () => {
  const events = fs.readFileSync(path.join(root, "src/components/admin/events/events-calendar-panel.jsx"), "utf8");
  assert.match(events, /runRegenerationWithToast\(\{[\s\S]*key: "events-scrape"/);
  assert.match(events, /signal,/);
});
