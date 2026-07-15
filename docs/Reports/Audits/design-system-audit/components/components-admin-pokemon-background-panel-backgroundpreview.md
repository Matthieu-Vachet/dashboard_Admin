---
id: MWI-COMP-142
component: "BackgroundPreview"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/background-panel.jsx"
lines: 43-106
figma_priority: 18
evidence: static_code
---

# BackgroundPreview

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/background-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-142`.
- Location: `Dashboard Admin/src/components/admin/pokemon/background-panel.jsx`:43.
- File range: lines 43–106.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | AlertTriangle, CheckCircle2, ImageIcon, Link2 | icons |
| @/components/site/pokemon-style | preferredPokemonImage | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `AlertTriangle`, `CheckCircle2`, `ImageIcon`, `Link2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-143 | [BackgroundPanel](../components/components-admin-pokemon-background-panel-backgroundpanel.md) (MWI-COMP-143) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <button aria-label={`Agrandir ${background.label}`}>
    - <span />
    - <img />
    - <span />
    - <div />
    - <div>
      - <div>
        - <span>
        - <span>
          - <CheckCircle2 />
          - <AlertTriangle />
      - <div>
        - <strong>
        - <span>
  - <div>
    - <div>
      - <button>
        - <span>
          - <img />
          - <ImageIcon aria-label="Asset Pokémon absent" />
        - <span>
          - <strong>
          - <small>
        - <Link2 />
      - <p>
    - <p>

Unique HTML/React tags: `AlertTriangle`, `article`, `button`, `CheckCircle2`, `div`, `ImageIcon`, `img`, `Link2`, `p`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| background | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| onPreview | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ background, onOpen, onPreview }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Warning, Success, Empty, Scrollable.
- Text properties: `background`, `onOpen`, `onPreview`.
- Instance swaps: `AlertTriangle`, `CheckCircle2`, `ImageIcon`, `Link2`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
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
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-start, justify-between, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.2)`, `rgba(255,255,255,.14)`, `rgba(255,255,255,.16)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `inset-0`, `mt-2`, `p-1`, `p-4`, `pr-1`, `px-2.5`, `px-3`, `py-1`, `py-2` |
| Sizing | `h-10`, `h-full`, `max-h-72`, `min-h-[148px]`, `min-h-[180px]`, `min-w-0`, `w-10`, `w-full` |
| Typography | `break-words`, `font-black`, `font-bold`, `text-[11px]`, `text-amber-200/75`, `text-amber-50`, `text-cyan-100/70`, `text-cyan-50`, `text-emerald-50`, `text-left`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-white`, `text-xl`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-200/30`, `border-dashed`, `border-emerald-200/30`, `border-t`, `border-white/10`, `border-white/12`, `border-white/15`, `hover:border-cyan-200/40` |
| Shadows/elevation | `drop-shadow`, `shadow-[0_18px_70px_rgba(0,0,0,.2)]` |
| Opacity | `opacity-20`, `opacity-45` |
| Background | `bg-amber-400/16`, `bg-center`, `bg-cover`, `bg-emerald-400/16`, `bg-gradient-to-b`, `bg-slate-950`, `bg-slate-950/40`, `bg-slate-950/42`, `bg-slate-950/58`, `bg-white/[0.04]`, `bg-white/[0.055]`, `from-slate-950/25`, `hover:bg-cyan-400/12`, `to-slate-950/85`, `via-transparent` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:24px_24px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `aspect-[16/7]` | base | static occurrence |
| `bg-amber-400/16` | base | conditional or expression-derived |
| `bg-center` | base | static occurrence |
| `bg-cover` | base | static occurrence |
| `bg-emerald-400/16` | base | conditional or expression-derived |
| `bg-gradient-to-b` | base | static occurrence |
| `bg-slate-950` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/42` | base | static occurrence |
| `bg-slate-950/58` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `block` | base | static occurrence |
| `blur-xl` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/30` | base | conditional or expression-derived |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/30` | base | conditional or expression-derived |
| `border-t` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `break-words` | base | static occurrence |
| `drop-shadow` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `from-slate-950/25` | base | static occurrence |
| `gap-1` | base | conditional or expression-derived |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[42px_minmax(0,1fr)_auto]` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-full` | base | static occurrence |
| `hover:bg-cyan-400/12` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `inset-0` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `max-h-72` | base | static occurrence |
| `min-h-[148px]` | base | static occurrence |
| `min-h-[180px]` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-20` | base | static occurrence |
| `opacity-45` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-1` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pr-1` | base | static occurrence |
| `px-2.5` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-1` | base | conditional or expression-derived |
| `py-2` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `scale-110` | base | static occurrence |
| `shadow-[0_18px_70px_rgba(0,0,0,.2)]` | base | static occurrence |
| `text-[11px]` | base | conditional or expression-derived |
| `text-amber-200/75` | base | static occurrence |
| `text-amber-50` | base | conditional or expression-derived |
| `text-cyan-100/70` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-50` | base | conditional or expression-derived |
| `text-left` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-slate-950/85` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `via-transparent` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/85`
- `absolute inset-0 h-full w-full object-contain`
- `absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:24px_24px]`
- `absolute inset-0 scale-110 bg-cover bg-center opacity-45 blur-xl`
- `block break-words text-xl font-black text-white drop-shadow`
- `block truncate text-sm font-black text-white`
- `block truncate text-xs font-bold text-slate-400`
- `border-amber-200/30 bg-amber-400/16 text-amber-50`
- `border-emerald-200/30 bg-emerald-400/16 text-emerald-50`
- `border-t border-white/10 p-4`
- `flex items-start justify-between gap-3`
- `grid h-10 w-10 place-items-center rounded-xl bg-slate-950/40 p-1`
- `grid max-h-72 gap-2 overflow-auto pr-1`
- `grid min-w-0 grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-2.5 py-2 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/12`
- `h-full w-full object-contain`
- `inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black`
- `min-w-0`
- `mt-2 inline-flex rounded-full border border-white/12 bg-slate-950/58 px-3 py-1 text-xs font-black text-cyan-50`
- `relative block aspect-[16/7] min-h-[180px] w-full overflow-hidden bg-slate-950 p-4`
- `relative flex h-full min-h-[148px] flex-col justify-between`
- `relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/42 shadow-[0_18px_70px_rgba(0,0,0,.2)]`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-full border border-white/12 bg-slate-950/58 px-3 py-1 text-xs font-black text-white`
- `rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-300`
- `text-amber-200/75`
- `text-cyan-100/70`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black ${linked.length ? "border-emerald-200/30 bg-emerald-400/16 text-emerald-50" : "border-amber-200/30 bg-amber-400/16 text-amber-50"}\``

### CSS variables

Not found

### Inline style expressions

- `{{ backgroundImage: \`url("${background.image}")\` }}`

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

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

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Asset Pokémon absent"`, `aria-label={\`Agrandir ${background.label}\`}`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `AlertTriangle`, `CheckCircle2`, `ImageIcon`, `Link2`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Warning, Success, Empty, Scrollable.
- Instance swaps: `AlertTriangle`, `CheckCircle2`, `ImageIcon`, `Link2`.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
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
