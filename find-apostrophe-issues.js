const fs = require('fs');
const path = require('path');
const lessonsDir = './genrok-app/public/lessons';

const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath) && f !== 'shared' && f !== 'nul';
});

console.log(`Scanning ${lessons.length} lessons for apostrophe issues...\n`);

const issues = [];

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');
  const content = fs.readFileSync(lessonPath, 'utf8');

  // Extract the slides array
  const slidesMatch = content.match(/const slides = \[([\s\S]*?)\];/);
  if (!slidesMatch) continue;

  const slidesStr = slidesMatch[1];

  // Look for common English contractions that would break single-quoted strings
  // These are NOT escaped (not preceded by backslash)
  const problemPatterns = [
    { regex: /'[^']{0,500}[^\\]'s\s/g, name: "'s contraction" },
    { regex: /'[^']{0,500}[^\\]'t\s/g, name: "'t contraction" },
    { regex: /'[^']{0,500}[^\\]'re\s/g, name: "'re contraction" },
    { regex: /'[^']{0,500}[^\\]'ve\s/g, name: "'ve contraction" },
    { regex: /'[^']{0,500}[^\\]'ll\s/g, name: "'ll contraction" },
    { regex: /'[^']{0,500}[^\\]'m\s/g, name: "'m contraction" },
    { regex: /'[^']{0,500}[^\\]'d\s/g, name: "'d contraction" },
  ];

  let hasIssue = false;

  for (const { regex, name } of problemPatterns) {
    const matches = slidesStr.match(regex);
    if (matches) {
      // Filter to find actual unescaped apostrophes
      for (const match of matches) {
        // Check if this looks like a broken string (ends with 's or 't etc after a word)
        if (match.match(/[a-zA-Z]'[strevlmd]\s/)) {
          hasIssue = true;
          issues.push({ lesson, pattern: name, sample: match.slice(0, 80) });
          break;
        }
      }
    }
  }
}

console.log('=== LESSONS WITH UNESCAPED APOSTROPHES ===\n');
if (issues.length === 0) {
  console.log('No obvious apostrophe issues found.');
} else {
  // Group by lesson
  const grouped = {};
  for (const issue of issues) {
    if (!grouped[issue.lesson]) grouped[issue.lesson] = [];
    grouped[issue.lesson].push(issue);
  }

  Object.keys(grouped).forEach(lesson => {
    console.log(`${lesson}:`);
    grouped[lesson].forEach(i => console.log(`  - ${i.pattern}`));
  });

  console.log(`\nTotal: ${Object.keys(grouped).length} lessons with issues`);
}
