const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Lessons that were redesigned (current batch)
const redesignedLessons = [
  { slug: 'blind-spot-effect', slides: 14 }
];

const PORT = process.env.PORT || 3000;

async function screenshotLesson(browser, lesson) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  const outputDir = path.join(__dirname, 'redesign-screenshots', lesson.slug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n=== Screenshotting ${lesson.slug} (${lesson.slides} slides) ===`);

  for (let i = 0; i < lesson.slides; i++) {
    const url = `http://localhost:${PORT}/lessons/${lesson.slug}/lesson.html?slide=${i}`;
    console.log(`  Slide ${i + 1}/${lesson.slides}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(3500); // Wait for animations to complete

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
  console.log('Starting redesigned lessons screenshot capture...\n');
  console.log(`Using port: ${PORT}`);

  const browser = await chromium.launch({ headless: true });

  for (const lesson of redesignedLessons) {
    await screenshotLesson(browser, lesson);
  }

  await browser.close();
  console.log('\n=== All redesigned lessons screenshotted! ===');
  console.log(`Screenshots saved to: ${path.join(__dirname, 'redesign-screenshots')}`);
}

main().catch(console.error);
