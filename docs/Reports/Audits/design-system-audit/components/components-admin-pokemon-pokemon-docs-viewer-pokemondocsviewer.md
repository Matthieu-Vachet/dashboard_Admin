---
id: MWI-COMP-199
component: "PokemonDocsViewer"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pokemon-docs-viewer.tsx"
lines: 18-118
figma_priority: 34
evidence: static_code
---

# PokemonDocsViewer

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pokemon-docs-viewer.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-199`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-docs-viewer.tsx`:18.
- File range: lines 18–118.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo, useState | external package |
| lucide-react | BookOpen, FileText, Search | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/components/ui/input | Input | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-200 | [MarkdownBlocks](../components/components-admin-pokemon-pokemon-docs-viewer-markdownblocks.md) (MWI-COMP-200) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |
| MWI-COMP-323 | [Input](../components/components-ui-input-input.md) (MWI-COMP-323) | JSX/import relation |

Unresolved/external JSX tags: `BookOpen`, `FileText`, `Search`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-013 | [PokemonDocsPage](../components/app-dashboard-pokemon-docs-page-pokemondocspage.md) (MWI-COMP-013) | Renders/imports this component |
| MWI-COMP-280 | [PokemonDocsViewer](../components/components-dashboard-pokemon-docs-viewer-pokemondocsviewer.md) (MWI-COMP-280) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
    - <label>
      - <Search />
      - <Input />
    - <div>
      - <button>
        - <span>
          - <FileText />
        - <span>
          - <strong>
          - <small>
      - <p>
  - <Card>
    - <Fragment>
      - <div>
        - <div>
          - <Badge>
          - <h2>
          - <p>
        - <div>
          - <BookOpen />
      - <article>
        - <MarkdownBlocks />
    - <div>
      - <p>

Unique HTML/React tags: `article`, `Badge`, `BookOpen`, `button`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `div`, `FileText`, `h2`, `Input`, `label`, `MarkdownBlocks`, `p`, `Search`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `query = ""`, `selectedSlug = docs[0]?.slug || ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| docs | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ docs }: { docs: PokemonDoc[] }
```

Exact local props contract when statically resolvable:

```tsx
{ docs: PokemonDoc[] }

export type PokemonDoc = {
  slug: string;
  file: string;
  title: string;
  content: string;
  lineCount: number;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Error, Warning, Success, Empty.
- Text properties: `docs`.
- Instance swaps: `BookOpen`, `FileText`, `Search`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
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
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, place-items-center, sm:items-start, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `p-3`, `p-4`, `pb-5`, `px-0`, `px-3`, `sm:p-5`, `space-y-2`, `space-y-3` |
| Sizing | `h-12`, `h-9`, `max-w-none`, `min-h-[420px]`, `min-h-0`, `min-h-11`, `min-w-0`, `w-12`, `w-9`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-7`, `sm:text-3xl`, `text-2xl`, `text-amber-100`, `text-brand-2`, `text-center`, `text-cyan-100`, `text-emerald-100`, `text-foreground`, `text-left`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-xs` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-0`, `border-b`, `border-brand-2/30`, `border-brand-2/45`, `border-brand-3/30`, `border-brand/30`, `border-danger/35`, `border-line`, `border-warning/35` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/12`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.04]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.07]`, `focus:bg-transparent`, `hover:bg-white/[0.075]` |
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
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.07]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-0` | base | static occurrence |
| `border-b` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/45` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-warning/35` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `focus:bg-transparent` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `gap-4` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[auto_1fr]` | base | conditional or expression-derived |
| `h-12` | base | static occurrence |
| `h-9` | base | static occurrence |
| `hover:bg-white/[0.075]` | hover | conditional or expression-derived |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `items-center` | base | static occurrence |
| `leading-7` | base | static occurrence |
| `max-w-none` | base | static occurrence |
| `min-h-[420px]` | base | static occurrence |
| `min-h-0` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `pb-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-0` | base | static occurrence |
| `px-3` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `sm:flex-row` | sm | static occurrence |
| `sm:items-start` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-left` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-12` | base | static occurrence |
| `w-9` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |
| `xl:grid-cols-[360px_1fr]` | xl | static occurrence |

Exact className combinations:

- `block truncate text-sm font-black`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-2/45 bg-brand-2/12 text-foreground`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.04] text-muted hover:bg-white/[0.075] hover:text-foreground`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between`
- `font-black`
- `grid gap-4 xl:grid-cols-[360px_1fr]`
- `grid h-12 w-12 place-items-center rounded-lg border border-line bg-white/[0.055] text-brand-2`
- `grid h-9 w-9 place-items-center rounded-lg bg-white/[0.07] text-brand-2`
- `grid min-h-[420px] place-items-center text-center text-muted`
- `grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition`
- `min-h-0 border-0 bg-transparent px-0 focus:bg-transparent`
- `min-w-0`
- `min-w-0 p-4 sm:p-5`
- `mt-1 block truncate font-mono text-xs font-bold`
- `mt-2 font-mono text-xs font-bold text-muted`
- `mt-3 text-2xl font-black sm:text-3xl`
- `mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted`
- `mt-4 space-y-2`
- `mt-5 max-w-none space-y-3 text-sm font-semibold leading-7 text-muted`
- `p-4`
- `rounded-lg border border-line bg-white/[0.04] p-4 text-sm font-bold text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition", selectedDoc?.slug === doc.slug ? "border-brand-2/45 bg-brand-2/12 text-foreground" : "border-line bg-white/[0.04] text-muted hover:bg-white/[0.075] hover:text-foreground", )`

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:flex-row`, `sm:items-start`, `sm:justify-between`, `sm:p-5`, `sm:text-3xl`, `xl:grid-cols-[360px_1fr]`.
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
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `BookOpen`, `FileText`, `Search`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Error, Warning, Success, Empty.
- Instance swaps: `BookOpen`, `FileText`, `Search`.
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
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
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
