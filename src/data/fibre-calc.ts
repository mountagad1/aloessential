/*
 * Daily fibre total, kept free of data imports so the browser script of the
 * fibre table (src/components/FibreTableView.astro) stays small.
 */

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Total fibre of a day's selection: food code → number of portions. */
export function dailyFibre(selection: Record<string, number>, foods: { code: string; fibrePerPortion: number }[]): number {
  return round1(foods.reduce((sum, f) => sum + (selection[f.code] ?? 0) * f.fibrePerPortion, 0));
}
