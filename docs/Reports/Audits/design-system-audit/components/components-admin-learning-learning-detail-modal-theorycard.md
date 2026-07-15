---
id: MWI-COMP-099
component: "TheoryCard"
category: "Learning internal"
status: internal
source: "src/components/admin/learning/learning-detail-modal.tsx"
lines: 109-134
figma_priority: 18
evidence: static_code
---

# TheoryCard

## 1. Purpose

Learning internal component implemented in src/components/admin/learning/learning-detail-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-099`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-detail-modal.tsx`:109.
- File range: lines 109–134.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | BookOpen | icons |
| @/types/admin/learning | LearningProgressMutationResult, LearningProgressPatch, RuntimeLearningTheory, RuntimeLearningTopic | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-104 | [CardHeader](../components/components-admin-learning-learning-detail-modal-cardheader.md) (MWI-COMP-104) | JSX/import relation |
| MWI-COMP-105 | [ProgressButton](../components/components-admin-learning-learning-detail-modal-progressbutton.md) (MWI-COMP-105) | JSX/import relation |
| MWI-COMP-106 | [TheorySections](../components/components-admin-learning-learning-detail-modal-theorysections.md) (MWI-COMP-106) | JSX/import relation |
| MWI-COMP-112 | [ListBlock](../components/components-admin-learning-learning-detail-modal-listblock.md) (MWI-COMP-112) | JSX/import relation |

Unresolved/external JSX tags: `BookOpen`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-098 | [LearningDetailModal](../components/components-admin-learning-learning-detail-modal-learningdetailmodal.md) (MWI-COMP-098) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <CardHeader />
  - <p>
  - <p>
  - <TheorySections />
  - <div>
    - <ListBlock />
    - <ListBlock />
    - <ListBlock />
    - <ListBlock />
  - <div>
    - <span>
    - <p>
  - <div>
    - <ProgressButton />

Unique HTML/React tags: `BookOpen`, `CardHeader`, `div`, `ListBlock`, `p`, `ProgressButton`, `section`, `span`, `TheorySections`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onSetProgress`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| item | Not found | See exact signature/contract below |
| onSetProgress | Not found | See exact signature/contract below |
| references | Not found | See exact signature/contract below |
| saving | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ item, references, saving, onSetProgress }: {
  item: RuntimeLearningTheory;
  references: RuntimeLearningTopic["book"]["references"];
  saving: boolean;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  item: RuntimeLearningTheory;
  references: RuntimeLearningTopic["book"]["references"];
  saving: boolean;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| references | book | Explicit string literal in props contract |
| references | references | Explicit string literal in props contract |

- Boolean properties for Figma: Hover, Error, Warning, Success.
- Text properties: `item`, `onSetProgress`, `references`, `saving`.
- Instance swaps: `BookOpen`.
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
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-3`, `mt-2`, `mt-4`, `p-0`, `p-3`, `p-4`, `px-3`, `px-4`, `px-5`, `sm:p-5` |
| Sizing | `h-10`, `min-h-10`, `min-h-12`, `min-h-9`, `w-10` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `hover:text-foreground`, `leading-6`, `text-amber-100`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-warning`, `text-white`, `text-xs`, `tracking-[0.14em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/25`, `border-brand-2/30`, `border-brand-3/20`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-transparent`, `border-warning/30`, `border-warning/35`, `border-white/10`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/[0.045]`, `bg-brand-2/10`, `bg-brand-3/[0.06]`, `bg-brand-3/10`, `bg-brand/10`, `bg-brand/12`, `bg-danger/10`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/[0.045]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/[0.06]` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/25` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/20` | base | static occurrence |
| `border-brand-3/25` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/30` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-semibold` | base | static occurrence |
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
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-brand-2`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/25 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/10 text-brand`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/10 text-danger`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/30 bg-warning/10 text-warning`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-white/10 bg-white/[0.045] text-muted`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `h-10 w-10 p-0`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-2 text-sm font-semibold leading-6`
- `mt-2 text-sm font-semibold leading-6 text-muted`
- `mt-4 flex justify-end`
- `mt-4 grid gap-3 lg:grid-cols-2`
- `mt-4 rounded-lg border border-brand-3/20 bg-brand-3/[0.06] p-3`
- `mt-4 text-sm font-bold leading-6 text-foreground`
- `rounded-lg border border-brand-2/25 bg-brand-2/[0.045] p-4 sm:p-5`
- `text-xs font-black uppercase tracking-[0.14em] text-brand-3`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

```tsx
src/constants/admin/learning.ts#LEARNING_DIFFICULTY_CLASS
LEARNING_DIFFICULTY_CLASS: Record<LearningDifficulty, string> = {
  Facile: "border-brand-3/25 bg-brand-3/10 text-brand-3",
  Moyen: "border-warning/30 bg-warning/10 text-warning",
  Difficile: "border-danger/30 bg-danger/10 text-danger",
}
```

```tsx
src/constants/admin/learning.ts#LEARNING_STATUS_CLASS
LEARNING_STATUS_CLASS: Record<LearningStatus, string> = {
  not_started: "border-white/10 bg-white/[0.045] text-muted",
  in_progress: "border-brand-2/30 bg-brand-2/10 text-brand-2",
  completed: "border-brand-3/30 bg-brand-3/10 text-brand-3",
  reviewing: "border-brand/30 bg-brand/10 text-brand",
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

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-2`, `sm:p-5`.
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

- Lucide icons: `BookOpen`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success.
- Instance swaps: `BookOpen`.
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
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
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
| □ | Variant: references=book | Explicit props contract |
| □ | Variant: references=references | Explicit props contract |
| □ | Responsive: lg | Tailwind lg: utilities |
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
