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

## LOT 13

STATUS: DONE

CAUSE RACINE: les 1 163 diagnostics historiques étaient affichés comme une liste uniforme avec leur cause brute. Les 905 ouverts mélangeaient ainsi 881 anomalies Snacknap, 20 assets PvPoke manquants et quatre cas d'autres fournisseurs, sans code stable, sévérité, synthèse par provider ni distinction entre une entrée réellement actionnable et un alias déjà validé. Neuf diagnostics Snacknap restaient ouverts alors que leurs alias actifs pointaient déjà exactement vers trois formes Oricorio et six costumes Pikachu canoniques.

FICHIERS MODIFIÉS: côté API, modèle, routes et service Identity Manager, tests et `docs/IDENTITY-MANAGER.md`; côté Dashboard, proxy `pokemon-admin`, `identity-manager-panel.tsx`, test Admin Pokémon et journal.

TESTS: API complète (186/186), build et postbuild; Dashboard Admin Pokémon (46/46), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild, `git diff --check`: OK. Vercel réel: synthèse initiale HTTP 200, 905 ouverts dont 9 déjà associés; réconciliation HTTP 200 avec 885 diagnostics d'alias examinés, 9 trouvés et 9 modifiés; second passage HTTP 200 avec 876 examinés, 0 trouvé et 0 modifié. Après traitement: 896 ouverts/actionnables, 267 résolus, 0 ignoré, 0 faux positif, 0 référence résolue invalide et 1 825/1 825 alias actifs reliés à un chemin local. Les 20 `CANONICAL_ASSET_MISSING` PvPoke restent ouverts. Les filtres réels retournent 30 erreurs, 860 `FORM_UNKNOWN` et 20 assets canoniques manquants. Navigateur: 66 identités Snacknap conservent leurs 78 alias actifs et leurs chemins locaux; synthèse et cartes actionnables lisibles, desktop et 390 px sans overflow horizontal, console et erreurs runtime Vercel vides.

VERSION: Dashboard `1.50.0`, API `1.25.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT DASHBOARD: `5704458a7fa75112d35576c51a2cc41e620cde1a` — `fix(identity): reconcile provider diagnostics and aliases`

COMMIT API: `e4a18987192b6daf89e59c4d3a836c5a39f27088` — `fix(identity): reconcile provider diagnostics and aliases`

PUSH: les deux dépôts sont alignés sur `origin/develop`; les branches `main` restent inchangées (`103a0f3b` Dashboard, `952107b8` API).

PREVIEWS: Dashboard `https://dashboard-admin-65punpo5b-matthieu-vachets-projects.vercel.app` (`READY`, commit `5704458`); API `https://pokemon-go-a0qcsxer6-matthieu-vachets-projects.vercel.app` (`READY`, commit `e4a1898`). L'alias API `develop` consommé par le Dashboard a été réaligné sur ce déploiement.

REMARQUES: la taxonomie projette chaque cause historique vers un code et une sévérité sans réécrire ni supprimer le document source. La réconciliation est explicite, historisée dans le diagnostic par identité/utilisateur/date et limitée aux causes d'alias; elle exclut volontairement les alertes d'assets. Chaque entrée expose désormais provider, ID source, raison expliquée, candidats, action attendue et éventuel chemin canonique déjà associé. L'audit pré-écriture a vérifié individuellement les neuf correspondances et l'idempotence empêche toute clôture supplémentaire. `origin/main` reste inchangée.

NEXT: LOT 14 — corriger les faiblesses Rocket avec les icônes de types disponibles.

## LOT 14

STATUS: DONE

CAUSE RACINE: les données Rocket contenaient déjà deux listes fiables, `weaknesses.double` et `weaknesses.single`, mais `PokemonCard` les concaténait dans deux phrases en anglais sans icône ni multiplicateur. Le composant maintenait en plus une copie locale du registre d’assets de types alors qu’un résolveur partagé existait.

FICHIERS MODIFIÉS: `src/components/admin/pokemon/rocket-panel.jsx`, `src/lib/rocket-weakness-presentation.mjs`, test `scripts/test-rocket-weakness-assets.mjs`, script npm, documentation `rocket-weakness-type-assets.md` et journal.

TESTS: présentation Rocket (3/3), Admin Pokémon (46/46), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides, 0 avertissement), build et postbuild, `git diff --check`: OK. Le test charge le snapshot canonique et couvre Giovanni, Leaders, Grunts, mono-type, faiblesse simple, double faiblesse et absence de double faiblesse; chaque type réellement présent possède son fichier local. Navigateur réel: Persian affiche Combat ×1,6 sans groupe double; Rhinastoc affiche Eau et Plante ×2,56 puis Glace, Combat, Sol et Acier ×1,6; Dracaufeu chez Arlo affiche Roche ×2,56; Camérupt chez un Grunt Feu affiche Eau ×2,56. Toutes les icônes chargent, desktop et 390 px sans overflow horizontal, console et erreurs runtime Vercel vides.

VERSION: Dashboard `1.50.0` et Data runtime `1.28.0` au commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, inchangées.

COMMIT: `888e31c0fea13edb36e60c5a4142c1b5f9356b31` — `feat(rocket): visualize weaknesses with pokemon type assets`

PUSH: `origin/develop` au commit fonctionnel; `origin/main` reste inchangée à `103a0f3bd2f59298760f8b6cd0e01767b4d8159b`.

PREVIEW: `https://dashboard-admin-2w4z5wwqd-matthieu-vachets-projects.vercel.app` (`READY`, commit `888e31c`).

REMARQUES: les multiplicateurs suivent le contrat Pokémon GO déjà présent dans le référentiel des types: ×1,6 pour une faiblesse simple et ×2,56 pour deux efficacités superposées. Le Dashboard ne recalcule ni ne réécrit le snapshot. Les libellés français et les assets viennent désormais de `pokemon-style`; aucun logo n’a été recréé. Une entrée double est exclue du groupe simple si une source future la duplique.

NEXT: LOT 15 — rendre toutes les entrées non matchées actionnables avec un rapport générique.

## LOT 15

STATUS: DONE

CAUSE RACINE: le pipeline persistait le nombre agrégé de non-matchés et quelques tableaux hétérogènes sans contrat commun. Pour les mappings Game Master, le compteur incluait en plus 471 identités `local-only` de PokemonGo-Data alors que le générateur les excluait explicitement de `resolutionReport.details`; l’exécution réelle affichait donc 476 non-matchés mais seulement 5 détails. La première correction complète a aussi révélé que `pokemongo-data` n’était pas encore enregistré comme provider de diagnostics Identity Manager.

FICHIERS MODIFIÉS: côté API, nouveau contrat `src/lib/unmatched-entries-report.js`, intégration au pipeline current, aux runs et au Game Master Explorer, registre provider, tests et `docs/UNMATCHED-ENTRIES-REPORT.md`; côté Data, générateur Game Master et test unitaire pour détailler toutes les entrées, y compris `local-only`; côté Dashboard, normaliseur partagé, composant générique de rapport, modale dans `current-dataset-diagnostics.jsx`, normalisation des exécutions Dashboard natives, tests et documentation `unmatched-entries-report.md`; journal.

TESTS: API ciblée (31/31), suite API complète (188/188), build et postbuild (11 générateurs, 34 fichiers serveur, 12 manifestes): OK. Dashboard rapport générique (3/3), Admin Pokémon (46/46), matrice de régénération (6/6), notifications (7/7), TypeScript, ESLint (0 erreur, 71 avertissements historiques), documentation (171 valides), build et postbuild (49 pages), `git diff --check`: OK. Data ciblé Game Master (21/21) et `git diff --check`: OK; la suite Data globale passe 237/240, avec trois échecs de baseline déjà présents sur l’empreinte d’inventaire et le manifeste d’assets séparés modifiés par les commits Data antérieurs, sans rapport avec le générateur. Navigateur réel: régénération le 26/08/2026 à 14:36:59, 476/476 détails, recherche, filtres raison/provider/statut, pagination 10 pages, desktop, mobile 390 px, sombre/clair, aucun overflow, console vide. Logs Vercel post-correction: API et Dashboard uniquement HTTP 200 utiles, aucun 4xx/5xx ni erreur/fatal dans la fenêtre de validation.

VERSION: Dashboard `1.50.0`, API `1.25.0`, Data `1.29.2` (`dataVersion 2026.08.23.2`, schéma `1.1.0`).

COMMIT DASHBOARD: `48fe2f06adb451b6d90e4f57d63030b4fb06534a` — `feat(regeneration): expose unmatched source entries`

COMMIT API FONCTIONNEL: `e23486650a2bd5d61c023ec98ea59cd761d2e157` — `feat(regeneration): expose unmatched source entries`; contrôles de complétude `8acb9f170decd91b0c6ffd3ed23aa78adefebd82`; enregistrement du provider local `2d2908bc0f85f19b56d5742137869eaaac1c40ca`.

COMMIT DATA: `24a2bdca138db01ea472ea680caec34bdb905b2c` — `feat(regeneration): expose unmatched source entries`

PUSH: les trois dépôts sont alignés sur `origin/develop`; les branches `main` restent inchangées (Dashboard `103a0f3b`, API `952107b8`, Data `2869aba4`).

PREVIEWS: Dashboard `https://dashboard-admin-6x1hbefqk-matthieu-vachets-projects.vercel.app` (`READY`, commit fonctionnel `48fe2f0`); API `https://pokemon-go-iomx3lqck-matthieu-vachets-projects.vercel.app` (`READY`, commit `2d2908b`). L’alias stable `pokemon-go-api-develop` a été réaligné sur ce preview.

REMARQUES: `UnmatchedEntriesReport@1` impose provider, source ID, nom, valeur source, raison taxonomique, candidats, confiance, destination et statut. Les sept codes demandés sont fermés et testés. Les anciens runs restent lisibles avec une alerte d’incomplétude; toute nouvelle régénération stocke le rapport complet dans le document current et le run. La cause des 471 entrées complémentaires est maintenant explicite: identités locales présentes dans PokemonGo-Data mais absentes du flux Game Master, classées `SOURCE_ID_UNKNOWN` sans créer de mapping approximatif.

NEXT: LOT 16 — expliquer et réconcilier les 18 non-matchés du Shiny Tracker avec le rapport générique.

## LOT 16

STATUS: DONE

CAUSE RACINE: le rapport Shiny dédupliquait les occurrences partageant le même nom ou sprite et n’exposait pas explicitement `shiny`, le numéro de Pokédex, le bucket ni le rang source. Les 18 occurrences représentaient 15 identités uniques : seize occurrences de codes costume Snacknap exacts (`c11`, `c74`, `c78`) et deux sprites sans suffixe de forme (`716_s`, `999_s`) que le résolveur laissait en concurrence avec leurs formes alternatives.

FICHIERS MODIFIÉS: côté Data, générateur Shiny, mappings versionnés, tests et audit `operations/audits/shiny/unmatched-reconciliation-2026-08-26.json`; côté API, normalisation et persistance du rapport complet avec identifiant d’occurrence; côté Dashboard, contrat partagé, cards détaillées et tests du rapport générique; journal.

TESTS: Data résolution et datasets classés (65/65); API pipeline current (18/18); Dashboard rapport générique (4/4), TypeScript, ESLint ciblé, build et postbuild (49 pages); API build et postbuild (11 générateurs, 34 fichiers serveur, 12 manifestes); `git diff --check`: OK. Preview réelle: le rapport historique reste consultable, la nouvelle régénération Shiny du 27/08/2026 à 05:34:20 termine `SUCCESS`, 1 958 matchés, 0 non-matché, 0 avertissement, aucun overflow horizontal ni erreur console/runtime.

VERSION: Dashboard `1.50.0`, API `1.25.0`, Data `1.29.2` (`dataVersion 2026.08.23.2`, schéma `1.1.0`), inchangées dans ce lot.

COMMIT DASHBOARD: `f6e4929227ba9e6386fb82c9225b42216d8dbe0c` — `fix(shiny-tracker): expose and reconcile unmatched entries`

COMMIT API: `48e989fbaa376cab75c47f640e4c41b525748238` — `fix(shiny-tracker): expose and reconcile unmatched entries`

COMMIT DATA: `6ec4ef7e36dd5940f166f26e7b03472cfe0c98a3` — `fix(shiny-tracker): expose and reconcile unmatched entries`

PUSH: les trois dépôts sont alignés sur `origin/develop`; les branches `main` restent inchangées (Dashboard `103a0f3b`, API `952107b8`, Data `2869aba4`).

PREVIEWS: Dashboard `https://dashboard-admin-q9gywgqah-matthieu-vachets-projects.vercel.app` (`READY`, commit `f6e4929`); API `https://pokemon-go-jy5sm0sqe-matthieu-vachets-projects.vercel.app` (`READY`, commit `48e989f`). L’alias API `develop` a été réaligné sur ce preview.

REMARQUES: les 18 occurrences sont archivées une par une avec nom externe, source ID, shiny, dex, candidats, raison, rang et classification. Quinze mappings confirmés suffisent à résoudre les doublons sans mapping approximatif. Le contrat `UnmatchedEntriesReport@1` reste rétrocompatible; `occurrenceId` empêche seulement la perte des doublons légitimes. La preview consomme explicitement `PokemonGo-Data/develop` via la variable limitée à la branche preview.

NEXT: LOT 17 — déplacer uniquement l’entrée Shiny Tracker vers Données Pokémon.
