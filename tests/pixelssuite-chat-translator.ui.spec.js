const { test, expect } = require('@playwright/test');

test.describe('PixelsSuite Chat Translator UI', () => {
  test('loads the translator interface', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/chat-translator', { waitUntil: 'domcontentloaded' });

    await expect(page.getByPlaceholder('Type your English text here…')).toBeVisible();
    await expect(page.getByPlaceholder('Transliterated Sinhala will appear here…')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Transliterate' })).toBeVisible();
  });
});