import fs from "node:fs";
import path from "node:path";

const directory = import.meta.dirname;
const postAudit = "[34-post-audit-changes.md](./34-post-audit-changes.md)";
const featureRoot = "../Dashboard Admin/docs/codex/Post-audit 2026-07-13";
const link = (id, file) => `[${id}](<${featureRoot}/${file}>)`;
const page = link("PAGE-049", "PAGE-049-ma-collection-pokemon-go.md");
const component = link("COMP-137", "COMP-137-trainer-pokemon-collection-panel.md");
const dataset = link("DATASET-020", "DATASET-020-collection-personnelle-pokemon-go.md");
const workflow = link("WORKFLOW-016", "WORKFLOW-016-import-collection-pokemon-go.md");
const routes = [
  link("API-157", "API-157-get-trainer-pokemon.md"),
  link("API-158", "API-158-post-trainer-pokemon-import.md"),
  link("API-159", "API-159-get-trainer-pokemon-imports.md"),
  link("API-160", "API-160-post-trainer-pokemon-rollback.md"),
].join(", ");
const collections = [
  link("COL-030", "COL-030-trainer-pokemon-owners.md"),
  link("COL-031", "COL-031-trainer-pokemon-snapshots.md"),
  link("COL-032", "COL-032-trainer-pokemon-entries.md"),
].join(", ");

const updates = {
  "00-progress.md": [`- L’état courant ajoute ${page}, ${component}, ${dataset} et ${workflow}.`, "- Les volumes courants sont 49 pages/sections, 137 composants, 160 routes, 32 collections, 20 datasets et 16 workflows.", `- La synthèse de l’écart est ${postAudit}.`],
  "01-executive-summary.md": [`- Le Dashboard contient maintenant la section privée ${page}.`, `- La fonctionnalité relie ${component}, ${routes}, ${collections}, ${dataset} et ${workflow}.`, "- Aucune route publique, dépendance npm ou famille d’assets n’a été ajoutée."],
  "02-repository-map.md": ["- Dashboard Admin déclare désormais la version 1.21.0 dans package.json et V1.21.0 dans app-version.ts.", "- Le dépôt Dashboard ajoute les fichiers trainer-pokemon, quatre handlers App Router et une suite node:test ciblée.", "- Les quatre autres dépôts ne reçoivent aucun changement de code pour cette fonctionnalité."],
  "03-architecture-overview.md": ["- L’architecture courante compte 49 pages/sections, 137 composants, 160 routes, 32 collections, 20 datasets et 16 workflows.", `- ${workflow} reste dans le Dashboard et lit les référentiels publics PokemonGo-API avant d’écrire MongoDB Dashboard.`, "- Le pointeur activeSnapshotId sépare l’activation du stockage des entrées."],
  "04-folder-structure.md": ["- Dashboard Admin contient 29 fichiers route.ts et 38 méthodes HTTP exportées.", "- src/lib/trainer-pokemon contient atomic.ts, http.ts, normalize.ts, references.ts, repository.ts et schema.ts.", `- Le nouveau composant est ${component}; les quatre handlers sont documentés par ${routes}.`],
  "05-routing-and-layouts.md": [`- ${page} est une section client de /pokemon-admin identifiée par section=my-collection; elle ne crée pas un fichier page.tsx supplémentaire.`, "- Quatre fichiers route.ts privés servent lecture, preview/commit, historique et rollback.", "- Le nombre de pages routées Dashboard reste 20; le nombre de sections Admin Pokémon passe à 24."],
  "06-dashboard-overview.md": [`- AdminApp expose 24 sections et charge ${component} avec next/dynamic.`, "- La section Ma collection utilise les primitives Badge, Button, Card, Input et Modal.", "- Les opérations passent exclusivement par les quatre handlers privés du Dashboard."],
  "07-pages-registry.md": [`- Le registre courant contient 49 entrées: 25 pages routées publiques/privées et 24 sections Admin Pokémon.`, `- ${page} rend ${component} et consomme ${dataset}.`, "- La section exige la session admin et ne possède aucune route publique."],
  "08-components-registry.md": [`- Le registre courant contient 137 fichiers de composants; la catégorie Feature contient 42 entrées.`, `- ${component} compte 365 lignes, utilise cinq primitives UI et appelle les quatre routes privées trainer-pokemon.`, "- AdminApp charge ce composant dynamiquement; les autres panneaux historiques restent importés statiquement."],
  "09-design-system.md": [`- ${component} réutilise Badge, Button, Card, Input et Modal sans nouvelle primitive.`, "- src/components/ui/modal.tsx contient désormais focus initial, boucle Tab, fermeture Escape et restauration du focus.", "- Les images de la collection utilisent next/image et un placeholder local lorsque l’URL canonique est absente."],
  "10-hooks-contexts-services.md": ["- Le registre Services contient maintenant cinq entrées.", `- SERVICE-005 centralise les appels de ${component} vers ${routes}.`, "- Aucun hook ou contexte global n’a été ajouté; les totaux restent trois hooks et un contexte externe."],
  "11-providers-registry.md": ["- Aucun provider n’est ajouté; le total reste 18.", "- references.ts lit les routes publiques Pokémon, moves et types de PokemonGo-API avec timeout 20 secondes et cache mémoire 10 minutes.", "- Le JSON utilisateur est une entrée privée d’import, pas un provider externe."],
  "12-datasets-registry.md": [`- Le registre courant contient 20 datasets avec ${dataset} en private-dashboard.`, "- La source est un JSON choisi par l’administrateur; aucun export personnel n’est conservé dans Git ou localStorage.", `- Le snapshot actif est stocké dans ${collections}.`],
  "13-data-pipelines.md": [`- ${workflow} ajoute validation complète, normalisation canonique, preview sans écriture, snapshot staging, read-back, activation du pointeur et archivage de l’ancien actif.`, "- Le rollback revalide owner, statut et nombre d’entrées avant la même bascule activeSnapshotId.", "- Le code n’appelle pas deleteMany sur les collections trainer-pokemon."],
  "14-api-registry.md": ["- Le registre courant contient 160 routes: 122 dans PokemonGo-API- et 38 dans Dashboard Admin.", `- Les nouvelles entrées sont ${routes}.`, "- Les quatre handlers exigent session admin; les deux mutations ajoutent same-origin. Ils restent absents d’OpenAPI."],
  "15-mongodb-registry.md": [`- Le registre courant contient 32 collections; les nouvelles collections sont ${collections}.`, "- trainer_pokemon_owners possède l’index unique owner; snapshots possède deux index; entries possède neuf index.", "- Aucun TTL n’est déclaré sur ces trois collections."],
  "16-assets-registry.md": ["- Aucune famille d’assets n’est ajoutée; le registre reste à 17 entrées.", "- La normalisation sélectionne uniquement l’image normale ou shiny exacte issue des référentiels API.", "- Une correspondance absente conserve image=null et produit un diagnostic MISSING_ASSET; aucun URL d’asset n’est fabriqué."],
  "17-cache-and-local-data.md": ["- Les réponses trainer-pokemon utilisent Cache-Control private, no-store et Vary: Cookie.", "- references.ts conserve une Promise de référentiels pendant 10 minutes et la réinitialise après erreur.", "- La fonctionnalité ne crée aucune clé localStorage et ne stocke aucun payload utilisateur dans le navigateur après import."],
  "18-authentication-and-security.md": ["- Le Dashboard contient désormais 38 méthodes API enregistrées.", "- Le préfixe /api/trainer-pokemon traverse proxy.ts puis chacun des quatre handlers vérifie getSession et role=admin.", "- Preview/commit est limité à 12 Mo et 20 000 entrées; import et rollback appliquent same-origin et des rate limits dédiés."],
  "19-responsive-audit.md": [`- ${page} rend des cartes sous lg et une table scrollable min-width 1540 px à partir de lg.`, "- Les viewports 1440×1000, 820×1180 et 390×844 ont été contrôlés pendant la livraison post-audit.", "- La recherche, les filtres, les statistiques et les actions passent de grilles empilées à des groupes desktop."],
  "20-accessibility-audit.md": ["- La page ajoute une live region polite, des labels de champs, un role=alert et un tableau nommé.", "- La Modal commune piège Tab, ferme sur Escape et restaure le focus à l’élément déclencheur.", "- Les images exposent un alt métier ou le texte Image indisponible avec le nom français."],
  "21-performance-audit.md": ["- AdminApp contient désormais un import dynamique: TrainerPokemonCollectionPanel.", "- La recherche trainer attend 300 ms; la route limite les réponses à 100 entrées et utilise pagination, projection et index MongoDB.", "- Les référentiels Pokémon, moves et types sont chargés en parallèle puis partagés dix minutes côté serveur."],
  "22-error-handling.md": ["- trainerPokemonServerError introduit un format success=false avec code, message et issues facultatives.", "- Les messages 5xx sont masqués; les statuts 400, 403, 404, 409, 413, 429, 502 et 503 restent distingués par les helpers et guards.", "- Un échec avant activation conserve le snapshot actif; un staging en échec reçoit status=failed et failureCode."],
  "23-logging-and-monitoring.md": ["- Import, échec avant activation et rollback écrivent des logs structurés par préfixe trainer-pokemon.", "- Les logs contiennent owner, snapshotId, count et préfixe de checksum, sans payload personnel.", "- Aucun SDK d’alerte, TTL ou signal externe n’est ajouté."],
  "24-testing-strategy.md": ["- Le total déclaré passe à 118 tests node:test: 66 API, 32 Data, 7 Dashboard structure et 13 trainer-pokemon.", "- La suite trainer simule import initial, remplacement, échecs d’écriture/read-back, erreur après bascule, rollback valide et rollback refusé.", "- Le test du fichier réel de 4 838 entrées s’exécute uniquement lorsque le fichier local attendu existe."],
  "25-versioning-and-release.md": ["- Dashboard package.json, app-version.ts, dashboard-version-history.ts et CHANGELOG.md sont alignés sur 1.21.0/V1.21.0.", "- Le changelog 1.21.0 décrit PAGE-049, le stockage snapshot, les quatre routes privées et la documentation post-audit.", "- Aucun tag Git local ni outil automatique de release n’est ajouté."],
  "26-deployment-and-ci.md": ["- La fonctionnalité ajoute quatre fonctions App Router au déploiement Dashboard existant.", "- Aucune variable d’environnement nouvelle n’est requise; le code réutilise DASHBOARD_MONGODB_URI, MONGODB_URI, DASHBOARD_MONGODB_DB et POKEMON_API_PUBLIC_URL.", "- Aucun workflow GitHub Dashboard n’est ajouté; test:trainer-pokemon reste une commande locale."],
  "27-dependencies-map.md": ["- Le graphe courant contient 890 arêtes après ajout des relations PAGE-049, COMP-137, SERVICE-005, API-157 à API-160, DATASET-020 et COL-030 à COL-032.", "- Les relations couvrent rendu, appels service/API, lectures/écritures dataset et matérialisation MongoDB.", `- La chaîne complète est ${page} → ${component} → SERVICE-005 → routes privées → ${dataset} → collections privées.`],
  "28-workflows.md": [`- Le registre documentaire contient désormais ${workflow}; le total passe à 16 workflows.`, "- Preview n’écrit rien; commit écrit staging et entries, vérifie volume et checksum des identifiants, puis bascule activeSnapshotId.", "- Rollback répète la vérification de propriétaire et de volume avant activation."],
  "29-public-private-matrix.md": ["- L’état courant compte 160 routes: 92 publiques/techniques, 67 privées/admin et 1 interne bloquée.", "- Les 20 datasets comprennent 17 sorties publiques et trois datasets privés: Shiny, Source Watch et collection du dresseur.", "- Les 32 collections comprennent 16 exposées sélectivement, 15 privées et syncruns interne."],
  "30-documentation-mapping.md": ["- documentation-map.json contient 567 entrées: 483 générables, 59 avec informations manquantes et 25 Foundation documentées dans l’état courant.", "- Les nouvelles fiches spécialisées couvrent PAGE-049, COMP-137, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016.", "- DOC-011 à DOC-035 suivent maintenant les intitulés et fichiers Foundation réellement créés."],
  "31-gaps-and-technical-debt.md": ["- Les snapshots trainer-pokemon n’ont ni TTL ni politique de rétention codée.", "- Aucun monitoring externe ne signale un import failed ou un pointeur actif manquant.", "- Le commit et le rollback MongoDB nécessitent une base configurée; la livraison post-audit n’a exécuté aucune mutation de données personnelle."],
  "32-final-index.md": ["- L’index courant référence 49 pages/sections, 137 composants, 160 routes, 32 collections, 20 datasets et 16 workflows.", `- Les onze fiches post-audit sont reliées depuis ${postAudit} et depuis les Foundation concernées.`, "- documentation-map.json contient 567 entrées après réconciliation."],
  "33-final-checklist.md": ["- PAGE-049, COMP-137, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016 possèdent une fiche spécialisée existante.", "- Les registres JSON, le mapping documentaire, les rapports d’audit et DOC-011 à DOC-035 utilisent les volumes courants.", "- Les liens internes et les sources sont contrôlés par le script de vérification Foundation."],
};

const exactReplacements = new Map([
  ["alt souvent présent", "alt présent dans les éléments recensés"],
  ["montent souvent le même routeur", "montent le même routeur"],
  ["utilisent généralement la branche", "utilisent la branche"],
  ["choisissent généralement `assets.image`", "choisissent `assets.image`"],
  ["un mode par défaut souvent dry", "un mode par défaut dry dans les scripts recensés"],
  [", généralement, contrôle handler", ", contrôle handler vérifié pour les routes recensées"],
  ["sont souvent préservés", "sont préservés dans les helpers recensés"],
  ["deviennent souvent `{}`", "deviennent `{}` dans plusieurs handlers"],
  ["sont généralement transformées", "sont transformées dans les composants recensés"],
  ["JSON invalide souvent requalifié", "JSON invalide requalifié dans plusieurs handlers"],
  ["sert souvent de succès", "sert aussi de succès"],
  ["souvent implicites dans les classes/props", "implicites dans les classes/props recensées"],
  ["sources souvent privées", "sources privées pour les référentiels recensés"],
  ["pourrait hériter du mauvais middleware", "risque d’hériter du mauvais middleware"],
  ["Échec souvent converti", "Échec converti dans les services recensés"],
  ["sont généralement dans des conteneurs responsifs", "sont dans des conteneurs responsifs"],
  ["utilisent généralement same-origin", "utilisent same-origin pour les mutations recensées"],
  ["ont généralement des timeouts explicites", "ont des timeouts explicites dans les adapters et relais recensés"],
  ["n'exigent généralement pas de capture", "n'exigent pas de capture dans le mapping actuel"],
  ["suivent souvent des préfixes conventionnels", "emploient des préfixes conventionnels dans l’historique recensé"],
  ["souvent avec un champ imbriqué", "avec un champ imbriqué dans les occurrences recensées"],
  ["emploient souvent `alt=\"\"`", "emploient `alt=\"\"` dans les occurrences décoratives recensées"],
  ["combinent généralement couleur", "combinent couleur"],
  ["exposent souvent `error.message`", "exposent `error.message` dans plusieurs handlers"],
  ["pourrait exposer le dataset", "présente un risque d’exposition du dataset"],
  ["JSON invalide souvent converti", "JSON invalide converti dans plusieurs handlers"],
]);

const start = "<!-- current-state-2026-07-13:start -->";
const end = "<!-- current-state-2026-07-13:end -->";

for (const [name, bullets] of Object.entries(updates)) {
  const file = path.join(directory, name);
  let source = fs.readFileSync(file, "utf8");
  for (const [from, to] of exactReplacements) source = source.replaceAll(from, to);
  const block = `${start}\n\n## Mise à jour code courant — 13 juillet 2026\n\n${bullets.join("\n")}\n\n${end}`;
  if (source.includes(start)) {
    source = source.replace(new RegExp(`${start}[\\s\\S]*?${end}`), block);
  } else {
    const title = source.match(/^# .+$/m);
    if (!title) throw new Error(`Titre principal absent: ${name}`);
    const offset = title.index + title[0].length;
    source = `${source.slice(0, offset)}\n\n${block}${source.slice(offset)}`;
  }
  if (!/^last_updated:/m.test(source)) source = source.replace(/^---\n/, "---\nlast_updated: 2026-07-13\n");
  fs.writeFileSync(file, source);
}

const summaryFile = path.join(directory, "34-post-audit-changes.md");
let summary = fs.readFileSync(summaryFile, "utf8");
summary = summary.replace(
  "Ce document est un addendum. Les rapports historiques `00` à `33` ne sont pas réécrits et continuent de décrire le snapshot audité le 12 juillet 2026.",
  "Ce document conserve l’écart post-audit. Les rapports `00` à `33` portent désormais un encart « Mise à jour code courant — 13 juillet 2026 » lorsqu’un constat est affecté; leurs sections d’audit initial continuent d’identifier le snapshot du 12 juillet 2026.",
);
summary = summary.replace(
  "Sections ciblées ajoutées dans DOC-011, DOC-012, DOC-013, DOC-014, DOC-016, DOC-017, DOC-019, DOC-020, DOC-021, DOC-022, DOC-023, DOC-024, DOC-027, DOC-028, DOC-029, DOC-030 et DOC-033. Les structures et contenus initiaux sont conservés.",
  "DOC-011 à DOC-035 utilisent désormais le même front matter, les huit mêmes sections et des faits vérifiés dans le code courant. Les rapports Markdown `00` à `33` portent un encart daté du 13 juillet 2026 et les registres JSON intègrent PAGE-049, COMP-137, SERVICE-005, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016.",
);
if (!/^last_updated:/m.test(summary)) summary = summary.replace(/^---\n/, "---\nlast_updated: 2026-07-13\n");
fs.writeFileSync(summaryFile, summary);

console.log(`${Object.keys(updates).length + 1} rapports Markdown d’audit actualisés.`);
