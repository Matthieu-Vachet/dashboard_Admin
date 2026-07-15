---
id: MWI-COMP-081
component: "JsProgress"
category: "Form feature"
status: exported
source: "src/components/admin/forms/js-progress.tsx"
lines: 18-100
figma_priority: 34
evidence: static_code
---

# JsProgress

## 1. Purpose

Form feature component implemented in src/components/admin/forms/js-progress.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-081`.
- Location: `Dashboard Admin/src/components/admin/forms/js-progress.tsx`:18.
- File range: lines 18–100.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo, useState | external package |
| lucide-react | AlertTriangle, BookOpenCheck, CheckCircle2, Database, Download, HardDrive, Sparkles, UploadCloud, X | icons |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/admin/learning/learning-achievement-grid | LearningAchievementGrid | internal |
| @/components/admin/learning/learning-activity | LearningActivityTimeline | internal |
| @/components/admin/learning/learning-advanced-stats | LearningAdvancedStats | internal |
| @/components/admin/learning/learning-detail-modal | LearningDetailModal | internal |
| @/components/admin/learning/learning-import-modal | LearningImportModal | internal |
| @/components/admin/learning/learning-summary | LearningSummary | internal |
| @/components/admin/learning/learning-topic-card | LearningTopicCard | internal |
| @/lib/learning/javascript | getAchievements, getCurrentLevel, getLearningSummary | internal |
| @/hooks/admin/use-javascript-learning | useJavascriptLearning | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-095 | [LearningAchievementGrid](../components/components-admin-learning-learning-achievement-grid-learningachievementgrid.md) (MWI-COMP-095) | JSX/import relation |
| MWI-COMP-096 | [LearningActivityTimeline](../components/components-admin-learning-learning-activity-learningactivitytimeline.md) (MWI-COMP-096) | JSX/import relation |
| MWI-COMP-097 | [LearningAdvancedStats](../components/components-admin-learning-learning-advanced-stats-learningadvancedstats.md) (MWI-COMP-097) | JSX/import relation |
| MWI-COMP-098 | [LearningDetailModal](../components/components-admin-learning-learning-detail-modal-learningdetailmodal.md) (MWI-COMP-098) | JSX/import relation |
| MWI-COMP-115 | [LearningImportModal](../components/components-admin-learning-learning-import-modal-learningimportmodal.md) (MWI-COMP-115) | JSX/import relation |
| MWI-COMP-118 | [LearningSummary](../components/components-admin-learning-learning-summary-learningsummary.md) (MWI-COMP-118) | JSX/import relation |
| MWI-COMP-119 | [LearningTopicCard](../components/components-admin-learning-learning-topic-card-learningtopiccard.md) (MWI-COMP-119) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `AlertTriangle`, `BookOpenCheck`, `CheckCircle2`, `Database`, `Download`, `HardDrive`, `Sparkles`, `UploadCloud`, `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-006 | [JsProgressPage](../components/app-dashboard-js-progress-page-jsprogresspage.md) (MWI-COMP-006) | Renders/imports this component |
| MWI-COMP-272 | [JsProgress](../components/components-dashboard-js-progress-jsprogress.md) (MWI-COMP-272) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div data-testid="js-progress-page">
  - <Card>
    - <div />
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
    - <div>
      - <div>
        - <span>
          - <Database />
        - <span>
          - <Sparkles />
        - <span>
          - <BookOpenCheck />
      - <div>
        - <Button>
        - <Button>
          - <a>
        - <Button>
          - <a>
        - <Button>
          - <a>
        - <Button>
          - <a>
  - <div>
    - <HardDrive />
    - <span>
  - <div>
  - <div role="status" aria-live="polite">
    - <span>
      - <CheckCircle2 />
      - <AlertTriangle />
    - <button aria-label="Masquer le message">
      - <X />
  - <LearningSummary />
  - <LearningAdvancedStats />
  - <section aria-labelledby="learning-topics-title">
    - <div>
      - <div>
        - <p>
        - <h2 id="learning-topics-title">
      - <span>
    - <div>
      - <div>
        - <div>
          - <h3>
          - <p>
        - <Badge>
      - <div>
        - <LearningTopicCard />
  - <LearningAchievementGrid />
  - <LearningActivityTimeline />
  - <LearningDetailModal />
  - <LearningImportModal />
  - <span aria-live="polite">

Unique HTML/React tags: `a`, `AlertTriangle`, `Badge`, `BookOpenCheck`, `button`, `Button`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `CheckCircle2`, `Database`, `div`, `Download`, `h2`, `h3`, `HardDrive`, `LearningAchievementGrid`, `LearningActivityTimeline`, `LearningAdvancedStats`, `LearningDetailModal`, `LearningImportModal`, `LearningSummary`, `LearningTopicCard`, `p`, `section`, `span`, `Sparkles`, `UploadCloud`, `X`.

## 5. React structure and state management

- Hooks: `useJavascriptLearning`, `useMemo`, `useState`.
- Local state initializers: `importOpen = false`, `selectedTopicId = null`.
- Event handlers exposed in JSX: `onChanged`, `onClick`, `onClose`, `onNotify`, `onOpen`, `onSetProgress`.
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

- Boolean properties for Figma: Hover, Selected, Error, Warning, Success, Empty, Expanded.
- Text properties: Not found.
- Instance swaps: `AlertTriangle`, `BookOpenCheck`, `CheckCircle2`, `Database`, `Download`, `HardDrive`, `Sparkles`, `UploadCloud`, `X`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
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
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-end, items-start, justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `rgba(32,211,255,.2)`, `rgba(88,242,169,.16)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-0.5`, `mt-1`, `mt-4`, `p-0`, `p-1`, `p-3`, `p-5`, `pb-2`, `px-3`, `px-4`, `px-5`, `py-1.5`, `space-y-3`, `space-y-4`, `space-y-6` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `hover:text-foreground`, `sm:text-3xl`, `text-2xl`, `text-amber-100`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-lg`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-warning`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-b`, `border-brand-2/20`, `border-brand-2/30`, `border-brand-3/20`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/20`, `border-brand/30`, `border-danger/25`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/25`, `border-warning/30`, `border-warning/35`, `border-white/10`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]`, `bg-brand-2/10`, `bg-brand-3/[0.06]`, `bg-brand-3/10`, `bg-brand/10`, `bg-brand/12`, `bg-danger/[0.06]`, `bg-danger/10`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/[0.06]`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `hover:bg-white/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/[0.06]` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/[0.06]` | base | conditional or expression-derived |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/[0.06]` | base | conditional or expression-derived |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-b` | base | conditional or expression-derived |
| `border-brand-2/20` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/20` | base | static occurrence |
| `border-brand-3/25` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/20` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/25` | base | conditional or expression-derived |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/25` | base | conditional or expression-derived |
| `border-warning/30` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | conditional or expression-derived |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:bg-white/10` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-end` | base | static occurrence |
| `items-start` | base | conditional or expression-derived |
| `justify-between` | base | conditional or expression-derived |
| `lg:grid-cols-2` | lg | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-0.5` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-5` | base | static occurrence |
| `pb-2` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `space-y-6` | base | static occurrence |
| `sr-only` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand` | base | conditional or expression-derived |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | conditional or expression-derived |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-violet-100` | base | static occurrence |
| `text-warning` | base | conditional or expression-derived |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-brand-2`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/25 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/10 text-brand`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/10 text-danger`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/30 bg-warning/10 text-warning`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-white/10 bg-white/[0.045] text-muted`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-wrap gap-2`
- `flex flex-wrap gap-2 text-xs font-black text-muted`
- `flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2`
- `flex flex-wrap items-end justify-between gap-3`
- `flex items-start gap-2`
- `flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-sm font-bold text-warning`
- `flex items-start justify-between gap-3 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-bold text-brand-3`
- `flex items-start justify-between gap-3 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-bold text-danger`
- `flex items-start justify-between gap-3 rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-sm font-bold text-warning`
- `grid gap-4 lg:grid-cols-2`
- `h-10 w-10 p-0`
- `inline-flex items-center gap-2 rounded-full border border-brand-2/20 bg-brand-2/10 px-3 py-1.5`
- `inline-flex items-center gap-2 rounded-full border border-brand-3/20 bg-brand-3/10 px-3 py-1.5`
- `inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-0.5 shrink-0`
- `mt-1 text-2xl font-black`
- `mt-1 text-sm font-semibold text-muted`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]`
- `relative overflow-hidden p-5`
- `relative z-10 flex-col sm:flex-row`
- `relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3`
- `rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-bold text-danger`
- `shrink-0 rounded p-1 hover:bg-white/10`
- `space-y-3`
- `space-y-4`
- `space-y-6`
- `sr-only`
- `text-2xl sm:text-3xl`
- `text-lg font-black`
- `text-sm font-bold text-muted`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `notice.tone === "error" ? "flex items-start justify-between gap-3 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-bold text-danger" : notice.tone === "warning" ? "flex items-start justify-between gap-3 rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-sm font-bold text-warning" : "flex items-start justify-between gap-3 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-bold text-brand-3"`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

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
src/components/ui/button.tsx#sizes
sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
  icon: "h-10 w-10 p-0",
}
```

```tsx
src/components/ui/button.tsx#variants
variants: Record<ButtonVariant, string> = {
  primary:
    "dashboard-primary-button border-transparent text-white hover:brightness-110",
  secondary:
    "border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]",
  ghost: "border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground",
  danger:
    "border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20",
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

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

### Data attributes

- `data-testid="js-progress-page"`

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-2`, `sm:flex-row`, `sm:text-3xl`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Masquer le message"`, `aria-labelledby="learning-topics-title"`, `aria-live="polite"`.
- Roles: `role="status"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `AlertTriangle`, `BookOpenCheck`, `CheckCircle2`, `Database`, `Download`, `HardDrive`, `Sparkles`, `UploadCloud`, `X`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Error, Warning, Success, Empty, Expanded.
- Instance swaps: `AlertTriangle`, `BookOpenCheck`, `CheckCircle2`, `Database`, `Download`, `HardDrive`, `Sparkles`, `UploadCloud`, `X`.
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
| — | Focused | Not found |
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: lg | Tailwind lg: utilities |
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
