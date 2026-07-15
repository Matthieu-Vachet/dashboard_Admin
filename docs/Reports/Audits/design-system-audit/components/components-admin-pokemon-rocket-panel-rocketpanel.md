---
id: MWI-COMP-224
component: "RocketPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/rocket-panel.jsx"
lines: 344-465
figma_priority: 34
evidence: static_code
---

# RocketPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/rocket-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-224`.
- Location: `Dashboard Admin/src/components/admin/pokemon/rocket-panel.jsx`:344.
- File range: lines 344–465.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo, useState | external package |
| lucide-react | Crown, Download, RefreshCcw, RotateCcw, Sparkles | icons |
| ./admin-ui | AssetStatCard, buttonClass, Panel, primaryButtonClass | internal |
| ./dataset-source-header | DatasetSourceHeader | internal |
| ./dataset-filter-bar | DatasetFilterBar | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-133 | [AssetStatCard](../components/components-admin-pokemon-admin-ui-assetstatcard.md) (MWI-COMP-133) | JSX/import relation |
| MWI-COMP-154 | [DatasetFilterBar](../components/components-admin-pokemon-dataset-filter-bar-datasetfilterbar.md) (MWI-COMP-154) | JSX/import relation |
| MWI-COMP-155 | [DatasetSourceHeader](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) (MWI-COMP-155) | JSX/import relation |
| MWI-COMP-223 | [TrainerCard](../components/components-admin-pokemon-rocket-panel-trainercard.md) (MWI-COMP-223) | JSX/import relation |

Unresolved/external JSX tags: `Crown`, `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-311 | [RocketPanel](../components/components-pokemon-admin-rocket-panel-rocketpanel.md) (MWI-COMP-311) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Panel>
    - <div>
      - <AssetStatCard />
      - <AssetStatCard />
      - <AssetStatCard />
      - <AssetStatCard />
    - <DatasetSourceHeader />
  - <DatasetFilterBar />
  - <Panel>
    - <p>
  - <section>
    - <div>
      - <div>
        - <p>
        - <h2>
      - <span>
    - <div>
      - <TrainerCard />
    - <p>

Unique HTML/React tags: `AssetStatCard`, `button`, `Crown`, `DatasetFilterBar`, `DatasetSourceHeader`, `div`, `Download`, `h2`, `p`, `Panel`, `RefreshCcw`, `RotateCcw`, `section`, `span`, `Sparkles`, `TrainerCard`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `bossOnly = false`, `query = ""`, `shinyOnly = false`.
- Event handlers exposed in JSX: `onClick`, `onOpenPokemon`, `onQueryChange`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| loading | loading = false | See exact signature/contract below |
| onDownload | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| onRefresh | Not found | See exact signature/contract below |
| onRegenerate | Not found | See exact signature/contract below |
| refreshError | refreshError = "" | See exact signature/contract below |
| regenerating | regenerating = false | See exact signature/contract below |
| rocket | Not found | See exact signature/contract below |
| rocketTexts | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  rocket,
  rocketTexts,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
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

- Boolean properties for Figma: Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive.
- Text properties: `loading`, `onDownload`, `onOpenPokemon`, `onRefresh`, `onRegenerate`, `refreshError`, `regenerating`, `rocket`, `rocketTexts`.
- Instance swaps: `Crown`, `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `/ui/icons/radar.png`, `/ui/icons/shadow.png`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
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
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, justify-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-2`, `gap-3`, `gap-5`, `p-4`, `px-3`, `px-4`, `py-1.5`, `py-2`, `sm:p-5`, `space-y-3`, `space-y-5` |
| Sizing | `min-h-11`, `min-h-12`, `min-w-0`, `w-full` |
| Typography | `font-black`, `font-bold`, `placeholder:text-slate-500`, `text-[10px]`, `text-2xl`, `text-amber-100`, `text-cyan-100`, `text-cyan-100/62`, `text-emerald-100`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-cyan-200/25`, `border-dashed`, `border-emerald-200/25`, `border-violet-200/25`, `border-white/10`, `border-white/12`, `border-white/15`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-gradient-to-r`, `bg-slate-950/45`, `bg-white/[0.055]`, `bg-white/[0.075]`, `bg-white/[0.08]`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500`, `from-sky-500/24`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `to-cyan-400`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `2xl:grid-cols-2` | 2xl | conditional or expression-derived |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/[0.08]` | base | static occurrence |
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
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-5` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-4` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/62` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `-`
- `2xl:grid-cols-2`
- `flex flex-wrap gap-2`
- `flex items-center justify-between gap-3`
- `font-bold text-slate-300`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid gap-5`
- `grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs font-black text-white`
- `space-y-3`
- `space-y-5`
- `text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/62`
- `text-2xl font-black text-white`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid gap-5 ${group === "grunt" ? "2xl:grid-cols-2" : ""}\``
- `buttonClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

Not found

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-2`, `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
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

- Lucide icons: `Crown`, `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`.
- Asset references: `/ui/icons/radar.png`, `/ui/icons/shadow.png`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive.
- Instance swaps: `Crown`, `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `/ui/icons/radar.png`, `/ui/icons/shadow.png`.
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
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
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
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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
