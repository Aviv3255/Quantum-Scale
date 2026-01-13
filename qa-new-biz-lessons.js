const puppeteer = require('puppeteer');
const path = require('path');

const lessons = [
  'biz-3x-threshold',
  'biz-brand-temple',
  'biz-replication-protocol',
  'biz-leaders-burden',
  'biz-purchase-cycle-engine'
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const lesson of lessons) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const filePath = path.join(__dirname, 'genrok-app/public/lessons', lesson, 'lesson.html');

    try {
      await page.goto('file://' + filePath, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000));

      const title = await page.title();
      const h1Text = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.textContent : 'No H1';
      });

      // Check for slides
      const hasSlides = await page.evaluate(() => {
        return document.body.innerHTML.includes('const slides = [');
      });

      // Check for React mounting
      const hasRoot = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      });

      // Take screenshot
      const screenshotPath = path.join(__dirname, 'qa-screenshots', lesson + '-qa.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });

      results.push({
        lesson,
        status: 'OK',
        title: title.split('|')[0].trim(),
        h1: h1Text.trim(),
        hasSlides: hasSlides ? 'Yes' : 'No',
        reactMounted: hasRoot ? 'Yes' : 'No'
      });
    } catch (err) {
      results.push({ lesson, status: 'ERROR', error: err.message });
    }

    await page.close();
  }

  await browser.close();

  console.log('\n=== QA RESULTS FOR 5 NEW BUSINESS LESSONS ===\n');
  let allPassed = true;
  results.forEach(r => {
    if (r.status === 'OK') {
      console.log('✓', r.lesson);
      console.log('  Title:', r.title);
      console.log('  H1:', r.h1);
      console.log('  Has Slides:', r.hasSlides);
      console.log('  React Mounted:', r.reactMounted);
      if (r.reactMounted !== 'Yes') allPassed = false;
    } else {
      console.log('✗', r.lesson, '-', r.error);
      allPassed = false;
    }
    console.log();
  });

  console.log('Screenshots saved to qa-screenshots/');
  console.log('\nOverall:', allPassed ? 'ALL PASSED' : 'SOME ISSUES FOUND');
})();
