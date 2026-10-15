// Lab measurement under mobile-like throttling (Chromium, via CDP).
//   npm run build && npx astro preview --port 4323 &
//   node tools/measure-throttled.mjs [baseURL]
//
// Profile: Pixel 7 viewport, 4x CPU slowdown, 150 ms RTT, 1.6 Mbps down.
// These are lab numbers from one machine — indicative, not field data.

import { chromium, devices } from "@playwright/test";

const BASE = process.argv[2] ?? "http://localhost:4323";
const PAGES = ["/", "/articles/", "/articles/aloe-vera-bienfaits-peau/"];
const RUNS = 3;

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

async function measure(browser, path, reducedMotion) {
  const context = await browser.newContext({ ...devices["Pixel 7"], reducedMotion });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.addInitScript(() => {
    const m = (window.__m = { cls: 0, lcp: 0, fcp: 0, longTasks: 0, heroDone: 0 });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (m.cls += e.value))).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => (m.lcp = l.getEntries().at(-1).startTime)).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => e.name === "first-contentful-paint" && (m.fcp = e.startTime))).observe({ type: "paint", buffered: true });
    // Total blocking time approximation: sum of (duration - 50ms) over long tasks.
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (m.longTasks += Math.max(0, e.duration - 50)))).observe({ type: "longtask", buffered: true });
    document.addEventListener("animationend", (e) => {
      if (e.target instanceof Element && e.target.matches("h1[data-hero-step]")) m.heroDone = performance.now();
    });
  });

  await page.goto(BASE + path, { waitUntil: "load" });
  await page.waitForTimeout(2500);

  // Scroll the page with real wheel input and record frame intervals.
  const frames = page.evaluate(
    () =>
      new Promise((resolve) => {
        const deltas = [];
        let last = performance.now();
        const end = last + 3000;
        const tick = (t) => {
          deltas.push(t - last);
          last = t;
          if (t < end) requestAnimationFrame(tick);
          else resolve(deltas);
        };
        requestAnimationFrame(tick);
      }),
  );
  for (let i = 0; i < 25; i++) {
    await page.mouse.wheel(0, 220);
    await page.waitForTimeout(100);
  }
  const deltas = await frames;
  const result = await page.evaluate(() => window.__m);
  result.slowFrames = deltas.filter((d) => d > 50).length;
  result.frames = deltas.length;
  await context.close();
  return result;
}

const browser = await chromium.launch();
for (const reducedMotion of ["no-preference", "reduce"]) {
  console.log(`\n== prefers-reduced-motion: ${reducedMotion}  (median of ${RUNS} runs)`);
  console.log("page                                    FCP     LCP   CLS     TBT~   hero h1 settled   frames>50ms");
  for (const path of PAGES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) runs.push(await measure(browser, path, reducedMotion));
    const pick = (k) => median(runs.map((r) => r[k]));
    const hero = pick("heroDone");
    console.log(
      `${path.padEnd(38)} ${pick("fcp").toFixed(0).padStart(5)} ${pick("lcp").toFixed(0).padStart(7)} ${pick("cls").toFixed(3).padStart(5)} ${pick("longTasks").toFixed(0).padStart(7)} ${(hero ? `${hero.toFixed(0)} ms` : "no anim").padStart(17)} ${`${pick("slowFrames")}/${pick("frames")}`.padStart(13)}`,
    );
  }
}
await browser.close();
