---
id: MWI-COMP-246
component: "LearningAnalytics"
category: "Analytics feature"
status: exported
source: "src/components/admin/stats/learning-analytics.tsx"
lines: 24-116
figma_priority: 34
evidence: static_code
---

# LearningAnalytics

## 1. Purpose

Analytics feature component implemented in src/components/admin/stats/learning-analytics.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-246`.
- Location: `Dashboard Admin/src/components/admin/stats/learning-analytics.tsx`:24.
- File range: lines 24–116.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo | external package |
| lucide-react | BarChart3, CheckSquare2, FolderKanban, GraduationCap, TimerReset, Trophy | icons |
| @/components/admin/shared/sortable-widget-grid | SortableWidgetGrid | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/data/personal-dashboard-defaults | initialProjects, initialTodos | internal |
| @/lib/learning/javascript | getLearningSummary, getTopicStats | internal |
| @/hooks/admin/use-javascript-learning | useJavascriptLearning | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-238 | [SortableWidgetGrid](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) (MWI-COMP-238) | JSX/import relation |
| MWI-COMP-247 | [LevelProgressGrid](../components/components-admin-stats-learning-analytics-levelprogressgrid.md) (MWI-COMP-247) | JSX/import relation |
| MWI-COMP-248 | [StatusChart](../components/components-admin-stats-learning-analytics-statuschart.md) (MWI-COMP-248) | JSX/import relation |
| MWI-COMP-249 | [Metric](../components/components-admin-stats-learning-analytics-metric.md) (MWI-COMP-249) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-002 | [AnalyticsPage](../components/app-dashboard-analytics-page-analyticspage.md) (MWI-COMP-002) | Renders/imports this component |
| MWI-COMP-274 | [LearningAnalytics](../components/components-dashboard-learning-analytics-learninganalytics.md) (MWI-COMP-274) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <Metric />
  - <Metric />
  - <Metric />
  - <Metric />
  - <Metric />
  - <Metric />
  - <Metric />
  - <Metric />
- <Card>
  - <CardHeader>
    - <CardTitle>
    - <CardDescription>
  - <LevelProgressGrid />
- <Card>
  - <CardHeader>
    - <CardTitle>
    - <CardDescription>
  - <StatusChart />
- <div>
  - <Card>
    - <div />
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
  - <SortableWidgetGrid />

Unique HTML/React tags: `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `div`, `LevelProgressGrid`, `Metric`, `section`, `SortableWidgetGrid`, `StatusChart`.

## 5. React structure and state management

- Hooks: `useJavascriptLearning`, `useMemo`, `usePersistentState`.
- Local state initializers: Not found.
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

- Boolean properties for Figma: Warning, Success.
- Text properties: Not found.
- Instance swaps: `BarChart3`, `CheckSquare2`, `FolderKanban`, `GraduationCap`, `TimerReset`, `Trophy`.
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
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#20d3ff`, `#58f2a9`, `#905bf4`, `rgba(144,91,244,.16)`, `rgba(32,211,255,.18)` |
| Spacing | `gap-3`, `inset-0`, `p-4`, `p-5`, `space-y-5` |
| Sizing | `min-w-0` |
| Typography | `sm:text-3xl`, `text-2xl` |
| Radius | Not found |
| Borders/strokes | Not found |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_16%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_84%_20%,rgba(144,91,244,.16),transparent_32%)]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_16%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_84%_20%,rgba(144,91,244,.16),transparent_32%)]` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `relative` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `grid gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `min-w-0 p-4`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_84%_20%,rgba(144,91,244,.16),transparent_32%)]`
- `relative overflow-hidden p-5`
- `relative z-10`
- `space-y-5`
- `text-2xl sm:text-3xl`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/stats/learning-analytics.tsx#colors
colors = ["#20d3ff", "#58f2a9", "#905bf4"]
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `sm:text-3xl`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `BarChart3`, `CheckSquare2`, `FolderKanban`, `GraduationCap`, `TimerReset`, `Trophy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success.
- Instance swaps: `BarChart3`, `CheckSquare2`, `FolderKanban`, `GraduationCap`, `TimerReset`, `Trophy`.
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
