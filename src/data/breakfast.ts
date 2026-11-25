/*
 * Breakfast builder of the balanced-breakfast article (all locales): a table
 * of breakfast ideas with their fibre, protein and energy, and a browser tool
 * to build one's own breakfast.
 *
 * Values: Anses Ciqual 2025 through src/data/foods.ts: the foods of the fibre
 * table plus a few that only the builder offers (src/data/breakfast-foods.json:
 * milk, egg, honey…). Coffee and tea without milk are not counted, and the
 * page says so. Server-side only: the browser script receives the few numbers
 * it needs from the page.
 */
import { BREAKFAST_ONLY_DATA, FOOD_DATA, type FoodData } from "./foods";
import { DAILY_REFERENCES, FIBRE_SOURCES } from "./fibre";
import { breakfastTotals, type BreakfastFood, type Group } from "./breakfast-calc";

export { GROUPS, breakfastTotals, type BreakfastFood, type Group } from "./breakfast-calc";

/*
 * Foods offered in the builder, by Ciqual code, with their group. The groups
 * follow the article's rule (fibre, protein, fruit): a cereal or bread, a
 * fruit or vegetable, and a protein food (dairy, egg, ham, nuts or seeds).
 * Juice does not count as fruit: the article recommends the whole fruit.
 */
const BREAKFAST_GROUPS: Record<string, Group | null> = {
  // Cereals and breads
  "32140": "cereal", // rolled oats
  "32004": "cereal", // muesli
  "32014": "cereal", // cornflakes
  "7110": "cereal", // wholemeal bread
  "7115": "cereal", // bran bread
  "7125": "cereal", // rye and wheat bread
  "7002": "cereal", // sourdough bread
  "7001": "cereal", // baguette
  "7340": "cereal", // wholewheat rusks
  "9621": "cereal", // wheat bran
  "7603": "cereal", // croissant
  // Fruit and vegetables
  "13005": "fruit", // banana
  "13039": "fruit", // apple
  "13037": "fruit", // pear
  "13021": "fruit", // kiwi
  "13034": "fruit", // orange
  "13024": "fruit", // clementines
  "13015": "fruit", // raspberries
  "13028": "fruit", // blueberries
  "13014": "fruit", // strawberries
  "13025": "fruit", // mango
  "13004": "fruit", // avocado
  "20276": "fruit", // tomato
  "20059": "fruit", // raw spinach
  "13042": "fruit", // prunes
  "13001": "fruit", // dried apricots
  "13011": "fruit", // dates
  "13046": "fruit", // raisins
  // Protein foods
  "19593": "protein", // plain yoghurt
  "19501": "protein", // fromage frais
  "19033": "protein", // semi-skimmed milk
  "18900": "protein", // soya drink
  "22010": "protein", // hard-boiled egg
  "12115": "protein", // emmental
  "28900": "protein", // cooked ham
  "15000": "protein", // almonds
  "15005": "protein", // walnuts
  "15004": "protein", // hazelnuts
  "15202": "protein", // peanut butter
  "15047": "protein", // chia seeds
  "15034": "protein", // linseeds
  "15064": "protein", // pumpkin seeds
  // Extras: in none of the three groups
  "18899": null, // oat drink (little protein)
  "2070": null, // orange juice
  "31008": null, // honey
  "31006": null, // jam
  "16400": null, // butter
  "17270": null, // olive oil
  "18100": null, // unsweetened cocoa
  "31074": null, // dark chocolate
};

export interface BreakfastFoodData extends BreakfastFood {
  names: FoodData["names"];
  /** Usual portion, grams. */
  portion: number;
}

const byCode = new Map([...FOOD_DATA, ...BREAKFAST_ONLY_DATA].map((f) => [f.code, f]));

export const BREAKFAST_FOODS: BreakfastFoodData[] = Object.entries(BREAKFAST_GROUPS).map(([code, group]) => {
  const f = byCode.get(code);
  if (!f) throw new Error(`Breakfast food ${code} is in neither src/data/foods.json nor src/data/breakfast-foods.json`);
  return { code, group, fibre: f.fibre, kcal: f.kcal, protein: f.protein, names: f.names, portion: f.portion };
});

export type IdeaId =
  | "overnightOats"
  | "wholemealToast"
  | "yoghurtBowl"
  | "smoothie"
  | "express"
  | "muesli"
  | "peanutToast"
  | "avocadoToast"
  | "fromageKiwi"
  | "cornflakes"
  | "croissant";

/** Breakfast ideas: grams of each food. The first five are the article's own; the last two are for comparison. */
export const IDEAS: { id: IdeaId; items: { code: string; grams: number }[] }[] = [
  { id: "overnightOats", items: [{ code: "32140", grams: 40 }, { code: "19033", grams: 150 }, { code: "13015", grams: 100 }, { code: "15000", grams: 15 }] },
  { id: "wholemealToast", items: [{ code: "7110", grams: 60 }, { code: "22010", grams: 50 }, { code: "20276", grams: 120 }, { code: "17270", grams: 5 }] },
  { id: "yoghurtBowl", items: [{ code: "19593", grams: 125 }, { code: "15047", grams: 10 }, { code: "13037", grams: 150 }, { code: "31008", grams: 5 }] },
  { id: "smoothie", items: [{ code: "13005", grams: 120 }, { code: "20059", grams: 30 }, { code: "19593", grams: 125 }, { code: "32140", grams: 20 }] },
  { id: "express", items: [{ code: "15000", grams: 30 }, { code: "13039", grams: 150 }] },
  { id: "muesli", items: [{ code: "32004", grams: 40 }, { code: "19033", grams: 150 }, { code: "13028", grams: 100 }] },
  { id: "peanutToast", items: [{ code: "7110", grams: 60 }, { code: "15202", grams: 15 }, { code: "13005", grams: 120 }] },
  { id: "avocadoToast", items: [{ code: "7125", grams: 60 }, { code: "13004", grams: 75 }, { code: "20276", grams: 120 }] },
  { id: "fromageKiwi", items: [{ code: "19501", grams: 100 }, { code: "13021", grams: 160 }, { code: "15034", grams: 10 }] },
  { id: "croissant", items: [{ code: "7603", grams: 60 }, { code: "2070", grams: 150 }] },
  { id: "cornflakes", items: [{ code: "32014", grams: 30 }, { code: "19033", grams: 150 }] },
];

const foodsByCode = new Map(BREAKFAST_FOODS.map((f) => [f.code, f]));

export function breakfastFood(code: string): BreakfastFoodData {
  const f = foodsByCode.get(code);
  if (!f) throw new Error(`Unknown breakfast food ${code}`);
  return f;
}

/** Ideas with their totals, richest in fibre first. */
export const IDEA_TOTALS = IDEAS.map((idea) => ({
  ...idea,
  ...breakfastTotals(idea.items, BREAKFAST_FOODS),
})).sort((a, b) => b.fibre - a.fibre);

export { DAILY_REFERENCES };

/** Ciqual and the daily fibre references (EFSA, SACN), as on the fibre table, plus the EU labelling rule for protein. */
export const BREAKFAST_SOURCES = [
  ...FIBRE_SOURCES.filter((s) => !s.url.includes("eur-lex")),
  {
    publisher: "European Union",
    title: "Regulation (EU) No 1169/2011 on the provision of food information to consumers, annex I (protein = nitrogen × 6.25)",
    url: "https://eur-lex.europa.eu/eli/reg/2011/1169/oj",
  },
];
