# Exceptions Responsive System

## Seuils spécialisés conservés

Les 14 usages arbitraires restants sont finis et liés à une composition métier existante :

| Seuil | Usages | Justification |
|---|---:|---|
| `min-[420px]` | 1 | ligne compacte du coffre Snippet |
| `min-[430px]` | 2 | navigation/détail Admin Pokémon à forte densité |
| `min-[480px]` | 1 | petite grille du studio Admin |
| `max-[520px]` | 9 | composition étroite des cartes Pokémon |
| `min-[521px]` | 1 | complément exclusif de la composition Pokémon |

Ils ne servent pas de breakpoint générique et ne sont pas promus en token. Toute extension doit être justifiée par le même composant ou remplacée par un palier Tailwind canonique.

## Compositions conservées

- cartes mobiles et tableau desktop de la collection Trainer ;
- agenda Events mobile et calendrier dense à partir de `sm` ;
- modales métier Events/Pokémon dont l’anatomie ou le z-index ne sont pas équivalents à la primitive commune ;
- overflow local des tableaux, JSON, code et listes denses.

## Dette restante

- pas d’automatisation iOS Safari ou Android Chrome réelle ;
- pas de campagne zoom 200 %/400 %, paysage mobile ou clavier virtuel ;
- pas de parcours tactile matériel ;
- pas de budget Core Web Vitals ou bundle associé au responsive ;
- les seuils métier restent à réexaminer si leurs composants changent d’anatomie.

Cette dette n’empêche pas la conformité du contrat actuel aux trois viewports de référence.
