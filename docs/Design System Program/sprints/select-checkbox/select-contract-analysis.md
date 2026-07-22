# Analyse du contrat Select

## Contrat approuvé

`Select` est un `<select>` natif stylé. Son API est exactement `SelectHTMLAttributes<HTMLSelectElement>`, `className` inclus, avec `forwardRef<HTMLSelectElement>`. Les enfants restent des `option`/`optgroup` natifs.

Le contrat porte : hauteur tactile minimale, largeur par défaut, surface/texte/bordure Color System, focus visible, disabled et invalid via attributs natifs/ARIA. `value`, `defaultValue`, `onChange`, `name`, `required`, `multiple`, `size` et tous les attributs HTML sont transmis sans traduction.

## Composition

- `Field` peut englober Select lorsque le libellé visible et la structure label correspondent.
- Les wrappers `SelectField`, `FilterSelect` et `FormatSelect` restent métier et composent Select.
- Les filtres sans label visible reçoivent seulement un nom accessible dérivé du texte déjà présent.
- Les classes métier continuent de passer par `className` et priment via `cn`/`tailwind-merge`.

## Exclusions

- aucune API d'options objet ;
- aucune recherche, async, virtualisation ou combobox ;
- aucune icône/flèche custom qui remplacerait le comportement de plateforme ;
- aucun état métier `selected`, `loading` ou `clearable` ;
- aucune migration de `AdminPaletteSelector`.

## Accessibilité et responsive

Le rôle, l'ouverture, les options, la sélection et le clavier restent ceux du navigateur. Le focus visible est renforcé par les tokens. Le contrôle reste min-width 0 quand le consommateur l'impose et conserve ses classes responsive. `required`, `disabled` et `aria-invalid` sont transmis ; aucun consommateur courant ne démontre required/invalid, donc aucune UI d'erreur n'est inventée.

## Rollback local

Remplacer chaque `<Select>` par `<select>`, retirer les imports et supprimer uniquement `ui/select.tsx`. Les valeurs, options, handlers, labels, wrappers et données ne changent pas.
