---
id: PAGE-052
title: Game Master Explorer et Local Data Inspector
version: 1.1.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [ADR-012, ADR-013, RULE-046, DATASET-023, DATASET-024, COMP-329, COMP-330, API-165, API-176]
---

# PAGE-052 — Game Master Explorer et Local Data Inspector

## Objectif

PAGE-052 est l’outil Admin privé de consultation du Game Master officiel. Il classe les templates, effectue recherche et pagination côté serveur, ouvre un seul JSON brut à la fois, compare les identités Pokémon locales et consulte snapshots et diffs.

## Contexte

Le JSON de PokemonGo-Data reste la source de vérité métier. PokeMiners est une référence externe qui ne modifie jamais automatiquement les fiches locales. L’ancienne PAGE-051 est conservée et partage le même générateur et le même résolveur selon ADR-013.

## Architecture

```text
PokeMiners latest.json + timestamp
  -> generateGameMasterExplorerIndex
  -> validation, hash, classification, propriétés aplaties
  -> comparaison locale canonique
  -> staging MongoDB COL-035 à COL-039
  -> activation du pointeur current
  -> API-165 à API-176 privées
  -> proxy de session Dashboard
  -> COMP-329 / COMP-330
```

## Flux de données

Les listes excluent `raw`, `flattenedPaths`, `flattenedText` et les tokens. La fiche API-168 renvoie un template complet demandé explicitement. Recherche, filtres, tri, pagination et exports complets sont calculés sur le serveur.

## Modèle MongoDB

- COL-035 : pointeur et métadonnées courantes.
- COL-036 : document indexé par template et snapshot.
- COL-037 : métadonnées d’historique.
- COL-038 : changements structurés.
- COL-039 : comparaison Game Master ↔ PokemonGo-Data.

La rétention est illimitée par défaut. `GAME_MASTER_SNAPSHOT_RETENTION` n’est appliqué que lorsqu’il contient une valeur positive.

## Routes API

API-165 à API-176 couvrent résumé, catégories, listes, recherche, détail, comparaison, snapshots, diff, export, régénération et réindexation. Elles exigent le secret Admin et sont absentes d’OpenAPI public.

## Composants UI

COMP-329 propose Explorer, Recherche, Comparaison locale et Historique. COMP-330 replie le JSON, recherche des chemins et valeurs, copie chemin/valeur/document et ne déplie jamais tout par défaut.

## Résolution locale

Le mapping conserve forme, costume, sexe, asset exact, provenance et statut. Une fiche locale dédiée est prioritaire sur une copie héritée dans `assetForms`. Une variante explicite absente ne retombe jamais sur la forme normale.

Les candidats sont regroupés par `pokemonId + form + costume`. Des assets qui ne diffèrent que par `isFemale` forment une seule correspondance `matched` avec `genderVariants`; l’asset mâle sert uniquement de miniature par défaut. Une ambiguïté exige plusieurs identités de forme ou costume distinctes et expose toujours `ambiguityReason`, `ambiguityExplanation` et `ambiguousCandidates`.

L’onglet Assets affiche la valeur, le suffixe, la source et le chemin de `assetBundle`. Si le Game Master ne fournit aucun champ, l’absence est indiquée explicitement au lieu d’une cellule vide.

## Historique d’exécution

Chaque régénération crée une exécution `running`, puis `success`, `partial`, `unchanged` ou `failed`. L’interface Historique affiche durée, compteurs, hash, diff et non-matchés sans confondre ces exécutions avec les snapshots de contenu.

## Sécurité

Session Dashboard puis secret serveur, `private, no-store`, paramètres bornés, recherche limitée à 120 caractères, regex échappées, pagination maximale à 100 et export maximal à 10 000 entrées. Aucun secret n’est sérialisé.

## Performance

Le test réel du 15 juillet 2026 indexe 18 152 templates et 31 catégories. La comparaison couvre 2 456 variantes. Le navigateur ne reçoit que 25, 50 ou 100 lignes et un seul JSON complet à la demande.

## Bonnes pratiques

- Ne jamais filtrer le Game Master complet côté client.
- Ne jamais exécuter une valeur du Game Master.
- Conserver le snapshot actif en cas d’échec de staging.
- Utiliser RULE-045 et RULE-047 pour toute image Pokémon.

## Checklist

- [x] Recherche multi-termes, exacte ou partielle.
- [x] Catégories et compteurs de changements.
- [x] Détail, JSON, propriétés, données locales, assets, historique et diff.
- [x] Exports JSON/CSV respectant les filtres.
- [x] Mobile, tablette, desktop, clavier, thèmes Dashboard.
- [x] Routes privées et tests automatisés.

## Historique

- 1.1.0 — 2026-07-16 : variantes sexuées regroupées, bundles auditables et historique d’exécution centralisé.
- 1.0.0 — 2026-07-15 : création connectée à MongoDB, PokemonGo-Data et PokeMiners.
