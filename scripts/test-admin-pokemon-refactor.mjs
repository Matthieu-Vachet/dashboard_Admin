import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("la navigation Admin Pokémon est compacte sur desktop et devient une sheet sur mobile", () => {
  const source = read("src/components/admin/pokemon/admin-section-navigation.jsx");
  assert.match(source, /Rechercher une section Admin Pokémon/);
  for (const group of ["Données Pokémon", "Combat", "Événements", "Maintenance", "Qualité & supervision"]) {
    assert.match(source, new RegExp(group));
  }
  assert.match(source, /alt=""/);
  assert.match(source, /aria-expanded=/);
  assert.match(source, /hidden rounded-2xl[^\n]+lg:block/);
  assert.match(source, /fixed inset-0 z-\[90\]/);
  assert.match(source, /role="dialog" aria-modal="true"/);
  assert.match(source, /document\.body\.style\.overflow = "hidden"/);
  assert.match(source, /createPortal/);
  assert.match(source, /document\.body\)/);
  assert.doesNotMatch(source, /2xl:grid-cols-5/);
});

test("Best Attackers utilise un sélecteur de types visuel et des cartes mobiles compactes", () => {
  const source = read("src/components/admin/pokemon/best-attackers-panel.jsx");
  assert.match(source, /function TypeFilter/);
  assert.match(source, /typeIcon\(type\)/);
  assert.match(source, /role="radio"/);
  assert.match(source, /aria-label=\{type === "ANY" \? "Tous les types"/);
  assert.match(source, /type === "ANY"/);
  assert.match(source, /h-11 w-11 min-w-11/);
  assert.match(source, /overflow-x-auto/);
  assert.doesNotMatch(source, /<span className="max-w-full truncate">\{label\}<\/span>/);
  assert.match(source, /grid-cols-\[4\.75rem_minmax\(0,1fr\)\]/);
  assert.match(source, /sm:grid-cols-\[3rem_4\.5rem_minmax\(0,1fr\)_auto\]/);
  assert.match(source, /priority=\{entry\.rank <= 6\}/);
  assert.doesNotMatch(source, /showVariant=/);
  assert.match(source, /relative col-start-1 row-start-1 h-\[4\.75rem\]/);
});

test("les artworks partagés n'affichent plus de badge de variante superposé", () => {
  const artwork = read("src/components/admin/pokemon/pokemon-artwork.jsx");
  assert.doesNotMatch(artwork, /showVariant|bottom-0|🏷/);
  assert.match(artwork, /title=\{variantLabel/);
  for (const file of ["raids-panel.jsx", "max-battles-panel.jsx", "pvp-rankings-panel.jsx", "eggs-panel.jsx", "shiny-tracker-panel.jsx"]) {
    const panel = read(`src/components/admin/pokemon/${file}`);
    assert.match(panel, /<PokemonArtwork/);
    assert.doesNotMatch(panel, /showVariant=/);
  }
});

test("l’audit d’assets est paresseux, mutualisé et résilient aux limites GitHub", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const workshop = read("src/server/pokemon-go/apps/checklist/server/workshop.js");
  assert.match(app, /active === "assets" \|\| active === "backgrounds"/);
  assert.match(app, /assetAuditRequestRef/);
  assert.match(app, /Les assets déjà liés aux fiches restent affichés/);
  assert.match(workshop, /function allRemoteAssetTree/);
  assert.match(workshop, /Promise\.allSettled/);
  assert.match(workshop, /warnings,/);
});

test("la fonction Admin Pokémon n’embarque pas les classements volumineux", () => {
  const config = read("next.config.ts");
  const repository = read("src/server/pokemon-go/src/lib/data-repository.js");
  assert.doesNotMatch(config, /PokemonGo-Data\/\*\*/);
  assert.doesNotMatch(config, /pvp-rankings|best-attackers|shiny-tracker/);
  for (const directory of ["pokemon", "pokemon-forms", "pokemon-assets", "moves", "generations", "types", "weather", "stickers", "source-watch", "raids", "eggs", "max-battles", "rocket", "research", "items"]) {
    assert.match(config, new RegExp(`PokemonGo-Data/${directory.replace("-", "\\-")}/\\*\\*`));
  }
  assert.match(repository, /path\.join\(\/\*turbopackIgnore: true\*\/ appRoot/);
});

test("Research embarque et valide le référentiel items sans masquer les erreurs", () => {
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const items = JSON.parse(read(".data/PokemonGo-Data/items/items.json"));
  assert.ok(Array.isArray(items.items) && items.items.length > 0);
  assert.match(proxy, /dataPath\("items", "items\.json"\)/);
  assert.match(proxy, /référentiel local des items Pokémon GO est indisponible/);
  assert.match(proxy, /référentiel local des items Pokémon GO est vide ou invalide/);
  assert.match(app, /refreshError=\{researchLoadError\}/);
});

test("Résolution variantes sépare table desktop et cartes mobiles avec l’asset exact", () => {
  const source = read("src/components/admin/pokemon/pokemon-identity-mappings-panel.jsx");
  assert.match(source, /mapping\.localAsset\?\.image/);
  assert.match(source, /Aucun asset exact disponible/);
  assert.match(source, /md:hidden/);
  assert.match(source, /hidden overflow-x-auto[^\n]+md:block/);
  assert.match(source, /missing-local-costume/);
  assert.match(source, /ambiguous/);
});

test("Game Master Explorer reste privé, paginé et ne charge le JSON brut qu’au détail", () => {
  const panel = read("src/components/admin/pokemon/game-master-explorer-panel.jsx");
  const viewer = read("src/components/admin/pokemon/game-master-json-viewer.jsx");
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  assert.match(panel, /Game Master Explorer/);
  assert.match(panel, /Explorer/);
  assert.match(panel, /Comparaison locale/);
  assert.match(panel, /Historique & diff/);
  assert.match(panel, /game-master-template/);
  assert.match(viewer, /Une seule entrée brute est chargée à la fois/);
  assert.match(viewer, /Tout ouvrir/);
  assert.match(proxy, /x-api-admin-secret/);
  assert.match(proxy, /game-master-templates/);
  assert.match(proxy, /Cache-Control", "private, no-store"/);
});

test("les datasets affichent l'historique centralisé et les diagnostics non matchés", () => {
  const diagnostics = read("src/components/admin/pokemon/current-dataset-diagnostics.jsx");
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  const eventRoute = read("src/app/api/admin/events/scrape/route.ts");
  const eventHistory = read("src/app/api/admin/events/history/route.ts");
  const events = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(diagnostics, /Historique des exécutions/);
  assert.match(diagnostics, /Voir les \{unmatchedEntries\.length\} entrées non matchées/);
  assert.match(diagnostics, /diffUnavailableReason/);
  assert.match(proxy, /dataset-history/);
  assert.match(eventRoute, /startDatasetRun/);
  assert.match(eventRoute, /completeDatasetRun/);
  assert.match(eventRoute, /unmatchedContext/);
  assert.match(eventHistory, /listDatasetRuns\("events-calendar"/);
  assert.match(events, /sourceRun/);
  assert.match(events, /événement\(s\) disponible\(s\)/);
});

test("la navigation précédente et suivante reste côte à côte sur mobile", () => {
  const source = read("src/components/admin/pokemon/detail-modal.jsx");
  assert.match(source, /grid grid-cols-2 gap-2 sm:gap-3/);
  assert.match(source, /← Fiche précédente/);
  assert.match(source, /Fiche suivante →/);
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
  assert.match(source, /entry\?\.sourceIdentity\?\.costume \|\| entry\?\.sourceIdentity\?\.form/);
  assert.match(source, /sourceName\.includes\("\("\)/);
  assert.doesNotMatch(source, /max-sm:h-\[calc\(100dvh/);
});

test("le calendrier remplace la grille mensuelle par un agenda sur mobile", () => {
  const source = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(source, /aria-label="Agenda mobile"/);
  assert.match(source, /hidden sm:block/);
  assert.match(source, /id === "calendar" \? "hidden sm:inline-flex"/);
});

test("les statistiques Events restent complètes dans des tuiles compactes", () => {
  const source = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(source, /grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7/);
  assert.match(source, /min-w-0 rounded-xl border p-2\.5/);
  assert.match(source, /h-8 w-8/);
  assert.match(source, /text-\[10px\]/);
  for (const label of ["Events visibles", "En cours", "À venir", "Archivés", "Raids liés", "Research liées", "Pokémon illustrés"]) {
    assert.match(source, new RegExp(label));
  }
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

test("le proxy Admin conserve une marge avant la limite Vercel", () => {
  const source = read("src/app/api/pokemon-admin/route.ts");
  assert.match(source, /export const maxDuration = 60/);
  assert.match(source, /pokemonAdminMutationTimeoutMs = 55_000/);
  assert.match(source, /AbortSignal\.timeout\(pokemonAdminMutationTimeoutMs\)/);
});
