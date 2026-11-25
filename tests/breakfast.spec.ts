import { test, expect } from "./fixtures";
import { BREAKFAST_FOODS, IDEAS, IDEA_TOTALS, breakfastFood } from "../src/data/breakfast";
import { breakfastTotals, shareOf } from "../src/data/breakfast-calc";
import { BREAKFAST_HEADINGS, BREAKFAST_UI } from "../src/i18n/breakfast-ui";
import { articlePath, type Locale } from "../src/i18n/locales";

/* Breakfast ideas table and builder, inside the balanced-breakfast article in every locale. */

const ARTICLES: Record<Locale, string> = {
  fr: "petit-dejeuner-equilibre",
  en: "healthy-breakfast-ideas",
  es: "desayuno-equilibrado-ideas-sencillas",
  de: "ausgewogenes-fruehstueck-ideen",
  it: "colazione-equilibrata-idee-semplici",
  "pt-pt": "pequeno-almoco-equilibrado-ideias-simples",
  pl: "zbilansowane-sniadanie-proste-pomysly",
};

test.describe("breakfast data", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "data checks run once");
  });

  test("every idea uses known foods and the table is sorted by fibre", () => {
    expect(IDEAS).toHaveLength(10);
    for (const idea of IDEAS) for (const item of idea.items) expect(() => breakfastFood(item.code)).not.toThrow();
    const fibre = IDEA_TOTALS.map((i) => i.fibre);
    expect(fibre).toEqual([...fibre].sort((a, b) => b - a));
  });

  test("totals scale Ciqual values per 100 g and report the groups present", () => {
    const oats = breakfastFood("32140");
    const apple = breakfastFood("13039");
    const totals = breakfastTotals(
      [
        { code: "32140", grams: 40 },
        { code: "13039", grams: 150 },
        { code: "unknown", grams: 50 },
      ],
      BREAKFAST_FOODS,
    );
    expect(totals.fibre).toBeCloseTo((oats.fibre * 40 + apple.fibre * 150) / 100, 1);
    expect(totals.kcal % 5).toBe(0);
    expect(Math.abs(totals.kcal - (oats.kcal * 40 + apple.kcal * 150) / 100)).toBeLessThanOrEqual(2.5);
    expect(totals.groups).toEqual(["cereal", "fruit"]);
    expect(breakfastTotals([], BREAKFAST_FOODS)).toEqual({ fibre: 0, kcal: 0, groups: [] });
    expect(shareOf(12.5, 25)).toBe(50);
  });

  test("the low-fibre comparison comes last", () => {
    expect(IDEA_TOTALS.at(-1)?.id).toBe("cornflakes");
  });
});

test.describe("breakfast builder in the article", () => {
  for (const [locale, slug] of Object.entries(ARTICLES) as [Locale, string][]) {
    const b = BREAKFAST_UI[locale];
    test(`${locale}: ${slug} shows the ideas and builds a breakfast`, async ({ page }) => {
      await page.goto(articlePath(locale, slug));
      await expect(page.locator(".breakfast-ideas tbody tr")).toHaveCount(IDEAS.length);
      await expect(page.locator(`.toc a[href="#${BREAKFAST_HEADINGS.builder}"]`)).toHaveCount(1);

      const builder = page.locator("[data-breakfast]");
      await expect(builder).toBeVisible();
      await expect(builder.locator("[data-breakfast-advice]")).toContainText(b.builder.tips.cereal);

      // Load an idea with the three elements.
      await page.locator("#breakfast-idea").selectOption("overnightOats");
      await builder.locator("[data-breakfast-load] button").click();
      await expect(builder.locator("[data-breakfast-items] li")).toHaveCount(4);
      await expect(builder.locator("[data-breakfast-advice]")).toHaveText(b.builder.complete);
      await expect(builder.locator("[data-breakfast-fibre]")).toHaveText(/\d/);

      // Remove everything, then add one food: its usual portion is filled in.
      await builder.locator("[data-breakfast-clear]").click();
      await expect(builder.locator("[data-breakfast-empty]")).toBeVisible();
      await page.locator("#breakfast-food").selectOption("32140");
      await expect(page.locator("#breakfast-grams")).toHaveValue(String(breakfastFood("32140").portion));
      await builder.locator("[data-breakfast-add] button").click();
      await expect(builder.locator('[data-breakfast-groups] [data-group="cereal"]')).toHaveClass("is-present");
      await expect(builder.locator('[data-breakfast-groups] [data-group="fruit"]')).toHaveClass("is-missing");
    });
  }
});

test.describe("breakfast builder without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the ideas table, method and sources are readable; the builder stays hidden", async ({ page }) => {
    await page.goto(articlePath("en", ARTICLES.en));
    await expect(page.locator(".breakfast-ideas tbody tr")).toHaveCount(IDEAS.length);
    await expect(page.locator("[data-breakfast]")).toBeHidden();
    await expect(page.getByRole("heading", { name: BREAKFAST_UI.en.method.title })).toBeVisible();
    await expect(page.locator(".breakfast-sources a")).toHaveCount(3);
  });
});
