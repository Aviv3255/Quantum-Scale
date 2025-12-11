/**
 * High-Resolution Screenshot Script
 *
 * This script captures ultra-high-quality screenshots of your web pages.
 * Using deviceScaleFactor: 3 means a 1440px wide capture becomes 4320px!
 *
 * Usage:
 *   1. npm install puppeteer (if not installed)
 *   2. Run your dev server: npm run dev
 *   3. node screenshot-high-res.cjs [URL]
 *
 * Examples:
 *   node screenshot-high-res.cjs https://quantum-scale.co/web-ui-inspiration
 *   node screenshot-high-res.cjs https://quantum-scale.co/
 */

const puppeteer = require('puppeteer');
const path = require('path');

// Configuration
const CONFIG = {
  // Scale factor - higher = better quality (3x recommended, max 4x)
  deviceScaleFactor: 3,

  // Viewports for different devices
  viewports: {
    desktop: { width: 1440, height: 900 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 812 }
  },

  // Wait time after page load (for animations, images, etc.)
  waitAfterLoad: 2000,

  // Output directory
  outputDir: './screenshots'
};

async function captureScreenshot(url, device = 'desktop') {
  const viewport = CONFIG.viewports[device];

  console.log(`\n📸 Capturing ${device} screenshot...`);
  console.log(`   Resolution: ${viewport.width}x${viewport.height}`);
  console.log(`   Final image size: ${viewport.width * CONFIG.deviceScaleFactor}x (with ${CONFIG.deviceScaleFactor}x scale)`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--force-device-scale-factor=' + CONFIG.deviceScaleFactor
    ]
  });

  const page = await browser.newPage();

  // Set viewport with high DPI
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: CONFIG.deviceScaleFactor
  });

  // Optional: Emulate high-end retina display
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' }
  ]);

  console.log(`   Loading URL: ${url}`);

  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  // Wait for any lazy-loaded images or animations
  await new Promise(resolve => setTimeout(resolve, CONFIG.waitAfterLoad));

  // Wait for all images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  });

  // Generate filename
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `screenshot_${device}_${timestamp}_${CONFIG.deviceScaleFactor}x.png`;
  const outputPath = path.join(CONFIG.outputDir, filename);

  // Create output directory if it doesn't exist
  const fs = require('fs');
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Take full page screenshot
  await page.screenshot({
    path: outputPath,
    fullPage: true,
    type: 'png'
  });

  console.log(`   ✅ Saved: ${outputPath}`);

  await browser.close();

  return outputPath;
}

async function main() {
  const url = process.argv[2] || 'https://quantum-scale.co/web-ui-inspiration';

  console.log('🚀 High-Resolution Screenshot Tool');
  console.log('================================');
  console.log(`URL: ${url}`);
  console.log(`Scale Factor: ${CONFIG.deviceScaleFactor}x`);

  try {
    // Capture all device sizes
    const screenshots = [];

    // Desktop (main)
    screenshots.push(await captureScreenshot(url, 'desktop'));

    // Mobile
    screenshots.push(await captureScreenshot(url, 'mobile'));

    // Tablet (optional)
    // screenshots.push(await captureScreenshot(url, 'tablet'));

    console.log('\n🎉 All screenshots captured successfully!');
    console.log('\nGenerated files:');
    screenshots.forEach(s => console.log(`   - ${s}`));

    console.log('\n💡 Tip: These images are at 3x resolution.');
    console.log('   Desktop: 4320x2700 pixels');
    console.log('   Mobile: 1125x2436 pixels');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure your dev server is running (npm run dev)');
    console.log('   2. Check if the URL is correct');
    console.log('   3. Try installing puppeteer: npm install puppeteer');
    process.exit(1);
  }
}

main();
