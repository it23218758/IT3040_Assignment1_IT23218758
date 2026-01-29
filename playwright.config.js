const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  workers: 1,

  reporter: 'html',

  use: {
    headless: false,
    slowMo: 300, // 👈 SEE TYPING CLEARLY
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
