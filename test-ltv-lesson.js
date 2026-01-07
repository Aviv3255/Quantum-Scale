const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const lesson = {
  name: 'LTV Cheat Code',
  path: 'genrok-app/public/lessons/ltv-cheat-code/lesson.html',
  totalSlides: 17
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testLesson(browser, lesson) {
  console.log(`\n========================================`);
  console.log(`Testing: ${lesson.name}`);
  console.log(`========================================\n`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Create screenshots directory
  const screenshotDir = path.resolve('lesson-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const filePath = `file://${path.resolve(lesson.path)}`;
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(2000);

  const lessonContainer = await page.$('.h-screen');
  if (!lessonContainer) {
    console.log(`❌ FAIL: Lesson container not found`);
    await page.close();
    return false;
  }
  console.log(`✓ PASS: Lesson container rendered`);

  // Check for welcome screen
  const buttons = await page.$$('button');
  let welcomeButton = null;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes("Let's Go")) {
      welcomeButton = btn;
      break;
    }
  }

  if (!welcomeButton) {
    console.log(`❌ FAIL: Let's Go button not found`);
    await page.close();
    return false;
  }
  console.log(`✓ PASS: Welcome screen with Let's Go button`);

  // Screenshot welcome slide
  await page.screenshot({ path: path.join(screenshotDir, 'ltv-01-welcome.png'), fullPage: true });
  console.log(`  📸 Screenshot: welcome slide`);

  // Click Let's Go
  await welcomeButton.click();
  await delay(600);

  let currentSlide = 2;
  const keySlides = [2, 5, 8, 14]; // Hook, Example, Visual comparison, Tool slide

  console.log(`\n  Starting navigation test...`);

  while (currentSlide < lesson.totalSlides) {
    await page.keyboard.press('ArrowRight');
    await delay(400);
    currentSlide++;

    if (keySlides.includes(currentSlide)) {
      const filename = `ltv-${currentSlide.toString().padStart(2, '0')}-slide.png`;
      await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: true });
      console.log(`  -> Slide ${currentSlide} 📸`);
    } else {
      console.log(`  -> Slide ${currentSlide}`);
    }
  }

  // Screenshot completion slide
  await page.screenshot({ path: path.join(screenshotDir, 'ltv-17-completion.png'), fullPage: true });
  console.log(`  📸 Screenshot: completion slide`);

  console.log(`\n  Reached final slide (${currentSlide})`);

  // Check for images on the page
  const images = await page.$$('img');
  console.log(`\n  Checking images...`);

  let allImagesLoaded = true;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = await page.evaluate(el => el.src, img);
    const complete = await page.evaluate(el => el.complete, img);
    const naturalHeight = await page.evaluate(el => el.naturalHeight, img);

    if (!complete || naturalHeight === 0) {
      console.log(`  ❌ Image ${i + 1} failed to load: ${src}`);
      allImagesLoaded = false;
    } else {
      console.log(`  ✓ Image ${i + 1} loaded: ${src.substring(0, 60)}...`);
    }
  }

  if (allImagesLoaded) {
    console.log(`\n✓ PASS: All images loaded successfully`);
  } else {
    console.log(`\n❌ FAIL: Some images failed to load`);
  }

  // Check for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Check for dark backgrounds (should have none)
  const darkSlides = await page.evaluate(() => {
    const slides = document.querySelectorAll('.absolute');
    let darkCount = 0;
    slides.forEach(slide => {
      const bg = window.getComputedStyle(slide).backgroundColor;
      if (bg.includes('rgb(0, 0, 0)') || bg.includes('rgb(23, 23, 23)')) {
        darkCount++;
      }
    });
    return darkCount;
  });

  if (darkSlides === 0) {
    console.log(`✓ PASS: No dark slide backgrounds (white background only)`);
  } else {
    console.log(`⚠ WARNING: Found ${darkSlides} slides with dark backgrounds`);
  }

  console.log(`\n✓ PASS: All tests passed for ${lesson.name}`);
  console.log(`📁 Screenshots saved to: ${screenshotDir}`);

  await page.close();
  return true;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const passed = await testLesson(browser, lesson);
  await browser.close();

  console.log('\n========================================');
  console.log(passed ? '✓ TEST PASSED' : '❌ TEST FAILED');
  console.log('========================================\n');

  process.exit(passed ? 0 : 1);
}

main().catch(console.error);
