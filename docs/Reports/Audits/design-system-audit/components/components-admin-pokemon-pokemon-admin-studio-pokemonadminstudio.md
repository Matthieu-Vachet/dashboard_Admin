---
id: MWI-COMP-190
component: "PokemonAdminStudio"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pokemon-admin-studio.tsx"
lines: 5-7
figma_priority: 34
evidence: static_code
---

# PokemonAdminStudio

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pokemon-admin-studio.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-190`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-admin-studio.tsx`:5.
- File range: lines 5–7.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/admin/pokemon/admin-app | AdminApp | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-012 | [PokemonAdminPage](../components/app-dashboard-pokemon-admin-page-pokemonadminpage.md) (MWI-COMP-012) | Renders/imports this component |
| MWI-COMP-308 | [PokemonAdminStudio](../components/components-pokemon-admin-pokemon-admin-studio-pokemonadminstudio.md) (MWI-COMP-308) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <AdminApp />

Unique HTML/React tags: `AdminApp`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| Not found | Not found | Not found |

Exact parameter signature:

```tsx
Not found
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Warning, Success.
- Text properties: Not found.
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Alignment utilities: `items-center, justify-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(${channel(color.r)`, `rgba(${r}, ${g}, ${b}, ${a})`, `rgba(0,0,0,.24)`, `rgba(103,232,249,.16)`, `rgba(110,231,183,.15)`, `rgba(14,165,233,.26)`, `rgba(148,163,184,.35)`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.7)`, `rgba(15,23,42,.76)`, `rgba(15,23,42,.86)`, `rgba(15,23,42,.89)`, `rgba(167,139,250,.1)`, `rgba(167,139,250,.15)`, `rgba(196,181,253,.15)`, `rgba(2,6,23,.58)`, `rgba(2,6,23,.68)`, `rgba(2,6,23,.78)`, `rgba(2,6,23,.86)`, `rgba(2,6,23,.93)`, `rgba(248,113,113,.15)`, `rgba(248,250,252,.82)`, `rgba(251,146,60,.1)`, `rgba(251,191,36,.14)`, `rgba(253,186,116,.16)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.9)`, `rgba(34,211,238,.1)`, `rgba(34,211,238,.16)`, `rgba(52,211,153,.1)`, `rgba(52,211,153,.14)`, `rgba(56,189,248,.16)`, `rgba(8,13,25,.52)` |
| Spacing | `gap-2`, `p-4`, `px-4`, `py-2`, `sm:p-5` |
| Sizing | `min-h-11`, `min-h-12`, `w-full` |
| Typography | `font-black`, `font-bold`, `placeholder:text-slate-500`, `text-amber-100`, `text-amber-100/74`, `text-amber-50`, `text-cyan-100`, `text-cyan-100/72`, `text-cyan-50`, `text-emerald-100`, `text-emerald-100/72`, `text-emerald-50`, `text-fuchsia-100`, `text-indigo-100`, `text-orange-100`, `text-orange-50`, `text-red-100`, `text-red-100/74`, `text-red-50`, `text-rose-100`, `text-sky-100`, `text-sky-100/72`, `text-sky-50`, `text-slate-200`, `text-sm`, `text-stone-100`, `text-violet-100`, `text-violet-100/72`, `text-violet-50`, `text-white`, `text-yellow-100` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-amber-200/16`, `border-amber-200/20`, `border-amber-200/22`, `border-amber-200/25`, `border-amber-200/30`, `border-amber-300/35`, `border-amber-300/45`, `border-cyan-200/16`, `border-cyan-200/20`, `border-cyan-200/24`, `border-cyan-200/25`, `border-cyan-200/30`, `border-cyan-200/45`, `border-emerald-200/16`, `border-emerald-200/20`, `border-emerald-200/24`, `border-emerald-200/25`, `border-emerald-200/30`, `border-emerald-300/35`, `border-fuchsia-300/35`, `border-fuchsia-300/45`, `border-indigo-300/45`, `border-orange-200/28`, `border-orange-200/32`, `border-orange-300/45`, `border-red-200/22`, `border-red-200/30`, `border-red-300/45`, `border-rose-200/20`, `border-rose-300/45`, `border-sky-200/20`, `border-sky-200/30`, `border-sky-300/35`, `border-sky-300/45`, `border-slate-200/20`, `border-stone-200/45`, `border-violet-200/16`, `border-violet-200/20`, `border-violet-200/22`, `border-violet-200/25`, `border-violet-200/26`, `border-violet-200/30`, `border-violet-300/35`, `border-violet-300/45`, `border-white/10`, `border-yellow-200/45`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(167,139,250,.1)]`, `shadow-[0_0_22px_rgba(251,146,60,.1)]`, `shadow-[0_0_22px_rgba(34,211,238,.1)]`, `shadow-[0_0_22px_rgba(52,211,153,.1)]`, `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]`, `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`, `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`, `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`, `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/[0.06]`, `bg-amber-400/[0.075]`, `bg-amber-400/10`, `bg-amber-400/12`, `bg-amber-400/14`, `bg-amber-400/15`, `bg-amber-500/18`, `bg-cyan-400/[0.055]`, `bg-cyan-400/[0.075]`, `bg-cyan-400/10`, `bg-cyan-400/12`, `bg-cyan-400/14`, `bg-cyan-400/16`, `bg-cyan-400/18`, `bg-emerald-300/16`, `bg-emerald-400/[0.055]`, `bg-emerald-400/[0.075]`, `bg-emerald-400/10`, `bg-emerald-400/12`, `bg-emerald-400/14`, `bg-emerald-400/15`, `bg-emerald-400/16`, `bg-fuchsia-400/15`, `bg-fuchsia-500/18`, `bg-gradient-to-r`, `bg-indigo-500/18`, `bg-orange-400/[0.085]`, `bg-orange-400/18`, `bg-orange-500/18`, `bg-red-400/[0.06]`, `bg-red-400/12`, `bg-red-400/14`, `bg-red-500/18`, `bg-rose-400/10`, `bg-rose-500/18`, `bg-sky-400/[0.055]`, `bg-sky-400/12`, `bg-sky-400/14`, `bg-sky-400/15`, `bg-sky-500/18`, `bg-slate-300/10`, `bg-slate-950/45`, `bg-stone-400/18`, `bg-violet-300/16`, `bg-violet-400/[0.06]`, `bg-violet-400/[0.075]`, `bg-violet-400/[0.08]`, `bg-violet-400/10`, `bg-violet-400/12`, `bg-violet-400/14`, `bg-violet-400/15`, `bg-violet-400/16`, `bg-violet-500/18`, `bg-white/[0.055]`, `bg-white/[0.075]`, `bg-yellow-400/18`, `from-amber-400/15`, `from-amber-400/24`, `from-cyan-400/15`, `from-emerald-400/15`, `from-emerald-400/24`, `from-rose-400/15`, `from-sky-500`, `from-sky-500/24`, `from-violet-400/15`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `to-cyan-400`, `to-slate-900/20`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/[0.075]` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-amber-400/14` | base | static occurrence |
| `bg-amber-400/15` | base | static occurrence |
| `bg-amber-500/18` | base | static occurrence |
| `bg-cyan-400/[0.055]` | base | static occurrence |
| `bg-cyan-400/[0.075]` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/14` | base | static occurrence |
| `bg-cyan-400/16` | base | static occurrence |
| `bg-cyan-400/18` | base | static occurrence |
| `bg-emerald-300/16` | base | static occurrence |
| `bg-emerald-400/[0.055]` | base | static occurrence |
| `bg-emerald-400/[0.075]` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/14` | base | static occurrence |
| `bg-emerald-400/15` | base | static occurrence |
| `bg-emerald-400/16` | base | static occurrence |
| `bg-fuchsia-400/15` | base | static occurrence |
| `bg-fuchsia-500/18` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-indigo-500/18` | base | static occurrence |
| `bg-orange-400/[0.085]` | base | static occurrence |
| `bg-orange-400/18` | base | static occurrence |
| `bg-orange-500/18` | base | static occurrence |
| `bg-red-400/[0.06]` | base | static occurrence |
| `bg-red-400/12` | base | static occurrence |
| `bg-red-400/14` | base | static occurrence |
| `bg-red-500/18` | base | static occurrence |
| `bg-rose-400/10` | base | static occurrence |
| `bg-rose-500/18` | base | static occurrence |
| `bg-sky-400/[0.055]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-sky-400/14` | base | static occurrence |
| `bg-sky-400/15` | base | static occurrence |
| `bg-sky-500/18` | base | static occurrence |
| `bg-slate-300/10` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-stone-400/18` | base | static occurrence |
| `bg-violet-300/16` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/[0.075]` | base | static occurrence |
| `bg-violet-400/[0.08]` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-violet-400/14` | base | static occurrence |
| `bg-violet-400/15` | base | static occurrence |
| `bg-violet-400/16` | base | static occurrence |
| `bg-violet-500/18` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-yellow-400/18` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/16` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-amber-200/22` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-amber-200/30` | base | static occurrence |
| `border-amber-300/35` | base | static occurrence |
| `border-amber-300/45` | base | static occurrence |
| `border-cyan-200/16` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/24` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-cyan-200/45` | base | static occurrence |
| `border-emerald-200/16` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-200/24` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-emerald-300/35` | base | static occurrence |
| `border-fuchsia-300/35` | base | static occurrence |
| `border-fuchsia-300/45` | base | static occurrence |
| `border-indigo-300/45` | base | static occurrence |
| `border-orange-200/28` | base | static occurrence |
| `border-orange-200/32` | base | static occurrence |
| `border-orange-300/45` | base | static occurrence |
| `border-red-200/22` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-red-300/45` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-rose-300/45` | base | static occurrence |
| `border-sky-200/20` | base | static occurrence |
| `border-sky-200/30` | base | static occurrence |
| `border-sky-300/35` | base | static occurrence |
| `border-sky-300/45` | base | static occurrence |
| `border-slate-200/20` | base | static occurrence |
| `border-stone-200/45` | base | static occurrence |
| `border-violet-200/16` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-violet-200/22` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-violet-200/26` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-violet-300/35` | base | static occurrence |
| `border-violet-300/45` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-yellow-200/45` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-amber-400/15` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-4` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `shadow-[0_0_22px_rgba(167,139,250,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(251,146,60,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(34,211,238,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(52,211,153,.1)]` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-100/74` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/72` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-100/72` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-fuchsia-100` | base | static occurrence |
| `text-indigo-100` | base | static occurrence |
| `text-orange-100` | base | static occurrence |
| `text-orange-50` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-red-100/74` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-sky-100/72` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-stone-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-100/72` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-yellow-100` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `transition` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `-`
- `border-amber-200/16 bg-amber-400/[0.075]`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-amber-200/22 bg-amber-400/[0.06]`
- `border-amber-200/22 bg-amber-400/12`
- `border-amber-200/30 bg-amber-400/14 text-amber-50`
- `border-amber-300/35 bg-amber-400/15 text-amber-100`
- `border-amber-300/45 bg-amber-500/18 text-amber-100`
- `border-cyan-200/16 bg-cyan-400/[0.075]`
- `border-cyan-200/20 bg-cyan-400/[0.055]`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-cyan-200/20 bg-cyan-400/12`
- `border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`
- `border-cyan-200/30 bg-cyan-400/14 text-cyan-50`
- `border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]`
- `border-cyan-200/45 bg-cyan-400/18 text-cyan-100`
- `border-emerald-200/16 bg-emerald-400/[0.075]`
- `border-emerald-200/20 bg-emerald-400/[0.055]`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-emerald-200/20 bg-emerald-400/12`
- `border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`
- `border-emerald-200/30 bg-emerald-300/16 text-emerald-50`
- `border-emerald-200/30 bg-emerald-400/14 text-emerald-50`
- `border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]`
- `border-emerald-300/35 bg-emerald-400/15 text-emerald-100`
- `border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100`
- `border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100`
- `border-indigo-300/45 bg-indigo-500/18 text-indigo-100`
- `border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]`
- `border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]`
- `border-orange-300/45 bg-orange-500/18 text-orange-100`
- `border-red-200/22 bg-red-400/[0.06]`
- `border-red-200/22 bg-red-400/12`
- `border-red-200/30 bg-red-400/14 text-red-50`
- `border-red-300/45 bg-red-500/18 text-red-100`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-rose-300/45 bg-rose-500/18 text-rose-100`
- `border-sky-200/20 bg-sky-400/[0.055]`
- `border-sky-200/20 bg-sky-400/12`
- `border-sky-200/30 bg-sky-400/14 text-sky-50`
- `border-sky-300/35 bg-sky-400/15 text-sky-100`
- `border-sky-300/45 bg-sky-500/18 text-sky-100`
- `border-slate-200/20 bg-slate-300/10 text-slate-200`
- `border-stone-200/45 bg-stone-400/18 text-stone-100`
- `border-violet-200/16 bg-violet-400/[0.075]`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `border-violet-200/22 bg-violet-400/[0.06]`
- `border-violet-200/22 bg-violet-400/12`
- `border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`
- `border-violet-200/30 bg-violet-300/16 text-violet-50`
- `border-violet-200/30 bg-violet-400/14 text-violet-50`
- `border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]`
- `border-violet-300/35 bg-violet-400/15 text-violet-100`
- `border-violet-300/45 bg-violet-500/18 text-violet-100`
- `border-yellow-200/45 bg-yellow-400/18 text-yellow-100`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `text-amber-100/74`
- `text-cyan-100/72`
- `text-emerald-100/72`
- `text-red-100/74`
- `text-sky-100/72`
- `text-violet-100/72`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
}
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorChannel
function colorChannel(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(255, Math.round(numeric <= 1 ? numeric * 255 : numeric)));
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToCss
function colorToCss(color) {
  if (!color) return "rgba(148,163,184,.35)";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToHex
function colorToHex(color) {
  const normalized = normalizeColor(color);
  if (!normalized) return "";
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToLabel
function colorToLabel(color) {
  if (!color) return "-";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#normalizeColor
function normalizeColor(color) {
  if (!color || typeof color === "string") return null;
  return {
    r: colorChannel(color.r ?? color.red),
    g: colorChannel(color.g ?? color.green),
    b: colorChannel(color.b ?? color.blue),
    a: Math.max(0, Math.min(1, Number(color.a ?? color.alpha ?? 1))),
  };
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#variantTone
function variantTone(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  if (kind === "dynamax") return "border-sky-300/35 bg-sky-400/15 text-sky-100";
  if (kind === "gigantamax") return "border-violet-300/35 bg-violet-400/15 text-violet-100";
  if (kind === "mega") return "border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100";
  if (kind === "form") return "border-amber-300/35 bg-amber-400/15 text-amber-100";
  return "border-emerald-300/35 bg-emerald-400/15 text-emerald-100";
}
```

```tsx
src/components/admin/pokemon/catalog-panel.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.86), rgba(15,23,42,.76)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.86), rgba(2,6,23,.78))";
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantModes
collectionVariantModes = [
  ["multi", "Multi variante"],
  ["single", "Non variante"],
]
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantRank
function collectionVariantRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "form") return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#entryMatchesVariantMode
function entryMatchesVariantMode(entry, variantMode) {
  if (entry.collectionType === "event") return true;
  if (variantMode !== "single") return true;
  return String(entry.kind || "").toLowerCase() === "pokemon" && String(entry.form || "normal").toLowerCase() === "normal";
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

```tsx
src/components/admin/pokemon/dataset-event-banner.jsx#statusTone
function statusTone(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("ongoing") || value.includes("current") || value.includes("cours")) {
    return "border-emerald-200/30 bg-emerald-300/16 text-emerald-50";
  }
  if (value.includes("upcoming") || value.includes("venir")) {
    return "border-violet-200/30 bg-violet-300/16 text-violet-50";
  }
  return "border-slate-200/20 bg-slate-300/10 text-slate-200";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadgeConfig
assetBadgeConfig = {
  female: ["♀", "Femelle", "border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100"],
  male: ["♂", "Mâle", "border-sky-300/45 bg-sky-500/18 text-sky-100"],
  event: ["✦", "Event", "border-amber-300/45 bg-amber-500/18 text-amber-100"],
  mega: ["Μ", "Méga", "border-violet-300/45 bg-violet-500/18 text-violet-100"],
  primal: ["Ω", "Primo", "border-orange-300/45 bg-orange-500/18 text-orange-100"],
  alola: ["A", "Alola", "border-yellow-200/45 bg-yellow-400/18 text-yellow-100"],
  galar: ["G", "Galar", "border-indigo-300/45 bg-indigo-500/18 text-indigo-100"],
  hisui: ["H", "Hisui", "border-stone-200/45 bg-stone-400/18 text-stone-100"],
  paldea: ["P", "Paldea", "border-rose-300/45 bg-rose-500/18 text-rose-100"],
  dynamax: ["D", "Dyna", "border-red-300/45 bg-red-500/18 text-red-100"],
  gigantamax: ["G", "Giga", "border-red-300/45 bg-red-500/18 text-red-100"],
  shiny: ["✦", "Shiny", "border-cyan-200/45 bg-cyan-400/18 text-cyan-100"],
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadges
function assetBadges(asset = {}) {
  const form = String(asset.form || asset.detail || "").toLowerCase();
  const costume = String(asset.costume || "").trim();
  const badges = [];
  if (isFemaleAsset(asset)) badges.push("female");
  if (isMaleAsset(asset)) badges.push("male");
  if (costume || (form && !["normal", "standard"].includes(form) && !variantBadgeForForm(form))) badges.push("event");
  if (asset.gigantamax || form.includes("gigantamax")) badges.push("gigantamax");
  const formBadge = variantBadgeForForm(form);
  if (formBadge) badges.push(formBadge);
  return uniqueBadges(badges);
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#cardTones
cardTones = [
  "border-cyan-200/16 bg-cyan-400/[0.075]",
  "border-emerald-200/16 bg-emerald-400/[0.075]",
  "border-violet-200/16 bg-violet-400/[0.075]",
  "border-amber-200/16 bg-amber-400/[0.075]",
]
```

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
src/components/admin/pokemon/detail-modal.jsx#rgbaColor
function rgbaColor(color, alpha = 1) {
  if (!color || typeof color !== "object") return "";
  const channel = (value) => Math.max(0, Math.min(255, Math.round(Number(value || 0) * 255)));
  return `rgba(${channel(color.r)}, ${channel(color.g)}, ${channel(color.b)}, ${color.a ?? alpha})`;
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

```tsx
src/components/admin/pokemon/detail-modal.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.68), rgba(8,13,25,.52)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.7), rgba(2,6,23,.58))";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#uniqueBadges
function uniqueBadges(badges) {
  return [...new Set(badges.filter(Boolean))];
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#variantBadgeForForm
function variantBadgeForForm(form) {
  if (form.includes("mega")) return "mega";
  if (form.includes("primal")) return "primal";
  if (form.includes("alola")) return "alola";
  if (form.includes("galar")) return "galar";
  if (form.includes("hisui")) return "hisui";
  if (form.includes("paldea")) return "paldea";
  if (form.includes("dynamax")) return "dynamax";
  if (form.includes("gigantamax")) return "gigantamax";
  return "";
}
```

```tsx
src/components/admin/pokemon/max-battles-panel.jsx#toneForTier
function toneForTier(id) {
  const tier = Number(String(id).match(/\d+/)?.[0] || 1);
  if (tier >= 5) return "red";
  if (tier === 4) return "violet";
  if (tier === 3) return "amber";
  if (tier === 2) return "green";
  return "cyan";
}
```

```tsx
src/components/admin/pokemon/research-panel.jsx#sectionTones
sectionTones = {
  fieldResearch: "border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]",
  eventResearch: "border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]",
  timedResearch: "border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]",
  specialResearch: "border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]",
}
```

```tsx
src/components/admin/pokemon/research-panel.jsx#taskCategoryTones
taskCategoryTones = {
  fieldResearch: "border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]",
  eventResearch: "border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]",
  timedResearch: "border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]",
  specialResearch: "border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]",
}
```

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

```tsx
src/components/site/pokemon-style.js#pokemonVariantLabel
export function pokemonVariantLabel(entry = {}) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "event") return "Évènement";
  if (kind === "mega") return "Méga";
  if (kind === "dynamax") return "Dynamax";
  if (kind === "gigantamax") return "Gigamax";
  if (kind === "form" && form !== "normal") return form.charAt(0).toUpperCase() + form.slice(1);
  return "Normal";
}
```

```tsx
src/components/site/pokemon-style.js#typeBackground
export function typeBackground(type, catalog = []) {
  return catalogItem(catalog, type)?.assets?.background || null;
}
```

```tsx
src/components/site/pokemon-style.js#typeColors
typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
}
```

```tsx
src/utils/admin/pokemon-entries.js#variantSortRank
function variantSortRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["form", "alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
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

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Warning, Success.
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
