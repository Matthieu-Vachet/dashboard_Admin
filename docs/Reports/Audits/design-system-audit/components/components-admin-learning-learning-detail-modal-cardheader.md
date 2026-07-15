---
id: MWI-COMP-104
component: "CardHeader"
category: "Learning internal"
status: internal
source: "src/components/admin/learning/learning-detail-modal.tsx"
lines: 242-254
figma_priority: 30
evidence: static_code
---

# CardHeader

## 1. Purpose

Learning internal component implemented in src/components/admin/learning/learning-detail-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-104`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-detail-modal.tsx`:242.
- File range: lines 242–254.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **30/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | ReactNode | external package |
| lucide-react | Clock3, Sparkles | icons |
| @/components/ui/badge | Badge | internal |
| @/constants/admin/learning | LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL | internal |
| @/types/admin/learning | LearningStatus | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |

Unresolved/external JSX tags: `Clock3`, `Sparkles`.

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

- <div>
  - <div>
    - <span>
    - <h3>
  - <div>
    - <Badge>
    - <Badge>
    - <Badge>
      - <Clock3 />
    - <Badge>
      - <Sparkles />

Unique HTML/React tags: `Badge`, `Clock3`, `div`, `h3`, `span`, `Sparkles`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| icon | Not found | See exact signature/contract below |
| item | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ icon, title, item }: { icon: ReactNode; title: string; item: { status: LearningStatus; difficulty?: string; estimatedMinutes: number; xp: number } }
```

Exact local props contract when statically resolvable:

```tsx
{ icon: ReactNode; title: string; item: { status: LearningStatus; difficulty?: string; estimatedMinutes: number; xp: number } }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Error, Warning, Success.
- Text properties: `icon`, `item`, `title`.
- Instance swaps: `Clock3`, `Sparkles`.
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- Alignment utilities: `items-center, items-start, justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3` |
| Sizing | `min-w-0` |
| Typography | `font-black`, `text-amber-100`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-lg`, `text-muted`, `text-rose-100`, `text-violet-100`, `text-warning` |
| Radius | Not found |
| Borders/strokes | `border-brand-2/30`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-warning/30`, `border-warning/35`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/10`, `bg-brand/12`, `bg-danger/10`, `bg-danger/12`, `bg-warning/10`, `bg-warning/12`, `bg-white/[0.045]`, `bg-white/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-warning/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/25` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-warning/30` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-warning` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-brand-2`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/25 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-brand-3`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/10 text-brand`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/10 text-danger`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/30 bg-warning/10 text-warning`
- `border-warning/35 bg-warning/12 text-amber-100`
- `border-white/10 bg-white/[0.045] text-muted`
- `flex flex-wrap items-center gap-2`
- `flex flex-wrap items-start justify-between gap-3`
- `flex min-w-0 items-center gap-2 text-lg font-black text-foreground`
- `text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `LEARNING_DIFFICULTY_CLASS[item.difficulty as keyof typeof LEARNING_DIFFICULTY_CLASS]`
- `LEARNING_STATUS_CLASS[item.status]`

### CSS variables

Not found

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
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Clock3`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Error, Warning, Success.
- Instance swaps: `Clock3`, `Sparkles`.
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
