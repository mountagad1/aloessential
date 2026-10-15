import { test, expect, scrollThrough, computed } from "./fixtures";

test.describe("homepage hero entrance", () => {
  test("content is in the DOM immediately and settles fully visible", async ({ page }) => {
    await page.goto("/");
    // Accessible from the first frame, regardless of animation state.
    await expect(page.getByRole("heading", { level: 1, name: /Votre source/ })).toBeAttached();
    expect(await computed(page, ".hero__title", "animation-name")).toBe("motion-rise-in");

    await page.waitForTimeout(1300);
    for (const selector of [".hero .eyebrow", ".hero__title", ".hero__lead", ".hero__actions", ".hero__visual"]) {
      expect(await computed(page, selector, "opacity"), selector).toBe("1");
    }
  });

  test("sequence is short: content steps finish within one second", async ({ page }) => {
    await page.goto("/");
    const endTimes = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => ((a.effect as KeyframeEffect).target as Element | null)?.matches("[data-hero-step]"))
        .map((a) => a.effect!.getComputedTiming().endTime as number),
    );
    expect(endTimes.length).toBeGreaterThanOrEqual(4);
    expect(Math.max(...endTimes)).toBeLessThanOrEqual(1000);
  });
});

test.describe("botanical accent", () => {
  test("sways on desktop only, and pauses off-screen", async ({ page, isMobile }) => {
    await page.goto("/");
    const name = await computed(page, ".accent-sway", "animation-name");
    if (isMobile) {
      expect(name).toBe("none");
      return;
    }
    expect(name).toBe("motion-breeze");
    await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
    await expect(page.locator(".accent-sway")).toHaveClass(/is-paused/);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator(".accent-sway")).not.toHaveClass(/is-paused/);
  });

  test("is the only infinite animation on the page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    const infinite = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations === Infinity)
        .map((a) => (a.effect as KeyframeEffect).target?.className),
    );
    expect(infinite.length).toBeLessThanOrEqual(1);
  });
});

test.describe("scroll reveal", () => {
  test("below-the-fold content reveals while scrolling and observers clean up", async ({ page }) => {
    await page.goto("/");
    const total = await page.locator("[data-reveal]").count();
    expect(total).toBeGreaterThan(5);
    // Not everything is revealed before scrolling…
    expect(await page.locator("[data-reveal].is-revealed").count()).toBeLessThan(total);

    await scrollThrough(page);
    // …and everything is after.
    await expect(page.locator("[data-reveal]:not(.is-revealed)")).toHaveCount(0);
    await page.waitForTimeout(800);
    for (const el of await page.locator("[data-reveal]").all()) {
      expect(await el.evaluate((n) => getComputedStyle(n).opacity)).toBe("1");
    }
  });

  test("stagger is capped for cards entering together", async ({ page }) => {
    await page.goto("/articles/");
    await scrollThrough(page);
    const delays = await page
      .locator(".card-grid > li")
      .evaluateAll((els) => els.map((el) => parseFloat((el as HTMLElement).style.getPropertyValue("--reveal-delay")) || 0));
    expect(Math.max(...delays)).toBeLessThanOrEqual(3 * 70);
  });

  test("after an anchor jump, anything brought into view is revealed", async ({ page }) => {
    await page.goto("/#newsletter");
    await expect(page.locator(".newsletter")).toHaveClass(/is-revealed/);
    // Jump straight to content that was skipped over: it must reveal as soon as it is on screen.
    await page.locator(".pillars").evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
    await expect(page.locator(".pillars [data-reveal]").first()).toHaveClass(/is-revealed/);
  });

  test("card images fade in once loaded", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    await expect(page.locator("img[data-fade]:not(.is-loaded)")).toHaveCount(0);
  });
});

test.describe("card hover", () => {
  test("image scales subtly without moving the card", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover effects are only enabled for fine pointers");
    await page.goto("/articles/");
    await scrollThrough(page);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const card = page.locator(".card").first();
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const before = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(700);
    const after = await card.boundingBox();
    expect(after).toEqual(before);

    const scale = await card.locator(".media img").evaluate((img) => new DOMMatrix(getComputedStyle(img).transform).a);
    expect(scale).toBeGreaterThan(1.01);
    expect(scale).toBeLessThanOrEqual(1.025);
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("removes entrance travel, ambient loop and smooth scrolling", async ({ page }) => {
    await page.goto("/");
    expect(await computed(page, ".hero__title", "animation-name")).toBe("none");
    expect(await computed(page, ".hero__title", "opacity")).toBe("1");
    expect(await computed(page, ".accent-sway", "animation-name")).toBe("none");
    expect(await computed(page, ".accent-glow", "animation-name")).toBe("none");
    expect(await computed(page, "html", "scroll-behavior")).toBe("auto");

    // Unrevealed elements do not travel: only opacity changes.
    const pending = page.locator("[data-reveal]:not(.is-revealed)").first();
    expect(await pending.evaluate((el) => getComputedStyle(el).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test("hover does not scale images", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover only");
    await page.goto("/articles/");
    const card = page.locator(".card").first();
    await card.hover();
    await page.waitForTimeout(300);
    const transform = await card.locator(".media img").evaluate((img) => getComputedStyle(img).transform);
    expect(transform).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test("content still reveals and stays readable", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    await expect(page.locator("[data-reveal]:not(.is-revealed)")).toHaveCount(0);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all content is visible", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.className)).toBe("");
    for (const el of await page.locator("[data-reveal], img[data-fade]").all()) {
      expect(await el.evaluate((n) => getComputedStyle(n).opacity)).toBe("1");
    }
  });

  test("mobile navigation is reachable as a plain list", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile layout only");
    await page.goto("/");
    await expect(page.locator(".menu-toggle")).toBeHidden();
    await expect(page.locator("#mobile-nav").getByRole("link", { name: "Santé" })).toBeVisible();
  });
});

test.describe("failsafe", () => {
  test("if the motion module never runs, hidden content is restored", async ({ page }) => {
    // Strip the module scripts from the HTML, keep the inline boot script.
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() !== "document") return route.continue();
      const response = await route.fetch();
      const html = (await response.text()).replace(/<script type="module"[\s\S]*?<\/script>/g, "");
      await route.fulfill({ response, body: html });
    });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.classList.contains("motion"))).toBe(true);
    await page.waitForTimeout(3000 + 900); // failsafe delay + fade-in
    expect(await page.evaluate(() => document.documentElement.classList.contains("motion"))).toBe(false);
    const hidden = await page
      .locator("[data-reveal]")
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
    expect(hidden).toBe(0);
  });
});

test("static output: no client-side hydration islands", async ({ page }) => {
  for (const path of ["/", "/articles/", "/rubriques/sante/", "/articles/aloe-vera-bienfaits-peau/"]) {
    await page.goto(path);
    await expect(page.locator("astro-island")).toHaveCount(0);
  }
});
