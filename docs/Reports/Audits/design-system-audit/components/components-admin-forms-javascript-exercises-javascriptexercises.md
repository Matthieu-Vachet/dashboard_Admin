---
id: MWI-COMP-079
component: "JavaScriptExercises"
category: "Form feature"
status: exported
source: "src/components/admin/forms/javascript-exercises.tsx"
lines: 49-188
figma_priority: 34
evidence: static_code
---

# JavaScriptExercises

## 1. Purpose

Form feature component implemented in src/components/admin/forms/javascript-exercises.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-079`.
- Location: `Dashboard Admin/src/components/admin/forms/javascript-exercises.tsx`:49.
- File range: lines 49–188.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo, useState | external package |
| framer-motion | motion | external package |
| lucide-react | CheckCircle2, Code2, Dumbbell, ListChecks | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/data/javascript-learning | initialJsExerciseState, jsExercises, JsExerciseState | internal |
| @/lib/use-persistent-state | usePersistentState | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-080 | [Stat](../components/components-admin-forms-javascript-exercises-stat.md) (MWI-COMP-080) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `CheckCircle2`, `ListChecks`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-005 | [JavaScriptExercisesPage](../components/app-dashboard-exercices-javascript-page-javascriptexercisespage.md) (MWI-COMP-005) | Renders/imports this component |
| MWI-COMP-271 | [JavaScriptExercises](../components/components-dashboard-javascript-exercises-javascriptexercises.md) (MWI-COMP-271) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <div />
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
  - <section>
    - <Stat />
    - <Stat />
    - <Stat />
  - <div>
    - <button>
  - <section>
    - <motion.article>
      - <Card>
        - <div>
          - <div>
            - <span>
            - <h2>
          - <button>
        - <div>
          - <span>
        - <p>
        - <label>
          - <span>
            - <ListChecks />
          - <textarea />
        - <div>
          - <Button>
            - <CheckCircle2 />

Unique HTML/React tags: `Badge`, `button`, `Button`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `CheckCircle2`, `div`, `h2`, `label`, `ListChecks`, `motion.article`, `p`, `section`, `span`, `Stat`, `textarea`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `activeLevel = "Tous"`.
- Event handlers exposed in JSX: `onChange`, `onClick`.
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

- Boolean properties for Figma: Hover, Focused, Error, Warning, Success.
- Text properties: Not found.
- Instance swaps: `CheckCircle2`, `Code2`, `Dumbbell`, `ListChecks`.
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
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-end`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `rgba(139,92,246,.08)`, `rgba(14,165,233,.08)`, `rgba(144,91,244,.18)`, `rgba(16,185,129,.08)`, `rgba(244,63,94,.08)`, `rgba(245,158,11,.08)`, `rgba(32,211,255,.14)`, `rgba(34,211,238,.08)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mb-2`, `mt-1`, `mt-3`, `mt-4`, `p-0`, `p-3`, `p-4`, `p-5`, `px-2.5`, `px-3`, `px-4`, `px-5`, `py-1`, `py-2`, `space-y-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-56`, `min-h-9`, `min-w-0`, `w-10`, `w-full` |
| Typography | `font-black`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `sm:text-3xl`, `text-[11px]`, `text-2xl`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sky-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-amber-300/25`, `border-brand-2/30`, `border-brand-2/40`, `border-brand-3/30`, `border-brand-3/35`, `border-brand/30`, `border-cyan-300/25`, `border-danger/30`, `border-danger/35`, `border-emerald-300/25`, `border-line`, `border-rose-300/25`, `border-sky-300/25`, `border-transparent`, `border-violet-300/25`, `border-warning/35`, `border-white/10`, `focus:border-brand-2/50`, `focus:ring-4`, `focus:ring-brand-2/10`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | `shadow-[0_18px_60px_rgba(139,92,246,.08)]`, `shadow-[0_18px_60px_rgba(14,165,233,.08)]`, `shadow-[0_18px_60px_rgba(16,185,129,.08)]`, `shadow-[0_18px_60px_rgba(244,63,94,.08)]`, `shadow-[0_18px_60px_rgba(245,158,11,.08)]`, `shadow-[0_18px_60px_rgba(34,211,238,.08)]` |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_15%_0%,rgba(144,91,244,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(32,211,255,.14),transparent_32%)]`, `bg-amber-400/[0.06]`, `bg-amber-400/12`, `bg-black/15`, `bg-brand-2/10`, `bg-brand-2/15`, `bg-brand-3/10`, `bg-brand-3/12`, `bg-brand-3/15`, `bg-brand/12`, `bg-cyan-400/[0.06]`, `bg-cyan-400/12`, `bg-danger/12`, `bg-danger/15`, `bg-emerald-400/[0.06]`, `bg-emerald-400/12`, `bg-rose-400/[0.06]`, `bg-rose-400/12`, `bg-sky-400/[0.06]`, `bg-sky-400/12`, `bg-slate-950/55`, `bg-transparent`, `bg-violet-400/[0.06]`, `bg-violet-400/12`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_15%_0%,rgba(144,91,244,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(32,211,255,.14),transparent_32%)]` | base | static occurrence |
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-black/15` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/15` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand-3/12` | base | conditional or expression-derived |
| `bg-brand-3/15` | base | conditional or expression-derived |
| `bg-brand/12` | base | static occurrence |
| `bg-cyan-400/[0.06]` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-emerald-400/[0.06]` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-rose-400/[0.06]` | base | static occurrence |
| `bg-rose-400/12` | base | static occurrence |
| `bg-sky-400/[0.06]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-slate-950/55` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/25` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/40` | base | conditional or expression-derived |
| `border-brand-3/30` | base | conditional or expression-derived |
| `border-brand-3/35` | base | conditional or expression-derived |
| `border-brand/30` | base | static occurrence |
| `border-cyan-300/25` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-emerald-300/25` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-rose-300/25` | base | static occurrence |
| `border-sky-300/25` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-violet-300/25` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-wrap` | base | static occurrence |
| `focus:border-brand-2/50` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-brand-2/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `inline-flex` | base | conditional or expression-derived |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `md:grid-cols-3` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-56` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `p-5` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-2.5` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | conditional or expression-derived |
| `px-5` | base | static occurrence |
| `py-1` | base | conditional or expression-derived |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | static occurrence |
| `resize-y` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_18px_60px_rgba(139,92,246,.08)]` | base | static occurrence |
| `shadow-[0_18px_60px_rgba(14,165,233,.08)]` | base | static occurrence |
| `shadow-[0_18px_60px_rgba(16,185,129,.08)]` | base | static occurrence |
| `shadow-[0_18px_60px_rgba(244,63,94,.08)]` | base | static occurrence |
| `shadow-[0_18px_60px_rgba(245,158,11,.08)]` | base | static occurrence |
| `shadow-[0_18px_60px_rgba(34,211,238,.08)]` | base | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | conditional or expression-derived |
| `text-brand-3` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `tracking-[0.16em]` | base | conditional or expression-derived |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | conditional or expression-derived |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-2` | xl | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `border-amber-300/25 bg-amber-400/[0.06] shadow-[0_18px_60px_rgba(245,158,11,.08)]`
- `border-amber-300/25 bg-amber-400/12 text-amber-100`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/40 bg-brand-2/15 text-brand-2`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand-3/30 bg-brand-3/15 text-brand-3`
- `border-brand-3/35 bg-brand-3/12`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-cyan-300/25 bg-cyan-400/[0.06] shadow-[0_18px_60px_rgba(34,211,238,.08)]`
- `border-cyan-300/25 bg-cyan-400/12 text-cyan-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-emerald-300/25 bg-emerald-400/[0.06] shadow-[0_18px_60px_rgba(16,185,129,.08)]`
- `border-emerald-300/25 bg-emerald-400/12 text-emerald-100`
- `border-line bg-white/[0.045] text-muted hover:text-foreground`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-rose-300/25 bg-rose-400/[0.06] shadow-[0_18px_60px_rgba(244,63,94,.08)]`
- `border-rose-300/25 bg-rose-400/12 text-rose-100`
- `border-sky-300/25 bg-sky-400/[0.06] shadow-[0_18px_60px_rgba(14,165,233,.08)]`
- `border-sky-300/25 bg-sky-400/12 text-sky-100`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-violet-300/25 bg-violet-400/[0.06] shadow-[0_18px_60px_rgba(139,92,246,.08)]`
- `border-violet-300/25 bg-violet-400/12 text-violet-100`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-start justify-between gap-3`
- `grid gap-3 md:grid-cols-3`
- `grid gap-4 xl:grid-cols-2`
- `h-10 w-10 p-0`
- `inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em]`
- `mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-56 w-full resize-y rounded-lg border border-line bg-slate-950/55 p-3 font-mono text-sm leading-6 text-foreground outline-none transition focus:border-brand-2/50 focus:ring-4 focus:ring-brand-2/10`
- `min-h-9 px-3 text-xs`
- `min-w-0`
- `mt-1 text-xl font-black`
- `mt-3 flex flex-wrap gap-2`
- `mt-3 flex justify-end`
- `mt-4 block`
- `mt-4 rounded-lg border border-line bg-black/15 p-3 text-sm font-semibold leading-6 text-muted`
- `overflow-hidden p-4`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(144,91,244,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(32,211,255,.14),transparent_32%)]`
- `relative overflow-hidden p-5`
- `relative z-10`
- `rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-black text-muted`
- `rounded-lg border px-3 py-2 text-xs font-black transition`
- `rounded-lg border px-4 py-2 text-sm font-black transition`
- `space-y-5`
- `text-2xl sm:text-3xl`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "rounded-lg border px-3 py-2 text-xs font-black transition", exerciseState.completed ? "border-brand-3/30 bg-brand-3/15 text-brand-3" : "border-line bg-white/[0.045] text-muted hover:text-foreground", )`
- `cn( "rounded-lg border px-4 py-2 text-sm font-black transition", activeLevel === level ? "border-brand-2/40 bg-brand-2/15 text-brand-2" : cn("border-line bg-white/[0.045] text-muted hover:text-foreground", level !== "Tous" && exerciseLevelBadge[level]), )`
- `cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em]", exerciseLevelBadge[exercise.level])`
- `cn("overflow-hidden p-4", exerciseLevelStyle[exercise.level], exerciseState.completed && "border-brand-3/35 bg-brand-3/12")`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/forms/javascript-exercises.tsx#exerciseLevelBadge
exerciseLevelBadge: Record<string, string> = {
  "Niveau 1": "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
  "Niveau 2": "border-cyan-300/25 bg-cyan-400/12 text-cyan-100",
  "Niveau 3": "border-violet-300/25 bg-violet-400/12 text-violet-100",
  "Niveau 4": "border-amber-300/25 bg-amber-400/12 text-amber-100",
  "Niveau 5": "border-rose-300/25 bg-rose-400/12 text-rose-100",
  "Niveau 6": "border-sky-300/25 bg-sky-400/12 text-sky-100",
}
```

```tsx
src/components/admin/forms/javascript-exercises.tsx#exerciseLevelStyle
exerciseLevelStyle: Record<string, string> = {
  "Niveau 1": "border-emerald-300/25 bg-emerald-400/[0.06] shadow-[0_18px_60px_rgba(16,185,129,.08)]",
  "Niveau 2": "border-cyan-300/25 bg-cyan-400/[0.06] shadow-[0_18px_60px_rgba(34,211,238,.08)]",
  "Niveau 3": "border-violet-300/25 bg-violet-400/[0.06] shadow-[0_18px_60px_rgba(139,92,246,.08)]",
  "Niveau 4": "border-amber-300/25 bg-amber-400/[0.06] shadow-[0_18px_60px_rgba(245,158,11,.08)]",
  "Niveau 5": "border-rose-300/25 bg-rose-400/[0.06] shadow-[0_18px_60px_rgba(244,63,94,.08)]",
  "Niveau 6": "border-sky-300/25 bg-sky-400/[0.06] shadow-[0_18px_60px_rgba(14,165,233,.08)]",
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

### Referenced global custom CSS rules

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `md`, `sm`, `xl`.
- Responsive utilities: `md:grid-cols-3`, `sm:text-3xl`, `xl:grid-cols-2`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CheckCircle2`, `Code2`, `Dumbbell`, `ListChecks`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Error, Warning, Success.
- Instance swaps: `CheckCircle2`, `Code2`, `Dumbbell`, `ListChecks`.
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
| □ | Responsive: md | Tailwind md: utilities |
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
