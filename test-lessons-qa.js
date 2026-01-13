const puppeteer = require('puppeteer');

const lessonsToTest = [
  'biz-3x-threshold',
  'biz-asymmetric-monopoly',
  'biz-valley-protocol',
  'biz-rule-of-100',
  'biz-courage-variable',
  'biz-infinite-flywheel',
  'biz-rfm-secret',
  'biz-ltv-levers',
  'biz-closer-framework',
  'biz-hamster-wheel'
];

async function testLessons() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const lesson of lessonsToTest) {
    const page = await browser.newPage();

    // Test direct lesson HTML file
    const lessonUrl = `file:///C:/Projects/Quantum-Scale/genrok-app/public/lessons/${lesson}/lesson.html`;

    try {
      const response = await page.goto(lessonUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = response ? response.status() : 'no response';
      const title = await page.title();

      // Check if page has content
      const hasContent = await page.evaluate(() => {
        return document.body && document.body.innerHTML.length > 100;
      });

      // Check for LESSON_CONFIG
      const hasLessonConfig = await page.evaluate(() => {
        return document.body.innerHTML.includes('LESSON_CONFIG');
      });

      results.push({
        lesson,
        status: status === 200 || status === 'no response' ? 'OK' : status,
        title,
        hasContent,
        hasLessonConfig
      });

    } catch (error) {
      results.push({
        lesson,
        status: 'ERROR',
        error: error.message
      });
    }

    await page.close();
  }

  await browser.close();

  console.log('\n=== LESSON QA RESULTS ===\n');

  let allOk = true;
  for (const r of results) {
    if (r.status === 'ERROR' || !r.hasContent) {
      console.log(`❌ ${r.lesson}: ${r.status} - ${r.error || 'No content'}`);
      allOk = false;
    } else {
      console.log(`✅ ${r.lesson}: OK - "${r.title}"`);
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Tested: ${results.length}`);
  console.log(`Passed: ${results.filter(r => r.status !== 'ERROR' && r.hasContent).length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'ERROR' || !r.hasContent).length}`);
}

testLessons().catch(console.error);
