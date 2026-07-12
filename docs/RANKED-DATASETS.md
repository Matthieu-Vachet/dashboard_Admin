# Écrans Shiny Tracker et PvP Rankings

Les deux écrans sont des panneaux de l'Admin Pokémon et utilisent les composants partagés : `Panel`, `DatasetFilterBar` et `DatasetSourceHeader`. Ce dernier affiche la provenance, l'état, le hash, la visibilité et les diagnostics sans dupliquer cette logique dans chaque écran.

Le navigateur ne contacte jamais Snacknap ou GitHub directement. Toutes les lectures passent par la route Admin authentifiée, puis par PokemonGo-API/MongoDB.

- Shiny privé : podium top 3, filtres, recherche, type, génération, tendance, pagination, détail complet et graphique uniquement lorsque plusieurs snapshots internes existent.
- PvP public : formats regroupés dynamiquement, tous les rôles, recherche, pagination et lignes accordéon détaillant scores, statistiques, IV/CP, attaques locales, matchups et contres. Les champs indisponibles sont signalés comme tels.

Les boutons de régénération appellent les routes Admin non documentées avec le secret serveur. Les URLs et secrets externes ne sont jamais envoyés au client.

L'explorateur API charge OpenAPI à l'exécution et présente toutes les routes publiques sans liste manuelle. Les actions privées de régénération sont ajoutées séparément, marquées privées et exécutées uniquement par le proxy serveur.
