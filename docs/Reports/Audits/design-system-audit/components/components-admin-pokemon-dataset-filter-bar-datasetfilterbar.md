---
id: MWI-COMP-154
component: "DatasetFilterBar"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/dataset-filter-bar.jsx"
lines: 6-50
figma_priority: 49
evidence: static_code
---

# DatasetFilterBar

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/dataset-filter-bar.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-154`.
- Location: `Dashboard Admin/src/components/admin/pokemon/dataset-filter-bar.jsx`:6.
- File range: lines 6–50.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **49/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Search, SlidersHorizontal | icons |
| ./admin-ui | fieldClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Search`, `SlidersHorizontal`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-183 | [EggsPanel](../components/components-admin-pokemon-eggs-panel-eggspanel.md) (MWI-COMP-183) | Renders/imports this component |
| MWI-COMP-189 | [MaxBattlesPanel](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) (MWI-COMP-189) | Renders/imports this component |
| MWI-COMP-206 | [PvpRankingsPanel](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) (MWI-COMP-206) | Renders/imports this component |
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | Renders/imports this component |
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | Renders/imports this component |
| MWI-COMP-224 | [RocketPanel](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) (MWI-COMP-224) | Renders/imports this component |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div>
    - <label>
      - <Search />
      - <input />
    - <div>
      - <button aria-pressed={toggle.active}>
        - <SlidersHorizontal />
      - <span>

Unique HTML/React tags: `button`, `div`, `input`, `label`, `Search`, `section`, `SlidersHorizontal`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onQueryChange | Not found | See exact signature/contract below |
| placeholder | placeholder = "Rechercher un Pokémon..." | See exact signature/contract below |
| query | Not found | See exact signature/contract below |
| resultCount | resultCount = 0 | See exact signature/contract below |
| toggles | toggles = [] | See exact signature/contract below |
| totalCount | totalCount = 0 | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  query,
  onQueryChange,
  placeholder = "Rechercher un Pokémon...",
  resultCount = 0,
  totalCount = 0,
  toggles = [],
}
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Active, Inactive.
- Text properties: `onQueryChange`, `placeholder`, `query`, `resultCount`, `toggles`, `totalCount`.
- Instance swaps: `Search`, `SlidersHorizontal`.
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
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
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
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, xl:items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.16)` |
| Spacing | `gap-2`, `gap-3`, `left-4`, `p-3`, `pl-11`, `px-3`, `px-4`, `py-2`, `top-1/2` |
| Sizing | `min-h-10`, `min-h-12`, `min-w-0`, `w-full` |
| Typography | `font-black`, `font-bold`, `hover:text-white`, `placeholder:text-slate-500`, `text-cyan-50`, `text-slate-300`, `text-slate-500`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/35`, `border-white/10`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-white/20`, `outline-none` |
| Shadows/elevation | `shadow-[0_16px_55px_rgba(0,0,0,.16)]` |
| Opacity | Not found |
| Background | `bg-black/20`, `bg-cyan-300/16`, `bg-slate-950/30`, `bg-slate-950/45`, `bg-white/[0.055]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-translate-y-1/2` | base | static occurrence |
| `absolute` | base | static occurrence |
| `bg-black/20` | base | static occurrence |
| `bg-cyan-300/16` | base | conditional or expression-derived |
| `bg-slate-950/30` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/35` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `flex` | base | conditional or expression-derived |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `hover:border-white/20` | hover | conditional or expression-derived |
| `hover:text-white` | hover | conditional or expression-derived |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `left-4` | base | static occurrence |
| `min-h-10` | base | conditional or expression-derived |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-3` | base | static occurrence |
| `pl-11` | base | conditional or expression-derived |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `shadow-[0_16px_55px_rgba(0,0,0,.16)]` | base | static occurrence |
| `text-cyan-50` | base | conditional or expression-derived |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | conditional or expression-derived |
| `text-xs` | base | conditional or expression-derived |
| `top-1/2` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |
| `xl:flex-row` | xl | static occurrence |
| `xl:items-center` | xl | static occurrence |

Exact className combinations:

- `border-cyan-200/35 bg-cyan-300/16 text-cyan-50`
- `border-white/10 bg-white/[0.055] text-slate-300 hover:border-white/20 hover:text-white`
- `flex flex-col gap-3 xl:flex-row xl:items-center`
- `flex flex-wrap items-center gap-2`
- `inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-black transition`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `pl-11`
- `pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500`
- `relative min-w-0 flex-1`
- `rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_16px_55px_rgba(0,0,0,.16)]`
- `rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-black text-slate-300`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} pl-11\``
- `\`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-black transition ${ toggle.active ? "border-cyan-200/35 bg-cyan-300/16 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300 hover:border-white/20 hover:text-white" }\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `xl`.
- Responsive utilities: `xl:flex-row`, `xl:items-center`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-pressed={toggle.active}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Search`, `SlidersHorizontal`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Active, Inactive.
- Instance swaps: `Search`, `SlidersHorizontal`.
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
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
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
