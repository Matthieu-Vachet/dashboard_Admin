---
id: MWI-COMP-185
component: "LoginCard"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/login-card.jsx"
lines: 1-37
figma_priority: 34
evidence: static_code
---

# LoginCard

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/login-card.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-185`.
- Location: `Dashboard Admin/src/components/admin/pokemon/login-card.jsx`:1.
- File range: lines 1–37.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

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
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-306 | [LoginCard](../components/components-pokemon-admin-login-card-logincard.md) (MWI-COMP-306) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <span>
  - <h2>
  - <p>
  - <form>
    - <input />
    - <button>
  - <p>

Unique HTML/React tags: `button`, `form`, `h2`, `input`, `p`, `section`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onSubmit`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| error | Not found | See exact signature/contract below |
| loading | Not found | See exact signature/contract below |
| onPasswordChange | Not found | See exact signature/contract below |
| onSubmit | Not found | See exact signature/contract below |
| password | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ password, error, loading, onPasswordChange, onSubmit }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Loading, Disabled, Error.
- Text properties: `error`, `loading`, `onPasswordChange`, `onSubmit`, `password`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,0.38)` |
| Spacing | `gap-3`, `md:p-8`, `mt-2`, `mt-3`, `mt-5`, `p-5`, `px-3`, `px-4` |
| Sizing | `max-w-xl`, `min-h-11`, `w-full` |
| Typography | `font-black`, `font-bold`, `leading-6`, `placeholder:text-slate-500`, `text-3xl`, `text-cyan-50`, `text-rose-300`, `text-sky-300`, `text-slate-100`, `text-slate-400`, `text-sm`, `text-xs`, `tracking-wide`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-cyan-200/30`, `border-white/10`, `focus:border-sky-300`, `outline-none` |
| Shadows/elevation | `shadow-[0_30px_90px_rgba(0,0,0,0.38)]` |
| Opacity | `disabled:opacity-60` |
| Background | `backdrop-blur`, `bg-cyan-400/15`, `bg-white/[0.06]`, `bg-zinc-950/85`, `hover:bg-cyan-400/20` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur` | base | static occurrence |
| `bg-cyan-400/15` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-zinc-950/85` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `disabled:opacity-60` | disabled | static occurrence |
| `focus:border-sky-300` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `hover:bg-cyan-400/20` | hover | static occurrence |
| `leading-6` | base | static occurrence |
| `max-w-xl` | base | static occurrence |
| `md:p-8` | md | static occurrence |
| `min-h-11` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-5` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shadow-[0_30px_90px_rgba(0,0,0,0.38)]` | base | static occurrence |
| `sm:grid-cols-[1fr_auto]` | sm | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-rose-300` | base | static occurrence |
| `text-sky-300` | base | static occurrence |
| `text-slate-100` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-wide` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `min-h-11 rounded-lg border border-cyan-200/30 bg-cyan-400/15 px-4 font-black text-cyan-50 transition hover:bg-cyan-400/20 disabled:opacity-60`
- `min-h-11 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-300`
- `mt-2 text-3xl font-black`
- `mt-3 text-sm font-bold text-rose-300`
- `mt-3 text-sm leading-6 text-slate-400`
- `mt-5 grid gap-3 sm:grid-cols-[1fr_auto]`
- `text-xs font-black uppercase tracking-wide text-sky-300`
- `w-full max-w-xl rounded-lg border border-white/10 bg-zinc-950/85 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur md:p-8`

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

`disabled:`, `focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `md`, `sm`.
- Responsive utilities: `md:p-8`, `sm:grid-cols-[1fr_auto]`.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Loading, Disabled, Error.
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
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| □ | Focused | focus styling or handler |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
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
| □ | Responsive: md | Tailwind md: utilities |
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
