import { test, expect, type Page } from "./fixtures";

const ENDPOINT = "https://newsletter.example.test/subscribe";

async function useEndpoint(page: Page, status: number, delay = 0) {
  await page.route(ENDPOINT, async (route) => {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    await route.fulfill({ status, contentType: "application/json", body: "{}" });
  });
  await page.locator("[data-newsletter]").evaluate((form, url) => ((form as HTMLFormElement).dataset.endpoint = url), ENDPOINT);
}

test.describe("newsletter form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#newsletter");
  });

  const form = (page: Page) => ({
    input: page.getByLabel("Adresse e-mail"),
    submit: page.getByRole("button", { name: /S'inscrire|Inscription/ }),
    status: page.locator("[data-newsletter-status]"),
  });

  test("empty and invalid addresses show an accessible error", async ({ page }) => {
    const { input, submit, status } = form(page);
    await submit.click();
    await expect(status).toHaveText(/Veuillez saisir/);
    await expect(status).toHaveAttribute("data-state", "error");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();

    await input.fill("pas-un-email");
    await submit.click();
    await expect(status).toHaveText(/ne semble pas valide/);

    // Fixing the value clears the error while typing.
    await input.fill("lea@exemple.fr");
    await expect(input).toHaveAttribute("aria-invalid", "false");
    await expect(status).toHaveText("");
  });

  test("never claims success when no endpoint is configured", async ({ page }) => {
    const { input, submit, status } = form(page);
    await input.fill("lea@exemple.fr");
    await submit.click();
    await expect(status).toHaveAttribute("data-state", "error");
    await expect(status).toHaveText(/pas encore ouvertes/);
  });

  test("shows a loading state, then success only after a 2xx", async ({ page }) => {
    await useEndpoint(page, 200, 400);
    const { input, submit, status } = form(page);
    await input.fill("lea@exemple.fr");
    await submit.click();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(submit).toHaveText(/Inscription…/);
    await expect(status).toHaveAttribute("data-state", "success");
    await expect(status).toHaveText(/Merci/);
    await expect(submit).toHaveAttribute("aria-busy", "false");
    await expect(input).toHaveValue("");
  });

  test("server errors are reported, not hidden", async ({ page, allowConsoleError }) => {
    allowConsoleError(/status of 500/);
    await useEndpoint(page, 500);
    const { input, submit, status } = form(page);
    await input.fill("lea@exemple.fr");
    await submit.click();
    await expect(status).toHaveAttribute("data-state", "error");
    await expect(status).toHaveText(/n'a pas abouti/);
    await expect(input).toHaveValue("lea@exemple.fr");
  });

  test("status region is announced politely", async ({ page }) => {
    const { status } = form(page);
    await expect(status).toHaveAttribute("role", "status");
    await expect(status).toHaveAttribute("aria-live", "polite");
  });
});
