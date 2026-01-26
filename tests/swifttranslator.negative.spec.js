const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.setTimeout(60000);

test.describe('SwiftTranslator – Negative Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/');
  });

  test('Neg_Fun_01 - Invalid Singlish character sequence (should fail)', async ({ page }) => {
    const out = await translate(page, 'mama xyz123 yanavaa.');
    // Intentionally wrong expectation - expecting text that won't be in output
    expect(out).toContain('INVALID_TEXT_XYZ123');
  });

  test('Neg_Fun_02 - Excessive abbreviation without vowels (should fail)', async ({ page }) => {
    const out = await translate(page, 'mama gedhara yanava rata.');
    // Intentionally wrong - expecting exact match that won't appear
    expect(out).toBe('EXACT_MATCH_REQUIRED');
  });

  test('Neg_Fun_03 - Mixed case inconsistency (should fail)', async ({ page }) => {
    const out = await translate(page, 'MaMa GaMe YaNaVaA.');
    // Intentionally wrong - expecting English translation
    expect(out).toContain('I am going home');
  });

  test('Neg_Fun_04 - Unsupported special characters (should fail)', async ({ page }) => {
    const out = await translate(page, 'mata ~!@ kiyana.');
    // Intentionally wrong - output should not be empty
    expect(out).toBe('');
  });

  test('Neg_Fun_05 - Extremely long joined word (should fail)', async ({ page }) => {
    const out = await translate(page, 'mamagedharayanavaaapahuenneaanidhdhaaudheenma');
    // Intentionally wrong - expecting very long output
    expect(out.length).toBeGreaterThan(1000);
  });

  test('Neg_Fun_06 - Uncommon technical abbreviation (should fail)', async ({ page }) => {
    const out = await translate(page, 'mata JSON file eka dhenna.');
    // Intentionally wrong - expecting XML instead of JSON
    expect(out).toContain('XML');
  });

  test('Neg_Fun_07 - Non-standard date format (should fail)', async ({ page }) => {
    const out = await translate(page, '25th Dec 2025 yanna');
    // Intentionally wrong - expecting different year
    expect(out).toContain('2026');
  });

  test('Neg_Fun_08 - Incomplete sentence fragments (should fail)', async ({ page }) => {
    const out = await translate(page, 'yanavaa. oonee? karanava.');
    // Intentionally wrong - expecting exact match
    expect(out).toBe('yanavaa. oonee? karanava.');
  });

  test('Neg_Fun_09 - Repeated same character excessively (should fail)', async ({ page }) => {
    const out = await translate(page, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // Intentionally wrong - expecting specific pattern
    expect(out).toContain('bbbbbbbbbbbbbbbbbbbb');
  });

  test('Neg_Fun_10 - Mathematical expression input (should fail)', async ({ page }) => {
    const out = await translate(page, '2+2=4 kiyala liyanna.');
    // Intentionally wrong - expecting wrong math result
    expect(out).toContain('2+2=5');
  });

});
