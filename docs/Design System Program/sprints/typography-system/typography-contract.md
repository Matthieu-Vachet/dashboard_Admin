# Contrat Typography System

## Familles

- Geist Sans : navigation, corps, titres, contrôles, tableaux et dialogs ;
- Geist Mono : code, commandes, identifiants, hashes, métriques et timestamps ;
- fallbacks : Inter/system pour Sans, SFMono/ui-monospace pour Mono ;
- aucune troisième famille générique et aucun Geist Pixel dans l’interface d’administration.

Les fontes doivent être auto-hébergées par le package `geist` et chargées depuis `src/app/layout.tsx`. Les variables `--font-geist-sans` et `--font-geist-mono` alimentent les alias Tailwind existants.

## Hiérarchie finie

| Rôle | Mobile | ≥ 640 px | Weight | Line height | Tracking |
|---|---:|---:|---:|---:|---:|
| `type-display` | 36 px | 60 px | 900 | 0,95 | -0,035 em |
| `type-title-page` | 30 px | 36 px | 900 | 1,1 | -0,025 em |
| `type-title-section` | 24 px | 30 px | 900 | 1,2 | -0,02 em |
| `type-title-subsection` | 20 px | 24 px | 900 | 1,25 | -0,015 em |
| `type-title-card` | 18 px | 20 px | 900 | 1,3 | -0,01 em |
| `type-title-inline` | 16 px | 16 px | 900 | 1,5 | normal |
| `type-body` | 14 px | 14 px | 500 | 24 px | normal |
| `type-body-strong` | 14 px | 14 px | 700 | 24 px | normal |
| `type-label` | 12 px | 12 px | 900 | 16 px | normal |
| `type-caption` | 12 px | 12 px | 600 | 20 px | normal |
| `type-caption-strong` | 12 px | 12 px | 700 | 20 px | normal |
| `type-overline` | 12 px | 12 px | 900 | 16 px | 0,16 em |
| `type-overline-compact` | 10 px | 10 px | 900 | 16 px | 0,12 em |
| `type-control` | 14 px | 14 px | 600 | 20 px | normal |
| `type-control-strong` | taille du contrôle | taille du contrôle | 900 | 20 px | normal |

`type-control-strong` laisse les tailles Button `sm/md/lg/icon` piloter `text-xs` ou `text-sm`; il centralise la graisse et l’interlignage. Les rôles de titre intègrent leur progression responsive, sauf displays ou géométries métier explicitement conservés.

## Règles de consommation

- le rôle décrit l’apparence; la balise HTML conserve la sémantique de contenu ;
- CardTitle, Modal, State System et les primitives de contrôle portent les styles génériques ;
- les consommateurs ne réécrivent pas une combinaison que leur primitive possède ;
- la couleur continue de provenir du Color System ;
- Mono ne s’emploie pas pour les paragraphes ;
- overline est uppercase par contrat; caption et label ne le sont pas implicitement ;
- aucune réduction de texte n’est utilisée uniquement pour masquer un overflow.

## Exceptions

Restent locaux : visualisations, calendrier dense, previews Game Master, identifiants/code Mono, ratios et métriques Pokémon, artwork, wordmarks, displays `clamp`, texte visuellement masqué `0px` et labels sous 12 px dont la densité métier est démontrée. Ils restent mesurés dans l’inventaire et doivent conserver zoom, wrapping ou scroll.
