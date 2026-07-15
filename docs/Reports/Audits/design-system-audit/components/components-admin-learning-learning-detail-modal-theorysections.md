---
id: MWI-COMP-106
component: "TheorySections"
category: "Learning internal"
status: internal
source: "src/components/admin/learning/learning-detail-modal.tsx"
lines: 279-305
figma_priority: 18
evidence: static_code
---

# TheorySections

## 1. Purpose

Learning internal component implemented in src/components/admin/learning/learning-detail-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-106`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-detail-modal.tsx`:279.
- File range: lines 279–305.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | AlertTriangle, CircleHelp | icons |
| @/types/admin/learning | LearningTheorySection | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-107 | [LearningMarkdown](../components/components-admin-learning-learning-detail-modal-learningmarkdown.md) (MWI-COMP-107) | JSX/import relation |
| MWI-COMP-112 | [ListBlock](../components/components-admin-learning-learning-detail-modal-listblock.md) (MWI-COMP-112) | JSX/import relation |

Unresolved/external JSX tags: `AlertTriangle`, `CircleHelp`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-099 | [TheoryCard](../components/components-admin-learning-learning-detail-modal-theorycard.md) (MWI-COMP-099) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <section aria-labelledby={`theory-section-${section.id}`}>
    - <h4 id={`theory-section-${section.id}`}>
    - <LearningMarkdown />
    - <div>
      - <div>
      - <pre>
        - <code>
      - <p>
    - <div>
      - <h5>
        - <AlertTriangle />
      - <ul>
        - <li>
    - <ListBlock />
    - <div>
      - <h5>
        - <CircleHelp />
      - <ol>
        - <li>
    - <div>
      - <span>
      - <p>

Unique HTML/React tags: `AlertTriangle`, `CircleHelp`, `code`, `div`, `h4`, `h5`, `LearningMarkdown`, `li`, `ListBlock`, `ol`, `p`, `pre`, `section`, `span`, `ul`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| sections | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ sections }: { sections: LearningTheorySection[] }
```

Exact local props contract when statically resolvable:

```tsx
{ sections: LearningTheorySection[] }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success, Scrollable.
- Text properties: `sections`.
- Instance swaps: `AlertTriangle`, `CircleHelp`.
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
| Scrollable | Detected | overflow scrolling utility |
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
| Spacing | `gap-2`, `mt-2`, `mt-4`, `mt-5`, `p-3`, `p-4`, `pl-5`, `px-3`, `py-2`, `space-y-1`, `space-y-4` |
| Sizing | Not found |
| Typography | `font-black`, `font-mono`, `font-semibold`, `leading-6`, `text-[11px]`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-foreground`, `text-lg`, `text-muted`, `text-sm`, `text-warning`, `text-xs`, `tracking-[0.12em]`, `tracking-[0.13em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-b`, `border-brand-3/20`, `border-brand/20`, `border-line`, `border-t`, `border-warning/25` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/15`, `bg-black/30`, `bg-brand-3/[0.05]`, `bg-brand/[0.05]`, `bg-warning/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/15` | base | static occurrence |
| `bg-black/30` | base | static occurrence |
| `bg-brand-3/[0.05]` | base | static occurrence |
| `bg-brand/[0.05]` | base | static occurrence |
| `bg-warning/[0.06]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-brand-3/20` | base | static occurrence |
| `border-brand/20` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-warning/25` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `list-decimal` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-x-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pl-5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `space-y-1` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `tracking-[0.13em]` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `border-b border-line px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.12em] text-muted`
- `border-t border-line px-3 py-2 text-sm font-semibold leading-6 text-muted`
- `flex items-center gap-2 text-sm font-black text-brand`
- `flex items-center gap-2 text-sm font-black text-warning`
- `mt-2 list-decimal space-y-1 pl-5 text-sm font-semibold text-muted`
- `mt-2 space-y-1 text-sm font-semibold text-muted`
- `mt-2 text-sm font-semibold leading-6 text-muted`
- `mt-4 overflow-hidden rounded-lg border border-line bg-black/30`
- `mt-4 rounded-lg border border-brand-3/20 bg-brand-3/[0.05] p-3`
- `mt-4 rounded-lg border border-brand/20 bg-brand/[0.05] p-3`
- `mt-4 rounded-lg border border-warning/25 bg-warning/[0.06] p-3`
- `mt-5 space-y-4`
- `overflow-x-auto p-3 font-mono text-sm leading-6 text-foreground`
- `rounded-lg border border-line bg-black/15 p-4`
- `text-lg font-black text-brand-2`
- `text-xs font-black uppercase tracking-[0.13em] text-brand-3`

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
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-labelledby={\`theory-section-${section.id}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `AlertTriangle`, `CircleHelp`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success, Scrollable.
- Instance swaps: `AlertTriangle`, `CircleHelp`.
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
| □ | Scrollable | overflow scrolling utility |
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
