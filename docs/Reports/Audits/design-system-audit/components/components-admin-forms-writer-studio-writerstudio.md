---
id: MWI-COMP-088
component: "WriterStudio"
category: "Form feature"
status: exported
source: "src/components/admin/forms/writer-studio.tsx"
lines: 53-257
figma_priority: 34
evidence: static_code
---

# WriterStudio

## 1. Purpose

Form feature component implemented in src/components/admin/forms/writer-studio.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-088`.
- Location: `Dashboard Admin/src/components/admin/forms/writer-studio.tsx`:53.
- File range: lines 53–257.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Bold, Code2, Eye, EyeOff, FileText, Heading1, Heading2, Italic, Link2, List, ListOrdered, Plus, Quote, Save, Trash2, Underline | icons |
| react | useMemo, useRef, useState | external package |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/card | Card | internal |
| @/components/ui/input | Input, Textarea | internal |
| @/data/personal-dashboard-defaults | initialWriterDocuments, WriterDocument | internal |
| @/lib/cn | cn | internal |
| @/lib/use-persistent-state | usePersistentState | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-089 | [ToolbarButton](../components/components-admin-forms-writer-studio-toolbarbutton.md) (MWI-COMP-089) | JSX/import relation |
| MWI-COMP-090 | [DocumentPreview](../components/components-admin-forms-writer-studio-documentpreview.md) (MWI-COMP-090) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |
| MWI-COMP-324 | [Textarea](../components/components-ui-input-textarea.md) (MWI-COMP-324) | JSX/import relation |

Unresolved/external JSX tags: `Bold`, `Code2`, `Eye`, `EyeOff`, `FileText`, `Heading1`, `Heading2`, `Italic`, `Link2`, `List`, `ListOrdered`, `Plus`, `Quote`, `Save`, `Trash2`, `Underline`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-020 | [WriterPage](../components/app-dashboard-writer-page-writerpage.md) (MWI-COMP-020) | Renders/imports this component |
| MWI-COMP-288 | [WriterStudio](../components/components-dashboard-writer-studio-writerstudio.md) (MWI-COMP-288) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <div>
      - <Badge>
      - <Button>
    - <div>
      - <button>
        - <span>
          - <FileText />
        - <span>
          - <strong>
          - <small>
          - <small>
  - <Card>
    - <div>
      - <div>
        - <div>
          - <Badge>
          - <h2>
        - <div>
          - <Badge>
          - <Badge>
          - <Button>
          - <Button>
          - <Button>
      - <div>
        - <Input />
        - <Input />
      - <div>
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
        - <ToolbarButton />
      - <div>
        - <Textarea />
        - <DocumentPreview />
      - <div>
        - <span>
        - <span>
    - <div>
      - <p>

Unique HTML/React tags: `Badge`, `Bold`, `button`, `Button`, `Card`, `Code2`, `div`, `DocumentPreview`, `Eye`, `EyeOff`, `FileText`, `h2`, `Heading1`, `Heading2`, `Input`, `Italic`, `Link2`, `List`, `ListOrdered`, `p`, `Plus`, `Quote`, `Save`, `small`, `span`, `strong`, `Textarea`, `ToolbarButton`, `Trash2`, `Underline`.

## 5. React structure and state management

- Hooks: `useMemo`, `usePersistentState`, `useState`.
- Local state initializers: `confirmDelete = false`, `preview = true`, `selectedId = initialWriterDocuments[0]?.id || ""`.
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

- Boolean properties for Figma: Hover, Selected, Error, Warning, Success, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `Bold`, `Code2`, `Eye`, `EyeOff`, `FileText`, `Heading1`, `Heading2`, `Italic`, `Link2`, `List`, `ListOrdered`, `Plus`, `Quote`, `Save`, `Trash2`, `Underline`.
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
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, justify-between, place-items-center, sm:items-center, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `p-0`, `p-2`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `sm:p-5`, `space-y-2`, `space-y-4` |
| Sizing | `h-10`, `min-h-[420px]`, `min-h-[58dvh]`, `min-h-10`, `min-h-12`, `min-h-9`, `min-w-0`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `hover:text-foreground`, `leading-8`, `text-[11px]`, `text-3xl`, `text-amber-100`, `text-base`, `text-brand-2`, `text-center`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xl`, `text-xs` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/45`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.04]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.075]`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/45` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `gap-4` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[auto_1fr]` | base | conditional or expression-derived |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.075]` | hover | conditional or expression-derived |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-8` | base | static occurrence |
| `lg:grid-cols-[1fr_280px]` | lg | static occurrence |
| `min-h-[420px]` | base | static occurrence |
| `min-h-[58dvh]` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `resize-y` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |
| `xl:grid-cols-[340px_1fr]` | xl | static occurrence |
| `xl:grid-cols-[minmax(0,1fr)_420px]` | xl | conditional or expression-derived |

Exact className combinations:

- `block truncate text-sm font-black`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/45 bg-brand-2/12`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.04] hover:bg-white/[0.075]`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`
- `flex flex-wrap gap-2`
- `flex flex-wrap gap-2 rounded-lg border border-line bg-white/[0.04] p-2`
- `flex items-center justify-between gap-3`
- `font-black`
- `grid gap-2 rounded-lg border border-line bg-white/[0.04] p-3 text-xs font-bold text-muted sm:grid-cols-2`
- `grid gap-3 lg:grid-cols-[1fr_280px]`
- `grid gap-4`
- `grid gap-4 xl:grid-cols-[340px_1fr]`
- `grid h-10 w-10 place-items-center rounded-lg bg-brand-2/10 text-brand-2`
- `grid min-h-[420px] place-items-center text-center text-muted`
- `grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition`
- `h-10 w-10 p-0`
- `min-h-[58dvh] resize-y text-base leading-8`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0`
- `mt-1 block truncate text-xs font-bold text-muted`
- `mt-2 block truncate text-[11px] font-black text-brand-2`
- `mt-3 text-3xl font-black`
- `mt-4 space-y-2`
- `p-4`
- `p-4 sm:p-5`
- `space-y-4`
- `text-xl font-black`
- `xl:grid-cols-[minmax(0,1fr)_420px]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition", selected?.id === document.id ? "border-brand-2/45 bg-brand-2/12" : "border-line bg-white/[0.04] hover:bg-white/[0.075]", )`
- `cn("grid gap-4", preview && "xl:grid-cols-[minmax(0,1fr)_420px]")`

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

- Breakpoints used: `lg`, `sm`, `xl`.
- Responsive utilities: `lg:grid-cols-[1fr_280px]`, `sm:flex-row`, `sm:grid-cols-2`, `sm:items-center`, `sm:justify-between`, `sm:p-5`, `xl:grid-cols-[340px_1fr]`, `xl:grid-cols-[minmax(0,1fr)_420px]`.
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
- Focus management hooks/refs: Detected in source; preserve exact sequence..
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Bold`, `Code2`, `Eye`, `EyeOff`, `FileText`, `Heading1`, `Heading2`, `Italic`, `Link2`, `List`, `ListOrdered`, `Plus`, `Quote`, `Save`, `Trash2`, `Underline`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Error, Warning, Success, Active, Inactive.
- Instance swaps: `Bold`, `Code2`, `Eye`, `EyeOff`, `FileText`, `Heading1`, `Heading2`, `Italic`, `Link2`, `List`, `ListOrdered`, `Plus`, `Quote`, `Save`, `Trash2`, `Underline`.
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
| □ | Responsive: lg | Tailwind lg: utilities |
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
