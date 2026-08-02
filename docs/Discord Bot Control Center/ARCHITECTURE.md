# Architecture et contrats

## Flux retenu

```text
Navigateur authentifié
  → Server Component /discord-bot
    → client serveur Dashboard
      → HTTPS + Bearer partagé
        → GET /v1/overview du bot
          → client Discord + registre de commandes
```

Le navigateur ne connaît que le modèle de vue déjà validé. Le secret de liaison reste dans l’environnement serveur du Dashboard.

## Contrat `operations/v1`

Le bot retourne :

- date d’observation et démarrage du processus ;
- état du service et uptime ;
- état de connexion Discord, statut WebSocket, ping et nombre de serveurs ;
- versions du bot, de Node.js et de discord.js ;
- nombre, noms et hash SHA-256 des définitions de commandes ;
- dernière synchronisation, explicitement `null` tant qu’elle n’est pas persistée.

Le schéma Zod du Dashboard exige `contractVersion: 1`. Une réponse différente devient une indisponibilité explicite et ne traverse pas la frontière de présentation.

## Responsabilités

- Le bot reste la source de vérité de son état et de son registre.
- Le Dashboard orchestre la lecture et la présentation.
- L’API Pokémon reste la seule source des données Pokémon ; le contrat opérationnel n’en transporte aucune.
- Discord n’est jamais appelé par un Client Component.

## Variables

Bot : `BOT_OPERATIONS_HOST`, `BOT_OPERATIONS_PORT`, `BOT_OPERATIONS_SHARED_SECRET`.

Dashboard : `DISCORD_BOT_OPERATIONS_URL`, `DISCORD_BOT_OPERATIONS_SECRET`.

Les secrets doivent contenir au moins 32 caractères et être identiques. En dehors de `localhost`, l’URL Dashboard doit utiliser HTTPS. Le port du bot ne doit pas être exposé directement sur Internet.

## Cache et erreurs

La lecture utilise `no-store` et un timeout de cinq secondes. Les codes 401/403, les erreurs réseau, les timeouts et les contrats incompatibles possèdent des messages distincts sans exposer d’URL, de payload ou de secret.
