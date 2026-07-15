---
id: MWI-COMP-112
component: "ListBlock"
category: "Learning internal"
status: internal
source: "src/components/admin/learning/learning-detail-modal.tsx"
lines: 355-364
figma_priority: 27
evidence: static_code
---

# ListBlock

## 1. Purpose

Learning internal component implemented in src/components/admin/learning/learning-detail-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-112`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-detail-modal.tsx`:355.
- File range: lines 355–364.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **27/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | CheckCircle2, Lightbulb, ShieldAlert | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Icon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-099 | [TheoryCard](../components/components-admin-learning-learning-detail-modal-theorycard.md) (MWI-COMP-099) | Renders/imports this component |
| MWI-COMP-102 | [ChallengeCard](../components/components-admin-learning-learning-detail-modal-challengecard.md) (MWI-COMP-102) | Renders/imports this component |
| MWI-COMP-103 | [ProjectCard](../components/components-admin-learning-learning-detail-modal-projectcard.md) (MWI-COMP-103) | Renders/imports this component |
| MWI-COMP-106 | [TheorySections](../components/components-admin-learning-learning-detail-modal-theorysections.md) (MWI-COMP-106) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <h4>
    - <Icon />
  - <ul>
    - <li>
      - <span aria-hidden>
      - <span>
  - <p>

Unique HTML/React tags: `div`, `h4`, `Icon`, `li`, `p`, `span`, `ul`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| items | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| tone | tone = "default" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "danger" | "success" }
```

Exact local props contract when statically resolvable:

```tsx
{ title: string; items: string[]; tone?: "default" | "danger" | "success" }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| tone | danger | Explicit string literal in props contract |
| tone | default | Explicit string literal in props contract |
| tone | success | Explicit string literal in props contract |

- Boolean properties for Figma: Error, Success, Empty, Hidden.
- Text properties: `items`, `title`, `tone`.
- Instance swaps: `CheckCircle2`, `Lightbulb`, `ShieldAlert`.
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
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
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
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `mt-2`, `p-3`, `space-y-1.5` |
| Sizing | Not found |
| Typography | `font-black`, `font-semibold`, `leading-5`, `text-brand-2`, `text-brand-3`, `text-danger`, `text-muted`, `text-sm` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/15` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/15` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `leading-5` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `space-y-1.5` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |

Exact className combinations:

- `flex gap-2`
- `flex items-center gap-2 text-sm font-black`
- `mt-2 space-y-1.5 text-sm font-semibold leading-5 text-muted`
- `mt-2 text-sm font-semibold text-muted`
- `rounded-lg border border-line bg-black/15 p-3`
- `text-brand-2`
- `text-brand-3`
- `text-danger`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`flex items-center gap-2 text-sm font-black ${toneClass}\``

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
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-hidden`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CheckCircle2`, `Lightbulb`, `ShieldAlert`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Error, Success, Empty, Hidden.
- Instance swaps: `CheckCircle2`, `Lightbulb`, `ShieldAlert`.
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
| — | Warning | Not found |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Variant: tone=danger | Explicit props contract |
| □ | Variant: tone=default | Explicit props contract |
| □ | Variant: tone=success | Explicit props contract |
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
