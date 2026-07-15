---
id: MWI-COMP-167
component: "MoveList"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 491-563
figma_priority: 18
evidence: static_code
---

# MoveList

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-167`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:491.
- File range: lines 491–563.
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
| MWI-COMP-156 | [Section](../components/components-admin-pokemon-detail-modal-section.md) (MWI-COMP-156) | JSX/import relation |
| MWI-COMP-161 | [EmptyInline](../components/components-admin-pokemon-detail-modal-emptyinline.md) (MWI-COMP-161) | JSX/import relation |
| MWI-COMP-164 | [MoveTypePill](../components/components-admin-pokemon-detail-modal-movetypepill.md) (MWI-COMP-164) | JSX/import relation |
| MWI-COMP-165 | [BuffGrid](../components/components-admin-pokemon-detail-modal-buffgrid.md) (MWI-COMP-165) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Section>
  - <div>
    - <div>
      - <div>
        - <span>
          - <strong>
          - <small>
        - <span>
          - <span>
          - <MoveTypePill />
      - <div>
        - <span>
          - <small>
          - <strong>
      - <BuffGrid />
      - <div>
        - <span>
        - <div>
          - <span>
            - <small>
            - <strong>
  - <EmptyInline>

Unique HTML/React tags: `BuffGrid`, `div`, `EmptyInline`, `MoveTypePill`, `Section`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| icon | Not found | See exact signature/contract below |
| moves | Not found | See exact signature/contract below |
| pokemonTypes | pokemonTypes = [] | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title, moves, typeCatalog = [], icon, pokemonTypes = [] }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Warning, Success, Empty.
- Text properties: `icon`, `moves`, `pokemonTypes`, `title`, `typeCatalog`.
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
| Warning | Detected | warning/amber/yellow signal |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-end`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.89)`, `rgba(2,6,23,.93)`, `rgba(248,250,252,.82)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.9)` |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-2`, `mt-3`, `p-3`, `p-4`, `px-3`, `py-1`, `py-2` |
| Sizing | `min-w-0` |
| Typography | `break-words`, `font-black`, `font-mono`, `text-[10px]`, `text-amber-50`, `text-base`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-200/20`, `border-amber-200/40`, `border-cyan-200/20`, `border-emerald-200/20`, `border-rose-200/20`, `border-violet-200/20`, `border-white/10`, `hover:border-cyan-200/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-300/18`, `bg-amber-400/10`, `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-rose-400/10`, `bg-slate-950/35`, `bg-slate-950/45`, `bg-violet-400/10`, `bg-white/[0.04]`, `from-amber-400/15`, `from-cyan-400/15`, `from-emerald-400/15`, `from-rose-400/15`, `from-violet-400/15`, `hover:bg-cyan-400/10` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-300/18` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-rose-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-amber-200/40` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-amber-400/15` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `hover:bg-cyan-400/10` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `lg:grid-cols-4` | lg | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `block break-words text-base font-black text-white`
- `block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `flex flex-wrap items-center justify-end gap-2`
- `flex flex-wrap items-start justify-between gap-3`
- `grid gap-3`
- `min-w-0`
- `min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2`
- `mt-1 block break-words text-white`
- `mt-1 block break-words text-xs text-white`
- `mt-1 block font-mono text-xs text-slate-500`
- `mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3`
- `mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4`
- `mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3`
- `rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm transition hover:border-cyan-200/35 hover:bg-cyan-400/10`
- `rounded-full border border-amber-200/40 bg-amber-300/18 px-3 py-1 text-xs font-black text-amber-50`
- `rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardBackground
function catchCardBackground(type) {
  const name = typeBackgroundNames[String(type || "").toUpperCase()];
  return name ? `/ui/backgrounds/catchCards/CatchCard_TypeBG_${name}.png` : "";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardStyle
function catchCardStyle(index = 0, preferredType = "NORMAL", opacity = "dark") {
  const background = catchCardForIndex(index, preferredType);
  const overlay =
    opacity === "soft"
      ? "linear-gradient(135deg, rgba(255,255,255,.9), rgba(248,250,252,.82)), linear-gradient(180deg, rgba(15,23,42,.18), rgba(15,23,42,.24))"
      : "linear-gradient(135deg, rgba(2,6,23,.93), rgba(15,23,42,.89)), linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))";
  return {
    backgroundImage: background ? `${overlay}, url("${background}")` : overlay,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#sectionTones
sectionTones = {
  cyan: "border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15",
  emerald: "border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15",
  violet: "border-violet-200/20 bg-violet-400/10 from-violet-400/15",
  amber: "border-amber-200/20 bg-amber-400/10 from-amber-400/15",
  rose: "border-rose-200/20 bg-rose-400/10 from-rose-400/15",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typeBackgroundNames
typeBackgroundNames = {
  BUG: "Bug",
  DARK: "Dark",
  DRAGON: "Dragon",
  ELECTRIC: "Electric",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  FIRE: "Fire",
  FLYING: "Flying",
  GHOST: "Ghost",
  GRASS: "Grass",
  GROUND: "Ground",
  ICE: "Ice",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  ROCK: "Rock",
  STEEL: "Steel",
  WATER: "Water",
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

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-3`, `lg:grid-cols-4`, `sm:grid-cols-2`.
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
- Boolean properties: Hover, Warning, Success, Empty.
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
| □ | Warning | warning/amber/yellow signal |
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
| □ | Responsive: lg | Tailwind lg: utilities |
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
