const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotDir = 'C:/Projects/Quantum-Scale/lesson-screenshots';
const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// Helper function to wait
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Ensure screenshot directory exists
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Get lesson from command line args or use default list
const args = process.argv.slice(2);
const specificLesson = args[0];

// All lessons
const allLessons = [
  'persuasion-blueprint',
  'science-of-selling',
  'fred-method',
  'trust-architecture',
  'wiifm-principle',
  'emotion-spectrum',
  'three-canons-of-craft',
  'blind-spot-effect',
  'master-key-framework',
  'structural-tension',
  'customer-voice-mining',
  'persuasion-stack',
  'red-button-effect',
  'familiar-surprise-secret',
  'gatekeeper-method',
  'emotion-decides',
  'architecture-of-influence',
  'cpppb-proof-loop',
  'damaging-admission',
  'emotional-precision',
  'double-bind-of-fear',
  'forty-forty-twenty-rule',
  'four-primal-needs',
  'ocpb-formula',
  'sales-message-anatomy',
  'self-persuasion-architecture',
  'three-growth-levers',
  'three-levels-of-change',
  'three-second-rule',
  'unique-mechanism',
  'rule-of-one',
  'architecture-of-belief',
  'copywriters-codex'
];

const lessonsToScreenshot = specificLesson ? [specificLesson] : allLessons;

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          // Scroll back to top
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

async function takeScreenshot(page, lesson, lessonPath) {
  console.log(`Taking screenshot of ${lesson}...`);

  // Navigate to the lesson
  await page.goto(`file://${lessonPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for initial render
  await delay(1000);

  // Scroll through the entire page to trigger all animations and lazy content
  await autoScroll(page);

  // Wait for animations to settle
  await delay(2000);

  // Get the full page height
  const bodyHandle = await page.$('body');
  const boundingBox = await bodyHandle.boundingBox();

  // Take full page screenshot with proper dimensions
  await page.screenshot({
    path: path.join(screenshotDir, `${lesson}.png`),
    fullPage: true,
    captureBeyondViewport: true
  });

  console.log(`  Saved ${lesson}.png`);

  await bodyHandle.dispose();
}

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-file-access-from-files'
    ]
  });

  const page = await browser.newPage();

  // Set a desktop viewport
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1
  });

  for (const lesson of lessonsToScreenshot) {
    const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

    if (fs.existsSync(lessonPath)) {
      try {
        await takeScreenshot(page, lesson, lessonPath);
      } catch (error) {
        console.log(`  Error with ${lesson}: ${error.message}`);
      }
    } else {
      console.log(`  Lesson not found: ${lesson}`);
    }
  }

  await browser.close();
  console.log('\nAll screenshots complete!');
}

takeScreenshots().catch(console.error);
