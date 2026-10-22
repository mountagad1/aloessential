import { test, expect } from "./fixtures";

const WA = /^https:\/\/wa\.me\/33766984872\?text=/;

test.describe("publisher and legal pages", () => {
  for (const [path, heading] of [
    ["/mentions-legales/", "Mentions légales"],
    ["/confidentialite/", "Politique de confidentialité"],
    ["/contact/", "Nous écrire"],
    ["/equipe/", "L'équipe Aloessential"],
    ["/aloe-vera/", "L'aloe vera, du champ au flacon"],
  ]) {
    test(`${path} is published and linked from the footer or header`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    });
  }

  test("legal notice names the publisher and the host", async ({ page }) => {
    await page.goto("/mentions-legales/");
    await expect(page.locator(".prose")).toContainText("Philippe Cros");
    await expect(page.locator(".prose")).toContainText("Vercel Inc.");
    await expect(page.locator("footer").getByRole("link", { name: "Mentions légales" })).toBeVisible();
  });

  test("articles carry an author and a reviewer", async ({ page }) => {
    await page.goto("/articles/article-demo/");
    await expect(page.locator(".byline")).toContainText("Mountaga Diallo");
    await expect(page.locator(".byline")).toContainText("Philippe Cros");
  });
});

test.describe("distributor invitation", () => {
  test("the floating button opens a dialog with the WhatsApp link, and Escape closes it", async ({ page }) => {
    await page.goto("/");
    const dialog = page.locator("#distributor-dialog");
    await expect(dialog).not.toBeVisible();
    await page.locator("[data-distributor-open]").click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", WA);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(page.locator("[data-distributor-open]")).toBeFocused();
  });

  test("the homepage section links to WhatsApp and promises no income", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#distributeur");
    await expect(section.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", WA);
    await expect(section).toContainText("nous ne promettons aucun gain");
  });

  test("is offered on every page, product pages included", async ({ page }) => {
    for (const path of ["/", "/articles/", "/produits/", "/produits/produit-demo/", "/contact/", "/mentions-legales/"]) {
      await page.goto(path);
      await expect(page.locator("[data-distributor-open]")).toBeVisible();
      await expect(page.locator("#distributor-dialog")).toHaveCount(1);
    }
  });

  test("on product pages it rises above the purchase bar instead of covering it", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the purchase bar only exists on small screens");
    await page.goto("/produits/produit-demo/");
    await page.locator("#avis").evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
    const bar = page.locator("[data-sticky-cta]");
    await expect(bar).toHaveClass(/is-visible/);
    const fab = page.locator("[data-distributor-open]");
    await expect
      .poll(async () => {
        const [f, b] = await Promise.all([fab.boundingBox(), bar.boundingBox()]);
        return f!.y + f!.height <= b!.y;
      })
      .toBe(true);
    await fab.click();
    await expect(page.locator("#distributor-dialog")).toBeVisible();
  });
});
