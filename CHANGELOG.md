# Changelog

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
