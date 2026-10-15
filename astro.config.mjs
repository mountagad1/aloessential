// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // Static output: every page is plain HTML. No UI framework, no hydration.
  output: "static",
  // Test builds include fictional fixture content: keep them out of dist/.
  outDir: process.env.CONTENT_FIXTURES ? "./dist-test" : "./dist",
  trailingSlash: "ignore",
  build: {
    // Small stylesheets are inlined to save a request on first paint.
    inlineStylesheets: "auto",
  },
});
