import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES } from "../src/i18n/locales";

/*
 * Static checks on the built site (dist-test/, which includes the fixtures).
 * Canonical origin: https://aloessential.com, every page URL ends with "/".
 */
const ORIGIN = "https://aloessential.com";
const dist = join(process.cwd(), "dist-test");

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });

/** "/articles/x/index.html" → "/articles/x/" */
const pathOf = (file: string) => file.replace(dist, "").replace(/index\.html$/, "");

const attr = (html: string, re: RegExp) => html.match(re)?.[1]?.replace(/&amp;/g, "&");

test.describe("SEO foundations", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  const pages = () => htmlFiles(dist).filter((f) => !f.endsWith("404.html"));

  test("every page has a self-referencing absolute canonical with a trailing slash", () => {
    const problems: string[] = [];
    for (const file of pages()) {
      const html = readFileSync(file, "utf8");
      const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
      const expected = `${ORIGIN}${pathOf(file)}`;
      if (canonical !== expected) problems.push(`${pathOf(file)}: ${canonical}`);
      if (attr(html, /<meta property="og:url" content="([^"]*)"/) !== expected) problems.push(`${pathOf(file)}: og:url`);
    }
    expect(problems).toEqual([]);
  });

  test("titles, descriptions and H1 are present, unique and within length", () => {
    const titles = new Map<string, string>();
    const problems: string[] = [];
    for (const file of pages()) {
      const html = readFileSync(file, "utf8");
      const p = pathOf(file);
      const title = attr(html, /<title>([^<]*)<\/title>/) ?? "";
      const description = attr(html, /<meta name="description" content="([^"]*)"/) ?? "";
      if (!title) problems.push(`${p}: no title`);
      if (titles.has(title)) problems.push(`${p}: same title as ${titles.get(title)}`);
      titles.set(title, p);
      if (description.length < 50 || description.length > 160) problems.push(`${p}: description ${description.length} chars`);
      const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
      if (h1 !== 1) problems.push(`${p}: ${h1} h1`);
    }
    expect(problems).toEqual([]);
  });

  test("share metadata is complete", () => {
    for (const file of pages()) {
      const html = readFileSync(file, "utf8");
      const p = pathOf(file);
      const image = attr(html, /<meta property="og:image" content="([^"]*)"/) ?? "";
      // Locale of the page from its prefix; article pages are /<prefix>/<articles segment>/<slug>/.
      const locale = LOCALE_CODES.find((l) => l !== DEFAULT_LOCALE && p.startsWith(`${LOCALES[l].prefix}/`)) ?? DEFAULT_LOCALE;
      const articles = `${LOCALES[locale].prefix}/${LOCALES[locale].segments.articles}/`;
      const isArticle = p.startsWith(articles) && p !== articles && !/^\d+\/$/.test(p.slice(articles.length));
      const products = `${LOCALES[locale].prefix}/${LOCALES[locale].segments.products}/`;
      const isProduct = p.startsWith(products) && p !== products;
      if (isArticle || isProduct) {
        // Articles and product pages share their own cover, as a raster (see image delivery tests):
        // a 1200 × 800 twin for illustrations, a 1200 px wide 16:9 JPEG for photos.
        expect(image, p).toMatch(new RegExp(`^${ORIGIN}/covers/(photos/)?[a-z0-9-]+\\.jpg$`));
        expect(existsSync(join(dist, image.replace(ORIGIN, ""))), image).toBe(true);
        expect(html, p).toContain('<meta property="og:image:width" content="1200">');
        // 16:9 photos share at 1200 × 675; 3:2 photos and illustrations at 1200 × 800.
        expect(html, p).toMatch(image.includes("/photos/") ? /<meta property="og:image:height" content="(67[45]|800)">/ : /<meta property="og:image:height" content="800">/);
        expect(html, p).toContain('<meta property="og:image:alt"');
      } else {
        expect(image, p).toBe(`${ORIGIN}/brand/og-default.png`);
      }
      // Locale-specific Open Graph locale; full locale checks in tests/i18n.spec.ts.
      expect(html, p).toContain(`<meta property="og:locale" content="${LOCALES[locale].ogLocale}">`);
      const type = attr(html, /<meta property="og:type" content="([^"]*)"/);
      expect(type, p).toBe(isArticle ? "article" : "website");
    }
    expect(existsSync(join(dist, "brand", "og-default.png"))).toBe(true);
  });

  test("JSON-LD parses and never claims products, offers or reviews", () => {
    for (const file of pages()) {
      const html = readFileSync(file, "utf8");
      const p = pathOf(file);
      for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        const data = JSON.parse(json);
        expect(data["@context"], p).toBe("https://schema.org");
        const types = JSON.stringify(data).match(/"@type":"[^"]+"/g) ?? [];
        for (const t of ["Product", "Offer", "Review", "AggregateRating"]) {
          expect(types, `${p} must not use ${t}`).not.toContain(`"@type":"${t}"`);
        }
      }
    }
    const read = (p: string) => readFileSync(join(dist, p, "index.html"), "utf8");
    expect(read("")).toContain('"@type":"Organization"');
    expect(read("articles/article-demo")).toContain('"@type":"Article"');
    expect(read("articles/article-demo")).toContain('"@type":"BreadcrumbList"');
    expect(read("produits/produit-demo")).toContain('"@type":"BreadcrumbList"');
  });

  test("the 404 page is noindex and has no canonical", () => {
    const html = readFileSync(join(dist, "404.html"), "utf8");
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).not.toContain('rel="canonical"');
  });

  test("internal page links use the canonical trailing-slash form", () => {
    const problems = new Set<string>();
    for (const file of htmlFiles(dist)) {
      for (const [, href] of readFileSync(file, "utf8").matchAll(/href="(\/[^"]*)"/g)) {
        const path = href.split(/[?#]/)[0];
        if (path.includes(".")) continue; // files: /brand/x.png, /_astro/x.css
        if (!path.endsWith("/")) problems.add(`${pathOf(file)} → ${href}`);
      }
    }
    expect([...problems]).toEqual([]);
  });

  test("every internal page link resolves to a built page", () => {
    const missing = new Set<string>();
    for (const file of htmlFiles(dist)) {
      for (const [, href] of readFileSync(file, "utf8").matchAll(/href="(\/[^"]*)"/g)) {
        const path = href.split(/[?#]/)[0];
        if (path.includes(".")) continue; // files
        if (!existsSync(join(dist, path, "index.html"))) missing.add(`${pathOf(file)} → ${href}`);
      }
    }
    expect([...missing]).toEqual([]);
  });

  test("sitemap lists every indexable page and nothing else; robots.txt points to it", () => {
    const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]).sort();
    const expected = pages()
      .map((f) => `${ORIGIN}${pathOf(f)}`)
      .sort();
    expect(locs).toEqual(expected);
    expect(locs.some((l) => l.includes("brouillon"))).toBe(false);
    expect(readFileSync(join(dist, "robots.txt"), "utf8")).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });
});
