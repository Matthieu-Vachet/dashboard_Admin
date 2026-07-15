---
id: MWI-COMP-022
component: "LoginPage"
category: "Page"
status: exported
source: "src/app/login/page.tsx"
lines: 7-94
figma_priority: 40
evidence: static_code
---

# LoginPage

## 1. Purpose

App Router page component for /login. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-022`.
- Location: `Dashboard Admin/src/app/login/page.tsx`:7.
- File range: lines 7–94.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **40/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | LockKeyhole, Sparkles | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |

Unresolved/external JSX tags: `LockKeyhole`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No component parent detected; may be route entry or unused |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <main>
  - <div />
  - <section>
    - <div>
      - <Badge>
      - <h1>
      - <p>
      - <div>
        - <div>
          - <Sparkles />
          - <p>
    - <Card>
      - <div>
        - <span>
          - <LockKeyhole />
        - <div>
          - <h2>
          - <p>
      - <div>
      - <form>
        - <input />
        - <label>
          - <span>
          - <Input />
        - <label>
          - <span>
          - <Input />
        - <Button>
      - <p>

Unique HTML/React tags: `Badge`, `Button`, `Card`, `div`, `form`, `h1`, `h2`, `input`, `Input`, `label`, `LockKeyhole`, `main`, `p`, `section`, `span`, `Sparkles`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| searchParams | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  searchParams: Promise<{ error?: string; next?: string }>;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Warning, Success.
- Text properties: `searchParams`.
- Instance swaps: `LockKeyhole`, `Sparkles`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-3`, `gap-6`, `inset-0`, `mt-2`, `mt-3`, `mt-5`, `mt-6`, `mt-8`, `mx-auto`, `p-0`, `p-3`, `p-5`, `px-3`, `px-4`, `px-5`, `py-8`, `sm:p-6`, `space-y-4` |
| Sizing | `h-10`, `h-11`, `max-w-2xl`, `max-w-6xl`, `max-w-xl`, `min-h-10`, `min-h-12`, `min-h-9`, `min-h-screen`, `w-10`, `w-11`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `hover:text-foreground`, `leading-6`, `leading-8`, `leading-tight`, `sm:text-6xl`, `text-4xl`, `text-amber-100`, `text-base`, `text-brand-2`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | `opacity-70` |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/10`, `bg-danger/12`, `bg-danger/15`, `bg-gradient-to-br`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `from-brand`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `to-brand-2` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-gradient-to-br` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
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
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-brand` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-6` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-11` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `leading-8` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `lg:grid-cols-[1.05fr_.95fr]` | lg | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `max-w-6xl` | base | static occurrence |
| `max-w-xl` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-h-screen` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `mt-8` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `opacity-70` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-8` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `sm:text-6xl` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `studio-grid` | base | static occurrence |
| `text-4xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-base` | base | static occurrence |
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
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-brand-2` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-11` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `block`
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
- `flex items-center gap-3`
- `grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white`
- `h-10 w-10 p-0`
- `max-w-2xl`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2`
- `mt-3 text-sm font-black`
- `mt-5 max-w-xl text-base font-semibold leading-8 text-muted`
- `mt-5 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm font-bold text-rose-100`
- `mt-5 text-4xl font-black leading-tight sm:text-6xl`
- `mt-5 text-xs font-semibold leading-6 text-muted`
- `mt-6 space-y-4`
- `mt-8 grid gap-3 sm:grid-cols-3`
- `p-5 sm:p-6`
- `relative grid min-h-screen overflow-hidden px-4 py-8`
- `relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_.95fr]`
- `rounded-lg border border-line bg-white/[0.055] p-3`
- `studio-grid pointer-events-none absolute inset-0 opacity-70`
- `text-brand-2`
- `text-sm font-semibold text-muted`
- `text-xl font-black`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

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

### Referenced global custom CSS rules

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

```css
.light .studio-grid {
background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 48%, var(--accent-muted) 49%, transparent 50% 100%);
  opacity: 0.46;
}
```

```css
.studio-grid {
background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 48%, var(--accent-muted) 49%, transparent 50% 100%);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-[1.05fr_.95fr]`, `sm:grid-cols-3`, `sm:p-6`, `sm:text-6xl`.
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

- Lucide icons: `LockKeyhole`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success.
- Instance swaps: `LockKeyhole`, `Sparkles`.
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
