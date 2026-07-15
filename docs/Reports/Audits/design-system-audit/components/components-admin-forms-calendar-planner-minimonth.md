---
id: MWI-COMP-075
component: "MiniMonth"
category: "Form internal"
status: internal
source: "src/components/admin/forms/calendar-planner.tsx"
lines: 565-599
figma_priority: 18
evidence: static_code
---

# MiniMonth

## 1. Purpose

Form internal component implemented in src/components/admin/forms/calendar-planner.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-075`.
- Location: `Dashboard Admin/src/components/admin/forms/calendar-planner.tsx`:565.
- File range: lines 565–599.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | format, isSameMonth | external package |
| date-fns/locale | fr | external package |
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
  - <h3>
  - <div>
    - <button>

Unique HTML/React tags: `button`, `div`, `h3`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| events | Not found | See exact signature/contract below |
| month | Not found | See exact signature/contract below |
| onSelect | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  month,
  events,
  onSelect,
}: {
  month: Date;
  events: CalendarEvent[];
  onSelect: (day: Date) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  month: Date;
  events: CalendarEvent[];
  onSelect: (day: Date) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover.
- Text properties: `events`, `month`, `onSelect`.
- Instance swaps: Not found.
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1`, `mt-3`, `p-3` |
| Sizing | Not found |
| Typography | `capitalize`, `font-black`, `text-[11px]`, `text-brand-2`, `text-center`, `text-muted/45`, `text-sm` |
| Radius | `rounded-lg`, `rounded-md` |
| Borders/strokes | `border`, `border-brand-2/45`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.035]`, `bg-white/[0.055]`, `hover:bg-brand-2/16` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `aspect-square` | base | conditional or expression-derived |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-brand-2/45` | base | conditional or expression-derived |
| `border-line` | base | static occurrence |
| `capitalize` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `gap-1` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-cols-7` | base | static occurrence |
| `hover:bg-brand-2/16` | hover | conditional or expression-derived |
| `mt-3` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `rounded-lg` | base | static occurrence |
| `rounded-md` | base | conditional or expression-derived |
| `text-[11px]` | base | conditional or expression-derived |
| `text-brand-2` | base | conditional or expression-derived |
| `text-center` | base | static occurrence |
| `text-muted/45` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `transition` | base | conditional or expression-derived |

Exact className combinations:

- `bg-white/[0.055] hover:bg-brand-2/16`
- `border border-brand-2/45 text-brand-2`
- `grid aspect-square place-items-center rounded-md text-[11px] font-black transition`
- `mt-3 grid grid-cols-7 gap-1`
- `rounded-lg border border-line bg-white/[0.035] p-3`
- `text-center text-sm font-black capitalize`
- `text-muted/45`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "grid aspect-square place-items-center rounded-md text-[11px] font-black transition", isSameMonth(day, month) ? "bg-white/[0.055] hover:bg-brand-2/16" : "text-muted/45", count && "border border-brand-2/45 text-brand-2", )`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover.
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
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
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
