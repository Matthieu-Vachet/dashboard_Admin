import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  acknowledgeSourceWatchChanges,
  adventureEffectSemanticDiff,
  applySourceWatchCheck,
  emptySourceWatchState,
  sourceMonitoringState,
  sourceWatchSummary,
} from "../src/lib/source-watch-alerts.ts";

const checkedAt = (minute: number) => `2026-09-01T10:${String(minute).padStart(2, "0")}:00.000Z`;
const source = (id: string, signature: string, overrides = {}) => ({
  id,
  name: `Source ${id}`,
  provider: "Provider canonique",
  category: "reference",
  status: "ok",
  signature,
  version: signature,
  commit: signature,
  ...overrides,
});

test("une première vérification puis une empreinte inchangée ne créent aucune alerte", () => {
  const baseline = applySourceWatchCheck(emptySourceWatchState(), {
    checkedAt: checkedAt(0),
    sources: [source("a", "sha-a1")],
  });
  assert.equal(baseline.events.length, 0);
  assert.equal(baseline.summary.unreadCount, 0);
  assert.equal(baseline.sources[0].monitoringState, "up-to-date");

  const unchanged = applySourceWatchCheck(baseline.state, {
    checkedAt: checkedAt(1),
    sources: [source("a", "sha-a1")],
  });
  assert.equal(unchanged.events.length, 0);
  assert.equal(unchanged.summary.unreadCount, 0);
});

test("un vrai changement reste non lu après rafraîchissement jusqu’à son acquittement", () => {
  const baseline = applySourceWatchCheck(emptySourceWatchState(), {
    checkedAt: checkedAt(0),
    sources: [source("a", "sha-a1")],
  });
  const changed = applySourceWatchCheck(baseline.state, {
    checkedAt: checkedAt(2),
    sources: [source("a", "sha-a2")],
  });
  assert.equal(changed.events.length, 1);
  assert.equal(changed.summary.unreadCount, 1);
  assert.equal(changed.sources[0].monitoringState, "changed");
  assert.equal(changed.sources[0].previousSignature, "sha-a1");
  assert.equal(changed.sources[0].currentSignature, "sha-a2");

  const refreshed = applySourceWatchCheck(changed.state, {
    checkedAt: checkedAt(3),
    sources: [source("a", "sha-a2")],
  });
  assert.equal(refreshed.events.length, 0);
  assert.equal(refreshed.summary.unreadCount, 1);
  assert.equal(refreshed.sources[0].monitoringState, "changed");

  const acknowledged = acknowledgeSourceWatchChanges(refreshed.state, ["a"], checkedAt(4));
  assert.deepEqual(acknowledged.acknowledgedSourceIds, ["a"]);
  assert.equal(acknowledged.summary.unreadCount, 0);
  assert.equal(sourceMonitoringState(acknowledged.state.sources.a), "up-to-date");
  assert.equal(changed.events.length, 1, "l’historique produit avant acquittement reste intact");

  const changedAgain = applySourceWatchCheck(acknowledged.state, {
    checkedAt: checkedAt(5),
    sources: [source("a", "sha-a3")],
  });
  assert.equal(changedAgain.summary.unreadCount, 1);
  assert.equal(changedAgain.events.length, 1);
  assert.equal(changedAgain.sources[0].previousSignature, "sha-a2");
});

test("trois sources modifiées produisent exactement un badge non lu de 3", () => {
  const baseline = applySourceWatchCheck(emptySourceWatchState(), {
    checkedAt: checkedAt(0),
    sources: [source("a", "a1"), source("b", "b1"), source("c", "c1")],
  });
  const changed = applySourceWatchCheck(baseline.state, {
    checkedAt: checkedAt(6),
    sources: [source("a", "a2"), source("b", "b2"), source("c", "c2")],
  });
  assert.equal(sourceWatchSummary(changed.state).unreadCount, 3);
  assert.equal(changed.changedSources.length, 3);
});

test("une erreur provider est distincte d’un changement et conserve la dernière empreinte valide", () => {
  const baseline = applySourceWatchCheck(emptySourceWatchState(), {
    checkedAt: checkedAt(0),
    sources: [source("pvpoke", "sha-ok")],
  });
  const failed = applySourceWatchCheck(baseline.state, {
    checkedAt: checkedAt(7),
    sources: [source("pvpoke", "ignored-error-signature", {
      status: "warning",
      message: "Source distante temporairement indisponible (HTTP 503).",
    })],
  });
  assert.equal(failed.events.length, 0);
  assert.equal(failed.summary.unreadCount, 0);
  assert.equal(failed.summary.errorCount, 1);
  assert.equal(failed.sources[0].monitoringState, "error");
  assert.equal(failed.sources[0].currentSignature, "sha-ok");
});

test("une source sans contrôle expose explicitement l’état jamais vérifiée", () => {
  assert.equal(sourceMonitoringState(undefined), "never-checked");
});

function adventureSnapshot(overrides: Record<string, unknown> = {}) {
  return {
    effects: {
      ADVENTURE_EFFECT_BEHEMOTH_BLADE: {
        label: "Gladius Maximus",
        localization: { fr: { name: "Gladius Maximus", description: "Attaque renforcée" } },
        pokemonRefs: ["ZACIAN_CROWNED_SWORD"],
        cost: { candy: 5, stardust: 5000 },
        duration: { durationSeconds: 360, extraDurationSeconds: 4 },
        bonusEffects: { attackMultiplier: 1.1 },
        assets: { banner: "blade.png", portrait: "zacian.png" },
        ...overrides,
      },
    },
  };
}

test("le diff sémantique Adventure Effects couvre ajout, retrait, traduction, coût, durée, bonus et asset", () => {
  const baseline = adventureSnapshot();
  assert.deepEqual(adventureEffectSemanticDiff(baseline, structuredClone(baseline)), []);

  const modified = adventureSnapshot({
    localization: { fr: { name: "Gladius Maximus", description: "Nouvelle traduction" } },
    cost: { candy: 6, stardust: 5000 },
    duration: { durationSeconds: 600, extraDurationSeconds: 4 },
    bonusEffects: { attackMultiplier: 1.15 },
    assets: { banner: "blade-v2.png", portrait: "zacian.png" },
  });
  const lines = adventureEffectSemanticDiff(baseline, modified);
  for (const field of ["localization.fr.description", "cost.candy", "duration.durationSeconds", "bonusEffects.attackMultiplier", "assets.banner"]) {
    assert.ok(lines.some((line) => line.includes(field)), field);
  }
  const added = structuredClone(modified);
  added.effects.ADVENTURE_EFFECT_NEW = { label: "Nouvel effet", cost: { candy: 1 } };
  assert.ok(adventureEffectSemanticDiff(modified, added).some((line) => line.includes("Nouvel effet")));
  assert.ok(adventureEffectSemanticDiff(added, modified).some((line) => line.includes("Nouvel effet")));
});

test("une alerte Adventure Effects conserve son diff lisible jusqu’à acquittement", () => {
  const first = applySourceWatchCheck(emptySourceWatchState(), {
    checkedAt: checkedAt(0),
    sources: [source("pokemon-go-hub-adventure-effects", "ae-1", {
      category: "adventure-effects",
      semanticSnapshot: adventureSnapshot(),
    })],
  });
  const changed = applySourceWatchCheck(first.state, {
    checkedAt: checkedAt(8),
    sources: [source("pokemon-go-hub-adventure-effects", "ae-2", {
      category: "adventure-effects",
      semanticSnapshot: adventureSnapshot({ duration: { durationSeconds: 600, extraDurationSeconds: 4 } }),
    })],
  });
  assert.equal(changed.sources[0].changeType, "Adventure Effects — changement détecté");
  assert.ok(changed.sources[0].readableDiff.some((line: string) => line.includes("360 → 600")));
  assert.equal(changed.summary.unreadCount, 1);
  const refreshed = applySourceWatchCheck(changed.state, {
    checkedAt: checkedAt(9),
    sources: [source("pokemon-go-hub-adventure-effects", "ae-2", {
      category: "adventure-effects",
      semanticSnapshot: adventureSnapshot({ duration: { durationSeconds: 600, extraDurationSeconds: 4 } }),
    })],
  });
  assert.equal(refreshed.sources[0].readableDiff.length, changed.sources[0].readableDiff.length);
  assert.equal(refreshed.summary.unreadCount, 1);
});

test("la route, le client et la sidebar utilisent le contrat persistant MongoDB", () => {
  const route = fs.readFileSync("src/app/api/pokemon-admin/route.ts", "utf8");
  const app = fs.readFileSync("src/components/admin/pokemon/admin-app.jsx", "utf8");
  const frame = fs.readFileSync("src/components/admin/layout/admin-app-frame.tsx", "utf8");
  const sidebar = fs.readFileSync("src/components/admin/navigation/admin-sidebar.tsx", "utf8");

  assert.match(route, /matweb\.pokemon\.sourceWatchState/);
  assert.match(route, /action === "source-watch-alerts"/);
  assert.match(route, /action === "source-watch-ack"/);
  assert.match(route, /writeDashboardStoreValue\(session!\.email, sourceWatchStateStoreKey/);
  assert.doesNotMatch(app, /persistSourceSignatures|pokedex-v4-source-watch-signatures/);
  assert.match(app, /source-watch-alerts-updated/);
  assert.match(frame, /source-watch-alerts/);
  assert.match(sidebar, /sourceWatchUnreadCount/);
});
