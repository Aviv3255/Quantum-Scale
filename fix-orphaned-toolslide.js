const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath);
});

let fixed = 0;

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');
  let content = fs.readFileSync(lessonPath, 'utf8');
  let modified = false;

  // Check for orphaned tool slide code pattern: );=> (
  if (content.includes(');=> (')) {
    // Find and remove the orphaned code block
    // Pattern: );=> ( followed by component body until the next ); then newline then const

    // Split at the orphaned marker
    const parts = content.split(');=> (');

    if (parts.length === 2) {
      // Find where the orphaned component ends (look for );  followed by const)
      const secondPart = parts[1];

      // Find the end of the orphaned component - look for ");  " followed by newlines and "const"
      const endPattern = /\);[\s\n]+const /;
      const match = secondPart.match(endPattern);

      if (match) {
        // Keep only the part after the orphaned component
        const afterOrphan = secondPart.substring(match.index + 2); // +2 to skip ");"
        content = parts[0] + ');' + afterOrphan;
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    console.log(`✓ Fixed ${lesson}`);
    fixed++;
  }
}

console.log(`\nFixed ${fixed} lessons`);
