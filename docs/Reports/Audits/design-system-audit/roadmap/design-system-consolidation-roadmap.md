# Roadmap de consolidation et de migration du Design System

Date de vérification : 13 juillet 2026  
Projet : Dashboard Admin  
Nature du livrable : analyse et planification uniquement

Sources principales : [index de l’audit](../index.md), [registre des composants](../registries/components.json), [registre des dépendances](../registries/dependencies.json), [registre des tokens](../registries/tokens.json), [patterns réutilisables](../registries/reusable-patterns.json), [couverture des familles](../foundations/21-component-family-coverage.md) et code courant de `Dashboard Admin/src`.

Les matrices opérationnelles associées sont [component-family-migration-matrix.json](./component-family-migration-matrix.json), [design-token-migration-matrix.json](./design-token-migration-matrix.json) et [first-sprint-plan.md](./first-sprint-plan.md).

## 1. Résumé exécutif

Le Dashboard possède déjà un noyau Design System réel, mais incomplet : neuf identités de primitives sous `src/components/ui` (`Badge`, `Button`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `Input`, `Textarea`, `Modal`), des variables sémantiques dark/light, huit palettes runtime et quelques composites fortement réutilisés. Ce noyau cohabite avec une deuxième couche visuelle plus ancienne, surtout dans l’Admin Pokémon, fondée sur `rounded-2xl`, `border-white/10`, `bg-white/[0.055]`, des ombres arbitraires et des classes exportées telles que `panelClass`, `fieldClass`, `buttonClass` et `primaryButtonClass`.

La consolidation est donc justifiée, mais pas sous forme de fusion globale. Les chiffres de famille — 67 Cards courantes, 35 Panels courants, 18 Badges/Tags courants et 15 Modals courantes après l’addendum — mélangent primitives structurelles, wrappers, helpers, façades de compatibilité et composants métier. Les noms et ressemblances de classes ne suffisent pas pour établir un contrat commun.

La stratégie recommandée est une migration par preuves : caractériser le rendu et le comportement existants, consolider une primitive finie, migrer un seul pilote, mesurer dark/light, responsive, clavier et métier, puis étendre. Les façades de compatibilité restent en place jusqu’à ce que tous leurs consommateurs aient migré.

Les principaux risques sont le rayon d’impact de `Card`, `Button` et `Modal`, les deux langages visuels actuels, les overlays spécialisés, l’absence de baseline visuelle automatisée et la tentation de transformer des concepts Pokémon en variantes globales. Les composants métier tels que `RaidCard`, `PokemonCard`, `ResearchPanel`, `EventDetailModal` ou `TrainerPokemonCollectionPanel` doivent rester spécialisés et seulement composer les primitives pertinentes.

Le premier sprint recommandé porte sur `Badge`, limité à deux libellés statiques de catégorie dans le Kanban. Il supprime une duplication structurelle visible, ne change aucune interaction, n’ajoute aucune variante globale et peut être annulé par un diff de deux éléments.

## 2. État actuel vérifié

### 2.1 Intégrité de l’audit historique

Les contrôles effectués sur les registres et le code donnent :

- 325 entrées dans `components.json` ;
- 325 fiches Markdown dans `design-system-audit/components/` ;
- 20 fiches dans `design-system-audit/pages/` ;
- 142 chemins source uniques référencés ;
- 0 chemin source manquant ;
- 0 fiche composant manquante ;
- 58 façades de compatibilité ;
- 0 façade invalide parmi les 58 : chacune exporte et pointe vers une identité canonique existante ;
- les 267 définitions historiques non-façades ont toutes été retrouvées par nom et fichier dans le code courant.

### 2.2 Tableau de vérification demandé

| Élément | Audit | Code courant vérifié | Statut |
|---|---:|---:|---|
| Components | 325 | 335 | évolué : +10 définitions JSX post-audit |
| Definitions | 267 | 277 | évolué : +10 dans `trainer-pokemon-collection-panel.tsx` |
| Compatibility paths | 58 | 58 | identique |
| Reusable patterns | 497 | ≥ 497 | évolué ; le générateur historique de fermeture transitive n’est pas présent pour réattribuer un total exact |
| Dependency edges | 570 | 597 | évolué : +27 relations résolubles liées à « Ma collection » |

Le total courant de 335 identités correspond à 277 définitions JSX plus 58 chemins de compatibilité. Le binding `const TrainerPokemonCollectionPanel = dynamic(...)` dans `admin-app.jsx` n’est pas compté comme une onzième définition : il référence la définition exportée du nouveau fichier et fournit seulement un fallback de chargement.

Le total de 597 relations utilise les dix nouvelles définitions comme nœuds provisoires sans leur inventer d’ID `MWI-COMP-*`. Les 27 relations supplémentaires sont : une relation depuis `AdminApp`, 16 relations entre les nouvelles définitions et les primitives existantes, et 10 relations internes entre les nouvelles définitions. Aucun cycle n’est introduit.

### 2.3 Différences précises depuis l’audit

L’audit a été généré le 13 juillet 2026 à 01:04. Le commit courant `e1d2932` du même jour a ensuite modifié la surface Design System dans trois fichiers :

1. `src/components/admin/pokemon/admin-app.jsx`
   - ajoute la navigation « Ma collection » ;
   - ajoute un binding dynamique vers `TrainerPokemonCollectionPanel` ;
   - ajoute un fallback `panelClass` avec `animate-pulse` ;
   - ajoute une dépendance d’`AdminApp` vers le nouveau panel.
2. `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx`
   - ajoute dix définitions : `Move`, `PokemonImage`, `StatusBadges`, `PokemonMobileCard`, `PokemonTable`, `ImportModal`, `TrainerPokemonCollectionPanel`, `FilterSelect`, `RangeFields`, `Pagination` ;
   - consomme `Badge`, `Button`, `Card`, `Input` et `Modal` ;
   - introduit un usage local de pagination, huit filtres/sélecteurs, une Checkbox native, un input fichier, des états loading/empty/no-results/error et deux usages de `Modal` ;
   - ajoute 21 utilitaires Tailwind uniques absents du registre historique : `bg-black/10`, `bg-panel`, `border-line/70`, `flex-col-reverse`, `gap-x-5`, `hover:bg-white/[0.035]`, `last:border-0`, `max-w-48`, `max-w-52`, `max-w-56`, `max-w-80`, `md:col-span-2`, `min-h-44`, `min-h-52`, `min-h-60`, `min-w-[1540px]`, `ml-2`, `pl-10`, `text-muted/70`, `xl:grid-cols-7`, `xl:items-start` ;
   - ajoute trois icônes Lucide absentes du registre : `ArrowRight`, `LoaderCircle`, `PackageOpen`.
3. `src/components/ui/modal.tsx`
   - ajoute un `dialogRef` ;
   - place le focus dans le dialogue ;
   - piège `Tab` et `Shift+Tab` ;
   - restaure le focus précédent à la fermeture ;
   - ajoute `autoFocus` au bouton de fermeture.

Le commit `e1d2932` établit donc un minimum vérifiable de 21 utilitaires Tailwind et 21 enregistrements d’implémentation de tokens supplémentaires par rapport au registre historique. Pendant la préparation de cette roadmap, le working tree du Dashboard a aussi reçu des modifications concurrentes non commises. L’instantané du 13 juillet 2026 à 19:22 CEST en relevait 17 fichiers source et un script de test : ajustements responsive de l’Admin Pokémon et du calendrier, variantes de surface de `MetricCard`, classe CSS `metric-interface-icon`, raccourcis de navigation et évolutions du flux « Ma collection ». Elles n’ont pas été produites ni écrasées par cette mission.

Ces modifications concurrentes ne créent pas de nouvelle définition JSX nommée, de façade de compatibilité ni de relation interne résoluble : les totaux courants restent donc 335 identités, 277 définitions, 58 compatibilités et 597 relations. Elles ajoutent toutefois au moins une icône (`Boxes`), une classe CSS custom et d’autres utilitaires. Le code courant contient ainsi 216 icônes et au moins 35 classes CSS custom. Il serait trompeur de figer un nouveau total exhaustif d’utilitaires, de tokens, d’états, de variantes ou de patterns sans relancer le générateur historique absent du workspace. Les 40 variables CSS, 13 animations, 20 pages, 2 layouts et 385 assets publics restent inchangés au dernier contrôle ; cette roadmap n’altère pas l’audit historique.

### 2.4 Contrôles natifs courants

Comptage lexical actuel dans les fichiers JSX/TSX :

| Contrôle | Occurrences hors primitive correspondante | Observation |
|---|---:|---|
| `<button>` | 184 | 182 dans les features/layouts et 2 boutons internes à `Modal` |
| `<input>` | 29 | hors `ui/input.tsx` |
| `<select>` | 27 | aucune primitive dédiée |
| `<textarea>` | 7 | hors `ui/input.tsx` |
| checkbox | 8 | usages métier distincts mais assez répétés pour une primitive native-backed |
| radio | 1 | stratégie d’import Learning ; occurrence unique |
| file input | 2 | Learning et Ma collection |
| `<table>` | 2 | Dashboard Backlog et Ma collection |
| `aria-pressed` | 1 | toggle de filtre, insuffisant pour une primitive Switch |
| attribut `title` sur élément hôte | 15 | à distinguer des 142 props `title` de composants |
| Recharts `<Tooltip>` | 6 | composants de chart, pas des tooltips UI génériques |
| appels `toast.*` Sonner | 81 | un `<Toaster>` global existe déjà |

### 2.5 Dépendances et rayon d’impact

Les plus fortes centralités entrantes, actualisées avec les nouveaux consommateurs, sont :

| Composant | Consommateurs directs courants | Décision |
|---|---:|---|
| Card — MWI-COMP-319 | 42 | ne pas migrer globalement en premier |
| Badge — MWI-COMP-317 | 35 | bon pilote si le périmètre est très limité |
| Button — MWI-COMP-318 | 31 | forte valeur, mais rayon d’impact élevé |
| Panel — MWI-COMP-131 | 16 | composite Admin Pokémon, pas primitive globale |
| Input — MWI-COMP-323 | 17 | migration par formulaire |
| CardHeader/Title/Description — MWI-COMP-320/321/322 | 11 chacun | consolider avec Card, pas séparément |
| Modal — MWI-COMP-325 | 11 | risque critique malgré le contrat amélioré |
| Textarea — MWI-COMP-324 | 9 | migrer avec Field/Input |

Les plus fortes centralités sortantes historiques restent `AdminApp` (désormais 34 enfants résolus), `DetailModal` (17), `DashboardHomeLive` (15), `JsProgress` (13) et `CalendarPlanner` (12). Aucun cycle n’a été détecté dans les 570 relations historiques ni dans l’addendum de 27 relations. `AdminApp`, `DetailModal`, `EventDetailModal`, les pages Dashboard denses et la famille Card ne sont pas des pilotes acceptables.

## 3. Principes de migration

1. **Zéro changement visuel mesuré.** Une migration ne passe que si les styles calculés et screenshots dark/light, responsive et états ciblés sont équivalents.
2. **Zéro big bang.** Une famille, un contrat, une page pilote et un rollback local à la fois.
3. **Le comportement précède l’abstraction.** Focus, clavier, scroll, fermeture, état, données et responsive sont caractérisés avant de changer le composant.
4. **Primitive et métier restent séparés.** Les primitives portent structure, accessibilité et variantes finies ; les composants métier conservent données, orchestration, copie et règles Pokémon.
5. **Réutiliser avant de créer.** Toute proposition vérifie les primitives existantes, le nombre d’occurrences et le gain de duplication.
6. **Aucun composant universel.** Préférer composition, slots explicites et unions finies aux props booléennes croisées.
7. **Compatibilité temporaire.** Les 58 façades restent jusqu’à migration complète de leurs imports et validation des consommateurs.
8. **Tests avant migration.** Chaque sprint commence par des tests de caractérisation et une baseline visuelle.
9. **Documentation synchronisée.** Code, Figma, fiches `COMP-*`, `DOC-010`, registre courant et addendum changent ensemble après validation.
10. **Tokens fondés sur les usages.** Un token nouveau doit regrouper des valeurs réellement équivalentes dans les deux thèmes ; la proximité numérique seule ne suffit pas.
11. **Les IDs historiques ne sont jamais inventés.** Les définitions post-audit restent « sans ID » jusqu’à une régénération officielle.
12. **Suppression tardive.** Un chemin, helper ou style ancien n’est supprimé qu’après migration de tous ses consommateurs, recherche statique nulle et validation visuelle.

## 4. Matrice des familles

La matrice JSON détaillée contient les IDs, chemins, candidats et exclusions. Cette vue synthétique utilise les comptes courants lorsque le code a évolué.

| Famille | Existant | Duplication | Cible | Priorité | Risque |
|---|---:|---:|---|---|---|
| Buttons | 6 nommés + 184 natifs | très forte | Button fini + wrappers métier | P1 | élevé |
| Cards | 67 | très forte mais hétérogène | Card structurelle ; MetricCard conditionnel | P1 | élevé |
| Panels | 35 | forte dans Admin Pokémon | conserver Panel métier ; pas de global | P2 | élevé |
| Badges/Tags | 18 | forte sur structure et tons | Badge statique + pills métier | P0 | faible |
| Inputs/Textareas | 9 + 36 natifs | forte | Input, Textarea, Field | P1 | moyen |
| Selects | 6 + 27 natifs | forte | Select native-backed + Field | P1 | moyen |
| Modals/Dialogs | 15 + 8 overlays locaux | forte et comportementale | Modal caractérisée, overlays complexes exclus | P1 | critique |
| Navigation | 6 | moyenne | composites séparés sur Button/Link | P2 | élevé |
| Tables/Rows | 7 + 2 tables | moyenne, anatomies distinctes | tokens/wrappers partagés, pas DataTable global | P2 | élevé |
| Filters | 6 | forte mais état métier différent | compositions de primitives | P2 | moyen |
| Loading/Empty/Error/Success | 8 nommés + branches locales | forte sur surfaces | StateFrame après caractérisation | P1 | moyen |
| Charts | 11 | styles partagés, données distinctes | ChartSurface + tokens | P3 | élevé |
| Progress rows | 16 | moyenne | ProgressBar conditionnelle | P2 | moyen |
| Avatar | 0 | aucune | aucune primitive | P3 | faible |
| Checkbox | 0 nommé + 8 natifs | réelle | Checkbox native-backed | P1 | moyen |
| Switch | 0 + 1 `aria-pressed` | insuffisante | aucune primitive | P3 | moyen |
| Pagination | 1 post-audit | unique | rester locale jusqu’au 2e usage | P2 | moyen |
| Tabs | 0 | aucune sémantique tab | aucune primitive | P3 | moyen |
| Search | 12 signaux iconiques | à qualifier | composition SearchField, pas atome | P2 | moyen |
| Drawer | sidebar responsive embarquée | unique | étude liée à la sidebar | P2 | élevé |
| Tooltip | 15 `title` hôtes + 6 charts | à qualifier | étude accessibilité, pas encore approuvée | P2 | moyen |
| Toast | Sonner + 81 appels | stratégie déjà active | conserver Sonner, service typé conditionnel | P2 | moyen |

### 4.1 Classification des Cards

Les 67 identités courantes doivent être classées avant toute migration :

1. **Primitives structurelles** : MWI-COMP-319 à 322.
2. **Statistiques/métriques** : MWI-COMP-024, 025, 033, 035, 042, 052, 080, 120, 133, 149, 151, 233, 242, 249, 251, 253, 286, 290, 316.
3. **Pokémon** : MWI-COMP-067, 168, 198, 221, 261 et `PokemonMobileCard` post-audit.
4. **Contenu/pédagogie** : MWI-COMP-099 à 104, 109, 119.
5. **Statut/diagnostic** : MWI-COMP-166, 192, 193, 194, 220, 237, 248, 275, 279.
6. **Métier spécialisé** : MWI-COMP-084, 146, 147, 181, 185, 187, 202, 208, 215, 223, 241, 255.
7. **Helpers/faux positifs/façades** : grilles et listes dont le nom contient Card, façades MWI-COMP-261/270/286/290/293/297/306, et structures non surfaciques.

`CardContent` et `CardFooter` ne sont pas approuvés : les paddings, scrolls et footers diffèrent encore. `MetricCard` n’est approuvé qu’après comparaison des contrats statistiques, pas sur le seul suffixe `Card`.

### 4.2 Classification des Badges et pills

- **Badge sémantique statique** : MWI-COMP-317.
- **Événement/information** : MWI-COMP-061, 062, 065.
- **Type Pokémon** : MWI-COMP-145, 157, 158, 164, 195, 201.
- **Domaine raid/œuf/max/météo** : MWI-COMP-179, 186, 196, 207.
- **Agrégats métier** : MWI-COMP-111, 173, 212 et `StatusBadges` post-audit.

Les pills de type, météo ou attaque conservent leurs assets, couleurs dynamiques et informations métier. Elles peuvent composer un futur squelette de pill, mais ne deviennent pas des tons de `Badge`.

## 5. Primitives canoniques proposées

### 5.1 Inventaire vérifié des primitives existantes

Toutes les primitives sont exportées directement depuis leur fichier ; aucun barrel ni chemin de compatibilité ne les réexporte actuellement.

| ID | Primitive | Source | Props/variantes | Usages directs courants | Pages consommatrices transitives | Risque |
|---|---|---|---|---:|---:|---|
| MWI-COMP-317 | Badge | `src/components/ui/badge.tsx` | `className`, props HTML, `tone`; 6 tons | 35 | 18 | faible |
| MWI-COMP-318 | Button | `src/components/ui/button.tsx` | `asChild`, `icon`, `variant`, `size`; 4 variantes × 4 tailles | 31 | 18 | élevé |
| MWI-COMP-319 | Card | `src/components/ui/card.tsx` | props div, `tone=soft|strong` | 42 | 20 | élevé |
| MWI-COMP-320 | CardHeader | même fichier | `eyebrow`, `action`, enfants | 11 | 7 | moyen |
| MWI-COMP-321 | CardTitle | même fichier | props heading | 11 | 7 | moyen |
| MWI-COMP-322 | CardDescription | même fichier | props paragraph | 11 | 7 | moyen |
| MWI-COMP-323 | Input | `src/components/ui/input.tsx` | props input natif | 17 | 13 | moyen |
| MWI-COMP-324 | Textarea | même fichier | props textarea natif | 9 | 9 | moyen |
| MWI-COMP-325 | Modal | `src/components/ui/modal.tsx` | `open`, `title`, `description`, `footer`, `className`, `onClose` | 11 | 7 | critique |

#### Badge — MWI-COMP-317

- Responsabilité actuelle : étiquette statique `span`, non interactive.
- Tons : `cyan`, `violet`, `green`, `amber`, `red`, `neutral`.
- États audités : Default, Error, Warning, Success, Visible.
- Dépendances : React types et `cn`.
- Pages courantes : toutes sauf `/analytics` et `/database`, après ajout de `/pokemon-admin` par « Ma collection ».
- Patterns migrables : MWI-PATTERN-002 à 007 et les duplications exactes du squelette `inline-flex min-h-7 ...` ; commencer par Kanban.
- Limites : les noms de tons sont chromatiques, pas sémantiques ; aucune taille ; aucune règle explicite pour icône, retrait ou contenu long.
- Compatibilité : conserver les six tons ; toute future dépréciation de nom de ton passe par alias et métriques d’usage.

#### Button — MWI-COMP-318

- Responsabilité actuelle : bouton ou enfant polymorphe via Radix Slot.
- Variantes : `primary`, `secondary`, `ghost`, `danger`.
- Tailles : `sm`, `md`, `lg`, `icon`.
- États : Default, Hover, Focused, Disabled, Error, Visible.
- Dépendances : `@radix-ui/react-slot`, React, `cn`.
- Pages courantes : 18, toutes sauf `/account` et `/analytics`.
- Patterns migrables : MWI-PATTERN-008 à 015 ; patterns legacy MWI-PATTERN-022/023 après création d’un adaptateur visuel, pas par écrasement.
- Wrappers : `ToolbarButton` et `ProgressButton` composent déjà Button et restent métier ; `EventButton` reste métier ; `ExternalButton` et `LoadMoreButton` sont candidats.
- Limites : 184 boutons natifs, styles legacy à rayon 2xl, absence de loading contract et différences de hauteur.
- Compatibilité : ne pas ajouter des booléens `loading`, `selected`, `fullWidth`, `compact` en cascade ; préférer `aria-*`, composition d’icône et variantes finies.

#### Card, CardHeader, CardTitle, CardDescription — MWI-COMP-319 à 322

- Responsabilité actuelle : surface `glass-panel`/`glass-panel-strong` et structure facultative de header/titre/description.
- États : essentiellement Default/Visible ; Card ne gère ni interaction ni état métier.
- Dépendances : React, `cn`, variables de surface/line/accent via les classes glass.
- Couverture : Card atteint les 20 pages après « Ma collection » ; les sous-composants atteignent 7 pages.
- Patterns migrables : surfaces simples qui reproduisent exactement `glass-panel`, headers avec eyebrow/action identiques, quelques cartes statistiques.
- Exclusions : cartes Pokémon, drag/drop, charts, cartes de statut et cartes avec overlay/asset dynamique.
- Limites : absence de `CardContent`/`CardFooter`, padding laissé au consommateur, deux couches visuelles incompatibles.
- Compatibilité : ajouter des sous-composants uniquement après répétition prouvée ; ne pas modifier le rayon ou l’effet glass sous couvert de consolidation.

#### Input et Textarea — MWI-COMP-323/324

- Responsabilité : contrôles HTML natifs, ref-forwarding, surface et focus cohérents.
- États audités : Default, Focused, Visible ; les props natives permettent disabled/required/invalid mais aucun style contractuel complet n’est défini.
- Dépendances : React, `cn`.
- Couverture : Input 17 consommateurs directs/13 pages ; Textarea 9/9.
- Patterns migrables : 29 inputs et 7 textareas natifs, en excluant file/radio/checkbox ; MWI-PATTERN-018 est un champ legacy complet qui nécessite un adaptateur.
- Limites : aucun `Field`, label, description, erreur, prefix/suffix, taille ou état invalid explicite ; `resize-none` est imposé à Textarea.
- Compatibilité : consolider d’abord le wrapper `Field`, puis migrer contrôle par contrôle ; préserver les types HTML et le comportement navigateur.

#### Modal — MWI-COMP-325

- Responsabilité : portal, overlay, scroll lock, titre/description/footer, fermeture overlay/Escape, focus initial, trap Tab et restauration du focus.
- États audités historiques : Default, Hover, Collapsed, Expanded, Visible, Scrollable ; le contrat focus post-audit doit être ajouté au registre courant.
- Dépendances : React, ReactDOM, Lucide `X`, `cn`.
- Couverture : 11 consommateurs directs, 7 pages.
- Patterns migrables : overlays simples à `z-[1100]`, header/footer standard et largeur proche ; `AdminVersionHistoryDialog` est le meilleur candidat après tests.
- Exclusions initiales : `EventDetailModal`, `DetailModal`, previews imbriquées, collections et sources tant que leurs scrolls/niveaux ne sont pas modélisés.
- Limites : pas d’ID de titre/`aria-labelledby`, pas de variantes de taille explicites, overlay button hors section, comportement nested modal non caractérisé.
- Compatibilité : formaliser `size`, `scrollMode` et slots plutôt que des className arbitraires, mais uniquement après snapshots des 11 consommateurs.

### 5.2 Cible canonique

Douze primitives cibles sont retenues. Neuf existent ; trois sont approuvées comme cibles après caractérisation. Ce nombre ne constitue pas un quota de bibliothèque.

| Primitive cible | Statut | Responsabilité | Variantes/états requis | Exclusions et compatibilité |
|---|---|---|---|---|
| Badge | existante, P0 | étiquette statique | six tons actuels, futur mapping sémantique optionnel | pas de chip/toggle/type Pokémon |
| Button | existante, P1 | action/lien polymorphe | 4 variantes, 4 tailles, focus/disabled/loading composé | wrappers métier conservés |
| Card | existante, P1 | surface structurelle | soft/strong, ref, HTML | aucune logique métier |
| CardHeader | existante | header composable | eyebrow/action | pas de header universel de page |
| CardTitle | existante | titre de carte | niveau HTML à documenter | ne pas imposer une hiérarchie invalide |
| CardDescription | existante | description de carte | texte long/wrapping | pas de copie métier |
| Input | existante, P1 | input HTML stylé | default/focus/disabled/invalid | file/radio/checkbox séparés |
| Textarea | existante, P1 | textarea HTML stylée | mêmes états, resize à clarifier | éditeurs riches exclus |
| Modal | existante, P1 | dialogue modal accessible | tailles finies, focus, scroll, footer | overlays plein écran spécialisés exclus |
| Field | cible nouvelle, P1 | label + contrôle + aide + erreur | required/disabled/invalid | aucune orchestration de formulaire |
| Select | cible nouvelle, P1 | select HTML natif stylé | default/focus/disabled/invalid | palette picker et combobox exclus |
| Checkbox | cible nouvelle, P1 | checkbox HTML accessible | checked/unchecked/indeterminate/disabled/invalid | Switch et radio exclus |

`Panel`, `CardContent`, `CardFooter`, `MetricCard`, `ProgressBar`, `SearchField`, `Tooltip` et `Pagination` restent des candidats ou composites, pas des primitives approuvées dans cette roadmap.

### 5.3 Primitives absentes : décision fondée sur les usages

| Famille | Usage embarqué détecté | Répétition | Primitive justifiée | Priorité | Raison |
|---|---:|---:|---|---|---|
| Avatar | 0 | nulle | non | P3 | aucun usage réel |
| Checkbox | 8 natifs | suffisante | oui | P1 | cohérence et accessibilité, migration locale |
| Switch | 1 `aria-pressed` | insuffisante | non | P3 | comportement actuel = toggle button, pas switch |
| Pagination | 1 locale post-audit | unique | non, pour l’instant | P2 | garder « Ma collection » locale jusqu’au 2e besoin |
| Tabs | 0 rôle tab/tablist | nulle | non | P3 | la navigation existante n’est pas un tabset |
| Search | 12 icônes, usages à qualifier | variable | composition, pas atome | P2 | Input + icône + clear + debounce métier |
| Drawer | 1 sidebar mobile embarquée | unique | étude seulement | P2 | doit partager focus/overlay avec la navigation réelle |
| Tooltip | 15 `title` hôtes | moyenne mais ambiguë | étude seulement | P2 | distinguer nom accessible et information supplémentaire |
| Toast | 81 appels + 1 Toaster | forte | pas de nouvelle UI | P2 | Sonner est déjà la primitive de rendu ; service typé conditionnel |

## 6. Composants métier à conserver

Les 31 identités suivantes sont explicitement conservées comme composants ou composites métier. Elles peuvent adopter des primitives sans devenir elles-mêmes des primitives :

| ID | Composant | Pourquoi il reste métier |
|---|---|---|
| MWI-COMP-023 | PokemonWidget | données et composition Dashboard Pokémon |
| MWI-COMP-025 | StatCard | contrat statistique spécifique à valider avant généralisation |
| MWI-COMP-045 | EventEditorModal | formulaire et validation événementiels |
| MWI-COMP-051 | EventsCalendarPanel | calendrier, groupes et sélection d’événements |
| MWI-COMP-064 | EventDetailModal | overlay très riche, largeur/scroll et contenu événementiels |
| MWI-COMP-073 | CalendarPlanner | orchestration calendrier et persistance |
| MWI-COMP-078 | EventButton | sélection, dates et état événementiels |
| MWI-COMP-084 | KanbanTaskCard | drag/drop, actions, progression et modèle Task |
| MWI-COMP-089 | ToolbarButton | commande d’éditeur et label métier |
| MWI-COMP-098 | LearningDetailModal | progression pédagogique et sections complexes |
| MWI-COMP-105 | ProgressButton | transition de progression et sauvegarde |
| MWI-COMP-119 | LearningTopicCard | données/états pédagogiques |
| MWI-COMP-127 | AdminApp | orchestrateur principal Admin Pokémon |
| MWI-COMP-131 | Panel | composite visuel Admin Pokémon, avec façade MWI-COMP-298 |
| MWI-COMP-143 | BackgroundPanel | assets LocationCards et preview |
| MWI-COMP-148 | CatalogPanel | catalogues et cartes de types/attaques |
| MWI-COMP-150 | CollectionsPanel | gestion de collections et bulk edit |
| MWI-COMP-152 | DatasetSourceHeader | métriques et provenance de dataset |
| MWI-COMP-178 | DetailModal | fiche Pokémon complète et overlays imbriqués |
| MWI-COMP-181 | EggCard | rareté, types et contenu œuf |
| MWI-COMP-187 | MaxBattleCard | modèle Max Battle et icônes de types |
| MWI-COMP-191 | PokemonApiExplorer | routes, requêtes et rendu de réponses API |
| MWI-COMP-198 | PokemonCard | fiche Pokémon, assets, états et actions admin |
| MWI-COMP-202 | MatchupCard | matchup PvP et movesets |
| MWI-COMP-208 | RaidCard | boss, météo, types et raid tiers |
| MWI-COMP-215 | RewardCard | récompenses item/Pokémon et leurs assets |
| MWI-COMP-218 | ResearchPanel | recherches, groupes, récompenses et filtres |
| MWI-COMP-224 | RocketPanel | équipes Rocket, shadow/shiny et types |
| MWI-COMP-229 | ShinyTrackerPanel | données, chart, filtres et détail shiny |
| MWI-COMP-255 | TicketCard | backlog, statuts et actions ticket |
| sans ID post-audit | TrainerPokemonCollectionPanel | import, filtres, table, pagination, snapshots et rollback |

Les 58 façades de compatibilité sont également conservées jusqu’à preuve que leurs imports sont nuls. Elles ne comptent pas comme nouvelles implémentations métier.

## 7. Tokens

### 7.1 État vérifié

Le registre historique compte 1 712 enregistrements d’implémentation et les ensembles suivants :

| Catégorie | Total audit |
|---|---:|
| Définitions CSS | 61 |
| Variables CSS uniques | 40 |
| Couleurs littérales | 410 |
| Typographie | 199 |
| Spacing | 155 |
| Sizing | 195 |
| Radius | 15 |
| Borders/rings/outlines | 213 |
| Opacity | 26 |
| Shadows/elevation | 94 |
| Backgrounds/gradients/backdrops | 352 |
| Motion utilities | 8 |
| Breakpoints | 5 |

Le commit post-audit « Ma collection » ajoute au moins 21 utilitaires uniques sans nouvelle variable CSS ni animation. Les modifications concurrentes observées pendant la mission en ajoutent d’autres ; le total courant exhaustif doit être recalculé avec le générateur historique avant publication. La matrice de migration contient des décisions pour les tokens sémantiques, les duplications à fort volume et les valeurs structurelles ; l’inventaire historique exhaustif reste [tokens.json](../registries/tokens.json).

### 7.2 Tokens canoniques

- **Surfaces** : `--background`, `--panel`, `--panel-strong`.
- **Contenu** : `--foreground`, `--muted`, `--accent-text`.
- **Bordures** : `--line`, `--line-strong`, `--accent-border`.
- **Palette runtime** : `--brand`, `--brand-2`, `--brand-3`, les neuf `--accent-*`.
- **États** : `--warning`, `--danger`. Un token success manque, mais ne doit pas être aliasé sans étude à `--brand-3` car la palette runtime peut changer sa couleur.
- **Typographie** : `--font-sans`, `--font-mono`.
- **Radius** : `--radius-sm` et les alias md/lg/xl/2xl actuels à 8 px, conservés pendant la clarification sémantique.
- **Composites d’effet** : `glass-panel`, `glass-panel-strong`.
- **Responsive** : `sm`, `md`, `lg`, `xl`, `2xl`.

### 7.3 Duplications et valeurs codées en dur

Les plus fortes répétitions textuelles incluent `border-white/10` (257), `text-muted` (281), `text-white` (218), `rounded-lg` (250), `rounded-2xl` (210), `rounded-full` (211), `bg-white/[0.06]` (50), `bg-white/[0.055]` (45) et `min-h-11` (36). Ces nombres sont des occurrences statiques au dernier contrôle, pas la preuve d’une équivalence sémantique.

Les 410 couleurs littérales mélangent :

- couleurs structurelles du Dashboard, candidates à des rôles sémantiques ;
- couleurs de types Pokémon, de météo, de rareté ou de datasets, qui doivent rester domaine ;
- couleurs de charts et assets, parfois imposées par la lisibilité des séries ;
- valeurs de palettes runtime déjà centralisées dans `dashboard-palettes.ts`.

Les 94 ombres sont la dette la plus fragmentée. Une consolidation sûre commence par les répétitions exactes, par exemple `0 22px 90px rgba(0,0,0,.24)` pour les panels legacy, puis caractérise chaque usage. Le shadow de Modal reste distinct.

### 7.4 Seize groupes de duplication classés

| Groupe | Patterns/indices | Destination |
|---|---|---|
| Tons Badge canoniques | MWI-PATTERN-002 à 007 | Badge |
| Variantes Button | MWI-PATTERN-008 à 011 | Button |
| Tailles Button | MWI-PATTERN-012 à 015 | Button |
| Stacks flex/spacing | 016, 017, 021, 024 | conserver utilitaires ; pas de composant |
| Champ legacy | 018 | adaptateur Field/Input |
| Surface Panel legacy | 020 | token/composite Admin Pokémon |
| Bouton legacy secondary | 022 | adaptateur Button |
| Bouton legacy primary | 023 | adaptateur Button |
| Eyebrows | 025, 027, 169 | Typography/section label conditionnel |
| Matrices de tons Pokémon | 028 à 036 | tokens de domaine, pas Badge global |
| Empty dashed | 038, 152, 154 | StateFrame conditionnel |
| Layouts header/actions | 044, 045, 087, 114 | composition, pas Header universel |
| Surfaces compactes | 122, 153 | Card/row après comparaison |
| Grilles métriques | 116, 143 | MetricCard conditionnel |
| Couleurs de statut locales | 040, 042, 043, 049, 053, 066, 076 à 078 | mapping sémantique après contraste |
| Pills et tags compacts | 131 à 141, 170 à 173 | conserver domaine ou Badge statique selon sémantique |

### 7.5 Stratégie de migration des tokens

1. Capturer valeur déclarée et style calculé dans dark/light et les huit palettes.
2. Séparer tokens de rôle, tokens composites et valeurs de domaine.
3. Introduire un alias sémantique à valeur strictement identique.
4. Migrer une primitive ou un pilote sans supprimer l’ancien token.
5. Comparer screenshots et contrastes.
6. Migrer les consommateurs par famille.
7. Déprécier uniquement quand la recherche statique atteint zéro.
8. Supprimer dans un sprint séparé, avec rollback simple.

`--brand-*` et `--accent-*` ne sont pas des doublons malgré certaines valeurs par défaut identiques : les deux groupes sont modifiés au runtime par huit palettes et portent des rôles différents. De même, `border-white/10` ne peut pas être remplacé globalement par `border-line`, car leur comportement light diffère.

### 7.6 Règles Figma/code pour les tokens

- Une variable Figma par rôle sémantique et par mode, pas par classe Tailwind.
- Les huit palettes correspondent à des collections/modes ou à une table documentée, jamais à des styles détachés.
- Les valeurs de type Pokémon restent dans une collection domaine séparée.
- Les recettes `glass-panel` sont des styles/effects composés référencés par Card.
- Toute divergence temporaire porte un statut `deprecated` ou `compat`, un propriétaire et une date de suppression ciblée.
- Le code reste source de vérité jusqu’à validation d’une synchronisation automatisée bidirectionnelle.

## 8. Roadmap par sprints

L’ordre suit les dépendances réelles : instrumentation, primitive peu risquée, primitive interactive, formulaires, surfaces, overlays, états, couche legacy, puis composants complexes. Il ne suppose pas que toutes les cibles seront finalement créées.

### Sprint 0 — Baseline de non-régression

- **Objectif** : rendre les migrations mesurables avant de toucher aux composants.
- **Composants** : Badge, Button, Card, Input, Textarea, Modal comme sujets de capture ; aucune migration.
- **Fichiers probables** : scripts Playwright sous `Dashboard Admin/scripts/`, répertoire d’artefacts hors `public`, configuration de test et document de procédure.
- **Pages pilotes** : `/kanban`, `/database`, `/projects`, `/pokemon-admin`, `/login`.
- **Prérequis** : environnement de connexion reproductible, fixtures minimales, viewports définis.
- **Tests** : erreurs console, screenshots dark/light aux largeurs 375/768/1440, styles calculés des primitives, tab order, overflow.
- **Documentation** : procédure de baseline, convention de nommage des captures, matrice pages × thèmes × viewports.
- **Critères de sortie** : commandes reproductibles localement et artefacts de référence versionnés ou stockés selon la politique du projet.
- **Risques** : données réseau instables et authentification ; les isoler avec fixtures ou comptes de test.
- **Estimation** : M.

### Sprint 1 — Badge, pilote Kanban

- **Objectif** : remplacer deux squelettes de badge dupliqués par MWI-COMP-317.
- **Composants** : `Badge`, `KanbanTaskCard`, `KanbanTaskPreview`.
- **Fichiers probables** : `src/components/admin/forms/kanban-board.tsx`, tests/scripts ciblés ; `badge.tsx` inspecté mais non modifié attendu.
- **Page pilote** : `/kanban` uniquement.
- **Prérequis** : Sprint 0 pour cette page, cinq catégories présentes.
- **Tests** : styles calculés pour les cinq catégories, dark/light, carte sélectionnée, drag preview, modale inchangée, typecheck/lint.
- **Documentation** : responsabilité statique/non interactive de Badge et preuve du pilote.
- **Critères de sortie** : exactement deux éléments migrés, aucune variante ajoutée, aucune différence visuelle ou fonctionnelle.
- **Risques** : résolution de classes par `tailwind-merge` ; comparer les styles calculés.
- **Estimation** : S.

Le détail directement exécutable se trouve dans [first-sprint-plan.md](./first-sprint-plan.md).

### Sprint 2 — Contrat Button et un adaptateur

- **Objectif** : documenter le contrat Button et migrer un seul wrapper simple.
- **Composants** : MWI-COMP-318 et MWI-COMP-039 `ExternalButton` ; `ToolbarButton`, `ProgressButton` et `EventButton` observés mais inchangés.
- **Fichiers probables** : `src/components/ui/button.tsx`, `src/components/admin/dashboard/dashboard-home-live.tsx`, tests.
- **Page pilote** : `/`.
- **Prérequis** : baseline des états hover/focus/disabled, décision sur lien externe avec `asChild`.
- **Tests** : navigation, `target`/`rel`, clavier, focus visible, icône, tailles, dark/light et responsive.
- **Documentation** : matrice variante × taille × état ; règle Button vs lien vs wrapper métier.
- **Critères de sortie** : `ExternalButton` compose Button ou reste local avec justification mesurée ; aucun autre bouton natif migré.
- **Risques** : hauteur/rayon legacy et sémantique de lien ; utiliser une classe de compatibilité ciblée si nécessaire.
- **Estimation** : M.

### Sprint 3 — Field, Select et Checkbox sur un formulaire

- **Objectif** : établir le contrat formulaire sans migrer tous les contrôles.
- **Composants** : Input, Textarea, cible Field, cible Select native-backed, cible Checkbox ; Kanban comme pilote.
- **Fichiers probables** : `src/components/ui/input.tsx`, nouveaux fichiers UI seulement si les contrats sont validés, `src/components/admin/forms/kanban-board.tsx`.
- **Page pilote** : modale `/kanban`.
- **Prérequis** : inventaire label/aide/erreur/required, tailles et browser rendering ; Sprint 0.
- **Tests** : tab order, labels, erreur, disabled, checkbox Space, select clavier, date/time natifs, mobile Safari/Chromium si disponibles.
- **Documentation** : anatomie Field, états invalid/disabled, exclusions file/radio.
- **Critères de sortie** : un formulaire migré, style identique, aucune logique de validation déplacée dans les primitives.
- **Risques** : modifier le rendu natif ou l’alignement des contrôles date/select ; commencer par les contrôles visuellement équivalents.
- **Estimation** : L.

### Sprint 4 — Card et métrique pilote

- **Objectif** : distinguer surface structurelle et contrat statistique.
- **Composants** : MWI-COMP-319 à 322, MWI-COMP-025 `StatCard`, MWI-COMP-316 `MetricCard` comme comparaison, sans fusion automatique.
- **Fichiers probables** : `src/components/ui/card.tsx`, `src/components/admin/cards/stat-card.tsx`, `src/components/site/metric-card.jsx`, un consommateur de `/database` ou `/analytics`.
- **Page pilote** : une seule section métrique de `/database`.
- **Prérequis** : classification Card complète, tokens surface/radius/shadow, fixtures de données.
- **Tests** : valeurs longues/nulles, icônes absentes, grilles responsive, dark/light, alignement des chiffres.
- **Documentation** : Card structurelle vs MetricCard composite ; décision explicite sur CardContent/Footer.
- **Critères de sortie** : une anatomie commune prouvée ou décision documentée de ne pas généraliser.
- **Risques** : effet domino sur 42 consommateurs directs ; aucune modification globale de Card sans captures de tous les consommateurs critiques.
- **Estimation** : L.

### Sprint 5 — Modal simple et contrat d’overlay

- **Objectif** : caractériser MWI-COMP-325 et migrer le dialogue simple le plus proche.
- **Composants** : Modal et MWI-COMP-094 `AdminVersionHistoryDialog`.
- **Fichiers probables** : `src/components/ui/modal.tsx`, `src/components/admin/layout/admin-version-history-dialog.tsx`.
- **Page pilote** : ouverture de l’historique de version depuis le layout Dashboard.
- **Prérequis** : tests focus post-audit, politique z-index, nested overlays, baseline mobile.
- **Tests** : ouverture/fermeture, Escape, click overlay, Tab/Shift+Tab, restauration du focus, scroll lock, lecteur d’écran (`aria-labelledby`), 375/768/1440.
- **Documentation** : tailles, slots, scrollMode, overlay levels et exclusions.
- **Critères de sortie** : dialogue pilote migré, aucun changement de focus/scroll/rendu, tests verts.
- **Risques** : focus piégé incorrectement, double `autoFocus`, contenu long ; risque critique, rollback immédiat au premier écart.
- **Estimation** : L.

### Sprint 6 — États simples

- **Objectif** : consolider uniquement les états structurellement identiques.
- **Composants** : MWI-COMP-237 `DashboardLoadingState`, MWI-COMP-040 `EmptyLine`, MWI-COMP-161 `EmptyInline` et une erreur retryable simple.
- **Fichiers probables** : `src/components/admin/shared/loading-state.tsx`, nouveau composite StateFrame si trois usages concordent, un consommateur pilote.
- **Page pilote** : `/projects` ou une section non critique avec fixtures loading/empty/error.
- **Prérequis** : copie et `aria-live` attribuées au métier, Card/Button stabilisés.
- **Tests** : lecteur d’écran, animation réduite, retry, contenu long, mobile, dark/light.
- **Documentation** : distinction loading, empty, no-results, error, success ; qui possède l’icône et le texte.
- **Critères de sortie** : au moins trois usages réellement identiques ou décision de conserver des compositions locales.
- **Risques** : uniformiser des messages ou actions qui ont des sens différents.
- **Estimation** : M.

### Sprint 7 — Adaptateur visuel Admin Pokémon

- **Objectif** : réduire les exports de classes legacy sans changer le langage visuel Pokémon.
- **Composants** : MWI-COMP-131 `Panel`, `buttonClass`, `primaryButtonClass`, `fieldClass`; un panel simple comme pilote.
- **Fichiers probables** : `src/components/admin/pokemon/admin-ui.jsx`, un panel pilote tel que `admin-todo-panel.jsx`, tests et tokens.
- **Page pilote** : une seule section `/pokemon-admin`.
- **Prérequis** : Button/Field/Card stables, captures des huit palettes, décision sur `border-white/10` et `bg-white/[0.055]`.
- **Tests** : huit palettes × deux thèmes, responsive, actions, focus, données vides/chargées.
- **Documentation** : composite `PokemonAdminPanel`, tokens legacy, plan de dépréciation des exports de chaînes.
- **Critères de sortie** : un consommateur pilote sans changement visuel ; exports legacy toujours disponibles pour les autres.
- **Risques** : light mode, gradients et ombres très spécifiques ; ne pas convertir par recherche/remplacement.
- **Estimation** : XL.

### Sprint 8 — Déploiement progressif et composants complexes

- **Objectif** : migrer famille par famille sur la base des pilotes validés.
- **Composants** : wrappers simples, puis composites ; `AdminApp`, `DetailModal`, `EventDetailModal`, charts et cartes Pokémon en dernier.
- **Fichiers probables** : sélectionnés par graphe de dépendances et non par dossier entier.
- **Pages pilotes** : une page par lot, avec rollback indépendant.
- **Prérequis** : métriques d’usage, primitives documentées, compatibilité et tests visuels automatisés.
- **Tests** : suite complète unitaire/intégration/visuelle/accessibilité/métier.
- **Documentation** : registre courant, statut de migration par composant, dette résiduelle.
- **Critères de sortie** : recherche statique nulle avant suppression, compatibilité retirée dans un lot distinct.
- **Risques** : accumulation de lots trop larges ; limiter chaque PR à une famille et une page pilote.
- **Estimation** : XL, découpé en plusieurs sprints réels.

## 9. Stratégie de migration

Pour chaque primitive ou composite :

1. **Définir le périmètre et les exclusions.** Lister les IDs, fichiers, pages, comportements et tokens hors scope.
2. **Écrire les tests de caractérisation.** Couvrir le DOM utile, l’API, les interactions, les styles calculés et les branches métier avant modification.
3. **Capturer la page pilote.** Dark/light, viewports, états et données représentatives.
4. **Consolider ou ajouter la primitive.** API finie, responsabilités courtes, ref et attributs natifs transmis, aucune donnée métier.
5. **Ajouter une couche de compatibilité si nécessaire.** Alias de props, wrapper ou classe legacy ; aucune suppression dans le même mouvement.
6. **Migrer une page pilote.** Diff limité, pas de nettoyage adjacent.
7. **Valider visuellement et fonctionnellement.** Comparaison automatique puis revue humaine des différences autorisées — normalement aucune.
8. **Étendre par petits lots.** Prioriser faible centralité, données faciles à fixture et rollback local.
9. **Mesurer la dette restante.** Imports anciens, contrôles natifs, tokens hardcodés, chemins de compatibilité.
10. **Supprimer le code mort dans un sprint séparé.** Uniquement après recherche statique nulle, tests verts et période de compatibilité définie.
11. **Mettre à jour l’audit courant.** Générer un addendum, de nouveaux IDs officiels et les fiches docs ; préserver l’audit du 13 juillet comme historique.

La migration n’est pas terminée lorsqu’un composant compile ; elle est terminée lorsque le rendu, le comportement, les tests, Figma, le registre et la documentation concordent.

## 10. Stratégie de tests

### Tests unitaires et contrats

- unions de variantes et tailles ;
- transmission des attributs/ref ;
- valeur par défaut ;
- classes finales après `cn`/`tailwind-merge` ;
- événements sans double appel ;
- absence de props métier dans les primitives.

Le projet ne dispose pas d’un runner de composants React dédié. Les premiers sprints peuvent utiliser `node:test` pour les contrats statiques, mais la roadmap recommande d’évaluer un runner DOM léger lorsque les interactions de primitives deviennent nombreuses. Un test textuel ne remplace pas un test navigateur.

### Tests d’intégration

- formulaires avec validations existantes ;
- navigation et liens ;
- ouverture/fermeture de modales ;
- drag/drop Kanban ;
- import/preview/rollback « Ma collection » ;
- mutations et toasts ;
- aucune modification de payload ou de persistance.

### Tests visuels

- screenshots avant/après sur 375, 768 et 1440 px ;
- dark/light et palettes runtime pertinentes ;
- état default, hover, focus, disabled, selected, loading, error, empty ;
- contenu court/long, nombres élevés, icônes absentes ;
- comparaison de styles calculés pour les migrations sensibles.

### Responsive

- aucun overflow horizontal involontaire ;
- tables scrollables au clavier ;
- overlays à hauteur dynamique ;
- sidebar mobile ;
- touch targets ;
- zoom texte 200 % pour les composants consolidés.

### Accessibilité et clavier

- noms accessibles ;
- ordre des titres ;
- Tab/Shift+Tab, Enter, Space, Escape et flèches selon le contrôle ;
- focus visible et restauration ;
- `aria-live` pour chargement/import ;
- contraste dans chaque thème/palette ;
- pas d’information indispensable uniquement dans `title` ou la couleur.

### Motion

- `prefers-reduced-motion` sur spin, pulse, transitions, Framer Motion et animations CSS ;
- aucun état dépendant de la fin d’une animation ;
- stabilité du layout pendant loading.

### Non-régression métier

- assertions ciblées sur routes, filtres, tri, pagination, import, sauvegarde, drag/drop et rollback ;
- fixtures stables ;
- aucune migration de données associée à un refactor visuel ;
- console et requêtes réseau surveillées pendant les captures.

## 11. Synchronisation Figma

### À représenter

1. Variables dark/light et huit palettes runtime.
2. Tokens de surfaces, contenu, bordures, états, radius, spacing utile, shadow, z-index et motion.
3. Les douze primitives cibles avec variantes et états réellement implémentés.
4. Composites validés : Field, StateFrame éventuel, PokemonAdminPanel éventuel, ChartSurface éventuel.
5. Exemples métier représentatifs : une carte Pokémon, une carte raid, un panel, un état de formulaire — pas une copie de toutes les 67 Cards.
6. Propriétés de composants Figma correspondant aux unions finies du code, pas à chaque classe ou texte métier.

### Ordre de synchronisation

1. variables et modes ;
2. Badge pilote ;
3. Button, champs et Card ;
4. Modal après tests focus ;
5. composites stabilisés ;
6. exemples métier.

### Gouvernance

- Chaque composant Figma porte l’ID documentaire officiel et le chemin source canonique.
- Chaque variante a une correspondance code testée.
- Les composants `compat` ne deviennent pas des composants Figma distincts.
- Une modification Figma n’est pas “livrée” tant que le code et les screenshots ne la valident pas.
- Les tokens Pokémon sont séparés des tokens UI généraux.
- La duplication complète des cartes métier est interdite si des exemples composés suffisent.

## 12. Documentation

Documents à créer ou mettre à jour à mesure des sprints :

- `docs/codex/Tome 1 — Foundation (Fondations)/DOC-010-design-system-overview.md` : état réellement implémenté, gouvernance et liens vers les roadmaps ;
- fiches `COMP-*` des primitives et composites consolidés ;
- documents du futur Tome 3 Design System, seulement selon le registre documentaire officiel ;
- registre courant des composants avec statut `canonical`, `business`, `compat`, `deprecated` ;
- registre courant des tokens avec alias et date de dépréciation ;
- matrice de migration famille par famille ;
- addendum post-audit pour « Ma collection » et les évolutions ultérieures ;
- guide de tests visuels et accessibilité ;
- changelog de migration et plan de rollback par sprint.

Chaque fiche composant doit contenir responsabilité, anatomie, API, variantes, états, accessibilité, tokens, exemples, exclusions, consommateurs, Figma node/variant, tests et statut de compatibilité. Aucun ID ne doit être attribué manuellement sans le registre officiel.

## 13. Risques et anti-patterns

| Risque/anti-pattern | Signal | Prévention |
|---|---|---|
| Composant universel surchargé | dizaines de booléens et conditions croisées | sous-composants, slots et variantes finies |
| Abstraction prématurée | une seule occurrence ou simple suffixe commun | exiger répétition et contrat identique |
| Migration globale | diff multi-dossiers et toutes pages | un pilote et une famille par lot |
| Changement visuel involontaire | remplacement de valeurs “proches” | styles calculés et screenshots dark/light |
| Variantes booléennes incontrôlables | `compact`, `small`, `dense`, `flat`, `outlined` combinés | unions exclusives et composition |
| Duplication Figma/code | variantes Figma sans équivalent React | mapping testé et IDs communs |
| Suppression prématurée de compatibilité | import historique encore présent | télémétrie/recherche nulle et sprint séparé |
| Tests insuffisants | validation par compilation seulement | characterization + navigateur + métier |
| Tokens sans usage | alias créé “pour compléter” | exiger deux usages équivalents ou un rôle structurel critique |
| Confusion domaine/DS | `fire`, `water`, `raid`, `shiny` ajoutés à Badge global | conserver les tokens et pills Pokémon séparés |
| Remplacement light dangereux | `border-white/10` → `border-line` global | comparer les deux thèmes et huit palettes |
| Modal trop tôt | focus/scroll/nesting non testés | pilote simple, overlays complexes en dernier |
| Nettoyage adjacent | refactor non nécessaire dans le même sprint | diff strict et backlog séparé |
| IDs inventés | nouveaux `MWI-COMP-*` manuels | régénération officielle ou label sans ID |

Risques ouverts : absence du générateur historique dans le workspace, absence de baseline visuelle versionnée, couverture runtime dépendante de l’authentification et des données, absence de source Figma connectée, et absence de token success sémantique validé.

## 14. Backlog priorisé

| ID | Tâche | Famille | Valeur | Risque | Taille | Dépendances |
|---|---|---|---|---|---|---|
| DS-001 | Installer baseline screenshots/styles calculés | Transverse | très haute | faible | M | aucune |
| DS-002 | Régénérer l’addendum audit « Ma collection » avec IDs officiels | Audit | haute | faible | M | générateur historique |
| DS-003 | Pilote Badge sur deux libellés Kanban | Badge | haute | faible | S | DS-001 |
| DS-004 | Documenter le contrat Badge et ses exclusions | Badge | haute | faible | S | DS-003 |
| DS-005 | Caractériser Button 4×4 et les 184 boutons natifs | Button | très haute | moyen | M | DS-001 |
| DS-006 | Migrer ExternalButton avec compatibilité exacte | Button | moyenne | moyen | M | DS-005 |
| DS-007 | Classer les contrôles natifs par équivalence visuelle | Forms | haute | faible | M | DS-001 |
| DS-008 | Définir Field à partir des usages réels | Forms | haute | moyen | M | DS-007 |
| DS-009 | Définir Select natif et migrer un formulaire | Select | haute | moyen | L | DS-008 |
| DS-010 | Définir Checkbox et migrer un seul usage | Checkbox | haute | moyen | M | DS-008 |
| DS-011 | Classer les 67 Cards dans le registre courant | Cards | très haute | faible | M | DS-002 |
| DS-012 | Piloter Card/Metric sur une section database | Cards | haute | élevé | L | DS-001, DS-011 |
| DS-013 | Décider CardContent/CardFooter sur preuves | Cards | moyenne | moyen | S | DS-012 |
| DS-014 | Caractériser les 15 modals/dialogs et 8 overlays | Modal | très haute | élevé | L | DS-001 |
| DS-015 | Tester formellement focus/scroll de Modal | Modal | très haute | critique | M | DS-014 |
| DS-016 | Migrer AdminVersionHistoryDialog | Modal | haute | élevé | L | DS-015 |
| DS-017 | Classer loading/empty/no-results/error/success | States | haute | faible | M | DS-002 |
| DS-018 | Piloter StateFrame sur une page non critique | States | moyenne | moyen | M | DS-017, DS-012 |
| DS-019 | Documenter et tokeniser la surface Panel legacy | Panels/Tokens | haute | élevé | L | DS-001 |
| DS-020 | Piloter l’adaptateur Admin Pokémon | Panels | haute | élevé | XL | DS-005, DS-008, DS-012, DS-019 |
| DS-021 | Auditer les 15 `title` hôtes et icon buttons | Tooltip/A11y | moyenne | moyen | M | DS-001 |
| DS-022 | Décider SearchField à partir des usages qualifiés | Search | moyenne | moyen | M | DS-008 |
| DS-023 | Conserver Pagination locale et mesurer le 2e besoin | Pagination | moyenne | faible | XS | aucune |
| DS-024 | Normaliser la stratégie Sonner sans nouvelle UI | Toast | moyenne | moyen | M | taxonomie erreurs |
| DS-025 | Construire bibliothèque Figma depuis les contrats validés | Figma | très haute | moyen | XL | DS-003 à DS-020 |
| DS-026 | Migrer les composants simples par lots | Transverse | très haute | élevé | XL | pilotes validés |
| DS-027 | Migrer AdminApp/DetailModal/EventDetailModal en dernier | Complexes | haute | critique | XL | DS-026 |
| DS-028 | Retirer façades et tokens dépréciés dans des lots séparés | Compat | moyenne | élevé | L | recherche nulle, DS-026 |

## 15. Premier sprint recommandé

### Comparaison des candidats

| Candidat | Valeur | Risque | Rayon d’impact | Facilité de preuve | Verdict |
|---|---|---|---|---|---|
| Badge | haute | faible | 35 consommateurs, mais pilote isolable | excellente : non interactif et classes exactes | retenu |
| Button | très haute | élevé | 31 directs + 184 natifs | interactions et styles legacy nombreux | Sprint 2 |
| Card | très haute | élevé | 42 directs, 20 pages | surfaces hétérogènes | après classification |
| Input/Textarea | haute | moyen | formulaires et contrôles natifs variés | navigateur/validation à couvrir | Sprint 3 |
| Modal | très haute | critique | focus, scroll, overlays imbriqués | preuve coûteuse | Sprint 5 |
| Empty/Loading/Error | haute | moyen | copie/actions métier variables | contrat encore flou | Sprint 6 |

### Choix

Le Sprint 1 migre uniquement les libellés de catégorie de `KanbanTaskCard` et `KanbanTaskPreview` vers MWI-COMP-317. Les deux éléments dupliquent le squelette exact de Badge ; `categoryStyles` conserve les cinq valeurs métier afin de préserver les différences d’alpha existantes. Les boutons de catégorie, les priorités, statuts, tags et autres pills restent hors périmètre.

Ce choix :

- teste la méthode characterization → migration → comparaison → documentation ;
- donne un résultat visible sur `/kanban` ;
- ne modifie ni données, ni API, ni interaction ;
- n’ajoute aucune variante globale ;
- se rollbacke en rétablissant deux `span` ;
- fournit un signal fiable avant les familles à grand rayon d’impact.

Le plan complet, commandes, critères d’acceptation et rollback sont dans [first-sprint-plan.md](./first-sprint-plan.md).

## 16. Informations absentes et rapport de mission

Informations non disponibles dans le code ou le workspace :

- le script exact ayant généré le registre historique de patterns/états ;
- des captures runtime authentifiées pour tous les états de données ;
- une source Figma connectée et ses IDs de nodes ;
- une baseline visuelle officielle versionnée ;
- un processus officiel d’attribution des nouveaux IDs `MWI-COMP-*` ;
- des métriques d’usage runtime permettant de savoir quelles façades sont encore chargées en production.
- le générateur historique nécessaire pour attribuer de nouveaux totaux stables pendant que le working tree évolue concurremment.

Résultat documentaire :

- 22 familles détaillées dans la matrice JSON ;
- 12 primitives cibles, dont 9 existantes et 3 cibles fondées sur les usages ;
- 31 composants métier explicitement conservés ;
- 16 groupes de duplication classés ;
- 28 tâches priorisées ;
- un premier sprint concret, réversible et directement utilisable.

Dans le périmètre de cette mission : **Aucun fichier source du Dashboard n’a été modifié.** Les changements source non commis signalés en section 2.3 sont concurrents et ont été préservés tels quels.
