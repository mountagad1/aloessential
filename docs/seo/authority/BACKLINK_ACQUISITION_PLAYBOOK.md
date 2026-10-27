# Backlink acquisition playbook

Earn editorial references with resources people have a reason to cite. No link is bought, exchanged or automated.

## 1. Baseline (unknown today)

- **Backlinks:** no data pulled yet. OpenSEO `get_backlinks_overview` costs credits (none left on 2026-10-27). Search Console → Links shows the external links Google has found; export it monthly. **Owner action.**
- **Brand mentions:** a near-identical name exists, "AloEssentials", a different business listed in directories (`docs/growth/GROWTH_ENGINEERING_STRATEGY.md`). Never claim its mentions.
- **Legacy domain:** an earlier site lived on this domain (`/product/aloe-first-spray/` 404). The Search Console 404 export will show whether old URLs still receive links (SEO-03).

## 2. Assets worth citing

| Asset | Why someone would link to it | Likely linkers |
| --- | --- | --- |
| High-fibre foods table (7 languages) | Ciqual values per 100 g and per portion, EU claim thresholds, a day calculator; sources and licence shown | dietitians' blogs, school and health-education pages, digestive-health forums, recipe sites |
| Water-per-day calculator and water-rich foods | EFSA values by profile, with the share from food; NHS guidance | sports clubs, school nurses, heat-wave advice pages, senior-care sites |
| Aloe vera watering planner | the only rhythm tool in the French SERP; RHS and extension sources | plant forums, garden centres' blogs, houseplant newsletters |
| "Aloe vera juice: what science says" | regulatory and evidence summary | pharmacy and consumer-information sites |

## 3. Process

1. **Find:** pages that already list resources on the topic ("ressources nutrition", "liens utiles", "fiches pratiques"), broken links to similar resources, and recent articles that quote a figure we source better. Search manually; record every candidate.
2. **Qualify:** keep a page only if it is relevant, has a real readership, publishes under editorial control, and has no "sponsored post" pricing.
3. **Write one tailored message:** name the page and section, what the resource adds for its readers, and how its figures are sourced. No templates sent in bulk, no invented familiarity.
4. **Follow up once** after 10 days, then stop.
5. **Track** in `docs/seo/authority/outreach-log.csv` (create when the first contact is made):
   - columns: date, site, page, contact role, asset, status (contacted, replied, linked, declined), link URL, rel attribute;
   - no personal email addresses in the repository.
6. **Measure:** links found in Search Console → Links; referral visits once analytics exist.

## 4. Never

- No private blog networks, link exchanges, paid links meant to rank, or guest posts written for links.
- No fake personas or fabricated endorsements. No automated mass email.
- No promise of a ranking change from a given link.
- A paid placement or sponsorship, if the owner ever buys one, carries `rel="sponsored"` on the partner's side; Aloessential's own LR links already carry `rel="sponsored"`.
