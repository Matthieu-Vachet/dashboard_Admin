---
id: MWI-COMP-157
component: "TypeBadge"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 187-199
figma_priority: 21
evidence: static_code
---

# TypeBadge

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-157`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:187.
- File range: lines 187–199.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **21/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/pokemon-style | typeColors, typeIcon, typeName | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-158 | [TypeBadgeList](../components/components-admin-pokemon-detail-modal-typebadgelist.md) (MWI-COMP-158) | Renders/imports this component |
| MWI-COMP-164 | [MoveTypePill](../components/components-admin-pokemon-detail-modal-movetypepill.md) (MWI-COMP-164) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <span>
  - <img />
  - <span>

Unique HTML/React tags: `img`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | compact = false | See exact signature/contract below |
| type | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ type, typeCatalog = [], compact = false }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `compact`, `type`, `typeCatalog`.
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

- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `color-mix(in srgb, ${typeColors[type] \|\| "#64748b"} 54%, rgba(2,6,23,.45))`, `rgba(0,0,0,.18)` |
| Spacing | `gap-2`, `px-2.5`, `px-3`, `py-1`, `py-1.5` |
| Sizing | `h-4`, `h-5`, `min-w-0`, `w-4`, `w-5` |
| Typography | `font-black`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-full` |
| Borders/strokes | `border`, `border-white/20` |
| Shadows/elevation | `shadow-[0_8px_22px_rgba(0,0,0,.18)]` |
| Opacity | Not found |
| Background | `bg-slate-950/35` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-slate-950/35` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-white/20` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `gap-2` | base | conditional or expression-derived |
| `h-4` | base | conditional or expression-derived |
| `h-5` | base | conditional or expression-derived |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `min-w-0` | base | conditional or expression-derived |
| `object-contain` | base | conditional or expression-derived |
| `px-2.5` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `py-1` | base | conditional or expression-derived |
| `py-1.5` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `shadow-[0_8px_22px_rgba(0,0,0,.18)]` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `text-sm` | base | conditional or expression-derived |
| `text-white` | base | conditional or expression-derived |
| `text-xs` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-4` | base | conditional or expression-derived |
| `w-5` | base | conditional or expression-derived |

Exact className combinations:

- `h-4 w-4 shrink-0 object-contain`
- `h-5 w-5 shrink-0 object-contain`
- `inline-flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 font-black text-white shadow-[0_8px_22px_rgba(0,0,0,.18)]`
- `px-2.5 py-1 text-xs`
- `px-3 py-1.5 text-sm`
- `truncate`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`inline-flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 font-black text-white shadow-[0_8px_22px_rgba(0,0,0,.18)] ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}\``
- `compact ? "h-4 w-4 shrink-0 object-contain" : "h-5 w-5 shrink-0 object-contain"`

### CSS variables

Not found

### Inline style expressions

- `{{ backgroundColor: \`color-mix(in srgb, ${typeColors[type] || "#64748b"} 54%, rgba(2,6,23,.45))\` }}`

### Referenced local/imported style declarations

```tsx
src/components/site/pokemon-style.js#typeColors
typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
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
