---
id: MWI-COMP-056
component: "SingleDayEvent"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 986-1013
figma_priority: 18
evidence: static_code
---

# SingleDayEvent

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-056`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:986.
- File range: lines 986–1013.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | format | external package |
| date-fns/locale | fr | external package |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-054 | [CalendarDayCell](../components/components-admin-events-events-calendar-panel-calendardaycell.md) (MWI-COMP-054) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span>
  - <span>
    - <span />
  - <span>
    - <img />

Unique HTML/React tags: `button`, `img`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | Not found | See exact signature/contract below |
| event | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ event, onOpen, compact }
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
- Text properties: `compact`, `event`, `onOpen`.
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
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(2,6,23,.18)` |
| Spacing | `gap-1`, `mt-0.5`, `mt-1.5`, `p-1.5` |
| Sizing | `h-2`, `h-8`, `min-w-0`, `sm:h-10`, `sm:w-10`, `w-2`, `w-8`, `w-full` |
| Typography | `font-black`, `font-bold`, `text-[11px]`, `text-left`, `text-slate-300`, `text-white`, `text-xs` |
| Radius | `rounded-full`, `rounded-xl` |
| Borders/strokes | `border` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `hover:bg-white/10` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `h-2` | base | static occurrence |
| `h-8` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:bg-white/10` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-0.5` | base | static occurrence |
| `mt-1.5` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-1.5` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `sm:h-10` | sm | static occurrence |
| `sm:w-10` | sm | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-2` | base | static occurrence |
| `w-8` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `block min-w-0 truncate text-xs font-black text-white`
- `h-2 w-2 rounded-full`
- `h-8 w-8 object-contain sm:h-10 sm:w-10`
- `mt-0.5 flex items-center gap-1 text-[11px] font-bold text-slate-300`
- `mt-1.5 flex flex-wrap items-center gap-1`
- `w-full min-w-0 rounded-xl border p-1.5 text-left transition hover:-translate-y-0.5 hover:bg-white/10`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ backgroundColor: type.color }}`
- `{{ borderColor: hexToRgba(type.color, 0.22), background: \`linear-gradient(135deg, ${hexToRgba(type.color, 0.08)}, rgba(2,6,23,.18))\`, }}`

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:h-10`, `sm:w-10`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading.
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
