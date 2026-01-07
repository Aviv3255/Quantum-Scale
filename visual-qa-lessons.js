/**
 * Visual QA Script for Learning Center Lessons
 * Uses Puppeteer to screenshot and validate each lesson
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LESSONS = [
  'best-private-agent',
  'stop-aliexpress',
  'product-reviews-test',
  'ltv-cheat-code',
  'million-dollar-roadmap',
  'geo-announcement-bar',
  'wishlist-effect',
  'email-vs-sms'
];

const SCREENSHOT_DIR = path.join(__dirname, 'qa-screenshots');
const BASE_URL = 'file://' + path.join(__dirname, 'genrok-app/public/lessons');

async function runVisualQA() {
  // Ensure screenshot directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const lesson of LESSONS) {
    console.log(`\n=== Testing: ${lesson} ===`);
    const lessonResults = {
      lesson,
      screenshots: [],
      errors: [],
      warnings: []
    };

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      // Listen for console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          lessonResults.errors.push(msg.text());
        }
      });

      // Listen for page errors
      page.on('pageerror', error => {
        lessonResults.errors.push(error.message);
      });

      const lessonPath = `${BASE_URL}/${lesson}/lesson.html`;
      console.log(`Loading: ${lessonPath}`);

      await page.goto(lessonPath, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for React to render
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 2000)); // Wait for animations

      // Screenshot welcome slide
      const welcomeScreenshot = path.join(SCREENSHOT_DIR, `${lesson}-01-welcome.png`);
      await page.screenshot({ path: welcomeScreenshot, fullPage: false });
      lessonResults.screenshots.push(welcomeScreenshot);
      console.log(`  Screenshot: welcome slide`);

      // Click "Let's Go" button to advance
      try {
        await page.click('button');
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.log(`  Note: Could not click start button`);
      }

      // Navigate through first 5 slides and screenshot each
      for (let i = 2; i <= 6; i++) {
        try {
          // Click next arrow
          const nextButton = await page.$('button:last-of-type');
          if (nextButton) {
            await nextButton.click();
            await new Promise(r => setTimeout(r, 800)); // Wait for transition
          }

          const slideScreenshot = path.join(SCREENSHOT_DIR, `${lesson}-0${i}-slide.png`);
          await page.screenshot({ path: slideScreenshot, fullPage: false });
          lessonResults.screenshots.push(slideScreenshot);
          console.log(`  Screenshot: slide ${i}`);
        } catch (e) {
          console.log(`  Warning: Could not capture slide ${i}`);
          lessonResults.warnings.push(`Could not capture slide ${i}`);
        }
      }

      // Check for common issues
      const pageContent = await page.content();

      // Check for "Pro Tool" badge (should be removed)
      if (pageContent.includes('Pro Tool')) {
        lessonResults.warnings.push('Contains "Pro Tool" badge - should be removed');
      }

      // Check for fake stat patterns
      const fakeStatPatterns = [
        /\d+\s*(users|customers|stores)\s*surveyed/i,
        /\d+\s*test\s*orders/i,
        /\d+%\s*(increase|decrease|improvement)/i
      ];
      for (const pattern of fakeStatPatterns) {
        if (pattern.test(pageContent)) {
          lessonResults.warnings.push(`Possible fake stat found: ${pattern.toString()}`);
        }
      }

      // Check for cover image usage
      if (pageContent.includes('Article_thumnails') || pageContent.includes('Article_thumbnails')) {
        lessonResults.warnings.push('Uses cover image inside lesson - should be removed');
      }

      await page.close();

    } catch (error) {
      lessonResults.errors.push(`Failed to test lesson: ${error.message}`);
      console.error(`  ERROR: ${error.message}`);
    }

    results.push(lessonResults);
  }

  await browser.close();

  // Generate report
  console.log('\n\n========== QA REPORT ==========\n');

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const result of results) {
    console.log(`\n${result.lesson.toUpperCase()}`);
    console.log('-'.repeat(40));
    console.log(`Screenshots: ${result.screenshots.length}`);

    if (result.errors.length > 0) {
      console.log(`ERRORS (${result.errors.length}):`);
      result.errors.forEach(e => console.log(`  - ${e}`));
      totalErrors += result.errors.length;
    }

    if (result.warnings.length > 0) {
      console.log(`WARNINGS (${result.warnings.length}):`);
      result.warnings.forEach(w => console.log(`  - ${w}`));
      totalWarnings += result.warnings.length;
    }

    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log('  All checks passed!');
    }
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Total Lessons: ${LESSONS.length}`);
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);

  // Save JSON report
  const reportPath = path.join(SCREENSHOT_DIR, 'qa-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);

  return results;
}

// Run if called directly
if (require.main === module) {
  runVisualQA().catch(console.error);
}

module.exports = { runVisualQA };
