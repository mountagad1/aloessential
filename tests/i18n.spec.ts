import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "./fixtures";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES } from "../src/i18n/locales";
import { UI } from "../src/i18n/ui";
import { CATEGORY_I18N, CATEGORY_SLUGS } from "../src/data/categories";

/*
 * International SEO regression checks (docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md).
 * The test build includes a fictional Italian translation of the demo article
 * (tests/fixtures/articles/it/articolo-demo.md) and an unreviewed Italian
 * draft (bozza-demo.md) that must never surface.
 */
const ORIGIN = "https://aloessential.com";
const dist = join(process.cwd(), "dist-test");

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
const pathOf = (file: string) => file.replace(dist, "").replace(/index\.html$/, "");
const pages = () => htmlFiles(dist).filter((f) => !f.endsWith("404.html"));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const exists = (path: string) => existsSync(join(dist, path, "index.html"));
const localeOf = (path: string) =>
  LOCALE_CODES.find((l) => l !== DEFAULT_LOCALE && path.startsWith(`${LOCALES[l].prefix}/`)) ?? DEFAULT_LOCALE;

/** hreflang → absolute URL, from <link rel="alternate" hreflang> tags. */
const alternatesOf = (html: string) =>
  Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => [m[1], m[2]]));

test.describe("locale registry", () => {
  test("defines every supported locale once, with valid codes and URL prefixes", () => {
    expect([...LOCALE_CODES].sort()).toEqual(["de", "en", "es", "fr", "it", "pl", "pt-pt"]);
    const prefixes = new Set<string>();
    for (const code of LOCALE_CODES) {
      const l = LOCALES[code];
      expect(l.code).toBe(code);
      expect(l.prefix).toBe(code === DEFAULT_LOCALE ? "" : `/${code}`);
      expect(prefixes.has(l.prefix), code).toBe(false);
      prefixes.add(l.prefix);
      expect(l.htmlLang, code).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
      expect(l.ogLocale, code).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      expect(l.segments.articles, code).toMatch(/^[a-z-]+$/);
      expect(l.segments.categories, code).toMatch(/^[a-z-]+$/);
      expect(l.segments.articles, code).not.toBe(l.segments.categories);
    }
    expect(LOCALES.it).toMatchObject({ prefix: "/it", htmlLang: "it", ogLocale: "it_IT", schemaLang: "it-IT" });
  });

  test("Italian interface text and category text are complete", () => {
    expect(Object.keys(UI.it!).sort()).toEqual(Object.keys(UI.fr!).sort());
    for (const [key, value] of Object.entries(UI.it!)) {
      if (typeof value === "string" && !["inFrench", "frenchSite"].includes(key)) expect(value, key).not.toBe("");
    }
    const slugs = new Set<string>();
    for (const c of CATEGORY_SLUGS) {
      const it = CATEGORY_I18N.it![c];
      expect(it.label && it.description && it.intro.length, c).toBeTruthy();
      expect(it.slug, c).toMatch(/^[a-z-]+$/);
      slugs.add(it.slug);
    }
    expect(slugs.size).toBe(CATEGORY_SLUGS.length);
  });
});

test.describe("localized pages (static scan)", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  test("Italian pages exist only for published content", () => {
    expect(exists("it")).toBe(true);
    expect(exists("it/articoli/articolo-demo")).toBe(true);
    expect(exists("it/rubriche/salute")).toBe(true);
    // No Italian article in these categories: no page (no empty hub).
    for (const slug of ["consigli", "bellezza", "nutrizione"]) expect(exists(`it/rubriche/${slug}`), slug).toBe(false);
    // Locales without a published article have no page at all.
    for (const code of LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && l !== "it")) {
      expect(existsSync(join(dist, code)), code).toBe(false);
    }
  });

  test("the unreviewed draft never surfaces", () => {
    for (const file of [...htmlFiles(dist), join(dist, "sitemap.xml")]) {
      const text = readFileSync(file, "utf8");
      expect(text, pathOf(file)).not.toContain("bozza-demo");
      expect(text, pathOf(file)).not.toContain("Bozza non revisionata");
    }
    // Its French source therefore has no language alternates.
    expect(read("articles/jus-aloe-vera-science")).not.toContain("hreflang");
  });

  test("html lang, Open Graph locale and structured data language match the URL's locale", () => {
    for (const file of htmlFiles(dist)) {
      const p = pathOf(file);
      const l = LOCALES[localeOf(p)];
      const html = readFileSync(file, "utf8");
      expect(html, p).toContain(`<html lang="${l.htmlLang}">`);
      expect(html, p).toContain(`<meta property="og:locale" content="${l.ogLocale}">`);
      for (const [, lang] of html.matchAll(/"inLanguage":"([^"]+)"/g)) expect(lang, p).toBe(l.schemaLang);
    }
  });

  test("Italian pages are indexable and self-canonical under /it/", () => {
    for (const file of pages().filter((f) => pathOf(f).startsWith("/it/"))) {
      const p = pathOf(file);
      const html = readFileSync(file, "utf8");
      expect(html, p).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
      expect(html, p).toContain(`<link rel="canonical" href="${ORIGIN}${p}">`);
    }
  });

  test("hreflang annotations are reciprocal, self-referencing and point to real indexable pages", () => {
    let annotated = 0;
    for (const file of pages()) {
      const p = pathOf(file);
      const alts = alternatesOf(readFileSync(file, "utf8"));
      if (!Object.keys(alts).length) continue;
      annotated++;
      const { "x-default": xDefault, ...langs } = alts;
      expect(Object.keys(langs).length, p).toBeGreaterThanOrEqual(2);
      expect(Object.values(langs), `${p} must list itself`).toContain(`${ORIGIN}${p}`);
      expect(xDefault, `${p} x-default`).toBe(langs.fr);
      for (const [lang, url] of Object.entries(langs)) {
        const target = url.replace(ORIGIN, "");
        expect(exists(target.slice(1)), `${p} → ${lang} ${target}`).toBe(true);
        const targetHtml = read(target.slice(1));
        expect(targetHtml, target).toContain(`<link rel="canonical" href="${url}">`);
        expect(targetHtml, target).toContain(`<html lang="${lang}">`);
        expect(alternatesOf(targetHtml), `reciprocity ${p} ↔ ${target}`).toEqual(alts);
      }
    }
    // Demo article, homepages and the Santé/Salute category pairs.
    expect(annotated).toBe(6);
    expect(alternatesOf(read("articles/article-demo"))).toEqual({
      fr: `${ORIGIN}/articles/article-demo/`,
      it: `${ORIGIN}/it/articoli/articolo-demo/`,
      "x-default": `${ORIGIN}/articles/article-demo/`,
    });
    expect(alternatesOf(read("rubriques/sante")).it).toBe(`${ORIGIN}/it/rubriche/salute/`);
    expect(alternatesOf(read("")).it).toBe(`${ORIGIN}/it/`);
    // A French category with no Italian articles has no alternates.
    expect(read("rubriques/beaute")).not.toContain("hreflang");
  });

  test("the sitemap lists Italian URLs with the same alternates as the HTML", () => {
    const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    for (const [, loc, body] of sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(.*?)<\/url>/g)) {
      const fromSitemap = Object.fromEntries(
        [...body.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)].map((m) => [m[1], m[2]]),
      );
      const html = read(loc.replace(ORIGIN, "").slice(1));
      expect(fromSitemap, loc).toEqual(alternatesOf(html));
    }
    for (const path of ["/it/", "/it/articoli/articolo-demo/", "/it/rubriche/salute/"]) {
      expect(sitemap).toContain(`<loc>${ORIGIN}${path}</loc>`);
    }
  });

  test("links on Italian pages stay in Italian, or say they lead to French", () => {
    const problems: string[] = [];
    for (const file of pages().filter((f) => pathOf(f).startsWith("/it/"))) {
      for (const [tag, href] of readFileSync(file, "utf8").matchAll(/<a\b[^>]*\bhref="(\/[^"#]*)[^"]*"[^>]*>/g)) {
        if (href.includes(".")) continue; // files
        if (href.startsWith("/it/")) continue;
        if (/\bhreflang="fr"/.test(tag)) continue; // explicit: French-only page
        problems.push(`${pathOf(file)} → ${href}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("Italian pages carry no French interface text", () => {
    const french = ["Accueil", "Sommaire", "Relecture", "Publié le", "min de lecture", "Tous les articles", "Lire ·", "Aller au contenu", "Devenir distributeur", "Fil d'Ariane", "Fil d&#39;Ariane", "Rubriques"];
    for (const file of pages().filter((f) => pathOf(f).startsWith("/it/"))) {
      const html = readFileSync(file, "utf8");
      for (const marker of french) expect(html, `${pathOf(file)} contains "${marker}"`).not.toContain(marker);
    }
    const article = read("it/articoli/articolo-demo");
    expect(article).toContain("Paragrafo di prova in italiano");
    expect(article).not.toContain("Paragraphe de test");
  });
});

test.describe("localized pages (browser)", () => {
  test("Italian routes answer 200 and render in Italian", async ({ page }) => {
    for (const path of ["/it/", "/it/articoli/articolo-demo/", "/it/rubriche/salute/"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "it");
    }
    await expect(page.locator("h1")).toHaveText("Salute");
  });

  test("unknown Italian URLs are real 404s, not French fallbacks", async ({ page, allowConsoleError }) => {
    allowConsoleError(/404/);
    const response = await page.goto("/it/articoli/n-existe-pas/");
    expect(response?.status()).toBe(404);
    expect((await page.goto("/en/"))?.status()).toBe(404);
  });

  test("an Italian article links to its French version and back", async ({ page }) => {
    await page.goto("/it/articoli/articolo-demo/");
    await expect(page.locator(".breadcrumb a").first()).toHaveAttribute("href", "/it/");
    await page.locator(".article-languages a", { hasText: "Français" }).click();
    await expect(page).toHaveURL(/\/articles\/article-demo\/$/);
    await expect(page.locator(".article-languages a", { hasText: "Italiano" })).toHaveAttribute("href", "/it/articoli/articolo-demo/");
  });

  test("the distributor invitation speaks Italian on Italian pages", async ({ page }) => {
    await page.goto("/it/");
    const fab = page.locator("[data-distributor-open]");
    await expect(fab).toContainText("Diventa distributore LR");
    await fab.click();
    const dialog = page.locator("#distributor-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /text=Buongiorno%20Philippe/);
  });

  test("the mobile menu button is labelled in Italian", async ({ page, isMobile }) => {
    test.skip(!isMobile, "menu button is mobile-only");
    await page.goto("/it/");
    const toggle = page.locator("[data-menu-toggle]");
    await expect(toggle).toHaveAttribute("aria-label", "Apri il menu");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "Chiudi il menu");
    await expect(page.locator("#mobile-nav a").first()).toHaveAttribute("href", /^\/it\//);
  });
});
