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
  assert.match(source, /mobileCloseRef\.current\?\.focus\(\)/);
  assert.match(source, /ref=\{mobileCloseRef\}/);
  assert.doesNotMatch(source, /mobileSearchRef|ref=\{mobileSearchRef\}/);
  assert.match(source, /createPortal/);
  assert.match(source, /document\.body\)/);
  assert.doesNotMatch(source, /2xl:grid-cols-5/);
});

test("le module de vérification Pokémon et ses quatre anciennes entrées sont absents", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const watch = read("src/components/admin/pokemon/source-watch-panel.tsx");
  const proxy = read("src/app/api/pokemon-admin/route.ts");

  assert.doesNotMatch(app, /pokemon-audits|pokemon-audit-(available|shiny|costume|shadow)|PokemonReleaseAuditPanel/);
  assert.doesNotMatch(watch, /pokemon-release-audit|pokemon-audit-(available|shiny|costume|shadow)/);
  assert.doesNotMatch(proxy, /pokemon-release-audit/);
  assert.equal(fs.existsSync(path.join(root, "src/components/admin/pokemon/pokemon-release-audit-panel.tsx")), false);
  assert.equal(fs.existsSync(path.join(root, "src/server/pokemon-go/apps/checklist/server/pokemon-release-audit.js")), false);
  assert.equal(fs.existsSync(path.join(root, "src/server/pokemon-go/apps/checklist/server/pokemon-release-audit-schema.js")), false);
});

test("le burger global conserve les libellés complets sur mobile", () => {
  const frame = read("src/components/admin/layout/admin-app-frame.tsx");
  assert.match(frame, /renderSidebar\(collapsed\)/);
  assert.match(frame, /renderSidebar\(false, true\)/);
  assert.doesNotMatch(frame, /dashboard-sidebar-mobile[^]*\{sidebar\}/);
});

test("le compte est compact, replié par défaut et mémorisé sur tous les formats", () => {
  const sidebar = read("src/components/admin/navigation/admin-sidebar.tsx");
  assert.match(sidebar, /const \[accountExpanded, setAccountExpanded\] = useState\(false\)/);
  assert.match(sidebar, /accountDisclosureStorageKey/);
  assert.match(sidebar, /localStorage\.setItem/);
  assert.match(sidebar, /aria-expanded=\{accountExpanded\}/);
  assert.match(sidebar, /!accountExpanded && "hidden"/);
  assert.match(sidebar, /safe-area-inset-bottom/);
});

test("la fonctionnalité d'audit Costumes / Event est absente du Dashboard", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  const registry = read("src/lib/admin-regeneration-registry.ts");
  assert.equal(fs.existsSync(path.join(root, "src/components/admin/pokemon/costume-audit-panel.jsx")), false);
  for (const source of [app, proxy, registry]) assert.doesNotMatch(source, /costume-audit|regenerate-costume-audit/);
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
  assert.match(app, /Les assets déjà liés\s+aux fiches restent affichés/);
  assert.match(workshop, /function allRemoteAssetTree/);
  assert.match(workshop, /Promise\.allSettled/);
  assert.match(workshop, /warnings,/);
});

test("la fonction Admin Pokémon n’embarque pas les classements volumineux", () => {
  const config = read("next.config.ts");
  const repository = read("src/server/pokemon-go/src/lib/data-repository.js");
  const routeStart = config.indexOf('"/api/pokemon-admin"');
  const routeEnd = config.indexOf("],", routeStart);
  const routeIncludes = config.slice(routeStart, routeEnd);
  assert.doesNotMatch(config, /PokemonGo-Data\/\*\*/);
  assert.doesNotMatch(routeIncludes, /pvp-rankings|best-attackers|shiny-tracker/);
  for (const directory of ["data/pokemon", "data/assets", "data/moves", "data/reference/generations", "data/reference/types", "data/reference/weather", "data/reference/stickers", "operations/audits/sources", "data/battles/raids", "data/activities/eggs", "data/battles/max-battles", "data/battles/rocket", "data/activities/research", "data/reference/items"]) {
    assert.match(config, new RegExp(`PokemonGo-Data/${directory.replaceAll("-", "\\-")}/\\*\\*`));
  }
  assert.match(config, /data\/reference\/event-variant-classification\.json/);
  assert.match(repository, /path\.join\(\/\*turbopackIgnore: true\*\/ appRoot/);
});

test("Research embarque et valide le référentiel items sans masquer les erreurs", () => {
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const items = JSON.parse(fs.readFileSync(path.resolve(root, "../PokemonGo-Data/data/reference/items/items.json"), "utf8"));
  assert.ok(Array.isArray(items.items) && items.items.length > 0);
  assert.match(proxy, /dataPath\("data", "reference", "items", "items\.json"\)/);
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
  assert.match(diagnostics, /\{unmatchedEntries\.length\} non matchée\(s\)/);
  assert.match(diagnostics, /Alias brut/);
  assert.match(diagnostics, /Alias normalisé/);
  assert.match(diagnostics, /Action proposée/);
  assert.match(diagnostics, /Ouvrir l’Identity Manager/);
  assert.match(diagnostics, /diffUnavailableReason/);
  assert.match(proxy, /dataset-history/);
  assert.match(eventRoute, /startDatasetRun/);
  assert.match(eventRoute, /completeDatasetRun/);
  assert.match(eventRoute, /unmatchedContext/);
  assert.match(eventHistory, /listDatasetRuns\("events-calendar"/);
  assert.match(events, /sourceRun/);
  assert.match(events, /événement\(s\) disponible\(s\)/);
});

test("Identity Manager propose la forme contextuelle pour associer un diagnostic", () => {
  const source = read("src/components/admin/pokemon/identity-manager-panel.tsx");
  assert.match(source, /function diagnosticAliasValue/);
  assert.match(source, /normalizeDiagnosticAlias\(diagnostic\.form\)/);
  assert.match(source, /value: alias/);
  assert.match(source, /Alias proposé/);
});

test("Identity Manager explique les conflits de formes sans bloc JSON brut ni action destructive", () => {
  const source = read("src/components/admin/pokemon/identity-manager-panel.tsx");
  assert.match(source, /function IdentitySyncConflictCard/);
  assert.match(source, /Fichiers et assets candidats/);
  assert.match(source, /Alias MongoDB préservés/);
  assert.match(source, /Résolution recommandée/);
  assert.match(source, /Aucune sélection et aucune suppression MongoDB automatiques/);
  assert.match(source, /collision-forme-ou-normalisation-trop-large/);
  assert.doesNotMatch(source, /JSON\.stringify\(syncReport\.conflicts/);
});

test("Veille expose une supervision filtrable, alignée et responsive", () => {
  const source = read("src/components/admin/pokemon/source-watch-panel.tsx");
  assert.match(source, /Dernière vérification/);
  assert.match(source, /Rechercher une source/);
  assert.match(source, /Filtrer les sources par catégorie/);
  assert.match(source, /Filtrer les sources par statut/);
  assert.match(source, /État et cause/);
  assert.match(source, /Copier l’empreinte/);
  assert.match(source, /document\.execCommand\("copy"\)/);
  assert.match(source, /Margxt, LeekDuck, PvPoke/);
  assert.match(source, /lg:grid-cols-\[minmax\(14rem,1\.45fr\)/);
  assert.match(source, /break-words/);
  assert.doesNotMatch(source, /block truncate font-black text-domain-foreground/);
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

test("Events déduplique les assets identiques", () => {
  const eventsSource = read("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(eventsSource, /uniqueBy\(\(event\.featuredPokemon \|\| \[\]\)[\s\S]*?\(pokemon\) => pokemon\.src\)/);
});

test("les diagnostics source restent repliés et l'API Explorer reste contenu sur mobile", () => {
  const diagnostics = read("src/components/admin/pokemon/current-dataset-diagnostics.jsx");
  const explorer = read("src/components/admin/pokemon/pokemon-api-explorer.tsx");
  assert.match(diagnostics, /const \[expanded, setExpanded\] = useState\(false\)/);
  assert.match(diagnostics, /sessionStorage\.getItem\(storageKey\)/);
  assert.match(diagnostics, /sessionStorage\.setItem\(storageKey/);
  assert.match(diagnostics, /aria-expanded=\{expanded\}/);
  assert.match(diagnostics, /motion-reduce:transition-none/);
  assert.match(diagnostics, /Replier les détails de la source/);
  assert.match(diagnostics, /Déplier les détails de la source/);
  assert.match(diagnostics, /grid-cols-\[minmax\(0,1fr\)_auto\]/);
  assert.match(diagnostics, /col-span-2 flex min-w-0 flex-wrap/);
  assert.match(diagnostics, /function DatasetDiffBadge/);
  assert.match(diagnostics, /<span className="sm:hidden">\s*<DatasetDiffBadge/);
  assert.match(diagnostics, /<span className="hidden sm:block">\s*<DatasetDiffBadge/);
  assert.match(diagnostics, /whitespace-nowrap/);
  assert.match(diagnostics, /<Modal open=\{historyOpen\}/);
  assert.doesNotMatch(diagnostics, /ModalPortal|fixed inset-0/);
  assert.match(explorer, /min-w-0 overflow-hidden/);
  assert.match(explorer, /xl:grid-cols-\[minmax\(16rem,23rem\)_minmax\(0,1fr\)_auto\]/);
});

test("Community Days et Historique Events utilisent la modale officielle et une action Détail compacte", () => {
  for (const file of ["community-days-panel.jsx", "events-history-panel.jsx"]) {
    const source = read(`src/components/admin/pokemon/${file}`);
    assert.match(source, /import \{ Modal \} from "@\/components\/ui\/modal"/);
    assert.match(source, /<Modal open=/);
    assert.match(source, /<Button size="sm" variant="secondary"/);
    assert.doesNotMatch(source, /fixed inset-0/);
    assert.doesNotMatch(source, /role="dialog" aria-modal="true"/);
  }
  const communityDays = read("src/components/admin/pokemon/community-days-panel.jsx");
  assert.match(communityDays, /featured\.map\(\(entry\) => <FeaturedPokemonTile/);
  assert.match(communityDays, /Pokémon vedettes/);
  assert.match(communityDays, /Raison exacte/);
  assert.match(communityDays, /Afficher le JSON d’audit/);
  assert.doesNotMatch(communityDays, /featuredPokemon\?\.\[0\]/);
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

test("le Battle Lab peut remplir un emplacement de combattant initialement vide", () => {
  const source = read("src/components/admin/pokemon/pvp-battle-lab.tsx");
  assert.match(source, /itemIndex === index \? next : item/);
  assert.doesNotMatch(source, /patchFighter\(index, next\)/);
});

test("le Battle Lab porte le sélecteur hors des stacking contexts et expose toutes les variantes", () => {
  const source = read("src/components/admin/pokemon/pvp-battle-lab.tsx");
  assert.match(source, /createPortal/);
  assert.match(source, /window\.addEventListener\("scroll", updatePlacement, true\)/);
  assert.match(source, /SHADOW · OBSCUR/);
  assert.match(source, /MEGA_X/);
  assert.match(source, /Régional/);
  assert.match(source, /matchingEntries\.length} résultat/);
  assert.match(source, /document\.body\.style\.overflow = "hidden"/);
  assert.match(source, /event\.key !== "Tab"/);
});

test("le Battle Lab propose Rank IV complet, caps explicites et pictogrammes historiques", () => {
  const source = read("src/components/admin/pokemon/pvp-battle-lab.tsx");
  const route = read("src/app/api/admin/pvp-simulator/route.ts");
  assert.match(source, /const levelCaps = \[40, 41, 50, 51\]/);
  assert.match(source, /Voir classement IV/);
  assert.match(source, /4096 spreads calculés/);
  for (const asset of ["shieldAlt", "fastAttack", "chargedAttack", "shield0", "up"]) {
    assert.match(source, new RegExp(`uiAssets\\.icons\\.${asset}`));
  }
  assert.match(source, /typeIconAsset/);
  assert.match(route, /action: z\.literal\("iv-rankings"\)/);
});

test("Multi et Matrix utilisent des sélecteurs visuels et isolent les erreurs batch", () => {
  const source = read("src/components/admin/pokemon/pvp-battle-lab.tsx");
  const route = read("src/app/api/admin/pvp-simulator/route.ts");
  assert.match(source, /function PokemonGroupSelector/);
  assert.match(source, /limit=\{100\}/);
  assert.match(source, /limit=\{20\}/);
  assert.match(source, /Meilleurs matchups/);
  assert.match(source, /Matrix Battle/);
  assert.match(source, /Voir le combat/);
  assert.match(route, /Promise\.allSettled/);
  assert.match(route, /batchIdentifier/);
  assert.match(route, /errors: \[/);
});

test("les sélecteurs d’attaques chargées empêchent les doublons", () => {
  const source = read("src/components/admin/pokemon/pvp-battle-lab.tsx");
  assert.match(source, /function replaceChargedMove/);
  assert.match(source, /next\[otherIndex\] === value/);
  assert.match(source, /items\.indexOf\(moveId\) === moveIndex/);
  assert.doesNotMatch(source, /key=\{combatant\.canonicalId\}/);
});

test("la fonctionnalité collection personnelle est absente du code produit", () => {
  const source = read("src/components/admin/pokemon/admin-app.jsx");
  const proxy = read("src/proxy.ts");
  assert.doesNotMatch(source, /my-collection|TrainerPokemonCollectionPanel/);
  assert.doesNotMatch(proxy, /trainer-pokemon/);
});

test("l'explorateur dérive les routes publiques d'OpenAPI et isole les actions privées", () => {
  const proxy = read("src/app/api/pokemon-api-proxy/route.ts");
  const explorer = read("src/components/admin/pokemon/pokemon-api-explorer.tsx");
  const registry = read("src/lib/pokemon-api-private-registry.ts");
  assert.match(proxy, /publicOpenApiOperations/);
  assert.match(proxy, /privateEndpointFor\(method, pathname\)/);
  assert.match(proxy, /candidate\.origin !== trustedBase\.origin/);
  assert.match(registry, /best-defenders/);
  assert.match(registry, /PokemonApiMethod = "GET" \| "POST" \| "PATCH" \| "DELETE"/);
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
  assert.match(source, /export const maxDuration = 300/);
  assert.match(source, /pokemonAdminMutationTimeoutMs = 55_000/);
  assert.match(source, /timeoutMs = method === "GET" \? 30_000 : pokemonAdminMutationTimeoutMs/);
  assert.match(source, /AbortSignal\.timeout\(timeoutMs\)/);
});

test("Identity Manager reste privé et expose un CRUD traçable sans secret navigateur", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const panel = read("src/components/admin/pokemon/identity-manager-panel.tsx");
  const proxy = read("src/app/api/pokemon-admin/route.ts");
  assert.match(app, /id: "identity-manager"/);
  assert.match(app, /<IdentityManagerPanel/);
  assert.match(proxy, /\/api\/v1\/admin\/pokemon-identities/);
  assert.match(proxy, /"x-admin-user": user/);
  assert.match(proxy, /identity-manager-diagnostic-update/);
  assert.match(proxy, /identity-manager-inventory/);
  assert.match(proxy, /identity-manager-sync-preview/);
  assert.match(proxy, /identity-manager-sync-apply/);
  assert.match(panel, /Nouvelle identité/);
  assert.match(panel, /identity-manager-alias-create/);
  assert.match(panel, /identity-manager-merge/);
  assert.match(panel, /mode: "preview"/);
  assert.match(panel, /Aucune écriture n’est possible avant une prévisualisation sans conflit/);
  assert.match(panel, /Catalogue local PokemonGo-Data/);
  assert.match(panel, /Synchroniser le catalogue/);
  assert.match(panel, /Asset bundle/);
  assert.match(panel, /localIdentity\?\.identityKey/);
  assert.match(panel, /localIdentity\?\.types/);
  assert.match(panel, /typeColors/);
  assert.match(panel, /h-24 w-24/);
  assert.match(panel, /sm:h-28 sm:w-28/);
  assert.match(panel, /grid-cols-\[6rem_minmax\(0,1fr\)\]/);
  assert.match(panel, /grid grid-cols-2 gap-2 sm:flex sm:flex-wrap/);
  assert.match(panel, /meta\.stats\?\.providers/);
  assert.match(panel, /aliasProviderOptions/);
  assert.doesNotMatch(panel, /Autre…|customProviderValue/);
  assert.match(panel, /Seules les sources enregistrées et actives/);
  assert.match(panel, /identity-manager-sync-preview/);
  assert.match(panel, /identity-manager-sync-apply/);
  assert.match(panel, /syncStatus/);
  assert.match(panel, /Régression Mewtwo Armored/);
  assert.match(panel, /Une création manuelle commence en brouillon/);
  assert.match(panel, /CANONICAL_ID_NOT_SYNCHRONIZED/);
  assert.match(panel, /DUPLICATE_ALIAS/);
  assert.match(panel, /ALIAS_CONFLICT/);
  assert.match(panel, /MULTIPLE_FUNCTIONAL_IDENTITIES/);
  assert.match(panel, /GENDER_ASSET_UNAVAILABLE/);
  assert.match(panel, /SOURCE_DATA_INCOMPLETE/);
  assert.match(panel, /LOCAL_IDENTITY_MISSING/);
  assert.match(panel, /VARIANT_NOT_FOUND/);
  assert.match(panel, /<Modal/);
  assert.doesNotMatch(panel, /window\.prompt|fixed inset-0/);
});

test("la Home Admin Pokémon est un centre de commande quotidien sans perdre les widgets existants", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const home = read("src/components/admin/pokemon/admin-command-center.tsx");
  assert.match(app, /<AdminCommandCenter/);
  assert.match(app, /id: "overview-summary"/);
  assert.match(app, /widgets historiques conservés/);
  assert.match(app, /<SortableWidgetGrid/);
  for (const label of ["Événements actifs", "Prochains événements", "Aliases non résolus", "Variantes non matchées", "Conflits d’identités", "Assets à vérifier", "Qualité et providers", "Activité récente"]) {
    assert.match(home, new RegExp(label));
  }
  for (const section of ["identity-manager", "events", "assets", "pokemon-identity-mappings", "checks", "logs"]) {
    assert.match(home, new RegExp(`onNavigate\\(\\"${section}\\"\\)`));
  }
  assert.match(home, /identity-manager-diagnostics&status=open&page=1&limit=1/);
  assert.match(home, /pokemon-identity-mappings&page=1&limit=1/);
  assert.match(home, /events\/archive\?status=active/);
  assert.match(home, /events\/archive\?status=upcoming/);
  assert.match(home, /Promise\.allSettled/);
  assert.doesNotMatch(home, /window\.prompt|fixed inset-0/);
});

test("la Home orchestre une régénération globale séquentielle et tolérante aux erreurs", () => {
  const home = read("src/components/admin/pokemon/admin-command-center.tsx");
  const orchestrator = read("src/lib/admin-pokemon-global-regeneration.ts");
  const registry = read("src/lib/admin-regeneration-registry.ts");
  const adminApp = read("src/components/admin/pokemon/admin-app.jsx");
  const adminRoute = read("src/app/api/pokemon-admin/route.ts");
  assert.match(home, /Tout régénérer/);
  assert.match(home, /regenerationLock/);
  assert.match(home, /for \(const definition of globalRegenerationDefinitions\)/);
  assert.match(home, /Progression de la régénération globale/);
  assert.match(home, /Diagnostic/);
  assert.match(adminApp, /bootstrap\.loading && !bootstrap\.payload/);
  assert.match(adminApp, /bootstrap\.payload &&\s+active === "overview"/);
  assert.match(registry, /regenerate-game-master/);
  assert.match(orchestrator, /identity-manager-sync-preview/);
  assert.match(orchestrator, /identity-manager-sync-apply/);
  assert.match(registry, /regenerate-pokemon-identity-mappings/);
  for (const action of [
    "regenerate-raids",
    "regenerate-max-battles",
    "regenerate-rocket",
    "regenerate-pvp-rankings",
    "regenerate-best-attackers",
    "regenerate-eggs",
    "regenerate-research",
    "regenerate-shiny",
  ]) {
    assert.match(registry, new RegExp(action));
  }
  assert.match(registry, /\/api\/admin\/events\/scrape/);
  assert.match(registry, /\/api\/admin\/community-days\/sync/);
  assert.match(orchestrator, /globalAdminRegenerations/);
  assert.match(orchestrator, /Synchronisation non appliquée/);
  assert.match(orchestrator, /waitForRegeneration/);
  assert.match(orchestrator, /regeneration-status/);
  assert.match(orchestrator, /inFlightRegenerations\.get\(normalizedAction\)/);
  assert.match(orchestrator, /inFlightRegenerations\.set\(normalizedAction, request\)/);
  assert.match(orchestrator, /inFlightRegenerations\.delete\(normalizedAction\)/);
  for (const state of ["pending", "queued", "accepted", "running", "processing"]) {
    assert.match(orchestrator, new RegExp(`"${state}"`));
  }
  for (const state of ["idle", "success", "partial", "failed", "cancelled"]) {
    assert.match(orchestrator, new RegExp(`"${state}"`));
  }
  assert.match(orchestrator, /"partial", "unchanged"/);
  assert.match(adminApp, /executePokemonAdminRegeneration\(action\)/);
  assert.match(adminApp, /setPvpRankingRegeneration/);
  assert.match(adminApp, /pvpRankingRegenerationToast/);
  assert.match(adminApp, /toast\.warning\(notification\.message\)/);
  assert.match(adminApp, /regeneration=\{pvpRankingRegeneration\}/);
  const pvpPanel = read("src/components/admin/pokemon/pvp-rankings-panel.jsx");
  const diagnostics = read("src/components/admin/pokemon/current-dataset-diagnostics.jsx");
  assert.match(pvpPanel, /retryLabel/);
  assert.match(pvpPanel, /regeneration=\{regeneration\}/);
  assert.match(diagnostics, /Voir le rapport/);
  assert.match(diagnostics, /Relancer/);
  for (const label of ["MAPPING_MISSING", "Ignorés", "WARNING"]) {
    assert.match(diagnostics, new RegExp(label));
  }
  for (const field of ["mappingMissingCount", "ignoredCount", "warningsCount", "unmatchedCount"]) {
    assert.match(orchestrator, new RegExp(`"${field}"`));
  }
  assert.match(adminRoute, /asynchronousRegenerationDomains/);
  assert.match(adminRoute, /\/regenerate\/\$\{encodeURIComponent\(runId\)\}/);
});

test("les aliases inconnus disposent d’un workflow de résolution détaillé", () => {
  const panel = read("src/components/admin/pokemon/identity-manager-panel.tsx");
  for (const label of ["Associer", "Créer une identité", "Ignorer", "Faux positif", "Voir les", "Exporter le diagnostic"]) {
    assert.match(panel, new RegExp(label));
  }
  for (const field of ["Première détection", "Dernière détection", "Occurrences", "Action proposée", "Normalisé", "confiance"]) {
    assert.match(panel, new RegExp(field, "i"));
  }
  assert.match(panel, /identity-manager-diagnostic-update/);
  assert.match(panel, /Résolu depuis le diagnostic/);
});

test("la recherche Admin Pokémon persiste dans l’URL et se propage aux sections compatibles", () => {
  const app = read("src/components/admin/pokemon/admin-app.jsx");
  const context = read("src/components/admin/pokemon/admin-pokemon-search-context.tsx");
  const gameMaster = read("src/components/admin/pokemon/game-master-explorer-panel.jsx");
  assert.match(app, /<AdminPokemonSearchProvider\s+query=\{search\}/);
  assert.match(app, /url\.searchParams\.set\("q", value\)/);
  assert.match(app, /requestedParams\.get\("q"\)/);
  assert.match(app, /onSearchChange=\{updateGlobalSearch\}/);
  assert.match(context, /combineAdminPokemonSearch/);
  assert.match(context, /useAdminPokemonSearch/);
  assert.match(gameMaster, /combineAdminPokemonSearch\(globalSearch, filters\.q\)/);
  assert.match(gameMaster, /combineAdminPokemonSearch\(globalSearch, comparisonFilters\.q\)/);

  for (const file of [
    "catalog-panel.jsx",
    "community-days-panel.jsx",
    "eggs-panel.jsx",
    "identity-manager-panel.tsx",
    "max-battles-panel.jsx",
    "raids-panel.jsx",
    "research-panel.jsx",
    "rocket-panel.jsx",
  ]) {
    const panel = read(`src/components/admin/pokemon/${file}`);
    assert.match(panel, /useAdminPokemonSearch/);
    assert.match(panel, /combineWith/);
  }
});
