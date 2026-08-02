# Rapport de livraison — Sprints 0 et 1

## Périmètre

La livraison crée le centre de contrôle minimal du bot Discord dans le Dashboard Admin. Elle n’implémente volontairement aucune mutation Discord, synchronisation de commande, métrique historique, log distant, testeur ou rotation automatique.

## Réutilisation

- layout protégé et session Dashboard ;
- navigation et sidebar canoniques ;
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `Badge` et `Button` ;
- `FetchLoadingState`, `EmptyState` et `ErrorState` ;
- tokens Light/Dark et règles responsive existantes.

## Nouveaux composants et contrats

- `DiscordBotControlCenter`, `BotMetricCard`, `RuntimeRow` et navigation de module ;
- schéma Zod `operations/v1` ;
- client server-only avec timeout et `no-store` ;
- matrice de permissions deny-by-default pour les mutations.

## Fonctionnel

- route privée `/discord-bot` ;
- affichage réel lorsque le service du bot est joignable ;
- états honnêtes lorsque la liaison manque ou échoue ;
- registre issu du bot, sans import ni duplication ;
- sécurité serveur-à-serveur testée.

## Bloqué par l’infrastructure

Le bot n’est pas encore hébergé et le token local est invalide. La production affichera donc les métriques comme indisponibles jusqu’au déploiement du bot et à la configuration des deux variables Dashboard. La date de synchronisation restera indisponible jusqu’au Sprint 2.

L’audit npm conserve trois avis `high` hérités de Next.js 16.2.12, dernière version
stable installée : PostCSS est épinglé par Next.js et Sharp est contraint à la série
0.34. `npm audit fix --force` propose un downgrade cassant vers Next.js 9.3.3 ; il
n’a pas été exécuté. Les autres avis corrigibles, dont esbuild, ont été résolus.

## Rollback

Retirer l’entrée `/discord-bot` de `src/data/dashboard.ts`, supprimer le segment de route, les composants, le dossier `src/server/discord-bot` et les deux variables Vercel facultatives. Aucune donnée ni migration de base n’est créée.
