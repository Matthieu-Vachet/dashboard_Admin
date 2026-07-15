---
id: MWI-COMP-027
component: "ColorValue"
category: "Dashboard internal"
status: internal
source: "src/components/admin/dashboard/color-lab.tsx"
lines: 133-155
figma_priority: 18
evidence: static_code
---

# ColorValue

## 1. Purpose

Dashboard internal component implemented in src/components/admin/dashboard/color-lab.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-027`.
- Location: `Dashboard Admin/src/components/admin/dashboard/color-lab.tsx`:133.
- File range: lines 133–155.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Check, Copy | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Check`, `Copy`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-026 | [ColorLab](../components/components-admin-dashboard-color-lab-colorlab.md) (MWI-COMP-026) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span>
  - <span>
  - <Check />
  - <Copy />

Unique HTML/React tags: `button`, `Check`, `Copy`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| copied | Not found | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| onCopy | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: string;
  onCopy: (value: string) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  label: string;
  value: string;
  copied: string;
  onCopy: (value: string) => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `copied`, `label`, `onCopy`, `value`.
- Instance swaps: `Check`, `Copy`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Not found | Not found |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-3`, `p-3` |
| Sizing | `w-full` |
| Typography | `font-black`, `font-mono`, `text-brand-3`, `text-left`, `text-muted`, `text-sm`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.045]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-white/[0.045]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[72px_1fr_auto]` | base | static occurrence |
| `items-center` | base | static occurrence |
| `p-3` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `font-mono text-sm font-black`
- `grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 rounded-lg border border-line bg-white/[0.045] p-3 text-left`
- `text-brand-3`
- `text-muted`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`

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

Not found

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
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

- Lucide icons: `Check`, `Copy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Not found.
- Instance swaps: `Check`, `Copy`.
- Text properties: expose each textual prop from the props contract; when text is hardcoded, preserve it in the default instance.
- Variables: bind CSS variables and semantic token references listed in this document. Literal utilities remain documented implementation values.
- Constraints: infer from width/min/max and responsive utilities; any value not encoded is marked Estimated from implementation.
- Nested components: use the child component links below as true instances rather than detached groups.
- Interactive components: create prototype states only for interactions detected in the state/event tables.

## 18. Screenshot capture checklist

| Capture | State / variant | Evidence |
|---|---|---|
| □ | Default | Base render path |
| — | Hover | Not found |
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
| — | Responsive variants | Not found |

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
