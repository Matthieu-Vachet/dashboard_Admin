---
id: MWI-COMP-082
component: "KanbanBoard"
category: "Form feature"
status: exported
source: "src/components/admin/forms/kanban-board.tsx"
lines: 128-592
figma_priority: 34
evidence: static_code
---

# KanbanBoard

## 1. Purpose

Form feature component implemented in src/components/admin/forms/kanban-board.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-082`.
- Location: `Dashboard Admin/src/components/admin/forms/kanban-board.tsx`:128.
- File range: lines 128–592.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @dnd-kit/core | closestCorners, DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors | external package |
| @dnd-kit/sortable | arrayMove | external package |
| lucide-react | Plus, Save, Trash2 | icons |
| react | useMemo, useState | external package |
| @/components/admin/shared/loading-state | DashboardLoadingState | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input, Textarea | internal |
| @/components/ui/modal | Modal | internal |
| @/data/personal-dashboard-defaults | initialBoard, categories, columns, ColumnId, Task | internal |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-083 | [KanbanColumn](../components/components-admin-forms-kanban-board-kanbancolumn.md) (MWI-COMP-083) | JSX/import relation |
| MWI-COMP-085 | [KanbanTaskPreview](../components/components-admin-forms-kanban-board-kanbantaskpreview.md) (MWI-COMP-085) | JSX/import relation |
| MWI-COMP-237 | [DashboardLoadingState](../components/components-admin-shared-loading-state-dashboardloadingstate.md) (MWI-COMP-237) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |
| MWI-COMP-324 | [Textarea](../components/components-ui-input-textarea.md) (MWI-COMP-324) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `DndContext`, `DragOverlay`, `Plus`, `Save`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-007 | [KanbanPage](../components/app-dashboard-kanban-page-kanbanpage.md) (MWI-COMP-007) | Renders/imports this component |
| MWI-COMP-273 | [KanbanBoard](../components/components-dashboard-kanban-board-kanbanboard.md) (MWI-COMP-273) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DashboardLoadingState />
- <div>
  - <Card>
    - <div>
      - <Badge>
      - <h2>
      - <p>
    - <div>
      - <Badge>
      - <Button>
  - <section>
    - <DndContext>
      - <div>
        - <KanbanColumn />
      - <DragOverlay>
        - <KanbanTaskPreview />
  - <Modal>
    - <div>
      - <div>
        - <label>
          - <span>
          - <Input />
        - <label>
          - <span>
          - <Input />
      - <label>
        - <span>
        - <Textarea />
      - <div>
        - <label>
          - <span>
          - <Input />
        - <label>
          - <span>
          - <Input />
      - <div>
        - <label>
          - <span>
          - <Input />
        - <label>
          - <span>
          - <select>
            - <option>
      - <div>
        - <label>
          - <span>
          - <Textarea />
        - <label>
          - <span>
          - <Textarea />
      - <div>
        - <div>
          - <p>
          - <div>
            - <button>
        - <div>
          - <p>
          - <div>
            - <button>
      - <div>
        - <p>
        - <div>
          - <div>
            - <input />
            - <Input />
            - <Button aria-label="Supprimer l'action">
              - <Trash2 />
          - <Button>
      - <div>
        - <p>
        - <div>
          - <button>
      - <Button>
      - <Button>

Unique HTML/React tags: `Badge`, `button`, `Button`, `Card`, `DashboardLoadingState`, `div`, `DndContext`, `DragOverlay`, `h2`, `input`, `Input`, `KanbanColumn`, `KanbanTaskPreview`, `label`, `Modal`, `option`, `p`, `Plus`, `Save`, `section`, `select`, `span`, `Textarea`, `Trash2`.

## 5. React structure and state management

- Hooks: `useMemo`, `usePersistentState`, `useSensor`, `useSensors`, `useState`.
- Local state initializers: `activeTaskId = null`, `confirmDelete = false`, `selectedTaskId = null`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onClose`, `onDelete`, `onDragCancel`, `onDragEnd`, `onDragStart`, `onSelect`.
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

- Boolean properties for Figma: Hover, Selected, Checked, Unchecked, Loading, Error, Warning, Success, Expanded, Dragging, Drop Target, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `Plus`, `Save`, `Trash2`, `https://github.com/...`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Detected | selected/state signal |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Detected | drag state signal |
| Drop Target | Detected | drop target signal |
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
- Alignment utilities: `items-center, sm:items-center, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-2`, `mt-3`, `p-0`, `p-2`, `p-5`, `px-3`, `px-4`, `px-5`, `py-2`, `space-y-2`, `space-y-4` |
| Sizing | `h-10`, `h-5`, `max-w-2xl`, `min-h-10`, `min-h-11`, `min-h-12`, `min-h-24`, `min-h-32`, `min-h-9`, `w-10`, `w-5`, `w-full` |
| Typography | `font-black`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-3xl`, `text-amber-100`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-warning`, `text-white`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/45`, `border-brand-3/30`, `border-brand-3/40`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-danger/40`, `border-line`, `border-transparent`, `border-warning/35`, `border-warning/40`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3/10`, `bg-brand-3/12`, `bg-brand/10`, `bg-brand/12`, `bg-danger/10`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.04]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-4` | 2xl | static occurrence |
| `accent-cyan-400` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand-3/12` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/45` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand-3/40` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-danger/40` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-warning/40` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[auto_1fr_auto]` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-5` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `items-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-24` | base | static occurrence |
| `min-h-32` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-5` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `resize-y` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-[1fr_160px]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-left` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-2` | xl | static occurrence |

Exact className combinations:

- `block`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/45 bg-brand-2/12 text-foreground`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand-3/40 bg-brand-3/12 text-brand-3`
- `border-brand/30 bg-brand/10 text-violet-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/10 text-rose-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-danger/40 bg-danger/12 text-danger`
- `border-line bg-white/[0.04] text-muted hover:text-foreground`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/10 text-amber-100`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-warning/40 bg-warning/12 text-warning`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between`
- `flex flex-wrap gap-2`
- `grid gap-3 sm:grid-cols-[1fr_160px]`
- `grid gap-3 sm:grid-cols-2`
- `grid gap-4 xl:grid-cols-2 2xl:grid-cols-4`
- `grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg border border-line bg-white/[0.04] p-2`
- `grid grid-cols-2 gap-3`
- `h-10 w-10 p-0`
- `h-5 w-5 accent-cyan-400`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2`
- `mt-2 flex flex-wrap gap-2`
- `mt-2 grid grid-cols-2 gap-2`
- `mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted`
- `mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `mt-2 min-h-24 font-mono text-xs`
- `mt-2 min-h-32 resize-y`
- `mt-2 space-y-2`
- `mt-3 text-3xl font-black`
- `rounded-full border px-3 py-2 text-xs font-black transition`
- `rounded-lg border px-3 py-2 text-left text-xs font-black transition`
- `space-y-4`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "rounded-full border px-3 py-2 text-xs font-black transition", selectedTask.category === category ? categoryStyles[category] : "border-line bg-white/[0.04] text-muted hover:text-foreground", )`
- `cn( "rounded-full border px-3 py-2 text-xs font-black transition", selectedTask.priority === priority ? priorityStyles[priority] : "border-line bg-white/[0.04] text-muted hover:text-foreground", )`
- `cn( "rounded-lg border px-3 py-2 text-left text-xs font-black transition", selectedColumn === column.id ? "border-brand-2/45 bg-brand-2/12 text-foreground" : "border-line bg-white/[0.04] text-muted hover:text-foreground", )`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/forms/kanban-board.tsx#categoryStyles
categoryStyles: Record<Category, string> = {
  Produit: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  Design: "border-brand/30 bg-brand/10 text-violet-100",
  API: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  Ops: "border-warning/35 bg-warning/10 text-amber-100",
  Urgent: "border-danger/35 bg-danger/10 text-rose-100",
}
```

```tsx
src/components/admin/forms/kanban-board.tsx#priorityStyles
priorityStyles: Record<Task["priority"], string> = {
  Haute: "border-danger/40 bg-danger/12 text-danger",
  Moyenne: "border-warning/40 bg-warning/12 text-warning",
  Basse: "border-brand-3/40 bg-brand-3/12 text-brand-3",
}
```

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

- Breakpoints used: `2xl`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-4`, `sm:flex-row`, `sm:grid-cols-[1fr_160px]`, `sm:grid-cols-2`, `sm:items-center`, `sm:justify-between`, `xl:grid-cols-2`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Supprimer l'action"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Plus`, `Save`, `Trash2`.
- Asset references: `https://github.com/...`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Checked, Unchecked, Loading, Error, Warning, Success, Expanded, Dragging, Drop Target, Active, Inactive.
- Instance swaps: `Plus`, `Save`, `Trash2`, `https://github.com/...`.
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
| □ | Selected | selected/state signal |
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| □ | Dragging | drag state signal |
| □ | Drop Target | drop target signal |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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
