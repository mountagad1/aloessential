import { readFileSync } from "node:fs";
import { test, expect } from "./fixtures";
import {
  EXAMPLES,
  HABITS,
  SCREEN_FREE_MINUTES,
  addMinutes,
  minutesBetween,
  planRoutine,
  routineIcs,
  shortenings,
  weeklyPlan,
} from "../src/data/morning";
import { MORNING_HEADINGS, MORNING_UI } from "../src/i18n/morning-ui";
import { WATER_UI } from "../src/i18n/water-ui";
import { articlePath, type Locale } from "../src/i18n/locales";

/* Morning routine planner, inside the morning-routine article in every locale. */

const ARTICLES: Record<Locale, string> = {
  fr: "routine-matin-energie",
  en: "morning-routine-for-more-energy",
  es: "rutina-de-manana-para-mas-energia",
  de: "morgenroutine-fuer-mehr-energie",
  it: "routine-del-mattino-energia",
  "pt-pt": "rotina-da-manha-para-mais-energia",
  pl: "poranna-rutyna-wiecej-energii",
};

test.describe("morning routine rules", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "pure functions run once");
  });

  const all = { available: 40, habits: [...HABITS], movement: 10, shower: 10, breakfast: 15 };

  test("steps follow the article's order and add up", () => {
    const r = planRoutine(all);
    expect(r.steps.map((s) => s.id)).toEqual(["light", "water", "movement", "shower", "dress", "breakfast", "leave"]);
    expect(r.needed).toBe(1 + 1 + 10 + 10 + 5 + 15);
    expect(r.spare).toBe(40 - r.needed);
    for (let i = 1; i < r.steps.length - 1; i++) expect(r.steps[i].start).toBe(r.steps[i - 1].start + r.steps[i - 1].duration);
    expect(r.phoneFrom).toBe(SCREEN_FREE_MINUTES);
  });

  test("habits left out drop their steps; a routine that does not fit gets shorter options", () => {
    const r = planRoutine({ ...all, habits: ["water"], shower: 0 });
    expect(r.steps.map((s) => s.id)).toEqual(["water", "dress", "leave"]);
    expect(r.phoneFrom).toBeNull();
    const tight = { ...all, available: 20 };
    expect(planRoutine(tight).spare).toBeLessThan(0);
    expect(shortenings(tight).map((s) => s.id)).toEqual(["movement", "breakfast", "takeaway"]);
    for (const s of shortenings(tight)) expect(planRoutine(s.options).needed).toBeLessThan(planRoutine(tight).needed);
  });

  test("the sample routines fit their time", () => {
    for (const o of EXAMPLES) expect(planRoutine(o).spare, String(o.available)).toBeGreaterThanOrEqual(0);
  });

  test("one new habit a week, in the article's order", () => {
    expect(weeklyPlan(["screens", "light", "water"])).toEqual([["light"], ["light", "water"], ["light", "water", "screens"]]);
  });

  test("clock arithmetic wraps around midnight", () => {
    expect(addMinutes("07:00", 25)).toBe("07:25");
    expect(addMinutes("00:10", -20)).toBe("23:50");
    expect(minutesBetween("06:45", "07:30")).toBe(45);
    expect(minutesBetween("23:50", "00:20")).toBe(30);
  });

  test("the calendar file is a daily event with escaped text", () => {
    const ics = routineIcs({ wake: "06:30", duration: 32, title: "Routine, matin", description: "a;b\nc", today: "20261126", uid: "x@aloessential.com" });
    expect(ics).toContain("DTSTART:20261126T063000\r\n");
    expect(ics).toContain("DURATION:PT32M\r\n");
    expect(ics).toContain("RRULE:FREQ=DAILY\r\n");
    expect(ics).toContain("SUMMARY:Routine\\, matin\r\n");
    expect(ics).toContain("DESCRIPTION:a\\;b\\nc\r\n");
  });
});

test.describe("morning routine planner in the article", () => {
  for (const [locale, slug] of Object.entries(ARTICLES) as [Locale, string][]) {
    const m = MORNING_UI[locale];
    test(`${locale}: ${slug} shows the samples and plans a morning`, async ({ page }) => {
      await page.goto(articlePath(locale, slug));
      await expect(page.locator(".morning-examples tbody tr")).toHaveCount(7);
      await expect(page.locator(`.toc a[href="#${MORNING_HEADINGS.planner}"]`)).toHaveCount(1);
      await expect(page.locator(`.morning-links a[href="${articlePath(locale, m.breakfastArticle)}"]`)).toHaveCount(1);
      await expect(page.locator(`.morning-links a[href="${WATER_UI[locale].path}"]`)).toHaveCount(1);

      const planner = page.locator("[data-morning]");
      await expect(planner).toBeVisible();
      // Default: 07:00 to 07:45, every habit: 1 + 1 + 10 + 10 + 5 + 15 = 42 min, it fits.
      await expect(planner.locator("[data-morning-suggestions]")).toBeHidden();
      await expect(planner.locator("[data-morning-schedule] li").first()).toContainText("07:00");

      // Leaving at 07:30 is 12 min short: three ways to shorten, plus an earlier alarm.
      await page.locator("#morning-leave").fill("07:30");
      await planner.locator("[data-morning-form] button").click();
      await expect(planner.locator("[data-morning-suggestions] li")).toHaveCount(4);
      await expect(planner.locator("[data-morning-suggestions] li").last()).toContainText("06:48");

      await page.locator("#morning-leave").fill("08:00");
      await planner.locator("[data-morning-form] button").click();
      await expect(planner.locator("[data-morning-suggestions]")).toBeHidden();
      await expect(planner.locator("[data-morning-schedule] li")).toHaveCount(7);
      await expect(planner.locator("[data-morning-schedule] li").last()).toContainText("08:00");
      await expect(planner.locator("[data-morning-phone]")).toContainText("07:15");
      await expect(planner.locator("[data-morning-weeks] li")).toHaveCount(5);
    });
  }

  test("the calendar button downloads a daily event", async ({ page }) => {
    await page.goto(articlePath("en", ARTICLES.en));
    const download = page.waitForEvent("download");
    await page.locator("[data-morning-ics]").click();
    const file = await (await download).path();
    const ics = readFileSync(file, "utf8");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("T070000\r\n");
    expect(ics).toContain("RRULE:FREQ=DAILY");
  });
});

test.describe("morning routine planner without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the sample routines, method and links are readable; the planner stays hidden", async ({ page }) => {
    await page.goto(articlePath("fr", ARTICLES.fr));
    await expect(page.locator(".morning-examples tbody tr")).toHaveCount(7);
    await expect(page.locator("[data-morning]")).toBeHidden();
    await expect(page.getByRole("heading", { name: MORNING_UI.fr.method.title })).toBeVisible();
    await expect(page.locator(".morning-links a")).toHaveCount(2);
  });
});
