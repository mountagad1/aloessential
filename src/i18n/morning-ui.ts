/*
 * Text of the morning routine planner (src/data/morning.ts, shown inside the
 * morning-routine article) in every locale. Placeholders: {n}, {needed},
 * {spare}, {over}, {saved}, {time}.
 */
import type { Locale } from "./locales";
import type { Habit, StepId } from "../data/morning";

export interface MorningUi {
  /** Slug of the localized balanced-breakfast article (it holds the breakfast builder). */
  breakfastArticle: string;
  examples: {
    title: string;
    intro: string;
    caption: string;
    step: string;
    column: string;
    total: string;
  };
  steps: Record<StepId, string>;
  habits: Record<Habit, string>;
  planner: {
    title: string;
    intro: string;
    wake: string;
    leave: string;
    habitsLegend: string;
    movement: string;
    shower: string;
    noShower: string;
    breakfast: string;
    takeaway: string;
    submit: string;
    fits: string;
    over: string;
    suggestions: { movement: string; breakfast: string; takeaway: string; earlier: string };
    phone: string;
    breakfastLink: string;
    waterLink: string;
    weekly: string;
    week: string;
    ics: string;
    icsTitle: string;
    noscript: string;
  };
  method: { title: string; text: string[] };
  minutes: string;
}

const fr: MorningUi = {
  breakfastArticle: "petit-dejeuner-equilibre",
  examples: {
    title: "Trois routines du matin types",
    intro:
      "Les cinq gestes de l'article tiennent en moins d'une demi-heure. Voici comment les enchaîner selon le temps dont vous disposez entre le réveil et le départ.",
    caption: "Durées en minutes : estimations de notre équipe pour une version courte de chaque geste.",
    step: "Étape",
    column: "{n} minutes",
    total: "Total",
  },
  steps: {
    light: "Ouvrir les rideaux (lumière du jour)",
    water: "Un grand verre d'eau",
    movement: "Étirements ou courte marche",
    shower: "Douche",
    dress: "S'habiller",
    breakfast: "Petit-déjeuner près d'une fenêtre",
    leave: "Départ",
  },
  habits: {
    light: "Chercher la lumière",
    water: "Boire un grand verre d'eau",
    movement: "Bouger, même un peu",
    breakfast: "Un petit-déjeuner qui tient au corps",
    screens: "Quinze minutes sans téléphone",
  },
  planner: {
    title: "Planifiez votre routine du matin",
    intro:
      "Indiquez votre heure de réveil et de départ, choisissez vos gestes : l'outil vous donne un horaire minute par minute et un plan pour les adopter un par un.",
    wake: "Heure de réveil",
    leave: "Heure de départ",
    habitsLegend: "Les gestes à inclure",
    movement: "Temps pour bouger",
    shower: "Douche",
    noShower: "Pas de douche le matin",
    breakfast: "Petit-déjeuner",
    takeaway: "À emporter (la version express)",
    submit: "Planifier ma matinée",
    fits: "Votre routine prend {needed} min : il vous reste {spare} min de marge.",
    over: "Votre routine prend {needed} min, soit {over} min de plus que le temps dont vous disposez.",
    suggestions: {
      movement: "Bouger 5 minutes au lieu de plus : {saved} min gagnées.",
      breakfast: "Un petit-déjeuner de 10 minutes : {saved} min gagnées.",
      takeaway: "Emporter son petit-déjeuner (la version express) : {saved} min gagnées.",
      earlier: "Ou régler le réveil {over} min plus tôt, à {time}.",
    },
    phone: "Téléphone : pas avant {time}.",
    breakfastLink: "Des idées de petit-déjeuner équilibré, avec leurs fibres et protéines",
    waterLink: "Quelle quantité d'eau boire par jour",
    weekly: "Commencer petit : un nouveau geste par semaine",
    week: "Semaine {n}",
    ics: "Ajouter à mon agenda (.ics)",
    icsTitle: "Routine du matin",
    noscript: "Le planificateur a besoin de JavaScript ; les routines types restent lisibles ci-dessus.",
  },
  method: {
    title: "Comment nous avons construit ces routines",
    text: [
      "L'ordre suit l'article : la lumière et l'eau dès le réveil, puis le mouvement, la toilette et le petit-déjeuner. Le téléphone attend un quart d'heure.",
      "Les durées sont nos estimations d'une version courte de chaque geste, pas des recommandations médicales. Adaptez-les à votre rythme.",
      "Si la fatigue persiste malgré ces habitudes, parlez-en à votre médecin.",
    ],
  },
  minutes: "{n} min",
};

const en: MorningUi = {
  breakfastArticle: "healthy-breakfast-ideas",
  examples: {
    title: "Three sample morning routines",
    intro:
      "The article's five habits fit in under half an hour. Here is how to string them together, depending on the time you have between waking up and leaving.",
    caption: "Durations in minutes: our team's estimate of a short version of each habit.",
    step: "Step",
    column: "{n} minutes",
    total: "Total",
  },
  steps: {
    light: "Open the curtains (daylight)",
    water: "A big glass of water",
    movement: "Stretching or a short walk",
    shower: "Shower",
    dress: "Get dressed",
    breakfast: "Breakfast by a window",
    leave: "Leave",
  },
  habits: {
    light: "Look for daylight",
    water: "Drink a big glass of water",
    movement: "Move, even a little",
    breakfast: "A breakfast that keeps you going",
    screens: "Fifteen minutes without your phone",
  },
  planner: {
    title: "Plan your morning routine",
    intro:
      "Enter when you wake up and when you leave, pick your habits: the tool gives you a minute-by-minute schedule and a plan to adopt them one at a time.",
    wake: "Wake-up time",
    leave: "Time you leave",
    habitsLegend: "Habits to include",
    movement: "Time to move",
    shower: "Shower",
    noShower: "No shower in the morning",
    breakfast: "Breakfast",
    takeaway: "Take it with me (the express version)",
    submit: "Plan my morning",
    fits: "Your routine takes {needed} min: you have {spare} min to spare.",
    over: "Your routine takes {needed} min, {over} min more than the time you have.",
    suggestions: {
      movement: "Move for 5 minutes instead: saves {saved} min.",
      breakfast: "A 10-minute breakfast: saves {saved} min.",
      takeaway: "Take breakfast with you (the express version): saves {saved} min.",
      earlier: "Or set your alarm {over} min earlier, at {time}.",
    },
    phone: "Phone: not before {time}.",
    breakfastLink: "Healthy breakfast ideas, with their fibre and protein",
    waterLink: "How much water to drink a day",
    weekly: "Start small: one new habit a week",
    week: "Week {n}",
    ics: "Add to my calendar (.ics)",
    icsTitle: "Morning routine",
    noscript: "The planner needs JavaScript; the sample routines above stay readable.",
  },
  method: {
    title: "How we built these routines",
    text: [
      "The order follows the article: daylight and water as soon as you wake, then movement, washing and breakfast. The phone waits a quarter of an hour.",
      "Durations are our estimate of a short version of each habit, not medical advice. Adapt them to your own pace.",
      "If tiredness persists despite these habits, talk to your doctor.",
    ],
  },
  minutes: "{n} min",
};

const es: MorningUi = {
  breakfastArticle: "desayuno-equilibrado-ideas-sencillas",
  examples: {
    title: "Tres rutinas de mañana tipo",
    intro:
      "Los cinco gestos del artículo caben en menos de media hora. Así puedes encadenarlos según el tiempo que tengas entre que te levantas y sales de casa.",
    caption: "Duraciones en minutos: estimaciones de nuestro equipo para una versión corta de cada gesto.",
    step: "Paso",
    column: "{n} minutos",
    total: "Total",
  },
  steps: {
    light: "Abrir las cortinas (luz natural)",
    water: "Un buen vaso de agua",
    movement: "Estiramientos o un paseo corto",
    shower: "Ducha",
    dress: "Vestirse",
    breakfast: "Desayuno junto a una ventana",
    leave: "Salida",
  },
  habits: {
    light: "Buscar la luz",
    water: "Beber un buen vaso de agua",
    movement: "Moverse, aunque sea poco",
    breakfast: "Un desayuno que sacie",
    screens: "Quince minutos sin el móvil",
  },
  planner: {
    title: "Planifica tu rutina de mañana",
    intro:
      "Indica a qué hora te levantas y a qué hora sales, elige tus gestos: la herramienta te da un horario minuto a minuto y un plan para adoptarlos uno a uno.",
    wake: "Hora de levantarse",
    leave: "Hora de salida",
    habitsLegend: "Gestos que incluir",
    movement: "Tiempo para moverse",
    shower: "Ducha",
    noShower: "Sin ducha por la mañana",
    breakfast: "Desayuno",
    takeaway: "Para llevar (la versión exprés)",
    submit: "Planificar mi mañana",
    fits: "Tu rutina dura {needed} min: te quedan {spare} min de margen.",
    over: "Tu rutina dura {needed} min, {over} min más del tiempo que tienes.",
    suggestions: {
      movement: "Moverse 5 minutos: ahorras {saved} min.",
      breakfast: "Un desayuno de 10 minutos: ahorras {saved} min.",
      takeaway: "Llevarte el desayuno (la versión exprés): ahorras {saved} min.",
      earlier: "O poner el despertador {over} min antes, a las {time}.",
    },
    phone: "Móvil: no antes de las {time}.",
    breakfastLink: "Ideas de desayuno equilibrado, con su fibra y sus proteínas",
    waterLink: "Cuánta agua beber al día",
    weekly: "Empezar poco a poco: un gesto nuevo por semana",
    week: "Semana {n}",
    ics: "Añadir a mi calendario (.ics)",
    icsTitle: "Rutina de mañana",
    noscript: "El planificador necesita JavaScript; las rutinas tipo siguen siendo legibles más arriba.",
  },
  method: {
    title: "Cómo hemos construido estas rutinas",
    text: [
      "El orden sigue el artículo: luz y agua nada más levantarse, después movimiento, aseo y desayuno. El móvil espera un cuarto de hora.",
      "Las duraciones son nuestra estimación de una versión corta de cada gesto, no recomendaciones médicas. Adáptalas a tu ritmo.",
      "Si el cansancio persiste a pesar de estos hábitos, consulta a tu médico.",
    ],
  },
  minutes: "{n} min",
};

const de: MorningUi = {
  breakfastArticle: "ausgewogenes-fruehstueck-ideen",
  examples: {
    title: "Drei Beispiele für eine Morgenroutine",
    intro:
      "Die fünf Gewohnheiten des Artikels passen in weniger als eine halbe Stunde. So lassen sie sich aneinanderreihen, je nachdem, wie viel Zeit Sie zwischen Aufstehen und Aufbruch haben.",
    caption: "Dauer in Minuten: Schätzung unseres Teams für eine kurze Fassung jeder Gewohnheit.",
    step: "Schritt",
    column: "{n} Minuten",
    total: "Gesamt",
  },
  steps: {
    light: "Vorhänge öffnen (Tageslicht)",
    water: "Ein großes Glas Wasser",
    movement: "Dehnen oder ein kurzer Spaziergang",
    shower: "Duschen",
    dress: "Anziehen",
    breakfast: "Frühstück am Fenster",
    leave: "Aufbruch",
  },
  habits: {
    light: "Licht suchen",
    water: "Ein großes Glas Wasser trinken",
    movement: "Bewegen, wenn auch nur wenig",
    breakfast: "Ein Frühstück, das satt macht",
    screens: "Fünfzehn Minuten ohne Handy",
  },
  planner: {
    title: "Planen Sie Ihre Morgenroutine",
    intro:
      "Geben Sie an, wann Sie aufstehen und wann Sie aufbrechen, und wählen Sie Ihre Gewohnheiten: Das Tool erstellt einen minutengenauen Ablauf und einen Plan, um sie nacheinander einzuführen.",
    wake: "Aufstehzeit",
    leave: "Aufbruchszeit",
    habitsLegend: "Gewohnheiten",
    movement: "Zeit für Bewegung",
    shower: "Duschen",
    noShower: "Morgens keine Dusche",
    breakfast: "Frühstück",
    takeaway: "Zum Mitnehmen (die Express-Variante)",
    submit: "Meinen Morgen planen",
    fits: "Ihre Routine dauert {needed} Min.: Es bleiben {spare} Min. Puffer.",
    over: "Ihre Routine dauert {needed} Min., {over} Min. mehr, als Sie Zeit haben.",
    suggestions: {
      movement: "Nur 5 Minuten Bewegung: {saved} Min. gespart.",
      breakfast: "Ein 10-Minuten-Frühstück: {saved} Min. gespart.",
      takeaway: "Das Frühstück mitnehmen (die Express-Variante): {saved} Min. gespart.",
      earlier: "Oder den Wecker {over} Min. früher stellen, auf {time} Uhr.",
    },
    phone: "Handy: nicht vor {time} Uhr.",
    breakfastLink: "Ideen für ein ausgewogenes Frühstück, mit Ballaststoffen und Eiweiß",
    waterLink: "Wie viel Wasser am Tag trinken",
    weekly: "Klein anfangen: jede Woche eine neue Gewohnheit",
    week: "Woche {n}",
    ics: "Zu meinem Kalender hinzufügen (.ics)",
    icsTitle: "Morgenroutine",
    noscript: "Der Planer benötigt JavaScript; die Beispiele oben bleiben lesbar.",
  },
  method: {
    title: "So haben wir diese Routinen aufgebaut",
    text: [
      "Die Reihenfolge folgt dem Artikel: Licht und Wasser gleich nach dem Aufstehen, dann Bewegung, Körperpflege und Frühstück. Das Handy wartet eine Viertelstunde.",
      "Die Zeiten sind unsere Schätzung einer kurzen Fassung jeder Gewohnheit, keine medizinische Empfehlung. Passen Sie sie Ihrem Rhythmus an.",
      "Wenn die Müdigkeit trotz dieser Gewohnheiten anhält, sprechen Sie mit Ihrer Ärztin oder Ihrem Arzt.",
    ],
  },
  minutes: "{n} Min.",
};

const it: MorningUi = {
  breakfastArticle: "colazione-equilibrata-idee-semplici",
  examples: {
    title: "Tre esempi di routine del mattino",
    intro:
      "I cinque gesti dell'articolo stanno in meno di mezz'ora. Ecco come concatenarli in base al tempo che hai tra il risveglio e l'uscita.",
    caption: "Durate in minuti: stime della nostra redazione per una versione breve di ogni gesto.",
    step: "Fase",
    column: "{n} minuti",
    total: "Totale",
  },
  steps: {
    light: "Aprire le tende (luce del giorno)",
    water: "Un bel bicchiere d'acqua",
    movement: "Stretching o una breve camminata",
    shower: "Doccia",
    dress: "Vestirsi",
    breakfast: "Colazione vicino a una finestra",
    leave: "Uscita",
  },
  habits: {
    light: "Cercare la luce",
    water: "Bere un bel bicchiere d'acqua",
    movement: "Muoversi, anche poco",
    breakfast: "Una colazione che sazia",
    screens: "Quindici minuti senza telefono",
  },
  planner: {
    title: "Pianifica la tua routine del mattino",
    intro:
      "Indica quando ti svegli e quando esci, scegli i tuoi gesti: lo strumento ti dà un orario minuto per minuto e un piano per adottarli uno alla volta.",
    wake: "Ora del risveglio",
    leave: "Ora di uscita",
    habitsLegend: "Gesti da includere",
    movement: "Tempo per muoversi",
    shower: "Doccia",
    noShower: "Niente doccia al mattino",
    breakfast: "Colazione",
    takeaway: "Da portare via (la versione express)",
    submit: "Pianifica la mia mattina",
    fits: "La tua routine dura {needed} min: ti restano {spare} min di margine.",
    over: "La tua routine dura {needed} min, {over} min in più del tempo che hai.",
    suggestions: {
      movement: "Muoversi 5 minuti: risparmi {saved} min.",
      breakfast: "Una colazione di 10 minuti: risparmi {saved} min.",
      takeaway: "Portare via la colazione (la versione express): risparmi {saved} min.",
      earlier: "Oppure puntare la sveglia {over} min prima, alle {time}.",
    },
    phone: "Telefono: non prima delle {time}.",
    breakfastLink: "Idee per una colazione equilibrata, con fibre e proteine",
    waterLink: "Quanta acqua bere al giorno",
    weekly: "Cominciare in piccolo: un gesto nuovo a settimana",
    week: "Settimana {n}",
    ics: "Aggiungi al mio calendario (.ics)",
    icsTitle: "Routine del mattino",
    noscript: "Lo strumento richiede JavaScript; gli esempi qui sopra restano leggibili.",
  },
  method: {
    title: "Come abbiamo costruito queste routine",
    text: [
      "L'ordine segue l'articolo: luce e acqua appena svegli, poi movimento, igiene e colazione. Il telefono aspetta un quarto d'ora.",
      "Le durate sono la nostra stima di una versione breve di ogni gesto, non indicazioni mediche. Adattale al tuo ritmo.",
      "Se la stanchezza persiste nonostante queste abitudini, parlane con il tuo medico.",
    ],
  },
  minutes: "{n} min",
};

const ptPt: MorningUi = {
  breakfastArticle: "pequeno-almoco-equilibrado-ideias-simples",
  examples: {
    title: "Três rotinas da manhã tipo",
    intro:
      "Os cinco gestos do artigo cabem em menos de meia hora. Eis como encadeá-los consoante o tempo que tem entre acordar e sair de casa.",
    caption: "Durações em minutos: estimativas da nossa equipa para uma versão curta de cada gesto.",
    step: "Etapa",
    column: "{n} minutos",
    total: "Total",
  },
  steps: {
    light: "Abrir as cortinas (luz do dia)",
    water: "Um bom copo de água",
    movement: "Alongamentos ou uma caminhada curta",
    shower: "Duche",
    dress: "Vestir-se",
    breakfast: "Pequeno-almoço junto a uma janela",
    leave: "Saída",
  },
  habits: {
    light: "Procurar a luz",
    water: "Beber um bom copo de água",
    movement: "Mexer-se, nem que seja pouco",
    breakfast: "Um pequeno-almoço que sacie",
    screens: "Quinze minutos sem telemóvel",
  },
  planner: {
    title: "Planeie a sua rotina da manhã",
    intro:
      "Indique a que horas acorda e a que horas sai, escolha os seus gestos: a ferramenta dá-lhe um horário minuto a minuto e um plano para os adotar um a um.",
    wake: "Hora de acordar",
    leave: "Hora de saída",
    habitsLegend: "Gestos a incluir",
    movement: "Tempo para se mexer",
    shower: "Duche",
    noShower: "Sem duche de manhã",
    breakfast: "Pequeno-almoço",
    takeaway: "Para levar (a versão expresso)",
    submit: "Planear a minha manhã",
    fits: "A sua rotina demora {needed} min: sobram-lhe {spare} min de margem.",
    over: "A sua rotina demora {needed} min, mais {over} min do que o tempo que tem.",
    suggestions: {
      movement: "Mexer-se 5 minutos: poupa {saved} min.",
      breakfast: "Um pequeno-almoço de 10 minutos: poupa {saved} min.",
      takeaway: "Levar o pequeno-almoço (a versão expresso): poupa {saved} min.",
      earlier: "Ou pôr o despertador {over} min mais cedo, às {time}.",
    },
    phone: "Telemóvel: não antes das {time}.",
    breakfastLink: "Ideias de pequeno-almoço equilibrado, com fibras e proteínas",
    waterLink: "Quanta água beber por dia",
    weekly: "Começar devagar: um gesto novo por semana",
    week: "Semana {n}",
    ics: "Adicionar ao meu calendário (.ics)",
    icsTitle: "Rotina da manhã",
    noscript: "A ferramenta precisa de JavaScript; as rotinas tipo acima continuam legíveis.",
  },
  method: {
    title: "Como construímos estas rotinas",
    text: [
      "A ordem segue o artigo: luz e água logo ao acordar, depois movimento, higiene e pequeno-almoço. O telemóvel espera um quarto de hora.",
      "As durações são a nossa estimativa de uma versão curta de cada gesto, não recomendações médicas. Adapte-as ao seu ritmo.",
      "Se o cansaço persistir apesar destes hábitos, fale com o seu médico.",
    ],
  },
  minutes: "{n} min",
};

const pl: MorningUi = {
  breakfastArticle: "zbilansowane-sniadanie-proste-pomysly",
  examples: {
    title: "Trzy przykładowe poranne rutyny",
    intro:
      "Pięć nawyków z artykułu mieści się w mniej niż pół godziny. Oto jak je połączyć w zależności od czasu, jaki masz między pobudką a wyjściem.",
    caption: "Czas w minutach: szacunki naszego zespołu dla krótkiej wersji każdego nawyku.",
    step: "Krok",
    column: "{n} minut",
    total: "Razem",
  },
  steps: {
    light: "Odsłonić zasłony (światło dzienne)",
    water: "Duża szklanka wody",
    movement: "Rozciąganie lub krótki spacer",
    shower: "Prysznic",
    dress: "Ubranie się",
    breakfast: "Śniadanie przy oknie",
    leave: "Wyjście",
  },
  habits: {
    light: "Szukać światła",
    water: "Wypić dużą szklankę wody",
    movement: "Ruszać się, choćby trochę",
    breakfast: "Sycące śniadanie",
    screens: "Piętnaście minut bez telefonu",
  },
  planner: {
    title: "Zaplanuj swoją poranną rutynę",
    intro:
      "Podaj, o której wstajesz i o której wychodzisz, wybierz nawyki: narzędzie ułoży plan minuta po minucie i rozpisze wprowadzanie ich po kolei.",
    wake: "Godzina pobudki",
    leave: "Godzina wyjścia",
    habitsLegend: "Nawyki do uwzględnienia",
    movement: "Czas na ruch",
    shower: "Prysznic",
    noShower: "Bez prysznica rano",
    breakfast: "Śniadanie",
    takeaway: "Na wynos (wersja ekspresowa)",
    submit: "Zaplanuj mój poranek",
    fits: "Twoja rutyna trwa {needed} min: zostaje {spare} min zapasu.",
    over: "Twoja rutyna trwa {needed} min, o {over} min dłużej, niż masz czasu.",
    suggestions: {
      movement: "Ruch przez 5 minut: oszczędzasz {saved} min.",
      breakfast: "Śniadanie w 10 minut: oszczędzasz {saved} min.",
      takeaway: "Śniadanie na wynos (wersja ekspresowa): oszczędzasz {saved} min.",
      earlier: "Albo nastaw budzik {over} min wcześniej, na {time}.",
    },
    phone: "Telefon: nie przed {time}.",
    breakfastLink: "Pomysły na zbilansowane śniadanie, z błonnikiem i białkiem",
    waterLink: "Ile wody pić dziennie",
    weekly: "Zacznij od małych kroków: jeden nowy nawyk w tygodniu",
    week: "Tydzień {n}",
    ics: "Dodaj do kalendarza (.ics)",
    icsTitle: "Poranna rutyna",
    noscript: "Planer wymaga JavaScriptu; przykładowe rutyny powyżej pozostają czytelne.",
  },
  method: {
    title: "Jak zbudowaliśmy te rutyny",
    text: [
      "Kolejność odpowiada artykułowi: światło i woda zaraz po przebudzeniu, potem ruch, higiena i śniadanie. Telefon czeka kwadrans.",
      "Czasy to nasze szacunki krótkiej wersji każdego nawyku, a nie zalecenia medyczne. Dopasuj je do swojego rytmu.",
      "Jeśli zmęczenie utrzymuje się mimo tych nawyków, porozmawiaj z lekarzem.",
    ],
  },
  minutes: "{n} min",
};

export const MORNING_UI: Record<Locale, MorningUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Ids of the tool's h2 headings, also listed in the article's table of contents. */
export const MORNING_HEADINGS = {
  examples: "sample-morning-routines",
  planner: "plan-your-morning",
  method: "morning-method",
} as const;
