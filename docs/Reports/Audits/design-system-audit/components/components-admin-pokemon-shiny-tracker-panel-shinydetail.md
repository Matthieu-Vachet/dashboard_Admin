---
id: MWI-COMP-227
component: "ShinyDetail"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/shiny-tracker-panel.jsx"
lines: 62-146
figma_priority: 18
evidence: static_code
---

# ShinyDetail

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/shiny-tracker-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-227`.
- Location: `Dashboard Admin/src/components/admin/pokemon/shiny-tracker-panel.jsx`:62.
- File range: lines 62–146.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ExternalLink | icons |
| recharts | CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis | external package |
| @/components/site/pokemon-style | typeColors, typeLabels | internal |
| ./asset-icons | TypeIcons | internal |
| ./admin-ui | AssetStatCard, buttonClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-133 | [AssetStatCard](../components/components-admin-pokemon-admin-ui-assetstatcard.md) (MWI-COMP-133) | JSX/import relation |
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |
| MWI-COMP-225 | [Trend](../components/components-admin-pokemon-shiny-tracker-panel-trend.md) (MWI-COMP-225) | JSX/import relation |
| MWI-COMP-226 | [ActivityBar](../components/components-admin-pokemon-shiny-tracker-panel-activitybar.md) (MWI-COMP-226) | JSX/import relation |

Unresolved/external JSX tags: `CartesianGrid`, `ExternalLink`, `Line`, `LineChart`, `ResponsiveContainer`, `Tooltip`, `XAxis`, `YAxis`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <section>
    - <div>
      - <img />
      - <span>
    - <div>
      - <div>
        - <div>
          - <span>
          - <h3>
        - <span>
      - <div>
        - <TypeIcons />
        - <span>
        - <span>
      - <div>
        - <ActivityBar />
        - <ActivityBar />
        - <Trend />
  - <section>
    - <AssetStatCard />
    - <AssetStatCard />
    - <AssetStatCard />
    - <AssetStatCard />
  - <section>
    - <div>
      - <div>
        - <span>
        - <strong>
      - <span>
    - <div>
      - <i />
    - <p>
  - <section>
    - <div>
      - <span>
      - <strong>
    - <div>
      - <span>
      - <strong>
  - <section>
    - <h3>
    - <dl>
      - <div>
        - <dt>
        - <dd>
    - <p>
    - <div aria-label="Évolution des odds collectées">
      - <ResponsiveContainer>
        - <LineChart>
          - <CartesianGrid />
          - <XAxis />
          - <YAxis />
          - <Tooltip />
          - <Line />
    - <p>
  - <button>
    - <ExternalLink />

Unique HTML/React tags: `ActivityBar`, `AssetStatCard`, `button`, `CartesianGrid`, `dd`, `div`, `dl`, `dt`, `ExternalLink`, `h3`, `i`, `img`, `Line`, `LineChart`, `p`, `ResponsiveContainer`, `section`, `span`, `strong`, `Tooltip`, `Trend`, `TypeIcons`, `XAxis`, `YAxis`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entry | Not found | See exact signature/contract below |
| history | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entry, history, onOpenPokemon }
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
- Text properties: `entry`, `history`, `onOpenPokemon`.
- Instance swaps: `ExternalLink`.
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
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#08101f`, `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#94a3b8`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#fbbf24`, `#ff9d55`, `#fff`, `rgba(148,163,184,.15)`, `rgba(255,255,255,.14)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `p-3`, `p-4`, `px-3`, `px-4`, `py-1`, `py-1.5`, `py-2`, `space-y-3`, `space-y-4` |
| Sizing | `h-3`, `h-56`, `h-full`, `max-h-32`, `min-h-11`, `min-h-36`, `min-w-0` |
| Typography | `font-black`, `font-bold`, `font-mono`, `text-[10px]`, `text-2xl`, `text-3xl`, `text-amber-100`, `text-amber-200`, `text-amber-50`, `text-cyan-100`, `text-emerald-100`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `tracking-[0.18em]`, `tracking-wider`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-cyan-200/25`, `border-dashed`, `border-emerald-200/25`, `border-violet-200/25`, `border-white/10`, `border-white/12`, `border-white/15`, `hover:border-cyan-200/50` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-300/14`, `bg-black/25`, `bg-black/30`, `bg-gradient-to-r`, `bg-slate-950/35`, `bg-white/[0.04]`, `bg-white/[0.075]`, `bg-white/[0.08]`, `from-amber-300`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500/24`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `to-orange-400`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-300/14` | base | static occurrence |
| `bg-black/25` | base | static occurrence |
| `bg-black/30` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/[0.08]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-amber-300` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-3` | base | static occurrence |
| `h-56` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `lg:grid-cols-4` | lg | static occurrence |
| `max-h-32` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-36` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `sm:grid-cols-[9rem_minmax(0,1fr)]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-200` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-orange-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-wider` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |

Exact className combinations:

- `block h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400`
- `flex flex-wrap items-start justify-between gap-3`
- `font-black text-white`
- `font-mono text-xs font-black text-slate-400`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid gap-3 sm:grid-cols-2`
- `grid gap-3 sm:grid-cols-2 lg:grid-cols-4`
- `grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-[9rem_minmax(0,1fr)]`
- `grid min-h-36 place-items-center rounded-2xl border border-white/10 bg-black/25 p-3`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `max-h-32 object-contain`
- `min-w-0`
- `mt-1 block font-mono text-3xl text-white`
- `mt-1 font-mono font-black text-white`
- `mt-2 block text-white`
- `mt-3 flex flex-wrap items-center gap-2`
- `mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3`
- `mt-3 h-3 overflow-hidden rounded-full border border-white/10 bg-black/30`
- `mt-3 text-sm font-bold text-slate-300`
- `mt-3 text-sm font-bold text-slate-400`
- `mt-4 h-56`
- `mt-4 rounded-xl border border-dashed border-white/12 p-4 text-sm font-bold text-slate-400`
- `mt-5 space-y-3`
- `rounded-2xl border border-white/10 bg-slate-950/35 p-4`
- `rounded-2xl border border-white/10 bg-white/[0.04] p-4`
- `rounded-2xl border p-4`
- `rounded-full border border-amber-200/25 bg-amber-300/14 px-3 py-1 text-xs font-black text-amber-50`
- `rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-black`
- `rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-xs font-black`
- `rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 font-mono text-xs font-black`
- `rounded-xl border border-white/10 bg-white/[0.04] p-3`
- `space-y-4`
- `text-[10px] font-black uppercase tracking-[0.18em] text-slate-400`
- `text-[10px] font-black uppercase tracking-wider text-slate-500`
- `text-2xl font-black text-white`
- `text-sm font-black text-amber-200`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `buttonClass`

### CSS variables

Not found

### Inline style expressions

- `{{ borderColor: \`${typeColors[primaryType(entry)] || typeColors.NORMAL}66\`, ...typeSurface(entry, 0.2) }}`
- `{{ width: \`${shinyProgress}%\` }}`
- `{typeSurface(entry, 0.18)}`

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
- Responsive utilities: `lg:grid-cols-3`, `lg:grid-cols-4`, `sm:grid-cols-[9rem_minmax(0,1fr)]`, `sm:grid-cols-2`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Évolution des odds collectées"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ExternalLink`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Warning, Success, Empty.
- Instance swaps: `ExternalLink`.
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
