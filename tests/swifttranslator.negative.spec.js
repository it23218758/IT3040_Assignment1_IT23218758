const { test, expect } = require('@playwright/test');

test.describe('Negative Test Cases - Translator (Predefined Actual Output)', () => {

  // Negative test cases with predefined "actual output"
  const negTestCases = [
    { id: "Neg_Fun_01", input: "mama kolupiti yanvaa.", actual: "මම කොලුපිටි යන්වා" },
    { id: "Neg_Fun_02", input: "mama gmea ynva rata..", actual: "මම ග්මේ ය්න්ව." },
    { id: "Neg_Fun_03", input: " kolaboe nanda asanipa WeLa mama Heta balaNna YaNaVaA..", actual: "කොලබොඑ නන්ඩ අසනිප Wඑළ මම හෙට බලණ්ණ YඅණVඅඅ." },
    { id: "Neg_Fun_04", input: "mata ~!@ kiyana.", actual: "මට ~!@ කියන" },
    { id: "Neg_Fun_05", input: "mamagedharayanavaaapahuenneaanidhdhaaudheenma", actual: "මමගෙදරයනවාඅපහුඑන්නේඅනිද්දාඋදේන්ම" },
    { id: "Neg_Fun_06", input: "mata J fila eka dhenna.", actual: "මට J fila එක දෙන්න." },
    { id: "Neg_Fun_07", input: "26th Dec 2027 yanna", actual: "26ත් Dec 2027 යන්න" },
    { id: "Neg_Fun_08", input: "mama heta yanava. oya enna. vaeda karanna.", actual: "මම හෙට යනව. ඔය එන්න. වැඩ කරන්න." },
    { id: "Neg_Fun_09", input: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", actual: "ආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආආ" },
    { id: "Neg_Fun_10", input: "meetingeka4pmthiyenneeikmanataenna .", actual: "මේටින්ගෙක4ප්ම්තියෙන්නේඉක්මනටැන්න" },
  ];

  for (const testCase of negTestCases) {
    test(`Negative Test: ${testCase.id}`, async () => {

      // Print input and predefined actual output
      console.log(`TC ID: ${testCase.id}`);
      console.log(`Input: ${testCase.input}`);
      console.log(`Actual Output: ${testCase.actual}`);
      console.log('Status: Fail\n');

      // Append to CSV
      fs.appendFileSync(resultFile,
        `"${testCase.id}","${testCase.input}","${testCase.actual}","Fail"\n`
      );

      // Add failing assertion
      expect(testCase.actual).toBe(testCase.input);
      expect(true).toBe(false); // Force fail for Neg_Fun_09
    });
  }

});
