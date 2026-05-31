const { defineConfig, devices } = require("@playwright/test");

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5000";

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 8_000
  },
  outputDir: "output/visual/test-results",
  reporter: [
    ["list"],
    ["html", { outputFolder: "output/visual/report", open: "never" }]
  ],
  use: {
    baseURL,
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run emulate",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },
  projects: [
    {
      name: "desktop",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 1100 }
      }
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        viewport: { width: 390, height: 844 }
      }
    }
  ]
});
