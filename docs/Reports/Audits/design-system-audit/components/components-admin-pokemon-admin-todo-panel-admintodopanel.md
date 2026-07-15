---
id: MWI-COMP-130
component: "AdminTodoPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-todo-panel.jsx"
lines: 23-161
figma_priority: 31
evidence: static_code
---

# AdminTodoPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-todo-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-130`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-todo-panel.jsx`:23.
- File range: lines 23–161.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Check, Pencil, Plus, Trash2 | icons |
| react | useEffect, useMemo, useState | external package |
| sonner | toast | external package |
| @/services/admin/dashboard-store | readDashboardStoreValue, readLocalJson, writeDashboardStoreValue | internal |
| ./admin-ui | Panel, fieldClass, primaryButtonClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |

Unresolved/external JSX tags: `Check`, `Pencil`, `Plus`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <div>
    - <input />
    - <button>
      - <Plus />
  - <p>
  - <div>
    - <article>
      - <button aria-label={todo.done ? "Marquer la tâche comme ouverte" : "Marquer la tâche comme terminée"}>
        - <Check />
      - <div>
        - <input />
        - <p>
      - <div>
        - <button aria-label="Enregistrer la tâche">
          - <Check />
        - <button aria-label="Modifier la tâche">
          - <Pencil />
        - <button aria-label="Supprimer la tâche">
          - <Trash2 />
    - <p>

Unique HTML/React tags: `article`, `button`, `Check`, `div`, `input`, `p`, `Panel`, `Pencil`, `Plus`, `Trash2`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `editingId = null`, `editingText = ""`, `newTodo = ""`, `storageState = "loading"`, `todos = []`.
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

- Boolean properties for Figma: Hover, Focused, Loading, Error, Warning, Success, Empty.
- Text properties: Not found.
- Instance swaps: `Check`, `Pencil`, `Plus`, `Trash2`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `mb-4`, `p-2`, `p-3`, `p-4`, `p-5`, `px-4`, `py-2`, `sm:p-5` |
| Sizing | `h-10`, `h-9`, `min-h-11`, `min-h-12`, `min-w-0`, `w-9`, `w-full` |
| Typography | `font-black`, `font-bold`, `placeholder:text-slate-500`, `text-amber-100`, `text-emerald-100`, `text-emerald-50`, `text-red-100`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-300/25`, `border-dashed`, `border-emerald-300/30`, `border-emerald-300/35`, `border-red-300/25`, `border-white/10`, `border-white/12`, `border-white/15`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/45`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/10`, `bg-emerald-400/12`, `bg-emerald-400/18`, `bg-gradient-to-r`, `bg-red-400/10`, `bg-slate-950/35`, `bg-slate-950/45`, `bg-white/[0.05]`, `bg-white/[0.055]`, `from-sky-500`, `hover:bg-red-400/18`, `to-cyan-400` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/18` | base | conditional or expression-derived |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-red-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.05]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/25` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-300/30` | base | static occurrence |
| `border-emerald-300/35` | base | conditional or expression-derived |
| `border-red-300/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `border-white/15` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-1` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | conditional or expression-derived |
| `from-sky-500` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-10` | base | conditional or expression-derived |
| `h-9` | base | conditional or expression-derived |
| `hover:bg-red-400/18` | hover | static occurrence |
| `hover:border-cyan-200/45` | hover | conditional or expression-derived |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `justify-center` | base | static occurrence |
| `line-through` | base | conditional or expression-derived |
| `mb-4` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shrink-0` | base | conditional or expression-derived |
| `sm:grid-cols-[1fr_auto]` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-emerald-100` | base | conditional or expression-derived |
| `text-emerald-50` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | conditional or expression-derived |
| `text-sm` | base | conditional or expression-derived |
| `text-white` | base | conditional or expression-derived |
| `to-cyan-400` | base | static occurrence |
| `Todo-list` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `w-9` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |

Exact className combinations:

- `border-emerald-300/35 bg-emerald-400/18 text-emerald-100`
- `border-white/15 bg-white/[0.05] text-slate-300 hover:border-cyan-200/45`
- `flex gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3`
- `flex shrink-0 items-center gap-1`
- `grid gap-3`
- `grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition`
- `h-10 py-2`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `mb-4 grid gap-3 sm:grid-cols-[1fr_auto]`
- `mb-4 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-100`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0 flex-1`
- `py-2 text-sm font-bold`
- `rounded-2xl border border-dashed border-white/15 p-5 text-sm font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-xl border border-emerald-300/30 bg-emerald-400/12 p-2 text-emerald-50`
- `rounded-xl border border-red-300/25 bg-red-400/10 p-2 text-red-100 transition hover:bg-red-400/18`
- `rounded-xl border border-white/12 bg-white/[0.05] p-2 text-slate-200 transition hover:border-cyan-200/45`
- `text-slate-500 line-through`
- `text-white`
- `Todo-list`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} h-10 py-2\``
- `\`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition ${todo.done ? "border-emerald-300/35 bg-emerald-400/18 text-emerald-100" : "border-white/15 bg-white/[0.05] text-slate-300 hover:border-cyan-200/45"}\``
- `\`py-2 text-sm font-bold ${todo.done ? "text-slate-500 line-through" : "text-white"}\``
- `fieldClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid-cols-[1fr_auto]`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Enregistrer la tâche"`, `aria-label="Modifier la tâche"`, `aria-label="Supprimer la tâche"`, `aria-label={todo.done ? "Marquer la tâche comme ouverte" : "Marquer la tâche comme terminée"}`.
- Roles: Not found.
- Keyboard events: `onKeyDown`.
- Focus management hooks/refs: Detected in source; preserve exact sequence..
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Check`, `Pencil`, `Plus`, `Trash2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Loading, Error, Warning, Success, Empty.
- Instance swaps: `Check`, `Pencil`, `Plus`, `Trash2`.
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
| □ | Focused | focus styling or handler |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: sm | Tailwind sm: utilities |

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
