export const CATEGORY_SLUGS = ["conseils", "sante", "beaute", "nutrition"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  /** Editorial introduction shown at the top of the section page. */
  intro: string[];
  /** Accent used by the category tile swatch. */
  swatch: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  conseils: {
    slug: "conseils",
    label: "Conseils",
    description: "Des gestes simples et des routines réalistes pour prendre soin de soi au quotidien.",
    intro: [
      "Les guides pratiques d'Aloessential : comment choisir un gel d'aloe vera, lire une étiquette, organiser une routine du matin. Chaque conseil part de situations concrètes et reste réaliste : quelques gestes bien choisis valent mieux qu'une routine compliquée.",
      "Quand un produit est cité, c'est pour illustrer un critère de choix, jamais à la place de l'information. Nos liens partenaires sont signalés et expliqués sur la page Transparence.",
    ],
    swatch: "var(--color-leaf)",
  },
  sante: {
    slug: "sante",
    label: "Santé",
    description: "Comprendre son corps, son sommeil et son énergie, avec des sources fiables.",
    intro: [
      "Ce que la science et la réglementation européenne permettent réellement d'affirmer sur l'aloe vera, les vitamines, la digestion, le sommeil ou la mobilité. Nous distinguons ce qui est démontré de ce qui reste à l'étude, et nous citons nos sources réglementaires.",
      "Ces articles informent ; ils ne remplacent pas l'avis d'un médecin ou d'un pharmacien, en particulier en cas de grossesse, de traitement ou de symptômes qui durent.",
    ],
    swatch: "var(--color-forest)",
  },
  beaute: {
    slug: "beaute",
    label: "Beauté",
    description: "Soins de la peau et des cheveux inspirés de la nature, sans promesses miracles.",
    intro: [
      "Soins de la peau et des cheveux inspirés des plantes, à commencer par l'aloe vera. Nous expliquons ce que fait chaque actif, comment construire une routine et comment lire une liste d'ingrédients (INCI).",
      "Un cosmétique hydrate, apaise, protège ou améliore l'aspect de la peau : il ne soigne pas. Nous nous en tenons à ce que ces produits peuvent vraiment promettre.",
    ],
    swatch: "var(--color-sun)",
  },
  nutrition: {
    slug: "nutrition",
    label: "Nutrition",
    description: "Une alimentation savoureuse et équilibrée, de l'assiette au verre d'eau.",
    intro: [
      "Une alimentation variée et savoureuse, de l'assiette au verre : hydratation, petit-déjeuner, boissons à l'aloe vera, compléments alimentaires et étiquettes nutritionnelles.",
      "Nous rappelons ce qu'une allégation autorisée veut dire, et pourquoi un complément ne remplace jamais une alimentation équilibrée.",
    ],
    swatch: "var(--color-orange)",
  },
};

export const categoryList = CATEGORY_SLUGS.map((slug) => CATEGORIES[slug]);

/*
 * Category text in the other locales. Same keys as CATEGORIES; the localized
 * slug is used in URLs (/it/rubriche/<slug>/). A category page only exists in
 * a locale once it holds at least one published article in that locale.
 */
export interface LocalizedCategory {
  slug: string;
  label: string;
  description: string;
  intro: string[];
}

export const CATEGORY_I18N: Partial<Record<string, Record<CategorySlug, LocalizedCategory>>> = {
  en: {
    conseils: {
      slug: "advice",
      label: "Advice",
      description: "Simple habits and realistic routines for looking after yourself every day.",
      intro: [
        "Aloessential's practical guides: how to choose an aloe vera gel, read a label or set up a morning routine. Every tip starts from real situations and stays realistic: a few well-chosen habits beat a complicated routine.",
        "When we mention a product, it is to illustrate a buying criterion, never to replace the information.",
      ],
    },
    sante: {
      slug: "health",
      label: "Health",
      description: "Understanding your body, sleep and energy, with reliable sources.",
      intro: [
        "What science and the rules on food and supplements really allow us to say about aloe vera, vitamins, digestion, sleep or mobility. We separate what has been shown from what is still being studied, and we cite our regulatory sources.",
        "These articles inform; they do not replace advice from a doctor or pharmacist, especially if you are pregnant, taking medication or have symptoms that persist.",
      ],
    },
    beaute: {
      slug: "beauty",
      label: "Beauty",
      description: "Skin and hair care inspired by nature, without miracle promises.",
      intro: [
        "Skin and hair care inspired by plants, starting with aloe vera. We explain what each ingredient does, how to build a routine and how to read an ingredient list (INCI).",
        "A cosmetic moisturises, soothes, protects or improves the look of the skin: it does not treat. We stick to what these products can really promise.",
      ],
    },
    nutrition: {
      slug: "nutrition",
      label: "Nutrition",
      description: "Tasty, balanced eating, from the plate to the glass of water.",
      intro: [
        "Varied, tasty eating, from the plate to the glass: hydration, breakfast, aloe vera drinks, food supplements and nutrition labels.",
        "We explain what an authorised health claim means, and why a supplement never replaces a balanced diet.",
      ],
    },
  },
  pl: {
    conseils: {
      slug: "porady",
      label: "Porady",
      description: "Proste nawyki i realistyczne rutyny, by codziennie o siebie dbać.",
      intro: [
        "Praktyczne poradniki Aloessential: jak wybrać żel aloesowy, czytać etykiety i zaplanować poranną rutynę. Każda porada wychodzi od konkretnych sytuacji i pozostaje realistyczna: kilka dobrze dobranych nawyków jest wartych więcej niż skomplikowana rutyna.",
        "Jeśli wspominamy o produkcie, to po to, by pokazać kryterium wyboru, nigdy zamiast rzetelnej informacji.",
      ],
    },
    sante: {
      slug: "zdrowie",
      label: "Zdrowie",
      description: "Lepiej rozumieć swoje ciało, sen i energię, w oparciu o wiarygodne źródła.",
      intro: [
        "Co nauka i przepisy europejskie naprawdę pozwalają powiedzieć o aloesie, witaminach, trawieniu, śnie czy sprawności ruchowej. Oddzielamy to, co udowodnione, od tego, co wciąż jest badane, i podajemy nasze źródła prawne.",
        "Te artykuły informują; nie zastępują porady lekarza ani farmaceuty, zwłaszcza w ciąży, w trakcie leczenia lub przy utrzymujących się objawach.",
      ],
    },
    beaute: {
      slug: "uroda",
      label: "Uroda",
      description: "Pielęgnacja skóry i włosów inspirowana naturą, bez cudownych obietnic.",
      intro: [
        "Pielęgnacja skóry i włosów z roślinami, przede wszystkim z aloesem. Wyjaśniamy, jak działa każdy składnik, jak zbudować rutynę i jak czytać skład (INCI).",
        "Kosmetyk nawilża, łagodzi, chroni lub poprawia wygląd skóry: nie leczy. Trzymamy się tego, co te produkty mogą naprawdę obiecać.",
      ],
    },
    nutrition: {
      slug: "odzywianie",
      label: "Odżywianie",
      description: "Smaczne i zbilansowane jedzenie, od talerza po szklankę wody.",
      intro: [
        "Urozmaicone, smaczne jedzenie, od talerza po szklankę: nawodnienie, śniadanie, napoje z aloesem, suplementy diety i etykiety wartości odżywczej.",
        "Wyjaśniamy, co oznacza dozwolone oświadczenie zdrowotne i dlaczego suplement nigdy nie zastąpi zbilansowanej diety.",
      ],
    },
  },
  "pt-pt": {
    conseils: {
      slug: "conselhos",
      label: "Conselhos",
      description: "Gestos simples e rotinas realistas para cuidares de ti todos os dias.",
      intro: [
        "Os guias práticos da Aloessential: como escolher um gel de aloe vera, ler um rótulo ou organizar uma rotina matinal. Cada conselho parte de situações concretas e é realista: alguns gestos bem escolhidos valem mais do que uma rotina complicada.",
        "Quando mencionamos um produto, é para ilustrar um critério de escolha, nunca para substituir a informação.",
      ],
    },
    sante: {
      slug: "saude",
      label: "Saúde",
      description: "Compreender o teu corpo, o teu sono e a tua energia, com fontes fiáveis.",
      intro: [
        "O que a ciência e a regulamentação europeia permitem realmente afirmar sobre o aloe vera, as vitaminas, a digestão, o sono ou a mobilidade. Distinguimos o que está demonstrado do que ainda está a ser estudado e citamos as nossas fontes regulamentares.",
        "Estes artigos informam; não substituem o parecer de um médico ou de um farmacêutico, sobretudo em caso de gravidez, tratamento ou sintomas que persistem.",
      ],
    },
    beaute: {
      slug: "beleza",
      label: "Beleza",
      description: "Cuidados com a pele e o cabelo inspirados na natureza, sem promessas milagrosas.",
      intro: [
        "Cuidados com a pele e o cabelo à base de plantas, a começar pelo aloe vera. Explicamos o que faz cada ativo, como construir uma rotina e como ler uma lista de ingredientes (INCI).",
        "Um cosmético hidrata, acalma, protege ou melhora o aspeto da pele: não trata. Ficamo-nos pelo que estes produtos podem realmente prometer.",
      ],
    },
    nutrition: {
      slug: "nutricao",
      label: "Nutrição",
      description: "Uma alimentação saborosa e equilibrada, do prato ao copo de água.",
      intro: [
        "Uma alimentação variada e saborosa, do prato ao copo: hidratação, pequeno-almoço, bebidas de aloe vera, suplementos alimentares e rotulagem nutricional.",
        "Explicamos o que significa uma alegação de saúde autorizada e porque é que um suplemento nunca substitui uma alimentação equilibrada.",
      ],
    },
  },
  es: {
    conseils: {
      slug: "consejos",
      label: "Consejos",
      description: "Gestos sencillos y rutinas realistas para cuidarte cada día.",
      intro: [
        "Las guías prácticas de Aloessential: cómo elegir un gel de aloe vera, leer una etiqueta u organizar una rutina de mañana. Cada consejo parte de situaciones concretas y es realista: unos pocos gestos bien elegidos valen más que una rutina complicada.",
        "Cuando mencionamos un producto, es para ilustrar un criterio de elección, nunca para sustituir la información.",
      ],
    },
    sante: {
      slug: "salud",
      label: "Salud",
      description: "Entender tu cuerpo, tu sueño y tu energía, con fuentes fiables.",
      intro: [
        "Lo que la ciencia y la normativa europea permiten afirmar de verdad sobre el aloe vera, las vitaminas, la digestión, el sueño o la movilidad. Distinguimos lo demostrado de lo que aún se estudia y citamos nuestras fuentes normativas.",
        "Estos artículos informan; no sustituyen la opinión de un médico o un farmacéutico, sobre todo si estás embarazada, sigues un tratamiento o tienes síntomas que no desaparecen.",
      ],
    },
    beaute: {
      slug: "belleza",
      label: "Belleza",
      description: "Cuidado de la piel y del cabello inspirado en la naturaleza, sin promesas milagrosas.",
      intro: [
        "Cuidado de la piel y del cabello con plantas, empezando por el aloe vera. Explicamos qué hace cada activo, cómo construir una rutina y cómo leer una lista de ingredientes (INCI).",
        "Un cosmético hidrata, calma, protege o mejora el aspecto de la piel: no cura. Nos ceñimos a lo que estos productos pueden prometer de verdad.",
      ],
    },
    nutrition: {
      slug: "nutricion",
      label: "Nutrición",
      description: "Una alimentación sabrosa y equilibrada, del plato al vaso de agua.",
      intro: [
        "Una alimentación variada y sabrosa, del plato al vaso: hidratación, desayuno, bebidas de aloe vera, complementos alimenticios y etiquetado nutricional.",
        "Explicamos qué significa una declaración de propiedades saludables autorizada y por qué un complemento nunca sustituye una alimentación equilibrada.",
      ],
    },
  },
  de: {
    conseils: {
      slug: "tipps",
      label: "Tipps",
      description: "Einfache Gewohnheiten und realistische Routinen, um im Alltag gut für sich zu sorgen.",
      intro: [
        "Die praktischen Ratgeber von Aloessential: wie Sie ein Aloe-vera-Gel auswählen, ein Etikett lesen oder eine Morgenroutine gestalten. Jeder Tipp geht von konkreten Situationen aus und bleibt realistisch: Ein paar gut gewählte Gewohnheiten sind mehr wert als eine komplizierte Routine.",
        "Wenn wir ein Produkt erwähnen, dann um ein Auswahlkriterium zu veranschaulichen, nie anstelle der Information.",
      ],
    },
    sante: {
      slug: "gesundheit",
      label: "Gesundheit",
      description: "Körper, Schlaf und Energie besser verstehen, mit verlässlichen Quellen.",
      intro: [
        "Was Wissenschaft und europäisches Recht über Aloe vera, Vitamine, Verdauung, Schlaf oder Beweglichkeit wirklich sagen lassen. Wir trennen Belegtes von dem, was noch erforscht wird, und nennen unsere rechtlichen Quellen.",
        "Diese Artikel informieren; sie ersetzen nicht den Rat einer Ärztin, eines Arztes oder der Apotheke, besonders in der Schwangerschaft, bei laufender Behandlung oder bei anhaltenden Beschwerden.",
      ],
    },
    beaute: {
      slug: "schoenheit",
      label: "Schönheit",
      description: "Haut- und Haarpflege nach dem Vorbild der Natur, ohne Wunderversprechen.",
      intro: [
        "Haut- und Haarpflege mit Pflanzen, allen voran Aloe vera. Wir erklären, was die einzelnen Wirkstoffe tun, wie man eine Pflegeroutine aufbaut und wie man eine Inhaltsstoffliste (INCI) liest.",
        "Ein Kosmetikum spendet Feuchtigkeit, beruhigt, schützt oder verbessert das Aussehen der Haut: Es heilt nicht. Wir halten uns an das, was diese Produkte wirklich versprechen können.",
      ],
    },
    nutrition: {
      slug: "ernaehrung",
      label: "Ernährung",
      description: "Genussvoll und ausgewogen essen, vom Teller bis zum Glas Wasser.",
      intro: [
        "Eine abwechslungsreiche, genussvolle Ernährung, vom Teller bis zum Glas: Flüssigkeitszufuhr, Frühstück, Aloe-vera-Getränke, Nahrungsergänzungsmittel und Nährwertkennzeichnung.",
        "Wir erklären, was eine zugelassene gesundheitsbezogene Angabe bedeutet und warum ein Nahrungsergänzungsmittel nie eine ausgewogene Ernährung ersetzt.",
      ],
    },
  },
  it: {
    conseils: {
      slug: "consigli",
      label: "Consigli",
      description: "Gesti semplici e routine realistiche per prendersi cura di sé ogni giorno.",
      intro: [
        "Le guide pratiche di Aloessential: come scegliere un gel di aloe vera, leggere un'etichetta, organizzare una routine del mattino. Ogni consiglio parte da situazioni concrete e resta realistico: pochi gesti ben scelti valgono più di una routine complicata.",
        "Quando citiamo un prodotto, è per illustrare un criterio di scelta, mai al posto dell'informazione.",
      ],
    },
    sante: {
      slug: "salute",
      label: "Salute",
      description: "Capire il proprio corpo, il sonno e l'energia, con fonti affidabili.",
      intro: [
        "Ciò che la scienza e la normativa europea permettono davvero di affermare sull'aloe vera, le vitamine, la digestione, il sonno o la mobilità. Distinguiamo ciò che è dimostrato da ciò che è ancora in fase di studio e citiamo le nostre fonti normative.",
        "Questi articoli informano; non sostituiscono il parere di un medico o di un farmacista, in particolare in caso di gravidanza, terapie o sintomi che durano.",
      ],
    },
    beaute: {
      slug: "bellezza",
      label: "Bellezza",
      description: "Cura della pelle e dei capelli ispirata alla natura, senza promesse miracolose.",
      intro: [
        "Cura della pelle e dei capelli ispirata alle piante, a cominciare dall'aloe vera. Spieghiamo cosa fa ogni principio attivo, come costruire una routine e come leggere un elenco di ingredienti (INCI).",
        "Un cosmetico idrata, lenisce, protegge o migliora l'aspetto della pelle: non cura. Ci atteniamo a ciò che questi prodotti possono davvero promettere.",
      ],
    },
    nutrition: {
      slug: "nutrizione",
      label: "Nutrizione",
      description: "Un'alimentazione gustosa ed equilibrata, dal piatto al bicchiere d'acqua.",
      intro: [
        "Un'alimentazione varia e gustosa, dal piatto al bicchiere: idratazione, colazione, bevande all'aloe vera, integratori alimentari ed etichette nutrizionali.",
        "Ricordiamo cosa significa un'indicazione autorizzata e perché un integratore non sostituisce mai un'alimentazione equilibrata.",
      ],
    },
  },
};

/** Category text for a locale: French from CATEGORIES, others from CATEGORY_I18N. */
export function localizedCategory(slug: CategorySlug, locale: string): LocalizedCategory {
  if (locale === "fr") return CATEGORIES[slug];
  const text = CATEGORY_I18N[locale]?.[slug];
  if (!text) throw new Error(`No "${locale}" text for category "${slug}" in src/data/categories.ts`);
  return text;
}
