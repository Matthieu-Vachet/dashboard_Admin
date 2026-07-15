---
id: MWI-COMP-189
component: "MaxBattlesPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/max-battles-panel.jsx"
lines: 128-217
figma_priority: 34
evidence: static_code
---

# MaxBattlesPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/max-battles-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-189`.
- Location: `Dashboard Admin/src/components/admin/pokemon/max-battles-panel.jsx`:128.
- File range: lines 128–217.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Download, RefreshCcw, RotateCcw, Sparkles, Zap | icons |
| react | useMemo, useState | external package |
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
| MWI-COMP-188 | [MaxBattleSection](../components/components-admin-pokemon-max-battles-panel-maxbattlesection.md) (MWI-COMP-188) | JSX/import relation |

Unresolved/external JSX tags: `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `Zap`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-307 | [MaxBattlesPanel](../components/components-pokemon-admin-max-battles-panel-maxbattlespanel.md) (MWI-COMP-307) | Renders/imports this component |

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
  - <div>
    - <MaxBattleSection id={id} />

Unique HTML/React tags: `AssetStatCard`, `button`, `DatasetFilterBar`, `DatasetSourceHeader`, `div`, `Download`, `MaxBattleSection`, `p`, `Panel`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `Zap`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `gigantamaxOnly = false`, `query = ""`, `shinyOnly = false`.
- Event handlers exposed in JSX: `onClick`, `onOpenPokemon`, `onQueryChange`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| loading | loading = false | See exact signature/contract below |
| maxBattles | Not found | See exact signature/contract below |
| onDownload | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| onRefresh | Not found | See exact signature/contract below |
| onRegenerate | Not found | See exact signature/contract below |
| refreshError | refreshError = "" | See exact signature/contract below |
| regenerating | regenerating = false | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  maxBattles,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
  typeCatalog = [],
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
- Text properties: `loading`, `maxBattles`, `onDownload`, `onOpenPokemon`, `onRefresh`, `onRegenerate`, `refreshError`, `regenerating`, `typeCatalog`.
- Instance swaps: `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `Zap`, `/ui/max_battles/ic_shiny.png`, `/ui/max_battles/max-battles.webp`.
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
- Alignment utilities: `items-center, justify-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)`, `rgba(167,139,250,.15)`, `rgba(248,113,113,.15)`, `rgba(251,191,36,.14)`, `rgba(34,211,238,.16)`, `rgba(52,211,153,.14)`, `rgba(56,189,248,.16)` |
| Spacing | `gap-2`, `gap-3`, `p-4`, `px-4`, `py-2`, `sm:p-5`, `space-y-4`, `space-y-5` |
| Sizing | `min-h-11`, `min-h-12`, `min-w-0`, `w-full` |
| Typography | `font-black`, `font-bold`, `placeholder:text-slate-500`, `text-amber-100`, `text-amber-100/74`, `text-amber-50`, `text-cyan-100`, `text-cyan-100/72`, `text-cyan-50`, `text-emerald-100`, `text-emerald-100/72`, `text-emerald-50`, `text-red-100/74`, `text-red-50`, `text-sky-100/72`, `text-sky-50`, `text-slate-300`, `text-sm`, `text-violet-100`, `text-violet-100/72`, `text-violet-50`, `text-white` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-200/22`, `border-amber-200/25`, `border-amber-200/30`, `border-cyan-200/20`, `border-cyan-200/25`, `border-cyan-200/30`, `border-emerald-200/20`, `border-emerald-200/25`, `border-emerald-200/30`, `border-red-200/22`, `border-red-200/30`, `border-sky-200/20`, `border-sky-200/30`, `border-violet-200/22`, `border-violet-200/25`, `border-violet-200/30`, `border-white/10`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/[0.06]`, `bg-amber-400/12`, `bg-amber-400/14`, `bg-cyan-400/[0.055]`, `bg-cyan-400/12`, `bg-cyan-400/14`, `bg-emerald-400/[0.055]`, `bg-emerald-400/12`, `bg-emerald-400/14`, `bg-gradient-to-r`, `bg-red-400/[0.06]`, `bg-red-400/12`, `bg-red-400/14`, `bg-sky-400/[0.055]`, `bg-sky-400/12`, `bg-sky-400/14`, `bg-slate-950/45`, `bg-violet-400/[0.06]`, `bg-violet-400/12`, `bg-violet-400/14`, `bg-white/[0.055]`, `bg-white/[0.075]`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500`, `from-sky-500/24`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `to-cyan-400`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-amber-400/14` | base | static occurrence |
| `bg-cyan-400/[0.055]` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/14` | base | static occurrence |
| `bg-emerald-400/[0.055]` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/14` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-red-400/[0.06]` | base | static occurrence |
| `bg-red-400/12` | base | static occurrence |
| `bg-red-400/14` | base | static occurrence |
| `bg-sky-400/[0.055]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-sky-400/14` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-violet-400/14` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/22` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-amber-200/30` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-red-200/22` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-sky-200/20` | base | static occurrence |
| `border-sky-200/30` | base | static occurrence |
| `border-violet-200/22` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-white/10` | base | static occurrence |
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
| `grid` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-4` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-100/74` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/72` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-100/72` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-red-100/74` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sky-100/72` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-100/72` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `transition` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `-`
- `border-amber-200/22 bg-amber-400/[0.06]`
- `border-amber-200/22 bg-amber-400/12`
- `border-amber-200/30 bg-amber-400/14 text-amber-50`
- `border-cyan-200/20 bg-cyan-400/[0.055]`
- `border-cyan-200/20 bg-cyan-400/12`
- `border-cyan-200/30 bg-cyan-400/14 text-cyan-50`
- `border-emerald-200/20 bg-emerald-400/[0.055]`
- `border-emerald-200/20 bg-emerald-400/12`
- `border-emerald-200/30 bg-emerald-400/14 text-emerald-50`
- `border-red-200/22 bg-red-400/[0.06]`
- `border-red-200/22 bg-red-400/12`
- `border-red-200/30 bg-red-400/14 text-red-50`
- `border-sky-200/20 bg-sky-400/[0.055]`
- `border-sky-200/20 bg-sky-400/12`
- `border-sky-200/30 bg-sky-400/14 text-sky-50`
- `border-violet-200/22 bg-violet-400/[0.06]`
- `border-violet-200/22 bg-violet-400/12`
- `border-violet-200/30 bg-violet-400/14 text-violet-50`
- `flex flex-wrap gap-2`
- `font-bold text-slate-300`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `space-y-4`
- `space-y-5`
- `text-amber-100/74`
- `text-cyan-100/72`
- `text-emerald-100/72`
- `text-red-100/74`
- `text-sky-100/72`
- `text-violet-100/72`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

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

```tsx
src/components/admin/pokemon/max-battles-panel.jsx#toneForTier
function toneForTier(id) {
  const tier = Number(String(id).match(/\d+/)?.[0] || 1);
  if (tier >= 5) return "red";
  if (tier === 4) return "violet";
  if (tier === 3) return "amber";
  if (tier === 2) return "green";
  return "cyan";
}
```

```tsx
src/components/admin/pokemon/tier-section.jsx#toneStyles
toneStyles = {
  cyan: {
    shell: "border-cyan-200/20 bg-cyan-400/[0.055]",
    icon: "border-cyan-200/20 bg-cyan-400/12",
    count: "border-cyan-200/30 bg-cyan-400/14 text-cyan-50",
    text: "text-cyan-100/72",
    glow: "rgba(34,211,238,.16)",
  },
  blue: {
    shell: "border-sky-200/20 bg-sky-400/[0.055]",
    icon: "border-sky-200/20 bg-sky-400/12",
    count: "border-sky-200/30 bg-sky-400/14 text-sky-50",
    text: "text-sky-100/72",
    glow: "rgba(56,189,248,.16)",
  },
  violet: {
    shell: "border-violet-200/22 bg-violet-400/[0.06]",
    icon: "border-violet-200/22 bg-violet-400/12",
    count: "border-violet-200/30 bg-violet-400/14 text-violet-50",
    text: "text-violet-100/72",
    glow: "rgba(167,139,250,.15)",
  },
  amber: {
    shell: "border-amber-200/22 bg-amber-400/[0.06]",
    icon: "border-amber-200/22 bg-amber-400/12",
    count: "border-amber-200/30 bg-amber-400/14 text-amber-50",
    text: "text-amber-100/74",
    glow: "rgba(251,191,36,.14)",
  },
  green: {
    shell: "border-emerald-200/20 bg-emerald-400/[0.055]",
    icon: "border-emerald-200/20 bg-emerald-400/12",
    count: "border-emerald-200/30 bg-emerald-400/14 text-emerald-50",
    text: "text-emerald-100/72",
    glow: "rgba(52,211,153,.14)",
  },
  red: {
    shell: "border-red-200/22 bg-red-400/[0.06]",
    icon: "border-red-200/22 bg-red-400/12",
    count: "border-red-200/30 bg-red-400/14 text-red-50",
    text: "text-red-100/74",
    glow: "rgba(248,113,113,.15)",
  },
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-4`.
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

- Lucide icons: `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `Zap`.
- Asset references: `/ui/max_battles/ic_shiny.png`, `/ui/max_battles/max-battles.webp`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive.
- Instance swaps: `Download`, `RefreshCcw`, `RotateCcw`, `Sparkles`, `Zap`, `/ui/max_battles/ic_shiny.png`, `/ui/max_battles/max-battles.webp`.
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
