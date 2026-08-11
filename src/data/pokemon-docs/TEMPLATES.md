# Templates Pokemon GO API

Ce fichier regroupe les templates a copier pour ajouter ou normaliser les donnees.
Les fichiers sources vivent dans le depot prive `PokemonGo-Data`.
Le format de reference est construit a partir de:

- `PokemonGo-Data/data/pokemon/normal/0001-bulbasaur.json`: Pokemon de base avec evolution.
- `PokemonGo-Data/data/pokemon/normal/0002-ivysaur.json`: Pokemon intermediaire avec evolution.
- `PokemonGo-Data/data/pokemon/normal/0003-venusaur.json`: Pokemon final avec Mega-Evolution et Gigantamax.

## Pokemon

Nom du fichier:

```text
PokemonGo-Data/data/pokemon/normal/[dexId]-[slug].json
```

Exemple:

```text
PokemonGo-Data/data/pokemon/normal/0001-bulbasaur.json
```

Template complet:

```json
{
  "id": "",
  "formId": "",
  "baseFormId": "",
  "form": "normal",
  "slug": "",
  "dexNr": null,
  "dexId": "",
  "regionId": "",
  "names": {
    "English": "",
    "German": "",
    "French": "",
    "Italian": "",
    "Japanese": "",
    "Korean": "",
    "Spanish": ""
  },
  "primaryType": "",
  "secondaryType": null,
  "pokemonClass": null,
  "size": {
    "height": null,
    "weight": null
  },
  "stats": {
    "stamina": null,
    "attack": null,
    "defense": null
  },
  "maxCp": {
    "maxLevel50": null,
    "maxLevel40": null,
    "weatherBoostLevel25": null,
    "raidLevel20": null,
    "researchLevel15": null,
    "maxBattlesLevel20": null
  },
  "weatherBoost": [],
  "buddyDistance": null,
  "catchRate": null,
  "fleeRate": null,
  "megaEnergyReward": null,
  "captureRewards": {
    "candy": null,
    "stardust": null
  },
  "secondChargeMoveCost": {
    "candy": null,
    "stardust": null
  },
  "availability": {
    "released": false,
    "shinyReleased": false,
    "tradable": true,
    "pokemonHomeTransfer": true,
    "shadow": false,
    "shadowShinyReleased": false,
    "dynamax": false,
    "gigantamax": false,
    "apex": false
  },
  "shinyAvailability": {
    "releaseDate": null,
    "event": null,
    "source": null,
    "matchedName": null
  },
  "shadowShinyAvailability": {
    "releaseDate": null,
    "event": null,
    "source": null,
    "matchedName": null
  },
  "shadow": null,
  "quickMoves": [],
  "cinematicMoves": [],
  "eliteQuickMoves": [],
  "eliteCinematicMoves": [],
  "legacyQuickMoves": [],
  "legacyCinematicMoves": [],
  "maxBattle": null,
  "pvpRef": "data/pvp/pokemon/normal/0001-bulbasaur.pvp.json",
  "assetsRef": "data/assets/core/normal/0001-bulbasaur.assets.json",
  "regionForms": [],
  "evolutions": [],
  "hasMegaEvolution": false,
  "megaEvolutions": [],
  "dynamaxForms": [],
  "hasGigantamaxEvolution": false,
  "gigantamaxForms": []
}
```

Le JSON principal doit rester leger. Ne jamais y remettre `assets.home`,
`assets.locationCards`, `assets.shuffle`, `assets.portrait`, `assets.portraitShiny` ou
`assetForms`: ces champs vivent dans les familles dédiées de `PokemonGo-Data/data/assets/`
et dans les collections MongoDB `pokemonAssets`/`pokemonAssetFamilies`.

## Template Assets Séparés

Nom du fichier:

```text
PokemonGo-Data/data/assets/core/[catégorie]/[dexId]-[identité].assets.json
```

Template complet:

```json
{
  "schemaVersion": 1,
  "id": "",
  "formId": "",
  "baseFormId": "",
  "form": "normal",
  "slug": "",
  "dexNr": null,
  "dexId": "",
  "assets": {
    "image": null,
    "shinyImage": null,
    "portrait": null,
    "portraitShiny": null,
    "candy": null
  },
  "assetRefs": {
    "home": "data/assets/home/normal/0001-bulbasaur.home.json"
  }
}
```

## Bloc Type

A utiliser pour `primaryType`, `secondaryType` et le type d'une attaque. La valeur
reference un fichier de `PokemonGo-Data/data/reference/types/`.

```json
{
  "primaryType": "GRASS",
  "secondaryType": "POISON",
  "type": "GRASS"
}
```

Pour un Pokemon mono-type:

```json
{
  "secondaryType": null
}
```

## References D'Attaques

Les fiches Pokemon stockent uniquement les identifiants. Les details complets sont dans
`PokemonGo-Data/data/moves/`.

```json
{
  "quickMoves": ["VINE_WHIP_FAST", "TACKLE_FAST"],
  "cinematicMoves": ["SLUDGE_BOMB", "SEED_BOMB"],
  "eliteQuickMoves": [],
  "eliteCinematicMoves": ["FRENZY_PLANT"]
}
```

## Référence PvP

À placer dans la fiche Pokémon ou forme :

```json
{
  "pvpRef": "data/pvp/pokemon/normal/0001-bulbasaur.pvp.json"
}
```

Ne pas ajouter de bloc `pvp` embarqué. La fiche `.pvp.json` est générée par le pipeline
PvP canonique et contient les quatre clés `leagues.little`, `leagues.great`,
`leagues.ultra` et `leagues.master` avec leurs statuts explicites.

## Attaques Elite

Lorsqu'aucune attaque Elite n'existe, utiliser un tableau vide:

```json
{
  "eliteQuickMoves": [],
  "eliteCinematicMoves": []
}
```

Lorsqu'elles existent, ajouter simplement leurs identifiants dans le tableau approprie.

## Bloc Evolution

A ajouter dans `evolutions`.

```json
{
  "targetFormId": "",
  "candies": null,
  "item": null,
  "quests": []
}
```

`targetFormId` peut referencer une fiche qui sera ajoutee plus tard, par exemple
`IVYSAUR_DYNAMAX`.

Regles selon le stade:

- Pokemon de base: `evolutions` contient au moins une evolution.
- Pokemon intermediaire: `evolutions` contient au moins une evolution.
- Pokemon final: `evolutions` vaut `[]`.
- Pokemon sans evolution: `evolutions` vaut `[]`.

## Bloc Mega / Primo

A créer dans `PokemonGo-Data/data/pokemon/mega/` ou `data/pokemon/primal/`, puis ajouter son `formId` à la liste
`megaEvolutions` de la fiche principale.

```json
{
  "id": "VENUSAUR_MEGA",
  "formId": "VENUSAUR_MEGA",
  "baseFormId": "VENUSAUR",
  "form": "mega",
  "slug": "venusaur-mega",
  "dexNr": 3,
  "dexId": "0003",
  "regionId": "kanto",
  "names": {
    "English": "",
    "German": "",
    "French": "",
    "Italian": "",
    "Japanese": "",
    "Korean": "",
    "Spanish": ""
  },
  "primaryType": "",
  "secondaryType": null,
  "size": {
    "height": null,
    "weight": null
  },
  "stats": {
    "stamina": null,
    "attack": null,
    "defense": null
  },
  "maxCp": {
    "maxLevel50": null,
    "maxLevel40": null,
    "weatherBoostLevel25": null,
    "raidLevel20": null,
    "researchLevel15": null,
    "maxBattlesLevel20": null
  },
  "catchRate": null,
  "fleeRate": null,
  "megaEnergyCost": null,
  "availability": {
    "released": false,
    "shinyReleased": false,
    "tradable": true,
    "pokemonHomeTransfer": true,
    "shadow": false,
    "shadowShinyReleased": false,
    "dynamax": false,
    "gigantamax": false,
    "apex": false
  },
  "shinyAvailability": {
    "releaseDate": null,
    "event": null,
    "source": null,
    "matchedName": null
  },
  "shadowShinyAvailability": {
    "releaseDate": null,
    "event": null,
    "source": null,
    "matchedName": null
  },
  "assetsRef": "data/assets/core/mega/0003-venusaur-mega.assets.json"
}
```

`megaEvolutions` vaut `[]` lorsqu'aucune Mega-Evolution ou forme Primo n'existe.
Lorsqu'une forme existe, la liste contient uniquement son `formId`.

## Bloc Forme Regionale

`regionForms` suit la meme logique que `megaEvolutions`: tableau vide lorsqu'aucune forme
n'existe, sinon objet indexe par `formId`. Une forme regionale reprend le template Pokemon
complet, utilise une valeur `form` comme `alola`, `galar`, `hisui` ou `paldea`, et
référence sa région avec `regionId`.

## Dynamax Et Gigantamax

Ces formes vivent dans `PokemonGo-Data/data/pokemon/dynamax/` ou
`PokemonGo-Data/data/pokemon/gigantamax/`. Elles heritent du Pokemon normal et ne repetent que les
champs differents.

```json
{
  "id": "VENUSAUR",
  "formId": "VENUSAUR_GIGANTAMAX",
  "slug": "venusaur-gigantamax",
  "dexNr": 3,
  "dexId": "0003",
  "form": "gigantamax",
  "baseFormId": "VENUSAUR",
  "maxCp": {
    "maxLevel50": null,
    "maxLevel40": null,
    "maxBattlesLevel20": null
  },
  "maxBattle": {
    "moves": ["GMAX_VINE_LASH"]
  },
  "assets": {
    "image": "",
    "shinyImage": ""
  }
}
```

Pour une forme Dynamax, utiliser `"form": "dynamax"` et des references vers
`PokemonGo-Data/data/moves/max/`. Pour une forme Gigantamax, utiliser `"form": "gigantamax"` et des
references vers `PokemonGo-Data/data/moves/gmax/`. Leur bloc `maxCp` contient uniquement
`maxLevel50`, `maxLevel40` et `maxBattlesLevel20`.

Le bloc `assets` est obligatoire sur chaque fiche Max et peut contenir uniquement
`image`, `shinyImage`, `candy` et `assetsRef`. Les variantes Shuffle, Home, portraits et
cartes de lieu restent dans leurs fichiers de famille sous `data/assets/<famille>/<catégorie>/`. Une forme
Dynamax conserve également son tableau `evolutions`.

## Bloc Asset Form

A ajouter dans `assets.assetForms` du fichier asset séparé pour les costumes, formes
visuelles ou variantes femelles.

```json
{
  "form": null,
  "costume": null,
  "isFemale": false,
  "image": "",
  "shinyImage": null
}
```

`form`, `costume` et `shinyImage` acceptent `string` ou `null`. Le champ `costume`
reste toujours présent, même sans costume, et une variante femelle conserve
`isFemale: true` même si `form`, `costume` ou `shinyImage` valent `null`.

## Type

Entrée individuelle du catalogue `PokemonGo-Data/data/reference/types/<slug>.json`. L'index
`PokemonGo-Data/data/reference/types/types.json` est conservé pour compatibilité.

```json
{
  "id": "",
  "slug": "",
  "type": "",
  "names": {},
  "doubleDamageFrom": [],
  "halfDamageFrom": [],
  "noDamageFrom": [],
  "weatherBoost": "",
  "assets": {
    "icon": "",
    "background": ""
  }
}
```

`weatherBoost` référence une entrée de `PokemonGo-Data/data/reference/weather/`. Les traductions et l'icône de
la météo ne doivent pas être recopiées dans le type.

## Checklist Avant Ajout

- Le fichier est nomme avec `dexId` + `slug`.
- Le JSON est valide.
- Les identifiants techniques restent en majuscules.
- Le slug est en minuscules et en anglais.
- Les langues de `names` sont toutes presentes.
- Les tableaux vides sont `[]`, les valeurs inconnues sont `null`.
- Les fiches complètes référencent `PokemonGo-Data/data/reference/generations/` avec `regionId`.
- Les Pokémon et les types référencent `PokemonGo-Data/data/reference/weather/` avec leurs identifiants.
- Les assets principaux et chromatiques sont renseignes quand ils existent.
- Les attaques contiennent `id`, `slug`, donnees PvE, identifiant de type, traductions et donnees PvP.
- Les evolutions contiennent `targetFormId`, `candies`, `item` et `quests`.
- Les profils base et intermediaire possedent au moins une evolution.
- Les formes regionales, Mega, Primo, Dynamax et Gigantamax suivent leur template dedie.
