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
