import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  executeGlobalRegenerationStep,
  globalRegenerationDefinitions,
} from "../src/lib/admin-pokemon-global-regeneration";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const matrix = JSON.parse(fs.readFileSync(path.join(root, "tests/fixtures/regeneration-pipeline-matrix.json"), "utf8"));

test("chaque régénération possède une preuve de production ou une validation explicitement en attente", () => {
  assert.equal(matrix.environment, "production");
  assert.equal(matrix.execution.mode, "dashboard-sequential");
  assert.equal(matrix.execution.consoleErrors, 0);
  assert.equal(matrix.execution.gitCommitOrDispatch, false);
  assert.deepEqual(
    [...matrix.pipelines.map((pipeline: { id: string }) => pipeline.id), ...matrix.pendingProductionValidation].sort(),
    globalRegenerationDefinitions.map((definition) => definition.id).sort(),
  );
  for (const id of matrix.pendingProductionValidation) assert.ok(!matrix.pipelines.some((pipeline: { id: string }) => pipeline.id === id), `${id}: ne pas déclarer une validation en attente comme preuve de production`);
});

test("chaque pipeline documente le contrat complet demandé par le lot 8", () => {
  const required = ["source", "preview", "network", "parsing", "writing", "toast", "refresh", "target", "commitDispatch", "result", "diagnostics"];
  for (const pipeline of matrix.pipelines) {
    for (const field of required) assert.ok(pipeline[field], `${pipeline.id}: ${field} absent`);
    assert.match(pipeline.result, /^pass/);
    assert.equal(pipeline.commitDispatch, "non applicable");
  }
});

test("les parcours critiques conservent leurs preuves de production", () => {
  const byId = Object.fromEntries(matrix.pipelines.map((pipeline: { id: string }) => [pipeline.id, pipeline]));
  assert.match(byId.rocket.preview, /26 trainers/);
  assert.equal(byId.pvp.diagnostics.mappingMissingCount, 0);
  assert.equal(byId.pvp.diagnostics.unmatchedCount, 0);
  assert.match(byId.pvp.diagnostics.warning, /volcarona sans Rank 1/);
  assert.equal(byId["best-defenders"].diagnostics.code, "SOURCE_PROTECTED");
  assert.equal(byId["best-defenders"].diagnostics.preserved, true);
  assert.match(byId.eggs.preview, /76/);
  assert.match(byId.research.preview, /59/);
  assert.equal(byId.events.diagnostics.archivePreserved, true);
});

test("un sourceRun Events partiel est reflété dans la matrice globale", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({
    success: true,
    data: {
      eventsParsed: 39,
      sourceRun: {
        status: "partial",
        changed: true,
        unmatchedCount: 126,
        warningsCount: 0,
        errorsCount: 0,
        totalAfter: 39,
      },
    },
  }), { status: 200, headers: { "content-type": "application/json" } });
  try {
    const result = await executeGlobalRegenerationStep({ id: "events", label: "Calendrier Events", endpoint: "/api/admin/events/scrape" });
    assert.equal(result.status, "partial");
    assert.match(result.summary || "", /126 avertissement/);
    assert.equal(result.diagnostics?.status, "partial");
    assert.equal(result.diagnostics?.unmatchedCount, 126);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Best Defenders classe SOURCE_PROTECTED en avertissement avec snapshot conservé", async () => {
  const originalFetch = globalThis.fetch;
  let request = 0;
  globalThis.fetch = async () => {
    request += 1;
    if (request === 1) {
      return new Response(JSON.stringify({ error: "HTTP 403 · protection Cloudflare active" }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({
      data: {
        current: {
          diagnostics: {
            sourceAvailability: {
              code: "SOURCE_PROTECTED",
              message: "Protection Cloudflare active",
              httpStatus: 403,
              challenge: true,
            },
          },
        },
      },
    }), { status: 200, headers: { "content-type": "application/json" } });
  };
  try {
    const result = await executeGlobalRegenerationStep({ id: "best-defenders", label: "Best Defenders", action: "regenerate-best-defenders" });
    assert.equal(result.status, "partial");
    assert.match(result.summary || "", /SOURCE_PROTECTED/);
    assert.equal(result.diagnostics?.preserved, true);
    assert.equal(result.diagnostics?.httpStatus, 403);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Best Defenders notifie le snapshot protégé sans faux succès", () => {
  const source = fs.readFileSync(path.join(root, "src/components/admin/pokemon/best-defenders-panel.jsx"), "utf8");
  assert.match(source, /toast\.warning\(`\$\{issue\.code\}/);
  assert.match(source, /dernier snapshot MongoDB validé reste actif/);
  assert.match(source, /load\(\{ notify: true \}\)/);
  assert.match(source, /toast\.error\(message\)/);
});
