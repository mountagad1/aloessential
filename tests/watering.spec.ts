import { test, expect } from "./fixtures";
import { BASE_DAYS, MAX_DAYS, MIN_DAYS, SEASONS, plan, seasonOfMonth } from "../src/data/watering";
import { WATERING_UI } from "../src/i18n/watering-ui";

/* Aloe vera watering planner (backlog EAM-03): rules, static fallback, browser tool. */

test.describe("watering planner rules", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "pure functions run once");
  });

  const typical = { pot: "terracotta", drainage: "yes", size: "medium", position: "window", temperature: "mild" } as const;

  test("waters less often in autumn and winter than in spring and summer", () => {
    const days = SEASONS.map((season) => plan({ season, ...typical }).from);
    const [spring, summer, autumn, winter] = days;
    expect(summer).toBeLessThanOrEqual(spring);
    expect(autumn).toBeGreaterThan(spring);
    expect(winter).toBeGreaterThan(autumn);
    expect(BASE_DAYS.winter).toBeGreaterThan(BASE_DAYS.summer);
  });

  test("slower-drying conditions lengthen the rhythm, and ranges stay bounded", () => {
    const base = plan({ season: "spring", ...typical });
    expect(plan({ season: "spring", ...typical, pot: "plastic" }).from).toBeGreaterThan(base.from);
    expect(plan({ season: "spring", ...typical, temperature: "cool" }).from).toBeGreaterThan(base.from);
    expect(plan({ season: "summer", ...typical, size: "small", position: "outdoors", temperature: "hot" }).from).toBeGreaterThanOrEqual(MIN_DAYS);
    const slowest = plan({ season: "winter", pot: "plastic", drainage: "no", size: "large", position: "room", temperature: "cool" });
    expect(slowest.to).toBeLessThanOrEqual(MAX_DAYS);
    expect(slowest.from).toBeLessThanOrEqual(slowest.to);
  });

  test("warns about missing drainage, frost outdoors and the winter rest", () => {
    expect(plan({ season: "spring", ...typical }).warnings).toEqual([]);
    expect(plan({ season: "spring", ...typical, drainage: "no" }).warnings).toContain("drainage");
    expect(plan({ season: "winter", ...typical, position: "outdoors" }).warnings).toEqual(expect.arrayContaining(["frost", "winterRest"]));
  });

  test("months map to northern-hemisphere seasons", () => {
    expect([0, 3, 6, 9].map(seasonOfMonth)).toEqual(["winter", "spring", "summer", "autumn"]);
  });
});

test.describe("watering planner pages", () => {
  for (const [locale, w] of Object.entries(WATERING_UI)) {
    test(`${locale}: ${w.path} computes a rhythm with the browser tool`, async ({ page }) => {
      await page.goto(w.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(w.h1);
      await expect(page.locator("tbody tr")).toHaveCount(4);
      await page.locator("#planner-season").selectOption("spring");
      await page.locator("#planner-drainage").selectOption("no");
      await page.locator(".planner__form button").click();
      const result = page.locator("[data-planner-result]");
      await expect(result).toBeVisible();
      await expect(result).toContainText(w.warnings.drainage);
      await expect(result.locator(".planner__rhythm")).toHaveText(/\d/);
    });
  }

  test("the planner is linked from the aloe vera page", async ({ page }) => {
    await page.goto("/aloe-vera/");
    await expect(page.locator(`a[href="${WATERING_UI.fr.path}"]`).first()).toBeVisible();
  });
});

test.describe("watering planner without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the summary table, method and sources are readable; the inert form stays hidden", async ({ page }) => {
    await page.goto(WATERING_UI.fr.path);
    await expect(page.locator(".planner__form")).toBeHidden();
    await expect(page.locator("tbody tr")).toHaveCount(4);
    await expect(page.getByRole("heading", { name: WATERING_UI.fr.method.title })).toBeVisible();
    await expect(page.locator(".sources a")).toHaveCount(3);
  });
});
