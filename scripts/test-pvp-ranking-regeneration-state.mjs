import assert from "node:assert/strict";
import test from "node:test";
import {
  createPvpRankingRegenerationState,
  normalizePvpRankingRegeneration,
  pvpRankingRegenerationMessage,
  pvpRankingRegenerationToast,
} from "../src/lib/pvp-ranking-regeneration-state.mjs";

test("idle et running sont des états explicites", () => {
  assert.equal(createPvpRankingRegenerationState().status, "idle");
  assert.equal(normalizePvpRankingRegeneration({ status: "running" }).status, "running");
});

test("une synchronisation complète produit un succès chiffré", () => {
  const state = normalizePvpRankingRegeneration({
    status: "success",
    totalAfter: 20_436,
    unmatchedCount: 0,
    warningsCount: 0,
  });
  assert.equal(state.status, "success");
  assert.match(pvpRankingRegenerationMessage(state), /20[\s\u202f]436 classements générés/);
  assert.equal(pvpRankingRegenerationToast(state)?.kind, "success");
});

test("partial reste un succès métier explicite avec son rapport", () => {
  const state = normalizePvpRankingRegeneration({
    status: "partial",
    totalAfter: 20_436,
    ignoredCount: 0,
    mappingMissingCount: 148,
    warningsCount: 150,
  });
  assert.deepEqual(
    {
      status: state.status,
      generated: state.generatedCount,
      ignored: state.ignoredCount,
      missing: state.mappingMissingCount,
      warnings: state.warningCount,
      report: state.reportAvailable,
    },
    { status: "partial", generated: 20_436, ignored: 0, missing: 148, warnings: 150, report: true },
  );
  assert.match(pvpRankingRegenerationMessage(state), /148 MAPPING_MISSING, 150 WARNING/);
  assert.equal(pvpRankingRegenerationToast(state)?.kind, "warning");
});

test("un état unchanged avec mappings manquants reste partiel", () => {
  const state = normalizePvpRankingRegeneration({
    status: "unchanged",
    totalAfter: 20_436,
    unmatchedCount: 148,
    warningsCount: 150,
  });
  assert.equal(state.status, "partial");
  assert.equal(state.unchanged, true);
});

test("source indisponible et erreur bloquante restent failed", () => {
  for (const message of ["PvPoke indisponible", "Payload de staging absent"]) {
    const state = normalizePvpRankingRegeneration({ status: "failed", errors: [{ message }] });
    assert.equal(state.status, "failed");
    assert.equal(state.message, message);
    assert.equal(pvpRankingRegenerationToast(state)?.kind, "error");
  }
});

test("cancelled ne se confond ni avec partial ni avec failed", () => {
  const state = normalizePvpRankingRegeneration({ status: "cancelled" });
  assert.equal(state.status, "cancelled");
  assert.equal(pvpRankingRegenerationToast(state)?.kind, "warning");
});
