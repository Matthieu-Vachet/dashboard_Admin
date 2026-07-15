---
id: MWI-COMP-094
component: "AdminVersionHistoryDialog"
category: "Layout / navigation"
status: exported
source: "src/components/admin/layout/admin-version-history-dialog.tsx"
lines: 13-94
figma_priority: 49
evidence: static_code
---

# AdminVersionHistoryDialog

## 1. Purpose

Layout / navigation component implemented in src/components/admin/layout/admin-version-history-dialog.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-094`.
- Location: `Dashboard Admin/src/components/admin/layout/admin-version-history-dialog.tsx`:13.
- File range: lines 13–94.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **49/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| framer-motion | AnimatePresence, motion | external package |
| lucide-react | X | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `AnimatePresence`, `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-092 | [AdminAppFrame](../components/components-admin-layout-admin-app-frame-adminappframe.md) (MWI-COMP-092) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <AnimatePresence>
  - <motion.div role="dialog" aria-modal="true" aria-label="Historique des versions du Dashboard">
    - <motion.section>
      - <header>
        - <div>
          - <p>
          - <h2>
          - <p>
        - <button aria-label="Fermer l'historique des versions">
          - <X />
      - <div>
        - <div>
          - <article>
            - <div>
              - <div>
                - <span>
                - <h3>
              - <time>
            - <ul>
              - <li>

Unique HTML/React tags: `AnimatePresence`, `article`, `button`, `div`, `h2`, `h3`, `header`, `li`, `motion.div`, `motion.section`, `p`, `span`, `time`, `ul`, `X`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entries | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  entries,
  open,
  onClose,
}: AdminVersionHistoryDialogProps
```

Exact local props contract when statically resolvable:

```tsx
type AdminVersionHistoryDialogProps = {
  entries: DashboardVersionEntry[];
  open: boolean;
  onClose: () => void;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Expanded, Scrollable.
- Text properties: `entries`, `onClose`, `open`.
- Instance swaps: `X`.
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
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Not found | Not found |
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
- Alignment utilities: `items-center, items-start, justify-between, place-items-center`.
- Positioning utilities: `fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.55)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-2`, `mt-3`, `mt-4`, `p-3`, `p-4`, `p-5`, `px-3`, `py-1`, `py-2`, `sm:p-5` |
| Sizing | `h-11`, `max-h-[calc(100dvh-13rem)]`, `max-h-[calc(100dvh-2rem)]`, `max-w-2xl`, `max-w-3xl`, `w-11`, `w-full` |
| Typography | `font-black`, `font-bold`, `leading-6`, `text-2xl`, `text-brand-2`, `text-foreground`, `text-lg`, `text-muted`, `text-sm`, `text-xs`, `tracking-[0.2em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-b`, `border-brand-2/25`, `border-line` |
| Shadows/elevation | `shadow-[0_24px_120px_rgba(0,0,0,.55)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-brand-2/10`, `bg-card`, `bg-slate-950/20`, `bg-slate-950/82`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.06]`, `hover:bg-white/10` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-card` | base | static occurrence |
| `bg-slate-950/20` | base | static occurrence |
| `bg-slate-950/82` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-brand-2/25` | base | static occurrence |
| `border-line` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-11` | base | static occurrence |
| `hover:bg-white/10` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-h-[calc(100dvh-13rem)]` | base | static occurrence |
| `max-h-[calc(100dvh-2rem)]` | base | static occurrence |
| `max-w-2xl` | base | static occurrence |
| `max-w-3xl` | base | static occurrence |
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
| `py-2` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_24px_120px_rgba(0,0,0,.55)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.2em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-11` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1100]` | base | static occurrence |
| `z-[1110]` | base | static occurrence |

Exact className combinations:

- `fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5`
- `flex flex-wrap items-center justify-between gap-3`
- `flex items-start justify-between gap-4 border-b border-line bg-white/[0.04] p-5`
- `grid gap-3`
- `grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.06] text-foreground transition hover:bg-white/10`
- `inline-flex rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-xs font-black text-brand-2`
- `max-h-[calc(100dvh-13rem)] overflow-y-auto p-5`
- `mt-2 max-w-2xl text-sm font-bold leading-6 text-muted`
- `mt-2 text-2xl font-black`
- `mt-3 text-lg font-black`
- `mt-4 grid gap-2 text-sm font-bold leading-6 text-muted`
- `relative z-[1110] max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-card shadow-[0_24px_120px_rgba(0,0,0,.55)]`
- `rounded-2xl border border-line bg-white/[0.045] p-4`
- `rounded-xl border border-line bg-slate-950/20 px-3 py-2`
- `text-xs font-black text-muted`
- `text-xs font-black uppercase tracking-[0.2em] text-brand-2`

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Fermer l'historique des versions"`, `aria-label="Historique des versions du Dashboard"`, `aria-modal="true"`.
- Roles: `role="dialog"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `X`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Expanded, Scrollable.
- Instance swaps: `X`.
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
| — | Error | Not found |
| — | Warning | Not found |
| — | Success | Not found |
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
| □ | Scrollable | overflow scrolling utility |
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
