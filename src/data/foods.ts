/*
 * Food composition data shared by the fibre table (src/data/fibre.ts) and the
 * water-rich foods table (src/data/water-foods.ts).
 *
 * Values: Anses Ciqual 2025 (src/data/ciqual-values.json, extracted by
 * tools/extract-ciqual.py, Etalab Open Licence 2.0). Food selection, names in
 * every locale and usual portions: src/data/foods.json; portions are
 * Aloessential's estimate of a usual serving, stated as such on the pages.
 * Server-side only: browser scripts must not import it (it carries all the data).
 */
import foodsJson from "./foods.json" with { type: "json" };
import ciqual from "./ciqual-values.json" with { type: "json" };
import type { Locale } from "../i18n/locales";

export const CATEGORIES = ["legumes", "grains", "vegetables", "fruits", "dried", "nuts", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface FoodData {
  code: string;
  category: Category;
  /** Usual portion, grams. */
  portion: number;
  names: Record<Locale, string>;
  /** Grams of fibre per 100 g. */
  fibre: number;
  /** kcal per 100 g (Regulation (EU) No 1169/2011 factors). */
  kcal: number;
  /** Grams of water per 100 g; null when Ciqual gives no value. */
  water: number | null;
}

type FoodEntry = { code: string; cat: string; portion: number; names: Record<Locale, string> };
type CiqualEntry = { fibre: number; kcal: number; water: number | null };

export const FOOD_DATA: FoodData[] = (foodsJson as FoodEntry[]).map((f) => {
  const values = (ciqual.foods as Record<string, CiqualEntry>)[f.code];
  if (!values) throw new Error(`Food ${f.code} has no Ciqual values: run tools/extract-ciqual.py`);
  if (!CATEGORIES.includes(f.cat as Category)) throw new Error(`Food ${f.code}: unknown category "${f.cat}"`);
  return {
    code: f.code,
    category: f.cat as Category,
    portion: f.portion,
    names: f.names,
    fibre: values.fibre,
    kcal: values.kcal,
    water: values.water,
  };
});

export const CIQUAL_SOURCE = ciqual.source;

/** The Ciqual table, as listed in a page's sources. */
export const CIQUAL_REFERENCE = {
  publisher: "Anses",
  title: "Table de composition nutritionnelle des aliments Ciqual 2025",
  url: "https://doi.org/10.57745/RDMHWY",
} as const;
