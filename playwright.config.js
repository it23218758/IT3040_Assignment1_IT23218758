const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  workers: 1,

  reporter: 'html',

  use: {
    headless: process.argv.includes('--headed') ? false : true,
    slowMo: 10,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: process.argv.includes('--headed') ? false : true,
      },
      testMatch: ['**/swifttranslator.positive.spec.js', '**/swifttranslator.negative.spec.js'],
    },
    {
      name: 'ui-test',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        slowMo: 300,
      },
      testMatch: ['**/swifttranslator.ui.spec.js'],
    },
  ],
});
