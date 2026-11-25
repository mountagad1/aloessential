/*
 * Text of the breakfast builder (src/data/breakfast.ts, shown inside the
 * balanced-breakfast article) in every locale. Placeholders: {fibre}, {kcal},
 * {efsa} and {national} (percent of each daily reference), {efsaRef} and
 * {nationalRef} (the references, in grams).
 */
import type { Locale } from "./locales";
import type { Group, IdeaId } from "../data/breakfast";

export interface BreakfastUi {
  ideas: {
    title: string;
    intro: string;
    caption: string;
    idea: string;
    contents: string;
    fibre: string;
    protein: string;
    kcal: string;
    groups: string;
  };
  ideaNames: Record<IdeaId, string>;
  groups: Record<Group, string>;
  builder: {
    title: string;
    intro: string;
    start: string;
    startNone: string;
    load: string;
    food: string;
    grams: string;
    add: string;
    remove: string;
    clear: string;
    empty: string;
    fibre: string;
    kcal: string;
    protein: string;
    share: string;
    checklist: string;
    present: string;
    missing: string;
    tips: Record<Group, string>;
    complete: string;
    noscript: string;
  };
  method: { title: string; text: string[]; sources: string };
  /** Separator between a label and its value: " : " in French, ": " elsewhere. */
  colon: string;
}

const fr: BreakfastUi = {
  ideas: {
    title: "Nos idées de petit-déjeuner comparées",
    intro:
      "Onze petits-déjeuners, dont une version chiffrée des cinq idées ci-dessus, avec leurs fibres, leurs protéines et leurs calories calculées à partir de la table officielle Ciqual. Classés du plus riche au moins riche en fibres.",
    caption:
      "Fibres, protéines et énergie d'après la table Ciqual 2025 de l'Anses. Le café et le thé sans lait ne sont pas comptés.",
    idea: "Petit-déjeuner",
    contents: "Contenu",
    fibre: "Fibres",
    protein: "Protéines",
    kcal: "Énergie",
    groups: "Éléments présents",
  },
  ideaNames: {
    overnightOats: "Bol d'avoine au lait, framboises et amandes",
    wholemealToast: "Tartine complète, œuf dur, tomate et huile d'olive",
    yoghurtBowl: "Yaourt, graines de chia, poire et miel",
    smoothie: "Smoothie banane, épinards, yaourt et avoine",
    express: "Version express : amandes et pomme",
    muesli: "Muesli, lait et myrtilles",
    peanutToast: "Tartine complète, beurre de cacahuète et banane",
    avocadoToast: "Pain de seigle, avocat et tomate",
    fromageKiwi: "Fromage blanc, kiwis et graines de lin",
    croissant: "Croissant et jus d'orange (pour comparer)",
    cornflakes: "Pétales de maïs et lait (pour comparer)",
  },
  groups: {
    cereal: "Céréales ou pain",
    fruit: "Fruit ou légume",
    protein: "Laitage, œuf, jambon, oléagineux ou graines",
  },
  builder: {
    title: "Composez votre petit-déjeuner",
    intro:
      "Partez d'une idée ou d'un bol vide, ajoutez vos aliments et leurs quantités : l'outil calcule les fibres et l'énergie, et vérifie les trois éléments d'un petit-déjeuner équilibré.",
    start: "Partir d'une idée",
    startNone: "Bol vide",
    load: "Charger",
    food: "Aliment",
    grams: "Quantité (g)",
    add: "Ajouter",
    remove: "Retirer",
    clear: "Tout effacer",
    empty: "Aucun aliment pour l'instant.",
    fibre: "{fibre} g de fibres",
    kcal: "Environ {kcal} kcal",
    protein: "{protein} g de protéines",
    share: "Soit {efsa} % du repère quotidien de l'EFSA ({efsaRef} g) et {national} % de l'objectif de {nationalRef} g.",
    checklist: "Les trois éléments",
    present: "présent",
    missing: "manquant",
    tips: {
      cereal: "Ajoutez des céréales ou du pain : flocons d'avoine, muesli ou pain complet apportent l'essentiel des fibres.",
      fruit: "Ajoutez un fruit ou un légume : entier, il garde ses fibres, contrairement au jus.",
      protein: "Ajoutez un yaourt, du lait, un œuf, ou quelques oléagineux ou graines.",
    },
    complete: "Les trois éléments sont réunis.",
    noscript: "L'outil a besoin de JavaScript ; le tableau des idées reste lisible ci-dessus.",
  },
  method: {
    title: "Comment nous avons calculé",
    text: [
      "Les fibres, les protéines et l'énergie de chaque aliment viennent de la table Ciqual 2025 de l'Anses, pour 100 g, ramenées à la quantité indiquée. Les protéines sont calculées comme sur les étiquettes européennes (azote × 6,25). Les quantités des idées sont nos estimations d'une portion courante.",
      "Le café et le thé sans lait ne sont pas comptés. Le jus de fruit ne coche pas la case « fruit » : le fruit entier garde ses fibres. Les valeurs sont des moyennes ; la variété et la marque les font varier.",
      "Les pourcentages comparent le petit-déjeuner aux repères pour toute la journée : 25 g de fibres selon l'EFSA, 30 g pour plusieurs autorités nationales. Il n'existe pas de repère officiel propre au petit-déjeuner.",
      "Ces repères concernent les adultes. Pour un enfant, une grossesse ou un régime prescrit, demandez conseil à un professionnel de santé.",
    ],
    sources: "Sources des chiffres",
  },
  colon: " : ",
};

const en: BreakfastUi = {
  ideas: {
    title: "Healthy breakfast ideas compared",
    intro:
      "Eleven breakfasts, including a measured version of the five ideas above, with their fibre, protein and calories worked out from the official Ciqual food composition table. Richest in fibre first.",
    caption:
      "Fibre, protein and energy from the Anses Ciqual 2025 table. Coffee and tea without milk are not counted.",
    idea: "Breakfast",
    contents: "What's in it",
    fibre: "Fibre",
    protein: "Protein",
    kcal: "Energy",
    groups: "Elements present",
  },
  ideaNames: {
    overnightOats: "Overnight oats with milk, raspberries and almonds",
    wholemealToast: "Wholemeal toast with a boiled egg, tomato and olive oil",
    yoghurtBowl: "Yoghurt with chia seeds, pear and honey",
    smoothie: "Banana, spinach, yoghurt and oat smoothie",
    express: "Express version: almonds and an apple",
    muesli: "Muesli with milk and blueberries",
    peanutToast: "Wholemeal toast with peanut butter and banana",
    avocadoToast: "Rye bread with avocado and tomato",
    fromageKiwi: "Fromage frais with kiwi and linseeds",
    croissant: "Croissant and orange juice (for comparison)",
    cornflakes: "Cornflakes and milk (for comparison)",
  },
  groups: {
    cereal: "Cereal or bread",
    fruit: "Fruit or vegetable",
    protein: "Dairy, egg, ham, nuts or seeds",
  },
  builder: {
    title: "Build your own breakfast",
    intro:
      "Start from an idea or an empty bowl, then add your foods and amounts: the tool works out the fibre and energy, and checks the three elements of a balanced breakfast.",
    start: "Start from an idea",
    startNone: "Empty bowl",
    load: "Load",
    food: "Food",
    grams: "Amount (g)",
    add: "Add",
    remove: "Remove",
    clear: "Clear all",
    empty: "No food yet.",
    fibre: "{fibre} g of fibre",
    kcal: "About {kcal} kcal",
    protein: "{protein} g of protein",
    share: "That is {efsa}% of the EFSA daily reference ({efsaRef} g) and {national}% of the {nationalRef} g target.",
    checklist: "The three elements",
    present: "present",
    missing: "missing",
    tips: {
      cereal: "Add a cereal or bread: rolled oats, muesli or wholemeal bread bring most of the fibre.",
      fruit: "Add a fruit or vegetable: eaten whole, it keeps its fibre, unlike juice.",
      protein: "Add a yoghurt, some milk, an egg, or a few nuts or seeds.",
    },
    complete: "All three elements are there.",
    noscript: "The tool needs JavaScript; the table of ideas above stays readable.",
  },
  method: {
    title: "How we worked it out",
    text: [
      "The fibre, protein and energy of each food come from the Anses Ciqual 2025 table, per 100 g, scaled to the amount shown. Protein is worked out as on EU food labels (nitrogen × 6.25). The amounts in the ideas are our estimate of a usual serving.",
      "Coffee and tea without milk are not counted. Fruit juice does not tick the fruit box: the whole fruit keeps its fibre. Values are averages; variety and brand make them vary.",
      "The percentages compare the breakfast with references for the whole day: 25 g of fibre according to EFSA, 30 g for several national bodies such as the UK's SACN. There is no official reference for breakfast alone.",
      "These references are for adults. For a child, during pregnancy or on a prescribed diet, ask a health professional.",
    ],
    sources: "Where the figures come from",
  },
  colon: ": ",
};

const es: BreakfastUi = {
  ideas: {
    title: "Nuestras ideas de desayuno comparadas",
    intro:
      "Once desayunos, entre ellos una versión medida de las cinco ideas anteriores, con su fibra, sus proteínas y sus calorías calculadas a partir de la tabla oficial Ciqual. Ordenados del más rico al menos rico en fibra.",
    caption:
      "Fibra, proteínas y energía según la tabla Ciqual 2025 de la Anses. No se cuentan el café ni el té sin leche.",
    idea: "Desayuno",
    contents: "Contenido",
    fibre: "Fibra",
    protein: "Proteínas",
    kcal: "Energía",
    groups: "Elementos presentes",
  },
  ideaNames: {
    overnightOats: "Avena con leche, frambuesas y almendras",
    wholemealToast: "Tostada integral con huevo duro, tomate y aceite de oliva",
    yoghurtBowl: "Yogur con semillas de chía, pera y miel",
    smoothie: "Batido de plátano, espinacas, yogur y avena",
    express: "Versión exprés: almendras y una manzana",
    muesli: "Muesli con leche y arándanos",
    peanutToast: "Tostada integral con crema de cacahuete y plátano",
    avocadoToast: "Pan de centeno con aguacate y tomate",
    fromageKiwi: "Queso fresco batido con kiwis y semillas de lino",
    croissant: "Cruasán y zumo de naranja (para comparar)",
    cornflakes: "Copos de maíz con leche (para comparar)",
  },
  groups: {
    cereal: "Cereales o pan",
    fruit: "Fruta o verdura",
    protein: "Lácteo, huevo, jamón, frutos secos o semillas",
  },
  builder: {
    title: "Compón tu desayuno",
    intro:
      "Parte de una idea o de un bol vacío y añade tus alimentos y sus cantidades: la herramienta calcula la fibra y la energía, y comprueba los tres elementos de un desayuno equilibrado.",
    start: "Partir de una idea",
    startNone: "Bol vacío",
    load: "Cargar",
    food: "Alimento",
    grams: "Cantidad (g)",
    add: "Añadir",
    remove: "Quitar",
    clear: "Borrar todo",
    empty: "Todavía no hay alimentos.",
    fibre: "{fibre} g de fibra",
    kcal: "Unas {kcal} kcal",
    protein: "{protein} g de proteínas",
    share: "Es decir, el {efsa} % de la referencia diaria de la EFSA ({efsaRef} g) y el {national} % del objetivo de {nationalRef} g.",
    checklist: "Los tres elementos",
    present: "presente",
    missing: "falta",
    tips: {
      cereal: "Añade cereales o pan: los copos de avena, el muesli o el pan integral aportan la mayor parte de la fibra.",
      fruit: "Añade una fruta o una verdura: entera conserva su fibra, a diferencia del zumo.",
      protein: "Añade un yogur, leche, un huevo o unos frutos secos o semillas.",
    },
    complete: "Están los tres elementos.",
    noscript: "La herramienta necesita JavaScript; la tabla de ideas sigue siendo legible más arriba.",
  },
  method: {
    title: "Cómo lo hemos calculado",
    text: [
      "La fibra, las proteínas y la energía de cada alimento proceden de la tabla Ciqual 2025 de la Anses, por 100 g, ajustadas a la cantidad indicada. Las proteínas se calculan como en las etiquetas europeas (nitrógeno × 6,25). Las cantidades de las ideas son nuestra estimación de una ración habitual.",
      "No se cuentan el café ni el té sin leche. El zumo no marca la casilla de fruta: la fruta entera conserva su fibra. Los valores son medias; la variedad y la marca los hacen variar.",
      "Los porcentajes comparan el desayuno con referencias para todo el día: 25 g de fibra según la EFSA y 30 g para varias autoridades nacionales. No existe una referencia oficial solo para el desayuno.",
      "Estas referencias son para adultos. Para un niño, durante el embarazo o con una dieta prescrita, consulta a un profesional sanitario.",
    ],
    sources: "De dónde salen las cifras",
  },
  colon: ": ",
};

const de: BreakfastUi = {
  ideas: {
    title: "Unsere Frühstücksideen im Vergleich",
    intro:
      "Elf Frühstücke, darunter eine abgewogene Fassung der fünf Ideen oben, mit Ballaststoffen, Eiweiß und Kalorien, berechnet nach der offiziellen Nährwerttabelle Ciqual. Die ballaststoffreichsten zuerst.",
    caption:
      "Ballaststoffe, Eiweiß und Energie nach der Tabelle Ciqual 2025 der Anses. Kaffee und Tee ohne Milch sind nicht mitgerechnet.",
    idea: "Frühstück",
    contents: "Zutaten",
    fibre: "Ballaststoffe",
    protein: "Eiweiß",
    kcal: "Energie",
    groups: "Enthaltene Elemente",
  },
  ideaNames: {
    overnightOats: "Overnight Oats mit Milch, Himbeeren und Mandeln",
    wholemealToast: "Vollkornbrot mit gekochtem Ei, Tomate und Olivenöl",
    yoghurtBowl: "Joghurt mit Chiasamen, Birne und Honig",
    smoothie: "Smoothie aus Banane, Spinat, Joghurt und Hafer",
    express: "Express-Variante: Mandeln und ein Apfel",
    muesli: "Müsli mit Milch und Heidelbeeren",
    peanutToast: "Vollkornbrot mit Erdnussbutter und Banane",
    avocadoToast: "Roggenmischbrot mit Avocado und Tomate",
    fromageKiwi: "Quark mit Kiwi und Leinsamen",
    croissant: "Croissant und Orangensaft (zum Vergleich)",
    cornflakes: "Cornflakes mit Milch (zum Vergleich)",
  },
  groups: {
    cereal: "Getreide oder Brot",
    fruit: "Obst oder Gemüse",
    protein: "Milchprodukt, Ei, Schinken, Nüsse oder Samen",
  },
  builder: {
    title: "Stellen Sie Ihr Frühstück zusammen",
    intro:
      "Beginnen Sie mit einer Idee oder einer leeren Schale und fügen Sie Ihre Lebensmittel mit Menge hinzu: Das Tool berechnet Ballaststoffe und Energie und prüft die drei Elemente eines ausgewogenen Frühstücks.",
    start: "Mit einer Idee beginnen",
    startNone: "Leere Schale",
    load: "Laden",
    food: "Lebensmittel",
    grams: "Menge (g)",
    add: "Hinzufügen",
    remove: "Entfernen",
    clear: "Alles löschen",
    empty: "Noch keine Lebensmittel.",
    fibre: "{fibre} g Ballaststoffe",
    kcal: "Etwa {kcal} kcal",
    protein: "{protein} g Eiweiß",
    share: "Das sind {efsa} % des Tagesreferenzwerts der EFSA ({efsaRef} g) und {national} % des Ziels von {nationalRef} g.",
    checklist: "Die drei Elemente",
    present: "vorhanden",
    missing: "fehlt",
    tips: {
      cereal: "Fügen Sie Getreide oder Brot hinzu: Haferflocken, Müsli oder Vollkornbrot liefern den Großteil der Ballaststoffe.",
      fruit: "Fügen Sie Obst oder Gemüse hinzu: Im Ganzen gegessen behält es seine Ballaststoffe, anders als Saft.",
      protein: "Fügen Sie einen Joghurt, Milch, ein Ei oder ein paar Nüsse oder Samen hinzu.",
    },
    complete: "Alle drei Elemente sind dabei.",
    noscript: "Das Tool benötigt JavaScript; die Tabelle mit den Ideen oben bleibt lesbar.",
  },
  method: {
    title: "So haben wir gerechnet",
    text: [
      "Ballaststoffe, Eiweiß und Energie jedes Lebensmittels stammen aus der Tabelle Ciqual 2025 der Anses, je 100 g, umgerechnet auf die angegebene Menge. Eiweiß wird wie auf EU-Etiketten berechnet (Stickstoff × 6,25). Die Mengen der Ideen sind unsere Schätzung einer üblichen Portion.",
      "Kaffee und Tee ohne Milch sind nicht mitgerechnet. Saft zählt nicht als Obst: Die ganze Frucht behält ihre Ballaststoffe. Die Werte sind Durchschnittswerte; Sorte und Marke lassen sie schwanken.",
      "Die Prozentangaben vergleichen das Frühstück mit Referenzwerten für den ganzen Tag: 25 g Ballaststoffe laut EFSA, 30 g bei mehreren nationalen Stellen. Einen offiziellen Referenzwert nur für das Frühstück gibt es nicht.",
      "Diese Referenzwerte gelten für Erwachsene. Für Kinder, in der Schwangerschaft oder bei einer verordneten Diät fragen Sie eine medizinische Fachperson.",
    ],
    sources: "Woher die Zahlen stammen",
  },
  colon: ": ",
};

const it: BreakfastUi = {
  ideas: {
    title: "Le nostre idee per la colazione a confronto",
    intro:
      "Undici colazioni, tra cui una versione pesata delle cinque idee qui sopra, con fibre, proteine e calorie calcolate dalla tabella ufficiale di composizione Ciqual. Dalla più ricca alla meno ricca di fibre.",
    caption:
      "Fibre, proteine ed energia secondo la tabella Ciqual 2025 dell'Anses. Caffè e tè senza latte non sono conteggiati.",
    idea: "Colazione",
    contents: "Ingredienti",
    fibre: "Fibre",
    protein: "Proteine",
    kcal: "Energia",
    groups: "Elementi presenti",
  },
  ideaNames: {
    overnightOats: "Avena con latte, lamponi e mandorle",
    wholemealToast: "Pane integrale con uovo sodo, pomodoro e olio d'oliva",
    yoghurtBowl: "Yogurt con semi di chia, pera e miele",
    smoothie: "Frullato di banana, spinaci, yogurt e avena",
    express: "Versione express: mandorle e una mela",
    muesli: "Muesli con latte e mirtilli",
    peanutToast: "Pane integrale con burro di arachidi e banana",
    avocadoToast: "Pane di segale con avocado e pomodoro",
    fromageKiwi: "Formaggio fresco con kiwi e semi di lino",
    croissant: "Croissant e succo d'arancia (per confronto)",
    cornflakes: "Fiocchi di mais con latte (per confronto)",
  },
  groups: {
    cereal: "Cereali o pane",
    fruit: "Frutta o verdura",
    protein: "Latticino, uovo, prosciutto, frutta secca o semi",
  },
  builder: {
    title: "Componi la tua colazione",
    intro:
      "Parti da un'idea o da una ciotola vuota e aggiungi i tuoi alimenti con le quantità: lo strumento calcola fibre ed energia e controlla i tre elementi di una colazione equilibrata.",
    start: "Parti da un'idea",
    startNone: "Ciotola vuota",
    load: "Carica",
    food: "Alimento",
    grams: "Quantità (g)",
    add: "Aggiungi",
    remove: "Togli",
    clear: "Cancella tutto",
    empty: "Ancora nessun alimento.",
    fibre: "{fibre} g di fibre",
    kcal: "Circa {kcal} kcal",
    protein: "{protein} g di proteine",
    share: "Cioè il {efsa}% del riferimento giornaliero dell'EFSA ({efsaRef} g) e il {national}% dell'obiettivo di {nationalRef} g.",
    checklist: "I tre elementi",
    present: "presente",
    missing: "manca",
    tips: {
      cereal: "Aggiungi cereali o pane: fiocchi d'avena, muesli o pane integrale apportano gran parte delle fibre.",
      fruit: "Aggiungi un frutto o una verdura: intero conserva le sue fibre, a differenza del succo.",
      protein: "Aggiungi uno yogurt, del latte, un uovo o un po' di frutta secca o semi.",
    },
    complete: "Ci sono tutti e tre gli elementi.",
    noscript: "Lo strumento richiede JavaScript; la tabella delle idee qui sopra resta leggibile.",
  },
  method: {
    title: "Come abbiamo calcolato",
    text: [
      "Le fibre, le proteine e l'energia di ogni alimento provengono dalla tabella Ciqual 2025 dell'Anses, per 100 g, riportate alla quantità indicata. Le proteine sono calcolate come sulle etichette europee (azoto × 6,25). Le quantità delle idee sono la nostra stima di una porzione abituale.",
      "Caffè e tè senza latte non sono conteggiati. Il succo non vale come frutta: il frutto intero conserva le sue fibre. I valori sono medie; varietà e marca li fanno variare.",
      "Le percentuali confrontano la colazione con riferimenti per l'intera giornata: 25 g di fibre secondo l'EFSA, 30 g per diverse autorità nazionali. Non esiste un riferimento ufficiale per la sola colazione.",
      "Questi riferimenti valgono per gli adulti. Per un bambino, in gravidanza o con una dieta prescritta, chiedi a un professionista sanitario.",
    ],
    sources: "Da dove vengono i dati",
  },
  colon: ": ",
};

const ptPt: BreakfastUi = {
  ideas: {
    title: "As nossas ideias de pequeno-almoço comparadas",
    intro:
      "Onze pequenos-almoços, incluindo uma versão medida das cinco ideias acima, com as fibras, as proteínas e as calorias calculadas a partir da tabela oficial de composição Ciqual. Do mais rico ao menos rico em fibras.",
    caption:
      "Fibras, proteínas e energia segundo a tabela Ciqual 2025 da Anses. O café e o chá sem leite não são contabilizados.",
    idea: "Pequeno-almoço",
    contents: "Ingredientes",
    fibre: "Fibras",
    protein: "Proteínas",
    kcal: "Energia",
    groups: "Elementos presentes",
  },
  ideaNames: {
    overnightOats: "Aveia com leite, framboesas e amêndoas",
    wholemealToast: "Torrada integral com ovo cozido, tomate e azeite",
    yoghurtBowl: "Iogurte com sementes de chia, pera e mel",
    smoothie: "Batido de banana, espinafres, iogurte e aveia",
    express: "Versão expresso: amêndoas e uma maçã",
    muesli: "Muesli com leite e mirtilos",
    peanutToast: "Torrada integral com manteiga de amendoim e banana",
    avocadoToast: "Pão de centeio com abacate e tomate",
    fromageKiwi: "Queijo fresco batido com kiwis e sementes de linhaça",
    croissant: "Croissant e sumo de laranja (para comparar)",
    cornflakes: "Flocos de milho com leite (para comparar)",
  },
  groups: {
    cereal: "Cereais ou pão",
    fruit: "Fruta ou legume",
    protein: "Laticínio, ovo, fiambre, frutos secos ou sementes",
  },
  builder: {
    title: "Componha o seu pequeno-almoço",
    intro:
      "Comece por uma ideia ou por uma taça vazia e junte os seus alimentos e as quantidades: a ferramenta calcula as fibras e a energia e verifica os três elementos de um pequeno-almoço equilibrado.",
    start: "Começar por uma ideia",
    startNone: "Taça vazia",
    load: "Carregar",
    food: "Alimento",
    grams: "Quantidade (g)",
    add: "Juntar",
    remove: "Retirar",
    clear: "Apagar tudo",
    empty: "Ainda sem alimentos.",
    fibre: "{fibre} g de fibras",
    kcal: "Cerca de {kcal} kcal",
    protein: "{protein} g de proteínas",
    share: "Ou seja, {efsa} % da referência diária da EFSA ({efsaRef} g) e {national} % do objetivo de {nationalRef} g.",
    checklist: "Os três elementos",
    present: "presente",
    missing: "em falta",
    tips: {
      cereal: "Junte cereais ou pão: flocos de aveia, muesli ou pão integral trazem a maior parte das fibras.",
      fruit: "Junte uma fruta ou um legume: inteira, conserva as fibras, ao contrário do sumo.",
      protein: "Junte um iogurte, leite, um ovo ou alguns frutos secos ou sementes.",
    },
    complete: "Os três elementos estão presentes.",
    noscript: "A ferramenta precisa de JavaScript; a tabela de ideias acima continua legível.",
  },
  method: {
    title: "Como calculámos",
    text: [
      "As fibras, as proteínas e a energia de cada alimento vêm da tabela Ciqual 2025 da Anses, por 100 g, ajustadas à quantidade indicada. As proteínas são calculadas como nos rótulos europeus (azoto × 6,25). As quantidades das ideias são a nossa estimativa de uma porção habitual.",
      "O café e o chá sem leite não são contabilizados. O sumo não conta como fruta: a fruta inteira conserva as fibras. Os valores são médias; a variedade e a marca fazem-nos variar.",
      "As percentagens comparam o pequeno-almoço com referências para o dia inteiro: 25 g de fibras segundo a EFSA e 30 g para várias autoridades nacionais. Não existe uma referência oficial só para o pequeno-almoço.",
      "Estas referências são para adultos. Para uma criança, durante a gravidez ou com uma dieta prescrita, peça conselho a um profissional de saúde.",
    ],
    sources: "De onde vêm os números",
  },
  colon: ": ",
};

const pl: BreakfastUi = {
  ideas: {
    title: "Nasze pomysły na śniadanie w porównaniu",
    intro:
      "Jedenaście śniadań, w tym odmierzone wersje pięciu powyższych pomysłów, z błonnikiem, białkiem i kaloriami obliczonymi na podstawie oficjalnej tabeli składu żywności Ciqual. Od najbogatszego w błonnik.",
    caption:
      "Błonnik, białko i energia według tabeli Ciqual 2025 agencji Anses. Nie uwzględniono kawy ani herbaty bez mleka.",
    idea: "Śniadanie",
    contents: "Skład",
    fibre: "Błonnik",
    protein: "Białko",
    kcal: "Energia",
    groups: "Obecne elementy",
  },
  ideaNames: {
    overnightOats: "Owsianka na noc z mlekiem, malinami i migdałami",
    wholemealToast: "Chleb pełnoziarnisty z jajkiem na twardo, pomidorem i oliwą",
    yoghurtBowl: "Jogurt z nasionami chia, gruszką i miodem",
    smoothie: "Koktajl z banana, szpinaku, jogurtu i owsa",
    express: "Wersja ekspresowa: migdały i jabłko",
    muesli: "Musli z mlekiem i borówkami",
    peanutToast: "Chleb pełnoziarnisty z masłem orzechowym i bananem",
    avocadoToast: "Chleb żytnio-pszenny z awokado i pomidorem",
    fromageKiwi: "Twarożek z kiwi i siemieniem lnianym",
    croissant: "Croissant i sok pomarańczowy (dla porównania)",
    cornflakes: "Płatki kukurydziane z mlekiem (dla porównania)",
  },
  groups: {
    cereal: "Zboża lub pieczywo",
    fruit: "Owoc lub warzywo",
    protein: "Nabiał, jajko, szynka, orzechy lub nasiona",
  },
  builder: {
    title: "Skomponuj swoje śniadanie",
    intro:
      "Zacznij od pomysłu lub pustej miski i dodaj produkty z ilościami: narzędzie obliczy błonnik i energię oraz sprawdzi trzy elementy zbilansowanego śniadania.",
    start: "Zacznij od pomysłu",
    startNone: "Pusta miska",
    load: "Wczytaj",
    food: "Produkt",
    grams: "Ilość (g)",
    add: "Dodaj",
    remove: "Usuń",
    clear: "Wyczyść wszystko",
    empty: "Brak produktów.",
    fibre: "{fibre} g błonnika",
    kcal: "Około {kcal} kcal",
    protein: "{protein} g białka",
    share: "To {efsa}% dziennej wartości referencyjnej EFSA ({efsaRef} g) i {national}% celu {nationalRef} g.",
    checklist: "Trzy elementy",
    present: "jest",
    missing: "brak",
    tips: {
      cereal: "Dodaj zboża lub pieczywo: płatki owsiane, musli lub chleb pełnoziarnisty dostarczają większości błonnika.",
      fruit: "Dodaj owoc lub warzywo: jedzone w całości zachowuje błonnik, w przeciwieństwie do soku.",
      protein: "Dodaj jogurt, mleko, jajko albo trochę orzechów lub nasion.",
    },
    complete: "Wszystkie trzy elementy są obecne.",
    noscript: "Narzędzie wymaga JavaScriptu; tabela pomysłów powyżej pozostaje czytelna.",
  },
  method: {
    title: "Jak liczyliśmy",
    text: [
      "Błonnik, białko i energia każdego produktu pochodzą z tabeli Ciqual 2025 agencji Anses, na 100 g, przeliczone na podaną ilość. Białko liczymy jak na etykietach w UE (azot × 6,25). Ilości w pomysłach to nasze oszacowanie zwykłej porcji.",
      "Kawa i herbata bez mleka nie są uwzględnione. Sok nie liczy się jako owoc: cały owoc zachowuje błonnik. Wartości są średnie; odmiana i marka powodują różnice.",
      "Procenty porównują śniadanie z wartościami referencyjnymi na cały dzień: 25 g błonnika według EFSA, 30 g według kilku instytucji krajowych. Nie ma oficjalnej wartości tylko dla śniadania.",
      "Te wartości dotyczą dorosłych. W przypadku dziecka, ciąży lub przepisanej diety zapytaj specjalistę ochrony zdrowia.",
    ],
    sources: "Skąd pochodzą liczby",
  },
  colon: ": ",
};

export const BREAKFAST_UI: Record<Locale, BreakfastUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Ids of the tool's h2 headings, also listed in the article's table of contents. */
export const BREAKFAST_HEADINGS = {
  ideas: "breakfast-ideas-compared",
  builder: "build-your-breakfast",
  method: "breakfast-method",
} as const;
