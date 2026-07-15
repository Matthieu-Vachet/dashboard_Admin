---
id: MWI-COMP-254
component: "FilterSelect"
category: "Internal component"
status: internal
source: "src/components/admin/tables/dashboard-backlog.tsx"
lines: 626-658
figma_priority: 23
evidence: static_code
---

# FilterSelect

## 1. Purpose

Internal component component implemented in src/components/admin/tables/dashboard-backlog.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-254`.
- Location: `Dashboard Admin/src/components/admin/tables/dashboard-backlog.tsx`:626.
- File range: lines 626–658.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **23/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <label>
  - <span>
  - <select>
    - <option>
    - <option>

Unique HTML/React tags: `label`, `option`, `select`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| includeAll | includeAll = true | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| labels | Not found | See exact signature/contract below |
| onChange | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |
| values | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  label,
  value,
  values,
  labels,
  includeAll = true,
  onChange,
}: {
  label: string;
  value: string;
  values: T[];
  labels?: Partial<Record<T | "all" | "recent" | "priority" | "status", string>>;
  includeAll?: boolean;
  onChange: (value: string) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  label: string;
  value: string;
  values: T[];
  labels?: Partial<Record<T | "all" | "recent" | "priority" | "status", string>>;
  includeAll?: boolean;
  onChange: (value: string) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| labels | all | Explicit string literal in props contract |
| labels | priority | Explicit string literal in props contract |
| labels | recent | Explicit string literal in props contract |
| labels | status | Explicit string literal in props contract |

- Boolean properties for Figma: Not found.
- Text properties: `includeAll`, `label`, `labels`, `onChange`, `value`, `values`.
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

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `px-3` |
| Sizing | `min-h-11`, `w-full` |
| Typography | `font-black`, `text-sm` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-line`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `font-black` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sr-only` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `sr-only`

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

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
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

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
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
| □ | Variant: labels=all | Explicit props contract |
| □ | Variant: labels=priority | Explicit props contract |
| □ | Variant: labels=recent | Explicit props contract |
| □ | Variant: labels=status | Explicit props contract |
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
