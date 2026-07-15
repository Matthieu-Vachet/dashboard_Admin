---
id: MWI-COMP-252
component: "DashboardBacklog"
category: "Component"
status: exported
source: "src/components/admin/tables/dashboard-backlog.tsx"
lines: 230-598
figma_priority: 34
evidence: static_code
---

# DashboardBacklog

## 1. Purpose

Component component implemented in src/components/admin/tables/dashboard-backlog.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-252`.
- Location: `Dashboard Admin/src/components/admin/tables/dashboard-backlog.tsx`:230.
- File range: lines 230–598.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ClipboardCopy, Plus, RefreshCcw, Search | icons |
| react | useEffect, useMemo, useState | external package |
| @/components/admin/shared/loading-state | DashboardLoadingState | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input | internal |
| @/components/ui/modal | Modal | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-237 | [DashboardLoadingState](../components/components-admin-shared-loading-state-dashboardloadingstate.md) (MWI-COMP-237) | JSX/import relation |
| MWI-COMP-253 | [BacklogStat](../components/components-admin-tables-dashboard-backlog-backlogstat.md) (MWI-COMP-253) | JSX/import relation |
| MWI-COMP-254 | [FilterSelect](../components/components-admin-tables-dashboard-backlog-filterselect.md) (MWI-COMP-254) | JSX/import relation |
| MWI-COMP-255 | [TicketCard](../components/components-admin-tables-dashboard-backlog-ticketcard.md) (MWI-COMP-255) | JSX/import relation |
| MWI-COMP-256 | [TicketForm](../components/components-admin-tables-dashboard-backlog-ticketform.md) (MWI-COMP-256) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `ClipboardCopy`, `Plus`, `RefreshCcw`, `Search`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-018 | [DashboardBacklogPage](../components/app-dashboard-tools-dashboard-backlog-page-dashboardbacklogpage.md) (MWI-COMP-018) | Renders/imports this component |
| MWI-COMP-266 | [DashboardBacklog](../components/components-dashboard-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-266) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DashboardLoadingState />
- <div>
  - <Card>
    - <div>
      - <div>
        - <Badge>
        - <h2>
        - <p>
      - <div>
        - <Button>
        - <Button>
        - <Button>
    - <div>
    - <div>
  - <section>
    - <BacklogStat />
    - <BacklogStat />
    - <BacklogStat />
    - <BacklogStat />
    - <BacklogStat />
    - <BacklogStat />
  - <Card>
    - <div>
      - <label>
        - <Search />
        - <Input />
      - <FilterSelect />
      - <FilterSelect />
      - <FilterSelect />
      - <FilterSelect />
      - <FilterSelect />
      - <FilterSelect />
  - <section>
    - <div>
      - <TicketCard />
      - <Card>
        - <div>
          - <p>
          - <p>
    - <Card>
      - <p>
      - <div>
        - <button>
          - <span>
          - <span>
  - <Modal>
    - <TicketForm />
    - <div>
      - <p>
      - <div>
        - <div>
          - <span>
          - <span>

Unique HTML/React tags: `BacklogStat`, `Badge`, `button`, `Button`, `Card`, `ClipboardCopy`, `DashboardLoadingState`, `div`, `FilterSelect`, `h2`, `Input`, `label`, `Modal`, `p`, `Plus`, `RefreshCcw`, `Search`, `section`, `span`, `TicketCard`, `TicketForm`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `componentFilter = "all"`, `configured = true`, `confirmDelete = false`, `copied = ""`, `draft = emptyDraft`, `editingId = null`, `error = ""`, `loading = true`, `modalOpen = false`, `pageFilter = "all"`, `priorityFilter = "all"`, `query = ""`, `saving = false`, `sortKey = "recent"`, `statusFilter = "all"`, `tickets = []`, `typeFilter = "all"`.
- Event handlers exposed in JSX: `onArchive`, `onChange`, `onClick`, `onClose`, `onCopy`, `onDelete`, `onEdit`, `onMarkDone`, `onSave`, `onUpdate`.
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

- Boolean properties for Figma: Hover, Focused, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `ClipboardCopy`, `Plus`, `RefreshCcw`, `Search`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, justify-between, lg:items-center, lg:justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `rgba(248,113,113,.08)`, `rgba(248,113,113,.12)`, `rgba(34,211,238,.07)`, `rgba(34,211,238,.12)`, `rgba(52,211,153,.08)`, `rgba(52,211,153,.14)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `p-0`, `p-2`, `p-3`, `p-4`, `p-5`, `p-6`, `px-0`, `px-3`, `px-4`, `px-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-10`, `max-w-3xl`, `max-w-5xl`, `min-h-0`, `min-h-10`, `min-h-11`, `min-h-12`, `min-h-56`, `min-h-9`, `min-w-0`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-3xl`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-center`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-lg`, `text-muted`, `text-rose-100`, `text-slate-200`, `text-sm`, `text-violet-100`, `text-violet-200`, `text-warning`, `text-white`, `text-xs`, `tracking-[0.16em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-0`, `border-brand-2/30`, `border-brand-2/35`, `border-brand-2/40`, `border-brand-2/50`, `border-brand-3/30`, `border-brand-3/35`, `border-brand-3/40`, `border-brand-3/60`, `border-brand/30`, `border-brand/40`, `border-danger/30`, `border-danger/35`, `border-danger/40`, `border-danger/45`, `border-danger/55`, `border-l-4`, `border-l-brand-2`, `border-l-brand-3`, `border-l-danger`, `border-l-slate-400/80`, `border-l-slate-500/50`, `border-l-warning`, `border-line`, `border-slate-400/25`, `border-slate-400/35`, `border-transparent`, `border-warning/35`, `border-warning/40`, `border-warning/45`, `hover:border-brand-2/45`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | `shadow-[0_0_24px_rgba(248,113,113,.12)]`, `shadow-[0_0_24px_rgba(34,211,238,.12)]`, `shadow-[0_0_28px_rgba(52,211,153,.14)]`, `shadow-[inset_0_0_28px_rgba(248,113,113,.08)]`, `shadow-[inset_0_0_28px_rgba(34,211,238,.07)]`, `shadow-[inset_0_0_28px_rgba(52,211,153,.08)]` |
| Opacity | `opacity-70` |
| Background | `bg-brand-2/[0.07]`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-2/16`, `bg-brand-3/[0.09]`, `bg-brand-3/10`, `bg-brand-3/12`, `bg-brand-3/18`, `bg-brand/12`, `bg-danger/[0.08]`, `bg-danger/10`, `bg-danger/12`, `bg-danger/14`, `bg-danger/15`, `bg-danger/16`, `bg-slate-400/[0.035]`, `bg-slate-400/10`, `bg-slate-500/[0.035]`, `bg-transparent`, `bg-warning/[0.065]`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.035]`, `bg-white/[0.04]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `focus:bg-transparent`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-[minmax(0,1fr)_320px]` | 2xl | static occurrence |
| `bg-brand-2/[0.07]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | static occurrence |
| `bg-brand-2/16` | base | static occurrence |
| `bg-brand-3/[0.09]` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand-3/12` | base | static occurrence |
| `bg-brand-3/18` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/[0.08]` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/14` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-danger/16` | base | static occurrence |
| `bg-slate-400/[0.035]` | base | static occurrence |
| `bg-slate-400/10` | base | static occurrence |
| `bg-slate-500/[0.035]` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/[0.065]` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-0` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/35` | base | static occurrence |
| `border-brand-2/40` | base | static occurrence |
| `border-brand-2/50` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand-3/35` | base | static occurrence |
| `border-brand-3/40` | base | static occurrence |
| `border-brand-3/60` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-brand/40` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-danger/40` | base | static occurrence |
| `border-danger/45` | base | static occurrence |
| `border-danger/55` | base | static occurrence |
| `border-l-4` | base | static occurrence |
| `border-l-brand-2` | base | static occurrence |
| `border-l-brand-3` | base | static occurrence |
| `border-l-danger` | base | static occurrence |
| `border-l-slate-400/80` | base | static occurrence |
| `border-l-slate-500/50` | base | static occurrence |
| `border-l-warning` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-slate-400/25` | base | static occurrence |
| `border-slate-400/35` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-warning/40` | base | static occurrence |
| `border-warning/45` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:bg-transparent` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
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
| `hover:border-brand-2/45` | hover | conditional or expression-derived |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | conditional or expression-derived |
| `leading-6` | base | static occurrence |
| `lg:flex-row` | lg | static occurrence |
| `lg:items-center` | lg | static occurrence |
| `lg:justify-between` | lg | static occurrence |
| `max-w-3xl` | base | static occurrence |
| `max-w-5xl` | base | static occurrence |
| `min-h-0` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-56` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `opacity-70` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `p-6` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_0_24px_rgba(248,113,113,.12)]` | base | static occurrence |
| `shadow-[0_0_24px_rgba(34,211,238,.12)]` | base | static occurrence |
| `shadow-[0_0_28px_rgba(52,211,153,.14)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(248,113,113,.08)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(34,211,238,.07)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(52,211,153,.08)]` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-200` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |
| `xl:grid-cols-[1.3fr_repeat(6,minmax(130px,1fr))]` | xl | static occurrence |
| `xl:grid-cols-6` | xl | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/35 bg-brand-2/10 text-brand-2`
- `border-brand-2/40 bg-brand-2/12 text-brand-2`
- `border-brand-2/50 bg-brand-2/16 text-brand-2 shadow-[0_0_24px_rgba(34,211,238,.12)]`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand-3/35 bg-brand-3/10 text-brand-3`
- `border-brand-3/40 bg-brand-3/12 text-brand-3`
- `border-brand-3/60 bg-brand-3/18 text-brand-3 shadow-[0_0_28px_rgba(52,211,153,.14)]`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-brand/40 bg-brand/12 text-violet-200`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-danger/40 bg-danger/12 text-danger`
- `border-danger/45 bg-danger/14 text-danger`
- `border-danger/55 bg-danger/16 text-danger shadow-[0_0_24px_rgba(248,113,113,.12)]`
- `border-l-4 border-l-brand-2 bg-brand-2/[0.07] shadow-[inset_0_0_28px_rgba(34,211,238,.07)]`
- `border-l-4 border-l-brand-3 bg-brand-3/[0.09] shadow-[inset_0_0_28px_rgba(52,211,153,.08)]`
- `border-l-4 border-l-danger bg-danger/[0.08] shadow-[inset_0_0_28px_rgba(248,113,113,.08)]`
- `border-l-4 border-l-slate-400/80 bg-slate-400/[0.035]`
- `border-l-4 border-l-slate-500/50 bg-slate-500/[0.035] opacity-70`
- `border-l-4 border-l-warning bg-warning/[0.065]`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-slate-400/25 bg-slate-400/10 text-muted`
- `border-slate-400/35 bg-slate-400/10 text-slate-200`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-warning/40 bg-warning/12 text-warning`
- `border-warning/45 bg-warning/12 text-warning`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between`
- `flex flex-wrap gap-2`
- `flex items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.035] p-2 text-xs font-bold text-muted`
- `flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted`
- `flex w-full items-center justify-between rounded-lg border p-3 text-left transition hover:border-brand-2/45`
- `font-mono text-sm font-black`
- `grid gap-3 sm:grid-cols-2 xl:grid-cols-6`
- `grid gap-3 xl:grid-cols-[1.3fr_repeat(6,minmax(130px,1fr))]`
- `grid gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]`
- `grid min-h-56 place-items-center p-6 text-center`
- `grid min-w-0 gap-3`
- `h-10 w-10 p-0`
- `max-w-5xl`
- `min-h-0 border-0 bg-transparent px-0 focus:bg-transparent`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted`
- `mt-2 text-sm font-semibold text-muted`
- `mt-3 grid gap-2`
- `mt-3 text-3xl font-black`
- `mt-4 rounded-lg border border-danger/35 bg-danger/10 p-3 text-sm font-bold text-danger`
- `mt-4 rounded-lg border border-warning/35 bg-warning/10 p-3 text-sm font-bold text-warning`
- `mt-4 space-y-3`
- `mt-5 rounded-lg border border-line bg-white/[0.04] p-3`
- `p-4`
- `p-5`
- `space-y-4`
- `text-lg font-black`
- `text-sm font-black`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "flex w-full items-center justify-between rounded-lg border p-3 text-left transition hover:border-brand-2/45", statusClasses[status], )`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/tables/dashboard-backlog.tsx#priorityClasses
priorityClasses: Record<BacklogPriority, string> = {
  low: "border-brand-3/35 bg-brand-3/10 text-brand-3",
  medium: "border-brand-2/35 bg-brand-2/10 text-brand-2",
  high: "border-warning/45 bg-warning/12 text-warning",
  critical: "border-danger/45 bg-danger/14 text-danger",
}
```

```tsx
src/components/admin/tables/dashboard-backlog.tsx#statusCardClasses
statusCardClasses: Record<BacklogStatus, string> = {
  todo: "border-l-4 border-l-slate-400/80 bg-slate-400/[0.035]",
  in_progress: "border-l-4 border-l-brand-2 bg-brand-2/[0.07] shadow-[inset_0_0_28px_rgba(34,211,238,.07)]",
  blocked: "border-l-4 border-l-danger bg-danger/[0.08] shadow-[inset_0_0_28px_rgba(248,113,113,.08)]",
  done: "border-l-4 border-l-brand-3 bg-brand-3/[0.09] shadow-[inset_0_0_28px_rgba(52,211,153,.08)]",
  archived: "border-l-4 border-l-slate-500/50 bg-slate-500/[0.035] opacity-70",
  ignored: "border-l-4 border-l-warning bg-warning/[0.065]",
}
```

```tsx
src/components/admin/tables/dashboard-backlog.tsx#statusClasses
statusClasses: Record<BacklogStatus, string> = {
  todo: "border-slate-400/35 bg-slate-400/10 text-slate-200",
  in_progress: "border-brand-2/50 bg-brand-2/16 text-brand-2 shadow-[0_0_24px_rgba(34,211,238,.12)]",
  blocked: "border-danger/55 bg-danger/16 text-danger shadow-[0_0_24px_rgba(248,113,113,.12)]",
  done: "border-brand-3/60 bg-brand-3/18 text-brand-3 shadow-[0_0_28px_rgba(52,211,153,.14)]",
  archived: "border-slate-400/25 bg-slate-400/10 text-muted",
  ignored: "border-warning/40 bg-warning/12 text-warning",
}
```

```tsx
src/components/admin/tables/dashboard-backlog.tsx#typeClasses
typeClasses: Record<BacklogType, string> = {
  bug: "border-danger/40 bg-danger/12 text-danger",
  feature: "border-brand-2/40 bg-brand-2/12 text-brand-2",
  refactor: "border-brand/40 bg-brand/12 text-violet-200",
  ui: "border-warning/40 bg-warning/12 text-warning",
  data: "border-brand-3/40 bg-brand-3/12 text-brand-3",
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

- Breakpoints used: `2xl`, `lg`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-[minmax(0,1fr)_320px]`, `lg:flex-row`, `lg:items-center`, `lg:justify-between`, `sm:grid-cols-2`, `xl:grid-cols-[1.3fr_repeat(6,minmax(130px,1fr))]`, `xl:grid-cols-6`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
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

- Lucide icons: `ClipboardCopy`, `Plus`, `RefreshCcw`, `Search`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive.
- Instance swaps: `ClipboardCopy`, `Plus`, `RefreshCcw`, `Search`.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
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
