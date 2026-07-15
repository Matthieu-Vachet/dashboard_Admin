---
id: MWI-COMP-146
component: "TypeCatalogCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/catalog-panel.jsx"
lines: 76-147
figma_priority: 18
evidence: static_code
---

# TypeCatalogCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/catalog-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-146`.
- Location: `Dashboard Admin/src/components/admin/pokemon/catalog-panel.jsx`:76.
- File range: lines 76–147.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/pokemon-style | typeBackground, typeColors, typeIcon, typeName | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-145 | [TypeChip](../components/components-admin-pokemon-catalog-panel-typechip.md) (MWI-COMP-145) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-148 | [CatalogPanel](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) (MWI-COMP-148) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <div />
  - <div>
    - <div>
      - <span>
        - <img />
      - <span>
        - <span>
        - <strong>
        - <span>
    - <div>
      - <span>
      - <strong>
    - <div>
      - <section>
        - <h4>
        - <div>
          - <TypeChip />
          - <span>
      - <section>
        - <h4>
        - <div>
          - <TypeChip />
          - <TypeChip />
          - <span>
    - <section>
      - <h4>
      - <div>
        - <span>
          - <TypeChip />
          - <strong>

Unique HTML/React tags: `article`, `div`, `h4`, `img`, `section`, `span`, `strong`, `TypeChip`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| item | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |
| weatherCatalog | weatherCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ item, typeCatalog = [], weatherCatalog = [] }
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
- Text properties: `item`, `typeCatalog`, `weatherCatalog`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#38bdf8`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `color-mix(in srgb, ${color} 18%, rgba(15,23,42,.82)))`, `color-mix(in srgb, ${color} 34%, rgba(255,255,255,.12))`, `rgba(0,0,0,.22)`, `rgba(15,23,42,.64)`, `rgba(2,6,23,.82)`, `rgba(2,6,23,.9)`, `rgba(255,255,255,.1)`, `rgba(255,255,255,.12)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-1`, `mt-2`, `mt-3`, `mt-5`, `p-3`, `p-4`, `p-5`, `px-3`, `py-2` |
| Sizing | `h-[72px]`, `max-h-full`, `min-w-0`, `w-[72px]` |
| Typography | `font-black`, `font-bold`, `font-mono`, `text-3xl`, `text-cyan-100/70`, `text-cyan-100/78`, `text-emerald-100/78`, `text-red-100/78`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.18em]`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-white/10`, `border-white/12` |
| Shadows/elevation | `shadow-[0_20px_80px_rgba(0,0,0,.22)]`, `shadow-inner` |
| Opacity | `opacity-18` |
| Background | `bg-slate-950/45`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/12` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:26px_26px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/12` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-[72px]` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-18` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_20px_80px_rgba(0,0,0,.22)]` | base | static occurrence |
| `shadow-inner` | base | static occurrence |
| `sm:grid-cols-[72px_minmax(0,1fr)]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-cyan-100/70` | base | static occurrence |
| `text-cyan-100/78` | base | static occurrence |
| `text-emerald-100/78` | base | static occurrence |
| `text-red-100/78` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-[72px]` | base | static occurrence |
| `xl:grid-cols-2` | xl | static occurrence |

Exact className combinations:

- `absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:26px_26px]`
- `flex min-w-0 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2`
- `font-mono text-xs text-white`
- `grid gap-4 sm:grid-cols-[72px_minmax(0,1fr)]`
- `grid h-[72px] w-[72px] place-items-center rounded-3xl border border-white/12 bg-white/12 p-3 shadow-inner`
- `max-h-full object-contain`
- `min-w-0`
- `mt-1 block font-mono text-sm font-black uppercase text-slate-300`
- `mt-1 block text-3xl font-black text-white`
- `mt-2 block text-white`
- `mt-2 flex flex-wrap gap-2`
- `mt-3 grid gap-2 sm:grid-cols-2`
- `mt-5`
- `mt-5 grid gap-4 xl:grid-cols-2`
- `mt-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4`
- `relative overflow-hidden rounded-3xl border bg-slate-950/45 shadow-[0_20px_80px_rgba(0,0,0,.22)]`
- `relative p-5`
- `text-sm font-bold text-slate-400`
- `text-xs font-black uppercase tracking-[0.18em] text-cyan-100/78`
- `text-xs font-black uppercase tracking-[0.18em] text-emerald-100/78`
- `text-xs font-black uppercase tracking-[0.18em] text-red-100/78`
- `text-xs font-black uppercase tracking-[0.18em] text-slate-400`
- `text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ borderColor: \`color-mix(in srgb, ${color} 34%, rgba(255,255,255,.12))\`, backgroundImage: background ? \`linear-gradient(135deg, rgba(2,6,23,.82), rgba(15,23,42,.64)), url("${background}")\` : \`linear-gradient(135deg, rgba(2,6,23,.9), color-mix(in srgb, ${color} 18%, rgba(15,23,42,.82)))\`, backgroundSize: "cover", backgroundPosition: "center", }}`

### Referenced local/imported style declarations

```tsx
src/components/site/pokemon-style.js#typeBackground
export function typeBackground(type, catalog = []) {
  return catalogItem(catalog, type)?.assets?.background || null;
}
```

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

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-[72px_minmax(0,1fr)]`, `sm:grid-cols-2`, `xl:grid-cols-2`.
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
| □ | Responsive: sm | Tailwind sm: utilities |
| □ | Responsive: xl | Tailwind xl: utilities |

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
