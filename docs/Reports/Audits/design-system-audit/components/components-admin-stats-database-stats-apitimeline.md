---
id: MWI-COMP-243
component: "ApiTimeline"
category: "Analytics internal"
status: internal
source: "src/components/admin/stats/database-stats.tsx"
lines: 248-284
figma_priority: 18
evidence: static_code
---

# ApiTimeline

## 1. Purpose

Analytics internal component implemented in src/components/admin/stats/database-stats.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-243`.
- Location: `Dashboard Admin/src/components/admin/stats/database-stats.tsx`:248.
- File range: lines 248–284.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| framer-motion | motion | external package |
| lucide-react | BarChart3 | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `BarChart3`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-241 | [DatabaseStats](../components/components-admin-stats-database-stats-databasestats.md) (MWI-COMP-241) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <strong>
      - <BarChart3 />
    - <span>
  - <div>
    - <div>
      - <span>
        - <motion.span />
      - <span>
    - <p>

Unique HTML/React tags: `BarChart3`, `div`, `motion.span`, `p`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| items | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ items }: { items: Array<{ day: string; count: number }> }
```

Exact local props contract when statically resolvable:

```tsx
{ items: Array<{ day: string; count: number }> }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Empty.
- Text properties: `items`.
- Instance swaps: `BarChart3`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Not found | Not found |
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
| Empty | Detected | empty collection branch |
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-end, justify-between, self-stretch`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(32,211,255,.22)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `m-auto`, `mb-4`, `p-3`, `sm:gap-2`, `sm:p-4` |
| Sizing | `h-32`, `max-w-full`, `min-h-0`, `min-w-0`, `sm:h-40`, `w-full` |
| Typography | `font-black`, `font-semibold`, `sm:text-[10px]`, `text-[9px]`, `text-brand-2`, `text-muted`, `text-sm`, `text-xs` |
| Radius | `rounded-lg`, `rounded-t-lg` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(32,211,255,.22)]` |
| Opacity | Not found |
| Background | `bg-black/15`, `bg-gradient-to-t`, `from-brand`, `to-brand-3`, `via-brand-2` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `basis-0` | base | static occurrence |
| `bg-black/15` | base | static occurrence |
| `bg-gradient-to-t` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `h-32` | base | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-end` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `m-auto` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-h-0` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `rounded-t-lg` | base | static occurrence |
| `self-stretch` | base | static occurrence |
| `shadow-[0_0_22px_rgba(32,211,255,.22)]` | base | static occurrence |
| `sm:gap-2` | sm | static occurrence |
| `sm:h-40` | sm | static occurrence |
| `sm:p-4` | sm | static occurrence |
| `sm:text-[10px]` | sm | static occurrence |
| `text-[9px]` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-3` | base | static occurrence |
| `truncate` | base | static occurrence |
| `via-brand-2` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `block w-full rounded-t-lg bg-gradient-to-t from-brand via-brand-2 to-brand-3 shadow-[0_0_22px_rgba(32,211,255,.22)]`
- `flex h-32 items-end gap-1 sm:h-40 sm:gap-2`
- `flex min-h-0 w-full flex-1 items-end`
- `flex min-w-0 flex-1 basis-0 flex-col items-center gap-2 self-stretch`
- `inline-flex items-center gap-2 text-sm font-black`
- `m-auto text-sm font-semibold text-muted`
- `max-w-full truncate text-[9px] font-black text-muted sm:text-[10px]`
- `mb-4 flex items-center justify-between gap-3`
- `min-w-0 overflow-hidden rounded-lg border border-line bg-black/15 p-3 sm:p-4`
- `text-brand-2`
- `text-xs font-black text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:gap-2`, `sm:h-40`, `sm:p-4`, `sm:text-[10px]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `BarChart3`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Empty.
- Instance swaps: `BarChart3`.
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
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| — | Success | Not found |
| □ | Empty | empty collection branch |
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
