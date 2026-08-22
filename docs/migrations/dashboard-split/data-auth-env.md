# Contrats de données, auth et environnement

La séparation n’a déplacé, renommé ou supprimé aucun document MongoDB. Le Dashboard Pokémon continue d’utiliser `dashboard_store`, `dashboard_api_metrics`, `events`, `events_archive`, `community_days`, `community_days_archive` et `dataset_runs`, ainsi que les bases Data/API Pokémon historiques.

`dashboard_store` reste partagé par contrat avec le Dashboard JavaScript : chaque app possède sa propre implémentation, mais conserve le même `owner`, les mêmes clés `matweb.*` et la même base. `dashboard_backlog` et `learning_*` ne sont plus consommées ici.

L’authentification reste inchangée : `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, cookie signé HTTP-only et contrôles d’origine. Les variables Mongo communes sont `DASHBOARD_MONGODB_URI`, l’alias `MONGODB_URI` et `DASHBOARD_MONGODB_DB`.

Les variables `POKEMON_API_URL`, `POKEMON_API_PUBLIC_URL`, `POKEMON_API_ADMIN_SECRET`, `POKEMON_GO_DATA_DIR`, `POKEMON_GO_DATA_REPO`, `POKEMON_GO_DATA_REF`, `POKEMON_GO_DATA_TOKEN` et les variables Discord restent exclusivement Pokémon.
