---
id: MWI-COMP-073
component: "CalendarPlanner"
category: "Form feature"
status: exported
source: "src/components/admin/forms/calendar-planner.tsx"
lines: 122-506
figma_priority: 34
evidence: static_code
---

# CalendarPlanner

## 1. Purpose

Form feature component implemented in src/components/admin/forms/calendar-planner.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-073`.
- Location: `Dashboard Admin/src/components/admin/forms/calendar-planner.tsx`:122.
- File range: lines 122–506.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | format | external package |
| date-fns/locale | fr | external package |
| lucide-react | CalendarPlus, ChevronLeft, ChevronRight, Filter, Save, Trash2 | icons |
| react | useMemo, useState | external package |
| @/components/admin/shared/loading-state | DashboardLoadingState | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input, Textarea | internal |
| @/components/ui/modal | Modal | internal |
| @/data/personal-dashboard-defaults | initialEvents, CalendarEvent, CalendarEventCategory, CalendarEventStatus | internal |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-074 | [MonthGrid](../components/components-admin-forms-calendar-planner-monthgrid.md) (MWI-COMP-074) | JSX/import relation |
| MWI-COMP-075 | [MiniMonth](../components/components-admin-forms-calendar-planner-minimonth.md) (MWI-COMP-075) | JSX/import relation |
| MWI-COMP-076 | [DayView](../components/components-admin-forms-calendar-planner-dayview.md) (MWI-COMP-076) | JSX/import relation |
| MWI-COMP-077 | [EventList](../components/components-admin-forms-calendar-planner-eventlist.md) (MWI-COMP-077) | JSX/import relation |
| MWI-COMP-078 | [EventButton](../components/components-admin-forms-calendar-planner-eventbutton.md) (MWI-COMP-078) | JSX/import relation |
| MWI-COMP-237 | [DashboardLoadingState](../components/components-admin-shared-loading-state-dashboardloadingstate.md) (MWI-COMP-237) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |
| MWI-COMP-324 | [Textarea](../components/components-ui-input-textarea.md) (MWI-COMP-324) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Filter`, `Save`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-003 | [CalendarPage](../components/app-dashboard-calendar-page-calendarpage.md) (MWI-COMP-003) | Renders/imports this component |
| MWI-COMP-263 | [CalendarPlanner](../components/components-dashboard-calendar-planner-calendarplanner.md) (MWI-COMP-263) | Renders/imports this component |

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
        - <Button aria-label="Période précédente">
          - <ChevronLeft />
        - <Button aria-label="Période suivante">
          - <ChevronRight />
        - <Button>
    - <div>
      - <span>
        - <Filter />
      - <select>
        - <option>
        - <option>
      - <select>
        - <option>
        - <option>
    - <DayView />
    - <MonthGrid />
    - <div>
      - <MiniMonth />
    - <div>
      - <MiniMonth />
  - <aside>
    - <EventList />
    - <EventList />
    - <Card>
      - <p>
      - <h3>
      - <div>
        - <EventButton />
        - <p>
  - <Modal>
    - <div>
      - <label>
        - <span>
        - <Input />
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
      - <label>
        - <span>
        - <select>
          - <option>
      - <div>
        - <p>
        - <div>
          - <button>
            - <span />
      - <label>
        - <span>
        - <Textarea />
      - <Button>
      - <Button>

Unique HTML/React tags: `aside`, `Badge`, `button`, `Button`, `CalendarPlus`, `Card`, `ChevronLeft`, `ChevronRight`, `DashboardLoadingState`, `DayView`, `div`, `EventButton`, `EventList`, `Filter`, `h2`, `h3`, `Input`, `label`, `MiniMonth`, `Modal`, `MonthGrid`, `option`, `p`, `Save`, `select`, `span`, `Textarea`, `Trash2`.

## 5. React structure and state management

- Hooks: `useMemo`, `usePersistentState`, `useState`.
- Local state initializers: `categoryFilter = "Toutes"`, `confirmDelete = false`, `cursor = new Date(`, `modalOpen = false`, `selectedDate = new Date(`, `selectedEventId = initialEvents[0]?.id`, `statusFilter = "Tous"`, `view = "mois"`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onClose`, `onOpen`, `onSelect`.
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

- Boolean properties for Figma: Hover, Selected, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Filter`, `Save`, `Trash2`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
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
- Alignment utilities: `2xl:items-center, 2xl:justify-between, items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `[&>svg]:mx-auto`, `gap-2`, `gap-3`, `gap-4`, `mr-2`, `mt-2`, `mt-3`, `mt-5`, `mt-6`, `p-0`, `p-1`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `py-2`, `sm:p-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-10`, `h-2`, `min-h-10`, `min-h-11`, `min-h-12`, `min-h-32`, `min-h-9`, `min-w-0`, `w-10`, `w-4`, `w-full` |
| Typography | `capitalize`, `font-black`, `font-semibold`, `hover:text-foreground`, `text-2xl`, `text-3xl`, `text-amber-100`, `text-brand-2`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-slate-950`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `tracking-[0.16em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg`, `rounded-md` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/45`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand`, `bg-brand-2`, `bg-brand-2/10`, `bg-brand-3`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning`, `bg-warning/12`, `bg-white/[0.035]`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `bg-white/[0.1]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[&>svg]:block` | [&>svg] | static occurrence |
| `[&>svg]:mx-auto` | [&>svg] | static occurrence |
| `2xl:flex-row` | 2xl | static occurrence |
| `2xl:grid-cols-3` | 2xl | static occurrence |
| `2xl:grid-cols-4` | 2xl | static occurrence |
| `2xl:items-center` | 2xl | static occurrence |
| `2xl:justify-between` | 2xl | static occurrence |
| `bg-brand` | base | conditional or expression-derived |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/[0.1]` | base | conditional or expression-derived |
| `block` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/45` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `capitalize` | base | conditional or expression-derived |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-2` | base | conditional or expression-derived |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `inline-block` | base | conditional or expression-derived |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `md:grid-cols-[auto_1fr_1fr]` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-32` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mr-2` | base | conditional or expression-derived |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | static occurrence |
| `rounded-md` | base | conditional or expression-derived |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
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
| `tracking-[0.16em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-4` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[minmax(0,1fr)_400px]` | xl | static occurrence |
| `xl:grid-cols-3` | xl | static occurrence |

Exact className combinations:

- `bg-brand`
- `bg-brand-2`
- `bg-brand-2 text-slate-950`
- `bg-brand-3`
- `bg-danger`
- `bg-warning`
- `block`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/45 bg-white/[0.1]`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.04]`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between`
- `flex flex-wrap gap-2`
- `flex rounded-lg border border-line bg-white/[0.045] p-1`
- `grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]`
- `grid grid-cols-2 gap-3`
- `grid place-items-center [&>svg]:mx-auto [&>svg]:block`
- `h-10 w-10 p-0`
- `inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-2`
- `min-h-10 px-4 text-sm`
- `min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0 p-4 sm:p-5`
- `mr-2 inline-block h-2 w-4 rounded-full`
- `mt-2`
- `mt-2 flex flex-wrap gap-2`
- `mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `mt-2 min-h-32`
- `mt-2 text-2xl font-black capitalize`
- `mt-3 text-3xl font-black capitalize`
- `mt-5 grid gap-3 rounded-lg border border-line bg-white/[0.035] p-3 md:grid-cols-[auto_1fr_1fr]`
- `mt-5 space-y-3`
- `mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3`
- `mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`
- `p-4`
- `rounded-full border px-3 py-2 text-xs font-black transition`
- `rounded-lg border border-line bg-white/[0.045] p-3 text-sm font-semibold text-muted`
- `rounded-md px-3 py-2 text-xs font-black capitalize transition`
- `space-y-4`
- `text-muted hover:text-foreground`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "rounded-full border px-3 py-2 text-xs font-black transition", selectedEvent.color === tone ? "border-brand-2/45 bg-white/[0.1]" : "border-line bg-white/[0.04]", )`
- `cn( "rounded-md px-3 py-2 text-xs font-black capitalize transition", view === item ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground", )`
- `cn("mr-2 inline-block h-2 w-4 rounded-full", toneClasses[tone])`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/forms/calendar-planner.tsx#statusTone
statusTone: Record<CalendarEventStatus, "cyan" | "green" | "amber"> = {
  "À venir": "cyan",
  "En cours": "green",
  Terminé: "amber",
}
```

```tsx
src/components/admin/forms/calendar-planner.tsx#toneBadge
toneBadge: Record<EventTone, string> = {
  cyan: "cyan",
  green: "green",
  violet: "violet",
  amber: "amber",
  red: "red",
}
```

```tsx
src/components/admin/forms/calendar-planner.tsx#toneClasses
toneClasses: Record<EventTone, string> = {
  cyan: "bg-brand-2",
  green: "bg-brand-3",
  violet: "bg-brand",
  amber: "bg-warning",
  red: "bg-danger",
}
```

```tsx
src/components/admin/forms/calendar-planner.tsx#tones
tones: EventTone[] = ["cyan", "green", "violet", "amber", "red"]
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

- Breakpoints used: `2xl`, `lg`, `md`, `sm`, `xl`.
- Responsive utilities: `2xl:flex-row`, `2xl:grid-cols-3`, `2xl:grid-cols-4`, `2xl:items-center`, `2xl:justify-between`, `lg:grid-cols-2`, `md:grid-cols-[auto_1fr_1fr]`, `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-[minmax(0,1fr)_400px]`, `xl:grid-cols-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Période précédente"`, `aria-label="Période suivante"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Filter`, `Save`, `Trash2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive.
- Instance swaps: `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Filter`, `Save`, `Trash2`.
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
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
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
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: md | Tailwind md: utilities |
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
