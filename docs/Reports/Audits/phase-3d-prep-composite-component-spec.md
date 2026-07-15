# Phase 3D-PREP - Composite Component Spec

Project: Dashboard Admin Pokemon GO  
Target Figma page: `04 Composite Components`  
Status: Ready for future Figma generation when MCP quota resets  
Mode: DARK MODE ONLY  

## Scope

This document prepares the Composite Components layer of the Pokemon GO Admin Design System. It is documentation only and must be used as the source of truth for the next Figma rendering pass.

Rules:
- No Figma MCP call in this prep phase.
- No code implementation.
- No production dashboard modification.
- Composite components must be built only from Phase 3C atomic components.
- No local hardcoded visual style.
- No duplicated visual logic.
- Composite root frames may provide layout and grouping only; all visual decisions must bind to Phase 3A foundations and Phase 3B tokens.

## Source Dependencies

Atomic component source:
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Input`
- `Atomic/Textarea`
- `Atomic/Select`
- `Atomic/Checkbox`
- `Atomic/Switch`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Label`
- `Atomic/Divider`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`
- `Atomic/Tabs Primitive`

Token collection:
- `Dashboard Admin Tokens`

Mode:
- `Dark Mode`

## Generation Rules

Naming:
- Component sets: `Composite/<Family>`
- Variant properties use `Property=Value` format.
- Public token names use dot notation in documentation.
- Figma variables use slash notation.

State generation:
- Only meaningful states become Figma variants.
- State rules that belong to child atomics are delegated to those atomics.
- Composite states describe coordination between child components.

Interaction rule:
- Composite specs must document how child atomics affect each other.
- No composite may invent a new control behavior that does not exist in Phase 3C atoms.

## Variant Count Summary

| Family | Formula | Estimated future Figma variants |
|---|---:|---:|
| Search Bars | 4 variants x 3 sizes x 5 states | 60 |
| Filter Bars | 4 layouts x 2 densities x 6 states | 48 |
| Toolbar Groups | 4 variants x 2 densities x 5 states | 40 |
| Pokemon Type Chips | 18 types x 2 sizes x 4 states | 144 |
| KPI Blocks | 3 layouts x 5 tones x 4 states | 60 |
| Stat Rows | 4 variants x 2 sizes x 4 states | 32 |
| Card Headers | 5 variants x 2 densities x 5 states | 50 |
| Modal Headers | 4 variants x 2 sizes x 3 states | 24 |
| Pagination | 3 variants x 2 sizes x 5 states | 30 |
| Action Rows | 4 variants x 2 densities x 4 states | 32 |

Total estimated future Figma variants: **520**

---

## 1. Search Bars

### Role

Search Bars provide high-speed lookup for Pokemon, events, assets, JSON rules, source logs, catalog entries and admin objects. They combine input behavior, optional actions and feedback into one reusable search pattern.

### Atomic Dependencies

- `Atomic/Input` with `variant=search`
- `Atomic/Icon Button` for clear, submit and advanced search actions
- `Atomic/Button` for optional explicit search submit
- `Atomic/Chip` for query tokens or active scopes
- `Atomic/Tooltip` for icon-only affordances
- `Atomic/Badge` for result count or sync status

### Anatomy

- Root composite frame.
- Search input.
- Leading search icon from input prefix.
- Optional clear icon button.
- Optional submit button.
- Optional scope chip row.
- Optional result count badge.
- Loading feedback.
- Helper or empty-state microcopy.

### Variants

- `global`: app-wide dashboard search.
- `table`: table/list search inside a data surface.
- `command`: command-palette style search.
- `pokemon`: domain search with Pokemon-specific scope chips.

### Sizes

- `sm`: table toolbar, max width 320.
- `md`: default page/module search, max width 560.
- `lg`: global search, max width 760.

### States

Generated states:
- `default`
- `focus`
- `active`
- `loading`
- `disabled`

Documented child states:
- `hover`: delegated to input and icon buttons.
- `selected`: represented by active scope chips.
- `error`: input error when search syntax is invalid.
- `success`: result count badge only.
- `warning`: warning badge for stale index or partial search.

### Token Bindings

- Root surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Input background: `component.input.background`
- Input border: `component.input.border`
- Focus border: `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Active scope background: `component.sidebar.active.background`
- Radius: `primitive.radius.md`, `primitive.radius.lg`
- Padding: `primitive.spacing.2`, `primitive.spacing.3`, `primitive.spacing.4`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`
- Motion: `primitive.motion.fast`

### Auto-layout Constraints

- Root direction: horizontal for `sm` and `md`; vertical when scope chips wrap.
- Input uses fill width.
- Clear and submit actions hug content.
- Scope chips wrap to next row when width is constrained.
- Min width: 240.
- Max width: per size variant.
- Responsive behavior:
  - Under 480px: input occupies full row, actions move to trailing row.
  - Result badge may collapse into helper text.

### Accessibility

- Search input must use search semantics.
- Search region should have an accessible label.
- Clear button must expose `aria-label="Clear search"`.
- Loading state announces result update with polite live region.
- Keyboard:
  - `Enter` submits.
  - `Escape` clears text or closes suggestions.
  - `Tab` reaches all action controls.

### Do / Don't

Do:
- Use clear scope chips when search is scoped.
- Keep placeholder text example-driven and short.
- Show loading only while query is actively resolving.

Don't:
- Do not hide filters inside a search bar if they affect results silently.
- Do not use icon-only submit without tooltip and accessible label.
- Do not use Search Bar as a full command palette unless variant is `command`.

### Interactions Between Sub-components

- Typing in `Atomic/Input` enables the clear `Atomic/Icon Button`.
- Active scope `Atomic/Chip` changes search domain and result count.
- Loading disables submit action but keeps input readable.
- Error state belongs to the input; warning or success belongs to badge/helper feedback.

### Estimated Variant Count

4 variants x 3 sizes x 5 states = **60**

---

## 2. Filter Bars

### Role

Filter Bars coordinate multiple filtering controls for Pokemon tables, event calendars, asset libraries, source monitoring, JSON rule lists and admin catalogs.

### Atomic Dependencies

- `Atomic/Select`
- `Atomic/Checkbox`
- `Atomic/Switch`
- `Atomic/Chip`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Divider`
- `Atomic/Badge`
- `Atomic/Tooltip`

### Anatomy

- Root filter container.
- Filter group label.
- Select controls.
- Toggle controls.
- Active filter chip list.
- Clear all action.
- Apply action for deferred filters.
- Result count badge.
- Optional collapsed/expanded control.

### Variants

Layout:
- `inline`: horizontal toolbar filtering.
- `stacked`: multi-row filters for complex screens.
- `drawer-summary`: compact summary that opens advanced filters.
- `compact`: dense table/list filtering.

Density:
- `compact`
- `comfortable`

### Sizes

- Size is governed by density and parent width.
- Compact row height target: 40.
- Comfortable row height target: 48.

### States

Generated states:
- `default`
- `active`
- `expanded`
- `loading`
- `disabled`
- `error`

Documented child states:
- `hover` and `focus` are delegated to child selects, chips and buttons.
- `selected` is represented by active chips and checked controls.
- `success` appears as optional result status badge.
- `warning` appears as partial-result or stale-filter warning badge.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Error: `semantic.color.state.error`
- Warning: `semantic.color.state.warning`
- Active chip: `component.sidebar.active.background`
- Radius: `primitive.radius.lg`, `primitive.radius.pill`
- Padding: `primitive.spacing.3`, `primitive.spacing.4`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`

### Auto-layout Constraints

- Inline layout: horizontal, wrap enabled.
- Stacked layout: vertical groups.
- Drawer-summary: summary row plus action trigger.
- Compact layout: horizontal with limited labels.
- Child controls hug content unless explicitly full width on mobile.
- Min row width: 280.
- Responsive:
  - Under tablet width, controls stack into vertical groups.
  - Active chips wrap below primary controls.

### Accessibility

- Filter region must have a label.
- Related filters should be grouped semantically.
- Clear all must announce how many filters are removed.
- Deferred filters need explicit Apply button.
- Keyboard order follows visual order.
- Expanded/collapsed state uses `aria-expanded`.

### Do / Don't

Do:
- Show active filters visibly.
- Offer clear-all when more than one filter is active.
- Separate destructive clear from normal filter selection.

Don't:
- Do not hide active filters.
- Do not mix immediate and deferred filtering without clear copy.
- Do not put too many filters in one row on mobile.

### Interactions Between Sub-components

- `Atomic/Select`, `Atomic/Checkbox` and `Atomic/Switch` create active `Atomic/Chip` tokens.
- Removing a chip updates the source control state.
- Clear-all resets all child controls and removes chips.
- Loading state disables apply/clear actions but keeps current selections visible.

### Estimated Variant Count

4 layouts x 2 densities x 6 states = **48**

---

## 3. Toolbar Groups

### Role

Toolbar Groups organize repeated page and table actions: create, export, refresh, sort, import, view mode, bulk actions and admin utilities.

### Atomic Dependencies

- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Badge`
- `Atomic/Chip`

### Anatomy

- Root toolbar group.
- Primary action slot.
- Secondary action slots.
- Icon action cluster.
- Optional divider.
- Optional badge/count.
- Optional overflow icon button.

### Variants

- `page-actions`: top-level page actions.
- `table-actions`: dense table actions.
- `selection-actions`: bulk action toolbar.
- `utility-actions`: refresh/export/import/tooling group.

Density:
- `compact`
- `comfortable`

### Sizes

- Compact: 32-40px child control height.
- Comfortable: 40-48px child control height.
- Width: parent-controlled.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `disabled`
- `loading`

Documented states:
- `active`: delegated to child button/icon button.
- `selected`: represented by selection toolbar variant.
- `error`: surfaced as badge/tooltip on relevant action.
- `success`: surfaced as badge/tooltip.
- `warning`: surfaced as badge/tooltip.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Border: `semantic.color.border.default`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Active/focus: `semantic.color.border.active`
- Radius: `primitive.radius.lg`
- Gap: `primitive.spacing.1`, `primitive.spacing.2`
- Padding: `primitive.spacing.2`, `primitive.spacing.3`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Gap: `spacing.2`.
- Divider height follows child control height.
- Overflow action hugs content.
- Responsive:
  - Low priority actions collapse into overflow.
  - Primary action remains visible.
  - Selection toolbar can replace normal toolbar when rows are selected.

### Accessibility

- Toolbar must expose toolbar role or labelled group.
- Icon-only controls require accessible labels.
- Keyboard navigation follows source order.
- Overflow menu button exposes expanded state.
- Loading controls expose busy state.

### Do / Don't

Do:
- Group actions by frequency and risk.
- Keep destructive actions visually separated.
- Use dividers for action clusters only when necessary.

Don't:
- Do not place unrelated actions in one toolbar group.
- Do not hide primary action in overflow.
- Do not use badge counts without labels.

### Interactions Between Sub-components

- Selection count badge changes toolbar variant to `selection-actions`.
- Overflow icon reveals secondary actions in future menu pattern.
- Loading state can apply per child action or whole toolbar depending on operation scope.

### Estimated Variant Count

4 variants x 2 densities x 5 states = **40**

---

## 4. Pokemon Type Chips

### Role

Pokemon Type Chips communicate domain identity and filtering by Pokemon type. They are specialized composites built from atomic chips/badges and future Pokemon type color tokens.

### Atomic Dependencies

- `Atomic/Chip`
- `Atomic/Badge`
- `Atomic/Tooltip`
- `Atomic/Icon Button` only for removable filter mode

### Anatomy

- Root chip.
- Type color marker.
- Type label.
- Optional type icon/asset marker.
- Optional remove affordance.
- Optional tooltip for effectiveness metadata.

### Variants

Pokemon type:
- `normal`
- `fire`
- `water`
- `electric`
- `grass`
- `ice`
- `fighting`
- `poison`
- `ground`
- `flying`
- `psychic`
- `bug`
- `rock`
- `ghost`
- `dragon`
- `dark`
- `steel`
- `fairy`

### Sizes

- `sm`: compact list/filter usage.
- `md`: default metadata and cards.

### States

Generated states:
- `default`
- `hover`
- `selected`
- `disabled`

Documented states:
- `focus`: delegated to chip focus when interactive.
- `active`: transient press state.
- `loading`: not applicable.
- `error`: not applicable.
- `success`: not applicable.
- `warning`: not applicable.

### Token Bindings

Current Phase 3B fallback:
- Background: `semantic.color.surface.strong`, `component.sidebar.active.background`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`
- Pokemon fallback accent: `primitive.color.violet.500`
- Radius: `primitive.radius.pill`
- Padding: `primitive.spacing.2`
- Gap: `primitive.spacing.1`

Future domain token recommendation:
- `domain.pokemon.type.fire.background`
- `domain.pokemon.type.water.background`
- one semantic token per type for background/border/text contrast.

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Marker fixed 10 x 10 or 14 x 14.
- Label hugs content.
- Remove affordance fixed 12 x 12 when present.
- Max width: 140.
- Responsive: chips wrap in filter bars and metadata rows.

### Accessibility

- Interactive chips expose button or checkbox semantics.
- Selected filter chips expose selected/pressed state.
- Type label must be text, not icon-only.
- Tooltip may explain type but cannot replace label.

### Do / Don't

Do:
- Use Pokemon Type Chips for type identity and filtering.
- Keep type names localized consistently if localization is added.

Don't:
- Do not rely only on type color.
- Do not invent inconsistent type colors per screen.
- Do not use type chips as general badges.

### Interactions Between Sub-components

- In filter bars, selected type chip toggles filter state.
- Remove affordance clears the type filter.
- Tooltip can reveal additional type context without changing chip state.

### Estimated Variant Count

18 types x 2 sizes x 4 states = **144**

---

## 5. KPI Blocks

### Role

KPI Blocks summarize key admin metrics: Pokemon count, updated assets, data sync state, event volume, errors, source health and backlog size.

### Atomic Dependencies

- `Atomic/Label`
- `Atomic/Badge`
- `Atomic/Progress Bar`
- `Atomic/Icon Button`
- `Atomic/Tooltip`
- `Atomic/Divider`

### Anatomy

- Root KPI surface.
- Eyebrow label.
- Main value.
- Unit or suffix.
- Trend badge.
- Optional icon action.
- Optional progress indicator.
- Optional helper caption.

### Variants

Layout:
- `compact`
- `default`
- `featured`

Tone:
- `neutral`
- `primary`
- `success`
- `warning`
- `danger`

### Sizes

- Compact: dashboard grid small cell.
- Default: normal KPI card.
- Featured: large hero KPI slot.

### States

Generated states:
- `default`
- `hover`
- `loading`
- `error`

Documented states:
- `focus`: only when KPI has action.
- `active`: delegated to action control.
- `selected`: use selected card border if selectable.
- `success` and `warning`: represented by tone.
- `disabled`: uncommon, use muted content if metric unavailable.

### Token Bindings

- Surface: `semantic.color.surface.base`, `semantic.color.surface.strong`
- Border: `semantic.color.border.default`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Tone: `semantic.color.border.active`, `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Radius: `primitive.radius.lg`, `primitive.radius.modal`
- Padding: `primitive.spacing.4`, `primitive.spacing.6`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`
- Shadow/elevation: `primitive.shadow.card`

### Auto-layout Constraints

- Direction: vertical.
- Header row horizontal when icon/action exists.
- Value text hugs content.
- Progress bar fills width.
- Min width: 180 compact, 240 default, 320 featured.
- Responsive: KPI grid controls wrapping; block internals remain stable.

### Accessibility

- Metric label and value should be read together.
- Trend badges must expose text, not color only.
- Loading skeleton must announce busy region if dynamic.
- Action icon requires accessible label.

### Do / Don't

Do:
- Use KPI Blocks for scan-first dashboard numbers.
- Show stale/loading/error states explicitly.

Don't:
- Do not put long prose in KPI Blocks.
- Do not use featured KPI everywhere.
- Do not encode negative status only by red color.

### Interactions Between Sub-components

- Action icon opens detail view or refreshes metric.
- Progress bar reflects metric completeness when applicable.
- Badge tone summarizes trend/status and must align with KPI tone.

### Estimated Variant Count

3 layouts x 5 tones x 4 states = **60**

---

## 6. Stat Rows

### Role

Stat Rows display structured metadata inside cards, modals and panels: CP, IV, attack stats, source status, counts, timestamps and comparison values.

### Atomic Dependencies

- `Atomic/Label`
- `Atomic/Badge`
- `Atomic/Divider`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`

### Anatomy

- Root row.
- Label.
- Value.
- Optional unit.
- Optional badge.
- Optional progress bar.
- Optional comparison delta.
- Optional divider.

### Variants

- `simple`
- `comparison`
- `ranked`
- `segmented`

### Sizes

- `sm`: dense modal/table usage.
- `md`: default card usage.

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`

Documented states:
- `focus`: only if row is interactive.
- `active`: transient.
- `disabled`: use muted text if unavailable.
- `error`: badge or helper status.
- `success`: badge tone.
- `warning`: badge tone.

### Token Bindings

- Surface selected: `component.sidebar.active.background`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border/divider: `semantic.color.border.default`
- Active border: `semantic.color.border.active`
- Status tones: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Padding: `primitive.spacing.2`, `primitive.spacing.3`
- Gap: `primitive.spacing.2`
- Radius: `primitive.radius.md`

### Auto-layout Constraints

- Direction: horizontal for simple/comparison.
- Direction: vertical for segmented when progress is included.
- Label min width: 96.
- Value aligns right or fills based on variant.
- Min height: 32.
- Responsive: label/value stack under narrow widths.

### Accessibility

- Label and value must remain associated.
- Comparison deltas require text labels for up/down/neutral.
- Loading rows should preserve layout to avoid jump.

### Do / Don't

Do:
- Use consistent label widths inside one stat group.
- Use badges for status, not long text.

Don't:
- Do not mix unrelated stat formats in one list.
- Do not rely on color-only comparison deltas.

### Interactions Between Sub-components

- Hover/selected row state coordinates label, value and badge emphasis.
- Tooltip explains technical metric without changing row content.
- Progress bar and value must represent the same metric.

### Estimated Variant Count

4 variants x 2 sizes x 4 states = **32**

---

## 7. Card Headers

### Role

Card Headers introduce dashboard cards, Pokemon cards, event cards, table panels and analytic modules. They coordinate title, metadata, status and actions.

### Atomic Dependencies

- `Atomic/Label`
- `Atomic/Badge`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Chip`

### Anatomy

- Root header row.
- Title.
- Subtitle or metadata.
- Optional leading marker/icon.
- Optional status badge.
- Optional chip row.
- Optional action cluster.
- Optional expand/collapse control.
- Optional divider below.

### Variants

- `default`
- `selectable`
- `expandable`
- `actions`
- `status`

Density:
- `compact`
- `comfortable`

### Sizes

- Compact height target: 48.
- Comfortable height target: 64.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `selected`
- `loading`

Documented states:
- `active`: delegated to actions/expand control.
- `disabled`: rare, use muted header.
- `error`: status badge.
- `success`: status badge.
- `warning`: status badge.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Selected border: `component.card.selected.border`
- Active background: `component.sidebar.active.background`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Radius: inherited from parent card.
- Padding: `primitive.spacing.3`, `primitive.spacing.4`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`

### Auto-layout Constraints

- Direction: horizontal.
- Title group fills available width.
- Action cluster hugs content.
- Status badge hugs content.
- Chip row wraps under title in narrow containers.
- Responsive:
  - Actions collapse to overflow icon.
  - Subtitle may stack below title.

### Accessibility

- Header title should map to card accessible name.
- Expandable header exposes `aria-expanded`.
- Selection state exposes selected/pressed state if interactive.
- Actions remain separately focusable.

### Do / Don't

Do:
- Keep actions aligned and predictable.
- Show status near title.

Don't:
- Do not overload card headers with full toolbars.
- Do not make entire header clickable if it contains nested actions without clear focus behavior.

### Interactions Between Sub-components

- Expand icon controls downstream card body visibility.
- Selection state updates card border and optional chip/badge.
- Loading state can replace actions with progress or disabled icon buttons.

### Estimated Variant Count

5 variants x 2 densities x 5 states = **50**

---

## 8. Modal Headers

### Role

Modal Headers orient destructive confirmations, Pokemon detail modals, editor modals, event creation flows and import/export dialogs.

### Atomic Dependencies

- `Atomic/Label`
- `Atomic/Badge`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Divider`
- `Atomic/Tabs Primitive`
- `Atomic/Progress Bar`

### Anatomy

- Root modal header.
- Title.
- Optional subtitle.
- Optional domain badge/chip.
- Close icon button.
- Optional primary action.
- Optional tab primitive row.
- Optional progress bar for wizard/import.
- Divider below.

### Variants

- `default`
- `destructive`
- `wizard`
- `detail`

### Sizes

- `md`: standard modal.
- `lg`: large data/editor modal.

### States

Generated states:
- `default`
- `loading`
- `error`

Documented states:
- `hover`, `focus`, `active`: delegated to close/action buttons and tabs.
- `selected`: represented by active tab in wizard/detail.
- `disabled`: disable action buttons, not the header.
- `success`: progress/status badge if completion.
- `warning`: badge or helper copy.

### Token Bindings

- Surface: `semantic.color.surface.strong`
- Border/divider: `semantic.color.border.default`
- Focus/active: `semantic.color.border.active`
- Danger: `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Padding: `primitive.spacing.4`, `primitive.spacing.6`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`
- Radius: `primitive.radius.modal` inherited from modal shell
- Z-index reference: `primitive.z.modal`

### Auto-layout Constraints

- Direction: vertical.
- Top row: horizontal.
- Title group fills available width.
- Close/action cluster hugs content.
- Tabs/progress fill width.
- Responsive:
  - Long subtitles wrap.
  - Action cluster may move below title on narrow modals.

### Accessibility

- Modal title must be connected to dialog label.
- Close button needs accessible label.
- Destructive modal header must not rely only on red color.
- Wizard progress must be exposed semantically.

### Do / Don't

Do:
- Use destructive variant only when action risk is real.
- Keep modal title specific.

Don't:
- Do not put large forms inside header.
- Do not hide close control unless modal is truly blocking.

### Interactions Between Sub-components

- Wizard variant coordinates tabs/progress with content step.
- Destructive variant changes badge/action tone, not typography structure.
- Loading state disables action button and may show progress bar.

### Estimated Variant Count

4 variants x 2 sizes x 3 states = **24**

---

## 9. Pagination

### Role

Pagination controls navigation through Pokemon lists, event tables, asset libraries, logs, rule history and source monitoring rows.

### Atomic Dependencies

- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Label`
- `Atomic/Select`
- `Atomic/Divider`
- `Atomic/Tooltip`

### Anatomy

- Root pagination nav.
- Previous icon button.
- Next icon button.
- Page number buttons.
- Current page label.
- Page size select.
- Result range label.
- Optional first/last controls.

### Variants

- `simple`: previous/next and range.
- `numbered`: page buttons.
- `compact`: icon-only with range.

### Sizes

- `sm`: table footers and dense panels.
- `md`: default data views.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `disabled`
- `loading`

Documented states:
- `active`: current page button.
- `selected`: current page, represented by active button.
- `error`: not applicable.
- `success`: not applicable.
- `warning`: not applicable.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Active page: `component.sidebar.active.background`
- Radius: `primitive.radius.md`, `primitive.radius.pill`
- Padding: `primitive.spacing.2`, `primitive.spacing.3`
- Gap: `primitive.spacing.1`, `primitive.spacing.2`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Page buttons hug content.
- Range label fills available space in simple variant.
- Page size select hugs content.
- Responsive:
  - Numbered variant collapses to compact below tablet.
  - First/last controls may hide first.

### Accessibility

- Use navigation landmark with label.
- Current page exposes `aria-current=page`.
- Disabled next/previous buttons must be unavailable.
- Page size select has label.
- Keyboard order follows visual order.

### Do / Don't

Do:
- Show current range and total when available.
- Disable unavailable previous/next controls.

Don't:
- Do not hide current page.
- Do not use pagination for small lists where all items fit.

### Interactions Between Sub-components

- Page size select resets or validates current page.
- Loading state disables navigation controls while preserving current range.
- Active page button coordinates with range label.

### Estimated Variant Count

3 variants x 2 sizes x 5 states = **30**

---

## 10. Action Rows

### Role

Action Rows group decision actions in forms, modals, table rows, bulk operations and confirmation surfaces.

### Atomic Dependencies

- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Label`
- `Atomic/Badge`
- `Atomic/Divider`
- `Atomic/Tooltip`

### Anatomy

- Root action row.
- Primary action.
- Secondary action.
- Optional danger action.
- Optional helper/status label.
- Optional badge.
- Optional icon-only utility action.
- Optional divider above.

### Variants

- `form-footer`
- `table-row`
- `modal-footer`
- `bulk-actions`

Density:
- `compact`
- `comfortable`

### Sizes

- Compact row min-height: 40.
- Comfortable row min-height: 56.
- Width: parent-controlled.

### States

Generated states:
- `default`
- `loading`
- `disabled`
- `error`

Documented states:
- `hover`, `focus`, `active`: delegated to child buttons.
- `selected`: used by bulk-actions when selection exists.
- `success`: status badge after completion.
- `warning`: status badge or confirmation copy.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Border/divider: `semantic.color.border.default`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Primary action: `component.button.primary.background`
- Danger action: `semantic.color.state.error`
- Status tones: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Padding: `primitive.spacing.3`, `primitive.spacing.4`
- Gap: `primitive.spacing.2`, `primitive.spacing.3`
- Radius: `primitive.radius.lg`

### Auto-layout Constraints

- Direction: horizontal.
- Primary/secondary actions align right in forms/modals.
- Table-row variant distributes actions inline.
- Bulk-actions variant includes selection count left and actions right.
- Responsive:
  - On narrow width, actions stack vertically with primary first or last based on platform convention.
  - Danger action remains visually separated.

### Accessibility

- Action group needs accessible label when multiple controls are present.
- Loading action exposes busy state.
- Destructive action must be identifiable by text, not color only.
- Keyboard order must match decision flow.

### Do / Don't

Do:
- Keep primary and cancel actions predictable.
- Use bulk-actions only when selection count is visible.

Don't:
- Do not hide destructive action among neutral actions.
- Do not disable all actions without explaining why.
- Do not place more than one primary action in a row.

### Interactions Between Sub-components

- Loading primary action disables secondary conflicting actions when operation is blocking.
- Bulk selection badge controls visibility of bulk action row.
- Error state displays badge/label while preserving retry and cancel controls.

### Estimated Variant Count

4 variants x 2 densities x 4 states = **32**

---

## Future Figma Generation Plan

When MCP quota resets:

1. Create page `04 Composite Components`.
2. Reuse Phase 3C atomic component sets as nested instances.
3. Create one section per composite family.
4. Generate component sets in this order:
   - Search Bars
   - Filter Bars
   - Toolbar Groups
   - Pokemon Type Chips
   - KPI Blocks
   - Stat Rows
   - Card Headers
   - Modal Headers
   - Pagination
   - Action Rows
5. Bind composite root surfaces, spacing and borders to `Dashboard Admin Tokens`.
6. Do not hardcode child styles. Child visuals must come from atomic instances.
7. Add documentation cards for Role, Anatomy, Interaction Rules, Do and Don't.
8. Validate:
   - 10 composite families.
   - 520 estimated variants.
   - Atomic dependencies only.
   - No local hardcoded colors.
   - Auto-layout on every composite root.
   - Variant naming in `Property=Value` format.

## Phase 3D Visual Relaunch Status

Architecture status: **ready**  
Figma quota dependency: **blocked until MCP reset or plan upgrade**  
Next step after reset: generate `04 Composite Components` from this spec.
