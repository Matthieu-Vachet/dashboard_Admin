# Architecture Dashboard Admin

Le dashboard admin est organise autour d'un dossier canonique `src/components/admin`.
Les anciens dossiers `src/components/dashboard`, `src/components/pokemon-admin` et
`src/components/checklist` conservent uniquement des facades de compatibilite quand un
ancien import peut encore exister.

## Dossiers

- `components/admin/layout` : frame global, providers, modales globales de layout.
- `components/admin/navigation` : sidebar, topbar, selecteur de palette.
- `components/admin/dashboard` : ecrans dashboard generaux et outils quotidiens.
- `components/admin/pokemon` : Admin Pokemon, panels de donnees, fiches et modales Pokemon.
- `components/admin/events` : calendrier et CRUD events Pokemon GO.
- `components/admin/forms` : kanban, notes, todo, calendrier personnel, writer, exercices.
- `components/admin/stats` : analytics, MongoDB, charts et statistiques.
- `components/admin/tables` : listes admin type backlog.
- `components/admin/shared` : composants transverses sans logique metier forte.
- `components/admin/cards` : cartes reutilisables.

## Services Et Hooks

- `services/admin` centralise les chemins API et les acces dashboard-store.
- `hooks/admin` centralise les comportements persistants du dashboard.
- `utils/admin` regroupe les helpers purs de tri, filtrage et surveillance.
- `constants/admin` expose les constantes de navigation et de palettes.
- `types/admin` contient les types partages entre layout et composants admin.

## Regle De Maintenance

Les nouveaux composants admin doivent etre crees dans `components/admin/*`.
Un ancien chemin ne doit etre modifie que pour maintenir une facade d'export, pas pour
ajouter de nouvelle logique metier.

## Navigation Et Datasets

- `AdminSectionNavigation` porte la recherche, l'état actif et les icônes officielles Pokémon GO. Sur desktop, elle n’affiche que le groupe choisi dans une barre compacte ; sur mobile, elle ouvre une sheet plein écran, verrouille le scroll et ferme avec Échap. La section active est reflétée dans `?section=`.
- `DatasetSourceHeader` est l'en-tête commun des sources dynamiques. Il expose provenance, visibilité, statut et diagnostics dans une structure stable.
- Les accordéons métier sont fermés par défaut. La navigation ne déploie jamais toutes les catégories simultanément.
- La confidentialité est décidée par le dataset et contrôlée côté serveur. Le client n'obtient jamais le secret de l'API Pokémon.
- `GameMasterExplorerPanel` est chargé dynamiquement. Ses listes sont paginées côté serveur et n’obtiennent jamais `raw`; `GameMasterJsonViewer` ne reçoit que le template ouvert.

## Regenerations Admin Pokemon

- Le centre de commande lance les domaines un par un afin de conserver une progression lisible et d'éviter les pointes de charge sur les providers et MongoDB.
- Chaque étape possède un état `pending`, `running`, `success`, `warning` ou `error`. Une erreur est isolée à son domaine et n'empêche pas les étapes suivantes ; le résumé final conserve le diagnostic exact.
- Le PvP répond `202 Accepted` avec un identifiant d'exécution. Le Dashboard interroge ensuite la route de statut privée jusqu'à `success` ou `failed` au lieu de garder une requête HTTP ouverte au-delà de la durée d'une Function.
- Les boutons d'actions longues utilisent `Button` avec `loading` et `loadingText`. La primitive applique le spinner, `aria-busy`, la désactivation automatique et respecte `prefers-reduced-motion`.
