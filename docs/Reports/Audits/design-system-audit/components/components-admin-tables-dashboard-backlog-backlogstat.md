---
id: MWI-COMP-253
component: "BacklogStat"
category: "Internal component"
status: internal
source: "src/components/admin/tables/dashboard-backlog.tsx"
lines: 600-624
figma_priority: 23
evidence: static_code
---

# BacklogStat

## 1. Purpose

Internal component component implemented in src/components/admin/tables/dashboard-backlog.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-253`.
- Location: `Dashboard Admin/src/components/admin/tables/dashboard-backlog.tsx`:600.
- File range: lines 600–624.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **23/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/ui/card | Card | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Card>
  - <p>
  - <p>

Unique HTML/React tags: `Card`, `p`.

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
  value: number;
  tone: "cyan" | "green" | "amber" | "red";
}
```

Exact local props contract when statically resolvable:

```tsx
{
  label: string;
  value: number;
  tone: "cyan" | "green" | "amber" | "red";
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| tone | amber | Explicit string literal in props contract |
| tone | cyan | Explicit string literal in props contract |
| tone | green | Explicit string literal in props contract |
| tone | red | Explicit string literal in props contract |

- Boolean properties for Figma: Error, Warning, Success.
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
| Error | Detected | error/danger signal |
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
| Spacing | `mt-3`, `p-4`, `px-3`, `py-2` |
| Sizing | Not found |
| Typography | `font-black`, `font-mono`, `text-3xl`, `text-brand-2`, `text-brand-3`, `text-danger`, `text-muted`, `text-warning`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-danger/35`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-danger/10`, `bg-warning/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | conditional or expression-derived |
| `inline-flex` | base | conditional or expression-derived |
| `mt-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `py-2` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `text-3xl` | base | conditional or expression-derived |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-brand-2`
- `border-brand-3/30 bg-brand-3/10 text-brand-3`
- `border-danger/35 bg-danger/10 text-danger`
- `border-warning/35 bg-warning/10 text-warning`
- `mt-3 inline-flex rounded-lg border px-3 py-2 font-mono text-3xl font-black`
- `p-4`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("mt-3 inline-flex rounded-lg border px-3 py-2 font-mono text-3xl font-black", toneClass)`

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
- Animation libraries imported by file: Not found.
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
- Boolean properties: Error, Warning, Success.
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
| □ | Error | error/danger signal |
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
| □ | Variant: tone=red | Explicit props contract |
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
