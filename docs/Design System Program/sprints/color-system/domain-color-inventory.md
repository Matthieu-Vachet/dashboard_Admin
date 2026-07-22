# Inventaire des couleurs métier

Le scan final classe 1 593 occurrences comme métier, 151 comme décoratives et 214 comme ambiguës. Elles sont volontairement exclues du dénominateur de couverture UI générique.

## Sources de vérité métier

| Domaine | Sources observées | Couleurs concernées | Décision |
|---|---|---|---|
| Palettes Dashboard | `src/data/dashboard-palettes.ts`, hook de palette | huit jeux dark/light, accents primaire/secondaire/tertiaire, glow/border/bg | conserver : mécanisme central runtime |
| Types Pokémon | composants sous `src/components/admin/pokemon/` et styles dynamiques | type, rareté, shiny, candy, stats, forme | conserver dans le domaine |
| Raids, œufs et combats | panneaux Raid/Egg/PvP/Rocket | tiers, météo, équipe, efficacité, ligue | conserver dans le domaine |
| Datasets et sources | diagnostics, Source Watch, Game Master, API explorer | état de source, diff, collection, data quality | utiliser les statuts génériques seulement pour success/warning/danger certains ; conserver les données distinctives |
| Events | `src/components/admin/events/` | calendrier, catégorie, statut d'événement, gradients de panneau | conserver ; chrome générique migré séparément |
| Charts | Analytics, Learning, Pokémon Analytics | séries, catégories, aires et gradients de données | les axes/grilles/tooltips sont tokenisés ; les séries restent domaine ou `brand-*` lorsqu'elles sont réellement génériques |
| Illustrations et identité | arrière-plans, scanlines, glows, sprites, équipe | gradients, halos, ombres colorées, assets | conserver comme décoratif |

## Séparation appliquée

Dans un composant métier :

- la surface, la bordure, le texte standard, le contrôle et le focus utilisent le Color System ;
- le type Pokémon, la rareté, le tier, la donnée de série ou l'illustration conserve sa couleur métier ;
- `domain-foreground` adapte le contraste dark/light sans faire croire qu'un blanc Pokémon est un rôle UI générique ;
- `success`, `warning` et `danger` sont utilisés seulement lorsque la signification est un statut universel, pas une catégorie colorée.

## Centralisations sûres effectuées

- Les tooltips, axes et grilles génériques des charts utilisent `panel`, `line`, `foreground` et `muted`.
- Les séries réellement génériques des analytics utilisent `brand`, `brand-2`, `brand-3`, `warning` ou `danger`.
- Le bandeau de diagnostic courant emploie les statuts génériques et du texte adaptatif Light/Dark.
- Les accents Dashboard continuent de passer par les huit palettes existantes ; aucune valeur de palette n'a été changée.

## Gradients et glows conservés

Les gradients de page, scanlines, halos Pokémon, backgrounds de types, illustrations Events et glows de données restent spécialisés. Leur répétition lexicale ne suffit pas à leur donner une sémantique UI. Les shadows colorées sont considérées comme décoration ou identité ; aucune refonte globale Shadow n'est lancée.

## Ambigus et suites

Les 214 occurrences ambiguës comprennent des couleurs chromatiques hors chemin explicitement métier, des templates dynamiques et quelques littéraux construits. Elles ne sont ni absorbées par le Color System ni déclarées dette UI certaine. Leur propriétaire doit être établi lors du sprint de la famille correspondante.

Aucune couleur de type, raid, œuf, shiny, météo, équipe, stat, rareté ou événement n'a été remplacée par un token UI générique. Aucun nouveau registre métier n'a été créé : les sources existantes ont été préservées pour éviter une refonte de domaine dissimulée.
