---
id: MWI-COMP-200
component: "MarkdownBlocks"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/pokemon-docs-viewer.tsx"
lines: 120-198
figma_priority: 18
evidence: static_code
---

# MarkdownBlocks

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/pokemon-docs-viewer.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-200`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-docs-viewer.tsx`:120.
- File range: lines 120–198.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo | external package |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Cell`, `Tag`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-199 | [PokemonDocsViewer](../components/components-admin-pokemon-pokemon-docs-viewer-pokemondocsviewer.md) (MWI-COMP-199) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Tag>
- <pre>
  - <code>
- <div>
  - <table>
    - <tbody>
      - <tr>
        - <Cell>
- <ul>
  - <li>
    - <span />
    - <span>
- <p>

Unique HTML/React tags: `Cell`, `code`, `div`, `li`, `p`, `pre`, `span`, `table`, `Tag`, `tbody`, `tr`, `ul`.

## 5. React structure and state management

- Hooks: `useMemo`.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| content | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ content }: { content: string }
```

Exact local props contract when statically resolvable:

```tsx
{ content: string }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Collapsed, Scrollable.
- Text properties: `content`.
- Instance swaps: Not found.
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
| Warning | Not found | Not found |
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Detected | collapsed/closed signal |
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

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-3`, `mt-3`, `p-3`, `p-4`, `pt-3`, `px-3`, `py-2`, `space-y-2` |
| Sizing | `h-1.5`, `min-w-[620px]`, `w-1.5`, `w-full` |
| Typography | `font-black`, `font-mono`, `leading-6`, `leading-tight`, `text-2xl`, `text-base`, `text-cyan-50`, `text-foreground`, `text-left`, `text-muted`, `text-sm`, `text-xl`, `text-xs` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-b`, `border-collapse`, `border-line`, `last:border-b-0` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2`, `bg-slate-950/70`, `bg-white/[0.025]`, `bg-white/[0.035]`, `bg-white/[0.065]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `align-top` | base | conditional or expression-derived |
| `bg-brand-2` | base | static occurrence |
| `bg-slate-950/70` | base | static occurrence |
| `bg-white/[0.025]` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.065]` | base | conditional or expression-derived |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-collapse` | base | static occurrence |
| `border-line` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-mono` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `h-1.5` | base | static occurrence |
| `last:border-b-0` | last | static occurrence |
| `leading-6` | base | static occurrence |
| `leading-tight` | base | conditional or expression-derived |
| `min-w-[620px]` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pt-3` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `py-2` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `space-y-2` | base | static occurrence |
| `text-2xl` | base | conditional or expression-derived |
| `text-base` | base | conditional or expression-derived |
| `text-cyan-50` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-left` | base | static occurrence |
| `text-muted` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `text-xl` | base | conditional or expression-derived |
| `text-xs` | base | static occurrence |
| `w-1.5` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `bg-white/[0.065] font-black text-foreground`
- `border-b border-line last:border-b-0`
- `flex gap-3`
- `mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2`
- `overflow-auto rounded-lg border border-line`
- `overflow-auto rounded-lg border border-line bg-slate-950/70 p-4 font-mono text-xs leading-6 text-cyan-50`
- `pt-3 font-black leading-tight text-foreground`
- `px-3 py-2 align-top`
- `rounded-lg border border-line bg-white/[0.025] p-3`
- `space-y-2 rounded-lg border border-line bg-white/[0.035] p-4`
- `text-2xl`
- `text-base`
- `text-muted`
- `text-xl`
- `w-full min-w-[620px] border-collapse text-left text-sm`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "pt-3 font-black leading-tight text-foreground", block.level === 1 ? "text-2xl" : block.level === 2 ? "text-xl" : "text-base", )`
- `cn( "px-3 py-2 align-top", rowIndex === 0 ? "bg-white/[0.065] font-black text-foreground" : "text-muted", )`

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

`last:`

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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Collapsed, Scrollable.
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
