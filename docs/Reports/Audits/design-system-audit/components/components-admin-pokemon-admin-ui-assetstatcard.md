---
id: MWI-COMP-133
component: "AssetStatCard"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 120-144
figma_priority: 58
evidence: static_code
---

# AssetStatCard

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-133`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:120.
- File range: lines 120–144.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **58/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Gauge | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Gauge`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-143 | [BackgroundPanel](../components/components-admin-pokemon-background-panel-backgroundpanel.md) (MWI-COMP-143) | Renders/imports this component |
| MWI-COMP-183 | [EggsPanel](../components/components-admin-pokemon-eggs-panel-eggspanel.md) (MWI-COMP-183) | Renders/imports this component |
| MWI-COMP-189 | [MaxBattlesPanel](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) (MWI-COMP-189) | Renders/imports this component |
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | Renders/imports this component |
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | Renders/imports this component |
| MWI-COMP-224 | [RocketPanel](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) (MWI-COMP-224) | Renders/imports this component |
| MWI-COMP-227 | [ShinyDetail](../components/components-admin-pokemon-shiny-tracker-panel-shinydetail.md) (MWI-COMP-227) | Renders/imports this component |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |
| MWI-COMP-290 | [AssetStatCard](../components/components-pokemon-admin-admin-ui-assetstatcard.md) (MWI-COMP-290) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <div />
  - <div>
    - <span>
      - <img />
      - <Gauge />
    - <span>
      - <span>
      - <strong>
  - <p>

Unique HTML/React tags: `article`, `div`, `Gauge`, `img`, `p`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| detail | Not found | See exact signature/contract below |
| icon | Not found | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| tone | tone = "cyan" | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ label, value, icon, tone = "cyan", detail }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success.
- Text properties: `detail`, `icon`, `label`, `tone`, `value`.
- Instance swaps: `Gauge`.
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
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.22)`, `rgba(255,255,255,.1)`, `rgba(255,255,255,.16)`, `rgba(255,255,255,.22)` |
| Spacing | `gap-3`, `inset-0`, `mt-3`, `p-2`, `p-3` |
| Sizing | `h-12`, `h-8`, `max-h-8`, `max-w-8`, `max-w-full`, `min-w-0`, `w-12`, `w-8` |
| Typography | `font-black`, `font-bold`, `font-mono`, `leading-none`, `text-[clamp(1.6rem,3vw,2.75rem)]`, `text-amber-100`, `text-cyan-100`, `text-ellipsis`, `text-emerald-100`, `text-violet-100`, `text-white`, `text-white/70`, `text-white/72`, `text-xs`, `tracking-[0.18em]`, `uppercase`, `whitespace-nowrap` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-cyan-200/25`, `border-emerald-200/25`, `border-violet-200/25`, `border-white/10` |
| Shadows/elevation | `drop-shadow-[0_0_18px_rgba(255,255,255,.16)]`, `shadow-[0_18px_65px_rgba(0,0,0,.22)]`, `shadow-inner` |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.1),transparent_45%)]`, `bg-gradient-to-br`, `bg-slate-950/45`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500/24`, `from-violet-500/24`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.1),transparent_45%)]` | base | static occurrence |
| `bg-gradient-to-br` | base | conditional or expression-derived |
| `bg-slate-950/45` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/25` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `drop-shadow-[0_0_18px_rgba(255,255,255,.16)]` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[3rem_minmax(0,1fr)]` | base | static occurrence |
| `h-12` | base | static occurrence |
| `h-8` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-none` | base | static occurrence |
| `max-h-8` | base | static occurrence |
| `max-w-8` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `min-w-0` | base | conditional or expression-derived |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `rounded-2xl` | base | conditional or expression-derived |
| `shadow-[0_18px_65px_rgba(0,0,0,.22)]` | base | conditional or expression-derived |
| `shadow-inner` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `text-[clamp(1.6rem,3vw,2.75rem)]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-ellipsis` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-white/70` | base | static occurrence |
| `text-white/72` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-12` | base | static occurrence |
| `w-8` | base | static occurrence |
| `whitespace-nowrap` | base | static occurrence |

Exact className combinations:

- `block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[clamp(1.6rem,3vw,2.75rem)] font-black leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,.16)]`
- `block truncate text-xs font-black uppercase tracking-[0.18em] text-white/72`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-2 shadow-inner`
- `h-8 max-h-8 w-8 max-w-8 object-contain`
- `min-w-0`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.1),transparent_45%)]`
- `relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3`
- `relative min-w-0 overflow-hidden rounded-2xl border bg-gradient-to-br p-3 shadow-[0_18px_65px_rgba(0,0,0,.22)]`
- `relative mt-3 truncate text-xs font-bold text-white/70`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`relative min-w-0 overflow-hidden rounded-2xl border bg-gradient-to-br p-3 shadow-[0_18px_65px_rgba(0,0,0,.22)] ${assetStatTone[tone] || assetStatTone.cyan}\``

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Gauge`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success.
- Instance swaps: `Gauge`.
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
| □ | Success | success/green signal |
| — | Empty | Not found |
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
| — | Responsive variants | Not found |

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
