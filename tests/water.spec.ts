import { test, expect } from "./fixtures";
import { ADEQUATE_INTAKE_ML, PROFILES, waterNeeds } from "../src/data/water";
import { WATER_UI } from "../src/i18n/water-ui";
import { MIN_WATER, WATER_FOODS } from "../src/data/water-foods";

/* "How much water per day" calculator (backlog EAM-02): EFSA values, static fallback, browser tool. */

test.describe("water calculator values", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "pure functions run once");
  });

  test("uses the EFSA adequate intakes of total water", () => {
    expect(ADEQUATE_INTAKE_ML).toEqual({
      woman: 2000,
      man: 2500,
      pregnant: 2300,
      breastfeeding: 2700,
      girl9: 1900,
      boy9: 2100,
      child4: 1600,
      child2: 1300,
    });
  });

  test("drinks cover 70 to 80 % of total water, in 250 ml glasses", () => {
    expect(waterNeeds("woman")).toMatchObject({ total: 2, drinksMin: 1.4, drinksMax: 1.6, glassesMin: 6, glassesMax: 6 });
    expect(waterNeeds("man")).toMatchObject({ total: 2.5, drinksMin: 1.8, drinksMax: 2, glassesMin: 7, glassesMax: 8 });
    for (const p of PROFILES) {
      const r = waterNeeds(p);
      expect(r.drinksMin).toBeLessThan(r.total);
      expect(r.drinksMin).toBeLessThanOrEqual(r.drinksMax);
    }
  });

  test("situations add notes, never a number", () => {
    const base = waterNeeds("woman");
    const hot = waterNeeds("woman", ["heat", "illness"]);
    expect(hot.notes).toEqual(["heat", "illness"]);
    expect({ ...hot, notes: [] }).toEqual(base);
  });
});

test.describe("water-rich foods", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "data checks run once");
  });

  test("lists the foods with at least MIN_WATER g of water per 100 g, richest first", () => {
    expect(WATER_FOODS.length).toBeGreaterThanOrEqual(40);
    const values = WATER_FOODS.map((f) => f.water);
    expect(values).toEqual([...values].sort((a, b) => b - a));
    for (const f of WATER_FOODS) {
      expect(f.water, f.code).toBeGreaterThanOrEqual(MIN_WATER);
      expect(f.waterPerPortion, f.code).toBe(Math.round((f.water * f.portion) / 100));
    }
    expect(WATER_FOODS.map((f) => f.code)).toContain("13036"); // watermelon
  });
});

test.describe("water calculator pages", () => {
  for (const [locale, w] of Object.entries(WATER_UI)) {
    test(`${locale}: ${w.path} shows the reference values with the browser tool`, async ({ page }) => {
      await page.goto(w.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(w.h1);
      await expect(page.locator("table").first().locator("tbody tr")).toHaveCount(PROFILES.length);
      await expect(page.locator("table.water-foods tbody tr")).toHaveCount(WATER_FOODS.length);
      await page.locator("#water-profile").selectOption("man");
      await page.locator('input[value="heat"]').check();
      await page.locator(".tool__form button").click();
      const result = page.locator("[data-water-result]");
      await expect(result.locator(".tool__headline")).toContainText("2");
      await expect(result).toContainText(w.result.notes.heat);
      await expect(page.getByRole("heading", { name: w.doctor.title })).toBeVisible();
    });
  }
});

test.describe("water calculator without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the reference table, medical advice and sources are readable; the inert form stays hidden", async ({ page }) => {
    await page.goto(WATER_UI.fr.path);
    await expect(page.locator(".tool__form")).toBeHidden();
    await expect(page.locator("table").first().locator("tbody tr")).toHaveCount(PROFILES.length);
    await expect(page.locator("table").first().locator("tbody")).toContainText("2,0 L");
    await expect(page.locator("table.water-foods tbody tr")).toHaveCount(WATER_FOODS.length);
    await expect(page.locator(".prose")).toContainText("Licence Ouverte 2.0");
    await expect(page.getByRole("heading", { name: WATER_UI.fr.doctor.title })).toBeVisible();
    await expect(page.locator(".sources a")).toHaveCount(4);
  });
});
