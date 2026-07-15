---
id: MWI-COMP-059
component: "TimelineCard"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1063-1098
figma_priority: 18
evidence: static_code
---

# TimelineCard

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-059`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1063.
- File range: lines 1063–1098.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-050 | [EventBannerImage](../components/components-admin-events-events-calendar-panel-eventbannerimage.md) (MWI-COMP-050) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-058 | [TimelineSection](../components/components-admin-events-events-calendar-panel-timelinesection.md) (MWI-COMP-058) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span>
  - <strong>
  - <span>
  - <span>
  - <span>
    - <img />
  - <EventBannerImage />

Unique HTML/React tags: `button`, `EventBannerImage`, `img`, `span`, `strong`.

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

- Boolean properties for Figma: Hover, Loading, Success.
- Text properties: `event`, `onOpen`.
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
| Literal colors | `#ffffff`, `rgba(0,0,0,.12)`, `rgba(2,6,23,.32)` |
| Spacing | `gap-1.5`, `mt-1`, `mt-2`, `mt-3`, `p-2`, `p-3`, `px-2`, `py-1` |
| Sizing | `h-9`, `max-h-36`, `w-9`, `w-full` |
| Typography | `font-black`, `font-bold`, `leading-tight`, `text-[11px]`, `text-emerald-200`, `text-left`, `text-lg`, `text-slate-300`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-md`, `rounded-xl` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | Not found |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `h-9` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `italic` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `max-h-36` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `px-2` | base | static occurrence |
| `py-1` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-md` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-emerald-200` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `w-9` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `group w-full overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5`
- `h-9 w-9 object-contain`
- `inline-flex rounded-md border px-2 py-1 text-[11px] font-black text-white`
- `mt-1 block text-xs font-bold italic text-emerald-200`
- `mt-2 block text-lg font-black leading-tight text-white`
- `mt-2 block text-sm font-bold text-slate-300`
- `mt-3 flex flex-wrap gap-1.5`
- `mt-3 max-h-36 w-full rounded-xl border border-white/10 object-contain p-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ borderColor: hexToRgba(type.color, 0.34), background: \`linear-gradient(135deg, ${hexToRgba(type.color, 0.10)}, rgba(2,6,23,.32))\`, boxShadow: \`inset 0 1px 0 ${hexToRgba("#ffffff", 0.08)}, 0 16px 44px rgba(0,0,0,.12)\`, }}`
- `{{ borderColor: hexToRgba(type.color, 0.48), backgroundColor: hexToRgba(type.color, 0.52) }}`

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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Success.
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
