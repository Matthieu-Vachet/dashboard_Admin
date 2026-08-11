# Inventaire runtime des régénérations

Date d’audit : 11 août 2026. Source machine : `regeneration-runtime-inventory.json`.

## Cause racine

L’API chargeait les générateurs avec `require(generatorFile)` où `generatorFile` était un chemin absolu calculé à l’exécution. Le traceur Next/Vercel listait parfois ces fichiers dans les manifests, ce qui suffisait à rendre le build vert, mais le runtime Serverless compilé ne pouvait pas résoudre ce `require` dynamique sous `/var/task/runtime-data/PokemonGo-Data`. Game Master fonctionnait parce que son module était déjà importé statiquement.

Pour Calendar Events, le Dashboard construisait `.data/PokemonGo-Data` mais ses globs `/**` ne traçaient pas les descendants. Seul `package.json` était présent dans le bundle, donc `hasDataShape` rejetait la racine en production.

Réponses au diagnostic packaging :

1. Les modules source existent dans Git sous `PokemonGo-Data/tooling/scripts/generators`.
2. Ils existaient dans le checkout de build et apparaissaient même dans certains `filePathMap`.
3. Ils n’étaient pas résolvables par le `require` absolu dynamique dans la Function finale.
4. La rupture se produisait entre le tracing de build et l’exécution du bytecode Serverless.
5. Le resolver pointait vers la racine attendue, mais le mécanisme de chargement de modules était incompatible avec le bundle.
6. Les dépendances transitives n’étaient pas garanties par une chaîne d’imports statiques.

## Couverture

| Domaine | Action Dashboard | Exécution | Provider | Sortie principale |
|---|---|---|---|---|
| Game Master | `regenerate-game-master` | API statique | PokeMiners | index MongoDB |
| Identity Manager | preview + apply | API statique | PokemonGo-Data | identités MongoDB |
| Variantes | `regenerate-pokemon-identity-mappings` | Registry API | PokeMiners | mappings + MongoDB |
| Raids | `regenerate-raids` | Registry API | LeekDuck | raids current + MongoDB |
| Max Battles | `regenerate-max-battles` | Registry API | Snacknap | max current + MongoDB |
| Rocket | `regenerate-rocket` | Registry API | LeekDuck | rocket current + MongoDB |
| PvP | `regenerate-pvp-rankings` | Registry API asynchrone | PvPoke | records MongoDB |
| GBL | `regenerate-gbl-calendar` | Registry API | Battleflow | calendrier + MongoDB |
| Best Attackers | `regenerate-best-attackers` | Registry API | DialgaDex | rankings + MongoDB |
| Best Defenders | `regenerate-best-defenders` | Registry API | Pokémon GO Hub | snapshot protégé sur 403 |
| Costumes | `regenerate-costume-audit` | Registry API | Margxt | audit + MongoDB |
| Œufs | `regenerate-eggs` | Registry API | LeekDuck | eggs current + MongoDB |
| Research | `regenerate-research` | Registry API | LeekDuck | research current + MongoDB |
| Calendar Events | `/api/admin/events/scrape` | Dashboard tracé | LeekDuck | events + archive MongoDB |
| Community Days | `/api/admin/community-days/sync` | Dashboard tracé | LeekDuck | community days MongoDB |
| Shiny | `regenerate-shiny` | Registry API | Snacknap | audit + snapshots MongoDB |
| Réindexation GM | `reindex-game-master` | API statique | PokemonGo-Data | index MongoDB |
| Snapshot GitHub | `sync-github-data` | Dashboard | GitHub | snapshot runtime |
| Images Dynamax | `/api/admin/dynamax-images/scan` | Assets API | Assets API | inventaire/cache |

Le registre Dashboard contient 19 actions, dont 16 participent au flux « Tout régénérer ». Le registre API contient 12 générateurs Data.
