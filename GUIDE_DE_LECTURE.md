# Guide de lecture - Dashboard Admin

Ce projet est ton cockpit personnel. Il regroupe le dashboard, les outils JavaScript,
les widgets, l'admin Pokemon GO et les controles de donnees.

## Par ou commencer

- `src/app/` contient les pages Next.js.
- `src/components/dashboard/` contient les widgets generiques du dashboard.
- `src/components/pokemon-admin/admin-app.jsx` contient l'interface Admin Pokemon.
- `src/components/checklist/` contient les cartes et la grande modale detail Pokemon.
- `src/server/pokemon-go/apps/checklist/server/engine.js` construit les donnees lues par l'admin Pokemon.
- `src/server/pokemon-go/src/lib/data-repository.js` choisit quel depot `PokemonGo-Data` lire.

## Admin Pokemon

Le fichier principal est `src/components/pokemon-admin/admin-app.jsx`.

La logique est separee en blocs:

- constantes UI: menus, filtres, couleurs et assets;
- helpers de recherche et de filtrage;
- panels React: fiches, assets, candies, veille, collections, regles JSON;
- composant `AdminApp`: charge les donnees, gere les onglets et appelle l'API interne.

Les collections Pokemon GO utilisent deux types de donnees:

- les vraies fiches Pokemon venant de `PokemonGo-Data`;
- des entrees virtuelles pour les evenements, reconstruites depuis `assetForms`.

Si une collection shiny affiche une image normale, verifier d'abord:

- `collectionImage()` dans `admin-app.jsx`;
- `preferredPokemonImage()` dans `src/components/site/pokemon-style.js`;
- la presence de `shinyImage`, `shuffleShinyImage` ou `homeShinyImage` dans le payload.

## Controle des fiches

Le validateur vit dans:

`src/server/pokemon-go/apps/checklist/server/engine.js`

Il ne modifie pas les JSON. Il lit les fichiers, ajoute les assets lourds, puis remonte les
problemes sous forme d'issues affichables dans le dashboard.

Important:

- `availability.shadow` est la verite pour Shadow.
- `availability.shinyReleased` est la verite pour Shiny.
- `availability.shadowShinyReleased` est la verite pour Shadow shiny.
- `megaEnergyCost` peut etre absent ou `null` hors Mega.
- `maxCp.maxBattlesLevel20` peut etre absent ou `null` hors Dynamax/Gigamax.

## Veille

La veille est dans:

- UI: `src/components/pokemon-admin/admin-app.jsx`
- serveur: `src/server/pokemon-go/apps/checklist/server/source-watch.js`
- sources: `PokemonGo-Data/source-watch/sources.json`

Le dashboard garde en `localStorage` la signature precedente des sources. Si une signature
change, la page Veille affiche maintenant les noms des sources modifiees.

## Workflow PokemonGo-Data vers MongoDB

Si tu modifies manuellement un JSON dans `PokemonGo-Data`, le chemin normal est:

1. modifier le JSON;
2. verifier le schema avec les scripts du depot data;
3. commit et push sur `main`;
4. declencher ou laisser declencher la synchronisation MongoDB du repo `PokemonGo-API-`;
5. verifier `/api/v1/meta/sync` ou le dashboard MongoDB.

Le dashboard ne synchronise pas MongoDB directement. Il lit les donnees et controle leur qualite.

## Commandes utiles

```bash
npm run build
npm run dev
```

Pour forcer le dashboard a lire le depot local voisin:

```bash
POKEMON_GO_DATA_DIR=../PokemonGo-Data npm run build
```
