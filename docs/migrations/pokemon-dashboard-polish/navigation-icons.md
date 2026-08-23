# Registre des icônes de navigation Pokémon

Le Dashboard utilise `pokemonNavigationIcons` dans `src/data/dashboard.ts` comme registre local partagé. Le même objet alimente la sidebar desktop, son état réduit et le drawer mobile.

| Entrée | Asset public |
| --- | --- |
| Collections | `/assets/ui/icons/general/pokeball.webp` |
| Assets | `/assets/ui/icons/general/ic_evolvable.png` |
| Catalogues | `/assets/ui/icons/general/pokedex-galar.webp` |
| Docs JSON | `/assets/ui/icons/general/search.png` |
| PvP Rankings | `/assets/ui/icons/general/ic_battle.png` |
| Simulateur PvP | `/assets/ui/icons/general/TodayView_Icon_Battle.webp` |
| Calendrier GBL | `/assets/ui/icons/general/ic_date.png` |
| Best Attackers | `/assets/ui/icons/general/ic_Legendary_small.png` |
| Best Defenders | `/assets/ui/icons/general/ic_route_medal_outline.png` |
| Community Days | `/assets/ui/icons/general/ic_event.png` |
| Historique Events | `/assets/ui/icons/general/ep_point_icon.png` |

Les images sont décoratives (`alt=""`) car le libellé du lien porte le nom accessible. En mode sidebar réduite, `aria-label` conserve ce nom quand le texte visuel est masqué.

Les sept PNG fournis localement ont été contrôlés par extension, casse et empreinte SHA-256. Aucun doublon de contenu n'a été trouvé dans `public/`.
