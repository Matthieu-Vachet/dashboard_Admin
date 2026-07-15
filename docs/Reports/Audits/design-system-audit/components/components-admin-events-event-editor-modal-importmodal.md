---
id: MWI-COMP-046
component: "ImportModal"
category: "Events feature"
status: exported
source: "src/components/admin/events/event-editor-modal.jsx"
lines: 53-83
figma_priority: 31
evidence: static_code
---

# ImportModal

## 1. Purpose

Events feature component implemented in src/components/admin/events/event-editor-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-046`.
- Location: `Dashboard Admin/src/components/admin/events/event-editor-modal.jsx`:53.
- File range: lines 53–83.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | FileJson, X | icons |
| @/components/admin/pokemon/admin-ui | buttonClass, fieldClass, primaryButtonClass | internal |
| @/components/admin/shared/modal-portal | ModalPortal | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `FileJson`, `ModalPortal`, `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-051 | [EventsCalendarPanel](../components/components-admin-events-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-051) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <ModalPortal>
  - <div>
    - <article>
      - <div>
        - <div>
          - <p>
          - <h2>
        - <button>
          - <X />
      - <textarea />
      - <div>
        - <button>
        - <button>
          - <FileJson />

Unique HTML/React tags: `article`, `button`, `div`, `FileJson`, `h2`, `ModalPortal`, `p`, `textarea`, `X`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| busy | Not found | See exact signature/contract below |
| onChange | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| onImport | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ value, busy, onChange, onClose, onImport }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Disabled.
- Text properties: `busy`, `onChange`, `onClose`, `onImport`, `value`.
- Instance swaps: `FileJson`, `X`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Not found | Not found |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-center, justify-end, place-items-center`.
- Positioning utilities: `fixed`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#07111f`, `rgba(0,0,0,.5)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-2`, `gap-4`, `inset-0`, `mb-4`, `mt-1`, `mt-5`, `p-3`, `p-4`, `px-4`, `py-2`, `sm:p-6` |
| Sizing | `h-10`, `max-w-4xl`, `min-h-[360px]`, `min-h-11`, `min-h-12`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `leading-5`, `placeholder:text-slate-500`, `text-2xl`, `text-cyan-200/70`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-[2rem]`, `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-white/10`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_30px_120px_rgba(0,0,0,.5)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-[#07111f]`, `bg-gradient-to-r`, `bg-slate-950/45`, `bg-slate-950/82`, `bg-white/[0.075]`, `bg-white/10`, `from-sky-500`, `hover:bg-cyan-400/15`, `to-cyan-400` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-[#07111f]` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-slate-950/82` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | conditional or expression-derived |
| `from-sky-500` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `leading-5` | base | conditional or expression-derived |
| `max-w-4xl` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-h-[360px]` | base | conditional or expression-derived |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-[2rem]` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_30px_120px_rgba(0,0,0,.5)]` | base | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-cyan-400` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1200]` | base | static occurrence |

Exact className combinations:

- `fixed inset-0 z-[1200] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl`
- `grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `mb-4 flex items-start justify-between gap-4`
- `min-h-[360px] font-mono text-xs leading-5`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `mt-1 text-2xl font-black text-white`
- `mt-5 flex justify-end gap-2`
- `text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70`
- `w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#07111f] p-4 shadow-[0_30px_120px_rgba(0,0,0,.5)] sm:p-6`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} min-h-[360px] font-mono text-xs leading-5\``
- `buttonClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:p-6`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
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

- Lucide icons: `FileJson`, `X`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Disabled.
- Instance swaps: `FileJson`, `X`.
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
| □ | Focused | focus styling or handler |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
| — | Warning | Not found |
| — | Success | Not found |
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
