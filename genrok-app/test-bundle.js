const { chromium } = require('playwright');

async function testBundle() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console messages
  page.on('console', msg => console.log('BROWSER:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3002/lessons/autopilot-sale/lesson.html', { waitUntil: 'networkidle', timeout: 30000 });

  // Check what's available
  const result = await page.evaluate(() => {
    return {
      hasReact: typeof React !== 'undefined',
      hasMotion: typeof window.Motion !== 'undefined',
      hasLessonComponents: typeof window.LessonComponents !== 'undefined',
      componentKeys: window.LessonComponents ? Object.keys(window.LessonComponents).slice(0, 20) : [],
      documentBody: document.body.innerHTML.substring(0, 500)
    };
  });

  console.log('\n=== Bundle Test Results ===');
  console.log('React available:', result.hasReact);
  console.log('Motion available:', result.hasMotion);
  console.log('LessonComponents available:', result.hasLessonComponents);
  console.log('Component keys:', result.componentKeys);
  console.log('Body HTML preview:', result.documentBody);

  await browser.close();
}

testBundle().catch(console.error);
