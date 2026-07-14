# Analyse des descriptions et erreurs

La recherche a porté sur les aides et erreurs déjà rendues près des 95 contrôles. Aucun texte n’a été créé ou modifié. Quatre aides décrivent sans ambiguïté leur contrôle et une erreur existante appartient sans ambiguïté au champ de mot de passe Admin Pokémon.

## Descriptions reliées

| Contrôle | Texte existant | Relation finale | Décision |
|---|---|---|---|
| A11Y-FIELD-023 — Journal du jour | Sauvegarde automatique dans ton navigateur. | `aria-describedby="form-a11y-journal-description"` | L’aide décrit la persistance du contenu du journal. |
| A11Y-FIELD-065 — Filtre de cibles | Optionnel: vise une forme, un dossier, un fichier ou un id précis… | `aria-describedby="form-a11y-rule-filter-description"` | L’aide donne la syntaxe et des exemples pour ce filtre précis. |
| A11Y-FIELD-071 — Corrections groupées | Génère un brouillon JSON à partir des problèmes détectés… | `aria-describedby="form-a11y-bulk-description"` | L’aide décrit le textarea readOnly et précise l’absence d’écriture. |
| A11Y-FIELD-072 — Export et partage | Exporte les fiches correspondant à la recherche globale en cours… | `aria-describedby="form-a11y-export-description"` | L’aide décrit le contenu exporté dans le textarea readOnly. |

Les quatre IDs sont stables et uniques. Les titres de panneau restent des titres et ne sont pas détournés comme descriptions.

## Erreur reliée

| Contrôle | Erreur existante | État final | Annonce |
|---|---|---|---|
| A11Y-FIELD-082 — Mot de passe Admin Pokémon | Connexion refusée. | `aria-invalid="true"` uniquement quand `error` existe ; `aria-describedby="form-a11y-pokemon-admin-password-error"` conditionnel | Aucun `role=alert` ajouté : le toast existant annonce déjà l’échec, ce qui évite une annonce doublée. |

Le texte, le déclenchement, la validation et la soumission sont inchangés. La baseline confirme l’absence de `aria-invalid` avant erreur et le scénario invalide confirme le nom « Mot de passe admin », la description « Connexion refusée. » et l’état invalide actif.

## Cas laissés sans relation

- l’erreur globale du Login principal peut appartenir à l’email, au mot de passe ou à la configuration serveur : l’associer à un seul champ serait faux ;
- les toasts et panneaux métier généraux ne décrivent pas un contrôle particulier ;
- les aides de modales génériques et titres de section ne sont pas reliés sans preuve sémantique ;
- les contrôles spécialisés C et les cas ambigus D restent documentés sans description, erreur ou validation inventée.
