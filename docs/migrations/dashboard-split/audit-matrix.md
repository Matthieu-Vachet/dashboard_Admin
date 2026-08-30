# Audit fonctionnel avant séparation

Audit exécuté avant migration sur le SHA Dashboard `103a0f3bd2f59298760f8b6cd0e01767b4d8159b`. Les lignes `AMBIGUOUS` ont été résolues avant tout déplacement.

| Route | Page / domaine | Classe initiale | Dépendances principales | Partagé | MongoDB / API / assets | Destination |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Dashboard personnel historique | JAVASCRIPT | widgets, persistance | layout, DS, auth | `dashboard_store`, API metrics | JavaScript, puis remplacée par l’accueil Pokémon |
| `/analytics` | Analytics | JAVASCRIPT | charts, learning | DS | learning API, statistiques | JavaScript |
| `/tools` | Outils quotidiens | JAVASCRIPT | defaults personnels | DS, persistance | `dashboard_store` | JavaScript |
| `/tools/dashboard-backlog` | Backlog | JAVASCRIPT | table backlog | auth, DS | `dashboard_backlog`, API dédiée | JavaScript |
| `/notes` | Notes | JAVASCRIPT | NotesBoard | DS, persistance | clé `matweb.notes` | JavaScript |
| `/kanban` | Kanban | JAVASCRIPT | DnD, KanbanBoard | DS, persistance | clé `matweb.kanban` | JavaScript |
| `/projects` | Projets | JAVASCRIPT | page CRUD | DS, persistance | clé `matweb.projects` | JavaScript |
| `/calendar` | Calendrier personnel | JAVASCRIPT | date-fns | DS, persistance | clé `matweb.calendar` | JavaScript |
| `/todo` | Todo personnel | JAVASCRIPT | TodoList | DS, persistance | clé `matweb.todos` | JavaScript |
| `/writer` | Texte | JAVASCRIPT | WriterStudio | DS, persistance | clé `matweb.writer` | JavaScript |
| `/js-progress` | Progression JS | JAVASCRIPT | learning repository | DS, auth | six collections `learning_*`, API learning | JavaScript |
| `/exercices-javascript` | Exercices JS | JAVASCRIPT | curriculum | DS | données learning embarquées | JavaScript |
| `/pomodoro` | Pomodoro | JAVASCRIPT | timer | DS, persistance | clé `matweb.pomodoro` | JavaScript |
| `/snippets` | Snippets | JAVASCRIPT | SnippetVault | DS, persistance | clé `matweb.tools.snippets` | JavaScript |
| `/palette` | Couleurs | JAVASCRIPT | ColorLab | palette partagée | clé de palette | JavaScript |
| `/account` | Compte | SHARED | session | layout, DS, auth | session signée | Copie autonome dans les deux |
| `/pokemon-admin` | Studio Pokémon complet | POKEMON | Engine, panels, Data | layout, DS, auth | API Admin, Data, Assets, Mongo | Pokémon, aplati sur `/` et routes dédiées |
| `/pokemon-docs` | Docs JSON Data | AMBIGUOUS → POKEMON | docs de schémas Data | layout, DS | fichiers PokemonGo-Data | Pokémon |
| `/discord-bot` | Bot Discord | AMBIGUOUS → POKEMON | contrôle bot lié aux données | layout, auth | secrets/contrat bot Pokémon | Pokémon |
| `/database` | Supervision Mongo | AMBIGUOUS → POKEMON | stats base opérationnelle | DS, auth | Mongo et datasets Pokémon | Pokémon |
| `/api/dashboard-store` | Persistance clé/valeur | SHARED | store Mongo | auth, sécurité | `dashboard_store` | Copie autonome dans les deux |
| `/api/session`, `/api/logout` | Auth | SHARED | token/session | sécurité | cookie HTTP-only | Copie autonome dans les deux |
| `/api/dashboard-backlog/*` | Backlog API | JAVASCRIPT | store backlog | auth, sécurité | `dashboard_backlog` | JavaScript |
| `/api/learning/*` | Learning API | JAVASCRIPT | repository learning | auth, sécurité | collections `learning_*` | JavaScript |
| `/api/pokemon-admin` | Admin/Registry Pokémon | POKEMON | resolvers, Engine, Registry | auth, sécurité | PokemonGo-Data/API/Assets | Pokémon |
| `/api/admin/events/*` | Events | POKEMON | scrapes, archives | auth, store | Mongo events, providers | Pokémon |
| `/api/admin/community-days/*` | Community Days | POKEMON | sync, archives | auth, store | Mongo, PokemonGo-Data | Pokémon |
| APIs stats/proxy/health/redeploy | Supervision Pokémon | POKEMON | PokemonGo-API, Vercel | auth, sécurité | APIs externes et secrets Pokémon | Pokémon |

Les primitives Button, Badge, Card, Modal, champs, états, providers, navigation, thèmes, `usePersistentState`, session et sécurité sont `SHARED` par copie de source, jamais par dépendance runtime. Aucun élément audité n’a été classé `OBSOLETE` hors wrappers de navigation et façades devenus inutiles après migration.
