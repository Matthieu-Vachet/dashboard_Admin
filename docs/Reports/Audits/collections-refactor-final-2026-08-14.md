# Reconstruction canonique de la page Collections

Date : 2026-08-14
Version Dashboard : V1.46.0
Snapshot Data de production validé : `e615642f`
Schéma Collections : 2

## Résultat

La page Collections repose désormais sur un moteur métier pur, partagé par l'interface et l'Engine. Une `CollectionEntry` correspond à une seule case de checklist, possède une clé stable, référence un asset exact et ne peut être produite que depuis une fiche dont `availability.released === true`.

Les huit familles sont couvertes : Normal, Événement, Chanceux, Obscur, Purifié, Méga/Primo, Dynamax et Gigamax. Les filtres ALL/HAVE/NEED, recherche et région s'appliquent uniquement après construction du catalogue et ne modifient donc ni son identité ni les sélections sauvegardées.

## Addendum V1.47.0 — compactage et pagination

La V1.47.0 remplace le chargement progressif par une pagination de 48 résultats. Page, précédent, suivant et plage visible sont dérivés du filtre courant ; tout changement de collection, type, mode, shiny, Hundo, région, statut ou recherche revient à la page 1. Les compteurs HAVE restent globaux et aucune sélection n’est stockée par index de page.

Les actions deviennent « Sélectionner tous les résultats » et « Désélectionner tous les résultats ». Elles modifient toute la population filtrée, y compris les pages non visibles. Les cartes passent à une zone image de 100/116 px et un artwork de 84/100 px sur mobile/desktop, contre 136/160 px et 120/144 px auparavant. Le footer passe de 92 à 68 px ; l’indicateur visible mesure 22 px dans une hitbox de 44 px ; la grille conserve deux colonnes mobiles et monte jusqu’à dix colonnes desktop.

Le bouton d’ouverture de fiche est supprimé. La carte entière est l’unique commande cocher/décocher. Les catégories emploient les constantes `collectionMega`, `collectionShadow`, `collectionPurified`, `collectionShiny` et `collectionMax`; une catégorie principale peut porter un badge Shiny secondaire. Les tones Lucky, Shadow et Purifié sont conservés, tandis que Dynamax/Gigamax partagent le token rouge `max` sans contaminer Méga/Primo.

La sheet mémorise son callback de fermeture et n’installe/restaure son cycle de focus que lors d’un changement de l’état `open`. L’input de création ne remonte donc plus après chaque caractère. Sur mobile, la surface commence sous la safe-area haute, occupe au moins 76 dVH et sépare explicitement type, mode Pokédex, caractéristiques et région.

## Sauvegarde et restauration

L'archive préalable se trouve dans `archives/collections-refactor-before-2026-08-14-16-28-53/`. Elle contient 6 336 fichiers ciblés, un manifeste SHA-256, un guide de restauration et l'état de persistance disponible avant refactor. Toutes les empreintes ont été relues et une restauration complète vers un répertoire temporaire a retourné `PASS`.

L'export MongoDB préalable ne contenait aucun document Collections. La source utilisateur historique était donc `localStorage`, clé `pokedex-v4-admin-collections`. Cette clé est toujours écrite et n'est jamais supprimée. La nouvelle persistance `dashboard_store`, clé `matweb.pokemon.collections`, reçoit la même liste ; une indisponibilité MongoDB laisse la copie locale intacte.

## Source canonique finale

Le build de production a synchronisé le snapshot Data officiel `e615642f` (`fix(data): canonicalize visual forms and remove obsolete variants`). Ce nettoyage publié pendant la mission explique l'écart entre l'audit préalable, réalisé sur 1 611 fiches, et la validation finale ci-dessous. Aucun compteur n'a été inventé : les attentes ont été recalculées depuis le snapshot réellement embarqué.

| Population finale | Nombre |
| --- | ---: |
| Fiches Engine | 1 614 |
| Fiches strictement sorties | 1 463 |
| Fiches exclues | 151 |
| Shiny sortis | 1 347 |
| Shadow sortis | 480 |
| Shadow shiny sortis | 405 |
| Formes canoniques sorties | 303 |
| Régionales sorties | 55 |
| Méga/Primo sortis | 53 |
| Dynamax sortis | 127 |
| Gigamax sortis | 25 |
| Variantes secondaires | 521 |
| Variantes de genre | 94 |
| Variantes costume/event | 427 |
| Identités Event principales | 315 |

## Table de vérité Collections

| Type | Non variante | Non variante shiny | Multi variante | Multi variante shiny |
| --- | ---: | ---: | ---: | ---: |
| Normal | 955 | 876 | 1 352 | 1 245 |
| Événement | 315 | 312 | 427 | 423 |
| Chanceux | 955 | 876 | 1 352 | 1 245 |
| Obscur | 458 | 307 | 548 | 366 |
| Purifié | 458 | 307 | 548 | 366 |
| Méga/Primo | 53 | 53 | 53 | 53 |
| Dynamax | 127 | 121 | 127 | 121 |
| Gigamax | 25 | 22 | 25 | 22 |

Les 32 catalogues retournent zéro diagnostic, zéro clé dupliquée, zéro asset absent et zéro fiche non sortie. Le cas critique Gigamax + Non variante + standard retourne 25 entrées au lieu de 0.

## Règles métier implémentées

- Normal et Chanceux Non variante gardent uniquement la base sortie ; Multi variante ajoute formes, régionales et différences de genre légitimes.
- Événement repose exclusivement sur `kind === costume|event`. Non variante regroupe l'identité principale ; Multi variante sépare les assets mâle/femelle réellement présents.
- Obscur et Purifié exigent `availability.shadow === true`. Leur mode shiny utilise exclusivement `shadowShinyReleased === true`.
- Méga/Primo, Dynamax et Gigamax conservent leurs catégories spécialisées même en Non variante.
- Le mode Chromatique remplace entièrement les assets normaux par les assets shiny exacts ; aucun fallback normal n'est autorisé.
- La résolution préfère l'asset Pokémon GO exact, puis les fallbacks canoniques Home/Shuffle documentés. Elle ne retombe jamais sur une autre forme.
- Hundo reste une caractéristique orthogonale et ne change ni la population ni l'asset.

## Clés et migration

Les clés versionnées encodent le type, l'identité canonique, la catégorie, la variante, le genre et le mode shiny. La migration compare d'abord les clés exactes, puis des alias contrôlés. Une ancienne clé ambiguë sélectionne toutes les nouvelles entrées plausibles afin de ne perdre aucun HAVE ; une clé sans correspondance reste dans `legacyItems` avec son rapport `existing`, `mapped`, `unmapped` et `ambiguous`.

À l'hydratation, MongoDB et localStorage sont fusionnés. Un document serveur vide ne peut donc pas masquer une ancienne collection locale non vide. Les collections uniques des deux sources sont conservées et, pour un même identifiant, les sélections HAVE sont réunies avant toute réécriture.

Changer de collection conserve recherche et région. ALL/HAVE/NEED est un état de vue dérivé. La recherche accepte noms français/anglais, numéro Pokédex, identifiant canonique, forme, costume et catégorie.

## Interface mobile-first

La collection active, la sélection de collection et les contrôles essentiels précèdent la grille. Les statistiques riches restent visibles sur desktop et passent dans un bloc replié après les cartes sur mobile. Collection, recherche, filtres, région et actions secondaires utilisent des bottom sheets avec Escape, focus initial, focus trap, restitution du focus et verrouillage du scroll.

La barre mobile sticky contient ALL/HAVE/NEED, recherche, filtres, région et progression. Les cartes sont affichées sur deux colonnes avec asset exact, nom, numéro, variante lisible et état visuel ; aucun bouton d'information ou lien vers la fiche Pokémon n'est conservé.

Mesures Playwright sans overflow horizontal :

| Viewport | Première carte |
| --- | ---: |
| iPhone SE, 320 × 568 | 565 px |
| iPhone, 390 × 844 | 548 px |
| iPhone Pro Max, 430 × 932 | 532 px |
| Android, 412 × 915 | 532 px |

Les scénarios couvrent aussi paysage 844 × 390, tablette 768 × 1 024, desktop 1 440 × 900 ainsi que les thèmes clair et sombre.

## Engine et diagnostics

L'Engine publie l'état `Collection Catalog`, les 32 compteurs et huit diagnostics bloquants :

- `COLLECTION_UNRELEASED_ENTRY`
- `COLLECTION_DUPLICATE_ENTRY`
- `COLLECTION_WRONG_ASSET_VARIANT`
- `COLLECTION_INVALID_EVENT_KIND`
- `COLLECTION_INVALID_GENDER_VARIANT`
- `COLLECTION_INVALID_CATEGORY`
- `COLLECTION_SHINY_NOT_RELEASED`
- `COLLECTION_MISSING_ASSET`

Le rapport courant est valide et chaque compteur de diagnostic vaut zéro.

## Validation exécutée

- Backup : 6 336 empreintes SHA-256 et restauration temporaire `PASS`.
- Collections : 10/10 tests de contrats, fixtures, migration, fusion de persistance et diagnostics.
- E2E Collections : 15 scénarios, 7 viewports, 2 thèmes, 0 erreur console, 0 overlay, suppression limitée à la collection de test.
- Design System : 101/101 tests.
- Dashboard ciblé : canonical engine, variants, présentation, shiny, assets séparés, catégories, taxonomie diagnostics et résolution Data verts.
- PokemonGo-Data : 56/56 tests ciblés de schéma, publication, identité, catégories et assets.
- PokemonGo-API : 176/176 tests.
- TypeScript : vert.
- ESLint : 0 erreur ; uniquement 71 avertissements historiques hors du composant reconstruit.
- Version : V1.46.0 alignée.
- Build Next.js 16.2.12 : compilation, TypeScript, 35 pages et contrôle postbuild des bundles verts.

## Publication

- Commit produit : `1a95e6570121deb263d1f790628c51a4e07906e5` (`refactor(collections): rebuild canonical pokemon checklist engine`).
- Push : `origin/main`, confirmé de `6d4c976` vers `1a95e65`.
- Déploiement Vercel production : `dpl_83TCqQQbWsRVWjLhzXUduVgRRW9t`, framework Next.js, état `READY`, build distant terminé en 53 secondes et alias attachés sans erreur.
- URL validée : `https://dashboard-admin-pi-ebon.vercel.app/pokemon-admin?section=collections`.
- Parcours Playwright production : `PASS`, 15 scénarios, 7 viewports, 2 thèmes, 0 erreur console et suppression limitée à la collection de test isolée.
- Scan Vercel des erreurs runtime sur `/pokemon-admin`, `/api/pokemon-admin` et `/api/dashboard-store` : aucune erreur trouvée après déploiement.
