---
id: MWI-COMP-023
component: "PokemonWidget"
category: "Component"
status: exported
source: "src/components/admin/cards/pokemon-widget.tsx"
lines: 9-81
figma_priority: 31
evidence: static_code
---

# PokemonWidget

## 1. Purpose

Component component implemented in src/components/admin/cards/pokemon-widget.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-023`.
- Location: `Dashboard Admin/src/components/admin/cards/pokemon-widget.tsx`:9.
- File range: lines 9–81.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useState | external package |
| lucide-react | Activity, Database, ShieldCheck | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/lib/pokemon | PokemonMetrics | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-024 | [Metric](../components/components-admin-cards-pokemon-widget-metric.md) (MWI-COMP-024) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-281 | [PokemonWidget](../components/components-dashboard-pokemon-widget-pokemonwidget.md) (MWI-COMP-281) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Card>
  - <CardHeader>
    - <CardTitle>
    - <CardDescription>
  - <div>
  - <div>
    - <Metric />
    - <Metric />
    - <Metric />
    - <div>
      - <div>
        - <div>
          - <div>
            - <span>
            - <span>
          - <div>
            - <div />

Unique HTML/React tags: `Badge`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `div`, `Metric`, `span`.

## 5. React structure and state management

- Hooks: `useEffect`, `useState`.
- Local state initializers: `loading = true`, `metrics = null`.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| Not found | Not found | Not found |

Exact parameter signature:

```tsx
Not found
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Error, Warning, Success, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `Activity`, `Database`, `ShieldCheck`.
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
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-2`, `mt-6`, `p-2`, `p-4` |
| Sizing | `h-1.5`, `h-44`, `h-full` |
| Typography | `font-black`, `font-bold`, `text-amber-100`, `text-brand-3`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-gradient-to-r`, `bg-warning/12`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/10`, `from-brand-3`, `to-brand-2` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-brand-3` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-3` | base | static occurrence |
| `h-1.5` | base | static occurrence |
| `h-44` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:col-span-3` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-2` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `flex items-center justify-between text-xs font-black`
- `grid grid-cols-3 gap-2`
- `h-full rounded-full bg-gradient-to-r from-brand-3 to-brand-2`
- `mt-2 h-1.5 overflow-hidden rounded-full bg-white/10`
- `mt-6 grid gap-3 sm:grid-cols-3`
- `mt-6 grid h-44 place-items-center rounded-lg border border-line bg-white/[0.04] text-sm font-bold text-muted`
- `p-4`
- `rounded-lg border border-line bg-white/[0.045] p-2`
- `sm:col-span-3`
- `text-brand-3`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ width: \`${item.completion}%\` }}`

### Referenced local/imported style declarations

```tsx
src/components/ui/badge.tsx#tones
tones: Record<BadgeTone, string> = {
  cyan: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  violet: "border-brand/30 bg-brand/12 text-violet-100",
  green: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  amber: "border-warning/35 bg-warning/12 text-amber-100",
  red: "border-danger/35 bg-danger/12 text-rose-100",
  neutral: "border-line bg-white/[0.06] text-muted",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:col-span-3`, `sm:grid-cols-3`.
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

- Lucide icons: `Activity`, `Database`, `ShieldCheck`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Error, Warning, Success, Active, Inactive.
- Instance swaps: `Activity`, `Database`, `ShieldCheck`.
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
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
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
