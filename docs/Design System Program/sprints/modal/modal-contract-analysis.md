# Analyse de contrat — Modal

Source canonique : `src/components/ui/modal.tsx`. Le contrat ci-dessous décrit le code réel du 14 juillet 2026, qui prime sur la fiche d’audit historique.

## API publique et anatomie

Props publiques inchangées : `open`, `title`, `description?`, `children`, `footer?`, `className?`, `onClose`.

Anatomie : portal dans `document.body`, racine overlay fixe, bouton d’overlay plein écran, `section` dialog, header standard avec titre/description/bouton de fermeture, body scrollable, puis footer optionnel. `className` cible uniquement la `section`; il ne remplace ni overlay, ni header, ni body, ni footer.

## Contrat accessible et comportemental

| Contrat | Primitive courante | Preuve / limite |
|---|---|---|
| rôle dialog | oui | `role="dialog"` sur la `section` |
| modalité | oui | `aria-modal="true"` |
| nom | oui | `aria-label={title}` |
| `aria-labelledby` | non | le `h2` n’a pas d’ID et n’est pas relié |
| `aria-describedby` | non | la description visible n’est pas reliée |
| Escape | oui | listener `window.keydown`, appel de `onClose` |
| fermeture overlay | oui | bouton natif plein écran « Fermer » |
| fermeture bouton | oui | bouton natif « Fermer la fenêtre » |
| focus initial | oui | premier contrôle focusable dans le dialog au prochain frame |
| focus trap | oui, bornes simples | boucle premier/dernier sur Tab et Shift+Tab |
| retour du focus | oui | restauration de l’élément actif avant ouverture |
| scroll lock | oui | `body.style.overflow = "hidden"`, valeur antérieure restaurée |
| portal | oui | `createPortal(..., document.body)` |
| nouvel élément tabulable | oui, attendu | le bouton de fermeture appartient au dialog ; le bouton d’overlay est aussi focusable hors de la `section` |

Le piège de focus ne contient que les contrôles trouvés dans la `section`. Le bouton d’overlay est focusable mais situé hors de la `section`; le focus initial ne le choisit pas. Le trap boucle seulement si le focus actif est exactement sur la première ou la dernière borne. Aucun mécanisme topmost ne coordonne plusieurs modales simultanées.

Si un consommateur fournit un `onClose` qui ne modifie pas `open`, Escape et les boutons appellent bien le callback mais la surface reste ouverte. C’est volontairement utilisé pendant l’import privé lorsque le flux est occupé.

## Rendu, responsive et scroll

- overlay : `fixed inset-0 z-[1100]`, grid centré, `bg-black/65`, `backdrop-blur-xl`, padding 12 px puis 20 px à `sm` ;
- dialog : largeur `100%`, `max-w-2xl`, hauteur maximale `92dvh`, rayon `rounded-lg`, surface `bg-panel-strong`, bordure et shadow propres ;
- body : `max-h-[calc(92dvh-9rem)]`, `overflow-auto`, padding 16 px puis 20 px à `sm` ;
- footer : séparateur supérieur et mêmes paddings ;
- le viewport vertical dynamique protège clavier mobile et chrome navigateur ;
- les largeurs spécifiques existantes utilisent `className="max-w-*"` et sont fusionnées par `cn`/Tailwind Merge.

La baseline ne mesure aucun overflow horizontal aux viewports 375×812, 768×1024 et 1440×1000.

## Dark et light

La surface, le texte et les bordures utilisent les tokens sémantiques `panel-strong`, `foreground`, `muted` et `line`. L’overlay reste noir avec alpha fixe. Les six combinaisons thème/viewport de l’instance Kanban conservent les mêmes contrats géométriques et comportements ; leurs couleurs calculées propres au thème sont enregistrées dans `test-results/design-system-modal-family/baseline.json`.

Les dialogs Events/Pokémon legacy utilisent surtout des couleurs slate, white alpha et littéraux ; leur light mode reste visuellement sombre. Ce fait est caractérisé, pas corrigé.

## Animations et reduced motion

`Modal` ne possède aucune animation d’entrée/sortie. Seul le bouton de fermeture porte la classe générique `transition`. Aucun état ne dépend d’une fin d’animation et aucune branche `prefers-reduced-motion` n’existe dans la primitive.

`AdminVersionHistoryDialog` utilise Framer Motion : fondu d’overlay, translation verticale et scale, durée explicite de 180 ms sur le panel. Le drawer mobile utilise une transition spring. Migrer l’un ou l’autre vers `Modal` supprimerait ces contrats ou imposerait une nouvelle API de motion. La baseline exécute le viewport mobile avec `prefers-reduced-motion: reduce` et tablette/desktop sans préférence ; les captures désactivent les animations pour la comparaison pixel stable, tandis que les contrats motion restent testés statiquement.

## Matrice runtime représentative

| Cas | role / modalité | focus initial | Escape | overlay | scroll lock | nom accessible |
|---|---|---:|---:|---:|---:|---:|
| `Modal` Kanban | oui / oui | oui | ferme | ferme | oui | oui |
| historique versions | oui / oui | non | ne ferme pas | ferme | non | oui |
| drawer mobile | non / non | non | ne ferme pas | ferme | non | non |
| import Events | non / non | non | ne ferme pas | ferme | non | non |
| éditeur Collections | oui / oui | non | ne ferme pas | ne ferme pas | non | non |
| historique Sources | oui / oui | non | ne ferme pas | ne ferme pas | non | non |

## Écarts qui interdisent une migration structurelle immédiate

1. `Modal` impose header/body/footer et overlay fermant ; plusieurs legacy ont une anatomie ou une fermeture différente.
2. `Modal` impose le focus initial, Escape, trap, retour et scroll lock ; les legacy n’en disposent pas. Les ajouter serait une amélioration fonctionnelle/accessibilité, pas une migration sans régression.
3. L’overlay canonique est `z-[1100]`; Events utilise `z-[1200]` et la preview imbriquée `z-[1120]`.
4. `Modal` n’a pas de contrat d’animation, de nested modal, d’overlay non fermant, de header custom ou de scroll sticky.
5. L’absence d’`aria-labelledby`/`aria-describedby` dans la primitive est une limite documentée, mais la corriger modifierait `src/components/ui/modal.tsx` et dépasse ce sprint.
