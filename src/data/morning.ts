/*
 * Morning routine planner of the "morning routine for more energy" article
 * (all locales). It orders the article's five habits between waking up and
 * leaving, with durations the reader chooses, and spreads them over weeks,
 * one new habit a week, as the article advises.
 *
 * The durations offered are Aloessential's estimates of a short version of
 * each habit, stated as such on the page; the planner makes no health claim
 * of its own. Free of data imports: the browser script uses it directly.
 */

export const HABITS = ["light", "water", "movement", "breakfast", "screens"] as const;
export type Habit = (typeof HABITS)[number];

/** Durations offered, minutes. Light and water take a minute each (curtains, a glass of water). */
export const MOVEMENT_MINUTES = [5, 10, 15] as const;
export const BREAKFAST_MINUTES = [0, 10, 15, 20] as const;
export const SHOWER_MINUTES = [0, 5, 10, 15] as const;
export const DRESS_MINUTES = 5;
/** Phone-free time after waking, minutes (the article's quarter of an hour). */
export const SCREEN_FREE_MINUTES = 15;

export type StepId = "light" | "water" | "movement" | "shower" | "dress" | "breakfast" | "leave";

export interface RoutineOptions {
  /** Minutes between waking up and leaving. */
  available: number;
  habits: Habit[];
  movement: number;
  shower: number;
  /** 0: breakfast taken away (the article's express version). */
  breakfast: number;
}

export interface RoutineStep {
  id: StepId;
  /** Minutes after waking. */
  start: number;
  duration: number;
}

export interface Routine {
  steps: RoutineStep[];
  /** Minutes the routine needs, up to leaving. */
  needed: number;
  /** Minutes left over (negative: the routine does not fit). */
  spare: number;
  /** Minutes after waking when the phone comes back, or null without the screen habit. */
  phoneFrom: number | null;
}

export function planRoutine(o: RoutineOptions): Routine {
  const has = (h: Habit) => o.habits.includes(h);
  const durations: [StepId, number][] = [
    ["light", has("light") ? 1 : 0],
    ["water", has("water") ? 1 : 0],
    ["movement", has("movement") ? o.movement : 0],
    ["shower", o.shower],
    ["dress", DRESS_MINUTES],
    ["breakfast", has("breakfast") ? o.breakfast : 0],
  ];
  const steps: RoutineStep[] = [];
  let t = 0;
  for (const [id, duration] of durations) {
    if (duration <= 0) continue;
    steps.push({ id, start: t, duration });
    t += duration;
  }
  // Leave at the planned time when the routine fits, otherwise when it ends.
  const leave = Math.max(t, o.available);
  steps.push({ id: "leave", start: leave, duration: 0 });
  return {
    steps,
    needed: t,
    spare: o.available - t,
    phoneFrom: has("screens") ? Math.min(SCREEN_FREE_MINUTES, leave) : null,
  };
}

/**
 * Ways to make a routine that does not fit shorter, in the order they are
 * suggested: shorter movement, then a quicker breakfast, then breakfast taken
 * away. Each returns the options to try, or null when it does not apply.
 */
export function shortenings(o: RoutineOptions): { id: "movement" | "breakfast" | "takeaway"; options: RoutineOptions }[] {
  const out: { id: "movement" | "breakfast" | "takeaway"; options: RoutineOptions }[] = [];
  if (o.habits.includes("movement") && o.movement > MOVEMENT_MINUTES[0])
    out.push({ id: "movement", options: { ...o, movement: MOVEMENT_MINUTES[0] } });
  if (o.habits.includes("breakfast") && o.breakfast > 10) out.push({ id: "breakfast", options: { ...o, breakfast: 10 } });
  if (o.habits.includes("breakfast") && o.breakfast > 0) out.push({ id: "takeaway", options: { ...o, breakfast: 0 } });
  return out;
}

/** "Start small": one new habit a week, in the order of the article, from the habits chosen. */
export function weeklyPlan(habits: Habit[]): Habit[][] {
  const chosen = HABITS.filter((h) => habits.includes(h));
  return chosen.map((_, week) => chosen.slice(0, week + 1));
}

/** "07:00" + 25 → "07:25" (wraps past midnight). */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Minutes from one time to a later one, the same morning or across midnight. */
export function minutesBetween(from: string, to: string): number {
  const toMinutes = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  return (((toMinutes(to) - toMinutes(from)) % 1440) + 1440) % 1440;
}

/** Text for one iCalendar line: escapes \ ; , and new lines (RFC 5545, 3.3.11). */
function icsText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * A daily calendar event for the routine, in floating local time (no time
 * zone: it follows the reader's device). `today` is "YYYYMMDD".
 */
export function routineIcs(o: { wake: string; duration: number; title: string; description: string; today: string; uid: string }): string {
  const [h, m] = o.wake.split(":");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aloessential//Morning routine planner//EN",
    "BEGIN:VEVENT",
    `UID:${o.uid}`,
    `DTSTAMP:${o.today}T000000Z`,
    `DTSTART:${o.today}T${h}${m}00`,
    `DURATION:PT${Math.max(1, o.duration)}M`,
    "RRULE:FREQ=DAILY",
    `SUMMARY:${icsText(o.title)}`,
    `DESCRIPTION:${icsText(o.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

/** Three example routines for the static table, by time available. */
export const EXAMPLES: RoutineOptions[] = [
  { available: 25, habits: [...HABITS], movement: 5, shower: 0, breakfast: 10 },
  { available: 35, habits: [...HABITS], movement: 5, shower: 10, breakfast: 10 },
  { available: 50, habits: [...HABITS], movement: 10, shower: 10, breakfast: 20 },
];
