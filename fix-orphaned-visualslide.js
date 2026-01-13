/**
 * Fix orphaned VisualSlide code in all lessons
 * The improvement script left fragments of old VisualSlide with multiple if statements
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

const LESSONS_TO_FIX = [
  'coupon-leaking',
  'cpppb-proof-loop',
  'creative-volume-2026',
  'customer-voice-mining',
  'damaging-admission',
  'decoy-effect',
  'digital-pause-power',
  'digital-velvet-rope',
  'dior-pricing-secret',
  'dopamine-blueprint'
];

let fixed = 0;
let errors = [];

console.log(`\n========== FIXING ORPHANED VISUALSLIDE CODE ==========\n`);

for (const lesson of LESSONS_TO_FIX) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lesson}: File not found`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');
    const originalContent = content;
    let changes = [];

    // Pattern: "};\n      if (data.visualType" outside of a function
    // This is orphaned code from old VisualSlide that had multiple conditions

    // Find pattern: "    };\n      if (data.visualType"
    const orphanedPattern = /\s*\};\s*\n\s*if \(data\.visualType === ['"](?:image|chart|diagram|stats)['"]\)/g;

    let match;
    while ((match = orphanedPattern.exec(content)) !== null) {
      // Find where this orphaned block ends (next component definition)
      const startPos = match.index;
      const afterMatch = content.slice(startPos);

      // Look for next "const Something =" to find end of orphaned block
      const nextComponentMatch = afterMatch.match(/\n\s*const [A-Z][a-zA-Z]+(?:Slide)? = /);

      if (nextComponentMatch) {
        const endPos = startPos + nextComponentMatch.index;
        // Remove the orphaned block
        content = content.slice(0, startPos) + '    };' + content.slice(endPos);
        changes.push(`Removed orphaned visualType block`);
        // Reset regex since content changed
        orphanedPattern.lastIndex = 0;
      }
    }

    if (content !== originalContent) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      fixed++;
      console.log(`✓ ${lesson}: ${changes.join(', ')}`);
    } else {
      console.log(`○ ${lesson}: No orphaned code found`);
    }

  } catch (err) {
    errors.push(`${lesson}: ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Fixed: ${fixed}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}

console.log('\n✅ Orphaned code cleanup complete!\n');
