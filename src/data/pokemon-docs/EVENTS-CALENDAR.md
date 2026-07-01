# Calendrier Events Pokémon GO

La page `Pokemon Admin > Calendrier Events` affiche et administre les events Pokémon GO
dans le Dashboard Admin. Elle utilise MongoDB quand `DASHBOARD_MONGODB_URI` ou
`MONGODB_URI` est configuré, sinon l'endpoint public renvoie des seeds de lecture.

## Collection Mongo

Collection : `events`

Chaque document est global au dashboard et contient :

```json
{
  "id": "community-day-example",
  "title": "Community Day",
  "description": "Event description",
  "type": "community_day",
  "startDate": "2026-07-01T10:00:00.000Z",
  "endDate": "2026-07-01T17:00:00.000Z",
  "timezone": "Europe/Paris",
  "status": "upcoming",
  "source": "manual",
  "assets": {
    "banner": null,
    "icon": null
  },
  "featuredPokemon": [],
  "bonuses": [],
  "links": []
}
```

Index créés automatiquement :

- `id` unique.
- `status + startDate`.
- `type + startDate`.
- `updatedAt`.

## Types

Types acceptés :

- `community_day`
- `spotlight_hour`
- `raid_hour`
- `raid_day`
- `event`
- `season`
- `go_fest`
- `research_day`
- `max_battle`
- `egg_event`
- `rocket_event`
- `other`

Le catalogue UI centralise le label FR, la couleur et l'icône dans
`src/data/pokemon-events.ts`.

## Statuts

Statuts acceptés :

- `draft`
- `current`
- `upcoming`
- `past`
- `archived`

Quand le statut n'est pas `draft` ou `archived`, l'API recalcule le statut réel à partir
de `startDate` et `endDate` pour que les vues En cours, À venir et Passés restent justes.

## Routes API

Lecture publique :

```http
GET /api/events
GET /api/events?includeArchived=1
```

Réponse :

```json
{
  "success": true,
  "data": {
    "configured": true,
    "collection": "events",
    "seeded": false,
    "events": []
  }
}
```

Routes admin protégées par session dashboard, rate-limit et origine identique :

```http
POST /api/admin/events
PATCH /api/admin/events/:id
DELETE /api/admin/events/:id
POST /api/admin/events/import
```

L'import accepte soit un tableau JSON, soit un objet `{ "events": [...] }`. Les events sont
upsert par `id`.

## UI Admin

Fonctions disponibles :

- vue mensuelle ;
- vue liste : Aujourd'hui, En cours, À venir, Passés ;
- filtres type, statut, date et recherche texte ;
- modale détail avec dates, source, type, bonus, Pokémon liés et liens ;
- ajout, modification, suppression, archivage, restauration et duplication ;
- import JSON et export JSON.

## Limites Connues

La page ne scrape pas encore automatiquement LeekDuck ou PoGO Calendar. Les seeds servent
uniquement à éviter une page vide et doivent être remplacés par des documents Mongo via
CRUD ou import JSON pour une exploitation continue.
