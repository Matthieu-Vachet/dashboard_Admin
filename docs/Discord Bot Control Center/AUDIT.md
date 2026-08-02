# Audit préalable

## Dashboard Admin

- Next.js 16 App Router, React 19 et TypeScript strict.
- Routes privées regroupées sous `src/app/(dashboard)` et protégées par une session HMAC HTTP-only.
- Navigation canonique fournie par `src/data/dashboard.ts` et rendue par `AdminSidebar`.
- Composants canoniques : `Card`, `Badge`, `Button` et le système partagé loading/empty/error.
- Accès externes sensibles réalisés côté serveur ; aucune clé privée préfixée `NEXT_PUBLIC_`.
- Déploiement Vercel lié au projet `dashboard-admin`, Node.js 24.

## Bot Discord

- Node.js 24, TypeScript strict et discord.js 14.27.
- Intention `Guilds` uniquement ; aucune commande préfixée.
- Registre réel contenant les vingt Slash Commands officielles.
- Déploiement des commandes séparé du démarrage.
- Client Pokémon unique, public, GET-only et limité à `https://pokemon-go-api.vercel.app`.
- Logs structurés et secrets expurgés.
- Aucun stockage opérationnel durable au Sprint 1.

## Infrastructure et secrets

- Aucun fichier TXT, PEM ou KEY isolé n’a été trouvé dans le workspace audité.
- Les fichiers `.env` existants sont ignorés par Git ; seuls leurs noms de variables ont été inspectés.
- Le token local actuel du bot est refusé par Discord. Il n’a pas été affiché, copié ni modifié.
- Le bot ne possède pas encore d’hébergement opérationnel joignable depuis Vercel.

## Architectures évaluées

### A — API opérationnelle du bot, choisie

Le bot publie un contrat HTTP read-only protégé. Le Dashboard le consomme côté serveur. Avantages : état de connexion réel, registre réel, absence de duplication, évolution naturelle vers les métriques. Limite : le bot doit être hébergé et relié par réseau/HTTPS.

### B — Stockage partagé

Adapté aux métriques, logs et audits futurs, mais prématuré pour une simple santé de processus. Il sera introduit lorsque la rétention et les agrégations seront nécessaires.

### C — Appels Discord depuis le Dashboard

Rejeté. Cette solution dupliquerait le token Discord et ne fournirait pas l’état réel du processus du bot.

## Risques ouverts

- Tant que le bot n’est pas hébergé, l’état Discord demeure indisponible en production.
- La dernière synchronisation reste `null` tant que le script de déploiement n’a pas
  écrit son journal opérationnel pour le schéma courant.
- Le rôle Dashboard actuel est uniquement `admin`; les permissions de mutation sont donc définies mais désactivées.
