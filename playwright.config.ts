import { defineConfig } from "@playwright/test";

// Set PW_CHROMIUM_PATH to use a local Chromium-based browser instead of the bundled one.
export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3100",
    launchOptions: {
      executablePath: process.env.PW_CHROMIUM_PATH,
      args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
    },
  },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run dev -- -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 120_000 },
});
