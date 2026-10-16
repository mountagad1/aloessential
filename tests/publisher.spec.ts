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
    await expect(page.locator(".prose")).toContainText("Philip Cros");
    await expect(page.locator(".prose")).toContainText("Vercel Inc.");
    await expect(page.locator("footer").getByRole("link", { name: "Mentions légales" })).toBeVisible();
  });

  test("articles carry an author and a reviewer", async ({ page }) => {
    await page.goto("/articles/article-demo/");
    await expect(page.locator(".byline")).toContainText("Mountaga Diallo");
    await expect(page.locator(".byline")).toContainText("Philip Cros");
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

  test("product pages keep the bottom of the screen for the purchase bar", async ({ page }) => {
    await page.goto("/produits/produit-demo/");
    await expect(page.locator("[data-distributor-open]")).toHaveCount(0);
  });
});
