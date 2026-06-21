export type JsStatus = "À apprendre" | "En cours" | "Compris";
export type JsDifficulty = "facile" | "moyen" | "difficile";

export type JsRoadmapItem = {
  id: string;
  level: number;
  title: string;
  status: JsStatus;
  difficulty: JsDifficulty;
  progress: number;
};

export type JsRoadmapLevel = {
  level: number;
  title: string;
  description: string;
  items: JsRoadmapItem[];
};

export type JsExercise = {
  id: string;
  title: string;
  level: string;
  concepts: string[];
  statement: string;
  starter: string;
};

export type JsExerciseState = Record<string, { completed: boolean; code: string; updatedAt: string }>;

const understood = new Set([
  "variables",
  "conditions",
  "boucles",
  "tableaux",
  "fonctions",
]);

/**
 * Construit une notion de roadmap avec un identifiant stable.
 * L'identifiant sert ensuite à retrouver ta progression dans Mongo/localStorage.
 */
function item(level: number, title: string, difficulty: JsDifficulty, progress = 0): JsRoadmapItem {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const status = understood.has(slug) ? "Compris" : progress > 0 ? "En cours" : "À apprendre";

  return {
    id: `l${level}-${slug}`,
    level,
    title,
    difficulty,
    progress: status === "Compris" ? 100 : progress,
    status,
  };
}

export const jsRoadmapLevels: JsRoadmapLevel[] = [
  {
    level: 1,
    title: "Fondamentaux",
    description: "La base solide: écrire, lire et raisonner avec du JavaScript simple.",
    items: [
      item(1, "Syntaxe de base", "facile", 45),
      item(1, "Variables", "facile"),
      item(1, "Types de données", "facile", 35),
      item(1, "Opérateurs", "facile", 25),
      item(1, "Conditions", "facile"),
      item(1, "Switch", "facile", 10),
      item(1, "Boucles", "facile"),
      item(1, "Tableaux", "facile"),
      item(1, "Objets", "moyen", 20),
      item(1, "Fonctions", "facile"),
    ],
  },
  {
    level: 2,
    title: "Tableaux / Objets",
    description: "Manipuler proprement les données avec les méthodes modernes.",
    items: [
      item(2, "Méthodes de tableaux", "moyen", 10),
      item(2, "map", "moyen"),
      item(2, "filter", "moyen"),
      item(2, "reduce", "difficile"),
      item(2, "find", "moyen"),
      item(2, "some / every", "moyen"),
      item(2, "Destructuring", "moyen"),
      item(2, "Spread operator", "moyen"),
      item(2, "Rest operator", "moyen"),
    ],
  },
  {
    level: 3,
    title: "DOM",
    description: "Faire réagir une page, créer des éléments et écouter les événements.",
    items: [
      item(3, "querySelector", "facile", 20),
      item(3, "getElementById", "facile", 20),
      item(3, "addEventListener", "moyen", 10),
      item(3, "classList", "facile"),
      item(3, "createElement", "moyen"),
      item(3, "appendChild", "moyen"),
      item(3, "remove", "facile"),
      item(3, "formulaire", "moyen"),
      item(3, "validation simple", "moyen"),
    ],
  },
  {
    level: 4,
    title: "JavaScript moderne",
    description: "Comprendre le langage moderne avant d’aller vers React/Node.",
    items: [
      item(4, "Template literals", "facile"),
      item(4, "Modules import / export", "moyen"),
      item(4, "Scope", "moyen"),
      item(4, "Hoisting", "difficile"),
      item(4, "this", "difficile"),
      item(4, "Callback", "moyen"),
      item(4, "Promises", "difficile"),
      item(4, "async / await", "difficile"),
    ],
  },
  {
    level: 5,
    title: "APIs / navigateur",
    description: "Brancher une app au navigateur et aux données externes.",
    items: [
      item(5, "Fetch API", "moyen"),
      item(5, "JSON", "facile", 10),
      item(5, "LocalStorage", "moyen"),
      item(5, "SessionStorage", "moyen"),
      item(5, "Events avancés", "difficile"),
      item(5, "try / catch", "moyen"),
    ],
  },
  {
    level: 6,
    title: "Projets pratiques",
    description: "Assembler les notions dans des petits projets concrets.",
    items: [
      item(6, "Todo list", "moyen", 20),
      item(6, "Dashboard de notes", "moyen"),
      item(6, "Calculatrice", "moyen"),
      item(6, "Pomodoro", "moyen"),
      item(6, "App météo", "difficile"),
      item(6, "Mini Pokédex", "difficile"),
      item(6, "Bot Discord plus tard", "difficile"),
    ],
  },
];

export const initialJsRoadmap = jsRoadmapLevels.flatMap((level) => level.items);

export const jsExercises: JsExercise[] = [
  {
    id: "sum-array",
    title: "Calculer la somme d’un tableau",
    level: "Niveau 1",
    concepts: ["variables", "boucles", "tableaux"],
    statement: "Crée une fonction qui reçoit un tableau de nombres et retourne la somme totale.",
    starter: "function somme(tableau) {\n  let total = 0;\n  // boucle ici\n  return total;\n}",
  },
  {
    id: "count-gte-10",
    title: "Compter les nombres >= 10",
    level: "Niveau 1",
    concepts: ["conditions", "boucles", "tableaux"],
    statement: "Compte combien de valeurs sont supérieures ou égales à 10 dans un tableau.",
    starter: "function compterGrandesValeurs(notes) {\n  let total = 0;\n  // si note >= 10\n  return total;\n}",
  },
  {
    id: "max-value",
    title: "Trouver la plus grande valeur",
    level: "Niveau 1",
    concepts: ["variables", "conditions", "boucles"],
    statement: "Parcours un tableau et garde la plus grande valeur rencontrée.",
    starter: "function plusGrandeValeur(nombres) {\n  let max = nombres[0];\n  // compare chaque nombre\n  return max;\n}",
  },
  {
    id: "min-value",
    title: "Trouver la plus petite valeur",
    level: "Niveau 1",
    concepts: ["variables", "conditions", "boucles"],
    statement: "Même logique que le maximum, mais pour trouver la valeur la plus petite.",
    starter: "function plusPetiteValeur(nombres) {\n  let min = nombres[0];\n  // compare chaque nombre\n  return min;\n}",
  },
  {
    id: "average",
    title: "Calculer une moyenne",
    level: "Niveau 1",
    concepts: ["fonctions", "tableaux", "opérateurs"],
    statement: "Additionne toutes les notes puis divise par le nombre de notes.",
    starter: "function moyenne(notes) {\n  // somme / notes.length\n}",
  },
  {
    id: "passed-notes",
    title: "Filtrer les notes réussies",
    level: "Niveau 2",
    concepts: ["filter", "conditions", "tableaux"],
    statement: "Retourne uniquement les notes supérieures ou égales à 10.",
    starter: "function notesReussies(notes) {\n  return notes.filter(function(note) {\n    // condition\n  });\n}",
  },
  {
    id: "message-grade",
    title: "Afficher un message selon une note",
    level: "Niveau 1",
    concepts: ["conditions", "fonctions"],
    statement: "Retourne un message différent pour échec, moyen, bien et excellent.",
    starter: "function messageNote(note) {\n  if (note < 10) {\n    return \"À retravailler\";\n  }\n}",
  },
  {
    id: "dom-add",
    title: "Ajouter un élément dans le DOM",
    level: "Niveau 3",
    concepts: ["DOM", "createElement", "appendChild"],
    statement: "Crée un élément li, ajoute du texte dedans, puis ajoute-le dans une liste ul.",
    starter: "const liste = document.querySelector(\"ul\");\nconst item = document.createElement(\"li\");\n// ajoute le texte puis appendChild",
  },
  {
    id: "dom-remove",
    title: "Supprimer une tâche du DOM",
    level: "Niveau 3",
    concepts: ["DOM", "remove", "addEventListener"],
    statement: "Au clic sur un bouton, supprime la tâche correspondante de la page.",
    starter: "const bouton = document.querySelector(\"button\");\nbouton.addEventListener(\"click\", function() {\n  // supprimer l'élément\n});",
  },
  {
    id: "count-done",
    title: "Compter les éléments terminés",
    level: "Niveau 3",
    concepts: ["DOM", "boucles", "classList"],
    statement: "Compte les éléments qui possèdent la classe done et affiche le total.",
    starter: "const elements = document.querySelectorAll(\".done\");\nlet total = 0;\n// boucle sur elements",
  },
  {
    id: "object-profile",
    title: "Créer une fiche profil",
    level: "Niveau 1",
    concepts: ["objets", "variables", "fonctions"],
    statement: "Crée un objet utilisateur avec nom, âge et niveau, puis retourne une phrase de présentation.",
    starter: "function presenterUtilisateur(utilisateur) {\n  // utilise utilisateur.nom et utilisateur.niveau\n}",
  },
  {
    id: "switch-day",
    title: "Message selon le jour",
    level: "Niveau 1",
    concepts: ["switch", "conditions"],
    statement: "Avec switch, retourne un message différent pour lundi, vendredi et dimanche.",
    starter: "function messageJour(jour) {\n  switch (jour) {\n    // case \"lundi\":\n  }\n}",
  },
  {
    id: "map-names",
    title: "Transformer une liste de noms",
    level: "Niveau 2",
    concepts: ["map", "tableaux"],
    statement: "Reçois un tableau de noms et retourne un nouveau tableau en majuscules.",
    starter: "function nomsMajuscules(noms) {\n  return noms.map(function(nom) {\n    // retourne nom en majuscules\n  });\n}",
  },
  {
    id: "find-pokemon",
    title: "Trouver un Pokémon par numéro",
    level: "Niveau 2",
    concepts: ["find", "objets", "tableaux"],
    statement: "Dans un tableau de Pokémon, retrouve celui dont le dexId correspond au paramètre.",
    starter: "function trouverPokemon(pokemons, dexId) {\n  return pokemons.find(function(pokemon) {\n    // compare pokemon.dexId\n  });\n}",
  },
  {
    id: "reduce-total-candy",
    title: "Additionner des bonbons",
    level: "Niveau 2",
    concepts: ["reduce", "objets"],
    statement: "Additionne les bonbons de plusieurs fiches Pokémon avec reduce.",
    starter: "function totalBonbons(fiches) {\n  return fiches.reduce(function(total, fiche) {\n    // total + fiche.bonbons\n  }, 0);\n}",
  },
  {
    id: "some-every-release",
    title: "Vérifier des sorties",
    level: "Niveau 2",
    concepts: ["some", "every", "conditions"],
    statement: "Indique si au moins une fiche est shiny, puis si toutes les fiches sont sorties.",
    starter: "function verifierSorties(fiches) {\n  const auMoinsUnShiny = fiches.some(function(fiche) {\n    // fiche.shinyReleased\n  });\n  const tousSortis = fiches.every(function(fiche) {\n    // fiche.released\n  });\n  return { auMoinsUnShiny, tousSortis };\n}",
  },
  {
    id: "destructure-card",
    title: "Déstructurer une carte",
    level: "Niveau 2",
    concepts: ["destructuring", "objets"],
    statement: "Récupère name, dexId et primaryType depuis un objet puis retourne un résumé.",
    starter: "function resumeCarte(carte) {\n  const { name, dexId, primaryType } = carte;\n  // retourne une phrase\n}",
  },
  {
    id: "spread-copy",
    title: "Copier et compléter un objet",
    level: "Niveau 2",
    concepts: ["spread operator", "objets"],
    statement: "Crée une copie d'une tâche et force done à true sans modifier l'objet original.",
    starter: "function terminerTache(tache) {\n  return {\n    // spread ici\n  };\n}",
  },
  {
    id: "rest-sum",
    title: "Somme avec rest operator",
    level: "Niveau 2",
    concepts: ["rest operator", "fonctions"],
    statement: "Crée une fonction qui accepte autant de nombres que tu veux et retourne leur somme.",
    starter: "function sommeLibre(...nombres) {\n  // boucle ou reduce\n}",
  },
  {
    id: "dom-toggle-class",
    title: "Basculer une classe CSS",
    level: "Niveau 3",
    concepts: ["classList", "addEventListener"],
    statement: "Au clic sur une carte, ajoute ou retire la classe selected.",
    starter: "const carte = document.querySelector(\".carte\");\ncarte.addEventListener(\"click\", function() {\n  // classList.toggle\n});",
  },
  {
    id: "dom-form-validation",
    title: "Valider un formulaire simple",
    level: "Niveau 3",
    concepts: ["formulaire", "validation simple", "DOM"],
    statement: "Empêche l'envoi si le champ nom contient moins de 2 caractères.",
    starter: "const form = document.querySelector(\"form\");\nform.addEventListener(\"submit\", function(event) {\n  // event.preventDefault si invalide\n});",
  },
  {
    id: "dom-render-list",
    title: "Afficher un tableau dans le DOM",
    level: "Niveau 3",
    concepts: ["createElement", "appendChild", "boucles"],
    statement: "À partir d'un tableau de tâches, crée une ligne HTML pour chaque tâche.",
    starter: "const taches = [\"Lire\", \"Coder\", \"Réviser\"];\nconst liste = document.querySelector(\"ul\");\n// crée les li dans une boucle",
  },
  {
    id: "template-card",
    title: "Créer une phrase avec template literals",
    level: "Niveau 4",
    concepts: ["template literals", "objets"],
    statement: "Retourne une phrase lisible avec le nom, le numéro et le type d'un Pokémon.",
    starter: "function phrasePokemon(pokemon) {\n  return `${pokemon.name} est le numéro ${pokemon.dexId}`;\n}",
  },
  {
    id: "scope-counter",
    title: "Comprendre le scope",
    level: "Niveau 4",
    concepts: ["scope", "let", "const"],
    statement: "Explique en commentaire pourquoi une variable créée dans un bloc if n'est pas visible dehors.",
    starter: "function testScope(ok) {\n  if (ok) {\n    const message = \"visible ici\";\n  }\n  // pourquoi message n'est pas disponible ici ?\n}",
  },
  {
    id: "callback-filter",
    title: "Utiliser un callback",
    level: "Niveau 4",
    concepts: ["callback", "fonctions"],
    statement: "Crée une fonction appliquer qui reçoit une valeur et une fonction callback.",
    starter: "function appliquer(valeur, callback) {\n  // retourne callback(valeur)\n}\n\nappliquer(5, function(nombre) {\n  return nombre * 2;\n});",
  },
  {
    id: "promise-delay",
    title: "Créer une Promise de délai",
    level: "Niveau 4",
    concepts: ["Promises", "setTimeout"],
    statement: "Crée une Promise qui se résout après une seconde avec le texte \"terminé\".",
    starter: "function attendre() {\n  return new Promise(function(resolve) {\n    // setTimeout puis resolve\n  });\n}",
  },
  {
    id: "async-load-user",
    title: "Lire une donnée avec async / await",
    level: "Niveau 4",
    concepts: ["async / await", "Promises"],
    statement: "Appelle une fonction qui retourne une Promise puis stocke le résultat dans une variable.",
    starter: "async function chargerProfil() {\n  const profil = await recupererProfil();\n  // retourne profil.nom\n}",
  },
  {
    id: "fetch-pokemon",
    title: "Récupérer un Pokémon avec fetch",
    level: "Niveau 5",
    concepts: ["Fetch API", "JSON", "async / await"],
    statement: "Utilise fetch, vérifie response.ok, puis transforme la réponse en JSON.",
    starter: "async function chargerPokemon(url) {\n  const response = await fetch(url);\n  // vérifie response.ok\n  return response.json();\n}",
  },
  {
    id: "try-catch-message",
    title: "Afficher une erreur lisible",
    level: "Niveau 5",
    concepts: ["try / catch", "gestion d’erreurs"],
    statement: "Entoure un appel async avec try/catch et retourne un message simple si ça échoue.",
    starter: "async function chargerAvecErreur(url) {\n  try {\n    // fetch ici\n  } catch (error) {\n    return \"Impossible de charger\";\n  }\n}",
  },
  {
    id: "localstorage-theme",
    title: "Sauvegarder un thème",
    level: "Niveau 5",
    concepts: ["LocalStorage", "JSON"],
    statement: "Sauvegarde un objet de préférences dans localStorage, puis relis-le.",
    starter: "function sauverTheme(theme) {\n  localStorage.setItem(\"theme\", JSON.stringify(theme));\n}\n\nfunction lireTheme() {\n  // JSON.parse\n}",
  },
  {
    id: "session-storage-draft",
    title: "Brouillon temporaire",
    level: "Niveau 5",
    concepts: ["SessionStorage", "formulaire"],
    statement: "Sauvegarde le texte d'un champ dans sessionStorage pendant la session.",
    starter: "const champ = document.querySelector(\"textarea\");\nchamp.addEventListener(\"input\", function() {\n  // sessionStorage.setItem\n});",
  },
  {
    id: "event-delegation",
    title: "Délégation d'événements",
    level: "Niveau 5",
    concepts: ["Events avancés", "DOM"],
    statement: "Écoute les clics sur une liste et détecte quel bouton de suppression a été cliqué.",
    starter: "const liste = document.querySelector(\"ul\");\nliste.addEventListener(\"click\", function(event) {\n  // vérifie event.target\n});",
  },
  {
    id: "project-calculator",
    title: "Projet calculatrice",
    level: "Niveau 6",
    concepts: ["conditions", "fonctions", "DOM"],
    statement: "Prépare les fonctions addition, soustraction, multiplication et division, puis branche-les à des boutons.",
    starter: "function calculer(a, operateur, b) {\n  // switch operateur\n}\n\n// branche les boutons plus tard",
  },
  {
    id: "project-pomodoro",
    title: "Projet Pomodoro simplifié",
    level: "Niveau 6",
    concepts: ["setInterval", "conditions", "DOM"],
    statement: "Crée un compteur secondes, un bouton start et un bouton pause.",
    starter: "let secondes = 25 * 60;\nlet intervalId = null;\n// start, pause, reset",
  },
  {
    id: "project-weather",
    title: "Projet app météo",
    level: "Niveau 6",
    concepts: ["Fetch API", "DOM", "try / catch"],
    statement: "Charge une météo depuis une API, puis affiche ville, température et condition.",
    starter: "async function afficherMeteo(ville) {\n  // fetch + rendu DOM\n}",
  },
  {
    id: "project-mini-pokedex",
    title: "Projet mini Pokédex",
    level: "Niveau 6",
    concepts: ["tableaux", "filter", "DOM", "Fetch API"],
    statement: "Affiche une liste de Pokémon, filtre par type et ouvre un détail au clic.",
    starter: "const pokemons = [];\nfunction filtrerParType(type) {\n  // filter puis afficher\n}",
  },
  {
    id: "project-notes-dashboard",
    title: "Projet dashboard de notes",
    level: "Niveau 6",
    concepts: ["LocalStorage", "objets", "DOM"],
    statement: "Ajoute une note, sauvegarde-la et recharge toutes les notes au démarrage.",
    starter: "function sauvegarderNotes(notes) {\n  // localStorage\n}\n\nfunction afficherNotes(notes) {\n  // rendu DOM\n}",
  },
];

export const initialJsExerciseState: JsExerciseState = Object.fromEntries(
  jsExercises.map((exercise) => [
    exercise.id,
    {
      completed: false,
      code: exercise.starter,
      updatedAt: "",
    },
  ]),
);
