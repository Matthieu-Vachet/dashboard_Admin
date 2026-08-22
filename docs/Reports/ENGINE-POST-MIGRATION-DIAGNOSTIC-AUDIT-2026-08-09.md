# Audit des diagnostics Engine post-migration

## Clôture de stabilisation

Les tableaux ci-dessous expliquent des findings historiques observés avant correction ;
ils ne décrivent plus le contrat courant. Le run final couvre 1 617 Pokémon/formes,
1 617 Core, 3 030 familles secondaires et 1 617 fiches PvP. Son statut est
`VALID`, avec 0 erreur, 0 warning, zéro `MAPPING_MISSING`, zéro
`MOVE_MAPPING_MISSING`, zéro `BROKEN_REFERENCE`, zéro `ORPHAN` et zéro
`MIGRATION_INCOMPLETE`.

Le run du 22 août 2026 remplace ce compteur historique : 1 617 Pokémon/formes, 1 617
Core et 1 617 fiches/références PvP. Les 25 erreurs de la baseline du 21 août sont
résolues dans les données et manifests, sans retrait de règle : mauvais nom Chesnaught,
chemins/catégorie Greninja, six entrées de manifest et trois `pvpRef` absentes. Le
manifest est recalculé depuis le filesystem et les trois nouvelles Méga utilisent des
records status-only `UNRELEASED` conformes au schéma.

L’unique diagnostic PvP résiduel est l’information fournisseur
`SKIDDO`/`ROCK_SLIDE` (`SOURCE_MISMATCH`). Elle n’est pas actionnable dans une fiche et
n’apparaît plus dans « Fiches à contrôler ». Le runbook courant est
[`docs/POST-MIGRATION-STABILIZATION.md`](../POST-MIGRATION-STABILIZATION.md).

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
