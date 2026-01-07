const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, 'genrok-app/public/lessons');

// Get all biz- lesson directories
function getAllBizLessons() {
  const dirs = fs.readdirSync(LESSONS_DIR);
  return dirs.filter(d => d.startsWith('biz-') && fs.existsSync(path.join(LESSONS_DIR, d, 'lesson.html')));
}

async function runStaticQA() {
  const lessons = getAllBizLessons();
  console.log(`Found ${lessons.length} biz- lessons to test\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    passed: [],
    failed: []
  };

  for (const lesson of lessons) {
    const page = await browser.newPage();
    const lessonPath = path.join(LESSONS_DIR, lesson, 'lesson.html');
    const fileUrl = `file:///${lessonPath.replace(/\\/g, '/')}`;

    try {
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

      const title = await page.title();
      const hasContent = await page.evaluate(() => document.body.innerHTML.length > 500);
      const hasLessonConfig = await page.evaluate(() => {
        return document.body.innerHTML.includes('LESSON_CONFIG') ||
               document.body.innerHTML.includes('slides') ||
               document.body.innerHTML.includes('currentSlide');
      });

      // Check for console errors
      let hasErrors = false;
      page.on('pageerror', () => { hasErrors = true; });

      if (hasContent && hasLessonConfig) {
        console.log(`✅ ${lesson}: "${title}"`);
        results.passed.push({ lesson, title });
      } else {
        console.log(`⚠️ ${lesson}: Missing content or config`);
        results.failed.push({ lesson, reason: 'Missing content or LESSON_CONFIG' });
      }
    } catch (error) {
      console.log(`❌ ${lesson}: ${error.message}`);
      results.failed.push({ lesson, reason: error.message });
    }

    await page.close();
  }

  await browser.close();

  console.log('\n=== SUMMARY ===');
  console.log(`Total: ${lessons.length}`);
  console.log(`Passed: ${results.passed.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n=== FAILED LESSONS ===');
    results.failed.forEach(f => console.log(`- ${f.lesson}: ${f.reason}`));
  }

  return results;
}

runStaticQA().catch(console.error);
