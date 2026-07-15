---
id: MWI-COMP-168
component: "PokemonMiniCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 576-599
figma_priority: 24
evidence: static_code
---

# PokemonMiniCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-168`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:576.
- File range: lines 576–599.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **24/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/pokemon-style | preferredPokemonImage | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Tag`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-169 | [CandyFamilyPanel](../components/components-admin-pokemon-detail-modal-candyfamilypanel.md) (MWI-COMP-169) | Renders/imports this component |
| MWI-COMP-170 | [EvolutionPanel](../components/components-admin-pokemon-detail-modal-evolutionpanel.md) (MWI-COMP-170) | Renders/imports this component |
| MWI-COMP-171 | [DetailNavigation](../components/components-admin-pokemon-detail-modal-detailnavigation.md) (MWI-COMP-171) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Tag>
  - <div>
    - <span>
      - <img />
    - <span>
      - <strong>
      - <small>
      - <span>

Unique HTML/React tags: `div`, `img`, `small`, `span`, `strong`, `Tag`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| direction | Not found | See exact signature/contract below |
| item | Not found | See exact signature/contract below |
| onClick | Not found | See exact signature/contract below |
| suffix | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ item, onClick, suffix, direction }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover.
- Text properties: `direction`, `item`, `onClick`, `suffix`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-3`, `mt-1`, `p-2`, `p-3` |
| Sizing | `h-14`, `max-h-full`, `min-w-0`, `w-14`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `sm:text-right`, `text-[11px]`, `text-cyan-100`, `text-left`, `text-slate-300`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-white/10`, `hover:border-cyan-200/45` |
| Shadows/elevation | `drop-shadow-xl` |
| Opacity | Not found |
| Background | `bg-slate-950/45`, `bg-white/10`, `hover:bg-cyan-400/10` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-slate-950/45` | base | conditional or expression-derived |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `drop-shadow-xl` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | static occurrence |
| `h-14` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | conditional or expression-derived |
| `hover:bg-cyan-400/10` | hover | conditional or expression-derived |
| `hover:border-cyan-200/45` | hover | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `sm:flex-row-reverse` | sm | conditional or expression-derived |
| `sm:text-right` | sm | conditional or expression-derived |
| `text-[11px]` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-14` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |

Exact className combinations:

- `block truncate text-sm font-black text-white`
- `flex items-center gap-3`
- `grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 p-2`
- `hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-cyan-400/10`
- `max-h-full object-contain drop-shadow-xl`
- `min-w-0`
- `mt-1 block text-xs font-black text-cyan-100`
- `mt-1 block truncate font-mono text-[11px] font-bold text-slate-300`
- `sm:flex-row-reverse sm:text-right`
- `w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`flex items-center gap-3 ${direction === "previous" ? "sm:flex-row-reverse sm:text-right" : ""}\``
- `\`w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left transition ${clickable ? "hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-cyan-400/10" : ""}\``

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

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:flex-row-reverse`, `sm:text-right`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
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

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover.
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
| □ | Hover | hover utility or mouse-enter handler |
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
