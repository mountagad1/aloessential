/*
 * High-fibre foods table and daily fibre calculator (backlog EAM-01).
 *
 * Foods and values: src/data/foods.ts (Anses Ciqual 2025).
 *
 * Labels use the conditions of the EU nutrition claims (Regulation (EC)
 * No 1924/2006, annex), as regulatory definitions applied to foods for
 * comparison, not as claims about any product.
 */
import { CIQUAL_REFERENCE, FOOD_DATA, type FoodData } from "./foods";

export { CATEGORIES, CIQUAL_SOURCE, type Category } from "./foods";

export type FibreLabel = "high" | "source" | "none";

export interface Food extends FoodData {
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

export const FOODS: Food[] = FOOD_DATA.map((f) => ({
  ...f,
  fibrePerPortion: round1((f.fibre * f.portion) / 100),
  label: fibreLabel(f.fibre, f.kcal),
})).sort((a, b) => b.fibre - a.fibre);

export { dailyFibre } from "./fibre-calc";

export const FIBRE_SOURCES = [
  CIQUAL_REFERENCE,
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
