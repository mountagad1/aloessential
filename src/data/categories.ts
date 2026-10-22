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
