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
 * entry shows no shop link. Italian: shop.lrworld.com/home/IT/it, supplied by
 * the publisher on 2026-10-22 (verified: Italian shop, ref=cros kept after LR's
 * redirects).
 */
export const LR_SHOP_HOME: Partial<Record<string, string>> = {
  fr: LR_HOME_URL,
  it: `https://shop.lrworld.com/home/IT/it?ref=${PARTNER_REF}`,
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
