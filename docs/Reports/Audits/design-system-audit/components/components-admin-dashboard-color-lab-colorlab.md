---
id: MWI-COMP-026
component: "ColorLab"
category: "Dashboard feature"
status: exported
source: "src/components/admin/dashboard/color-lab.tsx"
lines: 13-131
figma_priority: 34
evidence: static_code
---

# ColorLab

## 1. Purpose

Dashboard feature component implemented in src/components/admin/dashboard/color-lab.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-026`.
- Location: `Dashboard Admin/src/components/admin/dashboard/color-lab.tsx`:13.
- File range: lines 13–131.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Check, Copy, Palette, Plus, Trash2 | icons |
| react | useMemo, useState | external package |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-027 | [ColorValue](../components/components-admin-dashboard-color-lab-colorvalue.md) (MWI-COMP-027) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |

Unresolved/external JSX tags: `Check`, `Copy`, `Palette`, `Plus`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-011 | [PalettePage](../components/app-dashboard-palette-page-palettepage.md) (MWI-COMP-011) | Renders/imports this component |
| MWI-COMP-264 | [ColorLab](../components/components-dashboard-color-lab-colorlab.md) (MWI-COMP-264) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <div>
      - <Badge>
      - <h2>
      - <p>
    - <div>
      - <label>
        - <input aria-label="Sélecteur de couleur" />
      - <div>
        - <Input />
        - <ColorValue />
        - <ColorValue />
        - <ColorValue />
        - <div>
          - <p>
          - <p>
  - <section>
    - <Card>
      - <div>
        - <div>
          - <span>
            - <Palette />
          - <h3>
        - <Button>
      - <div>
        - <button>
          - <span />
          - <span>
            - <Check />
            - <Copy />
    - <Card>
      - <h3>
      - <div>
        - <div>
          - <button aria-label={`Utiliser ${swatch}`} />
          - <span>
          - <Button aria-label="Copier">
            - <Check />
            - <Copy />
          - <Button aria-label="Supprimer">
            - <Trash2 />

Unique HTML/React tags: `Badge`, `button`, `Button`, `Card`, `Check`, `ColorValue`, `Copy`, `div`, `h2`, `h3`, `input`, `Input`, `label`, `p`, `Palette`, `Plus`, `section`, `span`, `Trash2`.

## 5. React structure and state management

- Hooks: `useMemo`, `usePersistentState`, `useState`.
- Local state initializers: `color = "#20d3ff"`, `copied = ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onCopy`.
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
- Instance swaps: `Check`, `Copy`, `Palette`, `Plus`, `Trash2`.
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
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `#05060d`, `#20d3ff`, `#ffffff`, `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `gap-5`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `p-0`, `p-2`, `p-3`, `p-4`, `p-5`, `px-3`, `px-4`, `px-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-10`, `h-28`, `h-full`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-3xl`, `text-amber-100`, `text-brand-2`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-lg`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xs` |
| Radius | `rounded-lg`, `rounded-md` |
| Borders/strokes | `border`, `border-0`, `border-brand-2/25`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `border-white/15`, `hover:border-brand-2/45`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | `opacity-80` |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `aspect-square` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-0` | base | static occurrence |
| `border-brand-2/25` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[48px_1fr_auto_auto]` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-28` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-brand-2/45` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `opacity-80` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `rounded-md` | base | static occurrence |
| `sm:grid-cols-[180px_1fr]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[1fr_360px]` | xl | static occurrence |
| `xl:grid-cols-[360px_1fr]` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `block h-28`
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
- `flex items-center justify-between gap-2 p-3 font-mono text-xs font-black`
- `flex items-center justify-between gap-3`
- `font-mono text-xs font-black`
- `grid aspect-square place-items-center rounded-lg border border-line bg-white/[0.045] p-4`
- `grid gap-4 sm:grid-cols-[180px_1fr]`
- `grid gap-4 xl:grid-cols-[1fr_360px]`
- `grid gap-5 p-5 xl:grid-cols-[360px_1fr]`
- `grid grid-cols-[48px_1fr_auto_auto] items-center gap-2 rounded-lg border border-line bg-white/[0.045] p-2`
- `grid h-10 w-10 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2`
- `h-10 rounded-md border border-white/15`
- `h-10 w-10 p-0`
- `h-full w-full cursor-pointer rounded-lg border-0 bg-transparent`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-1 text-xs font-bold opacity-80`
- `mt-2 text-sm font-semibold leading-6 text-muted`
- `mt-3 text-3xl font-black`
- `mt-4 grid gap-2`
- `mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `overflow-hidden rounded-lg border border-line text-left transition hover:-translate-y-0.5 hover:border-brand-2/45`
- `p-4`
- `rounded-lg border border-line p-3`
- `space-y-3`
- `space-y-4`
- `text-lg font-black`
- `text-sm font-black`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

- `{{ backgroundColor: color, color: contrast }}`
- `{{ backgroundColor: item }}`
- `{{ backgroundColor: swatch }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/dashboard/color-lab.tsx#contrastColor
function contrastColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#05060d" : "#ffffff";
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

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-[180px_1fr]`, `sm:grid-cols-2`, `xl:grid-cols-[1fr_360px]`, `xl:grid-cols-[360px_1fr]`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Copier"`, `aria-label="Sélecteur de couleur"`, `aria-label="Supprimer"`, `aria-label={\`Utiliser ${swatch}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Check`, `Copy`, `Palette`, `Plus`, `Trash2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success.
- Instance swaps: `Check`, `Copy`, `Palette`, `Plus`, `Trash2`.
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
