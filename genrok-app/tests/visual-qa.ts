import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runVisualQA() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const screenshotsDir = join(__dirname, '..', 'screenshots');
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Starting visual QA...');

  // Test the static design preview
  const designPreviewPath = join(__dirname, '..', 'public', 'design-preview.html');

  try {
    console.log('Capturing design-preview.html...');
    await page.goto(`file://${designPreviewPath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: join(screenshotsDir, 'design-preview.png'),
      fullPage: true
    });
    console.log('  Saved design-preview.png');
  } catch (error) {
    console.error('  Error capturing design preview:', error);
  }

  // Test the login page (public)
  try {
    console.log('Capturing login page...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: join(screenshotsDir, 'login.png'),
      fullPage: true
    });
    console.log('  Saved login.png');
  } catch (error) {
    console.error('  Error capturing login:', error);
  }

  // Test signup page (public)
  try {
    console.log('Capturing signup page...');
    await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: join(screenshotsDir, 'signup.png'),
      fullPage: true
    });
    console.log('  Saved signup.png');
  } catch (error) {
    console.error('  Error capturing signup:', error);
  }

  await browser.close();
  console.log('Visual QA complete! Screenshots saved to:', screenshotsDir);
}

runVisualQA().catch(console.error);
