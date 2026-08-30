# Dashboard Pokémon — état fonctionnel après polish

Ce dossier décrit l’état de référence livré par les lots 0 à 24. Les notes détaillées
restent les preuves de migration; ce document indique le comportement actif à maintenir.

## Navigation

La sidebar desktop, son mode réduit et le drawer mobile consomment tous
`src/data/dashboard.ts`. Les destinations Pokémon sont des routes plates. **Shiny
Tracker** appartient à **Données Pokémon** et non à **Qualité & supervision**. La
topbar dérive son fil d’Ariane du même registre; une destination ne doit jamais être
dupliquée pour changer de groupe. Les icônes locales ajoutées pendant la mission sont
répertoriées dans [navigation-icons.md](navigation-icons.md).

## Fiches, JSON et évolutions

Le filtre **Costumes / événements** compte les identités de présentation, comme
Collections `event.single.standard`, et non les seules fiches sources porteuses d’un
tableau d’assets. Le contrat exact est dans
[costume-event-semantics.md](costume-event-semantics.md).

L’onglet JSON d’une fiche affiche séparément chaque fichier canonique réellement
résolu: Pokémon, Assets Core, Home, Shuffle, Variants, Location Cards et PvP. Aucun
document monolithique n’est reconstruit. Le chemin, la copie et le téléchargement
restent propres à l’onglet actif; voir
[canonical-json-viewer.md](canonical-json-viewer.md).

La section **Évolutions** résout aussi les références `megaEvolutions` vers leurs
fiches Méga canoniques. Elle montre le coût initial et la disponibilité connus, sans
inventer de coût suivant, niveau ou cooldown; voir
[mega-evolution-view.md](mega-evolution-view.md).

## Candies et Collections

Candies groupe et filtre les familles avant de les paginer par neuf. La recherche est
conservée lors d’un changement de page et remet la page à 1 lorsqu’elle change. Cette
pagination n’est pas partagée avec Collections; voir
[candy-family-pagination.md](candy-family-pagination.md).

Dans Collections, le nom de la collection active est le sélecteur. Il est intégré à
l’en-tête, à gauche du menu d’actions, avec progression et compteur. La recherche,
ALL/HAVE/NEED et les sélections portent sur l’ensemble des résultats filtrés; voir
[collection-selector-header.md](collection-selector-header.md).

## PvP

Un résultat `partial` est persistant et consultable. Ses warnings sont normalisés en
code, entité, cause, impact et action. Les sentinelles provider explicitement
informatives restent comptées dans le rapport brut sans dégrader seules le statut;
voir [pvp-partial-warnings.md](pvp-partial-warnings.md).

Les badges d’attaques sont calculés pour le couple Pokémon/attaque. **Héritage**
désigne une attaque Elite ou événementielle et **Retirée** une attaque Legacy stricte;
aucun booléen global d’attaque ne suffit. Voir
[pvp-legacy-move-classification.md](pvp-legacy-move-classification.md).

Les coéquipiers suggérés sont calculés côté API depuis le snapshot PvPoke MongoDB de
la ligue. Une espèce absente renvoie un état vide explicite; un snapshot invalide reste
une erreur. Voir [pvp-suggested-teammates.md](pvp-suggested-teammates.md).

## Identity Manager et diagnostics

L’inventaire local PokemonGo-Data est l’autorité des identités actives; MongoDB
conserve alias, métadonnées manuelles et historique. **Synchroniser le catalogue**
ouvre toujours un aperçu sans écriture avant l’application. L’application est bloquée
par les conflits, préserve les alias et conserve les orphelins. Le compteur local et
le statut de synchronisation décrivent l’écart réel entre inventaire et MongoDB.

Les entrées non matchées utilisent `UnmatchedEntriesReport@1`: provider, identifiant
source, nom, valeur brute, raison, candidats, confiance, destination et statut. Les
occurrences du Shiny Tracker gardent aussi leur identifiant d’occurrence afin de ne pas
être dédupliquées à tort. Le rapport générique est décrit dans
[unmatched-entries-report.md](unmatched-entries-report.md).

## Rocket, Shiny Tracker et Veille

Rocket lit les faiblesses du snapshot canonique et utilise les assets de types
partagés. Les multiplicateurs sont `×1,6` et `×2,56`; voir
[rocket-weakness-type-assets.md](rocket-weakness-type-assets.md).

Shiny Tracker reste sur `/shiny-tracker`, sous **Données Pokémon**. Ses anciens 18
non-matchés sont réconciliés comme 18 occurrences et 15 identités uniques. Aucun
matching approximatif n’a été créé; voir
[shiny-tracker-navigation.md](shiny-tracker-navigation.md) et le journal des lots 16–17.

Source Watch contrôle les URLs réellement consommées. Pour PvPoke, il sonde les JSON
jsDelivr et l’arbre GitHub servant à découvrir les formats; il n’interprète plus un
HTTP 403 d’une page `pvpoke.com` comme une panne du pipeline. Les preuves exposent
HTTP, commit, hash live, snapshot local et date; voir
[source-watch-pvpoke.md](source-watch-pvpoke.md).

## Régénérations et responsive

Le Generator Registry contient 17 actions, dont 15 incluses dans **Tout régénérer**.
Le contrôle partagé reste compact: synchronisation, statut et action sont visibles;
provenance, compteurs, diff, warnings, rapport et diagnostics se déplient à la demande.
Les états terminaux sont `success`, `partial`, `unchanged` et `failed`; voir
[regeneration-controls.md](regeneration-controls.md).

La carte d’attention de l’accueil a une grille déterministe à deux colonnes à partir
de 1 280 px, deux colonnes de CTA à partir de 640 px et une seule colonne en dessous.
Elle est couverte de 320 à 1 920 px, en thèmes clair et sombre; voir
[home-attention-responsive.md](home-attention-responsive.md).

## Validation et traçabilité

Le journal [progress.md](progress.md) conserve, lot par lot, cause racine, fichiers,
tests, version, commit, push, preview et remarques. Le rapport final de la mission est
`final-report.md`. Toute évolution ultérieure doit mettre à jour la documentation
fonctionnelle concernée et le `CHANGELOG.md` avant un commit de version.
