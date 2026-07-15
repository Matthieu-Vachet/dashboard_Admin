# Phase 3C-PREP - Atomic Component Spec

Project: Dashboard Admin Pokemon GO  
Target Figma page: `03 Atomic Components`  
Status: Ready for future Figma generation when MCP quota resets  
Mode: DARK MODE ONLY  

## Scope

This document replaces the blocked Figma generation step for Phase 3C and acts as the source of truth for the next visual generation pass.

Rules:
- No Figma MCP call required for this prep phase.
- No code implementation.
- No production dashboard modification.
- One visual direction: 70% SaaS premium, 20% Pokemon GO identity, 10% restrained neon/glow.
- All future visual properties must use Phase 3A foundations and Phase 3B tokens.

## Token Source

Figma collection:
- `Dashboard Admin Tokens`

Mode:
- `Dark Mode`

Token naming:
- Public documentation uses dot notation: `semantic.color.background`
- Figma variables use slash notation: `semantic/color/background`

Core token groups:
- Primitive: raw colors, spacing, radius, shadows/elevation levels, motion durations, z-index levels.
- Semantic: app-level meaning.
- Component: component-specific aliases.

Required core tokens:
- `semantic.color.background`
- `semantic.color.surface.base`
- `semantic.color.surface.strong`
- `semantic.color.text.primary`
- `semantic.color.text.secondary`
- `semantic.color.border.default`
- `semantic.color.border.active`
- `semantic.color.state.success`
- `semantic.color.state.warning`
- `semantic.color.state.error`
- `component.button.primary.background`
- `component.button.primary.hover`
- `component.input.background`
- `component.input.border`
- `component.badge.success.background`
- `component.modal.overlay`
- `component.sidebar.active.background`
- `component.card.selected.border`
- `primitive.spacing.1`
- `primitive.spacing.2`
- `primitive.spacing.3`
- `primitive.spacing.4`
- `primitive.spacing.6`
- `primitive.spacing.8`
- `primitive.radius.sm`
- `primitive.radius.md`
- `primitive.radius.lg`
- `primitive.radius.pill`
- `primitive.motion.fast`
- `primitive.motion.normal`

## Global State Vocabulary

All atomic families document this full state vocabulary:
- `default`
- `hover`
- `focus`
- `active`
- `selected`
- `disabled`
- `loading`
- `error`
- `success`
- `warning`

Generation rule:
- Only meaningful states become future Figma variants.
- Non-applicable states remain documented as behavior rules, not empty visual variants.
- Domain states such as `success` and `warning` are tones for badges/progress, not interaction states for every primitive.

## Variant Count Summary

| Family | Formula | Future Figma variants |
|---|---:|---:|
| Buttons | 4 styles x 4 sizes x 6 states x 3 icon options | 288 |
| Icon Buttons | 3 variants x 6 states | 18 |
| Inputs | 4 variants x 5 states | 20 |
| Textareas | 1 variant x 5 states | 5 |
| Selects / Dropdowns | 1 trigger variant x 5 states | 5 |
| Checkboxes | 2 checked values x 5 states | 10 |
| Switches | 2 checked values x 4 states | 8 |
| Badges | 6 tones | 6 |
| Chips | 4 variants x 4 states | 16 |
| Labels | 3 tones | 3 |
| Dividers | 2 orientations x 2 tones | 4 |
| Progress Bars | 4 tones | 4 |
| Tooltips | 4 placements | 4 |
| Tabs Primitives | 2 variants x 5 states | 10 |

Total future Figma variants: **401**

---

## 1. Buttons

### Role

Buttons trigger dashboard actions: saving edits, importing data, opening modals, filtering lists, creating Pokemon/event entities, confirming destructive actions, and launching sync workflows.

### Anatomy

- Root auto-layout component.
- Optional left icon.
- Label text.
- Optional right icon.
- Loading indicator.
- Focus ring / active border.
- Disabled opacity behavior.
- Hit area.

### Variants

Style:
- `primary`
- `secondary`
- `ghost`
- `danger`

Icon option:
- `icon-left`
- `icon-right`
- `icon-only`

### Sizes

- `sm`: compact table and toolbar action.
- `md`: default form and page action.
- `lg`: modal primary action and prominent call-to-action.
- `icon`: square button for icon-only action.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `active`
- `disabled`
- `loading`

Documented but not generated as separate button states:
- `selected`: use chips/tabs for persistent selection.
- `error`: use `danger` style, not an error state.
- `success`: use feedback badges/toasts, not a button state.
- `warning`: use confirmation copy or warning badge, not a button state.

### Token Bindings

Base:
- Background: `component.button.primary.background`, `semantic.color.surface.strong`, `component.sidebar.active.background`, `semantic.color.state.error`
- Hover: `component.button.primary.hover`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`, `semantic.color.border.active`, `semantic.color.state.error`
- Radius: `primitive.radius.md`, `primitive.radius.pill` for dense icon pills if needed
- Padding: `primitive.spacing.2`, `primitive.spacing.3`, `primitive.spacing.4`
- Gap: `primitive.spacing.1`, `primitive.spacing.2`, `primitive.spacing.3`
- Motion: `primitive.motion.fast`, `primitive.motion.normal`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center / center.
- `sm`: padding x `spacing.2`, min-height 32.
- `md`: padding x `spacing.3`, min-height 40.
- `lg`: padding x `spacing.4`, min-height 48.
- `icon`: fixed square 40 x 40.
- Gap: `spacing.2`.
- Label width: hug content, max width 220, truncate in implementation if needed.
- Responsive: preserve button width by content, never stretch inside tables unless a parent explicitly sets full width.

### Accessibility Rules

- Keyboard: `Enter` and `Space` activate.
- Focus ring: `semantic.color.border.active`, minimum 2px visual weight.
- Contrast: text on filled buttons must meet WCAG AA.
- Loading: keep button focusable only if action can be cancelled; otherwise disable and expose busy state.
- ARIA: icon-only buttons require `aria-label`; loading buttons require `aria-busy=true`.

### Do / Don't

Do:
- Use one primary button per local decision area.
- Use `danger` only for destructive or irreversible actions.
- Keep labels short and action-oriented.

Don't:
- Do not use two primary buttons side by side.
- Do not use icon-only buttons without accessible labels.
- Do not use `ghost` for destructive actions.

### Variant Count

4 styles x 4 sizes x 6 generated states x 3 icon options = **288**

---

## 2. Icon Buttons

### Role

Icon buttons support dense admin actions: edit, delete, copy, open, refresh, collapse sidebar, table filters, calendar navigation, and asset preview controls.

### Anatomy

- Square root auto-layout component.
- Centered Lucide icon slot.
- Optional loading indicator overlay.
- Focus ring.
- Hit area.

### Variants

- `neutral`
- `primary`
- `danger`

### Sizes

- Default fixed size: 40 x 40.
- Compact usage may use 32 x 32 in tables, but this remains an implementation size override, not a separate Figma variant for Phase 3C.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `active`
- `disabled`
- `loading`

Documented but not generated:
- `selected`: use chips/tabs or selected card border.
- `error`: use `danger` variant.
- `success`: not applicable.
- `warning`: not applicable.

### Token Bindings

- Background: `semantic.color.surface.strong`, `component.sidebar.active.background`, `component.button.primary.background`, `semantic.color.state.error`
- Hover: `component.button.primary.hover`
- Icon: `semantic.color.text.primary`, `semantic.color.text.secondary`, `semantic.color.border.active`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Radius: `primitive.radius.md`
- Padding: `primitive.spacing.2`
- Motion: `primitive.motion.fast`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center / center.
- Width/height fixed: 40 x 40.
- Padding: `spacing.2`.
- Icon size: 18 x 18.
- Responsive: never compress below 32 x 32.

### Accessibility Rules

- Must expose an accessible name.
- Keyboard activation: `Enter`, `Space`.
- Tooltip can supplement but cannot replace accessible label.
- Disabled state must be non-interactive and visually muted.

### Do / Don't

Do:
- Use for recurring toolbar/table actions.
- Pair with tooltip when meaning is not obvious.

Don't:
- Do not use icon-only buttons for rare or high-risk actions without confirmation.
- Do not invent custom icons when Lucide covers the action.

### Variant Count

3 variants x 6 states = **18**

---

## 3. Inputs

### Role

Inputs collect admin data: Pokemon names, identifiers, CP values, filters, JSON rule fields, search queries, and source metadata.

### Anatomy

- Root field wrapper.
- Label.
- Optional required marker.
- Control shell.
- Prefix slot.
- Text value.
- Suffix slot.
- Helper text.
- Error text.
- Focus ring.

### Variants

- `default`
- `search`
- `number`
- `readonly`

### Sizes

- Default height: 42.
- Dense table filter height: 36, implementation override.
- Width: parent-controlled.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `error`
- `disabled`

Documented but not generated:
- `active`: same visual as focus for text input editing.
- `selected`: text selection is browser-native.
- `loading`: use suffix spinner if async validation is needed.
- `success`: use helper/suffix feedback only after validation.
- `warning`: use helper text and warning badge, not a separate input state.

### Token Bindings

- Background: `component.input.background`
- Border: `component.input.border`, `semantic.color.border.active`, `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Surface: `semantic.color.surface.base`
- Radius: `primitive.radius.md`
- Padding: `primitive.spacing.3`
- Gap: `primitive.spacing.2`
- Motion: `primitive.motion.fast`

### Auto-layout Constraints

- Field direction: vertical.
- Control direction: horizontal.
- Label gap: `spacing.2`.
- Control padding: `spacing.3`.
- Prefix/suffix fixed width hug content.
- Value min-width: 0, fill available.
- Min control width: 160.
- Max field width: parent/container controlled.
- Responsive: full width in forms; compact fixed width in table toolbar.

### Accessibility Rules

- Label must be programmatically associated with input.
- Helper/error text must be connected through `aria-describedby`.
- Error state must expose `aria-invalid=true`.
- Search input uses `type=search` or role searchbox.
- Number input must define min/max/step where applicable.

### Do / Don't

Do:
- Use helper text for format constraints.
- Use prefix/suffix only when it improves scanning.

Don't:
- Do not rely on placeholder as label.
- Do not use readonly as disabled; readonly content should remain readable and selectable.

### Variant Count

4 variants x 5 states = **20**

---

## 4. Textareas

### Role

Textareas support long admin text: notes, descriptions, JSON snippets, source comments, event descriptions, and migration explanations.

### Anatomy

- Root field wrapper.
- Label.
- Textarea control shell.
- Multiline value.
- Helper/error text.
- Optional character counter.
- Resize affordance, implementation only if enabled.

### Variants

- `default`

### Sizes

- Default min-height: 104.
- Large min-height: 160, implementation override.
- Width: parent-controlled.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `error`
- `disabled`

Documented but not generated:
- `active`: equivalent to focus while editing.
- `selected`: browser-native text selection.
- `loading`: not applicable.
- `success`: helper/suffix feedback only.
- `warning`: helper text only.

### Token Bindings

- Background: `component.input.background`
- Border: `component.input.border`, `semantic.color.border.active`, `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.md`
- Padding: `primitive.spacing.3`
- Gap: `primitive.spacing.2`

### Auto-layout Constraints

- Field direction: vertical.
- Control min-height: 104.
- Padding: `spacing.3`.
- Min width: 240.
- Responsive: fill parent width in modal/form layouts.

### Accessibility Rules

- Label association required.
- Error via `aria-invalid` and `aria-describedby`.
- Preserve visible focus ring.
- Character count, if present, must be screen-reader reachable.

### Do / Don't

Do:
- Use for long, human-authored content.
- Keep helper text concise.

Don't:
- Do not use textarea for single IDs or numeric values.
- Do not auto-grow indefinitely inside modals.

### Variant Count

1 variant x 5 states = **5**

---

## 5. Selects / Dropdowns

### Role

Selects handle finite admin choices: Pokemon type, rarity, event type, source, region, status, role, and preset filters.

### Anatomy

- Root field wrapper.
- Label.
- Trigger control.
- Selected value.
- Optional prefix.
- Chevron suffix.
- Helper/error text.
- Dropdown menu surface, generated in Phase 3D patterns.

### Variants

- `trigger`

### Sizes

- Default height: 42.
- Dense height: 36, implementation override.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `error`
- `disabled`

Documented but not generated:
- `active`: maps to open dropdown.
- `selected`: selected option belongs to dropdown item patterns.
- `loading`: use suffix spinner if async options load.
- `success`: not applicable.
- `warning`: helper text only.

### Token Bindings

- Background: `component.input.background`
- Border: `component.input.border`, `semantic.color.border.active`, `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Dropdown surface: `semantic.color.surface.strong`
- Radius: `primitive.radius.md`
- Padding: `primitive.spacing.3`
- Gap: `primitive.spacing.2`
- Z-index reference: `primitive.z.dropdown`

### Auto-layout Constraints

- Field direction: vertical.
- Trigger direction: horizontal.
- Trigger align: center.
- Selected value fills available width.
- Chevron hugs content.
- Min width: 180.
- Responsive: full width in forms; fixed width in toolbars.

### Accessibility Rules

- Use button/listbox or combobox pattern depending on searchability.
- `Enter`/`Space` opens.
- `Escape` closes.
- Arrow keys move active option.
- Selected option must be announced.

### Do / Don't

Do:
- Use for finite, recognizable options.
- Keep selected label concise.

Don't:
- Do not use select for long searchable datasets unless it becomes combobox.
- Do not hide the current selected value.

### Variant Count

1 trigger variant x 5 states = **5**

---

## 6. Checkboxes

### Role

Checkboxes support independent toggles and multi-select filters: source inclusion, Pokemon attributes, list rows, bulk actions, and optional settings.

### Anatomy

- Root row.
- Checkbox box.
- Checkmark.
- Label.
- Optional helper.
- Focus ring.
- Error indication.

### Variants

Checked:
- `false`
- `true`

### Sizes

- Box: 20 x 20.
- Label row height: minimum 32.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `error`
- `disabled`

Documented but not generated:
- `active`: transient pressed state can use hover/focus styling.
- `selected`: represented by `checked=true`.
- `loading`: not applicable.
- `success`: not applicable.
- `warning`: not applicable.

### Token Bindings

- Box background: `component.input.background`, `semantic.color.border.active`
- Border: `component.input.border`, `semantic.color.border.active`, `semantic.color.state.error`
- Checkmark: `semantic.color.text.primary`
- Label: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.sm`
- Gap: `primitive.spacing.2`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Gap: `spacing.2`.
- Box fixed 20 x 20.
- Label fills remaining width if inside forms.

### Accessibility Rules

- Native checkbox semantics preferred.
- Label click toggles checkbox.
- `Space` toggles.
- Indeterminate state, if added later, must expose `aria-checked=mixed`.

### Do / Don't

Do:
- Use for independent options.
- Use checked state for persistent selection.

Don't:
- Do not use for mutually exclusive choices.
- Do not make only the box clickable; label should also activate.

### Variant Count

2 checked values x 5 states = **10**

---

## 7. Switches

### Role

Switches toggle immediate settings: feature enabled, watcher active, sync enabled, compact mode, live updates.

### Anatomy

- Root row.
- Track.
- Thumb.
- Optional label.
- Optional on/off text.
- Focus ring.

### Variants

Checked:
- `false`
- `true`

### Sizes

- Track: 44 x 24.
- Thumb: 16 x 16.
- Row min-height: 32.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `disabled`

Documented but not generated:
- `active`: transient pressed state.
- `selected`: represented by checked true.
- `loading`: use disabled + helper in implementation if async.
- `error`: not applicable; use validation message outside.
- `success`: not applicable.
- `warning`: not applicable.

### Token Bindings

- Track off: `semantic.color.surface.strong`
- Track on: `semantic.color.border.active`
- Border/focus: `semantic.color.border.default`, `semantic.color.border.active`
- Thumb: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.pill`
- Motion: `primitive.motion.normal`

### Auto-layout Constraints

- Root direction: horizontal.
- Track fixed 44 x 24.
- Thumb fixed 16 x 16.
- Thumb aligns min/max based on checked state.
- Gap label: `spacing.2`.

### Accessibility Rules

- Use `role=switch` or native checkbox with switch semantics.
- `Space` toggles.
- State announced as on/off.
- Label association required.

### Do / Don't

Do:
- Use when the effect is immediate.
- Keep labels explicit.

Don't:
- Do not use switches for form choices requiring submit.
- Do not use switch for destructive actions.

### Variant Count

2 checked values x 4 states = **8**

---

## 8. Badges

### Role

Badges communicate compact statuses, types, classifications, counts, and Pokemon domain attributes.

### Anatomy

- Pill container.
- Label.
- Optional icon/type marker.
- Tone color.

### Variants

- `neutral`
- `primary`
- `success`
- `warning`
- `danger`
- `pokemon-type`

### Sizes

- Default height: 24.
- Dense metadata height: 20, implementation override.

### States

Generated states:
- Badges are static by default.

Documented behavior:
- `success`, `warning`, `error` map to tone variants.
- `hover`, `focus`, `active`, `selected`, `disabled`, `loading` are not badge states.

### Token Bindings

- Neutral background: `semantic.color.surface.strong`
- Primary background: `semantic.color.border.active`
- Success background: `component.badge.success.background`
- Warning background: `semantic.color.state.warning`
- Danger background: `semantic.color.state.error`
- Pokemon type background: `primitive.color.violet.500` or future domain type token
- Text: `semantic.color.text.primary`, `semantic.color.background` on bright warning
- Radius: `primitive.radius.pill`
- Padding: `primitive.spacing.2`
- Gap: `primitive.spacing.1`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Height: hug content, min 24.
- Padding x: `spacing.2`.
- Max width: 160; truncate label in implementation.

### Accessibility Rules

- Badges are text content, not controls.
- Status badge must be screen-reader readable.
- Color cannot be the only signal for critical status.

### Do / Don't

Do:
- Use badges for quick scan metadata.
- Keep labels short.

Don't:
- Do not put actions inside badges.
- Do not overload one row with too many badges.

### Variant Count

6 tones = **6**

---

## 9. Chips

### Role

Chips represent active filters, selected metadata, removable criteria, and compact object tags.

### Anatomy

- Pill root.
- Optional leading icon.
- Label.
- Optional remove icon.
- Focus ring.
- Selected background.

### Variants

- `default`
- `selected`
- `removable`
- `filter`

### Sizes

- Default height: 28.
- Dense height: 24, implementation override.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `disabled`

Documented but not generated:
- `active`: transient click state.
- `selected`: represented by `variant=selected`.
- `loading`: not applicable.
- `error`: not applicable.
- `success`: use badge.
- `warning`: use badge.

### Token Bindings

- Background: `semantic.color.surface.strong`, `component.sidebar.active.background`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.pill`
- Padding: `primitive.spacing.2`
- Gap: `primitive.spacing.1`

### Auto-layout Constraints

- Direction: horizontal.
- Align: center.
- Padding x: `spacing.2`.
- Gap: `spacing.1`.
- Label max width: 180.
- Remove icon fixed 12 x 12.

### Accessibility Rules

- Removable chips expose remove button with label.
- Filter chips should expose selected state if toggled.
- Keyboard: focus chip, `Enter` toggles/selects, `Backspace/Delete` removes where applicable.

### Do / Don't

Do:
- Use chips for active filters.
- Make removable chips easy to dismiss.

Don't:
- Do not use chips as primary page navigation.
- Do not hide critical filtering behind unlabeled chips.

### Variant Count

4 variants x 4 states = **16**

---

## 10. Labels

### Role

Labels identify form fields, metadata, table filters, settings, and compact dashboard captions.

### Anatomy

- Text node.
- Optional required marker.
- Optional status tone.

### Variants

- `default`
- `required`
- `error`

### Sizes

- Caption size: Phase 3A `Caption`.
- Body compact label: Phase 3A `Body Compact`, implementation override.

### States

Generated states:
- Static tones only.

Documented behavior:
- `error` maps to label tone.
- `hover`, `focus`, `active`, `selected`, `disabled`, `loading`, `success`, `warning` are not generated label states.

### Token Bindings

- Text default: `semantic.color.text.secondary`
- Text active/required: `semantic.color.text.primary`
- Error: `semantic.color.state.error`

### Auto-layout Constraints

- Text only, hug content.
- No background.
- Required marker stays inline.

### Accessibility Rules

- Form labels must bind to inputs.
- Required marker must be conveyed semantically, not only visually.
- Error labels should not replace full error helper text.

### Do / Don't

Do:
- Keep labels short and noun-based.
- Use helper text for explanations.

Don't:
- Do not write instructions as labels.
- Do not rely only on an asterisk for required fields.

### Variant Count

3 tones = **3**

---

## 11. Dividers

### Role

Dividers separate dense dashboard sections, form groups, table toolbars, modal areas, and metadata blocks.

### Anatomy

- Single line.
- Orientation.
- Tone.

### Variants

Orientation:
- `horizontal`
- `vertical`

Tone:
- `default`
- `strong`

### Sizes

- Horizontal height: 1.
- Vertical width: 1.
- Length controlled by parent.

### States

Generated states:
- Static only.

Documented behavior:
- No interaction states.
- `strong` is a tone, not active/selected.

### Token Bindings

- Default line: `semantic.color.border.default`
- Strong line: `semantic.color.border.active`

### Auto-layout Constraints

- Horizontal: width fill, height 1.
- Vertical: height fill, width 1.
- No padding.
- No radius.

### Accessibility Rules

- Decorative dividers should be hidden from screen readers.
- Structural separators can use semantic roles only when useful.

### Do / Don't

Do:
- Use dividers sparingly to improve scanning.

Don't:
- Do not use dividers as decoration.
- Do not stack multiple dividers around cards.

### Variant Count

2 orientations x 2 tones = **4**

---

## 12. Progress Bars

### Role

Progress bars visualize data sync, import progress, validation completion, asset processing, and background tasks.

### Anatomy

- Track.
- Filled bar.
- Optional label.
- Optional value text.
- Tone.

### Variants

Tone:
- `primary`
- `success`
- `warning`
- `danger`

### Sizes

- Default height: 10.
- Thin height: 6, implementation override.
- Width: parent-controlled.

### States

Generated states:
- Tone variants only.

Documented behavior:
- `loading` is represented by indeterminate progress in implementation, not a Phase 3C static variant.
- `success`, `warning`, `error` map to tones.

### Token Bindings

- Track: `semantic.color.surface.strong`
- Primary bar: `semantic.color.border.active`
- Success bar: `semantic.color.state.success`
- Warning bar: `semantic.color.state.warning`
- Danger bar: `semantic.color.state.error`
- Radius: `primitive.radius.pill`
- Motion: `primitive.motion.normal`

### Auto-layout Constraints

- Root direction: vertical if label is present.
- Track width: fill parent.
- Track min-width: 120.
- Bar width: value-driven in implementation.
- Radius: pill.

### Accessibility Rules

- Use `role=progressbar`.
- Expose `aria-valuemin`, `aria-valuemax`, `aria-valuenow` when determinate.
- Provide text alternative for indeterminate progress.

### Do / Don't

Do:
- Use for measurable progress.
- Pair with concise status text for long jobs.

Don't:
- Do not use progress bars for simple spinners.
- Do not animate excessively.

### Variant Count

4 tones = **4**

---

## 13. Tooltips

### Role

Tooltips provide short hints for icons, dense table actions, technical abbreviations, and controls that need clarification.

### Anatomy

- Tooltip surface.
- Text.
- Optional arrow.
- Placement.

### Variants

Placement:
- `top`
- `right`
- `bottom`
- `left`

### Sizes

- Min width: 80.
- Max width: 260.
- Padding: compact.

### States

Generated states:
- Placement variants only.

Documented behavior:
- Tooltip visibility is controlled by trigger hover/focus.
- No disabled/loading/error/success/warning variants.

### Token Bindings

- Background: `semantic.color.surface.strong`
- Border: `semantic.color.border.default`
- Text: `semantic.color.text.primary`
- Radius: `primitive.radius.md`
- Padding: `primitive.spacing.2`
- Shadow/elevation: `primitive.shadow.dropdown`
- Z-index: `primitive.z.dropdown`
- Motion: `primitive.motion.fast`

### Auto-layout Constraints

- Direction: vertical.
- Padding: `spacing.2`.
- Text max width: 240.
- Arrow is optional and placement-dependent.

### Accessibility Rules

- Tooltip must appear on hover and keyboard focus.
- Tooltip content must not contain interactive controls.
- Tooltip cannot be the only place for critical information.
- Trigger must keep its accessible name independent from tooltip when needed.

### Do / Don't

Do:
- Use short, helpful phrases.
- Use with icon-only controls.

Don't:
- Do not put warnings, forms or actions inside tooltips.
- Do not rely on tooltip for mobile-only flows.

### Variant Count

4 placements = **4**

---

## 14. Tabs Primitives

### Role

Tabs switch between peer dashboard views: detail sections, admin panels, JSON/source views, assets, analytics subsets, and modal sub-sections.

### Anatomy

- Tab root.
- Label.
- Optional icon.
- Active indicator.
- Focus ring.
- Variant style.

### Variants

- `pill`
- `underline`

### Sizes

- Default tab height: 36.
- Dense tab height: 32, implementation override.

### States

Generated states:
- `default`
- `hover`
- `focus`
- `active`
- `disabled`

Documented but not generated:
- `selected`: represented by `active`.
- `loading`: not a tab primitive state.
- `error`: use badge/indicator in tab label if needed.
- `success`: use badge/indicator in tab label if needed.
- `warning`: use badge/indicator in tab label if needed.

### Token Bindings

- Pill background default: `semantic.color.surface.base`
- Pill active background: `component.sidebar.active.background`
- Underline active: `semantic.color.border.active`
- Border/focus: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`, `semantic.color.border.active`
- Radius: `primitive.radius.pill`
- Padding: `primitive.spacing.2`, `primitive.spacing.3`
- Motion: `primitive.motion.fast`

### Auto-layout Constraints

- Tab list direction: horizontal.
- Tab item direction: horizontal or vertical depending on variant.
- Gap between tabs: `spacing.2`.
- Label hugs content.
- Parent handles overflow with horizontal scroll on mobile.

### Accessibility Rules

- Use tablist/tab/tabpanel semantics.
- Arrow keys move between tabs.
- `Home` and `End` jump to first/last where supported.
- Active tab exposes `aria-selected=true`.
- Disabled tab is skipped or announced as unavailable.

### Do / Don't

Do:
- Use tabs for peer-level content only.
- Keep labels short.

Don't:
- Do not mix pill and underline variants in one tab group.
- Do not use tabs as breadcrumbs or primary navigation.

### Variant Count

2 variants x 5 states = **10**

---

## Future Figma Generation Plan

When MCP quota resets:

1. Create page `03 Atomic Components`.
2. Reuse collection `Dashboard Admin Tokens`.
3. Create one section per family.
4. Generate component sets in this order:
   - Buttons
   - Icon Buttons
   - Inputs
   - Textareas
   - Selects / Dropdowns
   - Checkboxes
   - Switches
   - Badges
   - Chips
   - Labels
   - Dividers
   - Progress Bars
   - Tooltips
   - Tabs Primitives
5. Bind fills, strokes, radius, spacing and motion references to tokens.
6. Add documentation cards: Anatomy, Do, Don't.
7. Validate:
   - 14 component families.
   - 401 variants.
   - No hardcoded visual colors.
   - Auto-layout on every root component.
   - Naming format: `Atomic/<Family>` with variant properties in `Property=Value` style.

## Phase 3C Visual Relaunch Status

Architecture status: **ready**  
Figma quota dependency: **blocked until MCP reset or plan upgrade**  
Next step after reset: relaunch Phase 3C visual generation from this spec.
