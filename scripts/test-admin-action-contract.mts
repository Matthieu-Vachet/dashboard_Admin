import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  AdminActionError,
  normalizeActionError,
  readAdminActionResponse,
} from "../src/lib/admin-action-errors.ts";
import { executeAdminAction, type AdminActionStatus } from "../src/lib/admin-action-executor.ts";
import { logAdminOperation } from "../src/lib/admin-action-observability.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function componentSources(directory: string): Array<{ file: string; source: string }> {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return componentSources(absolute);
    return /\.(?:jsx?|tsx?)$/.test(entry.name)
      ? [{ file: path.relative(root, absolute), source: fs.readFileSync(absolute, "utf8") }]
      : [];
  });
}

test("normalise les erreurs chaîne, Error et API imbriquées sans [object Object]", () => {
  const cases = [
    ["Synchronisation refusée", "ADMIN_ACTION_FAILED", "Synchronisation refusée"],
    [new Error("Connexion MongoDB indisponible"), "ADMIN_ACTION_FAILED", "Connexion MongoDB indisponible"],
    [{ error: { code: "ASSET_REFERENCE_BROKEN", message: "Référence asset introuvable", details: { path: "data/assets/core" } }, requestId: "req-1" }, "ASSET_REFERENCE_BROKEN", "Référence asset introuvable"],
    [{ status: 422, errors: [{ code: "VALIDATION_FAILED", message: "Catalogue invalide" }] }, "HTTP_422", "Catalogue invalide"],
  ] as const;

  for (const [input, code, message] of cases) {
    const normalized = normalizeActionError(input);
    assert.equal(normalized.code, code);
    assert.equal(normalized.message, message);
    assert.doesNotMatch(normalized.message, /\[object Object\]/);
  }
});

test("remplace une représentation objet inutilisable par le message de repli", () => {
  assert.deepEqual(normalizeActionError("[object Object]", "Action impossible."), {
    code: "ADMIN_ACTION_FAILED",
    message: "Action impossible.",
  });
});

test("interdit les erreurs API brutes et objets inconnus dans les toasts Admin", () => {
  for (const { file, source } of componentSources(path.join(root, "src/components/admin"))) {
    assert.doesNotMatch(source, /new Error\(\s*(?:payload|result|report)\.error/, file);
    assert.doesNotMatch(source, /toast\.error\(\s*(?:error|caught|payload\.error|result\.error|report\.error)\s*[,)]/, file);
    assert.doesNotMatch(source, /String\(error\)/, file);
  }
});

test("lit le contrat d’erreur HTTP structuré et conserve code, détails et statut", async () => {
  const response = new Response(JSON.stringify({
    success: false,
    error: { code: "CANONICAL_SYNC_FAILED", message: "Le graphe canonique est invalide.", details: { count: 3 } },
  }), { status: 409, headers: { "content-type": "application/json" } });

  await assert.rejects(
    readAdminActionResponse(response),
    (error) => error instanceof AdminActionError
      && error.code === "CANONICAL_SYNC_FAILED"
      && error.status === 409
      && (error.details as { count: number }).count === 3,
  );
});

test("l’exécuteur publie les états running puis success avec un operationId stable", async () => {
  const states: Array<{ status: AdminActionStatus; operationId: string | null }> = [];
  const result = await executeAdminAction({
    action: "catalog-sync",
    operation: async ({ operationId }) => ({ success: true, operationId }),
    onState: ({ status, operationId }) => states.push({ status, operationId }),
  });

  assert.deepEqual(states.map((state) => state.status), ["running", "success"]);
  assert.ok(result.operationId.startsWith("catalog-sync-"));
  assert.equal(states[0].operationId, result.operationId);
  assert.equal(states[1].operationId, result.operationId);
});

test("le log opérationnel contient provider, début, fin, durée, statut et errorCode", () => {
  const original = console.error;
  console.error = () => undefined;
  try {
    const entry = logAdminOperation({
      operationId: "community-days-test-12345678",
      action: "community-days-sync",
      provider: "pogoapi",
      phase: "failed",
      startedAt: Date.now() - 12,
      durationMs: 12,
      error: { code: "PROVIDER_HTTP_403", message: "Source refusée." },
    });
    assert.equal(entry.provider, "pogoapi");
    assert.equal(entry.status, "failed");
    assert.equal(entry.errorCode, "PROVIDER_HTTP_403");
    assert.equal(entry.durationMs, 12);
    assert.ok(entry.start);
    assert.ok(entry.end);
  } finally {
    console.error = original;
  }
});

test("l’exécuteur transforme tout abort de délai en erreur stable et état failed", async () => {
  const states: AdminActionStatus[] = [];
  await assert.rejects(
    executeAdminAction({
      action: "events-sync",
      timeoutMs: 5,
      operation: ({ signal }) => new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")), { once: true });
      }),
      onState: ({ status }) => states.push(status),
    }),
    (error) => error instanceof AdminActionError && error.code === "ADMIN_ACTION_TIMEOUT",
  );
  assert.deepEqual(states, ["running", "failed"]);
});
