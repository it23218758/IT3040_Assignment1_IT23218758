const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { translate } = require('./pixelssuite-chat-translator.helper');

const translatorUrl = 'https://www.pixelssuite.com/chat-translator';
const resultsDir = path.join(process.cwd(), 'test-results');
const resultsCsvPath = path.join(resultsDir, 'pixelssuite-negative-results.csv');

function toCsvValue(value) {
  return `"${String(value ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
}

function appendResultRow(testCase, actual, passed) {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  if (!fs.existsSync(resultsCsvPath)) {
    fs.writeFileSync(resultsCsvPath, 'id,input,expected,actual,passed\n', 'utf8');
  }

  const row = [
    toCsvValue(testCase.id),
    toCsvValue(testCase.input),
    toCsvValue(testCase.expected),
    toCsvValue(actual),
    passed ? 'PASS' : 'FAIL',
  ].join(',');

  fs.appendFileSync(resultsCsvPath, `${row}\n`, 'utf8');
}

const negativeCases = [
  { id: 'Neg_0001', input: 'koheda oya heta yanne?', expected: 'කොහේද ඔයා හෙට යන්නේ?' },
  { id: 'Neg_0002', input: 'me case eka wisadanna api mokada karanne api eeka heta katha karamu', expected: 'මේ case එක විසදන්න අපි මොකද කරන්නේ අපි ඒක හෙට කතා කරමු' },
  { id: 'Neg_0003', input: 'phone eka silent karala enna.', expected: 'phone එක silent කරලා එන්න.' },
  { id: 'Neg_0004', input: 'gedara enna kalin supermarket ekata gihilla mama kiwwa de genna. list eka phone eke thiyenawa.', expected: 'ගෙදර එන්න කලින් supermarket එකට ගිහිල්ල, මම කිව්ව දේ ගෙන්න. list එක phone එකේ තියෙනවා.' },
  { id: 'Neg_0005', input: 'kohomada nangi, godak kaalekin ', expected: 'කොහොමද නංගී, ගොඩක් කාලෙකින්.' },
  { id: 'Neg_0006', input: 'ammo machan, godak dhavasakin  neda. kohomada ubata, family eka sanipendha? ', expected: 'අම්මෝ මචං, ගොඩක් දවසකින් නේද. කොහොමද උබට, ෆේමිලි එක සනීපෙන්ද? ' },
  { id: 'Neg_0007', input: 'poddak wait karanna, mama file eka upload karannam, 5 minutes witharai.', expected: 'පොඩ්ඩක් wait කරන්න, මම file එක upload කරන්නම්, 5 minutes විතරයි.' },
  { id: 'Neg_0008', input: 'please puluwan nm adama wade iwara karala danna kiyala kiyanna', expected: 'please පුළුවන් නම් අදම වැඩේ ඉවර කරලා දාන්න කියලා කියන්න' },
  { id: 'Neg_0009', input: 'naee naee, mama eka kale naee.', expected: 'නෑ නෑ, මම ඒක කළේ නෑ.' },
  { id: 'Neg_0010', input: 'ow machan, mama dannawa, eheth mata dan karanna ba, heta karamu.', expected: 'ඔව් මචාන්, මම දන්නවා, ඒත් මට දැන් කරන්න බෑ, හෙට කරමු.' },
  { id: 'Neg_0011', input: 'wadiya wadiya kanna epa, amaru weyi.', expected: 'වැඩිය වැඩිය කන්න එපා, අමාරු වෙයි.' },
  { id: 'Neg_0012', input: 'ado ado, oya kohoma hari karala thibba ne kohomada kale? godak hondhai hondhai.', expected: 'අඩෝ අඩෝ, ඔයා කොහොම හරි කරලා තිබ්බා නේ කොහොමද කලේ? ගොඩක් හොඳයි හොඳයි.' },
  { id: 'Neg_0013', input: 'mama giyaa…eyath awama kiyanna. okay?', expected: 'මම ගියා...එයත් ආවම කියන්න.. ඕකේ?' },
  { id: 'Neg_0014', input: 'aiyo! eka denna epa, please!', expected: 'අයියෝ! ඒක දෙන්න එපා, please!' },
  { id: 'Neg_0015', input: 'maan ooyata passe gannm', expected: 'මම ඔයාට පස්සේ ගන්නම්' },
  { id: 'Neg_0016', input: 'oyata kammli nm gedara ymu', expected: 'ඔයාට කම්මැලි නම් ගෙදර යමු' },
  { id: 'Neg_0017', input: 'mama ada lunch box eka gedara daala awe, canteen eke kanna one monawahari.', expected: 'මම අද lunch box එක ගෙදර දාලා ආවේ, canteen එකේ කන්න ඕනේ මොනවහරි.' },
  { id: 'Neg_0018', input: 'oyage keyboard eka replace karanna one, keys kadenawa.', expected: 'ඔයාගේ keyboard එක replace කරන්න ඕනේ, keys කැඩෙනවා.' },
  { id: 'Neg_0019', input: 'api as soon as possible gedara yanawa, traffic nisa late wela.', expected: 'අපි as soon as possible ගෙදර යනවා, traffic නිසා late වෙලා.' },
  { id: 'Neg_0020', input: 'mama heta work from home karannam, so meeting eka online mn participate wennam no worries, I will join on time. mama wifi eka check karanna one, nathnam data eka use karamu. oya also ready wenna, we can start anytime you want.', expected: 'මම හෙට work from home කරන්නම්, ඉතින් meeting එක online online මම participate වෙන්නම්. no worries, I will join on time. මම wifi එක check කරන්න ඕනේ, නැත්නම් data එක use කරමු. ඔයා also ready වෙන්න, we can start anytime you want.' },
  { id: 'Neg_0021', input: 'oya RAM eka upgrade karadha?', expected: 'ඔයා RAM එක upgrade කරාද?' },
  { id: 'Neg_0022', input: 'laptop eke hard drive eka full, cloud storage ekak use karanna dannawadha?', expected: 'laptop එකේ hard drive එක full, cloud storage එකක් use කරන්න දන්නවද?' },
  { id: 'Neg_0023', input: 'Notion ekata notes damma, eka Google Drive ekata sync wenawadha?', expected: 'Notion එකට notes දම්මා, ඒක Google Drive එකට sync වෙනවද?' },
  { id: 'Neg_0024', input: 'Spotify eke playlist eka share karanna.', expected: 'Spotify එකේ playlist එක share කරන්න.' },
  { id: 'Neg_0025', input: 'mama OT karanna one, DP eka update karanna one kiyala HR kiwwa.', expected: 'මම OT කරන්න ඕනේ, DP එක update කරන්න ඕනේ කියලා HR කිව්වා.' },
  { id: 'Neg_0026', input: 'ETA kiyanne mokakda exactly?', expected: 'ETA කියන්නේ මොකක්ද exactly?' },
  { id: 'Neg_0027', input: 'prof kiwwa assignment eka sub karana kiyala, nathnam marks adu wenawa.', expected: 'prof කිව්වා assignment එක sub කරන කියලා, නැත්නම් marks අඩු වෙනවා.' },
  { id: 'Neg_0028', input: 'gym eke cardio session eka skip kala naeda?', expected: 'gym එකේ cardio session එක skip කළා නේද?' },
  { id: 'Neg_0029', input: 'Borellata yanawa, Junction ekata enna, mama ennam.', expected: 'Borellaලට යනවා, Junction එකට එන්න, මම එන්නම්.' },
  { id: 'Neg_0030', input: 'Pettah market ekata giye, Maradana station eken bus eka gatte.', expected: 'Pettah market එකට ගියේ, Maradana station එකෙන් bus එක ගත්තේ.' },
  { id: 'Neg_0031', input: 'Kasun aiya kiwwa project eka heta submit karanna kiyala.', expected: 'කසුන් අයියා කිව්වා project එක හෙට submit කරන්න කියලා.' },
  { id: 'Neg_0032', input: 'Thisara saha Dilhani dennama heta interview ekata yanawa, best of luck.', expected: 'තිසර සහ දිල්හානි දෙන්නම හෙට interview එකට යනවා, best of luck.' },
  { id: 'Neg_0033', input: 'lamayi 20 denekma 2nd round ekata theruna, mokada 1st round eka godak aya hodata perform kara .', expected: 'ළමයි 20 දෙනෙක්ම 2nd round එකට තේරුනා, මොකද 1st round එක ගොඩක් අය හොදට perform කරා .' },
  { id: 'Neg_0034', input: 'mama 4th dawase eka complete karanna one.', expected: 'මම 4වැනි දවසේ ඒක complete කරන්න ඕනේ.' },
  { id: 'Neg_0035', input: 'Api jackson movie eka blnna giya IMAX eke ticket eka Rs.4300k una.', expected: 'අපි ජැක්සන් movie එක බලන්න ගියා IMAX එකේ ticket එක Rs.4300ක් වුණා.' },
  { id: 'Neg_0036', input: 'petrol liter eka LKR 340k giya, last week LKR 320i une.', expected: 'petrol liter එක LKR 340ක් ගියා, last week LKR 320යි වුණේ' },
  { id: 'Neg_0037', input: 'practice  6:00am ta start wenawa.', expected: 'practice  6:00am ට start වෙනවා.' },
  { id: 'Neg_0038', input: 'event eka 3:30pm ta patan gannawa kiyala kiwwa, 7:00pm event eka iwarai ', expected: 'event එක 3:30pm ටපටන් ගන්නවා කියලා කිව්වා, 7:00pm event එක ඉවරයි' },
  { id: 'Neg_0039', input: 'birthday suprise eka June 14 ta kaldamu.', expected: 'birthday suprise එක June 14 ට කල්දමු' },
  { id: 'Neg_0040', input: 'api trip eka 2026-08-10 iddala 2026-08-15 ta plan karanawa.', expected: 'අපි trip එක 2026-08-10 ඉඳලා 2026-08-15ට plan කරනවා.' },
  { id: 'Neg_0041', input: 'e dora usa meter 2k wage.', expected: 'ඒ දොර උස meter 2ක් වගේ.' },
  { id: 'Neg_0042', input: 'road eka km 12k withara, mama cycle eken giye, winadi 5k parak inna wuna.', expected: 'road එක km 12ක් විතර, මම cycle එකෙන් ගියේ, විනාඩි 5ක් පාරෙ ඉන්න වුනා.' },
  { id: 'Neg_0043', input: 'malli,ubala meka supiriyatama karala hode? sirawatama elakiri kattiya.', expected: 'මල්ලී, උබලා මේක සුපිරියටම කරලා හොදේ? සිරාවටම එළකිරි කට්ටිය.' },
  { id: 'Neg_0044', input: 'boruwa danna epa , naththan naha kiyapan , ape set eke ekek dn dunna .', expected: 'බොරුව දාන්න එපා ,  නැත්තන් නැහැ කියපන් , අපේ set එකේ එකෙක් දැන් දුන්නා .' },
  { id: 'Neg_0045', input: 'mama me site eka check kala: www.parliament.lk, godak documents thiyenawa.', expected: 'මම මේ site එක check කළා: www.parliament.lk, ගොඩක් documents තියෙනවා.' },
  { id: 'Neg_0046', input: 'mata me email ekata reply karanna: it.helpdesk@university.lk, ', expected: 'මට මේ email එකට reply කරන්න: it.helpdesk@university.lk, ' },
  { id: 'Neg_0047', input: 'ada godak weda kala 😓 ape team eka maru💪 heta rest karannam.', expected: 'අද ගොඩක් වැඩ කළා 😓 අපේ team එකා මරු💪 හෙට rest කරන්නම්.' },
  { id: 'Neg_0048', input: 'ayyo 😩 godak badagini dan nam.', expected: 'අයිවෝ 😩 ගොඩක් බඩගිනි දැන් නම්.' },
  { id: 'Neg_0049', input: 'machaan ada 9:30am ta office ekata giye, mata gedara idan km 15k withara durak office ekata thiyana nisa man tuk eke awe  Rs. 1450k tuk ekata giya.mn office ekata eddima  HR eken  kiwwa hawasata Meeting ekak thiyenawa kiyalath enisa mama Teams eken message ekak dammaa: ashanta meeting details ewanna kiyala .thawa  June 30 deadline ekakuth thiyenwa,ada nam. sirawatama tired 😫', expected: 'මචං අද 9:30ට office එකට ගියේ, මට ගෙදර ඉදන් කෑම 15ක් විතර දුරක් office එකට තියන නිසා මං tuk එකේ ආවේ Rs. 1450ක් tuk එකට ගියා.මන් office එකට එද්දිම  HR ඒකෙන් කිව්වා හවසට Meeting එකක් තියෙනවා කියලත් ඒ නිසා මම Teams එකෙන් message එකක් දැම්මා: ආශන්ට meeting details එවන්න කියලා .තව ජූනි 30 deadline එකකුත් තියෙනවා,අද නම්. සිරාවටම tired 😫' },
  { id: 'Neg_0050', input: 'Imasha akka kiwwa heta Colombo city center ekata enna kiyala,  8:30am ta withara mn mehen ennam mn hithanne eya 600 gane ticket 5kuth book karala film ekakata', expected: 'ඉමාෂා අක්කා කිව්වා හෙට Colombo city center එකට එන්න කියලා,  8:30ට විතර මන් මෙහෙන් එන්නම් මන් හිතන්නේ එයා 600 ගානේ ticket 5කුත් book කරලා film එකකට 😄' },
];

async function runTranslationCase(page, testInfo, testCase) {
  const actual = await translate(page, testCase.input);
  const passed = false;

  await testInfo.attach('translation-result', {
    body: JSON.stringify(
      {
        id: testCase.id,
        input: testCase.input,
        expected: testCase.expected,
        actual,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });

  appendResultRow(testCase, actual, passed);

  throw new Error(
    `Input: ${testCase.input}\nExpected: ${testCase.expected}\nActual: ${actual || '(empty)'}`,
  );
}

test.describe('PixelsSuite Chat Translator - Negative Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(translatorUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(100);
  });

  for (const testCase of negativeCases) {
    test(`${testCase.id}`, async ({ page }, testInfo) => {
      await runTranslationCase(page, testInfo, testCase);
    });
  }
});