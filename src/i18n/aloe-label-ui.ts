/*
 * Text of the aloe drink label checker (src/data/aloe-label.ts, shown inside
 * the "aloe vera drinks: how to choose" article) in every locale.
 * Placeholders: {days}, {price}, {opened}, {date}.
 */
import type { Locale } from "./locales";
import type { Answers, Level, Question } from "../data/aloe-label";

type Options = { [Q in Question]: Record<Answers[Q], string> };
type Explanations = { [Q in Question]: Record<Answers[Q], string> };

export interface AloeLabelUi {
  grid: {
    title: string;
    intro: string;
    caption: string;
    point: string;
    look: string;
    good: string;
    careful: string;
    rows: { point: string; look: string; good: string; careful: string }[];
  };
  checker: {
    title: string;
    intro: string;
    questions: Record<Question, string>;
    options: Options;
    submit: string;
    levels: Record<Level, string>;
    verdicts: Record<Level, string>;
    explanations: Explanations;
    bottle: {
      title: string;
      volume: string;
      dose: string;
      price: string;
      opened: string;
      days: string;
      perDay: string;
      outlasts: string;
      fits: string;
    };
    pregnancy: string;
    noscript: string;
  };
  method: { title: string; text: string[]; checked: string };
}

const fr: AloeLabelUi = {
  grid: {
    title: "Comment choisir le meilleur aloe vera à boire : la grille de l'étiquette",
    intro: "Les cinq points de l'étiquette, et ce qui doit vous rassurer ou vous alerter pour chacun.",
    caption: "Repères tirés de la réglementation européenne citée dans les sources de l'article.",
    point: "Point",
    look: "Où regarder",
    good: "Bon signe",
    careful: "Prudence si",
    rows: [
      { point: "Forme d'aloe", look: "Dénomination, liste des ingrédients", good: "Gel de feuille (intérieur), ou feuille entière filtrée ou décolorée", careful: "Feuille entière sans mention de filtration, ou forme non précisée" },
      { point: "Part d'aloe", look: "Liste des ingrédients, pourcentage", good: "L'aloe arrive en tête, avec un pourcentage indiqué", careful: "L'aloe n'arrive qu'après l'eau ou les jus" },
      { point: "Ingrédients ajoutés", look: "Liste des ingrédients, tableau nutritionnel", good: "Pas de sucres ajoutés ni d'édulcorants", careful: "Sucres ou miel en quantité notable par dose" },
      { point: "Allégations", look: "Face avant, textes de l'emballage", good: "Aucune, ou une allégation sur une vitamine ou un minéral ajouté", careful: "Bienfait attribué à l'aloe lui-même ; jamais de promesse de guérir" },
      { point: "Dose journalière", look: "Mode d'emploi", good: "Dose quotidienne indiquée, avec l'avertissement de ne pas la dépasser", careful: "Aucune dose indiquée sur un complément alimentaire" },
      { point: "Étiquetage et contrôles", look: "Dos de l'emballage", good: "Mentions dans votre langue, responsable établi dans l'UE, certification indépendante", careful: "Pas de liste en français ni d'adresse dans l'UE" },
    ],
  },
  checker: {
    title: "Vérifiez une étiquette d'aloe vera à boire",
    intro: "Répondez en lisant l'étiquette de la bouteille : l'outil vous dit, point par point, ce qui rassure, ce qu'il faut vérifier et ce qui doit vous faire choisir un autre produit.",
    questions: {
      form: "Quelle forme d'aloe indique l'étiquette ?",
      first: "L'aloe est-il le premier ingrédient de la liste ?",
      sweet: "Y a-t-il des sucres ou des édulcorants ajoutés ?",
      claims: "Quelle est la promesse la plus forte de l'emballage ?",
      dose: "Une dose journalière est-elle indiquée ?",
      labelling: "La liste des ingrédients est-elle en français, avec l'adresse d'une entreprise établie dans l'UE ?",
      certified: "L'aloe est-il certifié par un organisme indépendant (par exemple l'IASC) ?",
    },
    options: {
      form: { innerGel: "Gel de feuille (intérieur de la feuille)", filteredWholeLeaf: "Feuille entière filtrée ou décolorée", wholeLeaf: "Feuille entière, sans autre précision", notStated: "Non précisé" },
      first: { yes: "Oui", no: "Non" },
      sweet: { none: "Ni l'un ni l'autre", sugars: "Sucres, miel ou jus de fruits", sweeteners: "Édulcorants" },
      claims: { none: "Aucune promesse de santé", nutrient: "Un bienfait lié à une vitamine ou un minéral ajouté", aloe: "Un bienfait attribué à l'aloe (digestion, « détox »…)", disease: "Prévenir, soigner ou guérir une maladie" },
      dose: { yes: "Oui", no: "Non" },
      labelling: { yes: "Oui", no: "Non" },
      certified: { yes: "Oui", no: "Non ou je ne sais pas" },
    },
    submit: "Vérifier l'étiquette",
    levels: { good: "Bon signe", check: "À vérifier", stop: "Choisir un autre produit" },
    verdicts: {
      good: "D'après vos réponses, rien sur cette étiquette n'appelle à la prudence.",
      check: "Quelques points à vérifier avant d'acheter : voyez les lignes « À vérifier ».",
      stop: "Au moins une réponse est une raison de choisir un autre produit.",
    },
    explanations: {
      form: {
        innerGel: "Le gel de l'intérieur de la feuille est la partie utilisée pour les boissons, à l'écart du latex qui contient l'aloïne.",
        filteredWholeLeaf: "La filtration ou la décoloration sert à retirer l'aloïne et les autres dérivés hydroxyanthracéniques.",
        wholeLeaf: "Demandez au vendeur si l'aloïne a été retirée : dans l'UE, les préparations de feuilles d'aloe contenant des dérivés hydroxyanthracéniques sont interdites dans les aliments (règlement 2021/468).",
        notStated: "Demandez au vendeur s'il s'agit de gel de feuille ou de feuille entière filtrée.",
      },
      first: {
        yes: "L'aloe est l'ingrédient principal en poids.",
        no: "L'aloe n'est pas l'ingrédient principal : c'est une boisson aromatisée à l'aloe plutôt qu'un gel. Regardez le pourcentage.",
      },
      sweet: {
        none: "Pas de sucres ni d'édulcorants ajoutés.",
        sugars: "Regardez la quantité de sucres par dose dans le tableau nutritionnel.",
        sweeteners: "Les édulcorants autorisés dans l'UE sont sans danger aux doses d'emploi, mais ils changent le produit : à vous de voir si vous préférez les éviter.",
      },
      claims: {
        none: "Pas de promesse de santé : rien à vérifier.",
        nutrient: "Allégation autorisée si le produit apporte assez du nutriment, par exemple « la vitamine C contribue au fonctionnement normal du système immunitaire ». Le bienfait tient au nutriment, pas à l'aloe.",
        aloe: "Les allégations propres à l'aloe sont « en attente » au niveau européen : elles n'ont jamais été autorisées après évaluation. N'achetez pas pour cette promesse.",
        disease: "Promettre de prévenir, soigner ou guérir une maladie est interdit pour tout aliment dans l'UE.",
      },
      dose: {
        yes: "Ne la dépassez pas, et servez-vous-en pour calculer combien de temps dure la bouteille (ci-dessous).",
        no: "Un complément alimentaire doit indiquer sa dose journalière. Sans elle, le produit est sans doute vendu comme simple boisson.",
      },
      labelling: {
        yes: "Le produit relève des contrôles européens.",
        no: "Sans mentions dans votre langue ni responsable établi dans l'UE, le produit échappe aux contrôles européens : choisissez-en un autre.",
      },
      certified: {
        yes: "Un bon indice de la teneur et de la qualité de l'aloe, pas une preuve d'efficacité.",
        no: "Ce n'est pas un défaut en soi, mais la teneur en aloe n'est pas vérifiée par un tiers.",
      },
    },
    bottle: {
      title: "Combien de temps dure la bouteille, et combien elle coûte par jour",
      volume: "Volume de la bouteille (ml)",
      dose: "Dose journalière (ml)",
      price: "Prix de la bouteille (facultatif)",
      opened: "Se conserve … jours après ouverture (facultatif)",
      days: "Une bouteille dure {days} jours.",
      perDay: "Soit {price} par jour.",
      outlasts: "La bouteille dure plus longtemps que ses {opened} jours après ouverture : un plus petit format vous conviendrait mieux.",
      fits: "Vous la finissez dans ses {opened} jours après ouverture.",
    },
    pregnancy: "Pendant la grossesse, l'allaitement, chez l'enfant ou avec un traitement : demandez d'abord l'avis de votre médecin ou de votre pharmacien.",
    noscript: "Le vérificateur a besoin de JavaScript ; la grille ci-dessus reste lisible.",
  },
  method: {
    title: "Comment fonctionne le vérificateur",
    text: [
      "Chaque réponse est comparée aux repères de cet article et aux textes européens cités dans ses sources : règlement (UE) 2021/468 pour l'aloïne, règlement (CE) n° 1924/2006 pour les allégations, directive 2002/46/CE pour la dose journalière, règlement (UE) n° 1169/2011 pour l'étiquetage.",
      "Le vérificateur ne juge pas l'effet d'un produit sur la santé et ne remplace pas un avis médical. Il ne cite aucune marque.",
    ],
    checked: "Point réglementaire au {date}.",
  },
};

const en: AloeLabelUi = {
  grid: {
    title: "How to choose the best aloe vera drink: the label checklist",
    intro: "The five points on the label, and what should reassure or alert you for each.",
    caption: "Based on the EU rules listed in the article's sources.",
    point: "Point",
    look: "Where to look",
    good: "Good sign",
    careful: "Be careful if",
    rows: [
      { point: "Form of aloe", look: "Product name, ingredient list", good: "Inner-leaf gel, or whole leaf that is filtered or decolourised", careful: "Whole leaf with no mention of filtering, or form not stated" },
      { point: "Share of aloe", look: "Ingredient list, percentage", good: "Aloe comes first, with a percentage stated", careful: "Aloe comes only after water or juices" },
      { point: "Added ingredients", look: "Ingredient list, nutrition table", good: "No added sugars or sweeteners", careful: "Sugars or honey in notable amounts per dose" },
      { point: "Claims", look: "Front of pack, wording on the box", good: "None, or a claim about an added vitamin or mineral", careful: "A benefit credited to the aloe itself; never a promise to cure" },
      { point: "Daily dose", look: "Directions for use", good: "Daily dose stated, with the warning not to exceed it", careful: "No dose stated on a food supplement" },
      { point: "Labelling and checks", look: "Back of pack", good: "Information in your language, a business established in the EU, independent certification", careful: "No ingredient list in your language, no EU address" },
    ],
  },
  checker: {
    title: "Check an aloe vera drink label",
    intro: "Answer while reading the bottle's label: the tool tells you, point by point, what is reassuring, what to check and what should make you choose another product.",
    questions: {
      form: "Which form of aloe does the label state?",
      first: "Is aloe the first ingredient on the list?",
      sweet: "Are there added sugars or sweeteners?",
      claims: "What is the strongest promise on the pack?",
      dose: "Is a daily dose stated?",
      labelling: "Is the ingredient list in your language, with the address of a business established in the EU?",
      certified: "Is the aloe certified by an independent body (for example the IASC)?",
    },
    options: {
      form: { innerGel: "Inner-leaf gel", filteredWholeLeaf: "Whole leaf, filtered or decolourised", wholeLeaf: "Whole leaf, nothing more", notStated: "Not stated" },
      first: { yes: "Yes", no: "No" },
      sweet: { none: "Neither", sugars: "Sugars, honey or fruit juice", sweeteners: "Sweeteners" },
      claims: { none: "No health promise", nutrient: "A benefit from an added vitamin or mineral", aloe: "A benefit credited to aloe (digestion, \"detox\"…)", disease: "Preventing, treating or curing a disease" },
      dose: { yes: "Yes", no: "No" },
      labelling: { yes: "Yes", no: "No" },
      certified: { yes: "Yes", no: "No, or I don't know" },
    },
    submit: "Check the label",
    levels: { good: "Good sign", check: "To check", stop: "Choose another product" },
    verdicts: {
      good: "Going by your answers, nothing on this label calls for caution.",
      check: "A few points to check before buying: see the \"To check\" lines.",
      stop: "At least one answer is a reason to choose another product.",
    },
    explanations: {
      form: {
        innerGel: "Gel from the inside of the leaf is the part used for drinks, away from the latex that holds the aloin.",
        filteredWholeLeaf: "Filtering or decolourising is meant to remove aloin and the other hydroxyanthracene derivatives.",
        wholeLeaf: "Ask the seller whether the aloin has been removed: in the EU, aloe leaf preparations containing hydroxyanthracene derivatives are banned in food (Regulation 2021/468).",
        notStated: "Ask the seller whether it is inner-leaf gel or filtered whole leaf.",
      },
      first: {
        yes: "Aloe is the main ingredient by weight.",
        no: "Aloe is not the main ingredient: this is an aloe-flavoured drink rather than a gel. Look at the percentage.",
      },
      sweet: {
        none: "No added sugars or sweeteners.",
        sugars: "Look at the sugars per dose in the nutrition table.",
        sweeteners: "Sweeteners authorised in the EU are safe at the levels used, but they change the product: your call whether to avoid them.",
      },
      claims: {
        none: "No health promise: nothing to check.",
        nutrient: "An authorised claim if the product provides enough of the nutrient, such as \"vitamin C contributes to the normal function of the immune system\". The benefit comes from the nutrient, not the aloe.",
        aloe: "Claims for aloe itself are \"on hold\" at EU level: none has ever been authorised after assessment. Don't buy for that promise.",
        disease: "Promising to prevent, treat or cure a disease is forbidden for any food in the EU.",
      },
      dose: {
        yes: "Don't exceed it, and use it to work out how long the bottle lasts (below).",
        no: "A food supplement must state its daily dose. Without one, the product is probably sold as an ordinary drink.",
      },
      labelling: {
        yes: "The product falls under EU controls.",
        no: "With no information in your language and no business established in the EU, the product escapes EU controls: choose another one.",
      },
      certified: {
        yes: "A good sign of aloe content and quality, not proof that it works.",
        no: "Not a fault in itself, but no third party has checked the aloe content.",
      },
    },
    bottle: {
      title: "How long the bottle lasts, and what it costs a day",
      volume: "Bottle volume (ml)",
      dose: "Daily dose (ml)",
      price: "Bottle price (optional)",
      opened: "Keeps … days once opened (optional)",
      days: "One bottle lasts {days} days.",
      perDay: "That is {price} a day.",
      outlasts: "The bottle lasts longer than its {opened} days once opened: a smaller size would suit you better.",
      fits: "You finish it within its {opened} days once opened.",
    },
    pregnancy: "During pregnancy or breastfeeding, for children, or if you take medication: ask your doctor or pharmacist first.",
    noscript: "The checker needs JavaScript; the checklist above stays readable.",
  },
  method: {
    title: "How the checker works",
    text: [
      "Each answer is compared with this article's guidance and the EU texts in its sources: Regulation (EU) 2021/468 for aloin, Regulation (EC) No 1924/2006 for claims, Directive 2002/46/EC for the daily dose, Regulation (EU) No 1169/2011 for labelling.",
      "The checker does not judge a product's effect on health and does not replace medical advice. It names no brand.",
    ],
    checked: "Regulations checked on {date}.",
  },
};

const es: AloeLabelUi = {
  grid: {
    title: "Cómo elegir el mejor aloe vera para beber: la tabla de la etiqueta",
    intro: "Los cinco puntos de la etiqueta, y lo que debe tranquilizarte o alertarte en cada uno.",
    caption: "Referencias basadas en la normativa europea citada en las fuentes del artículo.",
    point: "Punto",
    look: "Dónde mirar",
    good: "Buena señal",
    careful: "Cuidado si",
    rows: [
      { point: "Forma de aloe", look: "Denominación, lista de ingredientes", good: "Gel del interior de la hoja, u hoja entera filtrada o decolorada", careful: "Hoja entera sin mención de filtrado, o forma no indicada" },
      { point: "Cantidad de aloe", look: "Lista de ingredientes, porcentaje", good: "El aloe va en primer lugar, con un porcentaje indicado", careful: "El aloe aparece después del agua o de los zumos" },
      { point: "Ingredientes añadidos", look: "Lista de ingredientes, tabla nutricional", good: "Sin azúcares añadidos ni edulcorantes", careful: "Azúcares o miel en cantidad notable por dosis" },
      { point: "Declaraciones", look: "Parte delantera, textos del envase", good: "Ninguna, o una declaración sobre una vitamina o un mineral añadido", careful: "Un beneficio atribuido al propio aloe; nunca una promesa de curar" },
      { point: "Dosis diaria", look: "Modo de empleo", good: "Dosis diaria indicada, con la advertencia de no superarla", careful: "Sin dosis indicada en un complemento alimenticio" },
      { point: "Etiquetado y controles", look: "Parte trasera del envase", good: "Información en tu idioma, empresa establecida en la UE, certificación independiente", careful: "Sin lista de ingredientes en español ni dirección en la UE" },
    ],
  },
  checker: {
    title: "Comprueba la etiqueta de un aloe vera para beber",
    intro: "Responde leyendo la etiqueta de la botella: la herramienta te dice, punto por punto, qué tranquiliza, qué hay que comprobar y qué debe hacerte elegir otro producto.",
    questions: {
      form: "¿Qué forma de aloe indica la etiqueta?",
      first: "¿Es el aloe el primer ingrediente de la lista?",
      sweet: "¿Lleva azúcares o edulcorantes añadidos?",
      claims: "¿Cuál es la promesa más fuerte del envase?",
      dose: "¿Se indica una dosis diaria?",
      labelling: "¿Está la lista de ingredientes en español, con la dirección de una empresa establecida en la UE?",
      certified: "¿Está el aloe certificado por un organismo independiente (por ejemplo, el IASC)?",
    },
    options: {
      form: { innerGel: "Gel del interior de la hoja", filteredWholeLeaf: "Hoja entera filtrada o decolorada", wholeLeaf: "Hoja entera, sin más detalle", notStated: "No se indica" },
      first: { yes: "Sí", no: "No" },
      sweet: { none: "Ninguno de los dos", sugars: "Azúcares, miel o zumo de fruta", sweeteners: "Edulcorantes" },
      claims: { none: "Ninguna promesa de salud", nutrient: "Un beneficio de una vitamina o un mineral añadido", aloe: "Un beneficio atribuido al aloe (digestión, «détox»…)", disease: "Prevenir, tratar o curar una enfermedad" },
      dose: { yes: "Sí", no: "No" },
      labelling: { yes: "Sí", no: "No" },
      certified: { yes: "Sí", no: "No, o no lo sé" },
    },
    submit: "Comprobar la etiqueta",
    levels: { good: "Buena señal", check: "Por comprobar", stop: "Elegir otro producto" },
    verdicts: {
      good: "Según tus respuestas, nada en esta etiqueta invita a la prudencia.",
      check: "Algunos puntos que comprobar antes de comprar: mira las líneas «Por comprobar».",
      stop: "Al menos una respuesta es motivo para elegir otro producto.",
    },
    explanations: {
      form: {
        innerGel: "El gel del interior de la hoja es la parte que se usa en las bebidas, lejos del látex que contiene la aloína.",
        filteredWholeLeaf: "El filtrado o la decoloración sirven para retirar la aloína y los demás derivados hidroxiantracénicos.",
        wholeLeaf: "Pregunta al vendedor si se ha retirado la aloína: en la UE, los preparados de hoja de aloe que contienen derivados hidroxiantracénicos están prohibidos en los alimentos (Reglamento 2021/468).",
        notStated: "Pregunta al vendedor si se trata de gel del interior de la hoja o de hoja entera filtrada.",
      },
      first: {
        yes: "El aloe es el ingrediente principal en peso.",
        no: "El aloe no es el ingrediente principal: es una bebida con sabor a aloe más que un gel. Mira el porcentaje.",
      },
      sweet: {
        none: "Sin azúcares ni edulcorantes añadidos.",
        sugars: "Mira la cantidad de azúcares por dosis en la tabla nutricional.",
        sweeteners: "Los edulcorantes autorizados en la UE son seguros en las dosis de uso, pero cambian el producto: tú decides si prefieres evitarlos.",
      },
      claims: {
        none: "Ninguna promesa de salud: nada que comprobar.",
        nutrient: "Declaración autorizada si el producto aporta suficiente cantidad del nutriente, por ejemplo «la vitamina C contribuye al funcionamiento normal del sistema inmunitario». El beneficio se debe al nutriente, no al aloe.",
        aloe: "Las declaraciones propias del aloe están «en espera» a nivel europeo: nunca se han autorizado tras una evaluación. No compres por esa promesa.",
        disease: "Prometer prevenir, tratar o curar una enfermedad está prohibido para cualquier alimento en la UE.",
      },
      dose: {
        yes: "No la superes, y úsala para calcular cuánto dura la botella (más abajo).",
        no: "Un complemento alimenticio debe indicar su dosis diaria. Sin ella, el producto probablemente se vende como bebida corriente.",
      },
      labelling: {
        yes: "El producto está sujeto a los controles europeos.",
        no: "Sin información en tu idioma ni empresa establecida en la UE, el producto escapa a los controles europeos: elige otro.",
      },
      certified: {
        yes: "Una buena señal del contenido y la calidad del aloe, no una prueba de eficacia.",
        no: "No es un defecto en sí, pero ningún tercero ha verificado el contenido de aloe.",
      },
    },
    bottle: {
      title: "Cuánto dura la botella y cuánto cuesta al día",
      volume: "Volumen de la botella (ml)",
      dose: "Dosis diaria (ml)",
      price: "Precio de la botella (opcional)",
      opened: "Se conserva … días una vez abierta (opcional)",
      days: "Una botella dura {days} días.",
      perDay: "Es decir, {price} al día.",
      outlasts: "La botella dura más que sus {opened} días una vez abierta: te convendría un formato más pequeño.",
      fits: "La terminas dentro de sus {opened} días una vez abierta.",
    },
    pregnancy: "Durante el embarazo o la lactancia, en niños o si sigues un tratamiento: consulta antes a tu médico o farmacéutico.",
    noscript: "El comprobador necesita JavaScript; la tabla de arriba sigue siendo legible.",
  },
  method: {
    title: "Cómo funciona el comprobador",
    text: [
      "Cada respuesta se compara con las referencias de este artículo y los textos europeos citados en sus fuentes: Reglamento (UE) 2021/468 para la aloína, Reglamento (CE) n.º 1924/2006 para las declaraciones, Directiva 2002/46/CE para la dosis diaria y Reglamento (UE) n.º 1169/2011 para el etiquetado.",
      "El comprobador no juzga el efecto de un producto sobre la salud ni sustituye a un consejo médico. No cita ninguna marca.",
    ],
    checked: "Normativa revisada el {date}.",
  },
};

const de: AloeLabelUi = {
  grid: {
    title: "So wählen Sie das beste Aloe-vera-Getränk: die Etikett-Checkliste",
    intro: "Die fünf Punkte auf dem Etikett und was Sie bei jedem beruhigen oder stutzig machen sollte.",
    caption: "Auf Grundlage der EU-Vorschriften, die in den Quellen des Artikels stehen.",
    point: "Punkt",
    look: "Wo nachsehen",
    good: "Gutes Zeichen",
    careful: "Vorsicht, wenn",
    rows: [
      { point: "Form der Aloe", look: "Bezeichnung, Zutatenliste", good: "Blattgel (Blattinneres) oder gefiltertes bzw. entfärbtes Ganzblatt", careful: "Ganzblatt ohne Hinweis auf Filtration oder Form nicht angegeben" },
      { point: "Aloe-Anteil", look: "Zutatenliste, Prozentangabe", good: "Aloe steht an erster Stelle, mit Prozentangabe", careful: "Aloe steht erst nach Wasser oder Säften" },
      { point: "Zusätze", look: "Zutatenliste, Nährwerttabelle", good: "Kein zugesetzter Zucker, keine Süßstoffe", careful: "Zucker oder Honig in nennenswerter Menge pro Portion" },
      { point: "Angaben", look: "Vorderseite, Texte auf der Verpackung", good: "Keine oder eine Angabe zu einem zugesetzten Vitamin oder Mineralstoff", careful: "Ein Nutzen, der der Aloe selbst zugeschrieben wird; nie ein Heilversprechen" },
      { point: "Tagesdosis", look: "Verzehrempfehlung", good: "Tagesdosis angegeben, mit dem Hinweis, sie nicht zu überschreiten", careful: "Keine Dosis auf einem Nahrungsergänzungsmittel" },
      { point: "Kennzeichnung und Kontrollen", look: "Rückseite", good: "Angaben in Ihrer Sprache, in der EU niedergelassenes Unternehmen, unabhängige Zertifizierung", careful: "Keine deutsche Zutatenliste, keine Anschrift in der EU" },
    ],
  },
  checker: {
    title: "Prüfen Sie das Etikett eines Aloe-vera-Getränks",
    intro: "Antworten Sie mit dem Etikett der Flasche vor Augen: Das Tool zeigt Punkt für Punkt, was beruhigt, was zu prüfen ist und was für ein anderes Produkt spricht.",
    questions: {
      form: "Welche Form der Aloe gibt das Etikett an?",
      first: "Steht Aloe an erster Stelle der Zutatenliste?",
      sweet: "Enthält es zugesetzten Zucker oder Süßstoffe?",
      claims: "Was ist das stärkste Versprechen auf der Verpackung?",
      dose: "Ist eine Tagesdosis angegeben?",
      labelling: "Ist die Zutatenliste auf Deutsch, mit der Anschrift eines in der EU niedergelassenen Unternehmens?",
      certified: "Ist die Aloe von einer unabhängigen Stelle zertifiziert (zum Beispiel vom IASC)?",
    },
    options: {
      form: { innerGel: "Blattgel (Blattinneres)", filteredWholeLeaf: "Ganzblatt, gefiltert oder entfärbt", wholeLeaf: "Ganzblatt, ohne weitere Angabe", notStated: "Nicht angegeben" },
      first: { yes: "Ja", no: "Nein" },
      sweet: { none: "Weder noch", sugars: "Zucker, Honig oder Fruchtsaft", sweeteners: "Süßstoffe" },
      claims: { none: "Kein Gesundheitsversprechen", nutrient: "Ein Nutzen durch ein zugesetztes Vitamin oder einen Mineralstoff", aloe: "Ein Nutzen, der der Aloe zugeschrieben wird (Verdauung, „Detox“…)", disease: "Eine Krankheit verhüten, behandeln oder heilen" },
      dose: { yes: "Ja", no: "Nein" },
      labelling: { yes: "Ja", no: "Nein" },
      certified: { yes: "Ja", no: "Nein oder weiß nicht" },
    },
    submit: "Etikett prüfen",
    levels: { good: "Gutes Zeichen", check: "Zu prüfen", stop: "Anderes Produkt wählen" },
    verdicts: {
      good: "Nach Ihren Antworten gibt nichts auf diesem Etikett Anlass zur Vorsicht.",
      check: "Einige Punkte sollten Sie vor dem Kauf prüfen: siehe die Zeilen „Zu prüfen“.",
      stop: "Mindestens eine Antwort spricht dafür, ein anderes Produkt zu wählen.",
    },
    explanations: {
      form: {
        innerGel: "Das Gel aus dem Blattinneren ist der Teil, der für Getränke verwendet wird, getrennt vom Latex, der das Aloin enthält.",
        filteredWholeLeaf: "Filtration oder Entfärbung sollen Aloin und die anderen Hydroxyanthracenderivate entfernen.",
        wholeLeaf: "Fragen Sie den Händler, ob das Aloin entfernt wurde: In der EU sind Zubereitungen aus Aloe-Blättern, die Hydroxyanthracenderivate enthalten, in Lebensmitteln verboten (Verordnung 2021/468).",
        notStated: "Fragen Sie den Händler, ob es sich um Blattgel oder gefiltertes Ganzblatt handelt.",
      },
      first: {
        yes: "Aloe ist nach Gewicht die Hauptzutat.",
        no: "Aloe ist nicht die Hauptzutat: Es ist eher ein Getränk mit Aloe-Geschmack als ein Gel. Achten Sie auf die Prozentangabe.",
      },
      sweet: {
        none: "Kein zugesetzter Zucker, keine Süßstoffe.",
        sugars: "Sehen Sie in der Nährwerttabelle nach, wie viel Zucker eine Portion enthält.",
        sweeteners: "In der EU zugelassene Süßstoffe sind in den verwendeten Mengen sicher, verändern aber das Produkt: Ob Sie sie meiden, entscheiden Sie.",
      },
      claims: {
        none: "Kein Gesundheitsversprechen: nichts zu prüfen.",
        nutrient: "Eine zugelassene Angabe, wenn das Produkt genug von dem Nährstoff liefert, etwa „Vitamin C trägt zu einer normalen Funktion des Immunsystems bei“. Der Nutzen kommt vom Nährstoff, nicht von der Aloe.",
        aloe: "Angaben zur Aloe selbst sind auf EU-Ebene „on hold“: Keine wurde je nach einer Bewertung zugelassen. Kaufen Sie nicht wegen dieses Versprechens.",
        disease: "Das Versprechen, eine Krankheit zu verhüten, zu behandeln oder zu heilen, ist für alle Lebensmittel in der EU verboten.",
      },
      dose: {
        yes: "Überschreiten Sie sie nicht, und berechnen Sie damit, wie lange die Flasche reicht (unten).",
        no: "Ein Nahrungsergänzungsmittel muss seine Tagesdosis angeben. Ohne sie wird das Produkt vermutlich als gewöhnliches Getränk verkauft.",
      },
      labelling: {
        yes: "Das Produkt unterliegt den EU-Kontrollen.",
        no: "Ohne Angaben in Ihrer Sprache und ohne in der EU niedergelassenes Unternehmen entzieht sich das Produkt den EU-Kontrollen: Wählen Sie ein anderes.",
      },
      certified: {
        yes: "Ein gutes Zeichen für Aloe-Gehalt und Qualität, kein Wirksamkeitsnachweis.",
        no: "Kein Mangel an sich, aber kein Dritter hat den Aloe-Gehalt geprüft.",
      },
    },
    bottle: {
      title: "Wie lange die Flasche reicht und was sie pro Tag kostet",
      volume: "Flascheninhalt (ml)",
      dose: "Tagesdosis (ml)",
      price: "Preis der Flasche (optional)",
      opened: "Nach dem Öffnen … Tage haltbar (optional)",
      days: "Eine Flasche reicht {days} Tage.",
      perDay: "Das sind {price} pro Tag.",
      outlasts: "Die Flasche reicht länger als ihre {opened} Tage Haltbarkeit nach dem Öffnen: Eine kleinere Größe wäre passender.",
      fits: "Sie trinken sie innerhalb ihrer {opened} Tage nach dem Öffnen aus.",
    },
    pregnancy: "In Schwangerschaft und Stillzeit, bei Kindern oder bei Einnahme von Medikamenten: fragen Sie zuerst Ihre Ärztin, Ihren Arzt oder in der Apotheke.",
    noscript: "Der Etikett-Check benötigt JavaScript; die Checkliste oben bleibt lesbar.",
  },
  method: {
    title: "So funktioniert der Etikett-Check",
    text: [
      "Jede Antwort wird mit den Hinweisen dieses Artikels und den EU-Texten aus seinen Quellen abgeglichen: Verordnung (EU) 2021/468 zu Aloin, Verordnung (EG) Nr. 1924/2006 zu Angaben, Richtlinie 2002/46/EG zur Tagesdosis und Verordnung (EU) Nr. 1169/2011 zur Kennzeichnung.",
      "Der Etikett-Check beurteilt nicht die Wirkung eines Produkts auf die Gesundheit und ersetzt keinen ärztlichen Rat. Er nennt keine Marke.",
    ],
    checked: "Rechtsstand geprüft am {date}.",
  },
};

const it: AloeLabelUi = {
  grid: {
    title: "Come scegliere la migliore aloe vera da bere: la griglia dell'etichetta",
    intro: "I cinque punti dell'etichetta, e cosa deve rassicurarti o metterti in guardia per ciascuno.",
    caption: "Riferimenti tratti dalla normativa europea citata nelle fonti dell'articolo.",
    point: "Punto",
    look: "Dove guardare",
    good: "Buon segno",
    careful: "Attenzione se",
    rows: [
      { point: "Forma dell'aloe", look: "Denominazione, elenco degli ingredienti", good: "Gel della foglia (parte interna), o foglia intera filtrata o decolorata", careful: "Foglia intera senza indicazione di filtrazione, o forma non indicata" },
      { point: "Quantità di aloe", look: "Elenco degli ingredienti, percentuale", good: "L'aloe è al primo posto, con una percentuale indicata", careful: "L'aloe compare solo dopo l'acqua o i succhi" },
      { point: "Ingredienti aggiunti", look: "Elenco degli ingredienti, tabella nutrizionale", good: "Niente zuccheri aggiunti né edulcoranti", careful: "Zuccheri o miele in quantità rilevante per dose" },
      { point: "Indicazioni", look: "Fronte della confezione, testi", good: "Nessuna, o un'indicazione su una vitamina o un minerale aggiunto", careful: "Un beneficio attribuito all'aloe stessa; mai una promessa di guarigione" },
      { point: "Dose giornaliera", look: "Modalità d'uso", good: "Dose giornaliera indicata, con l'avvertenza di non superarla", careful: "Nessuna dose indicata su un integratore" },
      { point: "Etichettatura e controlli", look: "Retro della confezione", good: "Informazioni nella tua lingua, azienda stabilita nell'UE, certificazione indipendente", careful: "Nessun elenco in italiano né indirizzo nell'UE" },
    ],
  },
  checker: {
    title: "Controlla l'etichetta di un'aloe vera da bere",
    intro: "Rispondi leggendo l'etichetta della bottiglia: lo strumento ti dice, punto per punto, cosa rassicura, cosa va verificato e cosa deve farti scegliere un altro prodotto.",
    questions: {
      form: "Quale forma di aloe indica l'etichetta?",
      first: "L'aloe è il primo ingrediente dell'elenco?",
      sweet: "Ci sono zuccheri o edulcoranti aggiunti?",
      claims: "Qual è la promessa più forte della confezione?",
      dose: "È indicata una dose giornaliera?",
      labelling: "L'elenco degli ingredienti è in italiano, con l'indirizzo di un'azienda stabilita nell'UE?",
      certified: "L'aloe è certificata da un ente indipendente (per esempio l'IASC)?",
    },
    options: {
      form: { innerGel: "Gel della foglia (parte interna)", filteredWholeLeaf: "Foglia intera filtrata o decolorata", wholeLeaf: "Foglia intera, senza altre indicazioni", notStated: "Non indicato" },
      first: { yes: "Sì", no: "No" },
      sweet: { none: "Né gli uni né gli altri", sugars: "Zuccheri, miele o succo di frutta", sweeteners: "Edulcoranti" },
      claims: { none: "Nessuna promessa per la salute", nutrient: "Un beneficio legato a una vitamina o a un minerale aggiunto", aloe: "Un beneficio attribuito all'aloe (digestione, «detox»…)", disease: "Prevenire, curare o guarire una malattia" },
      dose: { yes: "Sì", no: "No" },
      labelling: { yes: "Sì", no: "No" },
      certified: { yes: "Sì", no: "No, o non lo so" },
    },
    submit: "Controlla l'etichetta",
    levels: { good: "Buon segno", check: "Da verificare", stop: "Scegliere un altro prodotto" },
    verdicts: {
      good: "In base alle tue risposte, niente su questa etichetta invita alla prudenza.",
      check: "Alcuni punti da verificare prima dell'acquisto: guarda le righe «Da verificare».",
      stop: "Almeno una risposta è un motivo per scegliere un altro prodotto.",
    },
    explanations: {
      form: {
        innerGel: "Il gel della parte interna della foglia è quello usato per le bevande, lontano dal lattice che contiene l'aloina.",
        filteredWholeLeaf: "La filtrazione o la decolorazione servono a togliere l'aloina e gli altri derivati idrossiantracenici.",
        wholeLeaf: "Chiedi al venditore se l'aloina è stata tolta: nell'UE i preparati di foglie di aloe contenenti derivati idrossiantracenici sono vietati negli alimenti (regolamento 2021/468).",
        notStated: "Chiedi al venditore se si tratta di gel della foglia o di foglia intera filtrata.",
      },
      first: {
        yes: "L'aloe è l'ingrediente principale in peso.",
        no: "L'aloe non è l'ingrediente principale: è più una bevanda aromatizzata all'aloe che un gel. Guarda la percentuale.",
      },
      sweet: {
        none: "Niente zuccheri né edulcoranti aggiunti.",
        sugars: "Guarda la quantità di zuccheri per dose nella tabella nutrizionale.",
        sweeteners: "Gli edulcoranti autorizzati nell'UE sono sicuri alle dosi d'impiego, ma cambiano il prodotto: sta a te decidere se evitarli.",
      },
      claims: {
        none: "Nessuna promessa per la salute: niente da verificare.",
        nutrient: "Indicazione autorizzata se il prodotto apporta abbastanza nutriente, per esempio «la vitamina C contribuisce alla normale funzione del sistema immunitario». Il beneficio dipende dal nutriente, non dall'aloe.",
        aloe: "Le indicazioni proprie dell'aloe sono «in sospeso» a livello europeo: nessuna è mai stata autorizzata dopo una valutazione. Non comprare per questa promessa.",
        disease: "Promettere di prevenire, curare o guarire una malattia è vietato per qualsiasi alimento nell'UE.",
      },
      dose: {
        yes: "Non superarla, e usala per calcolare quanto dura la bottiglia (qui sotto).",
        no: "Un integratore deve indicare la dose giornaliera. Senza, il prodotto è probabilmente venduto come semplice bevanda.",
      },
      labelling: {
        yes: "Il prodotto rientra nei controlli europei.",
        no: "Senza informazioni nella tua lingua né un'azienda stabilita nell'UE, il prodotto sfugge ai controlli europei: scegline un altro.",
      },
      certified: {
        yes: "Un buon indizio del contenuto e della qualità dell'aloe, non una prova di efficacia.",
        no: "Non è un difetto in sé, ma nessun ente terzo ha verificato il contenuto di aloe.",
      },
    },
    bottle: {
      title: "Quanto dura la bottiglia e quanto costa al giorno",
      volume: "Volume della bottiglia (ml)",
      dose: "Dose giornaliera (ml)",
      price: "Prezzo della bottiglia (facoltativo)",
      opened: "Si conserva … giorni dopo l'apertura (facoltativo)",
      days: "Una bottiglia dura {days} giorni.",
      perDay: "Cioè {price} al giorno.",
      outlasts: "La bottiglia dura più dei suoi {opened} giorni dopo l'apertura: un formato più piccolo sarebbe più adatto.",
      fits: "La finisci entro i suoi {opened} giorni dopo l'apertura.",
    },
    pregnancy: "In gravidanza o allattamento, per i bambini o se segui una terapia: chiedi prima al medico o al farmacista.",
    noscript: "Lo strumento richiede JavaScript; la griglia qui sopra resta leggibile.",
  },
  method: {
    title: "Come funziona il controllo",
    text: [
      "Ogni risposta è confrontata con i riferimenti di questo articolo e i testi europei citati nelle fonti: regolamento (UE) 2021/468 per l'aloina, regolamento (CE) n. 1924/2006 per le indicazioni, direttiva 2002/46/CE per la dose giornaliera e regolamento (UE) n. 1169/2011 per l'etichettatura.",
      "Lo strumento non giudica l'effetto di un prodotto sulla salute e non sostituisce un parere medico. Non cita alcun marchio.",
    ],
    checked: "Normativa verificata il {date}.",
  },
};

const ptPt: AloeLabelUi = {
  grid: {
    title: "Como escolher o melhor aloe vera para beber: a grelha do rótulo",
    intro: "Os cinco pontos do rótulo, e o que deve tranquilizá-lo ou alertá-lo em cada um.",
    caption: "Referências baseadas na regulamentação europeia citada nas fontes do artigo.",
    point: "Ponto",
    look: "Onde ver",
    good: "Bom sinal",
    careful: "Cuidado se",
    rows: [
      { point: "Forma de aloe", look: "Denominação, lista de ingredientes", good: "Gel da folha (parte interior), ou folha inteira filtrada ou descolorada", careful: "Folha inteira sem menção de filtração, ou forma não indicada" },
      { point: "Quantidade de aloe", look: "Lista de ingredientes, percentagem", good: "O aloe vem em primeiro lugar, com percentagem indicada", careful: "O aloe só aparece depois da água ou dos sumos" },
      { point: "Ingredientes adicionados", look: "Lista de ingredientes, tabela nutricional", good: "Sem açúcares adicionados nem edulcorantes", careful: "Açúcares ou mel em quantidade notável por dose" },
      { point: "Alegações", look: "Frente da embalagem, textos", good: "Nenhuma, ou uma alegação sobre uma vitamina ou um mineral adicionado", careful: "Um benefício atribuído ao próprio aloe; nunca uma promessa de cura" },
      { point: "Dose diária", look: "Modo de utilização", good: "Dose diária indicada, com o aviso de não a ultrapassar", careful: "Nenhuma dose indicada num suplemento alimentar" },
      { point: "Rotulagem e controlos", look: "Verso da embalagem", good: "Informação na sua língua, empresa estabelecida na UE, certificação independente", careful: "Sem lista de ingredientes em português nem morada na UE" },
    ],
  },
  checker: {
    title: "Verifique o rótulo de um aloe vera para beber",
    intro: "Responda a ler o rótulo da garrafa: a ferramenta diz-lhe, ponto por ponto, o que tranquiliza, o que deve verificar e o que o deve levar a escolher outro produto.",
    questions: {
      form: "Que forma de aloe indica o rótulo?",
      first: "O aloe é o primeiro ingrediente da lista?",
      sweet: "Tem açúcares ou edulcorantes adicionados?",
      claims: "Qual é a promessa mais forte da embalagem?",
      dose: "Está indicada uma dose diária?",
      labelling: "A lista de ingredientes está em português, com a morada de uma empresa estabelecida na UE?",
      certified: "O aloe é certificado por um organismo independente (por exemplo, o IASC)?",
    },
    options: {
      form: { innerGel: "Gel da folha (parte interior)", filteredWholeLeaf: "Folha inteira filtrada ou descolorada", wholeLeaf: "Folha inteira, sem mais indicações", notStated: "Não indicado" },
      first: { yes: "Sim", no: "Não" },
      sweet: { none: "Nem uns nem outros", sugars: "Açúcares, mel ou sumo de fruta", sweeteners: "Edulcorantes" },
      claims: { none: "Nenhuma promessa de saúde", nutrient: "Um benefício de uma vitamina ou um mineral adicionado", aloe: "Um benefício atribuído ao aloe (digestão, «detox»…)", disease: "Prevenir, tratar ou curar uma doença" },
      dose: { yes: "Sim", no: "Não" },
      labelling: { yes: "Sim", no: "Não" },
      certified: { yes: "Sim", no: "Não, ou não sei" },
    },
    submit: "Verificar o rótulo",
    levels: { good: "Bom sinal", check: "A verificar", stop: "Escolher outro produto" },
    verdicts: {
      good: "Pelas suas respostas, nada neste rótulo pede prudência.",
      check: "Alguns pontos a verificar antes de comprar: veja as linhas «A verificar».",
      stop: "Pelo menos uma resposta é motivo para escolher outro produto.",
    },
    explanations: {
      form: {
        innerGel: "O gel do interior da folha é a parte usada nas bebidas, longe do látex que contém a aloína.",
        filteredWholeLeaf: "A filtração ou a descoloração servem para retirar a aloína e os outros derivados hidroxiantracénicos.",
        wholeLeaf: "Pergunte ao vendedor se a aloína foi retirada: na UE, as preparações de folhas de aloe que contêm derivados hidroxiantracénicos são proibidas nos alimentos (Regulamento 2021/468).",
        notStated: "Pergunte ao vendedor se se trata de gel da folha ou de folha inteira filtrada.",
      },
      first: {
        yes: "O aloe é o ingrediente principal em peso.",
        no: "O aloe não é o ingrediente principal: é mais uma bebida com sabor a aloe do que um gel. Veja a percentagem.",
      },
      sweet: {
        none: "Sem açúcares nem edulcorantes adicionados.",
        sugars: "Veja a quantidade de açúcares por dose na tabela nutricional.",
        sweeteners: "Os edulcorantes autorizados na UE são seguros nas doses de utilização, mas mudam o produto: decida se prefere evitá-los.",
      },
      claims: {
        none: "Nenhuma promessa de saúde: nada a verificar.",
        nutrient: "Alegação autorizada se o produto fornecer quantidade suficiente do nutriente, por exemplo «a vitamina C contribui para o normal funcionamento do sistema imunitário». O benefício deve-se ao nutriente, não ao aloe.",
        aloe: "As alegações próprias do aloe estão «em espera» a nível europeu: nenhuma foi alguma vez autorizada após avaliação. Não compre por essa promessa.",
        disease: "Prometer prevenir, tratar ou curar uma doença é proibido para qualquer alimento na UE.",
      },
      dose: {
        yes: "Não a ultrapasse, e use-a para calcular quanto tempo dura a garrafa (abaixo).",
        no: "Um suplemento alimentar tem de indicar a dose diária. Sem ela, o produto é provavelmente vendido como simples bebida.",
      },
      labelling: {
        yes: "O produto está sujeito aos controlos europeus.",
        no: "Sem informação na sua língua nem empresa estabelecida na UE, o produto escapa aos controlos europeus: escolha outro.",
      },
      certified: {
        yes: "Um bom indício do teor e da qualidade do aloe, não uma prova de eficácia.",
        no: "Não é um defeito em si, mas nenhum terceiro verificou o teor de aloe.",
      },
    },
    bottle: {
      title: "Quanto tempo dura a garrafa e quanto custa por dia",
      volume: "Volume da garrafa (ml)",
      dose: "Dose diária (ml)",
      price: "Preço da garrafa (opcional)",
      opened: "Conserva-se … dias depois de aberta (opcional)",
      days: "Uma garrafa dura {days} dias.",
      perDay: "Ou seja, {price} por dia.",
      outlasts: "A garrafa dura mais do que os seus {opened} dias depois de aberta: um formato mais pequeno seria mais adequado.",
      fits: "Acaba-a dentro dos seus {opened} dias depois de aberta.",
    },
    pregnancy: "Na gravidez ou amamentação, em crianças ou se toma medicamentos: peça primeiro conselho ao seu médico ou farmacêutico.",
    noscript: "A ferramenta precisa de JavaScript; a grelha acima continua legível.",
  },
  method: {
    title: "Como funciona a verificação",
    text: [
      "Cada resposta é comparada com as referências deste artigo e os textos europeus citados nas suas fontes: Regulamento (UE) 2021/468 para a aloína, Regulamento (CE) n.º 1924/2006 para as alegações, Diretiva 2002/46/CE para a dose diária e Regulamento (UE) n.º 1169/2011 para a rotulagem.",
      "A ferramenta não avalia o efeito de um produto na saúde nem substitui o conselho médico. Não cita nenhuma marca.",
    ],
    checked: "Regulamentação verificada em {date}.",
  },
};

const pl: AloeLabelUi = {
  grid: {
    title: "Jak wybrać najlepszy aloes do picia: ściąga do etykiety",
    intro: "Pięć punktów etykiety i to, co przy każdym powinno cię uspokoić lub zaniepokoić.",
    caption: "Na podstawie przepisów UE wymienionych w źródłach artykułu.",
    point: "Punkt",
    look: "Gdzie szukać",
    good: "Dobry znak",
    careful: "Uwaga, jeśli",
    rows: [
      { point: "Postać aloesu", look: "Nazwa, wykaz składników", good: "Żel z liścia (miąższ) lub cały liść filtrowany albo odbarwiony", careful: "Cały liść bez wzmianki o filtracji lub postać nieokreślona" },
      { point: "Udział aloesu", look: "Wykaz składników, procent", good: "Aloes jest na pierwszym miejscu, z podanym procentem", careful: "Aloes pojawia się dopiero po wodzie lub sokach" },
      { point: "Dodatki", look: "Wykaz składników, tabela wartości odżywczej", good: "Bez dodanego cukru i słodzików", careful: "Cukier lub miód w znaczącej ilości na porcję" },
      { point: "Oświadczenia", look: "Front opakowania, napisy", good: "Brak lub oświadczenie o dodanej witaminie bądź składniku mineralnym", careful: "Korzyść przypisana samemu aloesowi; nigdy obietnica wyleczenia" },
      { point: "Dzienna porcja", look: "Sposób użycia", good: "Podana dzienna porcja z ostrzeżeniem, by jej nie przekraczać", careful: "Brak porcji na suplemencie diety" },
      { point: "Etykietowanie i kontrole", look: "Tył opakowania", good: "Informacje w twoim języku, firma z siedzibą w UE, niezależna certyfikacja", careful: "Brak polskiego wykazu składników i adresu w UE" },
    ],
  },
  checker: {
    title: "Sprawdź etykietę aloesu do picia",
    intro: "Odpowiadaj, czytając etykietę butelki: narzędzie powie, punkt po punkcie, co uspokaja, co trzeba sprawdzić, a co powinno skłonić cię do wyboru innego produktu.",
    questions: {
      form: "Jaką postać aloesu podaje etykieta?",
      first: "Czy aloes jest pierwszym składnikiem na liście?",
      sweet: "Czy zawiera dodany cukier lub słodziki?",
      claims: "Jaka jest najmocniejsza obietnica na opakowaniu?",
      dose: "Czy podano dzienną porcję?",
      labelling: "Czy wykaz składników jest po polsku, z adresem firmy z siedzibą w UE?",
      certified: "Czy aloes ma certyfikat niezależnej instytucji (np. IASC)?",
    },
    options: {
      form: { innerGel: "Żel z liścia (miąższ)", filteredWholeLeaf: "Cały liść, filtrowany lub odbarwiony", wholeLeaf: "Cały liść, bez dalszych informacji", notStated: "Nie podano" },
      first: { yes: "Tak", no: "Nie" },
      sweet: { none: "Ani jedno, ani drugie", sugars: "Cukier, miód lub sok owocowy", sweeteners: "Słodziki" },
      claims: { none: "Brak obietnic zdrowotnych", nutrient: "Korzyść z dodanej witaminy lub składnika mineralnego", aloe: "Korzyść przypisana aloesowi (trawienie, „detoks”…)", disease: "Zapobieganie chorobie, jej leczenie lub wyleczenie" },
      dose: { yes: "Tak", no: "Nie" },
      labelling: { yes: "Tak", no: "Nie" },
      certified: { yes: "Tak", no: "Nie lub nie wiem" },
    },
    submit: "Sprawdź etykietę",
    levels: { good: "Dobry znak", check: "Do sprawdzenia", stop: "Wybierz inny produkt" },
    verdicts: {
      good: "Według twoich odpowiedzi nic na tej etykiecie nie wymaga ostrożności.",
      check: "Kilka punktów do sprawdzenia przed zakupem: zobacz wiersze „Do sprawdzenia”.",
      stop: "Co najmniej jedna odpowiedź to powód, by wybrać inny produkt.",
    },
    explanations: {
      form: {
        innerGel: "Żel z wnętrza liścia to część używana do napojów, oddzielona od lateksu zawierającego aloinę.",
        filteredWholeLeaf: "Filtracja lub odbarwianie mają usunąć aloinę i inne pochodne hydroksyantracenu.",
        wholeLeaf: "Zapytaj sprzedawcę, czy aloinę usunięto: w UE preparaty z liści aloesu zawierające pochodne hydroksyantracenu są zakazane w żywności (rozporządzenie 2021/468).",
        notStated: "Zapytaj sprzedawcę, czy to żel z liścia, czy filtrowany cały liść.",
      },
      first: {
        yes: "Aloes jest głównym składnikiem wagowo.",
        no: "Aloes nie jest głównym składnikiem: to raczej napój o smaku aloesu niż żel. Sprawdź procent.",
      },
      sweet: {
        none: "Bez dodanego cukru i słodzików.",
        sugars: "Sprawdź w tabeli wartości odżywczej, ile cukrów zawiera porcja.",
        sweeteners: "Słodziki dopuszczone w UE są bezpieczne w stosowanych ilościach, ale zmieniają produkt: sam zdecyduj, czy wolisz ich unikać.",
      },
      claims: {
        none: "Brak obietnic zdrowotnych: nie ma czego sprawdzać.",
        nutrient: "Dozwolone oświadczenie, jeśli produkt dostarcza wystarczająco dużo składnika, np. „witamina C pomaga w prawidłowym funkcjonowaniu układu odpornościowego”. Korzyść wynika ze składnika, nie z aloesu.",
        aloe: "Oświadczenia dotyczące samego aloesu są w UE „zawieszone”: żadne nie zostało nigdy dopuszczone po ocenie. Nie kupuj dla tej obietnicy.",
        disease: "Obiecywanie zapobiegania chorobie, jej leczenia lub wyleczenia jest w UE zakazane dla każdej żywności.",
      },
      dose: {
        yes: "Nie przekraczaj jej i użyj jej, by obliczyć, na ile wystarczy butelka (poniżej).",
        no: "Suplement diety musi podawać dzienną porcję. Bez niej produkt jest pewnie sprzedawany jako zwykły napój.",
      },
      labelling: {
        yes: "Produkt podlega kontrolom w UE.",
        no: "Bez informacji w twoim języku i bez firmy z siedzibą w UE produkt wymyka się kontrolom w UE: wybierz inny.",
      },
      certified: {
        yes: "Dobry znak co do zawartości i jakości aloesu, nie dowód skuteczności.",
        no: "To nie wada sama w sobie, ale nikt niezależny nie sprawdził zawartości aloesu.",
      },
    },
    bottle: {
      title: "Na ile wystarczy butelka i ile kosztuje dziennie",
      volume: "Pojemność butelki (ml)",
      dose: "Dzienna porcja (ml)",
      price: "Cena butelki (opcjonalnie)",
      opened: "Po otwarciu zachowuje świeżość … dni (opcjonalnie)",
      days: "Jedna butelka wystarcza na {days} dni.",
      perDay: "To {price} dziennie.",
      outlasts: "Butelka wystarcza na dłużej niż jej {opened} dni po otwarciu: mniejsze opakowanie byłoby lepsze.",
      fits: "Wypijesz ją w ciągu jej {opened} dni po otwarciu.",
    },
    pregnancy: "W ciąży, w okresie karmienia piersią, u dzieci lub przy przyjmowaniu leków: najpierw zapytaj lekarza lub farmaceutę.",
    noscript: "Narzędzie wymaga JavaScriptu; ściąga powyżej pozostaje czytelna.",
  },
  method: {
    title: "Jak działa sprawdzanie",
    text: [
      "Każda odpowiedź jest porównywana ze wskazówkami tego artykułu i tekstami UE z jego źródeł: rozporządzeniem (UE) 2021/468 w sprawie aloiny, rozporządzeniem (WE) nr 1924/2006 w sprawie oświadczeń, dyrektywą 2002/46/WE w sprawie dziennej porcji i rozporządzeniem (UE) nr 1169/2011 w sprawie etykietowania.",
      "Narzędzie nie ocenia wpływu produktu na zdrowie i nie zastępuje porady lekarskiej. Nie wymienia żadnej marki.",
    ],
    checked: "Stan prawny sprawdzony {date}.",
  },
};

export const ALOE_LABEL_UI: Record<Locale, AloeLabelUi> = { fr, en, es, de, it, "pt-pt": ptPt, pl };

/** Ids of the tool's h2 headings, also listed in the article's table of contents. */
export const ALOE_LABEL_HEADINGS = {
  grid: "aloe-label-checklist",
  checker: "check-an-aloe-label",
  method: "aloe-label-method",
} as const;
