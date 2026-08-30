import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const exists = (file) => fs.existsSync(path.join(root, file));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const movedRoutes = [
  "analytics",
  "calendar",
  "exercices-javascript",
  "js-progress",
  "kanban",
  "notes",
  "palette",
  "pomodoro",
  "projects",
  "snippets",
  "todo",
  "tools",
  "writer",
];

test("le dashboard Pokémon ne contient plus les routes produit JavaScript", () => {
  for (const route of movedRoutes) {
    assert.equal(exists(`src/app/(dashboard)/${route}/page.tsx`), false, route);
  }
  assert.equal(exists("src/app/api/learning/topics/route.ts"), false);
  assert.equal(exists("src/app/api/dashboard-backlog/route.ts"), false);
  assert.equal(exists("src/lib/learning/repository.ts"), false);
});

test("la racine et les routes plates ouvrent directement le studio Pokémon", () => {
  assert.match(read("src/app/(dashboard)/page.tsx"), /initialSection="overview"/);
  assert.match(read("src/app/(dashboard)/[pokemonSection]/page.tsx"), /pokemonSectionBySlug/);
  const routes = read("src/data/pokemon-routes.ts");
  for (const route of ["/pokedex", "/raids", "/max-battles", "/events", "/shiny-tracker"]) {
    assert.match(routes, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("l’ancienne URL Admin Pokémon redirige sans perdre section ni recherche", () => {
  const legacy = read("src/app/(dashboard)/pokemon-admin/page.tsx");
  assert.match(legacy, /permanentRedirect/);
  assert.match(legacy, /pokemonSectionPath/);
  assert.match(legacy, /encodeURIComponent\(params\.q\)/);
});

test("la navigation principale est exclusivement Pokémon et partagée sans dépendance runtime", () => {
  const navigation = read("src/data/dashboard.ts");
  for (const forbidden of ["JS Progress", "Pomodoro", "Kanban", "Snippets", "Dashboard Backlog"]) {
    assert.doesNotMatch(navigation, new RegExp(forbidden));
  }
  assert.doesNotMatch(navigation, /dashboard-javascript/);
});

test("les appels Pokémon n'utilisent aucun deployment Vercel immuable ou supprimé", () => {
  const runtimeSources = [
    "src/lib/pokemon.ts",
    "src/app/api/pokemon-admin/route.ts",
    "src/app/api/pokemon-api-proxy/route.ts",
    ".env.example",
  ].map(read).join("\n");

  assert.doesNotMatch(runtimeSources, /pokemon-go-[a-z0-9]+-matthieu-vachets-projects\.vercel\.app/);
  assert.doesNotMatch(runtimeSources, /POKEMON_API_URL/);
  assert.match(runtimeSources, /POKEMON_API_PUBLIC_URL/);
  assert.match(runtimeSources, /https:\/\/pokemon-go-api\.vercel\.app/);
});
