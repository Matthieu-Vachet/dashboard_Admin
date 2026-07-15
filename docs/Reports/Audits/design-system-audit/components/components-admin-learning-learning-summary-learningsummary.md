---
id: MWI-COMP-118
component: "LearningSummary"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-summary.tsx"
lines: 7-71
figma_priority: 31
evidence: static_code
---

# LearningSummary

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-summary.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-118`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-summary.tsx`:7.
- File range: lines 7–71.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Award, BookOpenCheck, CheckCircle2, Code2, Flame, Gauge, Rocket, Trophy | icons |
| @/components/ui/card | Card | internal |
| @/constants/admin/learning | LEARNING_XP_PER_LEVEL | internal |
| @/components/admin/learning/learning-progress-bar | LearningProgressBar | internal |
| @/types/admin/learning | LearningSummaryData | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-117 | [LearningProgressBar](../components/components-admin-learning-learning-progress-bar-learningprogressbar.md) (MWI-COMP-117) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `Award`, `CheckCircle2`, `Icon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section aria-label="Résumé de progression JavaScript">
  - <Card>
    - <div>
      - <div>
        - <span>
        - <strong>
        - <span>
        - <p>
      - <span>
        - <Award />
    - <LearningProgressBar />
  - <Card>
    - <div>
      - <div>
        - <span>
        - <strong>
      - <span>
        - <Icon />
  - <Card>
    - <div>
      - <div>
        - <span>
        - <strong>
      - <span>
        - <CheckCircle2 />

Unique HTML/React tags: `Award`, `Card`, `CheckCircle2`, `div`, `Icon`, `LearningProgressBar`, `p`, `section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| level | Not found | See exact signature/contract below |
| summary | Not found | See exact signature/contract below |
| unlockedAchievements | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  summary,
  level,
  unlockedAchievements,
}: {
  summary: LearningSummaryData;
  level: { level: number; title: string; currentXP: number; nextLevelXP: number; progress: number };
  unlockedAchievements: number;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  summary: LearningSummaryData;
  level: { level: number; title: string; currentXP: number; nextLevelXP: number; progress: number };
  unlockedAchievements: number;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Error, Warning.
- Text properties: `level`, `summary`, `unlockedAchievements`.
- Instance swaps: `Award`, `BookOpenCheck`, `CheckCircle2`, `Code2`, `Flame`, `Gauge`, `Rocket`, `Trophy`.
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
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `p-4`, `px-3`, `py-2` |
| Sizing | `h-11`, `w-11` |
| Typography | `font-black`, `font-semibold`, `text-2xl`, `text-3xl`, `text-4xl`, `text-brand-2`, `text-brand-3`, `text-muted`, `text-sm`, `text-xs`, `tracking-[0.16em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/25`, `border-brand-3/25`, `border-current/20` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-current/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-current/10` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/25` | base | static occurrence |
| `border-brand-3/25` | base | static occurrence |
| `border-current/20` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-11` | base | conditional or expression-derived |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `sm:col-span-2` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-4xl` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-11` | base | conditional or expression-derived |
| `xl:col-span-1` | xl | static occurrence |
| `xl:col-span-3` | xl | static occurrence |
| `xl:grid-cols-3` | xl | static occurrence |

Exact className combinations:

- `block text-xs font-black uppercase tracking-[0.16em] text-muted`
- `flex flex-wrap items-center justify-between gap-3`
- `flex items-start justify-between gap-3`
- `grid gap-3 sm:grid-cols-2 xl:grid-cols-3`
- `grid h-11 w-11 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2`
- `grid h-11 w-11 place-items-center rounded-lg border border-current/20 bg-current/10`
- `inline-flex items-center gap-2 rounded-full border border-brand-3/25 bg-brand-3/10 px-3 py-2 text-sm font-black text-brand-3`
- `mt-1 block text-sm font-black text-brand-3`
- `mt-1 text-sm font-semibold text-muted`
- `mt-2 block text-2xl font-black`
- `mt-2 block text-4xl font-black`
- `mt-3 block text-3xl font-black`
- `mt-4`
- `p-4`
- `p-4 sm:col-span-2 xl:col-span-1`
- `p-4 sm:col-span-2 xl:col-span-3`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid h-11 w-11 place-items-center rounded-lg border border-current/20 bg-current/10 ${tone}\``

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

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:col-span-2`, `sm:grid-cols-2`, `xl:col-span-1`, `xl:col-span-3`, `xl:grid-cols-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Résumé de progression JavaScript"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Award`, `BookOpenCheck`, `CheckCircle2`, `Code2`, `Flame`, `Gauge`, `Rocket`, `Trophy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Error, Warning.
- Instance swaps: `Award`, `BookOpenCheck`, `CheckCircle2`, `Code2`, `Flame`, `Gauge`, `Rocket`, `Trophy`.
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
