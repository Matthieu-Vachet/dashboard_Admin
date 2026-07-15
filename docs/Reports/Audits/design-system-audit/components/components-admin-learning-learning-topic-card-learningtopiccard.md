---
id: MWI-COMP-119
component: "LearningTopicCard"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-topic-card.tsx"
lines: 9-80
figma_priority: 31
evidence: static_code
---

# LearningTopicCard

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-topic-card.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-119`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-topic-card.tsx`:9.
- File range: lines 9–80.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ArrowUpRight, BookMarked, BookOpenCheck, Code2, Download, ExternalLink, Rocket, ScrollText, Target | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card | internal |
| @/constants/admin/learning | LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL | internal |
| @/components/admin/learning/learning-progress-bar | LearningProgressBar | internal |
| @/lib/learning/javascript | getTopicStats | internal |
| @/types/admin/learning | RuntimeLearningTopic | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-117 | [LearningProgressBar](../components/components-admin-learning-learning-progress-bar-learningprogressbar.md) (MWI-COMP-117) | JSX/import relation |
| MWI-COMP-120 | [TopicMetric](../components/components-admin-learning-learning-topic-card-topicmetric.md) (MWI-COMP-120) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `ArrowUpRight`, `BookMarked`, `Download`, `ExternalLink`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Card>
  - <div />
  - <div>
    - <div>
      - <div>
        - <div>
          - <Badge>
          - <Badge>
          - <Badge>
        - <h2>
        - <p>
      - <span>
    - <div>
      - <span>
      - <span>
    - <LearningProgressBar />
    - <div>
      - <span>
        - <BookMarked />
      - <a>
        - <ExternalLink />
    - <div>
      - <TopicMetric />
      - <TopicMetric />
      - <TopicMetric />
      - <TopicMetric />
      - <TopicMetric />
    - <div>
      - <button>
        - <ArrowUpRight />
      - <a>
        - <Download />

Unique HTML/React tags: `a`, `ArrowUpRight`, `Badge`, `BookMarked`, `button`, `Card`, `div`, `Download`, `ExternalLink`, `h2`, `LearningProgressBar`, `p`, `span`, `TopicMetric`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onOpen | Not found | See exact signature/contract below |
| topic | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  topic,
  onOpen,
}: {
  topic: RuntimeLearningTopic;
  onOpen: () => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  topic: RuntimeLearningTopic;
  onOpen: () => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Error, Warning, Success.
- Text properties: `onOpen`, `topic`.
- Instance swaps: `ArrowUpRight`, `BookMarked`, `BookOpenCheck`, `Code2`, `Download`, `ExternalLink`, `Rocket`, `ScrollText`, `Target`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(144,91,244,.05)`, `rgba(32,211,255,.1)`, `rgba(32,211,255,.12)` |
| Spacing | `gap-1.5`, `gap-2`, `gap-3`, `inset-0`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `p-4`, `px-2.5`, `px-3`, `px-4`, `py-1.5`, `py-2`, `py-2.5`, `sm:p-5` |
| Sizing | `max-w-2xl`, `min-h-11`, `min-w-0`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-amber-100`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-warning`, `text-xl`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/20`, `border-brand-2/25`, `border-brand-2/30`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-warning/30`, `border-warning/35`, `border-white/10`, `focus:outline-none`, `focus:ring-4`, `focus:ring-brand-2/15`, `hover:border-brand-2/35` |
| Shadows/elevation | `hover:shadow-[0_18px_60px_rgba(32,211,255,.1)]` |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_90%_0%,rgba(32,211,255,.12),transparent_36%),linear-gradient(135deg,rgba(144,91,244,.05),transparent_45%)]`, `bg-black/15`, `bg-brand-2/[0.06]`, `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/10`, `bg-brand/12`, `bg-danger/10`, `bg-danger/12`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `hover:bg-brand-2/15`, `hover:bg-brand-2/20` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_90%_0%,rgba(32,211,255,.12),transparent_36%),linear-gradient(135deg,rgba(144,91,244,.05),transparent_45%)]` | base | static occurrence |
| `bg-black/15` | base | static occurrence |
| `bg-brand-2/[0.06]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/20` | base | static occurrence |
| `border-brand-2/25` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/25` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-warning/30` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:outline-none` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-brand-2/15` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:bg-brand-2/15` | hover | static occurrence |
| `hover:bg-brand-2/20` | hover | static occurrence |
| `hover:border-brand-2/35` | hover | static occurrence |
| `hover:shadow-[0_18px_60px_rgba(32,211,255,.1)]` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `py-2.5` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-[1fr_auto]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-brand-2`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/25 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/10 text-brand`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/10 text-danger`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/30 bg-warning/10 text-warning`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-white/10 bg-white/[0.045] text-muted`
- `flex flex-wrap items-center gap-2`
- `flex flex-wrap items-start justify-between gap-3`
- `inline-flex items-center gap-1.5 rounded-full border border-brand-2/20 bg-brand-2/[0.06] px-2.5 py-1.5 text-brand-2 transition hover:bg-brand-2/15`
- `inline-flex items-center gap-1.5 rounded-full border border-line bg-black/15 px-2.5 py-1.5`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.045] px-3 py-2.5 text-xs font-black text-muted transition hover:text-foreground`
- `inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand-2/30 bg-brand-2/10 px-4 py-2.5 text-sm font-black text-brand-2 transition hover:bg-brand-2/20 focus:outline-none focus:ring-4 focus:ring-brand-2/15`
- `min-w-0`
- `mt-2`
- `mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted`
- `mt-3 flex flex-wrap gap-2 text-xs font-bold text-muted`
- `mt-3 text-xl font-black`
- `mt-4 flex items-center justify-between gap-3 text-xs font-black text-muted`
- `mt-5 grid gap-2 sm:grid-cols-[1fr_auto]`
- `mt-5 grid gap-2 sm:grid-cols-2`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(32,211,255,.12),transparent_36%),linear-gradient(135deg,rgba(144,91,244,.05),transparent_45%)]`
- `relative`
- `relative overflow-hidden p-4 transition hover:-translate-y-0.5 hover:border-brand-2/35 hover:shadow-[0_18px_60px_rgba(32,211,255,.1)] sm:p-5`
- `shrink-0 rounded-lg border border-brand-2/25 bg-brand-2/10 px-3 py-2 font-mono text-sm font-black text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `LEARNING_DIFFICULTY_CLASS[topic.difficulty]`
- `LEARNING_STATUS_CLASS[topic.status]`

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

```tsx
src/constants/admin/learning.ts#LEARNING_DIFFICULTY_CLASS
LEARNING_DIFFICULTY_CLASS: Record<LearningDifficulty, string> = {
  Facile: "border-brand-3/25 bg-brand-3/10 text-brand-3",
  Moyen: "border-warning/30 bg-warning/10 text-warning",
  Difficile: "border-danger/30 bg-danger/10 text-danger",
}
```

```tsx
src/constants/admin/learning.ts#LEARNING_STATUS_CLASS
LEARNING_STATUS_CLASS: Record<LearningStatus, string> = {
  not_started: "border-white/10 bg-white/[0.045] text-muted",
  in_progress: "border-brand-2/30 bg-brand-2/10 text-brand-2",
  completed: "border-brand-3/30 bg-brand-3/10 text-brand-3",
  reviewing: "border-brand/30 bg-brand/10 text-brand",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid-cols-[1fr_auto]`, `sm:grid-cols-2`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
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

- Lucide icons: `ArrowUpRight`, `BookMarked`, `BookOpenCheck`, `Code2`, `Download`, `ExternalLink`, `Rocket`, `ScrollText`, `Target`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Error, Warning, Success.
- Instance swaps: `ArrowUpRight`, `BookMarked`, `BookOpenCheck`, `Code2`, `Download`, `ExternalLink`, `Rocket`, `ScrollText`, `Target`.
- Text properties: expose each textual prop from the props contract; when text is hardcoded, preserve it in the default instance.
- Variables: bind CSS variables and semantic token references listed in this document. Literal utilities remain documented implementation values.
- Constraints: infer from width/min/max and responsive utilities; any value not encoded is marked Estimated from implementation.
- Nested components: use the child component links below as true instances rather than detached groups.
- Interactive components: create prototype states only for interactions detected in the state/event tables.

## 18. Screenshot capture checklist

| Capture | State / variant | Evidence |
|---|---|---|
| □ | Default | Base render path |
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| □ | Focused | focus styling or handler |
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
