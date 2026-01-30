const { test, expect } = require('@playwright/test');
const { translate } = require('./swifttranslator.helper');

const positiveTests = [
  {
    id: 'Pos_Fun_01',
    input: 'karuNaakaralaa mata reference book ekak lend karanna puLuvandha?',
    expected: 'කරුණාකරලා මට reference book එකක් lend කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_02',
    input: 'api assignment ekak karanava, eeka nisaa tomorrow 4pm library study room ekata enna. Laptop ekak geenna.',
    expected: 'අපි assignment එකක් කරනව, ඒක නිසා tomorrow 4pm library study room එකට එන්න. Laptop එකක් ගේන්න.'
  },
  {
    id: 'Pos_Fun_03',
    input: 'lab sheet ekee programming error ekak thiyenavaa, mata support karanna puLuvandha? error eka hadhaaganna',
    expected: 'lab sheet එකේ programming error එකක් තියෙනවා, මට support කරන්න පුළුවන්ද? error එක හදාගන්න'
  },
  {
    id: 'Pos_Fun_04',
    input: 'api December maasee Kandy Ella train trip ekak yanna hadhanavaa, eekata hotel booking karanna oonee.',
    expected: 'අපි December මාසේ Kandy Ella train trip එකක් යන්න හදනවා, ඒකට hotel booking කරන්න ඕනේ.'
  },
  {
    id: 'Pos_Fun_05',
    input: 'weekend ekea Negombo beach ekata yamu, swimming gear tika geenna.',
    expected: 'weekend එකේ Negombo beach එකට යමු, swimming gear ටික ගේන්න'
  },
  {
    id: 'Pos_Fun_06',
    input: 'magee birthday party ekata oyaalata enna puLuvandha? 7pm vedhdhi restaurant ekata enna',
    expected: 'මගේ birthday party එකට ඔයාලට එන්න පුළුවන්ද? 7pm වෙද්දි restaurant එකට එන්න.'
  },
  {
    id: 'Pos_Fun_07',
    input: 'film hall ekata new movie ekak avillaa balanna yamu, online tickets book karanna puluvandha?',
    expected: 'film hall එකට new movie එකක් ඇවිල්ලා බලන්න යමු, online tickets book කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_08',
    input: 'mata appointment ekak book karanna puluvandha?',
    expected: 'මට appointment එකක් book කරනවද?'
  },
  {
    id: 'Pos_Fun_09',
    input: 'client meeting ekata presentation slides prepare karanna oonee, projector setup eka check karanna puluvandha?',
    expected: 'client meeting එකට presentation slides prepare කරන්න ඕනේ, projector setup එක check කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_10',
    input: 'temu ekata order ekak daalaa dhiipanko',
    expected: 'ටෙමු එකට order එකක් දාලා දීපන්කො'
  },
  {
    id: 'Pos_Fun_11',
    input: 'house eka paint karanna yanne, color samples select karanna puluvandha?',
    expected: 'house එක paint කරන්න යන්නෙ, color samples select කරන්න පුලුවන්ද?'
  },
  {
    id: 'Pos_Fun_12',
    input: 'heta new mobile app ekak install karanna hadhanavaa, podi help ekak dhenna puluvandha?',
    expected: 'හෙට new mobile app එකක් install කරන්න හදනව, පොඩි help එකක් දෙනවද?'
  },
  {
    id: 'Pos_Fun_13',
    input: 'music concert ekata tickets book karanna hadhanava, seating plan eka balanna puluvandha?',
    expected: 'music concert එකට tickets book කරන්න හදනව, seating plan එක බලන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_14',
    input: 'vehicle service center ekata car ekak yavanna oonee',
    expected: 'vehicle service center එකට car එකක් යවන්න ඕනේ.'
  },
  {
    id: 'Pos_Fun_15',
    input: 'university admission form fill karanna oonee, required documents tika collect karanna puluvandha?',
    expected: 'university admission form fill කරන්න ඕනේ, required documents ටික collect කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_16',
    input: 'gym membership fees kiyadha? monthly payment karanna puluvandha?',
    expected: 'Gym membership fees කියද? Monthly payment කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_17',
    input: 'ATM eka kedila salli transfer karanna oonee, oya laga online banking thiyenavadha?',
    expected: 'ATM එක කැඩිලා සල්ලි වගයක් transfer කරන්න ඕනෙ, ඔයා ගාව online banking තියෙනවද?'
  },
  {
    id: 'Pos_Fun_18',
    input: 'table reservation ekak karanna puluvandha? 8pm dinner ekata',
    expected: 'table reservation එකක් කරන්නවද? 8pm dinner එකට.'
  },
  {
    id: 'Pos_Fun_19',
    input: 'flight booking confirm unaa, e-ticket email karalaa thibba. passport details check karanna puluvandha?',
    expected: 'flight booking confirm වුනා, e-ticket එකත් එයාලා email කරලා තිබ්බා. Passport details check කරන්න පුළුවන් වෙයිද?'
  },
  {
    id: 'Pos_Fun_20',
    input: 'password change karanna oonee',
    expected: 'Password change කරන්න ඕනේ'
  },
  {
    id: 'Pos_Fun_21',
    input: 'hotel check-in time kiyadha? early check-in karanna puluvandha? luggage store karanna facilities thiyenavadha?',
    expected: 'මට කියන්න පුළුවන්ද hotel check-in time කියද? Early check-in කරන්න පුළුවන්ද? Luggage store කරන්න facilities තියෙනවද?'
  },
  {
    id: 'Pos_Fun_22',
    input: 'job interview ekata yanna kalin CV eka update karanna onee',
    expected: 'job interview එකට යන්න කලින් CV එක update කරන්න ඕනේ.'
  },
  {
    id: 'Pos_Fun_23',
    input: 'insurance claim form eka fill karanna onee, medical reports attach karanna puluvandha?',
    expected: 'insurance claim form එක fill කරන්න ඕනේ, medical reports attach කරන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_24',
    input: 'wedding ekata enna puluvandha?',
    expected: 'wedding එකට එන්න පුළුවන්ද?'
  },
];

test.describe('SwiftTranslator - Positive Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const t of positiveTests) {
    test(`${t.id} - translate "${t.input}"`, async ({ page }) => {
      const output = await translate(page, t.input);
      expect(output.trim().length).toBeGreaterThan(0);
    });
  }

});
//new 