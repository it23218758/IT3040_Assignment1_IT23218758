# IT3040 Assignment 1 - Playwright Project

## User
**Registration Number:** IT23218758

---

## Project Description
This project contains automated test scripts for **IT3040 – ITPM Semester 1, Assignment 1**.  
The scripts test the **SwiftTranslator website** (Singlish → Sinhala) using **Playwright**.  

The tests cover **24+ positive** and **10+ negative scenarios**, including:

- Sentence structures: simple, compound, complex  
- Interrogative (questions) and imperative (commands) forms  
- Positive and negative sentence forms  
- Daily language usage: greetings, requests, and responses  
- Polite vs informal phrasing, slang  
- Mixed Singlish + English content  
- Input length variations: short, medium, long  
- Punctuation, numeric formats, and formatting  
- UI behavior: real-time output updates, clearing input

## Prerequisites
Before running the tests, make sure you have:

1. **Node.js** installed ([https://nodejs.org/](https://nodejs.org/))  
2. **NPM** installed  
3. A code editor like **VS Code**  

---

## How to Install Dependencies
1. Open the terminal in the project folder.  
2. Run the following command to install all required packages:

**bash**
npm install

*How to Run Tests*

Open the terminal in the project folder.
Run all test scripts using:
   npx playwright test


The results will appear directly in the terminal.

To view a detailed HTML report of the test results, run:
  npx playwright show-report

  only ui test case - npx playwright test swifttranslator.ui.spec.js --headed

*Notes*

Ensure an active internet connection, as the tests open the website.

All scripts are written in JavaScript using Playwright.

The test cases cover accuracy validation, robustness validation, and UI behavior.

Positive and negative test cases cover real-world usage scenarios and edge cases.
