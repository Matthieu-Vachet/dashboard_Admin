---
id: MWI-COMP-228
component: "Podium"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/shiny-tracker-panel.jsx"
lines: 148-169
figma_priority: 18
evidence: static_code
---

# Podium

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/shiny-tracker-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-228`.
- Location: `Dashboard Admin/src/components/admin/pokemon/shiny-tracker-panel.jsx`:148.
- File range: lines 148–169.
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
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section aria-label="Podium Shiny">
  - <button>
    - <span>
    - <img />
    - <strong>
    - <span>
    - <small>

Unique HTML/React tags: `button`, `img`, `section`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| board | Not found | See exact signature/contract below |
| entries | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entries, board, onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Empty.
- Text properties: `board`, `entries`, `onOpen`.
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
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-end, justify-end, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(0,0,0,.45)`, `rgba(251,191,36,.16)` |
| Spacing | `gap-3`, `mb-3`, `mt-2`, `mt-3`, `p-4`, `px-3`, `py-2`, `top-3` |
| Sizing | `h-24`, `h-9`, `min-h-[14rem]`, `sm:min-h-[16rem]`, `sm:min-h-[17rem]`, `sm:min-h-[19rem]`, `w-24`, `w-9` |
| Typography | `font-black`, `font-mono`, `text-amber-100`, `text-base`, `text-center`, `text-lg`, `text-slate-950`, `text-white` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-300/55`, `border-orange-300/35`, `border-slate-300/35`, `border-white/10` |
| Shadows/elevation | `drop-shadow-[0_18px_30px_rgba(0,0,0,.45)]`, `shadow-[0_20px_70px_rgba(251,191,36,.16)]` |
| Opacity | Not found |
| Background | `bg-amber-400`, `bg-black/25`, `bg-orange-400`, `bg-slate-300` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | conditional or expression-derived |
| `bg-amber-400` | base | conditional or expression-derived |
| `bg-black/25` | base | static occurrence |
| `bg-orange-400` | base | conditional or expression-derived |
| `bg-slate-300` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-amber-300/55` | base | static occurrence |
| `border-orange-300/35` | base | static occurrence |
| `border-slate-300/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `drop-shadow-[0_18px_30px_rgba(0,0,0,.45)]` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | conditional or expression-derived |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `h-24` | base | static occurrence |
| `h-9` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `items-end` | base | conditional or expression-derived |
| `justify-end` | base | conditional or expression-derived |
| `line-clamp-2` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `min-h-[14rem]` | base | conditional or expression-derived |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_20px_70px_rgba(251,191,36,.16)]` | base | static occurrence |
| `sm:grid-cols-2` | sm | conditional or expression-derived |
| `sm:grid-cols-3` | sm | conditional or expression-derived |
| `sm:min-h-[16rem]` | sm | static occurrence |
| `sm:min-h-[17rem]` | sm | static occurrence |
| `sm:min-h-[19rem]` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-center` | base | conditional or expression-derived |
| `text-lg` | base | static occurrence |
| `text-slate-950` | base | conditional or expression-derived |
| `text-white` | base | static occurrence |
| `top-3` | base | conditional or expression-derived |
| `w-24` | base | static occurrence |
| `w-9` | base | conditional or expression-derived |

Exact className combinations:

- `absolute top-3 grid h-9 w-9 place-items-center rounded-full font-mono font-black`
- `bg-amber-400 text-slate-950`
- `bg-orange-400 text-slate-950`
- `bg-slate-300 text-slate-950`
- `border-amber-300/55 shadow-[0_20px_70px_rgba(251,191,36,.16)] sm:min-h-[19rem]`
- `border-orange-300/35 sm:min-h-[16rem]`
- `border-slate-300/35 sm:min-h-[17rem]`
- `grid items-end gap-3`
- `line-clamp-2 text-base text-white`
- `mb-3 h-24 w-24 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,.45)]`
- `mt-2 font-mono font-black text-amber-100`
- `mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2 font-mono text-lg font-black text-white`
- `relative flex min-h-[14rem] flex-col items-center justify-end overflow-hidden rounded-2xl border p-4 text-center`
- `sm:grid-cols-2`
- `sm:grid-cols-3`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`absolute top-3 grid h-9 w-9 place-items-center rounded-full font-mono font-black ${place === 1 ? "bg-amber-400 text-slate-950" : place === 2 ? "bg-slate-300 text-slate-950" : "bg-orange-400 text-slate-950"}\``
- `\`grid items-end gap-3 ${entries.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}\``
- `\`relative flex min-h-[14rem] flex-col items-center justify-end overflow-hidden rounded-2xl border p-4 text-center ${tone}\``

### CSS variables

Not found

### Inline style expressions

- `{typeSurface(entry, 0.15)}`

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid-cols-2`, `sm:grid-cols-3`, `sm:min-h-[16rem]`, `sm:min-h-[17rem]`, `sm:min-h-[19rem]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Podium Shiny"`.
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

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Empty.
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
