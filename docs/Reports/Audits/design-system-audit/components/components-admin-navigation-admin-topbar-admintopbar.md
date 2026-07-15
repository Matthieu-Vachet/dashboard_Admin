---
id: MWI-COMP-124
component: "AdminTopbar"
category: "Layout / navigation"
status: exported
source: "src/components/admin/navigation/admin-topbar.tsx"
lines: 24-91
figma_priority: 49
evidence: static_code
---

# AdminTopbar

## 1. Purpose

Layout / navigation component implemented in src/components/admin/navigation/admin-topbar.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-124`.
- Location: `Dashboard Admin/src/components/admin/navigation/admin-topbar.tsx`:24.
- File range: lines 24–91.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **49/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun | icons |
| next-themes | useTheme | external package |
| @/components/ui/button | Button | internal |
| @/data/app-version | DASHBOARD_VERSION | internal |
| @/components/admin/navigation/admin-palette-selector | AdminPaletteSelector | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-121 | [AdminPaletteSelector](../components/components-admin-navigation-admin-palette-selector-adminpaletteselector.md) (MWI-COMP-121) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |

Unresolved/external JSX tags: `Menu`, `Moon`, `PanelLeftClose`, `PanelLeftOpen`, `Search`, `Sun`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-092 | [AdminAppFrame](../components/components-admin-layout-admin-app-frame-adminappframe.md) (MWI-COMP-092) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <header>
  - <div>
    - <button aria-label="Ouvrir le menu">
      - <Menu />
    - <button aria-label={collapsed ? "Déplier la navigation" : "Replier la navigation"}>
      - <PanelLeftOpen />
      - <PanelLeftClose />
    - <div>
      - <p>
      - <h1>
    - <div>
      - <Search />
      - <span>
    - <button aria-label="Ouvrir l'historique des versions du Dashboard">
    - <AdminPaletteSelector />
    - <Button aria-label="Changer le thème">
      - <Sun />
      - <Moon />

Unique HTML/React tags: `AdminPaletteSelector`, `button`, `Button`, `div`, `h1`, `header`, `Menu`, `Moon`, `p`, `PanelLeftClose`, `PanelLeftOpen`, `Search`, `span`, `Sun`.

## 5. React structure and state management

- Hooks: `useTheme`.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| activeLabel | Not found | See exact signature/contract below |
| collapsed | Not found | See exact signature/contract below |
| onOpenSidebar | Not found | See exact signature/contract below |
| onOpenVersionHistory | Not found | See exact signature/contract below |
| onToggleCollapsed | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  activeLabel,
  collapsed,
  onOpenSidebar,
  onToggleCollapsed,
  onOpenVersionHistory,
}: AdminTopbarProps
```

Exact local props contract when statically resolvable:

```tsx
type AdminTopbarProps = {
  activeLabel: string;
  collapsed: boolean;
  onOpenSidebar: () => void;
  onToggleCollapsed: () => void;
  onOpenVersionHistory: () => void;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Collapsed, Hidden, Sticky.
- Text properties: `activeLabel`, `collapsed`, `onOpenSidebar`, `onOpenVersionHistory`, `onToggleCollapsed`.
- Instance swaps: `Menu`, `Moon`, `PanelLeftClose`, `PanelLeftOpen`, `Search`, `Sun`.
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
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Detected | sticky utility |

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
- Positioning utilities: `sticky`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mx-auto`, `p-0`, `px-2`, `px-3`, `px-4`, `px-5`, `py-3`, `sm:px-3`, `sm:px-6`, `top-0` |
| Sizing | `h-10`, `max-w-[1680px]`, `max-w-sm`, `min-h-10`, `min-h-12`, `min-h-9`, `min-w-0`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `hover:text-foreground`, `sm:text-lg`, `sm:text-xs`, `text-[11px]`, `text-base`, `text-brand-2`, `text-danger`, `text-foreground`, `text-muted`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-b`, `border-brand-2/25`, `border-danger/30`, `border-line`, `border-transparent`, `hover:border-brand-2/55`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `backdrop-blur-2xl`, `bg-background/72`, `bg-brand-2/10`, `bg-danger/15`, `bg-transparent`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-brand-2/15`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-2xl` | base | static occurrence |
| `bg-background/72` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-brand-2/25` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `dashboard-accent-glow` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-1` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hidden` | base | static occurrence |
| `hover:bg-brand-2/15` | hover | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-brand-2/55` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `lg:grid` | lg | static occurrence |
| `lg:hidden` | lg | static occurrence |
| `max-w-[1680px]` | base | static occurrence |
| `max-w-sm` | base | static occurrence |
| `md:flex` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `p-0` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-3` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:px-3` | sm | static occurrence |
| `sm:px-6` | sm | static occurrence |
| `sm:text-lg` | sm | static occurrence |
| `sm:text-xs` | sm | static occurrence |
| `sticky` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `theme-icon-moon` | base | static occurrence |
| `theme-icon-sun` | base | static occurrence |
| `top-0` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-30` | base | static occurrence |

Exact className combinations:

- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-accent-glow inline-flex min-h-10 shrink-0 items-center rounded-lg border border-brand-2/25 bg-brand-2/10 px-2 text-[11px] font-black text-brand-2 transition hover:border-brand-2/55 hover:bg-brand-2/15 sm:px-3 sm:text-xs`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.06] text-foreground lg:hidden`
- `h-10 w-10 p-0`
- `hidden h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.06] text-muted transition hover:text-foreground lg:grid`
- `hidden min-h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-sm font-bold text-muted md:flex`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0 flex-1`
- `mx-auto flex max-w-[1680px] items-center gap-3`
- `sticky top-0 z-30 border-b border-line bg-background/72 px-4 py-3 backdrop-blur-2xl sm:px-6`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`
- `theme-icon-moon`
- `theme-icon-sun`
- `truncate text-base font-black sm:text-lg`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

### Inline style expressions

Not found

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
.dark .theme-icon-moon {
display: none;
}
```

```css
.dark .theme-icon-sun {
display: block;
}
```

```css
.dashboard-accent-glow {
box-shadow: 0 0 30px var(--accent-muted);
}
```

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

```css
.light .theme-icon-moon {
display: block;
}
```

```css
.light .theme-icon-sun {
display: none;
}
```

```css
.theme-icon-moon {
display: block;
}
```

```css
.theme-icon-sun {
display: none;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `md`, `sm`.
- Responsive utilities: `lg:grid`, `lg:hidden`, `md:flex`, `sm:px-3`, `sm:px-6`, `sm:text-lg`, `sm:text-xs`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Changer le thème"`, `aria-label="Ouvrir l'historique des versions du Dashboard"`, `aria-label="Ouvrir le menu"`, `aria-label={collapsed ? "Déplier la navigation" : "Replier la navigation"}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Menu`, `Moon`, `PanelLeftClose`, `PanelLeftOpen`, `Search`, `Sun`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Collapsed, Hidden, Sticky.
- Instance swaps: `Menu`, `Moon`, `PanelLeftClose`, `PanelLeftOpen`, `Search`, `Sun`.
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
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| □ | Sticky | sticky utility |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: md | Tailwind md: utilities |
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
