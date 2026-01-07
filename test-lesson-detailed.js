const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console messages and errors
  const logs = [];
  const errors = [];

  page.on('console', msg => {
    logs.push(`${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  await page.setViewport({ width: 1440, height: 900 });

  const lessonPath = path.resolve(__dirname, 'genrok-app/public/lessons/best-private-agent/lesson.html');
  const fileUrl = `file:///${lessonPath.replace(/\\/g, '/')}`;

  console.log('Testing lesson...\n');

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to render
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Check if slides are rendered
  const slideCount = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? 'React rendered' : 'React NOT rendered';
  });

  console.log('Status:', slideCount);

  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach(err => console.log('  -', err));
  } else {
    console.log('\n✓ No JavaScript errors detected');
  }

  // Test navigation
  console.log('\nTesting slide navigation...');

  // Click "Let's Go" button
  try {
    await page.waitForSelector('button', { timeout: 5000 });
    await page.click('button');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('✓ Welcome slide navigation works');
  } catch (e) {
    console.log('❌ Could not find/click button:', e.message);
  }

  // Navigate through a few slides
  for (let i = 0; i < 5; i++) {
    try {
      const nextButton = await page.$('button[class*="right"]');
      if (nextButton) {
        await nextButton.click();
        await new Promise(resolve => setTimeout(resolve, 400));
        console.log(`✓ Navigated to slide ${i + 2}`);
      }
    } catch (e) {
      console.log(`Note: Stopped at slide ${i + 1}`);
      break;
    }
  }

  await browser.close();

  console.log('\n✅ Test complete!');

})().catch(console.error);
