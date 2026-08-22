# Architecture des régénérations runtime

## Principes

`runtime-data/PokemonGo-Data` est l’unique emplacement de packaging dans l’API et le Dashboard. `POKEMON_GO_DATA_DIR` reste un override local explicite. `.data/PokemonGo-Data` n’est qu’un fallback de lecture temporaire pour la migration, jamais une cible de build.

L’API résout les fichiers par `getPokemonGoDataRuntimeRoot`, `resolvePokemonGoDataFile` et `resolvePokemonGoDataModule`. Le resolver valide la forme du dépôt, résout les liens symboliques, bloque le path traversal et émet des erreurs structurées. Le debug serveur s’active avec `POKEMON_GO_RUNTIME_DEBUG=1`.

Les modules de génération ne sont jamais chargés par `require()` dynamique. `src/lib/generator-registry.js` contient des imports littéraux des 11 modules actifs. Next peut ainsi embarquer leur code et toutes leurs dépendances transitives. Chaque appel reçoit explicitement `rootDir`, donc aucun générateur ne dépend de son `__dirname` une fois bundlé.

Le Dashboard utilise `src/lib/admin-regeneration-registry.ts` pour les actions, routes API, providers, sorties, permissions et timeouts. Les 17 actions actives, dont 15 étapes globales, et le proxy `/api/pokemon-admin` dérivent de ce registre.

Toutes les actions pilotées par l’Admin passent par le contrat commun
`normalizeActionError` / `executeAdminAction`. Une erreur conserve `code`, `message`,
`details`, `status` et `cause`; un objet inconnu ne peut jamais être transmis tel quel à
un toast. Chaque exécution reçoit un `operationId` stable et traverse les états `idle`,
`running`, `success`, `partial`, `warning` ou `failed`. Les routes journalisent en une
ligne l’action, le provider, les dates, la durée, le statut et le code d’erreur associés.

## Packaging Vercel

- Le prebuild matérialise un seul checkout sous `runtime-data/PokemonGo-Data`.
- L’API utilise des imports statiques pour les modules et `outputFileTracingIncludes` pour les datasets lus par la Function REST commune.
- Le Dashboard utilise des globs littéraux `/**/*` par route. Calendar Events ne reçoit que les catalogues nécessaires.
- `/api/dashboard-redeploy` ne reçoit que le marqueur de package et le snapshot de commit. Le resolver reconnaît la racine au `package.json`, puis chaque consommateur valide ses ressources exactes.
- Le postbuild inspecte le JavaScript et les manifests `.nft.json`; il échoue si un export ou une ressource manque.
- Aucun cache, archive ou fixture de test n’est ajouté au runtime.

Le nombre élevé de fichiers dans la Function REST API ne correspond pas à une duplication par générateur : l’API expose une seule Function catch-all qui dessert aussi les lectures publiques du dataset canonique. Calendar Events trace 7 169 fichiers dans sa Function, sous le seuil du dépôt complet et uniquement pour ses catalogues déclarés.

## Ajouter ou déplacer un générateur

1. Exposer une fonction avec une option `rootDir` et conserver une valeur par défaut pour le CLI Data.
2. Ajouter l’import littéral et les métadonnées dans `PokemonGo-API/src/lib/generator-registry.js`.
3. Relier l’adaptateur avec `generatorKey`; ne jamais ajouter `scriptName`, `exportName` ou `require(dataPath(...))`.
4. Ajouter l’action Dashboard dans `admin-regeneration-registry.ts` si elle est pilotable depuis l’UI.
5. Mettre à jour l’inventaire et la matrice de production.
6. Exécuter `npm run verify:regenerations` dans Data, API et Dashboard.
7. Après déploiement READY, exécuter les smokes de production et contrôler les logs Vercel.

## Dépannage `MODULE_NOT_FOUND`

Ne pas ajouter un fallback ou une copie manuelle. Vérifier dans cet ordre : validation du registre, matérialisation de `runtime-data`, export statique, postbuild bundle, manifest NFT, puis logs de la Function déployée. Un build Next vert sans postbuild et sans appel production n’est pas une preuve runtime.

## Gouvernance

> Toute nouvelle fonctionnalité de régénération doit être enregistrée dans le Generator Registry et couverte par `verify:regenerations`. Aucun module de génération ne doit être référencé par chemin absolu ou hardcodé directement depuis une page/action.

Les costumes et événements sont désormais maintenus manuellement dans les données canoniques. Aucun audit externe automatique Costumes / Event n'est exécuté. L'Engine et l'Identity Manager continuent toutefois de valider les formes, costumes, aliases et assets locaux.

La galerie privée Images Dynamax, son scan et son export ZIP ont été retirés en V1.48.0.
Ils n’appartiennent plus au registre, au proxy, aux routes Dashboard/API ni au packaging.
Les datasets Pokémon `DYNAMAX`, Max Battles, leurs assets canoniques et les générateurs
partagés restent des domaines distincts et sont toujours validés.
