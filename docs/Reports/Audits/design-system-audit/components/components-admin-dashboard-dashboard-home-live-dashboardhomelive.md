---
id: MWI-COMP-030
component: "DashboardHomeLive"
category: "Dashboard feature"
status: exported
source: "src/components/admin/dashboard/dashboard-home-live.tsx"
lines: 95-360
figma_priority: 34
evidence: static_code
---

# DashboardHomeLive

## 1. Purpose

Dashboard feature component implemented in src/components/admin/dashboard/dashboard-home-live.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-030`.
- Location: `Dashboard Admin/src/components/admin/dashboard/dashboard-home-live.tsx`:95.
- File range: lines 95–360.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/link | Link | external package |
| framer-motion | motion | external package |
| lucide-react | BookOpen, CalendarDays, CheckSquare2, Code2, Database, FileText, FolderKanban, Link2, NotebookPen, Palette, ShieldCheck, Sparkles, Wrench | icons |
| react | useEffect, useState, ReactNode | external package |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/admin/pokemon/pokemon-api-status | PokemonApiStatus | internal |
| @/components/admin/shared/sortable-widget-grid | SortableWidgetGrid, SortableWidgetItem | internal |
| @/data/personal-dashboard-defaults | initialBoard, initialContacts, initialEvents, initialFocusMinutes, initialJournal, initialLinks, initialNotes, initialProjects, initialSnippets, initialSubscriptions, initialTodos, kanbanColumns | internal |
| @/data/daily-code-tips | getDailyCodeTip | internal |
| @/lib/pokemon | PokemonMetrics | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-031 | [DailyCodePost](../components/components-admin-dashboard-dashboard-home-live-dailycodepost.md) (MWI-COMP-031) | JSX/import relation |
| MWI-COMP-032 | [WidgetContent](../components/components-admin-dashboard-dashboard-home-live-widgetcontent.md) (MWI-COMP-032) | JSX/import relation |
| MWI-COMP-033 | [LiveStat](../components/components-admin-dashboard-dashboard-home-live-livestat.md) (MWI-COMP-033) | JSX/import relation |
| MWI-COMP-034 | [SignalRow](../components/components-admin-dashboard-dashboard-home-live-signalrow.md) (MWI-COMP-034) | JSX/import relation |
| MWI-COMP-035 | [MiniMetric](../components/components-admin-dashboard-dashboard-home-live-minimetric.md) (MWI-COMP-035) | JSX/import relation |
| MWI-COMP-036 | [GenerationBars](../components/components-admin-dashboard-dashboard-home-live-generationbars.md) (MWI-COMP-036) | JSX/import relation |
| MWI-COMP-037 | [KanbanBars](../components/components-admin-dashboard-dashboard-home-live-kanbanbars.md) (MWI-COMP-037) | JSX/import relation |
| MWI-COMP-038 | [ActionLink](../components/components-admin-dashboard-dashboard-home-live-actionlink.md) (MWI-COMP-038) | JSX/import relation |
| MWI-COMP-039 | [ExternalButton](../components/components-admin-dashboard-dashboard-home-live-externalbutton.md) (MWI-COMP-039) | JSX/import relation |
| MWI-COMP-040 | [EmptyLine](../components/components-admin-dashboard-dashboard-home-live-emptyline.md) (MWI-COMP-040) | JSX/import relation |
| MWI-COMP-193 | [PokemonApiStatus](../components/components-admin-pokemon-pokemon-api-status-pokemonapistatus.md) (MWI-COMP-193) | JSX/import relation |
| MWI-COMP-238 | [SortableWidgetGrid](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) (MWI-COMP-238) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `Code2`, `Link`, `ShieldCheck`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-010 | [DashboardHome](../components/app-dashboard-page-dashboardhome.md) (MWI-COMP-010) | Renders/imports this component |
| MWI-COMP-269 | [DashboardHomeLive](../components/components-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-269) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <WidgetContent>
  - <div>
    - <SignalRow />
    - <SignalRow />
    - <SignalRow />
    - <SignalRow />
- <DailyCodePost />
- <WidgetContent>
  - <div>
    - <MiniMetric />
    - <MiniMetric />
    - <MiniMetric />
  - <GenerationBars />
- <WidgetContent>
  - <KanbanBars />
- <WidgetContent>
  - <div>
    - <Link>
      - <span>
      - <span>
        - <strong>
        - <small>
    - <EmptyLine>
- <WidgetContent>
  - <div>
    - <Link>
      - <div>
        - <strong>
        - <Badge>
      - <div>
        - <span />
- <WidgetContent>
  - <div>
    - <MiniMetric />
    - <MiniMetric />
    - <MiniMetric />
    - <MiniMetric />
    - <MiniMetric />
    - <MiniMetric />
- <WidgetContent>
  - <div>
    - <ExternalButton />
    - <ExternalButton />
    - <ExternalButton />
- <WidgetContent>
  - <div>
    - <ActionLink />
    - <ActionLink />
    - <ActionLink />
    - <ActionLink />
- <Card>
  - <div>
- <div>
  - <section>
    - <motion.div>
      - <Card>
        - <div />
        - <div>
          - <div>
            - <Badge>
            - <h2>
            - <p>
          - <div>
            - <Button>
              - <Link>
                - <ShieldCheck />
            - <Button>
              - <Link>
                - <Code2 />
  - <section>
    - <LiveStat />
  - <SortableWidgetGrid />

Unique HTML/React tags: `ActionLink`, `Badge`, `Button`, `Card`, `Code2`, `DailyCodePost`, `div`, `EmptyLine`, `ExternalButton`, `GenerationBars`, `h2`, `KanbanBars`, `Link`, `LiveStat`, `MiniMetric`, `motion.div`, `p`, `PokemonApiStatus`, `section`, `ShieldCheck`, `SignalRow`, `small`, `SortableWidgetGrid`, `span`, `strong`, `WidgetContent`.

## 5. React structure and state management

- Hooks: `useEffect`, `usePersistentState`.
- Local state initializers: `metrics = null`.
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

- Boolean properties for Figma: Hover, Error, Warning, Success, Empty, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `BookOpen`, `CalendarDays`, `CheckSquare2`, `Code2`, `Database`, `FileText`, `FolderKanban`, `Link2`, `NotebookPen`, `Palette`, `ShieldCheck`, `Sparkles`, `Wrench`, `https://pokemon-go-api.vercel.app/api-docs`, `https://pokemon-go-api.vercel.app/swagger`.
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
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, justify-between, lg:items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `#20d3ff`, `#58f2a9`, `#905bf4`, `#ff5f7d`, `#ffd166`, `rgba(32,211,255,.14)`, `rgba(88,242,169,.12)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-2`, `mt-3`, `p-0`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `sm:p-5`, `space-y-2`, `space-y-3`, `space-y-5` |
| Sizing | `h-10`, `h-2`, `h-auto`, `h-full`, `max-w-2xl`, `max-w-3xl`, `min-h-10`, `min-h-12`, `min-h-9`, `min-w-0`, `w-10` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `leading-tight`, `sm:text-3xl`, `text-2xl`, `text-amber-100`, `text-brand-2`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-brand-2/45`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-[linear-gradient(115deg,rgba(32,211,255,.14),transparent_32%),linear-gradient(245deg,rgba(88,242,169,.12),transparent_30%)]`, `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-gradient-to-r`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `bg-white/10`, `from-brand`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `to-brand-3`, `via-brand-2` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-6` | 2xl | static occurrence |
| `absolute` | base | static occurrence |
| `bg-[linear-gradient(115deg,rgba(32,211,255,.14),transparent_32%),linear-gradient(245deg,rgba(88,242,169,.12),transparent_30%)]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[74px_1fr]` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `grid-cols-3` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-2` | base | static occurrence |
| `h-auto` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-brand-2/45` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `lg:grid-cols-[1fr_auto]` | lg | static occurrence |
| `lg:items-center` | lg | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `max-w-3xl` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-3` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `via-brand-2` | base | static occurrence |
| `w-10` | base | static occurrence |
| `xl:grid-cols-3` | xl | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `block h-full rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3`
- `block rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45`
- `block truncate text-sm font-black`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-wrap gap-2`
- `flex items-center justify-between gap-3`
- `font-mono text-xs font-black text-brand-2`
- `grid gap-2`
- `grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6`
- `grid grid-cols-[74px_1fr] rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45`
- `grid grid-cols-2 gap-3`
- `grid grid-cols-3 gap-3`
- `group flex h-auto flex-col overflow-hidden`
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0`
- `mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted`
- `mt-3 h-2 overflow-hidden rounded-full bg-white/10`
- `mt-3 max-w-3xl text-2xl font-black leading-tight sm:text-3xl`
- `p-4`
- `pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(32,211,255,.14),transparent_32%),linear-gradient(245deg,rgba(88,242,169,.12),transparent_30%)]`
- `relative overflow-hidden p-4 sm:p-5`
- `relative z-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center`
- `space-y-2`
- `space-y-3`
- `space-y-5`
- `text-xs font-bold text-muted`
- `truncate text-sm font-black`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

- `{{ width: \`${project.progress}%\` }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/dashboard/dashboard-home-live.tsx#chartColors
chartColors = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166", "#ff5f7d"]
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

`hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-6`, `lg:grid-cols-[1fr_auto]`, `lg:items-center`, `sm:grid-cols-2`, `sm:p-5`, `sm:text-3xl`, `xl:grid-cols-3`.
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

- Lucide icons: `BookOpen`, `CalendarDays`, `CheckSquare2`, `Code2`, `Database`, `FileText`, `FolderKanban`, `Link2`, `NotebookPen`, `Palette`, `ShieldCheck`, `Sparkles`, `Wrench`.
- Asset references: `https://pokemon-go-api.vercel.app/api-docs`, `https://pokemon-go-api.vercel.app/swagger`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success, Empty, Active, Inactive.
- Instance swaps: `BookOpen`, `CalendarDays`, `CheckSquare2`, `Code2`, `Database`, `FileText`, `FolderKanban`, `Link2`, `NotebookPen`, `Palette`, `ShieldCheck`, `Sparkles`, `Wrench`, `https://pokemon-go-api.vercel.app/api-docs`, `https://pokemon-go-api.vercel.app/swagger`.
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
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |
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
