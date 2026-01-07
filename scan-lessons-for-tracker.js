const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'genrok-app', 'public', 'lessons');
const lessons = fs.readdirSync(lessonsPath);

const elite = [];
const needsWork = [];
const errors = [];

for (const lesson of lessons) {
  const lessonDir = path.join(lessonsPath, lesson);
  const stat = fs.statSync(lessonDir);
  if (!stat.isDirectory()) continue;

  const htmlFile = path.join(lessonDir, 'lesson.html');
  if (!fs.existsSync(htmlFile)) {
    errors.push(lesson);
    continue;
  }

  try {
    const content = fs.readFileSync(htmlFile, 'utf-8');

    // Only count as ELITE if it has the specific marker added during improvements
    if (content.includes('// ============ CUSTOM ELITE SLIDES ============')) {
      elite.push(lesson);
    } else {
      needsWork.push(lesson);
    }
  } catch (e) {
    errors.push(lesson);
  }
}

console.log('=== SCAN RESULTS ===');
console.log(`ELITE (with custom marker): ${elite.length}`);
console.log(`Needs Work: ${needsWork.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Total: ${lessons.length}`);
console.log('');
console.log('=== ELITE IMPROVED LESSONS ===');
elite.sort().forEach((l, i) => console.log(`${i+1}. ${l}`));
console.log('');
console.log('=== ERRORS ===');
errors.forEach(l => console.log(l));
