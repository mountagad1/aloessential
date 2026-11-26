/*
 * Aloe drink label checker (backlog EAM-04), shown inside the "aloe vera
 * drinks: how to choose" article in every locale.
 *
 * It turns the article's five label points into questions and reports, for
 * each answer, what it means: a good sign, a point to check with the seller,
 * or a reason to put the bottle back. Every rule restates the article and the
 * EU texts it cites; none rates the product's effect on health. It also works
 * out how long a bottle lasts at the stated daily dose and what that costs a
 * day, as the article explains. Free of data imports: the browser script uses
 * it directly.
 *
 * Regulatory status checked on 2026-11-26: Regulation (EU) 2021/468 applies;
 * the General Court's annulment of its aloe-leaf part (T-189/21) takes effect
 * only if the appeal C-38/25 P is dismissed.
 */

export const REGULATORY_CHECK = "2026-11-26";

export const QUESTIONS = {
  /** Which part of the leaf the aloe comes from, as the label states it. */
  form: ["innerGel", "filteredWholeLeaf", "wholeLeaf", "notStated"],
  /** Is aloe the first ingredient of the list (descending order of weight)? */
  first: ["yes", "no"],
  /** Sweetening, from the ingredient list. */
  sweet: ["none", "sugars", "sweeteners"],
  /**
   * The strongest claim on the pack: none; an authorised claim for an added
   * vitamin or mineral; a benefit attributed to the aloe itself (digestion,
   * "detox"…: on hold at EU level, never authorised); or preventing, treating
   * or curing a disease (forbidden for any food, Regulation (EU) No 1169/2011,
   * article 7(3)).
   */
  claims: ["none", "nutrient", "aloe", "disease"],
  /** Is a daily dose stated? */
  dose: ["yes", "no"],
  /** Ingredient list in your language and an EU business address? */
  labelling: ["yes", "no"],
  /** Independent certification of the aloe (for example IASC)? */
  certified: ["yes", "no"],
} as const;

export type Question = keyof typeof QUESTIONS;
export type Answers = { [Q in Question]: (typeof QUESTIONS)[Q][number] };

/** good: a good sign; check: ask or look further; stop: a reason to choose another product. */
export type Level = "good" | "check" | "stop";

export interface Finding {
  question: Question;
  /** Key of the explanation: `${question}.${answer}`. */
  key: string;
  level: Level;
}

const LEVELS: { [Q in Question]: Record<Answers[Q], Level> } = {
  form: { innerGel: "good", filteredWholeLeaf: "good", wholeLeaf: "check", notStated: "check" },
  first: { yes: "good", no: "check" },
  sweet: { none: "good", sugars: "check", sweeteners: "check" },
  claims: { none: "good", nutrient: "good", aloe: "check", disease: "stop" },
  dose: { yes: "good", no: "check" },
  labelling: { yes: "good", no: "stop" },
  certified: { yes: "good", no: "check" },
};

export function checkLabel(answers: Partial<Answers>): Finding[] {
  return (Object.keys(QUESTIONS) as Question[])
    .filter((q) => answers[q] !== undefined)
    .map((q) => {
      const answer = answers[q] as string;
      return { question: q, key: `${q}.${answer}`, level: (LEVELS[q] as Record<string, Level>)[answer] };
    });
}

/** The overall verdict is the most serious finding. */
export function verdict(findings: Finding[]): Level {
  if (findings.some((f) => f.level === "stop")) return "stop";
  if (findings.some((f) => f.level === "check")) return "check";
  return "good";
}

export interface BottleMaths {
  /** Days one bottle lasts at the daily dose (rounded down). */
  days: number;
  /** Price per day, two decimals, or null without a price. */
  perDay: number | null;
  /** True when the bottle outlasts its shelf life once opened: a smaller size fits better. */
  outlastsOpened: boolean | null;
}

/** Bottle volume and daily dose in ml, price in the reader's currency, shelf life once opened in days. */
export function bottleMaths(o: { volume: number; dose: number; price?: number; openedDays?: number }): BottleMaths | null {
  if (!(o.volume > 0) || !(o.dose > 0)) return null;
  const days = Math.floor(o.volume / o.dose);
  return {
    days,
    perDay: o.price && o.price > 0 && days > 0 ? Math.round((o.price / (o.volume / o.dose)) * 100) / 100 : null,
    outlastsOpened: o.openedDays && o.openedDays > 0 ? days > o.openedDays : null,
  };
}
