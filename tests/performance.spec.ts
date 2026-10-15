import { test, expect, scrollThrough } from "./fixtures";

/*
 * Measured in headless Chromium against the production build on localhost.
 * Numbers are attached to the test report as annotations. They describe this
 * environment (no network or CPU throttling), not real-user field data.
 */

const PAGES = ["/", "/articles/", "/rubriques/beaute/", "/articles/aloe-vera-bienfaits-peau/"];

for (const path of PAGES) {
  test(`layout stability and paint timing: ${path}`, async ({ page }, testInfo) => {
    await page.addInitScript(() => {
      (window as any).__cls = 0;
      (window as any).__lcp = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) (window as any).__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        (window as any).__lcp = entries[entries.length - 1].startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });

    await page.goto(path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const loadCls = await page.evaluate(() => (window as any).__cls as number);
    const lcp = await page.evaluate(() => (window as any).__lcp as number);

    await scrollThrough(page, 250);
    await page.waitForTimeout(800);
    const totalCls = await page.evaluate(() => (window as any).__cls as number);

    testInfo.annotations.push(
      { type: "CLS (load)", description: loadCls.toFixed(4) },
      { type: "CLS (load + full scroll)", description: totalCls.toFixed(4) },
      { type: "LCP (ms)", description: lcp.toFixed(0) },
    );
    console.log(`[${testInfo.project.name}] ${path}  CLS load=${loadCls.toFixed(4)} total=${totalCls.toFixed(4)}  LCP=${lcp.toFixed(0)}ms`);

    expect(totalCls).toBeLessThan(0.1);
  });
}

test("reveal animations only touch opacity and transform", async ({ page }) => {
  await page.goto("/");
  await scrollThrough(page);
  const props = await page.evaluate(() => {
    const seen = new Set<string>();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const s = getComputedStyle(el);
      s.transitionProperty.split(",").forEach((p) => seen.add(p.trim()));
    });
    return [...seen];
  });
  for (const prop of props) expect(["opacity", "transform", "all"]).toContain(prop);
  expect(props).not.toContain("all");
});
