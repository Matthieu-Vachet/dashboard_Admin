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

const eventsManifest = manifests.find((file) => file.replaceAll("\\", "/").includes("app/api/admin/events/scrape/route.js.nft.json"));
if (!eventsManifest) throw new Error("Manifest serverless Calendar Events introuvable.");
const files = JSON.parse(fs.readFileSync(eventsManifest, "utf8")).files || [];
const trace = files.join("\n");
for (const marker of [
  "runtime-data/PokemonGo-Data/package.json",
  "runtime-data/PokemonGo-Data/data/pokemon/",
  "runtime-data/PokemonGo-Data/data/assets/",
  "runtime-data/PokemonGo-Data/data/reference/items/",
]) {
  if (!trace.includes(marker)) throw new Error(`Calendar Events: ressource serverless non tracee: ${marker}`);
}

console.log(JSON.stringify({
  success: true,
  route: "Calendar Events",
  manifest: path.relative(path.resolve(import.meta.dirname, ".."), eventsManifest),
  tracedFiles: files.length,
}, null, 2));
