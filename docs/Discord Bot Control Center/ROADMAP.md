# Roadmap

## Livré — Sprints 0 et 1

- audit Dashboard, bot, infrastructure et secrets ;
- architecture serveur-à-serveur choisie et documentée ;
- route, navigation et permission de lecture ;
- vue d’ensemble responsive ;
- santé, connexion, versions, latence, serveurs et registre quand disponibles ;
- états loading, error et indisponible ;
- tests du contrat, des permissions et de la frontière de secrets.

## Sprint 2 — Commandes

Comparer les définitions locales publiées par le bot aux commandes Discord de développement et globales. Ajouter un journal durable de synchronisation avant toute action. Un diff et une confirmation explicite seront obligatoires.

## Sprint 3 — Métriques

Introduire un stockage partagé pour les agrégats de commandes, latences, erreurs et taux de succès. Ne conserver aucun contenu utilisateur inutile.

## Sprints 4 à 6

- serveurs et permissions réellement observées ;
- logs structurés avec corrélation et rétention ;
- testeur en dry-run puis, si justifié, exécution Discord contrôlée.

## Sprints 7 et 8

- configuration et sécurité granulaires ;
- audit durable, rotation documentée et durcissement ;
- tests E2E, charge, accessibilité et procédures de rollback.
