---
id: MWI-COMP-037
component: "KanbanBars"
category: "Dashboard internal"
status: internal
source: "src/components/admin/dashboard/dashboard-home-live.tsx"
lines: 568-599
figma_priority: 18
evidence: static_code
---

# KanbanBars

## 1. Purpose

Dashboard internal component implemented in src/components/admin/dashboard/dashboard-home-live.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-037`.
- Location: `Dashboard Admin/src/components/admin/dashboard/dashboard-home-live.tsx`:568.
- File range: lines 568–599.
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
| MWI-COMP-040 | [EmptyLine](../components/components-admin-dashboard-dashboard-home-live-emptyline.md) (MWI-COMP-040) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <EmptyLine>
- <div>
  - <div>
    - <div>
      - <span>
      - <span>
    - <span>
      - <span />

Unique HTML/React tags: `div`, `EmptyLine`, `span`.

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
{ items }: { items: Array<{ name: string; count: number }> }
```

Exact local props contract when statically resolvable:

```tsx
{ items: Array<{ name: string; count: number }> }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Empty.
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
- Alignment utilities: `items-center, justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#20d3ff`, `#58f2a9`, `#905bf4`, `#ff5f7d`, `#ffd166` |
| Spacing | `gap-3`, `mb-2`, `p-3`, `space-y-3` |
| Sizing | `h-2`, `h-full` |
| Typography | `font-black`, `font-mono`, `text-foreground`, `text-muted`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.045]`, `bg-white/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `h-2` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `truncate` | base | static occurrence |

Exact className combinations:

- `block h-2 overflow-hidden rounded-full bg-white/10`
- `block h-full rounded-full`
- `font-mono text-muted`
- `mb-2 flex items-center justify-between gap-3 text-xs font-black`
- `rounded-lg border border-line bg-white/[0.045] p-3`
- `space-y-3`
- `truncate text-foreground`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ width: \`${width}%\`, background: chartColors[index % chartColors.length], }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/dashboard/dashboard-home-live.tsx#chartColors
chartColors = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166", "#ff5f7d"]
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
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
- Boolean properties: Empty.
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
