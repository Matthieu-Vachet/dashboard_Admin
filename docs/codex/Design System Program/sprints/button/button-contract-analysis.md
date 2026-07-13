# Analyse de contrat — famille Button

## Primitive courante

`Button` est importé par le chemin canonique `@/components/ui/button`. Il accepte les attributs de `HTMLButtonElement` et les props `asChild`, `variant`, `size` et `icon`. Sans `asChild`, la racine est un `<button>` ; avec `asChild`, Radix `Slot` fusionne les props dans l’unique enfant. La primitive n’utilise pas `forwardRef`.

Le squelette courant est :

```text
inline-flex items-center justify-center gap-2 rounded-lg border font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 disabled:cursor-not-allowed disabled:opacity-50
```

`className` est passé après la variante et la taille à `cn`, lequel applique `clsx` puis `tailwind-merge`. Un wrapper peut donc compenser une classe conflictuelle sans changer l’API. Les classes non conflictuelles de la primitive restent actives.

## Variantes et tailles finies

| Axe | Valeur | Classes courantes |
|---|---|---|
| variant | primary | `dashboard-primary-button border-transparent text-white hover:brightness-110` |
| variant | secondary | `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]` |
| variant | ghost | `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground` |
| variant | danger | `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20` |
| size | sm | `min-h-9 px-3 text-xs` |
| size | md | `min-h-10 px-4 text-sm` |
| size | lg | `min-h-12 px-5 text-sm` |
| size | icon | `h-10 w-10 p-0` |

Les valeurs par défaut sont `secondary` et `md`.

## Matrice de contrats

| Contrat | État courant | Risque | Décision |
|---|---|---|---|
| Bouton natif | `<button>` si `asChild` est faux | type implicite `submit` dans un formulaire | conserver ; chaque migration de formulaire doit expliciter `type` |
| Lien via `asChild` | `Slot` transmet classes et props à l’enfant unique | types encore fondés sur `ButtonHTMLAttributes`; `disabled` ne désactive pas un lien | autorisé seulement pour un lien caractérisé |
| Icône seule | `size="icon"`, nom accessible fourni par le consommateur | nom absent ou surface non carrée | conserver la responsabilité du nom au consommateur |
| Texte + icône | `icon` est rendu avant `children` sur la branche bouton | `icon` est ignoré sur la branche `asChild` | avec `asChild`, placer l’icône dans l’enfant |
| Disabled | attribut natif et styles `disabled:*` sur un bouton | pas de contrat lien disabled | ne pas simuler un lien désactivé pendant ce sprint |
| Loading réel | aucune prop ni anatomie dédiée | double clic, annonce et largeur instable selon métier | conserver `disabled`, texte et spinner chez le consommateur |
| Selected | aucune prop dédiée | confusion avec toggle/tab/option | conserver `aria-pressed` et classes métier ; pas de variant `active` |
| Destructif | variant `danger` fini | des actions legacy rouges ne sont pas visuellement équivalentes | ne migrer qu’après comparaison exacte |
| Pleine largeur | composition `className="w-full"` | booléen `fullWidth` inutile | composition uniquement |
| Compact | taille `sm` | plusieurs hauteurs legacy ne correspondent pas | pas de prop `compact` |
| Lien externe | possible via `asChild` avec `<a target rel>` | perte de `target`, `rel`, nom ou focus | préserver explicitement `href`, `target="_blank"`, `rel="noreferrer"` |
| Polymorphisme | Radix `Slot`, enfant unique obligatoire | plusieurs enfants directs font échouer Slot | mettre texte et icône dans le même enfant |
| Fusion Tailwind | `className` arrive en dernier dans `twMerge` | une classe non conflictuelle reste ajoutée | comparer classes résolues et styles calculés |

## États et accessibilité

- Hover : piloté par chaque variante, puis surchargeable par `className`.
- Focus : outline visible de 2 px, offset de 2 px, couleur `brand-2`.
- Disabled : curseur interdit et opacité 0,5 sur un vrai bouton.
- Active : aucun contrat visuel spécifique.
- Loading : aucun contrat de primitive.
- Clavier : un bouton natif répond à Entrée et Espace ; un lien répond à Entrée mais pas à Espace. `asChild` doit préserver cette distinction.
- Tab order : aucune prop n’ajoute de tab stop ; le comportement vient de la racine réelle.

## Comparaison des candidats obligatoires

| Composant | Racine avant | État/contrat | Équivalence avec Button | Décision de plan |
|---|---|---|---|---|
| ExternalButton | `Link` interne ou `<a>` externe | navigation, `target`/`rel`, icône, focus de lien | plausible via `asChild`; classes de compatibilité nécessaires pour display, hauteur, justification, surface, transition et focus | candidat conditionnel prioritaire |
| LoadMoreButton | `<button type="button">` | incrément local, texte avec compteur, palette Pokémon | structure composable mais surface legacy et huit palettes non couvertes par un variant | candidat conditionnel, gate plus stricte |
| EventButton | `<button type="button">` | sélection, layout événement, badges et date | faux bouton générique ; anatomie riche | conserver inchangé |
| ToolbarButton | `Button size="sm" type="button"` | commande d’éditeur, icône + label | compose déjà la primitive | conserver le wrapper et son API |
| ProgressButton | plusieurs `Button size="sm"` | statut, confirmation, sauvegarde, disabled | compose déjà la primitive ; logique métier assumée | conserver le wrapper et son API |

## Condition d’arrêt

Une modification de `src/components/ui/button.tsx`, l’ajout d’un variant/size/prop ou l’impossibilité de préserver tag, type, href, target, rel, clavier, focus et styles calculés interrompt la migration concernée.
