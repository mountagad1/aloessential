import { test, expect } from "./fixtures";
import { QUESTIONS, bottleMaths, checkLabel, verdict, type Answers } from "../src/data/aloe-label";
import { ALOE_LABEL_HEADINGS, ALOE_LABEL_UI } from "../src/i18n/aloe-label-ui";
import { articlePath, type Locale } from "../src/i18n/locales";

/* Aloe drink label checker (backlog EAM-04), inside the aloe drinks article in every locale. */

const ARTICLES: Record<Locale, string> = {
  fr: "aloe-vera-a-boire-comment-choisir",
  en: "aloe-vera-drinks-how-to-choose",
  es: "aloe-vera-para-beber-como-elegirlo",
  de: "aloe-vera-trinken-worauf-achten",
  it: "aloe-vera-da-bere-come-sceglierla",
  "pt-pt": "aloe-vera-para-beber-como-escolher",
  pl: "aloes-do-picia-jak-wybrac",
};

const clean: Answers = {
  form: "innerGel",
  first: "yes",
  sweet: "none",
  claims: "nutrient",
  dose: "yes",
  labelling: "yes",
  certified: "yes",
};

test.describe("label rules", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "pure functions run once");
  });

  test("a clear label is all good; the most serious answer sets the verdict", () => {
    expect(verdict(checkLabel(clean))).toBe("good");
    expect(verdict(checkLabel({ ...clean, form: "wholeLeaf" }))).toBe("check");
    expect(verdict(checkLabel({ ...clean, sweet: "sugars", claims: "disease" }))).toBe("stop");
    expect(verdict(checkLabel({ ...clean, labelling: "no" }))).toBe("stop");
  });

  test("aloe claims are on hold, not banned; disease claims are forbidden", () => {
    const level = (claims: Answers["claims"]) => checkLabel({ ...clean, claims }).find((f) => f.question === "claims")?.level;
    expect(level("aloe")).toBe("check");
    expect(level("disease")).toBe("stop");
    expect(level("nutrient")).toBe("good");
  });

  test("every answer has a text in every locale", () => {
    for (const [locale, ui] of Object.entries(ALOE_LABEL_UI)) {
      for (const [q, answers] of Object.entries(QUESTIONS)) {
        for (const answer of answers) {
          expect((ui.checker.options as Record<string, Record<string, string>>)[q][answer], `${locale} ${q} ${answer}`).toBeTruthy();
          expect((ui.checker.explanations as Record<string, Record<string, string>>)[q][answer], `${locale} ${q} ${answer}`).toBeTruthy();
        }
      }
    }
  });

  test("bottle maths follow the article's example", () => {
    // 1 litre at 3 × 30 ml a day lasts about ten days; at 30 ml, more than a month.
    expect(bottleMaths({ volume: 1000, dose: 90 })?.days).toBe(11);
    expect(bottleMaths({ volume: 1000, dose: 30 })?.days).toBe(33);
    expect(bottleMaths({ volume: 1000, dose: 90, price: 30 })?.perDay).toBe(2.7);
    expect(bottleMaths({ volume: 1000, dose: 30, openedDays: 30 })?.outlastsOpened).toBe(true);
    expect(bottleMaths({ volume: 1000, dose: 90, openedDays: 30 })?.outlastsOpened).toBe(false);
    expect(bottleMaths({ volume: 0, dose: 30 })).toBeNull();
  });
});

test.describe("label checker in the article", () => {
  for (const [locale, slug] of Object.entries(ARTICLES) as [Locale, string][]) {
    const a = ALOE_LABEL_UI[locale];
    test(`${locale}: ${slug} shows the checklist and checks a label`, async ({ page }) => {
      await page.goto(articlePath(locale, slug));
      await expect(page.locator(".aloe-label-grid tbody tr")).toHaveCount(6);
      await expect(page.locator(`.toc a[href="#${ALOE_LABEL_HEADINGS.checker}"]`)).toHaveCount(1);

      const checker = page.locator("[data-aloe-label]");
      await expect(checker).toBeVisible();
      const answers: Answers = { ...clean, form: "wholeLeaf", claims: "disease" };
      for (const [q, v] of Object.entries(answers)) await checker.locator(`input[name="${q}"][value="${v}"]`).check();
      await page.locator("#aloe-volume").fill("1000");
      await page.locator("#aloe-dose").fill("90");
      await page.locator("#aloe-price").fill("30");
      await checker.locator("[data-aloe-label-form] button").click();

      await expect(checker.locator("[data-aloe-label-verdict]")).toHaveText(a.checker.verdicts.stop);
      const findings = checker.locator("[data-aloe-label-findings] li");
      await expect(findings).toHaveCount(7);
      await expect(findings.first()).toHaveAttribute("data-level", "stop");
      await expect(findings.first()).toContainText(a.checker.explanations.claims.disease);
      await expect(checker.locator("[data-aloe-label-bottle]")).toContainText("11");
    });
  }
});

test.describe("label checker without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the checklist and method are readable; the checker stays hidden", async ({ page }) => {
    await page.goto(articlePath("es", ARTICLES.es));
    await expect(page.locator(".aloe-label-grid tbody tr")).toHaveCount(6);
    await expect(page.locator("[data-aloe-label]")).toBeHidden();
    await expect(page.getByRole("heading", { name: ALOE_LABEL_UI.es.method.title })).toBeVisible();
  });
});
