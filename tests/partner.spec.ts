import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { LR_SHOP_HOME, hasPartnerRef, withPartnerRef } from "../src/lib/partner";

test.describe("partner tag ref=cros", () => {
  test("withPartnerRef adds the tag, replaces stray tracking, ignores other sites", () => {
    expect(withPartnerRef("https://shop.lrworld.com/product?productAlias=81180-99&casrnc=10d52e")).toBe(
      "https://shop.lrworld.com/product?productAlias=81180-99&ref=cros",
    );
    expect(withPartnerRef("https://www.lrworld.com/fr-fr")).toBe("https://www.lrworld.com/fr-fr?ref=cros");
    expect(withPartnerRef("https://www.lrworld.com/fr-fr?ref=other")).toBe("https://www.lrworld.com/fr-fr?ref=cros");
    expect(withPartnerRef("https://example.com/?a=1")).toBe("https://example.com/?a=1");
    expect(hasPartnerRef("https://shop.lrworld.com/x?casrnc=1")).toBe(false);
    // Shop home per locale: tagged, no other LR tracking parameter.
    for (const [locale, url] of Object.entries(LR_SHOP_HOME)) {
      expect(hasPartnerRef(url!), locale).toBe(true);
      expect(url, locale).not.toContain("casrnc");
    }
  });

  test("every LR link in the built site carries ref=cros", ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
    const dist = join(process.cwd(), "dist-test");
    const html = (dir: string): string[] =>
      readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? html(p) : p.endsWith(".html") ? [p] : [];
      });
    const offenders: string[] = [];
    let checked = 0;
    for (const file of html(dist)) {
      for (const [, href] of readFileSync(file, "utf8").matchAll(/href="([^"]*lrworld\.com[^"]*)"/g)) {
        checked++;
        const url = href.replace(/&amp;/g, "&");
        if (!hasPartnerRef(url)) offenders.push(`${file.replace(dist, "")}: ${url}`);
      }
    }
    expect(checked).toBeGreaterThan(10);
    expect(offenders).toEqual([]);
  });
});
