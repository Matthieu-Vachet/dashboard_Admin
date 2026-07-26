# Inventaire Responsive System

## Périmètre source

L’inventaire balaie les 20 fichiers `page.tsx` routés et les 264 fichiers de `src`. Il classe les racines grid/flex, overflow, fixed/sticky, formulaires, modales/dialogues et tableaux, puis mesure les breakpoints, les hauteurs viewport, les largeurs fixes mobiles et les branchements JavaScript dépendant de la largeur.

## Baseline avant migration

| Mesure | Valeur |
|---|---:|
| Racines candidates | 2 264 |
| Racines conformes | 2 253 |
| Couverture générique | 99,51 % |
| Grilles / flex / overflow | 512 / 481 / 157 |
| Fixed ou sticky | 22 |
| Formulaires / modales / tableaux | 173 / 35 / 3 |
| Usages de breakpoints canoniques | 814 |
| Hauteurs viewport legacy | 9 |
| Largeurs fixes mobiles non bornées | 2 |
| Branchements JS sur largeur | 0 |

Les 11 écarts certains étaient neuf usages de `vh`/`min-h-screen` sans équivalent dynamique et deux largeurs fixes susceptibles de dépasser un petit viewport. La campagne runtime existante ne révélait pas d’overflow aux viewports de référence, mais ne prouvait pas le contrat global ni le clavier de tous les overlays.

## Baseline après migration

| Mesure | Valeur |
|---|---:|
| Racines candidates | 2 266 |
| Racines conformes | 2 266 |
| Couverture générique | 100 % |
| Grilles / flex / overflow | 512 / 481 / 157 |
| Fixed ou sticky | 22 |
| Formulaires / modales / tableaux | 173 / 36 / 3 |
| Usages de breakpoints canoniques | 814 |
| Hauteurs viewport legacy sans contrat dynamique | 0 |
| Largeurs fixes mobiles non bornées | 0 |
| Branchements JS sur largeur | 0 |

La hausse de deux racines candidates vient des contrats explicites de dialogue/focus ajoutés aux overlays existants ; elle ne représente pas une nouvelle interface.

## Distribution des breakpoints

| Breakpoint Tailwind | Usages |
|---|---:|
| `sm` | 502 |
| `md` | 57 |
| `lg` | 98 |
| `xl` | 122 |
| `2xl` | 35 |

Deux media queries CSS et 14 seuils arbitraires spécialisés sont conservés. Aucun seuil arbitraire générique ni branchement de rendu JavaScript sur `window.innerWidth`/`matchMedia` n’est présent.

## Fichiers migrés

- `src/app/globals.css`
- `src/app/login/page.tsx`
- `src/components/admin/events/event-editor-modal.jsx`
- `src/components/admin/events/events-calendar-panel.jsx`
- `src/components/admin/forms/kanban-board.tsx`
- `src/components/admin/forms/notes-board.tsx`
- `src/components/admin/layout/admin-app-frame.tsx`
- `src/components/admin/pokemon/admin-app.jsx`
- `src/components/admin/pokemon/game-master-json-viewer.jsx`

Les modifications sont limitées aux unités de viewport dynamiques, à `min-w-0`, aux bornes de largeur mobile et aux contrats clavier/focus de deux overlays déjà existants.
