---
id: MWI-COMP-041
component: "Pomodoro"
category: "Dashboard feature"
status: exported
source: "src/components/admin/dashboard/pomodoro.tsx"
lines: 33-170
figma_priority: 34
evidence: static_code
---

# Pomodoro

## 1. Purpose

Dashboard feature component implemented in src/components/admin/dashboard/pomodoro.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-041`.
- Location: `Dashboard Admin/src/components/admin/dashboard/pomodoro.tsx`:33.
- File range: lines 33–170.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useMemo, useState | external package |
| framer-motion | motion | external package |
| lucide-react | Coffee, Pause, Play, RotateCcw, TimerReset | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/lib/use-persistent-state | usePersistentState | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-042 | [MiniStat](../components/components-admin-dashboard-pomodoro-ministat.md) (MWI-COMP-042) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `Pause`, `Play`, `RotateCcw`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-014 | [PomodoroPage](../components/app-dashboard-pomodoro-page-pomodoropage.md) (MWI-COMP-014) | Renders/imports this component |
| MWI-COMP-282 | [Pomodoro](../components/components-dashboard-pomodoro-pomodoro.md) (MWI-COMP-282) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <div />
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
  - <section>
    - <Card>
      - <div />
      - <div>
        - <div>
          - <motion.div />
          - <div />
          - <div>
            - <p>
            - <strong>
        - <div>
          - <button>
        - <div>
          - <Button>
            - <Play />
          - <Button>
            - <Pause />
          - <Button>
            - <RotateCcw />
    - <Card>
      - <CardHeader>
        - <CardTitle>
        - <CardDescription>
      - <div>
        - <MiniStat />
        - <MiniStat />
      - <div>
        - <div>
          - <span>
        - <p>

Unique HTML/React tags: `Badge`, `button`, `Button`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `div`, `MiniStat`, `motion.div`, `p`, `Pause`, `Play`, `RotateCcw`, `section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `mode = "focus"`, `running = false`, `secondsLeft = durations.focus`.
- Event handlers exposed in JSX: `onClick`.
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

- Boolean properties for Figma: Hover, Disabled, Error, Warning, Success.
- Text properties: Not found.
- Instance swaps: `Coffee`, `Pause`, `Play`, `RotateCcw`, `TimerReset`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Detected | disabled prop, attribute, or class |
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
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, justify-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `#20d3ff`, `rgba(255,209,102,.16)`, `rgba(255,255,255,.08)`, `rgba(32,211,255,.08)`, `rgba(32,211,255,.12)`, `rgba(32,211,255,.18)` |
| Spacing | `gap-2`, `gap-3`, `gap-5`, `inset-0`, `inset-3`, `mt-1`, `mt-3`, `mt-5`, `mt-6`, `p-0`, `p-3`, `p-4`, `p-5`, `px-3`, `px-4`, `px-5`, `py-2`, `space-y-2`, `space-y-5` |
| Sizing | `h-10`, `h-72`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10`, `w-72` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `sm:text-3xl`, `text-2xl`, `text-6xl`, `text-amber-100`, `text-brand-2`, `text-center`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/25`, `border-brand-2/30`, `border-brand-2/40`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-dashed`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | `shadow-[0_0_80px_rgba(32,211,255,.12)]` |
| Opacity | Not found |
| Background | `bg-[linear-gradient(135deg,rgba(32,211,255,.08),transparent_45%)]`, `bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,.16),transparent_32%)]`, `bg-background`, `bg-brand-2/10`, `bg-brand-2/15`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[linear-gradient(135deg,rgba(32,211,255,.08),transparent_45%)]` | base | static occurrence |
| `bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,.16),transparent_32%)]` | base | static occurrence |
| `bg-background` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/15` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/25` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/40` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-72` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `inset-0` | base | static occurrence |
| `inset-3` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | conditional or expression-derived |
| `px-5` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_0_80px_rgba(32,211,255,.12)]` | base | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-6xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | conditional or expression-derived |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-72` | base | static occurrence |
| `xl:grid-cols-[1fr_360px]` | xl | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `absolute inset-0 rounded-full`
- `absolute inset-3 rounded-full bg-background`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/40 bg-brand-2/15 text-brand-2`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.045] text-muted hover:text-foreground`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `grid gap-5 xl:grid-cols-[1fr_360px]`
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-1 block text-xs text-muted`
- `mt-3 block font-mono text-6xl font-black`
- `mt-5 flex flex-wrap justify-center gap-3`
- `mt-5 grid gap-3`
- `mt-5 space-y-2`
- `mt-6 flex flex-wrap justify-center gap-2`
- `p-5`
- `pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(32,211,255,.08),transparent_45%)]`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,.16),transparent_32%)]`
- `relative`
- `relative flex flex-col items-center text-center`
- `relative grid h-72 w-72 place-items-center rounded-full border border-brand-2/25 bg-brand-2/10 shadow-[0_0_80px_rgba(32,211,255,.12)]`
- `relative overflow-hidden p-5`
- `relative z-10`
- `rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted`
- `rounded-lg border border-line bg-white/[0.045] p-3 text-sm font-bold`
- `rounded-lg border px-4 py-2 text-sm font-black transition`
- `space-y-5`
- `text-2xl sm:text-3xl`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "rounded-lg border px-4 py-2 text-sm font-black transition", mode === item ? "border-brand-2/40 bg-brand-2/15 text-brand-2" : "border-line bg-white/[0.045] text-muted hover:text-foreground", )`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

- `{{ background: \`conic-gradient(#20d3ff ${progress}%, rgba(255,255,255,.08) ${progress}% 100%)\`, }}`

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

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:text-3xl`, `xl:grid-cols-[1fr_360px]`.
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

- Lucide icons: `Coffee`, `Pause`, `Play`, `RotateCcw`, `TimerReset`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Disabled, Error, Warning, Success.
- Instance swaps: `Coffee`, `Pause`, `Play`, `RotateCcw`, `TimerReset`.
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
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| □ | Disabled | disabled prop, attribute, or class |
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
