/**
 * LR partner tracking. Every link to an LR site must carry `ref=cros`.
 * Use `withPartnerRef()` for any LR URL; the content schema rejects LR links
 * without the tag and the test suite scans the built HTML for strays.
 */

export const PARTNER_REF = "cros";

/** LR France home page with the partner tag. */
export const LR_HOME_URL = `https://www.lrworld.com/fr-fr?ref=${PARTNER_REF}`;

/**
 * LR shop home per site locale, with the partner tag. A locale without an
 * entry shows no shop link. Links supplied by the publisher on 2026-10-22 and
 * verified (right country shop, ref=cros kept after LR's redirects).
 */
export const LR_SHOP_HOME: Partial<Record<string, string>> = {
  fr: LR_HOME_URL,
  it: `https://shop.lrworld.com/home/IT/it?ref=${PARTNER_REF}`,
  // Great Britain shop (English, GBP), supplied by the publisher; verified 2026-10-22.
  en: `https://shop.lrworld.com/home/GB/en?ref=${PARTNER_REF}`,
  // Germany shop (German, EUR), supplied by the publisher; verified 2026-10-22.
  de: `https://shop.lrworld.com/home/DE/de?ref=${PARTNER_REF}`,
  // Spain shop (Spanish, EUR), supplied by the publisher; verified 2026-10-23.
  es: `https://shop.lrworld.com/home/ES/es?ref=${PARTNER_REF}`,
  // Portugal: the shop link supplied (shop.lrworld.com/PT/pt) answers 404, and
  // /home/PT/pt ends on the LR login page for visitors without an account
  // (checked 2026-10-23). LR Portugal's site is used instead, as for France.
  "pt-pt": `https://www.lrworld.com/pt-pt?ref=${PARTNER_REF}`,
  // Poland shop (Polish, PLN), supplied by the publisher; verified 2026-10-23.
  pl: `https://shop.lrworld.com/home/PL/pl?ref=${PARTNER_REF}`,
};

export function isLrUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "lrworld.com" || host.endsWith(".lrworld.com");
  } catch {
    return false;
  }
}

/**
 * Returns the URL with `ref=cros` set. Other tracking parameters copied from
 * shared links (e.g. `casrnc`) are dropped so attribution is unambiguous.
 * Non-LR URLs are returned unchanged.
 */
export function withPartnerRef(url: string): string {
  if (!isLrUrl(url)) return url;
  const u = new URL(url);
  u.searchParams.delete("casrnc");
  u.searchParams.set("ref", PARTNER_REF);
  return u.toString();
}

export function hasPartnerRef(url: string): boolean {
  return !isLrUrl(url) || new URL(url).searchParams.get("ref") === PARTNER_REF;
}
