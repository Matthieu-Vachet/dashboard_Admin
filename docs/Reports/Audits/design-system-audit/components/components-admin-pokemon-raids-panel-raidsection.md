---
id: MWI-COMP-209
component: "RaidSection"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/raids-panel.jsx"
lines: 157-181
figma_priority: 18
evidence: static_code
---

# RaidSection

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/raids-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-209`.
- Location: `Dashboard Admin/src/components/admin/pokemon/raids-panel.jsx`:157.
- File range: lines 157–181.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| ./tier-section | TierSection | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-208 | [RaidCard](../components/components-admin-pokemon-raids-panel-raidcard.md) (MWI-COMP-208) | JSX/import relation |
| MWI-COMP-234 | [TierSection](../components/components-admin-pokemon-tier-section-tiersection.md) (MWI-COMP-234) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <TierSection id={id}>
  - <div>
    - <RaidCard />

Unique HTML/React tags: `div`, `RaidCard`, `TierSection`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onOpenPokemon`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| bosses | Not found | See exact signature/contract below |
| id | Not found | See exact signature/contract below |
| image | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| tone | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |
| weatherCatalog | weatherCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ id, title, image, tone, bosses, onOpenPokemon, typeCatalog = [], weatherCatalog = [] }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success, Empty.
- Text properties: `bosses`, `id`, `image`, `onOpenPokemon`, `title`, `tone`, `typeCatalog`, `weatherCatalog`.
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(167,139,250,.15)`, `rgba(248,113,113,.15)`, `rgba(251,191,36,.14)`, `rgba(34,211,238,.16)`, `rgba(52,211,153,.14)`, `rgba(56,189,248,.16)` |
| Spacing | `gap-3` |
| Sizing | Not found |
| Typography | `text-amber-100/74`, `text-amber-50`, `text-cyan-100/72`, `text-cyan-50`, `text-emerald-100/72`, `text-emerald-50`, `text-red-100/74`, `text-red-50`, `text-sky-100/72`, `text-sky-50`, `text-violet-100/72`, `text-violet-50` |
| Radius | Not found |
| Borders/strokes | `border-amber-200/22`, `border-amber-200/30`, `border-cyan-200/20`, `border-cyan-200/30`, `border-emerald-200/20`, `border-emerald-200/30`, `border-red-200/22`, `border-red-200/30`, `border-sky-200/20`, `border-sky-200/30`, `border-violet-200/22`, `border-violet-200/30` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-400/[0.06]`, `bg-amber-400/12`, `bg-amber-400/14`, `bg-cyan-400/[0.055]`, `bg-cyan-400/12`, `bg-cyan-400/14`, `bg-emerald-400/[0.055]`, `bg-emerald-400/12`, `bg-emerald-400/14`, `bg-red-400/[0.06]`, `bg-red-400/12`, `bg-red-400/14`, `bg-sky-400/[0.055]`, `bg-sky-400/12`, `bg-sky-400/14`, `bg-violet-400/[0.06]`, `bg-violet-400/12`, `bg-violet-400/14` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-3` | 2xl | static occurrence |
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-amber-400/14` | base | static occurrence |
| `bg-cyan-400/[0.055]` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/14` | base | static occurrence |
| `bg-emerald-400/[0.055]` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/14` | base | static occurrence |
| `bg-red-400/[0.06]` | base | static occurrence |
| `bg-red-400/12` | base | static occurrence |
| `bg-red-400/14` | base | static occurrence |
| `bg-sky-400/[0.055]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-sky-400/14` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-violet-400/14` | base | static occurrence |
| `border-amber-200/22` | base | static occurrence |
| `border-amber-200/30` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-red-200/22` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-sky-200/20` | base | static occurrence |
| `border-sky-200/30` | base | static occurrence |
| `border-violet-200/22` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-amber-100/74` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100/72` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100/72` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-red-100/74` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sky-100/72` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-violet-100/72` | base | static occurrence |
| `text-violet-50` | base | static occurrence |

Exact className combinations:

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
- `grid gap-3 sm:grid-cols-2 2xl:grid-cols-3`
- `text-amber-100/74`
- `text-cyan-100/72`
- `text-emerald-100/72`
- `text-red-100/74`
- `text-sky-100/72`
- `text-violet-100/72`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

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

Not found

## 13. Responsive behavior

- Breakpoints used: `2xl`, `sm`.
- Responsive utilities: `2xl:grid-cols-3`, `sm:grid-cols-2`.
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
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success, Empty.
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
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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
