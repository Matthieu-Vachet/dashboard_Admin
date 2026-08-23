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

## LOT 07

STATUS: DONE

CAUSE RACINE: le déclencheur `collectionSelector` était rendu dans une rangée dédiée, séparée de la card active et du menu d'actions, avec deux wrappers responsive distincts.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/collections-panel.jsx`, `scripts/test-collection-catalog.mjs`, `scripts/test-collections-e2e.mjs`, documentation `collection-selector-header.md` et journal.

TESTS: Collections (12/12), TypeScript, ESLint (0 erreur, 71 avertissements), documentation (171 valides), build et postbuild: OK. E2E Collections: une collection, deux collections, sélection, nom très long, sheet mobile, 7 viewports de 320 à 1 440 px, 2 thèmes, aucun overflow et aucune erreur console.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` inchangées.

COMMIT: `c7c75069262caa7b188cc47ddf4e6e46edf79a6a` — `refactor(collections): integrate collection selector into active card`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-szjgqebbq-matthieu-vachets-projects.vercel.app` (`READY`, commit `c7c7506`).

REMARQUES: le nom actif est maintenant le déclencheur dans l'en-tête de la card, à gauche du menu `…`. Progression et nombre de collections restent dans la card. À 320 px, le nom long est tronqué avec son libellé complet accessible et le sheet existant reste contenu dans le viewport.

NEXT: LOT 08 — expliquer clairement le statut `PARTIAL` des classements PvP.

## LOT 08

STATUS: DONE

CAUSE RACINE: l'état de régénération ne conservait qu'un compteur et des chaînes d'avertissement non structurées. Les deux avertissements du snapshot PvP restaient donc sans code, entité, impact ni action: Volcarona ne peut pas produire de Rank 1 légal en Ligue Bayou à cause de son niveau plancher 20, et la sentinelle PvPoke `none` d'Unown était traitée comme une attaque non reconnue alors qu'elle signifie seulement l'absence de seconde attaque chargée.

FICHIERS MODIFIÉS: `src/lib/pvp-ranking-regeneration-state.mjs`, `src/components/admin/pokemon/current-dataset-diagnostics.jsx`, `scripts/test-pvp-ranking-regeneration-state.mjs`, documentation `pvp-partial-warnings.md`, `docs/Reports/RANKED-DATASETS.md`, `docs/ADMIN-ARCHITECTURE.md` et journal.

TESTS: état de régénération PvP (10/10), Admin Pokémon (45/45), notifications (7/7), actions Admin (7/7), matrice de régénération (6/6), PvP dédié (3/3), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild, registre de régénération (17 actions, 15 globales): OK. Navigateur: détail et rapport avec les deux avertissements expliqués, desktop et 390 px, thèmes sombre et clair, aucun overflow horizontal, aucune erreur runtime; axe: 0 violation et 1 contrôle de contraste incomplet car le fond en dégradé ne pouvait pas être déterminé.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT: `8ae517af710437ae335b236fd2d73d435b9a6773` — `fix(pvp-ranking): expose partial generation warnings`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-n79otdszb-matthieu-vachets-projects.vercel.app` (`READY`, HTTP 200, commit `8ae517a`).

REMARQUES: le statut reste `PARTIAL` car `RANK1_INELIGIBLE_AT_SOURCE_LEVEL_FLOOR` a un impact réel mais non bloquant sur les champs Rank 1 de Volcarona. `MOVE_UNMATCHED:none` est désormais explicitement informatif et ne dégrade pas seul un résultat en `PARTIAL`. Chaque avertissement expose code, entité, raison, impact et action dans Détails et `Voir le rapport`. Le quota de l'API d'arbre GitHub a empêché un nouveau run distant en lecture seule; l'audit croisé du snapshot MongoDB courant, des entrées détaillées, des données CDN PvPoke et du générateur synchronisé a fourni les preuves exactes. `origin/main` reste inchangée.

NEXT: LOT 09 — rendre les attaques héritage immédiatement identifiables dans les détails PvP.

## LOT 09

STATUS: DONE

CAUSE RACINE: `MoveBadge` recevait déjà le booléen canonique `move.legacy`, mais ne l'utilisait que pour un micro-badge. La card conservait exactement la même surface et la même élévation qu'une attaque ordinaire, ce qui rendait le statut difficile à repérer dans les listes d'attaques.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/pvp-rankings-panel.jsx`, `src/app/globals.css`, `scripts/test-pvp-legacy-move-highlight.mjs`, `package.json` et journal.

TESTS: lueur Legacy (2/2), Admin Pokémon (45/45), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild (49 pages), registre de régénération (17 actions, 15 globales), `git diff --check`: OK. Navigateur sur Coudlangue: 7 cards Legacy détectées, lueur calculée depuis `--warning` dans les thèmes sombre et clair, texte inchangé, aucun overflow à 390 px, console et erreurs runtime vides, axe 0 violation et 1 contrôle de contraste incomplet car le fond en dégradé ne pouvait pas être déterminé. La suite Design System globale reste rouge sur sa baseline historique (8 patterns typographiques génériques et couleurs legacy hors lot); la règle ajoutée dispose de son contrôle ciblé et ne contient aucun littéral couleur.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT: `158480940031d4083c7e27bfce1b81926d09cbab` — `style(pvp-ranking): highlight legacy moves`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-8jvx3rwc0-matthieu-vachets-projects.vercel.app` (`READY`, HTTP 200, commit `1584809`).

REMARQUES: une seule règle `.pvp-legacy-move` produit outline, halo externe et lueur interne à partir du token adaptatif `--warning`; aucune couleur jaune n'est dupliquée dans le composant. La bordure gauche par type et tout le contenu de la card restent inchangés. `origin/main` reste inchangée.

NEXT: LOT 10 — auditer et clarifier la signification réelle du badge `LEGACY`.

## LOT 10

STATUS: DONE

CAUSE RACINE: le générateur global déduisait `legacy` du chemin `-elite/` de chaque fichier d'attaque, puis l'écrasement par identifiant faisait apparaître toutes les attaques disposant d'une copie Elite comme héritage sur tous les Pokémon. PvPoke ne fournissait pas ce badge dans la ligne de classement; ses données Game Master distinguent au contraire, par Pokémon, `eliteMoves` et `legacyMoves`.

FICHIERS MODIFIÉS: `src/lib/pvp-ranking-local-data.mjs`, `src/server/pokemon-go/apps/checklist/server/engine.js`, `src/components/admin/pokemon/pvp-rankings-panel.jsx`, tests PvP locaux et Legacy, documentation `pvp-legacy-move-classification.md` et journal.

TESTS: données locales PvP (6/6), classification visuelle (3/3), PvP dédié (3/3), régénération PvP (10/10), catégories d'entités (2/2), Admin Pokémon (45/45), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild (49 pages), `git diff --check`: OK. Navigateur sur Coudlangue: seule `Plaquage` est mise en évidence et étiquetée `Héritage`, tooltip exact, aucun libellé `LEGACY`, aucun overflow, console vide, axe 0 violation et 1 contrôle de contraste incomplet sur le dégradé. Le cas strict historique est couvert avec Acide de Grotadmorv sous le libellé `Retirée`.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT: `ddbfe4927ee4edcb173208467839c84a19b50245` — `fix(pvp-ranking): clarify legacy move classification`

PUSH: `origin/develop` au commit fonctionnel; checkpoint documenté dans le commit suivant.

PREVIEW: `https://dashboard-admin-j78aogsp2-matthieu-vachets-projects.vercel.app` (`READY`, HTTP 200, commit `ddbfe49`, aperçu CLI car le webhook Git n'avait pas encore matérialisé le push).

REMARQUES: le badge `Héritage` s'appuie maintenant uniquement sur les movepools Elite du Pokémon et reprend l'aide demandée; les entrées strictement historiques restent une catégorie séparée `Retirée`. La documentation pointe le commit PvPoke exact du mapping courant et n'attribue plus la classification ambiguë à PvPoke. `origin/main` reste inchangée.

NEXT: LOT 11 — restaurer les coéquipiers suggérés sans masquer les erreurs serveur.

## LOT 11

STATUS: DONE

CAUSE RACINE: la route API lançait le Team Ranker client de PvPoke dans Chromium. Les logs Vercel ont d'abord montré le timeout du sélecteur `.partner-pokemon .list a`, puis un `FUNCTION_INVOCATION_TIMEOUT` à 60 secondes sur le preview corrigé: le démarrage du navigateur et les simulations dépassaient le budget CPU serverless. Un premier cache de migration avait en outre conservé une projection non hydratée, et l'alias Vercel historique consommé par le Dashboard n'était plus réaligné automatiquement sur le dernier preview `develop`.

FICHIERS MODIFIÉS: côté API, service Suggested Teammates, route PvP Rankings, cache Mongo, configuration et dépendances Chromium, tests et `docs/RANKED-DATASETS.md`; côté Dashboard, proxy `pokemon-admin`, état vide de `pvp-rankings-panel.jsx`, test Admin et documentation `pvp-suggested-teammates.md`; journal.

TESTS: API complète (182/182), build et postbuild; Dashboard données PvP locales (6/6), Admin Pokémon (46/46), PvP dédié (3/3), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild, `git diff --check`: OK. Vercel réel: Great/Coudlangue, Ultra/Coudlangue, Master/Dracolosse et Great/Feunard d'Alola répondent tous HTTP 200 avec cinq numéros Pokédex uniques, cinq assets Identity Manager exacts et zéro diagnostic; le cas non classé répond HTTP 200, tableau vide et `RANKING_NOT_FOUND`. Navigateur Dashboard: proxy HTTP 200, cinq suggestions, écran mobile 390 px sans overflow et aucune erreur runtime.

VERSION: Dashboard `1.50.0`, API `1.25.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT DASHBOARD: `a352afedc52917b68eb075e8ce52c03a2a673c8c` — `fix(pvp-ranking): restore suggested teammates`

COMMIT API FINAL: `7ef530c1da8ca3f9c3ff00d790fc502d47f3ceee` — `fix(pvp-ranking): restore suggested teammates` (après les checkpoints correctifs `ca63f110`, `4f751b4f` et `231b692b`).

PUSH: les deux dépôts sont alignés sur `origin/develop`; les branches `main` restent inchangées (`103a0f3b` Dashboard, `952107b8` API).

PREVIEWS: Dashboard `https://dashboard-admin-8ad01czyh-matthieu-vachets-projects.vercel.app` (`READY`, commit `a352afe`); API `https://pokemon-go-ngk598kkb-matthieu-vachets-projects.vercel.app` (`READY`, commit `7ef530c`). L'alias `https://pokemon-go-api-develop-matthieu-vachets-projects.vercel.app` pointe sur ce preview API validé.

REMARQUES: le calcul `ranked-dataset-complement` utilise le snapshot PvPoke MongoDB déjà synchronisé: counters de la source, matchups, score, faiblesses communes et rang. Les vingt meilleurs candidats sont résolus en un seul lot par Identity Manager, puis dédupliqués par numéro Pokédex avant les cinq cartes. La clé de cache `v4` inclut hash, ligue et espèce. Un snapshot invalide reste une erreur explicite; seule l'absence réelle du classement devient un état vide. Le proxy Dashboard conserve le statut HTTP et extrait les erreurs structurées `error.message` sans les convertir en `[object Object]`.

NEXT: LOT 12 — poursuivre l'audit fonctionnel et visuel selon la mission.

## LOT 12

STATUS: DONE

CAUSE RACINE: le Dashboard déduisait l'état global de `create || update || orphan`. Les 12 documents MongoDB absents de l'inventaire local, déjà conservés en `draft/orphaned`, restaient donc assimilés à une modification. Côté API, chaque aperçu les replaçait dans le plan d'écriture et chaque application les réécrivait avec un nouvel `updatedAt` et une nouvelle entrée d'historique. L'opération n'était pas idempotente et aucun contrat backend ne distinguait un orphelin conservé d'un orphelin encore à marquer.

FICHIERS MODIFIÉS: côté API, `src/services/pokemon-identity-sync-service.js`, tests de synchronisation locale et `docs/IDENTITY-MANAGER.md`; côté Dashboard, `identity-manager-panel.tsx`, orchestrateur de régénération globale et contrôles navigateur associés; journal.

TESTS: API complète (183/183), build et postbuild; Dashboard Admin Pokémon (46/46), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild, `git diff --check`: OK. Vercel réel: preview HTTP 200, deux applications HTTP 200, deux aperçus suivants HTTP 200, digest identique `76337df218c2185194780ce02717b2b506f1d6920dbb88ba7ac02e44f7feff9e`, historique inchangé. Chaque résultat expose `SYNCED`, `dirty:false`, 1 928 inchangées, 0 création, 0 mise à jour, 0 conflit, 12 orphelins conservés et 0 à marquer. Navigateur: badge et modale `Synchronisé`, bouton d'application désactivé, desktop et 390 px sans overflow horizontal ni erreur runtime.

VERSION: Dashboard `1.50.0`, API `1.25.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT DASHBOARD: `515c18f9cb2fa8c35362e6ef9c22ab67fc405835` — `fix(identity): make synchronization state deterministic`

COMMIT API: `0c926c90e88e3f5de10dafa8a3e65426ad195943` — `fix(identity): make synchronization state deterministic`

PUSH: les deux dépôts sont alignés sur `origin/develop`; les branches `main` restent inchangées (`103a0f3b` Dashboard, `952107b8` API).

PREVIEWS: Dashboard `https://dashboard-admin-akna0e0b0-matthieu-vachets-projects.vercel.app` (`READY`, commit `515c18f`); API `https://pokemon-go-ldsoun6xf-matthieu-vachets-projects.vercel.app` (`READY`, commit `0c926c9`). L'alias API `develop` consommé par le Dashboard a été réaligné sur ce déploiement.

REMARQUES: l'API compare deux projections structurelles SHA-256 selon la même sérialisation JSON stable et le même ordre `pokemonId`, `canonicalId`, `identityKey`. `SYNCED` exige les empreintes égales et l'absence de création, mise à jour, conflit ou orphelin encore à marquer. `orphan` reste un compteur informatif; seul `orphanUpdate` déclenche une écriture et un historique. `lastSyncedAt` provient du dernier `localIdentity.lastValidatedAt` portant l'empreinte courante. Les logs Vercel confirment tous les appels BFF/API utiles en HTTP 200 et sans erreur applicative.

NEXT: LOT 13 — classifier et résumer les diagnostics détaillés de l'Identity Manager sans suppression artificielle.
