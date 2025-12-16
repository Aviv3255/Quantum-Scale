const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function previewLesson(lessonPath, screenshotName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 900 });

  const absolutePath = path.resolve(lessonPath);
  const fileUrl = `file:///${absolutePath.replace(/\\/g, '/')}`;

  console.log(`Opening: ${fileUrl}`);

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to render
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll through the entire page to trigger all animations
  await page.evaluate(async () => {
    const scrollHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    let currentScroll = 0;

    while (currentScroll < scrollHeight) {
      window.scrollTo(0, currentScroll);
      await new Promise(resolve => setTimeout(resolve, 200));
      currentScroll += viewportHeight / 2;
    }

    // Scroll back to top
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // Wait for animations to complete
  await new Promise(resolve => setTimeout(resolve, 1000));

  const screenshotsDir = path.join(__dirname, 'lesson-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotsDir, `${screenshotName}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved: ${screenshotPath}`);

  await browser.close();
  return screenshotPath;
}

const lessonPath = process.argv[2] || 'lessons/familiar-surprise-secret/lesson.html';
const screenshotName = process.argv[3] || 'lesson-preview';

previewLesson(lessonPath, screenshotName)
  .then(path => console.log('Done:', path))
  .catch(err => console.error('Error:', err));
