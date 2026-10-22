// Translation status: coverage per locale, drafts, and translations whose
// French source changed since they were translated (stale).
//   node tools/i18n-status.mjs                 report
//   node tools/i18n-status.mjs --strict        exit 1 if a published translation is stale/unstamped
//   node tools/i18n-status.mjs --stamp it/slug record that it/slug matches the current French source
// docs/i18n/TRANSLATION_WORKFLOW.md
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES, freshness, frenchFile, sourceHash, translations } from "./i18n-lib.mjs";

const args = process.argv.slice(2);

if (args[0] === "--stamp") {
  const id = args[1];
  if (!id?.includes("/")) throw new Error("usage: --stamp <locale>/<slug>");
  const file = join(ARTICLES, `${id}.md`);
  const text = readFileSync(file, "utf8");
  const source = text.match(/^translationOf:\s*(\S+)/m)?.[1];
  if (!source) throw new Error(`${id}: no translationOf`);
  const hash = sourceHash(readFileSync(frenchFile(source), "utf8"));
  const updated = /^sourceHash:/m.test(text)
    ? text.replace(/^sourceHash:.*$/m, `sourceHash: "${hash}"`)
    : text.replace(/^(translationOf:.*)$/m, `$1\nsourceHash: "${hash}"`);
  writeFileSync(file, updated);
  console.log(`${id}: sourceHash ${hash} (matches ${source})`);
  process.exit(0);
}

const french = readdirSync(ARTICLES).filter((n) => n.endsWith(".md")).map((n) => n.replace(/\.md$/, "")).sort();
const all = translations();
const locales = [...new Set(all.map((t) => t.locale))].sort();

let problems = 0;
for (const locale of locales) {
  const mine = all.filter((t) => t.locale === locale);
  const bySource = new Map(mine.map((t) => [t.data.translationOf, t]));
  const published = mine.filter((t) => t.data.status === "published");
  console.log(`\n${locale}: ${published.length} published, ${mine.length - published.length} draft, ${french.length - bySource.size} not started (of ${french.length} French articles)`);
  for (const id of french) {
    const t = bySource.get(id);
    if (!t) {
      console.log(`  ·  ${id}`);
      continue;
    }
    const state = freshness(t);
    const status = t.data.status ?? "published";
    const flag = state === "current" ? "" : `  ← ${state}`;
    if (status === "published" && state !== "current") problems++;
    console.log(`  ${status === "published" ? "✓" : "✎"}  ${id}  →  ${locale}/${t.slug}  [${status}${t.data.translationReviewer ? `, reviewed by ${t.data.translationReviewer}` : ""}]${flag}`);
  }
  for (const t of mine.filter((t) => !french.includes(t.data.translationOf))) {
    console.log(`  !  ${locale}/${t.slug}: translationOf "${t.data.translationOf}" has no French source`);
    problems++;
  }
}
console.log(`\nLegend: ✓ published · ✎ draft · · not started · stale = French source changed since translation`);
if (args.includes("--strict") && problems) {
  console.error(`\n${problems} published translation(s) need attention`);
  process.exit(1);
}
