# Journal de progression — polish du Dashboard Pokémon

Ce fichier est la source de reprise de la mission. Lire le dernier lot avant toute intervention et ne jamais recommencer un lot `DONE` sans cause documentée.

## LOT 00

STATUS: DONE

CAUSE RACINE: le harnais responsive attendait encore l'ancienne route `/pokemon-admin` après la séparation vers la homepage `/` et les routes Pokémon plates.

FICHIERS MODIFIÉS: `scripts/verify-pokemon-responsive.mjs`, `docs/migrations/pokemon-dashboard-polish/baseline.md`, `docs/migrations/pokemon-dashboard-polish/progress.md`.

TESTS: TypeScript PASS; ESLint PASS (0 erreur, 70 warnings historiques); suites split/Admin/Fiche/Collections/PvP/Source Watch/Engine/Data/Registry/Best Defenders/version/docs PASS; build et postbuild PASS; navigateur PASS; responsive 220 pages, 11 largeurs, 2 thèmes PASS.

VERSION: Dashboard `1.50.0`, Data runtime `1.28.0`, API déclarée `1.0.1`.

COMMIT: `7847a311cbee634f3cfe3c950b71e985ef0135c1`

PUSH: `origin/develop` (checkpoint documenté dans le commit suivant)

PREVIEW: `https://dashboard-admin-8cmgkqi6x-matthieu-vachets-projects.vercel.app` (`READY`, baseline `186adb2`).

REMARQUES: snapshot externe conservé sous `/Users/matthieuvachet/Desktop/Workflow/archives/pokemon-dashboard-polish-before-2026-08-23-02-25-00`; `origin/main` initial `103a0f3` inchangé.

NEXT: LOT 01 — aligner les icônes du menu principal.

## LOT 01

STATUS: DONE

CAUSE RACINE: onze entrées métier mélangeaient icônes Lucide, assets distants et assets publics locaux; les sept fichiers récemment ajoutés n'étaient pas versionnés.

FICHIERS MODIFIÉS: `src/data/dashboard.ts`, `src/components/admin/navigation/admin-sidebar.tsx`, `scripts/test-admin-pokemon-refactor.mjs`, sept PNG publics, documentation de navigation et journal.

TESTS: `npm run test:admin-pokemon` (44/44), `npm run test:split` (5/5), `npm run typecheck`, `npm run lint` (0 erreur, 70 avertissements historiques), `npm run test:docs`, `npm run test:pokemon-responsive` (220 pages, 11 largeurs, 2 thèmes), contrôle navigateur de la page de connexion et `npm run build`: OK.

VERSION: Dashboard `1.50.0` (version inchangée pendant le lot).

COMMIT: `6dc5dec56d272ef97203e34654a3db0844acad1b` — `style(navigation): align pokemon dashboard menu icons`

PUSH: `origin/develop` après ce checkpoint documenté.

PREVIEW: `https://dashboard-admin-fommvimq2-matthieu-vachets-projects.vercel.app` (`READY`, checkpoint `64e052dfc492a68ae5817ec1717b96f4b1d96ea6`).

REMARQUES: registre local unique partagé par desktop, mode réduit et drawer mobile; textes accessibles conservés (`aria-label` en mode réduit, images décoratives à `alt=""`); aucun asset dupliqué.

NEXT: LOT 02 — compacter les contrôles de régénération sans modifier leurs workflows.

## LOT 02

STATUS: DONE

CAUSE RACINE: le composant de diagnostic source persistait son état ouvert en session et exposait immédiatement provider, visibilité, diff, warnings, compteurs et rapport sur les douze pages consommatrices.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/current-dataset-diagnostics.jsx`, façade `dataset-source-header.jsx`, test de refactor Admin Pokémon, architecture, guide Ranked Datasets et documentation de migration.

TESTS: `npm run test:admin-pokemon` (44/44), `npm run typecheck`, `npm run lint` (0 erreur, 70 avertissements historiques), `npm run verify:regenerations` (17 actions, 15 globales, matrice 6/6, build et postbuild), contrats notifications (7/7), actions Admin (7/7), PvP (6/6), Best Defenders (6/6), split (5/5), docs (171 valides), navigateur et responsive (220 pages, 11 largeurs, 2 thèmes): OK.

VERSION: Dashboard `1.50.0` (version inchangée pendant le lot); Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`.

COMMIT: `4fc2b789328d8c942fee9bb2b37095d0bc846649` — `refactor(regeneration): compact dashboard regeneration controls`

PUSH: `origin/develop` après ce checkpoint documenté.

PREVIEW: `https://dashboard-admin-lvjsvx71n-matthieu-vachets-projects.vercel.app` (`READY`, checkpoint `25c04c70dd42fb717731f04ed26d28dfc205c963`).

REMARQUES: `RegenerationControl` part fermé à chaque montage, emploie un identifiant ARIA unique et conserve les façades historiques. Les handlers, boutons, états, toasts, polling, endpoints, rapports, timestamps et le Generator Registry ne changent pas.

NEXT: LOT 03 — auditer puis corriger le compteur Costume / Event dans Fiches.

## LOT 03

STATUS: DONE

CAUSE RACINE: le badge Fiches mesurait 130 entrées canoniques porteuses d’au moins un `eventAssets`, alors que le filtre transformait déjà ces sources en 311 identités costume/événement principales. Le badge et la liste n’utilisaient pas la même unité.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/admin-app.jsx`, tests Admin et projection Pokémon, documentation `costume-event-semantics.md` et journal.

TESTS: Admin Pokémon (45/45), présentation Pokémon (7/7), Collections (12/12), Engine canonique (6/6), TypeScript, ESLint (0 erreur, 70 avertissements historiques), documentation (171 valides), build et postbuild: OK. Cas couverts: Bulbizarre 3, Pikachu 96, Chrysacier 0, Évoli 7 identités principales / 14 multi dont 7 femelles.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` inchangées.

COMMIT: `138f76485146e7603dfaeca7d02e65f3463bab67` — `fix(pokemon-data): align costume event filter semantics`

PUSH: `origin/develop` après ce checkpoint documenté.

PREVIEW: déploiement automatique du checkpoint attendu après push; dernier preview du lot 02 READY.

REMARQUES: la valeur 311 n’est jamais codée dans le composant. Elle est recalculée par `pokemonPresentationEntries`, selon la même sémantique que Collections `event.single.standard`: `kind` costume/event uniquement, sexes regroupés, aucune forme structurelle ni double comptage.

NEXT: LOT 04 — afficher séparément chaque JSON Pokémon dans le viewer.

## LOT 04

STATUS: DONE

CAUSE RACINE: l'onglet JSON n'exposait que le fichier Pokémon et une agrégation `assetSourceData` reconstruite en mémoire. Cette seconde vue mélangeait Core et familles d'assets, masquait leurs chemins réels et n'exposait pas le document PvP canonique.

FICHIERS MODIFIÉS: `src/server/pokemon-go/apps/checklist/server/engine.js`, `src/components/admin/pokemon/detail-modal.jsx`, `scripts/test-canonical-json-viewer.mjs`, `package.json`, documentation `canonical-json-viewer.md` et journal.

TESTS: viewer canonique (3/3), Assets séparés (5/5), catégories d'entités (2/2), détail Pokémon (6/6), Admin Pokémon (45/45), TypeScript, ESLint (0 erreur, 70 avertissements historiques), documentation (171 valides), build et postbuild, registre de régénération (17 actions, 15 globales): OK. Navigateur: desktop et 390 px, copie du chemin, téléchargement identique au fichier disque, aucun overflow horizontal global, aucune erreur runtime et 0 violation axe dans la modale.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` inchangées.

COMMIT: `006fd549ef7e3f50d080fc1b2e8176fa104fc7f7` — `feat(pokemon-details): expose all canonical pokemon json records`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-i6cdeuzu0-matthieu-vachets-projects.vercel.app` (`READY`, HTTP 200, commit `006fd54`).

REMARQUES: le viewer utilise exclusivement `canonicalJsonRecords`. Chaque payload est le JSON lu dans son fichier réel, dans l'ordre Pokémon, Assets Core, Home, Shuffle, Variants, Location Cards et PvP; une section absente du disque n'est pas créée. Les cinq familles de fixture couvrent normal, Alola, Mega, Dynamax et Gigantamax, dont un PvP `UNSUPPORTED_FORM`.

NEXT: LOT 05 — intégrer les Méga-évolutions à la vue Évolution des fiches Pokémon.

## LOT 05

STATUS: DONE

CAUSE RACINE: les fiches de base publiaient seulement des références `megaEvolutions`, tandis que la vue Évolution ne consommait que le tableau d'évolutions classiques. Le coût et la disponibilité réels vivaient sur les fiches Méga cibles et n'étaient pas projetés dans le catalogue de navigation.

FICHIERS MODIFIÉS: `src/lib/pokemon-detail-data.mjs`, `src/server/pokemon-go/apps/checklist/server/engine.js`, `src/components/admin/pokemon/detail-modal.jsx`, `scripts/test-pokemon-mega-evolutions.mjs`, `package.json`, documentation `mega-evolution-view.md` et journal.

TESTS: Méga-évolutions (4/4), détail Pokémon (6/6), Admin Pokémon (45/45), catégories d'entités (2/2), TypeScript, ESLint (0 erreur, 71 avertissements), documentation (171 valides), build et postbuild: OK. Navigateur: Florizarre vers Méga-Florizarre, coût initial 200, statut disponible, navigation cible, desktop et 390 px sans overflow horizontal, 0 violation axe dans la modale.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT: `1d5fe8dd3cbf9d485a7d8c90eed290004f0e992e` — `feat(pokemon-details): integrate mega evolutions into evolution view`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-jz8mdubqc-matthieu-vachets-projects.vercel.app` (`READY`, commit `1d5fe8d`).

REMARQUES: les évolutions classiques et Méga partagent la section `Évolutions`; Dracaufeu X et Y restent deux cibles distinctes. `megaEnergyCost` et `availability.released` sont lus sur la cible. Aucun coût suivant, niveau Méga ou cooldown n'étant publié par les fiches canoniques actuelles, aucune valeur n'est inventée.

NEXT: LOT 06 — paginer les cartes de familles de bonbons dans Candies uniquement.

## LOT 06

STATUS: DONE

CAUSE RACINE: `CandyPanel` regroupait et filtrait correctement les familles, puis rendait les 542 cartes d'un seul bloc sans état de page, bornes ni résumé de plage.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/candy-panel.jsx`, `src/lib/candy-family-pagination.mjs`, `scripts/test-candy-family-pagination.mjs`, `package.json`, documentation `candy-family-pagination.md` et journal. Collections n'a pas été modifié.

TESTS: pagination Candies (3/3), assets Candy (5/5), Admin Pokémon (45/45), TypeScript, ESLint (0 erreur, 71 avertissements), documentation (171 valides), build et postbuild: OK. Navigateur: 542 familles, 61 pages, 9 cartes par page, plages 1–9 puis 10–18, recherche conservée et reset page 1, thème clair, mobile 390 px sans overflow, console vide et 0 violation axe dans le composant.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` inchangées.

COMMIT: `168f71790a0c8af4fbcd887e75ca3245b1559759` — `feat(candies): paginate candy family cards`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-bf07is3mj-matthieu-vachets-projects.vercel.app` (`READY`, commit `168f717`).

REMARQUES: la taille fixe de neuf familles produit trois rangées sur les écrans à trois colonnes. Les contrôles haut et bas exposent page, nombre de pages, plage et total; les bornes désactivent les actions. Le changement de recherche ou du jeu d'entrées revient à la page 1 sans effet React en cascade, et la pagination ne partage aucun état avec Collections.

NEXT: LOT 07 — repositionner le sélecteur de collection dans la card de collection active.
