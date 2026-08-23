import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  createPvpRankingRegenerationState,
  normalizePvpRankingRegeneration,
  normalizePvpRankingWarnings,
  pvpRankingRegenerationMessage,
  pvpRankingRegenerationToast,
} from "../src/lib/pvp-ranking-regeneration-state.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

test("les deux warnings PvP courants exposent code, entité, raison, impact et action", () => {
  const warnings = normalizePvpRankingWarnings([
    "bayou-1500: volcarona sans Rank 1 calculable.",
    "1 entrees avec attaque non matchee: none (1).",
  ]);

  assert.deepEqual(
    warnings.map(({ code, entity, informational }) => ({ code, entity, informational })),
    [
      {
        code: "RANK1_INELIGIBLE_AT_SOURCE_LEVEL_FLOOR",
        entity: "Volcarona · bayou-1500",
        informational: false,
      },
      {
        code: "MOVE_UNMATCHED:none",
        entity: "Unown · great (Ligue Super · 1 500 PC)",
        informational: true,
      },
    ],
  );
  for (const warning of warnings) {
    assert.ok(warning.reason);
    assert.ok(warning.impact);
    assert.ok(warning.action);
  }
  assert.match(warnings[0].reason, /niveau source minimal à 20/);
  assert.match(warnings[0].reason, /1 822 PC/);
  assert.match(warnings[1].reason, /sentinelle « none »/);
  assert.match(warnings[1].impact, /Aucun impact métier/);
});

test("une sentinelle provider seule ne dégrade plus un succès en PARTIAL", () => {
  const state = normalizePvpRankingRegeneration({
    status: "partial",
    totalAfter: 1_145,
    mappingMissingCount: 0,
    warnings: ["1 entrees avec attaque non matchee: none (1)."],
  });
  assert.equal(state.status, "success");
  assert.equal(state.warningCount, 1);
  assert.equal(state.actionableWarningCount, 0);
  assert.equal(state.warningDetails[0].informational, true);
});

test("Volcarona maintient PARTIAL et le résumé distingue l'information provider", () => {
  const state = normalizePvpRankingRegeneration({
    status: "partial",
    totalAfter: 20_442,
    ignoredCount: 0,
    mappingMissingCount: 0,
    warningsCount: 2,
    diagnostics: {
      warnings: [
        "bayou-1500: volcarona sans Rank 1 calculable.",
        "1 entrees avec attaque non matchee: none (1).",
      ],
    },
  });
  assert.equal(state.status, "partial");
  assert.equal(state.warningCount, 2);
  assert.equal(state.actionableWarningCount, 1);
  assert.equal(state.warningDetails.length, 2);
  assert.match(pvpRankingRegenerationMessage(state), /2 WARNING \(1 avec impact, 1 informatif\)/);
});

test("Détails et Voir le rapport rendent les avertissements structurés", () => {
  const component = fs.readFileSync(
    path.join(root, "src/components/admin/pokemon/current-dataset-diagnostics.jsx"),
    "utf8",
  );
  assert.match(component, /Pourquoi ce statut PARTIAL/);
  assert.match(component, /Avertissements expliqués/);
  assert.match(component, /data-warning-code/);
  for (const label of ["Raison", "Impact", "Action"]) assert.match(component, new RegExp(`\"${label}\"`));
  assert.match(component, /warningDetails: currentPvpWarnings/);
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
