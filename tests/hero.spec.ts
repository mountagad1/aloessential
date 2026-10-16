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

  test("the photo comes before the introduction, and « Du champ au flacon » arrives with the scroll", async ({ page }) => {
    await page.goto("/");
    const stage = await page.locator(".hero-stage").boundingBox();
    const title = await page.locator(".hero__title").boundingBox();
    expect(title!.y).toBeGreaterThan(stage!.y + stage!.height);
    const words = page.locator(".hero-stage__title span").first();
    expect(Number(await words.evaluate((el) => getComputedStyle(el).opacity))).toBeLessThan(0.2);
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.5, behavior: "instant" }));
    await expect.poll(async () => Number(await words.evaluate((el) => getComputedStyle(el).opacity))).toBe(1);
  });

  test("stays framed and still with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    expect(await animationName(page, ".hero-stage__frame")).toBe("none");
    expect(await animationName(page, ".hero-stage__img")).toBe("none");
    expect(await animationName(page, ".hero__title")).toBe("none");
    await expect(page.locator(".hero-stage__title span").first()).toHaveCSS("opacity", "1");
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
