---
id: MWI-COMP-256
component: "TicketForm"
category: "Internal component"
status: internal
source: "src/components/admin/tables/dashboard-backlog.tsx"
lines: 720-786
figma_priority: 23
evidence: static_code
---

# TicketForm

## 1. Purpose

Internal component component implemented in src/components/admin/tables/dashboard-backlog.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-256`.
- Location: `Dashboard Admin/src/components/admin/tables/dashboard-backlog.tsx`:720.
- File range: lines 720–786.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **23/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Save, Trash2 | icons |
| @/components/ui/button | Button | internal |
| @/components/ui/input | Input | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-257 | [SelectField](../components/components-admin-tables-dashboard-backlog-selectfield.md) (MWI-COMP-257) | JSX/import relation |
| MWI-COMP-258 | [Field](../components/components-admin-tables-dashboard-backlog-field.md) (MWI-COMP-258) | JSX/import relation |
| MWI-COMP-259 | [Area](../components/components-admin-tables-dashboard-backlog-area.md) (MWI-COMP-259) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |

Unresolved/external JSX tags: `Save`, `Trash2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <label>
    - <span>
    - <Input />
  - <div>
    - <SelectField />
    - <SelectField />
    - <SelectField />
  - <SelectField />
  - <div>
    - <Field />
    - <Field />
  - <Area />
  - <div>
    - <Area />
    - <Area />
    - <Area />
  - <div>
    - <Area />
    - <Area />
  - <div>
    - <p>
    - <pre>
  - <div>
    - <Button>
    - <Button>

Unique HTML/React tags: `Area`, `Button`, `div`, `Field`, `Input`, `label`, `p`, `pre`, `Save`, `SelectField`, `span`, `Trash2`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| confirmDelete | Not found | See exact signature/contract below |
| draft | Not found | See exact signature/contract below |
| editing | Not found | See exact signature/contract below |
| onDelete | Not found | See exact signature/contract below |
| onSave | Not found | See exact signature/contract below |
| onUpdate | Not found | See exact signature/contract below |
| saving | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  confirmDelete,
  draft,
  editing,
  saving,
  onDelete,
  onSave,
  onUpdate,
}: {
  confirmDelete: boolean;
  draft: TicketDraft;
  editing: boolean;
  saving: boolean;
  onDelete: () => void;
  onSave: () => void;
  onUpdate: (patch: Partial<TicketDraft>) => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  confirmDelete: boolean;
  draft: TicketDraft;
  editing: boolean;
  saving: boolean;
  onDelete: () => void;
  onSave: () => void;
  onUpdate: (patch: Partial<TicketDraft>) => void;
}

type TicketDraft = Omit<
  BacklogTicket,
  "id" | "codexPrompt" | "createdAt" | "updatedAt" | "resolvedAt" | "history"
>;
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| draft | codexPrompt | Explicit string literal in props contract |
| draft | createdAt | Explicit string literal in props contract |
| draft | history | Explicit string literal in props contract |
| draft | id | Explicit string literal in props contract |
| draft | resolvedAt | Explicit string literal in props contract |
| draft | updatedAt | Explicit string literal in props contract |

- Boolean properties for Figma: Hover, Disabled, Error, Scrollable.
- Text properties: `confirmDelete`, `draft`, `editing`, `onDelete`, `onSave`, `onUpdate`, `saving`.
- Instance swaps: `Save`, `Trash2`.
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
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Detected | error/danger signal |
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
| Scrollable | Detected | overflow scrolling utility |
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

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-2`, `mt-3`, `p-0`, `p-3`, `px-3`, `px-4`, `px-5`, `space-y-4` |
| Sizing | `h-10`, `max-h-56`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `font-black`, `font-mono`, `hover:text-foreground`, `leading-6`, `text-brand-3`, `text-danger`, `text-foreground`, `text-lg`, `text-muted`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.16em]`, `uppercase`, `whitespace-pre-wrap` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-danger/30`, `border-line`, `border-transparent`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-danger/15`, `bg-slate-950/45`, `bg-transparent`, `bg-white/[0.04]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-danger/15` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
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
| `justify-end` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `max-h-56` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `md:grid-cols-3` | md | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `whitespace-pre-wrap` | base | static occurrence |

Exact className combinations:

- `block`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-wrap justify-end gap-2`
- `grid gap-3 lg:grid-cols-2`
- `grid gap-3 lg:grid-cols-3`
- `grid gap-3 md:grid-cols-2`
- `grid gap-3 md:grid-cols-3`
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2 text-lg font-black`
- `mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-slate-950/45 p-3 font-mono text-xs leading-6 text-brand-3`
- `rounded-lg border border-line bg-white/[0.04] p-3`
- `space-y-4`
- `text-xs font-black uppercase tracking-[0.16em] text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

- Breakpoints used: `lg`, `md`.
- Responsive utilities: `lg:grid-cols-2`, `lg:grid-cols-3`, `md:grid-cols-2`, `md:grid-cols-3`.
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

- Lucide icons: `Save`, `Trash2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Disabled, Error, Scrollable.
- Instance swaps: `Save`, `Trash2`.
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
| □ | Disabled | disabled prop, attribute, or class |
| □ | Error | error/danger signal |
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
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
| □ | Variant: draft=codexPrompt | Explicit props contract |
| □ | Variant: draft=createdAt | Explicit props contract |
| □ | Variant: draft=history | Explicit props contract |
| □ | Variant: draft=id | Explicit props contract |
| □ | Variant: draft=resolvedAt | Explicit props contract |
| □ | Variant: draft=updatedAt | Explicit props contract |
| □ | Responsive: lg | Tailwind lg: utilities |
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
