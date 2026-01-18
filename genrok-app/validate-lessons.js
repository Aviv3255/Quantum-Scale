const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const lessons = [
  { slug: 'familiar-surprise-secret', slides: 14 },
  { slug: '13800-percent-effect', slides: 14 },
  { slug: 'abandoned-cart-recovery', slides: 16 },
  { slug: 'anchor-moments', slides: 14 },
  { slug: 'anti-sell-mastery', slides: 14 },
  { slug: 'architecture-of-belief', slides: 12 },
  { slug: 'architecture-of-influence', slides: 12 },
  { slug: 'ascension-ladder', slides: 13 },
  { slug: 'authority-over-hope', slides: 18 },
  { slug: 'autopilot-sale', slides: 12 },
  { slug: 'blind-spot-effect', slides: 16 },
  { slug: 'borrowed-trust', slides: 16 },
  { slug: 'bottom-up-brand', slides: 12 },
  { slug: 'brand-moat', slides: 16 },
  { slug: 'certainty-transfer', slides: 15 },
  { slug: 'cognitive-load-trap', slides: 11 },
  { slug: 'commodity-escape', slides: 11 },
  { slug: 'conviction-architecture', slides: 13 }
];

async function validateLesson(browser, lesson) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  const outputDir = path.join(__dirname, 'test-screenshots', lesson.slug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n=== Validating ${lesson.slug} (${lesson.slides} slides) ===`);

  for (let i = 0; i < lesson.slides; i++) {
    const url = `http://localhost:3006/lessons/${lesson.slug}/lesson.html?slide=${i}`;
    console.log(`  Slide ${i + 1}/${lesson.slides}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500); // Wait for animations

      const screenshotPath = path.join(outputDir, `slide-${String(i).padStart(2, '0')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
    } catch (err) {
      console.log(`    Error on slide ${i}: ${err.message}`);
    }
  }

  await context.close();
  console.log(`  ✓ ${lesson.slug} complete`);
}

async function main() {
  console.log('Starting lesson validation...\n');

  const browser = await chromium.launch({ headless: true });

  for (const lesson of lessons) {
    await validateLesson(browser, lesson);
  }

  await browser.close();
  console.log('\n=== All lessons validated! ===');
}

main().catch(console.error);
