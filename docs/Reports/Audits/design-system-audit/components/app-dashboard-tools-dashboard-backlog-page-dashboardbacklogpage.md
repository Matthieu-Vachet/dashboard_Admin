---
id: MWI-COMP-018
component: "DashboardBacklogPage"
category: "Page"
status: exported
source: "src/app/(dashboard)/tools/dashboard-backlog/page.tsx"
lines: 3-5
figma_priority: 40
evidence: static_code
---

# DashboardBacklogPage

## 1. Purpose

App Router page component for /tools/dashboard-backlog. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-018`.
- Location: `Dashboard Admin/src/app/(dashboard)/tools/dashboard-backlog/page.tsx`:3.
- File range: lines 3–5.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **40/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/admin/tables/dashboard-backlog | DashboardBacklog | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No component parent detected; may be route entry or unused |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DashboardBacklog />

Unique HTML/React tags: `DashboardBacklog`.

## 5. React structure and state management

- Hooks: Not found.
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

- Boolean properties for Figma: Hover, Error, Warning, Success.
- Text properties: Not found.
- Instance swaps: Not found.
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `rgba(248,113,113,.08)`, `rgba(248,113,113,.12)`, `rgba(34,211,238,.07)`, `rgba(34,211,238,.12)`, `rgba(52,211,153,.08)`, `rgba(52,211,153,.14)` |
| Spacing | `p-0`, `px-3`, `px-4`, `px-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `hover:text-foreground`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-slate-200`, `text-sm`, `text-violet-100`, `text-violet-200`, `text-warning`, `text-white`, `text-xs` |
| Radius | Not found |
| Borders/strokes | `border-brand-2/30`, `border-brand-2/35`, `border-brand-2/40`, `border-brand-2/50`, `border-brand-3/30`, `border-brand-3/35`, `border-brand-3/40`, `border-brand-3/60`, `border-brand/30`, `border-brand/40`, `border-danger/30`, `border-danger/35`, `border-danger/40`, `border-danger/45`, `border-danger/55`, `border-l-4`, `border-l-brand-2`, `border-l-brand-3`, `border-l-danger`, `border-l-slate-400/80`, `border-l-slate-500/50`, `border-l-warning`, `border-line`, `border-slate-400/25`, `border-slate-400/35`, `border-transparent`, `border-warning/35`, `border-warning/40`, `border-warning/45`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | `shadow-[0_0_24px_rgba(248,113,113,.12)]`, `shadow-[0_0_24px_rgba(34,211,238,.12)]`, `shadow-[0_0_28px_rgba(52,211,153,.14)]`, `shadow-[inset_0_0_28px_rgba(248,113,113,.08)]`, `shadow-[inset_0_0_28px_rgba(34,211,238,.07)]`, `shadow-[inset_0_0_28px_rgba(52,211,153,.08)]` |
| Opacity | `opacity-70` |
| Background | `bg-brand-2/[0.07]`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-2/16`, `bg-brand-3/[0.09]`, `bg-brand-3/10`, `bg-brand-3/12`, `bg-brand-3/18`, `bg-brand/12`, `bg-danger/[0.08]`, `bg-danger/12`, `bg-danger/14`, `bg-danger/15`, `bg-danger/16`, `bg-slate-400/[0.035]`, `bg-slate-400/10`, `bg-slate-500/[0.035]`, `bg-transparent`, `bg-warning/[0.065]`, `bg-warning/12`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
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
| `bg-danger/12` | base | static occurrence |
| `bg-danger/14` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-danger/16` | base | static occurrence |
| `bg-slate-400/[0.035]` | base | static occurrence |
| `bg-slate-400/10` | base | static occurrence |
| `bg-slate-500/[0.035]` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/[0.065]` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
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
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `opacity-70` | base | static occurrence |
| `p-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `shadow-[0_0_24px_rgba(248,113,113,.12)]` | base | static occurrence |
| `shadow-[0_0_24px_rgba(34,211,238,.12)]` | base | static occurrence |
| `shadow-[0_0_28px_rgba(52,211,153,.14)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(248,113,113,.08)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(34,211,238,.07)]` | base | static occurrence |
| `shadow-[inset_0_0_28px_rgba(52,211,153,.08)]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-200` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `w-10` | base | static occurrence |

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
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

`hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success.
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
