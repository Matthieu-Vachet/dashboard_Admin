---
id: MWI-COMP-147
component: "AdminMoveCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/catalog-panel.jsx"
lines: 149-273
figma_priority: 18
evidence: static_code
---

# AdminMoveCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/catalog-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-147`.
- Location: `Dashboard Admin/src/components/admin/pokemon/catalog-panel.jsx`:149.
- File range: lines 149–273.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| lucide-react | ChevronDown | icons |
| @/components/site/pokemon-style | typeColors, typeIcon, typeName | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `ChevronDown`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-148 | [CatalogPanel](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) (MWI-COMP-148) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <button>
    - <span>
      - <strong>
      - <small>
    - <span>
      - <img />
    - <span>
      - <ChevronDown />
  - <div>
    - <div>
      - <div>
        - <span>
        - <strong>
    - <div>
      - <span>
      - <div>
        - <span>
    - <div>
      - <span>
      - <div>
        - <span>
      - <p>
    - <div>
      - <div>
        - <span>
        - <span>
      - <div>
        - <button>
          - <img />
          - <span>
          - <small>
      - <p>

Unique HTML/React tags: `article`, `button`, `ChevronDown`, `div`, `img`, `p`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `open = false`.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| move | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ move, typeCatalog = [], onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Empty, Expanded, Scrollable.
- Text properties: `move`, `onOpen`, `typeCatalog`.
- Instance swaps: `ChevronDown`.
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
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, justify-end`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `color-mix(in srgb, ${typeColors[type] \|\| "#64748b"} 52%, rgba(255,255,255,.12))`, `rgba(15,23,42,.76)`, `rgba(15,23,42,.86)`, `rgba(2,6,23,.78)`, `rgba(2,6,23,.86)` |
| Spacing | `gap-2`, `gap-3`, `mb-3`, `mt-1`, `mt-2`, `mt-3`, `p-3`, `p-4`, `pr-1`, `px-2`, `px-2.5`, `px-3`, `py-0.5`, `py-1`, `py-1.5`, `py-2` |
| Sizing | `h-4`, `h-7`, `max-h-72`, `max-w-[12rem]`, `min-w-0`, `w-4`, `w-7`, `w-fit`, `w-full` |
| Typography | `break-words`, `font-black`, `font-bold`, `font-mono`, `text-[10px]`, `text-base`, `text-cyan-100`, `text-cyan-50`, `text-left`, `text-slate-100`, `text-slate-200`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.12em]`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/20`, `border-t`, `border-white/10`, `hover:border-cyan-200/45` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-center`, `bg-cover`, `bg-cyan-400/10`, `bg-slate-950/35`, `bg-slate-950/40`, `bg-slate-950/45`, `bg-white/[0.06]`, `bg-white/[0.065]`, `hover:bg-cyan-400/15` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-center` | base | static occurrence |
| `bg-cover` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.065]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-4` | base | static occurrence |
| `h-7` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/45` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `max-h-72` | base | static occurrence |
| `max-w-[12rem]` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pr-1` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-0.5` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rotate-180` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-[minmax(0,1fr)_auto_auto]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-4` | base | static occurrence |
| `w-7` | base | static occurrence |
| `w-fit` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |
| `xl:grid-cols-5` | xl | static occurrence |

Exact className combinations:

- `block text-xs font-black uppercase tracking-[0.16em] text-slate-500`
- `block truncate text-base font-black text-white`
- `border-t border-white/10 p-4`
- `flex max-h-72 flex-wrap gap-2 overflow-auto pr-1`
- `grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4`
- `grid w-full gap-3 p-4 text-left sm:grid-cols-[minmax(0,1fr)_auto_auto]`
- `h-4 w-4 shrink-0 object-contain`
- `h-7 w-7 object-contain`
- `inline-flex items-center justify-end gap-2 text-xs font-black text-cyan-100`
- `inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-2.5 py-1.5 text-xs font-black text-slate-100 transition hover:border-cyan-200/45 hover:bg-cyan-400/15`
- `inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white`
- `max-w-[12rem] truncate`
- `mb-3 flex flex-wrap items-center justify-between gap-2`
- `min-w-0`
- `mt-1 block break-words text-white`
- `mt-1 block truncate font-mono text-xs font-bold text-slate-400`
- `mt-2 flex flex-wrap gap-2`
- `mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-5`
- `mt-2 text-sm font-bold text-slate-400`
- `mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3`
- `overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center`
- `rotate-180 transition`
- `rounded-2xl border border-white/10 bg-slate-950/45 p-3`
- `rounded-full bg-slate-950/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]`
- `rounded-full border border-cyan-200/20 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-50`
- `rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200`
- `rounded-xl bg-white/[0.06] px-3 py-2 text-sm font-bold text-white`
- `text-sm font-bold text-slate-400`
- `transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `open ? "rotate-180 transition" : "transition"`

### CSS variables

Not found

### Inline style expressions

- `{{ background: \`color-mix(in srgb, ${typeColors[type] || "#64748b"} 52%, rgba(255,255,255,.12))\` }}`
- `{{ backgroundImage: typePanelBackground(type, typeCatalog) }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/catalog-panel.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.86), rgba(15,23,42,.76)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.86), rgba(2,6,23,.78))";
}
```

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

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-[minmax(0,1fr)_auto_auto]`, `sm:grid-cols-2`, `xl:grid-cols-4`, `xl:grid-cols-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
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

- Lucide icons: `ChevronDown`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Empty, Expanded, Scrollable.
- Instance swaps: `ChevronDown`.
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
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
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
