---
id: MWI-COMP-244
component: "EndpointBars"
category: "Analytics internal"
status: internal
source: "src/components/admin/stats/database-stats.tsx"
lines: 287-322
figma_priority: 18
evidence: static_code
---

# EndpointBars

## 1. Purpose

Analytics internal component implemented in src/components/admin/stats/database-stats.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-244`.
- Location: `Dashboard Admin/src/components/admin/stats/database-stats.tsx`:287.
- File range: lines 287–322.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| framer-motion | motion | external package |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-241 | [DatabaseStats](../components/components-admin-stats-database-stats-databasestats.md) (MWI-COMP-241) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <strong>
    - <span>
  - <div>
    - <div>
      - <div>
        - <span>
        - <span>
      - <span>
        - <motion.span />
    - <p>

Unique HTML/React tags: `div`, `motion.span`, `p`, `span`, `strong`.

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
{ items }: { items: Array<{ endpoint: string; count: number }> }
```

Exact local props contract when statically resolvable:

```tsx
{ items: Array<{ endpoint: string; count: number }> }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `items`.
- Instance swaps: Not found.
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- Alignment utilities: `items-center, items-start, justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-3`, `mb-1`, `mb-4`, `p-3`, `p-4`, `sm:p-4`, `space-y-3` |
| Sizing | `h-2.5`, `h-full`, `min-w-0` |
| Typography | `break-all`, `font-black`, `font-mono`, `font-semibold`, `leading-5`, `text-muted`, `text-sm`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-dashed`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/15`, `bg-gradient-to-r`, `bg-white/10`, `from-brand-2`, `to-brand-3`, `via-brand` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/15` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-line` | base | static occurrence |
| `break-all` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `h-2.5` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:p-4` | sm | static occurrence |
| `sm:truncate` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-3` | base | static occurrence |
| `via-brand` | base | static occurrence |

Exact className combinations:

- `block h-2.5 overflow-hidden rounded-full bg-white/10`
- `block h-full rounded-full bg-gradient-to-r from-brand-2 via-brand to-brand-3`
- `font-mono text-xs font-black text-muted`
- `mb-1 flex min-w-0 items-start justify-between gap-3`
- `mb-4 flex items-center justify-between gap-3`
- `min-w-0`
- `min-w-0 break-all text-xs font-black leading-5 sm:truncate`
- `min-w-0 overflow-hidden rounded-lg border border-line bg-black/15 p-3 sm:p-4`
- `rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted`
- `space-y-3`
- `text-sm font-black`
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
- Responsive utilities: `sm:p-4`, `sm:truncate`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Not found.
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
