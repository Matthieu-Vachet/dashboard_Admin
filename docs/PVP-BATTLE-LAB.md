# Pokémon GO PvP Battle Lab

## Périmètre livré

Le Battle Lab est une fonctionnalité privée de `Dashboard Admin > Combat > Simulateur PvP`. Il couvre les modes Single, Multi, Matrix, IV Rank et Shield Matrix. Le navigateur ne calcule aucune règle métier : il configure, affiche et rejoue les résultats produits par le BFF authentifié `/api/admin/pvp-simulator`.

Le moteur est natif au Dashboard et versionné indépendamment :

- moteur `1.1.0` ;
- règles `2026.07.2` ;
- données issues exclusivement du snapshot local `PokemonGo-Data` ;
- historique privé stocké par utilisateur dans le Dashboard Store MongoDB, clé `matweb.pvp.simulations`, 80 entrées maximum ;
- aucune dépendance runtime à PvPoke et aucun scraping au moment d’une simulation.

## Architecture et flux de données

```text
Admin Pokémon / Simulateur PvP
  -> BFF privé /api/admin/pvp-simulator
    -> server-data.ts
      -> .data/PokemonGo-Data (Pokémon, formes, moves, types, calendrier GBL)
    -> pokemon-go-pvp-engine
      -> validation -> statistiques -> moteur de tours -> résultat/timeline
    -> Dashboard Store MongoDB (historique explicite uniquement)
```

Les identités utilisent le `canonicalId` de l’Identity Manager. L’interface réemploie `PokemonArtwork` et les icônes de types existantes ; elle n’introduit pas de seconde autorité d’assets.

`PokemonGo-API` fournit les coéquipiers suggérés avec leur identité et leur asset canonique complets. `PokemonGo-Data` fournit le contrat de combat (`stats`, `quickMoves`, `cinematicMoves`, `combat.*`, types, formes, disponibilités Shadow, classes et calendrier GBL) ainsi que les Rank 1 générés. Les trois dépôts restent des autorités distinctes et le Dashboard ne fabrique aucune URL d’asset.

## Expérience V2, Checklist et deep-links

Le mode Single démarre avec deux emplacements vides. Un deep-link explicite peut hydrater un seul combattant (le second reste vide) ou les deux. Chaque build entrant est validé contre la ligue, le `canonicalId`, les moves, les IV, le niveau, les boucliers, l’énergie, les HP, les stages et la disponibilité Shadow avant d’être affiché, puis de nouveau par Zod côté serveur à la simulation.

La vue Rankings est l’onglet par défaut. **Ma Checklist** est un onglet séparé et persiste sous `matweb.pokemon.pvpChecklist`, schéma v2 : contexte de ligue, dictionnaire de builds, identité canonique, IV Attaque/Défense/HP, niveau, PC, rang, moves et provenance. Plusieurs builds d’une même espèce sont autorisés. La migration du schéma v1 transforme progressivement les booléens résolus en builds Rank 1 et conserve les clés non résolues dans `legacyV1` ; elle est idempotente et non destructive.

Les liens **Simuler · Rank 1** préchargent le build publié dans Rankings. Les liens **Simuler** de la Checklist portent le badge **Mes IV** et conservent exactement le build édité. Le sélecteur ne rend jamais les quelque 1 449 formes simultanément : il recherche puis limite à 12 résultats, propose une listbox opaque au clavier sur desktop et une feuille modale sur mobile.

L’UI réutilise le registre `uiAssets`, les icônes de types et `PokemonArtwork` : fond Battle League, combat, attaque, bouclier, Shadow, Fast/Charged Move, buff et résultat. Les images restent en `object-contain`/`object-cover` selon leur fonction et ne sont ni copiées ni étirées.

## Règles implémentées

- CPM aux demi-niveaux 1 à 55, calcul des PC et arrondis des PV Pokémon GO.
- Recherche exhaustive des 4 096 spreads IV et des demi-niveaux autorisés, tri par stat product puis attaque, défense, PV et IV.
- Dégâts : puissance, STAB, ratio attaque/défense, stages, multiplicateurs Shadow et efficacité issue du catalogue de types local.
- Immunités principales adaptées aux multiplicateurs Pokémon GO, double types, plancher et arrondi canonique.
- Fast moves multi-tours, génération/plafond d’énergie, charged moves, boucliers, CMP, buffs/debuffs et caps de stages `-4..+4`.
- CMP calculée sur l’Attaque réelle après CPM, stage d’Attaque et multiplicateur Shadow ; égalité exacte départagée par `canonicalId` pour préserver le déterminisme.
- Bait sélectif documenté dans chaque événement Charged : écart de coût, bouclier attendu, opportunité de K.O. préservée et énergie permettant d’atteindre ensuite le nuke.
- Timing déterministe sans overtap : un charged move ne part qu’une fois le fast move engagé terminé. L’option `optimizeTiming` est conservée dans le contrat et les exports ; l’heuristique contextuelle avancée de PvPoke (alignement exact sur la fenêtre adverse) reste une limite connue.
- Buffs probabilistes rendus déterministes par compteur cumulatif ; modes forcé et désactivé disponibles.
- Premier charged non protégé de Mimiqui absorbé par Déguisement, puis Défense `-1`. Cette mécanique est décrite dans le registre central `form-mechanics.ts`, jamais dans une condition spécifique au moteur.
- Formats dynamiques dérivés du calendrier GBL : limite de PC, types autorisés/interdits, Mega et exclusion Mythique/Légendaire sont validés côté serveur.
- Arrêt à 240 secondes de tours actifs, résultats de timeout signalés dans les diagnostics.

Une CMP parfaitement égale est départagée de façon stable par `canonicalId`. Pokémon GO utilise un tirage aléatoire ; ce choix est volontaire afin que deux entrées identiques produisent strictement le même résultat.

## Parité PvPoke

Le corpus `scripts/fixtures/pvpoke-parity-2026-07-28.json` contient 20 combats capturés le 28 juillet 2026 sur PvPoke, dépôt officiel au commit `5e1e3d971369a47aaf3e7247f50710d80205d570`. Il couvre 0, 1 et 2 boucliers, Shadow, Déguisement, buffs/debuffs et des fast moves de durées différentes. La suite étendue rejoue en plus 720 scénarios déterministes combinant quatre plafonds de ligue, les neuf paires de boucliers et les trois modes de bait. Ces 720 scénarios sont des contrôles d’invariants, tandis que les 20 fixtures restent les comparaisons chiffrées capturées dans PvPoke.

Résultat automatisé sur le snapshot de livraison :

- vainqueur : **19/20 identiques** ;
- premier dégât de fast move : **40/40 exacts** ;
- premier dégât de charged move comparable : **36/39 exacts** ;
- cas totalement alignés sur vainqueur, rating, PV et énergie finaux : 8/20.

Le seul vainqueur différent est Swampert contre Skarmory en scénario `0-1`. PvPoke optimise le choix et le bait de charged moves avec une heuristique contextuelle plus avancée ; le moteur local choisit ici un autre premier charged. Les trois écarts de charged damage ont la même origine, pas une différence de formule de dégâts.

Les durées affichées par PvPoke ajoutent dix secondes de mini-jeu à chaque charged move. `durationMs` et la timeline du moteur local représentent les tours actifs de 500 ms ; ils ne prétendent donc pas reproduire la durée d’animation PvPoke. Le corpus conserve les deux valeurs pour rendre cet écart explicite.

Au moment de l’audit, le simulateur public PvPoke produisait aussi une énergie `NaN` après le changement de forme de Mimiqui dans le scénario de référence. Le Battle Lab conserve une énergie valide et applique la mécanique via son registre central. Ce point peut faire diverger la fin d’un combat Mimiqui même lorsque les dégâts initiaux sont identiques.

## Performance et limites de batch

Mesure locale de livraison, après chargement du catalogue PvP de 1 449 formes éligibles (les duplications Dynamax/Gigamax sont exclues) :

- préparation de 40 builds : 69 ms ;
- Multi de 39 adversaires : 12 ms ;
- Matrix 20×20, soit 400 combats : 138 ms.

Le catalogue est mémorisé dans le processus serveur. Multi accepte jusqu’à 100 adversaires et Matrix jusqu’à 20×20. L’interface affiche le nombre de simulations attendues et permet d’annuler la requête batch côté client. Une requête JSON est limitée à 2 Mo, les lectures à 180/minute et les écritures à 120/minute par limiteur existant.

## Sécurité et persistance

- session Dashboard requise sur GET, POST et DELETE ;
- contrôle same-origin pour les mutations ;
- validation Zod stricte des IV, niveaux, stages, énergie, PV, boucliers et moves ;
- vérification serveur de l’appartenance des moves à la forme et de l’éligibilité au format ;
- réponses privées `no-store` ;
- données MongoDB séparées par adresse de session ;
- pas de secret, token ou configuration MongoDB envoyé au client.

## Utilisation

1. Ouvrir **Admin Pokémon > Combat > Simulateur PvP**.
2. Choisir la ligue ou cup, les deux Pokémon, leurs IV/niveaux, leurs moves, boucliers et états initiaux.
3. Utiliser **Rank 1** pour le meilleur stat product sous le cap ou **15/15/15** pour un spread parfait valide.
4. Lancer Single, puis sélectionner une case de Shield Matrix pour charger sa timeline.
5. Rejouer à `1×`, `2×`, `4×` ou `8×`, ouvrir le détail diagnostique, exporter le JSON ou copier le lien interne.
6. Utiliser Multi pour un Pokémon contre 10 à 100 adversaires, ou Matrix pour deux groupes de 20 maximum.
7. Sauvegarder explicitement une simulation pour la retrouver dans Historique. Sans MongoDB configuré, le calcul et l’export restent disponibles mais l’historique renvoie une erreur explicite.

## Maintenance

- `npm run test:pvp-engine` vérifie les constantes, Rank 1, dégâts, stages, déterminisme, Shield Matrix, buffs et formes.
- `npm run test:pvp-parity` compare les 20 fixtures officielles et exécute la campagne d’invariants de 720 scénarios.
- `node scripts/capture-pvpoke-parity.mjs` recapture manuellement les références publiques ; cette commande nécessite un accès réseau et Playwright.
- Toute nouvelle mécanique de forme doit être ajoutée au registre central et accompagnée d’un test ciblé.
- Une modification de `combat.*`, des types ou du calendrier GBL dans `PokemonGo-Data` est reprise au prochain `prebuild` et apparaît dans `versions.data`.
