# Rapport — Sprint Accessibilité des formulaires

Date d’exécution : 14 juillet 2026. Périmètre : 95 contrôles statiques, dont la cohorte historique de 43 cas vérifiée au runtime.

## 1. Inspection

Le premier `git status --short` montrait les changements non commités du sprint Field précédent : backlog et index des sprints, Projets, Login, éditeur Events, Calendrier, Kanban, Notes, Dashboard Backlog, plus les nouveaux documents/scripts Field. Ils ont été reconnus et préservés. Pendant la mission, un processus concurrent a créé le commit `b963f5c` (`refactor: replace label elements with a reusable Field component across various forms`) qui a intégré ces changements. La mission n’a créé ni ce commit ni un autre commit. Les fichiers cibles ont été réinspectés après cette intégration ; aucun conflit ni contenu concurrent non résolu n’était présent avant les corrections de ce sprint.

Le serveur Next local a modifié temporairement `next-env.d.ts` vers le chemin dev ; après arrêt du serveur, cette seule modification générée par la mission a été remise à sa ligne initiale avec un patch ciblé. Aucun reset, restore, checkout, clean, reformatage global ou restauration de changement concurrent n’a été exécuté.

Après la validation visuelle finale, une seconde vague concurrente est apparue : `src/app/api/pokemon-admin/route.ts` et `src/app/api/pokemon-api-proxy/route.ts` modifiés, `best-attackers-panel.jsx` et `pokemon-artwork.jsx` créés, plus des ajouts Best Attackers dans `admin-app.jsx`. Cette dernière constitue une collision tardive au niveau fichier mais pas au niveau des lignes du sprint. Aucune source n’a été modifiée par la mission après sa détection. Un audit read-only post-collision confirme toujours 95 contrôles, test statique 6/6, typecheck passé et lint de ces changements concurrents à 0 erreur / 4 avertissements `<img>`.

Les sources de vérité, l’inventaire Field, `Field`, `Input` et `Textarea` ont été lus. Les primitives correspondent au sprint précédent et restent absentes du diff.

## 2. Inventaire et classification

| Mesure | Total |
|---|---:|
| Contrôles du projet | 95 |
| Noms déjà démontrés avant cette cohorte | 52 |
| Cohorte runtime | 43 |
| A — déjà accessible/légitime dans la cohorte | 1 |
| B — corrections simples et sûres | 18 |
| C — contrôles spécialisés | 3 |
| D — cas ambigus | 21 |
| Total projet A/B/C/D | 53 / 18 / 3 / 21 |

Le cas A est l’input hidden de redirection Login, volontairement hors arbre. Les cas C sont la checkbox de checklist Kanban, le file input pédagogique et le radio de stratégie ; le radio possède déjà un label englobant au runtime. Les 21 cas D n’offrent pas de texte métier assez fiable ou relèvent d’un contexte composite. Ils restent inchangés.

## 3. Noms statiques et runtime

La baseline Playwright a calculé rôle, nom et source réelle sur les 43 contrôles. Les résultats détaillés sont dans `accessible-name-analysis.md`. Le placeholder a parfois contribué au nom calculé par le navigateur, mais n’a jamais été accepté comme label final.

Après migration, les 18 cas B exposent exactement le texte métier existant attendu. Répartition : 17 `aria-label` et 1 `aria-labelledby`. Aucun texte, placeholder ou label visible n’a changé.

## 4. Labels, descriptions et erreur corrigés

| Contrat | Total |
|---|---:|
| Noms associés | 18 |
| `aria-label` | 17 |
| `aria-labelledby` | 1 |
| `aria-describedby` | 5 |
| `aria-invalid` conditionnel | 1 |
| IDs stables ajoutés | 7 |
| Descriptions existantes reliées | 4 |
| Erreurs existantes reliées | 1 |

Les descriptions concernent Journal du jour, filtre de cibles, Corrections groupées et Export et partage. L’erreur « Connexion refusée. » est reliée au mot de passe Admin Pokémon uniquement quand elle existe, avec `aria-invalid=true`. Aucun `role=alert` n’a été ajouté, car le toast existant annonce déjà l’échec ; cela évite une annonce doublée.

L’erreur globale du Login principal reste non reliée à un champ : elle peut provenir de l’email, du mot de passe ou de la configuration serveur. Une association locale aurait inventé une sémantique fausse.

## 5. Décision Field

`src/components/ui/field.tsx` et `src/components/ui/input.tsx` sont strictement inchangés, hashes contrôlés par le test statique. Les cas ne démontrent pas trois usages partageant le même contrat description/erreur et une solution locale explicite suffit. Aucune API générique, validation, génération d’ID, clonage, prop booléenne ou logique métier n’a été ajoutée.

## 6. Fichiers

Fichiers créés : les six documents de `sprints/form-accessibility/` et les scripts `scripts/test-form-accessibility.mjs` et `scripts/verify-form-accessibility.mjs`.

Sources modifiées :

- `color-lab.tsx`, `daily-tools.tsx`, `snippet-vault.tsx` ;
- `event-editor-modal.jsx`, `events-calendar-panel.jsx` ;
- `notes-board.tsx`, `todo-list.tsx` ;
- `admin-app.jsx`, `admin-todo-panel.jsx`, `collections-panel.jsx`, `dataset-filter-bar.jsx`, `login-card.jsx`, `pokemon-docs-viewer.tsx` ;
- `dashboard-backlog.tsx`.

Documents programme modifiés : backlog officiel et index des sprints. Aucun fichier Foundation historique n’est modifié.

## 7. Tests

| Validation | Résultat final |
|---|---|
| Test statique avant migration | 6/6 passés |
| Test statique après migration | 6/6 passés |
| `npm run typecheck` | passé, 0 erreur |
| ESLint ciblé | passé, 0 erreur ; 7 avertissements `<img>` préexistants |
| Playwright | 132 scénarios, 0 différence critique |
| Matrice | 22 scénarios × 2 thèmes × 3 viewports |
| Contrôles de la cohorte | 43 IDs uniques |
| Changements d’accessibilité vérifiés | 108 instances B (18 × 6) |
| Différences pixel sur les cibles | 0 pixel |
| Overflow horizontal | 0 sur 132 scénarios |
| Erreurs React/page inattendues | 0 |
| Erreurs console inattendues | 0 |
| `git diff --check` | passé |
| Checklist React | passée, aucun changement de structure, état ou handler |

Le scénario invalide Pokémon produit volontairement un 401 réseau, comportement baseline attendu et conservé. Il ne masque aucune autre erreur console.

## 8. Dark/light, responsive et visuel

Dark et light sont validés à 375 × 812, 768 × 1024 et 1440 × 1000. Les pages couvertes comprennent Login, Projects, Kanban, Calendar, Notes, Event Editor, Dashboard Backlog, Palette, Tools, Snippets, Todo, Writer, Learning, Docs Pokémon et sept états Admin Pokémon.

Les styles default, focus et filled sont équivalents. Les captures des 18 cibles corrigées comptent 0 pixel différent. Une tolérance limitée aux interpolations couleur de transition est appliquée aux styles calculés (0,02 pour les composantes normalisées, 6 unités RGB), tandis que les pixels des cibles restent stricts.

Le registre OpenAPI de `/pokemon-docs` charge dynamiquement 7 puis 84 endpoints selon le temps de réponse externe. Neuf hashes de page ont différé ; quatre captures Docs comptent un écart visible dans cette zone dynamique, une capture Todo compte 15 pixels, et les autres comptent 0 pixel au seuil de canal. Ces écarts sont conservés dans `comparison.json`, exclus du blocage Docs uniquement, et la cible `A11Y-FIELD-086` reste à 0 pixel dans tous ses états.

## 9. Clavier, focus et fonctions

Tab puis Shift+Tab, visibilité du focus, structure focusable, rôle, required, disabled, readOnly, saisie et restauration de valeur sont comparés avant/après. Aucun élément non interactif n’est devenu focusable et le tab order est inchangé. Les modales Projects, Kanban, Calendar, Snippets, Learning et Events sont ouvertes par le banc de test. L’édition Todo Admin et la soumission invalide du Login Pokémon sont exercées. Les handlers, valeurs et validations sont hors diff.

La suppression destructive et les soumissions qui écriraient des données n’ont pas été déclenchées ; les scénarios utilisent des fixtures API et du stockage local isolé. Les boutons/handlers correspondants sont inchangés. Le Login principal a été rechargé dans le navigateur intégré : email et mot de passe conservent leur label, le bouton « Entrer dans le dashboard » est présent et aucun overlay bloquant n’est apparu.

## 10. Artefacts

`test-results/form-accessibility/` contient 444 PNG avant, 444 après et 3 JSON (`baseline.json`, `after.json`, `comparison.json`), soit 891 fichiers et environ 68 Mo. La règle existante `test-results/` de `.gitignore` les ignore ; aucun artefact n’est placé dans `public/` et `.gitignore` n’a pas été modifié.

## 11. Écarts et risques ouverts

- Les 21 cas D attendent un texte métier explicite ou un sprint spécialisé ; aucune correction n’a été inventée.
- Les 3 cas C restent hors migration conformément au périmètre.
- Les 52 contrôles déjà nommés ont été réinventoriés statiquement ; la campagne runtime approfondie est ciblée sur les 43 risques hérités.
- Les 7 avertissements ESLint `<img>` sont préexistants dans `admin-app.jsx` et `collections-panel.jsx`, sans rapport avec ce sprint.
- Le registre OpenAPI externe rend la capture de page Docs partiellement dynamique ; les captures de la cible corrigée sont déterministes.
- Les ajouts concurrents Best Attackers sont postérieurs aux 132 scénarios visuels. Ils sont hors mission, n’ajoutent aucun contrôle à l’inventaire Field et n’altèrent pas les relations ARIA du sprint ; la campagne visuelle n’a pas été relancée contre ce diff concurrent pour ne pas mélanger les responsabilités.

La checklist React n’a demandé aucune adaptation : les attributs ARIA natifs n’ajoutent ni état, effet, callback, rendu conditionnel nouveau ou coût de rendu significatif.

## 12. Rollback

Le rollback retire uniquement les 17 `aria-label`, le `aria-labelledby`, les 5 `aria-describedby`, le `aria-invalid` conditionnel et les 7 IDs de ces 14 sources. Les textes, classes, valeurs et handlers restent en place. Les scripts et documents peuvent être conservés. Aucun autre fichier ni changement concurrent ne doit être restauré.

## 13. Prochain sprint recommandé

Prochain sprint unique recommandé, non démarré : **Sprint Stabilisation Modal — rôle dialog, nom accessible, focus initial/retour, fermeture et responsive des overlays legacy**. Il correspond à `DS-BACKLOG-011`, désormais planifié. Il ne doit créer ni Select ni Checkbox.

## 14. Conclusion

Sprint Accessibilité des formulaires validé : tous les défauts sûrs de nom accessible, description et erreur identifiés ont été corrigés sans régression détectée.

Aucun commit, push ou déploiement n’a été effectué.
