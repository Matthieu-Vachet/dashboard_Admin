---
id: MWI-COMP-230
component: "SourceHistoryModal"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/source-watch-panel.tsx"
lines: 105-214
figma_priority: 34
evidence: static_code
---

# SourceHistoryModal

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/source-watch-panel.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-230`.
- Location: `Dashboard Admin/src/components/admin/pokemon/source-watch-panel.tsx`:105.
- File range: lines 105–214.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ExternalLink | icons |
| react-dom | createPortal | external package |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `ExternalLink`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-313 | [SourceHistoryModal](../components/components-pokemon-admin-source-watch-panel-sourcehistorymodal.md) (MWI-COMP-313) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div role="dialog" aria-modal="true">
  - <section>
    - <header>
      - <div>
        - <p>
        - <h3>
        - <p>
          - <span>
      - <button aria-label="Fermer l'historique des sources">
    - <div>
      - <div>
        - <article>
          - <div>
            - <div>
              - <div>
                - <span>
                - <span>
              - <strong>
              - <small>
              - <p>
            - <div>
              - <span>
              - <a>
                - <ExternalLink />
          - <div>
            - <div>
              - <p>
              - <code>
            - <div>
              - <p>
              - <code>
      - <p>

Unique HTML/React tags: `a`, `article`, `button`, `code`, `div`, `ExternalLink`, `h3`, `header`, `p`, `section`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| history | history = [] | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  open,
  history = [],
  onClose,
}: {
  open: boolean;
  history?: SourceHistoryItem[];
  onClose: () => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  open: boolean;
  history?: SourceHistoryItem[];
  onClose: () => void;
}

type SourceHistoryItem = SourceItem & {
  checkedAt?: string;
  sourceId?: string;
  previousSignature?: string | null;
  previousVersion?: string | null;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Checked, Unchecked, Success, Empty, Collapsed, Expanded, Scrollable.
- Text properties: `history`, `onClose`, `open`.
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
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Detected | expanded/open signal |
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
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-start, justify-between, md:items-start, md:justify-between, place-items-center`.
- Positioning utilities: `fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.5)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `p-3`, `p-4`, `p-5`, `px-3`, `py-1`, `py-1.5`, `sm:p-5` |
| Sizing | `h-11`, `max-h-[calc(100dvh-14rem)]`, `max-h-[calc(100dvh-2rem)]`, `max-w-3xl`, `max-w-5xl`, `min-w-0`, `sm:max-h-[calc(100dvh-3rem)]`, `w-11`, `w-full` |
| Typography | `break-all`, `break-words`, `font-black`, `font-bold`, `font-mono`, `hover:text-white`, `leading-5`, `leading-6`, `md:text-right`, `text-[11px]`, `text-2xl`, `text-cyan-100`, `text-cyan-100/70`, `text-cyan-200/75`, `text-cyan-50`, `text-emerald-100`, `text-left`, `text-lg`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.14em]`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-b`, `border-cyan-300/15`, `border-cyan-300/20`, `border-dashed`, `border-emerald-300/20`, `border-white/10`, `border-white/15` |
| Shadows/elevation | `shadow-[0_24px_120px_rgba(0,0,0,.5)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-slate-950`, `bg-slate-950/40`, `bg-slate-950/82`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `hover:bg-white/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-slate-950` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/82` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-cyan-300/15` | base | static occurrence |
| `border-cyan-300/20` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-300/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `break-all` | base | static occurrence |
| `break-words` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-11` | base | static occurrence |
| `hover:bg-white/10` | hover | static occurrence |
| `hover:text-white` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-h-[calc(100dvh-14rem)]` | base | static occurrence |
| `max-h-[calc(100dvh-2rem)]` | base | static occurrence |
| `max-w-3xl` | base | static occurrence |
| `max-w-5xl` | base | static occurrence |
| `md:flex-row` | md | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `md:items-start` | md | static occurrence |
| `md:justify-between` | md | static occurrence |
| `md:text-right` | md | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-y-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_24px_120px_rgba(0,0,0,.5)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:max-h-[calc(100dvh-3rem)]` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/70` | base | static occurrence |
| `text-cyan-200/75` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-11` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1001]` | base | static occurrence |
| `z-[1100]` | base | static occurrence |

Exact className combinations:

- `fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5`
- `flex flex-col gap-3 md:flex-row md:items-start md:justify-between`
- `flex flex-wrap items-center gap-2`
- `flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.04] p-5`
- `font-mono text-cyan-100`
- `grid gap-3`
- `grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl font-black text-white hover:bg-white/10`
- `inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black text-emerald-100`
- `max-h-[calc(100dvh-14rem)] overflow-y-auto p-5`
- `min-w-0`
- `mt-1 block text-xs font-bold text-slate-400`
- `mt-2 block break-all text-xs font-bold leading-5 text-cyan-50`
- `mt-2 block break-all text-xs font-bold leading-5 text-slate-300`
- `mt-2 inline-flex items-center gap-1 text-xs font-black text-cyan-100 hover:text-white`
- `mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-400`
- `mt-2 text-2xl font-black text-white`
- `mt-3 block break-words text-lg font-black text-white`
- `mt-3 text-sm font-bold leading-6 text-slate-300`
- `mt-4 grid gap-3 md:grid-cols-2`
- `relative z-[1001] max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_24px_120px_rgba(0,0,0,.5)] sm:max-h-[calc(100dvh-3rem)]`
- `rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-3`
- `rounded-2xl border border-dashed border-white/15 p-5 text-sm font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-slate-950/40 p-3`
- `rounded-2xl border border-white/10 bg-white/[0.045] p-4`
- `rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100`
- `rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300`
- `shrink-0 text-left md:text-right`
- `text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/70`
- `text-[11px] font-black uppercase tracking-[0.14em] text-slate-500`
- `text-xs font-black uppercase tracking-[0.22em] text-cyan-200/75`

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

- Breakpoints used: `md`, `sm`.
- Responsive utilities: `md:flex-row`, `md:grid-cols-2`, `md:items-start`, `md:justify-between`, `md:text-right`, `sm:max-h-[calc(100dvh-3rem)]`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Fermer l'historique des sources"`, `aria-modal="true"`.
- Roles: `role="dialog"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ExternalLink`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Checked, Unchecked, Success, Empty, Collapsed, Expanded, Scrollable.
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
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| □ | Collapsed | collapsed/closed signal |
| □ | Expanded | expanded/open signal |
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
