---
id: MWI-COMP-060
component: "EventRow"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1100-1127
figma_priority: 18
evidence: static_code
---

# EventRow

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-060`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1100.
- File range: lines 1100–1127.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | CalendarDays | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `CalendarDays`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-057 | [EventGroup](../components/components-admin-events-events-calendar-panel-eventgroup.md) (MWI-COMP-057) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span>
    - <img />
    - <CalendarDays />
  - <span>
    - <span>
      - <strong>
      - <small>
    - <small>
    - <small>

Unique HTML/React tags: `button`, `CalendarDays`, `img`, `small`, `span`, `strong`.

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

Exact parameter signature:

```tsx
{ event, onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading.
- Text properties: `event`, `onOpen`.
- Instance swaps: `CalendarDays`.
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
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(2,6,23,.42)` |
| Spacing | `gap-2`, `gap-3`, `mb-1`, `mt-1`, `p-3`, `px-2`, `py-0.5` |
| Sizing | `h-12`, `max-h-8`, `max-w-8`, `min-w-0`, `w-12`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `text-[10px]`, `text-left`, `text-slate-300`, `text-slate-500`, `text-slate-950`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-slate-950/45` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-slate-950/45` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[3rem_minmax(0,1fr)]` | base | static occurrence |
| `h-12` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `max-h-8` | base | static occurrence |
| `max-w-8` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2` | base | static occurrence |
| `py-0.5` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-slate-950` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-12` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `block truncate text-xs font-bold text-slate-300`
- `grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/45`
- `group grid w-full grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5`
- `max-h-8 max-w-8 object-contain`
- `mb-1 flex flex-wrap items-center gap-2`
- `min-w-0`
- `min-w-0 truncate text-sm font-black text-white`
- `mt-1 block truncate text-xs font-semibold text-slate-500`
- `rounded-full px-2 py-0.5 text-[10px] font-black text-slate-950`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ backgroundColor: type.color }}`
- `{{ borderColor: hexToRgba(type.color, 0.30), background: \`linear-gradient(135deg, ${hexToRgba(type.color, 0.10)}, rgba(2,6,23,.42))\`, }}`

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

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
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

- Lucide icons: `CalendarDays`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading.
- Instance swaps: `CalendarDays`.
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
