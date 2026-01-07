const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing brand logo padding in ${folders.length} lessons...\n`);

let totalFixed = 0;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only fix lessons that have brandImage
  if (!content.includes('brandImage')) continue;

  let modified = false;

  // Fix brand logo margin from 3% to 80px minimum
  // Pattern: marginRight: '3%', marginBottom: '5%'
  const oldPattern = "marginRight: '3%', marginBottom: '5%'";
  const newPattern = "marginRight: '80px', marginBottom: '5%'";

  if (content.includes(oldPattern)) {
    content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
    modified = true;
  }

  // Also check for any other margin patterns that might exist
  // marginRight: '3%' anywhere
  const oldPattern2 = /marginRight: '3%'/g;
  if (oldPattern2.test(content) && !content.includes("marginRight: '80px'")) {
    content = content.replace(/marginRight: '3%'/g, "marginRight: '80px'");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    totalFixed++;
    console.log(`  ✓ ${folder}`);
  }
}

console.log(`\nFixed brand logo padding in ${totalFixed} lessons`);
console.log(`Brand logos now have minimum 80px padding from the side`);
