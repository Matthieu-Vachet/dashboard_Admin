---
id: MWI-COMP-121
component: "AdminPaletteSelector"
category: "Layout / navigation"
status: exported
source: "src/components/admin/navigation/admin-palette-selector.tsx"
lines: 11-109
figma_priority: 49
evidence: static_code
---

# AdminPaletteSelector

## 1. Purpose

Layout / navigation component implemented in src/components/admin/navigation/admin-palette-selector.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-121`.
- Location: `Dashboard Admin/src/components/admin/navigation/admin-palette-selector.tsx`:11.
- File range: lines 11–109.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **49/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/image | Image | external package |
| framer-motion | AnimatePresence, motion | external package |
| lucide-react | Check, Palette | icons |
| react | useState | external package |
| @/components/ui/button | Button | internal |
| @/constants/admin/dashboard-palettes | dashboardPalettes | internal |
| @/hooks/admin/use-dashboard-palette | useDashboardPalette | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |

Unresolved/external JSX tags: `AnimatePresence`, `Check`, `Image`, `Palette`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-124 | [AdminTopbar](../components/components-admin-navigation-admin-topbar-admintopbar.md) (MWI-COMP-124) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Button aria-label={`Palette dominante : ${activePalette.label}`} aria-expanded={paletteOpen}>
    - <Image />
  - <AnimatePresence>
    - <motion.div>
      - <div>
        - <span>
          - <Palette />
        - <div>
          - <p>
          - <p>
      - <div>
        - <button data-active={active}>
          - <span>
            - <Image />
          - <span>
            - <span>
            - <span>
          - <span>
            - <span />
            - <Check />

Unique HTML/React tags: `AnimatePresence`, `button`, `Button`, `Check`, `div`, `Image`, `motion.div`, `p`, `Palette`, `span`.

## 5. React structure and state management

- Hooks: `useDashboardPalette`, `useState`.
- Local state initializers: `paletteOpen = false`.
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

- Boolean properties for Figma: Hover, Error, Collapsed, Expanded, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `Check`, `Palette`.
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
| Warning | Not found | Not found |
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Detected | collapsed/closed signal |
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
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-bg`, `--accent-border`, `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`, `--panel-strong` |
| Literal colors | Not found |
| Spacing | `gap-1`, `gap-1.5`, `gap-2`, `gap-3`, `ml-1`, `p-0`, `p-2`, `pb-2`, `pt-1`, `px-2`, `px-2.5`, `px-3`, `px-4`, `px-5`, `right-0`, `top-12` |
| Sizing | `h-10`, `h-3`, `h-5`, `h-8`, `min-h-10`, `min-h-12`, `min-h-9`, `min-w-0`, `w-[min(19rem,calc(100vw-2rem))]`, `w-10`, `w-3`, `w-5`, `w-8` |
| Typography | `font-black`, `font-bold`, `hover:text-foreground`, `text-[11px]`, `text-brand-2`, `text-danger`, `text-foreground`, `text-left`, `text-muted`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-lg`, `rounded-xl` |
| Borders/strokes | `border`, `border-danger/30`, `border-line`, `border-transparent`, `border-white/30`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | `shadow-sm` |
| Opacity | Not found |
| Background | `backdrop-blur-2xl`, `bg-background/70`, `bg-danger/15`, `bg-transparent`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `backdrop-blur-2xl` | base | static occurrence |
| `bg-background/70` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-white/30` | base | static occurrence |
| `dashboard-palette-menu` | base | static occurrence |
| `dashboard-palette-option` | base | static occurrence |
| `dashboard-palette-trigger` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[auto_1fr_auto]` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-3` | base | static occurrence |
| `h-5` | base | static occurrence |
| `h-8` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `ml-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | static occurrence |
| `pb-2` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pt-1` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `relative` | base | static occurrence |
| `right-0` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-sm` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `top-12` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-[min(19rem,calc(100vw-2rem))]` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-3` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-8` | base | static occurrence |
| `z-[90]` | base | static occurrence |

Exact className combinations:

- `block truncate text-[11px] font-bold text-muted`
- `block truncate text-sm font-black text-foreground`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-palette-menu absolute right-0 top-12 z-[90] w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line p-2 backdrop-blur-2xl`
- `dashboard-palette-option grid min-h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-line px-2.5 text-left transition`
- `dashboard-palette-trigger`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex items-center gap-1.5`
- `flex items-center gap-2 px-2 pb-2 pt-1`
- `grid gap-1`
- `grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.06] text-brand-2`
- `h-10 w-10 p-0`
- `h-3 w-3 rounded-full border border-white/30 shadow-sm`
- `h-5 w-5 object-contain`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0`
- `ml-1 text-brand-2`
- `relative`
- `relative grid h-8 w-8 place-items-center rounded-lg border border-line bg-background/70`
- `text-xs font-black uppercase tracking-[0.16em] text-brand-2`
- `truncate text-xs font-bold text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-bg`, `--accent-border`, `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`, `--panel-strong`

### Inline style expressions

- `{{ backgroundColor: swatch }}`

### Referenced local/imported style declarations

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
.dashboard-palette-menu {
background:
    radial-gradient(circle at 16% 0%, var(--accent-muted), transparent 42%),
    var(--panel-strong);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

```css
.dashboard-palette-option {
background: rgba(255, 255, 255, 0.045);
}
```

```css
.dashboard-palette-option:hover, .dashboard-palette-option[data-active="true"] {
border-color: var(--accent-border);
  background: var(--accent-bg);
}
```

```css
.dashboard-palette-trigger {
position: relative;
}
```

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

```css
.light .dashboard-palette-menu {
box-shadow:
    0 22px 62px rgba(15, 23, 42, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
}
```

```css
.light .dashboard-palette-option {
background: rgba(255, 255, 255, 0.74);
}
```

### Data attributes

- `data-active={active}`

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-expanded={paletteOpen}`, `aria-label={\`Palette dominante : ${activePalette.label}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Check`, `Palette`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Collapsed, Expanded, Active, Inactive.
- Instance swaps: `Check`, `Palette`.
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
| — | Warning | Not found |
| — | Success | Not found |
| — | Empty | Not found |
| □ | Collapsed | collapsed/closed signal |
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
