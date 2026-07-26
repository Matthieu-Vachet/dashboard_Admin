# Rapport — Motion System

Date : 26 juillet 2026. Statut : `completed`.

## Résultat

Le Dashboard possède désormais trois durations, trois easings, des constantes Framer finies et une politique reduced-motion globale CSS + Framer. Les 69 sites UI génériques sont connectés au contrat ; les feedbacks fonctionnels et motions métier restent séparés.

La couverture Motion passe de **0 % à 100 %** et la couverture reduced-motion de **13,13 % à 100 %**. Le sprint ne modifie ni texte, ni donnée, ni handler, ni logique métier, ni API publique, ni sémantique ou structure de DOM.

## Contrats adoptés

- durations : `fast` 150 ms, `normal` 200 ms et `slow` 300 ms ;
- easings : `standard`, `enter` et `exit` ;
- Tailwind : défaut global fast/standard, avec `duration-motion-fast|normal|slow` pour les choix explicites ;
- Framer : constantes secondes partagées et spring drawer inchangé (damping 26, stiffness 260) ;
- reduced-motion : transitions CSS à 0,01 ms, délais nuls, smooth scroll neutralisé, loops spin/pulse/sheen/energy-scan arrêtées et `MotionConfig reducedMotion="user"` ;
- exceptions : DnD, progressions, graphiques, boucles Pokémon et feedbacks fonctionnels conservent leurs recettes lorsque l’information ou la géométrie l’exige.

## Migration

- neuf durées Tailwind 150/200/300 ms deviennent des rôles sémantiques ;
- les deux transitions CSS `motion-border` consomment normal/standard ;
- les deux durées Framer génériques du menu palette et du dialog historique consomment les constantes ;
- le spring du drawer devient une recette partagée sans changer ses valeurs ;
- Provider, Button, shell/sidebar, palette, dialog historique, Dashboard et quatre consommateurs Admin Pokémon sont alignés ;
- 13 fichiers source sont touchés, dont `globals.css` et le nouveau contrat `src/lib/motion.ts` ;
- les deux assertions historiques Modal sont synchronisées avec le contrat sans rouvrir focus, ARIA ou structure Modal.

## Avant / après

| Métrique | Avant | Après |
|---|---:|---:|
| Motion UI canonique | 0 / 69 | 69 / 69 |
| Couverture Motion | 0 % | 100 % |
| Reduced-motion | 13 / 99 | 99 / 99 |
| Couverture reduced-motion | 13,13 % | 100 % |
| Arbitrary duration/easing générique | 2 | 0 |
| `transition-all` | 0 | 0 |
| Feedbacks fonctionnels | 13 | 13 |
| Métier/décoratif/ambigu | 59 | 59 |

## Performance

- les transitions génériques privilégient les propriétés ciblées de Tailwind, transform et opacity ;
- aucune nouvelle animation width/height, top/left ou box-shadow en boucle n’est créée ;
- quatre transitions width existantes et les visualisations Framer restent des feedbacks bornés ;
- en reduced-motion, les boucles CSS/Tailwind sont arrêtées et les transforms/layout Framer suivent la préférence utilisateur ;
- aucun budget Core Web Vitals ou benchmark GPU n’existe dans le projet, donc aucun gain chiffré n’est revendiqué.

## Validation

- garde-fou Motion : 6/6 tests ;
- suites Design System Badge, Button, Card, Color, Field, Modal, Motion, Select/Checkbox, State System, Typography et Visual Consistency : 83/83 tests ;
- TypeScript : succès, 0 erreur ;
- ESLint global : 0 erreur, 62 avertissements préexistants ; lint ciblé : 0 erreur, CSS ignoré par la configuration ;
- build Next.js : succès, 34 pages statiques, avec l’avertissement Turbopack/NFT préexistant ;
- Playwright : 96 captures, soit huit parcours × normal/reduced × dark/light × 375×812, 768×1024 et 1440×1000 ; 48 contrôles reduced-motion, 32 interactions, 0 overflow et 0 erreur console/page ;
- inspection manuelle : Dashboard normal/reduced sombre mobile, Modal reduced sombre tablette et Events normal clair desktop conformes ;
- revue React : aucun hook, handler, balise ou état ajouté ; constantes de transition stables hors rendu ;
- `git diff --check` : succès.

## Synchronisation Foundation

- DOC inspectés : DOC-001, DOC-004, DOC-010, DOC-011, DOC-021, DOC-022 et DOC-023 ;
- DOC-010 modifié : propriétaire du Design System Motion, il décrit les durations, easings, exceptions et la politique reduced-motion réellement implémentés ;
- DOC-011 modifié : le Dashboard référence le contrat Motion consommé par le shell, les primitives et Framer ;
- DOC-021 modifié : le registre Testing mentionne les 83 assertions Design System et les campagnes visuelles de sprint, dont les 96 captures Motion ;
- DOC-022 modifié : le contrat Performance décrit les propriétés privilégiées et la réduction globale des animations, sans inventer de benchmark ;
- DOC-001 et DOC-004 laissés inchangés : aucune règle de projet ni philosophie n’évolue ;
- DOC-023 laissé inchangé : trois viewports sont validés mais aucun breakpoint ni contrat responsive n’est modifié.

Code, Design System Program et Foundation décrivent le même état actuel. Aucun identifiant DOC, RULE, COMP ou ADR n’a été créé.

## Dette restante

- 13 feedbacks fonctionnels et 59 sites métier/décoratifs/ambigus restent intentionnellement spécialisés ;
- les visualisations Framer width/height restent bornées mais ne possèdent pas de benchmark GPU ;
- GSAP reste déclaré sans être absorbé par ce contrat Dashboard ;
- l’avertissement Turbopack/NFT et les 62 avertissements ESLint restent hors périmètre ;
- Responsive System reste planifié et sera lancé uniquement après le message utilisateur « reprend ».

## Rollback

Le rollback retire d’abord les rôles des consommateurs, restaure les durées littérales, retire MotionConfig et les constantes Framer, puis les variables/utilitaires CSS. Les animations fonctionnelles et métier restent présentes.

## Git

Le lot est destiné au commit unique `feat(design-system): unify motion system`, puis à un push normal de `main`. Le hash, le déploiement et l’état distant sont contrôlés après le commit ; aucun force push n’est autorisé.
