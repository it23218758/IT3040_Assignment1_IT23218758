const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.describe('UI Tests', () => {

  test('UI_01 - Real-time typing and output', async ({ page }) => {
    await page.goto('https://swifttranslator.com/', { waitUntil: 'networkidle' });

    const input = 'mama gamanak yanavaa';
    const output = await translate(page, input);

    expect(output).toBeTruthy();
  });
});
