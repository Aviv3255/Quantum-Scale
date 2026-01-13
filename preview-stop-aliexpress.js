const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  // Navigate to the lesson file
  const lessonPath = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'stop-aliexpress', 'lesson.html');
  await page.goto(`file://${lessonPath}?userName=Builder`);

  console.log('Preview opened in browser. Press Ctrl+C to close.');

  // Keep the browser open
  await new Promise(() => {});
})();
