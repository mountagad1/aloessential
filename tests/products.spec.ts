import { test, expect } from "./fixtures";

// Uses the fictional fixtures in tests/fixtures/ (CONTENT_FIXTURES=1).
const PRODUCT = "/produits/produit-demo/";

test.describe("product page", () => {
  test("renders every block from the content entry", async ({ page }) => {
    await page.goto(PRODUCT);
    await expect(page.getByRole("heading", { level: 1, name: "Gel de démonstration" })).toBeVisible();
    for (const name of ["Notre avis", "Pour qui ?", "Composition", "Mode d'emploi", "Précautions", "Questions fréquentes"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeAttached();
    }
    await expect(page.locator(".composition tbody tr")).toHaveCount(2);
    await expect(page.getByText("Informations produit vérifiées le 15 octobre 2026")).toBeAttached();
  });

  test("food supplements carry the French mandatory mentions", async ({ page }) => {
    await page.goto(PRODUCT);
    const notice = page.locator(".product-block--notice");
    await expect(notice).toContainText("Ne pas dépasser la dose journalière recommandée.");
    await expect(notice).toContainText("Tenir hors de la portée des jeunes enfants.");
    await expect(notice).toContainText("régime alimentaire varié et équilibré");
  });

  test("shop links are sponsored, open in a new tab and announce it", async ({ page }) => {
    await page.goto(PRODUCT);
    const links = page.locator("[data-shop-link]");
    expect(await links.count()).toBeGreaterThanOrEqual(3); // hero, final CTA, sticky bar
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", "https://shop.lrworld.com/product?productAlias=00000-00&ref=cros");
      await expect(link).toHaveAttribute("rel", /sponsored/);
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("target", "_blank");
    }
    await expect(page.getByRole("link", { name: /Voir sur la boutique LR : Gel de démonstration \(lien partenaire, nouvel onglet\)/ })).toBeVisible();
  });

  test("partner disclosure is visible above the fold and links to the policy", async ({ page }) => {
    await page.goto(PRODUCT);
    await page.waitForTimeout(1000);
    const disclosure = page.locator(".product-hero .disclosure-inline");
    await expect(disclosure).toContainText("Lien partenaire");
    await expect(disclosure).toBeInViewport();
    await disclosure.getByRole("link", { name: "En savoir plus" }).click();
    await expect(page).toHaveURL(/\/transparence\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Liens partenaires");
  });

  test("FAQ answers expand", async ({ page }) => {
    await page.goto(PRODUCT);
    const item = page.locator(".faq__item").first();
    await expect(item.locator("p")).toBeHidden();
    await item.locator("summary").click();
    await expect(item.locator("p")).toBeVisible();
  });

  test("drafts never get a public page or listing", async ({ page, allowConsoleError }) => {
    allowConsoleError(/status of 404/);
    const response = await page.goto("/produits/produit-brouillon/");
    expect(response?.status()).toBe(404);
    await page.goto("/produits/");
    await expect(page.getByRole("link", { name: "Produit brouillon" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Gel de démonstration" })).toBeVisible();
  });
});

test.describe("mobile purchase bar", () => {
  test("appears between the hero CTA and the final CTA only", async ({ page, isMobile }) => {
    const bar = page.locator("[data-sticky-cta]");
    await page.goto(PRODUCT);
    if (!isMobile) {
      await expect(bar).toBeHidden();
      return;
    }
    await expect(bar).not.toHaveClass(/is-visible/);
    await expect(bar).toHaveAttribute("inert", "");

    await page.locator("#avis").evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
    await expect(bar).toHaveClass(/is-visible/);
    await expect(bar).not.toHaveAttribute("inert", "");
    await expect(bar.getByRole("link")).toBeInViewport();

    await page.locator("[data-sticky-end]").evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
    await expect(bar).not.toHaveClass(/is-visible/);

    // Stays hidden after the final CTA (related articles, footer).
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await expect(bar).not.toHaveClass(/is-visible/);
  });

  test("hidden bar is not focusable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto(PRODUCT);
    const focusable = await page.locator("[data-sticky-cta] a").evaluate((a) => {
      (a as HTMLElement).focus();
      return document.activeElement === a;
    });
    expect(focusable).toBe(false);
  });
});

test.describe("articles link to products", () => {
  test("only published products appear in the article callout, via our product page", async ({ page }) => {
    await page.goto("/articles/article-demo/");
    const callout = page.locator(".product-callout");
    await expect(callout.getByRole("link", { name: "Gel de démonstration" })).toHaveAttribute("href", "/produits/produit-demo/");
    await expect(callout.getByText("Produit brouillon")).toHaveCount(0);
  });

  test("product page lists the articles that cite it", async ({ page }) => {
    await page.goto(PRODUCT);
    await expect(page.locator("#related-title")).toBeAttached();
    await expect(page.getByRole("link", { name: "Article de démonstration" })).toBeAttached();
  });
});

test("navigation exposes the product selection", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.locator("[data-menu-toggle]").click();
    await page.locator("#mobile-nav").getByRole("link", { name: "Produits" }).click();
  } else {
    await page.locator(".nav").getByRole("link", { name: "Produits" }).click();
  }
  await expect(page).toHaveURL(/\/produits\/$/);
});
