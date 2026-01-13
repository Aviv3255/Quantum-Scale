const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get target lesson(s)
const targetLesson = process.argv[2];
const isAll = targetLesson === '--all';
const isDryRun = process.argv.includes('--dry-run');

const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  if (!fs.existsSync(lessonPath)) return false;
  if (f === 'shared' || f === 'nul') return false;
  if (!isAll && targetLesson && f !== targetLesson) return false;
  return true;
});

console.log(`Processing ${lessons.length} lessons...${isDryRun ? ' (DRY RUN)' : ''}\n`);

let fixed = 0;
let totalChanges = 0;

// Common English contractions that appear in lesson content
const contractionPatterns = [
  // Word ending + apostrophe + s/t/re/ve/ll/m/d + space or punctuation
  { find: /([a-zA-Z])'s(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'s$2" },
  { find: /([a-zA-Z])'t(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'t$2" },
  { find: /([a-zA-Z])'re(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'re$2" },
  { find: /([a-zA-Z])'ve(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'ve$2" },
  { find: /([a-zA-Z])'ll(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'ll$2" },
  { find: /([a-zA-Z])'m(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'m$2" },
  { find: /([a-zA-Z])'d(\s|,|\.|\?|!|"|;|:|—)/g, replace: "$1\\'d$2" },
];

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');
  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only process within the slides array to be safe
  const slidesMatch = content.match(/(const slides = \[)([\s\S]*?)(\];)/);
  if (!slidesMatch) continue;

  const beforeSlides = content.substring(0, slidesMatch.index);
  let slidesContent = slidesMatch[2];
  const afterSlides = content.substring(slidesMatch.index + slidesMatch[0].length);

  let changeCount = 0;

  for (const pattern of contractionPatterns) {
    // Count changes
    const matches = slidesContent.match(pattern.find);
    if (matches) {
      // Filter out already escaped ones
      const unescaped = matches.filter(m => !m.includes("\\'"));
      if (unescaped.length > 0) {
        changeCount += unescaped.length;
      }
    }

    // Only replace if not already escaped
    slidesContent = slidesContent.replace(pattern.find, (match, p1, p2) => {
      // Check if already escaped
      if (match.includes("\\'")) return match;
      return `${p1}\\'${match.slice(p1.length + 1)}`;
    });
  }

  if (changeCount > 0) {
    const newContent = beforeSlides + slidesMatch[1] + slidesContent + slidesMatch[3] + afterSlides;

    if (!isDryRun) {
      fs.writeFileSync(lessonPath, newContent);
    }

    console.log(`${isDryRun ? '[DRY]' : '✓'} ${lesson}: ${changeCount} apostrophes escaped`);
    fixed++;
    totalChanges += changeCount;
  }
}

console.log(`\n=== Summary ===`);
console.log(`Lessons fixed: ${fixed}`);
console.log(`Total apostrophes escaped: ${totalChanges}`);
if (isDryRun) console.log('\nRun without --dry-run to apply changes.');
