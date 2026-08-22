# Stabilisation Dashboard, Engine, Assets, PvP et Collections — 22 août 2026

## Baseline et archive

La baseline est `pokemon-engine-canonical-report-2026-08-21.json` : 1 617 entités,
1 617 Core, 1 614 fiches/références PvP et 25 erreurs, dont 22 Architecture Assets et
3 `pvp_ref_missing`. Avant écriture, les trois dépôts et pièces de mission ont été archivés
sous `archives/mission-critique-before-2026-08-22-01-24-25/`. Le manifest contient
11 869 fichiers avec SHA-256 ; la restauration complète en espace temporaire a réussi.

## Audit des chaînes d’action

| Action | Chaîne | Cause observée avant correction | Contrat durable |
| --- | --- | --- | --- |
| Events rescrape | UI → route Events → scraper LeekDuck → resolver canonique → MongoDB → toast | erreur structurée concaténée comme objet | lecteur HTTP commun, `operationId`, validation de résultat et toast normalisé |
| Community Days | UI → route sync → parser/résolution canonique → archive MongoDB → toast | même sérialisation brute | exécuteur commun et statut métier explicite |
| Catalogue canonique | UI → BFF → API Identity Manager → inventaire Data/Assets → MongoDB preview/apply | référence Home Greninja pointant vers `normal` au lieu de `mega` | erreur structurée, preview non destructive, apply idempotent |
| Engine | UI → route Admin → readers Data/Assets/PvP → audits → rapport | fichiers Chesnaught/Greninja et manifest non régénéré | références canoniques et manifest dérivé du filesystem |
| PvP | générateur mensuel → cache/mappings → records dédiés → manifest → Engine | trois nouvelles Méga sans `pvpRef` | un record par identité, status-only quand non classable |
| Collections | catalogue pur → filtres → sélection locale/MongoDB → cartes | pagination 48 et badges positionnés dans le même coin | liste continue, opérations globales et stack de badges flex |

## Contrat des actions Admin

`normalizeActionError` accepte `Error`, chaîne, `Response`, erreurs API/validation,
`message`, `error`, `cause`, body HTTP et objets inconnus. Il produit uniquement
`{ code, message, details?, status?, cause? }`. `executeAdminAction` publie les états
`idle`, `running`, `success`, `partial`, `warning`, `failed`. Le serveur écrit une ligne
JSON avec `operationId`, action, provider, début, fin, durée, statut et `errorCode`.

## Réconciliation canonique

- `0652-chesnaugh-mega` est renommé `0652-chesnaught-mega` et son identité corrigée.
- le Core Greninja Méga suit le nom canonique `0658-greninja-mega.assets.json` ; sa
  famille HOME est classée `mega` et référencée depuis le Core.
- le générateur Assets réécrit 4 648 fichiers, manifeste inclus, et valide compteurs,
  octets et SHA-256.
- Méga-Blindépique, Méga-Goupelin et Méga-Amphinobi reçoivent automatiquement une fiche
  PvP dont l’identité PvPoke est `MATCHED` ; leurs quatre ligues restent `UNRELEASED`,
  sans rang, score ni moveset inventé.
- le snapshot PvPoke `78c64048aebeb9265e1a090137c5463880fb6fa2` est idempotent ;
  `DIVE`/`SURF` sont alignées pour Cramorant et le sentinel `none` d’Unown ne devient
  jamais un mapping artificiel.
- l’Engine final attend 1 617 Core, 1 617 PvP, zéro référence cassée, zéro orphelin et
  zéro erreur Architecture.

## Interface et retrait produit

Collections affiche toute la population filtrée dans une liste continue avec rendu CSS
différé. Sélection et désélection restent globales. Les badges combinés occupent des slots
flex adjacents. La Défense réutilise `uiAssets.icons.shieldAlt`, source exacte du simulateur.
Le panneau attend désormais l’hydratation complète des familles `home`, `shuffle` et
`variants` avant d’autoriser une création : aucune checklist transitoire ou partielle ne
peut être enregistrée. Les compteurs courants proviennent du Data matérialisé : 17 Gigamax,
58 Méga et 311/429 entrées Event en mode simple/multi.

Images Dynamax est supprimé de la navigation, du panneau, des routes BFF/API, du proxy,
du registre, du scan, du cache, de l’export, des tests et de la documentation active. Les
identités/assets Dynamax, Max Battles, imports et générateurs partagés ne sont pas modifiés.

## Versioning

| Dépôt | Avant | Après | Schéma |
| --- | ---: | ---: | ---: |
| Dashboard Admin | 1.47.0 | 1.48.0 | inchangé |
| PokemonGo-Data | 1.27.0 | 1.28.0 | 1.1.0 inchangé |
| PokemonGo-API- | 1.23.0 | 1.24.0 | API v1 inchangée |

Les changelogs des trois dépôts décrivent les ajouts, changements, corrections et le
retrait. Les résultats de validation locale, Git, déploiement et production sont consignés
dans le rapport de livraison de la mission.

## Validation locale avant livraison

- PokemonGo-Data : 230/230 tests, manifest Assets 4 648 fichiers sans collision ni
  différence structurelle, 1 617/1 617 records PvP et deuxième génération idempotente.
- PokemonGo-API- : 174/174 tests, dry-run MongoDB 1 617 Pokémon / 1 617 Core /
  3 030 familles d’assets, build Next.js et 11 générateurs embarqués.
- Dashboard Admin : toutes les suites `test:*` unitaires/contractuelles vertes, lint sans
  erreur, TypeScript et build Next.js verts, 17 actions de registre / 15 actions globales.
- Engine : `VALID_WITH_DIAGNOSTICS`, 0 Error, 0 Warning, 8 120 Info et zéro erreur
  Architecture ; les informations fournisseur attendues restent non bloquantes. Le rapport
  sérialisé est conservé dans `docs/Reports/pokemon-engine-canonical-report-2026-08-22.json`.
- Collections E2E : 15 scénarios, 7 viewports, 2 thèmes et 0 erreur console ; aucune
  pagination et sélection/désélection globale vérifiées.
- Responsive Pokémon : 242 pages, 11 largeurs et 2 thèmes.
- JSON : 1 646 fichiers Data modifiés, 3 Dashboard et 2 API parsés sans erreur ;
  `git diff --check` est propre sur les trois dépôts.
