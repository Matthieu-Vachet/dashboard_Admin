---
id: MWI-COMP-250
component: "PokemonAnalytics"
category: "Analytics feature"
status: exported
source: "src/components/admin/stats/pokemon-analytics.tsx"
lines: 40-202
figma_priority: 31
evidence: static_code
---

# PokemonAnalytics

## 1. Purpose

Analytics feature component implemented in src/components/admin/stats/pokemon-analytics.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-250`.
- Location: `Dashboard Admin/src/components/admin/stats/pokemon-analytics.tsx`:40.
- File range: lines 40–202.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useState | external package |
| lucide-react | BarChart3, CloudSun, Database, ShieldCheck, Sparkles, Sticker, Swords, Tags | icons |
| recharts | Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis | external package |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/lib/pokemon | PokemonMetrics | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-251 | [Metric](../components/components-admin-stats-pokemon-analytics-metric.md) (MWI-COMP-251) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `Bar`, `BarChart`, `CartesianGrid`, `Cell`, `Pie`, `PieChart`, `ResponsiveContainer`, `Tooltip`, `XAxis`, `YAxis`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-277 | [PokemonAnalytics](../components/components-dashboard-pokemon-analytics-pokemonanalytics.md) (MWI-COMP-277) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <Badge>
    - <h2>
    - <p>
  - <section>
    - <Metric />
    - <Metric />
    - <Metric />
    - <Metric />
    - <Metric />
    - <Metric />
    - <Metric />
    - <Metric />
  - <section>
    - <Card>
      - <CardHeader>
        - <CardTitle>
        - <CardDescription>
      - <div>
        - <ResponsiveContainer>
          - <BarChart>
            - <CartesianGrid />
            - <XAxis />
            - <YAxis />
            - <Tooltip />
            - <Bar />
        - <div />
    - <Card>
      - <CardHeader>
        - <CardTitle>
        - <CardDescription>
      - <div>
        - <ResponsiveContainer>
          - <PieChart>
            - <Tooltip />
            - <Pie>
              - <Cell />
        - <div />
  - <section>
    - <Card>
      - <CardHeader>
        - <CardTitle>
        - <CardDescription>
      - <div>
        - <ResponsiveContainer>
          - <BarChart>
            - <CartesianGrid />
            - <XAxis />
            - <YAxis />
            - <Tooltip />
            - <Bar>
              - <Cell />
    - <Card>
      - <CardHeader>
        - <CardTitle>
        - <CardDescription>
      - <div>
        - <div>
          - <div>
            - <p>
            - <span>
          - <p>
          - <div>
            - <span />

Unique HTML/React tags: `Badge`, `Bar`, `BarChart`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `CartesianGrid`, `Cell`, `div`, `h2`, `Metric`, `p`, `Pie`, `PieChart`, `ResponsiveContainer`, `section`, `span`, `Tooltip`, `XAxis`, `YAxis`.

## 5. React structure and state management

- Hooks: `useEffect`, `useState`.
- Local state initializers: `metrics = null`, `mounted = false`.
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

- Boolean properties for Figma: Error, Warning, Success.
- Text properties: Not found.
- Instance swaps: `BarChart3`, `CloudSun`, `Database`, `ShieldCheck`, `Sparkles`, `Sticker`, `Swords`, `Tags`.
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
| Error | Detected | error/danger signal |
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#20d3ff`, `#58f2a9`, `#905bf4`, `#94a3b8`, `#eef3ff`, `#ff5f7d`, `#ffd166`, `rgba(10, 13, 24, 0.95)`, `rgba(255,255,255,0.06)`, `rgba(255,255,255,0.12)`, `rgba(5,6,13,.88)` |
| Spacing | `gap-3`, `gap-4`, `mt-2`, `mt-3`, `mt-6`, `p-4`, `p-5`, `space-y-4` |
| Sizing | `h-2`, `h-72`, `h-80`, `h-full`, `max-w-3xl`, `min-h-72`, `min-h-80`, `min-w-0` |
| Typography | `capitalize`, `font-black`, `font-mono`, `font-semibold`, `leading-6`, `text-2xl`, `text-3xl`, `text-amber-100`, `text-brand-2`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-warning/12`, `bg-white/[0.035]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/10` |
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
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `capitalize` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-2` | base | static occurrence |
| `h-72` | base | static occurrence |
| `h-80` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-w-3xl` | base | static occurrence |
| `min-h-72` | base | static occurrence |
| `min-h-80` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]` | xl | static occurrence |
| `xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `block h-full rounded-full`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `flex items-center justify-between gap-3`
- `font-mono text-sm font-black text-brand-2`
- `grid gap-4 sm:grid-cols-2 xl:grid-cols-4`
- `grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`
- `grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`
- `h-full rounded-lg border border-line bg-white/[0.035]`
- `min-w-0 p-4`
- `mt-2 font-mono text-2xl font-black`
- `mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted`
- `mt-3 h-2 overflow-hidden rounded-full bg-white/10`
- `mt-3 text-3xl font-black`
- `mt-6 grid gap-3 sm:grid-cols-2`
- `mt-6 h-72 min-h-72 min-w-0`
- `mt-6 h-80 min-h-80 min-w-0`
- `p-4`
- `p-5`
- `rounded-lg border border-line bg-white/[0.045] p-4`
- `space-y-4`
- `text-sm font-black capitalize`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

- `{{ width: \`${kindTotal ? (kind.value / kindTotal) * 100 : 0}%\`, backgroundColor: colors[index % colors.length], }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/stats/pokemon-analytics.tsx#colors
colors = ["#20d3ff", "#905bf4", "#58f2a9", "#ffd166", "#ff5f7d"]
```

```tsx
src/components/admin/stats/pokemon-analytics.tsx#tooltipStyle
tooltipStyle = {
  background: "rgba(10, 13, 24, 0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#eef3ff",
}
```

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

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`, `xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`, `xl:grid-cols-4`.
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

- Lucide icons: `BarChart3`, `CloudSun`, `Database`, `ShieldCheck`, `Sparkles`, `Sticker`, `Swords`, `Tags`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Error, Warning, Success.
- Instance swaps: `BarChart3`, `CloudSun`, `Database`, `ShieldCheck`, `Sparkles`, `Sticker`, `Swords`, `Tags`.
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
| □ | Error | error/danger signal |
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
