const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson directories
const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath);
});

let fixed = 0;

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');
  let content = fs.readFileSync(lessonPath, 'utf8');

  // Check for incomplete ToolSlide declaration pattern
  // Pattern: "const ToolSlide = ({ data })" followed by newline(s) then "const ImplementationSlide"
  const incompletePattern = /const ToolSlide = \(\{ data \}\)\s*\n\s*\n?\s*const ImplementationSlide/g;

  if (incompletePattern.test(content)) {
    // Replace incomplete ToolSlide with just ImplementationSlide
    content = content.replace(incompletePattern, 'const ImplementationSlide');
    fs.writeFileSync(lessonPath, content);
    console.log(`✓ Fixed ${lesson}`);
    fixed++;
  }
}

console.log(`\nFixed ${fixed} lessons`);
