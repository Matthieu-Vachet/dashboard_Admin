---
id: MWI-COMP-115
component: "LearningImportModal"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-import-modal.tsx"
lines: 19-200
figma_priority: 31
evidence: static_code
---

# LearningImportModal

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-import-modal.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-115`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-import-modal.tsx`:19.
- File range: lines 19–200.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useCallback, useEffect, useMemo, useRef, useState | external package |
| lucide-react | AlertTriangle, CheckCircle2, FileJson2, History, RotateCcw, UploadCloud, XCircle | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/components/ui/modal | Modal | internal |
| @/lib/learning/schema | validateLearningTopic | internal |
| @/services/admin/learning-api | fetchLearningImports, importLearningTopic, rollbackLearningImport, LearningImportHistoryItem | internal |
| @/types/admin/learning | LearningImportStrategy, LearningTopic, LearningValidationIssue | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-116 | [Strategy](../components/components-admin-learning-learning-import-modal-strategy.md) (MWI-COMP-116) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |
| MWI-COMP-325 | [Modal](../components/components-ui-modal-modal.md) (MWI-COMP-325) | JSX/import relation |

Unresolved/external JSX tags: `AlertTriangle`, `CheckCircle2`, `FileJson2`, `History`, `RotateCcw`, `UploadCloud`, `XCircle`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Modal>
  - <div>
    - <input />
    - <button>
      - <span>
        - <UploadCloud />
        - <strong>
        - <span>
    - <div>
      - <span>
        - <FileJson2 />
      - <span>
    - <section>
      - <h3>
        - <XCircle />
      - <div>
        - <div>
          - <strong>
    - <section>
      - <div>
        - <div>
          - <p>
          - <h3>
          - <p>
        - <Badge>
      - <div>
        - <div>
          - <span>
          - <strong>
        - <div>
          - <span>
          - <strong>
      - <fieldset>
        - <legend>
        - <div>
          - <Fragment>
            - <Strategy />
            - <Strategy />
          - <Strategy />
      - <div>
        - <Button>
    - <details>
      - <summary>
      - <pre>
    - <div>
      - <CheckCircle2 />
      - <AlertTriangle />
    - <section>
      - <h3>
        - <History />
      - <div>
        - <div>
          - <div>
            - <strong>
            - <span>
          - <Button>
          - <Badge>
        - <p>

Unique HTML/React tags: `AlertTriangle`, `Badge`, `button`, `Button`, `CheckCircle2`, `details`, `div`, `fieldset`, `FileJson2`, `h3`, `History`, `input`, `legend`, `Modal`, `p`, `pre`, `RotateCcw`, `section`, `span`, `Strategy`, `strong`, `summary`, `UploadCloud`, `XCircle`.

## 5. React structure and state management

- Hooks: `useCallback`, `useEffect`, `useMemo`, `useState`.
- Local state initializers: `file = null`, `history = []`, `issues = []`, `loading = false`, `message = null`, `raw = ""`, `strategy = "create"`, `topic = null`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onClose`, `onDragOver`, `onDrop`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onChanged | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |
| topics | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ open, topics, onClose, onChanged }: {
  open: boolean;
  topics: LearningTopic[];
  onClose: () => void;
  onChanged: () => Promise<void>;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  open: boolean;
  topics: LearningTopic[];
  onClose: () => void;
  onChanged: () => Promise<void>;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Collapsed, Expanded, Scrollable.
- Text properties: `onChanged`, `onClose`, `open`, `topics`.
- Instance swaps: `AlertTriangle`, `CheckCircle2`, `FileJson2`, `History`, `RotateCcw`, `UploadCloud`, `XCircle`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Detected | expanded/open signal |
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
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, justify-end, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mx-auto`, `p-0`, `p-2`, `p-3`, `p-4`, `p-6`, `px-3`, `px-4`, `px-5`, `py-4`, `space-y-2`, `space-y-5` |
| Sizing | `h-10`, `max-h-48`, `max-h-72`, `max-w-6xl`, `min-h-10`, `min-h-12`, `min-h-40`, `min-h-9`, `w-10`, `w-full` |
| Typography | `break-all`, `font-black`, `font-bold`, `font-mono`, `font-semibold`, `hover:text-foreground`, `leading-5`, `text-[10px]`, `text-amber-100`, `text-brand-2`, `text-brand-3`, `text-center`, `text-cyan-100`, `text-danger`, `text-emerald-100`, `text-foreground`, `text-muted`, `text-rose-100`, `text-sm`, `text-violet-100`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.12em]`, `tracking-[0.14em]`, `uppercase`, `whitespace-pre-wrap` |
| Radius | `rounded-lg`, `rounded-md` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-2/35`, `border-brand-3/25`, `border-brand-3/30`, `border-brand/30`, `border-danger/25`, `border-danger/30`, `border-danger/35`, `border-dashed`, `border-line`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/15`, `bg-brand-2/[0.045]`, `bg-brand-2/10`, `bg-brand-3/[0.045]`, `bg-brand-3/[0.06]`, `bg-brand-3/10`, `bg-brand/12`, `bg-danger/[0.05]`, `bg-danger/[0.06]`, `bg-danger/12`, `bg-danger/15`, `bg-transparent`, `bg-warning/12`, `bg-white/[0.025]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-brand-2/10`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/15` | base | static occurrence |
| `bg-brand-2/[0.045]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/[0.045]` | base | static occurrence |
| `bg-brand-3/[0.06]` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-danger/[0.05]` | base | static occurrence |
| `bg-danger/[0.06]` | base | conditional or expression-derived |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.025]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-2/35` | base | static occurrence |
| `border-brand-3/25` | base | conditional or expression-derived |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/25` | base | conditional or expression-derived |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `break-all` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-brand-2/10` | hover | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `lg:grid-cols-6` | lg | static occurrence |
| `max-h-48` | base | static occurrence |
| `max-h-72` | base | static occurrence |
| `max-w-6xl` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-40` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-2` | base | conditional or expression-derived |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `p-6` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-4` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `rounded-md` | base | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `sr-only` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | conditional or expression-derived |
| `text-center` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-danger` | base | conditional or expression-derived |
| `text-emerald-100` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `whitespace-pre-wrap` | base | static occurrence |

Exact className combinations:

- `block text-sm`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `cursor-pointer text-sm font-black`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-black/15 p-3`
- `flex flex-wrap items-start justify-between gap-3`
- `flex items-center gap-2 font-black`
- `flex items-center gap-2 font-black text-danger`
- `flex items-center gap-2 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-black text-brand-3`
- `flex items-center gap-2 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-black text-danger`
- `font-mono text-xs font-bold text-muted`
- `grid min-h-40 w-full place-items-center rounded-lg border border-dashed border-brand-2/35 bg-brand-2/[0.045] p-6 text-center transition hover:bg-brand-2/10`
- `h-10 w-10 p-0`
- `inline-flex items-center gap-2 text-sm font-black`
- `max-w-6xl`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mt-1 block text-sm font-semibold text-muted`
- `mt-1 block text-xl`
- `mt-1 text-sm font-semibold text-muted`
- `mt-1 text-xl font-black`
- `mt-2 grid gap-2 sm:grid-cols-3`
- `mt-3 block`
- `mt-3 grid gap-2`
- `mt-3 max-h-48 space-y-2 overflow-auto`
- `mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-all font-mono text-xs leading-5 text-muted`
- `mt-4`
- `mt-4 flex justify-end`
- `mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6`
- `mx-auto text-brand-2`
- `py-4 text-center text-sm font-semibold text-muted`
- `rounded-lg border border-brand-3/25 bg-brand-3/[0.045] p-4`
- `rounded-lg border border-danger/25 bg-danger/[0.05] p-4`
- `rounded-lg border border-line bg-black/15 p-3`
- `rounded-lg border border-line bg-white/[0.025] p-4`
- `rounded-md bg-black/15 p-2 font-mono text-xs`
- `space-y-5`
- `sr-only`
- `text-[10px] font-black uppercase tracking-[0.12em] text-muted`
- `text-brand-2`
- `text-danger`
- `text-xs font-black uppercase tracking-[0.14em] text-brand-3`
- `text-xs font-black uppercase tracking-[0.14em] text-muted`
- `text-xs font-semibold text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `message.tone === "success" ? "flex items-center gap-2 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-black text-brand-3" : "flex items-center gap-2 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-black text-danger"`

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
- Responsive utilities: `lg:grid-cols-6`, `sm:grid-cols-3`.
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
- Focus management hooks/refs: Detected in source; preserve exact sequence..
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `AlertTriangle`, `CheckCircle2`, `FileJson2`, `History`, `RotateCcw`, `UploadCloud`, `XCircle`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Collapsed, Expanded, Scrollable.
- Instance swaps: `AlertTriangle`, `CheckCircle2`, `FileJson2`, `History`, `RotateCcw`, `UploadCloud`, `XCircle`.
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
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| □ | Collapsed | collapsed/closed signal |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
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
