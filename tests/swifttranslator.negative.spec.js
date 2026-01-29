const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.describe('SwiftTranslator - Negative Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
  });

  test('Neg_Fun_01 - Invalid Singlish character sequence', async ({ page }) => {
    const input = 'mama badu wagayak ganna kolupiti gihin ennm';
    const expected = 'මම බඩු වගයක් ගන්න කොල්ලුපිටි ගිහින් එන්නම්';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // This will FAIL
  });

  test('Neg_Fun_02 - Excessive abbreviation without vowels', async ({ page }) => {
    const input = 'mama gmea ynva rata';
    const expected = 'මම ගමේ යනවා රෑට';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_03 - Mixed case inconsistency', async ({ page }) => {
    const input = 'kolaboe nanda asanipa WeLa mama Heta balaNna YaNaVaA';
    const expected = 'කොළඹ නැන්දා අසනීප වෙලා මම හෙට බලන්න යනවා';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_04 - Unsupported special characters', async ({ page }) => {
    const input = 'mata ~!@ kiyana';
    const expected = 'මට කියන්න';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_05 - Extremely long joined word', async ({ page }) => {
    const input = 'mamagedharayanavaaapahuenneaanidhdhaaudheenma';
    const expected = 'මම ගෙදර යනවා අපහු එන්නේ අනිද්දා උදේන්ම';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_06 - Uncommon technical abbreviation', async ({ page }) => {
    const input = 'mata J fila eka dhenna';
    const expected = 'මට JSON file එක දෙන්න';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_07 - Non-standard date format', async ({ page }) => {
    const input = '25th Dec 2025 yanna';
    const expected = '25th Dec 2026 යන්න';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_08 - Incomplete sentence fragments', async ({ page }) => {
    const input = 'mama heta yanava. oya enna. vaeda karanna';
    const expected = ' මම යනවා හෙට. ඔය එන්න ඕනේ නැහැ,මම එනකන් වැඩ ටික කරන්න';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_09 - Repeated same character excessively', async ({ page }) => {
    const input = 'aaaaaaaaaaaaaaaaaaaaaaaaabbaaaa';
    const expected = 'ආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආ';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

  test('Neg_Fun_10 - Mathematical expression mixed with text', async ({ page }) => {
    const input = 'meetingeka4pmthiyenneeikmanataenna';
    const expected = 'meeting එක 4pm තියෙන්නේ ඉක්මනට එන්න';
    const actual = await translate(page, input);
    expect(actual).toBe(expected); // FAIL
  });

});
