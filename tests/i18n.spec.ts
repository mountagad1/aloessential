import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "./fixtures";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES } from "../src/i18n/locales";
import { UI } from "../src/i18n/ui";
import { CATEGORY_I18N, CATEGORY_SLUGS } from "../src/data/categories";
// @ts-expect-error plain .mjs helper shared with tools/i18n-status.mjs
import { freshness, parseMarkdown, translations } from "../tools/i18n-lib.mjs";

/*
 * International SEO regression checks (docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md).
 * The test build includes fictional Italian, English, German and Spanish
 * translations of the demo article (tests/fixtures/articles/{it,en,de,es}/) and an unreviewed Italian
 * draft (bozza-demo.md) that must never surface. Every check runs for each
 * published test locale described in PUBLISHED below.
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

/** The locales published in the test build, and what their pages must show. */
const PUBLISHED = {
  it: {
    home: "/it/",
    article: "/it/articoli/articolo-demo/",
    category: "/it/rubriche/salute/",
    categoryLabel: "Salute",
    emptyCategories: ["it/rubriche/consigli", "it/rubriche/bellezza", "it/rubriche/nutrizione"],
    body: "Paragrafo di prova in italiano",
    name: "Italiano",
    fab: "Diventa distributore LR",
    whatsapp: /text=Buongiorno%20Philippe/,
    shopLabel: "Negozio ufficiale LR",
    shopUrl: "https://shop.lrworld.com/home/IT/it?ref=cros",
    transparency: "Trasparenza e link partner",
    menu: ["Apri il menu", "Chiudi il menu"],
  },
  en: {
    home: "/en/",
    article: "/en/articles/demo-article/",
    category: "/en/topics/health/",
    categoryLabel: "Health",
    emptyCategories: ["en/topics/advice", "en/topics/beauty", "en/topics/nutrition"],
    body: "Test paragraph in English",
    name: "English",
    fab: "Become an LR distributor",
    whatsapp: /text=Hello%20Philippe/,
    shopLabel: "Official LR shop",
    shopUrl: "https://shop.lrworld.com/home/GB/en?ref=cros",
    transparency: "Transparency and partner links",
    menu: ["Open menu", "Close menu"],
  },
  de: {
    home: "/de/",
    article: "/de/artikel/demo-artikel/",
    category: "/de/rubriken/gesundheit/",
    categoryLabel: "Gesundheit",
    emptyCategories: ["de/rubriken/tipps", "de/rubriken/schoenheit", "de/rubriken/ernaehrung"],
    body: "Testabsatz auf Deutsch",
    name: "Deutsch",
    fab: "LR-Vertriebspartner werden",
    whatsapp: /text=Hallo%20Philippe/,
    shopLabel: "Offizieller LR-Shop",
    shopUrl: "https://shop.lrworld.com/home/DE/de?ref=cros",
    transparency: "Transparenz und Partnerlinks",
    menu: ["Menü öffnen", "Menü schließen"],
  },
  es: {
    home: "/es/",
    article: "/es/articulos/articulo-demo/",
    category: "/es/secciones/salud/",
    categoryLabel: "Salud",
    emptyCategories: ["es/secciones/consejos", "es/secciones/belleza", "es/secciones/nutricion"],
    body: "Párrafo de prueba en español",
    name: "Español",
    fab: "Hazte distribuidor de LR",
    whatsapp: /text=Hola%20Philippe/,
    shopLabel: "Tienda oficial de LR",
    shopUrl: "https://shop.lrworld.com/home/ES/es?ref=cros",
    transparency: "Transparencia y enlaces de afiliado",
    menu: ["Abrir el menú", "Cerrar el menú"],
  },
} as const;
const published = Object.entries(PUBLISHED) as [keyof typeof PUBLISHED, (typeof PUBLISHED)[keyof typeof PUBLISHED]][];

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
    expect(LOCALES.en).toMatchObject({ prefix: "/en", htmlLang: "en", ogLocale: "en_GB" });
    expect(LOCALES.de).toMatchObject({ prefix: "/de", htmlLang: "de", ogLocale: "de_DE", schemaLang: "de-DE" });
    expect(LOCALES.es).toMatchObject({ prefix: "/es", htmlLang: "es", ogLocale: "es_ES", schemaLang: "es-ES" });
  });

  for (const locale of ["it", "en", "de", "es"] as const) {
    test(`${locale}: interface text and category text are complete`, () => {
      expect(Object.keys(UI[locale]!).sort()).toEqual(Object.keys(UI.fr!).sort());
      for (const [key, value] of Object.entries(UI[locale]!)) {
        if (typeof value === "string" && !["inFrench", "frenchSite"].includes(key)) expect(value, key).not.toBe("");
      }
      const slugs = new Set<string>();
      for (const c of CATEGORY_SLUGS) {
        const text = CATEGORY_I18N[locale]![c];
        expect(text.label && text.description && text.intro.length, c).toBeTruthy();
        expect(text.slug, c).toMatch(/^[a-z-]+$/);
        slugs.add(text.slug);
      }
      expect(slugs.size).toBe(CATEGORY_SLUGS.length);
    });
  }
});

test.describe("translation files", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  const roots = ["src/content/articles", "tests/fixtures/articles"].map((d) => join(process.cwd(), d));
  type T = { locale: string; slug: string; file: string; data: Record<string, string> };
  const all = (): { base: string; t: T }[] => roots.flatMap((base) => (translations(base) as T[]).map((t) => ({ base, t })));

  test("every published translation matches the current French source (not stale)", () => {
    for (const { t } of all().filter(({ t }) => t.data.status === "published")) {
      expect(freshness(t, roots), `${t.locale}/${t.slug}: update it, then run node tools/i18n-status.mjs --stamp ${t.locale}/${t.slug}`).toBe("current");
    }
  });

  test("drafts are complete enough to review: source, stamp, and links to pages of the same language", () => {
    for (const { base, t } of all()) {
      const id = `${t.locale}/${t.slug}`;
      expect(t.data.locale, id).toBe(t.locale);
      expect(["current", "stale"], `${id} needs translationOf + sourceHash`).toContain(freshness(t, roots));
      const { body } = parseMarkdown(readFileSync(t.file, "utf8"));
      for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const target = href.match(new RegExp(`^/${t.locale}/${LOCALES[t.locale as keyof typeof LOCALES].segments.articles}/([a-z0-9-]+)/$`));
        expect(target, `${id} links to ${href}: link to a ${t.locale} article instead`).toBeTruthy();
        expect(existsSync(join(base, t.locale, `${target![1]}.md`)), `${id} → ${href} has no ${t.locale} file`).toBe(true);
      }
    }
  });

  test("titles and descriptions fit search results, already in drafts", () => {
    for (const { t } of all()) {
      const id = `${t.locale}/${t.slug}`;
      expect(t.data.description.length, `${id} description`).toBeGreaterThanOrEqual(50);
      expect(t.data.description.length, `${id} description`).toBeLessThanOrEqual(160);
      expect(t.data.title.length, `${id} title`).toBeLessThanOrEqual(65);
    }
  });

  test("translations use their language's typography (no French space before : ; ? !)", () => {
    for (const { t } of all()) {
      const { data, body } = parseMarkdown(readFileSync(t.file, "utf8"));
      const text = [data.title, data.description, data.coverAlt, body].join("\n").replace(/\]\([^)]*\)/g, "]");
      const bad = text.match(/.{0,20}[ \u00a0\u202f][:;?!](?=\s|$).{0,10}/gm) ?? [];
      expect(bad, `${t.locale}/${t.slug}`).toEqual([]);
    }
  });
});

test.describe("localized pages (static scan)", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  test("translated pages exist only for published content", () => {
    for (const [code, l] of published) {
      for (const path of [l.home, l.article, l.category]) expect(exists(path.slice(1)), `${code} ${path}`).toBe(true);
      // No article in these categories: no page (no empty hub).
      for (const path of l.emptyCategories) expect(exists(path), path).toBe(false);
    }
    // Locales without a published article have no page at all.
    for (const code of LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && !(l in PUBLISHED))) {
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

  test("translated pages are indexable and self-canonical under their prefix", () => {
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
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
    // Demo article, homepages and the Santé category, in fr, it, en, de and es.
    expect(annotated).toBe(15);
    expect(alternatesOf(read("articles/article-demo"))).toEqual({
      fr: `${ORIGIN}/articles/article-demo/`,
      en: `${ORIGIN}/en/articles/demo-article/`,
      de: `${ORIGIN}/de/artikel/demo-artikel/`,
      es: `${ORIGIN}/es/articulos/articulo-demo/`,
      it: `${ORIGIN}/it/articoli/articolo-demo/`,
      "x-default": `${ORIGIN}/articles/article-demo/`,
    });
    expect(alternatesOf(read("rubriques/sante"))).toMatchObject({ it: `${ORIGIN}/it/rubriche/salute/`, en: `${ORIGIN}/en/topics/health/` });
    expect(alternatesOf(read(""))).toMatchObject({ it: `${ORIGIN}/it/`, en: `${ORIGIN}/en/` });
    // A French category with no translated articles has no alternates.
    expect(read("rubriques/beaute")).not.toContain("hreflang");
  });

  test("the sitemap lists translated URLs with the same alternates as the HTML", () => {
    const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    for (const [, loc, body] of sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(.*?)<\/url>/g)) {
      const fromSitemap = Object.fromEntries(
        [...body.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)].map((m) => [m[1], m[2]]),
      );
      const html = read(loc.replace(ORIGIN, "").slice(1));
      expect(fromSitemap, loc).toEqual(alternatesOf(html));
    }
    for (const [, l] of published) {
      for (const path of [l.home, l.article, l.category]) expect(sitemap).toContain(`<loc>${ORIGIN}${path}</loc>`);
    }
  });

  test("links on translated pages stay in their language, or declare the language they lead to", () => {
    const problems: string[] = [];
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
      const prefix = `${LOCALES[localeOf(pathOf(file))].prefix}/`;
      for (const [tag, href] of readFileSync(file, "utf8").matchAll(/<a\b[^>]*\bhref="(\/[^"#]*)[^"]*"[^>]*>/g)) {
        if (href.includes(".")) continue; // files
        if (href.startsWith(prefix)) continue;
        if (/\bhreflang="fr"/.test(tag)) continue; // explicit: French-only page
        // Explicit language switch: hreflang names the language of the target page.
        if (tag.match(/\bhreflang="([^"]+)"/)?.[1] === LOCALES[localeOf(href)].htmlLang) continue;
        problems.push(`${pathOf(file)} → ${href}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("translated pages carry no French interface text and render their own body", () => {
    const french = ["Accueil", "Sommaire", "Relecture", "Publié le", "min de lecture", "Tous les articles", "Lire ·", "Aller au contenu", "Devenir distributeur", "Fil d'Ariane", "Fil d&#39;Ariane", "Rubriques"];
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
      const html = readFileSync(file, "utf8");
      for (const marker of french) expect(html, `${pathOf(file)} contains "${marker}"`).not.toContain(marker);
    }
    for (const [, l] of published) {
      const article = read(l.article.slice(1));
      expect(article).toContain(l.body);
      expect(article).not.toContain("Paragraphe de test");
    }
  });
});

test.describe("localized pages (browser)", () => {
  for (const [code, l] of published) {
    test(`${code}: routes answer 200 and render in that language`, async ({ page }) => {
      for (const path of [l.home, l.article, l.category]) {
        const response = await page.goto(path);
        expect(response?.status(), path).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", LOCALES[code].htmlLang);
      }
      await expect(page.locator("h1")).toHaveText(l.categoryLabel);
    });

    test(`${code}: an article links to its French version and back`, async ({ page }) => {
      await page.goto(l.article);
      await expect(page.locator(".breadcrumb a").first()).toHaveAttribute("href", l.home);
      await page.locator(".article-languages a", { hasText: "Français" }).click();
      await expect(page).toHaveURL(/\/articles\/article-demo\/$/);
      await expect(page.locator(".article-languages a", { hasText: l.name })).toHaveAttribute("href", l.article);
    });

    test(`${code}: distributor invitation, LR shop link and disclosure in that language`, async ({ page }) => {
      await page.goto(l.home);
      const shop = page.locator(".site-footer a", { hasText: l.shopLabel });
      await expect(shop).toHaveAttribute("href", l.shopUrl);
      await expect(shop).toHaveAttribute("rel", /sponsored/);
      await expect(page.locator(".site-footer a", { hasText: l.transparency })).toHaveAttribute("hreflang", "fr");
      const fab = page.locator("[data-distributor-open]");
      await expect(fab).toContainText(l.fab);
      await fab.click();
      const dialog = page.locator("#distributor-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", l.whatsapp);
    });

    test(`${code}: the mobile menu button is labelled in that language`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "menu button is mobile-only");
      await page.goto(l.home);
      const toggle = page.locator("[data-menu-toggle]");
      await expect(toggle).toHaveAttribute("aria-label", l.menu[0]);
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-label", l.menu[1]);
      await expect(page.locator("#mobile-nav a").first()).toHaveAttribute("href", new RegExp(`^${LOCALES[code].prefix}/`));
    });
  }

  test("unknown translated URLs and unpublished locales are real 404s, not French fallbacks", async ({ page, allowConsoleError }) => {
    allowConsoleError(/404/);
    expect((await page.goto("/it/articoli/n-existe-pas/"))?.status()).toBe(404);
    expect((await page.goto("/en/articles/does-not-exist/"))?.status()).toBe(404);
    expect((await page.goto("/de/artikel/gibt-es-nicht/"))?.status()).toBe(404);
    expect((await page.goto("/es/articulos/no-existe/"))?.status()).toBe(404);
    expect((await page.goto("/pl/"))?.status()).toBe(404);
  });
});
