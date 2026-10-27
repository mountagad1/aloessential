import { test, expect } from "./fixtures";
import { readFileSync } from "node:fs";
import { CATEGORIES, FOODS, fibreLabel } from "../src/data/fibre";
import { dailyFibre } from "../src/data/fibre-calc";
import { FIBRE_UI } from "../src/i18n/fibre-ui";
import { LOCALE_CODES } from "../src/i18n/locales";

/* High-fibre foods table and daily calculator (backlog EAM-01): data, static table, browser tool. */

test.describe("fibre data", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "data checks run once");
  });

  test("every food has Ciqual values, a known category, a portion and a name in every locale", () => {
    const ciqual = JSON.parse(readFileSync("src/data/ciqual-values.json", "utf8"));
    expect(ciqual.source.licence).toContain("Licence Ouverte");
    expect(FOODS.length).toBeGreaterThanOrEqual(90);
    expect(new Set(FOODS.map((f) => f.code)).size).toBe(FOODS.length);
    for (const f of FOODS) {
      expect(f.fibre, f.code).toBeGreaterThanOrEqual(0);
      expect(CATEGORIES, f.code).toContain(f.category);
      expect(f.portion, f.code).toBeGreaterThan(0);
      for (const l of LOCALE_CODES) expect(f.names[l], `${f.code} ${l}`).toBeTruthy();
    }
  });

  test("labels follow the EU claim thresholds per 100 g or per 100 kcal", () => {
    expect(fibreLabel(6, 300)).toBe("high");
    expect(fibreLabel(5.9, 300)).toBe("source");
    expect(fibreLabel(3, 300)).toBe("source");
    expect(fibreLabel(2.9, 300)).toBe("none");
    expect(fibreLabel(1, 30)).toBe("high"); // 3.3 g per 100 kcal
    expect(fibreLabel(0.5, 30)).toBe("source"); // 1.7 g per 100 kcal
    expect(FOODS.find((f) => f.code === "9621")?.label).toBe("high"); // wheat bran
  });

  test("the table is sorted by fibre per 100 g and portions add up", () => {
    const values = FOODS.map((f) => f.fibre);
    expect(values).toEqual([...values].sort((a, b) => b - a));
    const lentils = FOODS.find((f) => f.code === "20587")!;
    expect(lentils.fibrePerPortion).toBeCloseTo((lentils.fibre * lentils.portion) / 100, 1);
    expect(dailyFibre({ "20587": 1, "9621": 2 }, FOODS)).toBeCloseTo(
      lentils.fibrePerPortion + 2 * FOODS.find((f) => f.code === "9621")!.fibrePerPortion,
      1,
    );
  });
});

test.describe("fibre table pages", () => {
  for (const [locale, f] of Object.entries(FIBRE_UI)) {
    test(`${locale}: ${f.path} filters the table and adds up a day`, async ({ page }) => {
      await page.goto(f.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(f.h1);
      const rows = page.locator("[data-fibre-rows] tr");
      await expect(rows).toHaveCount(FOODS.length);
      await page.locator("#fibre-category").selectOption("legumes");
      await expect(page.locator("[data-fibre-rows] tr:visible")).toHaveCount(FOODS.filter((x) => x.category === "legumes").length);
      await page.locator("#fibre-food").selectOption("20587");
      await page.locator("#fibre-portions").fill("2");
      await page.locator("[data-fibre-add] button").click();
      await expect(page.locator("[data-fibre-day] li")).toHaveCount(1);
      await expect(page.locator("[data-fibre-total]")).toContainText(/\d/);
    });
  }
});

test.describe("fibre table without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the full table, method, licence and sources are readable; the tools stay hidden", async ({ page }) => {
    await page.goto(FIBRE_UI.fr.path);
    await expect(page.locator("[data-fibre-rows] tr")).toHaveCount(FOODS.length);
    await expect(page.locator("[data-fibre-filters]")).toBeHidden();
    await expect(page.locator("[data-fibre-calculator]")).toBeHidden();
    await expect(page.locator(".prose")).toContainText("Licence Ouverte 2.0");
    await expect(page.locator(".sources a")).toHaveCount(4);
  });
});
