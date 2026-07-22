# Contrat — Card

Source canonique : `src/components/ui/card.tsx`.

## Contrat initial

`Card` utilise `forwardRef<HTMLDivElement>`, rend un `div`, accepte les attributs HTML natifs et `className`, puis applique `rounded-lg` et un ton `soft|strong`. `soft` utilise `glass-panel`, `strong` utilise `glass-panel-strong`. Les deux recettes sont définies dans `globals.css` et portent border, fond sémantique, ombre inset/externe et backdrop blur. La primitive n’impose ni padding, largeur, hauteur, overflow, interaction ni responsive.

`CardHeader` rend un `div` flex, accepte `eyebrow`, `action`, les attributs d’un div et les enfants. Il place le contenu dans un bloc `min-w-0` et l’action dans `shrink-0`.

`CardTitle` rend un `h2` et `CardDescription` un `p`. Le titre est `text-lg/font-black/leading-tight`; la description est `mt-1/text-sm/font-medium/leading-6`. Aucun niveau de titre dynamique, slot de body, footer ou comportement interactif n’est fourni.

## Contrat cible fini

Le seul ajout autorisé est `tone="flat"`, prouvé par 35 racines JSX partageant le squelette exact, dont 20 `div` de surface sûrs. Il produit uniquement `border border-line bg-white/[0.045]` avec le radius structurel existant, sans ombre ni blur. Aucune prop `variant`, `interactive`, `selected`, `padding`, `size`, `header`, `footer`, `asChild` ou palette métier n’est créée.

Le ton `flat` encode une élévation réellement répétée, pas un domaine. La valeur de couleur reste temporairement une utility existante ; elle est explicitement transmise au futur Color System au lieu d’être remplacée dans ce sprint.

## Responsive — décision R1

Le backlog dépendait de Responsive parce que l’audit Card ne possédait pas de baseline aux trois viewports. Aucun blocage structurel n’est observé : Card ne fixe ni width, min-width, max-width, grid, flex ni breakpoint. Les 20 cibles conservent leurs classes `sm:*` et leurs parents inchangés.

Décision : R1, aucune correction responsive source. La dépendance est satisfaite par la matrice dark/light en 375×812, 768×1024 et 1440×1000, avec contrôle de l’overflow.

## Accessibilité et interaction

Les 20 racines restent des `div` sans handler propre. Aucun rôle, tabIndex ou nom accessible n’est ajouté. La ligne Todo conserve ses contrôles imbriqués natifs ; les autres cards interactives restent des `button`/`a` ou des wrappers métier et ne migrent pas. Les nested buttons/links et l’ordre de tabulation sont comparés sur les pages représentatives.

## Spacing, radius, shadow et overflow

- padding et gap restent aux consommateurs ; aucun `CardContent`/`CardFooter` n’est créé ;
- `rounded-lg` reste le contrat structurel calculé à 8 px ;
- `soft` et `strong` conservent exactement leurs ombres ; `flat` n’en ajoute aucune ;
- les glows Pokémon et ombres métier restent locaux ;
- overflow reste entièrement local.
