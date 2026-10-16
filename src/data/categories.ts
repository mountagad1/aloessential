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
