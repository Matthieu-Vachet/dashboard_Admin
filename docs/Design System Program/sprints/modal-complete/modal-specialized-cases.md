# Cas spécialisés Modal

Les composants ci-dessous ne sont pas de la dette par leur seule spécialisation. Leur anatomie, leurs données ou leur interaction ne sont pas exprimables par l’API canonique sans perte.

| Cas | Spécialisation légitime | Correction sûre appliquée | Risque restant |
|---|---|---|---|
| EventEditorModal | formulaire Events lourd, palette sombre, niveau 1200, body unique | rôle, titre relié, close nommé | focus/scroll local non harmonisés |
| Import Events | textarea JSON et palette Events | rôle, titre relié, close nommé | focus/scroll local non harmonisés |
| EventDetailModal | header illustré, contenu riche, actions, max-w-6xl | relier le titre visible, nommer close | pas de trap/retour/scroll lock |
| Éditeur Collections | sticky header/footer, choix métier, overlay non fermant | nom accessible et close nommé | pas de trap/retour/Escape |
| AdminVersionHistoryDialog | eyebrow, rayon 3xl, scroll et exit motion 180 ms | titre/description reliés, focus complet, Escape, lock, reduced motion | reste un wrapper spécialisé |
| Historiques Source/Data | surfaces historiques, overlay volontairement non fermant | titre et description reliés | pas de focus/Escape/lock |
| Game Master Detail | fullscreen mobile, tabs et JSON massif | aucune : rôle, nom, Escape et lock déjà présents | focus initial/trap/retour incomplets |
| DetailModal Pokémon | bottom sheet mobile, thème dynamique, navigation et tabs | relier le titre visible | focus/scroll non harmonisés, sans garantie canonique |
| Preview asset nested | doit dépasser DetailModal à 1120 | rôle/nom/close locaux | nested focus non coordonné |

## Autres patterns conservés

- Le drawer Dashboard et la navigation Admin Pokémon mobile sont des surfaces de navigation, pas des variantes de `Modal`.
- Les quatre `window.confirm` gardent un contrat synchrone natif lié à des mutations ou gardes métier.
- Aucune prop métier, taille Event/Pokémon, motion globale ou niveau de z-index ne rejoint la primitive.

## Convergence future

Une convergence supplémentaire ne doit être envisagée qu’à l’occasion d’une refonte explicite du composant métier concerné. Elle ne constitue pas un micro-sprint Modal restant : la famille canonique peut être terminée avec ces exceptions documentées.
