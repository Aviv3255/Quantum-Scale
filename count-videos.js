const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';
const folders = fs.readdirSync(lessonsDir).filter(f => fs.statSync(path.join(lessonsDir, f)).isDirectory());

let total = 0;
let byType = {};
let lessonsWithVideos = 0;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Extract slides array
  const slidesMatch = content.match(/const slides = \[([\s\S]*?)\];/);
  if (!slidesMatch) continue;

  const slidesContent = slidesMatch[1];

  // Count characterVideo occurrences
  const videoMatches = slidesContent.match(/characterVideo:/g);
  if (!videoMatches) continue;

  lessonsWithVideos++;
  total += videoMatches.length;

  // Try to identify slide types with videos
  const slideBlocks = slidesContent.split(/\},\s*\{/);
  for (const block of slideBlocks) {
    if (block.includes('characterVideo:')) {
      const typeMatch = block.match(/type:\s*'([^']+)'/);
      if (typeMatch) {
        const type = typeMatch[1];
        byType[type] = (byType[type] || 0) + 1;
      }
    }
  }
}

console.log('=== CHARACTER VIDEO STATISTICS ===');
console.log('');
console.log('Total video placements:', total);
console.log('Lessons with videos:', lessonsWithVideos);
console.log('Average per lesson:', (total / lessonsWithVideos).toFixed(1));
console.log('');
console.log('=== BY SLIDE TYPE ===');
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});
