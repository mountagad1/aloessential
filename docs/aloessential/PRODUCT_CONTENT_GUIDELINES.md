# Aloessential — Product Page Guidelines

How LR Health & Beauty product pages are written, sourced and published on Aloessential. Product pages convert by being **the most useful and trustworthy page a reader can find about the product**, not by pressure. In this category, credibility and legal compliance are what make the pages sell.

> This document is editorial guidance, not legal advice. For anything uncertain, check with LR's partner compliance team or a lawyer.

---

## 1. Sourcing: no fact without a source

| Field | Source | Rule |
| --- | --- | --- |
| `name`, `sku`, `shopUrl` | The partner link | Copied exactly |
| `format`, `composition`, `usage`, `precautions` | Official LR product page or packaging (FR) | Copied, never inferred, rounded or "completed" |
| Health and cosmetic statements | The official page, filtered through section 3 | Only what the regulation allows |
| `sourceCheckedAt` | The day the official page was read | Required before `status: published` |
| Price | Not stored | Prices change. The page sends readers to the shop for price and availability |

If a figure isn't on the official page, leave it out. "Quantité" shows "—" when LR gives no amount for an ingredient.

---

## 2. Page anatomy (src/pages/produits/[slug].astro)

1. **Hero:** range and type, name, a one-line promise (`tagline`), a 2-sentence `summary`, the primary CTA ("Voir sur la boutique LR"), a secondary CTA ("Lire notre avis"), key facts, and the inline partner disclosure.
2. **Highlights:** up to 4 short, compliant benefit blocks.
3. **Notre avis:** the Markdown body. This is the real added value: what the product is, how it fits a routine, how it compares within the LR range, and who it isn't for.
4. **Pour qui ?**
5. **Composition:** a table taken from the label.
6. **Mode d'emploi:** numbered steps.
7. **Précautions:** the product's own warnings. For `kind: complement`, the three mandatory French mentions are added automatically.
8. **FAQ:** real questions, answered from the official data.
9. **Final CTA:** with a note that order, payment and delivery are handled by LR.
10. **Related articles:** articles that cite the product first.

The mobile purchase bar appears only between the hero CTA and the final CTA.

### Writing for conversion, without pressure

* Lead with the reader's situation, not with superlatives.
* Be specific: format, how long a pack lasts at the recommended dose (calculated from official figures only), and what makes this product different from its LR siblings.
* Say who the product is **not** for. It raises trust and lowers returns.
* No fake urgency ("plus que 3 en stock"), no invented testimonials or reviews, no star ratings without real reviews, and no before/after claims.
* A CTA on every screen is too many. Use three: hero, final, and the mobile bar.

---

## 3. What we may and may not say

### Food supplements (`kind: complement`): Regulation (EC) 1924/2006

* **Allowed:** authorised health claims from the EU Register, worded as authorised, and only when the product contains a *significant amount* of the nutrient (generally ≥ 15% of NRV per daily dose). For example: "La vitamine C contribue au fonctionnement normal du système immunitaire."
* The claim is about the **nutrient**, and the page must state which nutrient carries it.
* **Botanical claims** (aloe vera, plant extracts) are mostly "on hold" at EU level. Use them conservatively, or not at all. Prefer authorised vitamin and mineral claims.
* **Never:** prevention, treatment or cure of a disease ("soigne", "guérit", "contre l'arthrose", "renforce l'immunité contre les virus"). No "détox". No weight-loss figures. No claims that a balanced diet isn't enough.
* **Aloe and hydroxyanthracenes:** Regulation (EU) 2021/468 restricts aloe-emodin, emodin and preparations containing them. Mention the processing (e.g. aloin-reduced) only if LR states it.
* **Mandatory mentions** (décret n° 2006-352): these are added automatically by the template.

### Cosmetics (`kind: soin`): Regulation (EC) 1223/2009 and (EU) 655/2013

* **Allowed:** cosmetic functions such as cleanse, hydrate, soothe, protect, improve the look of the skin, and perfume.
* **Never:** medicinal claims such as "cicatrise", "soigne les brûlures", "traite l'eczéma" or "antibactérien" in a therapeutic sense. An "emergency" spray is presented for everyday skin comfort, not as first aid for wounds or burns.
* Claims must be supported (truthfulness and evidential support). Repeat LR's tested claims as LR words them, attributed ("selon LR…").

### Sets (`kind: set`)

* Describe what's in the box using the official list. Apply the rules above to each item.

---

## 4. Transparency

* Every page with a shop link shows the inline disclosure near the first CTA, and the final CTA repeats it.
* Shop links use `rel="sponsored noopener"` and open in a new tab, which is announced to screen readers.
* `/transparence/` explains the partnership, says Aloessential is not an official LR site, and explains that LR handles orders.
* Articles link to **our product pages**, which carry the full context, never straight to the shop.

---

## 5. Pre-publication checklist

- [ ] Every composition, dose, format and usage line matches the official FR page, and `sourceCheckedAt` is set.
- [ ] Every health claim is an authorised EU claim, linked to a nutrient present in a significant amount, or removed.
- [ ] No disease, treatment, cure, "détox" or medicinal cosmetic wording.
- [ ] Precautions from the label are copied. Supplement mentions show automatically.
- [ ] "Not for" guidance is included (pregnancy, children, treatments, allergies) where the label or common sense calls for it.
- [ ] The partner disclosure is visible, and `shopUrl` is the correct partner link.
- [ ] At least one supporting article links to the product (`products: [slug]` in its front matter).
- [ ] `status: published` and `npx playwright test` passes.
