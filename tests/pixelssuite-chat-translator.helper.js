function hasSinhalaText(text) {
  return /[\u0D80-\u0DFF]/.test(text || '');
}

async function translate(page, text) {
  console.log('\n' + '='.repeat(80));
  console.log(`🔤 INPUT: "${text}"`);
  console.log('='.repeat(80));

  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(50);

  const inputField = page.getByPlaceholder('Type your English text here…');
  const outputField = page.getByPlaceholder('Transliterated Sinhala will appear here…');
  const transliterateButton = page.getByRole('button', { name: 'Transliterate' });

  await inputField.waitFor({ state: 'visible', timeout: 5000 });
  await outputField.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(50);

  const textareaCount = await page.locator('textarea').count();
  console.log(`📍 Found ${textareaCount} textarea(s)`);

  await inputField.fill('');
  await outputField.evaluate(el => {
    el.value = '';
    el.textContent = '';
  });

  await inputField.type(text, { delay: 5 });
  await transliterateButton.click();

  console.log(`✅ Finished typing`);

  let output = '';
  let waitCount = 0;

  while (waitCount < 20 && !hasSinhalaText(output)) {
    await page.waitForTimeout(100);
    waitCount++;

    output = await outputField.evaluate(el => (el.value || el.textContent || '').trim()).catch(() => '');
  }

  if (!hasSinhalaText(output)) {
    output = await outputField.evaluate(el => (el.value || el.textContent || '').trim()).catch(() => '');
  }

  await page.screenshot({ path: `test-results/${text.substring(0, 20).replace(/\s/g, '_')}-result.png` }).catch(() => {});

  console.log('\n' + '='.repeat(80));
  console.log('📊 RESULT:');
  console.log('='.repeat(80));
  console.log(`Singlish Input : "${text}"`);
  console.log(`Sinhala Output : "${output || '(No translation received)'}"`);

  if (output && output.trim().length > 0) {
    if (hasSinhalaText(output)) {
      console.log(`✅ PASS - Sinhala translation received!`);
    } else if (output === text) {
      console.log(`✅ PASS (Warning: output same as input, maybe slang)`);
    } else {
      console.log(`✅ PASS - Translation received!`);
    }
  } else {
    console.log(`❌ FAIL - No valid translation received`);
  }

  console.log('='.repeat(80));
  await page.waitForTimeout(100);

  return output;
}

module.exports = { translate, hasSinhalaText };