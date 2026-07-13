import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("la navigation Admin Pokémon reste groupée, recherchable et accessible", () => {
  const source = read("src/components/admin/pokemon/admin-section-navigation.jsx");
  assert.match(source, /Rechercher une section Admin Pokémon/);
  for (const group of ["Données Pokémon", "Combat", "Événements", "Maintenance", "Qualité & supervision"]) {
    assert.match(source, new RegExp(group));
  }
  assert.match(source, /alt=""/);
  assert.match(source, /aria-expanded=/);
  assert.match(source, /grid items-start/);
  assert.match(source, /Accès rapides/);
});

test("la modale commune conserve le callback courant et restaure le focus", () => {
  const source = read("src/components/ui/modal.tsx");
  assert.match(source, /const onCloseRef = useRef\(onClose\)/);
  assert.match(source, /onCloseRef\.current = onClose/);
  assert.match(source, /previouslyFocusedRef\.current\?\.focus\(\)/);
  assert.match(source, /\}, \[open\]\);/);
  assert.doesNotMatch(source, /autoFocus/);
});

test("les accordéons de contenu sont fermés par défaut", () => {
  const tier = read("src/components/admin/pokemon/tier-section.jsx");
  const events = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(tier, /defaultOpen = false/);
  assert.match(events, /function TimelineSection\([^)]*defaultOpen = false/);
  assert.doesNotMatch(events, /<TimelineSection[^>]*defaultOpen=/);
});

test("Background sépare la preview Location Card de l'asset Pokémon", () => {
  const source = read("src/components/admin/pokemon/background-panel.jsx");
  assert.match(source, /object-contain/);
  assert.match(source, /blur-/);
  assert.match(source, /ASSET ABSENT|Asset Pokémon absent/);
  assert.doesNotMatch(source, /Pokémon sans location card/);
  assert.match(source, /entriesByFile/);
  assert.match(source, /entriesByVariant/);
  assert.match(source, /linkedEntry/);
});

test("Shiny conserve son podium, son détail responsive et son historique interne", () => {
  const source = read("src/components/admin/pokemon/shiny-tracker-panel.jsx");
  assert.match(source, /podium/i);
  assert.match(source, /Historique de nos snapshots/);
  assert.match(source, /sm:|md:|lg:/);
  assert.match(source, /points\.length >= 2/);
  assert.match(source, /rankedEntries = entries\.filter/);
  assert.doesNotMatch(source, /max-sm:h-\[calc\(100dvh/);
});

test("le calendrier remplace la grille mensuelle par un agenda sur mobile", () => {
  const source = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(source, /aria-label="Agenda mobile"/);
  assert.match(source, /hidden sm:block/);
  assert.match(source, /id === "calendar" \? "hidden sm:inline-flex"/);
});

test("les diagnostics source et l'API Explorer restent contenus sur mobile", () => {
  const diagnostics = read("src/components/admin/pokemon/current-dataset-diagnostics.jsx");
  const explorer = read("src/components/admin/pokemon/pokemon-api-explorer.tsx");
  assert.match(diagnostics, /Afficher les détails de la source/);
  assert.match(diagnostics, /sm:hidden/);
  assert.match(explorer, /min-w-0 overflow-hidden/);
  assert.match(explorer, /xl:grid-cols-\[minmax\(16rem,23rem\)_minmax\(0,1fr\)_auto\]/);
});

test("le catalogue distingue visuellement les attaques rapides et chargées", () => {
  const source = read("src/components/admin/pokemon/catalog-panel.jsx");
  assert.match(source, /Rapide/);
  assert.match(source, /Chargée/);
  assert.match(source, /aria-expanded=/);
});

test("PvP expose tous les rôles et développe les lignes en accordéon", () => {
  const source = read("src/components/admin/pokemon/pvp-rankings-panel.jsx");
  for (const role of ["lead", "closer", "switch", "charger", "attacker", "consistency", "stat-product", "offense", "defense", "stamina"]) {
    assert.match(source, new RegExp(`\\[?\"${role}\"`));
  }
  assert.match(source, /aria-expanded=/);
  assert.match(source, /entry\.moveset\?\.fast/);
  assert.match(source, /entry\.moveset\?\.charged/);
  assert.match(source, /Cette information n’est pas fournie/);
});

test("l'explorateur dérive les routes publiques d'OpenAPI et isole les actions privées", () => {
  const proxy = read("src/app/api/pokemon-api-proxy/route.ts");
  const explorer = read("src/components/admin/pokemon/pokemon-api-explorer.tsx");
  assert.match(proxy, /publicOpenApiPaths/);
  assert.match(proxy, /\/api\/v1\/admin\/shiny\/regenerate/);
  assert.match(explorer, /api-docs\.json/);
  assert.match(explorer, /adminEndpoints/);
});

test("le Dashboard n'appelle Shiny qu'avec le secret serveur", () => {
  const source = read("src/app/api/pokemon-admin/route.ts");
  assert.match(source, /target\.pathname\.startsWith\("\/api\/v1\/shiny"\)/);
  assert.match(source, /headers\["x-api-admin-secret"\] = secret/);
});
