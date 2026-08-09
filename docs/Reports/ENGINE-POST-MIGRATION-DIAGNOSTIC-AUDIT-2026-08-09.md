# Audit des diagnostics Engine post-migration

## 122 findings `type`

Le code `type` désignait le type JavaScript attendu par l’ancien validateur PvP
embarqué ; il ne concernait pas les types élémentaires Pokémon. Les 122 occurrences
se répartissaient exactement ainsi :

| Chemin historique | Règle | Expected | Actual | Occurrences |
| --- | --- | --- | --- | ---: |
| `pvp.greatLeague.tierRank` | ancien champ embarqué requis | `string` | `null` | 25 |
| `pvp.greatLeague.rank1` | ancien champ embarqué requis | `object` | `null` | 25 |
| `pvp.ultraLeague.tierRank` | ancien champ embarqué requis | `string` | `null` | 19 |
| `pvp.ultraLeague.rank1` | ancien champ embarqué requis | `object` | `null` | 19 |
| `pvp.littleCup.tierRank` | ancien champ embarqué requis | `string` | `null` | 1 |
| `pvp.littleCup.rank1` | ancien champ embarqué requis | `object` | `null` | 1 |
| `pvp.masterLeague.tierRank` | ancien champ embarqué requis | `string` | `null` | 16 |
| `pvp.masterLeague.rank1` | ancien champ embarqué requis | `object` | `null` | 16 |

Ces chemins ont été retirés de la source canonique lors de la migration. Leur
autorité est désormais la fiche résolue par `pvpRef`, sous
`pvp/pokemon/<catégorie>/*.pvp.json`. La correction porte donc sur la règle :
l’Engine ne valide plus des copies embarquées contradictoires et conserve les
preuves historiques dans les fiches dédiées. Le compteur `type` courant vaut zéro.

## Trois conflits `release_metadata_conflict`

La règle exacte est : si `availability.shinyReleased !== true`, les champs
`shinyAvailability.releaseDate`, `event`, `source` et `matchedName` doivent être
vides. `expected` valait « shinyReleased à true ou métadonnées vides » et `actual`
valait « false avec métadonnées de sortie ».

| Identité | Chemin | Cause | Correction canonique |
| --- | --- | --- | --- |
| `DARMANITAN_GALARIAN_ZEN` | `shinyAvailability` | métadonnées de Darumacho normal copiées sur une forme non publiée | quatre champs remis à `null` |
| `DARMANITAN_ZEN` | `shinyAvailability` | métadonnées de Darumacho normal copiées sur une forme non publiée | quatre champs remis à `null` |
| `VIVILLON_POKEBALL` | `shinyAvailability` | chaînes littérales `"null"` interprétées comme des métadonnées | valeurs JSON `null` restaurées |

Les drapeaux canoniques restent `false` : ni la présence d’un asset shiny, ni les
métadonnées d’une forme voisine ne prouvent une sortie. Le compteur
`release_metadata_conflict` courant vaut zéro.
