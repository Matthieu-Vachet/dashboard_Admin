---
id: MWI-COMP-229
component: "ShinyTrackerPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/shiny-tracker-panel.jsx"
lines: 171-220
figma_priority: 31
evidence: static_code
---

# ShinyTrackerPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/shiny-tracker-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-229`.
- Location: `Dashboard Admin/src/components/admin/pokemon/shiny-tracker-panel.jsx`:171.
- File range: lines 171–220.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Download, RefreshCcw, RotateCcw | icons |
| react | useState | external package |
| @/components/ui/modal | Modal | internal |
| @/components/site/pokemon-style | typeLabels | internal |
| ./asset-icons | TypeIcons | internal |
| ./admin-ui | AssetStatCard, buttonClass, fieldClass, Panel, primaryButtonClass | internal |
| ./dataset-source-header | DatasetSourceHeader | internal |
| ./dataset-filter-bar | DatasetFilterBar | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-133 | [AssetStatCard](../components/components-admin-pokemon-admin-ui-assetstatcard.md) (MWI-COMP-133) | JSX/import relation |
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |
| MWI-COMP-154 | [DatasetFilterBar](../components/components-admin-pokemon-dataset-filter-bar-datasetfilterbar.md) (MWI-COMP-154) | JSX/import relation |
| MWI-COMP-155 | [DatasetSourceHeader](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) (MWI-COMP-155) | JSX/import relation |
| MWI-COMP-225 | [Trend](../components/components-admin-pokemon-shiny-tracker-panel-trend.md) (MWI-COMP-225) | JSX/import relation |
| MWI-COMP-227 | [ShinyDetail](../components/components-admin-pokemon-shiny-tracker-panel-shinydetail.md) (MWI-COMP-227) | JSX/import relation |
| MWI-COMP-228 | [Podium](../components/components-admin-pokemon-shiny-tracker-panel-podium.md) (MWI-COMP-228) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `Download`, `RefreshCcw`, `RotateCcw`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Panel>
    - <div>
      - <AssetStatCard />
      - <AssetStatCard />
      - <AssetStatCard />
    - <DatasetSourceHeader />
  - <DatasetFilterBar />
  - <div>
    - <select aria-label="Génération">
      - <option>
      - <option>
    - <select aria-label="Tendance">
      - <option>
      - <option>
      - <option>
      - <option>
    - <select aria-label="Type">
      - <option>
      - <option>
  - <Podium />
  - <section aria-label="Classement Shiny">
    - <button>
      - <span>
      - <img />
      - <span>
        - <strong>
        - <span>
          - <TypeIcons />
          - <small>
      - <span>
        - <small>
        - <strong>
      - <span>
        - <small>
        - <strong>
      - <span>
        - <small>
        - <strong>
      - <span>
        - <small>
        - <strong>
        - <Trend />
    - <p>
  - <div>
    - <span>
    - <div>
      - <button>
      - <span>
      - <button>
  - <Modal>
    - <ShinyDetail />

Unique HTML/React tags: `AssetStatCard`, `button`, `DatasetFilterBar`, `DatasetSourceHeader`, `div`, `Download`, `img`, `Modal`, `option`, `p`, `Panel`, `Podium`, `RefreshCcw`, `RotateCcw`, `section`, `select`, `ShinyDetail`, `small`, `span`, `strong`, `Trend`, `TypeIcons`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `history = { points: [], statistics: null }`, `selected = null`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onClose`, `onOpen`, `onOpenPokemon`, `onQueryChange`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| dataset | Not found | See exact signature/contract below |
| loading | Not found | See exact signature/contract below |
| onDownload | Not found | See exact signature/contract below |
| onLoadHistory | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| onOptionsChange | Not found | See exact signature/contract below |
| onRefresh | Not found | See exact signature/contract below |
| onRegenerate | Not found | See exact signature/contract below |
| options | Not found | See exact signature/contract below |
| regenerating | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ dataset, loading, regenerating, options, onOptionsChange, onRefresh, onDownload, onRegenerate, onLoadHistory, onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Loading, Disabled, Warning, Success, Empty, Expanded, Active, Inactive.
- Text properties: `dataset`, `loading`, `onDownload`, `onLoadHistory`, `onOpenPokemon`, `onOptionsChange`, `onRefresh`, `onRegenerate`, `options`, `regenerating`.
- Instance swaps: `Download`, `RefreshCcw`, `RotateCcw`.
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
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
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
- Alignment utilities: `items-center, justify-between, justify-center, sm:items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `p-3`, `p-4`, `p-8`, `px-4`, `py-2`, `sm:p-5`, `space-y-2`, `space-y-5` |
| Sizing | `h-14`, `max-sm:h-[calc(100dvh-1.5rem)]`, `max-sm:max-h-none`, `max-w-5xl`, `min-h-11`, `min-h-12`, `min-w-0`, `w-14`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `placeholder:text-slate-500`, `text-[9px]`, `text-amber-100`, `text-center`, `text-cyan-100`, `text-emerald-100`, `text-left`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `uppercase` |
| Radius | `max-sm:rounded-none`, `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-cyan-200/25`, `border-dashed`, `border-emerald-200/25`, `border-violet-200/25`, `border-white/10`, `border-white/12`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/35`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-gradient-to-r`, `bg-slate-950/45`, `bg-white/[0.055]`, `bg-white/[0.075]`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500`, `from-sky-500/24`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `to-cyan-400`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `animate-spin`, `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `animate-spin` | base | conditional or expression-derived |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
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
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-14` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `max-sm:h-[calc(100dvh-1.5rem)]` | max-sm | static occurrence |
| `max-sm:max-h-none` | max-sm | static occurrence |
| `max-sm:rounded-none` | max-sm | static occurrence |
| `max-w-5xl` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-8` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:grid-cols-[3rem_4rem_minmax(0,1fr)_repeat(4,minmax(5rem,auto))]` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-[9px]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-14` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `-`
- `animate-spin`
- `block text-[9px] font-black uppercase text-slate-500`
- `block truncate text-sm text-white`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-center justify-between gap-3`
- `flex items-center gap-3`
- `font-mono text-sm font-black text-slate-300`
- `font-mono text-sm font-black text-slate-400`
- `font-mono text-sm text-amber-100`
- `font-mono text-sm text-white`
- `font-mono text-xs font-black text-slate-400`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid gap-3 sm:grid-cols-3`
- `grid w-full min-w-0 gap-3 rounded-2xl border border-white/10 p-3 text-left transition hover:border-cyan-200/35 sm:grid-cols-[3rem_4rem_minmax(0,1fr)_repeat(4,minmax(5rem,auto))] sm:items-center`
- `h-14 w-14 object-contain`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `max-w-5xl max-sm:h-[calc(100dvh-1.5rem)] max-sm:max-h-none max-sm:rounded-none`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0`
- `mt-1 flex flex-wrap items-center gap-2`
- `rounded-2xl border border-dashed border-white/12 p-8 text-center font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `space-y-2`
- `space-y-5`
- `truncate text-xs font-bold text-slate-400`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `buttonClass`
- `fieldClass`
- `loading ? "animate-spin" : ""`
- `primaryButtonClass`
- `regenerating ? "animate-spin" : ""`

### CSS variables

Not found

### Inline style expressions

- `{typeSurface(entry, 0.1)}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
}
```

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid-cols-[3rem_4rem_minmax(0,1fr)_repeat(4,minmax(5rem,auto))]`, `sm:grid-cols-3`, `sm:items-center`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `animate-spin`, `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Classement Shiny"`, `aria-label="Génération"`, `aria-label="Tendance"`, `aria-label="Type"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Download`, `RefreshCcw`, `RotateCcw`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Loading, Disabled, Warning, Success, Empty, Expanded, Active, Inactive.
- Instance swaps: `Download`, `RefreshCcw`, `RotateCcw`.
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
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
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
