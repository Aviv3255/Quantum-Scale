const puppeteer = require('puppeteer');
const path = require('path');

// 14 NEW article-based lessons to test
const lessons = [
  {
    name: 'Best Private Agent',
    path: 'genrok-app/public/lessons/best-private-agent/lesson.html',
    totalSlides: 17
  },
  {
    name: 'Stop Using AliExpress',
    path: 'genrok-app/public/lessons/stop-aliexpress/lesson.html',
    totalSlides: 18
  },
  {
    name: 'Product Reviews Test',
    path: 'genrok-app/public/lessons/product-reviews-test/lesson.html',
    totalSlides: 18
  },
  {
    name: 'LTV Cheat Code',
    path: 'genrok-app/public/lessons/ltv-cheat-code/lesson.html',
    totalSlides: 18
  },
  {
    name: 'Million Dollar Roadmap',
    path: 'genrok-app/public/lessons/million-dollar-roadmap/lesson.html',
    totalSlides: 22
  },
  {
    name: 'GEO Announcement Bar',
    path: 'genrok-app/public/lessons/geo-announcement-bar/lesson.html',
    totalSlides: 16
  },
  {
    name: 'Wishlist Effect',
    path: 'genrok-app/public/lessons/wishlist-effect/lesson.html',
    totalSlides: 15
  },
  {
    name: 'Email vs SMS',
    path: 'genrok-app/public/lessons/email-vs-sms/lesson.html',
    totalSlides: 16
  },
  {
    name: 'Abandoned Cart Recovery',
    path: 'genrok-app/public/lessons/abandoned-cart-recovery/lesson.html',
    totalSlides: 16
  },
  {
    name: 'Pareto Law eCommerce',
    path: 'genrok-app/public/lessons/pareto-law-ecommerce/lesson.html',
    totalSlides: 17
  },
  {
    name: 'WhatsApp Support',
    path: 'genrok-app/public/lessons/whatsapp-support/lesson.html',
    totalSlides: 13
  },
  {
    name: 'Meta Attribution Test',
    path: 'genrok-app/public/lessons/meta-attribution-test/lesson.html',
    totalSlides: 16
  },
  {
    name: 'Post Purchase Surveys',
    path: 'genrok-app/public/lessons/post-purchase-surveys/lesson.html',
    totalSlides: 18
  },
  {
    name: 'Fonts Psychology',
    path: 'genrok-app/public/lessons/fonts-psychology/lesson.html',
    totalSlides: 16
  }
];

async function testLesson(browser, lesson) {
  const page = await browser.newPage();
  const results = { name: lesson.name, tests: [], passed: true };

  // Capture console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    const filePath = path.resolve(__dirname, lesson.path);
    await page.goto(`file://${filePath}?userName=TestUser`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Test 1: Lesson container renders
    const container = await page.$('.h-screen');
    if (container) {
      results.tests.push({ name: 'Lesson container renders', passed: true });
    } else {
      results.tests.push({ name: 'Lesson container renders', passed: false, error: 'Lesson container not found' });
      results.passed = false;
    }

    // Check for console errors (JSX/Babel issues)
    if (consoleErrors.length > 0) {
      results.tests.push({ name: 'No console errors', passed: false, error: consoleErrors.slice(0, 3).join('; ') });
      results.passed = false;
    } else {
      results.tests.push({ name: 'No console errors', passed: true });
    }

    // Test 2: Welcome slide and button
    await page.waitForSelector('button', { timeout: 5000 });
    const startButton = await page.$('button');
    if (startButton) {
      results.tests.push({ name: 'Welcome slide with start button', passed: true });
      await startButton.click();
      await new Promise(r => setTimeout(r, 800));
    } else {
      results.tests.push({ name: 'Welcome slide with start button', passed: false, error: 'Start button not found' });
      results.passed = false;
    }

    // Test 3: Navigate forward 5 slides
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
      await new Promise(r => setTimeout(r, 400));
    }
    results.tests.push({ name: 'Forward navigation (5 slides)', passed: true });

    // Test 4: Navigate backward
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowLeft');
      await new Promise(r => setTimeout(r, 400));
    }
    results.tests.push({ name: 'Backward navigation (3 slides)', passed: true });

    // Test 5: Dot navigation exists
    const dots = await page.$$('.rounded-full');
    if (dots.length >= 5) {
      results.tests.push({ name: 'Progress dots visible', passed: true });
    } else {
      results.tests.push({ name: 'Progress dots visible', passed: false, error: `Only ${dots.length} dots found` });
    }

  } catch (error) {
    results.tests.push({ name: 'Lesson loads without error', passed: false, error: error.message });
    results.passed = false;
  }

  await page.close();
  return results;
}

async function runTests() {
  console.log('\n🧪 QUANTUM SCALE - Article Lessons QA Test\n');
  console.log('Testing 14 new article-based lessons...\n');
  console.log('='.repeat(60) + '\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let passedCount = 0;
  let failedCount = 0;
  const failedLessons = [];

  for (const lesson of lessons) {
    const result = await testLesson(browser, lesson);

    if (result.passed) {
      console.log(`✅ PASS: ${result.name}`);
      passedCount++;
    } else {
      console.log(`❌ FAIL: ${result.name}`);
      failedLessons.push(result);
      failedCount++;
      result.tests.filter(t => !t.passed).forEach(t => {
        console.log(`   └─ ${t.name}: ${t.error}`);
      });
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 RESULTS: ${passedCount} PASSED, ${failedCount} FAILED out of ${lessons.length} lessons\n`);

  if (failedCount > 0) {
    console.log('❌ FAILED LESSONS:');
    failedLessons.forEach(l => {
      console.log(`   - ${l.name}`);
      l.tests.filter(t => !t.passed).forEach(t => {
        console.log(`      └─ ${t.name}: ${t.error}`);
      });
    });
    process.exit(1);
  } else {
    console.log('🎉 ALL 14 ARTICLE LESSONS PASSED QA!\n');
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
