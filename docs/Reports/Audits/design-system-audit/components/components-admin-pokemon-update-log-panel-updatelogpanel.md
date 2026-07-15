---
id: MWI-COMP-235
component: "UpdateLogPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/update-log-panel.jsx"
lines: 20-169
figma_priority: 34
evidence: static_code
---

# UpdateLogPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/update-log-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-235`.
- Location: `Dashboard Admin/src/components/admin/pokemon/update-log-panel.jsx`:20.
- File range: lines 20–169.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Cloud, ExternalLink, GitCommitHorizontal, History | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Cloud`, `ExternalLink`, `GitCommitHorizontal`, `History`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-315 | [UpdateLogPanel](../components/components-pokemon-admin-update-log-panel-updatelogpanel.md) (MWI-COMP-315) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <article>
    - <div>
      - <div>
        - <p>
        - <h2>
        - <p>
      - <button>
        - <History />
    - <div>
      - <article>
        - <div>
          - <div>
            - <strong>
            - <small>
            - <p>
          - <span>
        - <div>
          - <span>
          - <span>
    - <p>
  - <article>
    - <div>
      - <div>
        - <p>
        - <h2>
        - <p>
      - <button>
        - <Cloud />
    - <div>
      - <article>
        - <div>
          - <div>
            - <strong>
            - <small>
            - <p>
          - <span>
    - <p>
  - <article>
    - <div>
      - <GitCommitHorizontal />
      - <div>
        - <p>
        - <h2>
    - <div>
      - <article>
        - <p>
        - <strong>
        - <code>
          - <ExternalLink />
    - <p>

Unique HTML/React tags: `article`, `button`, `Cloud`, `code`, `div`, `ExternalLink`, `GitCommitHorizontal`, `h2`, `History`, `p`, `section`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| deployHistory | deployHistory = [] | See exact signature/contract below |
| gitHistory | gitHistory = [] | See exact signature/contract below |
| onOpenDeployHistory | Not found | See exact signature/contract below |
| onOpenSourceHistory | Not found | See exact signature/contract below |
| sourceHistory | sourceHistory = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  gitHistory = [],
  sourceHistory = [],
  deployHistory = [],
  onOpenSourceHistory,
  onOpenDeployHistory,
}
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Checked, Unchecked, Success, Empty.
- Text properties: `deployHistory`, `gitHistory`, `onOpenDeployHistory`, `onOpenSourceHistory`, `sourceHistory`.
- Instance swaps: `Cloud`, `ExternalLink`, `GitCommitHorizontal`, `History`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Not found | Not found |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
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
- Alignment utilities: `items-center, items-start, justify-between, justify-center, sm:items-start, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-5`, `mb-4`, `mt-1`, `mt-2`, `mt-3`, `p-4`, `p-5`, `px-3`, `px-4`, `py-1`, `py-1.5`, `py-2`, `sm:p-5` |
| Sizing | `min-h-11`, `min-w-0` |
| Typography | `break-words`, `font-black`, `font-bold`, `font-mono`, `leading-6`, `text-2xl`, `text-cyan-100`, `text-cyan-200/70`, `text-emerald-200`, `text-emerald-200/70`, `text-sky-100`, `text-sky-200/70`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.18em]`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/15`, `border-cyan-200/25`, `border-dashed`, `border-sky-200/15`, `border-sky-200/25`, `border-white/10`, `border-white/15`, `hover:border-cyan-200/50`, `hover:border-sky-200/50` |
| Shadows/elevation | `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-cyan-400/[0.07]`, `bg-cyan-400/10`, `bg-sky-400/[0.07]`, `bg-slate-950/35`, `bg-white/[0.055]`, `bg-white/[0.07]`, `bg-white/[0.075]`, `hover:bg-cyan-400/15`, `hover:bg-sky-400/15` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-cyan-400/[0.07]` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-sky-400/[0.07]` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.07]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/15` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-sky-200/15` | base | static occurrence |
| `border-sky-200/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `break-words` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:bg-sky-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:border-sky-200/50` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:items-start` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-emerald-200` | base | static occurrence |
| `text-emerald-200/70` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-sky-200/70` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `xl:grid-cols-[1.1fr_.9fr]` | xl | static occurrence |

Exact className combinations:

- `-`
- `block break-words font-black text-white`
- `flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`
- `grid gap-3`
- `grid items-start gap-5 xl:grid-cols-[1.1fr_.9fr]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-sky-200/50 hover:bg-sky-400/15`
- `mb-4 flex flex-wrap items-start justify-between gap-3`
- `mb-4 flex items-center gap-3`
- `min-w-0`
- `mt-1 block text-xs font-bold text-slate-400`
- `mt-2 block break-words text-sm font-black text-white`
- `mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-bold text-cyan-100`
- `mt-2 text-2xl font-black text-white`
- `mt-2 text-sm font-bold leading-6 text-slate-300`
- `mt-2 text-sm font-bold leading-6 text-slate-400`
- `mt-3 grid gap-2 text-xs font-bold text-slate-400 sm:grid-cols-2`
- `rounded-2xl border border-cyan-200/15 bg-cyan-400/[0.07] p-4`
- `rounded-2xl border border-dashed border-white/15 p-5 text-sm font-bold text-slate-400`
- `rounded-2xl border border-sky-200/15 bg-sky-400/[0.07] p-4`
- `rounded-2xl border border-white/10 bg-slate-950/35 p-4`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `shrink-0 rounded-full border border-cyan-200/25 bg-slate-950/35 px-3 py-1.5 font-mono text-xs font-black text-cyan-100`
- `shrink-0 rounded-full border border-sky-200/25 bg-slate-950/35 px-3 py-1.5 font-mono text-xs font-black text-sky-100`
- `text-2xl font-black text-white`
- `text-emerald-200`
- `text-xs font-black uppercase tracking-[0.18em] text-slate-500`
- `text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70`
- `text-xs font-black uppercase tracking-[0.22em] text-emerald-200/70`
- `text-xs font-black uppercase tracking-[0.22em] text-sky-200/70`
- `truncate rounded-xl border border-cyan-200/15 bg-cyan-400/10 px-3 py-2 text-cyan-100`
- `truncate rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:flex-row`, `sm:grid-cols-2`, `sm:items-start`, `sm:justify-between`, `sm:p-5`, `xl:grid-cols-[1.1fr_.9fr]`.
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

- Lucide icons: `Cloud`, `ExternalLink`, `GitCommitHorizontal`, `History`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Checked, Unchecked, Success, Empty.
- Instance swaps: `Cloud`, `ExternalLink`, `GitCommitHorizontal`, `History`.
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
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
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
