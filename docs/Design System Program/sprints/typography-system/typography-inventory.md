# Inventaire Typography System

Date de baseline : 26 juillet 2026. Scan : tous les fichiers CSS, JS, JSX, TS et TSX sous `src`.

## Méthode

- `text-*` ne compte comme taille que pour l’échelle `xs` à `9xl` ou une valeur arbitraire; les couleurs `text-*` sont exclues ;
- les dimensions `font-*`, `leading-*`, `tracking-*`, styles CSS et propriétés inline sont comptées séparément ;
- chaque chaîne de classes est classée selon des patterns finis : overline, heading, body, caption/label, rôle sémantique ou métier/décoratif/ambigu ;
- les chaînes Mono, les grands displays spécialisés, code, métriques, visualisations et micro-textes de données ne sont pas absorbés automatiquement.

## Baseline globale

| Dimension | Déclarations |
|---|---:|
| Total Typography | 3 188 |
| Font size | 1 361 |
| Font weight | 1 198 |
| Font family | 200 |
| Line height | 155 |
| Letter spacing | 272 |
| CSS | 2 |
| Inline | 0 |
| Variantes responsive | 54 |

## Distributions principales

Tailles : `text-xs` 500, `text-sm` 389, `text-[10px]` 137, `text-2xl` 60, `text-[9px]` 53, `text-[11px]` 48, `text-3xl` 46, `text-lg` 39, `text-xl` 38 et `text-base` 23.

Graisses : `font-black` 851, `font-bold` 252, `font-semibold` 88, `font-medium` 6 et `font-light` 1. Familles : `font-mono` 198 et `font-sans` 2.

Interlignages : `leading-6` 88, `leading-5` 28, `leading-tight` 15, `leading-none` 7, `leading-4` et `leading-7` 6 chacun.

Tracking : `tracking-[0.16em]` 79, `[0.18em]` 51, `[0.12em]` 31, `[0.14em]` 26, `tracking-wide` 19 et `[0.22em]` 18. Ces variations proches démontrent une dette de rôle overline.

## Classification avant

| Classe | Nombre | Décision |
|---|---:|---|
| Overline générique | 206 | migrer vers overline normal ou compact |
| Heading générique | 117 | migrer vers un niveau de titre fini |
| Body générique | 67 | migrer vers body normal ou strong |
| Caption / Label générique | 219 | migrer vers caption ou label |
| Rôle sémantique | 0 | baseline |
| Métier / décoratif / ambigu | 1 384 | conserver et justifier |

**Typography System Coverage avant : 0/609, soit 0 %.**

## Valeurs arbitraires avant

503 déclarations : 228 tailles, 274 letter-spacings et un line-height. Les tailles dominantes sont 10 px (137), 9 px (53) et 11 px (48). Les autres couvrent six tailles en rem, trois 8 px, quatre `clamp`, un 2,5 rem, un zéro visuel et le display `leading-[0.95]`.

Les valeurs arbitraires génériques intégrées aux 206 overlines sont migrables. Les micro-textes de données, identifiants Mono, badges métier, previews, graphiques, artwork et displays fluides sont hors migration mécanique.

## Familles réelles

Le CSS déclare `"Geist"` et `"Geist Mono"`, mais le layout n’importe aucune fonte et le package n’est pas installé. Le rendu réel utilise donc les fallbacks disponibles. Le contrat cible doit charger Geist Sans et Mono localement via Next.js avant de les annoncer comme source de vérité.

## Figma

Le seul document local `docs/Reports/Audits/design-system-audit/foundations/04-typography.md` est un inventaire historique. Il indique lui-même que le chargement réel de Geist et les métriques glyphes sont introuvables. Aucun fichier source Figma, collection de variables ou export de text styles n’est présent ; aucune synchronisation Figma n’est inventée.

## État validé après migration

| Dimension | Avant | Après |
|---|---:|---:|
| Déclarations Typography | 3 188 | 1 698 |
| Font size | 1 361 | 731 |
| Font weight | 1 198 | 580 |
| Font family | 200 | 200 |
| Line height | 155 | 62 |
| Letter spacing | 272 | 59 |
| CSS | 2 | 66 |
| Variantes responsive | 54 | 36 |
| Valeurs arbitraires | 503 | 236 |

Le scan final classe 1 993 chaînes de classes. Les 618 candidates génériques portent toutes un rôle sémantique et aucun pattern générique legacy ne subsiste. Les 1 375 chaînes restantes sont métier, décoratives ou ambiguës; elles comprennent notamment les 198 usages Mono, les displays spécialisés, les micro-données et les visualisations.

**Typography System Coverage après : 618/618, soit 100 %.** Les 15 rôles totalisent 638 usages, primitives comprises.
