# Contrat elevation / shadow

## Niveaux

| Rôle | Utility / variable | Usage |
|---|---|---|
| Surface | `shadow-surface` / `--elevation-surface` | sous-surface neutre, Card légère |
| Raised | `shadow-raised` / `--elevation-raised` | Card glass et Panel |
| Strong | `shadow-strong` / `--elevation-strong` | Card forte ou accentuée |
| Overlay | `shadow-overlay` / `--elevation-overlay` | Modal et dialog |
| Floating | `shadow-floating` / `--elevation-floating` | menu/popover flottant |

Les valeurs dark et light sont distinctes afin de préserver la perception de profondeur. Les ombres ne remplacent jamais le focus visible.

## Hors contrat

Les glows Pokémon, shiny, type, statut, accent, artwork, drag et sélection restent décoratifs ou métier. Les `drop-shadow` d’images ne sont pas des niveaux d’élévation. Les styles dynamiques fondés sur une couleur de données restent locaux.

## Migration

Les recettes génériques de `glass-panel`, `glass-panel-strong`, Panel, Modal/dialog et menu de palette consomment les cinq niveaux. Les ombres colorées et les variations de domaine ne sont pas normalisées.
