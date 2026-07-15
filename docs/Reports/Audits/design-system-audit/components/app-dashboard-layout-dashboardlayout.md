---
id: MWI-COMP-008
component: "DashboardLayout"
category: "Layout"
status: exported
source: "src/app/(dashboard)/layout.tsx"
lines: 5-17
figma_priority: 46
evidence: static_code
---

# DashboardLayout

## 1. Purpose

App Router layout that composes persistent application structure around child content. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-008`.
- Location: `Dashboard Admin/src/app/(dashboard)/layout.tsx`:5.
- File range: lines 5–17.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **46/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/navigation | redirect | external package |
| @/components/admin/layout/admin-app-frame | AdminAppFrame | internal |
| @/lib/auth | getSession | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-092 | [AdminAppFrame](../components/components-admin-layout-admin-app-frame-adminappframe.md) (MWI-COMP-092) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No component parent detected; may be route entry or unused |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <AdminAppFrame>

Unique HTML/React tags: `AdminAppFrame`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  children,
}: Readonly<{
  children: React.ReactNode;
}>
```

Exact local props contract when statically resolvable:

```tsx
Readonly<{
  children: React.ReactNode;
}>
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Warning, Success, Read Only.
- Text properties: `children`.
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
| Read Only | Detected | read-only signal |
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
| Literal colors | Not found |
| Spacing | `p-0`, `px-3`, `px-4`, `px-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `hover:text-foreground`, `text-amber-100`, `text-amber-300`, `text-brand-2`, `text-cyan-100`, `text-cyan-300`, `text-danger`, `text-emerald-100`, `text-emerald-300`, `text-foreground`, `text-fuchsia-300`, `text-lime-300`, `text-muted`, `text-orange-300`, `text-rose-100`, `text-rose-300`, `text-sky-300`, `text-sm`, `text-teal-300`, `text-violet-100`, `text-violet-300`, `text-white`, `text-xs` |
| Radius | Not found |
| Borders/strokes | `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-400/12`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3/10`, `bg-brand/12`, `bg-cyan-400/12`, `bg-danger/12`, `bg-danger/15`, `bg-emerald-400/12`, `bg-fuchsia-400/12`, `bg-lime-400/12`, `bg-orange-400/12`, `bg-rose-400/12`, `bg-sky-400/12`, `bg-teal-400/12`, `bg-transparent`, `bg-violet-400/12`, `bg-warning/12`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/12` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-fuchsia-400/12` | base | static occurrence |
| `bg-lime-400/12` | base | static occurrence |
| `bg-orange-400/12` | base | static occurrence |
| `bg-rose-400/12` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-teal-400/12` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
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
| `p-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-300` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-300` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-300` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-fuchsia-300` | base | static occurrence |
| `text-lime-300` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-orange-300` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-rose-300` | base | static occurrence |
| `text-sky-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-teal-300` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-300` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `bg-amber-400/12`
- `bg-brand-2/12`
- `bg-cyan-400/12`
- `bg-emerald-400/12`
- `bg-fuchsia-400/12`
- `bg-lime-400/12`
- `bg-orange-400/12`
- `bg-rose-400/12`
- `bg-sky-400/12`
- `bg-teal-400/12`
- `bg-violet-400/12`
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
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `text-amber-300`
- `text-brand-2`
- `text-cyan-300`
- `text-emerald-300`
- `text-fuchsia-300`
- `text-lime-300`
- `text-orange-300`
- `text-rose-300`
- `text-sky-300`
- `text-teal-300`
- `text-violet-300`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/navigation/admin-sidebar.tsx#navToneClasses
navToneClasses = [
  { icon: "text-brand-2", glow: "bg-brand-2/12" },
  { icon: "text-sky-300", glow: "bg-sky-400/12" },
  { icon: "text-violet-300", glow: "bg-violet-400/12" },
  { icon: "text-emerald-300", glow: "bg-emerald-400/12" },
  { icon: "text-amber-300", glow: "bg-amber-400/12" },
  { icon: "text-lime-300", glow: "bg-lime-400/12" },
  { icon: "text-rose-300", glow: "bg-rose-400/12" },
  { icon: "text-cyan-300", glow: "bg-cyan-400/12" },
  { icon: "text-fuchsia-300", glow: "bg-fuchsia-400/12" },
  { icon: "text-orange-300", glow: "bg-orange-400/12" },
  { icon: "text-teal-300", glow: "bg-teal-400/12" },
] as const
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
- Boolean properties: Hover, Error, Warning, Success, Read Only.
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
| □ | Read Only | read-only signal |
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
