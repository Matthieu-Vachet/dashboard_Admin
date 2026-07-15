---
id: MWI-COMP-074
component: "MonthGrid"
category: "Form internal"
status: internal
source: "src/components/admin/forms/calendar-planner.tsx"
lines: 508-563
figma_priority: 18
evidence: static_code
---

# MonthGrid

## 1. Purpose

Form internal component implemented in src/components/admin/forms/calendar-planner.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-074`.
- Location: `Dashboard Admin/src/components/admin/forms/calendar-planner.tsx`:508.
- File range: lines 508–563.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | format, isSameMonth | external package |
| @/data/personal-dashboard-defaults | CalendarEvent | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-073 | [CalendarPlanner](../components/components-admin-forms-calendar-planner-calendarplanner.md) (MWI-COMP-073) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
  - <button>
    - <span>
    - <span>
      - <span>
        - <span />
        - <span>

Unique HTML/React tags: `button`, `div`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| cursor | Not found | See exact signature/contract below |
| days | Not found | See exact signature/contract below |
| events | Not found | See exact signature/contract below |
| onSelect | Not found | See exact signature/contract below |
| selectedKey | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  days,
  cursor,
  events,
  selectedKey,
  onSelect,
}: {
  days: Date[];
  cursor: Date;
  events: CalendarEvent[];
  selectedKey: string;
  onSelect: (day: Date) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  days: Date[];
  cursor: Date;
  events: CalendarEvent[];
  selectedKey: string;
  onSelect: (day: Date) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Selected, Error, Warning.
- Text properties: `cursor`, `days`, `events`, `onSelect`, `selectedKey`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Not found | Not found |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Not found | Not found |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1`, `gap-1.5`, `gap-2`, `mt-2`, `mt-6`, `mx-auto`, `p-2`, `px-2`, `py-1`, `py-2` |
| Sizing | `h-1.5`, `max-w-full`, `min-h-24`, `sm:min-h-0`, `w-3` |
| Typography | `font-black`, `font-mono`, `text-[10px]`, `text-center`, `text-foreground`, `text-muted`, `text-muted/60`, `text-sm`, `text-xs`, `tracking-[0.14em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/60`, `border-line`, `border-line/60` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand`, `bg-brand-2`, `bg-brand-2/12`, `bg-brand-3`, `bg-danger`, `bg-warning`, `bg-white/[0.02]`, `bg-white/[0.045]`, `bg-white/[0.05]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand` | base | conditional or expression-derived |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-brand-2/12` | base | conditional or expression-derived |
| `bg-brand-3` | base | static occurrence |
| `bg-danger` | base | static occurrence |
| `bg-warning` | base | static occurrence |
| `bg-white/[0.02]` | base | conditional or expression-derived |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.05]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/60` | base | conditional or expression-derived |
| `border-line` | base | conditional or expression-derived |
| `border-line/60` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-7` | base | static occurrence |
| `h-1.5` | base | conditional or expression-derived |
| `items-center` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `min-h-24` | base | conditional or expression-derived |
| `mt-2` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `p-2` | base | conditional or expression-derived |
| `px-2` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `sm:aspect-square` | sm | conditional or expression-derived |
| `sm:min-h-0` | sm | conditional or expression-derived |
| `text-[10px]` | base | static occurrence |
| `text-center` | base | conditional or expression-derived |
| `text-foreground` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-muted/60` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-3` | base | conditional or expression-derived |

Exact className combinations:

- `bg-brand`
- `bg-brand-2`
- `bg-brand-3`
- `bg-danger`
- `bg-warning`
- `border-brand-2/60 bg-brand-2/12 text-foreground`
- `border-line bg-white/[0.045]`
- `border-line/60 bg-white/[0.02] text-muted/60`
- `flex max-w-full items-center gap-1.5 rounded-full bg-white/[0.05] px-2 py-1`
- `h-1.5 w-3 rounded-full`
- `min-h-24 rounded-lg border p-2 text-center transition sm:aspect-square sm:min-h-0`
- `mt-2 flex flex-col items-center gap-1`
- `mt-6 grid grid-cols-7 gap-2`
- `mx-auto block font-mono text-sm font-black`
- `py-2 text-center text-xs font-black uppercase tracking-[0.14em] text-muted`
- `truncate text-[10px] font-black`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "min-h-24 rounded-lg border p-2 text-center transition sm:aspect-square sm:min-h-0", isSameMonth(day, cursor) ? "border-line bg-white/[0.045]" : "border-line/60 bg-white/[0.02] text-muted/60", selected && "border-brand-2/60 bg-brand-2/12 text-foreground", )`
- `cn("h-1.5 w-3 rounded-full", toneClasses[event.color])`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:aspect-square`, `sm:min-h-0`.
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

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Selected, Error, Warning.
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
| — | Hover | Not found |
| — | Pressed | Not found |
| — | Focused | Not found |
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| — | Success | Not found |
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
