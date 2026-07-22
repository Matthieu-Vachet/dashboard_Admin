# Taxonomie des surfaces

La taxonomie décrit le code observé. Elle ne crée pas automatiquement des variantes de primitive.

| Catégorie observée | Implémentation courante | Décision Card |
|---|---|---|
| Surface glass standard | `Card` soft / `glass-panel` | canonique |
| Surface glass forte | `Card` strong / `glass-panel-strong` | canonique |
| Surface flat | border sémantique + `bg-white/[0.045]`, sans shadow/blur | nouveau ton fini `flat` |
| Surface legacy | `border-white/10`, `bg-white/[0.055]`, `rounded-2xl`, shadow 0 22 90 | conserver `Panel` et préparer Color System |
| Surface interactive | button/link/card sélectionnable, hover/focus/drag | conserver le composant métier |
| Surface métier | palettes Pokémon/Events, gradients, assets, glows, styles dynamiques | conserver |
| Surface inset | sous-bloc, table, editor, toolbar, message ou progress track | ne pas promouvoir en Card |
| Overlay | modal, drawer, preview, sheet | hors famille Card |

## Color System Preparation

### Tokens existants à conserver

- `--background`, `--panel`, `--panel-strong` ;
- `--line`, `--line-strong` ;
- `--foreground`, `--muted` ;
- accents de palette et `glass-panel|glass-panel-strong`.

### Hardcodes structurants à transmettre

- `bg-white/[0.045]` : flat surface du lot migré ;
- `bg-white/[0.055]` et `border-white/10` : langage legacy dominant ;
- `bg-slate-950/*` : surfaces inset et Admin Pokémon ;
- hex `#07111f`, `#101522`, `#050816` : Events, Kanban et previews ;
- ombre legacy `0 22px 90px rgba(0,0,0,.24)` ;
- ombres/glows cyan, violet, type Pokémon et états warning/danger.

### Exceptions métier

Les couleurs de types Pokémon, raids, œufs, météo, Team Rocket, shiny, événements et états de données ne doivent pas être absorbées par des tokens de surface génériques sans analyse sémantique. Les styles inline fondés sur les types et assets restent métier.

### Préparation, pas migration

Ce sprint ne modifie ni variables CSS, ni `globals.css`, ni palette dark/light. Le futur Color System devra comparer les valeurs calculées des hardcodes dans les deux thèmes avant toute fusion avec `panel`, `line` ou les accents.

Le scan lexical final de `src` relève notamment 39 `bg-white/[0.045]`, 45 `bg-white/[0.055]`, 307 `border-white/10`, 186 `bg-slate-950*` sur 27 formes, 327 littéraux hexadécimaux sur 114 valeurs et 105 ombres arbitraires. Ces nombres sont des occurrences de code, pas des tokens ni des surfaces distinctes.
