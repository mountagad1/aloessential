import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { LOCALE_CODES } from "../src/i18n/locales";
import { WATER_UI } from "../src/i18n/water-ui";
import { FIBRE_UI } from "../src/i18n/fibre-ui";
import { WATERING_UI } from "../src/i18n/watering-ui";

/*
 * Indexation guards on the built site (dist-test/): the sitemap only holds
 * canonical, indexable URLs with truthful lastmod values, and the free tools
 * stay discoverable through crawlable links.
 * docs/seo/indexation/URL_ELIGIBILITY_POLICY.md
 */
const ORIGIN = "https://aloessential.com";
const dist = join(process.cwd(), "dist-test");
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });

test.describe("indexation guards", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  const sitemap = () => readFileSync(join(dist, "sitemap.xml"), "utf8");
  const entries = () =>
    [...sitemap().matchAll(/<url><loc>([^<]*)<\/loc>(?:<lastmod>([^<]*)<\/lastmod>)?/g)].map((m) => ({ loc: m[1], lastmod: m[2] }));

  test("the sitemap holds no parameter, redirect, error or noindex URL, and no duplicate", () => {
    const locs = entries().map((e) => e.loc);
    expect(new Set(locs).size).toBe(locs.length);
    for (const loc of locs) {
      expect(loc, loc).toMatch(/^https:\/\/aloessential\.com\/([a-z0-9-]+\/)*$/);
      const html = read(loc.replace(ORIGIN, ""));
      expect(html, loc).not.toContain('content="noindex"');
      expect(html, loc).toContain(`<link rel="canonical" href="${loc}">`);
    }
    expect(locs.some((l) => l.endsWith("/404/"))).toBe(false);
  });

  test("lastmod comes from content dates, never from the build", () => {
    const today = new Date().toISOString().slice(0, 10);
    const dated = entries().filter((e) => e.lastmod);
    expect(dated.length).toBeGreaterThan(0);
    for (const e of dated) {
      expect(e.lastmod, e.loc).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.lastmod <= today, `${e.loc} lastmod in the future`).toBe(true);
    }
    // The fixture article was published on 2020-01-01 and meaningfully updated on 2020-03-15.
    expect(entries().find((e) => e.loc === `${ORIGIN}/articles/article-demo/`)?.lastmod).toBe("2020-03-15");
  });

  test("an updated article shows the update date and declares dateModified", () => {
    const html = read("articles/article-demo");
    expect(html).toContain('datetime="2020-03-15');
    expect(html).toContain('"dateModified":"2020-03-15');
    expect(html).toContain('"datePublished":"2020-01-01');
  });

  test("every page links to the free tools of its language", () => {
    const tools = [WATER_UI, FIBRE_UI, WATERING_UI];
    for (const locale of LOCALE_CODES) {
      const home = locale === "fr" ? "" : locale;
      const html = read(home);
      for (const tool of tools) expect(html, `${locale} → ${tool[locale].path}`).toContain(`href="${tool[locale].path}"`);
    }
    // A sample of other templates carries the same footer.
    const sample = htmlFiles(dist).filter((f) => !f.endsWith("404.html")).filter((_, i) => i % 25 === 0);
    const fibrePaths = LOCALE_CODES.map((l) => `href="${FIBRE_UI[l].path}"`);
    for (const file of sample) {
      const html = readFileSync(file, "utf8");
      expect(fibrePaths.some((p) => html.includes(p)), file).toBe(true);
    }
  });
});
