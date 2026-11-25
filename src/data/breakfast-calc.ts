/*
 * Totals of a breakfast, kept free of data imports so the browser script of
 * the breakfast builder (src/components/BreakfastBuilder.astro) stays small.
 */

/** The article's rule: a cereal or bread, a fruit or vegetable, and dairy, nuts or seeds. */
export const GROUPS = ["cereal", "fruit", "protein"] as const;
export type Group = (typeof GROUPS)[number];

export interface BreakfastFood {
  code: string;
  /** null for extras that belong to none of the three groups (cocoa, chocolate). */
  group: Group | null;
  /** Grams of fibre per 100 g. */
  fibre: number;
  /** kcal per 100 g. */
  kcal: number;
}

export interface BreakfastTotals {
  /** Grams of fibre, one decimal. */
  fibre: number;
  /** kcal, rounded to 5. */
  kcal: number;
  /** Groups present, in GROUPS order. */
  groups: Group[];
}

/** Totals of a list of foods eaten, in grams. Unknown codes are ignored. */
export function breakfastTotals(items: { code: string; grams: number }[], foods: BreakfastFood[]): BreakfastTotals {
  let fibre = 0;
  let kcal = 0;
  const present = new Set<Group>();
  for (const { code, grams } of items) {
    const food = foods.find((f) => f.code === code);
    if (!food || !(grams > 0)) continue;
    fibre += (food.fibre * grams) / 100;
    kcal += (food.kcal * grams) / 100;
    if (food.group) present.add(food.group);
  }
  return {
    fibre: Math.round(fibre * 10) / 10,
    kcal: Math.round(kcal / 5) * 5,
    groups: GROUPS.filter((g) => present.has(g)),
  };
}

/** Share of a daily reference, in whole percent. */
export function shareOf(total: number, reference: number): number {
  return reference > 0 ? Math.round((total / reference) * 100) : 0;
}
