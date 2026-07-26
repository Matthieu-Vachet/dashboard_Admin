# Contrat spacing

## Décision

Le contrat réutilise l’échelle Tailwind existante. Le code démontre surtout les valeurs 4, 8, 12, 16, 20 et 24 px ; créer une seconde nomenclature sémantique globale ne réduirait pas la dette et multiplierait les aliases.

Les rôles restent portés par les composants : Button définit son gap et ses paddings par taille, les contrôles utilisent 12 px horizontal, Modal utilise 16 px puis 20 px à partir de `sm`, Card reste volontairement neutre en padding, et les layouts gardent leurs variations responsive.

## Règles

- Une valeur de l’échelle Tailwind est canonique lorsqu’elle correspond au rôle local démontré.
- Une valeur arbitraire générique est interdite si l’échelle fournit l’équivalent.
- Les offsets de shell, safe areas, dimensions calculées et géométries décoratives peuvent rester arbitraires avec justification.
- Aucune variation responsive n’est supprimée pour homogénéiser artificiellement deux layouts différents.

## Migration sûre

`gap-[normal]` est la seule valeur arbitraire générique certaine. Elle doit devenir `gap-2`, soit le gap de contrôle de 8 px déjà utilisé par les primitives et les contrôles voisins.
