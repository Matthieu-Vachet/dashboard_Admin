# Contrat radius

## Hiérarchie durable

| Rôle | Utility | Valeur initiale | Propriétaires |
|---|---|---:|---|
| Contrôle | `rounded-control` | 8 px | Button, Input, Textarea, Select, fermeture Modal |
| Surface | `rounded-surface` | 8 px | Card, Panel générique, State System, surfaces partagées |
| Overlay | `rounded-overlay` | 8 px | Modal canonique |

Les trois rôles ont aujourd’hui la même valeur calculée. Les noms rendent la responsabilité explicite et permettent une évolution future sans rechercher des classes par apparence.

## Exceptions

- Badge et pills : `rounded-full`.
- Checkbox : rayon compact natif `rounded`.
- Avatars, cercles et formes décoratives : `rounded-full` ou forme locale.
- Modales Pokémon/Events et bottom sheets : rayons 1,5–2 rem conservés lorsque la géométrie mobile ou métier est intentionnelle.
- Recharts : `borderRadius` inline requis par l’API de la bibliothèque.

Aucun rayon arbitraire spécialisé n’est converti en rôle générique pour améliorer artificiellement la couverture.
