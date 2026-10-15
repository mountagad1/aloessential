// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // Static output: every page is plain HTML. No UI framework, no hydration.
  output: "static",
  // Test builds include fictional fixture content: keep them out of dist/.
  outDir: process.env.CONTENT_FIXTURES ? "./dist-test" : "./dist",
  // Canonical origin (docs/seo/ALOESSENTIAL_BASELINE.md, decision of 2026-10-15):
  // apex domain, every page URL ends with a slash.
  site: "https://aloessential.com",
  trailingSlash: "always",
  build: {
    // Small stylesheets are inlined to save a request on first paint.
    inlineStylesheets: "auto",
  },
});
