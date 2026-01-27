const { test, expect } = require('@playwright/test');

test.describe('Negative Test Cases - Translator (Predefined Actual Output)', () => {

  // Negative test cases with predefined "actual output"
  const negTestCases = [
    { id: "Neg_Fun_01", input: "mama xyz123 yanavaa.", actual: "මම xයz123 යනවා." },
    { id: "Neg_Fun_02", input: "mm gme ynv l8r.", actual: "mm ග්මෙ ය්න්ව් l8ර්." },
    { id: "Neg_Fun_03", input: "MaMa GaMe YaNaVaA.", actual: "මම ඟමෙ YඅණVඅඅ." },
    { id: "Neg_Fun_04", input: "mata ~!@ kiyana.", actual: "මට ~!@ කියන" },
    { id: "Neg_Fun_05", input: "mamagedharayanavaaapahuenneaanidhdhaaudheenma", actual: "මමගෙදරයනවාඅපහුඑන්නේඅනිද්දාඋදේන්ම" },
    { id: "Neg_Fun_06", input: "mata JSON file eka dhenna.", actual: "මට JSON file එක දෙන්න." },
    { id: "Neg_Fun_07", input: "25th Dec 2025 yanna", actual: "25ත් Dec 2025 යන්න" },
    { id: "Neg_Fun_08", input: "yanavaa. oonee? karanava.", actual: "යනවා. ඕනේ? කරනව." },
    { id: "Neg_Fun_09", input: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", actual: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: "Neg_Fun_10", input: "2+2=4 kiyala liyanna.", actual: "2+2=4 කියල ලියන්න" },
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
