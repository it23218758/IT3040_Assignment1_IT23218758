const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.setTimeout(60000);

test.describe('SwiftTranslator - UI Test', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/');
  });

  test('Pos_UI_01 - Real-time Sinhala output display', async ({ page }) => {
    const input = 'mama gamanak yanavaa';
    const output = await translate(page, input);
    
    console.log(`Pos_UI_01 - Input: ${input}`);
    console.log(`Pos_UI_01 - Real-time Output: ${output}`);
    
    // Verify real-time output is displayed
    expect(output).toBeDefined();
    expect(typeof output).toBe('string');
    expect(output.length).toBeGreaterThan(0);
    expect(output).toBeTruthy();
  });

});
