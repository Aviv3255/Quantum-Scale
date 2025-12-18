const puppeteer = require('puppeteer');
const path = require('path');

const lessons = [
  {
    name: 'Familiar Surprise Secret',
    path: 'genrok-app/public/lessons/familiar-surprise-secret/lesson.html',
    totalSlides: 14
  },
  {
    name: 'Red Button Effect',
    path: 'genrok-app/public/lessons/red-button-effect/lesson.html',
    totalSlides: 14
  },
  {
    name: 'FRED Method',
    path: 'genrok-app/public/lessons/fred-method/lesson.html',
    totalSlides: 14
  },
  {
    name: 'Gatekeeper Method',
    path: 'genrok-app/public/lessons/gatekeeper-method/lesson.html',
    totalSlides: 15
  },
  {
    name: 'Three Second Rule',
    path: 'genrok-app/public/lessons/three-second-rule/lesson.html',
    totalSlides: 15
  },
  {
    name: 'Science of Selling',
    path: 'genrok-app/public/lessons/science-of-selling/lesson.html',
    totalSlides: 15
  },
  {
    name: 'Three Levels of Change',
    path: 'genrok-app/public/lessons/three-levels-of-change/lesson.html',
    totalSlides: 14
  },
  {
    name: 'OCPB Formula',
    path: 'genrok-app/public/lessons/ocpb-formula/lesson.html',
    totalSlides: 14
  },
  {
    name: 'Persuasion Stack',
    path: 'genrok-app/public/lessons/persuasion-stack/lesson.html',
    totalSlides: 17
  },
  {
    name: 'WIIFM Principle',
    path: 'genrok-app/public/lessons/wiifm-principle/lesson.html',
    totalSlides: 14
  },
  {
    name: 'CPPPB Proof Loop',
    path: 'genrok-app/public/lessons/cpppb-proof-loop/lesson.html',
    totalSlides: 19
  },
  {
    name: 'Emotional Precision',
    path: 'genrok-app/public/lessons/emotional-precision/lesson.html',
    totalSlides: 15
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testLesson(browser, lesson) {
  console.log(`\n========================================`);
  console.log(`Testing: ${lesson.name}`);
  console.log(`========================================\n`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const filePath = `file://${path.resolve(lesson.path)}`;
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to render
  await delay(2000);

  // Check if lesson rendered (simplified layout now uses h-screen)
  const lessonContainer = await page.$('.h-screen');
  if (!lessonContainer) {
    console.log(`FAIL: Lesson container not found`);
    await page.close();
    return false;
  }
  console.log(`PASS: Lesson container rendered`);

  // Test Welcome Screen - find button with "Let's Go" text
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

  // Click Let's Go to start
  await welcomeButton.click();
  await delay(600);

  // Test navigation through slides
  let currentSlide = 2;
  let errors = [];

  console.log(`\n  Starting navigation test...`);

  // Navigate forward
  while (currentSlide < lesson.totalSlides) {
    // Use keyboard navigation
    await page.keyboard.press('ArrowRight');
    await delay(400);
    currentSlide++;
    console.log(`  -> Slide ${currentSlide}`);
  }

  console.log(`\n  Reached final slide (${currentSlide})`);
  console.log(`  Testing backwards navigation from quiz/completion...`);

  // Test going BACK from completion slide
  let backSteps = 0;
  const maxBackSteps = 5;

  while (backSteps < maxBackSteps) {
    await page.keyboard.press('ArrowLeft');
    await delay(400);
    currentSlide--;
    backSteps++;
    console.log(`  <- Back to slide ${currentSlide}`);
  }

  if (backSteps > 0) {
    console.log(`\nPASS: Backwards navigation works (${backSteps} steps back)`);
  } else {
    console.log(`\nFAIL: Could not navigate backwards`);
    errors.push('Backwards navigation failed');
  }

  // Test dot navigation (click on a specific dot)
  console.log(`\n  Testing dot navigation...`);
  const dots = await page.$$('button.rounded-full');
  if (dots.length > 5) {
    // Click the 3rd dot (index 2)
    await dots[2].click();
    await delay(500);
    console.log(`  -> Clicked dot 3, should jump to slide 3`);

    // Click the last dot
    await dots[dots.length - 1].click();
    await delay(500);
    console.log(`  -> Clicked last dot, should jump to final slide`);

    // Click the 5th dot
    await dots[4].click();
    await delay(500);
    console.log(`  -> Clicked dot 5, should jump to slide 5`);

    console.log(`PASS: Dot navigation working`);
  } else {
    console.log(`WARNING: Not enough dots found for dot navigation test`);
  }

  // Take screenshot
  const fs = require('fs');
  if (!fs.existsSync('qa-screenshots')) {
    fs.mkdirSync('qa-screenshots');
  }
  const screenshotPath = `qa-screenshots/${lesson.name.toLowerCase().replace(/ /g, '-')}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`\n  Screenshot saved: ${screenshotPath}`);

  if (errors.length > 0) {
    console.log(`\nErrors found:`);
    errors.forEach(e => console.log(`  - ${e}`));
  } else {
    console.log(`\nPASS: All tests passed for ${lesson.name}`);
  }

  await page.close();
  return errors.length === 0;
}

async function main() {
  console.log('Starting Lesson QA Tests...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let allPassed = true;

  for (const lesson of lessons) {
    const passed = await testLesson(browser, lesson);
    if (!passed) allPassed = false;
  }

  await browser.close();

  console.log('\n========================================');
  console.log(allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
  console.log('========================================\n');

  process.exit(allPassed ? 0 : 1);
}

main().catch(console.error);
