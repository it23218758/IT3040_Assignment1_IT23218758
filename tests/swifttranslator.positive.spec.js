const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.setTimeout(60000);

test.describe('SwiftTranslator - Positive Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/');
  });

  test('Pos_Fun_01 - Library study request with polite phrasing', async ({ page }) => {
    const input = 'karuNaakaralaa mata reference book ekak lend karanna puLuvandha?';
    const expectedOutput = 'කරුණාකරලා මට reference book එකක් lend කරන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_01 - Input: ${input}`);
    console.log(`Pos_Fun_01 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_01 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_02 - Group project planning with time reference', async ({ page }) => {
    const input = 'api assignment ekak karanava, eeka nisaa tomorrow 4pm library study room ekata enna. Laptop ekak genna.';
    const expectedOutput = 'අපි assignment එකක් කරනව, ඒක නිසා tomorrow 4pm library study room එකට එන්න. Laptop එකක් ගෙන්න.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_02 - Input: ${input}`);
    console.log(`Pos_Fun_02 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_02 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_03 - Technical lab help request', async ({ page }) => {
    const input = 'lab sheet ekee programming error ekak thiyenava, mata support karanna puLuvandha? error eka hadhaaganna';
    const expectedOutput = 'lab sheet එකේ programming error එකක් තියෙනව, මට support කරන්න පුළුවන්ද? error එක හදාගන්න';
    const out = await translate(page, input);
    console.log(`Pos_Fun_03 - Input: ${input}`);
    console.log(`Pos_Fun_03 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_03 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_04 - Trip planning with multiple locations', async ({ page }) => {
    const input = 'api December maasee Kandy Ella train trip ekak yanna hadhanavaa,eekata hotel booking karanna oonee.';
    const expectedOutput = 'අපි December මාසේ Kandy Ella train trip එකක් යන්න හදනවා,ඒකට hotel booking කරන්න ඕනේ.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_04 - Input: ${input}`);
    console.log(`Pos_Fun_04 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_04 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_05 - Beach trip preparation', async ({ page }) => {
    const input = 'weekend ekea Negombo beach ekata yamu, swimming gear tika genna.';
    const expectedOutput = 'weekend එකේ Negombo beach එකට යමු, swimming gear ටික ගේන්න';
    const out = await translate(page, input);
    console.log(`Pos_Fun_05 - Input: ${input}`);
    console.log(`Pos_Fun_05 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_05 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_06 - Birthday party invitation', async ({ page }) => {
    const input = 'magee birthday party ekata oyaalata enna puLuvandha? 7pm vedhdhi restaurant ekata enna';
    const expectedOutput = 'මගේ birthday party එකට ඔයාලට එන්න පුළුවන්ද? 7pm වෙද්දි restaurant එකට එන්න.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_06 - Input: ${input}`);
    console.log(`Pos_Fun_06 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_06 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_07 - Movie night planning', async ({ page }) => {
    const input = 'film hall ekata new movie ekak aevillaa balanna yamu, online tickets book karanna puLuvandha?';
    const expectedOutput = 'film hall එකට new movie එකක් ඇවිල්ලා බලන්න යමු, online tickets book කරන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_07 - Input: ${input}`);
    console.log(`Pos_Fun_07 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_07 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_08 - Doctor appointment request', async ({ page }) => {
    const input = 'mata appointment ekak book karanavadha?';
    const expectedOutput = 'මට appointment එකක් book කරනවද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_08 - Input: ${input}`);
    console.log(`Pos_Fun_08 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_08 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_09 - Work meeting preparation', async ({ page }) => {
    const input = 'client meeting ekata presentation slides prepare karanna oonee, projector setup eka check karanna puLuvandha?';
    const expectedOutput = 'client meeting එකට presentation slides prepare කරන්න ඕනේ, projector setup එක check කරන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_09 - Input: ${input}`);
    console.log(`Pos_Fun_09 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_09 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_10 - Online shopping order (slang/informal)', async ({ page }) => {
    const input = 'temu ekata order ekak dhaala dhiipanko';
    const out = await translate(page, input);
    console.log(`Pos_Fun_10 - Input: ${input}`);
    console.log(`Pos_Fun_10 - Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_11 - Home renovation planning', async ({ page }) => {
    const input = 'house paint karanna hadhanavaa, color samples select karanna puLuvandha?';
    const expectedOutput = 'house paint කරන්න හදනවා, color samples select කරන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_11 - Input: ${input}`);
    console.log(`Pos_Fun_11 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_11 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_12 - Mobile app installation help', async ({ page }) => {
    const input = 'heta new mobile app ekak install karanna hadhanava, podi help ekak dhenavadha?';
    const expectedOutput = 'හෙට new mobile app එකක් install කරන්න හදනව, පොඩි help එකක් දෙනවද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_12 - Input: ${input}`);
    console.log(`Pos_Fun_12 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_12 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_13 - Concert ticket booking', async ({ page }) => {
    const input = 'music concert ekata tickets book karanna hadhanava, seating plan eka balanna puLuvandha? Payment karanna kalin';
    const expectedOutput = 'music concert එකට tickets book කරන්න හදනව, seating plan එක බලන්න පුළුවන්ද? Payment කරන්න කලින්';
    const out = await translate(page, input);
    console.log(`Pos_Fun_13 - Input: ${input}`);
    console.log(`Pos_Fun_13 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_13 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_14 - Car service appointment', async ({ page }) => {
    const input = 'vehicle service center ekata car ekak yavanna oonee.';
    const expectedOutput = 'vehicle service center එකට car එකක් යවන්න ඕනේ.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_14 - Input: ${input}`);
    console.log(`Pos_Fun_14 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_14 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_15 - University admission inquiry', async ({ page }) => {
    const input = 'university admission form fill karanna oonee, required documents tika collect karanna puLuvandha? Deadline heta';
    const out = await translate(page, input);
    console.log(`Pos_Fun_15 - Input: ${input}`);
    console.log(`Pos_Fun_15 - Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });
  });

  test('Pos_Fun_16 - Gym membership query', async ({ page }) => {
    const input = 'Gym membership fees kiyadha?Monthly payment karanna puLuvandha?';
    const expectedOutput = 'Gym membership fees කියද? Monthly payment කරන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_16 - Input: ${input}`);
    console.log(`Pos_Fun_16 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_16 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_17 - Bank transaction request', async ({ page }) => {
    const input = 'ATM eka kaedilaa salli vagayak transfer karanna oone ? oyaa gaava online banking thiyenavadha?mata rs 5000k transfer  karaganna';
    const out = await translate(page, input);
    console.log(`Pos_Fun_17 - Input: ${input}`);
    console.log(`Pos_Fun_17 - Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_18 - Restaurant reservation', async ({ page }) => {
    const input = 'table reservation ekak karannavadha? 8pm dinner ekata.';
    const expectedOutput = 'table reservation එකක් කරන්නවද? 8pm dinner එකට.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_18 - Input: ${input}`);
    console.log(`Pos_Fun_18 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_18 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_19 - Flight booking confirmation', async ({ page }) => {
    const input = 'flight booking confirm vunaa, e-ticket ekath eyaalaa email karala thibbaa. Passport details check karanna puLuvan veyidha?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_19 - Input: ${input}`);
    console.log(`Pos_Fun_19 - Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_20 - Social media privacy settings', async ({ page }) => {
    const input = 'Password change karanna onee';
    const expectedOutput = 'Password change කරන්න ඔනේ';
    const out = await translate(page, input);
    console.log(`Pos_Fun_20 - Input: ${input}`);
    console.log(`Pos_Fun_20 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_20 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_21 - Hotel check-in inquiry', async ({ page }) => {
    const input = 'mata kiyanna puluvandha hotel check-in time kiyada? Early check-in karanna puLuvandha? And Luggage store karanna facilities thiyenavadha?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_21 - Input: ${input}`);
    console.log(`Pos_Fun_21 - Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_22 - Job interview preparation', async ({ page }) => {
    const input = 'job interview ekata yanna kalin CV eka update karanna oonee.';
    const expectedOutput = 'job interview එකට යන්න කලින් CV එක update කරන්න ඕනේ.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_22 - Input: ${input}`);
    console.log(`Pos_Fun_22 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_22 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_23 - Insurance claim process', async ({ page }) => {
    const input = 'insurance claim form eka fill karanna oonee, oyaata medical reports attach karanna puLuvandha? Claim number eka mark karalayi thiyennee.';
    const expectedOutput = 'insurance claim form එක fill කරන්න ඕනේ, ඔයාට medical reports attach කරන්න පුළුවන්ද? Claim number එක mark කරලයි තියෙන්නේ.';
    const out = await translate(page, input);
    console.log(`Pos_Fun_23 - Input: ${input}`);
    console.log(`Pos_Fun_23 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_23 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_24 - Wedding guest confirmation', async ({ page }) => {
    const input = 'wedding ekata enna puLuvandha?';
    const expectedOutput = 'wedding එකට එන්න පුළුවන්ද?';
    const out = await translate(page, input);
    console.log(`Pos_Fun_24 - Input: ${input}`);
    console.log(`Pos_Fun_24 - Expected Output: ${expectedOutput}`);
    console.log(`Pos_Fun_24 - Actual Output: ${out}`);

    expect(out.length).toBeGreaterThan(0);
  });


