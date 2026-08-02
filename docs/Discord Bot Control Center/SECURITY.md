# Sécurité et permissions

## Invariants

- Le token Discord reste exclusivement dans l’environnement du bot.
- Le secret de liaison reste exclusivement dans les environnements serveur.
- Aucun nom de variable sensible n’est transmis au composant React.
- L’endpoint du bot est GET-only, sans CORS, sans donnée Pokémon et protégé par comparaison en temps constant.
- La route Dashboard appartient au layout authentifié et revérifie la permission de lecture.
- L’indisponibilité ne déclenche ni synchronisation, ni reconnexion, ni mutation.

## Matrice Sprint 1

| Permission | Admin | État |
| --- | --- | --- |
| `discord_bot.overview.read` | oui | active |
| `discord_bot.health.read` | oui | active |
| `discord_bot.commands.read` | oui | active |
| `discord_bot.commands.synchronize` | non | désactivée |
| `discord_bot.configuration.write` | non | désactivée |
| `discord_bot.secrets.rotate` | non | désactivée |

Les permissions de mutation seront activées uniquement après ajout d’une identité propriétaire distincte, confirmation explicite, journal d’audit durable et protections anti-double action.

## Rotation

Le Sprint 1 ne prétend pas automatiser la rotation du token Discord. Une rotation doit être réalisée dans le gestionnaire de secrets approprié, suivie d’un redéploiement du bot, d’une vérification de connexion puis de la révocation de l’ancien secret.
