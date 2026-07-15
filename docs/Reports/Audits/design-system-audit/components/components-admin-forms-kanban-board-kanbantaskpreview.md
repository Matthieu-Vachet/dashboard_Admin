---
id: MWI-COMP-085
component: "KanbanTaskPreview"
category: "Form internal"
status: internal
source: "src/components/admin/forms/kanban-board.tsx"
lines: 754-772
figma_priority: 18
evidence: static_code
---

# KanbanTaskPreview

## 1. Purpose

Form internal component implemented in src/components/admin/forms/kanban-board.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-085`.
- Location: `Dashboard Admin/src/components/admin/forms/kanban-board.tsx`:754.
- File range: lines 754–772.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/data/personal-dashboard-defaults | Task | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-082 | [KanbanBoard](../components/components-admin-forms-kanban-board-kanbanboard.md) (MWI-COMP-082) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <span>
  - <h4>
  - <p>
  - <div>
    - <span>
    - <span>

Unique HTML/React tags: `article`, `div`, `h4`, `p`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| task | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ task }: { task: Task }
```

Exact local props contract when statically resolvable:

```tsx
{ task: Task }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Error, Warning, Success.
- Text properties: `task`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#101522`, `rgba(32,211,255,0.24)` |
| Spacing | `gap-3`, `mt-2`, `mt-4`, `mt-5`, `p-3`, `px-2`, `px-2.5`, `py-1` |
| Sizing | `h-8`, `min-h-7`, `w-[320px]`, `w-8` |
| Typography | `font-black`, `font-mono`, `font-semibold`, `leading-5`, `leading-6`, `text-amber-100`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/55`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | `shadow-[0_28px_90px_rgba(32,211,255,0.24)]` |
| Opacity | Not found |
| Background | `bg-[#101522]`, `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/10`, `bg-danger/10`, `bg-gradient-to-br`, `bg-warning/10`, `bg-white/[0.06]`, `from-brand`, `to-brand-2` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-[#101522]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-gradient-to-br` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/55` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-8` | base | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `line-clamp-2` | base | static occurrence |
| `min-h-7` | base | conditional or expression-derived |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2` | base | conditional or expression-derived |
| `px-2.5` | base | conditional or expression-derived |
| `py-1` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | static occurrence |
| `shadow-[0_28px_90px_rgba(32,211,255,0.24)]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-brand-2` | base | static occurrence |
| `w-[320px]` | base | static occurrence |
| `w-8` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/10 text-violet-100`
- `border-danger/35 bg-danger/10 text-rose-100`
- `border-warning/35 bg-warning/10 text-amber-100`
- `grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-xs font-black text-white`
- `inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black`
- `mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted`
- `mt-4 text-sm font-black leading-6`
- `mt-5 flex items-center justify-between gap-3`
- `rounded-full border border-line bg-white/[0.06] px-2 py-1 font-mono text-xs font-black text-muted`
- `w-[320px] rounded-lg border border-brand-2/55 bg-[#101522] p-3 shadow-[0_28px_90px_rgba(32,211,255,0.24)]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black", categoryStyles[task.category])`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/forms/kanban-board.tsx#categoryStyles
categoryStyles: Record<Category, string> = {
  Produit: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  Design: "border-brand/30 bg-brand/10 text-violet-100",
  API: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  Ops: "border-warning/35 bg-warning/10 text-amber-100",
  Urgent: "border-danger/35 bg-danger/10 text-rose-100",
}
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

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
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
