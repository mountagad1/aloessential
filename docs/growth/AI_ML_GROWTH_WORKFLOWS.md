# AI and ML growth workflows

## Principle

AI speeds up analysis and drafting. It never decides alone:
- deterministic checks guard every SEO-critical output;
- a human approves every content and production change.

The site has no AI or data infrastructure today, and none is added here. At this size (16 French articles, about 200 queries), the workflows below run as assisted tasks in Claude Code sessions, with their inputs and outputs kept in the repository.

## Workflows, in order of usefulness now

| Workflow | Input | Output | Deterministic safeguard | Evaluation |
| --- | --- | --- | --- | --- |
| Intent and cluster mapping of Search Console queries | Search Console query × page export | Query → cluster → intended page; queries landing on the wrong page | Every intended page exists and is indexable (`seo:audit`) | A sample of mappings checked by hand; disagreement rate |
| Internal link suggestions | Article texts per locale | Candidate links with anchor and position | Target exists, is indexable, same locale, not already linked; no anchor repeated more than twice across pages | Share of suggestions accepted by the editor |
| Engineering-as-Marketing idea discovery | Search Console queries, keyword data, article questions | Backlog candidates with evidence | Each candidate cites a source and date; scored with the playbook formula | Share of candidates that reach "planned" |
| Translation quality assistance | French source plus translation | Meaning, typography and terminology issues | Existing tests: typography, length, stale stamp, links | Issues confirmed by the reviewer |
| Anomaly detection (later, with analytics) | Daily Search Console and analytics series | Drops or spikes beyond a threshold | Simple rule: more than 30 % week on week with at least 50 impressions | False alarms per month |

## Requirements

- **No secrets in prompts:** no private data or credentials go into a model; Search Console data stays aggregated.
- **Structured outputs:** use JSON with a schema, so outputs can be validated.
- **Provenance:** every factual recommendation keeps its source reference.
- **Costs:** keep model and API costs visible. OpenSEO credits are logged in `ORGANIC_GROWTH_METRICS.md`; 6 were left on 2026-10-27.
- **No automatic production edits:** no model edits production SEO configuration or publishes content.
- **Model choice:** a bigger model is not assumed to be better; compare on the evaluation sample first.
