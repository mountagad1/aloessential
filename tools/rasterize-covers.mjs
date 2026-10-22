// Renders every SVG cover in public/covers/ to a 1200 × 800 JPEG beside it
// (public/covers/<name>.jpg). Share previews (Open Graph), Article structured
// data and Google Discover need a large raster image; SVG is not accepted
// there. The SVG stays the image shown on the page.
//   node tools/rasterize-covers.mjs        (after tools/generate-covers.mjs)
// Outputs are committed. tests/seo.spec.ts fails if a cover has no raster.
// See docs/architecture/IMAGE_DELIVERY.md.

import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "covers");
const W = 1200;
const H = 800;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
for (const name of readdirSync(DIR).filter((n) => n.endsWith(".svg")).sort()) {
  const svg = readFileSync(join(DIR, name)).toString("base64");
  await page.setContent(
    `<style>html,body{margin:0}img{display:block}</style><img src="data:image/svg+xml;base64,${svg}" width="${W}" height="${H}">`,
  );
  await page.locator("img").evaluate((img) => img.decode());
  const out = name.replace(/\.svg$/, ".jpg");
  writeFileSync(join(DIR, out), await page.screenshot({ type: "jpeg", quality: 85 }));
  console.log(`covers/${out}`);
}
await browser.close();
