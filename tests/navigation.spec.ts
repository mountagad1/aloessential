import { test, expect, computed } from "./fixtures";

test.describe("header", () => {
  test("gains a border once the page scrolls, and loses it at the top", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("[data-site-header]");
    await expect(header).not.toHaveClass(/is-scrolled/);
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    await expect(header).toHaveClass(/is-scrolled/);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).not.toHaveClass(/is-scrolled/);
  });

  test("marks the current section", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation");
    await page.goto("/rubriques/sante/");
    const link = page.locator(".nav").getByRole("link", { name: "Santé" });
    await expect(link).toHaveAttribute("aria-current", "page");
    // Underline is fully drawn for the active link.
    const scale = await link.evaluate((el) => new DOMMatrix(getComputedStyle(el, "::after").transform).a);
    expect(scale).toBe(1);
  });
});

test.describe("keyboard", () => {
  test("skip link appears first and focus indicators are visible", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow tested on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Aller au contenu" });
    await expect(skip).toBeFocused();
    await page.waitForTimeout(300);
    expect(await skip.evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);

    await page.keyboard.press("Tab"); // brand
    await page.keyboard.press("Tab"); // first nav link
    const first = page.locator(".nav-link").first();
    await expect(first).toBeFocused();
    expect(await computed(page, ".nav-link:focus-visible", "outline-style")).toBe("solid");
  });

  test("CTA buttons show a focus ring", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow tested on desktop");
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Découvrir nos conseils/ });
    await cta.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(cta).toBeFocused();
    expect(await cta.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe("solid");
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, "mobile only");
  });

  test("opens, is keyboard reachable, and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-menu-toggle]");
    const panel = page.locator("#mobile-nav");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Fermer le menu");
    await expect(panel.getByRole("link", { name: "Conseils" })).toBeVisible();
    // Links keep the page gutter.
    const box = await panel.getByRole("link", { name: "Conseils" }).boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(12);

    await toggle.focus();
    await page.keyboard.press("Tab");
    await expect(panel.getByRole("link", { name: "Conseils" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect(panel).toBeHidden();
  });

  test("closes on outside tap and navigates on link tap", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-menu-toggle]");
    await toggle.tap();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    // Tap below the open panel.
    const viewport = page.viewportSize()!;
    await page.touchscreen.tap(viewport.width / 2, viewport.height - 40);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.tap();
    await page.locator("#mobile-nav").getByRole("link", { name: "Nutrition" }).tap();
    await expect(page).toHaveURL(/\/rubriques\/nutrition\/$/);
  });

  test("closed panel is not focusable", async ({ page }) => {
    await page.goto("/");
    expect(await computed(page, "#mobile-nav", "visibility")).toBe("hidden");
  });
});
