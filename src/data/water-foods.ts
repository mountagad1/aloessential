/*
 * Water-rich foods table of the water-per-day calculator (backlog EAM-02):
 * the foods of src/data/foods.ts (Anses Ciqual 2025) with at least
 * MIN_WATER grams of water per 100 g. One gram of water is about one
 * millilitre. Server-side only.
 */
import { FOOD_DATA, type FoodData } from "./foods";

export const MIN_WATER = 80;

export interface WaterFood extends FoodData {
  water: number;
  /** Grams (≈ millilitres) of water in one usual portion. */
  waterPerPortion: number;
}

export const WATER_FOODS: WaterFood[] = FOOD_DATA.filter((f): f is WaterFood => f.water !== null && f.water >= MIN_WATER)
  .map((f) => ({ ...f, waterPerPortion: Math.round((f.water * f.portion) / 100) }))
  .sort((a, b) => b.water - a.water);
