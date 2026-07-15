---
id: MWI-COMP-240
component: "DashboardCharts"
category: "Analytics feature"
status: exported
source: "src/components/admin/stats/dashboard-charts.tsx"
lines: 26-111
figma_priority: 31
evidence: static_code
---

# DashboardCharts

## 1. Purpose

Analytics feature component implemented in src/components/admin/stats/dashboard-charts.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-240`.
- Location: `Dashboard Admin/src/components/admin/stats/dashboard-charts.tsx`:26.
- File range: lines 26–111.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useState | external package |
| recharts | Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis | external package |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/data/dashboard | focusBlocks, revenueData | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `Area`, `AreaChart`, `Bar`, `BarChart`, `CartesianGrid`, `Cell`, `ResponsiveContainer`, `Tooltip`, `XAxis`, `YAxis`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-267 | [DashboardCharts](../components/components-dashboard-dashboard-charts-dashboardcharts.md) (MWI-COMP-267) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
    - <div>
      - <ResponsiveContainer>
        - <AreaChart>
          - <defs>
            - <linearGradient id="revenueGradient">
              - <stop />
              - <stop />
          - <CartesianGrid />
          - <XAxis />
          - <YAxis />
          - <Tooltip />
          - <Area />
          - <Area />
      - <div />
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
      - <div />

Unique HTML/React tags: `Area`, `AreaChart`, `Bar`, `BarChart`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `CartesianGrid`, `Cell`, `defs`, `div`, `linearGradient`, `ResponsiveContainer`, `stop`, `Tooltip`, `XAxis`, `YAxis`.

## 5. React structure and state management

- Hooks: `useEffect`, `useState`.
- Local state initializers: `mounted = false`.
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

- Boolean properties for Figma: Not found.
- Text properties: Not found.
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

- CSS Grid layout is present.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#20d3ff`, `#58f2a9`, `#94a3b8`, `#eef3ff`, `rgba(10, 13, 24, 0.95)`, `rgba(255,255,255,0.06)`, `rgba(255,255,255,0.12)` |
| Spacing | `gap-4`, `mt-6`, `p-4` |
| Sizing | `h-72`, `h-full`, `min-h-72`, `min-w-0` |
| Typography | Not found |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.035]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-white/[0.035]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-72` | base | static occurrence |
| `h-full` | base | static occurrence |
| `min-h-72` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `p-4` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]` | xl | static occurrence |

Exact className combinations:

- `grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]`
- `h-full rounded-lg border border-line bg-white/[0.035]`
- `min-w-0 p-4`
- `mt-6 h-72 min-h-72 min-w-0`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/stats/dashboard-charts.tsx#tooltipStyle
tooltipStyle = {
  background: "rgba(10, 13, 24, 0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#eef3ff",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `xl`.
- Responsive utilities: `xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]`.
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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
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
