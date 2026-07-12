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

- `AdminSectionNavigation` porte la recherche, les groupes repliables, l'état actif et les icônes officielles Pokémon GO. Ajouter une section consiste à enrichir sa configuration, sans recopier le rendu.
- `DatasetSourceHeader` est l'en-tête commun des sources dynamiques. Il expose provenance, visibilité, statut et diagnostics dans une structure stable.
- Tous les accordéons métier sont fermés par défaut. Seul le groupe de navigation contenant la section active est ouvert automatiquement.
- La confidentialité est décidée par le dataset et contrôlée côté serveur. Le client n'obtient jamais le secret de l'API Pokémon.
