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

- `navGroups` dans `src/data/dashboard.ts` est l’unique registre de navigation. Sidebar desktop, mode réduit, drawer mobile, topbar et fil d’Ariane en dérivent. Les destinations Pokémon sont des routes plates; les anciennes URLs `/pokemon-admin?section=...` sont uniquement redirigées pour compatibilité.
- `AdminSectionNavigation` reste utilisé à l’intérieur des surfaces qui possèdent de vraies sous-sections. Sur mobile, sa sheet verrouille le scroll, focalise la recherche et se ferme avec Échap.
- `RegenerationControl` expose une ligne compacte dernière synchronisation/statut et replie provenance, visibilité, hash, compteurs, operation ID, warnings, rapport et diagnostics derrière **Détails**. Les noms `DatasetSourceHeader` et `CurrentDatasetDiagnostics` restent des façades de compatibilité.
- Le Generator Registry expose 17 actions; 15 participent à **Tout régénérer**. Ces nombres sont vérifiés par contrat et ne doivent pas être recopiés dans un second registre runtime.
- La confidentialité est contrôlée côté serveur. Le navigateur n’obtient jamais le secret de PokemonGo-API.
- Le centre de commande exécute les domaines séquentiellement et conserve pour chaque étape un état `pending`, `running`, `success`, `warning` ou `error`.
- Le PvP répond `202 Accepted` avec un identifiant d’exécution ; le Dashboard interroge ensuite le statut privé jusqu’à l’état terminal.
- Le contrat PvP distingue `idle`, `running`, `success`, `partial`, `failed` et
  `cancelled`. `partial` reste un résultat persistant ; le centre global le traduit en
  `warning` avec ses compteurs, jamais en erreur générique. Les warnings PvP sont
  normalisés en `{ code, entity, reason, impact, action, informational }` pour les
  panneaux **Détails** et **Voir le rapport**. Une sentinelle provider explicitement
  informative ne dégrade pas seule le statut ; tout warning inconnu reste avec impact
  par défaut.
- L’agrégateur parcourt aussi `data`, `run`, `sourceRun`, `current` et `diagnostics` afin
  que les warnings Events ou provider imbriqués ne soient pas perdus.
- Les actions longues utilisent la primitive `Button`, son état `loading`, `aria-busy` et le respect de `prefers-reduced-motion`.

## Qualité et supervision

Le groupe **Données Pokémon** contient les surfaces de consultation et de suivi du référentiel, dont **Shiny Tracker**. Le groupe **Qualité & supervision** conserve l’Engine de contrôle JSON, Identity Manager, Résolution variantes, Game Master Explorer, Contrôles et Veille. Le Dashboard ne maintient aucun écran parallèle de comparaison des disponibilités.

La topbar projette le groupe et la destination actifs dans un fil d’Ariane compact. Desktop et drawer mobile consomment le même tableau `navGroups`; une entrée ne doit donc jamais être dupliquée pour changer de catégorie.

La Veille reste l’autorité d’enregistrement des sources et les classe en six domaines. Elle expose uniquement leur santé de transport et leurs signatures ; les données canoniques restent validées par l’Engine.

La chaîne Candy ne résout aucune URL dans le Dashboard. `PokemonGo-Data` publie `assets.candy.image` et `assets.candy.xlImage`; le BFF et les composants transmettent ces références ou rendent explicitement l’état absent.

Le comportement fonctionnel courant des fiches, du viewer JSON, des évolutions, de
Candies, Collections, PvP, Identity Manager, Rocket, Shiny Tracker et Source Watch est
indexé dans `docs/migrations/pokemon-dashboard-polish/README.md`.

## Règle de maintenance

Les nouveaux composants admin sont créés dans `components/admin/*`. Un ancien chemin ne reçoit aucune nouvelle logique métier. Toute source externe utilisée comme audit reste en lecture seule et toute donnée canonique est d’abord résolue dans le dépôt qui en est propriétaire.
