# Changelog

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
