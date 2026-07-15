---
id: MWI-COMP-206
component: "PvpRankingsPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pvp-rankings-panel.jsx"
lines: 116-137
figma_priority: 31
evidence: static_code
---

# PvpRankingsPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pvp-rankings-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-206`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pvp-rankings-panel.jsx`:116.
- File range: lines 116–137.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ChevronDown, Download, RefreshCcw, RotateCcw, Shield, Swords | icons |
| react | useState | external package |
| ./asset-icons | TypeIcons | internal |
| ./admin-ui | buttonClass, fieldClass, Panel, primaryButtonClass | internal |
| ./dataset-source-header | DatasetSourceHeader | internal |
| ./dataset-filter-bar | DatasetFilterBar | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |
| MWI-COMP-154 | [DatasetFilterBar](../components/components-admin-pokemon-dataset-filter-bar-datasetfilterbar.md) (MWI-COMP-154) | JSX/import relation |
| MWI-COMP-155 | [DatasetSourceHeader](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) (MWI-COMP-155) | JSX/import relation |
| MWI-COMP-204 | [PvpDetail](../components/components-admin-pokemon-pvp-rankings-panel-pvpdetail.md) (MWI-COMP-204) | JSX/import relation |
| MWI-COMP-205 | [FormatSelect](../components/components-admin-pokemon-pvp-rankings-panel-formatselect.md) (MWI-COMP-205) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`, `Download`, `RefreshCcw`, `RotateCcw`, `Shield`, `Swords`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Panel>
    - <DatasetSourceHeader />
  - <DatasetFilterBar />
  - <div>
    - <FormatSelect />
    - <select aria-label="Classement">
      - <option>
  - <section aria-label="Classement PvP">
    - <article>
      - <button aria-expanded={isOpen}>
        - <span>
          - <ChevronDown />
        - <span>
          - <img />
          - <span>
        - <span>
          - <strong>
          - <span>
            - <TypeIcons />
            - <small>
        - <span>
          - <Shield />
          - <Swords />
      - <PvpDetail />
    - <p>
  - <div>
    - <span>
    - <div>
      - <button>
      - <span>
      - <button>

Unique HTML/React tags: `article`, `button`, `ChevronDown`, `DatasetFilterBar`, `DatasetSourceHeader`, `div`, `Download`, `FormatSelect`, `img`, `option`, `p`, `Panel`, `PvpDetail`, `RefreshCcw`, `RotateCcw`, `section`, `select`, `Shield`, `small`, `span`, `strong`, `Swords`, `TypeIcons`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `expanded = ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onOpenPokemon`, `onQueryChange`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| dataset | Not found | See exact signature/contract below |
| loading | Not found | See exact signature/contract below |
| onDownload | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| onOptionsChange | Not found | See exact signature/contract below |
| onRefresh | Not found | See exact signature/contract below |
| onRegenerate | Not found | See exact signature/contract below |
| options | Not found | See exact signature/contract below |
| regenerating | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Loading, Disabled, Warning, Empty, Expanded.
- Text properties: `dataset`, `loading`, `onDownload`, `onOpenPokemon`, `onOptionsChange`, `onRefresh`, `onRegenerate`, `options`, `regenerating`.
- Instance swaps: `ChevronDown`, `Download`, `RefreshCcw`, `RotateCcw`, `Shield`, `Swords`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
| Warning | Detected | warning/amber/yellow signal |
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
| Scrollable | Not found | Not found |
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
- Alignment utilities: `items-center, justify-between, justify-center, place-items-center, sm:items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `mt-1`, `p-1`, `p-3`, `p-4`, `p-8`, `px-3`, `px-4`, `py-2`, `sm:p-5`, `space-y-2`, `space-y-5` |
| Sizing | `h-14`, `h-full`, `min-h-11`, `min-h-12`, `min-w-0`, `w-14`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `placeholder:text-slate-500`, `text-[9px]`, `text-amber-200`, `text-base`, `text-center`, `text-cyan-50`, `text-left`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/16`, `border-dashed`, `border-white/10`, `border-white/12`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-black/20`, `bg-cyan-300/12`, `bg-gradient-to-r`, `bg-slate-950/45`, `bg-white/[0.055]`, `bg-white/[0.075]`, `from-sky-500`, `hover:bg-cyan-400/15`, `to-cyan-400` |
| Animation | `animate-spin`, `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `animate-spin` | base | conditional or expression-derived |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-black/20` | base | static occurrence |
| `bg-cyan-300/12` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/16` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-14` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-8` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rotate-180` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-[9px]` | base | static occurrence |
| `text-amber-200` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-14` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `-`
- `animate-spin`
- `block truncate text-base text-white`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-center justify-between gap-3`
- `flex items-center gap-2 font-mono text-sm font-black text-slate-400`
- `flex items-center gap-3`
- `font-bold text-slate-300`
- `font-mono text-sm font-black text-slate-300`
- `font-mono text-xs font-black text-slate-400`
- `grid gap-3 lg:grid-cols-2`
- `grid h-14 w-14 place-items-center rounded-xl bg-black/20 p-1`
- `grid w-full min-w-0 gap-3 p-3 text-left sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto] sm:items-center`
- `h-full w-full object-contain`
- `inline-flex items-center justify-center gap-1 rounded-full border border-cyan-200/16 bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0`
- `mt-1 flex flex-wrap items-center gap-2`
- `overflow-hidden rounded-2xl border border-white/10`
- `rotate-180`
- `rounded-2xl border border-dashed border-white/12 p-8 text-center font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `space-y-2`
- `space-y-5`
- `text-[9px] font-black text-amber-200`
- `transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`transition ${isOpen ? "rotate-180" : ""}\``
- `buttonClass`
- `fieldClass`
- `loading ? "animate-spin" : ""`
- `primaryButtonClass`
- `regenerating ? "animate-spin" : ""`

### CSS variables

Not found

### Inline style expressions

- `{typeSurface(entry)}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

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
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
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

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-2`, `sm:grid-cols-[2.5rem_4rem_minmax(0,1fr)_auto]`, `sm:items-center`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `animate-spin`, `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-expanded={isOpen}`, `aria-label="Classement PvP"`, `aria-label="Classement"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ChevronDown`, `Download`, `RefreshCcw`, `RotateCcw`, `Shield`, `Swords`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Loading, Disabled, Warning, Empty, Expanded.
- Instance swaps: `ChevronDown`, `Download`, `RefreshCcw`, `RotateCcw`, `Shield`, `Swords`.
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
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
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
