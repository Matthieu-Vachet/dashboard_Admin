---
id: MWI-COMP-156
component: "Section"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 95-123
figma_priority: 45
evidence: static_code
---

# Section

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-156`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:95.
- File range: lines 95–123.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **45/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-160 | [TranslationGrid](../components/components-admin-pokemon-detail-modal-translationgrid.md) (MWI-COMP-160) | Renders/imports this component |
| MWI-COMP-166 | [ReleaseStatusGrid](../components/components-admin-pokemon-detail-modal-releasestatusgrid.md) (MWI-COMP-166) | Renders/imports this component |
| MWI-COMP-167 | [MoveList](../components/components-admin-pokemon-detail-modal-movelist.md) (MWI-COMP-167) | Renders/imports this component |
| MWI-COMP-169 | [CandyFamilyPanel](../components/components-admin-pokemon-detail-modal-candyfamilypanel.md) (MWI-COMP-169) | Renders/imports this component |
| MWI-COMP-170 | [EvolutionPanel](../components/components-admin-pokemon-detail-modal-evolutionpanel.md) (MWI-COMP-170) | Renders/imports this component |
| MWI-COMP-172 | [AssetGallery](../components/components-admin-pokemon-detail-modal-assetgallery.md) (MWI-COMP-172) | Renders/imports this component |
| MWI-COMP-174 | [IssuesPanel](../components/components-admin-pokemon-detail-modal-issuespanel.md) (MWI-COMP-174) | Renders/imports this component |
| MWI-COMP-175 | [PvpPanel](../components/components-admin-pokemon-detail-modal-pvppanel.md) (MWI-COMP-175) | Renders/imports this component |
| MWI-COMP-177 | [AdminActions](../components/components-admin-pokemon-detail-modal-adminactions.md) (MWI-COMP-177) | Renders/imports this component |
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div />
  - <div>
    - <p>
    - <h3>
      - <span>
        - <img />
      - <span>

Unique HTML/React tags: `div`, `h3`, `img`, `p`, `section`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| backgroundIndex | backgroundIndex = 0 | See exact signature/contract below |
| backgroundType | backgroundType = "" | See exact signature/contract below |
| children | Not found | See exact signature/contract below |
| eyebrow | Not found | See exact signature/contract below |
| icon | Not found | See exact signature/contract below |
| plain | plain = false | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| tone | tone = "cyan" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title, eyebrow, icon, children, tone = "cyan", plain = false, backgroundIndex = 0, backgroundType = "" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success.
- Text properties: `backgroundIndex`, `backgroundType`, `children`, `eyebrow`, `icon`, `plain`, `title`, `tone`.
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
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow`, `--accent-muted`, `--line` |
| Literal colors | `rgba(0,0,0,.2)`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.89)`, `rgba(2,6,23,.93)`, `rgba(248,250,252,.82)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.13)`, `rgba(255,255,255,.9)` |
| Spacing | `gap-3`, `inset-0`, `mb-1`, `mb-4`, `p-2`, `p-4`, `sm:p-5` |
| Sizing | `h-10`, `max-h-full`, `w-10` |
| Typography | `font-black`, `sm:text-xl`, `text-cyan-200/70`, `text-lg`, `text-white`, `text-xs`, `tracking-[0.24em]`, `tracking-tight`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl` |
| Borders/strokes | `border`, `border-amber-200/20`, `border-cyan-200/20`, `border-emerald-200/20`, `border-rose-200/20`, `border-violet-200/20`, `border-white/10` |
| Shadows/elevation | `shadow-[0_20px_70px_rgba(0,0,0,.2)]` |
| Opacity | Not found |
| Background | `backdrop-blur`, `bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,.13),transparent_34%)]`, `bg-amber-400/10`, `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-gradient-to-br`, `bg-rose-400/10`, `bg-slate-950/35`, `bg-violet-400/10`, `from-amber-400/15`, `from-cyan-400/15`, `from-emerald-400/15`, `from-rose-400/15`, `from-violet-400/15`, `to-slate-950/18` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `backdrop-blur` | base | conditional or expression-derived |
| `bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,.13),transparent_34%)]` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-gradient-to-br` | base | conditional or expression-derived |
| `bg-rose-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/20` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `from-amber-400/15` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-2` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `pokemon-detail-section` | base | conditional or expression-derived |
| `pokemon-interface-icon` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | conditional or expression-derived |
| `shadow-[0_20px_70px_rgba(0,0,0,.2)]` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `sm:p-5` | sm | conditional or expression-derived |
| `sm:text-xl` | sm | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-slate-950/18` | base | conditional or expression-derived |
| `tracking-[0.24em]` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/35 p-2`
- `mb-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70`
- `mb-4 flex items-center gap-3 text-lg font-black tracking-tight text-white sm:text-xl`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,.13),transparent_34%)]`
- `pokemon-detail-section relative overflow-hidden rounded-3xl border bg-gradient-to-br to-slate-950/18 p-4 shadow-[0_20px_70px_rgba(0,0,0,.2)] backdrop-blur sm:p-5`
- `pokemon-interface-icon max-h-full object-contain`
- `relative`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`pokemon-detail-section relative overflow-hidden rounded-3xl border bg-gradient-to-br to-slate-950/18 p-4 shadow-[0_20px_70px_rgba(0,0,0,.2)] backdrop-blur sm:p-5 ${toneClass}\``

### CSS variables

`--accent-glow`, `--accent-muted`, `--line`

### Inline style expressions

- `{plain ? undefined : catchCardStyle(backgroundIndex, sectionBackgroundType)}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardBackground
function catchCardBackground(type) {
  const name = typeBackgroundNames[String(type || "").toUpperCase()];
  return name ? `/ui/backgrounds/catchCards/CatchCard_TypeBG_${name}.png` : "";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardStyle
function catchCardStyle(index = 0, preferredType = "NORMAL", opacity = "dark") {
  const background = catchCardForIndex(index, preferredType);
  const overlay =
    opacity === "soft"
      ? "linear-gradient(135deg, rgba(255,255,255,.9), rgba(248,250,252,.82)), linear-gradient(180deg, rgba(15,23,42,.18), rgba(15,23,42,.24))"
      : "linear-gradient(135deg, rgba(2,6,23,.93), rgba(15,23,42,.89)), linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))";
  return {
    backgroundImage: background ? `${overlay}, url("${background}")` : overlay,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#sectionTones
sectionTones = {
  cyan: "border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15",
  emerald: "border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15",
  violet: "border-violet-200/20 bg-violet-400/10 from-violet-400/15",
  amber: "border-amber-200/20 bg-amber-400/10 from-amber-400/15",
  rose: "border-rose-200/20 bg-rose-400/10 from-rose-400/15",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typeBackgroundNames
typeBackgroundNames = {
  BUG: "Bug",
  DARK: "Dark",
  DRAGON: "Dragon",
  ELECTRIC: "Electric",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  FIRE: "Fire",
  FLYING: "Flying",
  GHOST: "Ghost",
  GRASS: "Grass",
  GROUND: "Ground",
  ICE: "Ice",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  ROCK: "Rock",
  STEEL: "Steel",
  WATER: "Water",
}
```

### Referenced global custom CSS rules

```css
.light .pokemon-detail-modal-body .pokemon-detail-section {
border-color: var(--line) !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  background-image:
    radial-gradient(circle at 10% 0%, var(--accent-muted), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(244, 249, 255, 0.88)) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 18px 54px rgba(15, 23, 42, 0.09) !important;
}
```

```css
.light .pokemon-detail-modal-body .pokemon-detail-section > div:first-child {
background: transparent !important;
}
```

```css
.light .pokemon-detail-section {
border-color: var(--line) !important;
  background:
    radial-gradient(circle at 10% 0%, var(--accent-muted), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(244, 249, 255, 0.88)) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 18px 54px rgba(15, 23, 42, 0.09) !important;
}
```

```css
.light .pokemon-detail-section > div:first-child {
background: transparent !important;
}
```

```css
.pokemon-interface-icon {
filter: drop-shadow(0 0 10px var(--accent-glow));
  opacity: 0.98;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:p-5`, `sm:text-xl`.
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
- Boolean properties: Warning, Success.
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
