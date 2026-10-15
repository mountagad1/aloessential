import { test, expect, computed } from "./fixtures";

const ARTICLE = "/articles/aloe-vera-bienfaits-peau/";

const progress = (page: import("@playwright/test").Page) =>
  page.locator("[data-reading-progress]").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

test.describe("article page", () => {
  test("reading progress follows the article", async ({ page }) => {
    await page.goto(ARTICLE);
    expect(await progress(page)).toBeLessThan(0.05);

    const { mid, end } = await page.evaluate(() => {
      const article = document.querySelector<HTMLElement>("[data-article]")!;
      const top = article.getBoundingClientRect().top + scrollY;
      const end = top + article.offsetHeight - innerHeight;
      return { mid: top + (end - top) / 2, end };
    });
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), mid);
    await page.waitForTimeout(100);
    expect(await progress(page)).toBeGreaterThan(0.4);
    expect(await progress(page)).toBeLessThan(0.6);

    await page.evaluate((y) => window.scrollTo({ top: y + 50, behavior: "instant" }), end);
    await page.waitForTimeout(100);
    expect(await progress(page)).toBeCloseTo(1, 2);
  });

  test("reading progress JS fallback (no scroll-driven animations)", async ({ page }) => {
    await page.addInitScript(() => {
      const supports = CSS.supports.bind(CSS);
      CSS.supports = ((...args: [string, string?]) =>
        String(args[0]).includes("animation-timeline") ? false : supports(...(args as [string]))) as typeof CSS.supports;
    });
    await page.goto(ARTICLE);
    await page.addStyleTag({ content: ".reading-progress__bar { animation: none !important; }" });
    await page.evaluate(() => {
      const article = document.querySelector<HTMLElement>("[data-article]")!;
      const top = article.getBoundingClientRect().top + scrollY;
      const end = top + article.offsetHeight - innerHeight;
      window.scrollTo({ top: top + (end - top) / 2, behavior: "instant" });
    });
    await page.waitForTimeout(150);
    const value = await progress(page);
    expect(value).toBeGreaterThan(0.4);
    expect(value).toBeLessThan(0.6);
  });

  test("progress bar does not cover the header content", async ({ page }) => {
    await page.goto(ARTICLE);
    expect(await computed(page, ".reading-progress", "height")).toBe("3px");
    expect(await computed(page, ".reading-progress", "pointer-events")).toBe("none");
  });

  test("table of contents jumps to headings below the sticky header", async ({ page }) => {
    await page.goto(ARTICLE);
    await page.getByText("Sommaire").click();
    const link = page.getByRole("navigation", { name: "Sommaire de l'article" }).getByRole("link").nth(2);
    const target = (await link.getAttribute("href"))!;
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await page.waitForTimeout(1200); // smooth scroll
    const headerBottom = await page.locator("[data-site-header]").evaluate((el) => el.getBoundingClientRect().bottom);
    const top = await page.locator(target).evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(headerBottom);
    expect(top).toBeLessThan(headerBottom + 80);
  });

  test("article body is never hidden waiting for scroll", async ({ page }) => {
    await page.goto(ARTICLE);
    expect(await page.locator(".prose [data-reveal]").count()).toBe(0);
    const lastParagraph = page.locator(".prose p").last();
    expect(await lastParagraph.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });
});
