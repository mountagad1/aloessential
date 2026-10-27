/*
 * Aloe vera watering planner (backlog EAM-03): deterministic rules shared by
 * the static summary table (built into the HTML, readable without JavaScript)
 * and the in-browser planner. No data leaves the browser.
 *
 * The rules turn what horticultural sources agree on into a rhythm:
 *   - water only when the compost is dry, hardly at all in winter (RHS);
 *   - water thoroughly when the surface is dry during the growing season,
 *     reduce in autumn and winter, never let the pot stand in water
 *     (Penn State Extension);
 *   - check the top 2.5 cm of soil, use a well-drained mix and avoid oversized
 *     pots, which hold too much moisture (UF/IFAS).
 * The day counts are Aloessential's own estimate, calibrated on the growing
 * guide ("every two or three weeks in spring and summer"), not a measurement: the
 * finger test always has the last word. Documented on the page ("Method").
 */

export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export const POTS = ["terracotta", "plastic"] as const;
export const DRAINAGE = ["yes", "no"] as const;
export const SIZES = ["small", "medium", "large"] as const;
export const POSITIONS = ["window", "room", "outdoors"] as const;
export const TEMPERATURES = ["cool", "mild", "hot"] as const;

export type Season = (typeof SEASONS)[number];
export type Pot = (typeof POTS)[number];
export type Drainage = (typeof DRAINAGE)[number];
export type Size = (typeof SIZES)[number];
export type Position = (typeof POSITIONS)[number];
export type Temperature = (typeof TEMPERATURES)[number];

export interface PlannerInput {
  season: Season;
  pot: Pot;
  drainage: Drainage;
  size: Size;
  position: Position;
  temperature: Temperature;
}

/** Days between waterings for a medium terracotta pot on a sunny window at 15–24 °C. */
export const BASE_DAYS: Record<Season, number> = { spring: 17, summer: 14, autumn: 24, winter: 40 };

/** Multipliers: above 1, the compost stays wet longer. */
export const FACTORS = {
  pot: { terracotta: 1, plastic: 1.3 } as Record<Pot, number>,
  size: { small: 0.75, medium: 1, large: 1.3 } as Record<Size, number>,
  position: { window: 1, room: 1.25, outdoors: 0.8 } as Record<Position, number>,
  temperature: { cool: 1.4, mild: 1, hot: 0.8 } as Record<Temperature, number>,
  /** No drainage hole: water cannot escape, so the rhythm slows down. */
  noDrainage: 1.5,
};

export const MIN_DAYS = 5;
export const MAX_DAYS = 60;

export type Warning = "drainage" | "frost" | "winterRest";

export interface PlannerResult {
  /** Indicative rhythm, in days between two waterings. */
  from: number;
  to: number;
  warnings: Warning[];
}

const clamp = (n: number) => Math.min(MAX_DAYS, Math.max(MIN_DAYS, Math.round(n)));

export function plan(input: PlannerInput): PlannerResult {
  const days =
    BASE_DAYS[input.season] *
    FACTORS.pot[input.pot] *
    FACTORS.size[input.size] *
    FACTORS.position[input.position] *
    FACTORS.temperature[input.temperature] *
    (input.drainage === "no" ? FACTORS.noDrainage : 1);
  const warnings: Warning[] = [];
  if (input.drainage === "no") warnings.push("drainage");
  if (input.position === "outdoors" && (input.season === "winter" || input.temperature === "cool")) warnings.push("frost");
  if (input.season === "winter" || (input.season === "autumn" && input.temperature === "cool")) warnings.push("winterRest");
  return { from: clamp(days * 0.8), to: clamp(days * 1.2), warnings };
}

/** Assumptions behind the static table: everything except season and pot. */
export const TABLE_DEFAULTS = { drainage: "yes", size: "medium", position: "window", temperature: "mild" } as const;

/** Northern-hemisphere season of a month (0 = January). */
export function seasonOfMonth(month: number): Season {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export const WATERING_SOURCES = [
  {
    publisher: "Royal Horticultural Society (RHS)",
    title: "Aloe plants including Aloe vera (Indoor plants resources)",
    url: "https://www.rhs.org.uk/getmedia/0c05ef69-cf63-4b18-bc04-17af6b014c67/Indoor-plants-resources",
  },
  {
    publisher: "Penn State Extension",
    title: "Aloe, a Hardy Houseplant",
    url: "https://extension.psu.edu/aloe-a-hardy-houseplant",
  },
  {
    publisher: "University of Florida IFAS, Gardening Solutions",
    title: "Aloe Vera",
    url: "https://gardeningsolutions.ifas.ufl.edu/plants/houseplants/aloe.html",
  },
] as const;
