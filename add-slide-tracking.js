/**
 * Batch update all lesson.html files to add slide tracking postMessage
 * This enables the admin issue tracking system to know which slide the user is on
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// The code to add after the currentSlideRef useEffect
const postMessageCode = `

      // Send slide update to parent for admin issue tracking
      useEffect(() => {
        window.parent.postMessage({
          type: 'LESSON_SLIDE_UPDATE',
          slideIndex: currentSlide,
          slideType: slides[currentSlide]?.type,
          lessonSlug: LESSON_CONFIG.id
        }, '*');
      }, [currentSlide]);`;

// Pattern to find: the currentSlideRef useEffect
const targetPattern = /React\.useEffect\(\(\) => \{ currentSlideRef\.current = currentSlide; \}, \[currentSlide\]\);/;

// Alternative patterns some lessons might use
const altPatterns = [
  /useEffect\(\(\) => \{ currentSlideRef\.current = currentSlide; \}, \[currentSlide\]\);/,
  /React\.useEffect\(\(\)\s*=>\s*\{\s*currentSlideRef\.current\s*=\s*currentSlide;\s*\},\s*\[currentSlide\]\);/
];

let updated = 0;
let skipped = 0;
let alreadyHas = 0;
let errors = [];

// Get all lesson directories
const lessonDirs = fs.readdirSync(lessonsDir).filter(dir => {
  const lessonPath = path.join(lessonsDir, dir, 'lesson.html');
  return fs.existsSync(lessonPath);
});

console.log(`Found ${lessonDirs.length} lessons to process\n`);

for (const lessonDir of lessonDirs) {
  const lessonPath = path.join(lessonsDir, lessonDir, 'lesson.html');

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Check if already has the postMessage tracking
    if (content.includes('LESSON_SLIDE_UPDATE')) {
      alreadyHas++;
      continue;
    }

    // Try main pattern first
    let matched = false;
    if (targetPattern.test(content)) {
      content = content.replace(targetPattern, (match) => match + postMessageCode);
      matched = true;
    } else {
      // Try alternative patterns
      for (const altPattern of altPatterns) {
        if (altPattern.test(content)) {
          content = content.replace(altPattern, (match) => match + postMessageCode);
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      updated++;
      console.log(`✓ Updated: ${lessonDir}`);
    } else {
      skipped++;
      errors.push(lessonDir);
      console.log(`✗ Skipped (pattern not found): ${lessonDir}`);
    }

  } catch (err) {
    skipped++;
    errors.push(`${lessonDir}: ${err.message}`);
    console.log(`✗ Error: ${lessonDir} - ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Total lessons: ${lessonDirs.length}`);
console.log(`Updated: ${updated}`);
console.log(`Already has tracking: ${alreadyHas}`);
console.log(`Skipped: ${skipped}`);

if (errors.length > 0) {
  console.log(`\nLessons that need manual attention:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
