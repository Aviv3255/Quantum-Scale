const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// The 4 redesigned lessons for approval (lime green, world-class components)
const lessonsToScreenshot = [
  { slug: 'anti-sell-mastery', slides: 15 },
  { slug: 'borrowed-trust', slides: 16 },
  { slug: 'blind-spot-effect', slides: 23 },
  { slug: 'brand-moat', slides: 15 }
];

const PORT = 3000;

async function screenshotLesson(browser, lesson) {
  // New context with cache disabled
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    bypassCSP: true
  });
  const page = await context.newPage();

  // Disable cache
  await page.route('**/*', route => {
    route.continue({ headers: { ...route.request().headers(), 'Cache-Control': 'no-cache' } });
  });

  const outputDir = path.join(__dirname, 'redesign-screenshots', lesson.slug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n=== Screenshotting ${lesson.slug} (${lesson.slides} slides) ===`);

  for (let i = 0; i < lesson.slides; i++) {
    const url = `http://localhost:${PORT}/lessons/${lesson.slug}/lesson.html?slide=${i}&t=${Date.now()}`;
    console.log(`  Slide ${i + 1}/${lesson.slides}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2500); // Wait for animations and component render

      const screenshotPath = path.join(outputDir, `slide-${String(i).padStart(2, '0')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const stats = fs.statSync(screenshotPath);
      console.log(`    Saved: ${Math.round(stats.size / 1024)}KB`);
    } catch (err) {
      console.log(`    Error on slide ${i}: ${err.message}`);
    }
  }

  await context.close();
  console.log(`  Done: ${lesson.slug}`);
}

async function main() {
  console.log('Taking screenshots of redesigned lessons...\n');
  console.log(`Using port: ${PORT}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  const browser = await chromium.launch({ headless: true });

  for (const lesson of lessonsToScreenshot) {
    await screenshotLesson(browser, lesson);
  }

  await browser.close();
  console.log('\n=== Screenshots complete! ===');
  console.log(`Screenshots saved to: ${path.join(__dirname, 'redesign-screenshots')}`);
}

main().catch(console.error);
