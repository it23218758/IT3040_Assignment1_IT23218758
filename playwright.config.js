const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  /* Global timeout */
  timeout: 60000,

  /* Run test files in sequence */
  fullyParallel: false,

  /* Fail if test.only is left in code */
  forbidOnly: !!process.env.CI,

  /* No retries */
  retries: 0,

  /* Single worker to avoid duplication */
  workers: 1,

  /* HTML report */
  reporter: 'html',

  /* Shared settings */
  use: {
    headless: true,            // Run without showing browser
    trace: 'off',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },
  /* Browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
