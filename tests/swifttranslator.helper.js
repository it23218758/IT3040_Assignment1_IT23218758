async function translate(page, text) {
  console.log('\n' + '='.repeat(80));
  console.log(`🔤 INPUT: "${text}"`);
  console.log('='.repeat(80));

  // Wait for page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // Find input textarea
  const inputField = page.locator('textarea').first();
  if (!inputField) throw new Error('No input textarea found');

  // Highlight input field for debugging
  await inputField.evaluate(el => {
    el.style.border = '3px solid red';
    el.style.backgroundColor = '#ffebeb';
  });

  // Clear previous value and type input
  await inputField.fill('');
  await inputField.type(text, { delay: 20 });

  console.log('✍️  Typing completed');

  // Wait for output element (try common selector or next sibling)
  const outputSelectorCandidates = [
    '#output',            // common id
    '.output',            // common class
    'textarea:nth-of-type(2)', // second textarea if site uses two
    '.translation-result' // some sites
  ];

  let output = '';
  for (const selector of outputSelectorCandidates) {
    const exists = await page.locator(selector).count();
    if (exists > 0) {
      console.log(`📍 Found output container: "${selector}"`);
      output = await page.locator(selector).textContent({ timeout: 5000 }).catch(() => '');
      if (output && output.trim() !== text) break;
    }
  }

  // If still no output, try second textarea as fallback
  if (!output || output.trim() === '') {
    const textareas = page.locator('textarea');
    if ((await textareas.count()) > 1) {
      output = await textareas.nth(1).inputValue();
    }
  }

  // Fallback: just read first textarea again
  if (!output || output.trim() === '') {
    output = await inputField.inputValue();
  }

  // Take screenshot for debugging
  await page.screenshot({ path: `test-results/${text.substring(0, 20).replace(/\s/g, '_')}-result.png` }).catch(() => {});

  console.log('\n' + '='.repeat(80));
  console.log('📊 RESULT:');
  console.log('='.repeat(80));
  console.log(`Singlish Input : "${text}"`);
  console.log(`Sinhala Output : "${output || '(No translation received)'}"`);

  if (output && output.trim() && output !== text) {
    console.log('✅ PASS - Translation received!');
  } else {
    console.log('❌ FAIL - No valid translation received');
  }
  console.log('='.repeat(80));

  return output;
}

module.exports = { translate };
