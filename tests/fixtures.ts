import { test as base, expect, type Page } from "@playwright/test";

/**
 * Fails any test that logs a console error or throws on the page.
 * A test that expects a specific error (e.g. a mocked HTTP 500) can allow it
 * with `allowConsoleError(/pattern/)`.
 */
export const test = base.extend<{ allowConsoleError: (pattern: RegExp) => void }>({
  allowConsoleError: [
    async ({ page }, use) => {
      const errors: string[] = [];
      const allowed: RegExp[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));
      await use((pattern) => allowed.push(pattern));
      const unexpected = errors.filter((text) => !allowed.some((re) => re.test(text)));
      expect(unexpected, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Scroll the whole page in steps without smooth scrolling, then return to the top. */
export async function scrollThrough(page: Page, step = 300): Promise<void> {
  await page.evaluate(async (step) => {
    const wait = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await wait();
    }
  }, step);
}

export async function computed(page: Page, selector: string, prop: string): Promise<string> {
  return page.locator(selector).first().evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), prop);
}
