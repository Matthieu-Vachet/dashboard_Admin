---
id: MWI-COMP-131
component: "Panel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 63-80
figma_priority: 58
evidence: static_code
---

# Panel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-131`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:63.
- File range: lines 63–80.
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
| MWI-COMP-051 | [EventsCalendarPanel](../components/components-admin-events-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-051) | Renders/imports this component |
| MWI-COMP-126 | [RulesPanel](../components/components-admin-pokemon-admin-app-rulespanel.md) (MWI-COMP-126) | Renders/imports this component |
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-130 | [AdminTodoPanel](../components/components-admin-pokemon-admin-todo-panel-admintodopanel.md) (MWI-COMP-130) | Renders/imports this component |
| MWI-COMP-138 | [ControlCardsPanel](../components/components-admin-pokemon-admin-ui-controlcardspanel.md) (MWI-COMP-138) | Renders/imports this component |
| MWI-COMP-143 | [BackgroundPanel](../components/components-admin-pokemon-background-panel-backgroundpanel.md) (MWI-COMP-143) | Renders/imports this component |
| MWI-COMP-144 | [CandyPanel](../components/components-admin-pokemon-candy-panel-candypanel.md) (MWI-COMP-144) | Renders/imports this component |
| MWI-COMP-148 | [CatalogPanel](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) (MWI-COMP-148) | Renders/imports this component |
| MWI-COMP-183 | [EggsPanel](../components/components-admin-pokemon-eggs-panel-eggspanel.md) (MWI-COMP-183) | Renders/imports this component |
| MWI-COMP-189 | [MaxBattlesPanel](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) (MWI-COMP-189) | Renders/imports this component |
| MWI-COMP-206 | [PvpRankingsPanel](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) (MWI-COMP-206) | Renders/imports this component |
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | Renders/imports this component |
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | Renders/imports this component |
| MWI-COMP-224 | [RocketPanel](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) (MWI-COMP-224) | Renders/imports this component |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |
| MWI-COMP-298 | [Panel](../components/components-pokemon-admin-admin-ui-panel.md) (MWI-COMP-298) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div>
    - <div>
      - <p>
      - <h2>

Unique HTML/React tags: `div`, `h2`, `p`, `section`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| action | Not found | See exact signature/contract below |
| children | Not found | See exact signature/contract below |
| className | className = "" | See exact signature/contract below |
| eyebrow | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title, eyebrow, action, children, className = "" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `action`, `children`, `className`, `eyebrow`, `title`.
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
| Warning | Not found | Not found |
| Success | Not found | Not found |
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

- Flex layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `sm:items-start, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)` |
| Spacing | `gap-3`, `mb-1`, `mb-4`, `p-4`, `sm:p-5` |
| Sizing | Not found |
| Typography | `font-black`, `sm:text-2xl`, `text-cyan-200/70`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.22em]`, `tracking-tight`, `uppercase` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-white/[0.055]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `p-4` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:items-start` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-2xl` | sm | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `mb-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70`
- `mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `text-xl font-black tracking-tight text-white sm:text-2xl`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${panelClass} ${className}\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:flex-row`, `sm:items-start`, `sm:justify-between`, `sm:p-5`, `sm:text-2xl`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Not found.
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
| — | Warning | Not found |
| — | Success | Not found |
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
