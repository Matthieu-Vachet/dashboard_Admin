---
id: MWI-COMP-318
component: "Button"
category: "Primitive UI"
status: exported
source: "src/components/ui/button.tsx"
lines: 32-66
figma_priority: 88
evidence: static_code
---

# Button

## 1. Purpose

Primitive UI component implemented in src/components/ui/button.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-318`.
- Location: `Dashboard Admin/src/components/ui/button.tsx`:32.
- File range: lines 32–66.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **88/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @radix-ui/react-slot | Slot | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Component`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-015 | [ProjectsPage](../components/app-dashboard-projects-page-projectspage.md) (MWI-COMP-015) | Renders/imports this component |
| MWI-COMP-022 | [LoginPage](../components/app-login-page-loginpage.md) (MWI-COMP-022) | Renders/imports this component |
| MWI-COMP-026 | [ColorLab](../components/components-admin-dashboard-color-lab-colorlab.md) (MWI-COMP-026) | Renders/imports this component |
| MWI-COMP-028 | [DailyTools](../components/components-admin-dashboard-daily-tools-dailytools.md) (MWI-COMP-028) | Renders/imports this component |
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |
| MWI-COMP-041 | [Pomodoro](../components/components-admin-dashboard-pomodoro-pomodoro.md) (MWI-COMP-041) | Renders/imports this component |
| MWI-COMP-043 | [SnippetVault](../components/components-admin-dashboard-snippet-vault-snippetvault.md) (MWI-COMP-043) | Renders/imports this component |
| MWI-COMP-044 | [SnippetModal](../components/components-admin-dashboard-snippet-vault-snippetmodal.md) (MWI-COMP-044) | Renders/imports this component |
| MWI-COMP-073 | [CalendarPlanner](../components/components-admin-forms-calendar-planner-calendarplanner.md) (MWI-COMP-073) | Renders/imports this component |
| MWI-COMP-079 | [JavaScriptExercises](../components/components-admin-forms-javascript-exercises-javascriptexercises.md) (MWI-COMP-079) | Renders/imports this component |
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |
| MWI-COMP-082 | [KanbanBoard](../components/components-admin-forms-kanban-board-kanbanboard.md) (MWI-COMP-082) | Renders/imports this component |
| MWI-COMP-086 | [NotesBoard](../components/components-admin-forms-notes-board-notesboard.md) (MWI-COMP-086) | Renders/imports this component |
| MWI-COMP-087 | [TodoList](../components/components-admin-forms-todo-list-todolist.md) (MWI-COMP-087) | Renders/imports this component |
| MWI-COMP-088 | [WriterStudio](../components/components-admin-forms-writer-studio-writerstudio.md) (MWI-COMP-088) | Renders/imports this component |
| MWI-COMP-089 | [ToolbarButton](../components/components-admin-forms-writer-studio-toolbarbutton.md) (MWI-COMP-089) | Renders/imports this component |
| MWI-COMP-101 | [PseudocodeCard](../components/components-admin-learning-learning-detail-modal-pseudocodecard.md) (MWI-COMP-101) | Renders/imports this component |
| MWI-COMP-105 | [ProgressButton](../components/components-admin-learning-learning-detail-modal-progressbutton.md) (MWI-COMP-105) | Renders/imports this component |
| MWI-COMP-115 | [LearningImportModal](../components/components-admin-learning-learning-import-modal-learningimportmodal.md) (MWI-COMP-115) | Renders/imports this component |
| MWI-COMP-121 | [AdminPaletteSelector](../components/components-admin-navigation-admin-palette-selector-adminpaletteselector.md) (MWI-COMP-121) | Renders/imports this component |
| MWI-COMP-122 | [AdminSidebar](../components/components-admin-navigation-admin-sidebar-adminsidebar.md) (MWI-COMP-122) | Renders/imports this component |
| MWI-COMP-124 | [AdminTopbar](../components/components-admin-navigation-admin-topbar-admintopbar.md) (MWI-COMP-124) | Renders/imports this component |
| MWI-COMP-191 | [PokemonApiExplorer](../components/components-admin-pokemon-pokemon-api-explorer-pokemonapiexplorer.md) (MWI-COMP-191) | Renders/imports this component |
| MWI-COMP-193 | [PokemonApiStatus](../components/components-admin-pokemon-pokemon-api-status-pokemonapistatus.md) (MWI-COMP-193) | Renders/imports this component |
| MWI-COMP-241 | [DatabaseStats](../components/components-admin-stats-database-stats-databasestats.md) (MWI-COMP-241) | Renders/imports this component |
| MWI-COMP-252 | [DashboardBacklog](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) (MWI-COMP-252) | Renders/imports this component |
| MWI-COMP-255 | [TicketCard](../components/components-admin-tables-dashboard-backlog-ticketcard.md) (MWI-COMP-255) | Renders/imports this component |
| MWI-COMP-256 | [TicketForm](../components/components-admin-tables-dashboard-backlog-ticketform.md) (MWI-COMP-256) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Component>
- <Component>

Unique HTML/React tags: `Component`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| asChild | Not found | See exact signature/contract below |
| children | Not found | See exact signature/contract below |
| className | Not found | See exact signature/contract below |
| icon | Not found | See exact signature/contract below |
| props | Not found | See exact signature/contract below |
| size | size = "md" | See exact signature/contract below |
| variant | variant = "secondary" | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  asChild,
  className,
  variant = "secondary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps
```

Exact local props contract when statically resolvable:

```tsx
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| variant | danger | Explicit string literal in props contract |
| variant | ghost | Explicit string literal in props contract |
| variant | primary | Explicit string literal in props contract |
| variant | secondary | Explicit string literal in props contract |
| size | icon | Explicit string literal in props contract |
| size | lg | Explicit string literal in props contract |
| size | md | Explicit string literal in props contract |
| size | sm | Explicit string literal in props contract |

- Boolean properties for Figma: Hover, Focused, Disabled, Error.
- Text properties: `asChild`, `children`, `className`, `icon`, `props`, `size`, `variant`.
- Instance swaps: Not found.
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
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: `disabled:cursor-not-allowed`.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Alignment utilities: `items-center, justify-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `p-0`, `px-3`, `px-4`, `px-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `font-black`, `hover:text-foreground`, `text-danger`, `text-foreground`, `text-muted`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-danger/30`, `border-line`, `border-transparent`, `focus-visible:outline`, `focus-visible:outline-2`, `focus-visible:outline-brand-2`, `focus-visible:outline-offset-2`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | `disabled:opacity-50` |
| Background | `bg-danger/15`, `bg-transparent`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `duration-200`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `disabled:cursor-not-allowed` | disabled | static occurrence |
| `disabled:opacity-50` | disabled | static occurrence |
| `duration-200` | base | static occurrence |
| `focus-visible:outline` | focus-visible | static occurrence |
| `focus-visible:outline-2` | focus-visible | static occurrence |
| `focus-visible:outline-brand-2` | focus-visible | static occurrence |
| `focus-visible:outline-offset-2` | focus-visible | static occurrence |
| `font-black` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `p-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `h-10 w-10 p-0`
- `inline-flex items-center justify-center gap-2 rounded-lg border font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 disabled:cursor-not-allowed disabled:opacity-50`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `buttonClassName`

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

`disabled:`, `focus-visible:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-200`, `transition`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Disabled, Error.
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
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| □ | Focused | focus styling or handler |
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
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Variant: variant=danger | Explicit props contract |
| □ | Variant: variant=ghost | Explicit props contract |
| □ | Variant: variant=primary | Explicit props contract |
| □ | Variant: variant=secondary | Explicit props contract |
| □ | Variant: size=icon | Explicit props contract |
| □ | Variant: size=lg | Explicit props contract |
| □ | Variant: size=md | Explicit props contract |
| □ | Variant: size=sm | Explicit props contract |
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
