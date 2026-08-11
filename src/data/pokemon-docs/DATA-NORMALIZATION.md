# Normalisation Des Donnees

Les sources JSON restent lisibles a la main, mais les informations repetables sont
centralisees pour eviter les doublons et faciliter la maintenance.

## Attaques

Les details des attaques sont centralises dans `PokemonGo-Data/data/moves/`.

- `PokemonGo-Data/data/moves/fast/`
- `PokemonGo-Data/data/moves/charged/`
- `PokemonGo-Data/data/moves/fast-elite/`
- `PokemonGo-Data/data/moves/charged-elite/`
- `PokemonGo-Data/data/moves/max/`
- `PokemonGo-Data/data/moves/gmax/`

Les fiches Pokemon et leurs formes stockent uniquement des identifiants dans :

- `quickMoves`
- `cinematicMoves`
- `eliteQuickMoves`
- `eliteCinematicMoves`
- `legacyQuickMoves` (optionnel, distinct d’Elite)
- `legacyCinematicMoves` (optionnel, distinct d’Elite)
- `maxBattle.moves`

L'API recompose les details centralises via :

```http
GET /api/v1/pokemon/{identifier}/moves
```

## Types

Les types complets vivent dans `PokemonGo-Data/data/reference/types/`. Les Pokemon et les attaques utilisent
uniquement l'identifiant court :

```json
{
  "primaryType": "GRASS",
  "secondaryType": "POISON",
  "type": "GRASS"
}
```

`secondaryType` vaut `null` pour un Pokemon mono-type. La sync accepte encore les anciens
objets `{ "type": "POKEMON_TYPE_GRASS", "names": {} }`, mais les migrations ecrivent le
format normalise.

Chaque entrée possède un fichier `PokemonGo-Data/data/reference/types/<slug>.json`, un `id` technique stable et un `slug`
public. Les attaques possedent aussi un `id` stable, un slug avec tirets et, si necessaire,
`legacySlugs` pour garder les anciennes URL compatibles.

`PokemonGo-Data/data/reference/types/types.json` reste généré comme index de compatibilité. Les nouveaux outils
lisent les fichiers individuels afin qu'un type puisse être modifié sans toucher les 17 autres.

## Régions Et Générations

Les traductions et le numéro de génération vivent uniquement dans `PokemonGo-Data/data/reference/generations/`.
Une fiche Pokémon complète stocke la référence stable :

```json
{
  "regionId": "KANTO"
}
```

Les formes Méga, Dynamax et Gigantamax héritent cette référence de leur `baseFormId`.
La lecture des sources, l'API, la bibliothèque et le Dashboard recomposent automatiquement `region` et
`generation`.

## Météo

Les sept météos Pokémon GO vivent dans `PokemonGo-Data/data/reference/weather/`. Chaque entrée contient ses
traductions, son icône et les identifiants des types boostés. Les Pokémon utilisent
`weatherBoost: string[]`; chaque type utilise `weatherBoost: string`.

## PvP séparé

La fiche Pokémon ne contient plus de bloc `pvp`. Elle porte uniquement une référence
canonique vers la fiche dédiée :

```json
{
  "pvpRef": "data/pvp/pokemon/normal/0001-bulbasaur.pvp.json"
}
```

Le fichier `.pvp.json` contient `mapping`, `source` et les ligues `leagues.little`,
`leagues.great`, `leagues.ultra` et `leagues.master`. Chaque ligue expose un `status`
explicite ; `tier`, `rank1` et `variants[].bestMoveset` ne sont requis que lorsque ce
statut est `RANKED`. L'Engine résout et contrôle cette fiche via `pvpRef` sans exiger
une copie des données PvP dans la fiche Pokémon.

## Dynamax Et Gigantamax

Les formes Dynamax et Gigantamax ne dupliquent plus toute la fiche Pokemon. Elles
referencent la fiche normale via `baseFormId`, gardent leur propre `formId` et leur
propre `slug`, puis ne stockent que les donnees propres au combat Max.

```json
{
  "id": "BULBASAUR",
  "formId": "BULBASAUR_DYNAMAX",
  "slug": "bulbasaur-dynamax",
  "dexNr": 1,
  "dexId": "0001",
  "form": "dynamax",
  "baseFormId": "BULBASAUR",
  "maxCp": {
    "maxLevel50": 1260,
    "maxLevel40": 1115,
    "maxBattlesLevel20": 637
  },
  "maxBattle": {
    "moves": ["MAX_OVERGROWTH", "MAX_STRIKE"]
  },
  "evolutions": [
    {
      "targetFormId": "IVYSAUR_DYNAMAX",
      "candies": 25,
      "item": null,
      "quests": []
    }
  ]
}
```

Le bloc `maxCp` d'une forme Dynamax ou Gigantamax est propre a cette fiche et ne contient
que `maxLevel50`, `maxLevel40` et `maxBattlesLevel20`. Il n'herite jamais du bloc `maxCp`
normal dans l'API, la bibliothèque ou le Dashboard.

Les liens d'evolution utilisent `targetFormId`. Une cible future comme
`IVYSAUR_DYNAMAX` est valide meme si la fiche n'existe pas encore.

## Controles

```bash
npm run audit:moves
npm run audit:weather
npm run audit:identifiers
npm run sync:dry
npm test
```

`audit:moves` parcourt aussi les formes imbriquees, les attaques Max/G-Max et refuse les
references absentes du catalogue.

## Outils De Migration

```bash
npm run migrate:moves:catalog
npm run migrate:moves
npm run migrate:types
npm run migrate:max-forms
npm run migrate:regions
npm run migrate:weather
```

Ces commandes fonctionnent en simulation. Les variantes `:write` ecrivent uniquement
apres validation complete de toutes les sources.
