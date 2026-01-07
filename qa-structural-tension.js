/**
 * Visual QA for Structural Tension lesson using Puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'qa-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function runVisualQA() {
  console.log('='.repeat(60));
  console.log('Visual QA for Structural Tension Lesson');
  console.log('='.repeat(60));
  console.log('');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const issues = [];
  const lessonName = 'structural-tension';

  console.log('\n--- Structural Tension ---');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const lessonPath = path.join(__dirname, 'genrok-app', 'public', 'lessons', lessonName, 'lesson.html');
  const fileUrl = `file:///${lessonPath.replace(/\\/g, '/')}`;

  try {
    // Navigate to the lesson
    await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('  Page loaded');

    // Wait for React to render
    await page.waitForSelector('#root', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 3000)); // Wait for animations

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Take full page screenshot
    const screenshotPath = path.join(screenshotsDir, `${lessonName}-full.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot saved: ${lessonName}-full.png`);

    // Check for broken images
    const brokenImages = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const broken = [];
      images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          broken.push(img.src);
        }
      });
      return broken;
    });

    if (brokenImages.length > 0) {
      console.log(`  WARNING: ${brokenImages.length} broken image(s)`);
      brokenImages.forEach(src => console.log(`    - ${src}`));
      issues.push({ type: 'broken-images', details: brokenImages });
    } else {
      console.log('  All images loaded');
    }

    // Check page structure
    const structure = await page.evaluate(() => {
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      const h1 = document.querySelector('h1');
      const h2Count = document.querySelectorAll('h2').length;

      return {
        hasHeader: !!header,
        hasMain: !!main,
        hasFooter: !!footer,
        hasH1: !!h1,
        h1Text: h1 ? h1.textContent : null,
        h2Count
      };
    });

    console.log(`  Structure: H1="${structure.h1Text}", ${structure.h2Count} sections`);

    if (!structure.hasHeader || !structure.hasMain || !structure.hasFooter) {
      issues.push({ type: 'missing-structure', details: structure });
    }

    // Check interactive elements
    const interactiveCount = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      return buttons.length;
    });
    console.log(`  Interactive elements (buttons): ${interactiveCount}`);

    // Check for accent color usage
    const hasAccentColor = await page.evaluate(() => {
      const html = document.documentElement.outerHTML;
      return html.includes('#f59e0b') || html.includes('f59e0b') || html.includes('accent');
    });

    if (hasAccentColor) {
      console.log('  Accent color: OK (Amber #f59e0b)');
    } else {
      console.log('  WARNING: No accent color found');
      issues.push({ type: 'no-accent-color' });
    }

    // Word count check
    const wordCount = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.split(/\s+/).filter(w => w.length > 0).length;
    });
    console.log(`  Word count: ~${wordCount} words`);

    if (wordCount < 700) {
      console.log('  WARNING: Word count may be below target (700-1100)');
      issues.push({ type: 'low-word-count', details: wordCount });
    }

    // Check animations (Framer Motion)
    const hasAnimations = await page.evaluate(() => {
      const html = document.documentElement.outerHTML;
      return html.includes('framer-motion') || html.includes('motion.');
    });
    console.log(`  Animations: ${hasAnimations ? 'OK (Framer Motion)' : 'WARNING - no animations detected'}`);

    // Mobile viewport check
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(r => setTimeout(r, 1000));

    const mobileScreenshotPath = path.join(screenshotsDir, `${lessonName}-mobile.png`);
    await page.screenshot({ path: mobileScreenshotPath, fullPage: true });
    console.log(`  Mobile screenshot: ${lessonName}-mobile.png`);

    // Check for horizontal overflow on mobile
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      console.log('  WARNING: Horizontal overflow on mobile');
      issues.push({ type: 'mobile-overflow' });
    } else {
      console.log('  Mobile responsive: OK');
    }

    // Check console errors
    if (consoleErrors.length > 0) {
      console.log(`  WARNING: ${consoleErrors.length} console error(s)`);
      consoleErrors.forEach(err => console.log(`    - ${err}`));
      issues.push({ type: 'console-errors', details: consoleErrors });
    } else {
      console.log('  Console errors: None');
    }

  } catch (error) {
    console.log(`  ERROR: ${error.message}`);
    issues.push({ type: 'error', details: error.message });
  }

  await page.close();
  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('VISUAL QA SUMMARY');
  console.log('='.repeat(60));

  if (issues.length === 0) {
    console.log('\n✓ Structural Tension lesson passed visual QA!');
  } else {
    console.log(`\n${issues.length} issue(s) found:`);
    issues.forEach(issue => {
      console.log(`  - ${issue.type}`);
      if (issue.details) {
        console.log(`    Details: ${JSON.stringify(issue.details)}`);
      }
    });
  }

  console.log(`\nScreenshots saved to: ${screenshotsDir}`);

  return issues;
}

runVisualQA().catch(console.error);
