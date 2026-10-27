/*
 * Text of the aloe vera watering planner (src/data/watering.ts) in every
 * locale, with its localized URL. Wording follows each market's own query
 * (docs/growth/ENGINEERING_AS_MARKETING_BACKLOG.md, EAM-03): "arroser aloe
 * vera", "how to water aloe vera", "Aloe vera gießen", "jak podlewać aloes"…
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import type { Drainage, Pot, Position, Season, Size, Temperature, Warning } from "../data/watering";

export interface WateringUi {
  /** Short label for the footer's tools column. */
  navLabel: string;
  /** Page path, trailing slash. */
  path: string;
  /** Slug of the localized "growing aloe vera in a pot" article. */
  growingArticle: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  byline: string;
  form: {
    title: string;
    season: string;
    pot: string;
    drainage: string;
    size: string;
    position: string;
    temperature: string;
    submit: string;
    noscript: string;
  };
  options: {
    season: Record<Season, string>;
    pot: Record<Pot, string>;
    drainage: Record<Drainage, string>;
    size: Record<Size, string>;
    position: Record<Position, string>;
    temperature: Record<Temperature, string>;
  };
  /** "{from}" and "{to}" are replaced by day counts. */
  result: string;
  resultCheck: string;
  warnings: Record<Warning, string>;
  table: { title: string; caption: string; season: string; days: string };
  howTo: { title: string; steps: string[] };
  signs: { title: string; tooMuch: string; tooMuchList: string[]; tooLittle: string; tooLittleList: string[] };
  method: { title: string; text: string[]; factors: string; base: string; factor: string };
  sources: string;
  related: string;
  relatedLink: string;
}

const fr: WateringUi = {
  navLabel: "Planificateur d'arrosage de l'aloe vera",
  path: "/aloe-vera/arrosage/",
  growingArticle: "cultiver-aloe-vera-en-pot",
  title: "Arroser un aloe vera : le planificateur d'arrosage",
  description:
    "Quand arroser un aloe vera ? Saison, pot, emplacement : un rythme d'arrosage indicatif, le test du doigt et les signes d'excès ou de manque d'eau.",
  eyebrow: "Outil gratuit",
  h1: "Quand arroser son aloe vera ?",
  intro:
    "Un aloe vera meurt bien plus souvent d'excès d'eau que d'oubli. Indiquez la saison, le pot et l'emplacement de votre plante : le planificateur vous donne un rythme d'arrosage indicatif. La terre, elle, a toujours le dernier mot.",
  byline: "Par l'équipe Aloessential",
  form: {
    title: "Votre aloe vera",
    season: "Saison",
    pot: "Matière du pot",
    drainage: "Trou de drainage au fond du pot",
    size: "Taille du pot",
    position: "Emplacement",
    temperature: "Température de la pièce ou de l'extérieur",
    submit: "Calculer le rythme",
    noscript: "Le planificateur a besoin de JavaScript. Le tableau ci-dessous donne les mêmes repères pour un cas courant.",
  },
  options: {
    season: { spring: "Printemps", summer: "Été", autumn: "Automne", winter: "Hiver" },
    pot: { terracotta: "Terre cuite", plastic: "Plastique ou céramique émaillée" },
    drainage: { yes: "Oui", no: "Non" },
    size: { small: "Petit (moins de 12 cm)", medium: "Moyen (12 à 20 cm)", large: "Grand (plus de 20 cm)" },
    position: { window: "Près d'une fenêtre ensoleillée", room: "Pièce claire, loin de la fenêtre", outdoors: "Dehors (balcon, jardin)" },
    temperature: { cool: "Fraîche (moins de 15 °C)", mild: "Douce (15 à 24 °C)", hot: "Chaude (plus de 24 °C)" },
  },
  result: "Rythme indicatif : un arrosage tous les {from} à {to} jours.",
  resultCheck: "Commencez à vérifier la terre au bout de {from} jours, et n'arrosez que si elle est sèche.",
  warnings: {
    drainage:
      "Sans trou de drainage, l'eau stagne au fond et fait pourrir les racines. Le plus sûr est de rempoter dans un pot percé ; en attendant, arrosez très peu.",
    frost: "L'aloe vera ne supporte pas le gel. Rentrez-le avant que les nuits ne deviennent froides.",
    winterRest: "En hiver, la plante se repose : arrosez à peine, juste assez pour que les feuilles ne se rident pas.",
  },
  table: {
    title: "Les repères en un coup d'œil",
    caption: "Rythme indicatif, en jours entre deux arrosages, pour un pot moyen percé, près d'une fenêtre ensoleillée, entre 15 et 24 °C.",
    season: "Saison",
    days: "jours",
  },
  howTo: {
    title: "Comment arroser",
    steps: [
      "Faites le test du doigt : enfoncez-le dans la terre sur 3 cm environ. Si elle est encore fraîche, attendez. Un pot devenu léger est un autre bon signe.",
      "Arrosez franchement, au pied, jusqu'à ce que l'eau ressorte par le trou de drainage. Évitez de verser de l'eau au cœur de la rosette.",
      "Videz la soucoupe au bout d'un quart d'heure : la plante ne doit jamais tremper.",
      "Attendez que la terre sèche de nouveau avant l'arrosage suivant. En hiver, laissez-la sécher sur toute sa hauteur.",
    ],
  },
  signs: {
    title: "Trop ou pas assez d'eau ?",
    tooMuch: "Trop d'eau",
    tooMuchList: [
      "feuilles molles, translucides ou brunes à la base ;",
      "terre encore humide plusieurs jours après l'arrosage ;",
      "odeur de moisi, plante qui penche ou se détache.",
    ],
    tooLittle: "Pas assez d'eau",
    tooLittleList: [
      "feuilles plus fines, plissées ou qui s'incurvent ;",
      "pointes sèches et brunes ;",
      "les feuilles se regonflent quelques jours après un arrosage.",
    ],
  },
  method: {
    title: "Notre méthode",
    text: [
      "Les sources horticoles s'accordent sur trois règles : n'arroser que lorsque la terre est sèche, arroser à fond puis laisser s'égoutter, et presque plus en hiver. Elles ne donnent pas de calendrier, car tout dépend du pot et de la pièce.",
      "Nous partons donc d'un rythme de base pour chaque saison, puis nous l'ajustons selon ce qui fait sécher la terre plus ou moins vite. Ces nombres sont une estimation de notre équipe, pas une mesure : ils vous disent quand commencer à vérifier la terre.",
    ],
    factors: "Coefficient appliqué (au-dessus de 1, la terre reste humide plus longtemps)",
    base: "Rythme de base",
    factor: "Coefficient",
  },
  sources: "Sources",
  related: "Pour aller plus loin",
  relatedLink: "Lumière, terre, rempotage : notre guide pour cultiver l'aloe vera en pot",
};

const en: WateringUi = {
  navLabel: "Aloe vera watering planner",
  path: "/en/aloe-vera-watering-planner/",
  growingArticle: "how-to-grow-aloe-vera-in-a-pot",
  title: "How to water aloe vera: a watering planner",
  description:
    "How often should you water aloe vera? Season, pot and spot give an indicative rhythm, plus the finger test and the signs of too much or too little water.",
  eyebrow: "Free tool",
  h1: "How often should you water aloe vera?",
  intro:
    "Aloe vera is far more often killed by too much water than by neglect. Tell the planner the season, the pot and where your plant lives, and it gives you an indicative watering rhythm. The soil always has the last word.",
  byline: "By the Aloessential team",
  form: {
    title: "Your aloe vera",
    season: "Season",
    pot: "Pot material",
    drainage: "Drainage hole in the bottom of the pot",
    size: "Pot size",
    position: "Where it lives",
    temperature: "Room or outdoor temperature",
    submit: "Work out the rhythm",
    noscript: "The planner needs JavaScript. The table below gives the same guide for a typical case.",
  },
  options: {
    season: { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" },
    pot: { terracotta: "Terracotta", plastic: "Plastic or glazed ceramic" },
    drainage: { yes: "Yes", no: "No" },
    size: { small: "Small (under 12 cm)", medium: "Medium (12 to 20 cm)", large: "Large (over 20 cm)" },
    position: { window: "By a sunny window", room: "Bright room, away from the window", outdoors: "Outdoors (balcony, garden)" },
    temperature: { cool: "Cool (under 15 °C)", mild: "Mild (15 to 24 °C)", hot: "Hot (over 24 °C)" },
  },
  result: "Indicative rhythm: water every {from} to {to} days.",
  resultCheck: "Start checking the soil after {from} days, and only water if it is dry.",
  warnings: {
    drainage:
      "Without a drainage hole, water collects at the bottom and rots the roots. The safest fix is to repot into a pot with a hole; until then, water very little.",
    frost: "Aloe vera cannot cope with frost. Bring it indoors before the nights turn cold.",
    winterRest: "In winter the plant rests: water hardly at all, just enough to stop the leaves wrinkling.",
  },
  table: {
    title: "The guide at a glance",
    caption: "Indicative rhythm, in days between waterings, for a medium pot with a drainage hole, by a sunny window, at 15 to 24 °C.",
    season: "Season",
    days: "days",
  },
  howTo: {
    title: "How to water",
    steps: [
      "Do the finger test: push a finger about 3 cm into the soil. If it still feels damp, wait. A pot that feels light is another good sign.",
      "Water thoroughly, at the base, until water runs out of the drainage hole. Avoid pouring water into the centre of the rosette.",
      "Empty the saucer after a quarter of an hour: the plant should never stand in water.",
      "Wait for the soil to dry out again before the next watering. In winter, let it dry all the way down.",
    ],
  },
  signs: {
    title: "Too much or too little water?",
    tooMuch: "Too much water",
    tooMuchList: [
      "soft, translucent leaves, or leaves turning brown at the base;",
      "soil still damp several days after watering;",
      "a musty smell, or a plant that leans or comes loose.",
    ],
    tooLittle: "Too little water",
    tooLittleList: [
      "thinner, wrinkled or curling leaves;",
      "dry, brown tips;",
      "leaves that plump up again a few days after watering.",
    ],
  },
  method: {
    title: "Our method",
    text: [
      "Horticultural sources agree on three rules: water only when the soil is dry, water thoroughly and let it drain, and hardly water at all in winter. They give no calendar, because everything depends on the pot and the room.",
      "So we start from a base rhythm for each season, then adjust it for what makes the soil dry faster or slower. These numbers are our team's estimate, not a measurement: they tell you when to start checking the soil.",
    ],
    factors: "Factor applied (above 1, the soil stays damp for longer)",
    base: "Base rhythm",
    factor: "Factor",
  },
  sources: "Sources",
  related: "Read next",
  relatedLink: "Light, soil, repotting: our guide to growing aloe vera in a pot",
};

const es: WateringUi = {
  navLabel: "Planificador de riego del aloe vera",
  path: "/es/riego-aloe-vera/",
  growingArticle: "cultivar-aloe-vera-en-maceta",
  title: "Cómo regar el aloe vera: el planificador de riego",
  description:
    "¿Cada cuánto regar el aloe vera? Estación, maceta y lugar: un ritmo de riego orientativo, la prueba del dedo y las señales de exceso o falta de agua.",
  eyebrow: "Herramienta gratuita",
  h1: "¿Cada cuánto regar el aloe vera?",
  intro:
    "Un aloe vera muere mucho más a menudo por exceso de agua que por olvido. Indica la estación, la maceta y el lugar de tu planta: el planificador te da un ritmo de riego orientativo. La tierra siempre tiene la última palabra.",
  byline: "Por el equipo de Aloessential",
  form: {
    title: "Tu aloe vera",
    season: "Estación",
    pot: "Material de la maceta",
    drainage: "Agujero de drenaje en el fondo",
    size: "Tamaño de la maceta",
    position: "Ubicación",
    temperature: "Temperatura de la habitación o del exterior",
    submit: "Calcular el ritmo",
    noscript: "El planificador necesita JavaScript. La tabla de abajo da las mismas referencias para un caso habitual.",
  },
  options: {
    season: { spring: "Primavera", summer: "Verano", autumn: "Otoño", winter: "Invierno" },
    pot: { terracotta: "Barro cocido", plastic: "Plástico o cerámica esmaltada" },
    drainage: { yes: "Sí", no: "No" },
    size: { small: "Pequeña (menos de 12 cm)", medium: "Mediana (12 a 20 cm)", large: "Grande (más de 20 cm)" },
    position: { window: "Junto a una ventana soleada", room: "Habitación luminosa, lejos de la ventana", outdoors: "Fuera (balcón, jardín)" },
    temperature: { cool: "Fresca (menos de 15 °C)", mild: "Templada (15 a 24 °C)", hot: "Cálida (más de 24 °C)" },
  },
  result: "Ritmo orientativo: un riego cada {from} a {to} días.",
  resultCheck: "Empieza a comprobar la tierra a los {from} días y riega solo si está seca.",
  warnings: {
    drainage:
      "Sin agujero de drenaje, el agua se estanca en el fondo y pudre las raíces. Lo más seguro es trasplantar a una maceta con agujero; mientras tanto, riega muy poco.",
    frost: "El aloe vera no soporta las heladas. Mételo en casa antes de que las noches se vuelvan frías.",
    winterRest: "En invierno la planta descansa: riega apenas, lo justo para que las hojas no se arruguen.",
  },
  table: {
    title: "Las referencias de un vistazo",
    caption: "Ritmo orientativo, en días entre riegos, para una maceta mediana con agujero, junto a una ventana soleada, entre 15 y 24 °C.",
    season: "Estación",
    days: "días",
  },
  howTo: {
    title: "Cómo regar",
    steps: [
      "Haz la prueba del dedo: húndelo unos 3 cm en la tierra. Si aún está fresca, espera. Una maceta que pesa poco es otra buena señal.",
      "Riega a fondo, al pie, hasta que el agua salga por el agujero de drenaje. Evita echar agua en el centro de la roseta.",
      "Vacía el plato al cabo de un cuarto de hora: la planta nunca debe quedarse en agua.",
      "Espera a que la tierra se seque de nuevo antes del siguiente riego. En invierno, déjala secar del todo.",
    ],
  },
  signs: {
    title: "¿Demasiada o poca agua?",
    tooMuch: "Demasiada agua",
    tooMuchList: [
      "hojas blandas, translúcidas o marrones en la base;",
      "tierra todavía húmeda varios días después del riego;",
      "olor a humedad, planta que se inclina o se suelta.",
    ],
    tooLittle: "Poca agua",
    tooLittleList: [
      "hojas más finas, arrugadas o que se curvan;",
      "puntas secas y marrones;",
      "las hojas se vuelven a hinchar unos días después de regar.",
    ],
  },
  method: {
    title: "Nuestro método",
    text: [
      "Las fuentes de horticultura coinciden en tres reglas: regar solo cuando la tierra está seca, regar a fondo y dejar escurrir, y casi nada en invierno. No dan un calendario, porque todo depende de la maceta y de la habitación.",
      "Por eso partimos de un ritmo base para cada estación y lo ajustamos según lo que hace que la tierra se seque más o menos rápido. Estas cifras son una estimación de nuestro equipo, no una medición: te dicen cuándo empezar a comprobar la tierra.",
    ],
    factors: "Coeficiente aplicado (por encima de 1, la tierra se mantiene húmeda más tiempo)",
    base: "Ritmo base",
    factor: "Coeficiente",
  },
  sources: "Fuentes",
  related: "Para saber más",
  relatedLink: "Luz, tierra, trasplante: nuestra guía para cultivar aloe vera en maceta",
};

const de: WateringUi = {
  navLabel: "Gießplaner für Aloe vera",
  path: "/de/aloe-vera-giessen/",
  growingArticle: "aloe-vera-im-topf-pflegen",
  title: "Aloe vera gießen: der Gießplaner",
  description:
    "Wie oft Aloe vera gießen? Jahreszeit, Topf und Standort ergeben einen ungefähren Gießrhythmus, dazu Fingerprobe und Anzeichen für zu viel oder zu wenig Wasser.",
  eyebrow: "Kostenloses Tool",
  h1: "Wie oft muss man Aloe vera gießen?",
  intro:
    "Eine Aloe vera geht viel häufiger an zu viel Wasser zugrunde als an Vergesslichkeit. Geben Sie Jahreszeit, Topf und Standort Ihrer Pflanze an: Der Planer nennt Ihnen einen ungefähren Gießrhythmus. Das letzte Wort hat aber immer die Erde.",
  byline: "Vom Aloessential-Team",
  form: {
    title: "Ihre Aloe vera",
    season: "Jahreszeit",
    pot: "Material des Topfes",
    drainage: "Abzugsloch im Topfboden",
    size: "Topfgröße",
    position: "Standort",
    temperature: "Raum- oder Außentemperatur",
    submit: "Rhythmus berechnen",
    noscript: "Der Planer braucht JavaScript. Die Tabelle unten nennt dieselben Richtwerte für einen typischen Fall.",
  },
  options: {
    season: { spring: "Frühling", summer: "Sommer", autumn: "Herbst", winter: "Winter" },
    pot: { terracotta: "Terrakotta (Ton)", plastic: "Kunststoff oder glasierte Keramik" },
    drainage: { yes: "Ja", no: "Nein" },
    size: { small: "Klein (unter 12 cm)", medium: "Mittel (12 bis 20 cm)", large: "Groß (über 20 cm)" },
    position: { window: "An einem sonnigen Fenster", room: "Heller Raum, weg vom Fenster", outdoors: "Draußen (Balkon, Garten)" },
    temperature: { cool: "Kühl (unter 15 °C)", mild: "Mild (15 bis 24 °C)", hot: "Warm (über 24 °C)" },
  },
  result: "Ungefährer Rhythmus: alle {from} bis {to} Tage gießen.",
  resultCheck: "Prüfen Sie die Erde ab dem {from}. Tag und gießen Sie nur, wenn sie trocken ist.",
  warnings: {
    drainage:
      "Ohne Abzugsloch staut sich das Wasser am Boden und die Wurzeln faulen. Am sichersten ist das Umtopfen in einen Topf mit Loch; bis dahin nur sehr wenig gießen.",
    frost: "Aloe vera verträgt keinen Frost. Holen Sie sie ins Haus, bevor die Nächte kalt werden.",
    winterRest: "Im Winter ruht die Pflanze: kaum gießen, nur so viel, dass die Blätter nicht schrumpeln.",
  },
  table: {
    title: "Die Richtwerte auf einen Blick",
    caption: "Ungefährer Rhythmus in Tagen zwischen zwei Wassergaben, für einen mittelgroßen Topf mit Abzugsloch, an einem sonnigen Fenster, bei 15 bis 24 °C.",
    season: "Jahreszeit",
    days: "Tage",
  },
  howTo: {
    title: "Richtig gießen",
    steps: [
      "Machen Sie die Fingerprobe: Stecken Sie einen Finger etwa 3 cm tief in die Erde. Ist sie noch feucht, warten Sie. Ein leicht gewordener Topf ist ein weiteres gutes Zeichen.",
      "Gießen Sie durchdringend am Fuß der Pflanze, bis Wasser aus dem Abzugsloch läuft. Gießen Sie nicht in die Mitte der Rosette.",
      "Leeren Sie den Untersetzer nach einer Viertelstunde: Die Pflanze darf nie im Wasser stehen.",
      "Warten Sie, bis die Erde wieder abgetrocknet ist. Im Winter lassen Sie sie ganz durchtrocknen.",
    ],
  },
  signs: {
    title: "Zu viel oder zu wenig Wasser?",
    tooMuch: "Zu viel Wasser",
    tooMuchList: [
      "weiche, glasige oder am Ansatz braune Blätter;",
      "Erde noch Tage nach dem Gießen feucht;",
      "modriger Geruch, die Pflanze kippt oder sitzt locker.",
    ],
    tooLittle: "Zu wenig Wasser",
    tooLittleList: [
      "dünnere, schrumpelige oder sich einrollende Blätter;",
      "trockene, braune Spitzen;",
      "die Blätter werden einige Tage nach dem Gießen wieder prall.",
    ],
  },
  method: {
    title: "Unsere Methode",
    text: [
      "Gartenbauquellen sind sich bei drei Regeln einig: nur gießen, wenn die Erde trocken ist, dann durchdringend gießen und abtropfen lassen, und im Winter kaum noch. Einen Kalender nennen sie nicht, denn alles hängt von Topf und Raum ab.",
      "Wir gehen deshalb von einem Grundrhythmus je Jahreszeit aus und passen ihn an das an, was die Erde schneller oder langsamer trocknen lässt. Diese Zahlen sind eine Schätzung unseres Teams, keine Messung: Sie sagen Ihnen, wann Sie die Erde prüfen sollten.",
    ],
    factors: "Angewandter Faktor (über 1 bleibt die Erde länger feucht)",
    base: "Grundrhythmus",
    factor: "Faktor",
  },
  sources: "Quellen",
  related: "Weiterlesen",
  relatedLink: "Licht, Erde, Umtopfen: unser Ratgeber zur Aloe vera im Topf",
};

const it: WateringUi = {
  navLabel: "Calendario delle annaffiature dell'aloe vera",
  path: "/it/annaffiare-aloe-vera/",
  growingArticle: "coltivare-aloe-vera-in-vaso",
  title: "Come annaffiare l'aloe vera: il calendario delle annaffiature",
  description:
    "Ogni quanto annaffiare l'aloe vera? Stagione, vaso e posizione: un ritmo indicativo, la prova del dito e i segnali di troppa o troppo poca acqua.",
  eyebrow: "Strumento gratuito",
  h1: "Ogni quanto annaffiare l'aloe vera?",
  intro:
    "Un'aloe vera muore molto più spesso per troppa acqua che per dimenticanza. Indica la stagione, il vaso e la posizione della pianta: lo strumento suggerisce un ritmo di annaffiatura indicativo. L'ultima parola spetta sempre al terriccio.",
  byline: "A cura della redazione di Aloessential",
  form: {
    title: "La tua aloe vera",
    season: "Stagione",
    pot: "Materiale del vaso",
    drainage: "Foro di drenaggio sul fondo",
    size: "Dimensione del vaso",
    position: "Posizione",
    temperature: "Temperatura della stanza o esterna",
    submit: "Calcola il ritmo",
    noscript: "Lo strumento richiede JavaScript. La tabella qui sotto riporta gli stessi riferimenti per un caso tipico.",
  },
  options: {
    season: { spring: "Primavera", summer: "Estate", autumn: "Autunno", winter: "Inverno" },
    pot: { terracotta: "Terracotta", plastic: "Plastica o ceramica smaltata" },
    drainage: { yes: "Sì", no: "No" },
    size: { small: "Piccolo (meno di 12 cm)", medium: "Medio (da 12 a 20 cm)", large: "Grande (oltre 20 cm)" },
    position: { window: "Vicino a una finestra soleggiata", room: "Stanza luminosa, lontano dalla finestra", outdoors: "All'aperto (balcone, giardino)" },
    temperature: { cool: "Fresca (meno di 15 °C)", mild: "Mite (da 15 a 24 °C)", hot: "Calda (oltre 24 °C)" },
  },
  result: "Ritmo indicativo: un'annaffiatura ogni {from}-{to} giorni.",
  resultCheck: "Comincia a controllare il terriccio dopo {from} giorni e annaffia solo se è asciutto.",
  warnings: {
    drainage:
      "Senza foro di drenaggio l'acqua ristagna sul fondo e fa marcire le radici. La soluzione più sicura è rinvasare in un vaso forato; nel frattempo, annaffia pochissimo.",
    frost: "L'aloe vera non sopporta il gelo. Portala in casa prima che le notti diventino fredde.",
    winterRest: "In inverno la pianta riposa: annaffia appena, quel tanto che basta perché le foglie non si raggrinziscano.",
  },
  table: {
    title: "I riferimenti in breve",
    caption: "Ritmo indicativo, in giorni tra due annaffiature, per un vaso medio forato, vicino a una finestra soleggiata, tra 15 e 24 °C.",
    season: "Stagione",
    days: "giorni",
  },
  howTo: {
    title: "Come annaffiare",
    steps: [
      "Fai la prova del dito: infilalo nel terriccio per circa 3 cm. Se è ancora umido, aspetta. Un vaso diventato leggero è un altro buon segnale.",
      "Annaffia abbondantemente, alla base, finché l'acqua non esce dal foro di drenaggio. Evita di versare acqua al centro della rosetta.",
      "Svuota il sottovaso dopo un quarto d'ora: la pianta non deve mai restare nell'acqua.",
      "Aspetta che il terriccio si asciughi di nuovo prima dell'annaffiatura successiva. In inverno, lascialo asciugare del tutto.",
    ],
  },
  signs: {
    title: "Troppa o troppo poca acqua?",
    tooMuch: "Troppa acqua",
    tooMuchList: [
      "foglie molli, traslucide o marroni alla base;",
      "terriccio ancora umido diversi giorni dopo l'annaffiatura;",
      "odore di muffa, pianta che si piega o si stacca.",
    ],
    tooLittle: "Troppo poca acqua",
    tooLittleList: [
      "foglie più sottili, raggrinzite o che si incurvano;",
      "punte secche e marroni;",
      "le foglie tornano turgide qualche giorno dopo l'annaffiatura.",
    ],
  },
  method: {
    title: "Il nostro metodo",
    text: [
      "Le fonti di orticoltura concordano su tre regole: annaffiare solo quando il terriccio è asciutto, annaffiare a fondo e lasciar sgocciolare, quasi niente in inverno. Non danno un calendario, perché tutto dipende dal vaso e dall'ambiente.",
      "Partiamo quindi da un ritmo di base per ogni stagione e lo correggiamo in base a ciò che fa asciugare il terriccio più o meno in fretta. Questi numeri sono una stima della nostra redazione, non una misura: indicano quando cominciare a controllare il terriccio.",
    ],
    factors: "Coefficiente applicato (sopra 1, il terriccio resta umido più a lungo)",
    base: "Ritmo di base",
    factor: "Coefficiente",
  },
  sources: "Fonti",
  related: "Per approfondire",
  relatedLink: "Luce, terriccio, rinvaso: la nostra guida per coltivare l'aloe vera in vaso",
};

const ptPt: WateringUi = {
  navLabel: "Planeador de rega do aloe vera",
  path: "/pt-pt/rega-aloe-vera/",
  growingArticle: "cultivar-aloe-vera-em-vaso",
  title: "Como regar o aloe vera: o planeador de rega",
  description:
    "De quanto em quanto tempo regar o aloe vera? Estação, vaso e local: um ritmo de rega indicativo, o teste do dedo e os sinais de água a mais ou a menos.",
  eyebrow: "Ferramenta gratuita",
  h1: "De quanto em quanto tempo regar o aloe vera?",
  intro:
    "Um aloe vera morre muito mais vezes por excesso de água do que por esquecimento. Indica a estação, o vaso e o local da tua planta: o planeador dá-te um ritmo de rega indicativo. A terra tem sempre a última palavra.",
  byline: "Pela equipa Aloessential",
  form: {
    title: "O teu aloe vera",
    season: "Estação",
    pot: "Material do vaso",
    drainage: "Furo de drenagem no fundo",
    size: "Tamanho do vaso",
    position: "Local",
    temperature: "Temperatura da divisão ou do exterior",
    submit: "Calcular o ritmo",
    noscript: "O planeador precisa de JavaScript. A tabela abaixo dá as mesmas referências para um caso comum.",
  },
  options: {
    season: { spring: "Primavera", summer: "Verão", autumn: "Outono", winter: "Inverno" },
    pot: { terracotta: "Barro", plastic: "Plástico ou cerâmica vidrada" },
    drainage: { yes: "Sim", no: "Não" },
    size: { small: "Pequeno (menos de 12 cm)", medium: "Médio (12 a 20 cm)", large: "Grande (mais de 20 cm)" },
    position: { window: "Junto a uma janela soalheira", room: "Divisão clara, longe da janela", outdoors: "No exterior (varanda, jardim)" },
    temperature: { cool: "Fresca (menos de 15 °C)", mild: "Amena (15 a 24 °C)", hot: "Quente (mais de 24 °C)" },
  },
  result: "Ritmo indicativo: uma rega a cada {from} a {to} dias.",
  resultCheck: "Começa a verificar a terra ao fim de {from} dias e rega só se estiver seca.",
  warnings: {
    drainage:
      "Sem furo de drenagem, a água fica parada no fundo e apodrece as raízes. O mais seguro é mudar para um vaso com furo; até lá, rega muito pouco.",
    frost: "O aloe vera não suporta geada. Leva-o para dentro antes de as noites ficarem frias.",
    winterRest: "No inverno, a planta descansa: rega muito pouco, só o suficiente para as folhas não enrugarem.",
  },
  table: {
    title: "As referências num relance",
    caption: "Ritmo indicativo, em dias entre regas, para um vaso médio com furo, junto a uma janela soalheira, entre 15 e 24 °C.",
    season: "Estação",
    days: "dias",
  },
  howTo: {
    title: "Como regar",
    steps: [
      "Faz o teste do dedo: enterra-o cerca de 3 cm na terra. Se ainda estiver fresca, espera. Um vaso que ficou leve é outro bom sinal.",
      "Rega bem, junto à base, até a água sair pelo furo de drenagem. Evita deitar água no centro da roseta.",
      "Esvazia o prato ao fim de um quarto de hora: a planta nunca deve ficar dentro de água.",
      "Espera que a terra seque outra vez antes da rega seguinte. No inverno, deixa-a secar por completo.",
    ],
  },
  signs: {
    title: "Água a mais ou a menos?",
    tooMuch: "Água a mais",
    tooMuchList: [
      "folhas moles, translúcidas ou castanhas na base;",
      "terra ainda húmida vários dias depois da rega;",
      "cheiro a mofo, planta que se inclina ou se solta.",
    ],
    tooLittle: "Água a menos",
    tooLittleList: [
      "folhas mais finas, enrugadas ou que se curvam;",
      "pontas secas e castanhas;",
      "as folhas voltam a encher-se alguns dias depois da rega.",
    ],
  },
  method: {
    title: "O nosso método",
    text: [
      "As fontes de horticultura concordam em três regras: regar só quando a terra está seca, regar bem e deixar escorrer, e quase nada no inverno. Não dão um calendário, porque tudo depende do vaso e da divisão.",
      "Por isso partimos de um ritmo base para cada estação e ajustamo-lo conforme o que faz a terra secar mais ou menos depressa. Estes números são uma estimativa da nossa equipa, não uma medição: dizem-te quando começar a verificar a terra.",
    ],
    factors: "Coeficiente aplicado (acima de 1, a terra fica húmida durante mais tempo)",
    base: "Ritmo base",
    factor: "Coeficiente",
  },
  sources: "Fontes",
  related: "Para saber mais",
  relatedLink: "Luz, terra, mudança de vaso: o nosso guia para cultivar aloe vera em vaso",
};

const pl: WateringUi = {
  navLabel: "Planer podlewania aloesu",
  path: "/pl/podlewanie-aloesu/",
  growingArticle: "uprawa-aloesu-w-doniczce",
  title: "Jak podlewać aloes: planer podlewania",
  description:
    "Jak często podlewać aloes? Pora roku, doniczka i miejsce: orientacyjny rytm podlewania, test palca oraz objawy nadmiaru lub niedoboru wody.",
  eyebrow: "Bezpłatne narzędzie",
  h1: "Jak często podlewać aloes?",
  intro:
    "Aloes znacznie częściej ginie od nadmiaru wody niż od zapomnienia. Podaj porę roku, rodzaj doniczki i miejsce, w którym stoi roślina: planer zaproponuje orientacyjny rytm podlewania. Ostatnie słowo zawsze należy jednak do ziemi.",
  byline: "Zespół Aloessential",
  form: {
    title: "Twój aloes",
    season: "Pora roku",
    pot: "Materiał doniczki",
    drainage: "Otwór odpływowy w dnie",
    size: "Wielkość doniczki",
    position: "Miejsce",
    temperature: "Temperatura w pomieszczeniu lub na zewnątrz",
    submit: "Oblicz rytm",
    noscript: "Planer wymaga JavaScriptu. Tabela poniżej podaje te same wskazówki dla typowej sytuacji.",
  },
  options: {
    season: { spring: "Wiosna", summer: "Lato", autumn: "Jesień", winter: "Zima" },
    pot: { terracotta: "Terakota (glina)", plastic: "Plastik lub szkliwiona ceramika" },
    drainage: { yes: "Tak", no: "Nie" },
    size: { small: "Mała (poniżej 12 cm)", medium: "Średnia (12–20 cm)", large: "Duża (powyżej 20 cm)" },
    position: { window: "Przy słonecznym oknie", room: "Jasny pokój, z dala od okna", outdoors: "Na zewnątrz (balkon, ogród)" },
    temperature: { cool: "Chłodno (poniżej 15 °C)", mild: "Umiarkowanie (15–24 °C)", hot: "Ciepło (powyżej 24 °C)" },
  },
  result: "Orientacyjny rytm: podlewanie co {from}–{to} dni.",
  resultCheck: "Zacznij sprawdzać ziemię po {from} dniach i podlewaj tylko wtedy, gdy jest sucha.",
  warnings: {
    drainage:
      "Bez otworu odpływowego woda zbiera się na dnie i korzenie gniją. Najbezpieczniej przesadzić roślinę do doniczki z otworem; do tego czasu podlewaj bardzo oszczędnie.",
    frost: "Aloes nie znosi mrozu. Przenieś go do domu, zanim noce zrobią się zimne.",
    winterRest: "Zimą roślina odpoczywa: podlewaj minimalnie, tylko tyle, by liście się nie marszczyły.",
  },
  table: {
    title: "Wskazówki w skrócie",
    caption: "Orientacyjny rytm w dniach między podlewaniami, dla średniej doniczki z otworem, przy słonecznym oknie, w temperaturze 15–24 °C.",
    season: "Pora roku",
    days: "dni",
  },
  howTo: {
    title: "Jak podlewać",
    steps: [
      "Zrób test palca: włóż go w ziemię na około 3 cm. Jeśli jest jeszcze wilgotna, poczekaj. Lekka doniczka to kolejny dobry znak.",
      "Podlej obficie, przy podstawie, aż woda wypłynie otworem odpływowym. Nie wlewaj wody do środka rozety.",
      "Po kwadransie wylej wodę z podstawki: roślina nigdy nie powinna stać w wodzie.",
      "Przed kolejnym podlaniem poczekaj, aż ziemia znowu przeschnie. Zimą pozwól jej wyschnąć całkowicie.",
    ],
  },
  signs: {
    title: "Za dużo czy za mało wody?",
    tooMuch: "Za dużo wody",
    tooMuchList: [
      "miękkie, przezroczyste lub brązowiejące u nasady liście;",
      "ziemia wilgotna jeszcze kilka dni po podlaniu;",
      "zapach stęchlizny, roślina przechyla się lub chwieje.",
    ],
    tooLittle: "Za mało wody",
    tooLittleList: [
      "cieńsze, pomarszczone lub zwijające się liście;",
      "suche, brązowe końcówki;",
      "liście znów stają się jędrne kilka dni po podlaniu.",
    ],
  },
  method: {
    title: "Nasza metoda",
    text: [
      "Źródła ogrodnicze zgadzają się co do trzech zasad: podlewać tylko wtedy, gdy ziemia jest sucha, podlewać obficie i pozwolić wodzie odcieknąć, a zimą prawie wcale. Nie podają kalendarza, bo wszystko zależy od doniczki i pomieszczenia.",
      "Dlatego wychodzimy od rytmu bazowego dla każdej pory roku i korygujemy go o to, co sprawia, że ziemia schnie szybciej lub wolniej. Te liczby to szacunek naszego zespołu, a nie pomiar: mówią, kiedy zacząć sprawdzać ziemię.",
    ],
    factors: "Zastosowany współczynnik (powyżej 1 ziemia dłużej pozostaje wilgotna)",
    base: "Rytm bazowy",
    factor: "Współczynnik",
  },
  sources: "Źródła",
  related: "Czytaj dalej",
  relatedLink: "Światło, ziemia, przesadzanie: nasz poradnik uprawy aloesu w doniczce",
};

export const WATERING_UI: Record<Locale, WateringUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Language versions of the planner: French plus every published locale (hreflang and sitemap). */
export function wateringAlternates(translatedLocales: Locale[]): { locale: Locale; hreflang: string; path: string }[] {
  return [DEFAULT_LOCALE, ...translatedLocales].map((locale) => ({
    locale,
    hreflang: LOCALES[locale].htmlLang,
    path: WATERING_UI[locale].path,
  }));
}
