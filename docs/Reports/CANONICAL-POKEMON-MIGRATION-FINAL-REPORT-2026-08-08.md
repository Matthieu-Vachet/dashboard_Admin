---
id: REPORT-2026-08-08-CANONICAL-POKEMON-MIGRATION-FINAL
title: Rapport final — migration canonique Pokémon GO
version: 1.0.0
status: validé
last_update: 2026-08-08
author: MatWeb Innovation
affected_projects:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
---

# Rapport final — migration canonique Pokémon GO

## Résultat

La migration globale est validée. Les fiches Assets et PvP sont séparées par
catégorie `normal`, `forms`, `mega`, `dynamax` et `gigantamax`. Les loaders,
l’API, le Dashboard, l’Engine, les manifestes, les générateurs, les imports et
les tests consomment la même classification canonique.

Versions publiées :

- PokemonGo-Data `1.21.0` ;
- PokemonGo-API- `1.21.0` ;
- Dashboard Admin `V1.43.0`.

## Archive maîtresse et rollback

L’état antérieur reste restaurable sous
`PokemonGo-Data/archives/global-data-dashboard-migration-before-2026-08-05-17-27-43/`.
Le manifeste contient 5 610 fichiers avec SHA-256 et taille. Les quatre
instantanés sont :

| Dépôt | SHA-256 de l’archive |
| --- | --- |
| Dashboard Admin | `08b8228679cc5ba5da22ed581af43100f0bdeed81b911abfdd7792536f1f6f4d` |
| PokemonGo-API- | `a81ec5787d379e8824eacbf837eb61789f924355fdc8a8b9c9dd1195cdf4c27c` |
| PokemonGo-Assets-API | `9dc965c0a927e0a42fe29dee37dda7897ed21214ea08cd92d99fe7c3a6d91cbe` |
| PokemonGo-Data | `a630c116d2a73ee017a77066963608e26ae6fa3107a6bd9fa7a94e8fc566e7ce` |

La restauration reste non destructive : vérifier les hashes, extraire dans un
dossier temporaire, comparer les fichiers ciblés, créer une branche dédiée,
restaurer seulement les chemins approuvés, puis rejouer schémas, tests et builds.

## Lots et commits structurants

| Lot | Résultat | Commits principaux |
| --- | --- | --- |
| 0–4 | Archive, suppression de Vérification Pokémon, Candies, notifications et Identity Manager | `7fe5d70f`, `4758740`, `da93c08`, `947d0e9`, `112de5e` |
| 5 | Veille professionnelle | `fd01aed`, `9c82124` |
| 6 | Statuts chromatiques réconciliés | `dfd6a0f` |
| 7 | Détail Pokémon mobile unifié | `681f12d`, `d361c62` |
| 8 | Méga Pokémon GO avec fallback HOME | `97a4a9d8`, `7a5e81c`, `8337266` |
| 9 | PvP dédié, PvPoke mensuel et Engine | `9c29c190`, `6f3cfd17`, `50c638b0`, `a66f6854`, `ae0f9a02`, `ca789da2`, `ea6d6751`, `6de7caa`, `6411a45` |
| 10 | Assets séparés, manifestes, loaders et rollback | `f30d898e`, `e7639b34`, `76a09ee8`, `23e86f02`, `f4f55409`, `d20313e`, `de9029a`, `a39fbeac`, `80e2a7d3` |
| Correction | Catégories Pokémon séparées pour Assets et PvP | `84e6866c`, `3447d38c`, `e0ab215` |
| 11 | Rapport global du véritable Engine | `2464c14` |
| 12 | Contrats et documentation API | `7a371bbc` |
| 13 | Validation, versionnement et publication | `4e6ee3f2`, `a03f7c1b`, commit Dashboard de release |

## Migration Data

- 1 611 fiches Pokémon/formes et 1 611 Core catégorisés ;
- 1 611 fiches PvP et 1 611 références `pvpRef` ;
- 4 758 fichiers Assets : 1 611 Core, 1 089 HOME, 1 512 Shuffle,
  331 Variants et 215 Location Cards ;
- 3 147 références vers les familles secondaires ;
- 21 017 occurrences d’URL, 16 599 URL uniques ;
- 8 417 occurrences d’URL dans les fiches Pokémon avant et après correction ;
- zéro collision, zéro catégorie ambiguë, zéro mauvais dossier et zéro référence
  cassée.

La copie secondaire invalide `CORSOLA_SPRING_2026` rattachée à Corayon de Galar
a été supprimée. L’asset et ses deux URL restent présents dans la fiche Variants
de Corayon normal, conformément au Game Master. L’inventaire conserve 1 925
identités et passe à zéro diagnostic.

## PvP

Le snapshot PvPoke est lié au commit fournisseur
`5aa3fe6e99c270c3b0404e3135960ce943fa582a` et au hash
`3d97adfe0a7784c81475015f91d89f1053f2723e82448d2657b0fd1fec69ad55`.
Les 1 611 fiches sont classées par catégorie sans bloc PvP embarqué. Les absences
de classement restent explicites (`NOT_RANKED`, `MAPPING_MISSING`, `UNRELEASED`)
et aucune fiche `RANKED` n’est inventée.

## Engine final

Statut : `VALID_WITH_DIAGNOSTICS`.

- couverture : 1 611 Pokémon/formes, 488 attaques, 19 types, 8 météos,
  10 générations, 1 611 Core, 3 147 familles et 1 611 PvP ;
- `BROKEN_REFERENCE` : 0 ;
- `ORPHAN` : 0 ;
- `MIGRATION_INCOMPLETE` : 0 ;
- `ERROR` : 0 ;
- `LEGITIMATE_ABSENCE` : 3 297 ;
- `NOT_RANKED` : 2 671 ;
- `MAPPING_MISSING` : 394 ;
- stratégie d’index : `Map/Set indexes built once per audit` ;
- parcours complet mesuré à environ 4,1 s et 81 Mo de heap final sur la machine
  de validation.

## API et MongoDB

Le dry-run et la synchronisation réelle couvrent 1 611 Pokémon, 1 611 Core,
3 147 familles, 93 items, 25 textes Rocket, 344 attaques, 18 types, 7 météos,
10 régions et 10 générations. La famille secondaire Corsola invalide a été
retirée de MongoDB ; aucune autre famille ni aucun Core n’a été supprimé.

OpenAPI `1.21.0`, Redoc, Swagger, les includes Assets et `pvpRef` partagent le
même contrat. Les routes retirées restent absentes et les routes Admin restent
privées.

## Validations

- PokemonGo-Data : schémas 1 611/1 611/3 147 valides, 184/184 tests ;
- PokemonGo-API- : dry-run valide, synchronisation réelle valide, 159/159 tests,
  build Next.js 15 valide ;
- Dashboard : TypeScript valide, ESLint sans erreur, Design System 101/101,
  Engine et audits Assets/PvP valides, documentation valide ;
- Playwright : 242 scénarios, 11 largeurs de 320 à 1 920 px, Light et Dark ;
- aucune image visible cassée, aucun overflow, aucune erreur page, console ou
  réseau réelle ;
- `git diff --check` valide sur les trois dépôts.

Les cas fonctionnels couvrent Bulbizarre et Florizarre normaux, une forme
alternative, Méga-Florizarre, Méga-Dracaufeu X/Y, Dynamax et Gigamax, avec
résolution des identités, chemins, références, Assets, PvP, Dashboard et API.

## Avertissements et limites explicites

- Les 394 mappings PvPoke manquants et les classements absents sont des états
  fournisseur explicites, pas des erreurs de migration.
- Pokémon GO Hub peut répondre HTTP 403 sous protection Cloudflare ; le dernier
  snapshot valide est conservé et l’état reste surveillé.
- Next.js/Turbopack signale un avertissement de traçage NFT sur le repository
  Data dynamique du Dashboard. Le build termine, les fichiers requis sont inclus
  explicitement et les tests de production valident les routes concernées.
- ESLint conserve 74 avertissements historiques `no-img-element`/variables non
  utilisées, sans erreur et hors de la portée de cette migration.

## Déploiement

Les cibles canoniques sont :

- Dashboard : `https://dashboard-admin-pi-ebon.vercel.app` ;
- API : `https://pokemon-go-api.vercel.app`.

La promotion Vercel et les contrôles de production sont exécutés après le push
du commit de release afin que le code testé, le SHA Git et le déploiement restent
alignés.
