# Contrat des tokens couleur

Source d'exécution : `src/app/globals.css`. Les valeurs dark vivent dans `:root`, les valeurs Light dans `.light`, et `@theme inline` expose les utilities Tailwind. Les huit palettes runtime surchargent les accents via `src/data/dashboard-palettes.ts` et le hook de thème existant.

`U` est le nombre de références lexicales relevées après migration, mapping CSS compris. `C` signifie conservé, `N` créé pendant ce sprint.

## Fond, texte et contraste

| Token | Dark | Light | Rôle | U | Statut |
|---|---|---|---|---:|---|
| `--background` | `#05060d` | `#f3f8ff` | fond global | 9 | C |
| `--foreground` | `#eef3ff` | `#101827` | texte principal | 132 | C |
| `--foreground-secondary` | `oklch(86.9% .022 252.894)` | `#334155` | texte secondaire | 96 | N |
| `--muted` | `oklch(70.4% .04 256.788)` | `#526177` | texte atténué | 459 | C, rôle clarifié |
| `--disabled` | `oklch(55.4% .046 257.417)` | `#64748b` | contenu désactivé/faible | 137 | N |
| `--inverse` | `#fff` | `#fff` | texte sur fond sombre stable | 9 | N |
| `--on-accent` | `oklch(12.9% .042 264.695)` | `#020617` | texte sur accent clair | 11 | N |
| `--domain-foreground` | `#fff` | `var(--foreground)` | contraste des surfaces métier | 256 | N, domaine |

Contrastes mesurés contre `background` : dark `foreground` 18,20:1, secondaire 13,62:1, muted 7,89:1, disabled 4,25:1 ; Light 16,65:1, 9,70:1, 5,90:1 et 4,46:1. Le rôle disabled peut rester sous 4,5:1 en dark car il ne doit pas porter seul une information active.

## Surfaces et interactions

| Token | Dark | Light | Rôle | U | Statut |
|---|---|---|---|---:|---|
| `--panel` | `rgba(13,17,31,.74)` | `rgba(255,255,255,.86)` | surface glass par défaut | 10 | C |
| `--panel-strong` | `rgba(18,24,43,.9)` | `rgba(255,255,255,.97)` | surface élevée/forte | 8 | C |
| `--surface-faint` | `white .035` en `oklab` | `rgba(255,255,255,.82)` | couche legacy la plus faible | 45 | N |
| `--surface-minimal` | `white .04` en `oklab` | `rgba(255,255,255,.82)` | couche minimale | 51 | N |
| `--surface-flat` | `white .045` en `oklab` | `rgba(255,255,255,.82)` | Card flat | 41 | N |
| `--surface-subtle` | `white .055` en `oklab` | `rgba(255,255,255,.82)` | surface secondaire | 46 | N |
| `--surface-control` | `white .06` en `oklab` | `rgba(255,255,255,.82)` | champ/contrôle | 55 | N |
| `--surface-control-focus` | `white .09` en `oklab` | `rgba(255,255,255,.82)` | contrôle focus | 3 | N |
| `--surface-interactive` | `white .075` en `oklab` | `rgba(255,255,255,.82)` | action secondaire | 2 | N |
| `--surface-hover` | `white .08` en `oklab` | `rgba(255,255,255,.82)` | hover neutre | 2 | N |
| `--surface-interactive-hover` | `white .11` en `oklab` | `rgba(255,255,255,.82)` | action secondaire hover | 2 | N |
| `--surface-emphasis` | `white .10` en `oklab` | `rgba(255,255,255,.10)` | piste/pill emphatique | 52 | N |
| `--surface-recessed` | `black .15` en `oklab` | `rgba(0,0,0,.15)` | couche creusée | 20 | N |
| `--surface-inset-subtle` | `slate-950 .30` | `rgba(255,255,255,.9)` | inset faible | 13 | N |
| `--surface-inset` | `slate-950 .35` | `rgba(255,255,255,.9)` | inset par défaut | 62 | N |
| `--surface-inset-medium` | `slate-950 .40` | `rgba(255,255,255,.9)` | inset moyen | 17 | N |
| `--surface-inset-strong` | `slate-950 .45` | `rgba(255,255,255,.9)` | inset fort | 36 | N |

`panel`, `panel-strong`, `surface-flat`, `surface-control`, `surface-interactive`, `surface-hover` et les insets constituent les rôles publics. Les niveaux faint/minimal/subtle/emphasis/recessed et medium/strong sont des niveaux de fidélité nécessaires à la migration : ils préservent des recettes dark largement répétées sans prétendre créer une taxonomie de composants.

## Bordures

| Token | Dark | Light | Rôle | U | Statut |
|---|---|---|---|---:|---|
| `--line-subtle` | `white .08` en `oklab` | `rgba(15,23,42,.10)` | bordure faible | 17 | N |
| `--line` | `rgba(255,255,255,.10)` | `rgba(15,23,42,.14)` | bordure par défaut | 521 | C |
| `--line-medium` | `white .15` en `oklab` | `rgba(15,23,42,.20)` | bordure moyenne | 42 | N |
| `--line-strong` | `rgba(255,255,255,.18)` | `rgba(15,23,42,.24)` | bordure forte | 5 | C |

## Marque et accents

| Token | Dark | Light | Rôle | U | Statut |
|---|---|---|---|---:|---|
| `--brand` | `#905bf4` | `#7c3aed` | marque violette | 63 | C |
| `--brand-2` | `#20d3ff` | `#0284c7` | marque cyan | 280 | C |
| `--brand-3` | `#58f2a9` | `#059669` | marque verte | 133 | C |
| `--accent-primary` | `#20d3ff` | `#0284c7` | accent actif runtime | 1 | C, alias palette |
| `--accent-secondary` | `#905bf4` | `#7c3aed` | accent secondaire runtime | 1 | C, alias palette |
| `--accent-tertiary` | `#58f2a9` | `#059669` | accent tertiaire runtime | 3 | C, alias palette |
| `--accent-muted` | `rgba(32,211,255,.12)` | `rgba(2,132,199,.12)` | fond accent faible | 14 | C |
| `--accent-glow` | `rgba(32,211,255,.28)` | `rgba(2,132,199,.18)` | glow accent | 8 | C |
| `--accent-border` | `rgba(32,211,255,.36)` | `rgba(2,132,199,.34)` | bordure/focus accent | 3 | C |
| `--accent-text` | `#bdf5ff` | `#075985` | texte accent lisible | 3 | C, rôle clarifié |
| `--accent-bg` | `rgba(32,211,255,.12)` | `rgba(2,132,199,.11)` | fond accent piloté par palette | 2 | C |
| `--accent-rgb` | `32 211 255` | `2 132 199` | canaux pour compositions alpha | 1 | C |

`brand-2/brand/brand-3` et `accent-primary/secondary/tertiary` ont les mêmes valeurs par défaut mais pas le même cycle de vie : les premiers sont des repères stables, les seconds sont surchargés par les huit palettes. `accent-muted` et `accent-bg` sont proches, mais `accent-bg` appartient au contrat runtime des palettes ; ils ne sont donc pas fusionnés dans ce sprint.

## Statuts et overlay

| Token | Dark | Light | Rôle | U | Statut |
|---|---|---|---|---:|---|
| `--success` | `#58f2a9` | `#059669` | succès | 7 | N |
| `--success-foreground` | `oklch(95% .052 163.051)` | `#065f46` | texte succès | 4 | N |
| `--warning` | `#ffd166` | `#b7791f` | avertissement | 88 | C |
| `--warning-foreground` | `oklch(96.2% .059 95.617)` | `#92400e` | texte avertissement | 5 | N |
| `--danger` | `#ff5f7d` | `#dc3157` | erreur/destructif | 78 | C |
| `--danger-foreground` | `oklch(94.1% .03 12.58)` | `#9f1239` | texte erreur | 2 | N |
| `--overlay` | `rgba(0,0,0,.65)` | `rgba(0,0,0,.65)` | voile Modal | 2 | N |

Les statuts sont indépendants de la palette active. Ils ne doivent pas être remplacés par `brand-*` ou `accent-*`.

## Cohérence et règles d'usage

- Aucun token supprimé ou fusionné : 21 conservés, 27 créés, 48 actifs.
- Les alias runtime documentés ci-dessus sont intentionnels ; aucun doublon incohérent restant n'a été identifié dans le contrat central.
- Les primitives n'utilisent plus de neutral hardcodé arbitraire.
- `domain-foreground` est le seul pont vers les composants métier ; il ne transforme pas leurs couleurs de données en tokens UI.
- Un nouveau token exige au moins un rôle répété, une paire dark/light vérifiée et l'absence d'équivalent existant.
- Les couleurs Pokémon, Events, gradients d'illustration et séries de données restent hors de ce contrat.
