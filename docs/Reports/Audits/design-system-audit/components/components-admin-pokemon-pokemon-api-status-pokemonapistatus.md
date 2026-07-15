---
id: MWI-COMP-193
component: "PokemonApiStatus"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pokemon-api-status.tsx"
lines: 34-111
figma_priority: 37
evidence: static_code
---

# PokemonApiStatus

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pokemon-api-status.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-193`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-api-status.tsx`:34.
- File range: lines 34–111.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **37/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useState | external package |
| lucide-react | Activity, BookOpen, FileJson2 | icons |
| @/components/ui/button | Button | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-194 | [MiniStatus](../components/components-admin-pokemon-pokemon-api-status-ministatus.md) (MWI-COMP-194) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |

Unresolved/external JSX tags: `Activity`, `BookOpen`, `FileJson2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-013 | [PokemonDocsPage](../components/app-dashboard-pokemon-docs-page-pokemondocspage.md) (MWI-COMP-013) | Renders/imports this component |
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |
| MWI-COMP-279 | [PokemonApiStatus](../components/components-dashboard-pokemon-api-status-pokemonapistatus.md) (MWI-COMP-279) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <div>
      - <span />
    - <div>
      - <Button>
        - <a>
          - <BookOpen />
      - <Button>
        - <a>
          - <FileJson2 />
  - <div>
    - <MiniStatus />
    - <MiniStatus />
    - <MiniStatus />
  - <p>

Unique HTML/React tags: `a`, `Activity`, `BookOpen`, `Button`, `div`, `FileJson2`, `MiniStatus`, `p`, `span`.

## 5. React structure and state management

- Hooks: `useEffect`.
- Local state initializers: `health = fallbackHealth`.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | compact = false | See exact signature/contract below |

Exact parameter signature:

```tsx
{ compact = false }: { compact?: boolean }
```

Exact local props contract when statically resolvable:

```tsx
{ compact?: boolean }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Warning, Success, Active, Inactive.
- Text properties: `compact`.
- Instance swaps: `Activity`, `BookOpen`, `FileJson2`.
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
- Alignment utilities: `items-center, sm:items-center, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `p-0`, `p-3`, `px-3`, `px-4`, `px-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-10`, `h-3.5`, `min-h-10`, `min-h-12`, `min-h-14`, `min-h-9`, `w-10`, `w-3.5`, `w-fit` |
| Typography | `font-black`, `font-bold`, `hover:text-foreground`, `text-amber-100`, `text-amber-300`, `text-base`, `text-danger`, `text-emerald-100`, `text-emerald-400`, `text-foreground`, `text-muted`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-amber-300/25`, `border-danger/30`, `border-emerald-300/25`, `border-line`, `border-transparent`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | `shadow-[0_0_24px_currentColor]` |
| Opacity | Not found |
| Background | `bg-amber-300`, `bg-amber-400/10`, `bg-danger/15`, `bg-emerald-400`, `bg-emerald-400/10`, `bg-transparent`, `bg-white/[0.055]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-300` | base | conditional or expression-derived |
| `bg-amber-400/10` | base | conditional or expression-derived |
| `bg-danger/15` | base | static occurrence |
| `bg-emerald-400` | base | conditional or expression-derived |
| `bg-emerald-400/10` | base | conditional or expression-derived |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/25` | base | conditional or expression-derived |
| `border-danger/30` | base | static occurrence |
| `border-emerald-300/25` | base | conditional or expression-derived |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-3.5` | base | conditional or expression-derived |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-14` | base | conditional or expression-derived |
| `min-h-9` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `px-4` | base | conditional or expression-derived |
| `px-5` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_0_24px_currentColor]` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `space-y-3` | base | conditional or expression-derived |
| `space-y-4` | base | conditional or expression-derived |
| `text-amber-100` | base | conditional or expression-derived |
| `text-amber-300` | base | conditional or expression-derived |
| `text-base` | base | conditional or expression-derived |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | conditional or expression-derived |
| `text-emerald-400` | base | conditional or expression-derived |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-3.5` | base | conditional or expression-derived |
| `w-fit` | base | conditional or expression-derived |

Exact className combinations:

- `bg-amber-300 text-amber-300`
- `bg-emerald-400 text-emerald-400`
- `border-amber-300/25 bg-amber-400/10 text-amber-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-emerald-300/25 bg-emerald-400/10 text-emerald-100`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`
- `flex flex-wrap gap-2`
- `grid gap-2 sm:grid-cols-3`
- `h-10 w-10 p-0`
- `h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_24px_currentColor]`
- `inline-flex min-h-14 w-fit items-center gap-3 rounded-lg border px-4 text-base font-black`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `rounded-lg border border-line bg-white/[0.055] p-3`
- `space-y-3`
- `space-y-4`
- `text-xs font-bold text-amber-100`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_24px_currentColor]", health.connected ? "bg-emerald-400 text-emerald-400" : "bg-amber-300 text-amber-300", )`
- `cn( "inline-flex min-h-14 w-fit items-center gap-3 rounded-lg border px-4 text-base font-black", health.connected ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100" : "border-amber-300/25 bg-amber-400/10 text-amber-100", )`
- `cn("rounded-lg border border-line bg-white/[0.055] p-3", compact ? "space-y-3" : "space-y-4")`

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:flex-row`, `sm:grid-cols-3`, `sm:items-center`, `sm:justify-between`.
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

- Lucide icons: `Activity`, `BookOpen`, `FileJson2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success, Active, Inactive.
- Instance swaps: `Activity`, `BookOpen`, `FileJson2`.
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
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
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
