const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3001';

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
  'biz-hamster-wheel',
  'biz-four-pillars',
  'biz-leaders-burden',
  'biz-lifetime-gross-profit',
  'biz-infinite-money-engine',
  'biz-rat-brain-hijack',
  'biz-velocity-advantage',
  'biz-remarkable-product',
  'biz-asset-not-job',
  'biz-leverage-equation',
  'biz-counter-position',
  'biz-awareness-sweet-spot',
  'biz-barbell-strategy',
  'biz-one-pager-blueprint',
  'biz-infinite-money-loop',
  'biz-marketing-company',
  'biz-product-expansion',
  'biz-zero-cac-engine',
  'biz-creative-targeting',
  'biz-authenticity-anchor',
  'biz-brand-ltv-engine',
  'biz-brand-temple',
  'biz-cash-conversion',
  'biz-empathy-engine',
  'biz-logic-trap',
  'biz-ltv-cac-dashboard',
  'biz-model-vs-method',
  'biz-objection-dance',
  'biz-operator-mindset',
  'biz-purchase-cycle-engine',
  'biz-replication-protocol'
];

async function runDeepQA() {
  console.log('Starting Deep QA...\n');

  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  // Enable console logging from page
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  console.log('=== STEP 1: Check Learning Center Page ===\n');

  try {
    await page.goto(`${BASE_URL}/learn`, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('✅ Learning Center page loaded');

    // Take screenshot
    await page.screenshot({ path: 'qa-screenshots/learn-page.png', fullPage: false });
    console.log('📸 Screenshot saved: learn-page.png');

  } catch (error) {
    console.log('❌ Learning Center failed:', error.message);

    // Check if redirected to login
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    if (currentUrl.includes('login')) {
      console.log('\n⚠️ Redirected to login - this is expected behavior for protected routes');
    }
  }

  console.log('\n=== STEP 2: Test Direct Lesson URLs ===\n');

  const results = [];

  for (const lesson of lessonsToTest) {
    const lessonUrl = `${BASE_URL}/learn/lessons/${lesson}`;

    try {
      const response = await page.goto(lessonUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = response ? response.status() : 'unknown';
      const currentUrl = page.url();

      // Check page content
      const pageContent = await page.content();
      const hasNotFound = pageContent.includes('Lesson not found') || pageContent.includes('404');
      const hasIframe = pageContent.includes('<iframe');
      const isLoginRedirect = currentUrl.includes('login');

      let result = {
        lesson,
        url: lessonUrl,
        status,
        currentUrl,
        isLoginRedirect,
        hasNotFound,
        hasIframe
      };

      if (isLoginRedirect) {
        console.log(`⚠️ ${lesson}: Redirected to login (auth required)`);
      } else if (hasNotFound) {
        console.log(`❌ ${lesson}: 404 - Lesson not found in lessonMeta`);
      } else if (hasIframe) {
        console.log(`✅ ${lesson}: OK - Has iframe`);
      } else {
        console.log(`⚠️ ${lesson}: Unknown state - Status ${status}`);
      }

      results.push(result);

    } catch (error) {
      console.log(`❌ ${lesson}: ERROR - ${error.message}`);
      results.push({ lesson, error: error.message });
    }
  }

  console.log('\n=== STEP 3: Test Static Lesson Files ===\n');

  for (const lesson of lessonsToTest.slice(0, 5)) {
    const staticUrl = `${BASE_URL}/lessons/${lesson}/lesson.html`;

    try {
      const response = await page.goto(staticUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = response ? response.status() : 'unknown';
      const title = await page.title();

      if (status === 200) {
        console.log(`✅ ${lesson} (static): ${status} - "${title}"`);
      } else {
        console.log(`❌ ${lesson} (static): ${status}`);
      }

    } catch (error) {
      console.log(`❌ ${lesson} (static): ERROR - ${error.message}`);
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total lessons tested: ${results.length}`);
  console.log(`Login redirects: ${results.filter(r => r.isLoginRedirect).length}`);
  console.log(`404 Not Found: ${results.filter(r => r.hasNotFound).length}`);
  console.log(`Working (has iframe): ${results.filter(r => r.hasIframe).length}`);
  console.log(`Errors: ${results.filter(r => r.error).length}`);

  // Keep browser open for 5 seconds to see results
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log('\n✅ Deep QA Complete');
}

// Create screenshots directory
const fs = require('fs');
if (!fs.existsSync('qa-screenshots')) {
  fs.mkdirSync('qa-screenshots');
}

runDeepQA().catch(console.error);
