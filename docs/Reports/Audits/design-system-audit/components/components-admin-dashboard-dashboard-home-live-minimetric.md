---
id: MWI-COMP-035
component: "MiniMetric"
category: "Dashboard internal"
status: internal
source: "src/components/admin/dashboard/dashboard-home-live.tsx"
lines: 511-534
figma_priority: 18
evidence: static_code
---

# MiniMetric

## 1. Purpose

Dashboard internal component implemented in src/components/admin/dashboard/dashboard-home-live.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-035`.
- Location: `Dashboard Admin/src/components/admin/dashboard/dashboard-home-live.tsx`:511.
- File range: lines 511–534.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <p>
  - <p>

Unique HTML/React tags: `div`, `p`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| label | Not found | See exact signature/contract below |
| tone | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: "cyan" | "green" | "violet" | "amber";
}
```

Exact local props contract when statically resolvable:

```tsx
{
  label: string;
  value: number | string;
  tone: "cyan" | "green" | "violet" | "amber";
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| tone | amber | Explicit string literal in props contract |
| tone | cyan | Explicit string literal in props contract |
| tone | green | Explicit string literal in props contract |
| tone | violet | Explicit string literal in props contract |

- Boolean properties for Figma: Warning, Success.
- Text properties: `label`, `tone`, `value`.
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `mt-2`, `p-3` |
| Sizing | Not found |
| Typography | `font-black`, `font-mono`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-warning`, `text-xl`, `text-xs`, `tracking-[0.14em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/20`, `border-brand-3/20`, `border-brand/20`, `border-warning/20` |
| Shadows/elevation | Not found |
| Opacity | `opacity-75` |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/10`, `bg-warning/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/20` | base | static occurrence |
| `border-brand-3/20` | base | static occurrence |
| `border-brand/20` | base | static occurrence |
| `border-warning/20` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `opacity-75` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `mt-2 font-mono text-xl font-black`
- `rounded-lg border p-3`
- `text-brand bg-brand/10 border-brand/20`
- `text-brand-2 bg-brand-2/10 border-brand-2/20`
- `text-brand-3 bg-brand-3/10 border-brand-3/20`
- `text-warning bg-warning/10 border-warning/20`
- `text-xs font-black uppercase tracking-[0.14em] opacity-75`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("rounded-lg border p-3", color)`

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

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success.
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
| □ | Variant: tone=amber | Explicit props contract |
| □ | Variant: tone=cyan | Explicit props contract |
| □ | Variant: tone=green | Explicit props contract |
| □ | Variant: tone=violet | Explicit props contract |
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
