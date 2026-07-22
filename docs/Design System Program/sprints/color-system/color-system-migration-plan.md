# Plan de migration Color System

Plan écrit avant migration source le 22 juillet 2026.

## Baseline

Le scan reproductible de `src` relève 5 096 usages couleur lexicaux : 1 552 génériques déjà tokenisés, 1 794 génériques hardcodés, 1 358 métier, 172 décoratifs et 220 ambigus. La couverture générique initiale est de 46,4 %. Une baseline Playwright de 66 scénarios a été créée sur onze pages, deux thèmes et trois viewports.

## Migrations autorisées

| Pattern courant | Cible | Justification |
|---|---|---|
| `border-white/10` | `border-line` | même valeur dark ; bordure thématique correcte en Light |
| `text-slate-300` | `text-foreground-secondary` | rôle de texte secondaire répété |
| `text-slate-400` | `text-muted` | équivalence exacte dark avec le token existant |
| `text-slate-500` | `text-disabled` | contenu de plus faible emphase ou désactivé |
| `bg-white/[0.035]` / `[.035]` | `bg-surface-faint` | recette répétée exacte |
| `bg-white/[0.04]` / `[.04]` | `bg-surface-minimal` | recette répétée exacte |
| `bg-white/[0.045]` | `bg-surface-flat` | contrat Card flat existant |
| `bg-white/[0.055]` | `bg-surface-subtle` | surface legacy répétée exacte |
| `bg-white/[0.06]` | `bg-surface-control` | contrôles et petits chrome répétés |
| `bg-white/10` | `bg-surface-emphasis` | couche neutre répétée, y compris tracks et pills |
| `bg-black/15` | `bg-surface-recessed` | surface inset sombre répétée |
| `bg-slate-950/35` | `bg-surface-inset` | surface inset exacte, déjà remplacée en Light par CSS global |
| `bg-slate-950/45` | `bg-surface-inset-strong` | niveau inset fort exact |

Les primitives utilisent en plus les rôles finis `surface-interactive`, `surface-hover`, `surface-control-focus`, `surface-interactive-hover`, `overlay` et les foregrounds de statut.

## Limites et arrêts locaux

- Conserver les palettes de types, raids, œufs, météo, shiny, équipes, événements et graphiques.
- Conserver les gradients et glows spécialisés.
- Ne pas fusionner les autres alphas white/black/slate sans équivalence de rôle.
- Ne pas migrer un texte blanc sans preuve qu’il s’agit de `foreground`, `inverse` ou d’un contraste métier.
- Toute différence Light issue de `border-line` ou des nouveaux textes adaptatifs doit être vérifiée comme correction de thème, pas masquée.
- Les fichiers déjà modifiés par Modal/Card sont édités uniquement par substitutions locales préservant leurs changements.

## Rollback local

Chaque groupe est réversible par le mapping inverse explicite ci-dessus. Le contrat central est limité à `globals.css`; aucune donnée, dépendance, API métier, navigation, spacing, radius ou motion n’est modifiée.
