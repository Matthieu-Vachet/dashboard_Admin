---
id: MWI-COMP-239
component: "SortableWidgetFrame"
category: "Shared pattern"
status: internal
source: "src/components/admin/shared/sortable-widget-grid.tsx"
lines: 174-238
figma_priority: 23
evidence: static_code
---

# SortableWidgetFrame

## 1. Purpose

Shared pattern component implemented in src/components/admin/shared/sortable-widget-grid.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-239`.
- Location: `Dashboard Admin/src/components/admin/shared/sortable-widget-grid.tsx`:174.
- File range: lines 174–238.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **23/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @dnd-kit/sortable | useSortable | external package |
| @dnd-kit/utilities | CSS | external package |
| framer-motion | motion | external package |
| lucide-react | EyeOff, GripVertical | icons |
| react | CSSProperties, ReactNode | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `EyeOff`, `GripVertical`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-238 | [SortableWidgetGrid](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) (MWI-COMP-238) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <motion.div>
  - <div>
    - <div>
      - <button aria-label={`Déplacer le widget ${label}`}>
        - <GripVertical />
      - <button aria-label={`Masquer le widget ${label}`}>
        - <EyeOff />

Unique HTML/React tags: `button`, `div`, `EyeOff`, `GripVertical`, `motion.div`.

## 5. React structure and state management

- Hooks: `useSortable`.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |
| className | Not found | See exact signature/contract below |
| id | Not found | See exact signature/contract below |
| index | Not found | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| onHide | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  id,
  index,
  label,
  children,
  className,
  onHide,
}: {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
  onHide?: (id: string) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  id: string;
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
  onHide?: (id: string) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Warning, Dragging, Hidden.
- Text properties: `children`, `className`, `id`, `index`, `label`, `onHide`.
- Instance swaps: `EyeOff`, `GripVertical`.
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
| Warning | Detected | warning/amber/yellow signal |
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Detected | drag state signal |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--foreground`, `--widget-accent` |
| Literal colors | `rgba(34,211,238,.22)` |
| Spacing | `gap-1`, `mb-4`, `p-1`, `right-3`, `top-3` |
| Sizing | `h-9`, `min-w-0`, `w-9` |
| Typography | `break-inside-avoid`, `text-slate-100` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-white/10`, `hover:border-amber-200/40`, `hover:border-cyan-200/40` |
| Shadows/elevation | `shadow-[0_26px_90px_rgba(34,211,238,.22)]`, `shadow-2xl` |
| Opacity | `md:group-focus-within:opacity-100`, `md:group-hover:opacity-100`, `md:opacity-0`, `opacity-100`, `opacity-90` |
| Background | `backdrop-blur`, `bg-slate-950/70`, `bg-white/[0.07]`, `hover:bg-amber-400/15`, `hover:bg-cyan-400/15` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `backdrop-blur` | base | static occurrence |
| `bg-slate-950/70` | base | static occurrence |
| `bg-white/[0.07]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-inside-avoid` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-9` | base | static occurrence |
| `hover:bg-amber-400/15` | hover | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-amber-200/40` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `mb-4` | base | conditional or expression-derived |
| `md:group-focus-within:opacity-100` | md:group-focus-within | static occurrence |
| `md:group-hover:opacity-100` | md:group-hover | static occurrence |
| `md:opacity-0` | md | static occurrence |
| `min-w-0` | base | conditional or expression-derived |
| `opacity-100` | base | static occurrence |
| `opacity-90` | base | conditional or expression-derived |
| `p-1` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `right-3` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `scale-[1.01]` | base | conditional or expression-derived |
| `shadow-[0_26px_90px_rgba(34,211,238,.22)]` | base | conditional or expression-derived |
| `shadow-2xl` | base | static occurrence |
| `text-slate-100` | base | static occurrence |
| `top-3` | base | static occurrence |
| `touch-none` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `w-9` | base | static occurrence |
| `widget-frame-actions` | base | static occurrence |
| `widget-frame-button` | base | static occurrence |
| `widget-glow-frame` | base | conditional or expression-derived |
| `z-20` | base | static occurrence |

Exact className combinations:

- `group relative min-w-0 rounded-2xl transition`
- `scale-[1.01] opacity-90 shadow-[0_26px_90px_rgba(34,211,238,.22)]`
- `widget-frame-actions absolute right-3 top-3 z-20 flex items-center gap-1 rounded-2xl border border-white/10 bg-slate-950/70 p-1 opacity-100 shadow-2xl backdrop-blur transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100`
- `widget-frame-button grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-amber-200/40 hover:bg-amber-400/15`
- `widget-frame-button grid h-9 w-9 touch-none place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/15`
- `widget-glow-frame mb-4 min-w-0 break-inside-avoid`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "group relative min-w-0 rounded-2xl transition", isDragging && "scale-[1.01] opacity-90 shadow-[0_26px_90px_rgba(34,211,238,.22)]", )`
- `cn("widget-glow-frame mb-4 min-w-0 break-inside-avoid", className)`

### CSS variables

`--foreground`, `--widget-accent`

### Inline style expressions

- `{style}`

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

```css
.light .widget-glow-frame > div {
background:
    linear-gradient(135deg, color-mix(in srgb, var(--widget-accent) 12%, transparent), transparent 52%),
    rgba(255, 255, 255, 0.88);
  color: var(--foreground);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.76),
    0 18px 52px rgba(15, 23, 42, 0.08);
}
```

```css
.light .widget-glow-frame::before {
opacity: 0.36;
  filter: blur(20px);
}
```

```css
.light .widget-toolbar-button, .light .widget-frame-button, .light .widget-toolbar-empty {
border-color: rgba(31, 45, 69, 0.12);
  background: rgba(255, 255, 255, 0.82);
  color: #334155;
}
```

```css
.light .widget-toolbar, .light .widget-frame-actions {
border-color: rgba(31, 45, 69, 0.13);
  background: rgba(255, 255, 255, 0.74);
  color: #334155;
}
```

```css
.widget-glow-frame {
position: relative;
  isolation: isolate;
}
```

```css
.widget-glow-frame > div {
border: 1px solid color-mix(in srgb, var(--widget-accent) 24%, transparent);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--widget-accent) 10%, transparent), transparent 48%),
    rgba(255, 255, 255, 0.015);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--widget-accent) 18%, transparent),
    0 18px 58px rgba(0, 0, 0, 0.1);
}
```

```css
.widget-glow-frame > div::before {
position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--widget-accent) 32%, transparent), transparent);
  content: "";
  opacity: 0.2;
  pointer-events: none;
}
```

```css
.widget-glow-frame::before {
position: absolute;
  inset: 14px 6px -8px;
  z-index: -1;
  border-radius: 14px;
  background: radial-gradient(circle at 24% 0%, color-mix(in srgb, var(--widget-accent) 32%, transparent), transparent 58%);
  content: "";
  filter: blur(18px);
  opacity: 0.58;
  pointer-events: none;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `md`.
- Responsive utilities: `md:group-focus-within:opacity-100`, `md:group-hover:opacity-100`, `md:opacity-0`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label={\`Déplacer le widget ${label}\`}`, `aria-label={\`Masquer le widget ${label}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `EyeOff`, `GripVertical`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Warning, Dragging, Hidden.
- Instance swaps: `EyeOff`, `GripVertical`.
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
| □ | Warning | warning/amber/yellow signal |
| — | Success | Not found |
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| □ | Dragging | drag state signal |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
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
