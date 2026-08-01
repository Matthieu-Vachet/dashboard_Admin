# Investigation — fiabilisation des audits Pokémon

Date de référence : 31 juillet 2026.

## Périmètre et politique

Cette investigation couvre les audits Disponibilité, Chromatiques, Costumes et Shadow, l’Identity Manager, la Veille, le retrait de « Ma collection » et l’invariant Bonbons XL. Les audits Margxt sont strictement en lecture seule : aucune observation externe ne modifie un JSON Pokémon.

## Pipeline avant correction

Les quatre pages passent par le même chemin :

`source-watch/sources.json` → `fetch` HTML sans cache → Cheerio → `tableSourceRows` ou `costumeSourceRows` → `candidateScore` → comparaison de `buildChecklist()` → cinq statuts → `PokemonReleaseAuditPanel`.

Fichiers principaux :

- `src/server/pokemon-go/apps/checklist/server/pokemon-release-audit.js` : récupération, parsing, rapprochement, comparaison et compteurs ;
- `src/server/pokemon-go/apps/checklist/server/engine.js` : catalogue local hydraté depuis PokemonGo-Data ;
- `src/server/pokemon-go/apps/checklist/server/source-watch.js` : registre et contrôle de disponibilité des sources ;
- `src/app/api/pokemon-admin/route.ts` : route privée `pokemon-release-audit` ;
- `src/components/admin/pokemon/pokemon-release-audit-panel.tsx` : filtres, compteurs et lignes ;
- `src/components/admin/pokemon/source-watch-panel.tsx` : Veille ;
- `PokemonGo-API-/src/services/pokemon-identity-service.js` : registre, aliases, diagnostics et historique Identity Manager ;
- collections MongoDB `pokemon_identities`, `pokemon_identity_diagnostics` et `pokemon_identity_history`.

Objets avant correction :

- parsing : `dexId`, `sourceName`, `sourceForm`, `sourceCostume`, `sourceInfo`, `expected` ;
- local : `dexId`, `localName`, `localForm`, `localCostume`, assets et flags `availability` ;
- sortie : fusion libre des deux objets, `status`, `diagnostics` et, parfois, `candidates`.

## Causes racines confirmées

1. Les cellules HTML sont lues avec `.text()` après suppression des images. Les séparateurs `<br>` disparaissent : `Meloetta<br>Forme Danse` devient `MeloettaForme Danse`, et la date se colle à l’événement.
2. Le parseur accepte toute ligne possédant un numéro et deux cellules. La ligne de navigation `0201 | Liste des Zarbi |` devient donc une identité Pokémon.
3. Le costume est déduit du nom du fichier image ; le titre français voisin n’est pas lu, car la recherche de titre part du `<table>` alors que son frère réel est le `<figure>` parent.
4. Le rapprochement donne un score à toutes les variantes partageant le dexId, y compris un score par défaut de `10`. Le meilleur score est automatiquement accepté ; une ambiguïté n’existe que si les deux premiers scores sont strictement égaux.
5. Les formes et costumes ne disposent d’aucun contrat canonique commun dans cet audit. `isFemale` est agrégé tardivement, tandis que les variantes métier sont déduites par texte.
6. Les statuts de résolution et de comparaison sont fusionnés. L’interface ne distingue pas erreur de parsing, identité ambiguë, identité non résolue et divergence métier.
7. Les compteurs `Lignes`, `À jour`, `Divergences`, `Externe` et `Local` reprennent directement ce mélange et ne documentent ni leur dénominateur ni la sémantique de la source.
8. La page Margxt « introuvables » est une liste négative. Son absence ne prouve pas qu’un Pokémon est disponible ; l’ancien écran ne rend pas cette limite assez explicite.
9. Le registre Identity Manager contient encore le provider actif `ma-collection`. `listProviders()` fusionne en plus automatiquement tout provider rencontré en MongoDB et le déclare `active`, même s’il n’est pas enregistré.
10. L’API accepte un provider libre pour les aliases et diagnostics. Une source supprimée ou inconnue peut donc réentrer dans le workflow actif.
11. Pour une espèce sans forme externe, toutes les fiches `pokemon-file` du même `dexId` étaient traitées comme des bases équivalentes. Bulbizarre normal et Bulbizarre Dynamax rendaient ainsi l’observation « Bulbizarre » non résolue alors qu’une unique fiche `BULBASAUR_NORMAL` existait.

## Compteurs de référence avant correction

| Audit | Entrées externes parsées | Lignes affichées | À jour | Divergences | Ambiguës | Externe uniquement | Local uniquement |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Disponible | 147 | 244 | 91 | 27 | 28 | 1 | 97 |
| Chromatiques | 1 421 | 1 816 | 1 344 | 9 | 68 | 0 | 395 |
| Costumes | 177 | 877 | 54 | 0 | 121 | 2 | 700 |
| Shadow | 473 | 480 | 360 | 113 | 0 | 0 | 7 |

Ces nombres ne constituent pas une vérité métier : les ambiguïtés proviennent en grande partie du score textuel, 20 tables Costumes sans numéro dans le nom de fichier sont ignorées, et les listes locales Costumes incluent des formes qui ne sont pas des costumes canoniques.

## Audit MongoDB avant migration

Les exemples ont été anonymisés par empreinte SHA-256 tronquée. Aucun identifiant utilisateur ni secret n’a été extrait.

Base `pokemon-go-api` :

- `pokemon_identities` : 1 920 documents, 70 identités contenant 74 aliases actifs `ma-collection` ;
- `pokemon_identity_diagnostics` : 600 documents, dont 343 liés à `ma-collection` et 191 encore ouverts ;
- `pokemon_identity_history` : 11 302 documents, dont 109 contenant une trace `ma-collection` ;
- aucune référence détectée dans `dataset_runs`, snapshots shiny ou mappings.

Base `matweb-dashboard-admin` :

- `trainer_pokemon_entries` : 9 671 documents, dont 4 833 portent `identityProvider: ma-collection` ;
- `trainer_pokemon_snapshots` : 2 documents, dont 1 porte cette référence ;
- `trainer_pokemon_owners` : 1 document ;
- `events_archive` : 61 documents, dont 1 historique embarque deux anciens aliases `ma-collection`.

État Identity Manager : 1 920 identités actives et synchronisées, aucun conflit d’alias, aucun orphelin, 497 identités sans alias Game Master, 345 diagnostics ouverts dont 305 à confiance nulle. Le plan de synchronisation canonique est stable : 0 création, 0 mise à jour, 0 orphelin.

## Veille avant correction

La taxonomie existe mais classe notamment `news` dans Technique et mélange disponibilité de la source, changement de signature, erreur technique et liens vers les audits. La page d’accueil n’expose pas directement les erreurs de parsing, ambiguïtés et divergences réelles.

## Bonbons XL avant correction

Les tests `test:xl-candy-audit` et `test:candy-assets` passent. Candies, Famille bonbon et PvP Rankings consomment `assets.candy.xlImage`. Aucune construction de `xl_candy/{familyId}.png` n’a été trouvée dans les composants. L’architecture est donc conservée ; seule la validation de cohérence complète reste à exécuter avec le sprint.

## Architecture cible décidée

Le nouveau pipeline séparera :

`HTML brut` → `lignes structurelles` → `observation Margxt normalisée` → `identité canonique dexId + form + costume` → `résolution déterministe` → `comparaisons champ par champ` → `statut de résolution` + `statut métier` → `compteurs définis` → `carte détaillée`.

Le catalogue canonique PokemonGo-Data reste l’autorité locale. Une observation sans qualificatif sélectionne uniquement une fiche `*_NORMAL` unique ; les transformations ne constituent pas un second candidat de base. Les aliases exacts administrés par l’Identity Manager et les mappings approuvés sont autorisés ; une suggestion textuelle ne valide jamais une identité et ne produit jamais une divergence. Les vrais cas ambigus peuvent être reliés manuellement à une fiche existante, après confirmation, par création d’un alias Identity Manager historisé et sans modification des JSON Pokémon.
