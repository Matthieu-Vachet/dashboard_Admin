import fs from "node:fs";
import path from "node:path";

const serverRoot = path.resolve(import.meta.dirname, "../.next/server");
const manifests = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(target);
    else if (entry.name.endsWith(".nft.json")) manifests.push(target);
  }
}
collect(serverRoot);

function verifyRoute(label, manifestSuffix, markers, forbiddenMarkers = []) {
  const manifest = manifests.find((file) => file.replaceAll("\\", "/").includes(manifestSuffix));
  if (!manifest) throw new Error(`Manifest serverless ${label} introuvable.`);
  const files = JSON.parse(fs.readFileSync(manifest, "utf8")).files || [];
  const trace = files.join("\n");
  for (const marker of markers) {
    if (!trace.includes(marker)) throw new Error(`${label}: ressource serverless non tracee: ${marker}`);
  }
  for (const marker of forbiddenMarkers) {
    if (trace.includes(marker)) throw new Error(`${label}: ressource serverless interdite tracee: ${marker}`);
  }
  return {
    route: label,
    manifest: path.relative(path.resolve(import.meta.dirname, ".."), manifest),
    tracedFiles: files.length,
  };
}

const routes = [
  verifyRoute("PvP Simulator", "app/api/admin/pvp-simulator/route.js.nft.json", [
    "runtime-data/PokemonGo-Data/package.json",
    "runtime-data/PokemonGo-Data/data/pokemon/",
    "runtime-data/PokemonGo-Data/data/pvp/",
    "runtime-data/PokemonGo-Data/data/moves/",
  ], ["../../../../../../.data/PokemonGo-Data/"]),
  verifyRoute("Admin Pokémon", "app/api/pokemon-admin/route.js.nft.json", [
    "runtime-data/PokemonGo-Data/package.json",
    "runtime-data/PokemonGo-Data/data/reference/event-variant-classification.json",
    "runtime-data/PokemonGo-Data/operations/reports/pvpoke/moveset-mapping-audit-current.json",
  ]),
  verifyRoute("Calendar Events", "app/api/admin/events/scrape/route.js.nft.json", [
    "runtime-data/PokemonGo-Data/package.json",
    "runtime-data/PokemonGo-Data/data/pokemon/",
    "runtime-data/PokemonGo-Data/data/assets/",
    "runtime-data/PokemonGo-Data/data/reference/items/",
  ]),
  verifyRoute("Dashboard Redeploy", "app/api/dashboard-redeploy/route.js.nft.json", [
    "runtime-data/PokemonGo-Data/package.json",
    "runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
  ]),
];

console.log(JSON.stringify({
  success: true,
  routes,
}, null, 2));
