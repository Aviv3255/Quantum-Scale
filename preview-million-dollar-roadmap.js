const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  const lessonPath = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'million-dollar-roadmap', 'lesson.html');

  await page.goto(`file://${lessonPath}?userName=Builder`);

  console.log('\n✅ Lesson opened in browser for preview');
  console.log('📍 Review these specific changes:');
  console.log('   1. Enhanced content slides (less empty/boring content)');
  console.log('   2. Purple gradient button on "How to Build $1,000 Per customer" slide');
  console.log('   3. Updated roadmap steps (5 steps now):');
  console.log('      - Step 1: Building LTV ($1,000-$2,000 tracked in DataDrew)');
  console.log('      - Step 2: Setting Strong Roots (Email, Checkout, Private Agent)');
  console.log('      - Step 3: Attracting Only Top RFM ($1,000-$2,000 customers)');
  console.log('      - Step 4: 33 customers/day with unlimited CAC');
  console.log('      - Step 5: The game is easy and infinite');
  console.log('   4. DataDrew reference slide with screenshot');
  console.log('   5. Updated quiz and completion text\n');

  // Keep browser open for manual review
  console.log('⏸️  Browser will stay open for manual review. Close it when done.\n');

  // Wait indefinitely
  await new Promise(() => {});
})();
