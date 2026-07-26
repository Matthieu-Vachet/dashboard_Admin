# Inventaire Motion System

Date de baseline : 26 juillet 2026. Scan : tous les fichiers CSS, JS, JSX, TS et TSX sous `src`.

## Méthode

- les chaînes statiques sont scannées pour `transition*`, `duration-*`, `ease-*`, `delay-*`, `animate-*` et les variantes `motion-reduce:*` ;
- les transitions, animations et keyframes CSS sont comptées séparément ;
- chaque élément `motion.*`, durée, délai, easing et spring Framer est inventorié ;
- les usages sont classés UI générique, feedback fonctionnel ou métier/décoratif/ambigu ;
- la couverture reduced-motion compte les transitions génériques, boucles Tailwind/CSS et éléments Framer éligibles.

## Baseline globale

| Dimension | Valeur |
|---|---:|
| Déclarations Motion | 183 |
| Transitions Tailwind | 133 |
| Déclarations de durée | 23 |
| Déclarations d’easing | 6 |
| Délais | 9 |
| Animations | 38 |
| Transitions CSS | 2 |
| Animations CSS actives | 2 |
| Keyframes | 2 |
| Éléments Framer | 18 |

## Variantes avant

- durées Tailwind : `duration-150` ×2, `duration-200` ×1, `duration-300` ×6 et `duration-500` ×1 ;
- CSS : 220 ms ×2, 5,5 s et 6 s ;
- Framer : 0,16, 0,18, 0,38, 0,45, 0,48, 0,5 et 18 s, avec délais progressifs ;
- easings : `ease` ×3, `linear` ×2 et un spring ;
- animations : `animate-spin` ×5, `animate-pulse` ×5, `energy-scan` et `sheen` ;
- `transition-all` : 0 ; valeurs arbitraires duration/easing génériques : 2 durées Framer ; quatre propriétés `transition-[width]` restent des feedbacks fonctionnels.

## Classification avant

| Classe | Sites | Décision |
|---|---:|---|
| UI générique | 69 | connecter aux durations/easing et à reduced-motion |
| Feedback fonctionnel | 13 | conserver l’information, aligner seulement lorsque sûr |
| Métier / décoratif / ambigu | 59 | conserver et documenter |

**Motion System Coverage avant : 0/69, soit 0 %.** Le contrat reduced-motion couvre 13/99 sites éligibles, soit 13,13 %. Framer ne possède pas de politique globale et `animated-sheen` n’est pas réduit.

## État validé après migration

| Dimension | Avant | Après |
|---|---:|---:|
| Déclarations Motion | 183 | 183 |
| UI générique canonique | 0 / 69 | 69 / 69 |
| Durées génériques brutes | 6 sites + 2 Framer | 0 |
| Usages de duration sémantique | 0 | 9 |
| `transition-all` | 0 | 0 |
| Arbitrary duration/easing générique | 2 | 0 |
| Reduced-motion | 13 / 99 (13,13 %) | 99 / 99 (100 %) |

Les 13 feedbacks fonctionnels et 59 sites métier/décoratifs/ambigus restent distincts. Les quatre transitions de propriété `width` sont conservées pour des barres de progression bornées. Les deux keyframes et les boucles `energy-scan`/`sheen` restent présentes en mode normal et sont arrêtées en mode réduit.

**Motion System Coverage après : 69/69, soit 100 %.**

## Sources propriétaires inspectées

Le Programme, Visual Consistency, Typography, Modal, State System, `globals.css`, les primitives UI et tout `src` ont été lus. DOC-010 possède les règles Motion générales; DOC-022 possède les contrats de performance runtime; DOC-023 possède les viewports, sans être encore modifié par ce sprint.
