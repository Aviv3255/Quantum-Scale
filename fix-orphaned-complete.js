/**
 * Complete fix for orphaned VisualSlide code
 * Removes all orphaned if (data.visualType === ...) blocks outside functions
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

const LESSONS_TO_FIX = [
  'customer-voice-mining',
  'decoy-effect',
  'dopamine-blueprint',
  'creative-volume-2026'
];

let fixed = 0;

for (const lesson of LESSONS_TO_FIX) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');
  const originalLength = content.length;

  // Pattern: };  followed by orphaned if (data.visualType blocks ending with }; before const
  // Match from "return null;\n    };" through multiple if blocks until "const CardsSlide"

  const pattern = /      return null;\n    \};\n      if \(data\.visualType[\s\S]*?return null;\n    \};\n\n    const CardsSlide/g;

  content = content.replace(pattern, '      return null;\n    };\n\n    const CardsSlide');

  if (content.length !== originalLength) {
    fs.writeFileSync(lessonPath, content, 'utf8');
    fixed++;
    console.log(`✓ ${lesson}: Fixed orphaned code`);
  } else {
    console.log(`○ ${lesson}: No changes needed`);
  }
}

console.log(`\nFixed: ${fixed} lessons`);
