# Changelog

## Unreleased

## 1.54.0 - 2026-09-02

### Added

- Affiche les Adventure Effects sur les Cards et fiches Pokémon, les Moves et une vue dédiée du Catalogue, avec rendu riche des 11 familles, coût, durée, provenance et confiance.
- Étend le JSON Builder avec un formulaire Adventure Effect, la sélection d’effets existants, une preview ordonnée et des patchs relationnels atomiques sans écrasement.
- Surveille GO Hub dans six langues et Margxt par contenu, persiste les alertes et affiche des diffs sémantiques lisibles pour traductions, coûts, durées, bonus, relations et assets.
- Ajoute « Synchroniser Adventure Effects » aux régénérations Admin avec rapport structuré.

### Changed

- Étend l’Engine canonique et les catalogues Dashboard avec les 11 effets, 11 relations Pokémon, 11 relations Move et neuf couples Banner/Portrait.

## 1.53.2 - 2026-09-01

### Added

- Ajoute un compteur persistant de changements non acquittés dans la sidebar, une bannière globale dans Veille et un signal dédié sur la Home.
- Ajoute l’acquittement unitaire ou global sans supprimer l’historique des changements MongoDB.
- Ajoute les états explicites « À jour », « Changement détecté », « Erreur » et « Jamais vérifiée », avec dates de vérification et de changement séparées.

### Changed

- Migre l’état de lecture des alertes depuis le `localStorage` éphémère vers `matweb.pokemon.sourceWatchState` dans MongoDB.
- Affiche les empreintes avant/après uniquement lorsqu’une vraie différence de contenu a été observée.

### Fixed

- Empêche un rechargement ou un nouveau polling d’effacer une alerte non acquittée.
- Sépare les erreurs de contrôle fournisseur des changements de contenu afin qu’un HTTP 403, 429, 5xx ou timeout n’incrémente jamais le badge de changements.
- Préserve les URLs canoniques et les preuves commit/hash du pipeline de veille existant.

## 1.53.1 - 2026-08-30

### Changed

- Aligne les listes et cases à cocher du JSON Builder sur les primitives `Select` et `Checkbox` du Design System, avec la typographie sémantique attendue.

### Fixed

- Sépare dans la CI les tests autonomes des contrôles qui nécessitent le dépôt privé PokémonGo-Data, sans réduire la couverture quand le token inter-dépôt est disponible.
- Restaure les invariants Design System du JSON Builder sans modifier son contrat transactionnel, ses fichiers générés ni ses garanties de préservation JSON.

## 1.53.0 - 2026-08-30

### Added

- Ajoute le JSON Builder sous Données Pokémon : wizard en dix étapes, champs génériques issus des templates, brouillons, preview exacte, copie JSON, diff et historique.
- Ajoute une route admin spécialisée avec contrat distant `develop`, états inconnue/non publiée, PvP status-only, collisions Identity, empreinte signée et expiration du dry-run.
- Ajoute 22 tests couvrant forme normale, régionale, spéciale, Méga, Primo, Dynamax, Gigamax, futur, Assets, manifests, inventaire Identity, chemins, overwrite, état périmé, transaction et rollback.

### Changed

- Étend le packaging du Dashboard aux templates, schémas et générateur d’inventaire Identity canoniques requis par le JSON Builder, sans créer de schéma parallèle.
- Passe le Dashboard à `1.53.0`; PokémonGo-Data et PokémonGo-API restent inchangés.

### Fixed

- Préserve l’ordre récursif des clés des templates et les octets hors tableau lors du patch parent, sans reformater, réordonner ou toucher les JSON non concernés.
- Refuse toute écriture hors du dépôt, tout lien symbolique sortant, toute branche autre que `develop` et toute base modifiée depuis le dry-run.

## 1.52.0 - 2026-08-29

### Added

- Ajoute la caractéristique indépendante « Sexe » aux formulaires Collections desktop/mobile et étend l’Engine à 64 contrats testés.

### Changed

- Porte la persistance Collections au schéma 3 : Multi-variante ne sélectionne plus les femelles, tandis que `includeGenderVariants` utilise les assets GO ou HOME explicitement féminins.

### Fixed

- Préserve les sélections HAVE/NEED v1/v2 pendant la migration, y compris les anciennes clés mâles/femelles, et interdit tout fallback mâle pour une femelle chromatique.

## 1.51.1 - 2026-08-28

### Changed

- Aligne les derniers panneaux de polish sur les primitives sémantiques du design system et conserve les cartes de Collections au-dessus de la ligne de flottaison sur les écrans compacts.

### Fixed

- Réactualise l’attendu des URLs d’assets canoniques après la réparation du manifest PokemonGo-Data, sans relâcher la vérification d’unicité.
- Corrige les trois écarts de sémantique visuelle détectés par la validation globale et le débordement vertical résiduel de Collections sur iPhone SE.

## 1.51.0 - 2026-08-27

### Added

- Affiche séparément tous les fichiers JSON canoniques d’une fiche Pokémon, les Méga-évolutions dans la vue Évolution et une pagination de neuf familles dans Candies.
- Expose un rapport générique et actionnable des entrées non matchées, y compris les occurrences Shiny, ainsi que les diagnostics structurés des résultats PvP partiels.
- Ajoute les assets de types et multiplicateurs Pokémon GO aux faiblesses Rocket, les coéquipiers PvP déterministes et les preuves live/snapshot des sources PvPoke.

### Changed

- Aligne les icônes, routes, groupes desktop/mobile et le fil d’Ariane; Shiny Tracker appartient désormais à Données Pokémon.
- Compacte les contrôles des 17 régénérations, intègre le sélecteur Collections dans l’en-tête et équilibre la carte d’attention de l’accueil de 320 à 1 920 px.
- Classe les attaques PvP restreintes par couple Pokémon/attaque avec les libellés Héritage et Retirée, sans statut global ambigu.
- Aligne l’Identity Manager sur l’inventaire local, la prévisualisation MongoDB, la conservation des alias et des diagnostics complets.

### Fixed

- Corrige le comptage du filtre Costumes / événements, les objets bruts dans les coéquipiers PvP, les faux HTTP 403 de la veille PvPoke et la perte des doublons légitimes dans les diagnostics Shiny.

## 1.50.0 - 2026-08-22

### Changed

- Pointe Best Defenders vers la page anglaise SSR de Pokémon GO Hub et le provider central `pokemon-go-hub-best-defenders`.
- Étend l'état de provenance aux statuts `SOURCE_UNAVAILABLE`, `SOURCE_SCHEMA_CHANGED` et `VALIDATION_FAILED`.
- Passe la version Dashboard à `1.50.0` sans modifier les contrats de page, d'API, de cartes ou de filtres.

### Fixed

- Conserve explicitement le dernier snapshot MongoDB valide quand une capture fournisseur échoue aux contrôles de disponibilité, de schéma ou de qualité.

## 1.49.1 - 2026-08-22

### Added

- Ajoute une non-régression interdisant les hostnames Vercel immuables dans le runtime Pokémon et l'exemple d'environnement.

### Changed

- Unifie les lectures et régénérations locales ou Preview sur `POKEMON_API_PUBLIC_URL`, avec le domaine stable de l'API comme fallback.

### Fixed

- Retire l'ancien deployment `pokemon-go-7r5q2j05a…`, désormais en HTTP 410, qui provoquait « The deployment has been removed » avec `npm run dev`.

## 1.49.0 - 2026-08-22

### Added

- Ajoute des routes Pokémon plates et documentées pour toutes les sections historiques : données, combat, événements, qualité, supervision et maintenance.
- Ajoute une matrice de séparation, des tests de frontière produit et une redirection permanente depuis `/pokemon-admin?section=...`.

### Changed

- Recentre le Dashboard exclusivement sur Pokémon GO et transforme l’ancien accueil Admin Pokémon en route principale `/`.
- Remonte toutes les sections Pokémon dans la sidebar principale, avec les icônes historiques, le drawer mobile et les états actifs conservés.
- Passe la version produit à `1.49.0` : évolution mineure car les contrats Data/API et les actions publiques restent compatibles.

### Fixed

- Préserve la recherche globale lors des changements de route et des redirections depuis les anciennes URLs Admin Pokémon.
- Conserve sans modification les collections Mongo Pokémon, le Generator Registry, les resolvers et le packaging Vercel des régénérations.

### Removed

- Retire du repository Pokémon les pages, composants, hooks et API JavaScript/organisation désormais autonomes dans `dashboard-javascript`.
- Supprime le wrapper et la navigation interne « Admin Pokémon » devenus redondants.

## 1.48.0 - 2026-08-22

### Added

- Ajoute le contrat commun `normalizeActionError` / `executeAdminAction`, les états `idle`, `running`, `success`, `partial`, `warning`, `failed` et un `operationId` partagé entre UI, routes et logs.
- Ajoute les garde-fous bloquant les objets bruts dans les toasts, les références Assets/PvP cassées, les manifests obsolètes, la pagination Collections et la suppression accidentelle d’un générateur partagé.
- Affiche les trois nouvelles fiches PvP générées automatiquement en statut `UNRELEASED`, sans rang, score ni moveset artificiel.

### Changed

- Remplace la pagination Collections par une liste continue à rendu CSS différé ; recherche, HAVE, NEED, sélection et désélection portent sur tout le filtre courant.
- Place les badges Collections dans un conteneur flex déterministe et réutilise `shieldAlt` comme icône Défense, exactement comme le simulateur de combat.
- Structure les erreurs Events, Community Days, Identity Manager et actions de régénération avec code, message, détails, statut et cause sûrs pour le navigateur.

### Fixed

- Corrige les 25 erreurs du rapport Engine de départ : identités et chemins Assets, références cassées, orphelin, catégories et manifest complet.
- Restaure les références PvP de Méga-Blindépique, Méga-Goupelin et Méga-Amphinobi et porte les fiches/références PvP de 1 614 à 1 617.
- Préserve le vrai diagnostic des synchronisations Events, Community Days et catalogue canonique, sans `[object Object]` ni message serveur générique.

### Removed

- Supprime Images Dynamax : navigation, panneau, routes Dashboard/API, service, cache, export ZIP, tests, documentation et dépendance exclusive `adm-zip`.

## 1.47.0 - 2026-08-15

### Added

- Ajoute une pagination canonique de 48 entrées aux Collections, avec sélection de page, précédent/suivant et remise à la première page après chaque changement de filtre.
- Ajoute « Désélectionner tous les résultats » à côté de la sélection globale ; les deux actions portent sur tout le filtre courant et non sur la seule page visible.
- Ajoute les icônes canoniques Méga/Primo, Shadow, Purifié, Shiny et Max aux cartes de checklist, avec badge Shiny secondaire et tone rouge partagé pour Dynamax/Gigamax.

### Changed

- Compacte les cartes Collections, leurs images, métadonnées et indicateurs visuels, conserve une zone tactile de 44 px et porte la grille de 2 colonnes mobiles jusqu’à 10 colonnes desktop.
- Aligne le catalogue Moves sur un view-model unique fusionnant les 502 fichiers en 371 IDs canoniques, avec métriques PvP et disponibilité normale/Elite explicite.
- Lit la section PvP des fiches et le simulateur depuis `pvpRef`, les fiches `.pvp.json` dédiées et la racine packagée `runtime-data/PokemonGo-Data`.
- Remplace les icônes visuelles Fast/Charged historiques par `TodayView_Icon_AttackMove.webp` dans le registre partagé et les tests responsive.

### Fixed

- Corrige la perte de focus après chaque caractère dans les sheets Collections en stabilisant le callback de fermeture et le cycle de focus sur le seul état d’ouverture.
- Restaure le catalogue serveur du Simulateur PvP en production, où la racine Data packagée n’était pas recherchée, et journalise désormais les erreurs structurées de la route.
- Affiche rang, score, rating, Rank 1, statut, source et date de synchronisation issus des fiches PvP dédiées, y compris les statuts non classés explicites.
- Clarifie le filtre Best Attackers comme « Type du Pokémon » ; le filtrage exact est appliqué côté API avant pagination et tri.
- Présente une indisponibilité Shiny `Today` comme un résultat partiel qui conserve le snapshot MongoDB courant au lieu d’un faux échec destructif.

## 1.46.0 - 2026-08-14

### Added

- Ajoute `buildCollectionCatalog`, un moteur pur produisant une `CollectionEntry` stable par case de checklist pour Normal, Event, Chanceux, Obscur, Purifié, Méga/Primo, Dynamax et Gigamax.
- Ajoute une table de vérité de 32 contrats et les diagnostics `COLLECTION_UNRELEASED_ENTRY`, `COLLECTION_DUPLICATE_ENTRY`, `COLLECTION_WRONG_ASSET_VARIANT`, `COLLECTION_INVALID_EVENT_KIND`, `COLLECTION_INVALID_GENDER_VARIANT`, `COLLECTION_INVALID_CATEGORY`, `COLLECTION_SHINY_NOT_RELEASED` et `COLLECTION_MISSING_ASSET` dans l'Engine canonique.
- Ajoute les tests de contrat, migration et fixtures Bulbizarre, Florizarre, Rattata régional, Sulfura de Galar, Méga X/Y, Dynamax et Gigamax, ainsi qu'un parcours Playwright mobile multi-viewport.

### Changed

- Projette les 521 variantes secondaires séparées vers `collectionVariants`, dont 94 différences de genre et 427 variantes `kind === costume|event`, sans faire dépendre l'UI de l'ancien `assetForms`.
- Applique strictement `availability.released === true`, remplace entièrement la checklist par les assets shiny lorsque Chromatique est actif et utilise `shadowShinyReleased` pour Obscur/Purifié.
- Reconstruit la page mobile autour de la collection active : recherche immédiate, ALL/HAVE/NEED sticky, filtres et régions en bottom sheets, cartes compactes en deux colonnes et statistiques repliées après la liste.
- Passe la persistance Collections au schéma 2 et à `matweb.pokemon.collections` dans `dashboard_store`, tout en conservant la clé locale historique `pokedex-v4-admin-collections` comme rollback.

### Fixed

- Corrige Gigamax + Non variante + ALL + Toutes régions, qui retourne désormais les 25 fiches sorties au lieu de `0/0`.
- Regroupe Event Non variante en 315 identités principales et réserve les 427 variantes mâle/femelle au mode Multi variante sur le snapshot Data de production `e615642`.
- Empêche les formes régionales, genres, Méga, Dynamax et Gigamax d'être classés comme événements.
- Conserve les sélections HAVE/NEED lors du tri, de la recherche, du changement de région et de la migration des clés historiques.
- Fusionne sans perte les snapshots MongoDB et localStorage : une collection locale non vide n'est jamais masquée par un document serveur vide, et les sélections HAVE concurrentes sont réunies.

## 1.45.0 - 2026-08-14

### Added

- Ajoute dans l’Engine les diagnostics bloquants `VARIANT_DUPLICATES_CANONICAL_ENTITY`, `VARIANT_CANONICAL_CATEGORY_FORBIDDEN`, `VARIANT_KIND_MISSING`, `VARIANT_KIND_INVALID` et `VARIANT_AMBIGUOUS`.

### Changed

- Fonde le filtre Fiches Costume/Event sur le champ canonique `kind` et conserve uniquement le fallback rétrocompatible par `costume` pour les anciennes réponses API.
- Aligne l’audit Assets sur 217 fichiers et 531 variantes secondaires, sans forme régionale, Méga, Primo, Dynamax ou Gigamax dupliquée.

### Fixed

- Empêche les variantes de genre et les anciennes formes structurelles sans `kind` d’apparaître comme costumes ou événements dans le Dashboard.

## 1.44.2 - 2026-08-13

### Fixed

- Embarque le rapport canonique de mapping des movesets PvPoke requis par l’Engine, supprimant l’erreur d’architecture artificielle observée uniquement dans la Function Vercel.
- Vérifie explicitement ce fichier dans les contrôles runtime et postbuild de la route Admin Pokémon.

## 1.44.1 - 2026-08-13

### Fixed

- Embarque le classificateur canonique des variantes événementielles dans la Function Admin Pokémon afin de restaurer le bootstrap, l’Engine et le filtre Fiches en production.
- Étend le postbuild au manifest Serverless Admin Pokémon pour empêcher une nouvelle publication sans ce référentiel.

## 1.44.0 - 2026-08-13

### Added

- Ajoute une CI qui exige une version et un changelog pour les changements produit sans bloquer les missions limitées aux tests ou à la documentation.
- Ajoute une non-régression responsive du deep link historique, désormais redirigé proprement vers l'accueil sans appel à l'ancien audit.

### Changed

- Confie la maintenance des costumes et événements aux seules données canoniques locales, sans audit externe automatique.
- Dérive le badge Dashboard de `package.json`, source unique de la version applicative.

### Fixed

- Recharge uniquement la famille Assets `variants` dans l’Engine et restaure 184 fiches Costume/Event calculées au lieu du compteur nul après la séparation Assets.
- Regroupe les variantes de genre, accepte les clones comme `COPY_2019` et exclut les formes structurelles via le référentiel canonique partagé.
- Aligne le test du budget Serverless Admin sur la durée de 300 secondes déjà publiée, tout en conservant le timeout de mutation à 55 secondes.
- Écrit le marqueur de snapshot lors d'une matérialisation Data locale explicite afin que le postbuild vérifie le même contrat qu'en déploiement.

### Removed

- Supprime la section et la navigation Costumes / Event, son composant, sa recherche, ses compteurs, ses toasts et ses deep links actifs.
- Retire le proxy API, la régénération, les registres, fixtures, matrices et documentation exclusivement dédiés à Costume Audit.

### Changed — travail précédemment non publié du 2026-08-11

- Centralise 19 actions de régénération/synchronisation, dont les 16 étapes globales, dans un registre Dashboard unique.
- Standardise le checkout déployé sous `runtime-data/PokemonGo-Data` et corrige les globs récursifs du Calendrier Events.
- Vérifie après build le manifest Serverless Calendar, ajoute les smokes/CI et documente l’inventaire et l’architecture runtime.
- Trace séparément le snapshot minimal de `/api/dashboard-redeploy` afin que chaque Function reconnaisse la racine canonique sans dupliquer les datasets inutiles.
- Classe `SOURCE_PROTECTED` Best Defenders comme avertissement global avec conservation explicite du dernier snapshot MongoDB.
- Applique les timeouts du registre au proxy, réutilise le snapshot Data packagé en production et attend l’état persistant du scan Dynamax dans le smoke.
- Orchestre les curseurs de reprise Game Master et Dynamax afin que chaque appel API respecte le plafond Vercel de 60 secondes.
- Conserve les 19 actions comme sélection par défaut du smoke lorsque `REGENERATION_SMOKE_IDS` est absent.

## 1.43.0 - 2026-08-09

- Publie le rapport Engine canonique transversal avec couverture, diagnostics,
  exigences legacy, durée et mémoire exportables.
- Coordonne les audits Assets, PvP, checklist et catalogue sans rescanner inutilement
  les 1 611 entités et leurs familles séparées.
- Finalise les validations desktop/mobile, Light/Dark, API et production de la migration
  canonique Pokémon.
- Rend les 667 anciens warnings PvP non reproductibles : zéro mapping Pokémon ou
  attaque référencée manquant, et un seul écart fournisseur informatif non actionnable.
- Vérifie en production les 16 étapes de la régénération globale, y compris le statut
  PvP `partial`, le `SOURCE_PROTECTED` Best Defenders et les diagnostics imbriqués Events.
- Aligne les templates intégrés sur `assetsRef` et `pvpRef` à la racine, documente
  l’Engine final, le registre des sources, le calendrier, le versionnement et le rollback.

## 1.42.0 - 2026-08-08

- Adapte les loaders Assets et PvP aux catégories Pokémon séparées et centralise la résolution des chemins.
- Étend le véritable Engine aux mauvais dossiers, références divergentes, catégories incohérentes et classifications ambiguës.
- Couvre le chargement NORMAL, FORM, MEGA, DYNAMAX et GIGANTAMAX dans les tests Dashboard.

## 1.41.0 - 2026-08-02

- Ajoute le centre de contrôle privé `/discord-bot` avec navigation, santé, versions et registre opérationnel du bot.
- Introduit un client strictement serveur, un contrat Zod versionné, un timeout court et des indisponibilités explicites sans fausse donnée.
- Définit les permissions de lecture du Sprint 1 et désactive par défaut toute synchronisation, mutation de configuration ou rotation de secret.
- Documente l’audit, l’architecture serveur-à-serveur, la sécurité, le rollback et la roadmap complète du module.

## 1.40.0 - 2026-08-02

- Corrige les surfaces responsive partagées : activité récente, cartes d’accueil, bottom sheet PvP, modales JSON, Candies, commandes d’inversion et carte Compte repliable.
- Étend l’API Explorer aux opérations publiques OpenAPI et aux routes Admin privées GET, POST, PATCH et DELETE sans exposer les secrets au navigateur.
- Ajoute les Tomes 9 à 14, l’audit document par document des Tomes 1 à 8 et les validations obligatoires de structure, identifiants et liens.

## 1.39.0 - 2026-07-31

- Consomme `assets.candy.xlImage` dans Candies, Famille bonbon et PvP Rankings, et expose les écarts XL dans l’audit Assets sans fabriquer d’URL locale.
- Corrige le coût de seconde attaque et les coéquipiers suggérés PvP, puis restaure les pictogrammes historiques avec un rendu lisible en thème sombre.
- Réorganise la Veille en six domaines et complète l’encyclopédie technique avec index, pages, datasets, ADR, règle métier et validation documentaire.

## 1.38.0 - 2026-07-30

- Unifie les régénérations PvP dédiée et globale autour du même job asynchrone suivi, avec verrou anti-concurrence et état final conservé après actualisation.
- Recompose Multi et Matrix avec des sélecteurs Pokémon visuels, des résultats exploitables, des détails de combat et une alternative mobile à la matrice desktop.
- Adapte le Battle Lab de 320 à 1920 px, corrige les attaques chargées dupliquées et utilise les cinq PNG fournis pour les boucliers, attaques et événements de timeline.
- Réorganise les assets publics sous `public/assets` et supprime intégralement « Ma collection » du code, des routes, des tests et de la documentation active, sans destruction MongoDB.

## 1.37.0 - 2026-07-28

- Termine la parité officielle à 20/20 vainqueurs, 40/40 dégâts Fast et 39/39 dégâts Charged sans modifier les formules de dégâts déjà exactes.
- Porte le selector dans `document.body`, expose les formes Mega/régionales/alternatives et les variantes Obscures explicites, avec recherche FR/EN/dex/form/ID et filtres rapides.
- Ajoute Rank optimal, 15/15/15, personnalisé, caps 40/41/50/51 et classement complet des 4 096 spreads dans la modale du Design System.
- Recompose le Single Battle autour de l’arène, d’une Build Bar compacte, des moves typés, de `shield-alt.svg`, d’un Result Hero cinématique et d’analyses mobiles segmentées.

## 1.36.0 - 2026-07-28

- Sépare Rankings et Checklist, ajoute les builds par ligue, la migration v1 non destructive et les deep-links Rank 1/Mes IV.
- Livre le Battle Lab V2 vide avec arène, sélecteur accessible desktop/mobile, configuration progressive et résultats visuels enrichis.
- Réutilise les assets Pokémon GO existants pour les types, ligues, combats, boucliers, attaques, Shadow, buffs et timeline.
- Passe le moteur natif à 1.1.0, corrige la CMP sur l’Attaque réelle, trace le bait et étend la campagne déterministe à 720 scénarios.

## 1.35.0 - 2026-07-28

- Ajoute le Simulateur PvP sous Combat avec moteur déterministe, Single, Shield Matrix, Multi, Matrix et Rank IV exhaustif.
- Couvre les dégâts, énergie, boucliers, CMP, buffs/debuffs, Shadow, Déguisement de Mimiqui, timeline rejouable et états initiaux avancés.
- Réutilise PokemonGo-Data et l’Identity Manager pour les formes, moves, types, artworks et formats GBL, avec validations privées côté serveur.
- Ajoute exports, lien interne, historique MongoDB par compte, documentation, attribution MIT et 20 fixtures de parité PvPoke.

## 1.34.0 - 2026-07-28

- Corrige l’affichage Rank 1 de Mimiqui et Forgelina et sépare explicitement le profil de simulation PvPoke.
- Enrichit le détail PvP avec radar à six axes, statistiques Rank 1, DPT/EPT/DPE, comptes d’attaques chargées et buffs locaux.
- Ajoute une checklist PvP persistante par compte et par ligue, fondée sur le catalogue actif complet, avec recherche, filtres possédés/manquants et tris.
- Ajoute le calendrier GBL Battleflow sous Combat et à la régénération globale, avec rotations, bonus, restrictions et statuts.

## 1.33.2 - 2026-07-26

- Réhydrate à la lecture les assets Costumes résolus depuis la création du snapshot Margxt.
- Ajoute les filtres événement/type et les tris date, événement, type, nom et numéro Pokédex, ascendants ou descendants.
- Sépare l’état replié du bureau du drawer mobile afin que le burger affiche à nouveau tous ses libellés.

## 1.33.1 - 2026-07-26

- Contextualise les diagnostics `ma-collection` par Pokédex, forme et costume afin de ne plus fusionner des variantes distinctes partageant le même alias brut.
- Ajoute dans Ma Collection une liste exhaustive et historisée des IDs non reconnus, filtrable et exportable avec alias, forme, costume, genre, shiny, cause et occurrences.

## 1.33.0 - 2026-07-26

- Ajoute Best Defenders sous Combat et l’audit privé Costumes / Event sous Événements, avec filtres, statistiques, JSON, sources, diagnostics et régénération.
- Relie Ma Collection au provider central `ma-collection`, agrège les assets non résolus et permet une nouvelle résolution après création d’un alias Identity Manager.
- Centralise la liste des providers affichée et utilisée pour les alias, puis intègre GO Hub et Margxt à la régénération globale Admin Pokémon.
- Corrige le badge Research dupliqué à la source du rendu, replie le menu de page par défaut et répare les débordements Accueil, Events, Shiny Tracker et Notes.

## 1.32.0 - 2026-07-22

- Ajoute la régénération globale séquentielle d’Admin Pokémon avec progression, états par étape, diagnostics et rafraîchissement final.
- Rend la régénération PvP asynchrone et observable afin d’éviter le timeout des requêtes Dashboard, tout en conservant l’exécution idempotente côté API.
- Corrige le conflit MongoDB de la régénération des mappings et vérifie le pipeline réel jusqu’au document `current`.
- Migre les actions longues restantes vers le bouton partagé avec spinner, `aria-busy`, verrou anti-double clic et libellé de chargement.
- Finalise les vues responsive Community Days et Identity Manager sans introduire de fallback d’asset silencieux.

## 1.31.2 - 2026-07-18

- Aligne `package.json`, la version visible du Dashboard, l’historique intégré et ce changelog.
- Ajoute un test de contrat afin d’empêcher une nouvelle divergence de version lors d’une livraison.

## 1.31.1 - 2026-07-18

- Unifie les derniers consommateurs Community Days autour de `PokemonArtwork` sans accès direct aux images provider.
- Ajoute l’audit des consommateurs canoniques et les garde-fous statiques Shiny Tracker, événements et cartes partagées.

## 1.31.0 - 2026-07-18

- Résout en lot les assets des événements via Identity Manager et conserve leur trace canonique complète.
- Étend les tests d’intégration aux assets shiny, aux événements et aux échecs explicites sans fallback silencieux.

## 1.30.0 - 2026-07-18

- Branche le résolveur partagé sur l’autorité canonique de PokemonGo-API pour les artworks normaux, shiny et sexués.
- Conserve les codes d’échec stables, la provenance, le bundle et l’asset final dans les composants Admin Pokémon.

## 1.29.0 - 2026-07-18

- Connecte l’Identity Manager à l’inventaire exhaustif PokemonGo-Data et à sa synchronisation MongoDB non destructive.
- Affiche la référence locale, le fichier source, l’asset bundle, les variantes sexuées et les états de synchronisation.

## 1.28.0 - 2026-07-17

- Transforme l’accueil Admin Pokémon en centre de commande quotidien avec actions rapides, santé des providers et diagnostics prioritaires.

## 1.27.1 - 2026-07-17

- Migre les modales restantes, compacte le bouton Détail et replie les grands panneaux de source sans masquer leurs alertes.

## 1.27.0 - 2026-07-17

- Ajoute l’Identity Manager canonique, son CRUD privé, ses conflits, son historique, son import prévisualisé et ses diagnostics détaillés.

## 1.26.0 - 2026-07-16

- Ajoute la page Community Days, sa collection permanente, ses upserts sans suppression, ses assets normal/shiny et son historique de synchronisation.
- Ajoute `events_archive`, la conservation des événements disparus du flux, les révisions compactes et la page Historique Events filtrable.
- Ajoute la galerie Admin Images Dynamax, reliée aux routes API privées de scan, cache et ZIP sans déclenchement à la consultation.
- Clarifie la Source active : `removed` signifie désormais « absent du flux » et jamais « supprimé de l’archive ».

## 1.25.0 - 2026-07-16

- Corrige les faux mappings ambigus des costumes sexués et affiche les variantes mâle/femelle, la raison exacte et les candidats des ambiguïtés réelles.
- Rend `Asset bundle` explicite dans l’audit Game Master, y compris lorsque le champ est absent de la source.
- Ajoute l’historique centralisé des exécutions, les diffs et les non-matchés détaillés aux datasets dynamiques, au Game Master et au calendrier Events.
- Corrige les filtres Chromatique et Costume / Event avec l’asset shiny exact et une carte stable par costume, sexes regroupés.

## 1.24.2 - 2026-07-15

- Corrige le `504` du bouton Snapshot du Shiny Tracker avec le pipeline compact fourni par l'API.
- Aligne le proxy sur la limite Vercel de 60 secondes et conserve une marge explicite de cinq secondes sur l'appel distant.
- Ajoute un test de contrat pour empêcher une configuration non déployable ou un timeout incohérent.

## 1.24.1 - 2026-07-15

- Aligne fiches, collection personnelle et Shiny Tracker sur la résolution canonique, avec HOME uniquement pour une identité normale et assets de costumes Snacknap exacts.
- Restaure le référentiel items utilisé par Research et supprime les badges techniques superposés aux artworks partagés.
- Remplace les grands filtres Best Attackers par 19 icônes accessibles et compacte les sept statistiques Events sans perte d'information.
- Fiabilise Game Master Explorer avec le stockage compact et le nettoyage atomique fournis par l'API.

## 1.24.0 - 2026-07-15

- Ajoute Game Master Explorer avec recherche et pagination serveur, catégories dynamiques, détail JSON repliable, comparaison locale, historique, diff et exports JSON/CSV privés.
- Connecte cinq collections MongoDB de snapshots, templates, diffs et correspondances locales à douze routes Admin protégées, sans exposer le Game Master complet au navigateur.
- Revoit la navigation interne Admin Pokémon, le filtre visuel des types et les cartes mobiles Best Attackers, Résolution variantes et précédent/suivant.
- Agrandit à 76 px les artworks Best Attackers sur mobile, superpose le rang dans la même zone et priorise les six premières images sans désactiver le lazy-loading des résultats hors écran.
- Charge l’audit des assets uniquement dans les sections concernées, mutualise l’inventaire GitHub distant et conserve les assets locaux liés lorsque la bibliothèque distante est limitée ou indisponible.
- Réduit le bundle serveur Admin aux seuls référentiels nécessaires et exclut les classements volumineux déjà servis par l’API MongoDB.
- Restaure pour les fiches normales l’ordre GO exact → référence locale → HOME → portrait, indépendamment de `availability`, tout en conservant l’interdiction absolue du fallback normal pour une variante explicite.

## 1.23.0 - 2026-07-15

- Centralise l'affichage des variantes Pokémon dans un résolveur unique utilisé par `PokemonArtwork`, les fiches, collections, Events, modales et la collection personnelle.
- Résout d'abord `assetForms` par forme, costume et différence femelle ; une variante explicite absente retourne désormais `missing-asset` sans image normale de substitution.
- Rend les costumes et formes visibles séparément du nom principal et complète les badges Méga, Dynamax, Gigamax, Obscur et Purifié.
- Ajoute dix tests de contrat dédiés et aligne la normalisation trainer sur la même règle sans modifier les JSON Pokémon ni MongoDB.

## 1.22.0 - 2026-07-14

- Ajoute les classements Best Attackers aux niveaux 30, 40 et 50 avec DPS, TDO, eDPS, filtres et export serveur.
- Centralise la résolution des espèces, formes, costumes et états autour d'une identité canonique et d'un composant d'artwork partagé.
- Ajoute la matrice Game Master PokeMiners, ses diagnostics privés et l'action de régénération protégée.
- Wrapper le moteur DialgaDex avec l'accord du propriétaire, attribution GPL, commit et empreintes de source vérifiables.

## 1.21.1 - 2026-07-13

- Corrige les débordements et les hiérarchies visuelles d’Admin Pokémon sur mobile, tablette et bureau sans changer son identité graphique.
- Fiabilise les associations Background et la résolution des assets de collection par forme, costume, genre et état shiny, avec diagnostics de fallback explicites.
- Ajoute les filtres poids/taille, un agenda mobile, des attaques rapides/chargées plus lisibles et des états compacts pour les diagnostics et l’API Explorer.
- Étend les suites ciblées à 25 tests et vérifie les thèmes sombre/clair de 375 à 1 920 px sans mutation MongoDB.

## 1.21.0 - 2026-07-13

- Ajoute PAGE-049 « Ma collection Pokémon GO » dans Admin Pokémon avec aperçu d'import, statistiques, recherche, filtres, tri, pagination et vues responsive.
- Introduit un stockage MongoDB privé par propriétaire avec snapshots staging/active/archived/failed, read-back, activation atomique par pointeur et rollback.
- Normalise les 4 838 entrées du fichier réel à partir des référentiels canoniques sans fallback silencieux d'attaque, forme ou asset.
- Ajoute quatre routes Dashboard privées absentes de l'OpenAPI public, neuf tests ciblés et la documentation post-audit associée.

## 1.19.0 - 2026-07-11

- Corrige l'affichage des raids autour de la rotation dynamique reelle choisie par LeekDuck et relie l'evenement au calendrier.
- Revoit les cinq panneaux Raids, Oeufs, Max Battles, Research et Rocket avec recherche, filtres, resultats et informations metier enrichies.
- Affiche systematiquement les images Pokemon, leurs noms localises et source, ainsi que les formes, costumes et badges d'assets exacts.
- Enrichit les diagnostics de provenance et la couverture du calendrier Events.

## 1.18.1 - 2026-07-11

- Corrige la cible du proxy Pokemon en production en utilisant l'alias public stable de PokemonGo-API.
- Conserve `POKEMON_API_URL` pour le developpement local sans laisser une ancienne variable Vercel detourner les lectures MongoDB.
- Affiche les messages d'erreur structures de l'API au lieu de `[object Object]`.
- Aligne la version visible et son historique sur la livraison courante.

## 1.18.0 - 2026-07-11

- Branche les cinq panneaux dynamiques exclusivement sur les documents MongoDB `current` confirmes par PokemonGo-API.
- Supprime le bouton et les gestionnaires « Synchroniser MongoDB » devenus redondants ; « Actualiser » lit uniquement MongoDB et « Regenerer » execute le pipeline externe complet.
- Ajoute les diagnostics source, mode evenement, dates, compteur, hash, matching, avertissements et diff dans chaque panneau.
- Telecharge le document MongoDB complet avec un nom date et conserve explicitement la derniere version connue lorsqu'une nouvelle recuperation echoue.
- Rend les categories raids, oeufs, Max, Research et Rocket futures au lieu de les masquer.

## 1.17.0 - 2026-07-10

- Refonte de JS Progress avec six fichiers JSON de données d’apprentissage.
- Calcul automatique de la progression, des exercices, pseudo-codes, challenges, projets, XP, niveaux et achievements.
- Ajout des cartes de notions, du détail complet, des ressources MDN/roadmap.sh et de la progression persistante.
- Synchronisation des statistiques Analytics avec le nouveau moteur d’apprentissage.
- Suppression définitive du prototype `design-lab` inutilisé.
- Correction de l’affichage mobile des actions du Dashboard Backlog.
- Ajout du preview plein écran des LocationCards et des liaisons Pokémon issues de l’audit réel des assets.
- Publication de la source JSON courante des wrappers afin d’éviter la réimportation de données Mongo obsolètes.
