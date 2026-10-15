import { defineConfig, devices } from "@playwright/test";

const PORT = 4322;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      // Chromium with a phone viewport, touch and no hover.
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  // Tests run against a production build (plus fictional fixture content), not the dev server.
  webServer: {
    command: `CONTENT_FIXTURES=1 npm run build && CONTENT_FIXTURES=1 npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
