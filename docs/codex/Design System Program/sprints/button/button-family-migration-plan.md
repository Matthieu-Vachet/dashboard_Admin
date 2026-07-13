# Plan de migration — famille Button

## Baseline d’inventaire

Un site est une racine JSX qui est soit un usage direct de la primitive canonique, soit un `<button>` natif, soit un `role="button"`, soit un lien stylé comme contrôle. Les lignes sont celles du code avant migration.

| Mesure | Total avant migration |
|---|---:|
| Sites d’action recensés | 291 |
| Usages directs de `Button` | 92 |
| `<button>` natifs | 184 |
| `role="button"` non natifs | 0 |
| Liens stylés comme contrôles | 15 |
| Sites icon-only | 39 |
| Composants nommés Button/Action/Trigger/Toggle/Control/Link | 10 |
| Catégorie A | 88 |
| Catégorie B | 8 |
| Catégorie C | 95 |
| Catégorie D | 100 |

Les huit sites B correspondent aux deux branches de `ExternalButton`, à `LoadMoreButton`, à `EventButton`, à `ToolbarButton` et aux trois branches JSX de `ProgressButton`.

## Groupes de migration autorisés

### Groupe 1 — ExternalButton

Composer `Button asChild` dans les branches interne et externe, sans supprimer `ExternalButton`. Conserver exactement `Link`/`a`, `href`, `target`, `rel`, texte, icône et classes visuelles. L’implémentation n’est autorisée que si la baseline confirme que les classes de compatibilité reproduisent default, hover et focus. Les classes ajoutées doivent rester locales au wrapper.

### Groupe 2 — LoadMoreButton

Évaluer la composition avec `Button` sans toucher à la palette legacy. La migration n’est autorisée que si le bouton demeure `type="button"`, si le clic incrémente une seule fois, si le texte et les dimensions sont identiques, et si dark/light plus la surface Pokémon sont strictement équivalents. À défaut, documenter et différer vers l’adaptateur Admin Pokémon.

## Exclusions explicites

- `EventButton`, `ToolbarButton` et `ProgressButton` restent inchangés.
- Aucun toggle, chip, navigation, tab, carte cliquable, drag handle, action de modal ou contrôle riche de catégorie C n’est migré.
- Les 100 cas D restent documentés ; leur ressemblance ne suffit pas.
- Aucun variant `business`, `rounded`, `compact`, `glow`, `fullWidth`, `active` ou `loading` n’est ajouté.
- Aucun wrapper ni composant n’est supprimé.

## Baseline et gates

Avant source, exécuter le test statique puis capturer dashboard, Kanban, calendrier, Admin Pokémon et projets dans dark/light, aux viewports 375 × 812, 768 × 1024 et 1440 × 1000. Mesurer tag/type/disabled/ARIA/href/target/rel, focusables, overflow et styles default/hover/focus ; couvrir un icon-only, une modale simple et un disabled réel.

La comparaison après migration doit être stricte sur les cibles migrées et ne tolère aucune nouvelle erreur console/React, différence de tab order ou overflow. Une variation globale ne peut être tolérée que si la cible et ses styles restent strictement identiques et que l’écart est quantifié comme anticrénelage hors cible.

## Rollback local

Pour chaque wrapper migré, rétablir uniquement sa racine précédente et retirer uniquement l’import devenu inutilisé. Conserver l’inventaire et les tests s’ils restent utiles. Ne toucher à aucun autre fichier.
