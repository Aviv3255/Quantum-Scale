const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

const folders = fs.readdirSync(lessonsDir).filter(f => {
  const stat = fs.statSync(path.join(lessonsDir, f));
  return stat.isDirectory() && f !== 'shared' && f !== 'nul';
});

console.log(`Scanning ${folders.length} lessons for template compliance...\n`);

const goodLessons = [];
const badLessons = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Skip non-React lessons
  if (!content.includes('text/babel') && !content.includes('react.production')) continue;

  const issues = [];

  // Check 1: Footer dots pattern (gap-2.5 + w-2.5 h-2.5)
  const hasFooterDots = content.includes('gap-2.5') &&
                        content.includes('w-2.5 h-2.5 rounded-full');
  if (!hasFooterDots) {
    issues.push('Missing standard footer dots (gap-2.5, w-2.5 h-2.5)');
  }

  // Check 2: Side arrow buttons (w-12 h-12 rounded-full + absolute left-5/right-5)
  const hasSideArrows = content.includes('w-12 h-12 rounded-full') &&
                        (content.includes('absolute left-5') || content.includes('left-5 top-1/2'));
  if (!hasSideArrows) {
    issues.push('Missing standard side arrows (w-12 h-12 rounded-full)');
  }

  // Check 3: Welcome slide dark box (neutral-900 + learning goals)
  const hasWelcomeDarkBox = content.includes('bg-neutral-900') ||
                            content.includes('neutral-900');
  const hasLearningGoals = content.includes('learningGoals') ||
                           content.includes('In this lesson');
  if (!hasWelcomeDarkBox || !hasLearningGoals) {
    issues.push('Missing welcome slide dark box with learning goals');
  }

  // Check 4: "Let's Go" button
  const hasLetsGoButton = content.includes("Let's Go") || content.includes("Let\\'s Go");
  if (!hasLetsGoButton) {
    issues.push('Missing "Let\'s Go" button on welcome slide');
  }

  // Check 5: LessonApp structure (w-full h-screen bg-white flex flex-col)
  const hasLessonAppStructure = content.includes('h-screen bg-white flex flex-col') ||
                                 content.includes('w-full h-screen bg-white');
  if (!hasLessonAppStructure) {
    issues.push('Missing standard LessonApp structure');
  }

  // Check 6: GIF overlay support
  const hasGifSupport = content.includes('gifConfig') ||
                        content.includes('onShowGif') ||
                        content.includes('showGif');
  if (!hasGifSupport) {
    issues.push('Missing GIF/video overlay support');
  }

  if (issues.length === 0) {
    goodLessons.push(folder);
  } else {
    badLessons.push({ folder, issues });
  }
}

console.log('=== TEMPLATE COMPLIANCE REPORT ===\n');
console.log(`✓ GOOD LESSONS (${goodLessons.length}):`);
console.log(goodLessons.slice(0, 10).join(', ') + (goodLessons.length > 10 ? '...' : ''));

console.log(`\n✗ BAD LESSONS (${badLessons.length}):\n`);
badLessons.forEach(({ folder, issues }) => {
  console.log(`${folder}:`);
  issues.forEach(issue => console.log(`  - ${issue}`));
});

console.log(`\n=== SUMMARY ===`);
console.log(`Good: ${goodLessons.length}`);
console.log(`Bad: ${badLessons.length}`);
console.log(`Total: ${goodLessons.length + badLessons.length}`);

// Save bad lessons list to file
const badList = badLessons.map(b => b.folder);
fs.writeFileSync('./bad-template-lessons.json', JSON.stringify(badList, null, 2));
console.log(`\nBad lessons list saved to bad-template-lessons.json`);
