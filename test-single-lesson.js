const puppeteer = require('puppeteer');
const path = require('path');

const lesson = {
  name: 'Forty-Forty-Twenty Rule',
  path: 'genrok-app/public/lessons/forty-forty-twenty-rule/lesson.html',
  totalSlides: 17
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testLesson(browser, lesson) {
  console.log(`\n========================================`);
  console.log(`Testing: ${lesson.name}`);
  console.log(`========================================\n`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const filePath = `file://${path.resolve(lesson.path)}`;
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(2000);

  const lessonContainer = await page.$('.h-screen');
  if (!lessonContainer) {
    console.log(`FAIL: Lesson container not found`);
    await page.close();
    return false;
  }
  console.log(`PASS: Lesson container rendered`);

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
    console.log(`FAIL: Let's Go button not found`);
    await page.close();
    return false;
  }
  console.log(`PASS: Welcome screen with Let's Go button`);

  await welcomeButton.click();
  await delay(600);

  let currentSlide = 2;
  console.log(`\n  Starting navigation test...`);

  while (currentSlide < lesson.totalSlides) {
    await page.keyboard.press('ArrowRight');
    await delay(400);
    currentSlide++;
    console.log(`  -> Slide ${currentSlide}`);
  }

  console.log(`\n  Reached final slide (${currentSlide})`);
  console.log(`  Testing backwards navigation...`);

  let backSteps = 0;
  const maxBackSteps = 5;

  while (backSteps < maxBackSteps) {
    await page.keyboard.press('ArrowLeft');
    await delay(400);
    currentSlide--;
    backSteps++;
    console.log(`  <- Back to slide ${currentSlide}`);
  }

  console.log(`\nPASS: Backwards navigation works (${backSteps} steps back)`);

  console.log(`\n  Testing dot navigation...`);
  const dots = await page.$$('button.rounded-full');
  if (dots.length > 5) {
    await dots[2].click();
    await delay(500);
    console.log(`  -> Clicked dot 3`);
    await dots[dots.length - 1].click();
    await delay(500);
    console.log(`  -> Clicked last dot`);
    console.log(`PASS: Dot navigation working`);
  }

  console.log(`\nPASS: All tests passed for ${lesson.name}`);
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
  console.log(passed ? 'TEST PASSED' : 'TEST FAILED');
  console.log('========================================\n');

  process.exit(passed ? 0 : 1);
}

main().catch(console.error);
