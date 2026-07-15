---
id: MWI-COMP-234
component: "TierSection"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/tier-section.jsx"
lines: 51-107
figma_priority: 37
evidence: static_code
---

# TierSection

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/tier-section.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-234`.
- Location: `Dashboard Admin/src/components/admin/pokemon/tier-section.jsx`:51.
- File range: lines 51–107.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **37/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| lucide-react | ChevronDown | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `ChevronDown`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-182 | [EggSection](../components/components-admin-pokemon-eggs-panel-eggsection.md) (MWI-COMP-182) | Renders/imports this component |
| MWI-COMP-188 | [MaxBattleSection](../components/components-admin-pokemon-max-battles-panel-maxbattlesection.md) (MWI-COMP-188) | Renders/imports this component |
| MWI-COMP-209 | [RaidSection](../components/components-admin-pokemon-raids-panel-raidsection.md) (MWI-COMP-209) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <button>
    - <span>
      - <span>
        - <img />
      - <span>
        - <span>
        - <strong>
    - <span>
      - <span>
      - <ChevronDown />
  - <div>
    - <p>

Unique HTML/React tags: `button`, `ChevronDown`, `div`, `img`, `p`, `section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `open = defaultOpen`.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |
| count | count = 0 | See exact signature/contract below |
| defaultOpen | defaultOpen = false | See exact signature/contract below |
| emptyText | emptyText = "Aucune donnée dans cette section." | See exact signature/contract below |
| id | Not found | See exact signature/contract below |
| image | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| tone | tone = "cyan" | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  id,
  title,
  image,
  count = 0,
  tone = "cyan",
  defaultOpen = false,
  emptyText = "Aucune donnée dans cette section.",
  children,
}
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success, Empty, Expanded.
- Text properties: `children`, `count`, `defaultOpen`, `emptyText`, `id`, `image`, `title`, `tone`.
- Instance swaps: `ChevronDown`.
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
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
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
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-end, place-items-center, sm:items-center`.
- Positioning utilities: `relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.18)`, `rgba(167,139,250,.15)`, `rgba(248,113,113,.15)`, `rgba(251,191,36,.14)`, `rgba(34,211,238,.16)`, `rgba(52,211,153,.14)`, `rgba(56,189,248,.16)` |
| Spacing | `gap-3`, `mt-1`, `p-2`, `p-3`, `p-4`, `px-3`, `py-1.5`, `sm:p-4` |
| Sizing | `h-12`, `max-h-full`, `min-w-0`, `w-12`, `w-full` |
| Typography | `font-black`, `font-bold`, `sm:text-2xl`, `text-[10px]`, `text-amber-100/74`, `text-amber-50`, `text-cyan-100/72`, `text-cyan-50`, `text-emerald-100/72`, `text-emerald-50`, `text-left`, `text-red-100/74`, `text-red-50`, `text-sky-100/72`, `text-sky-50`, `text-slate-400`, `text-sm`, `text-violet-100/72`, `text-violet-50`, `text-white`, `text-white/70`, `text-xl`, `text-xs`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/22`, `border-amber-200/30`, `border-cyan-200/20`, `border-cyan-200/30`, `border-dashed`, `border-emerald-200/20`, `border-emerald-200/30`, `border-red-200/22`, `border-red-200/30`, `border-sky-200/20`, `border-sky-200/30`, `border-t`, `border-violet-200/22`, `border-violet-200/30`, `border-white/10`, `border-white/15` |
| Shadows/elevation | `shadow-[0_18px_70px_rgba(0,0,0,.18)]` |
| Opacity | Not found |
| Background | `bg-amber-400/[0.06]`, `bg-amber-400/12`, `bg-amber-400/14`, `bg-cyan-400/[0.055]`, `bg-cyan-400/12`, `bg-cyan-400/14`, `bg-emerald-400/[0.055]`, `bg-emerald-400/12`, `bg-emerald-400/14`, `bg-red-400/[0.06]`, `bg-red-400/12`, `bg-red-400/14`, `bg-sky-400/[0.055]`, `bg-sky-400/12`, `bg-sky-400/14`, `bg-violet-400/[0.06]`, `bg-violet-400/12`, `bg-violet-400/14` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-amber-400/14` | base | static occurrence |
| `bg-cyan-400/[0.055]` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/14` | base | static occurrence |
| `bg-emerald-400/[0.055]` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/14` | base | static occurrence |
| `bg-red-400/[0.06]` | base | static occurrence |
| `bg-red-400/12` | base | static occurrence |
| `bg-red-400/14` | base | static occurrence |
| `bg-sky-400/[0.055]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-sky-400/14` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-violet-400/14` | base | static occurrence |
| `block` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-amber-200/22` | base | static occurrence |
| `border-amber-200/30` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-red-200/22` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-sky-200/20` | base | static occurrence |
| `border-sky-200/30` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/22` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-12` | base | conditional or expression-derived |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `justify-end` | base | static occurrence |
| `list-none` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-2` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `py-1.5` | base | conditional or expression-derived |
| `relative` | base | conditional or expression-derived |
| `rotate-180` | base | conditional or expression-derived |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-3xl` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `shadow-[0_18px_70px_rgba(0,0,0,.18)]` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `sm:grid-cols-[minmax(0,1fr)_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:p-4` | sm | static occurrence |
| `sm:text-2xl` | sm | static occurrence |
| `text-[10px]` | base | conditional or expression-derived |
| `text-amber-100/74` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100/72` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100/72` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-red-100/74` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sky-100/72` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100/72` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | conditional or expression-derived |
| `text-white/70` | base | conditional or expression-derived |
| `text-xl` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `tracking-[0.22em]` | base | conditional or expression-derived |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | conditional or expression-derived |
| `w-12` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |

Exact className combinations:

- `block text-[10px] font-black uppercase tracking-[0.22em]`
- `border-amber-200/22 bg-amber-400/[0.06]`
- `border-amber-200/22 bg-amber-400/12`
- `border-amber-200/30 bg-amber-400/14 text-amber-50`
- `border-cyan-200/20 bg-cyan-400/[0.055]`
- `border-cyan-200/20 bg-cyan-400/12`
- `border-cyan-200/30 bg-cyan-400/14 text-cyan-50`
- `border-emerald-200/20 bg-emerald-400/[0.055]`
- `border-emerald-200/20 bg-emerald-400/12`
- `border-emerald-200/30 bg-emerald-400/14 text-emerald-50`
- `border-red-200/22 bg-red-400/[0.06]`
- `border-red-200/22 bg-red-400/12`
- `border-red-200/30 bg-red-400/14 text-red-50`
- `border-sky-200/20 bg-sky-400/[0.055]`
- `border-sky-200/20 bg-sky-400/12`
- `border-sky-200/30 bg-sky-400/14 text-sky-50`
- `border-t border-white/10 p-3 sm:p-4`
- `border-violet-200/22 bg-violet-400/[0.06]`
- `border-violet-200/22 bg-violet-400/12`
- `border-violet-200/30 bg-violet-400/14 text-violet-50`
- `flex min-w-0 items-center gap-3`
- `grid h-12 w-12 shrink-0 place-items-center rounded-2xl border`
- `grid w-full cursor-pointer list-none gap-3 p-4 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center`
- `inline-flex items-center justify-end gap-3`
- `max-h-full object-contain`
- `min-w-0`
- `mt-1 block truncate text-xl font-black text-white sm:text-2xl`
- `p-2`
- `relative overflow-hidden rounded-3xl border`
- `rotate-180`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-full border px-3 py-1.5 text-xs font-black`
- `shadow-[0_18px_70px_rgba(0,0,0,.18)]`
- `text-amber-100/74`
- `text-cyan-100/72`
- `text-emerald-100/72`
- `text-red-100/74`
- `text-sky-100/72`
- `text-violet-100/72`
- `text-white/70 transition`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`block text-[10px] font-black uppercase tracking-[0.22em] ${style.text}\``
- `\`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${style.icon} p-2\``
- `\`relative overflow-hidden rounded-3xl border ${style.shell} shadow-[0_18px_70px_rgba(0,0,0,.18)]\``
- `\`rounded-full border px-3 py-1.5 text-xs font-black ${style.count}\``
- `\`text-white/70 transition ${open ? "rotate-180" : ""}\``

### CSS variables

Not found

### Inline style expressions

- `{{ boxShadow: \`0 18px 70px rgba(0,0,0,.18), inset 0 1px 0 ${style.glow}\` }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/tier-section.jsx#toneStyles
toneStyles = {
  cyan: {
    shell: "border-cyan-200/20 bg-cyan-400/[0.055]",
    icon: "border-cyan-200/20 bg-cyan-400/12",
    count: "border-cyan-200/30 bg-cyan-400/14 text-cyan-50",
    text: "text-cyan-100/72",
    glow: "rgba(34,211,238,.16)",
  },
  blue: {
    shell: "border-sky-200/20 bg-sky-400/[0.055]",
    icon: "border-sky-200/20 bg-sky-400/12",
    count: "border-sky-200/30 bg-sky-400/14 text-sky-50",
    text: "text-sky-100/72",
    glow: "rgba(56,189,248,.16)",
  },
  violet: {
    shell: "border-violet-200/22 bg-violet-400/[0.06]",
    icon: "border-violet-200/22 bg-violet-400/12",
    count: "border-violet-200/30 bg-violet-400/14 text-violet-50",
    text: "text-violet-100/72",
    glow: "rgba(167,139,250,.15)",
  },
  amber: {
    shell: "border-amber-200/22 bg-amber-400/[0.06]",
    icon: "border-amber-200/22 bg-amber-400/12",
    count: "border-amber-200/30 bg-amber-400/14 text-amber-50",
    text: "text-amber-100/74",
    glow: "rgba(251,191,36,.14)",
  },
  green: {
    shell: "border-emerald-200/20 bg-emerald-400/[0.055]",
    icon: "border-emerald-200/20 bg-emerald-400/12",
    count: "border-emerald-200/30 bg-emerald-400/14 text-emerald-50",
    text: "text-emerald-100/72",
    glow: "rgba(52,211,153,.14)",
  },
  red: {
    shell: "border-red-200/22 bg-red-400/[0.06]",
    icon: "border-red-200/22 bg-red-400/12",
    count: "border-red-200/30 bg-red-400/14 text-red-50",
    text: "text-red-100/74",
    glow: "rgba(248,113,113,.15)",
  },
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:grid-cols-[minmax(0,1fr)_auto]`, `sm:items-center`, `sm:p-4`, `sm:text-2xl`.
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

- Lucide icons: `ChevronDown`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success, Empty, Expanded.
- Instance swaps: `ChevronDown`.
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
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
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
