---
id: MWI-COMP-232
component: "SourceRows"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/source-watch-panel.tsx"
lines: 359-469
figma_priority: 34
evidence: static_code
---

# SourceRows

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/source-watch-panel.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-232`.
- Location: `Dashboard Admin/src/components/admin/pokemon/source-watch-panel.tsx`:359.
- File range: lines 359–469.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ExternalLink | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-233 | [SourceStat](../components/components-admin-pokemon-source-watch-panel-sourcestat.md) (MWI-COMP-233) | JSX/import relation |

Unresolved/external JSX tags: `ExternalLink`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-314 | [SourceRows](../components/components-pokemon-admin-source-watch-panel-sourcerows.md) (MWI-COMP-314) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <p>
- <p>
- <div>
  - <div>
    - <SourceStat />
    - <SourceStat />
    - <SourceStat />
    - <SourceStat />
    - <SourceStat />
  - <p>
  - <div>
    - <p>
    - <div>
      - <span>
  - <div>
    - <a>
      - <span>
        - <strong>
        - <small>
      - <span>
      - <span>
      - <span>
        - <span>
        - <ExternalLink />
  - <p>

Unique HTML/React tags: `a`, `div`, `ExternalLink`, `p`, `small`, `SourceStat`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| sourceWatch | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ sourceWatch }: { sourceWatch: SourceWatchState }
```

Exact local props contract when statically resolvable:

```tsx
{ sourceWatch: SourceWatchState }

type SourceWatchState = {
  loading?: boolean;
  error?: string;
  sources?: SourceItem[];
} | null;
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Error, Warning, Success.
- Text properties: `sourceWatch`.
- Instance swaps: `ExternalLink`.
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
| Loading | Detected | loading/pending signal |
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
- Alignment utilities: `items-center, justify-end, md:items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-3`, `p-3`, `p-4`, `px-2.5`, `px-3`, `py-1`, `py-1.5`, `space-y-3` |
| Sizing | `max-w-32`, `min-w-0`, `w-fit` |
| Typography | `font-black`, `font-bold`, `leading-6`, `text-[11px]`, `text-amber-100`, `text-cyan-100`, `text-emerald-100`, `text-red-100`, `text-red-50`, `text-sky-100/75`, `text-sky-50`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.14em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-300/18`, `border-b`, `border-cyan-300/15`, `border-dashed`, `border-emerald-300/14`, `border-red-300/18`, `border-red-300/30`, `border-red-300/40`, `border-sky-200/25`, `border-sky-300/25`, `border-white/10`, `border-white/15`, `last:border-b-0` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-400/[0.05]`, `bg-amber-400/15`, `bg-cyan-400/10`, `bg-emerald-400/[0.045]`, `bg-emerald-400/15`, `bg-red-500/[0.055]`, `bg-red-500/10`, `bg-red-500/15`, `bg-red-500/16`, `bg-red-500/20`, `bg-sky-300/15`, `bg-sky-400/10`, `bg-slate-950/30`, `bg-slate-950/35`, `bg-white/[0.055]`, `hover:bg-amber-400/10`, `hover:bg-emerald-400/9`, `hover:bg-red-500/10`, `hover:bg-red-500/22` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/[0.05]` | base | static occurrence |
| `bg-amber-400/15` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/[0.045]` | base | static occurrence |
| `bg-emerald-400/15` | base | static occurrence |
| `bg-red-500/[0.055]` | base | static occurrence |
| `bg-red-500/10` | base | static occurrence |
| `bg-red-500/15` | base | static occurrence |
| `bg-red-500/16` | base | static occurrence |
| `bg-red-500/20` | base | static occurrence |
| `bg-sky-300/15` | base | static occurrence |
| `bg-sky-400/10` | base | static occurrence |
| `bg-slate-950/30` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/18` | base | static occurrence |
| `border-b` | base | conditional or expression-derived |
| `border-cyan-300/15` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-300/14` | base | static occurrence |
| `border-red-300/18` | base | static occurrence |
| `border-red-300/30` | base | static occurrence |
| `border-red-300/40` | base | static occurrence |
| `border-sky-200/25` | base | static occurrence |
| `border-sky-300/25` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/15` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `hover:bg-amber-400/10` | hover | static occurrence |
| `hover:bg-emerald-400/9` | hover | static occurrence |
| `hover:bg-red-500/10` | hover | static occurrence |
| `hover:bg-red-500/22` | hover | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `justify-end` | base | static occurrence |
| `last:border-b-0` | last | conditional or expression-derived |
| `leading-6` | base | static occurrence |
| `max-w-32` | base | static occurrence |
| `md:grid-cols-[minmax(0,1fr)_11rem_10rem_auto]` | md | conditional or expression-derived |
| `md:grid-cols-5` | md | static occurrence |
| `md:items-center` | md | conditional or expression-derived |
| `min-w-0` | base | conditional or expression-derived |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `py-1` | base | conditional or expression-derived |
| `py-1.5` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `space-y-3` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sky-100/75` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `tracking-[0.14em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-fit` | base | conditional or expression-derived |

Exact className combinations:

- `bg-amber-400/15 text-amber-100`
- `bg-emerald-400/15 text-emerald-100`
- `bg-red-500/15 text-red-100`
- `bg-red-500/20 text-red-50`
- `block truncate font-black text-white`
- `border-amber-300/18 bg-amber-400/[0.05] hover:bg-amber-400/10`
- `border-emerald-300/14 bg-emerald-400/[0.045] hover:bg-emerald-400/9`
- `border-red-300/18 bg-red-500/[0.055] hover:bg-red-500/10`
- `border-red-300/40 bg-red-500/16 hover:bg-red-500/22`
- `grid gap-3 md:grid-cols-5`
- `grid min-w-0 gap-3 border-b border-white/10 p-3 transition last:border-b-0 md:grid-cols-[minmax(0,1fr)_11rem_10rem_auto] md:items-center`
- `inline-flex items-center justify-end gap-2 text-xs font-black text-cyan-100`
- `inline-flex w-fit rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300`
- `inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-black`
- `max-w-32 truncate`
- `min-w-0`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `mt-3 flex flex-wrap gap-2`
- `overflow-hidden rounded-3xl border border-white/10 bg-slate-950/30`
- `rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-100`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100`
- `rounded-2xl border border-sky-300/25 bg-sky-400/10 p-4`
- `rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold text-slate-300`
- `rounded-full border border-sky-200/25 bg-sky-300/15 px-3 py-1.5 text-xs font-black text-sky-50`
- `space-y-3`
- `text-xs font-black uppercase tracking-[0.18em] text-sky-100/75`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid min-w-0 gap-3 border-b border-white/10 p-3 transition last:border-b-0 md:grid-cols-[minmax(0,1fr)_11rem_10rem_auto] md:items-center ${tone.card}\``
- `\`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-black ${tone.badge}\``

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

`hover:`, `last:`

## 13. Responsive behavior

- Breakpoints used: `md`.
- Responsive utilities: `md:grid-cols-[minmax(0,1fr)_11rem_10rem_auto]`, `md:grid-cols-5`, `md:items-center`.
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

- Lucide icons: `ExternalLink`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Error, Warning, Success.
- Instance swaps: `ExternalLink`.
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
| □ | Loading | loading/pending signal |
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
| □ | Responsive: md | Tailwind md: utilities |

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
