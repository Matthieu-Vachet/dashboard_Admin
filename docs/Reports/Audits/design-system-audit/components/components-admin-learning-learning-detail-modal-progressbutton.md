---
id: MWI-COMP-105
component: "ProgressButton"
category: "Learning internal"
status: internal
source: "src/components/admin/learning/learning-detail-modal.tsx"
lines: 256-277
figma_priority: 30
evidence: static_code
---

# ProgressButton

## 1. Purpose

Learning internal component implemented in src/components/admin/learning/learning-detail-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-105`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-detail-modal.tsx`:256.
- File range: lines 256–277.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **30/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | BookOpen, CheckCircle2, Play | icons |
| @/components/ui/button | Button | internal |
| @/types/admin/learning | LearningProgressMutationResult, LearningProgressPatch, LearningStatus | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |

Unresolved/external JSX tags: `BookOpen`, `CheckCircle2`, `Play`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-099 | [TheoryCard](../components/components-admin-learning-learning-detail-modal-theorycard.md) (MWI-COMP-099) | Renders/imports this component |
| MWI-COMP-100 | [ExerciseCard](../components/components-admin-learning-learning-detail-modal-exercisecard.md) (MWI-COMP-100) | Renders/imports this component |
| MWI-COMP-101 | [PseudocodeCard](../components/components-admin-learning-learning-detail-modal-pseudocodecard.md) (MWI-COMP-101) | Renders/imports this component |
| MWI-COMP-102 | [ChallengeCard](../components/components-admin-learning-learning-detail-modal-challengecard.md) (MWI-COMP-102) | Renders/imports this component |
| MWI-COMP-103 | [ProjectCard](../components/components-admin-learning-learning-detail-modal-projectcard.md) (MWI-COMP-103) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Button>
- <Button>
- <Button>

Unique HTML/React tags: `BookOpen`, `Button`, `CheckCircle2`, `Play`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| item | Not found | See exact signature/contract below |
| onSetProgress | Not found | See exact signature/contract below |
| saving | Not found | See exact signature/contract below |
| startLabel | startLabel = "Commencer" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ item, saving, startLabel = "Commencer", onSetProgress }: {
  item: { id: string; status: LearningStatus };
  saving: boolean;
  startLabel?: string;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  item: { id: string; status: LearningStatus };
  saving: boolean;
  startLabel?: string;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Disabled, Error.
- Text properties: `item`, `onSetProgress`, `saving`, `startLabel`.
- Instance swaps: `BookOpen`, `CheckCircle2`, `Play`.
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
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `p-0`, `px-3`, `px-4`, `px-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `hover:text-foreground`, `text-danger`, `text-foreground`, `text-muted`, `text-sm`, `text-white`, `text-xs` |
| Radius | Not found |
| Borders/strokes | `border-danger/30`, `border-line`, `border-transparent`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-danger/15`, `bg-transparent`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `p-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`

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

- Lucide icons: `BookOpen`, `CheckCircle2`, `Play`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Disabled, Error.
- Instance swaps: `BookOpen`, `CheckCircle2`, `Play`.
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
