---
id: MWI-COMP-148
component: "CatalogPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/catalog-panel.jsx"
lines: 275-406
figma_priority: 34
evidence: static_code
---

# CatalogPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/catalog-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-148`.
- Location: `Dashboard Admin/src/components/admin/pokemon/catalog-panel.jsx`:275.
- File range: lines 275–406.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| ./admin-ui | fieldClass, Panel | internal |
| @/components/site/pokemon-style | typeName | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-146 | [TypeCatalogCard](../components/components-admin-pokemon-catalog-panel-typecatalogcard.md) (MWI-COMP-146) | JSX/import relation |
| MWI-COMP-147 | [AdminMoveCard](../components/components-admin-pokemon-catalog-panel-adminmovecard.md) (MWI-COMP-147) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-302 | [CatalogPanel](../components/components-pokemon-admin-catalog-panel-catalogpanel.md) (MWI-COMP-302) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <label>
    - <span>
    - <input />
  - <div>
    - <AdminMoveCard />
  - <div>
    - <TypeCatalogCard />
  - <div>
    - <article>
      - <div>
        - <img />
        - <span />
      - <div>
        - <strong>
        - <span>
        - <div>
          - <span>
  - <p>

Unique HTML/React tags: `AdminMoveCard`, `article`, `button`, `div`, `img`, `input`, `label`, `p`, `Panel`, `span`, `strong`, `TypeCatalogCard`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `catalogSearch = ""`, `tab = "moves"`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onOpen`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| catalog | catalog = {} | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ catalog = {}, onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Empty, Scrollable.
- Text properties: `catalog`, `onOpen`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
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
| Expanded | Not found | Not found |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(0,0,0,.24)`, `rgba(15,23,42,.76)`, `rgba(15,23,42,.86)`, `rgba(2,6,23,.45)`, `rgba(2,6,23,.7)`, `rgba(2,6,23,.78)`, `rgba(2,6,23,.86)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-4`, `mb-2`, `mb-4`, `mt-1`, `mt-2`, `mt-4`, `p-3`, `p-4`, `pb-1`, `px-2`, `px-4`, `py-1`, `py-2`, `sm:p-5` |
| Sizing | `h-10`, `max-h-full`, `max-w-full`, `min-h-12`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `placeholder:text-slate-500`, `text-[10px]`, `text-cyan-50`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-cyan-200/40`, `border-dashed`, `border-t`, `border-white/10`, `border-white/15`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `outline-none` |
| Shadows/elevation | `drop-shadow-2xl`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-cyan-400/20`, `bg-slate-950/40`, `bg-slate-950/45`, `bg-white/[0.04]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/10`, `hover:bg-white/10` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `aspect-[4/3]` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-cyan-400/20` | base | conditional or expression-derived |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | conditional or expression-derived |
| `bg-white/10` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/40` | base | conditional or expression-derived |
| `border-dashed` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/15` | base | static occurrence |
| `drop-shadow-2xl` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-white/10` | hover | conditional or expression-derived |
| `lg:grid-cols-3` | lg | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-x-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pb-1` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-2` | base | static occurrence |
| `px-4` | base | conditional or expression-derived |
| `py-1` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shrink-0` | base | conditional or expression-derived |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-cyan-50` | base | conditional or expression-derived |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-2` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `-`
- `block truncate text-sm font-black text-white`
- `border-cyan-200/40 bg-cyan-400/20 text-cyan-50`
- `border-t border-white/10 p-3`
- `border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/10`
- `flex max-w-full gap-2 overflow-x-auto pb-1`
- `grid aspect-[4/3] place-items-center bg-white/[0.04] p-4`
- `grid gap-3`
- `grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `grid gap-4 xl:grid-cols-2`
- `h-10 w-10 rounded-full bg-white/10`
- `max-h-full object-contain drop-shadow-2xl`
- `mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500`
- `mb-4 block`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `mt-2 flex flex-wrap gap-1`
- `mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-slate-200`
- `shrink-0 rounded-full border px-4 py-2 text-sm font-black transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${ tab === value ? "border-cyan-200/40 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/10" }\``
- `fieldClass`

### CSS variables

Not found

### Inline style expressions

- `{{ backgroundImage: item.assets?.background ? \`linear-gradient(135deg, rgba(2,6,23,.45), rgba(2,6,23,.7)), url("${item.assets.background}")\` : undefined, backgroundSize: "cover", }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

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

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`, `xl`.
- Responsive utilities: `lg:grid-cols-3`, `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-2`, `xl:grid-cols-4`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Empty, Scrollable.
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
| □ | Focused | focus styling or handler |
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
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
| □ | Responsive: lg | Tailwind lg: utilities |
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
