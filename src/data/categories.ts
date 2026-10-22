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
