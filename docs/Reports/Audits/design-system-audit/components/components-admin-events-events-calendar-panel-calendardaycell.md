---
id: MWI-COMP-054
component: "CalendarDayCell"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 921-961
figma_priority: 18
evidence: static_code
---

# CalendarDayCell

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-054`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:921.
- File range: lines 921–961.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | format, isSameMonth | external package |
| date-fns/locale | fr | external package |
| lucide-react | CalendarPlus | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-056 | [SingleDayEvent](../components/components-admin-events-events-calendar-panel-singledayevent.md) (MWI-COMP-056) | JSX/import relation |

Unresolved/external JSX tags: `CalendarPlus`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-053 | [CalendarWeek](../components/components-admin-events-events-calendar-panel-calendarweek.md) (MWI-COMP-053) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <div>
    - <button>
    - <button aria-label={`Ajouter un event le ${key}`}>
      - <CalendarPlus />
  - <div>
    - <SingleDayEvent />
    - <button>

Unique HTML/React tags: `article`, `button`, `CalendarPlus`, `div`, `SingleDayEvent`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`, `onOpen`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | Not found | See exact signature/contract below |
| cursor | Not found | See exact signature/contract below |
| day | Not found | See exact signature/contract below |
| events | Not found | See exact signature/contract below |
| laneCount | Not found | See exact signature/contract below |
| onCreate | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| onOpenDay | Not found | See exact signature/contract below |
| today | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ day, cursor, events, today, compact, laneCount, onOpen, onCreate, onOpenDay }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Hidden.
- Text properties: `compact`, `cursor`, `day`, `events`, `laneCount`, `onCreate`, `onOpen`, `onOpenDay`, `today`.
- Instance swaps: `CalendarPlus`.
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
| Hidden | Detected | hidden/invisible signal |
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
- Alignment utilities: `items-center, justify-between, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1`, `left-1.5`, `p-1.5`, `px-1`, `px-2`, `py-1`, `right-1.5`, `sm:p-2`, `space-y-2`, `top-1.5` |
| Sizing | `h-7`, `min-h-[166px]`, `min-w-0`, `min-w-7`, `sm:min-h-[188px]`, `w-7`, `w-full` |
| Typography | `font-black`, `hover:text-foreground`, `text-[10px]`, `text-brand-2`, `text-muted`, `text-slate-300`, `text-slate-950`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-r`, `border-white/10`, `last:border-r-0`, `ring-1`, `ring-cyan-300/55`, `ring-inset` |
| Shadows/elevation | Not found |
| Opacity | `opacity-55` |
| Background | `bg-brand-2`, `bg-cyan-300/10`, `bg-slate-950/45`, `bg-white/[0.035]`, `bg-white/[0.055]`, `hover:bg-brand-2/15`, `hover:bg-white/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-cyan-300/10` | base | conditional or expression-derived |
| `bg-slate-950/45` | base | conditional or expression-derived |
| `bg-white/[0.035]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-r` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `gap-1` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-7` | base | conditional or expression-derived |
| `hidden` | base | static occurrence |
| `hover:bg-brand-2/15` | hover | static occurrence |
| `hover:bg-white/10` | hover | conditional or expression-derived |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | static occurrence |
| `last:border-r-0` | last | conditional or expression-derived |
| `left-1.5` | base | static occurrence |
| `min-h-[166px]` | base | conditional or expression-derived |
| `min-w-0` | base | conditional or expression-derived |
| `min-w-7` | base | conditional or expression-derived |
| `opacity-55` | base | conditional or expression-derived |
| `p-1.5` | base | conditional or expression-derived |
| `place-items-center` | base | conditional or expression-derived |
| `px-1` | base | conditional or expression-derived |
| `px-2` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `right-1.5` | base | static occurrence |
| `ring-1` | base | conditional or expression-derived |
| `ring-cyan-300/55` | base | conditional or expression-derived |
| `ring-inset` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | static occurrence |
| `sm:grid` | sm | static occurrence |
| `sm:min-h-[188px]` | sm | conditional or expression-derived |
| `sm:p-2` | sm | conditional or expression-derived |
| `space-y-2` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-muted` | base | conditional or expression-derived |
| `text-slate-300` | base | static occurrence |
| `text-slate-950` | base | conditional or expression-derived |
| `text-xs` | base | conditional or expression-derived |
| `top-1.5` | base | static occurrence |
| `w-7` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |

Exact className combinations:

- `absolute left-1.5 right-1.5 top-1.5 flex items-center justify-between gap-1`
- `bg-brand-2 text-slate-950`
- `bg-cyan-300/10 ring-1 ring-inset ring-cyan-300/55`
- `bg-slate-950/45 opacity-55`
- `bg-white/[0.035]`
- `grid h-7 min-w-7 place-items-center rounded-full px-1 text-xs font-black`
- `hidden h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-brand-2 hover:bg-brand-2/15 sm:grid`
- `relative min-h-[166px] min-w-0 border-r border-white/10 p-1.5 last:border-r-0 sm:min-h-[188px] sm:p-2`
- `space-y-2`
- `text-muted hover:bg-white/10 hover:text-foreground`
- `w-full rounded-lg border border-white/10 bg-slate-950/45 px-2 py-1 text-[10px] font-black text-slate-300`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid h-7 min-w-7 place-items-center rounded-full px-1 text-xs font-black ${ today ? "bg-brand-2 text-slate-950" : "text-muted hover:bg-white/10 hover:text-foreground" }\``
- `\`relative min-h-[166px] min-w-0 border-r border-white/10 p-1.5 last:border-r-0 sm:min-h-[188px] sm:p-2 ${ isSameMonth(day, cursor) ? "bg-white/[0.035]" : "bg-slate-950/45 opacity-55" } ${today ? "bg-cyan-300/10 ring-1 ring-inset ring-cyan-300/55" : ""}\``

### CSS variables

Not found

### Inline style expressions

- `{{ paddingTop: \`${3.25 + laneCount * 1.7}rem\` }}`

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`, `last:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid`, `sm:min-h-[188px]`, `sm:p-2`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label={\`Ajouter un event le ${key}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CalendarPlus`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Hidden.
- Instance swaps: `CalendarPlus`.
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
| □ | Hidden | hidden/invisible signal |
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
