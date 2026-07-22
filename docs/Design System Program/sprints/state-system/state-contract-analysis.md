# Analyse des contrats State System

## Décision d’architecture

Le sprint ne crée pas un composant universel piloté par un `type`. Loading, Empty et Error ont des sémantiques, animations et comportements différents. Trois composants finis partagent uniquement les tokens et recettes internes nécessaires.

## `FetchLoadingState`

API : `title`, `detail?`, `layout?: "section" | "inline"`, plus les attributs HTML d’un `div`.

- `section` reprend la carte moderne de la collection Trainer avec `min-h-52`, centrage et spinner 30 px ;
- `inline` sert aux modales, historiques et panels compacts avec spinner 18 px ;
- `role="status"`, `aria-live="polite"` et `aria-busy="true"` rendent l’état perceptible ;
- le spinner décoratif est masqué aux technologies d’assistance ;
- `motion-reduce:animate-none` et la règle globale reduced motion arrêtent la rotation sans supprimer le texte ;
- les hauteurs minimales stabilisent l’apparition/disparition sans changer les hooks de fetch.

## `EmptyState`

API : `title`, `description?`, `icon?`, `action?`, `size?: "compact" | "section"`.

Le même contrat visuel couvre Empty et No Results, car l’anatomie est identique ; la condition et le contenu conservent leur sens métier. `compact` s’insère dans une liste ou un panel. `section` réserve davantage d’espace et accepte une action de première création ou de réinitialisation.

## `ErrorState`

API : `message`, `title?`, `action?`.

Le contrat utilise les tokens `danger`, un pictogramme et `role="alert"`. L’action reste optionnelle : la collection Trainer conserve son bouton Réessayer, alors que les erreurs rechargées par l’action du panel n’en inventent pas une.

## Contrats non créés

- `SuccessState` : les succès actuels sont des badges, notices et toasts aux durées et contextes distincts ; aucune anatomie répétée suffisante.
- `PendingState` : les attentes métier existantes sont des statuts de commande ou d’import, pas un état générique équivalent.
- `SkeletonState` : les quatre skeletons Game Master préservent des géométries différentes.
- loader de bouton : le contrat `Button loading` existe déjà et reste canonique pour cette famille.

## Color System, thèmes et responsive

Les composants utilisent exclusivement `surface`, `line`, `foreground`, `muted`, `brand-2` et `danger`. Aucun hexadécimal ni palette Tailwind brute n’est introduit. Les dimensions sont fluides, le contenu long casse les lignes, et les actions restent dans un conteneur flexible.
