import { test, expect } from "./fixtures";

const animationName = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => getComputedStyle(el).animationName);

test.describe("homepage harvest stage", () => {
  test("opens with the page scroll and never holds it", async ({ page }) => {
    await page.goto("/");
    expect(await animationName(page, ".hero-stage__frame")).toBe("stage-open");
    // Scrolling moves the page normally: nothing intercepts wheel or scroll.
    await page.mouse.wheel(0, 600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
    await expect(page.locator(".hero-stage__img")).toHaveAttribute("alt", /cueilleuse/);
  });

  test("stays framed and still with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    expect(await animationName(page, ".hero-stage__frame")).toBe("none");
    expect(await animationName(page, ".hero-stage__img")).toBe("none");
    await context.close();
  });
});

test.describe("production line", () => {
  test("lists the six steps in order", async ({ page }) => {
    await page.goto("/");
    const steps = page.locator(".production__step h3");
    await expect(steps).toHaveCount(6);
    await expect(steps.first()).toHaveText("Culture");
    await expect(steps.last()).toHaveText("Contrôle et flacon");
  });
});
