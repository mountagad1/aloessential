/*
 * Text of the high-fibre foods table and daily fibre calculator
 * (src/data/fibre.ts) in every locale, with its localized URL. Wording
 * follows each market's own query (docs/growth/ENGINEERING_AS_MARKETING_BACKLOG.md,
 * EAM-01): "aliments riches en fibres", "high fibre foods",
 * "ballaststoffreiche Lebensmittel"… Placeholders: {n} (number of foods),
 * {total}, {efsa}, {national}.
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import type { Category, FibreLabel } from "../data/fibre";

export interface FibreUi {
  /** Short label for the footer's tools column. */
  navLabel: string;
  path: string;
  /** Slug of the localized digestion article (it states the daily target). */
  digestionArticle: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  byline: string;
  categories: Record<Category, string>;
  labels: Record<Exclude<FibreLabel, "none">, string>;
  table: {
    title: string;
    caption: string;
    food: string;
    category: string;
    per100g: string;
    portion: string;
    perPortion: string;
    label: string;
    search: string;
    allCategories: string;
    sort: string;
    sortFibre: string;
    sortPortion: string;
    sortName: string;
    count: string;
    noscript: string;
  };
  calculator: {
    title: string;
    intro: string;
    food: string;
    portions: string;
    add: string;
    remove: string;
    empty: string;
    total: string;
    efsa: string;
    national: string;
    reached: string;
    noscript: string;
  };
  read: { title: string; items: string[] };
  increase: { title: string; items: string[] };
  doctor: { title: string; items: string[] };
  method: { title: string; text: string[]; licence: string };
  sources: string;
  related: string;
  relatedLink: string;
  /** Unit for grams, and its use in "{n} g". */
  grams: string;
}

const fr: FibreUi = {
  navLabel: "Tableau des aliments riches en fibres",
  path: "/aliments-riches-en-fibres/",
  digestionArticle: "digestion-foie-detox-complements",
  title: "Aliments riches en fibres : le tableau et le calculateur",
  description:
    "Les aliments les plus riches en fibres, pour 100 g et par portion, d'après la table Ciqual de l'Anses, avec un calculateur pour atteindre 25 à 30 g par jour.",
  eyebrow: "Tableau et outil gratuits",
  h1: "Les aliments riches en fibres",
  intro:
    "Légumineuses, céréales complètes, fruits, légumes, oléagineux : voici la teneur en fibres de {n} aliments courants, pour 100 g et pour une portion habituelle. Les valeurs viennent de la table officielle Ciqual de l'Anses. Ajoutez vos aliments du jour pour voir où vous en êtes.",
  byline: "Par l'équipe Aloessential",
  categories: {
    legumes: "Légumineuses",
    grains: "Céréales et pains",
    vegetables: "Légumes",
    fruits: "Fruits",
    dried: "Fruits séchés",
    nuts: "Fruits à coque et graines",
    other: "Autres",
  },
  labels: { high: "Riche en fibres", source: "Source de fibres" },
  table: {
    title: "Le tableau des fibres",
    caption: "Fibres alimentaires d'après la table Ciqual 2025 de l'Anses. Portion habituelle : estimation de notre équipe.",
    food: "Aliment",
    category: "Catégorie",
    per100g: "Fibres pour 100 g",
    portion: "Portion",
    perPortion: "Fibres par portion",
    label: "Repère UE",
    search: "Rechercher un aliment",
    allCategories: "Toutes les catégories",
    sort: "Trier par",
    sortFibre: "Fibres pour 100 g",
    sortPortion: "Fibres par portion",
    sortName: "Nom",
    count: "{n} aliments affichés",
    noscript: "Le tri et la recherche ont besoin de JavaScript ; le tableau complet reste lisible ci-dessous, du plus riche au moins riche.",
  },
  calculator: {
    title: "Combien de fibres dans ma journée ?",
    intro: "Ajoutez ce que vous mangez dans la journée, portion par portion.",
    food: "Aliment",
    portions: "Nombre de portions",
    add: "Ajouter",
    remove: "Retirer",
    empty: "Aucun aliment ajouté pour l'instant.",
    total: "Total : {total} g de fibres",
    efsa: "Repère de l'EFSA : {efsa} g par jour",
    national: "Objectif de plusieurs autorités nationales : {national} g par jour",
    reached: "atteint",
    noscript: "Le calculateur a besoin de JavaScript.",
  },
  read: {
    title: "Comment lire ce tableau",
    items: [
      "« Pour 100 g » permet de comparer les aliments entre eux ; « par portion » dit ce que vous mangez vraiment. Les graines de chia sont très riches pour 100 g, mais on en mange une cuillère ; une assiette de lentilles en apporte bien plus.",
      "Les repères « source de fibres » (au moins 3 g pour 100 g, ou 1,5 g pour 100 kcal) et « riche en fibres » (au moins 6 g pour 100 g, ou 3 g pour 100 kcal) reprennent les seuils du règlement européen sur les allégations nutritionnelles. Nous les appliquons ici aux aliments pour faciliter la comparaison.",
      "Les valeurs sont des moyennes : la variété, la cuisson et la marque font varier la teneur réelle.",
    ],
  },
  increase: {
    title: "Augmenter ses fibres en douceur",
    items: [
      "Augmentez progressivement, sur quelques semaines, pour éviter les ballonnements des premiers jours.",
      "Buvez suffisamment : les fibres ont besoin d'eau pour bien jouer leur rôle.",
      "Variez les sources : légumineuses, céréales complètes, fruits, légumes et oléagineux n'apportent pas les mêmes fibres.",
      "Gardez la peau des fruits et légumes quand c'est possible : elle concentre une bonne partie des fibres.",
    ],
  },
  doctor: {
    title: "Quand demander conseil",
    items: [
      "En cas de maladie digestive (maladie de Crohn, rectocolite, syndrome de l'intestin irritable) ou après une opération du tube digestif : certaines fibres peuvent être déconseillées par moments.",
      "Si vous suivez un régime prescrit, ou pour l'alimentation d'un jeune enfant : demandez à votre médecin ou à un diététicien.",
      "Si un changement du transit dure ou s'accompagne de douleurs, de sang ou d'une perte de poids inexpliquée.",
    ],
  },
  method: {
    title: "D'où viennent ces chiffres",
    text: [
      "Les teneurs en fibres, en eau et en énergie viennent de la table Ciqual 2025 publiée par l'Anses, version du 3 novembre 2025. Une valeur notée « traces » ou « inférieure à » dans Ciqual est comptée comme 0.",
      "Nous avons choisi {n} aliments courants et traduit leurs noms. Les portions habituelles sont une estimation de notre équipe, pour donner un ordre de grandeur. Les fibres par portion sont calculées à partir de la valeur pour 100 g.",
      "Les repères journaliers sont ceux de l'EFSA (25 g par jour, jugés adéquats pour un bon transit chez l'adulte) et l'objectif de 30 g retenu par plusieurs autorités nationales, comme le SACN au Royaume-Uni. Ce sont des repères pour des adultes en bonne santé.",
    ],
    licence: "Données : Anses, table Ciqual 2025, sous Licence Ouverte 2.0. Sélection, noms traduits, portions et calculs : Aloessential.",
  },
  sources: "Sources",
  related: "Pour aller plus loin",
  relatedLink: "Digestion, foie, détox : ce que les compléments peuvent vraiment promettre",
  grams: "g",
};

const en: FibreUi = {
  navLabel: "High-fibre foods table",
  path: "/en/high-fibre-foods/",
  digestionArticle: "digestion-liver-detox-supplements",
  title: "High-fibre foods: table and daily fibre calculator",
  description:
    "The foods highest in fibre, per 100 g and per portion, from the official French Ciqual database, with a calculator to reach 25 to 30 g a day.",
  eyebrow: "Free table and tool",
  h1: "High-fibre foods",
  intro:
    "Pulses, wholegrains, fruit, vegetables, nuts and seeds: here is the fibre content of {n} common foods, per 100 g and per usual portion. The values come from Ciqual, the official food composition database of the French food safety agency (Anses). Add the foods you eat in a day to see where you stand.",
  byline: "By the Aloessential team",
  categories: {
    legumes: "Pulses",
    grains: "Cereals and bread",
    vegetables: "Vegetables",
    fruits: "Fruit",
    dried: "Dried fruit",
    nuts: "Nuts and seeds",
    other: "Other",
  },
  labels: { high: "High fibre", source: "Source of fibre" },
  table: {
    title: "The fibre table",
    caption: "Dietary fibre from the Anses Ciqual 2025 table. Usual portion: our team's estimate.",
    food: "Food",
    category: "Category",
    per100g: "Fibre per 100 g",
    portion: "Portion",
    perPortion: "Fibre per portion",
    label: "EU benchmark",
    search: "Search for a food",
    allCategories: "All categories",
    sort: "Sort by",
    sortFibre: "Fibre per 100 g",
    sortPortion: "Fibre per portion",
    sortName: "Name",
    count: "{n} foods shown",
    noscript: "Sorting and search need JavaScript; the full table is still readable below, from highest to lowest.",
  },
  calculator: {
    title: "How much fibre is in my day?",
    intro: "Add what you eat during the day, portion by portion.",
    food: "Food",
    portions: "Number of portions",
    add: "Add",
    remove: "Remove",
    empty: "No food added yet.",
    total: "Total: {total} g of fibre",
    efsa: "EFSA reference: {efsa} g a day",
    national: "Target of several national bodies: {national} g a day",
    reached: "reached",
    noscript: "The calculator needs JavaScript.",
  },
  read: {
    title: "How to read this table",
    items: [
      "\"Per 100 g\" lets you compare foods; \"per portion\" tells you what you actually eat. Chia seeds are very high in fibre per 100 g, but you eat a spoonful; a plate of lentils gives far more.",
      "The \"source of fibre\" (at least 3 g per 100 g, or 1.5 g per 100 kcal) and \"high fibre\" (at least 6 g per 100 g, or 3 g per 100 kcal) benchmarks use the thresholds of the EU regulation on nutrition claims. We apply them to foods here to make comparison easier.",
      "The values are averages: variety, cooking and brand change the actual content.",
    ],
  },
  increase: {
    title: "Increasing fibre gently",
    items: [
      "Increase gradually, over a few weeks, to avoid bloating in the first days.",
      "Drink enough: fibre needs water to do its job.",
      "Vary your sources: pulses, wholegrains, fruit, vegetables, nuts and seeds do not provide the same fibres.",
      "Keep the skin on fruit and vegetables when you can: much of the fibre is there.",
    ],
  },
  doctor: {
    title: "When to get advice",
    items: [
      "If you have a digestive condition (Crohn's disease, ulcerative colitis, irritable bowel syndrome) or after gut surgery: some fibres may be advised against at times.",
      "If you follow a prescribed diet, or for a young child's diet: ask your GP or a dietitian.",
      "If a change in bowel habit lasts or comes with pain, blood or unexplained weight loss.",
    ],
  },
  method: {
    title: "Where these figures come from",
    text: [
      "Fibre, water and energy values come from the Ciqual 2025 table published by Anses, version of 3 November 2025. A value Ciqual gives as \"traces\" or \"less than\" is counted as 0.",
      "We chose {n} common foods and translated their names. Usual portions are our team's estimate, to give an order of magnitude. Fibre per portion is calculated from the value per 100 g.",
      "The daily references are EFSA's (25 g a day, judged adequate for normal bowel function in adults) and the 30 g target of several national bodies, such as SACN in the UK. They apply to healthy adults.",
    ],
    licence: "Data: Anses, Ciqual 2025 table, under the Open Licence 2.0 (Etalab). Selection, translated names, portions and calculations: Aloessential.",
  },
  sources: "Sources",
  related: "Read next",
  relatedLink: "Digestion, liver, detox: what supplements can really promise",
  grams: "g",
};

const es: FibreUi = {
  navLabel: "Tabla de alimentos ricos en fibra",
  path: "/es/alimentos-ricos-en-fibra/",
  digestionArticle: "digestion-higado-detox-complementos",
  title: "Alimentos ricos en fibra: la tabla y la calculadora",
  description:
    "Los alimentos más ricos en fibra, por 100 g y por ración, según la tabla oficial francesa Ciqual, con una calculadora para llegar a 25-30 g al día.",
  eyebrow: "Tabla y herramienta gratuitas",
  h1: "Alimentos ricos en fibra",
  intro:
    "Legumbres, cereales integrales, frutas, verduras, frutos secos y semillas: aquí tienes el contenido en fibra de {n} alimentos habituales, por 100 g y por ración. Los valores proceden de Ciqual, la tabla oficial de composición de alimentos de la agencia francesa de seguridad alimentaria (Anses). Añade lo que comes en un día para ver cómo vas.",
  byline: "Por el equipo de Aloessential",
  categories: {
    legumes: "Legumbres",
    grains: "Cereales y pan",
    vegetables: "Verduras",
    fruits: "Frutas",
    dried: "Frutas desecadas",
    nuts: "Frutos secos y semillas",
    other: "Otros",
  },
  labels: { high: "Alto contenido de fibra", source: "Fuente de fibra" },
  table: {
    title: "La tabla de la fibra",
    caption: "Fibra alimentaria según la tabla Ciqual 2025 de la Anses. Ración habitual: estimación de nuestro equipo.",
    food: "Alimento",
    category: "Categoría",
    per100g: "Fibra por 100 g",
    portion: "Ración",
    perPortion: "Fibra por ración",
    label: "Referencia UE",
    search: "Buscar un alimento",
    allCategories: "Todas las categorías",
    sort: "Ordenar por",
    sortFibre: "Fibra por 100 g",
    sortPortion: "Fibra por ración",
    sortName: "Nombre",
    count: "{n} alimentos mostrados",
    noscript: "Ordenar y buscar necesitan JavaScript; la tabla completa sigue siendo legible abajo, de mayor a menor.",
  },
  calculator: {
    title: "¿Cuánta fibra hay en mi día?",
    intro: "Añade lo que comes durante el día, ración a ración.",
    food: "Alimento",
    portions: "Número de raciones",
    add: "Añadir",
    remove: "Quitar",
    empty: "Todavía no has añadido ningún alimento.",
    total: "Total: {total} g de fibra",
    efsa: "Referencia de la EFSA: {efsa} g al día",
    national: "Objetivo de varias autoridades nacionales: {national} g al día",
    reached: "alcanzado",
    noscript: "La calculadora necesita JavaScript.",
  },
  read: {
    title: "Cómo leer esta tabla",
    items: [
      "«Por 100 g» sirve para comparar alimentos; «por ración» dice lo que realmente comes. Las semillas de chía son muy ricas por 100 g, pero se toma una cucharada; un plato de lentejas aporta mucho más.",
      "Las referencias «fuente de fibra» (al menos 3 g por 100 g, o 1,5 g por 100 kcal) y «alto contenido de fibra» (al menos 6 g por 100 g, o 3 g por 100 kcal) retoman los umbrales del reglamento europeo sobre declaraciones nutricionales. Aquí los aplicamos a los alimentos para facilitar la comparación.",
      "Los valores son medias: la variedad, la cocción y la marca cambian el contenido real.",
    ],
  },
  increase: {
    title: "Aumentar la fibra poco a poco",
    items: [
      "Aumenta de forma progresiva, a lo largo de unas semanas, para evitar la hinchazón de los primeros días.",
      "Bebe suficiente: la fibra necesita agua para cumplir su función.",
      "Varía las fuentes: legumbres, cereales integrales, frutas, verduras y frutos secos no aportan las mismas fibras.",
      "Conserva la piel de frutas y verduras cuando puedas: concentra buena parte de la fibra.",
    ],
  },
  doctor: {
    title: "Cuándo pedir consejo",
    items: [
      "Si tienes una enfermedad digestiva (enfermedad de Crohn, colitis ulcerosa, síndrome del intestino irritable) o después de una operación del aparato digestivo: algunas fibras pueden estar desaconsejadas en ciertos momentos.",
      "Si sigues una dieta prescrita, o para la alimentación de un niño pequeño: pregunta a tu médico o a un dietista-nutricionista.",
      "Si un cambio en el tránsito dura o viene con dolor, sangre o una pérdida de peso sin explicación.",
    ],
  },
  method: {
    title: "De dónde salen estas cifras",
    text: [
      "Los valores de fibra, agua y energía proceden de la tabla Ciqual 2025 publicada por la Anses, versión del 3 de noviembre de 2025. Un valor que Ciqual indica como «trazas» o «menor que» se cuenta como 0.",
      "Hemos elegido {n} alimentos habituales y traducido sus nombres. Las raciones habituales son una estimación de nuestro equipo, para dar un orden de magnitud. La fibra por ración se calcula a partir del valor por 100 g.",
      "Las referencias diarias son las de la EFSA (25 g al día, adecuados para un buen tránsito en adultos) y el objetivo de 30 g de varias autoridades nacionales, como el SACN en el Reino Unido. Se aplican a adultos sanos.",
    ],
    licence: "Datos: Anses, tabla Ciqual 2025, con Licencia Abierta 2.0 (Etalab). Selección, nombres traducidos, raciones y cálculos: Aloessential.",
  },
  sources: "Fuentes",
  related: "Para saber más",
  relatedLink: "Digestión, hígado, detox: qué prometen los complementos",
  grams: "g",
};

const de: FibreUi = {
  navLabel: "Tabelle ballaststoffreicher Lebensmittel",
  path: "/de/ballaststoffreiche-lebensmittel/",
  digestionArticle: "verdauung-leber-detox-nahrungsergaenzung",
  title: "Ballaststoffreiche Lebensmittel: Tabelle und Rechner",
  description:
    "Die ballaststoffreichsten Lebensmittel pro 100 g und pro Portion, aus der offiziellen französischen Ciqual-Tabelle, mit Rechner für 25 bis 30 g am Tag.",
  eyebrow: "Kostenlose Tabelle und Tool",
  h1: "Ballaststoffreiche Lebensmittel",
  intro:
    "Hülsenfrüchte, Vollkorn, Obst, Gemüse, Nüsse und Samen: Hier finden Sie den Ballaststoffgehalt von {n} gängigen Lebensmitteln, pro 100 g und pro üblicher Portion. Die Werte stammen aus Ciqual, der offiziellen Nährwerttabelle der französischen Behörde für Lebensmittelsicherheit (Anses). Fügen Sie hinzu, was Sie an einem Tag essen, und sehen Sie, wo Sie stehen.",
  byline: "Vom Aloessential-Team",
  categories: {
    legumes: "Hülsenfrüchte",
    grains: "Getreide und Brot",
    vegetables: "Gemüse",
    fruits: "Obst",
    dried: "Trockenobst",
    nuts: "Nüsse und Samen",
    other: "Sonstiges",
  },
  labels: { high: "Hoher Ballaststoffgehalt", source: "Ballaststoffquelle" },
  table: {
    title: "Die Ballaststofftabelle",
    caption: "Ballaststoffe laut Ciqual-Tabelle 2025 der Anses. Übliche Portion: Schätzung unseres Teams.",
    food: "Lebensmittel",
    category: "Kategorie",
    per100g: "Ballaststoffe pro 100 g",
    portion: "Portion",
    perPortion: "Ballaststoffe pro Portion",
    label: "EU-Richtwert",
    search: "Lebensmittel suchen",
    allCategories: "Alle Kategorien",
    sort: "Sortieren nach",
    sortFibre: "Ballaststoffe pro 100 g",
    sortPortion: "Ballaststoffe pro Portion",
    sortName: "Name",
    count: "{n} Lebensmittel angezeigt",
    noscript: "Sortieren und Suchen brauchen JavaScript; die vollständige Tabelle bleibt unten lesbar, absteigend sortiert.",
  },
  calculator: {
    title: "Wie viele Ballaststoffe esse ich am Tag?",
    intro: "Fügen Sie hinzu, was Sie im Laufe des Tages essen, Portion für Portion.",
    food: "Lebensmittel",
    portions: "Anzahl der Portionen",
    add: "Hinzufügen",
    remove: "Entfernen",
    empty: "Noch kein Lebensmittel hinzugefügt.",
    total: "Summe: {total} g Ballaststoffe",
    efsa: "Referenzwert der EFSA: {efsa} g am Tag",
    national: "Ziel mehrerer nationaler Stellen: {national} g am Tag",
    reached: "erreicht",
    noscript: "Der Rechner braucht JavaScript.",
  },
  read: {
    title: "So lesen Sie die Tabelle",
    items: [
      "„Pro 100 g“ macht Lebensmittel vergleichbar; „pro Portion“ zeigt, was Sie tatsächlich essen. Chiasamen sind pro 100 g sehr ballaststoffreich, aber man isst einen Löffel davon; ein Teller Linsen liefert weit mehr.",
      "Die Richtwerte „Ballaststoffquelle“ (mindestens 3 g pro 100 g oder 1,5 g pro 100 kcal) und „hoher Ballaststoffgehalt“ (mindestens 6 g pro 100 g oder 3 g pro 100 kcal) übernehmen die Schwellen der EU-Verordnung über nährwertbezogene Angaben. Wir wenden sie hier zum besseren Vergleich auf Lebensmittel an.",
      "Die Werte sind Durchschnittswerte: Sorte, Zubereitung und Marke verändern den tatsächlichen Gehalt.",
    ],
  },
  increase: {
    title: "Ballaststoffe sanft steigern",
    items: [
      "Steigern Sie die Menge schrittweise über einige Wochen, um Blähungen in den ersten Tagen zu vermeiden.",
      "Trinken Sie genug: Ballaststoffe brauchen Wasser, um zu wirken.",
      "Wechseln Sie die Quellen ab: Hülsenfrüchte, Vollkorn, Obst, Gemüse, Nüsse und Samen liefern unterschiedliche Ballaststoffe.",
      "Lassen Sie die Schale von Obst und Gemüse dran, wenn es geht: Dort steckt ein guter Teil der Ballaststoffe.",
    ],
  },
  doctor: {
    title: "Wann Sie Rat einholen sollten",
    items: [
      "Bei einer Darmerkrankung (Morbus Crohn, Colitis ulcerosa, Reizdarmsyndrom) oder nach einer Operation am Verdauungstrakt: Manche Ballaststoffe können zeitweise nicht empfohlen sein.",
      "Wenn Sie eine ärztlich verordnete Diät einhalten oder für die Ernährung eines Kleinkinds: Fragen Sie Ihre Ärztin, Ihren Arzt oder eine Ernährungsfachkraft.",
      "Wenn sich die Verdauung dauerhaft verändert oder Schmerzen, Blut oder ein unerklärlicher Gewichtsverlust hinzukommen.",
    ],
  },
  method: {
    title: "Woher diese Zahlen stammen",
    text: [
      "Die Werte für Ballaststoffe, Wasser und Energie stammen aus der Ciqual-Tabelle 2025 der Anses, Version vom 3. November 2025. Ein Wert, den Ciqual als „Spuren“ oder „kleiner als“ angibt, wird als 0 gezählt.",
      "Wir haben {n} gängige Lebensmittel ausgewählt und ihre Namen übersetzt. Die üblichen Portionen sind eine Schätzung unseres Teams und geben eine Größenordnung an. Die Ballaststoffe pro Portion werden aus dem Wert pro 100 g berechnet.",
      "Die Tagesrichtwerte sind der der EFSA (25 g am Tag, für eine normale Darmfunktion bei Erwachsenen als angemessen bewertet) und das Ziel von 30 g mehrerer nationaler Stellen, etwa des britischen SACN. Sie gelten für gesunde Erwachsene.",
    ],
    licence: "Daten: Anses, Ciqual-Tabelle 2025, unter der Licence Ouverte 2.0 (Etalab). Auswahl, übersetzte Namen, Portionen und Berechnungen: Aloessential.",
  },
  sources: "Quellen",
  related: "Weiterlesen",
  relatedLink: "Verdauung, Leber, Detox: was Präparate versprechen dürfen",
  grams: "g",
};

const it: FibreUi = {
  navLabel: "Tabella degli alimenti ricchi di fibre",
  path: "/it/alimenti-ricchi-di-fibre/",
  digestionArticle: "digestione-fegato-detox-integratori",
  title: "Alimenti ricchi di fibre: la tabella e il calcolatore",
  description:
    "Gli alimenti più ricchi di fibre, per 100 g e per porzione, dalla tabella ufficiale francese Ciqual, con un calcolatore per arrivare a 25-30 g al giorno.",
  eyebrow: "Tabella e strumento gratuiti",
  h1: "Gli alimenti ricchi di fibre",
  intro:
    "Legumi, cereali integrali, frutta, verdura, frutta secca e semi: ecco il contenuto di fibre di {n} alimenti comuni, per 100 g e per porzione abituale. I valori provengono da Ciqual, la tabella ufficiale di composizione degli alimenti dell'agenzia francese per la sicurezza alimentare (Anses). Aggiungi ciò che mangi in una giornata per vedere a che punto sei.",
  byline: "A cura della redazione di Aloessential",
  categories: {
    legumes: "Legumi",
    grains: "Cereali e pane",
    vegetables: "Verdure",
    fruits: "Frutta",
    dried: "Frutta essiccata",
    nuts: "Frutta a guscio e semi",
    other: "Altro",
  },
  labels: { high: "Ad alto contenuto di fibre", source: "Fonte di fibre" },
  table: {
    title: "La tabella delle fibre",
    caption: "Fibra alimentare secondo la tabella Ciqual 2025 dell'Anses. Porzione abituale: stima della nostra redazione.",
    food: "Alimento",
    category: "Categoria",
    per100g: "Fibre per 100 g",
    portion: "Porzione",
    perPortion: "Fibre per porzione",
    label: "Riferimento UE",
    search: "Cerca un alimento",
    allCategories: "Tutte le categorie",
    sort: "Ordina per",
    sortFibre: "Fibre per 100 g",
    sortPortion: "Fibre per porzione",
    sortName: "Nome",
    count: "{n} alimenti mostrati",
    noscript: "Ordinamento e ricerca richiedono JavaScript; la tabella completa resta leggibile qui sotto, dal più ricco al meno ricco.",
  },
  calculator: {
    title: "Quante fibre ci sono nella mia giornata?",
    intro: "Aggiungi ciò che mangi durante la giornata, porzione per porzione.",
    food: "Alimento",
    portions: "Numero di porzioni",
    add: "Aggiungi",
    remove: "Togli",
    empty: "Nessun alimento aggiunto per ora.",
    total: "Totale: {total} g di fibre",
    efsa: "Riferimento EFSA: {efsa} g al giorno",
    national: "Obiettivo di diverse autorità nazionali: {national} g al giorno",
    reached: "raggiunto",
    noscript: "Il calcolatore richiede JavaScript.",
  },
  read: {
    title: "Come leggere questa tabella",
    items: [
      "«Per 100 g» serve a confrontare gli alimenti; «per porzione» dice quanto mangi davvero. I semi di chia sono ricchissimi per 100 g, ma se ne mangia un cucchiaio; un piatto di lenticchie ne apporta molte di più.",
      "I riferimenti «fonte di fibre» (almeno 3 g per 100 g, o 1,5 g per 100 kcal) e «ad alto contenuto di fibre» (almeno 6 g per 100 g, o 3 g per 100 kcal) riprendono le soglie del regolamento europeo sulle indicazioni nutrizionali. Qui li applichiamo agli alimenti per facilitare il confronto.",
      "I valori sono medie: varietà, cottura e marca cambiano il contenuto reale.",
    ],
  },
  increase: {
    title: "Aumentare le fibre con gradualità",
    items: [
      "Aumenta gradualmente, nell'arco di qualche settimana, per evitare il gonfiore dei primi giorni.",
      "Bevi a sufficienza: le fibre hanno bisogno di acqua per svolgere il loro ruolo.",
      "Varia le fonti: legumi, cereali integrali, frutta, verdura e frutta secca non apportano le stesse fibre.",
      "Quando possibile, mangia frutta e verdura con la buccia: lì si concentra buona parte delle fibre.",
    ],
  },
  doctor: {
    title: "Quando chiedere consiglio",
    items: [
      "In caso di malattia intestinale (morbo di Crohn, rettocolite ulcerosa, sindrome dell'intestino irritabile) o dopo un intervento all'apparato digerente: alcune fibre possono essere sconsigliate in certi periodi.",
      "Se segui una dieta prescritta, o per l'alimentazione di un bambino piccolo: chiedi al medico o a un dietista.",
      "Se un cambiamento dell'alvo dura o si accompagna a dolore, sangue o perdita di peso inspiegabile.",
    ],
  },
  method: {
    title: "Da dove vengono questi numeri",
    text: [
      "I valori di fibre, acqua ed energia provengono dalla tabella Ciqual 2025 pubblicata dall'Anses, versione del 3 novembre 2025. Un valore indicato da Ciqual come «tracce» o «inferiore a» è contato come 0.",
      "Abbiamo scelto {n} alimenti comuni e ne abbiamo tradotto i nomi. Le porzioni abituali sono una stima della nostra redazione, per dare un ordine di grandezza. Le fibre per porzione sono calcolate dal valore per 100 g.",
      "I riferimenti giornalieri sono quelli dell'EFSA (25 g al giorno, adeguati per una normale funzione intestinale negli adulti) e l'obiettivo di 30 g di diverse autorità nazionali, come il SACN nel Regno Unito. Valgono per adulti in buona salute.",
    ],
    licence: "Dati: Anses, tabella Ciqual 2025, con Licence Ouverte 2.0 (Etalab). Selezione, nomi tradotti, porzioni e calcoli: Aloessential.",
  },
  sources: "Fonti",
  related: "Per approfondire",
  relatedLink: "Digestione, fegato, detox: cosa promettono gli integratori",
  grams: "g",
};

const ptPt: FibreUi = {
  navLabel: "Tabela de alimentos ricos em fibra",
  path: "/pt-pt/alimentos-ricos-em-fibra/",
  digestionArticle: "digestao-figado-detox-suplementos",
  title: "Alimentos ricos em fibra: a tabela e a calculadora",
  description:
    "Os alimentos mais ricos em fibra, por 100 g e por porção, segundo a tabela oficial francesa Ciqual, com uma calculadora para chegar a 25-30 g por dia.",
  eyebrow: "Tabela e ferramenta gratuitas",
  h1: "Alimentos ricos em fibra",
  intro:
    "Leguminosas, cereais integrais, fruta, legumes, frutos secos e sementes: aqui tens o teor de fibra de {n} alimentos comuns, por 100 g e por porção habitual. Os valores vêm da Ciqual, a tabela oficial de composição dos alimentos da agência francesa de segurança alimentar (Anses). Junta o que comes num dia para veres em que ponto estás.",
  byline: "Pela equipa Aloessential",
  categories: {
    legumes: "Leguminosas",
    grains: "Cereais e pão",
    vegetables: "Legumes",
    fruits: "Fruta",
    dried: "Fruta desidratada",
    nuts: "Frutos secos e sementes",
    other: "Outros",
  },
  labels: { high: "Rico em fibra", source: "Fonte de fibra" },
  table: {
    title: "A tabela da fibra",
    caption: "Fibra alimentar segundo a tabela Ciqual 2025 da Anses. Porção habitual: estimativa da nossa equipa.",
    food: "Alimento",
    category: "Categoria",
    per100g: "Fibra por 100 g",
    portion: "Porção",
    perPortion: "Fibra por porção",
    label: "Referência UE",
    search: "Procurar um alimento",
    allCategories: "Todas as categorias",
    sort: "Ordenar por",
    sortFibre: "Fibra por 100 g",
    sortPortion: "Fibra por porção",
    sortName: "Nome",
    count: "{n} alimentos apresentados",
    noscript: "Ordenar e procurar precisam de JavaScript; a tabela completa continua legível abaixo, do mais rico para o menos rico.",
  },
  calculator: {
    title: "Quanta fibra há no meu dia?",
    intro: "Junta o que comes ao longo do dia, porção a porção.",
    food: "Alimento",
    portions: "Número de porções",
    add: "Juntar",
    remove: "Retirar",
    empty: "Ainda não juntaste nenhum alimento.",
    total: "Total: {total} g de fibra",
    efsa: "Referência da EFSA: {efsa} g por dia",
    national: "Objetivo de várias autoridades nacionais: {national} g por dia",
    reached: "atingido",
    noscript: "A calculadora precisa de JavaScript.",
  },
  read: {
    title: "Como ler esta tabela",
    items: [
      "«Por 100 g» serve para comparar alimentos; «por porção» diz o que comes realmente. As sementes de chia são muito ricas por 100 g, mas come-se uma colher; um prato de lentilhas dá muito mais.",
      "As referências «fonte de fibra» (pelo menos 3 g por 100 g, ou 1,5 g por 100 kcal) e «rico em fibra» (pelo menos 6 g por 100 g, ou 3 g por 100 kcal) retomam os limiares do regulamento europeu sobre alegações nutricionais. Aplicamo-las aqui aos alimentos para facilitar a comparação.",
      "Os valores são médias: a variedade, a confeção e a marca alteram o teor real.",
    ],
  },
  increase: {
    title: "Aumentar a fibra com calma",
    items: [
      "Aumenta aos poucos, ao longo de algumas semanas, para evitar o inchaço dos primeiros dias.",
      "Bebe o suficiente: a fibra precisa de água para cumprir a sua função.",
      "Varia as fontes: leguminosas, cereais integrais, fruta, legumes e frutos secos não dão as mesmas fibras.",
      "Mantém a casca da fruta e dos legumes quando puderes: concentra boa parte da fibra.",
    ],
  },
  doctor: {
    title: "Quando pedir conselho",
    items: [
      "Em caso de doença digestiva (doença de Crohn, colite ulcerosa, síndrome do intestino irritável) ou depois de uma cirurgia ao aparelho digestivo: algumas fibras podem ser desaconselhadas em certos períodos.",
      "Se segues uma dieta prescrita, ou para a alimentação de uma criança pequena: pergunta ao teu médico ou a um nutricionista.",
      "Se uma alteração do trânsito intestinal durar ou vier acompanhada de dor, sangue ou perda de peso sem explicação.",
    ],
  },
  method: {
    title: "De onde vêm estes números",
    text: [
      "Os valores de fibra, água e energia vêm da tabela Ciqual 2025 publicada pela Anses, versão de 3 de novembro de 2025. Um valor que a Ciqual indica como «vestígios» ou «inferior a» é contado como 0.",
      "Escolhemos {n} alimentos comuns e traduzimos os nomes. As porções habituais são uma estimativa da nossa equipa, para dar uma ordem de grandeza. A fibra por porção é calculada a partir do valor por 100 g.",
      "As referências diárias são as da EFSA (25 g por dia, adequados para um bom trânsito intestinal em adultos) e o objetivo de 30 g de várias autoridades nacionais, como o SACN no Reino Unido. Aplicam-se a adultos saudáveis.",
    ],
    licence: "Dados: Anses, tabela Ciqual 2025, com a Licence Ouverte 2.0 (Etalab). Seleção, nomes traduzidos, porções e cálculos: Aloessential.",
  },
  sources: "Fontes",
  related: "Para saber mais",
  relatedLink: "Digestão, fígado, detox: o que os suplementos podem prometer",
  grams: "g",
};

const pl: FibreUi = {
  navLabel: "Tabela produktów bogatych w błonnik",
  path: "/pl/produkty-bogate-w-blonnik/",
  digestionArticle: "trawienie-watroba-detoks-suplementy",
  title: "Produkty bogate w błonnik: tabela i kalkulator",
  description:
    "Produkty najbogatsze w błonnik, na 100 g i na porcję, według oficjalnej francuskiej tabeli Ciqual, z kalkulatorem, który pomoże dojść do 25–30 g dziennie.",
  eyebrow: "Bezpłatna tabela i narzędzie",
  h1: "Produkty bogate w błonnik",
  intro:
    "Rośliny strączkowe, produkty pełnoziarniste, owoce, warzywa, orzechy i nasiona: oto zawartość błonnika w {n} popularnych produktach, na 100 g i na zwykłą porcję. Wartości pochodzą z Ciqual, oficjalnej tabeli składu żywności francuskiej agencji ds. bezpieczeństwa żywności (Anses). Dodaj to, co jesz w ciągu dnia, aby zobaczyć, ile już masz.",
  byline: "Zespół Aloessential",
  categories: {
    legumes: "Rośliny strączkowe",
    grains: "Zboża i pieczywo",
    vegetables: "Warzywa",
    fruits: "Owoce",
    dried: "Owoce suszone",
    nuts: "Orzechy i nasiona",
    other: "Inne",
  },
  labels: { high: "Wysoka zawartość błonnika", source: "Źródło błonnika" },
  table: {
    title: "Tabela błonnika",
    caption: "Błonnik pokarmowy według tabeli Ciqual 2025 agencji Anses. Zwykła porcja: szacunek naszego zespołu.",
    food: "Produkt",
    category: "Kategoria",
    per100g: "Błonnik na 100 g",
    portion: "Porcja",
    perPortion: "Błonnik na porcję",
    label: "Próg UE",
    search: "Szukaj produktu",
    allCategories: "Wszystkie kategorie",
    sort: "Sortuj według",
    sortFibre: "Błonnik na 100 g",
    sortPortion: "Błonnik na porcję",
    sortName: "Nazwa",
    count: "Wyświetlone produkty: {n}",
    noscript: "Sortowanie i wyszukiwanie wymagają JavaScriptu; pełna tabela pozostaje czytelna poniżej, od najbogatszych produktów.",
  },
  calculator: {
    title: "Ile błonnika zjadam w ciągu dnia?",
    intro: "Dodaj to, co jesz w ciągu dnia, porcja po porcji.",
    food: "Produkt",
    portions: "Liczba porcji",
    add: "Dodaj",
    remove: "Usuń",
    empty: "Nie dodano jeszcze żadnego produktu.",
    total: "Razem: {total} g błonnika",
    efsa: "Wartość referencyjna EFSA: {efsa} g dziennie",
    national: "Cel kilku instytucji krajowych: {national} g dziennie",
    reached: "osiągnięto",
    noscript: "Kalkulator wymaga JavaScriptu.",
  },
  read: {
    title: "Jak czytać tę tabelę",
    items: [
      "„Na 100 g” pozwala porównywać produkty; „na porcję” mówi, ile naprawdę zjadasz. Nasiona chia są bardzo bogate w błonnik na 100 g, ale je się ich łyżkę; talerz soczewicy dostarcza znacznie więcej.",
      "Progi „źródło błonnika” (co najmniej 3 g na 100 g lub 1,5 g na 100 kcal) i „wysoka zawartość błonnika” (co najmniej 6 g na 100 g lub 3 g na 100 kcal) pochodzą z unijnego rozporządzenia o oświadczeniach żywieniowych. Stosujemy je tu do produktów, aby ułatwić porównanie.",
      "Wartości są średnie: odmiana, sposób przygotowania i marka zmieniają rzeczywistą zawartość.",
    ],
  },
  increase: {
    title: "Jak łagodnie zwiększać ilość błonnika",
    items: [
      "Zwiększaj stopniowo, przez kilka tygodni, aby uniknąć wzdęć w pierwszych dniach.",
      "Pij wystarczająco dużo: błonnik potrzebuje wody, aby dobrze działać.",
      "Urozmaicaj źródła: rośliny strączkowe, produkty pełnoziarniste, owoce, warzywa, orzechy i nasiona dostarczają różnych rodzajów błonnika.",
      "Jeśli to możliwe, nie obieraj owoców i warzyw: w skórce jest sporo błonnika.",
    ],
  },
  doctor: {
    title: "Kiedy zasięgnąć porady",
    items: [
      "Przy chorobie przewodu pokarmowego (choroba Leśniowskiego-Crohna, wrzodziejące zapalenie jelita grubego, zespół jelita drażliwego) lub po operacji układu pokarmowego: niektóre rodzaje błonnika mogą być czasowo niewskazane.",
      "Jeśli stosujesz dietę zaleconą przez lekarza lub w przypadku żywienia małego dziecka: zapytaj lekarza lub dietetyka.",
      "Jeśli zmiana rytmu wypróżnień się utrzymuje albo towarzyszy jej ból, krew lub niewyjaśniona utrata masy ciała.",
    ],
  },
  method: {
    title: "Skąd pochodzą te liczby",
    text: [
      "Wartości błonnika, wody i energii pochodzą z tabeli Ciqual 2025 opublikowanej przez Anses, wersja z 3 listopada 2025 r. Wartość, którą Ciqual podaje jako „śladowe ilości” lub „poniżej”, liczymy jako 0.",
      "Wybraliśmy {n} popularne produkty i przetłumaczyliśmy ich nazwy. Zwykłe porcje to szacunek naszego zespołu, który daje rząd wielkości. Błonnik na porcję obliczamy na podstawie wartości na 100 g.",
      "Dzienne wartości referencyjne to wartość EFSA (25 g dziennie, uznane za wystarczające dla prawidłowej pracy jelit u dorosłych) i cel 30 g przyjęty przez kilka instytucji krajowych, na przykład brytyjski SACN. Dotyczą zdrowych dorosłych.",
    ],
    licence: "Dane: Anses, tabela Ciqual 2025, na licencji Licence Ouverte 2.0 (Etalab). Wybór, przetłumaczone nazwy, porcje i obliczenia: Aloessential.",
  },
  sources: "Źródła",
  related: "Czytaj dalej",
  relatedLink: "Trawienie, wątroba, detoks: co mogą obiecywać suplementy",
  grams: "g",
};

export const FIBRE_UI: Record<Locale, FibreUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Language versions of the fibre table: French plus every published locale (hreflang and sitemap). */
export function fibreAlternates(translatedLocales: Locale[]): { locale: Locale; hreflang: string; path: string }[] {
  return [DEFAULT_LOCALE, ...translatedLocales].map((locale) => ({
    locale,
    hreflang: LOCALES[locale].htmlLang,
    path: FIBRE_UI[locale].path,
  }));
}
