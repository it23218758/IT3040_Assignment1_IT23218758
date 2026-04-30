# PixelsSuite Chat Translator — Playwright Tests

This repository contains Playwright test automation for the PixelsSuite Chat Translator (Singlish → Sinhala).

Quick overview

- 50 negative, intentionally-failing cases that capture actual outputs and write them to CSV under `test-results/`.
- A lightweight UI smoke test that validates the translator interface.
- Playwright HTML report generated to `playwright-report/` after a test run.

Prerequisites

1. Node.js (LTS recommended)
2. NPM
3. Internet access to reach https://www.pixelssuite.com/chat-translator

Install

```bash
npm install
```

Run the negative suite (headed):

```bash
npx playwright test tests/pixelssuite-chat-translator.negative.spec.js --headed
```

Run the UI smoke test:

```bash
npx playwright test tests/pixelssuite-chat-translator.ui.spec.js --headed
```

Run the configured npm script (negative suite):

```bash
npm run test
```

View HTML report after a run:

```bash
npx playwright show-report
```

Artifacts

- HTML report: `playwright-report/`
- Captured actual outputs: `test-results/pixelssuite-negative-results.csv`
- Failure screenshots and test attachments: `test-results/`

Notes

- Tests run sequentially (workers: 1) to avoid rate limiting of the live site.
- The negative suite intentionally throws after recording actual outputs so the Playwright report shows failing tests while preserving the captured actual output.
- If the translator returns no output for certain inputs, increase waits in `tests/pixelssuite-chat-translator.helper.js`.

If you want the README tailored differently (more/less detail, student metadata, or to restore the previous academic wording), tell me which template to use and I will update it.
