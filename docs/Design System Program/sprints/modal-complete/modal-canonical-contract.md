# Contrat canonique final — Modal

## Contrat avant stabilisation

Props publiques : `open`, `title`, `description?`, `children`, `footer?`, `className?`, `onClose`. Elles restent inchangées.

La primitive fournit portal, overlay, `section[role=dialog][aria-modal=true]`, header, titre, description facultative, body scrollable, footer facultatif et bouton close. Elle gère Escape, focus initial sur le premier contrôle, boucle des bornes Tab/Shift+Tab, retour du focus et `body.style.overflow = "hidden"`.

Limites certaines : nom par `aria-label={title}` au lieu du titre visible, description visible non reliée, bouton d’overlay dans le tab order, pas de fallback explicite si aucun contrôle n’était disponible, trap incomplet si le focus est déplacé hors du dialog.

## Cible compatible

### Structure et API

- même portal `document.body`, classes, header, body, footer et bouton close ;
- aucune nouvelle prop, variante, taille, motion, couche ou dépendance ;
- `className` continue de cibler uniquement la `section`.

### Accessibilité

- ID React stable et unique pour le `h2` ;
- `aria-labelledby` pointe vers le titre visible ;
- ID de description et `aria-describedby` uniquement quand `description` est rendue ;
- suppression de `aria-label` pour éviter un double nom ;
- overlay conservé visuellement mais rendu non interactif sémantiquement et hors tab order ;
- bouton de fermeture inchangé et nommé.

### Focus

- mémoriser l’élément actif avant ouverture ;
- focaliser le premier contrôle visible au frame suivant ;
- fallback programmatique sur la section `tabIndex={-1}` ;
- boucler Tab et Shift+Tab ;
- si le focus quitte artificiellement le dialog, le ramener à la borne cohérente ;
- restaurer le focus à la fermeture.

### Fermeture

- close, Escape et clic overlay restent actifs ;
- clic interne ne ferme pas ;
- aucun nouveau booléen `closeOnOverlay` : aucun des 22 usages canoniques ne le demande ;
- l’import privé conserve son callback neutralisé pendant `busy`.

### Scroll et responsive

- lock/restauration du body inchangés ;
- aucun système global de compensation de scrollbar sans défaut reproductible ;
- `92dvh`, body interne, paddings `p-4 sm:p-5` et largeurs locales inchangés ;
- aucun fullscreen ajouté à la primitive.

### Motion

- la primitive reste sans animation : l’ajout d’une motion serait un changement visuel non justifié ;
- `prefers-reduced-motion` est donc respecté par absence de motion dépendante ;
- la motion spécialisée de l’historique versions conserve 180 ms en mode normal et doit devenir instantanée en mode réduit.

### Layering

- shell : sticky header 30, sidebar 40, drawer 50 ;
- menus/sheets Pokémon : 90, Game Master 95 ;
- Modal canonique et dialogs historiques : 1100 ;
- panel animé historique : 1110 ;
- preview asset imbriquée : 1120 ;
- dialogs Events : 1200 ;
- aucun système global de z-index n’est créé.
