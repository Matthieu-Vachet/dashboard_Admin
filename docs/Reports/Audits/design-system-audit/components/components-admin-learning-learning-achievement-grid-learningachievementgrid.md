---
id: MWI-COMP-095
component: "LearningAchievementGrid"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-achievement-grid.tsx"
lines: 14-49
figma_priority: 31
evidence: static_code
---

# LearningAchievementGrid

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-achievement-grid.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-095`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-achievement-grid.tsx`:14.
- File range: lines 14–49.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | LockKeyhole, Trophy | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card | internal |
| @/components/admin/learning/learning-progress-bar | LearningProgressBar | internal |
| @/lib/learning/javascript | getLearningMetricLabel | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-117 | [LearningProgressBar](../components/components-admin-learning-learning-progress-bar-learningprogressbar.md) (MWI-COMP-117) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `LockKeyhole`, `Trophy`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section aria-labelledby="learning-achievements-title">
  - <div>
    - <div>
      - <p>
      - <h2 id="learning-achievements-title">
    - <span>
  - <div>
    - <Card>
      - <div>
        - <span>
          - <Trophy />
          - <LockKeyhole />
        - <div>
          - <div>
            - <h3>
            - <Badge>
          - <p>
      - <div>
        - <span>
        - <span>
      - <LearningProgressBar />

Unique HTML/React tags: `Badge`, `Card`, `div`, `h2`, `h3`, `LearningProgressBar`, `LockKeyhole`, `p`, `section`, `span`, `Trophy`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| achievements | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ achievements }: { achievements: AchievementView[] }
```

Exact local props contract when statically resolvable:

```tsx
{ achievements: AchievementView[] }

type AchievementView = LearningAchievement & {
  value: number;
  progress: number;
  unlocked: boolean;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Error, Warning, Success.
- Text properties: `achievements`.
- Instance swaps: `LockKeyhole`, `Trophy`.
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
- Alignment utilities: `items-center, items-end, items-start, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-2`, `mt-4`, `p-4`, `space-y-3` |
| Sizing | `h-10`, `min-w-0`, `w-10` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `leading-5`, `text-2xl`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | `opacity-75` |
| Background | `bg-brand-2/10`, `bg-brand-3/[0.06]`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/[0.06]` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | conditional or expression-derived |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/25` | base | conditional or expression-derived |
| `border-brand-3/30` | base | conditional or expression-derived |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-warning/35` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-10` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `items-end` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `opacity-75` | base | conditional or expression-derived |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `space-y-3` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | conditional or expression-derived |
| `xl:grid-cols-3` | xl | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/[0.06] p-4`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `flex flex-wrap items-center gap-2`
- `flex flex-wrap items-end justify-between gap-3`
- `flex items-start gap-3`
- `font-black`
- `grid gap-3 md:grid-cols-2 xl:grid-cols-3`
- `grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-brand-3/25 bg-brand-3/10 text-brand-3`
- `grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.045] text-muted`
- `min-w-0`
- `mt-1 text-2xl font-black`
- `mt-1 text-sm font-semibold leading-5 text-muted`
- `mt-2`
- `mt-4 flex items-center justify-between gap-3 text-xs font-black text-muted`
- `p-4 opacity-75`
- `space-y-3`
- `text-sm font-bold text-muted`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `achievement.unlocked ? "border-brand-3/30 bg-brand-3/[0.06] p-4" : "p-4 opacity-75"`
- `achievement.unlocked ? "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-brand-3/25 bg-brand-3/10 text-brand-3" : "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.045] text-muted"`

### CSS variables

Not found

### Inline style expressions

Not found

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

- Breakpoints used: `md`, `xl`.
- Responsive utilities: `md:grid-cols-2`, `xl:grid-cols-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-labelledby="learning-achievements-title"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `LockKeyhole`, `Trophy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Error, Warning, Success.
- Instance swaps: `LockKeyhole`, `Trophy`.
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
| □ | Responsive: md | Tailwind md: utilities |
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
