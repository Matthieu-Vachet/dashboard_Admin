---
id: MWI-COMP-324
component: "Textarea"
category: "Primitive UI"
status: exported
source: "src/components/ui/input.tsx"
lines: 20-33
figma_priority: 85
evidence: static_code
---

# Textarea

## 1. Purpose

Primitive UI component implemented in src/components/ui/input.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-324`.
- Location: `Dashboard Admin/src/components/ui/input.tsx`:20.
- File range: lines 20–33.
- Definition kind: variable.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **85/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | forwardRef, TextareaHTMLAttributes | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-015 | [ProjectsPage](../components/app-dashboard-projects-page-projectspage.md) (MWI-COMP-015) | Renders/imports this component |
| MWI-COMP-028 | [DailyTools](../components/components-admin-dashboard-daily-tools-dailytools.md) (MWI-COMP-028) | Renders/imports this component |
| MWI-COMP-044 | [SnippetModal](../components/components-admin-dashboard-snippet-vault-snippetmodal.md) (MWI-COMP-044) | Renders/imports this component |
| MWI-COMP-073 | [CalendarPlanner](../components/components-admin-forms-calendar-planner-calendarplanner.md) (MWI-COMP-073) | Renders/imports this component |
| MWI-COMP-082 | [KanbanBoard](../components/components-admin-forms-kanban-board-kanbanboard.md) (MWI-COMP-082) | Renders/imports this component |
| MWI-COMP-086 | [NotesBoard](../components/components-admin-forms-notes-board-notesboard.md) (MWI-COMP-086) | Renders/imports this component |
| MWI-COMP-088 | [WriterStudio](../components/components-admin-forms-writer-studio-writerstudio.md) (MWI-COMP-088) | Renders/imports this component |
| MWI-COMP-101 | [PseudocodeCard](../components/components-admin-learning-learning-detail-modal-pseudocodecard.md) (MWI-COMP-101) | Renders/imports this component |
| MWI-COMP-259 | [Area](../components/components-admin-tables-dashboard-backlog-area.md) (MWI-COMP-259) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <textarea />

Unique HTML/React tags: `textarea`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| className | Not found | See exact signature/contract below |
| props | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ className, ...props }
```

Exact local props contract when statically resolvable:

```tsx
TextareaHTMLAttributes<HTMLTextAreaElement>
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Focused.
- Text properties: `className`, `props`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Not found | Not found |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `p-3` |
| Sizing | `min-h-32`, `w-full` |
| Typography | `font-medium`, `leading-6`, `placeholder:text-muted/70`, `text-foreground`, `text-sm` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-line`, `focus:border-brand-2/55`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-white/[0.06]`, `focus:bg-white/[0.09]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-white/[0.06]` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-line` | base | conditional or expression-derived |
| `focus:bg-white/[0.09]` | focus | conditional or expression-derived |
| `focus:border-brand-2/55` | focus | conditional or expression-derived |
| `font-medium` | base | conditional or expression-derived |
| `leading-6` | base | conditional or expression-derived |
| `min-h-32` | base | conditional or expression-derived |
| `outline-none` | base | conditional or expression-derived |
| `p-3` | base | conditional or expression-derived |
| `placeholder:text-muted/70` | placeholder | conditional or expression-derived |
| `resize-none` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `text-foreground` | base | conditional or expression-derived |
| `text-sm` | base | conditional or expression-derived |
| `transition` | base | conditional or expression-derived |
| `w-full` | base | conditional or expression-derived |

Exact className combinations:

- `min-h-32 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3 text-sm font-medium leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "min-h-32 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3 text-sm font-medium leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]", className, )`

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

`focus:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Focused.
- Instance swaps: Not found.
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
| □ | Focused | focus styling or handler |
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
