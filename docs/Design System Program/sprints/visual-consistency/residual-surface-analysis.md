# Analyse des surfaces résiduelles

## Réévaluation

| Classe | Constat courant | Décision |
|---|---|---|
| A — Card canonique | 117 usages | conserver |
| B — wrapper métier composant Card | 4 wrappers historiques inclus dans les 117 usages | conserver |
| C — surface générique incompatible avec Card mais répétée | Panel Pokémon générique | conserver le wrapper, migrer radius/elevation |
| D — surface métier | Pokémon, Events, Kanban, données dynamiques, glows | conserver |
| E — layout/contrôle non-Card | 16 recettes `flat` exactes | conserver |
| F — ambigu | 0 | aucun |

## Pourquoi les 16 recettes flat restent locales

Elles regroupent des liens et boutons interactifs, sélecteurs segmentés, zones d’édition, labels, sous-surfaces inset et messages contextuels. Card ne porte ni interaction, ni padding, ni rôle de contrôle. Le Color System a rendu leur couleur sémantique, mais n’a pas rendu leur anatomie équivalente à Card.

## Primitive Surface

Aucune primitive `Surface` n’est créée. Le code ne démontre pas une anatomie générique stable distincte de Card et Panel ; un nouveau composant concurrencerait Card sans réduire une duplication structurelle prouvée.
