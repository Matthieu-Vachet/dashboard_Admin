---
id: MWI-COMP-135
component: "CompletionList"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 196-227
figma_priority: 34
evidence: static_code
---

# CompletionList

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-135`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:196.
- File range: lines 196–227.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

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
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-292 | [CompletionList](../components/components-pokemon-admin-admin-ui-completionlist.md) (MWI-COMP-292) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <span>
    - <span>
      - <i />
    - <strong>
    - <span>
  - <p>

Unique HTML/React tags: `div`, `i`, `p`, `span`, `strong`.

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
{ items }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Success, Empty.
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
| Success | Detected | success/green signal |
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

- CSS Grid layout is present.
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-3`, `p-4`, `space-y-3` |
| Sizing | `h-3`, `h-full` |
| Typography | `font-black`, `font-bold`, `text-right`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-dashed`, `border-white/15` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-gradient-to-r`, `bg-white/10`, `from-emerald-300`, `to-sky-500`, `via-cyan-400` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-gradient-to-r` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `col-start-2` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-emerald-300` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[5.5rem_1fr_4.6rem]` | base | static occurrence |
| `h-3` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-4` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-right` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-sky-500` | base | static occurrence |
| `truncate` | base | static occurrence |
| `via-cyan-400` | base | static occurrence |

Exact className combinations:

- `block h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-400 to-sky-500`
- `col-start-2 text-xs font-bold text-slate-500`
- `grid grid-cols-[5.5rem_1fr_4.6rem] items-center gap-3 text-sm`
- `h-3 overflow-hidden rounded-full bg-white/10`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `space-y-3`
- `text-right font-black text-white`
- `truncate font-bold text-slate-300`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ width: \`${Math.min(100, percent)}%\` }}`

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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Success, Empty.
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
| □ | Success | success/green signal |
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
