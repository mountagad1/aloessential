import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { LISTING_PAGE_SIZE, listingPages, listingPath, pageCount, pageSlice } from "../src/lib/pagination";

/*
 * Static checks on the built site (dist-test/) and on vercel.json: listing
 * pagination, share images and delivery headers.
 * See docs/architecture/.
 */
const ORIGIN = "https://aloessential.com";
const root = process.cwd();
const dist = join(root, "dist-test");

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
const pathOf = (file: string) => file.replace(dist, "").replace(/index\.html$/, "");
const indexable = () => htmlFiles(dist).filter((f) => !f.endsWith("404.html"));

/** Width and height from a baseline or progressive JPEG (SOF0/SOF2 marker). */
function jpegSize(file: string): { width: number; height: number } {
  const b = readFileSync(file);
  expect(b.readUInt16BE(0), `${file} is not a JPEG`).toBe(0xffd8);
  let i = 2;
  while (i < b.length) {
    const marker = b.readUInt16BE(i);
    if (marker === 0xffc0 || marker === 0xffc2) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error(`${file}: no frame header`);
}

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "file scan runs once");
});

test.describe("listing pagination", () => {
  test("splits listings into bounded pages with stable URLs", () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(LISTING_PAGE_SIZE)).toBe(1);
    expect(pageCount(LISTING_PAGE_SIZE + 1)).toBe(2);
    expect(listingPath("/articles/", 1)).toBe("/articles/");
    expect(listingPath("/articles/", 3)).toBe("/articles/3/");
    expect(listingPages("/rubriques/sante/", 50, 24).map((p) => p.path)).toEqual([
      "/rubriques/sante/",
      "/rubriques/sante/2/",
      "/rubriques/sante/3/",
    ]);
    expect(pageSlice([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
  });

  test("no listing page shows more cards than a page holds", () => {
    for (const file of htmlFiles(dist).filter((f) => /\/(articles|rubriques\/[^/]+)\/(\d+\/)?index\.html$/.test(f))) {
      const cards = readFileSync(file, "utf8").match(/<article class="card"/g)?.length ?? 0;
      expect(cards, pathOf(file)).toBeLessThanOrEqual(LISTING_PAGE_SIZE);
    }
  });
});

test.describe("image delivery", () => {
  test("every cover used by content has a 1200 × 800 raster twin for sharing", () => {
    const covers = new Set<string>();
    for (const dir of ["src/content/articles", "src/content/products", "tests/fixtures/articles", "tests/fixtures/products"]) {
      for (const name of readdirSync(join(root, dir), { recursive: true }) as string[]) {
        if (!name.endsWith(".md")) continue;
        const cover = readFileSync(join(root, dir, name), "utf8").match(/^cover: (\S+)/m)?.[1];
        if (cover) covers.add(cover);
      }
    }
    expect(covers.size).toBeGreaterThan(0);
    for (const cover of covers) {
      const raster = join(root, "public", cover.replace(/\.svg$/, ".jpg"));
      expect(existsSync(raster), `${raster} missing: run node tools/rasterize-covers.mjs`).toBe(true);
      expect(jpegSize(raster), raster).toEqual({ width: 1200, height: 800 });
    }
  });

  test("indexable pages allow large image previews; noindex pages do not carry it", () => {
    for (const file of indexable()) {
      expect(readFileSync(file, "utf8"), pathOf(file)).toContain('<meta name="robots" content="max-image-preview:large">');
    }
    expect(readFileSync(join(dist, "404.html"), "utf8")).not.toContain("max-image-preview");
  });

  test("article structured data points to the raster cover", () => {
    const html = readFileSync(join(dist, "articles", "article-demo", "index.html"), "utf8");
    const image = html.match(/"image":"([^"]+)"/)?.[1] ?? "";
    expect(image).toMatch(new RegExp(`^${ORIGIN}/covers/[a-z0-9-]+\\.jpg$`));
    expect(existsSync(join(dist, image.replace(ORIGIN, "")))).toBe(true);
  });

  test("every <img> declares its dimensions", () => {
    const problems: string[] = [];
    for (const file of htmlFiles(dist)) {
      for (const [tag] of readFileSync(file, "utf8").matchAll(/<img\b[^>]*>/g)) {
        if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) problems.push(`${pathOf(file)}: ${tag.slice(0, 80)}`);
      }
    }
    expect(problems).toEqual([]);
  });
});

// Locale routing, hreflang and sitemap alternates: tests/i18n.spec.ts.

test.describe("vercel.json delivery rules", () => {
  const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
  const rules: { source: string; headers: { key: string; value: string }[] }[] = config.headers ?? [];
  const headersFor = (path: string) =>
    Object.fromEntries(
      rules
        .filter((r) => new RegExp(`^${r.source}$`).test(path))
        .flatMap((r) => r.headers.map((h) => [h.key.toLowerCase(), h.value])),
    );

  test("keeps the canonical host and trailing-slash rules", () => {
    expect(config.trailingSlash).toBe(true);
    expect(config.redirects).toContainEqual(
      expect.objectContaining({ destination: "https://aloessential.com/:path", permanent: true }),
    );
  });

  test("sends security headers on every path", () => {
    for (const path of ["/", "/articles/x/", "/media/a.webp", "/sitemap.xml"]) {
      const h = headersFor(path);
      expect(h["x-content-type-options"], path).toBe("nosniff");
      expect(h["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
      expect(h["content-security-policy"], path).toContain("frame-ancestors 'none'");
      expect(h["permissions-policy"], path).toContain("camera=()");
    }
  });

  test("gives unhashed images a browser cache lifetime, and never caches HTML or hashed assets differently", () => {
    for (const path of ["/media/aloe-harvest-1024.webp", "/covers/jus-aloe.svg", "/covers/jus-aloe.jpg", "/brand/wordmark.webp"]) {
      expect(headersFor(path)["cache-control"], path).toMatch(/^public, max-age=86400\b/);
    }
    // HTML, sitemap and Astro's hashed assets keep Vercel's defaults (revalidate / immutable).
    for (const path of ["/", "/articles/x/", "/sitemap.xml", "/robots.txt", "/_astro/a.css"]) {
      expect(headersFor(path)["cache-control"], path).toBeUndefined();
    }
  });
});
