async function translate(page, text) {
  console.log('\n' + '='.repeat(80));
  console.log(`🔤 INPUT: "${text}"`);
  console.log('='.repeat(80));

  // Wait for page
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(200);

  // Try to find ANY textarea
  const textareas = page.locator('textarea');
  const count = await textareas.count();
  
  console.log(`📍 Found ${count} textarea(s)`);

  if (count === 0) {
    console.log('❌ ERROR: No textareas found on website');
    throw new Error('No textarea found');
  }

  // Use the first (and only) textarea as input
  const inputField = textareas.first();

  // Wait for it to be visible
  await inputField.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(100);

  // Highlight input field
  console.log('✏️  Typing input...');
  await inputField.evaluate(el => {
    el.style.border = '5px solid red';
    el.style.backgroundColor = '#ffcccc';
    el.style.fontSize = '16px';
    el.style.padding = '10px';
  });

  // Clear field
  await inputField.click();
  await inputField.evaluate(el => el.value = '');
  await page.waitForTimeout(200);

  // Type the input - FAST
  console.log(`✍️  Auto-typing...`);
  for (let i = 0; i < text.length; i++) {
    await inputField.type(text[i], { delay: 30 });
  }

  console.log(`✅ Finished typing`);

  // Wait for translation to happen - longer wait for all outputs
  console.log('\u23f3 Waiting for translation (checking every 150ms)...');
  
  let output = '';
  let waitCount = 0;
  
  // Wait up to 3 seconds for translation to appear
  while (waitCount < 20 && (!output || output === text)) {
    await page.waitForTimeout(150);
    waitCount++;
    
    // Always check all textareas for the translation
    for (let i = 0; i < count; i++) {
      const field = textareas.nth(i);
      const val = await field.inputValue().catch(() => '');
      // If we find different text that's not the input and looks reasonable length
      if (val && val !== text && val.trim().length > 0 && val.length < 200) {
        output = val;
        console.log(`\u2705 Translation detected after ${waitCount * 150}ms`);
        break;
      }
    }
    
    if (output && output !== text) {
      break;
    }
  }

  // If still no output from textareas, try to get from input field value (might have changed)
  if (!output || output === text) {
    output = await inputField.inputValue();
  }

  // Take a screenshot to show what's on screen
  await page.screenshot({ path: `test-results/${text.substring(0, 20)}-result.png` }).catch(() => {});

  // Display result
  console.log('\n' + '='.repeat(80));
  console.log('📊 RESULT:');
  console.log('='.repeat(80));
  console.log(`Singlish Input : "${text}"`);
  console.log(`Sinhala Output : "${output || '(No translation received)'}"`);

  if (output && output.trim() && output !== text) {
    console.log(`✅ PASS - Translation received!`);
  } else {
    console.log(`❌ FAIL - No valid translation received`);
  }

  console.log('='.repeat(80));
  
  // Show result on screen for 1 second then auto-close
  console.log('\u23f3 Closing in 1 second...');
  await page.waitForTimeout(1000);

  return output;
}

module.exports = { translate };
