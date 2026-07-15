# Analyse des noms accessibles

La priorité du calcul est `aria-labelledby`, `aria-label`, label natif/englobant, puis mécanismes natifs. Le placeholder est relevé pour décrire le comportement du navigateur mais n’est jamais considéré comme un label acceptable à lui seul. Les valeurs ci-dessous sont la baseline runtime de la cohorte de 43 contrôles ; l’action indique l’état final.

| Contrôle | Nom accessible calculé avant | Source avant | Conforme | Action |
|---|---|---|---|---|
| A11Y-FIELD-008 | — | hors arbre | oui — hors arbre | aucune |
| A11Y-FIELD-012 | — | aucune | non avant / oui après | corrigé : HEX via aria-label |
| A11Y-FIELD-013 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-014 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-015 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-016 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-017 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-018 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-019 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-020 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-021 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-022 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-023 | Note tes décisions, blocages, idées et actions de demain... | placeholder | non avant / oui après | corrigé : Journal du jour via aria-label |
| A11Y-FIELD-024 | — | placeholder | non avant / oui après | corrigé : Rechercher langage, tag, contenu... via aria-label |
| A11Y-FIELD-025 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-026 | javascript | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-027 | Frontend | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-028 | fetch, auth | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-029 | Colle ton snippet ici... | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-030 | {"events":[{"id":"community-day-example","title":"Community Day","type":"community_day","startDate":"2026-07-01T10:00:00.000Z","endDate":"2026-07-01T17:00:00.000Z"}]} | placeholder | non avant / oui après | corrigé : Import JSON via aria-label |
| A11Y-FIELD-033 | — | placeholder | non avant / oui après | corrigé : Rechercher event, bonus, Pokémon... via aria-label |
| A11Y-FIELD-034 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-049 | — | aucune | spécialisé à auditer | documentation seule |
| A11Y-FIELD-050 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-051 | Chercher titre, tag, priorité... | placeholder | non avant / oui après | corrigé : Chercher titre, tag, priorité... via aria-label |
| A11Y-FIELD-055 | Ajouter une action... | placeholder | non avant / oui après | corrigé : Ajouter une action... via aria-label |
| A11Y-FIELD-056 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-057 | — | aucune | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-058 | tags, rédaction, spec | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-059 | Écris ton brief, une spec, un brouillon client, une idée de page... | placeholder | non démontré | bloqué : texte métier insuffisant |
| A11Y-FIELD-061 | Choose File | aucune | spécialisé à auditer | documentation seule |
| A11Y-FIELD-062 | Fusionner Met à jour par ID et conserve les éléments absents du fichier. | label | oui au runtime, spécialisé | documentation seule |
| A11Y-FIELD-065 | ex: types/fire, moves/charged, weather, kanto | placeholder | non avant / oui après | corrigé : Filtrer fichiers / cibles via aria-labelledby |
| A11Y-FIELD-069 | — | placeholder | non avant / oui après | corrigé : Chercher fiche, type, fichier... via aria-label |
| A11Y-FIELD-071 | — | aucune | non avant / oui après | corrigé : Corrections groupées via aria-label |
| A11Y-FIELD-072 | — | aucune | non avant / oui après | corrigé : Export et partage via aria-label |
| A11Y-FIELD-074 | Ajouter une tâche | placeholder | non avant / oui après | corrigé : Ajouter une tâche via aria-label |
| A11Y-FIELD-075 | — | aucune | non avant / oui après | corrigé : Modifier la tâche via aria-label |
| A11Y-FIELD-077 | Rechercher dans la collection... | placeholder | non avant / oui après | corrigé : Rechercher dans la collection... via aria-label |
| A11Y-FIELD-080 | — | placeholder | non avant / oui après | corrigé : Rechercher boss, type, forme, costume ou habitat... via aria-label |
| A11Y-FIELD-082 | Mot de passe admin | placeholder | non avant / oui après | corrigé : Mot de passe admin via aria-label |
| A11Y-FIELD-086 | — | placeholder | non avant / oui après | corrigé : Chercher dans les docs via aria-label |
| A11Y-FIELD-092 | — | placeholder | non avant / oui après | corrigé : Rechercher titre, page, composant... via aria-label |

## Résultat final

Les 18 cas B possèdent désormais un nom exact issu d’un texte métier déjà présent : 17 utilisent `aria-label` et un utilise `aria-labelledby`. Le champ hidden A reste volontairement hors arbre. Les 3 contrôles spécialisés et les 21 cas ambigus restent inchangés. Aucun placeholder ne reste l’unique mécanisme accepté pour un cas corrigé.
