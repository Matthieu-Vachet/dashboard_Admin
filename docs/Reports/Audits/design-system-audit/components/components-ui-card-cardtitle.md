---
id: MWI-COMP-321
component: "CardTitle"
category: "Primitive UI"
status: exported
source: "src/components/ui/card.tsx"
lines: 49-59
figma_priority: 88
evidence: static_code
---

# CardTitle

## 1. Purpose

Primitive UI component implemented in src/components/ui/card.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-321`.
- Location: `Dashboard Admin/src/components/ui/card.tsx`:49.
- File range: lines 49–59.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **88/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | HTMLAttributes | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-001 | [AccountPage](../components/app-dashboard-account-page-accountpage.md) (MWI-COMP-001) | Renders/imports this component |
| MWI-COMP-023 | [PokemonWidget](../components/components-admin-cards-pokemon-widget-pokemonwidget.md) (MWI-COMP-023) | Renders/imports this component |
| MWI-COMP-041 | [Pomodoro](../components/components-admin-dashboard-pomodoro-pomodoro.md) (MWI-COMP-041) | Renders/imports this component |
| MWI-COMP-079 | [JavaScriptExercises](../components/components-admin-forms-javascript-exercises-javascriptexercises.md) (MWI-COMP-079) | Renders/imports this component |
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |
| MWI-COMP-191 | [PokemonApiExplorer](../components/components-admin-pokemon-pokemon-api-explorer-pokemonapiexplorer.md) (MWI-COMP-191) | Renders/imports this component |
| MWI-COMP-199 | [PokemonDocsViewer](../components/components-admin-pokemon-pokemon-docs-viewer-pokemondocsviewer.md) (MWI-COMP-199) | Renders/imports this component |
| MWI-COMP-240 | [DashboardCharts](../components/components-admin-stats-dashboard-charts-dashboardcharts.md) (MWI-COMP-240) | Renders/imports this component |
| MWI-COMP-241 | [DatabaseStats](../components/components-admin-stats-database-stats-databasestats.md) (MWI-COMP-241) | Renders/imports this component |
| MWI-COMP-246 | [LearningAnalytics](../components/components-admin-stats-learning-analytics-learninganalytics.md) (MWI-COMP-246) | Renders/imports this component |
| MWI-COMP-250 | [PokemonAnalytics](../components/components-admin-stats-pokemon-analytics-pokemonanalytics.md) (MWI-COMP-250) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <h2 />

Unique HTML/React tags: `h2`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| className | Not found | See exact signature/contract below |
| props | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>
```

Exact local props contract when statically resolvable:

```tsx
HTMLAttributes<HTMLHeadingElement>
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `className`, `props`.
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

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | Not found |
| Sizing | Not found |
| Typography | `font-black`, `leading-tight`, `text-foreground`, `text-lg` |
| Radius | Not found |
| Borders/strokes | Not found |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | Not found |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `font-black` | base | conditional or expression-derived |
| `leading-tight` | base | conditional or expression-derived |
| `text-foreground` | base | conditional or expression-derived |
| `text-lg` | base | conditional or expression-derived |

Exact className combinations:

- `text-lg font-black leading-tight text-foreground`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("text-lg font-black leading-tight text-foreground", className)`

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

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
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
