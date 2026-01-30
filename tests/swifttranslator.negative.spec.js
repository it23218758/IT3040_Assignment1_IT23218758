const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.describe('SwiftTranslator - Negative Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
  });

  test('Neg_Fun_01 - Invalid Singlish character sequence', async ({ page }) => {
    const input = 'mama badu wagayak ganna kolupiti gihin ennm';
    const actual = await translate(page, input);
    // Expecting failure: output will be incorrect
    expect(actual).toBe('මම බඩු වගයක් ගන්න කොල්ලුපිටි ගිහින් එන්නම්');
  });

  test('Neg_Fun_02 - Excessive abbreviation without vowels', async ({ page }) => {
    const input = 'mama gmea ynva rata';
    const actual = await translate(page, input);
    expect(actual).toBe('මම ගමේ යනවා රෑට');
  });

  test('Neg_Fun_03 - Mixed case inconsistency', async ({ page }) => {
    const input = 'kolaboe nanda asanipa WeLa mama Heta balaNna YaNaVaA';
    const actual = await translate(page, input);
    expect(actual).toBe('කොළඹ නැන්දා අසනිප වෙලා මම හෙට බලන්න යනවා');
  });

  test('Neg_Fun_04 - Unsupported special characters', async ({ page }) => {
    const input = 'mata ~!@ kiyana';
    const actual = await translate(page, input);
    expect(actual).toBe('මට කියන්න.');
  });

  test('Neg_Fun_05 - Extremely long joined word', async ({ page }) => {
    const input = 'mamagedharayanavaaapahuenneaanidhdhaaudheenma';
    const actual = await translate(page, input);
    expect(actual).toBe('මම ගෙදර යනවා අපහු එන්නේ අනිද්දා උදේන්ම');
  });

  test('Neg_Fun_06 - Uncommon technical abbreviation', async ({ page }) => {
    const input = 'mata J fila eka dhenna';
    const actual = await translate(page, input);
    expect(actual).toBe('මට JSON file එක දෙන්න.');
  });

  test('Neg_Fun_07 - Non-standard date format', async ({ page }) => {
    const input = '25th Dec 2025 yanna';
    const actual = await translate(page, input);
    expect(actual).toBe('25th Dec 2026 යන්න.');
  });

  test('Neg_Fun_08 - Incomplete sentence fragments', async ({ page }) => {
    const input = 'mama heta yanava. oyaa enna. vaeda karanna';
    const actual = await translate(page, input);
    expect(actual).toBe('මම යනවා හෙට. ඔයා එන්න ඕනේ නැහැ? මම එනකන් වැඩ ටික කරන්න.');
  });

  test('Neg_Fun_09 - Repeated same character excessively', async ({ page }) => {
    const input = 'hari hariiiii eekaaa mamaaa karalaa dhennammm';
    const actual = await translate(page, input);
    expect(actual).toBe('හරි ඒක මම කරලා දෙන්නම්');
  });

  test('Neg_Fun_10 - Mathematical expression mixed with text', async ({ page }) => {
    const input = 'meetingeka4pmthiyenneeikmanataenna';
    const actual = await translate(page, input);
    expect(actual).toBe('meeting එක 4 p.m තියෙන්නෙ ඉක්මනට එන්න');
  });

});
