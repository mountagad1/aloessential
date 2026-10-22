// Shared helpers for the translation tools and tests (no dependencies).
// docs/i18n/TRANSLATION_WORKFLOW.md
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const ROOT = new URL("..", import.meta.url).pathname;
export const ARTICLES = join(ROOT, "src/content/articles");

/** Front matter (simple `key: value` lines) and body of a Markdown file. */
export function parseMarkdown(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("no front matter");
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
  }
  return { frontMatter: match[1], data, body: match[2] };
}

/**
 * Fingerprint of what a translator translates in a French article: title,
 * description and body. Changes to other fields (products, dates, covers)
 * do not make a translation stale.
 */
export function sourceHash(frenchText) {
  const { data, body } = parseMarkdown(frenchText);
  const basis = [data.title ?? "", data.description ?? "", body.trim()].join("\n");
  return createHash("sha256").update(basis).digest("hex").slice(0, 12);
}

export function frenchFile(id, base = ARTICLES) {
  return join(base, `${id}.md`);
}

/** All translation files: { locale, slug, file, data }. */
export function translations(base = ARTICLES) {
  const out = [];
  for (const locale of readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    for (const name of readdirSync(join(base, locale)).filter((n) => n.endsWith(".md"))) {
      const file = join(base, locale, name);
      out.push({ locale, slug: name.replace(/\.md$/, ""), file, data: parseMarkdown(readFileSync(file, "utf8")).data });
    }
  }
  return out;
}

/**
 * "current" | "stale" | "unstamped" | "orphan" for one translation. `bases`:
 * folder(s) holding French sources (tests add the fixture folder).
 */
export function freshness(t, bases = [ARTICLES]) {
  const source = [bases].flat().map((b) => frenchFile(t.data.translationOf, b)).find((f) => existsSync(f));
  if (!source) return "orphan";
  if (!t.data.sourceHash) return "unstamped";
  return t.data.sourceHash === sourceHash(readFileSync(source, "utf8")) ? "current" : "stale";
}
