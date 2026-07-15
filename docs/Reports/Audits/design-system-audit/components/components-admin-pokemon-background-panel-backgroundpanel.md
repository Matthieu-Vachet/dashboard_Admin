---
id: MWI-COMP-143
component: "BackgroundPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/background-panel.jsx"
lines: 108-195
figma_priority: 31
evidence: static_code
---

# BackgroundPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/background-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-143`.
- Location: `Dashboard Admin/src/components/admin/pokemon/background-panel.jsx`:108.
- File range: lines 108–195.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| @/components/ui/modal | Modal | internal |
| ./admin-ui | AssetStatCard, Panel | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-133 | [AssetStatCard](../components/components-admin-pokemon-admin-ui-assetstatcard.md) (MWI-COMP-133) | JSX/import relation |
| MWI-COMP-142 | [BackgroundPreview](../components/components-admin-pokemon-background-panel-backgroundpreview.md) (MWI-COMP-142) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <p>
- <div>
  - <Panel>
    - <div>
      - <AssetStatCard />
      - <AssetStatCard />
      - <AssetStatCard />
      - <AssetStatCard />
    - <p>
      - <code>
      - <code>
  - <section>
    - <BackgroundPreview />
  - <Modal>
    - <div>
      - <img />

Unique HTML/React tags: `AssetStatCard`, `BackgroundPreview`, `code`, `div`, `img`, `Modal`, `p`, `Panel`, `section`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `preview = null`.
- Event handlers exposed in JSX: `onClose`, `onOpen`, `onPreview`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entries | entries = [] | See exact signature/contract below |
| library | library = [] | See exact signature/contract below |
| linkedAssets | linkedAssets = [] | See exact signature/contract below |
| loading | loading = false | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| search | search = "" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entries = [], library = [], linkedAssets = [], loading = false, search = "", onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Warning, Success, Empty, Expanded.
- Text properties: `entries`, `library`, `linkedAssets`, `loading`, `onOpen`, `search`.
- Instance swaps: `/ui/backgrounds/catchCards/ic_catch_card_notification.png`, `/ui/backgrounds/catchCards/ic_catch_card.png`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-stretch`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)` |
| Spacing | `gap-3`, `gap-4`, `mt-4`, `mx-auto`, `p-2`, `p-4`, `p-5`, `sm:p-5`, `space-y-5` |
| Sizing | `max-h-[72dvh]`, `max-w-6xl`, `min-w-0`, `w-full` |
| Typography | `font-bold`, `leading-6`, `text-amber-100`, `text-cyan-100`, `text-cyan-50/86`, `text-emerald-100`, `text-slate-300`, `text-sm`, `text-violet-100` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-cyan-200/25`, `border-cyan-300/15`, `border-emerald-200/25`, `border-violet-200/25`, `border-white/10` |
| Shadows/elevation | `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-cyan-400/10`, `bg-slate-950/35`, `bg-slate-950/40`, `bg-white/[0.055]`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500/24`, `from-violet-500/24`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-3` | 2xl | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-cyan-300/15` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `items-stretch` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `max-h-[72dvh]` | base | static occurrence |
| `max-w-6xl` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-50/86` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3`
- `grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `max-w-6xl`
- `mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86`
- `mx-auto max-h-[72dvh] w-full object-contain`
- `overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-2`
- `rounded-2xl border border-white/10 bg-slate-950/35 p-5 text-sm font-bold text-slate-300`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `space-y-5`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-3`, `lg:grid-cols-2`, `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
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
- Asset references: `/ui/backgrounds/catchCards/ic_catch_card_notification.png`, `/ui/backgrounds/catchCards/ic_catch_card.png`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Warning, Success, Empty, Expanded.
- Instance swaps: `/ui/backgrounds/catchCards/ic_catch_card_notification.png`, `/ui/backgrounds/catchCards/ic_catch_card.png`.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
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
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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
