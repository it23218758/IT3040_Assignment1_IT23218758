const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

test.describe('SwiftTranslator - Positive Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
  });

  test('Pos_Fun_01 - Polite request', async ({ page }) => {
    const input = 'karuNaakaralaa mata reference book ekak lend karanna puLuvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_02 - Assignment discussion', async ({ page }) => {
    const input = 'api assignment ekak karanavaa, tomorrow 4pm library ekata enna';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_03 - Technical help', async ({ page }) => {
    const input = 'lab sheet ekee programming error ekak thiyenavaa';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_04 - Travel plan', async ({ page }) => {
    const input = 'December maasee Kandy Ella train trip ekak yanna hadhanavaa';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });
  test('Pos_Fun_05 - Beach trip preparation', async ({ page }) => {
    const input = 'weekend ekea Negombo beach ekata yamu, swimming gear tika geenna';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_06 - Birthday party invitation', async ({ page }) => {
    const input = 'mage birthday party ekata oyalata enna puluvandha needha? 7pm restaurant ekata enna';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_07 - Movie night plan', async ({ page }) => {
    const input = 'film hall ekata new movie ekak avillaa balanna yamu, online tickets book karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_08 - Doctor appointment request', async ({ page }) => {
    const input = 'mata appointment ekak book karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_09 - Client meeting preparation', async ({ page }) => {
    const input = 'client meeting ekata presentation slides prepare karanna oonee, projector setup eka check karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_10 - Online shopping slang', async ({ page }) => {
    const input = 'temu ekata order ekak daalaa dhiipanko';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_11 - Home renovation planning', async ({ page }) => {
    const input = 'house eka paint karanna yanne, color samples select karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_12 - Mobile app installation help', async ({ page }) => {
    const input = 'heta new mobile app ekak install karanna hadhanavaa, podi help ekak dhenna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_13 - Concert ticket booking', async ({ page }) => {
    const input = 'music concert ekata tickets book karanna hadhanava, seating plan eka balanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_14 - Vehicle service request', async ({ page }) => {
    const input = 'vehicle service center ekata car ekak yavanna oonee';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_15 - University admission inquiry', async ({ page }) => {
    const input = 'university admission form fill karanna oonee, required documents tika collect karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_16 - Gym membership query', async ({ page }) => {
    const input = 'gym membership fees kiyadha? monthly payment karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_17 - Bank transaction help', async ({ page }) => {
    const input = 'ATM eka kedila salli transfer karanna oonee, oya laga online banking thiyenavadha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_18 - Restaurant table reservation', async ({ page }) => {
    const input = 'table reservation ekak karanna puluvandha? 8pm dinner ekata';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_19 - Flight booking confirmation', async ({ page }) => {
    const input = 'flight booking confirm unaa, e-ticket email karalaa thibba. passport details check karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_20 - Password change request', async ({ page }) => {
    const input = 'password change karanna oonee';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_21 - Hotel check-in inquiry', async ({ page }) => {
    const input = 'hotel check-in time kiyadha? early check-in karanna puluvandha? luggage store karanna facilities thiyenavadha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_22 - Job interview preparation', async ({ page }) => {
    const input = 'job interview ekata yanna kalin CV eka update karanna onee';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_23 - Insurance claim process', async ({ page }) => {
    const input = 'insurance claim form eka fill karanna onee, medical reports attach karanna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_24 - Wedding invitation confirmation', async ({ page }) => {
    const input = 'wedding ekata enna puluvandha?';
    const output = await translate(page, input);
    expect(output.length).toBeGreaterThan(0);
  });

});
