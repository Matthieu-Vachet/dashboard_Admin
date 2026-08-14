# Changelog

## Unreleased

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
