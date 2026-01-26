const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.setTimeout(60000);

test.describe('SwiftTranslator - Positive Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/');
  });

  test('Pos_Fun_01 - Library study request with polite phrasing', async ({ page }) => {
    const out = await translate(page, 'karuNaakaralaa mata reference book ekak lend karanna puLuvandha?');
    expect(out).toContain('කරුණාකරලා');
    expect(out).toContain('reference book');
  });

  test('Pos_Fun_02 - Group project planning with time reference', async ({ page }) => {
    const out = await translate(page, 'api assignment ekak karanava, eeka nisaa tomorrow 4pm library study room ekata enna. Laptop ekak genna.');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('assignment');
    expect(out).toContain('tomorrow');
  });

  test('Pos_Fun_03 - Technical lab help request', async ({ page }) => {
    const out = await translate(page, 'lab sheet ekee programming error ekak thiyenava, mata support karanna puLuvandha? error eka hadhaaganna');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('programming error');
  });

  test('Pos_Fun_04 - Trip planning with multiple locations', async ({ page }) => {
    const out = await translate(page, 'api December maasee Kandy Ella train trip ekak yanna hadhanavaa,eekata hotel booking karanna oonee.');
    expect(out).toContain('Kandy');
    expect(out).toContain('December');
  });

  test('Pos_Fun_05 - Beach trip preparation', async ({ page }) => {
    const out = await translate(page, 'weekend ekea Negombo beach ekata yamu, swimming gear tika genna.');
    expect(out).toContain('Negombo');
    expect(out).toContain('weekend');
  });

  test('Pos_Fun_06 - Birthday party invitation', async ({ page }) => {
    const out = await translate(page, 'magee birthday party ekata oyaalata enna puLuvandha? 7pm vedhdhi restaurant ekata enna');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('birthday party');
  });

  test('Pos_Fun_07 - Movie night planning', async ({ page }) => {
    const out = await translate(page, 'film hall ekata new movie ekak aevillaa balanna yamu, online tickets book karanna puLuvandha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('movie');
  });

  test('Pos_Fun_08 - Doctor appointment request', async ({ page }) => {
    const out = await translate(page, 'mata appointment ekak book karanavadha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('appointment');
  });

  test('Pos_Fun_09 - Work meeting preparation', async ({ page }) => {
    const out = await translate(page, 'client meeting ekata presentation slides prepare karanna oonee, projector setup eka check karanna puLuvandha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('meeting');
  });

  test('Pos_Fun_10 - Online shopping order (slang/informal)', async ({ page }) => {
    const out = await translate(page, 'temu ekata order ekak dhaala dhiipanko');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('order');
  });

  test('Pos_Fun_11 - Home renovation planning', async ({ page }) => {
    const out = await translate(page, 'house paint karanna hadhanavaa, color samples select karanna puLuvandha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('paint');
  });

  test('Pos_Fun_12 - Mobile app installation help', async ({ page }) => {
    const out = await translate(page, 'heta new mobile app ekak install karanna hadhanava, podi help ekak dhenavadha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('mobile app');
  });

  test('Pos_Fun_13 - Concert ticket booking', async ({ page }) => {
    const out = await translate(page, 'music concert ekata tickets book karanna hadhanava, seating plan eka balanna puLuvandha? Payment karanna kalin');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('concert');
  });

  test('Pos_Fun_14 - Car service appointment', async ({ page }) => {
    const out = await translate(page, 'vehicle service center ekata car ekak yavanna oonee.');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('service');
  });

  test('Pos_Fun_15 - University admission inquiry', async ({ page }) => {
    const out = await translate(page, 'university admission form fill karanna oonee, required documents tika collect karanna puLuvandha? Deadline heta');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('admission');
  });

  test('Pos_Fun_16 - Gym membership query', async ({ page }) => {
    const out = await translate(page, 'Gym membership fees kiyadha?Monthly payment karanna puLuvandha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('membership');
  });

  test('Pos_Fun_17 - Bank transaction request', async ({ page }) => {
    const out = await translate(
      page,
      'ATM eka kaedilaa salli vagayak transfer karanna oone ? oyaa gaava online banking thiyenavadha?mata rs 5000k transfer  karaganna'
    );
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('ATM');
  });

  test('Pos_Fun_18 - Restaurant reservation', async ({ page }) => {
    const out = await translate(page, 'table reservation ekak karannavadha? 8pm dinner ekata.');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('reservation');
  });

  test('Pos_Fun_19 - Flight booking confirmation', async ({ page }) => {
    const out = await translate(page, 'flight booking confirm vunaa, e-ticket ekath eyaalaa email karala thibbaa. Passport details check karanna puLuvan veyidha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('flight');
  });

  test('Pos_Fun_20 - Social media privacy settings', async ({ page }) => {
    const out = await translate(page, 'Password change karanna onee');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('Password');
  });

  test('Pos_Fun_21 - Hotel check-in inquiry', async ({ page }) => {
    const out = await translate(page, 'mata kiyanna puluvandha hotel check-in time kiyada? Early check-in karanna puLuvandha? And Luggage store karanna facilities thiyenavadha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('hotel');
    expect(out).toContain('time');
    expect(out).toContain('check');
  });

  test('Pos_Fun_22 - Job interview preparation', async ({ page }) => {
    const out = await translate(page, 'job interview ekata yanna kalin CV eka update karanna oonee.');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('interview');
  });

  test('Pos_Fun_23 - Insurance claim process', async ({ page }) => {
    const out = await translate(page, 'insurance claim form eka fill karanna oonee, oyaata medical reports attach karanna puLuvandha? Claim number eka mark karalayi thiyennee.');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('claim');
  });

  test('Pos_Fun_24 - Wedding guest confirmation', async ({ page }) => {
    const out = await translate(page, 'wedding ekata enna puLuvandha?');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('wedding');
  });

});
