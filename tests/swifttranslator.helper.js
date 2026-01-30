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

  // Wait for output to be generated (give it time to process)
  await page.waitForTimeout(2000);

  let output = '';

  // Try to find output in different ways
  // 1. Check for a div or element that shows translated text
  const possibleOutputElements = await page.locator('body *').all();
  
  // 2. Look for element with Sinhala Unicode characters or content that's different from input
  for (const element of possibleOutputElements) {
    try {
      const content = await element.textContent();
      if (content && 
          content.trim() && 
          content.trim() !== text.trim() &&
          content.length > 5 &&
          content.length < 500) {
        // Check if it contains Sinhala characters (Unicode range 0x0D80–0x0DFF)
        if (/[\u0D80-\u0DFF]/.test(content)) {
          output = content.trim();
          console.log(`📍 Found Sinhala output in element`);
          break;
        }
      }
    } catch (e) {
      // Continue searching
    }
  }

  // 3. Fallback: check for any visible div with text content
  if (!output) {
    const divs = page.locator('div, p, span').filter({ hasText: /[\u0D80-\u0DFF]/ });
    if (await divs.count() > 0) {
      output = await divs.first().textContent();
      console.log(`📍 Found element with Sinhala characters`);
    }
  }

  // 4. If input was typed in textarea, check if there's any sibling or parent with output
  if (!output) {
    const parent = await inputField.evaluate(el => {
      return el.parentElement?.innerText || '';
    });
    if (parent && parent !== text && /[\u0D80-\u0DFF]/.test(parent)) {
      output = parent.trim();
      console.log(`📍 Found output in parent element`);
    }
  }

  // Take screenshot for debugging
  await page.screenshot({ path: `test-results/${text.substring(0, 20).replace(/\s/g, '_')}-result.png` }).catch(() => {});

  console.log('\n' + '='.repeat(80));
  console.log('📊 RESULT:');
  console.log('='.repeat(80));
  console.log(`\n📝 Singlish Input  : "${text}"`);
  console.log(`\n🇱🇰 Sinhala Output : "${output && output.trim() ? output : '(No translation received)'}"\n`);

  if (output && output.trim() && output.trim() !== text.trim()) {
    console.log('✅ PASS - Translation received successfully!');
  } else {
    console.log('❌ FAIL - No valid translation received');
  }
  console.log('='.repeat(80) + '\n');

  return output;
}

module.exports = { translate };
