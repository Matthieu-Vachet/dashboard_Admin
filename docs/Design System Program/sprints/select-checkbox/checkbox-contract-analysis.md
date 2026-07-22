# Analyse du contrat Checkbox

## Contrat approuvé

`Checkbox` reste un `<input type="checkbox">` natif. Son API omet seulement `type` de `InputHTMLAttributes<HTMLInputElement>`, ajoute `className`, transmet les autres props et expose un `forwardRef<HTMLInputElement>`.

Le contrat porte : taille tactile visuelle existante, `accent-brand-2`, bordure/surface Color System, focus visible, disabled et invalid. `checked`, `defaultChecked`, `onChange`, `name`, `value`, `required` et les attributs ARIA restent natifs.

## Composition

- Le label englobant existant reste la cible de clic ; Checkbox ne rend pas de label.
- La checkbox Kanban reçoit un nom basé sur le texte réel de l'item, seul défaut sûr observé.
- Les accents métier `accent-cyan-400` et `accent-emerald-400`, quand ils expriment réellement le domaine, restent surchargeables par `className`.
- `Field` n'est pas imposé aux booléens ; les labels inline actuels sont plus adaptés.

## Exclusions

- aucun `indeterminate` : zéro usage réel ;
- aucun Switch, Toggle ou groupe de boutons ;
- aucun fieldset/legend : aucune répétition de groupe nécessitant ce nouveau contrat ;
- le bouton Best Attackers `aria-checked` reste spécialisé ;
- les trois `aria-pressed` et le radio Learning restent faux positifs.

## Accessibilité

Le contrôle natif conserve Tab, Space, checked/unchecked, form submission et disabled. Checkbox ne fabrique pas de label ou de description. Les deux disabled conditionnels de l'Identity Manager et les neuf labels existants restent inchangés.

## Rollback local

Remplacer chaque `<Checkbox>` par `<input type="checkbox">`, restaurer les classes déjà présentes, retirer les imports puis supprimer uniquement `ui/checkbox.tsx`. Aucun état ou handler métier n'est déplacé.
