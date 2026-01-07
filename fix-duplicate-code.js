/**
 * Fix duplicate code issues caused by the elite improvement script
 * Removes patterns like ");=> (" which are invalid syntax
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

const LESSONS_TO_FIX = [
  'five-second-test',
  'five-value-heuristics',
  'fly-in-the-urinal',
  'fomo-engineering',
  'fonts-psychology',
  'forbidden-coffee-hook',
  'formula-to-sell',
  'forty-forty-twenty-rule',
  'forty-million-mistake',
  'founder-operating-system'
];

let fixed = 0;
let errors = [];

console.log(`\n========== FIXING DUPLICATE CODE IN ${LESSONS_TO_FIX.length} LESSONS ==========\n`);

for (const lesson of LESSONS_TO_FIX) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lesson}: File not found`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');
    const originalLength = content.length;
    let changes = [];

    // Pattern 1: );=> ( or );=> { - duplicate component definitions
    // This pattern appears when replacement didn't properly remove old component

    // Find and remove all patterns like );=> (  or );=> {
    // These are fragments of old components that weren't properly cleaned up

    // Fix pattern: ");=> (" followed by a component body
    let match;
    let iterations = 0;
    const maxIterations = 10; // Safety limit

    while ((match = content.match(/\);\s*=>\s*[\(\{]/)) && iterations < maxIterations) {
      iterations++;
      const matchStart = match.index;

      // Find the end of this duplicate component (look for next "const Something" or end of script)
      const afterMatch = content.slice(matchStart);

      // Look for the next component definition
      const nextConst = afterMatch.match(/\n\s*const [A-Z]/);

      if (nextConst) {
        // Remove from ");=>" up to (but not including) the next const
        const endPos = matchStart + nextConst.index;
        const removed = content.slice(matchStart, endPos);
        content = content.slice(0, matchStart) + ');\n' + content.slice(endPos);
        changes.push(`Removed duplicate at position ${matchStart}`);
      } else {
        // No next component found, just fix the immediate pattern
        content = content.slice(0, matchStart) + ');' + content.slice(matchStart + match[0].length);
        changes.push(`Fixed pattern at position ${matchStart}`);
      }
    }

    // Also fix pattern where "};" is followed by "=> {" or "=> ("
    content = content.replace(/\};\s*=>\s*[\(\{]/g, '};');

    if (content.length !== originalLength || changes.length > 0) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      fixed++;
      console.log(`✓ ${lesson}: ${changes.length > 0 ? changes.join(', ') : 'Fixed duplicates'}`);
    } else {
      console.log(`○ ${lesson}: No duplicates found`);
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

console.log('\n✅ Duplicate code cleanup complete!\n');
