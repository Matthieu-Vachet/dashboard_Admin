---
id: MWI-COMP-078
component: "EventButton"
category: "Form internal"
status: internal
source: "src/components/admin/forms/calendar-planner.tsx"
lines: 672-704
figma_priority: 21
evidence: static_code
---

# EventButton

## 1. Purpose

Form internal component implemented in src/components/admin/forms/calendar-planner.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-078`.
- Location: `Dashboard Admin/src/components/admin/forms/calendar-planner.tsx`:672.
- File range: lines 672–704.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **21/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/ui/badge | Badge | internal |
| @/data/personal-dashboard-defaults | CalendarEvent | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-073 | [CalendarPlanner](../components/components-admin-forms-calendar-planner-calendarplanner.md) (MWI-COMP-073) | Renders/imports this component |
| MWI-COMP-077 | [EventList](../components/components-admin-forms-calendar-planner-eventlist.md) (MWI-COMP-077) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span />
  - <p>
  - <p>
  - <div>
    - <Badge>
    - <Badge>

Unique HTML/React tags: `Badge`, `button`, `div`, `p`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| event | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| selected | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  event,
  selected,
  onOpen,
}: {
  event: CalendarEvent;
  selected?: boolean;
  onOpen: (event: CalendarEvent) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  event: CalendarEvent;
  selected?: boolean;
  onOpen: (event: CalendarEvent) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Selected, Error, Warning, Success.
- Text properties: `event`, `onOpen`, `selected`.
- Instance swaps: Not found.
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
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
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
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `mt-1`, `mt-3`, `p-3` |
| Sizing | `h-1.5`, `w-12`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `text-amber-100`, `text-cyan-100`, `text-emerald-100`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/55`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand`, `bg-brand-2`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger`, `bg-danger/12`, `bg-warning`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `hover:bg-white/[0.075]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand` | base | conditional or expression-derived |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | conditional or expression-derived |
| `bg-brand-3` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-warning` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `block` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/55` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-warning/35` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `h-1.5` | base | conditional or expression-derived |
| `hover:bg-white/[0.075]` | hover | conditional or expression-derived |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `w-12` | base | conditional or expression-derived |
| `w-full` | base | conditional or expression-derived |

Exact className combinations:

- `bg-brand`
- `bg-brand-2`
- `bg-brand-3`
- `bg-danger`
- `bg-warning`
- `block h-1.5 w-12 rounded-full`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/55 bg-brand-2/12`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.045] hover:bg-white/[0.075]`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `mt-1 font-mono text-xs font-bold text-muted`
- `mt-3 flex flex-wrap gap-2`
- `mt-3 text-sm font-black`
- `w-full rounded-lg border p-3 text-left transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "w-full rounded-lg border p-3 text-left transition", selected ? "border-brand-2/55 bg-brand-2/12" : "border-line bg-white/[0.045] hover:bg-white/[0.075]", )`
- `cn("block h-1.5 w-12 rounded-full", toneClasses[event.color])`

### CSS variables

Not found

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

### Referenced global custom CSS rules

Not found

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
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Error, Warning, Success.
- Instance swaps: Not found.
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
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
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
