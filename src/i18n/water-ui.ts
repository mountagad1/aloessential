/*
 * Text of the "how much water per day" calculator (src/data/water.ts) in
 * every locale, with its localized URL. Wording follows each market's own
 * query (docs/growth/ENGINEERING_AS_MARKETING_BACKLOG.md, EAM-02).
 * Placeholders: {total}, {min}, {max}, {glasses}.
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import type { Profile, Situation } from "../data/water";

export interface WaterUi {
  path: string;
  /** Slug of the localized water-rich foods article. */
  hydrationArticle: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  byline: string;
  form: { title: string; profile: string; situations: string; submit: string; noscript: string };
  profiles: Record<Profile, string>;
  situations: Record<Situation, string>;
  result: { total: string; drinks: string; glassesRange: string; notes: Record<Situation, string> };
  unit: string;
  table: { title: string; caption: string; profile: string; total: string; drinks: string; glasses: string };
  counts: { title: string; items: string[] };
  enough: { title: string; items: string[] };
  doctor: { title: string; items: string[] };
  method: { title: string; text: string[] };
  sources: string;
  related: string;
  relatedLink: string;
  /** Water-rich foods table. Placeholders: {min} (grams of water per 100 g), {n}. */
  foods: {
    title: string;
    intro: string;
    caption: string;
    food: string;
    per100g: string;
    portion: string;
    perPortion: string;
    licence: string;
  };
}

const fr: WaterUi = {
  path: "/combien-d-eau-par-jour/",
  hydrationArticle: "hydratation-aliments-riches-en-eau",
  title: "Combien d'eau boire par jour ? Le calculateur",
  description:
    "Combien de litres d'eau par jour ? Les repères de l'EFSA selon l'âge, la grossesse ou l'allaitement, la part des boissons et des aliments, et quand consulter.",
  eyebrow: "Outil gratuit",
  h1: "Combien d'eau boire par jour ?",
  intro:
    "On entend souvent « 1,5 litre » ou « 2 litres ». Les repères européens sont plus précis : ils dépendent de l'âge et du sexe, et comptent aussi l'eau apportée par les aliments. Choisissez votre profil pour voir ce qu'ils disent.",
  byline: "Par l'équipe Aloessential",
  form: {
    title: "Votre profil",
    profile: "Je suis",
    situations: "En ce moment (facultatif)",
    submit: "Voir mes repères",
    noscript: "Le calculateur a besoin de JavaScript. Le tableau ci-dessous donne les mêmes repères pour chaque profil.",
  },
  profiles: {
    woman: "Une femme (à partir de 14 ans)",
    man: "Un homme (à partir de 14 ans)",
    pregnant: "Enceinte",
    breastfeeding: "Une femme qui allaite",
    girl9: "Une fille de 9 à 13 ans",
    boy9: "Un garçon de 9 à 13 ans",
    child4: "Un enfant de 4 à 8 ans",
    child2: "Un enfant de 2 à 3 ans",
  },
  situations: { heat: "Il fait chaud", activity: "Je fais un effort prolongé (sport, travail physique)", illness: "J'ai de la fièvre, des vomissements ou de la diarrhée" },
  result: {
    total: "Repère : {total} L d'eau par jour, boissons et aliments compris.",
    drinks: "Dont boissons : environ {min} à {max} L, soit {glasses} verres de 25 cl.",
    glassesRange: "{min} à {max}",
    notes: {
      heat: "Il fait chaud : vos besoins augmentent. L'EFSA ne donne pas de chiffre pour ce cas ; buvez davantage et surveillez la couleur de vos urines.",
      activity: "Effort prolongé : buvez avant, pendant et après, d'autant plus que vous transpirez.",
      illness:
        "Fièvre, vomissements ou diarrhée : les pertes d'eau augmentent. Buvez souvent par petites quantités, et demandez un avis médical si cela dure, surtout pour un enfant ou une personne âgée.",
    },
  },
  unit: "L",
  table: {
    title: "Les repères pour chaque profil",
    caption: "Apports adéquats d'eau totale de l'EFSA, à température et activité physique modérées. Part des boissons calculée en supposant que 20 à 30 % de l'eau vient des aliments.",
    profile: "Profil",
    total: "Eau totale par jour",
    drinks: "Dont boissons",
    glasses: "Verres de 25 cl",
  },
  counts: {
    title: "Ce qui compte comme eau",
    items: [
      "L'eau, bien sûr, mais aussi le lait, le thé, le café et les autres boissons : toutes participent à l'hydratation.",
      "L'eau contenue dans les aliments : fruits, légumes, soupes, laitages. Elle fournit en moyenne 20 à 30 % de l'eau de la journée.",
      "Au quotidien, l'eau reste le meilleur choix : elle n'apporte ni sucre ni calories.",
    ],
  },
  enough: {
    title: "Comment savoir si l'on boit assez",
    items: [
      "Des urines jaune pâle au fil de la journée sont un bon signe ; plus foncées, il est temps de boire.",
      "Buvez régulièrement, sans attendre d'avoir très soif.",
      "Avec l'âge, la sensation de soif diminue : boire à heures fixes aide les personnes âgées.",
      "On a besoin de plus d'eau quand il fait chaud, pendant un effort prolongé, en cas de maladie, de grossesse ou d'allaitement.",
    ],
  },
  doctor: {
    title: "Quand demander un avis médical",
    items: [
      "Si un médecin vous a demandé de limiter les boissons, par exemple en cas de maladie des reins, du cœur ou du foie : suivez son avis plutôt que ces repères.",
      "Pour un bébé : demandez conseil à votre pédiatre.",
      "En cas de vomissements, de diarrhée ou de fièvre qui durent, surtout chez un enfant ou une personne âgée.",
      "Si vous avez une soif intense et inhabituelle qui persiste.",
    ],
  },
  method: {
    title: "D'où viennent ces chiffres",
    text: [
      "Les repères sont les apports adéquats d'eau totale fixés par l'Autorité européenne de sécurité des aliments (EFSA) en 2010. Ils comprennent l'eau des boissons et celle des aliments, et valent pour une température et une activité physique modérées.",
      "Faute de données, l'EFSA a supposé que les aliments apportent 20 à 30 % de l'eau totale ; une analyse d'enquêtes françaises et britanniques a confirmé cet ordre de grandeur. Nous en déduisons la part des boissons (70 à 80 %), arrondie à 0,1 L, et le nombre de verres de 25 cl.",
      "Ce sont des repères pour des personnes en bonne santé, pas une prescription : les besoins varient d'une personne et d'un jour à l'autre.",
    ],
  },
  sources: "Sources",
  related: "Pour aller plus loin",
  relatedLink: "Hydratation : les aliments riches en eau",
  foods: {
    title: "Les aliments les plus riches en eau",
    intro:
      "Fruits, légumes, soupes et laitages apportent une bonne part de l'eau de la journée. Voici les {n} aliments de notre sélection qui contiennent au moins {min} g d'eau pour 100 g, d'après la table Ciqual de l'Anses. Un gramme d'eau correspond à peu près à un millilitre.",
    caption: "Teneur en eau d'après la table Ciqual 2025 de l'Anses. Portion habituelle : estimation de notre équipe.",
    food: "Aliment",
    per100g: "Eau pour 100 g",
    portion: "Portion",
    perPortion: "Eau par portion",
    licence: "Données : Anses, table Ciqual 2025, sous Licence Ouverte 2.0. Sélection, noms traduits, portions et calculs : Aloessential.",
  },
};

const en: WaterUi = {
  path: "/en/how-much-water-per-day/",
  hydrationArticle: "hydration-water-rich-foods",
  title: "How much water should you drink a day? Calculator",
  description:
    "How much water a day? EFSA reference values by age, pregnancy or breastfeeding, how much comes from drinks and from food, and when to ask a doctor.",
  eyebrow: "Free tool",
  h1: "How much water should you drink a day?",
  intro:
    "You often hear \"8 glasses\" or \"2 litres\". The European reference values are more precise: they depend on age and sex, and they also count the water in food. Choose your profile to see what they say.",
  byline: "By the Aloessential team",
  form: {
    title: "Your profile",
    profile: "I am",
    situations: "Right now (optional)",
    submit: "Show my reference values",
    noscript: "The calculator needs JavaScript. The table below gives the same values for every profile.",
  },
  profiles: {
    woman: "A woman (14 and over)",
    man: "A man (14 and over)",
    pregnant: "Pregnant",
    breastfeeding: "Breastfeeding",
    girl9: "A girl aged 9 to 13",
    boy9: "A boy aged 9 to 13",
    child4: "A child aged 4 to 8",
    child2: "A child aged 2 to 3",
  },
  situations: { heat: "It is hot", activity: "I am doing prolonged exercise or physical work", illness: "I have a fever, vomiting or diarrhoea" },
  result: {
    total: "Reference value: {total} L of water a day, from drinks and food.",
    drinks: "From drinks: about {min} to {max} L, or {glasses} glasses of 250 ml.",
    glassesRange: "{min} to {max}",
    notes: {
      heat: "It is hot: you need more. EFSA gives no figure for this; drink more and keep an eye on the colour of your pee.",
      activity: "Prolonged exercise: drink before, during and after, all the more if you sweat.",
      illness:
        "Fever, vomiting or diarrhoea: you lose more water. Drink little and often, and get medical advice if it lasts, especially for a child or an older person.",
    },
  },
  unit: "L",
  table: {
    title: "Reference values for every profile",
    caption: "EFSA adequate intakes of total water, at moderate temperature and physical activity. Share from drinks calculated assuming food supplies 20 to 30% of water.",
    profile: "Profile",
    total: "Total water a day",
    drinks: "From drinks",
    glasses: "250 ml glasses",
  },
  counts: {
    title: "What counts as water",
    items: [
      "Water, of course, but also milk, tea, coffee and other drinks: they all count towards your fluid intake.",
      "The water in food: fruit, vegetables, soups, dairy. On average it supplies 20 to 30% of the day's water.",
      "Day to day, water is still the best choice: it has no sugar and no calories.",
    ],
  },
  enough: {
    title: "How to tell if you are drinking enough",
    items: [
      "Pale yellow pee through the day is a good sign; darker means it is time to drink.",
      "Drink regularly, without waiting until you are very thirsty.",
      "Thirst fades with age: drinking at set times helps older people.",
      "You need more when it is hot, during prolonged exercise, when you are ill, pregnant or breastfeeding.",
    ],
  },
  doctor: {
    title: "When to get medical advice",
    items: [
      "If a doctor has told you to limit fluids, for example because of kidney, heart or liver disease: follow their advice rather than these values.",
      "For a baby: ask your GP or health visitor.",
      "If vomiting, diarrhoea or fever lasts, especially in a child or an older person.",
      "If you have an intense, unusual thirst that does not go away.",
    ],
  },
  method: {
    title: "Where these figures come from",
    text: [
      "The values are the adequate intakes of total water set by the European Food Safety Authority (EFSA) in 2010. They include water from drinks and from food, and apply at moderate temperature and moderate physical activity.",
      "For lack of data, EFSA assumed that food supplies 20 to 30% of total water; an analysis of French and UK surveys confirmed that order of magnitude. From this we work out the share from drinks (70 to 80%), rounded to 0.1 L, and the number of 250 ml glasses.",
      "These are reference values for healthy people, not a prescription: needs vary from person to person and from day to day.",
    ],
  },
  sources: "Sources",
  related: "Read next",
  relatedLink: "Hydration: water-rich foods",
  foods: {
    title: "The foods richest in water",
    intro:
      "Fruit, vegetables, soups and dairy provide a good share of the day's water. Here are the {n} foods in our selection that contain at least {min} g of water per 100 g, from the Anses Ciqual table. One gram of water is about one millilitre.",
    caption: "Water content from the Anses Ciqual 2025 table. Usual portion: our team's estimate.",
    food: "Food",
    per100g: "Water per 100 g",
    portion: "Portion",
    perPortion: "Water per portion",
    licence: "Data: Anses, Ciqual 2025 table, under the Open Licence 2.0 (Etalab). Selection, translated names, portions and calculations: Aloessential.",
  },
};

const es: WaterUi = {
  path: "/es/cuanta-agua-beber-al-dia/",
  hydrationArticle: "alimentos-ricos-en-agua",
  title: "¿Cuánta agua beber al día? La calculadora",
  description:
    "¿Cuánta agua beber al día? Las referencias de la EFSA según la edad, el embarazo o la lactancia, qué parte viene de bebidas y alimentos, y cuándo consultar.",
  eyebrow: "Herramienta gratuita",
  h1: "¿Cuánta agua hay que beber al día?",
  intro:
    "Se oye a menudo «2 litros» u «8 vasos». Las referencias europeas son más precisas: dependen de la edad y el sexo, y cuentan también el agua de los alimentos. Elige tu perfil para ver lo que dicen.",
  byline: "Por el equipo de Aloessential",
  form: {
    title: "Tu perfil",
    profile: "Soy",
    situations: "En este momento (opcional)",
    submit: "Ver mis referencias",
    noscript: "La calculadora necesita JavaScript. La tabla de abajo da las mismas referencias para cada perfil.",
  },
  profiles: {
    woman: "Una mujer (a partir de 14 años)",
    man: "Un hombre (a partir de 14 años)",
    pregnant: "Embarazada",
    breastfeeding: "Una mujer que da el pecho",
    girl9: "Una niña de 9 a 13 años",
    boy9: "Un niño de 9 a 13 años",
    child4: "Un niño o niña de 4 a 8 años",
    child2: "Un niño o niña de 2 a 3 años",
  },
  situations: { heat: "Hace calor", activity: "Hago un esfuerzo prolongado (deporte, trabajo físico)", illness: "Tengo fiebre, vómitos o diarrea" },
  result: {
    total: "Referencia: {total} L de agua al día, entre bebidas y alimentos.",
    drinks: "De bebidas: unos {min} a {max} L, es decir, {glasses} vasos de 250 ml.",
    glassesRange: "{min} a {max}",
    notes: {
      heat: "Hace calor: tus necesidades aumentan. La EFSA no da una cifra para este caso; bebe más y fíjate en el color de la orina.",
      activity: "Esfuerzo prolongado: bebe antes, durante y después, tanto más cuanto más sudes.",
      illness:
        "Fiebre, vómitos o diarrea: se pierde más agua. Bebe a menudo y en pequeñas cantidades, y consulta al médico si dura, sobre todo en un niño o una persona mayor.",
    },
  },
  unit: "L",
  table: {
    title: "Las referencias para cada perfil",
    caption: "Ingestas adecuadas de agua total de la EFSA, con temperatura y actividad física moderadas. Parte de bebidas calculada suponiendo que los alimentos aportan del 20 al 30 % del agua.",
    profile: "Perfil",
    total: "Agua total al día",
    drinks: "De bebidas",
    glasses: "Vasos de 250 ml",
  },
  counts: {
    title: "Qué cuenta como agua",
    items: [
      "El agua, claro, pero también la leche, el té, el café y las demás bebidas: todas contribuyen a la hidratación.",
      "El agua de los alimentos: frutas, verduras, sopas, lácteos. De media aporta del 20 al 30 % del agua del día.",
      "En el día a día, el agua sigue siendo la mejor opción: no aporta azúcar ni calorías.",
    ],
  },
  enough: {
    title: "Cómo saber si bebes suficiente",
    items: [
      "Una orina de color amarillo pálido a lo largo del día es buena señal; si es más oscura, toca beber.",
      "Bebe con regularidad, sin esperar a tener mucha sed.",
      "Con la edad, la sensación de sed disminuye: beber a horas fijas ayuda a las personas mayores.",
      "Se necesita más agua cuando hace calor, durante un esfuerzo prolongado, en caso de enfermedad, embarazo o lactancia.",
    ],
  },
  doctor: {
    title: "Cuándo pedir consejo médico",
    items: [
      "Si un médico te ha pedido que limites los líquidos, por ejemplo por una enfermedad de los riñones, del corazón o del hígado: sigue su consejo y no estas referencias.",
      "Para un bebé: pregunta a tu pediatra.",
      "Si los vómitos, la diarrea o la fiebre duran, sobre todo en un niño o una persona mayor.",
      "Si tienes una sed intensa e inusual que no se pasa.",
    ],
  },
  method: {
    title: "De dónde salen estas cifras",
    text: [
      "Las referencias son las ingestas adecuadas de agua total fijadas por la Autoridad Europea de Seguridad Alimentaria (EFSA) en 2010. Incluyen el agua de las bebidas y la de los alimentos, y valen para una temperatura y una actividad física moderadas.",
      "A falta de datos, la EFSA supuso que los alimentos aportan del 20 al 30 % del agua total; un análisis de encuestas francesas y británicas confirmó ese orden de magnitud. De ahí deducimos la parte de las bebidas (del 70 al 80 %), redondeada a 0,1 L, y el número de vasos de 250 ml.",
      "Son referencias para personas sanas, no una prescripción: las necesidades varían de una persona a otra y de un día a otro.",
    ],
  },
  sources: "Fuentes",
  related: "Para saber más",
  relatedLink: "Alimentos ricos en agua para hidratarse",
  foods: {
    title: "Los alimentos más ricos en agua",
    intro:
      "Frutas, verduras, sopas y lácteos aportan buena parte del agua del día. Estos son los {n} alimentos de nuestra selección que contienen al menos {min} g de agua por 100 g, según la tabla Ciqual de la Anses. Un gramo de agua equivale aproximadamente a un mililitro.",
    caption: "Contenido de agua según la tabla Ciqual 2025 de la Anses. Ración habitual: estimación de nuestro equipo.",
    food: "Alimento",
    per100g: "Agua por 100 g",
    portion: "Ración",
    perPortion: "Agua por ración",
    licence: "Datos: Anses, tabla Ciqual 2025, con Licencia Abierta 2.0 (Etalab). Selección, nombres traducidos, raciones y cálculos: Aloessential.",
  },
};

const de: WaterUi = {
  path: "/de/wie-viel-wasser-am-tag/",
  hydrationArticle: "wasserreiche-lebensmittel",
  title: "Wie viel Wasser am Tag trinken? Der Rechner",
  description:
    "Wie viel Wasser am Tag? EFSA-Richtwerte nach Alter, Schwangerschaft oder Stillzeit, der Anteil aus Getränken und Essen und wann ärztlicher Rat nötig ist.",
  eyebrow: "Kostenloses Tool",
  h1: "Wie viel Wasser sollte man am Tag trinken?",
  intro:
    "Oft heißt es „1,5 Liter“ oder „2 Liter“. Die europäischen Referenzwerte sind genauer: Sie hängen von Alter und Geschlecht ab und zählen auch das Wasser aus Lebensmitteln mit. Wählen Sie Ihr Profil, um zu sehen, was sie sagen.",
  byline: "Vom Aloessential-Team",
  form: {
    title: "Ihr Profil",
    profile: "Ich bin",
    situations: "Gerade (optional)",
    submit: "Meine Richtwerte anzeigen",
    noscript: "Der Rechner braucht JavaScript. Die Tabelle unten nennt dieselben Werte für jedes Profil.",
  },
  profiles: {
    woman: "Eine Frau (ab 14 Jahren)",
    man: "Ein Mann (ab 14 Jahren)",
    pregnant: "Schwanger",
    breastfeeding: "Eine stillende Frau",
    girl9: "Ein Mädchen von 9 bis 13 Jahren",
    boy9: "Ein Junge von 9 bis 13 Jahren",
    child4: "Ein Kind von 4 bis 8 Jahren",
    child2: "Ein Kind von 2 bis 3 Jahren",
  },
  situations: { heat: "Es ist heiß", activity: "Ich bin länger körperlich aktiv (Sport, körperliche Arbeit)", illness: "Ich habe Fieber, Erbrechen oder Durchfall" },
  result: {
    total: "Richtwert: {total} l Wasser am Tag, aus Getränken und Lebensmitteln.",
    drinks: "Davon aus Getränken: etwa {min} bis {max} l, also {glasses} Gläser à 250 ml.",
    glassesRange: "{min} bis {max}",
    notes: {
      heat: "Es ist heiß: Ihr Bedarf steigt. Die EFSA nennt dafür keine Zahl; trinken Sie mehr und achten Sie auf die Farbe des Urins.",
      activity: "Längere Anstrengung: vorher, währenddessen und danach trinken, umso mehr, je stärker Sie schwitzen.",
      illness:
        "Fieber, Erbrechen oder Durchfall: Sie verlieren mehr Wasser. Trinken Sie oft kleine Mengen und holen Sie ärztlichen Rat ein, wenn es anhält, besonders bei Kindern und älteren Menschen.",
    },
  },
  unit: "l",
  table: {
    title: "Die Richtwerte für jedes Profil",
    caption: "Angemessene Zufuhr an Gesamtwasser nach EFSA, bei mäßiger Temperatur und körperlicher Aktivität. Anteil aus Getränken unter der Annahme berechnet, dass Lebensmittel 20 bis 30 % des Wassers liefern.",
    profile: "Profil",
    total: "Gesamtwasser pro Tag",
    drinks: "Davon Getränke",
    glasses: "Gläser à 250 ml",
  },
  counts: {
    title: "Was als Wasser zählt",
    items: [
      "Wasser natürlich, aber auch Milch, Tee, Kaffee und andere Getränke: Sie alle tragen zur Flüssigkeitszufuhr bei.",
      "Das Wasser in Lebensmitteln: Obst, Gemüse, Suppen, Milchprodukte. Es liefert im Schnitt 20 bis 30 % des täglichen Wassers.",
      "Im Alltag bleibt Wasser die beste Wahl: Es enthält weder Zucker noch Kalorien.",
    ],
  },
  enough: {
    title: "Woran man merkt, ob man genug trinkt",
    items: [
      "Hellgelber Urin über den Tag ist ein gutes Zeichen; dunklerer Urin heißt: Zeit zu trinken.",
      "Trinken Sie regelmäßig, ohne erst großen Durst abzuwarten.",
      "Mit dem Alter lässt das Durstgefühl nach: Feste Trinkzeiten helfen älteren Menschen.",
      "Mehr Wasser braucht man bei Hitze, bei längerer Anstrengung, bei Krankheit, in der Schwangerschaft und Stillzeit.",
    ],
  },
  doctor: {
    title: "Wann Sie ärztlichen Rat brauchen",
    items: [
      "Wenn Ihre Ärztin oder Ihr Arzt Ihnen geraten hat, weniger zu trinken, etwa bei Nieren-, Herz- oder Lebererkrankungen: Folgen Sie diesem Rat statt dieser Richtwerte.",
      "Bei Babys: Fragen Sie Ihre Kinderärztin oder Ihren Kinderarzt.",
      "Wenn Erbrechen, Durchfall oder Fieber anhalten, besonders bei Kindern und älteren Menschen.",
      "Bei starkem, ungewohntem Durst, der nicht vergeht.",
    ],
  },
  method: {
    title: "Woher diese Zahlen stammen",
    text: [
      "Die Richtwerte sind die angemessenen Zufuhrmengen an Gesamtwasser, die die Europäische Behörde für Lebensmittelsicherheit (EFSA) 2010 festgelegt hat. Sie umfassen Wasser aus Getränken und aus Lebensmitteln und gelten bei mäßiger Temperatur und mäßiger körperlicher Aktivität.",
      "Mangels Daten nahm die EFSA an, dass Lebensmittel 20 bis 30 % des Gesamtwassers liefern; eine Auswertung französischer und britischer Erhebungen bestätigte diese Größenordnung. Daraus leiten wir den Anteil aus Getränken ab (70 bis 80 %), gerundet auf 0,1 l, und die Zahl der Gläser à 250 ml.",
      "Es sind Richtwerte für gesunde Menschen, keine Verordnung: Der Bedarf schwankt von Mensch zu Mensch und von Tag zu Tag.",
    ],
  },
  sources: "Quellen",
  related: "Weiterlesen",
  relatedLink: "Wasserreiche Lebensmittel für die Flüssigkeitszufuhr",
  foods: {
    title: "Die wasserreichsten Lebensmittel",
    intro:
      "Obst, Gemüse, Suppen und Milchprodukte liefern einen guten Teil des täglichen Wassers. Hier sind die {n} Lebensmittel unserer Auswahl, die laut Ciqual-Tabelle der Anses mindestens {min} g Wasser pro 100 g enthalten. Ein Gramm Wasser entspricht etwa einem Milliliter.",
    caption: "Wassergehalt laut Ciqual-Tabelle 2025 der Anses. Übliche Portion: Schätzung unseres Teams.",
    food: "Lebensmittel",
    per100g: "Wasser pro 100 g",
    portion: "Portion",
    perPortion: "Wasser pro Portion",
    licence: "Daten: Anses, Ciqual-Tabelle 2025, unter der Licence Ouverte 2.0 (Etalab). Auswahl, übersetzte Namen, Portionen und Berechnungen: Aloessential.",
  },
};

const it: WaterUi = {
  path: "/it/quanta-acqua-bere-al-giorno/",
  hydrationArticle: "idratazione-alimenti-ricchi-di-acqua",
  title: "Quanta acqua bere al giorno? Il calcolatore",
  description:
    "Quanta acqua bere al giorno? I valori di riferimento EFSA per età, gravidanza o allattamento, quanta viene da bevande e alimenti e quando sentire il medico.",
  eyebrow: "Strumento gratuito",
  h1: "Quanta acqua bere al giorno?",
  intro:
    "Si sente spesso «2 litri» o «8 bicchieri». I valori di riferimento europei sono più precisi: dipendono da età e sesso e contano anche l'acqua contenuta negli alimenti. Scegli il tuo profilo per vedere cosa dicono.",
  byline: "A cura della redazione di Aloessential",
  form: {
    title: "Il tuo profilo",
    profile: "Sono",
    situations: "In questo momento (facoltativo)",
    submit: "Mostra i miei valori",
    noscript: "Il calcolatore richiede JavaScript. La tabella qui sotto riporta gli stessi valori per ogni profilo.",
  },
  profiles: {
    woman: "Una donna (dai 14 anni)",
    man: "Un uomo (dai 14 anni)",
    pregnant: "In gravidanza",
    breastfeeding: "Una donna che allatta",
    girl9: "Una ragazza dai 9 ai 13 anni",
    boy9: "Un ragazzo dai 9 ai 13 anni",
    child4: "Un bambino o una bambina dai 4 agli 8 anni",
    child2: "Un bambino o una bambina dai 2 ai 3 anni",
  },
  situations: { heat: "Fa caldo", activity: "Faccio uno sforzo prolungato (sport, lavoro fisico)", illness: "Ho febbre, vomito o diarrea" },
  result: {
    total: "Riferimento: {total} L di acqua al giorno, tra bevande e alimenti.",
    drinks: "Dalle bevande: circa {min}-{max} L, cioè {glasses} bicchieri da 250 ml.",
    glassesRange: "{min}-{max}",
    notes: {
      heat: "Fa caldo: il fabbisogno aumenta. L'EFSA non indica una cifra per questo caso; bevi di più e osserva il colore delle urine.",
      activity: "Sforzo prolungato: bevi prima, durante e dopo, tanto più quanto più sudi.",
      illness:
        "Febbre, vomito o diarrea: si perde più acqua. Bevi spesso e a piccoli sorsi, e chiedi un parere medico se dura, soprattutto per un bambino o una persona anziana.",
    },
  },
  unit: "L",
  table: {
    title: "I valori per ogni profilo",
    caption: "Assunzioni adeguate di acqua totale secondo l'EFSA, a temperatura e attività fisica moderate. Quota dalle bevande calcolata supponendo che gli alimenti forniscano dal 20 al 30% dell'acqua.",
    profile: "Profilo",
    total: "Acqua totale al giorno",
    drinks: "Dalle bevande",
    glasses: "Bicchieri da 250 ml",
  },
  counts: {
    title: "Cosa conta come acqua",
    items: [
      "L'acqua, certo, ma anche latte, tè, caffè e le altre bevande: tutte contribuiscono all'idratazione.",
      "L'acqua contenuta negli alimenti: frutta, verdura, minestre, latticini. In media fornisce dal 20 al 30% dell'acqua della giornata.",
      "Nella vita di tutti i giorni l'acqua resta la scelta migliore: non contiene zuccheri né calorie.",
    ],
  },
  enough: {
    title: "Come capire se si beve abbastanza",
    items: [
      "Urine giallo chiaro durante la giornata sono un buon segno; se sono più scure, è ora di bere.",
      "Bevi con regolarità, senza aspettare di avere molta sete.",
      "Con l'età lo stimolo della sete diminuisce: bere a orari fissi aiuta le persone anziane.",
      "Serve più acqua quando fa caldo, durante uno sforzo prolungato, in caso di malattia, gravidanza o allattamento.",
    ],
  },
  doctor: {
    title: "Quando chiedere un parere medico",
    items: [
      "Se il medico ti ha chiesto di limitare i liquidi, per esempio per una malattia dei reni, del cuore o del fegato: segui il suo consiglio e non questi valori.",
      "Per un neonato: chiedi al pediatra.",
      "Se vomito, diarrea o febbre durano, soprattutto in un bambino o in una persona anziana.",
      "Se hai una sete intensa e insolita che non passa.",
    ],
  },
  method: {
    title: "Da dove vengono questi numeri",
    text: [
      "I valori sono le assunzioni adeguate di acqua totale fissate dall'Autorità europea per la sicurezza alimentare (EFSA) nel 2010. Comprendono l'acqua delle bevande e quella degli alimenti e valgono per temperatura e attività fisica moderate.",
      "In mancanza di dati, l'EFSA ha ipotizzato che gli alimenti forniscano dal 20 al 30% dell'acqua totale; un'analisi di indagini francesi e britanniche ha confermato questo ordine di grandezza. Ne ricaviamo la quota delle bevande (dal 70 all'80%), arrotondata a 0,1 L, e il numero di bicchieri da 250 ml.",
      "Sono riferimenti per persone in buona salute, non una prescrizione: il fabbisogno varia da persona a persona e da un giorno all'altro.",
    ],
  },
  sources: "Fonti",
  related: "Per approfondire",
  relatedLink: "Idratazione: gli alimenti ricchi di acqua",
  foods: {
    title: "Gli alimenti più ricchi di acqua",
    intro:
      "Frutta, verdura, minestre e latticini forniscono buona parte dell'acqua della giornata. Ecco i {n} alimenti della nostra selezione che contengono almeno {min} g di acqua per 100 g, secondo la tabella Ciqual dell'Anses. Un grammo d'acqua corrisponde all'incirca a un millilitro.",
    caption: "Contenuto d'acqua secondo la tabella Ciqual 2025 dell'Anses. Porzione abituale: stima della nostra redazione.",
    food: "Alimento",
    per100g: "Acqua per 100 g",
    portion: "Porzione",
    perPortion: "Acqua per porzione",
    licence: "Dati: Anses, tabella Ciqual 2025, con Licence Ouverte 2.0 (Etalab). Selezione, nomi tradotti, porzioni e calcoli: Aloessential.",
  },
};

const ptPt: WaterUi = {
  path: "/pt-pt/quanta-agua-beber-por-dia/",
  hydrationArticle: "alimentos-ricos-em-agua",
  title: "Quanta água beber por dia? A calculadora",
  description:
    "Quanta água beber por dia? Os valores de referência da EFSA por idade, gravidez ou amamentação, quanto vem das bebidas e dos alimentos e quando ir ao médico.",
  eyebrow: "Ferramenta gratuita",
  h1: "Quanta água se deve beber por dia?",
  intro:
    "Ouve-se muitas vezes «1,5 litros» ou «2 litros». Os valores de referência europeus são mais precisos: dependem da idade e do sexo, e contam também a água dos alimentos. Escolhe o teu perfil para veres o que dizem.",
  byline: "Pela equipa Aloessential",
  form: {
    title: "O teu perfil",
    profile: "Sou",
    situations: "Neste momento (opcional)",
    submit: "Ver os meus valores",
    noscript: "A calculadora precisa de JavaScript. A tabela abaixo dá os mesmos valores para cada perfil.",
  },
  profiles: {
    woman: "Uma mulher (a partir dos 14 anos)",
    man: "Um homem (a partir dos 14 anos)",
    pregnant: "Grávida",
    breastfeeding: "Uma mulher a amamentar",
    girl9: "Uma rapariga dos 9 aos 13 anos",
    boy9: "Um rapaz dos 9 aos 13 anos",
    child4: "Uma criança dos 4 aos 8 anos",
    child2: "Uma criança dos 2 aos 3 anos",
  },
  situations: { heat: "Está calor", activity: "Estou a fazer um esforço prolongado (desporto, trabalho físico)", illness: "Tenho febre, vómitos ou diarreia" },
  result: {
    total: "Referência: {total} L de água por dia, entre bebidas e alimentos.",
    drinks: "Das bebidas: cerca de {min} a {max} L, ou seja, {glasses} copos de 250 ml.",
    glassesRange: "{min} a {max}",
    notes: {
      heat: "Está calor: as tuas necessidades aumentam. A EFSA não dá um número para este caso; bebe mais e repara na cor da urina.",
      activity: "Esforço prolongado: bebe antes, durante e depois, tanto mais quanto mais transpirares.",
      illness:
        "Febre, vómitos ou diarreia: perde-se mais água. Bebe muitas vezes e em pequenas quantidades, e procura aconselhamento médico se durar, sobretudo numa criança ou numa pessoa idosa.",
    },
  },
  unit: "L",
  table: {
    title: "Os valores para cada perfil",
    caption: "Ingestões adequadas de água total da EFSA, com temperatura e atividade física moderadas. Parte das bebidas calculada supondo que os alimentos fornecem 20 a 30 % da água.",
    profile: "Perfil",
    total: "Água total por dia",
    drinks: "Das bebidas",
    glasses: "Copos de 250 ml",
  },
  counts: {
    title: "O que conta como água",
    items: [
      "A água, claro, mas também o leite, o chá, o café e as outras bebidas: todas contribuem para a hidratação.",
      "A água dos alimentos: fruta, legumes, sopas, laticínios. Em média, fornece 20 a 30 % da água do dia.",
      "No dia a dia, a água continua a ser a melhor escolha: não tem açúcar nem calorias.",
    ],
  },
  enough: {
    title: "Como saber se bebes o suficiente",
    items: [
      "Urina amarelo-clara ao longo do dia é bom sinal; se estiver mais escura, está na hora de beber.",
      "Bebe com regularidade, sem esperar por ter muita sede.",
      "Com a idade, a sensação de sede diminui: beber a horas certas ajuda as pessoas idosas.",
      "Precisa-se de mais água quando está calor, durante um esforço prolongado, em caso de doença, gravidez ou amamentação.",
    ],
  },
  doctor: {
    title: "Quando pedir conselho médico",
    items: [
      "Se um médico te pediu para limitar os líquidos, por exemplo por doença dos rins, do coração ou do fígado: segue o conselho dele e não estes valores.",
      "Para um bebé: pergunta ao pediatra.",
      "Se os vómitos, a diarreia ou a febre durarem, sobretudo numa criança ou numa pessoa idosa.",
      "Se tiveres uma sede intensa e invulgar que não passa.",
    ],
  },
  method: {
    title: "De onde vêm estes números",
    text: [
      "Os valores são as ingestões adequadas de água total fixadas pela Autoridade Europeia para a Segurança dos Alimentos (EFSA) em 2010. Incluem a água das bebidas e a dos alimentos, e valem para uma temperatura e uma atividade física moderadas.",
      "Por falta de dados, a EFSA assumiu que os alimentos fornecem 20 a 30 % da água total; uma análise de inquéritos franceses e britânicos confirmou essa ordem de grandeza. Daí deduzimos a parte das bebidas (70 a 80 %), arredondada a 0,1 L, e o número de copos de 250 ml.",
      "São referências para pessoas saudáveis, não uma prescrição: as necessidades variam de pessoa para pessoa e de dia para dia.",
    ],
  },
  sources: "Fontes",
  related: "Para saber mais",
  relatedLink: "Alimentos ricos em água para te hidratares",
  foods: {
    title: "Os alimentos mais ricos em água",
    intro:
      "Fruta, legumes, sopas e laticínios dão uma boa parte da água do dia. Estes são os {n} alimentos da nossa seleção que têm pelo menos {min} g de água por 100 g, segundo a tabela Ciqual da Anses. Um grama de água corresponde a cerca de um mililitro.",
    caption: "Teor de água segundo a tabela Ciqual 2025 da Anses. Porção habitual: estimativa da nossa equipa.",
    food: "Alimento",
    per100g: "Água por 100 g",
    portion: "Porção",
    perPortion: "Água por porção",
    licence: "Dados: Anses, tabela Ciqual 2025, com a Licence Ouverte 2.0 (Etalab). Seleção, nomes traduzidos, porções e cálculos: Aloessential.",
  },
};

const pl: WaterUi = {
  path: "/pl/ile-wody-dziennie/",
  hydrationArticle: "produkty-bogate-w-wode",
  title: "Ile wody dziennie pić? Kalkulator",
  description:
    "Ile wody dziennie pić? Wartości referencyjne EFSA według wieku, ciąży lub karmienia piersią, ile pochodzi z napojów, a ile z jedzenia, i kiedy iść do lekarza.",
  eyebrow: "Bezpłatne narzędzie",
  h1: "Ile wody dziennie pić?",
  intro:
    "Często słyszy się „2 litry” albo „8 szklanek”. Europejskie wartości referencyjne są dokładniejsze: zależą od wieku i płci i uwzględniają też wodę z jedzenia. Wybierz swój profil, aby zobaczyć, co mówią.",
  byline: "Zespół Aloessential",
  form: {
    title: "Twój profil",
    profile: "Profil",
    situations: "W tej chwili (opcjonalnie)",
    submit: "Pokaż moje wartości",
    noscript: "Kalkulator wymaga JavaScriptu. Tabela poniżej podaje te same wartości dla każdego profilu.",
  },
  profiles: {
    woman: "Kobieta (od 14 lat)",
    man: "Mężczyzna (od 14 lat)",
    pregnant: "Kobieta w ciąży",
    breastfeeding: "Kobieta karmiąca piersią",
    girl9: "Dziewczynka w wieku 9–13 lat",
    boy9: "Chłopiec w wieku 9–13 lat",
    child4: "Dziecko w wieku 4–8 lat",
    child2: "Dziecko w wieku 2–3 lat",
  },
  situations: { heat: "Jest gorąco", activity: "Długo się wysilam (sport, praca fizyczna)", illness: "Mam gorączkę, wymioty lub biegunkę" },
  result: {
    total: "Wartość referencyjna: {total} l wody dziennie, z napojów i jedzenia.",
    drinks: "Z napojów: około {min}–{max} l, czyli {glasses} szkl. po 250 ml.",
    glassesRange: "{min}–{max}",
    notes: {
      heat: "Jest gorąco: zapotrzebowanie rośnie. EFSA nie podaje dla tej sytuacji liczby; pij więcej i obserwuj kolor moczu.",
      activity: "Długi wysiłek: pij przed, w trakcie i po nim, tym więcej, im bardziej się pocisz.",
      illness:
        "Gorączka, wymioty lub biegunka: tracisz więcej wody. Pij często i małymi łykami, a jeśli objawy się przedłużają, skontaktuj się z lekarzem, zwłaszcza w przypadku dziecka lub osoby starszej.",
    },
  },
  unit: "l",
  table: {
    title: "Wartości dla każdego profilu",
    caption: "Wystarczające spożycie wody całkowitej według EFSA, przy umiarkowanej temperaturze i aktywności fizycznej. Udział napojów obliczony przy założeniu, że jedzenie dostarcza 20–30% wody.",
    profile: "Profil",
    total: "Woda całkowita dziennie",
    drinks: "Z napojów",
    glasses: "Szklanki 250 ml",
  },
  counts: {
    title: "Co liczy się jako woda",
    items: [
      "Woda, oczywiście, ale też mleko, herbata, kawa i inne napoje: wszystkie przyczyniają się do nawodnienia.",
      "Woda zawarta w jedzeniu: owocach, warzywach, zupach, nabiale. Średnio dostarcza 20–30% wody w ciągu dnia.",
      "Na co dzień woda pozostaje najlepszym wyborem: nie zawiera cukru ani kalorii.",
    ],
  },
  enough: {
    title: "Jak sprawdzić, czy pijesz wystarczająco",
    items: [
      "Jasnożółty mocz w ciągu dnia to dobry znak; jeśli jest ciemniejszy, czas się napić.",
      "Pij regularnie, nie czekając, aż poczujesz silne pragnienie.",
      "Z wiekiem uczucie pragnienia słabnie: osobom starszym pomaga picie o stałych porach.",
      "Więcej wody potrzeba, gdy jest gorąco, podczas długiego wysiłku, w chorobie, w ciąży i w czasie karmienia piersią.",
    ],
  },
  doctor: {
    title: "Kiedy zasięgnąć porady lekarza",
    items: [
      "Jeśli lekarz zalecił Ci ograniczenie płynów, na przykład z powodu choroby nerek, serca lub wątroby: stosuj się do jego zaleceń, a nie do tych wartości.",
      "W przypadku niemowlęcia: zapytaj pediatrę.",
      "Gdy wymioty, biegunka lub gorączka się przedłużają, zwłaszcza u dziecka lub osoby starszej.",
      "Gdy odczuwasz silne, nietypowe pragnienie, które nie mija.",
    ],
  },
  method: {
    title: "Skąd pochodzą te liczby",
    text: [
      "Wartości to wystarczające spożycie wody całkowitej ustalone przez Europejski Urząd ds. Bezpieczeństwa Żywności (EFSA) w 2010 roku. Obejmują wodę z napojów i z jedzenia i dotyczą umiarkowanej temperatury oraz umiarkowanej aktywności fizycznej.",
      "Wobec braku danych EFSA przyjął, że jedzenie dostarcza 20–30% wody całkowitej; analiza badań francuskich i brytyjskich potwierdziła ten rząd wielkości. Na tej podstawie obliczamy udział napojów (70–80%), w zaokrągleniu do 0,1 l, oraz liczbę szklanek po 250 ml.",
      "To wartości orientacyjne dla osób zdrowych, a nie zalecenie lekarskie: zapotrzebowanie różni się w zależności od osoby i dnia.",
    ],
  },
  sources: "Źródła",
  related: "Czytaj dalej",
  relatedLink: "Produkty bogate w wodę, które pomagają się nawodnić",
  foods: {
    title: "Produkty najbogatsze w wodę",
    intro:
      "Owoce, warzywa, zupy i nabiał dostarczają sporą część wody w ciągu dnia. Oto produkty z naszej listy (w sumie {n}), które według tabeli Ciqual agencji Anses zawierają co najmniej {min} g wody na 100 g. Gram wody to mniej więcej jeden mililitr.",
    caption: "Zawartość wody według tabeli Ciqual 2025 agencji Anses. Zwykła porcja: szacunek naszego zespołu.",
    food: "Produkt",
    per100g: "Woda na 100 g",
    portion: "Porcja",
    perPortion: "Woda na porcję",
    licence: "Dane: Anses, tabela Ciqual 2025, na licencji Licence Ouverte 2.0 (Etalab). Wybór, przetłumaczone nazwy, porcje i obliczenia: Aloessential.",
  },
};

export const WATER_UI: Record<Locale, WaterUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Language versions of the calculator: French plus every published locale (hreflang and sitemap). */
export function waterAlternates(translatedLocales: Locale[]): { locale: Locale; hreflang: string; path: string }[] {
  return [DEFAULT_LOCALE, ...translatedLocales].map((locale) => ({
    locale,
    hreflang: LOCALES[locale].htmlLang,
    path: WATER_UI[locale].path,
  }));
}
