# Écrans Shiny Tracker et PvP Rankings

Les deux écrans sont des panneaux de l'Admin Pokémon et utilisent les composants existants : `Panel`, `DatasetFilterBar`, `CurrentDatasetDiagnostics` et `Modal`.

Le navigateur ne contacte jamais Snacknap ou GitHub directement. Toutes les lectures passent par la route Admin authentifiée, puis par PokemonGo-API/MongoDB.

- Shiny : filtres de tableau, recherche, type, génération, tendance, pagination, détail et graphique des snapshots internes.
- PvP : ligue, rôle, recherche, pagination, scores, statistiques, attaques locales, matchups et contres.

Les boutons de régénération appellent les routes Admin non documentées avec le secret serveur. Les URLs et secrets externes ne sont jamais envoyés au client.
