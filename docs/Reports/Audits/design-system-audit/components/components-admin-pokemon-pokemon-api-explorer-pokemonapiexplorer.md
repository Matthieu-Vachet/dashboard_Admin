---
id: MWI-COMP-191
component: "PokemonApiExplorer"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pokemon-api-explorer.tsx"
lines: 51-131
figma_priority: 34
evidence: static_code
---

# PokemonApiExplorer

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pokemon-api-explorer.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-191`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-api-explorer.tsx`:51.
- File range: lines 51–131.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useMemo, useState | external package |
| lucide-react | AlertTriangle, History, Play, Server | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-192 | [StatusLine](../components/components-admin-pokemon-pokemon-api-explorer-statusline.md) (MWI-COMP-192) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `AlertTriangle`, `History`, `Play`, `Server`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-013 | [PokemonDocsPage](../components/app-dashboard-pokemon-docs-page-pokemondocspage.md) (MWI-COMP-013) | Renders/imports this component |
| MWI-COMP-278 | [PokemonApiExplorer](../components/components-dashboard-pokemon-api-explorer-pokemonapiexplorer.md) (MWI-COMP-278) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Card>
  - <CardHeader>
    - <CardTitle>
    - <CardDescription>
  - <p>
    - <AlertTriangle />
  - <div>
    - <select>
      - <optgroup>
        - <option>
    - <input aria-label="Route à tester" />
    - <Button>
  - <div>
    - <Badge>
    - <Badge>
    - <span>
    - <span>
  - <textarea aria-label="Body JSON" />
  - <p>
  - <div>
    - <div>
      - <StatusLine />
      - <StatusLine />
      - <StatusLine />
      - <StatusLine />
    - <pre>
      - <code>
  - <div>
    - <span>
      - <Server />
  - <section>
    - <h3>
      - <History />
    - <div>
      - <button>

Unique HTML/React tags: `AlertTriangle`, `Badge`, `button`, `Button`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `code`, `div`, `h3`, `History`, `input`, `optgroup`, `option`, `p`, `Play`, `pre`, `section`, `select`, `Server`, `span`, `StatusLine`, `textarea`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `body = "{}"`, `endpoints = adminEndpoints`, `error = ""`, `loading = false`, `method = "GET"`, `path = "/health"`, `registryError = ""`, `result = null`, `selectedId = ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`.
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

- Boolean properties for Figma: Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Scrollable.
- Text properties: Not found.
- Instance swaps: `AlertTriangle`, `History`, `Play`, `Server`.
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
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Detected | overflow scrolling utility |
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

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-2`, `mt-3`, `mt-4`, `p-0`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `py-2`, `space-y-2` |
| Sizing | `h-10`, `max-h-96`, `min-h-10`, `min-h-11`, `min-h-12`, `min-h-28`, `min-h-9`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-amber-100`, `text-center`, `text-cyan-100`, `text-cyan-50`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xs` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-dashed`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-slate-950/70`, `bg-slate-950/75`, `bg-transparent`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.025]`, `bg-white/[0.03]`, `bg-white/[0.04]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-slate-950/70` | base | static occurrence |
| `bg-slate-950/75` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.025]` | base | static occurrence |
| `bg-white/[0.03]` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-h-96` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-28` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `space-y-2` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[280px_1fr]` | xl | static occurrence |
| `xl:grid-cols-[minmax(16rem,23rem)_1fr_auto]` | xl | static occurrence |
| `xl:grid-cols-3` | xl | static occurrence |

Exact className combinations:

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
- `flex items-center gap-2 text-sm font-black`
- `h-10 w-10 p-0`
- `inline-flex items-center gap-2`
- `max-h-96 overflow-auto rounded-lg border border-line bg-slate-950/75 p-4 font-mono text-xs leading-6 text-cyan-50`
- `min-h-10 px-4 text-sm`
- `min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 font-mono text-sm font-semibold outline-none`
- `min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2 grid gap-2 md:grid-cols-2 xl:grid-cols-3`
- `mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-muted`
- `mt-3 min-h-28 w-full rounded-lg border border-line bg-slate-950/70 p-3 font-mono text-xs text-cyan-50 outline-none`
- `mt-4 flex items-center gap-2 rounded-lg border border-warning/35 bg-warning/10 p-3 text-sm font-bold text-amber-100`
- `mt-4 grid gap-3 xl:grid-cols-[280px_1fr]`
- `mt-4 grid gap-3 xl:grid-cols-[minmax(16rem,23rem)_1fr_auto]`
- `mt-4 grid min-h-28 place-items-center rounded-lg border border-dashed border-line bg-white/[0.025] text-center text-sm font-bold text-muted`
- `mt-4 rounded-lg border border-danger/35 bg-danger/12 p-3 text-sm font-bold text-rose-100`
- `mt-4 rounded-lg border border-line bg-white/[0.03] p-3`
- `p-4`
- `space-y-2 rounded-lg border border-line bg-white/[0.04] p-3`
- `truncate rounded-lg border border-line bg-white/[0.04] px-3 py-2 text-left font-mono text-xs`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

`--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

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

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `md`, `xl`.
- Responsive utilities: `md:grid-cols-2`, `xl:grid-cols-[280px_1fr]`, `xl:grid-cols-[minmax(16rem,23rem)_1fr_auto]`, `xl:grid-cols-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Body JSON"`, `aria-label="Route à tester"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `AlertTriangle`, `History`, `Play`, `Server`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Scrollable.
- Instance swaps: `AlertTriangle`, `History`, `Play`, `Server`.
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
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
| □ | Responsive: md | Tailwind md: utilities |
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
