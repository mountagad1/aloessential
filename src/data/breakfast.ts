/*
 * Breakfast builder of the balanced-breakfast article (all locales): a table
 * of breakfast ideas with their fibre and energy, and a browser tool to build
 * one's own breakfast.
 *
 * Values: Anses Ciqual 2025 through src/data/foods.ts. Only foods with a
 * Ciqual value are counted; what is not in the table (milk, honey, oil, a hot
 * drink) is left out, and the page says so. Server-side only: the browser
 * script receives the few numbers it needs from the page.
 */
import { FOOD_DATA, type FoodData } from "./foods";
import { DAILY_REFERENCES, FIBRE_SOURCES } from "./fibre";
import { breakfastTotals, type BreakfastFood, type Group } from "./breakfast-calc";

export { GROUPS, breakfastTotals, type BreakfastFood, type Group } from "./breakfast-calc";

/*
 * Foods offered in the builder, by Ciqual code, with their group. The groups
 * follow the article's rule (fibre, protein, fruit): a cereal or bread, a
 * fruit or vegetable, and dairy, nuts or seeds.
 */
const BREAKFAST_GROUPS: Record<string, Group | null> = {
  // Cereals and breads
  "32140": "cereal", // rolled oats
  "32004": "cereal", // muesli
  "32014": "cereal", // cornflakes
  "7110": "cereal", // wholemeal bread
  "7115": "cereal", // bran bread
  "7125": "cereal", // rye and wheat bread
  "7001": "cereal", // baguette
  "7340": "cereal", // wholewheat rusks
  "9621": "cereal", // wheat bran
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
  // Dairy, nuts and seeds
  "19593": "protein", // plain yoghurt
  "19501": "protein", // fromage frais
  "15000": "protein", // almonds
  "15005": "protein", // walnuts
  "15004": "protein", // hazelnuts
  "15202": "protein", // peanut butter
  "15047": "protein", // chia seeds
  "15034": "protein", // linseeds
  "15064": "protein", // pumpkin seeds
  // Extras
  "18100": null, // unsweetened cocoa
  "31074": null, // dark chocolate
};

export interface BreakfastFoodData extends BreakfastFood {
  names: FoodData["names"];
  /** Usual portion, grams (src/data/foods.json). */
  portion: number;
}

const byCode = new Map(FOOD_DATA.map((f) => [f.code, f]));

export const BREAKFAST_FOODS: BreakfastFoodData[] = Object.entries(BREAKFAST_GROUPS).map(([code, group]) => {
  const f = byCode.get(code);
  if (!f) throw new Error(`Breakfast food ${code} is not in src/data/foods.json`);
  return {
    code,
    group,
    fibre: f.fibre,
    kcal: f.kcal,
    names: f.names,
    portion: f.portion,
  };
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
  | "cornflakes";

/** Breakfast ideas: grams of each food. The first five are the article's own. */
export const IDEAS: { id: IdeaId; items: { code: string; grams: number }[] }[] = [
  { id: "overnightOats", items: [{ code: "32140", grams: 40 }, { code: "19593", grams: 125 }, { code: "13015", grams: 100 }, { code: "15000", grams: 15 }] },
  { id: "wholemealToast", items: [{ code: "7110", grams: 60 }, { code: "19501", grams: 60 }, { code: "20276", grams: 120 }] },
  { id: "yoghurtBowl", items: [{ code: "19593", grams: 125 }, { code: "15047", grams: 10 }, { code: "13037", grams: 150 }] },
  { id: "smoothie", items: [{ code: "13005", grams: 120 }, { code: "20059", grams: 30 }, { code: "19593", grams: 125 }, { code: "32140", grams: 20 }] },
  { id: "express", items: [{ code: "15000", grams: 30 }, { code: "13039", grams: 150 }] },
  { id: "muesli", items: [{ code: "32004", grams: 40 }, { code: "19593", grams: 125 }, { code: "13028", grams: 100 }] },
  { id: "peanutToast", items: [{ code: "7110", grams: 60 }, { code: "15202", grams: 15 }, { code: "13005", grams: 120 }] },
  { id: "avocadoToast", items: [{ code: "7125", grams: 60 }, { code: "13004", grams: 75 }, { code: "20276", grams: 120 }] },
  { id: "fromageKiwi", items: [{ code: "19501", grams: 100 }, { code: "13021", grams: 160 }, { code: "15034", grams: 10 }] },
  { id: "cornflakes", items: [{ code: "32014", grams: 30 }, { code: "19593", grams: 125 }] },
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

/** Ciqual and the daily fibre references (EFSA, SACN), as on the fibre table. */
export const BREAKFAST_SOURCES = FIBRE_SOURCES.filter((s) => !s.url.includes("eur-lex"));
