---
id: MWI-COMP-238
component: "SortableWidgetGrid"
category: "Shared pattern"
status: exported
source: "src/components/admin/shared/sortable-widget-grid.tsx"
lines: 35-172
figma_priority: 46
evidence: static_code
---

# SortableWidgetGrid

## 1. Purpose

Shared pattern component implemented in src/components/admin/shared/sortable-widget-grid.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-238`.
- Location: `Dashboard Admin/src/components/admin/shared/sortable-widget-grid.tsx`:35.
- File range: lines 35–172.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **46/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @dnd-kit/core | closestCenter, DndContext, DragEndEvent, PointerSensor, TouchSensor, useSensor, useSensors | external package |
| @dnd-kit/sortable | arrayMove, rectSortingStrategy, SortableContext | external package |
| lucide-react | Eye, RotateCcw, SlidersHorizontal | icons |
| react | useMemo | external package |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-239 | [SortableWidgetFrame](../components/components-admin-shared-sortable-widget-grid-sortablewidgetframe.md) (MWI-COMP-239) | JSX/import relation |

Unresolved/external JSX tags: `DndContext`, `Eye`, `RotateCcw`, `SlidersHorizontal`, `SortableContext`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-028 | [DailyTools](../components/components-admin-dashboard-daily-tools-dailytools.md) (MWI-COMP-028) | Renders/imports this component |
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-241 | [DatabaseStats](../components/components-admin-stats-database-stats-databasestats.md) (MWI-COMP-241) | Renders/imports this component |
| MWI-COMP-246 | [LearningAnalytics](../components/components-admin-stats-learning-analytics-learninganalytics.md) (MWI-COMP-246) | Renders/imports this component |
| MWI-COMP-285 | [SortableWidgetGrid](../components/components-dashboard-sortable-widget-grid-sortablewidgetgrid.md) (MWI-COMP-285) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <span>
      - <SlidersHorizontal />
    - <div>
      - <button>
        - <Eye />
      - <span>
      - <button>
        - <RotateCcw />
  - <DndContext id={dndContextId}>
    - <SortableContext>
      - <section>
        - <SortableWidgetFrame id={item.id}>

Unique HTML/React tags: `button`, `div`, `DndContext`, `Eye`, `RotateCcw`, `section`, `SlidersHorizontal`, `SortableContext`, `SortableWidgetFrame`, `span`.

## 5. React structure and state management

- Hooks: `useMemo`, `useSensor`, `useSensors`.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`, `onDragEnd`, `onHide`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| className | Not found | See exact signature/contract below |
| columnsClassName | columnsClassName = "columns-1 lg:columns-2 2xl:columns-3" | See exact signature/contract below |
| enableHide | enableHide = true | See exact signature/contract below |
| itemClassName | Not found | See exact signature/contract below |
| items | Not found | See exact signature/contract below |
| storageKey | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  storageKey,
  items,
  className,
  itemClassName,
  columnsClassName = "columns-1 lg:columns-2 2xl:columns-3",
  enableHide = true,
}: {
  storageKey: string;
  items: SortableWidgetItem[];
  className?: string;
  itemClassName?: string;
  columnsClassName?: string;
  enableHide?: boolean;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  storageKey: string;
  items: SortableWidgetItem[];
  className?: string;
  itemClassName?: string;
  columnsClassName?: string;
  enableHide?: boolean;
}

export type SortableWidgetItem = {
  id: string;
  label?: string;
  node: ReactNode;
  className?: string;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Success, Empty, Dragging, Drop Target, Active, Inactive.
- Text properties: `className`, `columnsClassName`, `enableHide`, `itemClassName`, `items`, `storageKey`.
- Instance swaps: `Eye`, `RotateCcw`, `SlidersHorizontal`.
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
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
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
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- Alignment utilities: `items-center, justify-between, justify-end`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-text` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-4`, `px-3`, `py-2`, `space-y-3` |
| Sizing | `min-h-8`, `min-w-0` |
| Typography | `font-black`, `text-cyan-100`, `text-emerald-100`, `text-slate-200`, `text-slate-300`, `text-slate-500`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-emerald-300/25`, `border-white/10`, `hover:border-cyan-200/40` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-emerald-400/10`, `bg-slate-950/35`, `bg-white/[0.045]`, `bg-white/[0.055]`, `hover:bg-cyan-400/12`, `hover:bg-emerald-400/18` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-emerald-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-emerald-300/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-4` | base | conditional or expression-derived |
| `hover:bg-cyan-400/12` | hover | static occurrence |
| `hover:bg-emerald-400/18` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `min-h-8` | base | static occurrence |
| `min-w-0` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `widget-toolbar` | base | static occurrence |
| `widget-toolbar-button` | base | static occurrence |
| `widget-toolbar-empty` | base | static occurrence |

Exact className combinations:

- `flex flex-wrap items-center justify-end gap-2`
- `inline-flex items-center gap-2 text-cyan-100`
- `min-w-0 gap-4`
- `space-y-3`
- `widget-toolbar flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2 text-xs font-black text-slate-300`
- `widget-toolbar-button inline-flex min-h-8 items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-3 text-emerald-100 transition hover:bg-emerald-400/18`
- `widget-toolbar-button inline-flex min-h-8 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 text-slate-200 transition hover:border-cyan-200/40 hover:bg-cyan-400/12`
- `widget-toolbar-empty rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-slate-500`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("min-w-0 gap-4", columnsClassName, className)`
- `cn(itemClassName, item.className)`

### CSS variables

`--accent-text`

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

```css
.light .widget-toolbar > span:first-child {
color: var(--accent-text);
}
```

```css
.light .widget-toolbar-button, .light .widget-frame-button, .light .widget-toolbar-empty {
border-color: rgba(31, 45, 69, 0.12);
  background: rgba(255, 255, 255, 0.82);
  color: #334155;
}
```

```css
.light .widget-toolbar, .light .widget-frame-actions {
border-color: rgba(31, 45, 69, 0.13);
  background: rgba(255, 255, 255, 0.74);
  color: #334155;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Eye`, `RotateCcw`, `SlidersHorizontal`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Success, Empty, Dragging, Drop Target, Active, Inactive.
- Instance swaps: `Eye`, `RotateCcw`, `SlidersHorizontal`.
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
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| □ | Dragging | drag state signal |
| □ | Drop Target | drop target signal |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| — | Responsive variants | Not found |

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
