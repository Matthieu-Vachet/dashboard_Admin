# Changelog

## 1.24.0 - 2026-07-15

- Ajoute Game Master Explorer avec recherche et pagination serveur, catégories dynamiques, détail JSON repliable, comparaison locale, historique, diff et exports JSON/CSV privés.
- Connecte cinq collections MongoDB de snapshots, templates, diffs et correspondances locales à douze routes Admin protégées, sans exposer le Game Master complet au navigateur.
- Revoit la navigation interne Admin Pokémon, le filtre visuel des types et les cartes mobiles Best Attackers, Résolution variantes et précédent/suivant.
- Agrandit à 76 px les artworks Best Attackers sur mobile, superpose le rang dans la même zone et priorise les six premières images sans désactiver le lazy-loading des résultats hors écran.
- Charge l’audit des assets uniquement dans les sections concernées, mutualise l’inventaire GitHub distant et conserve les assets locaux liés lorsque la bibliothèque distante est limitée ou indisponible.
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
