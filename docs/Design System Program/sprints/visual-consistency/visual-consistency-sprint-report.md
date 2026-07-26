# Rapport — Visual Consistency

Date : 26 juillet 2026. Statut : `completed`.

## Résultat

Le Dashboard possède désormais un contrat durable pour le spacing générique, trois rôles de radius et cinq niveaux d’élévation. Les surfaces compatibles restent des `Card`; le wrapper métier Panel conserve son anatomie et consomme les rôles visuels. Aucune primitive `Surface` concurrente n’a été créée.

La couverture Visual Consistency passe de **98,83 % à 100 %**. Le sprint ne modifie ni texte, ni donnée, ni handler, ni logique métier, ni API publique, ni structure de DOM.

## Contrats adoptés

- spacing : échelle Tailwind existante, avec interdiction d’une valeur arbitraire générique lorsqu’un équivalent existe ;
- radius : `rounded-control`, `rounded-surface`, `rounded-overlay`, tous initialisés à 8 px ;
- elevation : `shadow-surface`, `shadow-raised`, `shadow-strong`, `shadow-overlay`, `shadow-floating`, avec recettes dark/light distinctes ;
- surfaces : `Card` reste la primitive générique; Panel reste un wrapper métier; les 16 recettes flat incompatibles restent locales ;
- exceptions : pills, géométries métier, glows colorés, artwork, drop shadows, styles dynamiques et offsets de shell ne sont pas absorbés.

Les rôles radius et elevation possèdent des `@utility` explicites. Cette définition évite que `shadow-overlay` soit interprété comme une simple couleur d’ombre à cause du token couleur `overlay`.

## Migration

- `gap-[normal]` devient `gap-2`, seule correction de spacing générique certaine ;
- Button, Card, Input, Textarea, Select, Modal et State System consomment les rôles radius ;
- Modal et les dialogs sûrs consomment `shadow-overlay` ;
- les panels et cards spécialisées neutres consomment `shadow-surface` ou `shadow-raised` ;
- `glass-panel`, `glass-panel-strong`, le menu de palette et les recettes light correspondantes consomment les variables d’élévation ;
- 30 fichiers source sont touchés, dont `globals.css`, neuf composants UI/partagés et les consommateurs Events, Kanban, Dashboard et Admin Pokémon listés par le diff Git.

## Inventaire avant / après

| Famille | Avant | Après |
|---|---:|---:|
| Spacing générique canonique | 3 420 / 3 421 (99,97 %) | 3 421 / 3 421 (100 %) |
| Radius générique canonique | 653 / 653 (100 %) ; 0 rôle | 656 / 656 (100 %) ; 44 usages de rôle |
| Élévation UI canonique | 44 / 93 (47,31 %) | 108 / 108 (100 %) ; 62 usages sémantiques/CSS |
| Surfaces génériques | 117 / 117 (100 %) | 117 / 117 (100 %) |
| **Couverture consolidée** | **98,83 %** | **100 %** |

## Validation

- garde-fou Visual Consistency : 6/6 tests ;
- suites Design System impactées Badge, Button, Card, Color, Field, accessibilité formulaires, Modal, Select/Checkbox, State System et Visual : 77/77 tests ;
- TypeScript : succès, 0 erreur ;
- ESLint ciblé : 0 erreur, 46 avertissements `no-img-element` préexistants dans des consommateurs historiques ;
- build Next.js : succès, 34 pages statiques, avec l’avertissement Turbopack/NFT préexistant ;
- Playwright : 102 captures, soit 17 parcours × dark/light × 375×812, 768×1024 et 1440×1000 ; 0 overflow horizontal, 0 erreur console/page, rôles calculés présents et Modal testé au clavier ;
- inspection manuelle : Dashboard sombre mobile, Admin clair desktop, Modal sombre tablette et Events clair mobile conformes ;
- `git diff --check` : succès.

Le binaire complémentaire `agent-browser` n’est pas installé dans l’environnement. Aucun contournement ni installation n’a été tenté : la campagne Playwright locale couvre directement les 102 scénarios et les assertions de style, overflow, focus et erreurs runtime.

## Synchronisation Foundation

- DOC inspectés : DOC-001, DOC-004, DOC-010, DOC-011 et DOC-023 ;
- DOC-010 modifié : propriétaire du contrat Design System, il décrit désormais l’échelle de spacing réellement utilisée, les trois rôles radius, les cinq élévations et l’état courant de Card/surfaces ;
- DOC-011 modifié : l’inventaire Dashboard est réaligné sur les neuf familles partagées et les contrats visuels effectivement consommés ;
- DOC-001 et DOC-004 laissés inchangés : les règles de projet et la philosophie ne sont pas modifiées ;
- DOC-023 laissé inchangé : la matrice Visual valide trois viewports mais ne modifie aucun breakpoint ni contrat responsive durable.

Code, Design System Program et Foundation décrivent le même état actuel. Aucun identifiant DOC, RULE, COMP ou ADR n’a été créé.

## Dette restante

- six spacings structurels/safe-area et 11 rayons métier restent locaux et justifiés ;
- 90 ombres/glows décoratifs ou métier restent hors hiérarchie d’élévation ;
- les valeurs sémantiques radius sont identiques aujourd’hui et pourront évoluer indépendamment ;
- la typographie, le motion system et le responsive global restent à leurs sprints dédiés.

## Rollback

Le rollback est découpable : supprimer d’abord les classes sémantiques des consommateurs, rétablir les classes primitives, puis retirer les utilitaires et variables de `globals.css`. Aucun schéma, donnée ou migration serveur n’est impliqué.

## Git

Le lot est destiné au commit unique `feat(design-system): unify visual consistency contracts`, puis à un push normal de `main`. Le hash et l’état distant sont contrôlés par l’orchestrateur après création du commit ; aucun force push n’est autorisé.
