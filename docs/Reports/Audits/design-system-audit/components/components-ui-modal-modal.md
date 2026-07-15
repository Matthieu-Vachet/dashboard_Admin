---
id: MWI-COMP-325
component: "Modal"
category: "Primitive UI"
status: exported
source: "src/components/ui/modal.tsx"
lines: 8-77
figma_priority: 85
evidence: static_code
---

# Modal

## 1. Purpose

Primitive UI component implemented in src/components/ui/modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-325`.
- Location: `Dashboard Admin/src/components/ui/modal.tsx`:8.
- File range: lines 8–77.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **85/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | X | icons |
| react | useEffect, ReactNode | external package |
| react-dom | createPortal | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-015 | [ProjectsPage](../components/app-dashboard-projects-page-projectspage.md) (MWI-COMP-015) | Renders/imports this component |
| MWI-COMP-044 | [SnippetModal](../components/components-admin-dashboard-snippet-vault-snippetmodal.md) (MWI-COMP-044) | Renders/imports this component |
| MWI-COMP-073 | [CalendarPlanner](../components/components-admin-forms-calendar-planner-calendarplanner.md) (MWI-COMP-073) | Renders/imports this component |
| MWI-COMP-082 | [KanbanBoard](../components/components-admin-forms-kanban-board-kanbanboard.md) (MWI-COMP-082) | Renders/imports this component |
| MWI-COMP-098 | [LearningDetailModal](../components/components-admin-learning-learning-detail-modal-learningdetailmodal.md) (MWI-COMP-098) | Renders/imports this component |
| MWI-COMP-115 | [LearningImportModal](../components/components-admin-learning-learning-import-modal-learningimportmodal.md) (MWI-COMP-115) | Renders/imports this component |
| MWI-COMP-143 | [BackgroundPanel](../components/components-admin-pokemon-background-panel-backgroundpanel.md) (MWI-COMP-143) | Renders/imports this component |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | Renders/imports this component |
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <button aria-label="Fermer" />
  - <section role="dialog" aria-modal="true" aria-label={title}>
    - <header>
      - <div>
        - <h2>
        - <p>
      - <button aria-label="Fermer la fenêtre">
        - <X />
    - <div>
    - <footer>

Unique HTML/React tags: `button`, `div`, `footer`, `h2`, `header`, `p`, `section`, `X`.

## 5. React structure and state management

- Hooks: `useEffect`.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |
| className | Not found | See exact signature/contract below |
| description | Not found | See exact signature/contract below |
| footer | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  open,
  title,
  description,
  children,
  footer,
  className,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClose: () => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClose: () => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Collapsed, Expanded, Scrollable.
- Text properties: `children`, `className`, `description`, `footer`, `onClose`, `open`, `title`.
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
- Pointer/cursor behavior: `cursor-default`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-start, justify-between, place-items-center`.
- Positioning utilities: `absolute, fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,0.46)` |
| Spacing | `gap-4`, `inset-0`, `mt-1`, `p-3`, `p-4`, `sm:p-5` |
| Sizing | `h-10`, `max-h-[92dvh]`, `max-h-[calc(92dvh-9rem)]`, `max-w-2xl`, `min-w-0`, `w-10`, `w-full` |
| Typography | `font-black`, `font-semibold`, `hover:text-foreground`, `leading-6`, `leading-tight`, `text-foreground`, `text-muted`, `text-sm`, `text-xl` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-b`, `border-line`, `border-line-strong`, `border-t` |
| Shadows/elevation | `shadow-[0_30px_120px_rgba(0,0,0,0.46)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-black/65`, `bg-panel-strong`, `bg-white/[0.06]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-black/65` | base | static occurrence |
| `bg-panel-strong` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-b` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-line-strong` | base | conditional or expression-derived |
| `border-t` | base | static occurrence |
| `cursor-default` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inset-0` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `max-h-[92dvh]` | base | conditional or expression-derived |
| `max-h-[calc(92dvh-9rem)]` | base | static occurrence |
| `max-w-2xl` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_30px_120px_rgba(0,0,0,0.46)]` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `transition` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |
| `z-[1100]` | base | static occurrence |

Exact className combinations:

- `absolute inset-0 cursor-default`
- `border-t border-line p-4 sm:p-5`
- `fixed inset-0 z-[1100] grid place-items-center bg-black/65 p-3 backdrop-blur-xl sm:p-5`
- `flex items-start justify-between gap-4 border-b border-line p-4 sm:p-5`
- `grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.06] text-muted transition hover:text-foreground`
- `max-h-[calc(92dvh-9rem)] overflow-auto p-4 sm:p-5`
- `min-w-0`
- `mt-1 text-sm font-semibold leading-6 text-muted`
- `relative max-h-[92dvh] w-full max-w-2xl overflow-hidden rounded-lg border border-line-strong bg-panel-strong shadow-[0_30px_120px_rgba(0,0,0,0.46)]`
- `text-xl font-black leading-tight text-foreground`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "relative max-h-[92dvh] w-full max-w-2xl overflow-hidden rounded-lg border border-line-strong bg-panel-strong shadow-[0_30px_120px_rgba(0,0,0,0.46)]", className, )`

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
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Fermer la fenêtre"`, `aria-label="Fermer"`, `aria-label={title}`, `aria-modal="true"`.
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
- Boolean properties: Hover, Collapsed, Expanded, Scrollable.
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
