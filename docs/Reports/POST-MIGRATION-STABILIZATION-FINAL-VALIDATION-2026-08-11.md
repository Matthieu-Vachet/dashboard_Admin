---
id: REPORT-2026-08-11-POST-MIGRATION-STABILIZATION-FINAL
title: Rapport final — stabilisation post-migration Pokémon GO
version: 1.0.0
status: validé
last_update: 2026-08-11
author: MatWeb Innovation
affected_projects:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
---

# Rapport final — stabilisation post-migration Pokémon GO

## Résultat

La stabilisation est validée sans réorganisation générale de `PokemonGo-Data`.
Le Core séparé est l'unique autorité Assets, les données PvP sont résolues par
`pvpRef`, l'API reste un consommateur dérivé et le Dashboard utilise les mêmes
contrats canoniques. L'Engine de production est
`VALID_WITH_DIAGNOSTICS` avec zéro erreur, zéro warning et zéro correction à
faire. Ses 7 959 informations décrivent uniquement des absences métier
légitimes ou la divergence fournisseur Skiddo connue.

Versions validées :

- PokemonGo-Data `1.21.0` ;
- PokemonGo-API- `1.21.0` ;
- Dashboard Admin `V1.43.0`.

## Causes racines corrigées

1. Des contrôles historiques exigeaient encore le bloc `pokemon.pvp` et ses
   anciens chemins alors que la migration avait déplacé l'autorité dans les
   fiches `.pvp.json`. Ils ont été supprimés ou raccordés à `pvpRef`.
2. Les mappings PvPoke étaient évalués sans distinguer attaque réellement
   référencée, transformation technique, suffixe `_FAST`, alias vérifié,
   `RETURN`, `FRUSTRATION` et entrée fournisseur inutilisée.
3. L'audit movepool confondait movepool local incomplet, Elite, Legacy, Shadow,
   Purified et divergence avec le Game Master épinglé au snapshot PvPoke.
4. Les fiches Pokémon et le Core portaient deux copies concurrentes des images,
   portraits, bonbons, couleurs et références de familles ; les lecteurs
   pouvaient donc contourner la séparation.
5. Les générateurs n'utilisaient pas tous le même registre de sources et le
   même Identity Manager. Les identifiants de provenance LeekDuck sont
   désormais canonisés vers un fournisseur unique sans perdre leur domaine.
6. Le `403` Cloudflare de Pokémon GO Hub pouvait être présenté comme une panne
   de migration. Il devient `SOURCE_PROTECTED` avant toute écriture et préserve
   le dernier snapshot Best Defenders valide.
7. Les chemins Data et les traces Vercel de certains générateurs n'étaient plus
   alignés avec la séparation. La résolution locale, l'embarquement des
   Functions et les durées d'exécution ont été bornés puis testés.

## Compteurs Engine avant/après

| Diagnostic | Avant stabilisation | État final |
| --- | ---: | ---: |
| Findings qualité actionnables | 1 355 | 0 |
| `pvp_mapping_missing` Engine | 394 | 0 |
| `pvp_move_mapping_missing` Engine | 740 au départ, 666 encore visibles pendant le lot 7 | 0 |
| `pvp_moveset_outside_local_movepool` | 96 | 0 occurrence ouverte |
| Conflits release metadata | 3 | 0 warning ; 604 absences `UNRELEASED` informatives |
| Diagnostics type actionnables | 122 | 0 |
| `BROKEN_REFERENCE` | 0 | 0 |
| `ORPHAN` | 0 | 0 |
| `MIGRATION_INCOMPLETE` | 0 | 0 |
| Warnings de la page Contrôles | 667 | 0 |

Les nombres du rapport fournisseur restent volontairement distincts de
l'Engine. Le snapshot mensuel installé contient 1 736 identités fournisseur,
dont 1 720 mappées, et 347 attaques, dont 336 mappées. Les 16 identités et 11
attaques fournisseur restantes ne sont pas des références locales attendues ;
aucune n'alimente un warning de fiche. Le dry-run du commit PvPoke plus récent
`397d23dc1edd169f2b1c9117dd6800bca91b8efd` retrouve la même classification
sans écrire dans le dépôt.

L'audit des movesets couvre 140 occurrences : 20 `EXPECTED`, 119 `RESOLVED` et
une `SOURCE_MISMATCH`. Cette dernière est `SKIDDO`/`ROCK_SLIDE`, divergence du
Game Master fournisseur classée `Info`, jamais supprimée pour faire baisser un
compteur.

## Assets et références

- 1 611 fiches Pokémon/formes et 1 611 Core ;
- 3 147 références de familles secondaires ;
- manifeste de séparation : 4 758 fichiers, dont 1 089 HOME, 1 512 Shuffle,
  331 Variants et 215 Location Cards ;
- 4 833 copies historiques comparées pendant la migration ;
- zéro copie Assets encore embarquée dans les fiches Pokémon ;
- zéro conflit, collision, mauvais dossier, référence cassée ou orphelin ;
- Candies et Bonbons XL résolus par `familyId` et le Core ;
- Méga : priorité Pokémon GO, puis HOME, portrait documenté et placeholder.

Les empreintes finales sont :

- manifeste Assets :
  `dab7a3b474a3de69d16bd7e64feb7e750677d32049dd61a3094861fa574f4861` ;
- manifeste PvP :
  `c1501986d024217267e154776d94ec1a61b2f4917f9feea46eaff598677abdfb` ;
- rapport final de séparation :
  `ea65c210199d390bca844fa276a952b66851fd17ec78d1ae66eae4e60573279f`.

## Sources et régénérations

Le registre canonique couvre PvPoke, Battleflow, Pokémon GO Hub et les domaines
LeekDuck. Les dry-runs du 11 août 2026 ont validé :

| Dataset | Résultat de validation |
| --- | --- |
| Raids | 19 entrées lues, 19 parsées, 14 reliées, 5 formes explicites non associées, 0 warning |
| Max Battles | 44 lues, 44 parsées et reliées, 0 warning |
| Rocket | 26 profils, 214 slots, 202 reliés, 12 formes explicites non associées, 0 warning |
| Eggs | 76 entrées, 65 reliées, 11 formes explicites non associées, 0 warning |
| Research | 62 tâches, 210 récompenses Pokémon, 114 objets, 0 warning |
| Calendar GBL | 14 périodes valides, 14 reliées, 32 compétitions, 0 warning |
| PvPoke mensuel | workspace valide, écritures atomiques désactivées, nouveau commit détecté |
| Best Defenders | `SOURCE_PROTECTED`, HTTP 403 Cloudflare, aucune écriture |

La production conserve et affiche : Rocket 26/214, Eggs 76, Research 59 tâches
avec 204 récompenses Pokémon et 114 objets, ainsi que le calendrier Battleflow.
Le décalage Research entre snapshot et dry-run est une évolution observable de
la source, pas une perte. La régénération PvP partielle reste un succès métier
avec un warning documenté pour Volcarona sans Rank 1 légal ; elle n'est jamais
présentée comme un succès silencieux. Le snapshot Best Defenders conserve ses
250 entrées et affiche explicitement que le 403 n'a remplacé aucune donnée.

## Identity Manager

La production contient 1 927 identités, 1 925 actives, 13 fournisseurs et zéro
conflit. Corsola normal, Corsola de Galar et les costumes associés restent des
identités déterministes séparées. La recherche production confirme notamment :

- `CORSOLA_NORMAL` → `pokemon/0222-corsola.json` ;
- `CORSOLA_GALARIAN` →
  `pokemon-forms/galar/0222-corsola-galarian.json` ;
- aucun état `conflict` ni relink destructif.

## Validation fonctionnelle explicite

- Rocket, Eggs, Research et Calendar chargent leur document `current` depuis
  MongoDB et affichent `SUCCESS` dans le Dashboard de production.
- Le Dashboard charge le Core léger par `assetsRef`, puis les quatre familles à
  la demande ; 1 611 patches de détail sont couverts par les tests.
- Candies, Bonbons XL, Méga X/Y, HOME fallback et fallback portrait restent
  fonctionnels.
- L'API hydrate `pvpRef`, exclut les payloads fournisseur internes et conserve
  les routes Admin privées.
- L'Engine refuse l'ancien contrat PvP embarqué, classe correctement les
  mappings et ne demande aucune correction sur les 1 611 fiches.
- Les manifestes Assets/PvP couvrent tous les fichiers installés avec SHA-256.
- Les archives sont conservées : 36 fichiers, environ 91 Mio, répartis entre
  l'archive globale, l'état cassé post-migration, l'ancien PvP et les anciens
  Assets monolithiques.

## Tests et builds finaux

| Contrôle | Résultat |
| --- | --- |
| Parsing JSON | 17 225 fichiers valides, 0 erreur |
| Schémas Data | 1 611 Pokémon, 1 611 Core, 3 147 familles valides |
| Assets source unique | valide, 0 duplication, 0 conflit |
| PvP dédié et manifestes | 1 611/1 611, 0 changement attendu |
| Tests PokemonGo-Data | 207/207 |
| Tests PokemonGo-API- | 169/169 |
| Sync API dry-run | valide, mêmes compteurs canoniques |
| Build API | Next.js 15, succès |
| Tests Dashboard | 292/292 |
| Zod | contrats Identity API, Learning, Discord et routes PvP validés |
| TypeScript | `tsc --noEmit`, succès |
| ESLint | 0 erreur, 74 warnings historiques connus |
| Build Dashboard | Next.js 16, succès |
| Playwright responsive | 242/242, 11 largeurs de 320 à 1 920 px, Light/Dark |
| Navigateur production | 0 overflow et 0 log warning/error |
| `git diff --check` canonique | valide dans les trois dépôts |

Le build Dashboard conserve un warning Turbopack NFT connu sur le tracing
dynamique du dépôt Data. Le build, les tests d'embarquement et les Functions de
production réussissent ; ce warning ne masque aucune donnée manquante.

## Commits et pushes

Tous les commits sont sur `main` et chaque HEAD publié égale `origin/main`.
Les principaux commits de cette mission sont :

| Domaine | PokemonGo-Data | PokemonGo-API- | Dashboard Admin |
| --- | --- | --- | --- |
| Baseline/release | `ea792f0e`, `4e6ee3f2` | `a03f7c1b` | `909da78` |
| Sources/PvP partiel | `47c34456`, `8347eaf7`, `9977fcdb`, `56d8cc8b`, `bdf5649b` | `753d00ee`, `d02f5156`, `a18e67f4`, `f62dac49`, `7e1d26b2` | `2ff7878`, `aa9dd5c`, `c0484ba` |
| Best Defenders | `60436176` | `50cfeec7` | `9d180df`, `113661d` |
| Engine/PvP | `ea7b2878`, `a03c43cc`, `1a91dfe7`, `90f9fba7` | `4ef56aa8`, `64eabfc9`, `5aa04c94` | `a18cade`, `433d004`, `2450fb8` |
| Source unique et warnings PvP | `b16cd6b8`, `6ab87e59` | `fa7db71f`, `9e80d6e7` | `5e12731`, `dc70162`, `469375d` |
| Régénérations | — | — | `ad24442` |
| Documentation | `63dff7f9` | `ff595a7a` | `6137e21` |

Le commit qui ajoute ce rapport est le HEAD Dashboard de la livraison finale ;
son SHA est relevé après création du commit afin de ne pas inscrire une valeur
circulaire dans son propre contenu.

## Vercel et production

Avant le rapport final, les déploiements liés aux commits documentaires étaient
`READY` :

- API `ff595a7a` :
  `pokemon-go-9xmx9kyqu-matthieu-vachets-projects.vercel.app`, alias
  `pokemon-go-api.vercel.app` ;
- Dashboard `6137e21` :
  `dashboard-admin-ffkfqrj0d-matthieu-vachets-projects.vercel.app`, alias
  `dashboard-admin-pi-ebon.vercel.app`.

Le commit de ce rapport est déployé et inspecté séparément après son push. Le
contrôle post-déploiement vérifie le statut `READY`, l'alias production, la page
de documentation, le centre Pokémon, les thèmes, le responsive et la console.

## Working trees et rollback

PokemonGo-API- et Dashboard Admin sont propres après validation. Dans
PokemonGo-Data, le fichier local
`pokemon-assets/core/normal/0001-bulbasaur.assets.json` reste volontairement
non suivi par cette mission : sa ligne vide appartient au travail utilisateur,
n'est ni staged, ni commitée, ni modifiée. Tous les contrôles canoniques Data ont
été rejoués dans un clone propre du HEAD publié.

Le rollback reste un nouveau commit ciblé et audité. Il ne doit jamais
réintroduire simultanément l'ancien bloc PvP embarqué et les fiches dédiées, ni
restaurer les copies Assets dans les fiches Pokémon. Après toute restauration,
rejouer schémas, manifestes, Assets source unique, PvP hors ligne, Engine,
Identity Manager, sync API, builds et tests navigateur.

La réorganisation complète de l'arborescence `PokemonGo-Data` est explicitement
hors de cette mission et doit rester une opération future distincte.
