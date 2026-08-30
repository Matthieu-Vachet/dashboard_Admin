# Matrice des routes — séparation des dashboards

Date : 2026-08-22.

## Routes Pokémon

| Ancienne URL | Nouvelle URL | Décision |
| --- | --- | --- |
| `/pokemon-admin` | `/` | Redirection permanente vers l’accueil |
| `/pokemon-admin?section=pokedex` | `/pokedex` | Redirection permanente |
| `/pokemon-admin?section=candies` | `/candies` | Redirection permanente |
| `/pokemon-admin?section=backgrounds` | `/backgrounds` | Redirection permanente |
| `/pokemon-admin?section=collections` | `/collections` | Redirection permanente |
| `/pokemon-admin?section=assets` | `/assets` | Redirection permanente |
| `/pokemon-admin?section=catalogs` | `/catalogues` | Redirection permanente |
| `/pokemon-admin?section=raids` | `/raids` | Redirection permanente |
| `/pokemon-admin?section=max-battles` | `/max-battles` | Redirection permanente |
| `/pokemon-admin?section=rocket` | `/rocket` | Redirection permanente |
| `/pokemon-admin?section=pvp-simulator` | `/pvp-simulator` | Redirection permanente |
| `/pokemon-admin?section=pvp-rankings` | `/pvp-rankings` | Redirection permanente |
| `/pokemon-admin?section=gbl-calendar` | `/gbl-calendar` | Redirection permanente |
| `/pokemon-admin?section=best-attackers` | `/best-attackers` | Redirection permanente |
| `/pokemon-admin?section=best-defenders` | `/best-defenders` | Redirection permanente |
| `/pokemon-admin?section=eggs` | `/eggs` | Redirection permanente |
| `/pokemon-admin?section=research` | `/research` | Redirection permanente |
| `/pokemon-admin?section=events` | `/events` | Redirection permanente |
| `/pokemon-admin?section=community-days` | `/community-days` | Redirection permanente |
| `/pokemon-admin?section=events-history` | `/events-history` | Redirection permanente |
| `/pokemon-admin?section=shiny` | `/shiny-tracker` | Redirection permanente |
| `/pokemon-admin?section=identity-manager` | `/identity-manager` | Redirection permanente |
| `/pokemon-admin?section=pokemon-identity-mappings` | `/pokemon-identity-mappings` | Redirection permanente |
| `/pokemon-admin?section=game-master-explorer` | `/game-master-explorer` | Redirection permanente |
| `/pokemon-admin?section=checks` | `/checks` | Redirection permanente |
| `/pokemon-admin?section=sources` | `/source-watch` | Redirection permanente |
| `/pokemon-admin?section=compare` | `/compare` | Redirection permanente |
| `/pokemon-admin?section=todo` | `/pokemon-todo` | Redirection permanente |
| `/pokemon-admin?section=logs` | `/logs` | Redirection permanente |
| `/pokemon-admin?section=rules` | `/rules` | Redirection permanente |
| `/pokemon-admin?section=bulk` | `/bulk-corrections` | Redirection permanente |
| `/pokemon-admin?section=export` | `/export` | Redirection permanente |

Le paramètre `q` est conservé. Les routes Pokémon autonomes `/pokemon-docs`, `/discord-bot`, `/database` et `/account` restent inchangées.

## Routes déplacées

`/analytics`, `/tools`, `/tools/dashboard-backlog`, `/notes`, `/kanban`, `/projects`, `/calendar`, `/todo`, `/writer`, `/js-progress`, `/pomodoro`, `/exercices-javascript`, `/snippets` et `/palette` existent désormais dans `dashboard-javascript` aux mêmes chemins. Elles ne sont pas redirigées depuis le produit Pokémon afin d’éviter une dépendance à un domaine de preview éphémère.
