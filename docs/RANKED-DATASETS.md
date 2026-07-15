# Écrans Shiny Tracker, PvP Rankings et Best Attackers

Les deux écrans sont des panneaux de l'Admin Pokémon et utilisent les composants partagés : `Panel`, `DatasetFilterBar` et `DatasetSourceHeader`. Ce dernier affiche la provenance, l'état, le hash, la visibilité et les diagnostics sans dupliquer cette logique dans chaque écran.

Le navigateur ne contacte jamais Snacknap ou GitHub directement. Toutes les lectures passent par la route Admin authentifiée, puis par PokemonGo-API/MongoDB.

- Shiny privé : podium top 3, filtres, recherche, type, génération, tendance, pagination, détail complet et graphique uniquement lorsque plusieurs snapshots internes existent.
- PvP public : formats regroupés dynamiquement, tous les rôles, recherche, pagination et lignes accordéon détaillant scores, statistiques, IV/CP, attaques locales, matchups et contres. Les champs indisponibles sont signalés comme tels.
- Best Attackers public : moteur DialgaDex isolé, données Pokémon locales, niveaux 30/40/50, 18 types + ANY, DPS/TDO/eDPS, filtres serveur et export de la vue complète. Le type est choisi par un groupe radio visuel utilisant les icônes locales ; la valeur envoyée reste strictement `ANY`, `FIRE`, `WATER`, etc. Les cartes mobiles regroupent rang, artwork, identité, attaques et métriques sans changer le rendu desktop.

Le diagnostic privé « Résolution variantes » expose la matrice Game Master et ses statuts sans remplacer silencieusement une forme inconnue. Sa table desktop est conservée ; sous `md`, chaque ligne devient une carte et place l’asset exact avant l’identité. PAGE-052 Game Master Explorer utilise le même générateur et le même résolveur sans supprimer PAGE-051.

Les boutons de régénération appellent les routes Admin non documentées avec le secret serveur. Les URLs et secrets externes ne sont jamais envoyés au client.

L'explorateur API charge OpenAPI à l'exécution et présente toutes les routes publiques sans liste manuelle. Les actions privées de régénération sont ajoutées séparément, marquées privées et exécutées uniquement par le proxy serveur.
