---
id: MWI-COMP-015
component: "ProjectsPage"
category: "Page"
status: exported
source: "src/app/(dashboard)/projects/page.tsx"
lines: 51-363
figma_priority: 40
evidence: static_code
---

# ProjectsPage

## 1. Purpose

App Router page component for /projects. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-015`.
- Location: `Dashboard Admin/src/app/(dashboard)/projects/page.tsx`:51.
- File range: lines 51–363.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **40/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ArrowUpRight, Code2, Github, ListChecks, Rocket, Save, Trash2 | icons |
| react | useEffect, useMemo, useState | external package |
| @/components/admin/shared/loading-state | DashboardLoadingState | internal |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input, Textarea | internal |
| @/components/ui/modal | Modal | internal |
| @/data/personal-dashboard-defaults | initialProjects, statuses, Project, ProjectStatus | internal |
| @/data/javascript-learning | jsPracticalProjects | internal |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-237 | [DashboardLoadingState](../components/components-admin-shared-loading-state-dashboardloadingstate.md) (MWI-COMP-237) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |
| MWI-COMP-324 | [Textarea](../components/components-ui-input-textarea.md) (MWI-COMP-324) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `ArrowUpRight`, `Code2`, `Github`, `ListChecks`, `Rocket`, `Save`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No component parent detected; may be route entry or unused |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DashboardLoadingState />
- <div>
  - <Card>
    - <div>
      - <Badge>
      - <h2>
      - <p>
    - <div>
      - <Badge>
      - <Button>
  - <section>
    - <Card>
      - <Badge>
      - <h3>
      - <p>
      - <div>
        - <div>
          - <span>
            - <Code2 />
          - <strong>
        - <div>
          - <span>
            - <ListChecks />
          - <strong>
    - <Card>
      - <div>
        - <div>
          - <Badge>
          - <h3>
        - <Badge>
      - <p>
      - <div>
        - <button>
  - <section>
    - <div>
      - <Card>
        - <button>
          - <div>
            - <div>
              - <p>
              - <h3>
            - <Badge>
          - <p>
          - <div>
            - <div>
              - <span>
              - <span>
            - <div>
              - <div />
        - <div>
          - <Button>
          - <Button>
        - <span>
  - <Modal>
    - <div>
      - <label>
        - <span>
        - <Input />
      - <label>
        - <span>
        - <Input />
      - <label>
        - <span>
        - <Textarea />
      - <label>
        - <span>
        - <Input />
      - <div>
        - <label>
          - <span>
          - <Input />
        - <label>
          - <span>
          - <select>
            - <option>
      - <label>
        - <span>
        - <Input />
      - <label>
        - <span>
        - <Input />
      - <div>
        - <Button>
        - <Button>
      - <Button>
      - <Button>

Unique HTML/React tags: `ArrowUpRight`, `Badge`, `button`, `Button`, `Card`, `Code2`, `DashboardLoadingState`, `div`, `Github`, `h2`, `h3`, `Input`, `label`, `ListChecks`, `Modal`, `option`, `p`, `Rocket`, `Save`, `section`, `select`, `span`, `strong`, `Textarea`, `Trash2`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `usePersistentState`.
- Local state initializers: `selectedId = null`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onClose`.
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

- Boolean properties for Figma: Hover, Selected, Loading, Disabled, Error, Warning, Success, Expanded.
- Text properties: Not found.
- Instance swaps: `ArrowUpRight`, `Code2`, `Github`, `ListChecks`, `Rocket`, `Save`, `Trash2`, `https://...`, `https://github.com/...`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
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
- Alignment utilities: `items-center, items-start, justify-between, sm:items-center, sm:justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-border`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `p-0`, `p-3`, `p-4`, `p-5`, `px-3`, `px-4`, `px-5`, `py-1.5`, `right-4`, `space-y-4`, `top-4` |
| Sizing | `h-10`, `h-2`, `h-full`, `max-w-2xl`, `min-h-10`, `min-h-11`, `min-h-12`, `min-h-28`, `min-h-9`, `w-10`, `w-full` |
| Typography | `font-black`, `font-mono`, `font-semibold`, `hover:text-foreground`, `hover:text-white`, `leading-6`, `text-2xl`, `text-3xl`, `text-amber-100`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-white/10`, `text-xl`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/50`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-brand-2/45`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-2/8`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-gradient-to-r`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `bg-white/10`, `from-brand`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `to-brand-3`, `via-brand-2` |
| Animation | `hover:-translate-y-0.5`, `motion-border`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[-webkit-box-orient:vertical]` | [-webkit-box-orient | static occurrence |
| `[-webkit-line-clamp:3]` | [-webkit-line-clamp | static occurrence |
| `[display:-webkit-box]` | [display | static occurrence |
| `2xl:grid-cols-3` | 2xl | static occurrence |
| `absolute` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/8` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/50` | base | conditional or expression-derived |
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
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-2` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | conditional or expression-derived |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-brand-2/45` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `hover:text-white` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-28` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `motion-border` | base | conditional or expression-derived |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `p-5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `relative` | base | static occurrence |
| `right-4` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-white/10` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-3` | base | static occurrence |
| `top-4` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `via-brand-2` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[0.82fr_1.18fr]` | xl | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `absolute right-4 top-4 font-mono text-xs font-black text-white/10`
- `block`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/50 bg-brand-2/8`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-center justify-between gap-3`
- `flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted`
- `flex items-center justify-between text-xs font-black`
- `flex items-start justify-between gap-3`
- `grid gap-4 md:grid-cols-2 2xl:grid-cols-3`
- `grid gap-4 xl:grid-cols-[0.82fr_1.18fr]`
- `grid grid-cols-2 gap-2`
- `grid grid-cols-2 gap-3`
- `h-10 w-10 p-0`
- `h-full rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `motion-border p-4 transition hover:-translate-y-0.5`
- `mt-2`
- `mt-2 block text-sm leading-6`
- `mt-2 h-2 overflow-hidden rounded-full bg-white/10`
- `mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted`
- `mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `mt-2 min-h-28`
- `mt-2 text-sm font-semibold leading-6 text-muted`
- `mt-2 text-xl font-black`
- `mt-3 text-2xl font-black`
- `mt-3 text-3xl font-black`
- `mt-3 text-sm font-semibold leading-6 text-muted`
- `mt-4 flex flex-wrap gap-2`
- `mt-4 min-h-12 overflow-hidden text-sm font-semibold leading-6 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]`
- `mt-5`
- `mt-5 grid gap-3`
- `p-5`
- `relative z-10 block w-full text-left`
- `relative z-10 mt-5 grid grid-cols-2 gap-2`
- `rounded-full border border-line bg-white/[0.055] px-3 py-1.5 text-xs font-black text-muted transition hover:border-brand-2/45 hover:text-white`
- `rounded-lg border border-line bg-white/[0.045] p-3`
- `space-y-4`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "motion-border p-4 transition hover:-translate-y-0.5", selectedProject?.id === project.id && "border-brand-2/50 bg-brand-2/8", )`

### CSS variables

`--accent-border`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

- `{{ width: \`${project.progress}%\` }}`

### Referenced local/imported style declarations

```tsx
src/app/(dashboard)/projects/page.tsx#statusTone
statusTone = {
  Idée: "violet",
  Build: "cyan",
  Live: "green",
  Pause: "amber",
  Archive: "neutral",
} as const
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

```css
.motion-border {
position: relative;
  overflow: hidden;
}
```

```css
.motion-border::after {
position: absolute;
  inset: 1px;
  content: "";
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent) 0 0 / 220% 100%;
  opacity: 0;
  transition: opacity 220ms ease;
}
```

```css
.motion-border::before {
position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  background:
    linear-gradient(90deg, transparent, var(--accent-border), transparent),
    linear-gradient(180deg, transparent, rgba(144, 91, 244, 0.28), transparent);
  opacity: 0;
  transition: opacity 220ms ease;
}
```

```css
.motion-border:hover::before, .motion-border:hover::after {
opacity: 1;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `md`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-3`, `md:grid-cols-2`, `sm:flex-row`, `sm:items-center`, `sm:justify-between`, `xl:grid-cols-[0.82fr_1.18fr]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `motion-border`, `transition`.
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

- Lucide icons: `ArrowUpRight`, `Code2`, `Github`, `ListChecks`, `Rocket`, `Save`, `Trash2`.
- Asset references: `https://...`, `https://github.com/...`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Loading, Disabled, Error, Warning, Success, Expanded.
- Instance swaps: `ArrowUpRight`, `Code2`, `Github`, `ListChecks`, `Rocket`, `Save`, `Trash2`, `https://...`, `https://github.com/...`.
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
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
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
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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
