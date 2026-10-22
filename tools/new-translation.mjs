// Starts a translation draft from a French article.
//   node tools/new-translation.mjs <locale> <french-id> <localized-slug>
// Copies the French text as the starting point, marks the file as a draft and
// stamps the French version it starts from. Translate title, description,
// coverAlt and body; adapt (do not word-for-word translate) and follow
// docs/i18n/TRANSLATION_WORKFLOW.md before publishing.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES, frenchFile, parseMarkdown, sourceHash } from "./i18n-lib.mjs";

const [locale, id, slug] = process.argv.slice(2);
if (!locale || !id || !slug) throw new Error("usage: node tools/new-translation.mjs <locale> <french-id> <localized-slug>");
if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("slug: lowercase letters, digits and hyphens only");
const source = readFileSync(frenchFile(id), "utf8");
const target = join(ARTICLES, locale, `${slug}.md`);
if (existsSync(target)) throw new Error(`${target} already exists`);

const { frontMatter, body } = parseMarkdown(source);
// Products stay French-only; everything else is kept for the translator to adapt.
const kept = frontMatter
  .split("\n")
  .filter((line) => !/^(products|featured):/.test(line))
  .join("\n");
mkdirSync(join(ARTICLES, locale), { recursive: true });
writeFileSync(
  target,
  `---\n# Draft: translation of ${id}. Translate title, description, coverAlt and body.\n${kept}\nlocale: ${locale}\ntranslationOf: ${id}\nsourceHash: "${sourceHash(source)}"\nstatus: draft\n---\n${body}`,
);
console.log(`created ${target}`);
