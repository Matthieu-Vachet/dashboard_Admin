# Architecture Dashboard Admin

Le Dashboard Admin est organisé autour du dossier canonique `src/components/admin`. Les anciens dossiers `src/components/dashboard`, `src/components/pokemon-admin` et `src/components/checklist` conservent uniquement des façades de compatibilité lorsqu’un ancien import peut encore exister.

## Dossiers

- `components/admin/layout` : frame globale, providers et modales de layout.
- `components/admin/navigation` : sidebar, topbar et sélecteur de palette.
- `components/admin/dashboard` : écrans généraux et outils quotidiens.
- `components/admin/pokemon` : Admin Pokémon, panels de données, fiches et modales.
- `components/admin/events` : calendrier et CRUD des événements Pokémon GO.
- `components/admin/forms` : kanban, notes, todo, calendrier personnel, writer et exercices.
- `components/admin/stats` : analytics, MongoDB, graphiques et statistiques.
- `components/admin/tables` : listes administratives.
- `components/admin/shared` : composants transverses sans logique métier forte.
- `components/admin/cards` : cartes réutilisables.
- `components/admin/discord-bot` : centre de contrôle et primitives de supervision du bot.

## Services et hooks

- `services/admin` centralise les chemins API et les accès au dashboard-store.
- `hooks/admin` centralise les comportements persistants.
- `utils/admin` regroupe les helpers purs de tri, filtrage et surveillance.
- `constants/admin` expose les constantes de navigation et de palettes.
- `types/admin` contient les types partagés entre layout et composants.
- `server/discord-bot` contient le contrat, les permissions et le client opérationnel strictement serveur.

## Navigation, données et régénérations

- `AdminSectionNavigation` porte la recherche, l’état actif et les icônes Pokémon GO. Sur desktop, elle affiche le groupe choisi dans une barre compacte ; sur mobile, elle ouvre une sheet plein écran, verrouille le scroll et se ferme avec Échap. La section active est reflétée dans `?section=`.
- `DatasetSourceHeader` expose provenance, visibilité, statut et diagnostics dans une structure stable.
- La confidentialité est contrôlée côté serveur. Le navigateur n’obtient jamais le secret de PokemonGo-API.
- Le centre de commande exécute les domaines séquentiellement et conserve pour chaque étape un état `pending`, `running`, `success`, `warning` ou `error`.
- Le PvP répond `202 Accepted` avec un identifiant d’exécution ; le Dashboard interroge ensuite le statut privé jusqu’à l’état terminal.
- Les actions longues utilisent la primitive `Button`, son état `loading`, `aria-busy` et le respect de `prefers-reduced-motion`.

## Qualité et supervision

Le groupe **Qualité & supervision** conserve l’Engine de contrôle JSON, Identity Manager, Shiny Tracker, Résolution variantes, Game Master Explorer, Contrôles et Veille. Le Dashboard ne maintient aucun écran parallèle de comparaison des disponibilités.

La Veille reste l’autorité d’enregistrement des sources et les classe en six domaines. Elle expose uniquement leur santé de transport et leurs signatures ; les données canoniques restent validées par l’Engine.

La chaîne Candy ne résout aucune URL dans le Dashboard. `PokemonGo-Data` publie `assets.candy.image` et `assets.candy.xlImage`; le BFF et les composants transmettent ces références ou rendent explicitement l’état absent.

## Règle de maintenance

Les nouveaux composants admin sont créés dans `components/admin/*`. Un ancien chemin ne reçoit aucune nouvelle logique métier. Toute source externe utilisée comme audit reste en lecture seule et toute donnée canonique est d’abord résolue dans le dépôt qui en est propriétaire.
