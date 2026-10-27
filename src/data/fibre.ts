/*
 * High-fibre foods table and daily fibre calculator (backlog EAM-01).
 *
 * Values: Anses Ciqual 2025 (src/data/ciqual-values.json, extracted by
 * tools/extract-ciqual.py, Etalab Open Licence 2.0). Food selection, names in
 * every locale and usual portions: src/data/foods.json; portions are
 * Aloessential's estimate of a usual serving, stated as such on the page.
 *
 * Labels use the conditions of the EU nutrition claims (Regulation (EC)
 * No 1924/2006, annex), as regulatory definitions applied to foods for
 * comparison, not as claims about any product.
 */
import foodsJson from "./foods.json" with { type: "json" };
import ciqual from "./ciqual-values.json" with { type: "json" };
import type { Locale } from "../i18n/locales";

export const CATEGORIES = ["legumes", "grains", "vegetables", "fruits", "dried", "nuts", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

export type FibreLabel = "high" | "source" | "none";

export interface Food {
  code: string;
  category: Category;
  /** Usual portion, grams. */
  portion: number;
  names: Record<Locale, string>;
  /** Grams per 100 g. */
  fibre: number;
  /** kcal per 100 g (Regulation (EU) No 1169/2011 factors). */
  kcal: number;
  /** Grams of fibre in one usual portion, one decimal. */
  fibrePerPortion: number;
  label: FibreLabel;
}

/** Regulation (EC) No 1924/2006, annex: "source of fibre" and "high fibre". */
export const CLAIM_THRESHOLDS = {
  source: { per100g: 3, per100kcal: 1.5 },
  high: { per100g: 6, per100kcal: 3 },
} as const;

/** Daily references for adults, grams. */
export const DAILY_REFERENCES = {
  /** EFSA (2010): adequate for normal bowel function in adults. */
  efsa: 25,
  /** Target of several national bodies, for example SACN (UK, 2015). */
  national: 30,
} as const;

export function fibreLabel(fibre: number, kcal: number): FibreLabel {
  const per100kcal = kcal > 0 ? (fibre / kcal) * 100 : 0;
  const meets = (t: { per100g: number; per100kcal: number }) => fibre >= t.per100g || per100kcal >= t.per100kcal;
  if (meets(CLAIM_THRESHOLDS.high)) return "high";
  if (meets(CLAIM_THRESHOLDS.source)) return "source";
  return "none";
}

const round1 = (n: number) => Math.round(n * 10) / 10;

type FoodEntry = { code: string; cat: string; portion: number; names: Record<Locale, string> };
type CiqualEntry = { fibre: number; kcal: number };

export const FOODS: Food[] = (foodsJson as FoodEntry[])
  .map((f) => {
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
      fibrePerPortion: round1((values.fibre * f.portion) / 100),
      label: fibreLabel(values.fibre, values.kcal),
    };
  })
  .sort((a, b) => b.fibre - a.fibre);

export const CIQUAL_SOURCE = ciqual.source;

export { dailyFibre } from "./fibre-calc";

export const FIBRE_SOURCES = [
  {
    publisher: "Anses",
    title: "Table de composition nutritionnelle des aliments Ciqual 2025",
    url: "https://doi.org/10.57745/RDMHWY",
  },
  {
    publisher: "European Union",
    title: "Regulation (EC) No 1924/2006 on nutrition and health claims made on foods, annex",
    url: "https://eur-lex.europa.eu/eli/reg/2006/1924/oj",
  },
  {
    publisher: "EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA)",
    title: "Scientific Opinion on Dietary Reference Values for carbohydrates and dietary fibre, EFSA Journal 2010;8(3):1462",
    url: "https://doi.org/10.2903/j.efsa.2010.1462",
  },
  {
    publisher: "Scientific Advisory Committee on Nutrition (SACN)",
    title: "Carbohydrates and Health (2015)",
    url: "https://assets.publishing.service.gov.uk/media/5a7f7cc3ed915d74e622ac2a/SACN_Carbohydrates_and_Health.pdf",
  },
] as const;
