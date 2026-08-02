# Centre de contrôle Discord Bot

Cette documentation décrit la première livraison du module `Discord Bot` du Dashboard Admin. Elle couvre les Sprints 0 et 1 : audit, architecture, permissions, vue d’ensemble, santé basique, versions, registre de commandes et états d’indisponibilité honnêtes.

## Documents

- [Audit](./AUDIT.md)
- [Architecture et contrats](./ARCHITECTURE.md)
- [Sécurité et permissions](./SECURITY.md)
- [Roadmap](./ROADMAP.md)
- [Rapport de livraison](./DELIVERY-REPORT.md)

## Périmètre opérationnel

La route `/discord-bot` est protégée par la session du Dashboard. Elle lit, côté serveur uniquement, `GET /v1/overview` exposé facultativement par le processus du bot. La page ne contient aucune mutation, aucun appel direct à Discord et aucune copie des commandes.

Si la liaison n’est pas configurée ou si le bot n’est pas hébergé, la page reste fonctionnelle et affiche « Métrique non disponible » avec la raison opérationnelle. Cette absence n’est jamais convertie en état connecté ou en valeur zéro.
