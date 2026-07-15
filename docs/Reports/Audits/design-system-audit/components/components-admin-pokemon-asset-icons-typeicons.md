---
id: MWI-COMP-140
component: "TypeIcons"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/asset-icons.jsx"
lines: 66-91
figma_priority: 58
evidence: static_code
---

# TypeIcons

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/asset-icons.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-140`.
- Location: `Dashboard Admin/src/components/admin/pokemon/asset-icons.jsx`:66.
- File range: lines 66–91.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **58/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

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
| MWI-COMP-181 | [EggCard](../components/components-admin-pokemon-eggs-panel-eggcard.md) (MWI-COMP-181) | Renders/imports this component |
| MWI-COMP-187 | [MaxBattleCard](../components/components-admin-pokemon-max-battles-panel-maxbattlecard.md) (MWI-COMP-187) | Renders/imports this component |
| MWI-COMP-201 | [MoveBadge](../components/components-admin-pokemon-pvp-rankings-panel-movebadge.md) (MWI-COMP-201) | Renders/imports this component |
| MWI-COMP-202 | [MatchupCard](../components/components-admin-pokemon-pvp-rankings-panel-matchupcard.md) (MWI-COMP-202) | Renders/imports this component |
| MWI-COMP-204 | [PvpDetail](../components/components-admin-pokemon-pvp-rankings-panel-pvpdetail.md) (MWI-COMP-204) | Renders/imports this component |
| MWI-COMP-206 | [PvpRankingsPanel](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) (MWI-COMP-206) | Renders/imports this component |
| MWI-COMP-208 | [RaidCard](../components/components-admin-pokemon-raids-panel-raidcard.md) (MWI-COMP-208) | Renders/imports this component |
| MWI-COMP-227 | [ShinyDetail](../components/components-admin-pokemon-shiny-tracker-panel-shinydetail.md) (MWI-COMP-227) | Renders/imports this component |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |
| MWI-COMP-299 | [TypeIcons](../components/components-pokemon-admin-asset-icons-typeicons.md) (MWI-COMP-299) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <span aria-label="Types Pokemon">
  - <span>
    - <img />
    - <span>

Unique HTML/React tags: `img`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| catalog | catalog = [] | See exact signature/contract below |
| size | size = "md" | See exact signature/contract below |
| types | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ types, catalog = [], size = "md" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Empty.
- Text properties: `catalog`, `size`, `types`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1.5`, `p-1`, `p-1.5` |
| Sizing | `h-7`, `h-8`, `h-full`, `w-7`, `w-8`, `w-full` |
| Typography | `font-black`, `text-[9px]`, `text-white` |
| Radius | `rounded-full` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-slate-950/40` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-slate-950/40` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-7` | base | static occurrence |
| `h-8` | base | static occurrence |
| `h-full` | base | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `object-contain` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-1.5` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `text-[9px]` | base | static occurrence |
| `text-white` | base | static occurrence |
| `w-7` | base | static occurrence |
| `w-8` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `grid`
- `h-7 w-7 p-1`
- `h-8 w-8 p-1.5`
- `h-full w-full object-contain`
- `inline-flex flex-wrap items-center gap-1.5`
- `place-items-center rounded-full border border-white/10 bg-slate-950/40`
- `text-[9px] font-black text-white`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid ${classes} place-items-center rounded-full border border-white/10 bg-slate-950/40\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

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

- ARIA attributes: `aria-label="Types Pokemon"`.
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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Empty.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
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
