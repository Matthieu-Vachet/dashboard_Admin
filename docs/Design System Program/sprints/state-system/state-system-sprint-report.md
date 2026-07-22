# Rapport du Sprint State System

Statut : **completed** — validé le 22 juillet 2026.

## Résultat

Le Dashboard dispose désormais de trois contrats réutilisables et finis : `FetchLoadingState`, `EmptyState` et `ErrorState`. Les 78 racines génériques compatibles sont couvertes ; aucune racine générique compatible ne reste hardcodée. Les familles spécialisées ont été préservées.

## Fetch Loading Consolidation

- loaders de fetch génériques trouvés : **15** ;
- loaders animés modernes existants : **2** ;
- pattern retenu : carte stable + `LoaderCircle` centré + texte explicite de la collection Trainer ;
- composant canonique créé : **`FetchLoadingState`**, layouts `section` et `inline` ;
- anciens loaders statiques détectés : **13** ;
- anciens loaders statiques migrés : **13/13** ;
- loaders modernes locaux migrés vers le contrat : **2/2** ;
- wrappers métier composant le loader : **0**, les 15 branches appellent directement le contrat ;
- exceptions spécialisées : **4 skeletons fetch Game Master**, 2 modules dynamiques, 6 consommateurs pleine page et les progressions/imports/boutons ;
- couverture avant : **0 canonique, 2 animés locaux, 13 statiques** ;
- couverture après : **15/15 canoniques animés, 0 legacy/statique compatible**.

## Empty / No Results / Error

- Empty : **38/38 racines** couvertes ;
- No Results : **14/14 racines** couvertes ;
- Empty + No Results : **52/52 points de composition** ;
- wrappers métier : `EmptyLine` (2 branches), `EmptyInline` (7 branches), `EventGroup` et `TimelineSection` ;
- Error : **11/11** erreurs asynchrones génériques couvertes ;
- reprise conservée : bouton Réessayer de la collection Trainer ;
- Success et Pending : non créés, répétition insuffisante et contrats actuels spécialisés.

## Accessibilité et mouvement

Fetch Loading expose `status`, `aria-live` et `aria-busy`; Error expose `alert`; les icônes décoratives sont masquées. En reduced motion, spin et pulse s’arrêtent, mais les surfaces, skeletons et textes restent présents. Les hauteurs minimales du contrat section réduisent le layout shift.

## Validation

Inventaire global : **139 candidats state-like**, classés en 78 racines génériques compatibles, 26 états métier spécialisés, 34 faux positifs/autres familles et 1 ambiguïté. Le périmètre générique contient 15 Loading, 38 Empty, 14 No Results et 11 Error ; aucun Success ou Pending générique répété ne justifie un nouveau contrat. Couverture canonique : **0/78 avant, 78/78 après (100 %)**. Hardcodes génériques : **78 avant, 0 après**.

Preuves exécutées :

- `npm run test:design-system-state-system` : 8/8 tests ;
- suite impactée Button, Card, Color, Modal, Field, Select/Checkbox et State : 47/47 tests ;
- `npm run typecheck` : 0 erreur ;
- ESLint ciblé `--quiet` : 0 erreur ;
- `npm run build` : succès, avec l’avertissement NFT préexistant de `next.config.ts` ;
- `node scripts/verify-design-system-state-system.mjs` : 54 captures (9 parcours × 2 thèmes × 3 viewports), 0 overflow et 0 erreur console, plus Loading→contenu, Error→retry→Empty et No Results ;
- gut-check `agent-browser` : page chargée, contenu et interactions présents, aucun overlay ;
- `git diff --check` : succès.

## Suite du programme

Le prochain sprint reste **Visual Consistency**. Il n’est pas lancé dans ce lot.
