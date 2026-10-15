export const CATEGORY_SLUGS = ["conseils", "sante", "beaute", "nutrition"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  /** Accent used by the category tile swatch. */
  swatch: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  conseils: {
    slug: "conseils",
    label: "Conseils",
    description: "Des gestes simples et des routines réalistes pour prendre soin de soi au quotidien.",
    swatch: "var(--color-leaf)",
  },
  sante: {
    slug: "sante",
    label: "Santé",
    description: "Comprendre son corps, son sommeil et son énergie, avec des sources fiables.",
    swatch: "var(--color-forest)",
  },
  beaute: {
    slug: "beaute",
    label: "Beauté",
    description: "Soins de la peau et des cheveux inspirés de la nature, sans promesses miracles.",
    swatch: "var(--color-sun)",
  },
  nutrition: {
    slug: "nutrition",
    label: "Nutrition",
    description: "Une alimentation savoureuse et équilibrée, de l'assiette au verre d'eau.",
    swatch: "var(--color-orange)",
  },
};

export const categoryList = CATEGORY_SLUGS.map((slug) => CATEGORIES[slug]);
