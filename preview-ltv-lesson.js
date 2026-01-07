const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const lessonPath = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'ltv-cheat-code', 'lesson.html');
  const fileUrl = `file:///${lessonPath.replace(/\\/g, '/')}?userName=Builder`;

  console.log('Loading lesson:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  console.log('\n✅ Lesson loaded successfully!');
  console.log('\nChanges implemented:');
  console.log('1. ✅ Character image added (fixed right, 10% padding, bottom-attached)');
  console.log('2. ✅ "The Reality: It\'s Not 80/20" updated with new data (5%/95%)');
  console.log('3. ✅ "The LTV Blindness Problem" moved BEFORE "The Reality: It\'s Not 80/20"');
  console.log('4. ✅ Supplement Store slide rewritten as comparison table');
  console.log('5. ✅ Added 4 new DataDrew slides with screenshots');
  console.log('6. ✅ Updated tool slide to reference DataDrew');
  console.log('\nPress Ctrl+C to close the browser when done reviewing.');

  // Keep the browser open
  await new Promise(() => {});
})();
