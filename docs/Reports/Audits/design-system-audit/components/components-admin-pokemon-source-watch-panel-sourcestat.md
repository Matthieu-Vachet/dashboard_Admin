---
id: MWI-COMP-233
component: "SourceStat"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/source-watch-panel.tsx"
lines: 471-486
figma_priority: 18
evidence: static_code
---

# SourceStat

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/source-watch-panel.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-233`.
- Location: `Dashboard Admin/src/components/admin/pokemon/source-watch-panel.tsx`:471.
- File range: lines 471–486.
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
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-232 | [SourceRows](../components/components-admin-pokemon-source-watch-panel-sourcerows.md) (MWI-COMP-232) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <span>
  - <strong>

Unique HTML/React tags: `article`, `span`, `strong`.

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
{ label, value, tone }: { label: string; value: number; tone: "cyan" | "emerald" | "amber" | "red" | "sky" }
```

Exact local props contract when statically resolvable:

```tsx
{ label: string; value: number; tone: "cyan" | "emerald" | "amber" | "red" | "sky" }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| tone | amber | Explicit string literal in props contract |
| tone | cyan | Explicit string literal in props contract |
| tone | emerald | Explicit string literal in props contract |
| tone | red | Explicit string literal in props contract |
| tone | sky | Explicit string literal in props contract |

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
| Spacing | `mt-2`, `p-4` |
| Sizing | Not found |
| Typography | `font-black`, `text-2xl`, `text-amber-100/70`, `text-cyan-100/70`, `text-emerald-100/70`, `text-red-100/70`, `text-sky-100/70`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-300/15`, `border-cyan-300/15`, `border-emerald-300/15`, `border-red-300/15`, `border-sky-300/15` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-400/10`, `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-red-500/10`, `bg-sky-400/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/10` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-red-500/10` | base | static occurrence |
| `bg-sky-400/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/15` | base | static occurrence |
| `border-cyan-300/15` | base | static occurrence |
| `border-emerald-300/15` | base | static occurrence |
| `border-red-300/15` | base | static occurrence |
| `border-sky-300/15` | base | static occurrence |
| `font-black` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `rounded-2xl` | base | conditional or expression-derived |
| `text-2xl` | base | static occurrence |
| `text-amber-100/70` | base | static occurrence |
| `text-cyan-100/70` | base | static occurrence |
| `text-emerald-100/70` | base | static occurrence |
| `text-red-100/70` | base | static occurrence |
| `text-sky-100/70` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `border-amber-300/15 bg-amber-400/10 text-amber-100/70`
- `border-cyan-300/15 bg-cyan-400/10 text-cyan-100/70`
- `border-emerald-300/15 bg-emerald-400/10 text-emerald-100/70`
- `border-red-300/15 bg-red-500/10 text-red-100/70`
- `border-sky-300/15 bg-sky-400/10 text-sky-100/70`
- `mt-2 block text-2xl font-black text-white`
- `rounded-2xl border p-4`
- `text-xs font-black uppercase tracking-[0.18em]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`rounded-2xl border p-4 ${classes[tone]}\``

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
| □ | Variant: tone=emerald | Explicit props contract |
| □ | Variant: tone=red | Explicit props contract |
| □ | Variant: tone=sky | Explicit props contract |
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
