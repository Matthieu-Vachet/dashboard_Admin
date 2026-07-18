# Calendrier Events Pokémon GO

La page `Pokemon Admin > Calendrier Events` affiche et administre les events Pokémon GO
dans le Dashboard Admin. Elle utilise MongoDB quand `DASHBOARD_MONGODB_URI` ou
`MONGODB_URI` est configuré, sinon l'endpoint public renvoie des seeds de lecture.

## Collection Mongo

Collection courante : `events`. Archive permanente : `events_archive`. Historique technique : `dataset_runs`.

`events` peut retirer les entrées absentes du flux courant. Le même rescraping upsert simultanément `events_archive`, où aucune entrée n’est supprimée : `activeInCurrentFeed: false` signifie uniquement « absent du flux actuel ». Toute modification source réelle incrémente la révision et conserve un diff compact.

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
  "rewards": [],
  "raw": {},
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
- `raid_battles`
- `spotlight_hour`
- `raid_hour`
- `go_battle_league`
- `go_pass`
- `choose_your_path`
- `max_monday`
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
POST /api/admin/events/scrape
POST /api/admin/events/import
GET /api/admin/events/archive
GET /api/admin/events/archive/:id
```

L'import accepte soit un tableau JSON, soit un objet `{ "events": [...] }`. Les events sont
upsert par `id`.

`POST /api/admin/events/scrape` lit `https://leekduck.com/feeds/events.json`,
utilise `https://github.com/bigfoott/ScrapedDuck` comme référence d'enrichissement
quand le dataset public expose `extraData`, puis résout tous les alias Pokémon en un lot
privé via l'Identity Manager avant l'upsert MongoDB. Les images LeekDuck sont conservées
dans `sourceImage` pour l'audit mais ne servent jamais de fallback visuel. La réponse contient
un rapport exploitable :

```json
{
  "success": true,
  "data": {
    "source": "leekduck-events",
    "eventsParsed": 54,
    "eventsSkipped": 0,
    "pokemonMatched": 104,
    "pokemonUnmatched": 0,
    "imagesRecovered": 127,
    "mongoUpdated": true,
    "events": []
  }
}
```

Si LeekDuck ne retourne aucun event ou si l'import échoue, la route renvoie
`success: false` et aucun toast de succès ne doit être affiché.

Routes publiques de l’archive dans PokemonGo-API :

```http
GET /api/v1/events/history
GET /api/v1/events/history/:id
GET /api/v1/events/history/:id/revisions
```

La projection publique ne retourne pas `sourcePayload`, diagnostics internes ni secrets.

## UI Admin

Fonctions disponibles :

- vue mensuelle ;
- barres continues pour les events multi-jours ;
- vue liste : Aujourd'hui, En cours, À venir, Passés ;
- timeline latérale repliable : Today Only, Ongoing Events, Upcoming Events et Past Events ;
- filtres type, statut, date et recherche texte ;
- modale détail avec dates, source, type, durée, description, image event, bonus, rewards, Pokémon liés cliquables, liens et infos scrapées ;
- ajout, modification, suppression, archivage, restauration et duplication ;
- rescrape LeekDuck, import MongoDB, import JSON et export JSON.

## Limites Connues

Le scraper s'appuie d'abord sur le feed JSON public LeekDuck Events et utilise ScrapedDuck
comme source d'enrichissement. Les pages de détail LeekDuck très spécifiques peuvent
contenir des blocs que ScrapedDuck n'expose pas encore ; dans ce cas le dashboard conserve
l'event, ses dates, son image et son lien source, mais n'invente pas de bonus ou rewards.
Un Pokémon sans identité canonique reste sans artwork, avec son alias brut et sa raison
dans `dataset_runs`, jusqu'à son association dans l'Identity Manager.
