import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import {
  adminRegenerationRegistry,
  globalAdminRegenerations,
  pokemonAdminProxyRegeneration,
} from "../src/lib/admin-regeneration-registry";

const require = createRequire(import.meta.url);
const dataRepository = require("../src/server/pokemon-go/src/lib/data-repository.js");
const root = path.resolve(import.meta.dirname, "..");

assert.equal(adminRegenerationRegistry.length, 18, "Le registre doit couvrir les 18 actions de regeneration/synchronisation.");
assert.equal(globalAdminRegenerations().length, 15, "Le flux Tout regenerer doit couvrir les 15 etapes actives.");
assert.equal(new Set(adminRegenerationRegistry.map((entry) => entry.id)).size, adminRegenerationRegistry.length, "IDs de registre dupliques.");

for (const registration of adminRegenerationRegistry) {
  assert.ok(registration.provider && registration.output && registration.permission, `${registration.id}: metadonnees incompletes`);
  assert.ok(registration.timeoutSeconds > 0, `${registration.id}: timeout invalide`);
  if (registration.dashboardAction?.startsWith("regenerate-") || registration.dashboardAction === "reindex-game-master") {
    assert.equal(pokemonAdminProxyRegeneration(registration.dashboardAction)?.apiPath, registration.apiPath, `${registration.id}: proxy API absent`);
  }
}

const dataRoot = dataRepository.getPokemonGoDataRuntimeRoot();
for (const relative of [
  "package.json",
  "data/pokemon",
  "data/assets",
  "data/moves",
  "data/reference/items/items.json",
  "data/reference/event-variant-classification.json",
  "operations/reports/pvpoke/moveset-mapping-audit-current.json",
]) {
  assert.ok(fs.existsSync(dataRepository.resolvePokemonGoDataFile(relative)), `Data runtime absent: ${relative}`);
}

const adminRoute = fs.readFileSync(path.join(root, "src/app/api/pokemon-admin/route.ts"), "utf8");
assert.match(adminRoute, /pokemonAdminProxyRegeneration\(action\)/);
assert.match(adminRoute, /export const maxDuration = 300/);
assert.match(adminRoute, /regeneration\.timeoutSeconds/);
assert.match(adminRoute, /process\.env\.VERCEL === "1"/);
assert.doesNotMatch(adminRoute, /action === "regenerate-(?:raids|eggs|max-battles|rocket|research|shiny|pvp-rankings|gbl-calendar|best-attackers|best-defenders|pokemon-identity-mappings|game-master)"/);

const dynamaxScanRoute = fs.readFileSync(path.join(root, "src/app/api/admin/dynamax-images/scan/route.ts"), "utf8");
const dynamaxApi = fs.readFileSync(path.join(root, "src/lib/dynamax-images-api.ts"), "utf8");
assert.match(dynamaxScanRoute, /export const maxDuration = 180/);
assert.match(dynamaxScanRoute, /continuation/);
assert.match(dynamaxApi, /55_000/);
assert.match(adminRoute, /runPokemonApiContinuation/);
const smokeScript = fs.readFileSync(path.join(root, "scripts/smoke-dashboard-regenerations.mts"), "utf8");
assert.match(smokeScript, /requestedIds\.size > 0/);

const eventsScraper = fs.readFileSync(path.join(root, "src/lib/leekduck-events-scraper.ts"), "utf8");
assert.match(eventsScraper, /data-repository/);
const nextConfig = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
assert.match(nextConfig, /runtime-data\/PokemonGo-Data/);
assert.match(nextConfig, /data\/pokemon\/\*\*\/\*/);
assert.doesNotMatch(nextConfig, /\.data\/PokemonGo-Data/);

console.log(JSON.stringify({
  success: true,
  registryActions: adminRegenerationRegistry.length,
  globalActions: globalAdminRegenerations().length,
  dataRoot,
}, null, 2));
