# Rapport de fiabilisation des audits Pokémon — 31 juillet 2026

## 1. Résumé

Les quatre audits Margxt reposent désormais sur un parsing structuré, l’inventaire canonique PokemonGo-Data, les alias actifs Identity Manager et des mappings approuvés. Les erreurs de parsing, ambiguïtés, non-résolutions et divergences sont séparées. L’audit reste strictement en lecture seule ; seule une action manuelle, confirmée par l’administrateur, peut enregistrer un alias dans Identity Manager.

## 2. Causes racines

- `.text()` supprimait les frontières `<br>` et collait noms, formes, dates et événements ;
- le costume était déduit principalement du nom de fichier au lieu du titre métier ;
- un score permissif validait le « meilleur » candidat du même `dexId` ;
- parsing, résolution et comparaison partageaient un statut unique ;
- les compteurs additionnaient des catégories qui n’avaient pas la même sémantique ;
- Identity Manager déclarait actif tout provider trouvé en base, même absent du registre ;
- le retrait du code de la collection personnelle n’avait pas été suivi de la migration MongoDB prévue.

## 3. Ancien pipeline

`HTML → textContent de cellules/blocs → nom concaténé → score textuel → meilleur candidat → cinq statuts → cartes Externe/Local`.

## 4. Nouveau pipeline

`HTML → cellules/figures ciblées → champs bruts → normalisation → alias exact / identité exacte / mapping approuvé → comparaison par champ → statuts indépendants → carte repliable et traçable`.

## 5. Structure de l’identité canonique

La clé est `dexId + form + costume`. Le contrat transporte `canonicalId`, `displayName`, `sourceName`, `genderVariants`, disponibilités, source, confiance et statut de normalisation. `isFemale` reste une propriété d’asset.

## 6. Règles de normalisation

Les sauts `<br>` sont conservés. Le nom, la forme, le costume, la date, l’événement et le commentaire sont des champs distincts. Les titres, légendes, sommaires et lignes « Liste des… » sont exclus. Toute structure incomplète devient `parse-error`.

## 7. Règles de matching

Ordre : alias Margxt actif exact, nom/forme/costume exact, mapping approuvé, espèce de base exacte sans variante. La similarité textuelle ne fournit que des candidats et ne valide aucune association. Lorsqu’un candidat possède déjà sa fiche JSON, l’administrateur peut choisir « Lier à cette fiche JSON » : après confirmation, le Dashboard enregistre un alias Margxt actif, manuel et historisé sur l’identité existante. Aucun JSON Pokémon n’est modifié.

## 8. Alias et mappings ajoutés

Mappings versionnés pour les chapeaux Team Valor/Mystic/Instinct, Pikachu Willow, Pikachu archéologue/excavateur, Mordudor 10e anniversaire, Forme Coffre et la correction des numéros source Regieleki/Regidrago. Chaque entrée contient cible, périmètre et justification.

## 9 à 14. Mesures avant/après

Les mesures nouvelles utilisent le catalogue MongoDB Margxt actif (90 identités) et les pages recalculées le 1er août 2026. Une espèce externe sans qualificatif sélectionne désormais son unique identité canonique `*_NORMAL` ; une transformation Dynamax, Méga ou Gigamax du même `dexId` ne rend plus artificiellement la fiche normale ambiguë.

| Page | Anciennes entrées externes | Nouvelles entrées valides | Parsing | Anciennes ambiguïtés | Nouvelles ambiguïtés | Anciennes divergences | Divergences réelles |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Disponible | 147 | 147 | 0 | 28 | 0 | 27 | 2 |
| Chromatiques | 1 421 | 1 413 | 7 | 68 | 14 | 9 | 5 |
| Costumes | 177 | 197 | 0 | 121 | 0 | 0 | 8 |
| Shadow | 473 | 473 | 0 | 0 | 0 | 113 | 91 |

La huitième ancienne ligne Shiny exclue du total est la navigation « Liste des Zarbi ». Les sept autres lignes sans date métier restent visibles comme erreurs de parsing. L’augmentation Costumes vient de la lecture des 197 figures, sans exiger un nom de fichier numérique.

| Page | Résolues | À jour | Uniquement externe | Uniquement locale | Non vérifiées | Non résolues |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Disponible | 66 | 63 | 1 | 78 | 22 | 81 |
| Chromatiques | 1 023 | 1 018 | 0 | 416 | 480 | 376 |
| Costumes | 95 | 87 | 0 | 84 | 136 | 102 |
| Shadow | 441 | 350 | 0 | 10 | 14 | 32 |

`not-verified` empêche de conclure « local uniquement » lorsqu’une observation externe du même `dexId` reste non résolue.

## 15. Définition des statuts

- `up-to-date` : identité résolue, toutes valeurs égales ;
- `divergence` : identité résolue, au moins une valeur métier différente ;
- `external-only` / `local-only` : identité connue sur un seul côté avec preuve suffisante ;
- `identity-ambiguous` : plusieurs cibles déterministes ;
- `identity-unresolved` : aucune cible fiable ;
- `parse-error` : structure externe inexploitable ;
- `source-unavailable` : récupération impossible ;
- `not-verified` : la source ne permet pas de conclure ;
- `ignored`, `false-positive`, `manual-match` : décisions Identity Manager explicites.

## 16. Définition des compteurs

Entrées externes analysées, identités résolues, à jour, divergences réelles, ambiguës, non résolues, erreurs de parsing, uniquement externes, uniquement locales, non vérifiées et source indisponible. Chaque compteur renvoie sa définition et filtre la liste lorsqu’il représente un statut.

## 17. Disponible

La liste source est négative. `false` est comparé à `availability.released`; l’absence de la liste n’est jamais une preuve automatique de sortie. Meloetta Forme Danse et Prismillon Motif Poké Ball sont structurés et résolus.

## 18. Chromatiques

`availability.shinyReleased` et `assets.shinyImage` sont deux comparaisons. Les dates absentes restent des erreurs de parsing. Les Zarbi, y compris `!` et `?`, les motifs, formes et costumes ne partagent plus une identité nominale vague.

## 19. Shadow

`availability.shadow` et `availability.shadowShinyReleased` sont indépendants. Les 113 anciens écarts incluaient des conclusions produites par le matching permissif ; après résolution déterministe des fiches normales, le total explicable est de 91 divergences réelles. Les 32 observations restantes ne sont pas forcées sur une forme.

## 20. Costumes

Les titres de figures donnent le nom et le costume ; les images donnent les preuves normal/shiny. Les 877 anciennes lignes mélangeaient 177 sources, 121 ambiguïtés et 700 variantes locales, y compris des variantes de sexe. Le nouvel audit contient 197 observations et agrège le sexe dans l’identité canonique.

## 21. Mobile et accessibilité

Les compteurs utilisent une grille deux colonnes, le résumé et les résultats sont repliables, les filtres restent visibles, les listes sont rendues par lots de 100 et `content-visibility` limite le coût des longues listes. Les contrôles disposent de noms accessibles, focus visible et zones tactiles suffisantes.

## 22 à 25. Audit et migration de la collection retirée

Avant : 70 identités/74 alias, 343 diagnostics, 109 historiques, 9 671 entrées, 2 snapshots, 1 owner et 1 événement concerné. La migration a sauvegardé 10 197 documents, nettoyé/archivé chaque ensemble puis vérifié zéro référence active. La restauration par `_id` est fournie.

## 26. Identity Manager

Le provider retiré a quitté le catalogue. Le registre est fermé : les sources inconnues ou supprimées échouent avec `IDENTITY_PROVIDER_NOT_REGISTERED`. Les providers réellement utilisés, y compris les variantes techniques LeekDuck/Snacknap/PokeMiners, sont explicitement enregistrés. Une valeur historique MongoDB n’est plus réinjectée comme source active.

Les cartes ambiguës ou non résolues exposant des candidats canoniques permettent maintenant de relier explicitement l’observation Margxt à une fiche existante. L’action résout le `canonicalId` côté serveur, crée l’alias via le service Identity Manager existant, journalise l’auteur et le motif, puis relance l’audit. Une annulation reste possible en dépréciant l’alias depuis Identity Manager.

## 27. Veille

Taxonomie : Disponibilité Pokémon, Combat, Événements, Assets, Fournisseurs et données, Technique. L’accueil sépare santé HTTP, parsing, ambiguïtés, non-résolutions et divergences, puis charge les quatre résumés en parallèle.

## 28. Bonbons XL

Le resolver livré reste inchangé. Les contrôles imposent `assets.candy.image` et `assets.candy.xlImage`, la même `familyId` entre formes et l’absence de construction manuelle `xl_candy` dans les composants.

## 29 et 30. Documentation et registres

Mis à jour/créés : README, TOME-INDEX, DOC-017, DOC-035, PAGE-059 à PAGE-063, PAGE-IDENTITY-001, PROVIDER-021, DATASET-029, ADR-016, RULE-049, COL-042, COL-043, le rapport d’investigation et la migration MongoDB. L’inventaire canonique matérialisé `mappings/pokemonLocalIdentityInventory.json` est régénéré et testé avant consommation par le build Dashboard.

## 31 à 42. Validation et livraison

### 31. TypeScript

`npm run typecheck` : PASS, aucune erreur.

### 32. ESLint

`npm run lint -- --max-warnings=100` : PASS, 0 erreur et 74 avertissements historiques (`no-img-element` et trois variables inutilisées déjà inventoriées).

### 33. Tests

- Dashboard : 39 tests Admin Pokémon, 24 variantes, 5 présentation, 12 audits Margxt, 11 événements, 7 GBL, 15 moteur PvP, 1 campagne de parité PvP (720 scénarios), 4 données PvP locales, 2 candy, 2 XL, 101 Design System et 8 State System ; toutes les suites passent ;
- API : 134/134 tests passent, y compris registre fermé, migration réversible et rejet du provider retiré ;
- Data : 1 605 JSON Pokémon et 1 605 bundles d’assets valides ; 7 tests candy, 18 générateurs courants, 21 datasets classés, 30 identités, 7 assets canoniques, 11 inventaires, 2 mappings Margxt, 25 attaquants et 5 défenseurs/costumes passent ;
- Documentation : 143 documents et 143 identifiants uniques, zéro avertissement.

### 34. Builds

Dashboard Next.js 16 et API Next.js 15 : PASS. Le dry-run API compte 1 605 Pokémon, 1 605 bundles d’assets et 340 attaques sans écriture.

### 35. Navigateur

Disponible, Chromatiques, Shadow, Costumes, Identity Manager, Veille, Candies, fiche Pokémon et PvP Rankings ont été testés en Light et Dark aux largeurs 320, 360, 375, 390, 430, 768, 1 024 et 1 440 px. Aucun overflow horizontal, sprite cassé, `[object Object]`, référence active retirée ou erreur console. Les filtres divergence/ambiguïté/parsing, la recherche, les détails et la fiche Bulbizarre ont été contrôlés. La nouvelle liaison manuelle montre les fiches `SPINDA_01` et `SPINDA_11`, ouvre une modale avec l’alias exact `Spinda Forme 1`, conserve le focus et tient dans 296 px à 320 px. Le bouton de confirmation n’a volontairement pas été exécuté : aucune association arbitraire n’a été créée pendant les tests.

### 36. Avertissements historiques inchangés

- avertissement Turbopack NFT sur la lecture dynamique bornée au dépôt Data ; build réussi ;
- 74 avertissements ESLint historiques, aucune nouvelle erreur ;
- les contrôles de dérive `generate:gamemaster-references:check` et `generate:gamemaster-mappings:check` reflètent un snapshot Game Master amont déjà différent et restent hors du périmètre de ce sprint ; les tests consommateurs passent.

### 37 à 40. Commits, branches, HEAD et push

- PokemonGo-Data : `1607607` — `feat(data): add canonical audit identity inventory` ;
- PokemonGo-API- : `f1e7ef34` — `fix(identity): retire removed collection provider` ;
- Dashboard Admin : commit de livraison sur `agent/pokemon-data-control-center`, HEAD et hash final consignés dans le compte rendu Codex ;
- les trois dépôts utilisent `agent/pokemon-data-control-center` et sont poussés sur `origin`. PokemonGo-Assets-API reste sur `main` sans commit de ce sprint.

### 41. Propreté

Dashboard Admin et PokemonGo-API- sont propres après livraison. PokemonGo-Data ne conserve que la suppression locale préexistante de `.DS_Store`, explicitement exclue du commit. La modification locale `.DS_Store` de PokemonGo-Assets-API est également préservée et non publiée.

### 42. Preuve de retrait de la source supprimée

Le dry-run final `migrate:retire-ma-collection` retourne zéro document à nettoyer dans `pokemon_identities`, `pokemon_identity_diagnostics`, `pokemon_identity_history`, `trainer_pokemon_entries`, `trainer_pokemon_snapshots`, `trainer_pokemon_owners` et `events_archive`. Une recherche dans le code produit Dashboard, API et Data retourne zéro référence active ; les seules mentions restantes sont les migrations/tests, les collections d’archive, le changelog, l’historique de versions et les inventaires Design System désormais marqués comme archives historiques.
