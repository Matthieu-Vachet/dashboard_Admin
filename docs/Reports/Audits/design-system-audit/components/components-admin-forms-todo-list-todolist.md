---
id: MWI-COMP-087
component: "TodoList"
category: "Form feature"
status: exported
source: "src/components/admin/forms/todo-list.tsx"
lines: 14-178
figma_priority: 34
evidence: static_code
---

# TodoList

## 1. Purpose

Form feature component implemented in src/components/admin/forms/todo-list.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-087`.
- Location: `Dashboard Admin/src/components/admin/forms/todo-list.tsx`:14.
- File range: lines 14–178.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Check, Plus, Trash2 | icons |
| react | useMemo, useState | external package |
| @/components/admin/shared/loading-state | DashboardLoadingState | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input | internal |
| @/data/personal-dashboard-defaults | initialTodos, Todo | internal |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-237 | [DashboardLoadingState](../components/components-admin-shared-loading-state-dashboardloadingstate.md) (MWI-COMP-237) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |

Unresolved/external JSX tags: `Check`, `Plus`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-017 | [TodoPage](../components/app-dashboard-todo-page-todopage.md) (MWI-COMP-017) | Renders/imports this component |
| MWI-COMP-287 | [TodoList](../components/components-dashboard-todo-list-todolist.md) (MWI-COMP-287) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DashboardLoadingState />
- <div>
  - <Card>
    - <div>
      - <div>
        - <Badge>
        - <h2>
      - <div>
        - <Badge>
        - <div>
          - <button>
    - <div>
      - <Input />
      - <Button>
    - <div>
      - <div>
        - <button aria-label="Basculer la tâche">
          - <Check />
        - <Input />
        - <select>
          - <option>
        - <button aria-label="Supprimer la tâche">
          - <Trash2 />
  - <aside>
    - <Card>
      - <p>
      - <p>
      - <div>
        - <div />
      - <p>

Unique HTML/React tags: `aside`, `Badge`, `button`, `Button`, `Card`, `Check`, `DashboardLoadingState`, `div`, `h2`, `Input`, `option`, `p`, `Plus`, `select`, `Trash2`.

## 5. React structure and state management

- Hooks: `useMemo`, `usePersistentState`, `useState`.
- Local state initializers: `filter = "all"`, `title = ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onKeyDown`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| Not found | Not found | Not found |

Exact parameter signature:

```tsx
Not found
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Error, Warning, Success, Expanded, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `Check`, `Plus`, `Trash2`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, place-items-center, sm:items-center, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-3`, `mt-4`, `mt-5`, `p-0`, `p-1`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `sm:p-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-10`, `h-3`, `h-8`, `h-full`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10`, `w-8` |
| Typography | `font-black`, `font-mono`, `font-semibold`, `hover:text-danger`, `hover:text-foreground`, `leading-6`, `text-3xl`, `text-5xl`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-slate-950`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg`, `rounded-md` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand-3/40`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2`, `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand-3/20`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-gradient-to-r`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `bg-white/10`, `from-brand-3`, `hover:bg-danger/10`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `to-brand-2` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand-3/20` | base | conditional or expression-derived |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand-3/40` | base | conditional or expression-derived |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand-3` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-10` | base | conditional or expression-derived |
| `h-3` | base | static occurrence |
| `h-8` | base | conditional or expression-derived |
| `h-full` | base | static occurrence |
| `hover:bg-danger/10` | hover | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-danger` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `leading-6` | base | static occurrence |
| `line-through` | base | conditional or expression-derived |
| `min-h-10` | base | conditional or expression-derived |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | conditional or expression-derived |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `rounded-md` | base | conditional or expression-derived |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-[1fr_auto]` | sm | static occurrence |
| `sm:grid-cols-[auto_1fr_150px_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-5xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-slate-950` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-brand-2` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-8` | base | conditional or expression-derived |
| `xl:grid-cols-[1fr_340px]` | xl | static occurrence |

Exact className combinations:

- `bg-brand-2 text-slate-950`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand-3/40 bg-brand-3/20 text-brand-3`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.04] text-muted`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`
- `flex flex-wrap items-center gap-2`
- `flex rounded-lg border border-line bg-white/[0.045] p-1`
- `grid gap-3 rounded-lg border border-line bg-white/[0.045] p-3 sm:grid-cols-[auto_1fr_150px_auto] sm:items-center`
- `grid gap-4 xl:grid-cols-[1fr_340px]`
- `grid h-8 w-8 place-items-center rounded-lg border transition`
- `grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger`
- `h-10 w-10 p-0`
- `h-full rounded-full bg-gradient-to-r from-brand-3 to-brand-2`
- `min-h-10`
- `min-h-10 px-4 text-sm`
- `min-h-10 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-h-9 rounded-md px-3 text-xs font-black transition`
- `mt-3 text-3xl font-black`
- `mt-4 font-mono text-5xl font-black`
- `mt-4 h-3 overflow-hidden rounded-full bg-white/10`
- `mt-4 text-sm font-semibold leading-6 text-muted`
- `mt-5 grid gap-3 sm:grid-cols-[1fr_auto]`
- `mt-5 space-y-3`
- `p-4`
- `p-4 sm:p-5`
- `space-y-4`
- `text-muted hover:text-foreground`
- `text-muted line-through`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "grid h-8 w-8 place-items-center rounded-lg border transition", todo.done ? "border-brand-3/40 bg-brand-3/20 text-brand-3" : "border-line bg-white/[0.04] text-muted", )`
- `cn( "min-h-10", todo.done && "text-muted line-through", )`
- `cn( "min-h-9 rounded-md px-3 text-xs font-black transition", filter === id ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground", )`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

- `{{ width: \`${completion}%\` }}`

### Referenced local/imported style declarations

```tsx
src/components/ui/badge.tsx#tones
tones: Record<BadgeTone, string> = {
  cyan: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  violet: "border-brand/30 bg-brand/12 text-violet-100",
  green: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  amber: "border-warning/35 bg-warning/12 text-amber-100",
  red: "border-danger/35 bg-danger/12 text-rose-100",
  neutral: "border-line bg-white/[0.06] text-muted",
}
```

```tsx
src/components/ui/button.tsx#sizes
sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
  icon: "h-10 w-10 p-0",
}
```

```tsx
src/components/ui/button.tsx#variants
variants: Record<ButtonVariant, string> = {
  primary:
    "dashboard-primary-button border-transparent text-white hover:brightness-110",
  secondary:
    "border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]",
  ghost: "border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground",
  danger:
    "border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20",
}
```

### Referenced global custom CSS rules

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:flex-row`, `sm:grid-cols-[1fr_auto]`, `sm:grid-cols-[auto_1fr_150px_auto]`, `sm:items-center`, `sm:justify-between`, `sm:p-5`, `xl:grid-cols-[1fr_340px]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Basculer la tâche"`, `aria-label="Supprimer la tâche"`.
- Roles: Not found.
- Keyboard events: `onKeyDown`.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Check`, `Plus`, `Trash2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Error, Warning, Success, Expanded, Active, Inactive.
- Instance swaps: `Check`, `Plus`, `Trash2`.
- Text properties: expose each textual prop from the props contract; when text is hardcoded, preserve it in the default instance.
- Variables: bind CSS variables and semantic token references listed in this document. Literal utilities remain documented implementation values.
- Constraints: infer from width/min/max and responsive utilities; any value not encoded is marked Estimated from implementation.
- Nested components: use the child component links below as true instances rather than detached groups.
- Interactive components: create prototype states only for interactions detected in the state/event tables.

## 18. Screenshot capture checklist

| Capture | State / variant | Evidence |
|---|---|---|
| □ | Default | Base render path |
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| — | Focused | Not found |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: sm | Tailwind sm: utilities |
| □ | Responsive: xl | Tailwind xl: utilities |

## 19. Rebuild acceptance criteria

- DOM hierarchy matches section 4.
- Props, defaults, variants and states match sections 6–9.
- Every class/token and conditional expression in sections 10–12 has a Figma or CSS equivalent.
- Responsive behavior matches each encoded breakpoint.
- ARIA, keyboard, focus and native semantics match section 15.
- Child components remain true nested instances.
- No undocumented redesign, optimization or normalization is introduced.

## 20. Unknowns

- Runtime-computed dimensions, line wrapping and browser font metrics: Estimated from implementation.
- Visual output without an authenticated rendered screenshot: Not found.
- Product rationale not encoded in code or naming: Not found.
