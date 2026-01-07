/**
 * Visual QA for 4 new lessons using Puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const lessons = [
  { name: 'emotion-spectrum', title: 'The Emotion Spectrum' },
  { name: 'blind-spot-effect', title: 'The Blind Spot Effect' },
  { name: 'customer-voice-mining', title: 'Voice of Customer Mining' },
  { name: 'trust-architecture', title: 'The Trust Architecture' },
];

const screenshotsDir = path.join(__dirname, 'qa-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function runVisualQA() {
  console.log('='.repeat(60));
  console.log('Visual QA for 4 New Lessons');
  console.log('='.repeat(60));
  console.log('');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const issues = [];

  for (const lesson of lessons) {
    console.log(`\n--- ${lesson.title} ---`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const lessonPath = path.join(__dirname, 'genrok-app', 'public', 'lessons', lesson.name, 'lesson.html');
    const fileUrl = `file:///${lessonPath.replace(/\\/g, '/')}`;

    try {
      // Navigate to the lesson
      await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      console.log('  Page loaded');

      // Wait for React to render
      await page.waitForSelector('#root', { timeout: 5000 });
      await new Promise(r => setTimeout(r, 2000)); // Wait for animations

      // Check for console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Take full page screenshot
      const screenshotPath = path.join(screenshotsDir, `${lesson.name}-full.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  Screenshot saved: ${lesson.name}-full.png`);

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
        issues.push({ lesson: lesson.name, type: 'broken-images', details: brokenImages });
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
        issues.push({ lesson: lesson.name, type: 'missing-structure', details: structure });
      }

      // Check interactive elements
      const interactiveCount = await page.evaluate(() => {
        const clickables = document.querySelectorAll('[class*="cursor-pointer"]');
        return clickables.length;
      });
      console.log(`  Interactive elements: ${interactiveCount}`);

      // Check for accent color usage
      const hasAccentColor = await page.evaluate(() => {
        const html = document.documentElement.outerHTML;
        return html.includes('accent') || html.includes('#f43f5e') || html.includes('#8b5cf6') || html.includes('#06b6d4') || html.includes('#10b981');
      });

      if (hasAccentColor) {
        console.log('  Accent color: OK');
      } else {
        console.log('  WARNING: No accent color found');
        issues.push({ lesson: lesson.name, type: 'no-accent-color' });
      }

      // Mobile viewport check
      await page.setViewport({ width: 375, height: 667 });
      await new Promise(r => setTimeout(r, 1000));

      const mobileScreenshotPath = path.join(screenshotsDir, `${lesson.name}-mobile.png`);
      await page.screenshot({ path: mobileScreenshotPath, fullPage: true });
      console.log(`  Mobile screenshot: ${lesson.name}-mobile.png`);

      // Check for horizontal overflow on mobile
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasOverflow) {
        console.log('  WARNING: Horizontal overflow on mobile');
        issues.push({ lesson: lesson.name, type: 'mobile-overflow' });
      } else {
        console.log('  Mobile responsive: OK');
      }

    } catch (error) {
      console.log(`  ERROR: ${error.message}`);
      issues.push({ lesson: lesson.name, type: 'error', details: error.message });
    }

    await page.close();
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('VISUAL QA SUMMARY');
  console.log('='.repeat(60));

  if (issues.length === 0) {
    console.log('\nAll lessons passed visual QA!');
  } else {
    console.log(`\n${issues.length} issue(s) found:`);
    issues.forEach(issue => {
      console.log(`  - ${issue.lesson}: ${issue.type}`);
      if (issue.details) {
        console.log(`    Details: ${JSON.stringify(issue.details)}`);
      }
    });
  }

  console.log(`\nScreenshots saved to: ${screenshotsDir}`);
}

runVisualQA().catch(console.error);
