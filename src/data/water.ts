/*
 * "How much water per day" calculator (backlog EAM-02). Reference values
 * only, never a personal prescription: the page names the cases that need a
 * doctor's advice instead.
 *
 * Adequate intakes of total water (drinks plus food moisture) from the EFSA
 * Scientific Opinion on Dietary Reference Values for water (EFSA Journal
 * 2010;8(3):1459), valid at moderate temperature and moderate physical
 * activity. EFSA assumed food supplies 20–30 % of total water; Guelinckx et
 * al. (Nutrients 2016) found French and UK survey data consistent with that.
 */

export const PROFILES = ["woman", "man", "pregnant", "breastfeeding", "girl9", "boy9", "child4", "child2"] as const;
export type Profile = (typeof PROFILES)[number];

/** Adequate intake of total water, mL per day (EFSA 2010). */
export const ADEQUATE_INTAKE_ML: Record<Profile, number> = {
  woman: 2000,
  man: 2500,
  /** Non-pregnant value plus 300 mL/day. */
  pregnant: 2300,
  /** About 700 mL/day above the non-lactating value. */
  breastfeeding: 2700,
  girl9: 1900,
  boy9: 2100,
  child4: 1600,
  child2: 1300,
};

/** Share of total water assumed to come from food (EFSA): drinks supply the rest. */
export const FOOD_SHARE = { min: 0.2, max: 0.3 } as const;
export const GLASS_ML = 250;

export const SITUATIONS = ["heat", "activity", "illness"] as const;
export type Situation = (typeof SITUATIONS)[number];

export interface WaterResult {
  /** Total water, litres per day. */
  total: number;
  /** From drinks, litres per day. */
  drinksMin: number;
  drinksMax: number;
  /** Glasses of 250 mL. */
  glassesMin: number;
  glassesMax: number;
  /** Situations that raise needs, as notes: EFSA gives no figure for them. */
  notes: Situation[];
}

const litres = (ml: number) => Math.round(ml / 100) / 10;

export function waterNeeds(profile: Profile, situations: Situation[] = []): WaterResult {
  const ai = ADEQUATE_INTAKE_ML[profile];
  const drinksMin = ai * (1 - FOOD_SHARE.max);
  const drinksMax = ai * (1 - FOOD_SHARE.min);
  return {
    total: litres(ai),
    drinksMin: litres(drinksMin),
    drinksMax: litres(drinksMax),
    glassesMin: Math.round(drinksMin / GLASS_ML),
    glassesMax: Math.round(drinksMax / GLASS_ML),
    notes: SITUATIONS.filter((s) => situations.includes(s)),
  };
}

export const WATER_SOURCES = [
  {
    publisher: "EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA)",
    title: "Scientific Opinion on Dietary Reference Values for water, EFSA Journal 2010;8(3):1459",
    url: "https://doi.org/10.2903/j.efsa.2010.1459",
  },
  {
    publisher: "Guelinckx I. et al., Nutrients 2016;8(10):630",
    title: "Contribution of Water from Food and Fluids to Total Water Intake: Analysis of a French and UK Population Surveys",
    url: "https://doi.org/10.3390/nu8100630",
  },
  {
    publisher: "NHS",
    title: "Water, drinks and hydration",
    url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/",
  },
] as const;
