---
id: DOC-001
titre: Règles générales du projet
version: 1.1.0
statut: Actif
derniere_mise_a_jour: 2026-07-13
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 00
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
  - Futurs dépôts de la plateforme
references:
  - README.md
  - DOC-005
  - DOC-006
  - DOC-009
  - DOC-010
  - DOC-011
  - DOC-014
  - DOC-016
  - DOC-017
  - DOC-020
  - DOC-023
  - DOC-025
  - DOC-030
  - DOC-034
---

# 00 — Règles générales du projet

> Ce document constitue la **constitution technique et organisationnelle** de la plateforme MatWeb Pokémon GO.
>
> Toute évolution du code, des données, de l’architecture, du Design System, de l’API, du Dashboard, des Providers, de MongoDB ou de la documentation doit respecter les règles définies ici.

## Objectif

Définir les règles permanentes qui encadrent le développement, la maintenance, la documentation, le déploiement et l’évolution de la plateforme Pokémon GO.

Ce document sert de référence commune pour :

- Matthieu Vachet ;
- Codex ;
- les futurs contributeurs ;
- les audits techniques ;
- les migrations ;
- les nouvelles fonctionnalités ;
- les nouveaux Providers ;
- les nouveaux datasets ;
- les nouvelles pages du Dashboard ;
- les composants UI ;
- les routes API ;
- les collections MongoDB ;
- les assets ;
- les tests ;
- le versionnage ;
- la documentation.

## Portée

Ces règles s’appliquent à :

- Dashboard Admin ;
- PokemonGo-API- ;
- PokemonGo-Data ;
- PokemonGo-Assets-API ;
- Landing-Page-PogoApi ;
- tout futur dépôt ajouté à l’écosystème.

## Philosophie générale

La plateforme doit rester :

- claire ;
- modulaire ;
- documentée ;
- testable ;
- observable ;
- évolutive ;
- maintenable ;
- cohérente visuellement ;
- fiable sur le plan des données.

Le projet privilégie toujours :

1. la fiabilité avant la vitesse ;
2. la lisibilité avant la complexité ;
3. la réutilisation avant la duplication ;
4. la validation avant la publication ;
5. la documentation avant l’oubli ;
6. l’évolution progressive avant la réécriture brutale ;
7. les données locales validées avant les informations externes non contrôlées.

**État d'application observé par le méga-audit code-only :** ce document reste normatif ; il ne décrit pas automatiquement l'état atteint. L'audit confirme notamment la confidentialité Shiny de bout en bout et l'existence de validations/hash/read-back sur les pipelines courants. Il relève toutefois les écarts prioritaires suivants :

| Règles concernées | Écart observé |
|--------------------|---------------|
| RULE-008, RULE-009 | plusieurs pipelines spécialisés, architecture API Express/Vercel/Next.js et deux implémentations `ensure-data` coexistent |
| RULE-010, RULE-021, RULE-022 | 561 occurrences visuelles potentiellement hardcodées sur 136 fichiers de composants ; primitives partagées incomplètes et contrôles reconstruits localement |
| RULE-012 | les autorités sont hybrides par domaine : Data statique, MongoDB current, Assets raw et collections Dashboard |
| RULE-015, RULE-028 | read-back présent, mais transaction globale et rollback automatique non trouvés pour les synchronisations multi-collections/current |
| RULE-030 à RULE-032 | tests existants mais couverture UI/runtime incomplète et absence de gate CI commun avant mutation/déploiement |
| RULE-034 | conformité partielle : focus de modales, labels, DnD clavier, contrastes et reduced-motion restent non démontrés ou incomplets |
| RULE-035 à RULE-038 | packages, UI, OpenAPI et changelogs divergent ; aucun tag/release automatisé n'est confirmé |
| RULE-020 | un credential Git potentiel a été détecté dans la configuration d'un snapshot `.data` et doit être vérifié/révoqué sans l'exposer dans la documentation |

---


## RULE-001 — Ne jamais casser l’existant

Toute nouvelle fonctionnalité, correction, migration ou refactorisation doit préserver les comportements existants, sauf modification explicitement demandée et documentée.

### Exigences
- Identifier les fonctionnalités impactées.
- Vérifier les routes, composants, hooks, services et datasets concernés.
- Ajouter ou mettre à jour les tests.
- Documenter tout changement de comportement.
- Mettre à jour le versionnage si nécessaire.
- Ne supprimer aucune fonctionnalité encore utilisée sans validation.

### Vérification
- [ ] L’existant a été testé.
- [ ] Aucun comportement non prévu n’a disparu.
- [ ] Les incompatibilités sont documentées.


## RULE-002 — Archiver avant toute modification importante

Avant toute modification importante, créer une archive horodatée distincte de chaque projet concerné.

### Exemple
```text
Dashboard-Admin_2026-07-12_20-45.zip
PokemonGo-Data_2026-07-12_20-45.zip
PokemonGo-API-_2026-07-12_20-45.zip
```

### Exigences
- Ne jamais écraser une archive précédente.
- Préserver les fichiers utilisateur modifiés ou non suivis.
- Garantir un retour arrière possible.


## RULE-003 — Auditer avant de développer

Aucune mission importante ne commence directement par du code.

### L’audit couvre
- architecture ;
- composants ;
- hooks ;
- services ;
- routes ;
- providers ;
- schémas ;
- collections MongoDB ;
- pipelines ;
- tests ;
- documentation ;
- responsive ;
- sécurité.

### Objectif
Éviter les doublons, les régressions, les architectures concurrentes et les hypothèses non vérifiées.


## RULE-004 — Travailler par phases validées

Les missions importantes doivent être découpées en phases avec livrables clairs.

### Exemple
```text
Phase A — Audit
Phase B — Fondations
Phase C — Données
Phase D — API
Phase E — Dashboard
Phase F — Tests et validation
```

Une phase peut exiger une validation explicite avant la suivante.


## RULE-005 — Ne jamais déployer sans validation explicite

Aucun déploiement, push Git, import MongoDB, publication de dataset ou mise en production ne doit être lancé sans demande explicite.

Toujours distinguer :
- génération locale ;
- validation ;
- import ;
- publication ;
- déploiement.


## RULE-006 — Réutiliser avant d’étendre, étendre avant de créer

Ordre obligatoire :

1. rechercher ;
2. réutiliser ;
3. étendre ;
4. créer.

Cette règle s’applique aux composants, hooks, services, providers, validators, utilitaires, routes et pipelines.


## RULE-007 — Responsabilité unique

Chaque module doit avoir une responsabilité principale clairement identifiable.

### Exemples
- un Provider récupère une source ;
- un Normalizer transforme les données ;
- un Validator vérifie le format ;
- un composant affiche ;
- une route orchestre ;
- un service MongoDB persiste.


## RULE-008 — Architecture orientée Providers

Toute source externe dynamique doit être encapsulée dans un Provider.

```text
Source externe
→ Provider
→ Normalizer
→ Validator
→ Diagnostics
→ JSON canonique
→ Hash / Diff
→ MongoDB
→ Invalidation du cache
→ Read-back validation
→ API / Dashboard
```

Le client Dashboard ne dépend jamais directement d’un site externe. Toute récupération externe doit rester côté serveur dans un Provider/générateur identifié, même lorsqu'elle est orchestrée par une route Dashboard ou API.


## RULE-009 — Aucune architecture concurrente

Lorsqu’un pipeline générique existe, toute nouvelle fonctionnalité doit l’utiliser ou l’étendre.

Il est interdit de créer un second système parallèle pour :
- hash ;
- diff ;
- validation ;
- publication ;
- cache ;
- diagnostics ;
- read-back.


## RULE-010 — Aucun code métier magique

Sont interdits :
- IDs codés en dur dans les composants ;
- URLs dispersées ;
- seuils métier non nommés ;
- couleurs dupliquées ;
- statuts répétés ;
- règles de matching cachées dans l’UI.

Les valeurs doivent être centralisées dans des constantes, configurations, schémas, tables d’alias, tokens ou manifestes.


## RULE-011 — Typage strict

Utiliser TypeScript lorsque le projet le permet.

### Exigences
- éviter `any` ;
- typer les entrées et sorties ;
- typer les réponses API ;
- typer les Providers ;
- typer les datasets ;
- typer les diagnostics ;
- typer les composants et leurs variantes.


## RULE-012 — Les données locales sont la source de vérité

Une autorité unique doit être déclarée par domaine. Les référentiels locaux validés sont prioritaires pour :
- identifiants Pokémon ;
- noms ;
- formes ;
- costumes ;
- types ;
- attaques ;
- assets ;
- sprites ;
- statistiques ;
- familles ;
- générations ;
- régions.

Les sources externes fournissent uniquement les informations propres à leur domaine.

Pour les datasets courants, MongoDB est la vérité de lecture en production après génération/validation. Pour les assets, l'autorité observée est `PokemonGo-Assets-API`. `.data` est un snapshot dérivé.


## RULE-013 — Aucun fallback silencieux

Il est interdit de :
- deviner une forme ;
- ignorer une attaque non reconnue ;
- masquer un Pokémon introuvable ;
- remplacer silencieusement un asset ;
- utiliser un cache ancien sans signalement ;
- injecter une valeur fictive.

Le système doit produire un diagnostic explicite.


## RULE-014 — Validation non vide obligatoire

Un dataset dynamique ne peut pas être publié s’il est vide ou anormalement incomplet.

### Contrôles
- nombre minimal d’entrées ;
- comparaison avec la version précédente ;
- détection de chute brutale ;
- présence des champs critiques ;
- schéma valide ;
- relations principales résolues ;
- hash calculable.


## RULE-015 — Préserver la dernière version valide

Toute nouvelle génération doit être validée avant de remplacer la version active.

```text
Nouvelle version
→ validation
→ diagnostics
→ import temporaire
→ read-back
→ comparaison hash
→ bascule activeVersion
```


## RULE-016 — Distinguer les données réelles des dossiers générés

Le dossier `.data` du Dashboard Admin correspond à une archive ou copie téléchargée lors du déploiement de PokemonGo-Data.

### Règles
- `.data` n’est pas automatiquement une source de vérité.
- Ne pas modifier `.data` comme s’il s’agissait du repository source.
- Identifier l’origine réelle de chaque fichier.
- Distinguer cache, archive, build, snapshot et source de génération.


## RULE-017 — Conserver la provenance

Chaque dataset généré doit conserver au minimum :
- source ;
- provider ;
- URL ;
- date de récupération ;
- `sourceVersion` ;
- `generatedAt` ;
- hash ;
- `schemaVersion` ;
- `datasetVersion` ;
- diagnostics ;
- visibilité.


## RULE-018 — Chaque dataset déclare sa visibilité

Valeurs autorisées :

```ts
visibility: "public" | "private"
```

Un dataset public peut être exposé.  
Un dataset privé est réservé au Dashboard Admin.


## RULE-019 — Protéger les datasets privés par conception

Un dataset privé doit être protégé par :
- routes Admin authentifiées ;
- absence de route publique ;
- filtrage OpenAPI ;
- filtrage de l’API Explorer public ;
- tests de non-exposition ;
- permissions ;
- exports privés ;
- logs d’accès.

Le Shiny Tracker est un dataset privé.


## RULE-020 — Principe du moindre privilège

- Une route publique n’accède qu’aux données publiques.
- Une route Admin vérifie l’authentification.
- Les secrets ne sont jamais exposés côté client.
- Les opérations sensibles sont protégées.
- Les actions destructrices exigent une confirmation.


## RULE-021 — Design System obligatoire

Tout élément UI récurrent doit provenir du Design System ou d’un composant partagé.

Sont concernés :
- boutons ;
- badges ;
- chips ;
- tags ;
- cards ;
- panels ;
- tableaux ;
- inputs ;
- filtres ;
- modales ;
- drawers ;
- sidebars ;
- navigation ;
- accordéons ;
- headers de source ;
- pagination ;
- états de chargement.


## RULE-022 — Pas de copies visuelles

Un élément qui ressemble à un composant existant doit être une vraie utilisation de ce composant.

Aucun faux composant local ne doit imiter un composant partagé.


## RULE-023 — Responsive dès la conception

Chaque fonctionnalité doit être utilisable sur :
- desktop large ;
- laptop ;
- tablette paysage ;
- tablette portrait ;
- mobile large ;
- mobile étroit.

Sont interdits :
- tableaux illisibles ;
- scroll horizontal involontaire ;
- texte microscopique ;
- modales débordantes ;
- filtres inutilisables.


## RULE-024 — Tous les états UI sont prévus

Chaque fonctionnalité doit couvrir :
- loading ;
- skeleton ;
- vide ;
- erreur ;
- succès ;
- warning ;
- disabled ;
- lecture seule ;
- permissions insuffisantes ;
- données partielles.


## RULE-025 — Néon contrôlé

Le glow sert à guider l’attention.

Il est réservé aux états actifs, actions principales, erreurs importantes, raretés, sélections et statuts critiques.


## RULE-026 — Conventions API obligatoires

Toute route doit définir :
- version ;
- validation des paramètres ;
- pagination si nécessaire ;
- métadonnées ;
- erreurs standardisées ;
- authentification ;
- visibilité ;
- exemples ;
- tests.


## RULE-027 — API Explorer synchronisé avec les routes réelles

L’Explorer doit utiliser OpenAPI ou un registre de routes plutôt qu’une liste manuelle incomplète.

Les routes privées ne doivent jamais apparaître dans l’Explorer public.


## RULE-028 — MongoDB atomique et traçable

Les opérations MongoDB doivent utiliser :
- upsert déterministe ;
- index adaptés ;
- version active ;
- historique ;
- `generatedAt` ;
- `sourceVersion` ;
- `schemaVersion` ;
- hash ;
- diagnostics ;
- read-back ;
- rollback.

Le read-back et les métadonnées sont observés sur plusieurs pipelines. La transaction multi-collections et le rollback automatique ne sont pas implémentés uniformément et restent des exigences ouvertes.


## RULE-029 — Le cache ne masque jamais l’état réel

Il est interdit de servir silencieusement une ancienne version ou de masquer une erreur de source.

Le cache doit être versionné, invalidé explicitement et observable.


## RULE-030 — Les tests font partie de la fonctionnalité

Niveaux attendus :
- unitaires ;
- intégration ;
- API ;
- datasets ;
- Providers ;
- UI ;
- responsive ;
- E2E lorsque nécessaire.


## RULE-031 — Les diagnostics sont testés

Tester notamment :
- Pokémon introuvable ;
- forme ambiguë ;
- attaque absente ;
- asset manquant ;
- source inaccessible ;
- dataset vide ;
- chute de volume ;
- schéma modifié ;
- hash différent ;
- dataset privé ;
- read-back invalide.


## RULE-032 — Build et vérifications obligatoires

Avant livraison :
- lint ;
- type-check ;
- tests ;
- build ;
- routes ;
- MongoDB ;
- responsive ;
- permissions ;
- documentation.


## RULE-033 — Mesurer avant d’optimiser

Vérifier :
- temps de rendu ;
- volume DOM ;
- requêtes ;
- taille du bundle ;
- mémoire ;
- virtualisation ;
- pagination ;
- lazy loading ;
- cache.

Ne pas optimiser à l’aveugle.


## RULE-034 — Accessibilité obligatoire

Minimum attendu :
- navigation clavier ;
- focus visible ;
- contrastes lisibles ;
- labels ;
- HTML sémantique ;
- ARIA lorsque nécessaire ;
- zones tactiles adaptées ;
- erreurs compréhensibles.


## RULE-035 — Semantic Versioning

Convention :

```text
MAJOR.MINOR.PATCH
```

- MAJOR : rupture de compatibilité ;
- MINOR : nouvelle fonctionnalité compatible ;
- PATCH : correction compatible.


## RULE-036 — Distinguer les types de version

Éléments à distinguer :
- `appVersion` ;
- `datasetVersion` ;
- `providerVersion` ;
- `schemaVersion` ;
- `sourceVersion` ;
- `generatedAt` ;
- hash ;
- `sourceHash`.


## RULE-037 — Pas de fonctionnalité terminée sans documentation

La documentation minimale couvre :
- objectif ;
- architecture ;
- données ;
- UI ;
- responsive ;
- sécurité ;
- tests ;
- limitations ;
- historique ;
- références croisées.


## RULE-038 — Mettre à jour la documentation à chaque évolution

À chaque fonctionnalité, identifier :
- documents à modifier ;
- documents à créer ;
- changelog ;
- roadmap ;
- ADR ;
- versionnage ;
- Providers ;
- datasets ;
- API ;
- MongoDB ;
- Design System ;
- tests.


## RULE-039 — Identifiants permanents

Préfixes officiels :
- `DOC-xxx`
- `RULE-xxx`
- `ADR-xxx`
- `PAGE-xxx`
- `COMP-xxx`
- `PROVIDER-xxx`
- `DATASET-xxx`
- `API-xxx`
- `COL-xxx`
- `DS-xxx`
- `WORKFLOW-xxx`
- `TEST-xxx`


## RULE-040 — Format documentaire commun

Chaque document Markdown doit comporter :
- un en-tête YAML ;
- un identifiant ;
- un titre ;
- une version ;
- un statut ;
- une date ;
- un auteur ;
- une catégorie ;
- les projets concernés ;
- des références.

Sections standard lorsque pertinentes :
- Objectif ;
- Portée ;
- Architecture ;
- Règles ;
- Bonnes pratiques ;
- Interdictions ;
- Checklist ;
- Références ;
- Historique.


## RULE-041 — Codex lit la documentation avant toute mission

Codex doit lire les règles générales, l’architecture, le versionnage, les documents de la fonctionnalité et les ADR concernés.


## RULE-042 — Codex annonce son plan

Avant toute modification importante, Codex doit fournir :
- projets concernés ;
- fichiers concernés ;
- éléments réutilisables ;
- risques ;
- plan par phases ;
- tests prévus ;
- documentation impactée.


## RULE-043 — Codex ne suppose pas

Si une information manque, Codex doit demander :
- un screenshot ;
- un fichier ;
- un audit ;
- une arborescence ;
- un exemple de donnée ;
- une clarification.

Toute incertitude importante doit être signalée.


## RULE-044 — Codex produit un rapport final

Le rapport final doit contenir :
- fichiers créés ;
- fichiers modifiés ;
- fichiers supprimés ;
- composants réutilisés ;
- composants créés ;
- Providers ;
- datasets ;
- routes ;
- MongoDB ;
- tests ;
- build ;
- responsive ;
- problèmes restants ;
- prochaine étape.


---

# Bonnes pratiques générales

## Fonctions

- courtes ;
- nommées clairement ;
- responsabilité unique ;
- effets de bord limités ;
- paramètres explicites ;
- retours typés.

## Composants

- réutilisables ;
- testables ;
- variantes documentées ;
- props explicites ;
- responsive ;
- accessibles.

## Données

- schémas versionnés ;
- validation stricte ;
- diagnostics ;
- provenance ;
- hash ;
- historique.

## API

- conventions cohérentes ;
- pagination ;
- métadonnées ;
- erreurs structurées ;
- sécurité ;
- documentation.

## Documentation

- entièrement en français ;
- YAML standard ;
- identifiants permanents ;
- historique ;
- références croisées ;
- mise à jour simultanée au code.

---

# Interdictions globales

Il est interdit de :

- dupliquer un composant ;
- dupliquer un Provider ;
- créer un pipeline concurrent ;
- masquer une erreur ;
- publier un dataset vide ;
- exposer un dataset privé ;
- hardcoder des règles métier dans l’UI ;
- utiliser des données fictives en production ;
- contourner le Design System ;
- déployer sans validation ;
- modifier `.data` comme s’il s’agissait du repository source ;
- ignorer le responsive ;
- ignorer la documentation ;
- ignorer le versionnage ;
- ignorer les tests.

---

# Définition de terminé

Une tâche est terminée uniquement si :

- [ ] la fonctionnalité fonctionne ;
- [ ] l’existant fonctionne encore ;
- [ ] le code est lisible ;
- [ ] les composants sont réutilisés ;
- [ ] les données sont validées ;
- [ ] les diagnostics sont propres ;
- [ ] les routes sont vérifiées ;
- [ ] MongoDB est cohérent ;
- [ ] le responsive est validé ;
- [ ] les tests passent ;
- [ ] le lint passe ;
- [ ] le type-check passe ;
- [ ] le build passe ;
- [ ] la documentation est mise à jour ;
- [ ] la version est mise à jour si nécessaire ;
- [ ] le changelog est mis à jour ;
- [ ] la roadmap est mise à jour si nécessaire ;
- [ ] un ADR est créé si la décision est structurante.

---

# Checklist avant merge

- [ ] Archive créée.
- [ ] Audit effectué.
- [ ] Plan validé.
- [ ] Aucun doublon.
- [ ] Aucun fallback silencieux.
- [ ] Source de vérité respectée.
- [ ] Visibilité public/private vérifiée.
- [ ] Dataset privé protégé.
- [ ] Tests ajoutés.
- [ ] Responsive testé.
- [ ] Documentation mise à jour.
- [ ] Version incrémentée.
- [ ] Changelog mis à jour.
- [ ] Build réussi.
- [ ] Rapport final produit.

---

# Références

## Documents

- `README.md`
- `DOC-005` — Référentiels
- `DOC-006` — Architecture générale
- `DOC-009` — Roadmap
- `DOC-010` — Design System
- `DOC-011` — Structure des dossiers
- `DOC-014` — Catalogue des composants
- `DOC-016` — Providers externes
- `DOC-017` — Datasets et vérités
- `DOC-020` — MongoDB et collections
- `DOC-023` — Authentification et sécurité
- `DOC-025` — Responsive
- `DOC-030` — Stratégie de tests
- `DOC-034` — Gaps et dette technique

## ADR

- `ADR-001` — Source de vérité statique/current
- `ADR-002` — Mongo-only current
- `ADR-003` — Shiny privé
- `ADR-006` — Contrat Provider
- `ADR-007` — Read-back et hash
- `ADR-010` — Distribution des assets

---

# À modifier lorsque

Mettre à jour ce document lorsqu’une évolution modifie :

- une règle de développement ;
- le workflow Codex ;
- le pipeline de données ;
- la visibilité des datasets ;
- la sécurité ;
- le versionnage ;
- le Design System ;
- les conventions de code ;
- le processus de publication ;
- la définition de terminé ;
- les exigences documentaires.

---

# Historique

## Version 1.1.0 — 2026-07-13

- Réconciliation des règles avec l'état observé par le méga-audit.
- Distinction explicite entre constitution normative et conformité actuelle.
- Mise à jour des autorités de données, pipelines, atomicité, Design System, tests, versionnage et sécurité.
- Correction des références DOC-005 à DOC-010.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Ajout des règles `RULE-001` à `RULE-044`.
- Ajout de la séparation public/private.
- Ajout de l’architecture orientée Providers.
- Ajout du versionnage.
- Ajout des règles Codex.
- Ajout de la règle spécifique au dossier `.data`.
- Ajout de la définition de terminé.
- Ajout des checklists qualité et merge.
