---
id: MWI-COMP-216
component: "ResearchTask"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/research-panel.jsx"
lines: 215-247
figma_priority: 18
evidence: static_code
---

# ResearchTask

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/research-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-216`.
- Location: `Dashboard Admin/src/components/admin/pokemon/research-panel.jsx`:215.
- File range: lines 215–247.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ChevronDown | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-212 | [Badge](../components/components-admin-pokemon-research-panel-badge.md) (MWI-COMP-212) | JSX/import relation |
| MWI-COMP-215 | [RewardCard](../components/components-admin-pokemon-research-panel-rewardcard.md) (MWI-COMP-215) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-217 | [ResearchSection](../components/components-admin-pokemon-research-panel-researchsection.md) (MWI-COMP-217) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <details>
  - <summary>
    - <span>
      - <span>
        - <Badge>
        - <Badge>
        - <Badge>
      - <strong>
      - <span>
    - <span>
      - <ChevronDown />
  - <div>
    - <RewardCard />

Unique HTML/React tags: `Badge`, `ChevronDown`, `details`, `div`, `RewardCard`, `span`, `strong`, `summary`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| items | Not found | See exact signature/contract below |
| sectionId | Not found | See exact signature/contract below |
| task | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ task, items, sectionId }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Success, Expanded, Hidden.
- Text properties: `items`, `sectionId`, `task`.
- Instance swaps: `ChevronDown`.
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
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, sm:items-center, sm:justify-end`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(167,139,250,.1)`, `rgba(251,146,60,.1)`, `rgba(34,211,238,.1)`, `rgba(52,211,153,.1)` |
| Spacing | `gap-2`, `gap-3`, `mb-2`, `mt-1`, `p-3`, `p-4` |
| Sizing | `min-w-0` |
| Typography | `font-black`, `font-bold`, `leading-snug`, `text-base`, `text-cyan-100/68`, `text-cyan-50`, `text-emerald-50`, `text-orange-50`, `text-slate-400`, `text-violet-50`, `text-white`, `text-xs`, `tracking-[0.12em]`, `uppercase` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-cyan-200/30`, `border-emerald-200/30`, `border-orange-200/32`, `border-t`, `border-violet-200/30`, `border-white/10`, `open:border-cyan-200/18` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(167,139,250,.1)]`, `shadow-[0_0_22px_rgba(251,146,60,.1)]`, `shadow-[0_0_22px_rgba(34,211,238,.1)]`, `shadow-[0_0_22px_rgba(52,211,153,.1)]` |
| Opacity | Not found |
| Background | `bg-black/18`, `bg-cyan-400/16`, `bg-emerald-400/16`, `bg-orange-400/18`, `bg-slate-950/36`, `bg-violet-400/16`, `open:bg-slate-950/48` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-3` | 2xl | static occurrence |
| `bg-black/18` | base | static occurrence |
| `bg-cyan-400/16` | base | static occurrence |
| `bg-emerald-400/16` | base | static occurrence |
| `bg-orange-400/18` | base | static occurrence |
| `bg-slate-950/36` | base | static occurrence |
| `bg-violet-400/16` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-orange-200/32` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `group-open:rotate-180` | group-open | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-snug` | base | static occurrence |
| `list-none` | base | static occurrence |
| `marker:hidden` | marker | static occurrence |
| `mb-2` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `open:bg-slate-950/48` | open | static occurrence |
| `open:border-cyan-200/18` | open | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_0_22px_rgba(167,139,250,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(251,146,60,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(34,211,238,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(52,211,153,.1)]` | base | static occurrence |
| `sm:grid-cols-[minmax(0,1fr)_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-end` | sm | static occurrence |
| `text-base` | base | static occurrence |
| `text-cyan-100/68` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-orange-50` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `block text-base font-black leading-snug text-white`
- `border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]`
- `border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]`
- `border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]`
- `border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]`
- `flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-100/68 sm:justify-end`
- `grid cursor-pointer list-none gap-3 p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center`
- `grid gap-3 border-t border-white/10 bg-black/18 p-3 md:grid-cols-2 2xl:grid-cols-3`
- `group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/36 open:border-cyan-200/18 open:bg-slate-950/48`
- `mb-2 flex flex-wrap items-center gap-2`
- `min-w-0`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `transition group-open:rotate-180`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/research-panel.jsx#taskCategoryTones
taskCategoryTones = {
  fieldResearch: "border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]",
  eventResearch: "border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]",
  timedResearch: "border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]",
  specialResearch: "border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `2xl`, `md`, `sm`.
- Responsive utilities: `2xl:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-[minmax(0,1fr)_auto]`, `sm:items-center`, `sm:justify-end`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
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

- Lucide icons: `ChevronDown`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Success, Expanded, Hidden.
- Instance swaps: `ChevronDown`.
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
| □ | Success | success/green signal |
| — | Empty | Not found |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: md | Tailwind md: utilities |
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
